import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const submitSurveySchema = z.object({
  propertyId: z.string().min(1),
  propertyType: z.enum(['residential', 'commercial']),
  roofArea: z.number().positive(),
  monthlyBill: z.number().positive(),
  monthlyConsumption: z.number().positive(),
  peakHours: z.string().min(1),
  occupants: z.number().int().positive(),
  appliances: z.array(z.string()).min(1),
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
        roof_area: parsed.data.roofArea,
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

    sendSuccess(res, {
      surveyId: survey.id,
      submittedAt: survey.submitted_at,
      status: survey.status,
    });
  }),
);

export default router;
