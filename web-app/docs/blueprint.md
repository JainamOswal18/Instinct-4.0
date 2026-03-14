# **App Name**: EaaS Nexus

## Core Features:

- User Authentication & Onboarding: Secure user registration and login with role-based access (customer, support agent, admin). Firestore profiles.
- Subscription Management: Display tiered subscription plans, enable plan comparison, and streamline the subscription flow. Integrate with Firestore to store subscription data.
- Real-Time Energy Monitoring Dashboard: Provide live energy consumption data and metrics via real-time charts and device status panels. Utilizes mock real-time updates via Cloud Functions.
- Billing & Payments: Generate monthly billing dashboards with itemized charges, payment gateway integration (mock), and recurring payment setup. Store data in Firestore.
- Carbon Footprint Tracking & Reporting: Personal carbon dashboard tracking CO2 savings and impact, transparent calculations, gamified engagement, and downloadable reports.
- Automated Fault Detection & Support: An AI tool to detect faults and send alerts; Includes a ticket-based support system with status tracking, file uploads, and chat-based support.
- IOT Smart Meter Data Integration (Mocked): Meter simulation generates consumption patterns. Simulate data ingestion via Cloud Functions, parsing meter readings and storing in Firestore; includes device management and health status monitoring.
- Enhanced Admin Panel: Expand admin features: Customer list with search, filter, and pagination; Customer account details view and subscription status; Manual billing adjustments and credit issuance interface; Mass alert/notification broadcasting; Platform analytics dashboard (total users, active subscriptions, revenue); Add support agent queue management for assigned tickets
- Analytics Page: Add '/analytics' page with Usage trends (daily, weekly, monthly, yearly comparisons); Cost trends with budget tracking; ROI calculation dashboard (subscription cost vs. energy savings); Peak load identification and peak hours analysis. Implement downloadable reports (CSV, PDF) with data export functionality; Add consumption benchmarking against similar property types.
- DISCOM Integration Simulation: Add a 'Grid Status' section in the dashboard showing: Connection status (online/offline); Grid frequency and voltage; Net-metering approval workflow status (pending/approved/rejected). Include mock DISCOM approval timeline and documents. Show billing sync comparison between EaaS calculated bills and DISCOM records

## Style Guidelines:

- Primary color: Forest green (#38A3A5) evokes nature, sustainability and growth.
- Background color: Light gray (#F0F4F5), very desaturated, provides a clean, modern backdrop.
- Accent color: Gold (#D4AF37) offers a premium feel, highlighting key metrics and CTAs.
- Body font: 'PT Sans', a humanist sans-serif to provide a modern look combined with some warmth and personality.
- Headline font: 'Space Grotesk', a proportional sans-serif with a computerized, techy, scientific feel; goes well with 'PT Sans'.
- Use consistent, minimalist icons relevant to energy, sustainability, and alerts. Focus on clarity.
- Subtle animations for data updates and transitions to provide smooth feedback.