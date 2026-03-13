import { Request } from 'express';

export const Role = {
  CITIZEN: 'CITIZEN',
  ADMIN: 'ADMIN',
  EXECUTIVE: 'EXECUTIVE',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface AuthPayload {
  userId: string;
  email: string;
  role: Role;
  name?: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
}

export interface LoginBody {
  email: string;
  password: string;
}
