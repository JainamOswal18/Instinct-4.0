import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const ticketSchema = z.object({
  propertyId: z.string().min(1),
  category: z.enum(['technical', 'billing', 'installation', 'general']),
  priority: z.enum(['low', 'medium', 'high']),
  title: z.string().min(3),
  description: z.string().min(10),
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

export default router;
