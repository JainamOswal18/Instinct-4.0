# Instinct 4.0 — Server

Node.js + TypeScript REST API backend for Instinct 4.0 with role-based authentication (JWT), Supabase, and PostgreSQL.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20+ |
| Language | TypeScript 5 |
| Framework | Express 4 |
| Data Access | Supabase JS |
| Database | PostgreSQL (Supabase) |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Validation | Zod |
| Docs | Swagger UI (OpenAPI 3.0) |

---

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── swagger.ts         # OpenAPI spec configuration
│   ├── controllers/
│   │   └── auth.controller.ts # register / login / me handlers
│   ├── lib/
│   │   ├── supabase.ts        # Singleton Supabase client
│   │   └── eaas-db.ts         # EaaS schema access + row mappers
│   ├── middleware/
│   │   └── auth.middleware.ts # JWT authenticate + requireRole guard
│   ├── routes/
│   │   ├── auth.routes.ts     # /api/auth/*
│   │   └── user.routes.ts     # /api/users/*
│   ├── types/
│   │   └── index.ts           # Shared TS types (Role, AuthRequest, etc.)
│   ├── utils/
│   │   ├── jwt.ts             # signToken / verifyToken
│   │   └── password.ts        # hashPassword / comparePassword
│   └── index.ts               # Express app entry point
├── .env                       # Environment variables (git-ignored)
├── .env.example               # Template for required env vars
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | — |
| `PORT` | HTTP port to listen on | `3001` |
| `JWT_SECRET` | Secret key for signing JWTs | — |
| `JWT_EXPIRES_IN` | Token expiry duration | `7d` |
| `BCRYPT_ROUNDS` | bcrypt cost factor | `12` |
| `ALLOW_ELEVATED_SIGNUP` | Allow signup as `ADMIN`/`EXECUTIVE` | `true` |

### 3. Start the dev server

```bash
bun run dev
```

Server is available at **http://localhost:3001**

---

## API Endpoints

### Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | — | Server health check |

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | — | Register a new user |
| `POST` | `/api/auth/login` | — | Login and receive a JWT |
| `GET` | `/api/auth/me` | Bearer | Get current user info |

### Users

| Method | Path | Auth | Roles | Description |
|--------|------|------|-------|-------------|
| `GET` | `/api/user/admin/users` | Bearer | ADMIN, EXECUTIVE | List users |
| `PATCH` | `/api/user/admin/users/:id/status` | Bearer | ADMIN | Activate/deactivate user |
| `PATCH` | `/api/user/admin/users/:id/role` | Bearer | ADMIN | Update user role |
| `GET` | `/api/user/admin/audit-logs` | Bearer | ADMIN, EXECUTIVE | View admin audit logs |

### Admin Operations

| Method | Path | Auth | Roles | Description |
|--------|------|------|-------|-------------|
| `GET` | `/api/subscription/admin/properties` | Bearer | ADMIN, EXECUTIVE | Property oversight list |
| `PATCH` | `/api/subscription/admin/properties/:propertyId/subscription-status` | Bearer | ADMIN | Update subscription state |
| `GET` | `/api/billing/admin/all` | Bearer | ADMIN, EXECUTIVE | Billing operations list |
| `PATCH` | `/api/billing/admin/:billId/adjust` | Bearer | ADMIN | Manual bill adjustment |
| `GET` | `/api/support/admin/tickets` | Bearer | ADMIN, EXECUTIVE | Support queue overview |
| `PATCH` | `/api/support/admin/tickets/:ticketId` | Bearer | ADMIN | Update ticket status/priority |
| `POST` | `/api/notifications/admin/broadcast` | Bearer | ADMIN | Send platform broadcast |
| `GET` | `/api/energy/admin/analytics/overview` | Bearer | ADMIN, EXECUTIVE | Platform KPI snapshot |

---

## User Roles

| Role | Description |
|------|-------------|
| `CITIZEN` | Standard user (default on registration) |
| `ADMIN` | Full user management access |
| `EXECUTIVE` | Read-only administrative access |

---

## Authentication

All protected routes require an `Authorization` header:

```
Authorization: Bearer <token>
```

The token is returned in the `data.accessToken` field of both `/api/auth/register` and `/api/auth/login` responses.

Admin write operations are audited in `admin_audit_logs`.

### Register example

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "citizen@example.com",
    "password": "password123",
    "name": "Jane Doe",
    "role": "CITIZEN"
  }'
```

### Login example

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "citizen@example.com",
    "password": "password123"
  }'
```

### Authenticated request example

```bash
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <token>"
```

---

## API Documentation (Swagger UI)

Interactive API docs are available once the server is running:

```
http://localhost:3001/api/docs
```

Raw OpenAPI JSON spec:

```
http://localhost:3001/api/docs.json
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with hot-reload |
| `bun run build` | Compile TypeScript to `dist/` |
| `bun run start` | Run compiled production build |
| `bun run db:types` | Note for Supabase type generation workflow |
