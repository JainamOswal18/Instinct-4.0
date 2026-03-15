import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { AuthRequest, Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';
import { logAdminAction } from '../utils/audit';

const router = Router();

const generateProposalSchema = z.object({
  propertyId: z.string().min(1),
  surveyId: z.string().min(1),
});

const adminSubscriptionStatusSchema = z.object({
  subscriptionStatus: z.enum([
    'NONE',
    'SURVEY_PENDING',
    'SURVEY_SUBMITTED',
    'PLAN_PROPOSED',
    'PAYMENT_PENDING',
    'PENDING_INSTALLATION',
    'ACTIVE',
  ]),
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

router.get(
  '/admin/properties',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const status = String(req.query.status || '').trim().toUpperCase();

    const db = getEaasClient();
    let query = db
      .from('properties')
      .select('id,user_id,name,address,type,subscription_status,plan_type,solar_capacity,battery_storage,installation_date,created_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + Math.max(limit - 1, 0));

    if (status) {
      query = query.eq('subscription_status', status);
    }

    const { data: properties, error } = await query;
    assertNoDbError(error);

    sendSuccess(res, {
      properties: (properties || []).map((property: any) => ({
        id: property.id,
        userId: property.user_id,
        name: property.name,
        address: property.address,
        type: property.type,
        subscriptionStatus: property.subscription_status,
        planType: property.plan_type,
        solarCapacity: property.solar_capacity,
        batteryStorage: property.battery_storage,
        installationDate: property.installation_date,
        createdAt: property.created_at,
      })),
    });
  }),
);

router.patch(
  '/admin/properties/:propertyId/subscription-status',
  authenticate,
  requireRole(Role.ADMIN),
  asyncHandler(async (req, res) => {
    const parsed = adminSubscriptionStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();
    const { data: property, error } = await db
      .from('properties')
      .update({ subscription_status: parsed.data.subscriptionStatus })
      .eq('id', propertyId)
      .select('id,subscription_status')
      .maybeSingle();
    assertNoDbError(error);

    if (!property) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    await logAdminAction(authReq, {
      action: 'property.subscription_status.updated',
      entityType: 'property',
      entityId: propertyId,
      metadata: { subscriptionStatus: parsed.data.subscriptionStatus },
    });

    sendSuccess(
      res,
      {
        propertyId: property.id,
        subscriptionStatus: property.subscription_status,
      },
      'Property subscription status updated successfully',
    );
  }),
);

export default router;
