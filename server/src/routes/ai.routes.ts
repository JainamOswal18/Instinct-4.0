import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const chatSchema = z.object({
  propertyId: z.string().min(1),
  message: z.string().min(1),
});

function generateAdvisorResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('bill') || lower.includes('save')) {
    return 'Based on your usage pattern, shifting heavy appliances to off-peak hours could reduce your monthly bill by approximately 10-15%.';
  }
  if (lower.includes('battery')) {
    return 'Your battery performs best when discharge stays between 20% and 85%. Avoid sustained deep discharge for longer life.';
  }
  return 'I recommend reviewing your peak-hour consumption and enabling appliance scheduling to improve efficiency and reduce grid dependency.';
}

router.post(
  '/chat',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data: userMessage, error: userMessageError } = await db
      .from('ai_messages')
      .insert({
        id: randomUUID(),
        user_id: authReq.user!.userId,
        property_id: parsed.data.propertyId,
        role: 'user',
        content: parsed.data.message,
      })
      .select('*')
      .single();
    assertNoDbError(userMessageError);

    const responseText = generateAdvisorResponse(parsed.data.message);
    const { data: assistantMessage, error: assistantMessageError } = await db
      .from('ai_messages')
      .insert({
        id: randomUUID(),
        user_id: authReq.user!.userId,
        property_id: parsed.data.propertyId,
        role: 'assistant',
        content: responseText,
      })
      .select('*')
      .single();
    assertNoDbError(assistantMessageError);

    sendSuccess(res, {
      messageId: userMessage.id,
      response: assistantMessage.content,
      timestamp: assistantMessage.created_at,
    });
  }),
);

router.get(
  '/chat/:propertyId/history',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();
    const { data: messages, error } = await db
      .from('ai_messages')
      .select('*')
      .eq('user_id', authReq.user!.userId)
      .eq('property_id', propertyId)
      .order('created_at', { ascending: true })
      .limit(200);
    assertNoDbError(error);

    sendSuccess(res, {
      messages: (messages || []).map((message: any) => ({
        id: message.id,
        role: message.role,
        content: message.content,
        timestamp: message.created_at,
      })),
    });
  }),
);

export default router;
