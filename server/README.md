# Instinct 4.0 — Server

Node.js + TypeScript REST API backend for Instinct 4.0 with role-based authentication (JWT), Prisma ORM, and PostgreSQL.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20+ |
| Language | TypeScript 5 |
| Framework | Express 4 |
| ORM | Prisma 5 |
| Database | PostgreSQL (Prisma Accelerate) |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Validation | Zod |
| Docs | Swagger UI (OpenAPI 3.0) |

---

## Project Structure

```
server/
├── prisma/
│   ├── schema.prisma          # Data models & enum definitions
│   └── migrations/            # Auto-generated SQL migrations
├── src/
│   ├── config/
│   │   └── swagger.ts         # OpenAPI spec configuration
│   ├── controllers/
│   │   └── auth.controller.ts # register / login / me handlers
│   ├── lib/
│   │   └── prisma.ts          # Singleton PrismaClient
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

### 3. Run database migrations

```bash
bun run db:migrate
```

### 4. Start the dev server

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
| `GET` | `/api/users` | Bearer | ADMIN, EXECUTIVE | List all users |
| `PATCH` | `/api/users/:id/deactivate` | Bearer | ADMIN | Deactivate a user |

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

The token is returned in the `data.token` field of both `/api/auth/register` and `/api/auth/login` responses.

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
| `bun run db:generate` | Regenerate Prisma client |
| `bun run db:migrate` | Run pending migrations (dev) |
| `bun run db:migrate:deploy` | Apply migrations (production) |
| `bun run db:studio` | Open Prisma Studio |
