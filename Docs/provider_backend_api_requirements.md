# Provider Dashboard — Backend API Requirements

This document specifies all the backend APIs required to power the enhanced Energy Provider dashboard. It follows the conventions of the existing [EaaS Nexus Backend API Specification](file:///c:/Users/Dell/Downloads/Instinct-4.0/server/EaaS%20Nexus%20-%20Backend%20API%20Specification.md) and builds on the existing [Prisma schema](file:///c:/Users/Dell/Downloads/Instinct-4.0/server/prisma/schema.prisma).

---

## Conventions

| Item | Convention |
|---|---|
| **Base URL** | `http://localhost:3000` (dev) |
| **Auth** | `Authorization: Bearer <access_token>` — all endpoints require `EXECUTIVE` role |
| **Response format** | `{ "success": true, "data": { ... } }` |
| **Error format** | `{ "success": false, "error": { "code": "...", "message": "..." } }` |
| **Role mapping** | Prisma `EXECUTIVE` role = "Energy Provider" in the web-app |

---

## Prisma Schema Extensions Required

### New Enums

```prisma
enum InstallationStatus {
  SURVEY
  APPROVAL
  PROCUREMENT
  INSTALLATION
  TESTING
  LIVE
}

enum EquipmentStatus {
  ONLINE
  OFFLINE
  NEEDS_ATTENTION
}

enum ProviderTicketStatus {
  open
  awaiting_approval
  in_progress
  resolved
  closed
}

enum TicketApprovalAction {
  credit
  refund
  dispatch_tech
  none
}

enum ProviderAlertType {
  new_request
  payment_overdue
  equipment_failure
  sla_breach
  contract_renewal
  ticket
}
```

### New Models

```prisma
model Installation {
  id                      String             @id @default(cuid())
  propertyId              String
  serviceTitle            String
  customerName            String
  machineName             String
  machineCost             Float
  estimatedSetupDays      Int
  actualStartDate         DateTime?
  completedDate           DateTime?
  status                  InstallationStatus @default(SURVEY)
  assignedTechnician      String?
  notes                   String?
  subscriptionPlanSummary Json?
  createdAt               DateTime           @default(now())
  updatedAt               DateTime           @updatedAt

  property                Property           @relation(fields: [propertyId], references: [id])
  equipment               Equipment[]

  @@map("installations")
}

model Equipment {
  id                  String          @id @default(cuid())
  installationId      String
  name                String
  model               String
  serialNumber        String          @unique
  status              EquipmentStatus @default(ONLINE)
  healthScore         Int             @default(100)
  installedDate       DateTime
  warrantyExpiry      DateTime
  lastMaintenanceDate DateTime?
  nextMaintenanceDate DateTime?
  customerName        String
  createdAt           DateTime        @default(now())
  updatedAt           DateTime        @updatedAt

  installation        Installation    @relation(fields: [installationId], references: [id])

  @@map("equipment")
}

model ProviderAlert {
  id         String            @id @default(cuid())
  type       ProviderAlertType
  severity   AlertSeverity
  title      String
  message    String
  relatedId  String?
  dismissed  Boolean           @default(false)
  createdAt  DateTime          @default(now())

  @@map("provider_alerts")
}
```

### Modified Models

```prisma
// Add to existing SupportTicket model:
model SupportTicket {
  // ... existing fields ...
  providerNotes    String?
  approvalAction   TicketApprovalAction?
  resolvedAt       DateTime?
}

// Add to existing Property model:
model Property {
  // ... existing relations ...
  installations  Installation[]
}
```

---

## 1. INSTALLATION MANAGEMENT APIs

### 1.1 List All Installations

```
GET /provider/installations
```

**Query Parameters:**
- `status` — Filter by InstallationStatus (optional)
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "installations": [
      {
        "id": "inst_001",
        "propertyId": "prop_001",
        "serviceTitle": "Solar Energy",
        "customerName": "Rahul Kumar",
        "machineName": "Loom Solar 5kW Mono PERC",
        "machineCost": 275000,
        "estimatedSetupDays": 14,
        "actualStartDate": "2026-03-10T00:00:00Z",
        "completedDate": null,
        "status": "INSTALLATION",
        "assignedTechnician": "Rajesh Sharma",
        "subscriptionPlanSummary": { "planName": "Solar Rooftop Starter", "totalMonthly": 3500 },
        "createdAt": "2026-03-01T10:00:00Z"
      }
    ],
    "total": 12,
    "page": 1,
    "totalPages": 1
  }
}
```

---

### 1.2 Get Installation Detail

```
GET /provider/installations/:installationId
```

**Response (200):** Full installation object including `notes`, `equipment[]`, and related `Property` info.

---

### 1.3 Update Installation Status

```
PATCH /provider/installations/:installationId/status
```

**Request Body:**
```json
{
  "status": "PROCUREMENT",
  "notes": "Equipment ordered from vendor",
  "assignedTechnician": "Rajesh Sharma"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "inst_001",
    "status": "PROCUREMENT",
    "updatedAt": "2026-03-15T12:00:00Z"
  }
}
```

---

### 1.4 Get Installation Pipeline Summary

```
GET /provider/installations/pipeline
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "pipeline": {
      "SURVEY": 3,
      "APPROVAL": 2,
      "PROCUREMENT": 1,
      "INSTALLATION": 4,
      "TESTING": 1,
      "LIVE": 15
    },
    "total": 26
  }
}
```

---

## 2. CUSTOMER & CONSUMPTION APIs

### 2.1 List Provider's Customers

```
GET /provider/customers
```

**Query Parameters:**
- `search` — Search by name or email (optional)
- `page`, `limit` — Pagination

**Response (200):**
```json
{
  "success": true,
  "data": {
    "customers": [
      {
        "id": "user_001",
        "name": "Rahul Kumar",
        "email": "rahul@example.com",
        "propertyId": "prop_001",
        "serviceTitle": "Solar Energy",
        "planName": "Solar Rooftop Starter",
        "subscriptionStatus": "ACTIVE",
        "monthlyConsumption": 342,
        "planThreshold": 500,
        "paymentStatus": "paid",
        "lastPaymentDate": "2026-02-25"
      }
    ],
    "total": 18,
    "page": 1
  }
}
```

---

### 2.2 Get Customer Consumption Data

```
GET /provider/customers/:propertyId/consumption
```

**Query Parameters:**
- `period` — `"day"` | `"week"` | `"month"` (default: `"day"`)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "propertyId": "prop_001",
    "customerName": "Rahul Kumar",
    "period": "day",
    "totalKwh": 42.5,
    "planThreshold": 500,
    "exceedsThreshold": false,
    "history": [
      { "time": "00:00", "consumption": 2.1, "production": 0 },
      { "time": "01:00", "consumption": 1.8, "production": 0 }
    ]
  }
}
```

