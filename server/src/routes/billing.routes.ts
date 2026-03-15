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

function escapePdfText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function formatInvoiceAmount(amount: unknown): string {
  return `INR ${Number(amount || 0).toFixed(2)}`;
}

function formatInvoiceDate(date: string | null | undefined): string {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildStyledInvoicePdf(payload: {
  bill: any;
  propertyName?: string | null;
  propertyAddress?: string | null;
  customerName?: string | null;
  customerEmail?: string | null;
}): Buffer {
  const { bill, propertyName, propertyAddress, customerName, customerEmail } = payload;
  const status = String(bill.status || 'pending').toLowerCase();
  const statusColor = status === 'paid' ? '0.16 0.58 0.20' : '0.76 0.48 0.10';

  const line = (x1: number, y1: number, x2: number, y2: number) => `${x1} ${y1} m ${x2} ${y2} l S`;
  const text = (x: number, y: number, value: string, size = 11, bold = false) =>
    `BT /${bold ? 'F2' : 'F1'} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;

  const contentCommands = [
    '0.08 0.14 0.27 rg',
    '36 736 540 40 re f',
    '1 1 1 rg',
    text(50, 751, 'EaaS NEXUS · TAX INVOICE', 14, true),
    text(430, 751, String(bill.month || '-'), 11, true),

    '0.15 0.15 0.15 rg',
    text(50, 712, `Invoice ID: ${bill.id}`, 11, true),
    text(50, 694, `Generated: ${formatInvoiceDate(bill.generated_at)}`),
    text(50, 676, `Due Date: ${formatInvoiceDate(bill.due_date)}`),

    text(310, 712, `Status: ${String(bill.status || 'pending').toUpperCase()}`, 11, true),
    `${statusColor} rg`,
    '306 704 220 2 re f',

    '0.35 0.35 0.35 RG',
    '0.8 w',
    line(36, 658, 576, 658),

    '0.2 0.2 0.2 rg',
    text(50, 638, 'Bill To', 11, true),
    text(50, 620, customerName || 'Customer'),
    text(50, 603, customerEmail || '-'),

    text(310, 638, 'Property', 11, true),
    text(310, 620, propertyName || String(bill.property_id || '-')),
    text(310, 603, propertyAddress || '-'),

    '0.35 0.35 0.35 RG',
    line(36, 580, 576, 580),

    '0.08 0.14 0.27 rg',
    text(50, 560, 'Charge Breakdown', 11, true),
    '0.2 0.2 0.2 rg',

    text(50, 536, 'Usage Charge'),
    text(470, 536, formatInvoiceAmount(bill.usage_charge), 11, true),
    text(50, 516, 'Subscription Fee'),
    text(470, 516, formatInvoiceAmount(bill.subscription_fee), 11, true),
    text(50, 496, 'Taxes'),
    text(470, 496, formatInvoiceAmount(bill.taxes), 11, true),

    '0.35 0.35 0.35 RG',
    line(36, 478, 576, 478),

    '0.08 0.14 0.27 rg',
    text(50, 456, 'Total Amount Due', 12, true),
    text(450, 456, formatInvoiceAmount(bill.total_amount), 14, true),

    '0.6 0.6 0.6 RG',
    line(36, 120, 576, 120),
    '0.35 0.35 0.35 rg',
    text(50, 98, 'This is a system-generated invoice from EaaS Nexus.'),
    text(50, 82, 'For support queries, please contact support via the app help center.'),
  ];

  const contentStream = contentCommands.join('\n');

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    `<< /Length ${Buffer.byteLength(contentStream, 'utf8')} >>\nstream\n${contentStream}\nendstream`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefStart = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';

  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.from(pdf, 'utf8');
}

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

    const { data: property, error: propertyError } = await db
      .from('properties')
      .select('id,name,address,user_id')
      .eq('id', String(bill.property_id))
      .maybeSingle();
    assertNoDbError(propertyError);

    const { data: customer, error: customerError } = property?.user_id
      ? await db.from('users').select('id,name,email').eq('id', String(property.user_id)).maybeSingle()
      : { data: null, error: null as any };
    assertNoDbError(customerError as any);

    const pdfBuffer = buildStyledInvoicePdf({
      bill,
      propertyName: property?.name || null,
      propertyAddress: property?.address || null,
      customerName: (customer as any)?.name || null,
      customerEmail: (customer as any)?.email || null,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${bill.id}.pdf"`);
    res.setHeader('Content-Length', String(pdfBuffer.length));
    res.send(pdfBuffer);
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

    const billList = bills || [];
    const propertyIds = Array.from(new Set(billList.map((bill: any) => bill.property_id).filter(Boolean)));
    const { data: properties, error: propertiesError } =
      propertyIds.length > 0
        ? await db.from('properties').select('id,user_id,name,address').in('id', propertyIds)
        : { data: [], error: null as any };
    assertNoDbError(propertiesError as any);

    const userIds = Array.from(new Set((properties || []).map((property: any) => property.user_id).filter(Boolean)));
    const { data: users, error: usersError } =
      userIds.length > 0 ? await db.from('users').select('id,name,email').in('id', userIds) : { data: [], error: null as any };
    assertNoDbError(usersError as any);

    const propertyMap = new Map((properties || []).map((property: any) => [property.id, property]));
    const userMap = new Map((users || []).map((user: any) => [user.id, user]));

    sendSuccess(res, {
      bills: billList.map((bill: any) => {
        const property = propertyMap.get(bill.property_id);
        const customer = property ? userMap.get(property.user_id) : null;

        return {
          billId: bill.id,
          propertyId: bill.property_id,
          propertyName: property?.name || null,
          propertyAddress: property?.address || null,
          customerId: property?.user_id || null,
          customerName: customer?.name || null,
          customerEmail: customer?.email || null,
          month: bill.month,
          totalAmount: bill.total_amount,
          subscriptionFee: bill.subscription_fee,
          usageCharge: bill.usage_charge,
          taxes: bill.taxes,
          status: bill.status,
          dueDate: bill.due_date,
          paidDate: bill.paid_date,
          generatedAt: bill.generated_at,
          pdfUrl: bill.pdf_url,
        };
      }),
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
