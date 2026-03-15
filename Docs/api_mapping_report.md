# API Mapping Report: Frontend to Backend

Based on the [EaaS Nexus Backend API specification](https://server-plum-six.vercel.app/api/docs) and the current state of our React frontend, here is a complete mapping of what can be integrated immediately and what APIs are currently missing.

---

## 🟢 1. What Can Be Mapped Immediately (Existing APIs)

We can replace our local `localStorage` mock data (`notifications.ts` and `provider-data.ts`) with these existing backend endpoints right away.

### Auth & User Profile
- **Login / Register / Logout**: `POST /auth/login`, `POST /auth/register`, `POST /auth/logout`
- **User Profile**: `GET /auth/me`, `GET /user/profile`, `PATCH /user/profile`

### User Dashboard Features
- **Survey Submission**: `POST /survey/submit`
- **User Notifications**: `GET /notifications`, `PATCH /notifications/{id}/read`, `PATCH /notifications/read-all`
- **AI Chat**: `POST /ai/chat`, `GET /ai/chat/{propertyId}/history`
- **Current Energy Stats (User)**: `GET /energy/stats/{propertyId}`, `GET /energy/realtime/{propertyId}`
- **User Support Tickets**: `GET /support/tickets`, `POST /support/ticket`
- **Payment & History**: `POST /payment/initiate`, `POST /payment/verify`, `GET /payment/history`
- **Maintenance History (User)**: `GET /maintenance/schedule/...`, `GET /maintenance/history/...`

### Provider Dashboard (Overview & Pipeline)
- **Top KPIs & Overview**: `GET /provider/dashboard`
- **Installations (`/installations`)**: `GET /provider/installations`, `GET /provider/installations/pipeline`, `PATCH /provider/installations/{id}/status`
- **Customers (`/customers`)**: `GET /provider/customers`, `GET /provider/customers/{id}/consumption`, `GET /provider/consumption/aggregate`
- **Revenue/Payments**: `GET /provider/revenue/overview`, `GET /provider/revenue/payments`, `POST /provider/revenue/remind`

### Provider Operations
- **Equipment (`/equipment`)**: `GET /provider/equipment`, `PATCH /provider/equipment/{id}/status`, `POST /provider/equipment/{id}/maintenance`
- **Provider Alerts (`/provider-alerts`)**: `GET /provider/alerts`, `PATCH /provider/alerts/{id}/dismiss`, `PATCH /provider/alerts/dismiss-all`
- **Provider Tickets (`/provider-tickets`)**: `GET /provider/tickets`, `PATCH /provider/tickets/{id}`, `POST /provider/tickets/{id}/approve`, `POST /provider/tickets/{id}/resolve`

---

## 🔴 2. Missing APIs (What We Need to Build)

To support the **recent revamps** we made to the Provider Dashboard and User Billing workflow, the backend is missing the following endpoints:

### A. Provider Custom Billing Generation
In the new flow, the provider creates and edits a custom bill after a survey instead of Gemini generating it blindly.
- **`POST /provider/billing/drafts`** — To submit the custom edited bill (with custom charges, features, hardware costs) to the user. *(Currently, the backend only has `POST /subscription/generate-proposal` which implies automated creation, and `PATCH /billing/admin/{id}/adjust` which is an admin tool, not provider tool).*
- **`GET /provider/billing/drafts`** — For the new `/provider-billing` page so the provider can see all the custom plans they have drafted/sent, including which ones are pending user acceptance.
- **`GET /provider/requests`** — The provider needs a list of new survey requests waiting for them to draft a bill. *(Currently we only have `GET /provider/installations`, but a separate queue for pending survey requests helps split the workflow).*

### B. User Billing Interactions
When the user sees their new custom bill on `/billing`, they have two buttons: "Accept & Pay" and "Raise a Concern".
- **`POST /billing/{billId}/accept`** — We need an endpoint where the user officially accepts the provider's bill. This would move the bill status to `ACCEPTED` and trigger the payment flow or set the installation phase to `PROCUREMENT`.
- **`POST /billing/{billId}/dispute`** — While we currently use `POST /support/ticket` to raise a concern, it would be beneficial to link the dispute directly to the bill ID in the backend.

### C. Provider Account Settings & Profile
Currently, the backend assumes admin roles but we lack a dedicated profile setup for the Energy Providers themselves.
- **`GET /provider/profile` & `PATCH /provider/profile`** — To allow providers to update their company details, branding, support contact, and notification preferences.

---

## Next Steps
1. Shall I begin writing the API integration layer (`axios` or `fetch` wrappers) for the **green (existing)** endpoints to replace our localized fake data?
2. Or would you prefer to update the backend first to include the missing **red** billing workflow endpoints before linking the frontend?
