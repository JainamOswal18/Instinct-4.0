# Instinct 4.0 — Web App

Next.js frontend for the Instinct 4.0 platform.

## Setup

1. Install dependencies:

```bash
bun install
```

2. Configure API base URL (optional):

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

3. Start dev server:

```bash
bun run dev
```

## Auth & Roles

- Auth is server-backed via JWT (`/api/auth/login`, `/api/auth/register`, `/api/auth/logout`).
- Session is stored in browser localStorage (`eaas_session_v2`) with `accessToken`.
- Role model is canonical with backend: `CITIZEN`, `ADMIN`, `EXECUTIVE`.

## Admin Module Routes

- `/dashboard` (role-aware main dashboard)
- `/admin/users`
- `/admin/properties`
- `/admin/subscriptions`
- `/admin/billing`
- `/admin/support`
- `/admin/notifications`
- `/analytics`

## Rollout Checklist

- Ensure server migrations are applied, including `admin_audit_logs`.
- Verify `ALLOW_ELEVATED_SIGNUP=true` for MVP admin self-signup behavior.
- Confirm `ADMIN` and `EXECUTIVE` accounts can access admin routes.
- Run backend smoke tests: `cd server && bun run smoke:test`.
