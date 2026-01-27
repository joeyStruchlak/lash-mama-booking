# Lash Mama Mobile Application
## Product Requirements Document (PRD)

**Version:** 2.0  
**Last Updated:** January 2025  
**Status:** Ready for Development  
**Platform:** React Native / Expo (iOS & Android)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [User Roles & Personas](#2-user-roles--personas)
3. [Core Problem Statement](#3-core-problem-statement)
4. [Feature Hierarchy](#4-feature-hierarchy)
5. [Shared Component Architecture (DRY)](#5-shared-component-architecture-dry)
6. [User Stories by Feature](#6-user-stories-by-feature)
7. [User Flows by Role](#7-user-flows-by-role)
8. [Database Schema](#8-database-schema)
9. [Technical Architecture](#9-technical-architecture)
10. [Design System](#10-design-system)
11. [API Specifications](#11-api-specifications)
12. [Success Metrics](#12-success-metrics)
13. [Release Plan](#13-release-plan)
14. [Appendix](#14-appendix)

---

## 1. Executive Summary

### Vision
Lash Mama Mobile is a luxury beauty appointment management application that streamlines booking, client relationships, and business operations for a premium lash salon.

### Target Users
| Role | Description | Primary Goals |
|------|-------------|---------------|
| **Client** | Beauty service customers | Book appointments, earn VIP rewards, manage profile |
| **Manager** | Salon operations manager | Handle daily bookings, client notes, calendar management |
| **Admin** | Business owner (Lash Mama) | Full system control, analytics, staff management |

### Core Value Proposition
- **For Clients:** Effortless booking with VIP rewards and personalized service
- **For Managers:** Streamlined daily operations with intelligent scheduling
- **For Admin:** Complete business visibility with actionable analytics

---

## 2. User Roles & Personas

### 2.1 Client
**Persona:** Sarah, 28, Marketing Professional

| Attribute | Detail |
|-----------|--------|
| **Goals** | Book lash appointments quickly, maintain VIP status, track appointment history |
| **Pain Points** | Difficulty remembering refill schedules, losing track of loyalty progress |
| **Tech Comfort** | High - uses apps daily for scheduling and shopping |
| **Key Needs** | Easy booking, appointment reminders, reward visibility |

**Permissions:**
- ✅ Book/reschedule appointments
- ✅ View own profile and history
- ✅ Access VIP dashboard
- ✅ Make payments
- ✅ Send messages to salon
- ❌ Access other client data
- ❌ Manage calendar
- ❌ View analytics

---

### 2.2 Manager
**Persona:** Nikki, 32, Senior Lash Artist & Operations Manager

| Attribute | Detail |
|-----------|--------|
| **Goals** | Manage daily schedule, track client preferences, handle operations |
| **Pain Points** | Juggling client notes, scheduling conflicts, communication gaps |
| **Tech Comfort** | Medium-High - comfortable with business apps |
| **Key Needs** | Calendar overview, client history access, messaging |

**Permissions:**
- ✅ View/manage calendar
- ✅ Access client notes
- ✅ Send/receive messages
- ✅ Approve/decline reschedules
- ✅ View personal analytics
- ✅ Manage own schedule
- ❌ Full business analytics
- ❌ System-wide staff management
- ❌ System settings

---

### 2.3 Admin (Lash Mama)
**Persona:** Purni, 35, Founder & Business Owner

| Attribute | Detail |
|-----------|--------|
| **Goals** | Grow business, maximize revenue, maintain quality, manage team |
| **Pain Points** | Lack of visibility into business metrics, manual staff coordination |
| **Tech Comfort** | Medium - needs intuitive interfaces |
| **Key Needs** | Complete oversight, actionable analytics, staff management |

**Permissions:**
- ✅ All Manager permissions
- ✅ Full business analytics
- ✅ Staff management (add/edit/remove)
- ✅ VIP program management
- ✅ System settings
- ✅ Manual bookings (no deposit)
- ✅ Revenue reporting
- ✅ Course management
- ✅ Recurring booking setup

---

## 3. Core Problem Statement

### Primary Problem
Beauty clients struggle to book and manage appointments efficiently, while salon operators lack unified tools for managing schedules, client relationships, and business performance.

### Solution
A unified mobile platform providing:
1. **Seamless Booking** - Multi-step booking with artist selection and instant confirmation
2. **Client Loyalty** - VIP streak-based rewards encouraging retention
3. **Operations Hub** - Centralized calendar, notes, and messaging for managers
4. **Business Intelligence** - Real-time analytics and insights for owners

---

## 4. Feature Hierarchy

### 4.1 Must-Have Features (MVP)

| Feature | Client | Manager | Admin |
|---------|--------|---------|-------|
| Multi-step Booking Flow | ✅ | — | ✅ |
| Service Catalog | ✅ | ✅ | ✅ |
| Artist Selection | ✅ | — | — |
| Calendar Management | — | ✅ | ✅ |
| Client Notes | — | ✅ | ✅ |
| Push Notifications | ✅ | ✅ | ✅ |
| Payment Processing | ✅ | — | ✅ |
| Profile Management | ✅ | ✅ | ✅ |

### 4.2 High Priority Features

| Feature | Client | Manager | Admin |
|---------|--------|---------|-------|
| VIP Streak Program | ✅ | — | ✅ |
| Messaging System | ✅ | ✅ | ✅ |
| Appointment History | ✅ | ✅ | ✅ |
| Refill Reminders | ✅ | ✅ | ✅ |
| Client Database | — | ✅ | ✅ |
| Personal Analytics | — | ✅ | ✅ |

### 4.3 Nice-to-Have Features

| Feature | Client | Manager | Admin |
|---------|--------|---------|-------|
| Advanced Analytics | — | — | ✅ |
| Staff Referral Links | — | ✅ | ✅ |
| Course Enrollment | ✅ | — | ✅ |
| Recurring Bookings | — | — | ✅ |
| Photo Gallery | ✅ | ✅ | ✅ |

---

## 5. Shared Component Architecture (DRY)

### 5.1 Component Sharing Strategy

```
src/
├── components/                    # SHARED across all roles
│   ├── ui/                       # Base UI primitives
│   │   ├── Button.tsx           # Universal button with variants
│   │   ├── Card.tsx             # Universal card container
│   │   ├── Input.tsx            # Form inputs
│   │   ├── Badge.tsx            # Status badges
│   │   ├── Avatar.tsx           # User avatars
│   │   ├── Modal.tsx            # Modal dialogs
│   │   ├── Toast.tsx            # Notifications
│   │   ├── Skeleton.tsx         # Loading states
│   │   ├── Switch.tsx           # Toggle switches
│   │   └── index.ts             # Barrel export
│   │
│   ├── layout/                   # Layout components
│   │   ├── ScreenHeader.tsx     # Consistent screen headers
│   │   ├── TabBar.tsx           # Bottom navigation (role-aware)
│   │   ├── SafeArea.tsx         # Safe area wrapper
│   │   ├── FloatingButton.tsx   # FAB component
│   │   └── index.ts
│   │
│   └── common/                   # Shared business components
│       ├── AppointmentCard.tsx  # Used: Client history, Manager calendar, Admin overview
│       ├── ClientCard.tsx       # Used: Manager notes, Admin database
│       ├── ServiceCard.tsx      # Used: Client booking, All service views
│       ├── StatsCard.tsx        # Used: Manager analytics, Admin dashboard
│       ├── CalendarView.tsx     # Used: Manager calendar, Admin calendar
│       ├── MessageBubble.tsx    # Used: All messaging screens
│       ├── NotificationItem.tsx # Used: All notification screens
│       ├── AllergyAlert.tsx     # Used: Manager/Admin client views
│       ├── VIPBadge.tsx         # Used: All client profile displays
│       └── index.ts
│
├── features/                     # Feature-specific (role-owned)
│   ├── auth/                     # Auth - shared by all
│   ├── client/                   # Client-only features
│   ├── manager/                  # Manager-only features
│   └── admin/                    # Admin-only features
│
└── shared/                       # Shared utilities & hooks
    ├── hooks/
    │   ├── useAuth.ts           # Auth state (all roles)
    │   ├── useAppointments.ts   # Appointment queries
    │   ├── useMessages.ts       # Messaging
    │   └── useNotifications.ts  # Push notifications
    │
    ├── utils/
    │   ├── dateHelpers.ts       # Date formatting
    │   ├── priceHelpers.ts      # Currency formatting
    │   └── validationHelpers.ts # Form validation
    │
    └── constants/
        ├── routes.ts            # Route constants
        └── config.ts            # App configuration
```

### 5.2 Shared Component Matrix

| Component | Client | Manager | Admin | Location |
|-----------|--------|---------|-------|----------|
| `Button` | ✅ | ✅ | ✅ | `components/ui/` |
| `Card` | ✅ | ✅ | ✅ | `components/ui/` |
| `Input` | ✅ | ✅ | ✅ | `components/ui/` |
| `Badge` | ✅ | ✅ | ✅ | `components/ui/` |
| `Modal` | ✅ | ✅ | ✅ | `components/ui/` |
| `Avatar` | ✅ | ✅ | ✅ | `components/ui/` |
| `ScreenHeader` | ✅ | ✅ | ✅ | `components/layout/` |
| `TabBar` | ✅ | ✅ | ✅ | `components/layout/` |
| `AppointmentCard` | ✅ | ✅ | ✅ | `components/common/` |
| `ClientCard` | ❌ | ✅ | ✅ | `components/common/` |
| `ServiceCard` | ✅ | ✅ | ✅ | `components/common/` |
| `StatsCard` | ❌ | ✅ | ✅ | `components/common/` |
| `CalendarView` | ❌ | ✅ | ✅ | `components/common/` |
| `MessageBubble` | ✅ | ✅ | ✅ | `components/common/` |
| `VIPBadge` | ✅ | ✅ | ✅ | `components/common/` |
| `AllergyAlert` | ❌ | ✅ | ✅ | `components/common/` |

### 5.3 Manager ↔ Admin Shared Features

These features use **identical components** with **role-based data filtering**:

| Feature | Shared Components | Manager Access | Admin Access |
|---------|-------------------|----------------|--------------|
| **Calendar** | `CalendarView`, `AppointmentCard`, `CalendarHeader` | Own schedule only | All staff schedules |
| **Client Notes** | `ClientCard`, `NoteEditor`, `AllergyBadge` | Assigned clients | All clients |
| **Messaging** | `MessageBubble`, `ChatList`, `MessageInput` | Client messages | All messages + staff |
| **Analytics** | `StatsCard`, `ChartView`, `MetricTile` | Personal metrics | Business-wide metrics |
| **Notifications** | `NotificationItem`, `NotificationList` | Own notifications | System-wide |

### 5.4 Component Implementation Pattern

```typescript
// components/common/StatsCard.tsx
// SHARED between Manager and Admin dashboards

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ComponentType;
  variant?: 'default' | 'highlight' | 'warning';
}

const StatsCard: React.FC<StatsCardProps> = ({ ... }) => {
  // Implementation used by both:
  // - features/manager/dashboard/PersonalStats.tsx
  // - features/admin/analytics/BusinessStats.tsx
};
```

### 5.5 Feature Module Pattern

Each feature module follows this structure:

```
features/{role}/{feature}/
├── components/           # Feature-specific UI
│   ├── FeatureScreen.tsx
│   └── SubComponent.tsx
├── hooks/               # Feature-specific hooks
│   └── useFeature.ts
├── types/               # Feature-specific types
│   └── feature.types.ts
├── styles/              # Feature-specific styles
│   └── feature.styles.ts
├── constants/           # Feature-specific constants
│   └── feature.constants.ts
└── utils/               # Feature-specific helpers
    └── feature.helpers.ts
```

---

## 6. User Stories by Feature

### 6.1 Authentication & Onboarding

#### US-AUTH-001: User Login
**As a** user (any role)  
**I want to** log in with my email and password  
**So that** I can access my personalized dashboard

**Acceptance Criteria:**
- [ ] Email input with validation
- [ ] Secure password field with show/hide toggle
- [ ] "Remember me" checkbox
- [ ] "Forgot password" link
- [ ] Login button disabled until valid input
- [ ] Error messages for invalid credentials
- [ ] Redirect to role-appropriate dashboard on success
- [ ] Session persistence across app restarts

**Story Points:** 5  
**Priority:** P0 (Must-have)

---

#### US-AUTH-002: Password Reset
**As a** user  
**I want to** reset my password via email  
**So that** I can regain access to my account

**Acceptance Criteria:**
- [ ] Email input for password reset request
- [ ] Success message after request sent
- [ ] Email with secure reset link
- [ ] New password form with confirmation
- [ ] Password strength indicator
- [ ] Redirect to login after successful reset

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-AUTH-003: Biometric Login
**As a** returning user  
**I want to** log in using Face ID or fingerprint  
**So that** I can access the app quickly and securely

**Acceptance Criteria:**
- [ ] Biometric prompt on app open (if enabled)
- [ ] Fallback to password option
- [ ] Option to enable/disable in settings
- [ ] Works with both Face ID and Touch ID

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-AUTH-004: First-Time Client Onboarding
**As a** new client  
**I want to** complete my profile during signup  
**So that** the salon has my preferences and health information

**Acceptance Criteria:**
- [ ] Name, phone, email collection
- [ ] Allergy/sensitivity questionnaire
- [ ] Preferred lash style selection
- [ ] Notification preferences
- [ ] Terms and conditions acceptance
- [ ] Optional photo upload
- [ ] Skip option for non-essential fields

**Story Points:** 5  
**Priority:** P1 (High)

---

### 6.2 Client Booking System

#### US-BOOK-001: Browse Services
**As a** client  
**I want to** browse available lash services by category  
**So that** I can find the right service for my needs

**Acceptance Criteria:**
- [ ] Category tabs (Mega Volume, Volume, Natural/Hybrid, etc.)
- [ ] Service cards with image, name, duration, price
- [ ] Expandable description for each service
- [ ] First-time client restrictions clearly shown
- [ ] "Full Set" vs "Refill" differentiation
- [ ] Afterpay pricing displayed

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-BOOK-002: Select Artist
**As a** client  
**I want to** choose my preferred lash artist  
**So that** I can book with someone who matches my style preferences

**Acceptance Criteria:**
- [ ] Artist cards with photo, name, tier badge
- [ ] Specialty tags (Volume Expert, Bridal Specialist)
- [ ] Experience level displayed
- [ ] Tier pricing explanation (Premium +25%, Senior standard, Junior -15%)
- [ ] Availability indicator
- [ ] "Any Available" option

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-BOOK-003: Select Date & Time
**As a** client  
**I want to** pick an available appointment slot  
**So that** I can book at a convenient time

**Acceptance Criteria:**
- [ ] Calendar view with available dates highlighted
- [ ] Time slots shown after date selection
- [ ] Unavailable slots grayed out
- [ ] Artist's working hours respected
- [ ] Minimum 2-hour advance booking
- [ ] Time zone handling

**Story Points:** 5  
**Priority:** P0 (Must-have)

---

#### US-BOOK-004: Review & Confirm Booking
**As a** client  
**I want to** review my booking details before confirming  
**So that** I can ensure everything is correct

**Acceptance Criteria:**
- [ ] Summary showing: service, artist, date, time, price
- [ ] Add notes field for special requests
- [ ] Cancellation policy displayed (48hr, deposit forfeit)
- [ ] Total price with deposit amount
- [ ] Edit option for each selection
- [ ] Confirm button proceeds to payment

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-BOOK-005: Pay Deposit
**As a** client  
**I want to** pay my booking deposit securely  
**So that** my appointment is confirmed

**Acceptance Criteria:**
- [ ] Deposit amount clearly shown
- [ ] Credit card input with validation
- [ ] Afterpay option with 4-payment breakdown
- [ ] Apple Pay / Google Pay support
- [ ] Processing indicator during payment
- [ ] Confirmation screen with booking reference
- [ ] Email/SMS confirmation sent
- [ ] Error handling for failed payments

**Story Points:** 8  
**Priority:** P0 (Must-have)

---

#### US-BOOK-006: Reschedule Appointment
**As a** client  
**I want to** request to reschedule my appointment  
**So that** I can change my booking if my plans change

**Acceptance Criteria:**
- [ ] Reschedule button on appointment detail
- [ ] New date/time selection (same flow as booking)
- [ ] Reason for rescheduling (optional)
- [ ] Submit request for approval
- [ ] Notification when approved/declined
- [ ] 48-hour policy reminder
- [ ] Decline shows reason from manager

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-BOOK-007: Cancel Appointment
**As a** client  
**I want to** cancel my appointment  
**So that** I can free up the slot if I can't attend

**Acceptance Criteria:**
- [ ] Cancel button on appointment detail
- [ ] Cancellation policy warning (deposit forfeit if <48hrs)
- [ ] Confirmation dialog
- [ ] Cancellation reason (optional)
- [ ] Deposit status shown (refunded/forfeited)
- [ ] Confirmation message
- [ ] Slot becomes available for others

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-BOOK-008: First-Time Booking Restrictions
**As a** first-time client  
**I want to** understand my booking options  
**So that** I know I can only book full sets or removals

**Acceptance Criteria:**
- [ ] Clear messaging that refills require previous full set
- [ ] Refill options disabled with explanation
- [ ] "Book Your First Full Set" CTA
- [ ] After first appointment, refills unlocked
- [ ] System tracks client appointment history

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-BOOK-009: Quick Rebook
**As a** returning client  
**I want to** quickly rebook the same service  
**So that** I don't have to go through the full booking flow

**Acceptance Criteria:**
- [ ] "Rebook" button on past appointment card
- [ ] Pre-filled service and artist
- [ ] Jump directly to date/time selection
- [ ] Option to modify selections
- [ ] Same payment flow

**Story Points:** 3  
**Priority:** P2 (Medium)

---

### 6.3 Client VIP Program

#### US-VIP-001: View VIP Status
**As a** client  
**I want to** see my current VIP tier and progress  
**So that** I understand my loyalty benefits

**Acceptance Criteria:**
- [ ] Current tier displayed (Bronze/Silver/Gold/Platinum)
- [ ] Points/visits count
- [ ] Progress bar to next tier
- [ ] Next tier benefits preview
- [ ] Tier badge on profile

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-VIP-002: Track Refill Streak
**As a** VIP client  
**I want to** see my refill streak status  
**So that** I can maintain my discount

**Acceptance Criteria:**
- [ ] Current streak count (weeks)
- [ ] Streak deadline (next refill due date)
- [ ] Warning when streak at risk
- [ ] Discount percentage based on streak
- [ ] Streak history visualization
- [ ] "Streak saved" indicator after booking

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-VIP-003: View VIP Benefits
**As a** VIP member  
**I want to** see all my available benefits  
**So that** I can use them when booking

**Acceptance Criteria:**
- [ ] List of current tier benefits
- [ ] Birthday discount (if birthday month)
- [ ] Referral credits
- [ ] Exclusive service access
- [ ] Early booking window
- [ ] Streak-based discounts

**Story Points:** 3  
**Priority:** P2 (Medium)

---

#### US-VIP-004: Refer a Friend
**As a** client  
**I want to** share a referral code  
**So that** I can earn rewards when friends book

**Acceptance Criteria:**
- [ ] Unique referral code/link
- [ ] Share via SMS, email, social
- [ ] Track pending referrals
- [ ] See earned rewards
- [ ] Notification when referral completes

**Story Points:** 5  
**Priority:** P2 (Medium)

---

### 6.4 Client Profile & History

#### US-PROF-001: View Appointment History
**As a** client  
**I want to** see my past appointments  
**So that** I can track my lash history

**Acceptance Criteria:**
- [ ] List of past appointments
- [ ] Details: date, service, artist, price
- [ ] Photos attached (if any)
- [ ] Rebook same service button
- [ ] Filter by date range
- [ ] Total spent displayed

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-PROF-002: Update Profile
**As a** client  
**I want to** update my personal information  
**So that** my details are current

**Acceptance Criteria:**
- [ ] Edit name, phone, email
- [ ] Update profile photo
- [ ] Change password
- [ ] Update allergy information
- [ ] Notification preferences
- [ ] Save confirmation

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-PROF-003: View Upcoming Appointments
**As a** client  
**I want to** see my scheduled appointments  
**So that** I can prepare for my visits

**Acceptance Criteria:**
- [ ] List of upcoming appointments
- [ ] Countdown to next appointment
- [ ] Quick actions: reschedule, cancel, message
- [ ] Add to phone calendar option
- [ ] Directions to salon

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-PROF-004: Set Custom Reminders
**As a** client  
**I want to** customize my appointment reminders  
**So that** I receive notifications at my preferred times

**Acceptance Criteria:**
- [ ] Choose reminder timing (15min, 1hr, 24hr, etc.)
- [ ] Enable/disable different reminder types
- [ ] SMS vs push notification preference
- [ ] Test reminder option

**Story Points:** 2  
**Priority:** P2 (Medium)

---

### 6.5 Client Messaging

#### US-MSG-001: Send Message to Salon
**As a** client  
**I want to** message the salon  
**So that** I can ask questions or communicate special requests

**Acceptance Criteria:**
- [ ] Chat interface
- [ ] Text message input
- [ ] Send photos
- [ ] Delivered/read indicators
- [ ] Push notification for replies
- [ ] Message history

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-MSG-002: Receive Message Notifications
**As a** client  
**I want to** be notified of new messages  
**So that** I don't miss important communications

**Acceptance Criteria:**
- [ ] Push notification for new messages
- [ ] Badge count on messages tab
- [ ] Preview of message content
- [ ] Tap to open conversation

**Story Points:** 2  
**Priority:** P1 (High)

---

### 6.6 Manager Calendar & Scheduling

#### US-CAL-001: View Daily Schedule
**As a** manager  
**I want to** see my appointments for today  
**So that** I can prepare for my day

**Acceptance Criteria:**
- [ ] Day view with time slots
- [ ] Appointments shown with client name, service
- [ ] Color coding by service type
- [ ] Gap identification
- [ ] Current time indicator
- [ ] Quick client info on tap

**Story Points:** 5  
**Priority:** P0 (Must-have)

---

#### US-CAL-002: View Weekly Schedule
**As a** manager  
**I want to** see my week overview  
**So that** I can plan ahead

**Acceptance Criteria:**
- [ ] Week grid view
- [ ] Appointment blocks per day
- [ ] Swipe to change weeks
- [ ] Jump to today
- [ ] Total appointments per day
- [ ] Revenue per day (optional toggle)

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-CAL-003: View Appointment Details
**As a** manager  
**I want to** see full appointment details  
**So that** I can prepare for the client

**Acceptance Criteria:**
- [ ] Client name, phone, photo
- [ ] Service details and duration
- [ ] Allergy/health alerts prominently shown
- [ ] Client notes and preferences
- [ ] Previous appointment history
- [ ] VIP status badge
- [ ] Payment status

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-CAL-004: Handle Reschedule Requests
**As a** manager  
**I want to** approve or decline reschedule requests  
**So that** I can manage schedule changes

**Acceptance Criteria:**
- [ ] Pending requests notification badge
- [ ] List of pending reschedules
- [ ] Original and requested time shown
- [ ] Approve with one tap
- [ ] Decline requires reason
- [ ] Client notified of decision
- [ ] Calendar auto-updates on approval

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-CAL-005: Block Time Off
**As a** manager  
**I want to** block off unavailable time  
**So that** clients can't book during those periods

**Acceptance Criteria:**
- [ ] Select date/time range
- [ ] Reason for block (optional)
- [ ] Recurring block option (weekly off)
- [ ] Blocked time shown on calendar
- [ ] Availability updates immediately

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-CAL-006: Request Time Off
**As a** manager  
**I want to** request vacation or leave  
**So that** Admin can approve and cover my shifts

**Acceptance Criteria:**
- [ ] Date range selection
- [ ] Reason field
- [ ] Submit for Admin approval
- [ ] View request status (pending/approved/declined)
- [ ] Notification when decision made

**Story Points:** 3  
**Priority:** P1 (High)

---

### 6.7 Manager Client Notes

#### US-NOTE-001: View Client Notes
**As a** manager  
**I want to** see notes for a client  
**So that** I can provide personalized service

**Acceptance Criteria:**
- [ ] Client search/selection
- [ ] Notes history chronologically
- [ ] Allergy alerts at top
- [ ] Photo history
- [ ] Preferred styles noted
- [ ] Last visit summary

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-NOTE-002: Add Client Note
**As a** manager  
**I want to** add notes after an appointment  
**So that** I can record important details

**Acceptance Criteria:**
- [ ] Text note input
- [ ] Attach photos
- [ ] Tag categories (style, preference, concern)
- [ ] Flag as important
- [ ] Timestamp auto-added
- [ ] Link to appointment

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-NOTE-003: View Allergy Information
**As a** manager  
**I want to** see client allergies before appointment  
**So that** I can take appropriate precautions

**Acceptance Criteria:**
- [ ] Allergy alert prominently displayed
- [ ] Allergy type and severity
- [ ] Last updated date
- [ ] Edit capability
- [ ] Alert shown on appointment card

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-NOTE-004: Upload Before/After Photos
**As a** manager  
**I want to** upload photos of my work  
**So that** I can track client lash history

**Acceptance Criteria:**
- [ ] Camera access for photos
- [ ] Gallery selection option
- [ ] Label as before/after
- [ ] Link to appointment
- [ ] View in client profile

**Story Points:** 3  
**Priority:** P1 (High)

---

### 6.8 Manager Analytics (Personal)

#### US-ANAL-001: View Personal Stats
**As a** manager  
**I want to** see my performance metrics  
**So that** I can track my productivity

**Acceptance Criteria:**
- [ ] Appointments this week/month
- [ ] Revenue generated
- [ ] Average rating
- [ ] Client retention rate
- [ ] Comparison to previous period
- [ ] Top services performed

**Story Points:** 5  
**Priority:** P2 (Medium)

---

#### US-ANAL-002: View Earnings
**As a** manager  
**I want to** see my earnings breakdown  
**So that** I understand my income

**Acceptance Criteria:**
- [ ] Daily/weekly/monthly totals
- [ ] Service-by-service breakdown
- [ ] Tips if applicable
- [ ] Commission calculations
- [ ] Export capability

**Story Points:** 3  
**Priority:** P2 (Medium)

---

### 6.9 Manager Messaging

#### US-MMSG-001: View Client Messages
**As a** manager  
**I want to** see messages from my clients  
**So that** I can respond to their needs

**Acceptance Criteria:**
- [ ] Inbox with unread count
- [ ] Client conversations list
- [ ] Most recent message preview
- [ ] Time since last message
- [ ] Filter by unread

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-MMSG-002: Reply to Messages
**As a** manager  
**I want to** respond to client messages  
**So that** I can communicate with them

**Acceptance Criteria:**
- [ ] Chat interface
- [ ] Text and photo sending
- [ ] Quick reply templates
- [ ] Client sees read status
- [ ] Push notification to client

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-MMSG-003: Quick Reply Templates
**As a** manager  
**I want to** use pre-written message templates  
**So that** I can respond quickly to common questions

**Acceptance Criteria:**
- [ ] Template library
- [ ] One-tap to insert template
- [ ] Edit before sending
- [ ] Common templates pre-loaded
- [ ] Custom template creation

**Story Points:** 2  
**Priority:** P2 (Medium)

---

### 6.10 Admin Dashboard & Analytics

#### US-ADMIN-001: View Business Overview
**As an** admin  
**I want to** see a business dashboard  
**So that** I understand overall performance

**Acceptance Criteria:**
- [ ] Total revenue (day/week/month/year)
- [ ] Total bookings
- [ ] New clients count
- [ ] Average rating
- [ ] Trend indicators (up/down)
- [ ] Quick actions

**Story Points:** 5  
**Priority:** P0 (Must-have)

---

#### US-ADMIN-002: View Revenue Analytics
**As an** admin  
**I want to** see detailed revenue reports  
**So that** I can understand business finances

**Acceptance Criteria:**
- [ ] Revenue chart (bar/line)
- [ ] Filter by period
- [ ] Revenue by service type
- [ ] Revenue by staff member
- [ ] Comparison to previous periods
- [ ] Export capability

**Story Points:** 8  
**Priority:** P1 (High)

---

#### US-ADMIN-003: View Staff Performance
**As an** admin  
**I want to** see performance metrics per staff  
**So that** I can manage my team effectively

**Acceptance Criteria:**
- [ ] Staff leaderboard
- [ ] Bookings per staff member
- [ ] Revenue per staff member
- [ ] Average rating per staff
- [ ] Client retention per staff
- [ ] Filter by period

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-ADMIN-004: View Service Analytics
**As an** admin  
**I want to** see which services are most popular  
**So that** I can optimize offerings

**Acceptance Criteria:**
- [ ] Services ranked by bookings
- [ ] Services ranked by revenue
- [ ] Service trends over time
- [ ] Underperforming services identified
- [ ] Price optimization suggestions

**Story Points:** 5  
**Priority:** P2 (Medium)

---

#### US-ADMIN-005: View Client Insights
**As an** admin  
**I want to** understand my client base  
**So that** I can improve marketing and retention

**Acceptance Criteria:**
- [ ] New vs returning client ratio
- [ ] VIP conversion rate
- [ ] Average client lifetime value
- [ ] Churn rate
- [ ] Client acquisition sources

**Story Points:** 5  
**Priority:** P2 (Medium)

---

### 6.11 Admin Staff Management

#### US-STAFF-001: View Staff List
**As an** admin  
**I want to** see all staff members  
**So that** I can manage my team

**Acceptance Criteria:**
- [ ] Staff cards with photo, name, role
- [ ] Current status (active/on leave)
- [ ] Quick actions per staff
- [ ] Add new staff button
- [ ] Search/filter

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-STAFF-002: Add Staff Member
**As an** admin  
**I want to** add new staff to the system  
**So that** they can manage bookings

**Acceptance Criteria:**
- [ ] Name, email, phone input
- [ ] Role selection (Manager)
- [ ] Tier assignment (Premium/Senior/Junior)
- [ ] Service categories assignment
- [ ] Profile photo upload
- [ ] Working hours setup
- [ ] Send login credentials

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-STAFF-003: Edit Staff Details
**As an** admin  
**I want to** edit staff information  
**So that** details stay current

**Acceptance Criteria:**
- [ ] Edit all staff fields
- [ ] Change tier/pricing
- [ ] Update service assignments
- [ ] Modify schedule
- [ ] Deactivate staff option
- [ ] Change history tracked

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-STAFF-004: View Staff Schedules
**As an** admin  
**I want to** see all staff schedules  
**So that** I can manage salon capacity

**Acceptance Criteria:**
- [ ] Calendar view with all staff
- [ ] Color coded by staff member
- [ ] Filter by individual staff
- [ ] Identify gaps and conflicts
- [ ] Total capacity per day

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-STAFF-005: Approve Time Off Requests
**As an** admin  
**I want to** review and approve/decline time off requests  
**So that** I maintain adequate coverage

**Acceptance Criteria:**
- [ ] Pending requests queue
- [ ] Staff name and dates requested
- [ ] Reason for request shown
- [ ] Approve with one tap
- [ ] Decline requires reason
- [ ] Staff notified of decision

**Story Points:** 3  
**Priority:** P1 (High)

---

### 6.12 Admin Client Management

#### US-CLIENT-001: View Client Database
**As an** admin  
**I want to** see all clients  
**So that** I can manage relationships

**Acceptance Criteria:**
- [ ] Client list with search
- [ ] Sort by name, last visit, total spent
- [ ] VIP status filter
- [ ] Quick contact actions
- [ ] Export capability

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-CLIENT-002: View Client Profile (Admin)
**As an** admin  
**I want to** see complete client details  
**So that** I have full visibility

**Acceptance Criteria:**
- [ ] All client information
- [ ] Complete appointment history
- [ ] Total lifetime value
- [ ] VIP status and progress
- [ ] All notes from all staff
- [ ] Payment history

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-CLIENT-003: Manage VIP Status
**As an** admin  
**I want to** manually adjust VIP status  
**So that** I can reward special clients

**Acceptance Criteria:**
- [ ] Upgrade/downgrade tier
- [ ] Add bonus points
- [ ] Reset streak (with reason)
- [ ] Grant special benefits
- [ ] Add VIP notes
- [ ] Change history tracked

**Story Points:** 3  
**Priority:** P2 (Medium)

---

### 6.13 Admin Booking Management

#### US-ABOOK-001: Create Manual Booking
**As an** admin  
**I want to** create bookings without deposits  
**So that** I can accommodate special cases

**Acceptance Criteria:**
- [ ] Select client (existing or new)
- [ ] Select service and artist
- [ ] Choose date/time
- [ ] Skip deposit option (admin only)
- [ ] Add booking notes
- [ ] Client receives confirmation

**Story Points:** 5  
**Priority:** P0 (Must-have)

---

#### US-ABOOK-002: Create Recurring Booking
**As an** admin  
**I want to** set up recurring appointments  
**So that** VIP clients have guaranteed slots

**Acceptance Criteria:**
- [ ] Select client
- [ ] Choose service and artist
- [ ] Set recurrence (weekly/bi-weekly)
- [ ] Set duration (6 months, 12 months, ongoing)
- [ ] Set preferred day/time
- [ ] Generate all future bookings
- [ ] Client sees recurring indicator

**Story Points:** 8  
**Priority:** P2 (Medium)

---

#### US-ABOOK-003: Override Booking Rules
**As an** admin  
**I want to** override booking restrictions  
**So that** I can handle exceptions

**Acceptance Criteria:**
- [ ] Allow refill for first-time (with full set credit)
- [ ] Book outside normal hours
- [ ] Reduce/waive deposit
- [ ] Double-book if needed
- [ ] All overrides logged

**Story Points:** 5  
**Priority:** P2 (Medium)

---

#### US-ABOOK-004: View All Bookings
**As an** admin  
**I want to** see all bookings across all staff  
**So that** I have complete visibility

**Acceptance Criteria:**
- [ ] Master calendar view
- [ ] Filter by staff member
- [ ] Filter by service type
- [ ] Filter by date range
- [ ] Search by client name
- [ ] Export capability

**Story Points:** 5  
**Priority:** P1 (High)

---

### 6.14 Admin Settings

#### US-SET-001: Manage Service Catalog
**As an** admin  
**I want to** edit services and pricing  
**So that** offerings stay current

**Acceptance Criteria:**
- [ ] Add/edit/remove services
- [ ] Set prices and durations
- [ ] Assign to categories
- [ ] Set staff assignments
- [ ] Enable/disable services
- [ ] Add service photos

**Story Points:** 5  
**Priority:** P1 (High)

---

#### US-SET-002: Manage Notifications
**As an** admin  
**I want to** configure notification settings  
**So that** communication is appropriate

**Acceptance Criteria:**
- [ ] Set reminder timing (24hr, 2hr)
- [ ] Enable/disable notification types
- [ ] Customize message templates
- [ ] Set business hours for notifications
- [ ] Test notification sending

**Story Points:** 5  
**Priority:** P2 (Medium)

---

#### US-SET-003: Manage Business Hours
**As an** admin  
**I want to** set salon operating hours  
**So that** bookings respect availability

**Acceptance Criteria:**
- [ ] Set hours per day of week
- [ ] Set holiday closures
- [ ] Special event hours
- [ ] Booking buffer times
- [ ] Immediate effect on availability

**Story Points:** 3  
**Priority:** P1 (High)

---

### 6.15 Notifications (All Roles)

#### US-NOTIF-001: Receive Appointment Reminders
**As a** user  
**I want to** receive appointment reminders  
**So that** I don't forget my appointments

**Acceptance Criteria:**
- [ ] Push notification at configured intervals
- [ ] Notification shows date, time, service
- [ ] Tap opens appointment detail
- [ ] Option to snooze
- [ ] Works when app is closed

**Story Points:** 5  
**Priority:** P0 (Must-have)

---

#### US-NOTIF-002: Receive Booking Confirmations
**As a** client  
**I want to** receive booking confirmation  
**So that** I know my appointment is confirmed

**Acceptance Criteria:**
- [ ] Push notification immediately after booking
- [ ] Email confirmation with details
- [ ] SMS confirmation (optional)
- [ ] Calendar invite attachment

**Story Points:** 3  
**Priority:** P0 (Must-have)

---

#### US-NOTIF-003: Receive Refill Reminders
**As a** client  
**I want to** receive refill reminders  
**So that** I maintain my lashes

**Acceptance Criteria:**
- [ ] Notification at optimal refill time
- [ ] Based on last appointment date
- [ ] Quick book action from notification
- [ ] Streak warning if applicable

**Story Points:** 3  
**Priority:** P1 (High)

---

#### US-NOTIF-004: Receive Approval Notifications
**As a** manager  
**I want to** be notified when Admin approves/declines my requests  
**So that** I know the status of my time-off requests

**Acceptance Criteria:**
- [ ] Push notification on decision
- [ ] Approval or decline clearly indicated
- [ ] Reason shown if declined
- [ ] Tap to view details

**Story Points:** 2  
**Priority:** P1 (High)

---

---

## 7. User Flows by Role

### 7.1 Client Flows

#### Flow C1: New Client First Booking
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NEW CLIENT BOOKING FLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │  START   │
    └────┬─────┘
         │
         ▼
┌─────────────────┐      ┌─────────────────┐
│   Download App  │─────▶│  Welcome Screen │
└─────────────────┘      └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  Create Account │
                         │  - Email        │
                         │  - Password     │
                         │  - Phone        │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Onboarding    │
                         │  - Preferences  │
                         │  - Allergies    │
                         │  - Style quiz   │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Home Screen   │
                         │  "Book Now" CTA │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Select Service  │
                         │ (Full Set Only) │◀──────────────────┐
                         │ [Refills locked │                   │
                         │  with tooltip]  │                   │
                         └────────┬────────┘                   │
                                  │                            │
                                  ▼                            │
                         ┌─────────────────┐                   │
                         │  Select Artist  │                   │
                         │ - View profiles │                   │
                         │ - See pricing   │                   │
                         │ - Check avail   │                   │
                         └────────┬────────┘                   │
                                  │                            │
                                  ▼                            │
                         ┌─────────────────┐                   │
                         │ Select DateTime │                   │
                         │ - Calendar view │                   │
                         │ - Time slots    │                   │
                         └────────┬────────┘                   │
                                  │                            │
                                  ▼                            │
                         ┌─────────────────┐     ┌─────────────┤
                         │ Review Booking  │     │ Edit        │
                         │ - Summary       │─────▶ [Go back]   │
                         │ - Add notes     │     │             │
                         │ - View policy   │     └─────────────┘
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  Pay Deposit    │
                         │ - Card / Apple  │
                         │ - Afterpay      │
                         └────────┬────────┘
                                  │
                         ┌────────┴────────┐
                         ▼                 ▼
                   ┌──────────┐     ┌──────────────┐
                   │ Success! │     │ Payment Fail │
                   │ - Conf # │     │ - Retry      │
                   │ - Email  │     │ - Different  │
                   │ - Push   │     │   method     │
                   └────┬─────┘     └──────────────┘
                        │
                        ▼
                   ┌──────────┐
                   │   END    │
                   │ (Home w/ │
                   │ upcoming)│
                   └──────────┘
```

---

#### Flow C2: VIP Client Refill Booking
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VIP REFILL BOOKING FLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │  START   │
    │ (VIP     │
    │  Client) │
    └────┬─────┘
         │
         ▼
┌─────────────────┐      ┌─────────────────────────────────────┐
│   Home Screen   │      │       VIP STATUS BANNER             │
│                 │─────▶│  "Gold Member • 8 Week Streak 🔥"   │
│                 │      │  "Refill Due in 3 Days"             │
└────────┬────────┘      └─────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Quick Rebook   │ ◀─── "Same service, same artist, next slot"
│  OR             │
│  New Booking    │
└────────┬────────┘
         │
         ├────────────────────────┐
         │ Quick Rebook           │ New Booking
         ▼                        ▼
┌─────────────────┐      ┌─────────────────┐
│ Confirm Details │      │ Full Booking    │
│ - Same service  │      │ Flow (see C1)   │
│ - Same artist   │      │                 │
│ - Next slot     │      └─────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ VIP Discounts   │
│ Applied Auto    │
│ - Streak: 10%   │
│ - Tier: 5%      │
│ - Birthday: $20 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Pay (Reduced)  │
│  Deposit        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Success!      │
│ "Streak now 9!" │
│ "Next tier: 12" │
└─────────────────┘
```

---

#### Flow C3: Client Reschedule Request
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RESCHEDULE REQUEST FLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────┐
│  START   │
│ (Has     │
│ booking) │
└────┬─────┘
     │
     ▼
┌─────────────────┐
│ My Appointments │
│ [Upcoming Tab]  │
└────────┬────────┘
     │
     ▼
┌─────────────────┐
│ Tap Appointment │
│ Detail View     │
└────────┬────────┘
     │
     ▼
┌─────────────────┐
│ Actions Menu    │
│ ┌─────────────┐ │
│ │ Reschedule  │ │◀─── User taps
│ ├─────────────┤ │
│ │ Cancel      │ │
│ ├─────────────┤ │
│ │ Message     │ │
│ └─────────────┘ │
└────────┬────────┘
     │
     ▼
┌─────────────────┐
│ Policy Warning  │
│ "<48hrs = fee"  │
│ [Continue]      │
└────────┬────────┘
     │
     ▼
┌─────────────────┐
│ Select New Date │
│ & Time          │
│ (Same artist)   │
└────────┬────────┘
     │
     ▼
┌─────────────────┐
│ Add Reason      │
│ (Optional)      │
└────────┬────────┘
     │
     ▼
┌─────────────────┐
│ Submit Request  │
│ "Pending        │
│  Approval"      │
└────────┬────────┘
     │
     │ ◀─── Notification to Manager/Admin
     │
┌────┴────────────────────────┐
│                             │
▼                             ▼
┌────────────────┐    ┌────────────────┐
│   APPROVED     │    │   DECLINED     │
│ - Calendar     │    │ - Reason shown │
│   updated      │    │ - Keep orig    │
│ - Push notif   │    │ - Push notif   │
│ - New confirm  │    │ - Contact opt  │
└────────────────┘    └────────────────┘
```

---

#### Flow C4: Client Profile & VIP Dashboard
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLIENT PROFILE FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────┐
│  START   │
│(Tap Prof)│
└────┬─────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PROFILE SCREEN                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  👤 Sarah Thompson                                       │   │
│  │  ⭐ Gold VIP Member                                      │   │
│  │  🔥 8 Week Streak                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Upcoming    │  │  History    │  │   VIP       │             │
│  │ Appointments│  │             │  │ Dashboard   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Quick Actions                                            │   │
│  │ ├─ Edit Profile                                         │   │
│  │ ├─ Notification Settings                                │   │
│  │ ├─ Payment Methods                                      │   │
│  │ ├─ Refer a Friend                                       │   │
│  │ └─ Logout                                               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         │
         │ Tap VIP Dashboard
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VIP DASHBOARD                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  GOLD MEMBER                                             │   │
│  │  ████████████████░░░░ 80%                                │   │
│  │  4 more visits to Platinum!                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  CURRENT STREAK: 8 Weeks 🔥                                     │
│  Next refill by: Feb 5 to maintain streak                       │
│                                                                 │
│  YOUR BENEFITS:                                                 │
│  ├─ 10% Streak Discount                                        │
│  ├─ 5% Gold Member Discount                                    │
│  ├─ Priority Booking Access                                    │
│  └─ Free Birthday Treatment                                    │
│                                                                 │
│  [Share Referral Code]                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

### 7.2 Manager Flows

#### Flow M1: Manager Daily Workflow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MANAGER DAILY WORKFLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │  START   │
    │ (Morning)│
    └────┬─────┘
         │
         ▼
┌─────────────────┐
│     LOGIN       │
│ (Biometric)     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MANAGER DASHBOARD                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  TODAY'S OVERVIEW                                        │   │
│  │  ├─ 6 Appointments                                       │   │
│  │  ├─ First: 9:00 AM - Sarah (Volume Full Set)            │   │
│  │  ├─ Last: 4:00 PM - Emma (Mega Volume Refill)           │   │
│  │  └─ 2 Gaps Available                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │ 🔔 3 New   │  │ 📅 Calendar│  │ 📝 Notes   │                │
│  │ Messages   │  │            │  │            │                │
│  └────────────┘  └────────────┘  └────────────┘                │
└─────────────────────────────────────────────────────────────────┘
         │
         ├─────────────────────────────────┐
         │                                 │
         ▼                                 ▼
┌─────────────────┐               ┌─────────────────┐
│ CHECK MESSAGES  │               │ VIEW CALENDAR   │
│ - Client Qs     │               │ - Day view      │
│ - Reply quickly │               │ - Check details │
└────────┬────────┘               └────────┬────────┘
         │                                 │
         │                                 ▼
         │                        ┌─────────────────┐
         │                        │ TAP FIRST APPT  │
         │                        │ - Sarah         │
         │                        │ - Volume Full   │
         │                        └────────┬────────┘
         │                                 │
         │                                 ▼
         │                        ┌─────────────────────────────────────────┐
         │                        │           CLIENT DETAIL                 │
         │                        │  ┌──────────────────────────────────┐   │
         │                        │  │ ⚠️ ALLERGY ALERT: Latex         │   │
         │                        │  └──────────────────────────────────┘   │
         │                        │  • Previous: Natural Hybrid (loved)     │
         │                        │  • Preference: Dramatic curl            │
         │                        │  • VIP: Silver Member                   │
         │                        │  • Notes: "Sensitive eyes - gentle"     │
         │                        └─────────────────────────────────────────┘
         │                                 │
         └─────────────────────────────────┤
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │ COMPLETE APPT   │
                                  │ (End of day)    │
                                  └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │ ADD NOTES       │
                                  │ - Photo before  │
                                  │ - Photo after   │
                                  │ - Style used    │
                                  │ - Client mood   │
                                  └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │   END OF DAY    │
                                  │ Personal Stats  │
                                  │ - 6/6 complete  │
                                  │ - $840 revenue  │
                                  └─────────────────┘
```

---

#### Flow M2: Handle Reschedule Request
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MANAGER: HANDLE RESCHEDULE REQUEST                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────┐
│ 🔔 PUSH NOTIFICATION                      │
│ "Sarah requested to reschedule"           │
│ Tap to review                             │
└─────────────────┬─────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                RESCHEDULE REQUEST DETAIL                    │
│                                                             │
│  Client: Sarah Thompson                                     │
│  Original: Tue Jan 28, 10:00 AM                            │
│  Requested: Thu Jan 30, 2:00 PM                            │
│  Service: Volume Full Set                                   │
│  Reason: "Work meeting conflict"                            │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   ✓ APPROVE     │  │   ✗ DECLINE     │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                  │
         ┌───────┴───────┐
         │               │
         ▼               ▼
┌─────────────────┐  ┌─────────────────┐
│    APPROVE      │  │    DECLINE      │
│                 │  │                 │
│ - Auto-confirm  │  │ - Must provide  │
│ - Calendar      │  │   reason:       │
│   updates       │  │   ┌───────────┐ │
│ - Client        │  │   │ Slot taken│ │
│   notified      │  │   │ Too close │ │
│ - Original slot │  │   │ Other___  │ │
│   freed         │  │   └───────────┘ │
└────────┬────────┘  └────────┬────────┘
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌─────────────────┐
│ Client notified │  │ Client notified │
│ "Approved! See  │  │ "Declined.      │
│  you Thursday"  │  │  Reason: ___"   │
└─────────────────┘  └─────────────────┘
```

---

#### Flow M3: Add Client Notes After Appointment
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MANAGER: ADD CLIENT NOTES                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│              APPOINTMENT COMPLETE                            │
│  Sarah's Volume Full Set - 2 hours                          │
│  [Mark Complete]                                             │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                     ADD NOTES                                │
│                                                              │
│  📷 Photos                                                   │
│  ┌────────────┐  ┌────────────┐                             │
│  │   Before   │  │   After    │                             │
│  │  [+ Add]   │  │  [+ Add]   │                             │
│  └────────────┘  └────────────┘                             │
│                                                              │
│  📝 Notes                                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Used C-curl 12mm. Client loves dramatic look.         │ │
│  │ Requested same style next time.                       │ │
│  │ Eyes slightly sensitive today - used gentle adhesive. │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  🏷️ Tags                                                     │
│  [Style: Dramatic] [Curl: C] [Sensitivity: Medium]          │
│                                                              │
│  ⚠️ Important? [ ] Mark this note as important              │
│                                                              │
│              [Save & Complete]                               │
└──────────────────────────────────────────────────────────────┘
                               │
                               ▼
                      ┌────────────────┐
                      │ Notes Saved ✓  │
                      │ Back to        │
                      │ Dashboard      │
                      └────────────────┘
```

---

#### Flow M4: Request Time Off
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MANAGER: REQUEST TIME OFF                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────┐
│ Calendar │
│ [+ Block │
│   Time]  │
└────┬─────┘
     │
     ▼
┌──────────────────────────────────────────────────────────────┐
│                  TIME OFF REQUEST                            │
│                                                              │
│  Type:                                                       │
│  ○ Block hours (same day)                                   │
│  ● Request time off (requires approval)                     │
│                                                              │
│  Start Date: [Feb 10, 2025] 📅                              │
│  End Date:   [Feb 14, 2025] 📅                              │
│                                                              │
│  Reason:                                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Family vacation - pre-planned trip                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│              [Submit Request]                                │
└──────────────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────────────┐
│                  REQUEST SUBMITTED                           │
│                                                              │
│  ✓ Your request has been sent to Admin                      │
│                                                              │
│  Status: ⏳ Pending Approval                                 │
│                                                              │
│  You'll receive a notification when                         │
│  Admin reviews your request.                                │
│                                                              │
│  [View My Requests]   [Back to Calendar]                    │
└──────────────────────────────────────────────────────────────┘
```

---

### 7.3 Admin Flows

#### Flow A1: Admin Business Review
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ADMIN BUSINESS REVIEW FLOW                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────┐
│  START   │
│ (Weekly) │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ADMIN DASHBOARD                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     THIS WEEK AT A GLANCE                           │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │ $23,870  │  │   126    │  │    24    │  │   4.9    │            │   │
│  │  │ Revenue  │  │ Bookings │  │New Client│  │  Rating  │            │   │
│  │  │  ↑18%    │  │  ↑12%    │  │   ↑8%    │  │  ↑0.1    │            │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  QUICK ACTIONS                                                      │    │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │    │
│  │  │ Analytics  │ │ Staff      │ │ Clients    │ │ Settings   │       │    │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │    │
│  └────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
     │
     │───────────────────────────────────────────────────┐
     │                                                   │
     ▼                                                   ▼
┌──────────────────────────────────────┐    ┌──────────────────────────────────┐
│          ANALYTICS DEEP DIVE          │    │        STAFF PERFORMANCE         │
│                                        │    │                                  │
│  Revenue Trend (7 months)              │    │  ┌──────────────────────────┐   │
│  ┌────────────────────────────────┐   │    │  │ 1. Lash Mama   $8,560    │   │
│  │     ▄                          │   │    │  │    42 bookings │ ★ 5.0   │   │
│  │   ▄ █                          │   │    │  ├──────────────────────────┤   │
│  │ ▄ █ █ ▄                        │   │    │  │ 2. Nikki       $6,420    │   │
│  │ █ █ █ █ ▄ █                    │   │    │  │    38 bookings │ ★ 4.9   │   │
│  │ █ █ █ █ █ █ █                  │   │    │  ├──────────────────────────┤   │
│  │ Jul Aug Sep Oct Nov Dec Jan    │   │    │  │ 3. Beau        $4,280    │   │
│  └────────────────────────────────┘   │    │  │    28 bookings │ ★ 4.8   │   │
│                                        │    │  └──────────────────────────┘   │
│  Service Breakdown:                    │    │                                  │
│  • Mega Volume: 35% ($8,420)          │    │  [View All Staff] [Add Staff]    │
│  • Volume: 24% ($5,640)               │    │                                  │
│  • Refills: 18% ($4,280)              │    └──────────────────────────────────┘
│                                        │
│  [Export Report] [Share]              │
└──────────────────────────────────────┘
```

---

#### Flow A2: Admin Manual Booking (No Deposit)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ADMIN: MANUAL BOOKING (NO DEPOSIT)                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────┐
│  START   │
│ (Admin)  │
└────┬─────┘
     │
     ▼
┌─────────────────┐
│ Dashboard       │
│ [+ New Booking] │ ◀─── Admin-only button
└────────┬────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│                    CREATE BOOKING                           │
│                                                             │
│  Client: [Search or Add New] ▼                              │
│          ┌────────────────────────────────────────────┐     │
│          │ 🔍 Sarah Thompson                          │     │
│          │    Jessica Williams                        │     │
│          │    + Add New Client                        │     │
│          └────────────────────────────────────────────┘     │
│                                                             │
│  Service: [Mega Volume Full Set] ▼                          │
│  Artist: [Assign to Self / Select Manager] ▼                │
│  Date: [Calendar Picker]                                    │
│  Time: [Available Slots]                                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ☑️ SKIP DEPOSIT (Admin Override)                    │   │ ◀─── Admin-only
│  │    Reason: [VIP / Personal / Promo] ▼               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Notes: [________________________________]                  │
│                                                             │
│              [Create Booking]                               │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────┐
│ Confirmation    │
│ - No payment    │
│ - Client notif  │
│ - On calendar   │
│ - Logged as     │
│   "Admin Book"  │
└─────────────────┘
```

---

#### Flow A3: Admin Recurring Booking Setup
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ADMIN: RECURRING BOOKING SETUP                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────┐
│       VIP CLIENT PROFILE             │
│  Sarah Thompson • Platinum           │
│                                      │
│  [Set Up Recurring ✨]               │ ◀─── Admin-only
└─────────────────┬────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  RECURRING BOOKING SETUP                    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │ Preferred Service: Volume Refill ▼                │     │
│  │ Preferred Artist: Lash Mama ▼                     │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Recurrence Pattern:                                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │ ○ Weekly (Every Tuesday)                           │    │
│  │ ● Every 2 Weeks (Bi-weekly)                        │    │
│  │ ○ Every 3 Weeks                                    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  Preferred Day: [Tuesday] ▼                                 │
│  Preferred Time: [10:00 AM] ▼                               │
│                                                             │
│  Duration:                                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │ ○ 6 Months (12 appointments)                       │    │
│  │ ○ 12 Months (24 appointments)                      │    │
│  │ ● Ongoing (Until cancelled)                        │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  First Appointment: [Jan 28, 2025]                          │
│                                                             │
│  Payment Terms:                                             │
│  ☑️ Auto-charge saved payment method                       │
│  ☐ No deposit required (VIP perk)                          │
│                                                             │
│         [Preview Schedule]  [Create Recurring]              │
└─────────────────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  SCHEDULE PREVIEW                           │
│                                                             │
│  ✅ Jan 28, 2025 - 10:00 AM                                │
│  ✅ Feb 11, 2025 - 10:00 AM                                │
│  ✅ Feb 25, 2025 - 10:00 AM                                │
│  ✅ Mar 11, 2025 - 10:00 AM                                │
│  ...                                                        │
│                                                             │
│  Conflicts: None                                            │
│                                                             │
│         [← Back]  [Confirm All Bookings]                    │
└─────────────────────────────────────────────────────────────┘
```

---

#### Flow A4: Admin Staff Management
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ADMIN: STAFF MANAGEMENT                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────┐
│       STAFF LIST                     │
│  [+ Add New Staff]                   │
└─────────────────┬────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    STAFF MEMBERS                            │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 👤 Nikki Tran                                        │  │
│  │    Senior Lash Artist • Active                       │  │
│  │    Today: 5 appointments | $680                      │  │
│  │    [View] [Edit] [Schedule]                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 👤 Beau Williams                                     │  │
│  │    Manager • Active                                  │  │
│  │    Today: 4 appointments | $520                      │  │
│  │    [View] [Edit] [Schedule]                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 👤 Natali Chen                                       │  │
│  │    Junior Lash Artist • Active                       │  │
│  │    Today: 3 appointments | $360                      │  │
│  │    [View] [Edit] [Schedule]                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  PENDING REQUESTS                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ⏳ Nikki - Time Off Request                          │  │
│  │    Feb 10-14, 2025 | Family vacation                 │  │
│  │    [Approve] [Decline]                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

#### Flow A5: Admin Approve/Decline Time Off
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ADMIN: TIME OFF APPROVAL                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────┐
│ 🔔 NOTIFICATION                           │
│ "Nikki requested time off Feb 10-14"      │
│ Tap to review                             │
└─────────────────┬─────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│               TIME OFF REQUEST DETAIL                       │
│                                                             │
│  Staff: Nikki Tran                                          │
│  Dates: Feb 10-14, 2025 (5 days)                           │
│  Reason: "Family vacation - pre-planned trip"               │
│                                                             │
│  IMPACT ANALYSIS:                                           │
│  ┌───────────────────────────────────────────────────┐     │
│  │ ⚠️ 8 appointments affected                        │     │
│  │ • 6 can be reassigned                             │     │
│  │ • 2 client-requested Nikki specifically           │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   ✓ APPROVE     │  │   ✗ DECLINE     │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                  │
         ┌───────┴───────┐
         │               │
         ▼               ▼
┌─────────────────┐  ┌─────────────────────────────────┐
│    APPROVE      │  │           DECLINE               │
│                 │  │                                 │
│ - Dates blocked │  │ Reason (required):              │
│ - Nikki notified│  │ ┌─────────────────────────────┐│
│ - Clients       │  │ │ Not enough coverage during  ││
│   contacted for │  │ │ peak Valentine's season.    ││
│   reassignment  │  │ │ Can we discuss alternative? ││
│                 │  │ └─────────────────────────────┘│
│                 │  │                                 │
│                 │  │ [Send Decline]                  │
└─────────────────┘  └─────────────────────────────────┘
```

---

## 8. Database Schema

### 8.1 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE SCHEMA                                │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌───────────────┐         ┌───────────────┐         ┌───────────────┐
    │    users      │         │ appointments  │         │   services    │
    ├───────────────┤         ├───────────────┤         ├───────────────┤
    │ id (PK)       │────┐    │ id (PK)       │    ┌────│ id (PK)       │
    │ email         │    │    │ client_id (FK)│◀───┘    │ name          │
    │ phone         │    │    │ staff_id (FK) │◀───┐    │ category      │
    │ full_name     │    │    │ service_id(FK)│─────────│ duration_mins │
    │ role          │    │    │ date_time     │         │ base_price    │
    │ created_at    │    │    │ status        │         │ description   │
    │ avatar_url    │    └───▶│ deposit_paid  │         └───────────────┘
    └───────────────┘         │ notes         │
           │                  │ created_at    │
           │                  └───────────────┘
           │                         │
           ▼                         │
    ┌───────────────┐               │
    │  vip_status   │               │
    ├───────────────┤               │
    │ id (PK)       │               │
    │ user_id (FK)  │◀──────────────┘
    │ tier          │
    │ points        │
    │ streak_weeks  │
    │ streak_start  │
    │ benefits      │
    └───────────────┘

    ┌───────────────┐         ┌───────────────┐         ┌───────────────┐
    │ client_notes  │         │   messages    │         │staff_schedules│
    ├───────────────┤         ├───────────────┤         ├───────────────┤
    │ id (PK)       │         │ id (PK)       │         │ id (PK)       │
    │ client_id(FK) │         │ sender_id(FK) │         │ staff_id (FK) │
    │ author_id(FK) │         │ receiver_id   │         │ day_of_week   │
    │ content       │         │ content       │         │ start_time    │
    │ category      │         │ read_at       │         │ end_time      │
    │ is_allergy    │         │ created_at    │         │ is_available  │
    │ photos        │         └───────────────┘         └───────────────┘
    │ created_at    │
    └───────────────┘

    ┌───────────────┐         ┌───────────────┐         ┌───────────────┐
    │   payments    │         │ notifications │         │   referrals   │
    ├───────────────┤         ├───────────────┤         ├───────────────┤
    │ id (PK)       │         │ id (PK)       │         │ id (PK)       │
    │ appt_id (FK)  │         │ user_id (FK)  │         │ referrer_id   │
    │ amount        │         │ type          │         │ referee_id    │
    │ method        │         │ title         │         │ code          │
    │ status        │         │ body          │         │ status        │
    │ provider_ref  │         │ read          │         │ reward_amt    │
    │ created_at    │         │ created_at    │         │ created_at    │
    └───────────────┘         └───────────────┘         └───────────────┘

    ┌───────────────┐         ┌───────────────┐
    │ time_off_reqs │         │recurring_books│
    ├───────────────┤         ├───────────────┤
    │ id (PK)       │         │ id (PK)       │
    │ staff_id (FK) │         │ client_id(FK) │
    │ start_date    │         │ staff_id (FK) │
    │ end_date      │         │ service_id(FK)│
    │ reason        │         │ frequency     │
    │ status        │         │ preferred_day │
    │ admin_notes   │         │ preferred_time│
    │ created_at    │         │ is_active     │
    └───────────────┘         └───────────────┘
```

### 8.2 Table Definitions

```sql
-- Users Table (Client, Manager, Admin)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('client', 'manager', 'admin')),
  avatar_url TEXT,
  allergies JSONB DEFAULT '[]',
  preferences JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{"push": true, "email": true, "sms": false}',
  tier VARCHAR(20) DEFAULT 'junior' CHECK (tier IN ('premium', 'senior', 'junior')), -- For managers
  service_categories JSONB DEFAULT '[]', -- Services this manager can perform
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services Catalog
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  duration_mins INTEGER NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  requires_full_set BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES users(id) NOT NULL,
  staff_id UUID REFERENCES users(id) NOT NULL,
  service_id UUID REFERENCES services(id) NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_mins INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed' 
    CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  deposit_paid BOOLEAN DEFAULT false,
  deposit_waived BOOLEAN DEFAULT false,
  deposit_waived_reason TEXT,
  total_price DECIMAL(10,2) NOT NULL,
  discount_applied DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurring_id UUID,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- VIP Status Tracking
CREATE TABLE vip_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  tier VARCHAR(20) DEFAULT 'bronze' 
    CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  total_points INTEGER DEFAULT 0,
  current_streak_weeks INTEGER DEFAULT 0,
  streak_start_date DATE,
  streak_last_visit DATE,
  lifetime_visits INTEGER DEFAULT 0,
  lifetime_spend DECIMAL(10,2) DEFAULT 0,
  benefits_used JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Notes
CREATE TABLE client_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES users(id) NOT NULL,
  author_id UUID REFERENCES users(id) NOT NULL,
  appointment_id UUID REFERENCES appointments(id),
  content TEXT NOT NULL,
  category VARCHAR(50),
  is_allergy_related BOOLEAN DEFAULT false,
  is_important BOOLEAN DEFAULT false,
  photos JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messaging
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) NOT NULL,
  receiver_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff Schedules
CREATE TABLE staff_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES users(id) NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time Off Requests
CREATE TABLE time_off_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES users(id) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'declined')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time Blocks (for blocking specific hours)
CREATE TABLE time_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES users(id) NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  reason VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('deposit', 'full', 'refund')),
  method VARCHAR(20) CHECK (method IN ('card', 'afterpay', 'apple_pay', 'google_pay', 'cash')),
  status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  provider_reference VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id) NOT NULL,
  referee_id UUID REFERENCES users(id),
  code VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'completed', 'expired')),
  reward_amount DECIMAL(10,2) DEFAULT 25.00,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recurring Bookings
CREATE TABLE recurring_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES users(id) NOT NULL,
  staff_id UUID REFERENCES users(id) NOT NULL,
  service_id UUID REFERENCES services(id) NOT NULL,
  frequency VARCHAR(20) CHECK (frequency IN ('weekly', 'biweekly', 'triweekly', 'monthly')),
  preferred_day INTEGER CHECK (preferred_day BETWEEN 0 AND 6),
  preferred_time TIME NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_ongoing BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reschedule Requests
CREATE TABLE reschedule_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id) NOT NULL,
  requested_datetime TIMESTAMPTZ NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'declined')),
  decline_reason TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 9. Technical Architecture

### 9.1 Directory Structure

```
lash-mama-mobile/
├── app/                              # Expo Router - ROUTES ONLY
│   ├── _layout.tsx                  # Root layout with auth provider
│   ├── index.tsx                    # Entry redirect
│   │
│   ├── (auth)/                      # Auth group
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── forgot-password.tsx
│   │   └── onboarding.tsx
│   │
│   ├── (client)/                    # Client group
│   │   ├── _layout.tsx             # Tab navigator
│   │   ├── index.tsx               # Home
│   │   ├── services/
│   │   ├── book/
│   │   ├── appointments/
│   │   ├── vip.tsx
│   │   ├── messages.tsx
│   │   └── profile.tsx
│   │
│   ├── (manager)/                   # Manager group
│   │   ├── _layout.tsx
│   │   ├── index.tsx               # Dashboard
│   │   ├── calendar/
│   │   ├── clients/
│   │   ├── notes.tsx
│   │   ├── messages.tsx
│   │   └── profile.tsx
│   │
│   └── (admin)/                     # Admin group
│       ├── _layout.tsx
│       ├── index.tsx               # Dashboard
│       ├── analytics/
│       ├── staff/
│       ├── clients/
│       ├── calendar.tsx
│       ├── vip-management.tsx
│       ├── messages.tsx
│       └── settings.tsx
│
├── src/
│   ├── features/                    # Feature modules (see 5.5)
│   ├── components/                  # Shared components (see 5.1)
│   ├── services/                    # API layer
│   ├── lib/                         # Infrastructure
│   ├── shared/                      # Shared utilities
│   └── theme/                       # Design system
│
├── assets/
├── app.json
├── package.json
└── tsconfig.json
```

---

## 10. Design System

### 10.1 Color Palette

```typescript
export const colors = {
  // Primary - Luxury Gold
  gold: {
    DEFAULT: '#C9A871',
    light: '#D4B88C',
    dark: '#B8935E',
    muted: '#C9A87133',
  },
  
  // Background - Warm Cream
  cream: {
    DEFAULT: '#FAF7F2',
    light: '#FFFDFB',
    dark: '#F5F0E8',
  },
  
  // Text - Rich Charcoal
  charcoal: {
    DEFAULT: '#2C2C2C',
    light: '#4A4A4A',
    muted: '#6B6B6B',
  },
  
  // Semantic
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // VIP Tiers
  vip: {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
  },
};
```

### 10.2 Typography

```typescript
export const typography = {
  fonts: {
    serif: 'Georgia',
    sans: 'System',
  },
  
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
};
```

---

## 11. API Specifications

### 11.1 Service Layer Methods

```typescript
// services/auth.api.ts
export const authApi = {
  login: (email: string, password: string) => Promise<User>,
  register: (data: RegisterDTO) => Promise<User>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
  updatePassword: (newPassword: string) => Promise<void>,
};

// services/appointments.api.ts
export const appointmentsApi = {
  // Client
  getUpcoming: (userId: string) => Promise<Appointment[]>,
  getHistory: (userId: string) => Promise<Appointment[]>,
  getAvailableSlots: (serviceId: string, staffId: string, date: Date) => Promise<TimeSlot[]>,
  create: (data: CreateAppointmentDTO) => Promise<Appointment>,
  requestReschedule: (id: string, newDateTime: Date, reason?: string) => Promise<void>,
  cancel: (id: string, reason?: string) => Promise<void>,
  
  // Manager
  getByStaff: (staffId: string, dateRange: DateRange) => Promise<Appointment[]>,
  approveReschedule: (id: string) => Promise<void>,
  declineReschedule: (id: string, reason: string) => Promise<void>,
  addNotes: (id: string, notes: string) => Promise<void>,
  
  // Admin
  getAll: (dateRange: DateRange) => Promise<Appointment[]>,
  createManual: (data: CreateManualBookingDTO) => Promise<Appointment>,
  createRecurring: (data: CreateRecurringDTO) => Promise<RecurringBooking>,
};

// services/staff.api.ts
export const staffApi = {
  getAll: () => Promise<Staff[]>,
  getById: (id: string) => Promise<Staff>,
  create: (data: CreateStaffDTO) => Promise<Staff>,
  update: (id: string, data: UpdateStaffDTO) => Promise<Staff>,
  deactivate: (id: string) => Promise<void>,
  getSchedule: (id: string, dateRange: DateRange) => Promise<Schedule>,
  updateSchedule: (id: string, schedule: Schedule) => Promise<void>,
  
  // Time Off
  requestTimeOff: (data: TimeOffRequestDTO) => Promise<TimeOffRequest>,
  getTimeOffRequests: (staffId?: string) => Promise<TimeOffRequest[]>,
  approveTimeOff: (id: string) => Promise<void>,
  declineTimeOff: (id: string, reason: string) => Promise<void>,
};

// services/analytics.api.ts
export const analyticsApi = {
  // Manager (personal)
  getPersonalStats: (staffId: string, period: Period) => Promise<PersonalStats>,
  
  // Admin (business)
  getRevenue: (period: Period) => Promise<RevenueData>,
  getBookingStats: (period: Period) => Promise<BookingStats>,
  getStaffPerformance: (period: Period) => Promise<StaffPerformance[]>,
  getServiceBreakdown: (period: Period) => Promise<ServiceStats[]>,
  getClientMetrics: (period: Period) => Promise<ClientMetrics>,
};
```

---

## 12. Success Metrics

### 12.1 Key Performance Indicators

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Daily Bookings** | 15+ per day | Count of confirmed appointments |
| **Monthly Revenue** | $25,000+ | Sum of completed payments |
| **Client Retention** | 70%+ | Clients with 2+ visits in 90 days |
| **VIP Conversion** | 40%+ | Clients reaching Silver tier |
| **Streak Maintenance** | 60%+ | VIPs maintaining 4+ week streaks |
| **App Rating** | 4.5+ stars | App Store / Play Store rating |
| **Booking Completion** | 85%+ | Bookings started vs completed |
| **No-Show Rate** | <5% | Missed appointments |

---

## 13. Release Plan

### Phase 1: MVP (Weeks 1-4)
- [ ] Client: Registration, Login, Service browsing
- [ ] Client: Booking flow with payment
- [ ] Client: Appointment management
- [ ] Manager: Calendar view
- [ ] Manager: Appointment details
- [ ] Push notifications (basic)

### Phase 2: Operations (Weeks 5-6)
- [ ] Manager: Client notes
- [ ] Manager: Reschedule handling
- [ ] Manager: Time off requests
- [ ] Manager: Messaging
- [ ] Admin: Staff management
- [ ] Admin: Basic analytics

### Phase 3: Loyalty (Weeks 7-8)
- [ ] Client: VIP dashboard
- [ ] Client: Streak tracking
- [ ] Client: Referral program
- [ ] Admin: VIP management

### Phase 4: Advanced (Weeks 9-10)
- [ ] Admin: Advanced analytics
- [ ] Admin: Recurring bookings
- [ ] Admin: System settings
- [ ] All: Performance optimization
- [ ] All: Final polish

---

## 14. Appendix

### 14.1 Glossary

| Term | Definition |
|------|------------|
| **Full Set** | Complete lash application on bare lashes |
| **Refill** | Maintenance appointment to replace grown-out lashes |
| **Streak** | Consecutive weeks with refill appointments |
| **Tier** | VIP level (Bronze → Silver → Gold → Platinum) |
| **Deposit** | Upfront payment to confirm booking |
| **Manager** | Staff member with calendar and client note access |
| **Admin** | Business owner with full system access |

### 14.2 Business Rules Summary

1. **First-time clients** can only book Full Sets or Removals
2. **Deposits** are required for all client bookings (Admin can waive)
3. **Cancellations** within 48 hours forfeit deposit
4. **Reschedules** require Manager/Admin approval
5. **VIP streaks** break after 3 weeks without refill
6. **Recurring bookings** are Admin-only privilege
7. **Time off requests** require Admin approval

### 14.3 Contact

**Project Owner:** Lash Mama (Purni)  
**Document Author:** Development Team  
**Last Review:** January 2025

---

*This document is maintained alongside the codebase and updated with each release.*