---

### 2.3 Get Aggregate Consumption

```
GET /provider/consumption/aggregate
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalCustomers": 18,
    "totalKwhServed": 6150,
    "averagePerCustomer": 341.7,
    "customersExceedingThreshold": 3,
    "peakDemandTime": "18:00-20:00"
  }
}
```

---

## 3. REVENUE & PAYMENT APIs

### 3.1 Get Revenue Overview

```
GET /provider/revenue/overview
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalMRR": 63000,
    "totalOutstanding": 7000,
    "paidThisMonth": 56000,
    "overdueCount": 2,
    "collectionRate": 88.9
  }
}
```

---

### 3.2 List Customer Payment Statuses

```
GET /provider/revenue/payments
```

**Query Parameters:**
- `status` — `"paid"` | `"pending"` | `"overdue"` (optional)
- `page`, `limit`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "customerId": "user_001",
        "customerName": "Rahul Kumar",
        "propertyId": "prop_001",
        "billId": "bill_current",
        "month": "March 2026",
        "amount": 3500,
        "status": "paid",
        "dueDate": "2026-03-31",
        "paidDate": "2026-03-20"
      },
      {
        "customerId": "user_002",
        "customerName": "Priya Patel",
        "propertyId": "prop_005",
        "billId": "bill_007",
        "month": "March 2026",
        "amount": 4200,
        "status": "overdue",
        "dueDate": "2026-03-10",
        "paidDate": null
      }
    ],
    "total": 18
  }
}
```

---

### 3.3 Send Payment Reminder

```
POST /provider/revenue/remind
```

**Request Body:**
```json
{
  "customerId": "user_002",
  "billId": "bill_007",
  "message": "Your March payment of ₹4,200 is overdue. Please settle at your earliest convenience."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "notificationId": "notif_015",
    "sentTo": "priya@example.com",
    "sentAt": "2026-03-15T12:00:00Z"
  }
}
```

---

## 4. SUPPORT TICKET APIs (Provider-Side)

### 4.1 List All Tickets

```
GET /provider/tickets
```

**Query Parameters:**
- `status` — Filter by ProviderTicketStatus (optional)
- `priority` — `"high"` | `"medium"` | `"low"` (optional)
- `category` — `"technical"` | `"billing"` | `"installation"` | `"general"` (optional)
- `page`, `limit`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "ticket_001",
        "customerName": "Rahul Kumar",
        "customerEmail": "rahul@example.com",
        "category": "technical",
        "priority": "high",
        "subject": "Solar panel not generating power",
        "description": "Panel stopped generating since yesterday.",
        "status": "open",
        "createdAt": "2026-03-13T14:00:00Z",
        "updatedAt": "2026-03-13T14:00:00Z",
        "slaDeadline": "2026-03-14T14:00:00Z"
      }
    ],
    "stats": {
      "open": 5,
      "awaiting_approval": 2,
      "in_progress": 3,
      "resolved": 22,
      "closed": 45
    },
    "total": 77
  }
}
```

