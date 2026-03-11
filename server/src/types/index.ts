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
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export interface RegisterBody {
  email: string;
  password: string;
  name: string;
  role?: Role;
}

export interface LoginBody {
  email: string;
  password: string;
}
