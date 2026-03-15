import { NextFunction, Response } from 'express';
import { AuthRequest, Role } from '../types';
import { sendError } from '../utils/api-response';

export function roleMiddleware(requiredRole: Role) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
      return;
    }

    if (req.user.role !== requiredRole) {
      sendError(res, 403, 'FORBIDDEN', 'Insufficient permissions');
      return;
    }

    next();
  };
}
