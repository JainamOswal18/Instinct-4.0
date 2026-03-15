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

const ticketSchema = z.object({
  propertyId: z.string().min(1),
  category: z.enum(['technical', 'billing', 'installation', 'general']),
  priority: z.enum(['low', 'medium', 'high']),
  title: z.string().min(3),
  description: z.string().min(10),
});

const adminTicketUpdateSchema = z.object({
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

router.post(
  '/ticket',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = ticketSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data: ticket, error } = await db
      .from('support_tickets')
      .insert({
        id: randomUUID(),
        user_id: authReq.user!.userId,
        property_id: parsed.data.propertyId,
        category: parsed.data.category,
        priority: parsed.data.priority,
        title: parsed.data.title,
        description: parsed.data.description,
        estimated_response: 'within 24 hours',
      })
      .select('*')
      .single();
    assertNoDbError(error);

    sendSuccess(
      res,
      {
        ticketId: ticket.id,
        status: ticket.status,
        createdAt: ticket.created_at,
        estimatedResponse: ticket.estimated_response,
      },
      undefined,
      201,
    );
  }),
);

router.get(
  '/tickets',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data: tickets, error } = await db
      .from('support_tickets')
      .select('*')
      .eq('user_id', authReq.user!.userId)
      .order('updated_at', { ascending: false });
    assertNoDbError(error);

    sendSuccess(res, {
      tickets: (tickets || []).map((ticket: any) => ({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status === 'in_progress' ? 'in-progress' : ticket.status,
        priority: ticket.priority,
        category: ticket.category,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
        responses: 0,
      })),
    });
  }),
);

router.get(
  '/admin/tickets',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const status = String(req.query.status || '').trim().toLowerCase();

    const db = getEaasClient();
    let query = db.from('support_tickets').select('*').order('updated_at', { ascending: false }).range(offset, offset + Math.max(limit - 1, 0));

    if (status) {
      query = query.eq('status', status);
    }

    const { data: tickets, error } = await query;
    assertNoDbError(error);

    sendSuccess(res, {
      tickets: (tickets || []).map((ticket: any) => ({
        id: ticket.id,
        userId: ticket.user_id,
        propertyId: ticket.property_id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        category: ticket.category,
        estimatedResponse: ticket.estimated_response,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
      })),
    });
  }),
);

router.patch(
  '/admin/tickets/:ticketId',
  authenticate,
  requireRole(Role.ADMIN),
  asyncHandler(async (req, res) => {
    const parsed = adminTicketUpdateSchema.safeParse(req.body);
    if (!parsed.success || (parsed.data.status === undefined && parsed.data.priority === undefined)) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.success ? undefined : parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const ticketId = String(req.params.ticketId);
    const db = getEaasClient();
    const updatePayload: Record<string, string> = {};
    if (parsed.data.status !== undefined) updatePayload.status = parsed.data.status;
    if (parsed.data.priority !== undefined) updatePayload.priority = parsed.data.priority;

    const { data: updated, error } = await db
      .from('support_tickets')
      .update(updatePayload)
      .eq('id', ticketId)
      .select('*')
      .maybeSingle();
    assertNoDbError(error);

    if (!updated) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    await logAdminAction(authReq, {
      action: 'support_ticket.updated',
      entityType: 'support_ticket',
      entityId: ticketId,
      metadata: updatePayload,
    });

    sendSuccess(
      res,
      {
        id: updated.id,
        status: updated.status,
        priority: updated.priority,
        updatedAt: updated.updated_at,
      },
      'Ticket updated successfully',
    );
  }),
);

export default router;
