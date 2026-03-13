import { Router } from 'express';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

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

export default router;
