# EaaS Nexus 4.0 — Detailed MVP Architecture & Feature Specification

## Overview
EaaS Nexus 4.0 is an end-to-end Energy-as-a-Service (EaaS) platform designed to bridge the gap between energy consumers (customers), energy providers (executives), and regulatory bodies (DISCOMs). 

This document provides a highly detailed breakdown of the exact features, technical implementations, and architectural decisions present in the current Minimum Viable Product (MVP) across the three core repositories: `mobile/`, `web-app/`, and `server/`.

---

## 1. System Architecture

The MVP is deployed as a micro-service inspired monolith using a shared central database, serving two distinct frontend applications.

| Layer | Technology Choice | Purpose in MVP |
|-------|-------------------|----------------|
| **Database** | PostgreSQL (Supabase) | Central truth for Users, Properties, Installations, Billing, and Telemetry data. |
| **Backend API** | Node.js, Express.js, TypeScript | RESTful API serving both frontends. Handles JWT auth, role-based access control (RBAC), PDF generation, and Supabase interaction. |
| **Customer App** | React Native (Expo Router) | Mobile-first journey for end-customers to view live solar generation, calculate ROI, and book installations. |
| **Provider/Admin App** | Next.js 15 (App Router), Tailwind | Web-first dashboard for providers to manage pipelines, draft custom bills, and monitor aggregate grid data. |

---

## 2. The Database Schema (Supabase)

The core data model revolves around the `Property` and `SubscriptionStatus`.

*   **Users Table**: Tracks identity and RBAC (`CITIZEN`, `EXECUTIVE`, `ADMIN`).
*   **Properties Table**: Links users to physical locations. Crucially tracks the `subscription_status` (e.g., `SURVEY_PENDING`, `PLAN_PROPOSED`, `ACTIVE`).
*   **Installations & Equipment Tables**: Tracks the lifecycle of hardware (Solar Panels, Inverters, EV Chargers) assigned to properties, including warranty dates and health scores.
*   **Billing & Drafts Tables**: Handles the financial contract between provider and consumer.
*   **Tickets & Alerts Tables**: Manages support queue and automated IoT/Provider alerts.

---

## 3. Customer Journey (Mobile App: `mobile/`)

The mobile application is a strictly linear, state-machine-driven onboarding flow. Users cannot bypass steps; the backend `subscriptionStatus` dictates the UI they see.

### A. Authentication & Profile
*   **Features:** Email/Password Register & Login.
*   **Implementation:** Zustand `useAuthStore` combined with `AsyncStorage` (`user_${id}`). Token-based API access. Supports session resuming without re-login.

### B. The 6-Step Energy Survey
*   **Features:** Users capture data about their property (Residential/Commercial, Address, Monthly Bill, Current Consumption, Occupants).
*   **Implementation:** Submits standard JSON payload to `/api/survey/submit`. Moves property status to `SURVEY_SUBMITTED`.

### C. Proposal & Payment Flow
*   **Features:** Shows generated plan (Solar Capacity, Battery Storage, Estimated Savings). Allows selection of Contract Duration (12/24/36 months).
*   **Implementation:** Mocked payment gateway in MVP. Simulates UPI/Card validation, returns synthetic `transactionId`, and moves status to `PENDING_INSTALLATION`.

### D. Installation Tracker
*   **Features:** An 8-step visual progress tracker (Payment Confirmed → Engineer Assigned → Site Survey → Installation → System Activated).
*   **Implementation:** Includes a "Dev Mode" simulate button to rapidly push the backend state through the pipeline for testing purposes. 

### E. Customer Dashboard (`ACTIVE` state)
Once activated, the app drops the linear flow and unlocks a tab-based navigation shell.
*   **🏠 Home/Monitor Tab:** Real-time energy generation vs consumption. Includes mock live stream data (bridged to an impending Supabase real-time integration).
*   **🔋 Maintenance Tab:** Shows component-level health (Solar Panels, Inverters) with next scheduled service dates.
*   **🍃 Carbon Tab:** Tracks CO2 offset.
*   **🤖 AI Advisor:** A chat interface for energy-saving recommendations based on usage patterns.

