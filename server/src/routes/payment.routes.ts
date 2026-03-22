import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const initiateSchema = z.object({
  propertyId: z.string().min(1),
  proposalId: z.string().optional(),
  paymentMethod: z.enum(['UPI', 'Card', 'NetBanking']),
  amount: z.number().positive(),
  currency: z.string().default('INR'),
});

const verifySchema = z.object({
  paymentId: z.string().min(1),
  orderId: z.string().min(1),
  signature: z.string().min(1),
});

router.post(
  '/initiate',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = initiateSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const orderId = `order_${Date.now()}`;
    const db = getEaasClient();
    const { data: payment, error: paymentError } = await db
      .from('payments')
      .insert({
        id: randomUUID(),
        property_id: parsed.data.propertyId,
        proposal_id: parsed.data.proposalId || null,
        payment_method: parsed.data.paymentMethod,
        amount: parsed.data.amount,
        currency: parsed.data.currency,
        order_id: orderId,
        description: 'First month payment + Security deposit',
        payment_gateway_url: `https://razorpay.com/checkout/${orderId}`,
      })
      .select('*')
      .single();
    assertNoDbError(paymentError);

    const { error: propertyError } = await db
      .from('properties')
      .update({ subscription_status: 'PAYMENT_PENDING' })
      .eq('id', parsed.data.propertyId);
    assertNoDbError(propertyError);

    sendSuccess(res, {
      paymentId: payment.id,
      orderId: payment.order_id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      paymentGatewayUrl: payment.payment_gateway_url,
      createdAt: payment.created_at,
    });
  }),
);

router.post(
  '/verify',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = verifySchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const db = getEaasClient();
    const { data: payment, error: paymentFetchError } = await db
      .from('payments')
      .select('*')
      .eq('id', parsed.data.paymentId)
      .eq('order_id', parsed.data.orderId)
      .maybeSingle();
    assertNoDbError(paymentFetchError);

    if (!payment) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const { data: updated, error: updateError } = await db
      .from('payments')
      .update({
        signature: parsed.data.signature,
        status: 'SUCCESS',
        transaction_id: `TXN${Date.now()}`,
        paid_at: new Date().toISOString(),
      })
      .eq('id', payment.id)
      .select('*')
      .single();
    assertNoDbError(updateError);

    const { error: propertyStatusError } = await db
      .from('properties')
      .update({ subscription_status: 'PENDING_INSTALLATION' })
      .eq('id', updated.property_id);
    assertNoDbError(propertyStatusError);

    const { data: installation, error: installationFetchError } = await db
      .from('installation_progress')
      .select('id')
      .eq('property_id', updated.property_id)
      .maybeSingle();
    assertNoDbError(installationFetchError);

    if (installation) {
      const { error: installationUpdateError } = await db
        .from('installation_progress')
        .update({ payment_confirmed: true, payment_confirmed_at: new Date().toISOString() })
        .eq('id', installation.id);
      assertNoDbError(installationUpdateError);
    } else {
      const { error: installationCreateError } = await db.from('installation_progress').insert({
        id: randomUUID(),
        property_id: updated.property_id,
        payment_confirmed: true,
        payment_confirmed_at: new Date().toISOString(),
      });
      assertNoDbError(installationCreateError);
    }

    // Create an installations row so the provider web app can see this in the pipeline
    const { data: existingInstallation } = await db
      .from('installations')
      .select('id')
      .eq('property_id', updated.property_id)
      .maybeSingle();

    if (!existingInstallation) {
      // Fetch property + user info to populate the installations row
      const { data: property } = await db
        .from('properties')
        .select('user_id, name')
        .eq('id', updated.property_id)
        .maybeSingle();

      const { data: user } = property?.user_id
        ? await db.from('users').select('name').eq('id', property.user_id).maybeSingle()
        : { data: null };

      // Find the service request to get service title
      const { data: serviceRequest } = await db
        .from('service_requests')
        .select('service_title, consumption_kwh')
        .eq('property_id', updated.property_id)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const now = new Date().toISOString();
      await db.from('installations').insert({
        id: randomUUID(),
        property_id: updated.property_id,
        service_title: serviceRequest?.service_title ?? 'Energy Service',
        customer_name: user?.name ?? 'Customer',
        machine_name: serviceRequest?.service_title ?? 'Solar System',
        machine_cost: updated.amount ?? 0,
        estimated_setup_days: 30,
        status: 'APPROVAL',
        created_at: now,
        updated_at: now,
      });
      console.log('[payment/verify] installations row created for property', updated.property_id);
    }

    sendSuccess(res, {
      paymentId: updated.id,
      transactionId: updated.transaction_id,
      status: updated.status,
      amount: updated.amount,
      paidAt: updated.paid_at,
    });
  }),
);

router.get(
  '/history',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.query.propertyId || '');
    if (!propertyId) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', { propertyId: 'Required' });
      return;
    }

    const db = getEaasClient();
    const { data: payments, error } = await db
      .from('payments')
      .select('id,transaction_id,amount,payment_method,status,description,paid_at,property_id,created_at')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false });
    assertNoDbError(error);

    sendSuccess(res, {
      payments: (payments || []).map((payment) => ({
        paymentId: payment.id,
        transactionId: payment.transaction_id,
        amount: payment.amount,
        paymentMethod: payment.payment_method,
        status: payment.status,
        description: payment.description,
        paidAt: payment.paid_at,
      })),
    });
  }),
);

export default router;
