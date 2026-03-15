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

const adminReplySchema = z.object({
  message: z.string().min(1).max(2000),
});

router.get(
  '/faqs',
  authenticate,
  asyncHandler(async (_req, res) => {
    const db = getEaasClient();
    const { data, error } = await db
      .from('support_faqs')
      .select('id,question,answer,sort_order,is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error) {
      const missingFaqTable =
        error.code === '42P01' ||
        error.code === 'PGRST204' ||
        error.code === 'PGRST205' ||
        /Could not find the table|schema cache/i.test(error.message || '');

      if (missingFaqTable) {
        sendSuccess(res, { faqs: [] });
        return;
      }
      throw new Error(error.message);
    }

    sendSuccess(res, {
      faqs: (data || []).map((item: any) => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
      })),
    });
  }),
);

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

    const { error: messageError } = await db.from('support_ticket_messages').insert({
      id: randomUUID(),
      ticket_id: ticket.id,
      user_id: authReq.user!.userId,
      message: parsed.data.description,
      message_type: 'customer',
    });
    if (messageError && messageError.code !== '42P01' && messageError.code !== 'PGRST204' && messageError.code !== 'PGRST205') {
      throw new Error(messageError.message);
    }

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

    const ticketList = tickets || [];
    const userIds = Array.from(new Set(ticketList.map((ticket: any) => ticket.user_id).filter(Boolean)));
    const propertyIds = Array.from(new Set(ticketList.map((ticket: any) => ticket.property_id).filter(Boolean)));

    const [usersResult, propertiesResult, messagesResult] = await Promise.all([
      userIds.length > 0 ? db.from('users').select('id,name,email').in('id', userIds) : Promise.resolve({ data: [], error: null }),
      propertyIds.length > 0 ? db.from('properties').select('id,name,address').in('id', propertyIds) : Promise.resolve({ data: [], error: null }),
      ticketList.length > 0
        ? db
            .from('support_ticket_messages')
            .select('ticket_id,user_id,message_type,created_at')
            .in('ticket_id', ticketList.map((ticket: any) => ticket.id))
            .order('created_at', { ascending: false })
        : Promise.resolve({ data: [], error: null }),
    ]);

    assertNoDbError(usersResult.error as any);
    assertNoDbError(propertiesResult.error as any);

    const missingMessagesTable =
      (messagesResult.error as any)?.code === '42P01' ||
      (messagesResult.error as any)?.code === 'PGRST204' ||
      (messagesResult.error as any)?.code === 'PGRST205';

    if (messagesResult.error && !missingMessagesTable) {
      throw new Error((messagesResult.error as any).message);
    }

    const userMap = new Map((usersResult.data || []).map((user: any) => [user.id, user]));
    const propertyMap = new Map((propertiesResult.data || []).map((property: any) => [property.id, property]));

    const messageRows = missingMessagesTable ? [] : (messagesResult.data || []);
    const messageCountMap = new Map<string, number>();
    const latestAdminReplyMap = new Map<string, { userId: string | null; createdAt: string | null }>();

    for (const message of messageRows as any[]) {
      const ticketId = String(message.ticket_id);
      messageCountMap.set(ticketId, (messageCountMap.get(ticketId) || 0) + 1);
      if (message.message_type === 'admin_reply' && !latestAdminReplyMap.has(ticketId)) {
        latestAdminReplyMap.set(ticketId, {
          userId: message.user_id || null,
          createdAt: message.created_at || null,
        });
      }
    }

    sendSuccess(res, {
      tickets: ticketList.map((ticket: any) => {
        const raisedBy = userMap.get(ticket.user_id);
        const property = propertyMap.get(ticket.property_id);
        const latestAdminReply = latestAdminReplyMap.get(ticket.id);
        const answeredBy = latestAdminReply?.userId ? userMap.get(latestAdminReply.userId) : null;

        return {
          id: ticket.id,
          userId: ticket.user_id,
          propertyId: ticket.property_id,
          propertyName: property?.name || null,
          propertyAddress: property?.address || null,
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          priority: ticket.priority,
          category: ticket.category,
          estimatedResponse: ticket.estimated_response,
          createdAt: ticket.created_at,
          updatedAt: ticket.updated_at,
          raisedBy: {
            id: ticket.user_id,
            name: raisedBy?.name || 'Unknown',
            email: raisedBy?.email || null,
          },
          answeredBy: answeredBy
            ? {
                id: answeredBy.id,
                name: answeredBy.name,
                email: answeredBy.email,
                repliedAt: latestAdminReply?.createdAt || null,
              }
            : null,
          messageCount: messageCountMap.get(ticket.id) || 0,
        };
      }),
    });
  }),
);

