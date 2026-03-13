# **EaaS Nexus \- Backend API Specification**

## **Overview**

This document outlines all the API endpoints needed to support the EaaS Nexus mobile application. The frontend is built with React Native (Expo) and expects JSON responses.

---

## **Base URL**

Production: https://api.eaasnexus.com  
Development: http://localhost:3000

---

## **Authentication**

All authenticated endpoints require a Bearer token in the header:

Authorization: Bearer \<access\_token\>

---

## **1\. AUTHENTICATION APIs**

### **1.1 User Login**

POST /auth/login

**Request Body:**

{  
  "email": "user@example.com",  
  "password": "password123"  
}

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "user": {  
      "id": "user\_001",  
      "email": "user@example.com",  
      "name": "Rahul Kumar",  
      "phone": "+91 98765 43210",  
      "currentPropertyId": "prop\_001",  
      "properties": \[  
        {  
          "id": "prop\_001",  
          "name": "Home",  
          "address": "123 Green Energy Lane, Mumbai",  
          "type": "residential",  
          "subscriptionStatus": "ACTIVE",  
          "planType": "premium",  
          "installationProgress": {  
            "paymentConfirmed": true,  
            "engineerAssigned": true,  
            "siteSurveyScheduled": true,  
            "installationStarted": true,  
            "systemActivated": true  
          }  
        }  
      \]  
    },  
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  
  }  
}

**Subscription Status Values:**

* `NONE` \- No subscription  
* `SURVEY_PENDING` \- Survey started but not submitted  
* `SURVEY_SUBMITTED` \- Survey submitted, generating proposal  
* `PLAN_PROPOSED` \- Proposal ready, awaiting payment  
* `PAYMENT_PENDING` \- Payment in progress  
* `PENDING_INSTALLATION` \- Paid, waiting for installation  
* `ACTIVE` \- System installed and running

---

### **1.2 User Registration**

POST /auth/register

**Request Body:**

{  
  "name": "Rahul Kumar",  
  "email": "user@example.com",  
  "password": "password123",  
  "phone": "+91 98765 43210"  
}

**Response (201 Created):**

{  
  "success": true,  
  "data": {  
    "user": {  
      "id": "user\_001",  
      "email": "user@example.com",  
      "name": "Rahul Kumar"  
    },  
    "accessToken": "..."  
  }  
}

---

### **1.3 Logout**

POST /auth/logout

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "message": "Logged out successfully"  
}

---

## **2\. SURVEY & ONBOARDING APIs**

### **2.1 Submit Energy Survey**

POST /survey/submit

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Request Body:**

{  
  "propertyId": "prop\_001",  
  "propertyType": "residential",  
  "roofArea": 100,  
  "monthlyBill": 5000,  
  "monthlyConsumption": 350,  
  "peakHours": "6-9 PM",  
  "occupants": 4,  
  "appliances": \[  
    "Air Conditioner",  
    "Water Heater",  
    "Washing Machine",  
    "Refrigerator"  
  \]  
}

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "surveyId": "survey\_001",  
    "submittedAt": "2024-03-13T10:30:00Z",  
    "status": "SUBMITTED"  
  }  
}

---

### **2.2 Generate Subscription Proposal**

POST /subscription/generate-proposal

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Request Body:**

{  
  "propertyId": "prop\_001",  
  "surveyId": "survey\_001"  
}

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "proposalId": "proposal\_001",  
    "solarCapacity": 10,  
    "batteryStorage": 5,  
    "monthlyFee": 3500,  
    "estimatedSavings": 1800,  
    "estimatedProduction": 1200,  
    "contractDuration": 24,  
    "installationFee": 0,  
    "securityDeposit": 5000,  
    "whatsIncluded": \[  
      "10 kW Solar Panel System",  
      "5 kWh Battery Storage",  
      "Smart Energy Monitoring Dashboard",  
      "Grid Integration & Net Metering",  
      "Professional Installation",  
      "24-month Maintenance & Support",  
      "Performance Guarantee",  
      "Mobile App Access"  
    \],  
    "generatedAt": "2024-03-13T10:35:00Z"  
  }  
}

---

### **2.3 Get Proposal Details**

GET /subscription/proposal/:proposalId

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "proposalId": "proposal\_001",  
    "solarCapacity": 10,  
    "batteryStorage": 5,  
    "monthlyFee": 3500,  
    "estimatedSavings": 1800,  
    "estimatedProduction": 1200,  
    "contractDuration": 24,  
    "installationFee": 0,  
    "securityDeposit": 5000,  
    "whatsIncluded": \[...\],  
    "generatedAt": "2024-03-13T10:35:00Z",  
    "expiresAt": "2024-03-20T10:35:00Z"  
  }  
}

