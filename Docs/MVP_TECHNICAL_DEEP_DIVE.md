# EaaS Nexus 4.0 — Single Source MVP Technical Specification (Supabase-First)

This is the consolidated low-level architecture document for the current MVP across `mobile`, `web-app`, and `server`.

This version is intentionally **Supabase-first** and does not treat Prisma as runtime truth. The backend talks directly to Supabase/Postgres tables through `getEaasClient()` in `server/src/lib/eaas-db.ts`, with API contracts enforced by route-level Zod validators.

---

## 1) System Topology

### 1.1 Runtime Layers
1. **Mobile app (`mobile/`)**: Expo Router + Zustand + AsyncStorage, customer journey + usage monitoring.
2. **Web app (`web-app/`)**: Next.js App Router, provider/admin operations dashboard.
3. **Backend (`server/`)**: Express TypeScript API, JWT auth, role guards, Supabase I/O.
4. **Data layer (Supabase Postgres, schema `eaas`)**: source of truth for users, properties, survey/proposal/payment lifecycle, installation operations, support, provider workflows.

### 1.2 Request / State Control Plane
1. Client sends `Authorization: Bearer <JWT>`.
2. `authenticate` middleware validates token; rejects 401 if absent/invalid.
3. `requireRole(...)` or `roleMiddleware(...)` enforces RBAC.
4. Route-level Zod schema validates payload.
5. Route executes direct Supabase query (`db.from(...).select/insert/update`).
6. Unified response contract returned via `sendSuccess` / `sendError`.

---

## 2) Supabase Data Model (Authoritative)

Schema source validated from Supabase MCP (`list_tables` verbose) on 2026-03-15.

### 2.1 Core Identity + Ownership

#### `eaas.users`
- Columns: `id`, `email` (unique), `password`, `name`, `phone`, `address`, `role`, `is_active`, `current_property_id`, `created_at`, `updated_at`.
- Enum `role`: `CITIZEN | ADMIN | EXECUTIVE`.
- FK fan-out to `properties`, `notifications`, `support_tickets`, `provider_billing_drafts`, `provider_profiles`, `admin_audit_logs`, `ai_messages`, `support_ticket_messages`.

#### `eaas.properties`
- Columns: `id`, `user_id`, `name`, `address`, `type`, `subscription_status`, `plan_type`, `solar_capacity`, `battery_storage`, `installation_date`, `created_at`, `updated_at`.
- Enum `type`: `residential | commercial`.
- Enum `subscription_status`: `NONE | SURVEY_PENDING | SURVEY_SUBMITTED | PLAN_PROPOSED | PAYMENT_PENDING | PENDING_INSTALLATION | ACTIVE`.
- Upstream owner FK: `user_id -> users.id`.
- Downstream FKs from operational tables: `surveys`, `proposals`, `payments`, `installation_progress`, `installations`, `energy_stats`, `alerts`, `bills`, `support_tickets`, `maintenance_schedule`, `service_history`, `upcoming_visits`, `grid_snapshots`, `grid_events`, `carbon_metrics_monthly`, `provider_billing_drafts`.

### 2.2 Onboarding, Offer, and Payment Lifecycle

#### `eaas.surveys`
- Columns: `id`, `property_id`, `property_type`, `roof_area`, `monthly_bill`, `monthly_consumption`, `peak_hours`, `occupants`, `appliances` (text[]), `status`, `submitted_at`.

#### `eaas.proposals`
- Columns: `id`, `property_id`, `survey_id`, `solar_capacity`, `battery_storage`, `monthly_fee`, `estimated_savings`, `estimated_production`, `contract_duration`, `installation_fee`, `security_deposit`, `whats_included` (text[]), `generated_at`, `expires_at`.

#### `eaas.payments`
- Columns: `id`, `property_id`, `proposal_id`, `order_id` (unique), `transaction_id`, `payment_method`, `amount`, `currency`, `status`, `signature`, `description`, `payment_gateway_url`, `paid_at`, `created_at`.
- Enum `payment_method`: `UPI | Card | NetBanking`.
- Enum `payment_status`: `PENDING | SUCCESS | FAILED`.

