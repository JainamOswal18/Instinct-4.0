import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const draftSchema = z.object({
  propertyId: z.string().min(1),
  surveyId: z.string().optional(),
  title: z.string().min(2),
  description: z.string().optional(),
  lineItems: z.array(z.record(z.any())).default([]),
  charges: z.object({
    subscriptionFee: z.number().nonnegative().default(0),
    usageCharge: z.number().nonnegative().default(0),
    taxes: z.number().nonnegative().default(0),
  }),
  dueDate: z.string().optional(),
  status: z.enum(['draft', 'sent']).default('sent'),
});

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

router.post(
  '/billing/drafts',
  asyncHandler(async (req, res) => {
    const parsed = draftSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authUser = (req as any).user;
    const db = getEaasClient();

    const { data: property, error: propertyError } = await db
      .from('properties')
      .select('id,user_id,plan_type')
      .eq('id', parsed.data.propertyId)
      .maybeSingle();
    assertNoDbError(propertyError);
    if (!property) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const totalAmount = Number(
      (parsed.data.charges.subscriptionFee + parsed.data.charges.usageCharge + parsed.data.charges.taxes).toFixed(2),
    );

    let billId: string | null = null;
    const now = new Date().toISOString();

    if (parsed.data.status === 'sent') {
      billId = randomUUID();
      const dueDate = parsed.data.dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();

      const { error: billInsertError } = await db.from('bills').insert({
        id: billId,
        property_id: parsed.data.propertyId,
        month: new Date().toISOString().slice(0, 7),
        total_amount: totalAmount,
        subscription_fee: parsed.data.charges.subscriptionFee,
        usage_charge: parsed.data.charges.usageCharge,
        taxes: parsed.data.charges.taxes,
        status: 'pending',
        due_date: dueDate,
        generated_at: now,
      });
      assertNoDbError(billInsertError);
    }

    const draftId = randomUUID();
    const { error: draftInsertError } = await db.from('provider_billing_drafts').insert({
      id: draftId,
      provider_user_id: authUser.userId,
      property_id: parsed.data.propertyId,
      survey_id: parsed.data.surveyId || null,
      bill_id: billId,
      title: parsed.data.title,
      description: parsed.data.description || null,
      line_items: parsed.data.lineItems,
      charges: parsed.data.charges,
      total_amount: totalAmount,
      status: parsed.data.status,
      sent_at: parsed.data.status === 'sent' ? now : null,
      created_at: now,
      updated_at: now,
    });
    assertNoDbError(draftInsertError);

    if (parsed.data.status === 'sent') {
      const { error: notificationError } = await db.from('notifications').insert({
        id: randomUUID(),
        user_id: property.user_id,
        type: 'billing_draft_sent',
        title: 'New Custom Billing Plan',
        message: `A custom billing plan \"${parsed.data.title}\" has been shared for your review.`,
        route: '/billing',
        read: false,
        dismissible: true,
        persistent: false,
        created_at: now,
      });
      assertNoDbError(notificationError);
    }

    sendSuccess(res, {
      draftId,
      billId,
      status: parsed.data.status,
      totalAmount,
      sentAt: parsed.data.status === 'sent' ? now : null,
    });
  }),
);

router.get(
  '/billing/drafts',
  asyncHandler(async (req, res) => {
    const status = req.query.status ? String(req.query.status) : undefined;
    const db = getEaasClient();
    const authUser = (req as any).user;

    let query = db
      .from('provider_billing_drafts')
      .select('*')
      .eq('provider_user_id', authUser.userId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: drafts, error } = await query;
    assertNoDbError(error);

    sendSuccess(res, {
      drafts: (drafts || []).map((item: any) => ({
        id: item.id,
        propertyId: item.property_id,
        surveyId: item.survey_id,
        billId: item.bill_id,
        title: item.title,
        description: item.description,
        lineItems: item.line_items,
        charges: item.charges,
        totalAmount: item.total_amount,
        currency: item.currency,
        status: item.status,
        sentAt: item.sent_at,
        acceptedAt: item.accepted_at,
        disputedAt: item.disputed_at,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
    });
  }),
);

router.get(
  '/requests',
  asyncHandler(async (_req, res) => {
    const db = getEaasClient();
    const { data: surveys, error } = await db
      .from('surveys')
      .select('id,property_id,submitted_at,status,monthly_consumption,monthly_bill')
      .order('submitted_at', { ascending: false })
      .limit(200);
    assertNoDbError(error);

    const surveyRows = surveys || [];
    const surveyIds = surveyRows.map((item: any) => item.id);
    const propertyIds = surveyRows.map((item: any) => item.property_id);

    const [{ data: drafts, error: draftsError }, { data: properties, error: propertiesError }] = await Promise.all([
      surveyIds.length
        ? db
            .from('provider_billing_drafts')
            .select('id,survey_id,status,created_at')
            .in('survey_id', surveyIds)
        : Promise.resolve({ data: [], error: null }),
      propertyIds.length
        ? db.from('properties').select('id,user_id,plan_type').in('id', propertyIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

    assertNoDbError(draftsError as any);
    assertNoDbError(propertiesError as any);

    const draftBySurvey = new Map<string, any>();
    for (const draft of drafts || []) {
      const existing = draftBySurvey.get(draft.survey_id);
      if (!existing || new Date(existing.created_at).getTime() < new Date(draft.created_at).getTime()) {
        draftBySurvey.set(draft.survey_id, draft);
      }
    }

    const propertyMap = new Map<string, any>();
    for (const property of properties || []) propertyMap.set(property.id, property);

    const userIds = [...new Set((properties || []).map((item: any) => item.user_id))];
    const { data: users, error: usersError } = userIds.length
      ? await db.from('users').select('id,name').in('id', userIds)
      : { data: [], error: null };
    assertNoDbError(usersError as any);
    const userMap = new Map<string, any>();
    for (const user of users || []) userMap.set(user.id, user);

    const requests = surveyRows
      .map((survey: any) => {
        const property = propertyMap.get(survey.property_id);
        const user = property ? userMap.get(property.user_id) : null;
        const draft = draftBySurvey.get(survey.id);
        return {
          id: survey.id,
          propertyId: survey.property_id,
          customerName: user?.name || 'Unknown',
          serviceTitle: property?.plan_type || 'Energy Service',
          status: draft ? `billing_${draft.status}` : 'pending',
          date: String(survey.submitted_at).slice(0, 10),
          monthlyConsumption: survey.monthly_consumption,
          monthlyBill: survey.monthly_bill,
          draftId: draft?.id || null,
        };
      })
      .filter((item) => item.status === 'pending');

    sendSuccess(res, { requests });
  }),
);

export default router;