---

## **3\. PAYMENT APIs**

### **3.1 Initiate Payment**

POST /payment/initiate

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Request Body:**

{  
  "propertyId": "prop\_001",  
  "proposalId": "proposal\_001",  
  "paymentMethod": "UPI",  
  "amount": 8500,  
  "currency": "INR"  
}

**Payment Method Values:**

* `UPI`  
* `Card`  
* `NetBanking`

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "paymentId": "pay\_001",  
    "orderId": "order\_001",  
    "amount": 8500,  
    "currency": "INR",  
    "status": "PENDING",  
    "paymentGatewayUrl": "https://razorpay.com/checkout/...",  
    "createdAt": "2024-03-13T11:00:00Z"  
  }  
}

---

### **3.2 Verify Payment**

POST /payment/verify

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Request Body:**

{  
  "paymentId": "pay\_001",  
  "orderId": "order\_001",  
  "signature": "razorpay\_signature\_here"  
}

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "paymentId": "pay\_001",  
    "transactionId": "TXN1234567890",  
    "status": "SUCCESS",  
    "amount": 8500,  
    "paidAt": "2024-03-13T11:05:00Z"  
  }  
}

---

### **3.3 Get Payment History**

GET /payment/history?propertyId=prop\_001

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "payments": \[  
      {  
        "paymentId": "pay\_001",  
        "transactionId": "TXN1234567890",  
        "amount": 8500,  
        "paymentMethod": "UPI",  
        "status": "SUCCESS",  
        "description": "First month payment \+ Security deposit",  
        "paidAt": "2024-03-13T11:05:00Z"  
      }  
    \]  
  }  
}

---

## **4\. INSTALLATION APIs**

### **4.1 Get Installation Progress**

GET /installation/progress/:propertyId

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "propertyId": "prop\_001",  
    "progress": {  
      "paymentConfirmed": true,  
      "paymentConfirmedAt": "2024-03-13T11:05:00Z",  
      "engineerAssigned": true,  
      "engineerName": "Rajesh Sharma",  
      "engineerPhone": "+91 98765 43210",  
      "engineerAssignedAt": "2024-03-13T12:00:00Z",  
      "siteSurveyScheduled": true,  
      "siteSurveyDate": "2024-03-16T10:00:00Z",  
      "installationStarted": false,  
      "installationDate": null,  
      "systemActivated": false,  
      "activationDate": null,  
      "estimatedCompletion": "2024-03-25"  
    }  
  }  
}

---

### **4.2 Update Installation Step**

PATCH /installation/update

**Request Headers:**

Authorization: Bearer \<access\_token\>  
Content-Type: application/json

**Request Body:**

{  
  "propertyId": "prop\_001",  
  "step": "siteSurveyScheduled",  
  "data": {  
    "siteSurveyDate": "2024-03-16T10:00:00Z"  
  }  
}

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "message": "Installation step updated",  
    "currentStatus": "PENDING\_INSTALLATION"  
  }  
}

---

## **5\. ENERGY MONITORING APIs**

### **5.1 Get Real-time Energy Data**

GET /energy/realtime/:propertyId

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "propertyId": "prop\_001",  
    "timestamp": "2024-03-13T14:30:00Z",  
    "solarKw": 4.2,  
    "batteryPercent": 67,  
    "gridKw": 0.3,  
    "consumption": 4.5,  
    "production": 4.2,  
    "exporting": false  
  }  
}

---

### **5.2 Get Energy Statistics**

GET /energy/stats/:propertyId

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Query Parameters:**

* `period` \- "day" | "week" | "month" | "year"  
* `startDate` \- ISO 8601 date  
* `endDate` \- ISO 8601 date

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "propertyId": "prop\_001",  
    "period": "month",  
    "currentKwh": 342,  
    "trendPercent": \-12,  
    "carbonSavedKg": 124,  
    "monthlyBill": 2850,  
    "solarProduction": 1200,  
    "gridConsumption": 150,  
    "batteryUsage": 200,  
    "history": \[  
      {  
        "date": "2024-03-01",  
        "production": 45,  
        "consumption": 38,  
        "gridUsage": 5  
      }  
    \]  
  }  
}

---

### **5.3 Stream Real-time Data (WebSocket)**

WS /energy/stream/:propertyId

**Authentication:**

wss://api.eaasnexus.com/energy/stream/prop\_001?token=\<access\_token\>

**Server Messages (every 15 seconds):**