#### `eaas.bills`
- Columns: `id`, `property_id`, `month`, `total_amount`, `subscription_fee`, `usage_charge`, `taxes`, `status`, `due_date`, `generated_at`, `paid_date`, `pdf_url`.
- Enum `bill_status`: `pending | paid | accepted | disputed`.

### 2.3 Installation + Equipment Operations

#### `eaas.installation_progress` (customer-facing pipeline booleans)
- Columns: `property_id` (unique), `payment_confirmed`, `engineer_assigned`, `site_survey_scheduled`, `installation_started`, `system_activated`, plus time columns and metadata.

#### `eaas.installations` (provider-facing lifecycle records)
- Columns: `id`, `property_id`, `service_title`, `customer_name`, `machine_name`, `machine_cost`, `estimated_setup_days`, `actual_start_date`, `completed_date`, `status`, `assigned_technician`, `notes`, `subscription_plan_summary`, `created_at`, `updated_at`.
- Enum `installation_status`: `SURVEY | APPROVAL | PROCUREMENT | INSTALLATION | TESTING | LIVE`.

#### `eaas.equipment`
- Columns: `id`, `installation_id`, `name`, `model`, `serial_number` (unique), `status`, `health_score`, `installed_date`, `warranty_expiry`, `last_maintenance_date`, `next_maintenance_date`, `customer_name`, timestamps.
- Enum `equipment_status`: `ONLINE | OFFLINE | NEEDS_ATTENTION`.

### 2.4 Monitoring + AI + Carbon

#### `eaas.energy_events`
- High-frequency event stream table with `property_id`, `solar_kw`, `battery_percent`, `grid_kw`, `consumption`, `timestamp`.

#### `eaas.energy_stats`
- Aggregated stats table with periodized rows (`period`, `production`, `consumption`, `grid_usage`, etc.).

#### `eaas.alerts`
- Per-property alert records with enums `alert_category` (`consumption`, `production`, etc.) and `alert_severity` (`info|warning|critical`).

#### `eaas.ai_messages`
- Conversation persistence: `user_id`, `property_id`, `role` (`user|assistant`), `content`, `created_at`.

#### `eaas.carbon_metrics_monthly`
- Monthly sustainability snapshots (`co2_saved_kg`, `co2_offset_kg`, `renewable_kwh`, `month_label`).

### 2.5 Support + Admin + Provider Extensions

#### `eaas.support_tickets`
- Columns include `category`, `priority`, `status`, `provider_notes`, `approval_action`, `bill_id` for billing dispute linkage.
- Enum extensions in live DB include `status=awaiting_approval` and `approval_action` (`credit|refund|dispatch_tech|none`).

#### `eaas.support_ticket_messages`
- Threaded messages linked to tickets/users.

#### `eaas.admin_audit_logs`
- Admin write-audit ledger (`actor_user_id`, `action`, `entity_type`, `entity_id`, `metadata`).

#### `eaas.provider_profiles`
- Provider metadata (`company_name`, `branding_name`, support contact, notification JSON).

#### `eaas.provider_billing_drafts`
- Columns: `provider_user_id`, `property_id`, `survey_id`, `bill_id`, `title`, `description`, `line_items` (jsonb), `charges` (jsonb), `total_amount`, `currency`, `status`, `sent_at`, `accepted_at`, `disputed_at`, timestamps.
- Enum `billing_draft_status`: `draft | sent | accepted | disputed | cancelled`.

#### `eaas.provider_alerts`
- Provider operation alerts; enum `provider_alert_type`: `new_request | payment_overdue | equipment_failure | sla_breach | contract_renewal | ticket`.

#### Additional service-domain tables present
- `eaas.energy_services`, `eaas.service_requests`, `eaas.service_request_files`, `eaas.support_faqs`, `eaas.maintenance_schedule`, `eaas.service_history`, `eaas.upcoming_visits`, `eaas.grid_snapshots`, `eaas.grid_events`.

### 2.6 Security Context in Data Layer
- `rls_enabled` is currently `false` across the inspected `eaas` tables.
- Access control is currently enforced in the API layer (JWT + role middleware), not by RLS policies.

---

## 3) Backend Implementation (Express + Supabase)

