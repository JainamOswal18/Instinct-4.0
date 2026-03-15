import { randomUUID } from 'crypto';
import { AuthRequest } from '../types';
import { getEaasClient } from '../lib/eaas-db';

interface AdminAuditInput {
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}

export async function logAdminAction(req: AuthRequest, input: AdminAuditInput): Promise<void> {
  if (!req.user || (req.user.role !== 'ADMIN' && req.user.role !== 'EXECUTIVE')) {
    return;
  }

  const db = getEaasClient();
  const { error } = await db.from('admin_audit_logs').insert({
    id: randomUUID(),
    actor_user_id: req.user.userId,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId || null,
    metadata: input.metadata || {},
  });
  if (error) {
    console.warn('admin_audit_logs write failed:', error.message);
  }
}