{  
  "type": "ENERGY\_UPDATE",  
  "data": {  
    "timestamp": "2024-03-13T14:30:15Z",  
    "solarKw": 4.3,  
    "batteryPercent": 68,  
    "gridKw": 0.2,  
    "consumption": 4.5  
  }  
}

---

## **6\. NOTIFICATIONS APIs**

### **6.1 Get User Notifications**

GET /notifications

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Query Parameters:**

* `limit` \- Number (default: 50\)  
* `offset` \- Number (default: 0\)  
* `unreadOnly` \- Boolean (default: false)

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "notifications": \[  
      {  
        "id": "notif\_001",  
        "type": "success",  
        "title": "System Activated\! 🎉",  
        "message": "Your solar system is now live and generating clean energy\!",  
        "timestamp": "2024-03-13T12:00:00Z",  
        "read": false,  
        "dismissible": true,  
        "persistent": false,  
        "action": {  
          "label": "View Dashboard",  
          "route": "/(customer)/dashboard"  
        }  
      }  
    \],  
    "unreadCount": 3,  
    "total": 15  
  }  
}

---

### **6.2 Mark Notification as Read**

PATCH /notifications/:notificationId/read

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "message": "Notification marked as read"  
}

---

### **6.3 Mark All Notifications as Read**

PATCH /notifications/read-all

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "message": "All notifications marked as read"  
}

---

## **7\. ALERTS APIs**

### **7.1 Get Property Alerts**

GET /alerts/:propertyId

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "alerts": \[  
      {  
        "id": "alert\_001",  
        "category": "consumption",  
        "severity": "warning",  
        "title": "High Usage Detected",  
        "message": "Your consumption is 23% higher than usual today.",  
        "timestamp": "2024-03-13T10:00:00Z",  
        "read": false  
      },  
      {  
        "id": "alert\_002",  
        "category": "battery",  
        "severity": "critical",  
        "title": "Low Battery",  
        "message": "Battery level is below 20%. Consider reducing usage.",  
        "timestamp": "2024-03-13T09:30:00Z",  
        "read": false  
      }  
    \]  
  }  
}

**Alert Categories:**

* `consumption`  
* `production`  
* `battery`  
* `grid`  
* `system`  
* `maintenance`

**Alert Severity:**

* `info`  
* `warning`  
* `critical`

---

## **8\. BILLING APIs**

### **8.1 Get Current Bill**

GET /billing/current/:propertyId

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "billId": "bill\_current",  
    "propertyId": "prop\_001",  
    "month": "February 2026",  
    "totalAmount": 2850,  
    "subscriptionFee": 3500,  
    "usageCharge": \-850,  
    "taxes": 200,  
    "status": "pending",  
    "dueDate": "2026-02-28",  
    "generatedAt": "2026-02-01"  
  }  
}

---

### **8.2 Get Billing History**

GET /billing/history/:propertyId

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Query Parameters:**

* `limit` \- Number (default: 12\)  
* `offset` \- Number (default: 0\)

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "bills": \[  
      {  
        "billId": "bill\_001",  
        "month": "January 2026",  
        "totalAmount": 3200,  
        "subscriptionFee": 3500,  
        "usageCharge": \-500,  
        "taxes": 200,  
        "status": "paid",  
        "dueDate": "2026-01-31",  
        "paidDate": "2026-01-25",  
        "pdfUrl": "https://api.eaasnexus.com/bills/bill\_001.pdf"  
      }  
    \],  
    "total": 6  
  }  
}

---

### **8.3 Download Bill PDF**

GET /billing/download/:billId

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):** Returns PDF file with headers:

Content-Type: application/pdf  
Content-Disposition: attachment; filename="bill\_001.pdf"

---

## **9\. SUPPORT APIs**

### **9.1 Create Support Ticket**

POST /support/ticket

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Request Body:**

{  
  "propertyId": "prop\_001",  
  "category": "technical",  
  "priority": "high",  
  "title": "Solar panel not generating power",  
  "description": "My solar panel stopped generating power since yesterday afternoon."  
}

**Response (201 Created):**

{  
  "success": true,  
  "data": {  
    "ticketId": "ticket\_001",  
    "status": "open",  
    "createdAt": "2024-03-13T14:00:00Z",  
    "estimatedResponse": "within 24 hours"  
  }  
}

---

### **9.2 Get User Tickets**

