import { apiRequest } from './api';

export type AppRole = 'CITIZEN' | 'ADMIN' | 'EXECUTIVE';

export interface User {
  name: string;
  email: string;
  role: AppRole;
  phone: string;
  password: string;
}

export interface AuthSession {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  phone: string | null;
  accessToken: string;
}

const SESSION_KEY = 'eaas_session_v2';

interface AuthApiPayload {
  user: {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    role: AppRole;
  };
  accessToken: string;
}

function persistSession(payload: AuthApiPayload): void {
  if (typeof window === 'undefined') return;

  const session: AuthSession = {
    id: payload.user.id,
    email: payload.user.email,
    name: payload.user.name,
    phone: payload.user.phone ?? null,
    role: payload.user.role,
    accessToken: payload.accessToken,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function registerUser(user: User): Promise<{ success: boolean; message: string }> {
  const result = await apiRequest<AuthApiPayload>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
    }),
  });

  if (!result.success || !result.data) {
    return { success: false, message: result.message || 'Registration failed' };
  }

  persistSession(result.data);
  return { success: true, message: result.message || 'Account created successfully' };
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; message: string }> {
  const result = await apiRequest<AuthApiPayload>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (!result.success || !result.data) {
    return { success: false, message: result.message || 'Login failed' };
  }

  persistSession(result.data);
  return { success: true, message: result.message || 'Login successful' };
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function getAccessToken(): string | null {
  return getSession()?.accessToken || null;
}

export async function logout(): Promise<void> {
  const token = getAccessToken();
  if (token) {
    await apiRequest('/auth/logout', { method: 'POST' }, token);
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('surveyStatus');
  }
}

export function isAuthenticated(): boolean {
  const session = getSession();
  return Boolean(session?.accessToken);
}

