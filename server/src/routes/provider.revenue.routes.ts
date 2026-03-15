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

const reminderSchema = z.object({
  customerId: z.string().min(1),
  billId: z.string().min(1),
  message: z.string().min(1),
});

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

router.get(
  '/revenue/overview',
  asyncHandler(async (_req, res) => {
    const db = getEaasClient();
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();

    const { data: bills, error } = await db.from('bills').select('total_amount,status,due_date,paid_date,generated_at').gte('generated_at', monthStart);
    assertNoDbError(error);

    const rows = bills || [];
    const totalMRR = rows.reduce((acc: number, item: any) => acc + Number(item.total_amount || 0), 0);
    const paidThisMonth = rows
      .filter((item: any) => item.status === 'paid')
      .reduce((acc: number, item: any) => acc + Number(item.total_amount || 0), 0);
    const overdue = rows.filter((item: any) => item.status === 'pending' && new Date(item.due_date).getTime() < Date.now());
    const totalOutstanding = rows
      .filter((item: any) => item.status === 'pending')
      .reduce((acc: number, item: any) => acc + Number(item.total_amount || 0), 0);

    sendSuccess(res, {
      totalMRR: Number(totalMRR.toFixed(2)),
      totalOutstanding: Number(totalOutstanding.toFixed(2)),
      paidThisMonth: Number(paidThisMonth.toFixed(2)),
      overdueCount: overdue.length,
      collectionRate: totalMRR > 0 ? Number(((paidThisMonth / totalMRR) * 100).toFixed(2)) : 0,
    });
  }),
);

router.get(
  '/revenue/payments',
  asyncHandler(async (req, res) => {
    const status = req.query.status ? String(req.query.status) : undefined;
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const db = getEaasClient();
    const { data: bills, error } = await db
      .from('bills')
      .select('*')
      .order('generated_at', { ascending: false })
      .range(from, to);
    assertNoDbError(error);

    const propertyIds = (bills || []).map((item: any) => item.property_id);
    const { data: properties, error: propertiesError } = propertyIds.length
      ? await db.from('properties').select('id,user_id').in('id', propertyIds)
      : { data: [], error: null };
    assertNoDbError(propertiesError as any);

    const userIds = [...new Set((properties || []).map((item: any) => item.user_id))];
    const { data: users, error: usersError } = userIds.length
      ? await db.from('users').select('id,name,email').in('id', userIds)
      : { data: [], error: null };
    assertNoDbError(usersError as any);

    const propertyById = new Map<string, any>();
    for (const property of properties || []) propertyById.set(property.id, property);
    const userById = new Map<string, any>();
    for (const user of users || []) userById.set(user.id, user);

    const now = Date.now();
    const payments = (bills || [])
      .map((bill: any) => {
        const property = propertyById.get(bill.property_id);
        const user = property ? userById.get(property.user_id) : null;
        const computedStatus = bill.status === 'pending' && new Date(bill.due_date).getTime() < now ? 'overdue' : bill.status;
        return {
          customerId: property?.user_id || null,
          customerName: user?.name || 'Unknown',
          propertyId: bill.property_id,
          billId: bill.id,
          month: bill.month,
          amount: bill.total_amount,
          status: computedStatus,
          dueDate: String(bill.due_date).slice(0, 10),
          paidDate: bill.paid_date ? String(bill.paid_date).slice(0, 10) : null,
        };
      })
      .filter((item) => (status ? item.status === status : true));

    sendSuccess(res, {
      payments,
      total: payments.length,
    });
  }),
);

router.post(
  '/revenue/remind',
  asyncHandler(async (req, res) => {
    const parsed = reminderSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const db = getEaasClient();
    const { data: user, error: userError } = await db.from('users').select('id,email').eq('id', parsed.data.customerId).maybeSingle();
    assertNoDbError(userError);

    if (!user) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const notificationId = randomUUID();
    const sentAt = new Date().toISOString();
    const { error: insertError } = await db.from('notifications').insert({
      id: notificationId,
      user_id: user.id,
      type: 'payment_reminder',
      title: 'Payment Reminder',
      message: parsed.data.message,
      route: '/billing',
      read: false,
      dismissible: true,
      persistent: false,
      created_at: sentAt,
    });
    assertNoDbError(insertError);

    sendSuccess(res, {
      notificationId,
      sentTo: user.email,
      sentAt,
    });
  }),
);

export default router;