### 3.1 API Mounting + Namespaces
The server mounts both plain and `/api` aliases for most domains (e.g. `/auth` and `/api/auth`, `/provider` and `/api/provider`), reducing client coupling during migration.

### 3.2 Auth and Role Enforcement
- `authenticate` middleware parses bearer token and injects `req.user`.
- `requireRole(Role.ADMIN, Role.EXECUTIVE)` supports multi-role access.
- `roleMiddleware(Role.EXECUTIVE)` supports strict single-role gate (used heavily for provider routes).

### 3.3 High-Impact Business Flows

#### A) Survey submission (`POST /survey/submit`)
1. Validate payload (property, consumption, appliances, etc.).
2. Confirm property exists.
3. Insert row in `eaas.surveys`.
4. Update `eaas.properties.subscription_status = SURVEY_SUBMITTED`.

#### B) Proposal generation (`POST /subscription/generate-proposal`)
1. Load survey.
2. Compute recommendation fields:
   - `solarCapacity = monthly_consumption / 35`
   - `batteryStorage = max(2, solarCapacity * 0.5)`
   - `estimatedProduction = solarCapacity * 120`
   - `estimatedSavings = monthly_bill * 0.35`
3. Insert `eaas.proposals`.
4. Promote property status to `PLAN_PROPOSED`.

#### C) Payment lifecycle
`POST /payment/initiate`:
- Creates payment row with generated `order_id`, sets property status to `PAYMENT_PENDING`.

`POST /payment/verify`:
- Marks payment `SUCCESS`, generates transaction id.
- Transitions property to `PENDING_INSTALLATION`.
- Upserts `installation_progress` with `payment_confirmed=true`.

#### D) Provider custom billing drafts (`/provider/billing/drafts`)
1. EXECUTIVE-only route.
2. Validates `charges` + metadata.
3. If status is `sent`, inserts a bill in `eaas.bills` first.
4. Inserts draft in `eaas.provider_billing_drafts`.
5. Creates user notification pointing to `/billing`.

#### E) User bill interaction
`POST /billing/:billId/accept`:
- Ownership check via property user.
- Updates bill status to `accepted`.
- Updates latest installation to `PROCUREMENT` if present.

`POST /billing/:billId/dispute`:
- Ownership check.
- Creates support ticket with `bill_id` linkage.
- Sets bill status `disputed`.
- Sets related draft status `disputed` and timestamps.

### 3.4 Provider Installation + Equipment Logic
- `GET /provider/installations` returns paginated installation rows and supports `status` filter.
- `PATCH /provider/installations/:id/status` stamps lifecycle timestamps (`actual_start_date` on INSTALLATION, `completed_date` on LIVE).
- `PATCH /provider/equipment/:id/status` can auto-create `provider_alerts` for OFFLINE/NEEDS_ATTENTION states.
- `POST /provider/equipment/:id/maintenance` updates next maintenance date and emits provider alert.

### 3.5 Billing PDF Engine
- `GET /billing/download/:billId` builds a raw PDF in-memory.
- Uses manual object/xref offsets (`%PDF-1.4`) for serverless-friendly generation.
- Requires escaping for PDF text tokens to avoid malformed output.

### 3.6 Real-time Stream Path
- WS upgrade path on `/energy/stream/:propertyId?token=...` in `server/src/index.ts`.
- Every 15s, synthetic telemetry is emitted and persisted through `publishEnergyEvent(...)`.

---

## 4) Mobile Architecture (Expo, Zustand, Hybrid API)

### 4.1 Entry Gate and Routing Lock
In `mobile/app/index.tsx`, app boot is controlled by:
1. token presence check (`accessToken` in AsyncStorage),
2. store user presence,
3. active property subscription status.

Route mapping:
- `NONE` -> welcome
- `SURVEY_PENDING` -> survey
- `SURVEY_SUBMITTED` -> survey-submitted
- `PLAN_PROPOSED` -> proposal
- `PAYMENT_PENDING` -> payment
- `PENDING_INSTALLATION` -> installation progress
- `ACTIVE` -> dashboard

### 4.2 Auth Store Data Strategy
`mobile/store/useAuthStore.ts` persists user-specific state under key `user_<id>` and keeps token separate.