---

## 4. Provider & Admin Operations (Web App: `web-app/`)

The Next.js web application is built for heavy data tables, pipeline management, and system administration. It uses a robust role-based layout guard to ensure only `EXECUTIVE` or `ADMIN` roles can view sensitive data.

### A. Provider Dashboard (The Executive View)
*   **Features:** High-level KPIs (Total MRR, Active Installations, Open Tickets, Equipment Alerts).
*   **Implementation:** Aggregates data from `installations`, `support_tickets`, and `provider_alerts` tables. Real-time polling (5s intervals) for new notifications.

### B. Custom Billing Workflow (Crucial MVP Feature)
*   **Features:** Providers do not rely solely on automated logic; they can intercept survey requests and draft highly custom bills.
*   **Workflow:**
    1. Provider views pending survey requests.
    2. Provider generates a 'Billing Draft' (adding installation costs, monthly fees, and specific hardware SKU details).
    3. Draft is sent to the customer (Mobile App trigger).
    4. Customer accepts; backend transitions status to `PROCUREMENT`.
*   **Implementation:** Handled via custom backend routes (`POST /provider/billing/drafts`) and heavy client-side form validation using React Hook Form + Zod.

### C. Installation & Equipment Management
*   **Features:** Kanban-style or table-based view of the installation pipeline (`SURVEY` → `APPROVAL` → `PROCUREMENT` → `INSTALLATION` → `TESTING` → `LIVE`). Provider can manually assign field technicians and update statuses.

### D. Support & Ticketing Triage
*   **Features:** Centralized queue for all tickets raised via the mobile app. Provider can reply, adjust priority, and resolve issues. 

---

## 5. System Services (Backend API: `server/`)

The Express.js API acts as the strict enforcer of business logic and data integrity.

*   **Auth Middleware:** Validates JWTs and strictly enforces role restrictions (`requireRole(Role.ADMIN, Role.EXECUTIVE)`).
*   **PDF Engine:** Capable of generating downloadable strict Tax Invoices natively via raw PDF stream generation in memory.
*   **Real-time WebSocket Emulator:** A built-in WebSocket server at `/energy/stream/:propertyId` that generates realistic jittery data (solar kw, grid kw, battery %) every 15 seconds to simulate IoT telemetry.
*   **Audit Logging:** Built-in `admin_audit_logs` tracking to maintain compliance on who altered billing or user roles.
*   **Graceful Degradation:** Handlers are built to avoid total crashes if specific supplementary DB tables (like `support_faqs` or `support_ticket_messages`) are missing from migrations.

---

## 6. Current Technical Debt & Mocked Boundaries (MVP Limitations)

To ensure shipping velocity, the following boundaries currently reside in mock or simulated states:

1.  **Hardware Telemetry:** Real IoT devices (MQTT sensors) are not connected. The backend simulates Wattage fluctuations via mathematical jitter algorithms on the websocket.
2.  **Payment Gateway:** Razorpay/Stripe integration logic is stubbed out. The system accepts any dummy card payload and verifies it internally.
3.  **Supabase Realtime:** Mobile stream integration still relies internally on simulated intervals rather than genuine Supabase Postgres-Changes subscriptions.
4.  **AI Engine:** Currently relies on static "rule-based" chat responses in the mobile app, though the backend supports the schema for future LLM integration.

---

## Summary
The current EaaS Nexus codebase represents a highly mature Tier-2 MVP. The data schemas, multi-role security guardrails, state-machine routing, and custom provider-drafting workflows are fundamentally complete and production-viable. The immediate next phases involve un-mocking the hardware telemetry and plugging in real payment webhooks.