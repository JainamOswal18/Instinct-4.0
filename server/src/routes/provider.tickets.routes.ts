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

const updateTicketSchema = z.object({
  status: z.enum(['open', 'awaiting_approval', 'in_progress', 'resolved', 'closed']).optional(),
  providerNotes: z.string().optional(),
});

const approveTicketSchema = z.object({
  approvalAction: z.enum(['credit', 'refund', 'dispatch_tech', 'none']),
  providerNotes: z.string().optional(),
});

const resolveTicketSchema = z.object({
  providerNotes: z.string().min(1),
  approvalAction: z.enum(['credit', 'refund', 'dispatch_tech', 'none']).default('none'),
});

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

function calculateSlaDeadline(ticket: any): string {
  const createdAt = new Date(ticket.created_at).getTime();
  const hours = ticket.priority === 'high' ? 24 : ticket.priority === 'medium' ? 48 : 72;
  return new Date(createdAt + hours * 60 * 60 * 1000).toISOString();
}

async function ensureSlaBreachAlert(ticket: any) {
  if (ticket.status === 'resolved' || ticket.status === 'closed') return;
  const slaDeadline = new Date(calculateSlaDeadline(ticket)).getTime();
  if (Date.now() <= slaDeadline) return;

  const db = getEaasClient();
  const { data: existing, error: existingError } = await db
    .from('provider_alerts')
    .select('id')
    .eq('type', 'sla_breach')
    .eq('related_id', ticket.id)
    .maybeSingle();
  assertNoDbError(existingError);
  if (existing) return;

  const { error: insertError } = await db.from('provider_alerts').insert({
    id: randomUUID(),
    type: 'sla_breach',
    severity: ticket.priority === 'high' ? 'critical' : 'warning',
    title: `SLA Breach — ${ticket.title}`,
    message: `Ticket ${ticket.id} exceeded SLA for ${ticket.priority} priority.`,
    related_id: ticket.id,
    dismissed: false,
    created_at: new Date().toISOString(),
  });
  assertNoDbError(insertError);
}

router.get(
  '/tickets',
  asyncHandler(async (req, res) => {
    const status = req.query.status ? String(req.query.status) : undefined;
    const priority = req.query.priority ? String(req.query.priority) : undefined;
    const category = req.query.category ? String(req.query.category) : undefined;
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const db = getEaasClient();
    let query = db.from('support_tickets').select('*').order('created_at', { ascending: false }).range(from, to);
    if (status) query = query.eq('status', status);
    if (priority) query = query.eq('priority', priority);
    if (category) query = query.eq('category', category);

    const { data: tickets, error } = await query;
    assertNoDbError(error);

    for (const ticket of tickets || []) {
      await ensureSlaBreachAlert(ticket);
    }

    const userIds = [...new Set((tickets || []).map((item: any) => item.user_id))];
    const { data: users, error: usersError } = userIds.length
      ? await db.from('users').select('id,name,email').in('id', userIds)
      : { data: [], error: null };
    assertNoDbError(usersError as any);

    const userById = new Map<string, any>();
    for (const user of users || []) userById.set(user.id, user);

    const { data: allStatuses, error: statsError } = await db.from('support_tickets').select('status');
    assertNoDbError(statsError);
    const stats: Record<string, number> = { open: 0, awaiting_approval: 0, in_progress: 0, resolved: 0, closed: 0 };
    for (const row of allStatuses || []) {
      if (stats[row.status] !== undefined) stats[row.status] += 1;
    }

    sendSuccess(res, {
      tickets: (tickets || []).map((ticket: any) => {
        const user = userById.get(ticket.user_id);
        return {
          id: ticket.id,
          customerName: user?.name || 'Unknown',
          customerEmail: user?.email || '',
          category: ticket.category,
          priority: ticket.priority,
          subject: ticket.title,
          description: ticket.description,
          status: ticket.status,
          providerNotes: ticket.provider_notes,
          createdAt: ticket.created_at,
          updatedAt: ticket.updated_at,
          slaDeadline: calculateSlaDeadline(ticket),
        };
      }),
      stats,
      total: tickets?.length || 0,
    });
  }),
);