Benefits:
- prevents multi-account collision on a single device,
- preserves local property/survey state between login cycles,
- merges backend scalar identity fields without clobbering local nested objects.

### 4.3 API Strategy: Real + Fallback
`mobile/services/api.ts` is the real client (Axios to `https://server-plum-six.vercel.app`).
`mobile/services/apiWrapper.ts` wraps real calls and falls back to mocks when enabled.

Implication:
- MVP can demo critical flows even under backend instability,
- but behavior may diverge from server truth for some features until fallback flags are tightened for production.

### 4.4 Mobile vs Server Stream Note
- Server supports websocket push.
- Current mobile wrapper documents Supabase realtime config path and still uses mock stream plumbing in parts.

---

## 5) Web App Architecture (Next.js Provider/Admin)

### 5.1 Auth Session Model
`web-app/src/lib/auth.ts` stores a client-side session object in `localStorage` key `eaas_session_v2`:
- `id`, `email`, `name`, `role`, `phone`, `accessToken`.

### 5.2 API Contract Layer
`web-app/src/lib/api.ts` normalizes fetch responses to:
- `{ success, data, message, status }`, with bearer token injection.

### 5.3 Operational Reality (Important)
Some provider workflows in `web-app/src/lib/notifications.ts` and provider billing page are still localStorage-driven draft UX logic (mock data lifecycle), while backend provider endpoints are available.

This means current web app behavior is a hybrid:
- **Backend-backed** for auth and many API pages,
- **Client-mocked** for parts of provider billing/notification workflow unless explicitly wired to `/provider/billing/drafts` and related endpoints.

---

## 6) End-to-End State Machines

### 6.1 Subscription Status FSM (Property)
Expected production progression:
`NONE` -> `SURVEY_SUBMITTED` -> `PLAN_PROPOSED` -> `PAYMENT_PENDING` -> `PENDING_INSTALLATION` -> `ACTIVE`

Admin/provider routes can intervene for corrections or operational handling.

### 6.2 Bill Status FSM
`pending` -> (`accepted` | `disputed` | `paid`)

`disputed` path creates support ticket linkage; `accepted` path moves installation planning ahead.

### 6.3 Provider Billing Draft FSM
`draft` -> `sent` -> (`accepted` | `disputed` | `cancelled`)

---

## 7) Security, Integrity, and Risk Notes

1. **No DB-level RLS currently active** on inspected tables; API is primary policy enforcement layer.
2. **JWT guard is mandatory** for all protected endpoints; role checks are route-local and explicit.
3. **PDF generation is handcrafted** and lightweight, but string escaping discipline is mandatory.
4. **Mock fallback in clients** improves resiliency for demos but can conceal server regressions unless tracked.
5. **Dual route aliasing (`/x` and `/api/x`)** is useful for compatibility but should remain documented to avoid client drift.

---

## 8) MVP Gaps and Recommended Hardening Sequence

1. Wire web provider billing UI from localStorage draft model to `/provider/billing/drafts` APIs.
2. Turn on Supabase RLS with explicit per-role policies and reduce privileged service-role surface.
3. Consolidate real-time strategy (either websocket-only or Supabase channels) across mobile/web.
4. Replace payment simulation assumptions with gateway webhook verification and idempotency keys.
5. Add automated contract tests for critical transitions:
   - property subscription status,
   - billing draft state,
   - bill dispute/accept flow,
   - installation status updates.

---

## 9) Final Positioning

EaaS Nexus MVP is architecturally coherent and operationally broad: customer onboarding, proposal generation, payment progression, provider operations, support, maintenance, billing, and telemetry all exist in one integrated Supabase-centered platform.

The immediate architectural truth is:
- **Supabase Postgres is the source of record**,
- **Express routes are policy + orchestration layer**,
- **mobile and web are partially hybridized with mocks**, requiring final wiring for full production parity.

---

## 10) Business Architecture: 3 Entities, Their Economics, and Interaction Flows

This section models the MVP from the business operating perspective using three active entities in the current role system:

1. **Citizen (Customer / Energy Consumer)** — role `CITIZEN`
2. **Provider Executive (Operator / Field + Billing Controller)** — role `EXECUTIVE`
3. **Platform Admin (Governance + Risk Controller)** — role `ADMIN`

