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
  propertyId: z.string().optional(),
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
const updateProviderRequestStatusSchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']),
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

    let resolvedPropertyId = parsed.data.propertyId?.trim() || null;
    if (!resolvedPropertyId && parsed.data.surveyId) {
      const { data: linkedRequest, error: linkedRequestError } = await db
        .from('service_requests')
        .select('property_id,user_id')
        .eq('id', parsed.data.surveyId)
        .maybeSingle();
      assertNoDbError(linkedRequestError);

      resolvedPropertyId = linkedRequest?.property_id || null;
      if (!resolvedPropertyId && linkedRequest?.user_id) {
        const { data: requestUser, error: requestUserError } = await db
          .from('users')
          .select('current_property_id')
          .eq('id', linkedRequest.user_id)
          .maybeSingle();
        assertNoDbError(requestUserError);
        resolvedPropertyId = requestUser?.current_property_id || null;

        if (!resolvedPropertyId) {
          const { data: existingProp } = await db
            .from('properties')
            .select('id')
            .eq('user_id', linkedRequest.user_id)
            .limit(1)
            .maybeSingle();
          if (existingProp && existingProp.id) {
            resolvedPropertyId = existingProp.id;
          } else {
            const propertyId = randomUUID();
            const propNow = new Date().toISOString();
            const { error: propInsertError } = await db.from('properties').insert({
              id: propertyId,
              user_id: linkedRequest.user_id,
              name: 'My Property',
              address: 'Address pending',
              type: 'residential',
              subscription_status: 'NONE',
              created_at: propNow,
              updated_at: propNow,
            });
            assertNoDbError(propInsertError);
            resolvedPropertyId = propertyId;
          }
          await db.from('users').update({ current_property_id: resolvedPropertyId }).eq('id', linkedRequest.user_id);
          await db.from('service_requests').update({ property_id: resolvedPropertyId }).eq('id', parsed.data.surveyId);
        }
      }
    }

    if (!resolvedPropertyId) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', {
        propertyId: ['Property is required to create billing draft'],
      });
      return;
    }

    const { data: property, error: propertyError } = await db
      .from('properties')
      .select('id,user_id,plan_type')
      .eq('id', resolvedPropertyId)
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
        property_id: resolvedPropertyId,
        month: new Date().toISOString().slice(0, 7),
        total_amount: totalAmount,
        subscription_fee: parsed.data.charges.subscriptionFee,
        usage_charge: parsed.data.charges.usageCharge,
        taxes: parsed.data.charges.taxes,
        status: 'pending',
        due_date: dueDate,
        generated_at: now,
      });
      if (billInsertError) {
        console.error('[billing/drafts] bills insert error:', JSON.stringify(billInsertError));
        assertNoDbError(billInsertError);
      }
    }

    let validSurveyId = null;
    if (parsed.data.surveyId) {
      const { data: surveyData } = await db.from('surveys').select('id').eq('id', parsed.data.surveyId).maybeSingle();
      if (surveyData && surveyData.id) {
        validSurveyId = surveyData.id;
      }
    }

    const draftId = randomUUID();
    const { error: draftInsertError } = await db.from('provider_billing_drafts').insert({
      id: draftId,
      provider_user_id: authUser.userId,
      property_id: resolvedPropertyId,
      survey_id: validSurveyId,
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
    if (draftInsertError) {
      console.error('[billing/drafts] provider_billing_drafts insert error:', JSON.stringify(draftInsertError));
      assertNoDbError(draftInsertError);
    }

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
      if (notificationError) {
        console.error('[billing/drafts] notifications insert error:', JSON.stringify(notificationError));
        // Don't fail the whole request just because the notification failed
        // assertNoDbError(notificationError);
      }
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
    const { data: serviceRequests, error } = await db
      .from('service_requests')
      .select('id,user_id,property_id,service_title,status,submitted_at,consumption_kwh')
      .in('status', ['pending', 'in-progress'])
      .order('submitted_at', { ascending: false })
      .limit(200);
    assertNoDbError(error);

    const requestRows = serviceRequests || [];
    const requestIds = requestRows.map((item: any) => item.id);
    const propertyIds = requestRows.map((item: any) => item.property_id).filter(Boolean);
    const userIds = [...new Set(requestRows.map((item: any) => item.user_id).filter(Boolean))];

    const [{ data: drafts, error: draftsError }, { data: properties, error: propertiesError }, { data: users, error: usersError }] = await Promise.all([
      requestIds.length
        ? db
            .from('provider_billing_drafts')
            .select('id,survey_id,status,created_at')
            .in('survey_id', requestIds)
        : Promise.resolve({ data: [], error: null }),
      propertyIds.length
        ? db.from('properties').select('id,user_id,plan_type').in('id', propertyIds)
        : Promise.resolve({ data: [], error: null }),
      userIds.length
        ? db.from('users').select('id,name').in('id', userIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

    assertNoDbError(draftsError as any);
    assertNoDbError(propertiesError as any);
    assertNoDbError(usersError as any);

    const draftByRequest = new Map<string, any>();
    for (const draft of drafts || []) {
      const existing = draftByRequest.get(draft.survey_id);
      if (!existing || new Date(existing.created_at).getTime() < new Date(draft.created_at).getTime()) {
        draftByRequest.set(draft.survey_id, draft);
      }
    }

    const propertyMap = new Map<string, any>();
    for (const property of properties || []) propertyMap.set(property.id, property);

    const userMap = new Map<string, any>();
    for (const user of users || []) userMap.set(user.id, user);

    const requests = requestRows
      .map((request: any) => {
        const property = request.property_id ? propertyMap.get(request.property_id) : null;
        const user = userMap.get(request.user_id);
        const draft = draftByRequest.get(request.id);
        return {
          id: request.id,
          propertyId: request.property_id || '',
          customerName: user?.name || 'Unknown',
          serviceTitle: request.service_title || property?.plan_type || 'Energy Service',
          status: request.status,
          date: String(request.submitted_at).slice(0, 10),
          monthlyConsumption: Number(request.consumption_kwh || 0),
          monthlyBill: 0,
          draftId: draft?.id || null,
        };
      });

    sendSuccess(res, { requests });
  }),
);

router.patch(
  '/requests/:requestId/status',
  asyncHandler(async (req, res) => {
    const parsed = updateProviderRequestStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const requestId = String(req.params.requestId);
    const db = getEaasClient();
    const now = new Date().toISOString();

    const { data: serviceRequest, error: serviceRequestError } = await db
      .from('service_requests')
      .update({
        status: parsed.data.status,
        updated_at: now,
      })
      .eq('id', requestId)
      .select('id,status')
      .maybeSingle();
    assertNoDbError(serviceRequestError);

    if (serviceRequest) {
      sendSuccess(res, {
        requestId: serviceRequest.id,
        status: serviceRequest.status,
        updatedAt: now,
      });
      return;
    }

    const { data: survey, error } = await db
      .from('surveys')
      .update({
        status: parsed.data.status,
      })
      .eq('id', requestId)
      .select('id,status')
      .maybeSingle();
    assertNoDbError(error);

    if (!survey) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, {
      requestId: survey.id,
      status: survey.status,
      updatedAt: now,
    });
  }),
);

export default router;
