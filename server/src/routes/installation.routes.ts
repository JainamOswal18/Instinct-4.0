import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const updateSchema = z.object({
  propertyId: z.string().min(1),
  step: z.enum([
    'paymentConfirmed',
    'engineerAssigned',
    'siteSurveyScheduled',
    'installationStarted',
    'systemActivated',
  ]),
  data: z.record(z.any()).optional(),
});

router.get(
  '/progress/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();
    const { data: progress, error } = await db
      .from('installation_progress')
      .select('*')
      .eq('property_id', propertyId)
      .maybeSingle();
    assertNoDbError(error);

    if (!progress) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, {
      propertyId,
      progress: {
        paymentConfirmed: progress.payment_confirmed,
        paymentConfirmedAt: progress.payment_confirmed_at,
        engineerAssigned: progress.engineer_assigned,
        engineerName: progress.engineer_name,
        engineerPhone: progress.engineer_phone,
        engineerAssignedAt: progress.engineer_assigned_at,
        siteSurveyScheduled: progress.site_survey_scheduled,
        siteSurveyDate: progress.site_survey_date,
        installationStarted: progress.installation_started,
        installationDate: progress.installation_date,
        systemActivated: progress.system_activated,
        activationDate: progress.activation_date,
        estimatedCompletion: progress.estimated_completion,
      },
    });
  }),
);

router.patch(
  '/update',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const db = getEaasClient();
    const { data: current, error: currentFetchError } = await db
      .from('installation_progress')
      .select('id')
      .eq('property_id', parsed.data.propertyId)
      .maybeSingle();
    assertNoDbError(currentFetchError);

    let currentId = current?.id;
    if (!currentId) {
      const { data: created, error: createError } = await db
        .from('installation_progress')
        .insert({ id: randomUUID(), property_id: parsed.data.propertyId })
        .select('id')
        .single();
      assertNoDbError(createError);
      if (!created) {
        throw new Error('Failed to initialize installation progress');
      }
      currentId = created.id;
    }

    const updateData: Record<string, unknown> = {};
    const now = new Date().toISOString();

    if (parsed.data.step === 'paymentConfirmed') {
      updateData.payment_confirmed = true;
      updateData.payment_confirmed_at = now;
    }
    if (parsed.data.step === 'engineerAssigned') {
      updateData.engineer_assigned = true;
      updateData.engineer_assigned_at = now;
    }
    if (parsed.data.step === 'siteSurveyScheduled') {
      updateData.site_survey_scheduled = true;
    }
    if (parsed.data.step === 'installationStarted') {
      updateData.installation_started = true;
      updateData.installation_date = now;
    }
    if (parsed.data.step === 'systemActivated') {
      updateData.system_activated = true;
      updateData.activation_date = now;
      const { error: propertyError } = await db
        .from('properties')
        .update({ subscription_status: 'ACTIVE', installation_date: now })
        .eq('id', parsed.data.propertyId);
      assertNoDbError(propertyError);
    }

    const data = parsed.data.data || {};
    Object.assign(updateData, data);

    const { error: updateError } = await db.from('installation_progress').update(updateData).eq('id', currentId);
    assertNoDbError(updateError);

    const { data: property, error: propertyFetchError } = await db
      .from('properties')
      .select('subscription_status')
      .eq('id', parsed.data.propertyId)
      .maybeSingle();
    assertNoDbError(propertyFetchError);

    sendSuccess(res, {
      message: 'Installation step updated',
      currentStatus: property?.subscription_status ?? 'PENDING_INSTALLATION',
    });
  }),
);

export default router;