GET /support/tickets

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "tickets": \[  
      {  
        "id": "ticket\_001",  
        "title": "Solar panel not generating power",  
        "description": "My solar panel stopped generating power since yesterday afternoon.",  
        "status": "in-progress",  
        "priority": "high",  
        "category": "technical",  
        "createdAt": "2024-03-13T14:00:00Z",  
        "updatedAt": "2024-03-13T15:30:00Z",  
        "responses": 3  
      }  
    \]  
  }  
}

---

## **10\. USER PROFILE APIs**

### **10.1 Get User Profile**

GET /user/profile

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "id": "user\_001",  
    "name": "Rahul Kumar",  
    "email": "user@example.com",  
    "phone": "+91 98765 43210",  
    "address": "123 Green Energy Lane, Mumbai",  
    "createdAt": "2024-01-15T10:00:00Z"  
  }  
}

---

### **10.2 Update User Profile**

PATCH /user/profile

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Request Body:**

{  
  "name": "Rahul Kumar",  
  "phone": "+91 98765 43210",  
  "address": "456 New Address, Mumbai"  
}

**Response (200 OK):**

{  
  "success": true,  
  "message": "Profile updated successfully",  
  "data": {  
    "id": "user\_001",  
    "name": "Rahul Kumar",  
    "email": "user@example.com",  
    "phone": "+91 98765 43210",  
    "address": "456 New Address, Mumbai"  
  }  
}

---

### **10.3 Get User Properties**

GET /user/properties

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "properties": \[  
      {  
        "id": "prop\_001",  
        "name": "Home",  
        "address": "123 Green Energy Lane, Mumbai",  
        "type": "residential",  
        "subscriptionStatus": "ACTIVE",  
        "planType": "premium",  
        "solarCapacity": 10,  
        "batteryStorage": 5,  
        "installationDate": "2024-02-15"  
      }  
    \]  
  }  
}

---

### **10.4 Add New Property**

POST /user/properties

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Request Body:**

{  
  "name": "Office",  
  "address": "456 Business Park, Mumbai",  
  "type": "commercial"  
}

**Response (201 Created):**

{  
  "success": true,  
  "data": {  
    "propertyId": "prop\_002",  
    "name": "Office",  
    "address": "456 Business Park, Mumbai",  
    "type": "commercial",  
    "subscriptionStatus": "NONE",  
    "createdAt": "2024-03-13T15:00:00Z"  
  }  
}

---

## **11\. AI ADVISOR APIs**

### **11.1 Send Message to AI**

POST /ai/chat

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Request Body:**

{  
  "propertyId": "prop\_001",  
  "message": "How can I reduce my electricity bill?"  
}

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "messageId": "msg\_001",  
    "response": "Based on your usage pattern, I notice your peak consumption is during 6-9 PM. Shifting heavy appliances like washing machine and dishwasher to off-peak hours (10 PM \- 6 AM) could save you approximately ₹450/month. Would you like specific recommendations for your appliances?",  
    "timestamp": "2024-03-13T15:30:00Z"  
  }  
}

---

### **11.2 Get Chat History**

GET /ai/chat/:propertyId/history

**Request Headers:**

Authorization: Bearer \<access\_token\>

**Response (200 OK):**

{  
  "success": true,  
  "data": {  
    "messages": \[  
      {  
        "id": "msg\_001",  
        "role": "user",  
        "content": "How can I reduce my electricity bill?",  
        "timestamp": "2024-03-13T15:30:00Z"  
      },  
      {  
        "id": "msg\_002",  
        "role": "assistant",  
        "content": "Based on your usage pattern...",  
        "timestamp": "2024-03-13T15:30:05Z"  
      }  
    \]  
  }  
}

---

## **ERROR RESPONSES**

All error responses follow this format:

**400 Bad Request:**

{  
  "success": false,  
  "error": {  
    "code": "VALIDATION\_ERROR",  
    "message": "Invalid request parameters",  
    "details": {  
      "email": "Invalid email format",  
      "password": "Password must be at least 8 characters"  
    }  
  }  
}

**401 Unauthorized:**

{  
  "success": false,  
  "error": {  
    "code": "UNAUTHORIZED",  
    "message": "Invalid or expired token"  
  }  
}

**403 Forbidden:**

{  
  "success": false,  
  "error": {  
    "code": "FORBIDDEN",  
    "message": "You don't have permission to access this resource"  
  }  
}

**404 Not Found:**

{  
  "success": false,  
  "error": {  
    "code": "NOT\_FOUND",  
    "message": "Resource not found"  
  }  
}

**500 Internal Server Error:**

{  
  "success": false,  
  "error": {  
    "code": "INTERNAL\_ERROR",  
    "message": "Something went wrong. Please try again later."  
  }  
}