router.get(
  '/tickets/:ticketId',
  asyncHandler(async (req, res) => {
    const ticketId = String(req.params.ticketId);
    const db = getEaasClient();
    const { data: ticket, error } = await db.from('support_tickets').select('*').eq('id', ticketId).maybeSingle();
    assertNoDbError(error);

    if (!ticket) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    await ensureSlaBreachAlert(ticket);

    const [{ data: user, error: userError }, { data: property, error: propertyError }] = await Promise.all([
      db.from('users').select('id,name,email,phone').eq('id', ticket.user_id).maybeSingle(),
      db.from('properties').select('id,name,address,type,plan_type').eq('id', ticket.property_id).maybeSingle(),
    ]);
    assertNoDbError(userError);
    assertNoDbError(propertyError);

    sendSuccess(res, {
      ticket: {
        id: ticket.id,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        subject: ticket.title,
        description: ticket.description,
        providerNotes: ticket.provider_notes,
        approvalAction: ticket.approval_action,
        resolvedAt: ticket.resolved_at,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
        slaDeadline: calculateSlaDeadline(ticket),
      },
      customer: user,
      property,
      resolutionHistory: [
        {
          status: ticket.status,
          providerNotes: ticket.provider_notes,
          updatedAt: ticket.updated_at,
        },
      ],
    });
  }),
);

router.patch(
  '/tickets/:ticketId',
  asyncHandler(async (req, res) => {
    const parsed = updateTicketSchema.safeParse(req.body);
    if (!parsed.success || (parsed.data.status === undefined && parsed.data.providerNotes === undefined)) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.success ? undefined : parsed.error.flatten().fieldErrors);
      return;
    }

    const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (parsed.data.status !== undefined) payload.status = parsed.data.status;
    if (parsed.data.providerNotes !== undefined) payload.provider_notes = parsed.data.providerNotes;

    const db = getEaasClient();
    const { data: ticket, error } = await db.from('support_tickets').update(payload).eq('id', String(req.params.ticketId)).select('*').maybeSingle();
    assertNoDbError(error);
    if (!ticket) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, {
      id: ticket.id,
      status: ticket.status,
      updatedAt: ticket.updated_at,
    });
  }),
);

router.post(
  '/tickets/:ticketId/approve',
  asyncHandler(async (req, res) => {
    const parsed = approveTicketSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const ticketId = String(req.params.ticketId);
    const db = getEaasClient();
    const { data: ticket, error } = await db
      .from('support_tickets')
      .update({
        approval_action: parsed.data.approvalAction,
        provider_notes: parsed.data.providerNotes || null,
        status: 'in_progress',
        updated_at: new Date().toISOString(),
      })
      .eq('id', ticketId)
      .select('*')
      .maybeSingle();
    assertNoDbError(error);

    if (!ticket) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const { error: notificationError } = await db.from('notifications').insert({
      id: randomUUID(),
      user_id: ticket.user_id,
      type: 'ticket_update',
      title: 'Ticket Update',
      message: `Your ticket ${ticket.title} is in progress.`,
      route: '/support',
      read: false,
      dismissible: true,
      persistent: false,
      created_at: new Date().toISOString(),
    });
    assertNoDbError(notificationError);

    sendSuccess(res, {
      ticketId: ticket.id,
      status: ticket.status,
      approvalAction: ticket.approval_action,
      notificationSent: true,
    });
  }),
);

router.post(
  '/tickets/:ticketId/resolve',
  asyncHandler(async (req, res) => {
    const parsed = resolveTicketSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const db = getEaasClient();
    const now = new Date().toISOString();
    const { data: ticket, error } = await db
      .from('support_tickets')
      .update({
        status: 'resolved',
        provider_notes: parsed.data.providerNotes,
        approval_action: parsed.data.approvalAction,
        resolved_at: now,
        updated_at: now,
      })
      .eq('id', String(req.params.ticketId))
      .select('*')
      .maybeSingle();
    assertNoDbError(error);

    if (!ticket) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, {
      ticketId: ticket.id,
      status: ticket.status,
      resolvedAt: ticket.resolved_at,
    });
  }),
);

export default router;
