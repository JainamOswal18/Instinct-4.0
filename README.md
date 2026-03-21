<div align="center">

  # EAAS Nexus 
  ### Built by Team Twisted Mind

  Unlocking reliable, clean, and accessible Energy-as-a-Service (EaaS) for everyone.
</div>

## Technology Stack

[![React](https://img.shields.io/badge/React-18/19-61DAFB.svg)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-Ecosystem-000000.svg)](https://nextjs.org/)
[![React Native](https://img.shields.io/badge/React_Native-Expo-02569B.svg)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Types-3178C6.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E.svg)](https://supabase.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Analytics-FFCA28.svg)](https://firebase.google.com/)
[![Google Genkit](https://img.shields.io/badge/Google_Genkit-AI-4285F4.svg)](https://firebase.google.com/docs/genkit)
[![Zustand](https://img.shields.io/badge/Zustand-State-black)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC.svg)](https://tailwindcss.com/)

## The Context

Energy-as-a-Service (EaaS) is an emerging model in the utility sector. Instead of purchasing or maintaining complex energy equipment—like solar panels, batteries, or uninterrupted power backups—customers can subscribe directly to energy services. This approach eliminates high upfront costs and technical complexities, making clean, reliable energy affordable and sustainable for homes, housing societies, and small businesses alike.

## The Problem Statement

With energy costs rising and an undeniable push for adopting renewable resources, consumers struggle with the initial investments and maintenance of clean energy infrastructure. 

The challenge was to design a comprehensive digital platform that allows end consumers to effortlessly **subscribe, track, and manage** energy services (such as solar or backup storage) without owning the actual physical infrastructure, guaranteeing complete transparency, ultimate convenience, and real-time smart meter integration.

## Our Solution: EAAS Nexus

**EAAS Nexus** is a scalable, user-centric ecosystem featuring a Web Platform, a robust Mobile Application, and a real-time Backend properly optimized for IoT tracking. 

We enable customers to adopt tailored EaaS plans effortlessly, monitor their real-world usage via smart meters, simulate transparent monthly billing, and rely on automated fault management capabilities.

### End-to-End Ecosystem
- **Web Platform**: A comprehensive dashboard built on Next.js providing administrators and consumers deep analytical insights into energy consumption, plan management, and billing records.
- **Mobile Application**: A cross-platform mobile application (React Native/Expo) designed for consumers on the go, offering instant alerts, real-time tracking, and automated fault ticketing in the palm of your hand.
- **Backend Server**: A scalable architecture built on Node and Express ready to process IoT telemetry streams and integrate seamlessly with DISCOM workflows (like net-metering approvals) in the future.

## Core Features

### Seamless Subscription Workflows
- **Tiered Plans**: Browse and subscribe to curated energy service plans (e.g., Solar, Backup, Pay-as-you-go, Monthly or Annual cycles).
- **Fast Onboarding**: Customers can successfully browse and subscribe in under 5 minutes.

### Real-Time IoT Tracking & Insights
- **Smart Meter Integration**: Monitor real-time energy usage directly powered by integrated IoT models.
- **Ecological Impact**: Visualize your measurable carbon footprint reduction alongside monetary savings through rich visual charts and dashboards.

### Transparent Billing & Management
- **Bill Simulation**: Accurate, transparent monthly billing breakdowns synced across devices instantly.
- **Flexible Payments**: Integration-ready structures bridging UPI, cards, net banking, and wallets.

### Intelligent Fault Management
- **Automated Alerts**: Push notifications mapping service statuses, savings updates, and outage detection.
- **Support Module**: Built-in interactive fault ticketing mechanisms designed to assist in keeping platform and service uptime ≥ 99%.

## Project Structure

```text
Instinct-4.0/
├── mobile/                  # React Native (Expo) consumer mobile application
│   ├── app/                 # Mobile application routing and screens
│   ├── components/          # Reusable native UI components
│   ├── services/            # API integration and external services
│   └── store/               # Zustand state management
├── server/                  # High-performance Express.js Node API backend
│   ├── src/                 # Application source code (Controllers, Routes, WebSockets)
│   ├── scripts/             # Internal automation & testing scripts
│   └── swagger/             # API Documentation
└── web-app/                 # Enterprise Next.js 15 frontend
    ├── src/app/             # Next.js App Router handling page navigation
    ├── src/components/      # UI primitives (shadcn) & custom React components
    └── src/ai/              # Google Genkit integrations & intelligent workflows
```

## Architecture Framework (Under the Hood)

Our repository represents a highly scalable, decoupled Proof of Concept (PoC) easily convertible to a production-grade infrastructure tailored for DISCOMs and energy service providers.

- **`/web-app`**: Enterprise Next.js frontend leveraging Google Genkit for intelligent features, shadcn/ui components for unparalleled accessibility, and interactive Recharts data visualization.
- **`/mobile`**: Consumer React Native application utilizing Zustand for rapid state management and gesture-based fluid native micro-interactions.
- **`/server`**: High-performance Express.js Node API hooked to a Supabase PostgreSQL instance featuring WebSocket capabilities for reliable, real-time telemetry streaming and Swagger-documented secure endpoints.

## Desired Outcome & Success Metrics

The delivered prototype provides strong proof-of-capability for:
- Accelerated end-user adoption and transparent service transparency.
- The capability of reliably supporting a massive user base and device fleet with stable uptime.
- Clearly demonstrated financial savings via the EaaS model.

## Getting Started

Follow these steps to set up the EAAS Nexus platform ecosystem locally.

### Prerequisites
- Node.js (v20+)
- Expo CLI (for the mobile environment)
- npm or yarn

### 1. Launch Backend Server
```bash
cd server
npm install
npm run dev
```

### 2. Launch Web Platform
```bash
cd web-app
npm install
npm run dev
```

### 3. Launch Mobile Application
```bash
cd mobile
npm install
npm run start
```
*Note: Use the generated QR code with the Expo Go app on your physical device, or run it through an Android/iOS emulator.*

## Team Twisted Mind

EAAS Nexus was built collaboratively by:

1. **Samriddhi Gupta** - [@sg6724](https://github.com/sg6724)
2. **Nandini Saxena** - [@nandini1612](https://github.com/nandini1612)
3. **Jainam Oswal** (Team Lead) - [@JainamOswal18](https://github.com/JainamOswal18)
4. **Rahul Kumar** - [@rahulYUV](https://github.com/rahulYUV)

## License

Distributed under the MIT License. Developed and engineered by **Team Twisted Mind**.