---

### 4.2 Get Ticket Detail

```
GET /provider/tickets/:ticketId
```

**Response (200):** Full ticket object with customer info, property details, and resolution history.

---

### 4.3 Update Ticket Status

```
PATCH /provider/tickets/:ticketId
```

**Request Body:**
```json
{
  "status": "in_progress",
  "providerNotes": "Technician dispatched to site"
}
```

---

### 4.4 Approve Ticket Resolution

```
POST /provider/tickets/:ticketId/approve
```

**Request Body:**
```json
{
  "approvalAction": "dispatch_tech",
  "providerNotes": "Dispatching technician Rajesh for on-site inspection"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "ticketId": "ticket_001",
    "status": "in_progress",
    "approvalAction": "dispatch_tech",
    "notificationSent": true
  }
}
```

---

### 4.5 Resolve Ticket

```
POST /provider/tickets/:ticketId/resolve
```

**Request Body:**
```json
{
  "providerNotes": "Panel connector was loose. Fixed on-site.",
  "approvalAction": "none"
}
```

---

## 5. EQUIPMENT MANAGEMENT APIs

### 5.1 List All Equipment

```
GET /provider/equipment
```

**Query Parameters:**
- `status` — `"ONLINE"` | `"OFFLINE"` | `"NEEDS_ATTENTION"` (optional)
- `page`, `limit`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "equipment": [
      {
        "id": "eq_001",
        "installationId": "inst_001",
        "name": "Main Solar Inverter",
        "model": "Growatt 5kW",
        "serialNumber": "GW-2026-001234",
        "status": "ONLINE",
        "healthScore": 95,
        "installedDate": "2026-02-15",
        "warrantyExpiry": "2031-02-15",
        "lastMaintenanceDate": "2026-03-01",
        "nextMaintenanceDate": "2026-06-01",
        "customerName": "Rahul Kumar"
      }
    ],
    "summary": {
      "online": 32,
      "offline": 2,
      "needsAttention": 5,
      "averageHealth": 87
    },
    "total": 39
  }
}
```

---

### 5.2 Get Equipment Detail

```
GET /provider/equipment/:equipmentId
```

---

### 5.3 Update Equipment Status

```
PATCH /provider/equipment/:equipmentId/status
```

**Request Body:**
```json
{
  "status": "NEEDS_ATTENTION",
  "healthScore": 60
}
```

---

### 5.4 Schedule Maintenance

```
POST /provider/equipment/:equipmentId/maintenance
```

**Request Body:**
```json
{
  "nextMaintenanceDate": "2026-06-15",
  "notes": "Scheduled quarterly inspection"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "equipmentId": "eq_001",
    "nextMaintenanceDate": "2026-06-15",
    "alertCreated": true
  }
}
```

---

## 6. PROVIDER ALERTS APIs

### 6.1 List Alerts

```
GET /provider/alerts
```

**Query Parameters:**
- `severity` — `"critical"` | `"warning"` | `"info"` (optional)
- `type` — ProviderAlertType value (optional)
- `dismissed` — `true` | `false` (default: `false`)
- `page`, `limit`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "id": "pa_001",
        "type": "equipment_failure",
        "severity": "critical",
        "title": "Inverter Offline — Rahul Kumar",
        "message": "Main Solar Inverter (GW-2026-001234) has been offline for 2 hours.",
        "relatedId": "eq_001",
        "dismissed": false,
        "createdAt": "2026-03-15T10:00:00Z"
      }
    ],
    "stats": {
      "critical": 2,
      "warning": 5,
      "info": 8
    },
    "total": 15
  }
}
```

