import { Router } from 'express';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { AuthRequest, Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';
import { logAdminAction } from '../utils/audit';

const router = Router();

const adjustBillSchema = z.object({
  usageCharge: z.number().nonnegative().optional(),
  subscriptionFee: z.number().nonnegative().optional(),
  taxes: z.number().nonnegative().optional(),
  status: z.enum(['pending', 'paid']).optional(),
  note: z.string().max(500).optional(),
});

router.get(
  '/current/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();
    const { data: bill, error } = await db
      .from('bills')
      .select('*')
      .eq('property_id', propertyId)
      .order('generated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    assertNoDbError(error);

    if (!bill) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, {
      billId: bill.id,
      propertyId: bill.property_id,
      month: bill.month,
      totalAmount: bill.total_amount,
      subscriptionFee: bill.subscription_fee,
      usageCharge: bill.usage_charge,
      taxes: bill.taxes,
      status: bill.status,
      dueDate: bill.due_date,
      generatedAt: bill.generated_at,
    });
  }),
);

router.get(
  '/history/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const limit = Number(req.query.limit || 12);
    const offset = Number(req.query.offset || 0);
    const db = getEaasClient();

    const [billsResult, totalResult] = await Promise.all([
      db
        .from('bills')
        .select('*')
        .eq('property_id', propertyId)
        .order('generated_at', { ascending: false })
        .range(offset, offset + Math.max(limit - 1, 0)),
      db.from('bills').select('*', { count: 'exact', head: true }).eq('property_id', propertyId),
    ]);
    assertNoDbError(billsResult.error);
    assertNoDbError(totalResult.error);

    const bills = billsResult.data || [];
    const total = totalResult.count || 0;

    sendSuccess(res, {
      bills: bills.map((bill: any) => ({
        billId: bill.id,
        month: bill.month,
        totalAmount: bill.total_amount,
        subscriptionFee: bill.subscription_fee,
        usageCharge: bill.usage_charge,
        taxes: bill.taxes,
        status: bill.status,
        dueDate: bill.due_date,
        paidDate: bill.paid_date,
        pdfUrl: bill.pdf_url,
      })),
      total,
    });
  }),
);

router.get(
  '/download/:billId',
  authenticate,
  asyncHandler(async (req, res) => {
    const db = getEaasClient();
    const { data: bill, error } = await db.from('bills').select('*').eq('id', String(req.params.billId)).maybeSingle();
    assertNoDbError(error);

    if (!bill) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const content = `Bill ID: ${bill.id}\nMonth: ${bill.month}\nTotal: ₹${bill.total_amount}\nStatus: ${bill.status}`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${bill.id}.pdf"`);
    res.send(Buffer.from(content));
  }),
);

router.get(
  '/admin/all',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const db = getEaasClient();

    const { data: bills, error } = await db
      .from('bills')
      .select('*')
      .order('generated_at', { ascending: false })
      .range(offset, offset + Math.max(limit - 1, 0));
    assertNoDbError(error);

    sendSuccess(res, {
      bills: (bills || []).map((bill: any) => ({
        billId: bill.id,
        propertyId: bill.property_id,
        month: bill.month,
        totalAmount: bill.total_amount,
        subscriptionFee: bill.subscription_fee,
        usageCharge: bill.usage_charge,
        taxes: bill.taxes,
        status: bill.status,
        dueDate: bill.due_date,
        generatedAt: bill.generated_at,
      })),
    });
  }),
);

router.patch(
  '/admin/:billId/adjust',
  authenticate,
  requireRole(Role.ADMIN),
  asyncHandler(async (req, res) => {
    const parsed = adjustBillSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const billId = String(req.params.billId);
    const db = getEaasClient();
    const { data: currentBill, error: currentBillError } = await db.from('bills').select('*').eq('id', billId).maybeSingle();
    assertNoDbError(currentBillError);

    if (!currentBill) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const usageCharge = parsed.data.usageCharge ?? currentBill.usage_charge;
    const subscriptionFee = parsed.data.subscriptionFee ?? currentBill.subscription_fee;
    const taxes = parsed.data.taxes ?? currentBill.taxes;
    const totalAmount = Number((usageCharge + subscriptionFee + taxes).toFixed(2));

    const { data: updatedBill, error: updateError } = await db
      .from('bills')
      .update({
        usage_charge: usageCharge,
        subscription_fee: subscriptionFee,
        taxes,
        total_amount: totalAmount,
        status: parsed.data.status ?? currentBill.status,
      })
      .eq('id', billId)
      .select('*')
      .maybeSingle();
    assertNoDbError(updateError);

    if (!updatedBill) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    await logAdminAction(authReq, {
      action: 'bill.adjusted',
      entityType: 'bill',
      entityId: billId,
      metadata: {
        usageCharge,
        subscriptionFee,
        taxes,
        totalAmount,
        status: parsed.data.status ?? currentBill.status,
        note: parsed.data.note || null,
      },
    });

    sendSuccess(
      res,
      {
        billId: updatedBill.id,
        totalAmount: updatedBill.total_amount,
        subscriptionFee: updatedBill.subscription_fee,
        usageCharge: updatedBill.usage_charge,
        taxes: updatedBill.taxes,
        status: updatedBill.status,
      },
      'Bill adjusted successfully',
    );
  }),
);

export default router;