router.get(
  '/admin/tickets/:ticketId',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (req, res) => {
    const ticketId = String(req.params.ticketId);
    const db = getEaasClient();

    const { data: ticket, error: ticketError } = await db.from('support_tickets').select('*').eq('id', ticketId).maybeSingle();
    assertNoDbError(ticketError);

    if (!ticket) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const [usersResult, propertyResult, messagesResult] = await Promise.all([
      db.from('users').select('id,name,email').in('id', [ticket.user_id]),
      db.from('properties').select('id,name,address').eq('id', ticket.property_id).maybeSingle(),
      db.from('support_ticket_messages').select('id,ticket_id,user_id,message,message_type,created_at').eq('ticket_id', ticketId).order('created_at', { ascending: true }),
    ]);

    assertNoDbError(usersResult.error as any);
    assertNoDbError(propertyResult.error as any);

    const missingMessagesTable =
      (messagesResult.error as any)?.code === '42P01' ||
      (messagesResult.error as any)?.code === 'PGRST204' ||
      (messagesResult.error as any)?.code === 'PGRST205';

    if (messagesResult.error && !missingMessagesTable) {
      throw new Error((messagesResult.error as any).message);
    }

    const mentionedUserIds = Array.from(new Set((messagesResult.data || []).map((message: any) => message.user_id).filter(Boolean)));
    const { data: messageUsers, error: messageUsersError } =
      mentionedUserIds.length > 0 ? await db.from('users').select('id,name,email').in('id', mentionedUserIds) : { data: [], error: null as any };
    assertNoDbError(messageUsersError as any);

    const userMap = new Map([...(usersResult.data || []), ...(messageUsers || [])].map((user: any) => [user.id, user]));

    const mappedMessages = missingMessagesTable
      ? [
          {
            id: `seed-${ticket.id}`,
            message: ticket.description,
            messageType: 'customer',
            createdAt: ticket.created_at,
            author: {
              id: ticket.user_id,
              name: (userMap.get(ticket.user_id) as any)?.name || 'Customer',
              email: (userMap.get(ticket.user_id) as any)?.email || null,
            },
          },
        ]
      : (messagesResult.data || []).map((message: any) => ({
          id: message.id,
          message: message.message,
          messageType: message.message_type,
          createdAt: message.created_at,
          author: {
            id: message.user_id,
            name: (userMap.get(message.user_id) as any)?.name || 'Unknown',
            email: (userMap.get(message.user_id) as any)?.email || null,
          },
        }));

    sendSuccess(res, {
      ticket: {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
        estimatedResponse: ticket.estimated_response,
        property: propertyResult.data
          ? {
              id: (propertyResult.data as any).id,
              name: (propertyResult.data as any).name,
              address: (propertyResult.data as any).address,
            }
          : null,
        raisedBy: {
          id: ticket.user_id,
          name: (userMap.get(ticket.user_id) as any)?.name || 'Unknown',
          email: (userMap.get(ticket.user_id) as any)?.email || null,
        },
      },
      messages: mappedMessages,
    });
  }),
);

router.post(
  '/admin/tickets/:ticketId/messages',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (req, res) => {
    const parsed = adminReplySchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const ticketId = String(req.params.ticketId);
    const db = getEaasClient();

    const { data: ticket, error: ticketError } = await db.from('support_tickets').select('*').eq('id', ticketId).maybeSingle();
    assertNoDbError(ticketError);
    if (!ticket) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const { data: message, error: messageError } = await db
      .from('support_ticket_messages')
      .insert({
        id: randomUUID(),
        ticket_id: ticketId,
        user_id: authReq.user!.userId,
        message: parsed.data.message,
        message_type: 'admin_reply',
      })
      .select('*')
      .single();

    const missingMessagesTable =
      (messageError as any)?.code === '42P01' ||
      (messageError as any)?.code === 'PGRST204' ||
      (messageError as any)?.code === 'PGRST205';

    if (messageError && !missingMessagesTable) {
      throw new Error((messageError as any).message);
    }

    await db.from('support_tickets').update({ updated_at: new Date().toISOString() }).eq('id', ticketId);

    await logAdminAction(authReq, {
      action: 'support_ticket.replied',
      entityType: 'support_ticket',
      entityId: ticketId,
      metadata: {
        replyLength: parsed.data.message.length,
      },
    });

    sendSuccess(
      res,
      {
        messageId: message?.id || null,
        createdAt: message?.created_at || new Date().toISOString(),
      },
      'Reply added successfully',
      201,
    );
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
