# EaaS Nexus — Energy as a Service

> energy services, made simple. From survey to live monitoring — in one app.

EaaS Nexus is a mobile platform that connects households and businesses with energy providers for various energy sources. Customers go from a 5-minute energy survey to a fully installed, monitored energy system — all tracked inside the app.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Expo Go](https://expo.dev/client) installed on your phone (iOS or Android)

### Install & Run

```bash
# 1. Clone the repo
git clone <repo-url>
cd mobile

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the app
npx expo start
```

Scan the QR code with **Expo Go** on your phone. No backend setup needed — it's already live at `https://server-plum-six.vercel.app`.

---

## Full Walkthrough for Judges

The app is designed to be experienced end-to-end. Follow these steps to see the complete journey.

---

### Step 1 — Create an Account

Open the app and tap **Sign Up**.

Fill in:
- Full name
- Email address
- Indian mobile number (10 digits)
- Password (min. 8 characters)

Tap **Create Account**. You'll land on the home screen and be prompted to start your energy survey.

---

### Step 2 — Energy Survey (5 steps)

This is what a real customer would fill in before getting a solar proposal.

| Step | What you enter |
|------|----------------|
| 1 | Energy Services — select which services you want (Solar, Battery Storage, Smart Lighting, Cooling). At least one required. |
| 2 | Property type — Residential or Commercial |
| 3 | Property address |
| 4 | Monthly electricity bill (₹) |
| 5 | Monthly consumption (kWh) + peak usage hours |
| 6 | Number of occupants + major appliances |

Tap **Submit Survey**. You'll see a confirmation screen showing the next steps and an expected engineer contact within 24 hours.

---

### Step 3 — Simulate the Engineer Generating a Proposal

In a real deployment, an EaaS engineer visits the property and generates a custom energy proposal. For the demo, use the **Dev Tool** button on the survey confirmation screen.

> Tap **⚡ Simulate: Engineer submitted proposal**

This moves the account to `PLAN_PROPOSED` status. Tap **Back to Home** — the app automatically routes you to the proposal screen.

---

### Step 4 — Review the Proposal

The proposal screen shows the custom energy plan generated for your property:

- Solar capacity (kW) and battery storage (kWh)
- Monthly subscription fee and estimated savings
- What's included in the plan
- Contract duration

Tap **Accept & Proceed to Payment**.

---

### Step 5 — Payment

Choose a payment method (UPI, Card, or Net Banking) and fill in the details. Payment is mocked — use any values:

- **UPI:** `test@upi`
- **Card:** any 16-digit number, any `MM/YY` expiry, any 3-digit CVV
- **Net Banking:** select any bank

Tap **Pay**. On success, the app moves to the installation tracking screen.

---

### Step 6 — Installation Progress

This screen shows the full journey from payment to system activation. Use the **Dev Tools** button to simulate each installation step one at a time:

1. ⚡ Tap once → Engineer Assigned (shows engineer name + contact options)
2. ⚡ Tap again → Installation Date Confirmed
3. ⚡ Tap again → Installation Started
4. ⚡ Tap again → **System Activated **

On activation, the status moves to `ACTIVE` and the app routes to the **Dashboard**.

---

### Step 7 — Explore the Dashboard

Once active, the full dashboard unlocks with live (mocked) energy data:

#### Home Tab
- Live solar generation, battery level, and grid usage
- Monthly kWh consumption and carbon saved
- Active alerts
- AI Energy Advisor shortcut

#### Monitor Tab
- Switch between Day / Week / Month / Year views
- Production vs consumption breakdown
- Usage trend (% change from previous period)
- Historical bar chart

#### Maintenance Tab
- Service schedule for each component (Solar Panels, Battery, Inverter, Wiring, Smart Meter)
- Colour-coded status: Good / Due Soon / Overdue
- Upcoming service visit
- Service history
- Raise a support ticket directly from any overdue item

#### Carbon Tab
- Carbon savings tracker

#### Profile Tab
- Personal information (editable, saves to backend)
- Billing & Payments — current bill breakdown, payment history
- Support Tickets — create and track support requests (live backend)
- Logout

---

## Key Features

| Feature | Detail |
|---------|--------|
| **End-to-end onboarding** | Survey → Proposal → Payment → Installation → Active |
| **Live energy monitoring** | Real-time solar, battery, grid data with mock stream |
| **Maintenance tracking** | Scheduled service per component, raise tickets inline |
| **AI Energy Advisor** | Chat-based energy insights powered by Claude |
| **Support tickets** | Create and track tickets via live backend |
| **Persistent sessions** | Login once, resume from where you left off |
| **Inline error handling** | No intrusive popups — all errors shown in context |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native + Expo Router |
| State | Zustand + AsyncStorage |
| API | Axios with request/response interceptors |
| Backend | Node.js deployed on Vercel |
| Database | Supabase (PostgreSQL) |
| Auth | JWT Bearer tokens |

---

## Project Structure

```
EaaSNexus/
├── app/
│   ├── (auth)/          # Login, Register
│   ├── (onboarding)/    # Survey, Proposal, Payment
│   ├── (installation)/  # Installation progress tracker
│   └── (customer)/      # Dashboard, Monitor, Maintenance, Profile
├── services/
│   ├── api.ts           # Axios client — all 30 backend endpoints
│   └── apiWrapper.ts    # Mock/real toggle with fallback
├── store/
│   └── useAuthStore.ts  # Auth + property state (Zustand)
├── mock/                # Mock data for all modules
└── components/          # Shared UI components
```

---

## Known Limitations

- **Payment** is fully mocked — no live payment gateway connected
- **Energy stream** uses mock data — Supabase realtime integration is pending
- `splash.png` asset warning in the console — cosmetic only, does not affect functionality

---

## Backend API

Live at `https://server-plum-six.vercel.app`

All endpoints from the spec are implemented and connected. The app includes a mock fallback layer so every feature works even if individual endpoints are unavailable.

---

*Built for INSTINCT 4.0 · EaaS Nexus Team*
