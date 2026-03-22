export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

interface ApiErrorPayload {
  message?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: ApiErrorPayload;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  accessToken?: string,
): Promise<{ success: boolean; data?: T; message: string; status: number }> {
  const headers = new Headers(init.headers || {});
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T>;
  const message = payload.message || payload.error?.message || 'Request failed';

  if (!response.ok || !payload.success) {
    console.error('API Error:', path, payload);
    return {
      success: false,
      message,
      status: response.status,
    };
  }

  return {
    success: true,
    data: payload.data,
    message,
    status: response.status,
  };
}