### 10.1 Entity Objectives and Incentives

#### Entity A: Citizen (`CITIZEN`)
**Primary outcome sought**
- Lower and predictable monthly energy cost.
- Reliable installation and service continuity.
- Trust in billing fairness and issue resolution.

**Decision rights in MVP**
- Submit survey and baseline household/business consumption facts.
- Review proposal and proceed to payment.
- Accept or dispute provider-issued billing.
- Raise support tickets and track resolution.

**Commercial sensitivity**
- Most price-sensitive actor.
- Churn trigger conditions: opaque bill changes, delayed installation, unresolved disputes, poor maintenance response.

#### Entity B: Provider Executive (`EXECUTIVE`)
**Primary outcome sought**
- Convert demand pipeline to live installations.
- Protect margin while keeping acceptance rates healthy.
- Keep asset fleet healthy (equipment uptime) and support backlog under control.

**Decision rights in MVP**
- Create/send custom billing drafts.
- Move installation lifecycle statuses (`SURVEY` -> `LIVE`).
- Update equipment status and schedule maintenance.
- Act on provider alerts and support tickets.

**Commercial sensitivity**
- Revenue realization speed depends on timely customer conversion and low dispute rates.
- Operational overload risk rises with pending tickets + equipment failures.

#### Entity C: Platform Admin (`ADMIN`)
**Primary outcome sought**
- Marketplace integrity, policy enforcement, and auditability.
- Reduce fraud/risk events (role misuse, unauthorized pricing edits, unresolved escalations).
- Ensure customer trust and provider quality thresholds.

**Decision rights in MVP**
- User status/role controls.
- Property subscription-state overrides (admin interventions).
- Billing adjustments (`/billing/admin/...`) and audit log supervision.
- System-wide operational visibility.

**Commercial sensitivity**
- Responsible for trust moat and regulatory defensibility.
- Poor governance directly increases dispute cost and reputational damage.

### 10.2 Business Value Exchange (Who Gives What to Whom)

#### Citizen -> Provider Executive
- Gives demand intent, usage profile, payment commitment.
- Gives acceptance signal that unlocks downstream installation/procurement.

#### Provider Executive -> Citizen
- Gives customized commercial offer (draft bill + line-itemized charges).
- Gives execution capability: install, monitor, maintain, and support.

#### Platform Admin -> Both
- Gives governance envelope (role security, audit, escalation authority).
- Gives trust layer: standardized process, complaint handling path, and intervention controls.

### 10.3 Core Interaction Choreography (Happy Path)

#### Stage 1: Demand Capture and Qualification
1. Citizen completes survey (`surveys`) and enters pipeline.
2. Provider Executive sees pending request (`/provider/requests`) and evaluates serviceability + economics.
3. Admin has passive oversight (no intervention unless anomaly/escalation).

**Business checkpoint**
- Quality of survey data directly affects quote acceptance and rework burden.

#### Stage 2: Offer Construction and Negotiation
1. Provider Executive creates billing draft (`provider_billing_drafts`) with charges/line items.
2. Draft sent to Citizen, notification emitted.
3. Citizen accepts (`/billing/:billId/accept`) or disputes (`/billing/:billId/dispute`).

**Business checkpoint**
- Acceptance rate is the conversion KPI.
- Disputes are not failure-only events; they are controlled negotiation loops if closure SLA is strong.

#### Stage 3: Payment and Activation Prep
1. Citizen initiates and verifies payment (`payments`).
2. Property transitions toward install readiness (`PAYMENT_PENDING` -> `PENDING_INSTALLATION`).
3. Provider Executive receives operational trigger to schedule installation.

**Business checkpoint**
- Payment-to-installation lead time is a primary trust and NPS determinant.

#### Stage 4: Service Fulfillment and Lifecycle Operations
1. Provider Executive drives installation pipeline (`installations.status`).
2. Equipment status and maintenance cadence are tracked (`equipment`, `maintenance_schedule`).
3. Citizen receives ongoing value via monitoring, support, and continuity.

**Business checkpoint**
- Time-to-LIVE and first-90-day uptime are leading indicators of retention.

