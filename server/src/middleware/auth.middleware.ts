import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AuthRequest, Role } from '../types';
import { sendError } from '../utils/api-response';

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
    return;
  }

  const token = authHeader.slice(7);

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
  }
}

export function requireRole(...roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
      return;
    }

    if (!roles.includes(req.user.role)) {
      sendError(res, 403, 'FORBIDDEN', `Access denied. Required role: ${roles.join(' or ')}`);
      return;
    }

    next();
  };
}
