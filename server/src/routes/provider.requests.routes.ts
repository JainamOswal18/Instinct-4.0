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

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

/**
 * GET /provider/requests
 * Returns all service_requests (survey submissions) for the provider to review.
 */
router.get(
  '/requests',
  asyncHandler(async (req, res) => {
    const status = req.query.status ? String(req.query.status) : undefined;
    const db = getEaasClient();

    let query = db
      .from('service_requests')
      .select('id,user_id,property_id,service_title,consumption_kwh,area_description,status,submitted_at,updated_at')
      .order('submitted_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: requests, error } = await query;
    assertNoDbError(error);

    if (!requests || requests.length === 0) {
      sendSuccess(res, { requests: [] });
      return;
    }

    // Fetch user names and property details in parallel
    const userIds = [...new Set(requests.map((r: any) => r.user_id).filter(Boolean))];
    const propertyIds = [...new Set(requests.map((r: any) => r.property_id).filter(Boolean))];

    const [usersResult, propertiesResult, draftsResult] = await Promise.all([
      userIds.length
        ? db.from('users').select('id,name').in('id', userIds)
        : { data: [], error: null },
      propertyIds.length
        ? db.from('properties').select('id,subscription_status').in('id', propertyIds)
        : { data: [], error: null },
      // Check if a billing draft already exists for each request (survey_id = request.id)
      db.from('provider_billing_drafts').select('id,survey_id').in(
        'survey_id',
        requests.map((r: any) => r.id),
      ),
    ]);

    assertNoDbError(usersResult.error as any);
    assertNoDbError(propertiesResult.error as any);
    // billing_drafts may not exist yet — ignore error

    const userById = new Map<string, any>();
    for (const u of usersResult.data || []) userById.set(u.id, u);

    const draftBySurveyId = new Map<string, string>();
    for (const d of draftsResult.data || []) {
      if (d.survey_id) draftBySurveyId.set(d.survey_id, d.id);
    }

    // Parse monthly bill from area_description if stored there, otherwise derive from consumption
    const mapped = requests.map((r: any) => {
      const consumption = Number(r.consumption_kwh) || 0;
      // Rough estimate: ₹8/kWh average tariff
      const estimatedBill = Math.round(consumption * 8);

      return {
        id: r.id,
        propertyId: r.property_id,
        customerName: userById.get(r.user_id)?.name || 'Unknown',
        serviceTitle: r.service_title || 'Energy Survey',
        status: r.status || 'pending',
        date: String(r.submitted_at || r.updated_at || new Date().toISOString()).slice(0, 10),
        monthlyConsumption: consumption,
        monthlyBill: estimatedBill,
        draftId: draftBySurveyId.get(r.id) || null,
      };
    });

    sendSuccess(res, { requests: mapped });
  }),
);

/**
 * PATCH /provider/requests/:requestId/status
 * Updates the status of a service_request.
 * When status → 'in-progress', optionally creates an installations row so it
 * appears in the installations pipeline.
 */
const updateStatusSchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']),
});

router.patch(
  '/requests/:requestId/status',
  asyncHandler(async (req, res) => {
    const parsed = updateStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const requestId = String(req.params.requestId);
    const { status } = parsed.data;
    const db = getEaasClient();

    // Fetch the service_request to get property/user info
    const { data: serviceRequest, error: fetchError } = await db
      .from('service_requests')
      .select('id,user_id,property_id,service_title,consumption_kwh')
      .eq('id', requestId)
      .maybeSingle();
    assertNoDbError(fetchError);

    if (!serviceRequest) {
      sendError(res, 404, 'NOT_FOUND', 'Service request not found');
      return;
    }

    const now = new Date().toISOString();

    // Update the service_request status
    const { error: updateError } = await db
      .from('service_requests')
      .update({ status, updated_at: now })
      .eq('id', requestId);
    assertNoDbError(updateError);

    // When moving to in-progress, create an installations row so the provider
    // installations pipeline picks it up (if one doesn't already exist)
    if (status === 'in-progress') {
      const { data: existingInstallation } = await db
        .from('installations')
        .select('id')
        .eq('property_id', serviceRequest.property_id)
        .maybeSingle();

      if (!existingInstallation) {
        // Fetch customer name
        const { data: user } = await db
          .from('users')
          .select('name')
          .eq('id', serviceRequest.user_id)
          .maybeSingle();

        await db.from('installations').insert({
          id: randomUUID(),
          property_id: serviceRequest.property_id,
          service_title: serviceRequest.service_title || 'Energy Service',
          customer_name: user?.name || 'Unknown',
          machine_name: serviceRequest.service_title || 'Solar System',
          machine_cost: 0,
          estimated_setup_days: 30,
          status: 'SURVEY',
          created_at: now,
          updated_at: now,
        });
      }

      // Also update property subscription_status to reflect provider is working on it
      await db
        .from('properties')
        .update({ subscription_status: 'SURVEY_SUBMITTED' })
        .eq('id', serviceRequest.property_id);
    }

    sendSuccess(res, {
      requestId,
      status,
      updatedAt: now,
    });
  }),
);

export default router;
