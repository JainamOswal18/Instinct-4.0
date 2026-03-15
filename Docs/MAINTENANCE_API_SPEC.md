# Maintenance API — Backend Spec

This document describes the three maintenance endpoints the mobile app needs.
All endpoints follow the same pattern as the rest of the API.

---

## Base URL

```
https://server-plum-six.vercel.app
```

---

## Auth

All three endpoints require a Bearer token:

```
Authorization: Bearer <access_token>
```

---

## 1. Get Maintenance Schedule

Returns the upcoming service schedule for each hardware component at a property.

```
GET /maintenance/schedule/:propertyId
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "schedule": [
      {
        "id": "solar_panels",
        "component": "Solar Panels",
        "icon": "☀️",
        "lastServiced": "15 Jan 2026",
        "nextService": "15 Jul 2026",
        "status": "good",
        "notes": "Clean panels surface, check mounting brackets, inspect wiring and connections"
      },
      {
        "id": "battery",
        "component": "Battery Storage",
        "icon": "🔋",
        "lastServiced": "15 Feb 2026",
        "nextService": "15 Aug 2026",
        "status": "due_soon",
        "notes": "Check charge/discharge cycles, test BMS, inspect terminal connections"
      },
      {
        "id": "inverter",
        "component": "Inverter",
        "icon": "⚡",
        "lastServiced": "15 Dec 2025",
        "nextService": "15 Jun 2026",
        "status": "overdue",
        "notes": "Firmware update check, efficiency test, cooling fan and heat sink inspection"
      },
      {
        "id": "wiring",
        "component": "Wiring & Connections",
        "icon": "🔌",
        "lastServiced": "15 Oct 2025",
        "nextService": "15 Oct 2026",
        "status": "good",
        "notes": "Inspect all DC/AC cables, check for corrosion, verify earthing"
      },
      {
        "id": "monitoring",
        "component": "Smart Meter & Monitoring",
        "icon": "📊",
        "lastServiced": "15 Nov 2025",
        "nextService": "15 Nov 2026",
        "status": "good",
        "notes": "Verify data accuracy, check connectivity, sync firmware"
      }
    ]
  }
}
```

### Field definitions

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for the component |
| `component` | string | Display name |
| `icon` | string | Emoji for the UI |
| `lastServiced` | string | Human-readable date in `en-IN` locale (e.g. `"15 Jan 2026"`) |
| `nextService` | string | Same format |
| `status` | `"good"` \| `"due_soon"` \| `"overdue"` | Derived from `nextService` date — see logic below |
| `notes` | string | What the engineer checks during this service |

### Status logic

```
overdue   → nextService date is in the past
due_soon  → nextService date is within the next 30 days
good      → nextService date is more than 30 days away
```

### Components to include

These five components should always be returned for every property that has an active system:

| id | Component | Service interval |
|----|-----------|-----------------|
| `solar_panels` | Solar Panels | Every 6 months |
| `battery` | Battery Storage | Every 6 months |
| `inverter` | Inverter | Every 6 months |
| `wiring` | Wiring & Connections | Every 12 months |
| `monitoring` | Smart Meter & Monitoring | Every 12 months |

Base the `lastServiced` and `nextService` dates on the property's `systemActivated` date (stored in the installation progress table).

---

## 2. Get Service History

Returns a log of all past service visits for a property.

```
GET /maintenance/history/:propertyId
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "history": [
      {
        "id": "h1",
        "date": "15 Feb 2026",
        "component": "Solar Panels",
        "type": "Routine Cleaning",
        "engineer": "Rajesh Sharma",
        "notes": "Panels cleaned, dust removed. Efficiency restored to 98%."
      },
      {
        "id": "h2",
        "date": "15 Jan 2026",
        "component": "Battery Storage",
        "type": "Health Check",
        "engineer": "Amit Verma",
        "notes": "Battery health at 94%. No degradation detected. All cells nominal."
      },
      {
        "id": "h3",
        "date": "15 Dec 2025",
        "component": "Inverter",
        "type": "Firmware Update",
        "engineer": "Rajesh Sharma",
        "notes": "Updated to v3.2.1. Efficiency improved by ~2%. No issues."
      },
      {
        "id": "h4",
        "date": "15 Sep 2025",
        "component": "Full System",
        "type": "Annual Inspection",
        "engineer": "Service Team",
        "notes": "All systems nominal. Performance guarantee certificate issued."
      }
    ]
  }
}
```

### Field definitions

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique record ID |
| `date` | string | Human-readable date in `en-IN` locale |
| `component` | string | Which component was serviced |
| `type` | string | Type of service (e.g. `"Routine Cleaning"`, `"Health Check"`, `"Firmware Update"`, `"Annual Inspection"`) |
| `engineer` | string | Name of the engineer who performed the service |
| `notes` | string | Summary of what was done and the outcome |

Return records in reverse chronological order (most recent first).

---

## 3. Get Upcoming Visits

Returns scheduled future service visits for a property.

```
GET /maintenance/upcoming/:propertyId
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "visits": [
      {
        "id": "v1",
        "date": "15 Apr 2026",
        "type": "Bi-annual Service",
        "engineer": "Rajesh Sharma",
        "components": ["Solar Panels", "Inverter", "Battery Storage"],
        "confirmed": false
      }
    ]
  }
}
```

### Field definitions

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique visit ID |
| `date` | string | Scheduled date in `en-IN` locale |
| `type` | string | Visit type (e.g. `"Bi-annual Service"`, `"Annual Inspection"`) |
| `engineer` | string | Assigned engineer name |
| `components` | string[] | List of components to be serviced |
| `confirmed` | boolean | Whether the customer has confirmed the appointment |

Return empty array `[]` if no visits are scheduled — the app handles this gracefully.

---

## Error Responses

Follow the same error shape as the rest of the API:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Property not found"
  }
}
```

Common codes:
- `NOT_FOUND` — property doesn't exist or doesn't belong to this user
- `UNAUTHORIZED` — missing or invalid token

---

## Database Suggestion

You likely need two new tables:

**`maintenance_schedule`**
```
id, property_id, component_id, component_name, last_serviced_at, next_service_at, notes, created_at, updated_at
```

**`service_history`**
```
id, property_id, component_name, service_type, engineer_name, service_notes, serviced_at, created_at
```

**`upcoming_visits`**
```
id, property_id, visit_date, visit_type, engineer_name, components (jsonb array), confirmed, created_at
```

The schedule can be auto-generated when a system is activated (`systemActivated = true` in installation progress) using the intervals defined above. History and upcoming visits are populated by the admin/engineer dashboard when service is logged.

---

## Summary

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/maintenance/schedule/:propertyId` | ✅ | Service schedule per component |
| GET | `/maintenance/history/:propertyId` | ✅ | Past service visits |
| GET | `/maintenance/upcoming/:propertyId` | ✅ | Future scheduled visits |

All three follow the standard `{ success: true, data: { ... } }` envelope.