---

### 6.2 Dismiss Alert

```
PATCH /provider/alerts/:alertId/dismiss
```

---

### 6.3 Dismiss All Alerts

```
PATCH /provider/alerts/dismiss-all
```

**Query Parameters:**
- `severity` — Optionally dismiss only alerts of a specific severity

---

## 7. PROVIDER DASHBOARD SUMMARY API

### 7.1 Get Dashboard Overview

```
GET /provider/dashboard
```

A single endpoint that aggregates all KPIs for the provider dashboard overview.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "activeInstallations": 15,
      "pendingSurveys": 3,
      "openTickets": 5,
      "equipmentAlerts": 2,
      "totalMRR": 63000,
      "overduePayments": 2
    },
    "pipeline": {
      "SURVEY": 3,
      "APPROVAL": 2,
      "PROCUREMENT": 1,
      "INSTALLATION": 4,
      "TESTING": 1,
      "LIVE": 15
    },
    "recentAlerts": [
      {
        "id": "pa_001",
        "type": "equipment_failure",
        "severity": "critical",
        "title": "Inverter Offline — Rahul Kumar",
        "createdAt": "2026-03-15T10:00:00Z"
      }
    ],
    "recentRequests": [
      {
        "id": "req_005",
        "customerName": "Anita Singh",
        "serviceTitle": "EV Charging",
        "status": "pending",
        "date": "2026-03-14"
      }
    ]
  }
}
```

---

## Route File Structure

All new routes should be created under `server/src/routes/` following existing patterns:

| File | Endpoints |
|---|---|
| `provider.dashboard.routes.ts` | `GET /provider/dashboard` |
| `provider.installations.routes.ts` | `GET/PATCH /provider/installations/*` |
| `provider.customers.routes.ts` | `GET /provider/customers/*`, `GET /provider/consumption/*` |
| `provider.revenue.routes.ts` | `GET/POST /provider/revenue/*` |
| `provider.tickets.routes.ts` | `GET/PATCH/POST /provider/tickets/*` |
| `provider.equipment.routes.ts` | `GET/PATCH/POST /provider/equipment/*` |
| `provider.alerts.routes.ts` | `GET/PATCH /provider/alerts/*` |

---

## Middleware Requirements

All `/provider/*` routes must pass through:

1. **`authMiddleware`** — Validates JWT Bearer token (existing)
2. **`roleMiddleware('EXECUTIVE')`** — New middleware ensuring only users with `Role.EXECUTIVE` can access provider endpoints

```typescript
// New: server/src/middleware/role.middleware.ts
export function roleMiddleware(requiredRole: Role) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Insufficient permissions" }
      });
    }
    next();
  };
}
```

---

## SLA Calculation Rules

| Priority | Max Response Time | Breach Alert Trigger |
|---|---|---|
| **High** | 24 hours | Auto-create `sla_breach` alert after 24h |
| **Medium** | 48 hours | Auto-create `sla_breach` alert after 48h |
| **Low** | 72 hours | Auto-create `sla_breach` alert after 72h |

> [!NOTE]
> SLA deadlines should be calculated at ticket creation time and stored as `slaDeadline` on the ticket. A scheduled job (or check at query time) flags breaches.
