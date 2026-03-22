import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const submitSurveySchema = z.object({
  propertyId: z.string().min(1),
  propertyType: z.enum(['residential', 'commercial']),
  monthlyBill: z.number().positive(),
  monthlyConsumption: z.number().positive(),
  peakHours: z.string().min(1),
  occupants: z.number().int().positive(),
  appliances: z.array(z.string()).default([]),
});

router.post(
  '/submit',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = submitSurveySchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data: property, error: propertyError } = await db
      .from('properties')
      .select('id')
      .eq('id', parsed.data.propertyId)
      .maybeSingle();
    assertNoDbError(propertyError);

    if (!property) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const { data: survey, error: surveyError } = await db
      .from('surveys')
      .insert({
        id: randomUUID(),
        property_id: parsed.data.propertyId,
        property_type: parsed.data.propertyType,
        monthly_bill: parsed.data.monthlyBill,
        monthly_consumption: parsed.data.monthlyConsumption,
        peak_hours: parsed.data.peakHours,
        occupants: parsed.data.occupants,
        appliances: parsed.data.appliances,
      })
      .select('id,submitted_at,status')
      .single();
    assertNoDbError(surveyError);

    if (!survey) {
      throw new Error('Failed to persist survey');
    }

    const { error: updateError } = await db
      .from('properties')
      .update({ subscription_status: 'SURVEY_SUBMITTED' })
      .eq('id', parsed.data.propertyId);
    assertNoDbError(updateError);

    // Also insert into service_requests so the provider dashboard (GET /provider/requests)
    // can see this survey — that endpoint queries service_requests, not surveys.
    // Fetch a real service_id from energy_services (the same table the web app uses)
    // so the NOT NULL constraint is satisfied with a valid value.
    const { data: energyService } = await db
      .from('energy_services')
      .select('id,title')
      .eq('active', true)
      .order('title', { ascending: true })
      .limit(1)
      .maybeSingle();

    const { error: serviceRequestError } = await db
      .from('service_requests')
      .insert({
        id: survey.id, // reuse survey ID so PATCH /provider/requests/:id/status works on both
        user_id: authReq.user?.userId,
        property_id: parsed.data.propertyId,
        service_id: energyService?.id ?? 'energy_survey',
        service_title: energyService?.title ?? 'Energy Survey',
        consumption_kwh: parsed.data.monthlyConsumption,
        area_description: `${parsed.data.propertyType} property, ${parsed.data.occupants} occupants`,
        status: 'pending',
        updated_at: new Date().toISOString(),
      });
    if (serviceRequestError) {
      console.warn('[survey/submit] service_requests insert failed:', serviceRequestError.message);
    }

    // Fetch user name for the alert message
    const { data: user } = await db
      .from('users')
      .select('name')
      .eq('id', authReq.user!.userId)
      .maybeSingle();

    // Insert provider_alerts so provider sees a notification (mirrors what /services/requests does)
    const { error: alertError } = await db.from('provider_alerts').insert({
      id: randomUUID(),
      type: 'new_request',
      severity: 'info',
      title: `New survey from ${user?.name || 'Customer'}`,
      message: `${user?.name || 'A customer'} submitted an Energy Survey for provider review.`,
      related_id: survey.id,
      dismissed: false,
      created_at: new Date().toISOString(),
    });
    if (alertError) {
      console.warn('[survey/submit] provider_alerts insert failed:', alertError.message);
    }

    sendSuccess(res, {
      surveyId: survey.id,
      submittedAt: survey.submitted_at,
      status: survey.status,
    });
  }),
);

export default router;
