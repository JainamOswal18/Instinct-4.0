import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { Role } from '../types';
import { assertNoDbError, getEaasClient, mapProperty, mapUserAuth, mapUserProfile, PropertyRow, UserRow } from '../lib/eaas-db';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';
import { AuthRequest } from '../types';
import { sendError, sendSuccess } from '../utils/api-response';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  phone: z.string().optional(),
  role: z.nativeEnum(Role).optional().default(Role.CITIZEN),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function register(req: Request, res: Response): Promise<void> {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
    return;
  }

  const { email, password, name, role, phone } = parsed.data;
  const allowElevatedSignup = (process.env.ALLOW_ELEVATED_SIGNUP || 'true').toLowerCase() === 'true';

  if (!allowElevatedSignup && role !== Role.CITIZEN) {
    sendError(res, 403, 'FORBIDDEN', 'Elevated role signup is disabled');
    return;
  }

  const db = getEaasClient();

  const { data: existing, error: existingError } = await db
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  assertNoDbError(existingError);

  if (existing) {
    sendError(res, 409, 'CONFLICT', 'Email already registered');
    return;
  }

  const hashed = await hashPassword(password);

  const { data: user, error: createError } = await db
    .from('users')
    .insert({ id: randomUUID(), email, password: hashed, name, role, phone: phone || null })
    .select('id,email,name,phone,role,created_at')
    .single();
  assertNoDbError(createError);

  const mappedUser = mapUserAuth(user as UserRow);
  const accessToken = signToken({
    userId: mappedUser.id,
    email: mappedUser.email,
    role: mappedUser.role,
    name: mappedUser.name,
  });

  sendSuccess(
    res,
    {
      user: mappedUser,
      accessToken,
    },
    undefined,
    201,
  );
}

export async function login(req: Request, res: Response): Promise<void> {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
    return;
  }

  const { email, password } = parsed.data;
  const db = getEaasClient();

  const { data: user, error: userError } = await db.from('users').select('*').eq('email', email).maybeSingle();
  assertNoDbError(userError);

  if (!user || !(await comparePassword(password, (user as UserRow).password))) {
    sendError(res, 401, 'UNAUTHORIZED', 'Invalid email or password');
    return;
  }

  if (!(user as UserRow).is_active) {
    sendError(res, 403, 'FORBIDDEN', "You don't have permission to access this resource");
    return;
  }

  const { data: properties, error: propertiesError } = await db
    .from('properties')
    .select('id,name,address,type,subscription_status,plan_type,solar_capacity,battery_storage,installation_date,created_at,user_id')
    .eq('user_id', (user as UserRow).id)
    .order('created_at', { ascending: false });
  assertNoDbError(propertiesError);

  const userRow = user as UserRow;
  const accessToken = signToken({ userId: userRow.id, email: userRow.email, role: userRow.role, name: userRow.name });

  sendSuccess(res, {
    user: {
      id: userRow.id,
      email: userRow.email,
      name: userRow.name,
      phone: userRow.phone,
      currentPropertyId: userRow.current_property_id,
      properties: (properties || []).map((property) => mapProperty(property as PropertyRow)),
    },
    accessToken,
  });
}

export async function logout(_req: Request, res: Response): Promise<void> {
  sendSuccess(res, undefined, 'Logged out successfully');
}

export async function me(req: AuthRequest, res: Response): Promise<void> {
  if (!req.user) {
    sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
    return;
  }

  const db = getEaasClient();
  const { data: user, error } = await db
    .from('users')
    .select('id,email,name,phone,address,current_property_id,created_at,password,role,is_active')
    .eq('id', req.user.userId)
    .maybeSingle();
  assertNoDbError(error);

  if (!user) {
    sendError(res, 404, 'NOT_FOUND', 'Resource not found');
    return;
  }

  sendSuccess(res, mapUserProfile(user as UserRow));
}
