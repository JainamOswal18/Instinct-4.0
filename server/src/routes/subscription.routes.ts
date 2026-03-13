import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const generateProposalSchema = z.object({
  propertyId: z.string().min(1),
  surveyId: z.string().min(1),
});

router.post(
  '/generate-proposal',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = generateProposalSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const db = getEaasClient();
    const { data: survey, error: surveyError } = await db
      .from('surveys')
      .select('id,monthly_consumption,monthly_bill')
      .eq('id', parsed.data.surveyId)
      .maybeSingle();
    assertNoDbError(surveyError);

    if (!survey) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const solarCapacity = Number((survey.monthly_consumption / 35).toFixed(1));
    const batteryStorage = Math.max(2, Number((solarCapacity * 0.5).toFixed(1)));
    const monthlyFee = Math.round(solarCapacity * 350);
    const estimatedSavings = Math.round(survey.monthly_bill * 0.35);
    const estimatedProduction = Math.round(solarCapacity * 120);

    const { data: proposal, error: proposalError } = await db
      .from('proposals')
      .insert({
        id: randomUUID(),
        property_id: parsed.data.propertyId,
        survey_id: parsed.data.surveyId,
        solar_capacity: solarCapacity,
        battery_storage: batteryStorage,
        monthly_fee: monthlyFee,
        estimated_savings: estimatedSavings,
        estimated_production: estimatedProduction,
        contract_duration: 24,
        installation_fee: 0,
        security_deposit: 5000,
        whats_included: [
          `${solarCapacity} kW Solar Panel System`,
          `${batteryStorage} kWh Battery Storage`,
          'Smart Energy Monitoring Dashboard',
          'Grid Integration & Net Metering',
          'Professional Installation',
          '24-month Maintenance & Support',
          'Performance Guarantee',
          'Mobile App Access',
        ],
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select('*')
      .single();
    assertNoDbError(proposalError);

    const { error: propertyError } = await db
      .from('properties')
      .update({ subscription_status: 'PLAN_PROPOSED' })
      .eq('id', parsed.data.propertyId);
    assertNoDbError(propertyError);

    sendSuccess(res, {
      proposalId: proposal.id,
      solarCapacity: proposal.solar_capacity,
      batteryStorage: proposal.battery_storage,
      monthlyFee: proposal.monthly_fee,
      estimatedSavings: proposal.estimated_savings,
      estimatedProduction: proposal.estimated_production,
      contractDuration: proposal.contract_duration,
      installationFee: proposal.installation_fee,
      securityDeposit: proposal.security_deposit,
      whatsIncluded: proposal.whats_included,
      generatedAt: proposal.generated_at,
    });
  }),
);

router.get(
  '/proposal/:proposalId',
  authenticate,
  asyncHandler(async (req, res) => {
    const db = getEaasClient();
    const { data: proposal, error } = await db
      .from('proposals')
      .select('*')
      .eq('id', String(req.params.proposalId))
      .maybeSingle();
    assertNoDbError(error);

    if (!proposal) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, {
      proposalId: proposal.id,
      solarCapacity: proposal.solar_capacity,
      batteryStorage: proposal.battery_storage,
      monthlyFee: proposal.monthly_fee,
      estimatedSavings: proposal.estimated_savings,
      estimatedProduction: proposal.estimated_production,
      contractDuration: proposal.contract_duration,
      installationFee: proposal.installation_fee,
      securityDeposit: proposal.security_deposit,
      whatsIncluded: proposal.whats_included,
      generatedAt: proposal.generated_at,
      expiresAt: proposal.expires_at,
    });
  }),
);

export default router;