### 10.4 Exception / Conflict Interaction Flows

#### Case A: Billing Dispute
1. Citizen disputes bill.
2. System creates `support_tickets` row linked with `bill_id` and marks bill `disputed`.
3. Provider Executive investigates and responds.
4. Admin intervenes only if dispute breaches SLA, policy threshold, or role conflict.

**Business control objective**
- Convert disputes into auditable, time-bound resolution workflows; avoid untracked negotiation in external channels.

#### Case B: Installation Delay / Stalled Status
1. Installation status remains stagnant beyond operational expectation.
2. Provider Executive updates notes/assignment; if unresolved, Admin escalates.
3. Citizen communication cadence must continue to prevent churn due to uncertainty.

**Business control objective**
- Avoid silent queueing; enforce explicit accountability at each stage owner.

#### Case C: Equipment Degradation
1. Provider Executive marks equipment `OFFLINE` or `NEEDS_ATTENTION`.
2. Provider alert generated (`provider_alerts`).
3. Maintenance action scheduled and communicated.

**Business control objective**
- Minimize downtime and protect monthly value perception for Citizen.

### 10.5 Responsibility Matrix (Business RACI-Style)

#### Demand to Quote
- **Responsible**: Provider Executive
- **Accountable**: Provider Executive
- **Consulted**: Citizen
- **Informed**: Admin

#### Billing Dispute Closure
- **Responsible**: Provider Executive
- **Accountable**: Admin (if escalated)
- **Consulted**: Citizen
- **Informed**: Platform operations logs (`admin_audit_logs` when admin action occurs)

#### Installation Completion
- **Responsible**: Provider Executive
- **Accountable**: Provider Executive
- **Consulted**: Citizen
- **Informed**: Admin (through oversight dashboards / escalations)

### 10.6 Money Flow and Financial Control Points

1. **Offer stage**: pricing intent created in `provider_billing_drafts` (commercial draft layer).
2. **Billing stage**: executable charge created in `bills` (payment-liable artifact).
3. **Payment stage**: transaction artifact recorded in `payments`.
4. **Exception stage**: dispute liability tracked via `support_tickets.bill_id`.

**Control points**
- Quote-to-bill consistency (prevent hidden markups).
- Bill-to-payment reconciliation (status and transaction completeness).
- Dispute aging and closure ratio (revenue leakage prevention).

### 10.7 Business KPIs by Entity

#### Citizen-facing KPIs
- Quote acceptance rate.
- Median dispute resolution time.
- Installation lead time (payment verified -> status LIVE).
- First 30/60/90 day service continuity.

#### Provider Executive KPIs
- Pipeline velocity per installation stage.
- Draft-to-accept conversion.
- Equipment health distribution (`ONLINE`, `OFFLINE`, `NEEDS_ATTENTION`).
- Ticket backlog and SLA compliance.

#### Admin KPIs
- High-risk intervention count.
- Unauthorized-role / policy breach incidents.
- Audit completeness for privileged actions.
- Platform-level dispute recurrence by provider cluster.

### 10.8 Handoff Artifacts Between the 3 Entities

Citizen -> Provider Executive handoff artifacts:
- `surveys`, property metadata, usage and appliance signals.

Provider Executive -> Citizen handoff artifacts:
- `provider_billing_drafts` (drafted commercial intent), `bills` (formal payable instrument), notifications.

Admin -> Both handoff artifacts:
- Role/policy updates, intervention actions, audit records.

### 10.9 Current MVP Business Constraints (Reality)

1. Parts of provider billing UX in web still run via localStorage-mock pathways, so enterprise-grade process integrity depends on final backend wiring.
2. RLS is disabled at table layer; business policy currently depends on API-layer correctness.
3. Real payment and real-time telemetry are partially simulated, which affects some KPI trustworthiness in pilot reporting.

### 10.10 Business Expansion Path (Near-Term)

1. Make backend-driven provider billing draft flow mandatory in web UI.
2. Add formal dispute SLA timers and breach alerts at DB/API level.
3. Add provider scorecards (acceptance quality, dispute ratio, time-to-live).
4. Enforce RLS for multi-tenant policy hardening and compliance posture.
