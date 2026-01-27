# Lash Mama Mobile Application
## Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** January 2026  
**Status:** Ready for Development  
**Platform:** iOS & Android (React Native / Expo)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Discovery & Problem Definition](#discovery--problem-definition)
3. [User Roles & Personas](#user-roles--personas)
4. [User Stories](#user-stories)
5. [Feature Specifications](#feature-specifications)
6. [User Flows](#user-flows)
7. [Information Architecture](#information-architecture)
8. [Database Schema](#database-schema)
9. [Component Library](#component-library)
10. [Design System](#design-system)
11. [Technical Architecture](#technical-architecture)
12. [API Specifications](#api-specifications)
13. [Success Metrics](#success-metrics)
14. [Release Phases](#release-phases)
15. [Appendix](#appendix)

---

## Executive Summary

### Product Vision
Lash Mama is a premium beauty booking mobile application designed to streamline appointment scheduling for a luxury lash extension salon. The app serves three distinct user types: Clients seeking beauty services, Staff managing their schedules and clients, and the Admin (business owner) overseeing all operations.

### Business Goals
- Reduce no-shows by 40% through deposit requirements and automated reminders
- Increase repeat bookings by 30% through VIP loyalty program
- Decrease administrative overhead by 50% through automated scheduling
- Generate additional revenue through course enrollment and product sales

### Target Market
- **Primary:** Women aged 25-45 seeking premium lash services
- **Secondary:** Beauty professionals seeking training courses
- **Geographic:** Sydney, Australia (expandable)

---

## Discovery & Problem Definition

### Who are the Users?

| Role | Description | Primary Goal |
|------|-------------|--------------|
| **Client** | Customers booking beauty appointments | Easy, elegant booking experience |
| **Staff** | Beauty technicians/artists | Efficient schedule & client management |
| **Admin** | Business owner (Lash Mama/Purni) | Complete business oversight & control |

### What's the Core Problem?

**For Clients:**
- Difficulty finding available appointment slots
- No visibility into service options and pricing
- Lack of loyalty recognition for repeat customers
- Inconvenient rescheduling process

**For Staff:**
- Manual calendar management is time-consuming
- No centralized client history/notes system
- Difficulty tracking performance metrics
- Fragmented communication with clients

**For Admin:**
- No real-time visibility into business performance
- Manual staff scheduling and management
- Difficulty tracking VIP client relationships
- Revenue leakage from no-shows

### Must-Have Features (MVP)

| Feature | Priority | User Role |
|---------|----------|-----------|
| User Authentication | P0 | All |
| Service Catalog | P0 | Client |
| Appointment Booking | P0 | Client |
| Payment/Deposit Processing | P0 | Client |
| Calendar Management | P0 | Staff |
| Client Notes | P0 | Staff |
| Dashboard Analytics | P0 | Admin |
| Staff Management | P0 | Admin |
| Push Notifications | P0 | All |

### Nice-to-Have Features (V2+)

| Feature | Priority | User Role |
|---------|----------|-----------|
| VIP Streak Program | P1 | Client |
| In-App Messaging | P1 | All |
| Course Enrollment | P1 | Client |
| Product Shop Integration | P2 | Client |
| Advanced Analytics | P2 | Admin |
| Afterpay Integration | P2 | Client |
| Referral System | P2 | Client, Staff |
| Recurring Bookings | P2 | Admin |

### Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Bookings per Day | 8 | 15 | Daily count |
| No-Show Rate | 15% | <5% | Monthly % |
| Client Retention | 60% | 85% | 90-day return |
| VIP Conversion | N/A | 20% | % reaching 10 streak |
| App Store Rating | N/A | 4.8+ | Average rating |
| Revenue Growth | Baseline | +25% YoY | Monthly revenue |

---

## User Roles & Personas

### 1. Client Persona

**Name:** Sarah Chen  
**Age:** 32  
**Occupation:** Marketing Manager  
**Tech Savviness:** High

**Goals:**
- Book appointments quickly during lunch breaks
- Find a regular artist she trusts
- Get rewarded for loyalty
- Easy payment options

**Pain Points:**
- Hates phone calls for bookings
- Forgets appointment times
- Wants to see artist portfolios
- Needs flexible cancellation

**Quote:** *"I want to book my lash refill in under 60 seconds while waiting for my coffee."*

---

### 2. Staff Persona

**Name:** Nikki Tran  
**Age:** 28  
**Occupation:** Senior Lash Artist  
**Tech Savviness:** Medium

**Goals:**
- See her daily schedule at a glance
- Keep notes on client preferences
- Track her earnings/performance
- Communicate with clients easily

**Pain Points:**
- Paper notes get lost
- Double bookings happen
- Clients message on personal phone
- No visibility into her performance

**Quote:** *"I need to know exactly what each client likes before they walk in."*

---

### 3. Admin Persona

**Name:** Purni (Lash Mama)  
**Age:** 42  
**Occupation:** Business Owner  
**Tech Savviness:** Medium

**Goals:**
- Complete visibility into business
- Manage staff efficiently
- Grow VIP client base
- Maximize revenue per day

**Pain Points:**
- No real-time business metrics
- Manual staff scheduling nightmare
- Tracking VIP clients manually
- Revenue lost to no-shows

**Quote:** *"I need to know exactly how my business is performing at any moment."*

---

## User Stories

### Client User Stories

#### Authentication & Onboarding
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| C-001 | As a client, I want to sign up with my email/phone so that I can create an account | - Email/phone verification<br>- Password requirements met<br>- Profile created | P0 |
| C-002 | As a client, I want to login with biometrics so that I can access the app quickly | - FaceID/TouchID supported<br>- Fallback to password<br>- Session persists | P0 |
| C-003 | As a client, I want to complete my profile so that staff know my preferences | - Name, photo, contact info<br>- Allergy/health notes<br>- Communication preferences | P0 |

#### Booking Flow
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| C-004 | As a client, I want to browse all services so that I can choose what I need | - Categories displayed<br>- Prices visible<br>- Duration shown<br>- Photos included | P0 |
| C-005 | As a client, I want to select my preferred artist so that I get consistent service | - Artist photos & bios<br>- Availability shown<br>- Specialties listed | P0 |
| C-006 | As a client, I want to see available time slots so that I can pick a convenient time | - Calendar view<br>- Real-time availability<br>- Next 30 days visible | P0 |
| C-007 | As a client, I want to pay a deposit so that I can confirm my booking | - Secure payment<br>- Multiple payment methods<br>- Receipt sent | P0 |
| C-008 | As a client, I want to receive booking confirmation so that I have proof of appointment | - Push notification<br>- Email confirmation<br>- Calendar invite option | P0 |
| C-009 | As a first-time client, I can only book full sets so that proper assessment occurs | - Refills hidden for new clients<br>- Clear messaging<br>- Full set highlighted | P0 |
| C-010 | As a client, I want to reschedule my appointment so that I can adjust to my schedule | - 48hr policy enforced<br>- Request sent to admin<br>- Status shown | P1 |
| C-011 | As a client, I want to cancel my appointment so that I free up the slot | - 48hr policy enforced<br>- Deposit forfeiture shown<br>- Confirmation required | P1 |

#### VIP Program
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| C-012 | As a client, I want to see my VIP progress so that I know how close I am to perks | - Streak counter visible<br>- 10-visit goal shown<br>- Progress bar | P1 |
| C-013 | As a VIP client, I want to see my exclusive discounts so that I can save money | - Discount amounts shown<br>- Auto-applied at checkout<br>- Benefits listed | P1 |
| C-014 | As a VIP client, I want to maintain my streak so that I keep my status | - 3-month gap warning<br>- Reminder notifications<br>- Streak reset policy | P1 |
| C-015 | As a VIP client, I want my profile to show VIP status so that staff recognize me | - Diamond badge visible<br>- Golden profile ring<br>- VIP label | P1 |

#### Appointments & History
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| C-016 | As a client, I want to view my upcoming appointments so that I don't forget | - Date, time, service shown<br>- Artist assigned<br>- Location/directions | P0 |
| C-017 | As a client, I want to view my appointment history so that I can track services | - Past appointments listed<br>- Services received<br>- Artist who served | P0 |
| C-018 | As a client, I want to rebook a previous service so that booking is faster | - One-tap rebook<br>- Same artist option<br>- Pre-filled details | P1 |

#### Notifications
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| C-019 | As a client, I want appointment reminders so that I don't miss my booking | - 24hr reminder<br>- 2hr reminder<br>- Push + SMS option | P0 |
| C-020 | As a client, I want refill reminders so that I maintain my lashes | - 1.5 week after refill<br>- 2.5 weeks after full set<br>- One-tap booking | P1 |
| C-021 | As a client, I want to set custom reminders so that I'm notified when I prefer | - Custom timing (15min-1day)<br>- Notification type choice<br>- Repeat options | P2 |

---

### Staff User Stories

#### Dashboard & Schedule
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| S-001 | As staff, I want to see my daily schedule so that I know my appointments | - Day view default<br>- Client names shown<br>- Service types listed | P0 |
| S-002 | As staff, I want to see weekly/monthly views so that I can plan ahead | - Week view available<br>- Month overview<br>- Scroll navigation | P0 |
| S-003 | As staff, I want appointment details so that I'm prepared for each client | - Client history<br>- Previous notes<br>- Preferences shown | P0 |
| S-004 | As staff, I want to see my earnings so that I track my income | - Daily/weekly/monthly<br>- Service breakdown<br>- Commission calculated | P1 |
| S-005 | As staff, I want to see my stats so that I know my performance | - Clients served count<br>- Utilization rate<br>- Average rating | P1 |

#### Client Management
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| S-006 | As staff, I want to add notes to clients so that I remember their preferences | - Rich text notes<br>- Allergy flags<br>- Preference tags | P0 |
| S-007 | As staff, I want to see client history so that I provide consistent service | - Past appointments<br>- Services received<br>- Previous notes | P0 |
| S-008 | As staff, I want to see client allergies so that I avoid reactions | - Highlighted warnings<br>- Allergy icons<br>- Confirmation required | P0 |
| S-009 | As staff, I want to view client photos so that I see previous work | - Before/after gallery<br>- Lash style history<br>- Photo upload | P1 |

#### Time Management
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| S-010 | As staff, I want to block time off so that I'm not booked when unavailable | - Date range selection<br>- Reason optional<br>- Admin approval required | P0 |
| S-011 | As staff, I want to request time off so that I can plan leave | - Submit request<br>- Status tracking<br>- Admin notification | P0 |
| S-012 | As staff, I want to see my working hours so that I know my schedule | - Weekly hours view<br>- Overtime tracking<br>- Shift times | P1 |

#### Communication
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| S-013 | As staff, I want to message clients so that I can communicate professionally | - In-app messaging<br>- Template messages<br>- Read receipts | P1 |
| S-014 | As staff, I want notification for new bookings so that I'm informed | - Push notification<br>- Booking details shown<br>- Accept/view option | P0 |
| S-015 | As staff, I want pre-appointment alerts so that I'm ready | - 30min before notification<br>- Client name shown<br>- Quick view link | P0 |

#### Referral System
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| S-016 | As staff, I want a unique referral link so that I can earn bonuses | - Shareable link<br>- QR code option<br>- Track referrals | P2 |
| S-017 | As staff, I want to track my referrals so that I see my earnings | - Referral count<br>- Bonus earned (10%)<br>- Pending payouts | P2 |

---

### Admin User Stories

#### Dashboard & Analytics
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| A-001 | As admin, I want to see business overview so that I know daily performance | - Today's bookings<br>- Revenue<br>- Staff utilization | P0 |
| A-002 | As admin, I want detailed analytics so that I make informed decisions | - Revenue trends<br>- Service popularity<br>- Peak times | P0 |
| A-003 | As admin, I want staff performance metrics so that I evaluate team | - Bookings per staff<br>- Revenue per staff<br>- Client retention | P0 |
| A-004 | As admin, I want client insights so that I understand my customers | - New vs returning<br>- VIP count<br>- Churn rate | P1 |

#### Staff Management
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| A-005 | As admin, I want to manage staff accounts so that I control access | - Add/edit/disable staff<br>- Role assignment<br>- Permissions | P0 |
| A-006 | As admin, I want to set staff schedules so that coverage is optimal | - Shift assignment<br>- Break times<br>- Availability override | P0 |
| A-007 | As admin, I want to approve time-off requests so that I maintain coverage | - Request list<br>- Approve/decline<br>- Reason required for decline | P0 |
| A-008 | As admin, I want to view staff calendars so that I see full picture | - All staff view<br>- Filter by staff<br>- Conflict detection | P0 |

#### Booking Management
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| A-009 | As admin, I want to book clients without deposit so that I have flexibility | - Override deposit<br>- Note reason<br>- Normal flow otherwise | P0 |
| A-010 | As admin, I want to approve reschedule requests so that I control changes | - Request queue<br>- Approve/decline<br>- Reason required for decline | P0 |
| A-011 | As admin, I want to set up recurring bookings so that VIPs are secured | - Weekly/bi-weekly options<br>- 6/12 month duration<br>- Auto-renewal option | P1 |
| A-012 | As admin, I want to manage the waitlist so that slots are filled | - Waitlist queue<br>- Priority ordering<br>- One-tap booking | P1 |

#### Client Management
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| A-013 | As admin, I want full client database so that I manage relationships | - Search/filter<br>- VIP status<br>- Booking history | P0 |
| A-014 | As admin, I want to manage VIP status so that I reward loyal clients | - Manual VIP toggle<br>- Streak override<br>- VIP history | P0 |
| A-015 | As admin, I want client notes access so that I understand relationships | - All staff notes visible<br>- Add admin notes<br>- Flag important | P0 |
| A-016 | As admin, I want export capabilities so that I backup data | - CSV export<br>- PDF reports<br>- Data download | P1 |

#### Settings & Configuration
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| A-017 | As admin, I want to manage services so that offerings are current | - Add/edit services<br>- Pricing updates<br>- Enable/disable | P0 |
| A-018 | As admin, I want to set booking policies so that rules are enforced | - Cancellation window<br>- Deposit amounts<br>- Buffer times | P0 |
| A-019 | As admin, I want to configure notifications so that communication is optimal | - Reminder timing<br>- Message templates<br>- Channel preferences | P1 |
| A-020 | As admin, I want to manage business hours so that availability is correct | - Operating hours<br>- Holiday closures<br>- Special events | P0 |

#### Communication
| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| A-021 | As admin, I want to broadcast messages so that I reach all clients | - Select recipients<br>- Schedule send<br>- Template library | P1 |
| A-022 | As admin, I want to view all messages so that I monitor communication | - Staff-client messages<br>- Search capability<br>- Flag inappropriate | P2 |

---

## Feature Specifications

### F1: Authentication System

**Description:** Secure user authentication supporting email/phone login with biometric options.

**Components:**
- Login Screen
- Registration Screen
- Password Reset Flow
- Biometric Authentication
- Session Management

**Technical Requirements:**
- Supabase Auth integration
- JWT token management
- Secure storage for credentials
- Rate limiting on login attempts
- Password strength requirements

**Business Rules:**
- Passwords: min 8 chars, 1 uppercase, 1 number
- Session timeout: 30 days
- Biometric: optional, after first login
- Email verification required

---

### F2: Service Catalog

**Description:** Browsable catalog of all beauty services with categories, pricing, and details.

**Components:**
- Service List Screen
- Service Detail Modal
- Category Filter
- Search Function
- Price Display with Afterpay

**Categories:**
| Category | Services |
|----------|----------|
| Lash Extensions | Natural, Hybrid, Volume, Mega Volume |
| Refills | Natural, Volume, Mega Volume |
| Makeup | Bridal, Special Event |
| Hair | Bridal Styling |
| Courses | Training Programs |
| Packages | Combo Deals |

**Business Rules:**
- First-time clients: Full Sets only
- Refills: returning clients only
- Afterpay: 4 installments display
- Prices: GST inclusive

---

### F3: Booking Engine

**Description:** Multi-step appointment booking flow with artist selection, time picking, and payment.

**Components:**
- Service Selection Step
- Artist Selection Step
- Date/Time Picker
- Booking Summary
- Payment Screen
- Confirmation Screen

**Booking Flow:**
```
Service → Artist → Date/Time → Summary → Payment → Confirmation
```

**Business Rules:**
- Booking window: up to 30 days ahead
- Deposit: required (except Admin bookings)
- Buffer time: 15 min between appointments
- Cancellation: 48hr policy
- First-time: Full sets only

**Artist Constraints:**
| Artist | Minimum Notice |
|--------|----------------|
| Beau | 2 hours |
| All others | 24 hours |

---

### F4: Calendar System

**Description:** Comprehensive calendar for viewing and managing appointments.

**Components:**
- Day View
- Week View
- Month Overview
- Appointment Cards
- Time Slot Grid
- Availability Indicator

**Features:**
- Real-time sync
- Conflict detection
- Drag-to-reschedule (staff/admin)
- Color-coded by service type
- Staff filter (admin)

---

### F5: VIP Loyalty Program

**Description:** Streak-based loyalty program rewarding repeat clients.

**Components:**
- VIP Progress Tracker
- Benefits Dashboard
- Streak Counter
- VIP Badge
- Discount Display

**Program Rules:**
| Milestone | Benefit |
|-----------|---------|
| 10 consecutive visits | VIP Status achieved |
| VIP Status | $100 annual gift pack |
| VIP Discounts | $10-30 off services |
| Lash Courses | $400 off enrollment |
| Streak break | 3+ months gap resets streak |

**Visual Indicators:**
- Diamond badge on profile
- Golden ring around avatar
- VIP label throughout app
- Special notification styling

---

### F6: Client Notes System

**Description:** Comprehensive note-taking for client preferences, allergies, and history.

**Components:**
- Notes List View
- Note Editor
- Allergy Flag System
- Photo Gallery
- Quick Tags

**Note Types:**
| Type | Description | Visibility |
|------|-------------|------------|
| Preference | Lash style, curl, length | Staff, Admin |
| Allergy | Health concerns, reactions | All (highlighted) |
| General | Conversation notes | Staff, Admin |
| Admin | Business notes | Admin only |

**Features:**
- Rich text formatting
- Photo attachments
- Timestamp tracking
- Staff attribution
- Search capability

---

### F7: Staff Dashboard

**Description:** Performance and schedule dashboard for staff members.

**Components:**
- Daily Schedule
- Weekly Overview
- Stats Cards
- Earnings Tracker
- Performance Metrics

**Metrics Displayed:**
| Metric | Calculation |
|--------|-------------|
| Clients Served | Count per period |
| Revenue Generated | Sum of services |
| Utilization Rate | Booked / Available hours |
| Average Rating | Client feedback average |
| Referral Bonus | 10% of referred bookings |

---

### F8: Admin Analytics

**Description:** Comprehensive business intelligence dashboard.

**Components:**
- Revenue Charts
- Booking Trends
- Staff Leaderboard
- Service Popularity
- Client Demographics
- Forecast Projections

**Report Types:**
| Report | Metrics |
|--------|---------|
| Daily Summary | Bookings, revenue, no-shows |
| Weekly Trends | Comparison to previous |
| Monthly Report | Full P&L breakdown |
| Staff Performance | Individual metrics |
| Service Analysis | Popularity, revenue |

---

### F9: Notification System

**Description:** Multi-channel notification system for reminders and alerts.

**Components:**
- Push Notification Handler
- In-App Notification Center
- SMS Integration (optional)
- Email Notifications

**Notification Types:**
| Type | Trigger | Timing |
|------|---------|--------|
| Booking Confirmed | After payment | Immediate |
| Appointment Reminder | Before appointment | 24hr, 2hr |
| Refill Reminder | After service | 1.5-2.5 weeks |
| VIP Progress | Streak milestone | On achievement |
| Staff Alert | New booking | Immediate |
| Pre-Appointment | Before client arrives | 30 min |

---

### F10: Messaging System

**Description:** In-app communication between clients and staff/admin.

**Components:**
- Conversation List
- Chat Interface
- Read Receipts
- Quick Replies
- Message Templates

**Features:**
- Real-time messaging
- Beauty-themed read receipts (sparkles)
- VIP badge indicators
- Template responses
- Admin oversight capability

---

## User Flows

### Client Booking Flow
```
┌─────────────┐
│   Launch    │
│    App      │
└──────┬──────┘
       │
       ▼
┌─────────────┐    No     ┌─────────────┐
│  Logged In? │─────────▶│   Login/    │
│             │           │  Register   │
└──────┬──────┘           └──────┬──────┘
       │ Yes                     │
       ▼                         │
┌─────────────┐◀─────────────────┘
│    Home     │
│   Screen    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Select    │
│   Service   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Select    │
│   Artist    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Select    │
│ Date & Time │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Review    │
│   Booking   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Pay      │
│   Deposit   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Confirmation│
│   Screen    │
└─────────────┘
```

### Staff Daily Workflow
```
┌─────────────┐
│   Login     │
│  (Biometric)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dashboard  │
│  Overview   │
└──────┬──────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌─────────────┐   ┌─────────────┐
│   Today's   │   │   Check     │
│  Schedule   │   │   Stats     │
└──────┬──────┘   └─────────────┘
       │
       ▼
┌─────────────┐
│    View     │
│  Upcoming   │
│ Appointment │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Review    │
│Client Notes │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │
│  Complete   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Add      │
│   Notes     │
└─────────────┘
```

### Admin Management Flow
```
┌─────────────┐
│    Admin    │
│   Login     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│           Admin Dashboard            │
├─────────┬─────────┬────────┬────────┤
│ Overview│  Staff  │ Clients│Analytics│
└────┬────┴────┬────┴───┬────┴────┬───┘
     │         │        │         │
     ▼         ▼        ▼         ▼
┌────────┐┌────────┐┌────────┐┌────────┐
│Today's ││Manage  ││Client  ││Revenue │
│Revenue ││Schedule││Database││Reports │
└────────┘└────────┘└────────┘└────────┘
     │         │        │         │
     ▼         ▼        ▼         ▼
┌────────┐┌────────┐┌────────┐┌────────┐
│Approve ││Time-Off││VIP     ││Export  │
│Requests││Requests││Status  ││Data    │
└────────┘└────────┘└────────┘└────────┘
```

---

## Information Architecture

### Client App Navigation
```
Bottom Tab Navigation
├── Home
│   ├── Hero Section
│   ├── Quick Book CTA
│   ├── Service Preview
│   ├── VIP Progress
│   └── Waiting List
├── Services
│   ├── Category Filter
│   └── Service Cards
├── Book
│   ├── Service Selection
│   ├── Artist Selection
│   ├── DateTime Picker
│   ├── Summary
│   └── Payment
├── VIP
│   ├── Status Card
│   ├── Progress Tracker
│   ├── Benefits List
│   └── VIP History
└── More (Profile)
    ├── My Appointments
    ├── My Notes
    ├── Settings
    ├── Courses
    ├── Shop (external)
    ├── About
    ├── Contact
    └── Logout
```

### Staff App Navigation
```
Bottom Tab Navigation
├── Home
│   ├── Today Overview
│   ├── Next Appointment
│   └── Quick Actions
├── Calendar
│   ├── Day View
│   ├── Week View
│   └── Month Overview
├── Dashboard
│   ├── Stats Grid
│   ├── Earnings
│   └── Performance
├── Messages
│   ├── Conversation List
│   └── Chat View
└── Notes
    ├── Client List
    ├── Note Editor
    └── Search
```

### Admin App Navigation
```
Bottom Tab Navigation
├── Dashboard
│   ├── Overview Cards
│   ├── Today's Bookings
│   ├── Revenue Chart
│   └── Alerts
├── Clients
│   ├── Client Database
│   ├── VIP Management
│   └── Waitlist
├── Staff
│   ├── Staff List
│   ├── Schedules
│   ├── Time-Off Requests
│   └── Performance
└── Analytics
    ├── Revenue Reports
    ├── Booking Trends
    ├── Service Analysis
    └── Export Options
```

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────────────┐       ┌──────────────────┐
│      users       │       │    user_roles    │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │◀──────│ user_id (FK)     │
│ email            │       │ role             │
│ phone            │       │ created_at       │
│ created_at       │       └──────────────────┘
└────────┬─────────┘
         │
         ▼
┌──────────────────┐       ┌──────────────────┐
│     profiles     │       │    vip_status    │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │
│ user_id (FK)     │◀──────│ profile_id (FK)  │
│ first_name       │       │ streak_count     │
│ last_name        │       │ is_vip           │
│ avatar_url       │       │ vip_since        │
│ date_of_birth    │       │ last_visit       │
└────────┬─────────┘       └──────────────────┘
         │
         ▼
┌──────────────────┐       ┌──────────────────┐
│   appointments   │       │     services     │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │
│ client_id (FK)   │       │ name             │
│ staff_id (FK)    │       │ description      │
│ service_id (FK)  │◀──────│ price            │
│ date             │       │ duration_mins    │
│ time             │       │ category         │
│ status           │       │ first_time_only  │
│ deposit_paid     │       └──────────────────┘
│ notes            │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐       ┌──────────────────┐
│  client_notes    │       │  staff_schedule  │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │
│ client_id (FK)   │       │ staff_id (FK)    │
│ staff_id (FK)    │       │ day_of_week      │
│ note_type        │       │ start_time       │
│ content          │       │ end_time         │
│ is_allergy       │       │ is_available     │
│ created_at       │       └──────────────────┘
└──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│    time_off      │       │    messages      │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │
│ staff_id (FK)    │       │ sender_id (FK)   │
│ start_date       │       │ receiver_id (FK) │
│ end_date         │       │ content          │
│ reason           │       │ read_at          │
│ status           │       │ created_at       │
│ approved_by      │       └──────────────────┘
└──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│   notifications  │       │    payments      │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │       │ id (PK)          │
│ user_id (FK)     │       │ appointment_id   │
│ type             │       │ amount           │
│ title            │       │ payment_type     │
│ body             │       │ status           │
│ read_at          │       │ stripe_id        │
│ created_at       │       │ created_at       │
└──────────────────┘       └──────────────────┘
```

### Tables Definition

```sql
-- User Roles (CRITICAL: Separate from profiles)
create type public.app_role as enum ('client', 'staff', 'admin');

create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null default 'client',
    created_at timestamptz default now(),
    unique (user_id, role)
);

-- Profiles
create table public.profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade unique not null,
    first_name text not null,
    last_name text not null,
    phone text,
    avatar_url text,
    date_of_birth date,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Services
create table public.services (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    price decimal(10,2) not null,
    duration_mins integer not null,
    category text not null,
    first_time_only boolean default false,
    is_active boolean default true,
    sort_order integer default 0,
    created_at timestamptz default now()
);

-- Appointments
create type public.appointment_status as enum (
    'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'
);

create table public.appointments (
    id uuid primary key default gen_random_uuid(),
    client_id uuid references public.profiles(id) not null,
    staff_id uuid references public.profiles(id) not null,
    service_id uuid references public.services(id) not null,
    scheduled_at timestamptz not null,
    duration_mins integer not null,
    status appointment_status default 'pending',
    deposit_amount decimal(10,2),
    deposit_paid boolean default false,
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- VIP Status
create table public.vip_status (
    id uuid primary key default gen_random_uuid(),
    profile_id uuid references public.profiles(id) unique not null,
    streak_count integer default 0,
    is_vip boolean default false,
    vip_since timestamptz,
    last_visit_at timestamptz,
    streak_broken_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Client Notes
create type public.note_type as enum ('preference', 'allergy', 'general', 'admin');

create table public.client_notes (
    id uuid primary key default gen_random_uuid(),
    client_id uuid references public.profiles(id) not null,
    author_id uuid references public.profiles(id) not null,
    note_type note_type default 'general',
    content text not null,
    is_pinned boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Staff Schedule
create table public.staff_schedules (
    id uuid primary key default gen_random_uuid(),
    staff_id uuid references public.profiles(id) not null,
    day_of_week integer not null check (day_of_week between 0 and 6),
    start_time time not null,
    end_time time not null,
    is_available boolean default true,
    created_at timestamptz default now()
);

-- Time Off Requests
create type public.time_off_status as enum ('pending', 'approved', 'declined');

create table public.time_off_requests (
    id uuid primary key default gen_random_uuid(),
    staff_id uuid references public.profiles(id) not null,
    start_date date not null,
    end_date date not null,
    reason text,
    status time_off_status default 'pending',
    reviewed_by uuid references public.profiles(id),
    decline_reason text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Messages
create table public.messages (
    id uuid primary key default gen_random_uuid(),
    sender_id uuid references public.profiles(id) not null,
    receiver_id uuid references public.profiles(id) not null,
    content text not null,
    read_at timestamptz,
    created_at timestamptz default now()
);

-- Payments
create type public.payment_status as enum ('pending', 'completed', 'failed', 'refunded');

create table public.payments (
    id uuid primary key default gen_random_uuid(),
    appointment_id uuid references public.appointments(id),
    amount decimal(10,2) not null,
    payment_type text not null,
    status payment_status default 'pending',
    stripe_payment_id text,
    created_at timestamptz default now()
);

-- Notifications
create table public.notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) not null,
    type text not null,
    title text not null,
    body text,
    data jsonb,
    read_at timestamptz,
    created_at timestamptz default now()
);
```

---

## Component Library

### Shared UI Components

| Component | Description | Props |
|-----------|-------------|-------|
| `Button` | Primary action button with variants | variant, size, loading, disabled, onPress |
| `Card` | Container with shadow and border | style, children, gradient |
| `Input` | Text input with label | label, placeholder, value, onChangeText, error |
| `Badge` | Status/label indicator | variant, children |
| `Avatar` | User profile image | source, size, vip, online |
| `ScreenHeader` | Consistent screen headers | title, subtitle, showBack, rightAction |
| `BottomSheet` | Modal from bottom | visible, onClose, children |
| `LoadingSpinner` | Loading indicator | size, color |
| `EmptyState` | Empty list placeholder | icon, title, description, action |
| `Divider` | Visual separator | style |

### Feature Components

| Component | Feature | Description |
|-----------|---------|-------------|
| `ServiceCard` | Services | Service display with book CTA |
| `AppointmentCard` | Calendar | Appointment summary card |
| `VIPProgressBar` | VIP | Visual streak progress |
| `StatsCard` | Dashboard | Metric display card |
| `NoteCard` | Notes | Client note display |
| `MessageBubble` | Messages | Chat message bubble |
| `CalendarDay` | Calendar | Day cell in calendar |
| `TimeSlot` | Booking | Available time slot |
| `ArtistCard` | Booking | Staff selection card |

### Layout Components

| Component | Description |
|-----------|-------------|
| `SafeAreaWrapper` | Safe area handling |
| `KeyboardAvoidingWrapper` | Keyboard handling |
| `ScrollContainer` | Scrollable content |
| `TabBar` | Bottom navigation |
| `Header` | Top navigation |

---

## Design System

### Color Palette

```typescript
const colors = {
  // Primary - Luxury Gold
  gold: {
    DEFAULT: '#C9A871',
    light: '#D4B88A',
    dark: '#B8975F',
    subtle: 'rgba(201, 168, 113, 0.15)',
  },
  
  // Background - Warm Cream
  cream: {
    DEFAULT: '#FAF7F2',
    light: '#FFFDF9',
    dark: '#F5F1E8',
  },
  
  // Text - Charcoal
  charcoal: {
    DEFAULT: '#2C2C2C',
    light: '#4A4A4A',
    muted: '#6B6B6B',
  },
  
  // Accent - Warm Beige
  beige: {
    DEFAULT: '#E8E0D4',
    light: '#F0EBE3',
    dark: '#D9CFC1',
  },
  
  // Semantic
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};
```

### Typography

```typescript
const typography = {
  // Headers - Serif
  h1: { fontFamily: 'Georgia', fontSize: 32, fontWeight: '700' },
  h2: { fontFamily: 'Georgia', fontSize: 28, fontWeight: '600' },
  h3: { fontFamily: 'Georgia', fontSize: 24, fontWeight: '600' },
  h4: { fontFamily: 'Georgia', fontSize: 20, fontWeight: '600' },
  
  // Body - Sans-serif
  body: { fontFamily: 'System', fontSize: 16, fontWeight: '400' },
  bodySmall: { fontFamily: 'System', fontSize: 14, fontWeight: '400' },
  
  // UI Elements
  button: { fontFamily: 'System', fontSize: 16, fontWeight: '600' },
  label: { fontFamily: 'System', fontSize: 12, fontWeight: '500' },
  caption: { fontFamily: 'System', fontSize: 11, fontWeight: '400' },
};
```

### Spacing Scale

```typescript
const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
};
```

### Border Radius

```typescript
const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};
```

### Shadows

```typescript
const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
};
```

---

## Technical Architecture

### Directory Structure

```
lash-mama-mobile/
├── app/                          # Expo Router (routes only)
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Entry redirect
│   ├── (auth)/                  # Auth routes
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (client)/                # Client routes
│   │   ├── _layout.tsx
│   │   ├── index.tsx            # Home
│   │   ├── services.tsx
│   │   ├── book.tsx
│   │   ├── vip.tsx
│   │   └── profile.tsx
│   ├── (staff)/                 # Staff routes
│   │   ├── _layout.tsx
│   │   ├── index.tsx            # Home
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   ├── messages.tsx
│   │   └── notes.tsx
│   └── (admin)/                 # Admin routes
│       ├── _layout.tsx
│       ├── index.tsx            # Dashboard
│       ├── clients.tsx
│       ├── staff.tsx
│       └── analytics.tsx
│
├── src/
│   ├── components/              # Shared components
│   │   ├── ui/                  # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   └── layout/              # Layout components
│   │       ├── ScreenHeader.tsx
│   │       ├── BottomSheet.tsx
│   │       └── index.ts
│   │
│   ├── features/                # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── client/
│   │   │   ├── home/
│   │   │   ├── services/
│   │   │   ├── booking/
│   │   │   ├── vip/
│   │   │   └── profile/
│   │   ├── staff/
│   │   │   ├── home/
│   │   │   ├── calendar/
│   │   │   ├── dashboard/
│   │   │   ├── messages/
│   │   │   └── notes/
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── clients/
│   │       ├── staff/
│   │       └── analytics/
│   │
│   ├── services/                # API layer
│   │   ├── auth.api.ts
│   │   ├── appointments.api.ts
│   │   ├── services.api.ts
│   │   ├── clients.api.ts
│   │   ├── staff.api.ts
│   │   └── notifications.api.ts
│   │
│   ├── lib/                     # Infrastructure
│   │   ├── supabase.ts
│   │   ├── auth.ts
│   │   └── storage.ts
│   │
│   ├── hooks/                   # Global hooks
│   │   ├── useAuth.ts
│   │   ├── useNotifications.ts
│   │   └── useRole.ts
│   │
│   ├── types/                   # Global types
│   │   ├── database.ts
│   │   ├── navigation.ts
│   │   └── index.ts
│   │
│   ├── utils/                   # Global utilities
│   │   ├── date.ts
│   │   ├── format.ts
│   │   └── validation.ts
│   │
│   └── theme/                   # Design tokens
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       ├── shadows.ts
│       ├── gradients.ts
│       ├── borderRadius.ts
│       └── index.ts
│
├── assets/                      # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── app.json                     # Expo config
├── package.json
├── tsconfig.json
└── README.md
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React Native 0.73+ |
| Navigation | Expo Router 3.x |
| State Management | React Context + Hooks |
| Backend | Supabase |
| Authentication | Supabase Auth |
| Database | PostgreSQL (via Supabase) |
| Storage | Supabase Storage |
| Payments | Stripe |
| Push Notifications | Expo Notifications |
| Styling | StyleSheet (Native) |
| Gradients | expo-linear-gradient |

### Security Considerations

1. **Authentication**
   - JWT-based auth via Supabase
   - Biometric authentication (FaceID/TouchID)
   - Secure token storage (expo-secure-store)

2. **Authorization**
   - Role-based access control (RBAC)
   - Row Level Security (RLS) on all tables
   - Server-side role verification

3. **Data Protection**
   - HTTPS only communication
   - Encrypted storage for sensitive data
   - PCI compliance for payments (via Stripe)

4. **Privacy**
   - GDPR compliance features
   - Data export capability
   - Account deletion flow

---

## API Specifications

### Authentication

```typescript
// auth.api.ts

interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

// Sign up
signUp(email: string, password: string): Promise<AuthResponse>

// Sign in
signIn(email: string, password: string): Promise<AuthResponse>

// Sign out
signOut(): Promise<void>

// Get current session
getSession(): Promise<Session | null>

// Reset password
resetPassword(email: string): Promise<void>
```

### Appointments

```typescript
// appointments.api.ts

interface Appointment {
  id: string;
  client_id: string;
  staff_id: string;
  service_id: string;
  scheduled_at: string;
  duration_mins: number;
  status: AppointmentStatus;
  deposit_paid: boolean;
  notes?: string;
}

// Create appointment
createAppointment(data: CreateAppointmentDto): Promise<Appointment>

// Get appointments (filtered)
getAppointments(filters: AppointmentFilters): Promise<Appointment[]>

// Update appointment status
updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<Appointment>

// Cancel appointment
cancelAppointment(id: string, reason?: string): Promise<void>

// Get available slots
getAvailableSlots(staffId: string, date: string): Promise<TimeSlot[]>
```

### Services

```typescript
// services.api.ts

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_mins: number;
  category: string;
  first_time_only: boolean;
  is_active: boolean;
}

// Get all services
getServices(): Promise<Service[]>

// Get services by category
getServicesByCategory(category: string): Promise<Service[]>

// Get service by ID
getServiceById(id: string): Promise<Service>
```

### Clients

```typescript
// clients.api.ts

interface Client {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  vip_status?: VIPStatus;
}

// Get all clients (admin)
getClients(filters?: ClientFilters): Promise<Client[]>

// Get client by ID
getClientById(id: string): Promise<Client>

// Update client profile
updateClient(id: string, data: UpdateClientDto): Promise<Client>

// Get client notes
getClientNotes(clientId: string): Promise<ClientNote[]>

// Add client note
addClientNote(clientId: string, note: CreateNoteDto): Promise<ClientNote>
```

### Staff

```typescript
// staff.api.ts

interface Staff {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  bio?: string;
  specialties?: string[];
  minimum_notice_hours: number;
}

// Get all staff
getStaff(): Promise<Staff[]>

// Get staff by ID
getStaffById(id: string): Promise<Staff>

// Get staff schedule
getStaffSchedule(staffId: string, weekStart: string): Promise<Schedule[]>

// Request time off
requestTimeOff(data: TimeOffRequest): Promise<TimeOffRequest>

// Get time off requests (admin)
getTimeOffRequests(status?: TimeOffStatus): Promise<TimeOffRequest[]>

// Approve/decline time off (admin)
updateTimeOffRequest(id: string, status: TimeOffStatus, reason?: string): Promise<void>
```

---

## Success Metrics

### Key Performance Indicators (KPIs)

| Metric | Definition | Target | Measurement |
|--------|------------|--------|-------------|
| Daily Active Users | Unique users per day | 100+ | Analytics |
| Booking Conversion | Visits to bookings | >40% | Analytics |
| No-Show Rate | Missed appointments | <5% | Database |
| VIP Conversion | Clients reaching VIP | >20% | Database |
| App Rating | Store rating | 4.8+ | App Stores |
| Retention (30-day) | Users returning | >60% | Analytics |
| NPS Score | Net Promoter Score | >50 | Surveys |

### Business Metrics

| Metric | Current | 6-Month Target | 12-Month Target |
|--------|---------|----------------|-----------------|
| Monthly Bookings | 240 | 400 | 600 |
| Monthly Revenue | $48K | $80K | $120K |
| Active Clients | 150 | 300 | 500 |
| VIP Clients | 0 | 50 | 100 |
| Staff Utilization | 60% | 75% | 85% |

---

## Release Phases

### Phase 1: MVP (8 weeks)

**Goal:** Core booking functionality

**Features:**
- ✅ User authentication
- ✅ Service catalog
- ✅ Basic booking flow
- ✅ Payment processing
- ✅ Appointment management
- ✅ Push notifications
- ✅ Client profile

**Deliverables:**
- iOS TestFlight build
- Android internal testing

---

### Phase 2: Staff Tools (4 weeks)

**Goal:** Staff efficiency

**Features:**
- ✅ Staff calendar
- ✅ Client notes system
- ✅ Dashboard with stats
- ✅ Time-off requests
- ✅ Pre-appointment alerts

**Deliverables:**
- Staff app section
- Admin approval flows

---

### Phase 3: VIP Program (4 weeks)

**Goal:** Client retention

**Features:**
- ✅ VIP streak tracking
- ✅ Benefits display
- ✅ Discount application
- ✅ VIP badge system
- ✅ Progress notifications

**Deliverables:**
- VIP feature set
- Loyalty mechanics

---

### Phase 4: Admin Tools (4 weeks)

**Goal:** Business management

**Features:**
- ✅ Analytics dashboard
- ✅ Staff management
- ✅ Client database
- ✅ Report exports
- ✅ Business settings

**Deliverables:**
- Admin panel
- Reporting system

---

### Phase 5: Enhancements (Ongoing)

**Goal:** Polish and growth

**Features:**
- 🔲 In-app messaging
- 🔲 Recurring bookings
- 🔲 Referral system
- 🔲 Course enrollment
- 🔲 Afterpay integration
- 🔲 Shop integration

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| VIP | Client with 10+ consecutive bookings |
| Streak | Consecutive bookings within 3-month windows |
| Refill | Maintenance appointment for existing lashes |
| Full Set | Complete lash application for new/reset clients |
| Deposit | Pre-payment to confirm booking |

### B. Business Rules Summary

| Rule | Description |
|------|-------------|
| First-time booking | Full sets only, no refills |
| Cancellation policy | 48 hours notice, deposit forfeiture |
| VIP qualification | 10 consecutive visits |
| VIP streak break | 3+ months gap resets streak |
| Beau minimum notice | 2 hours |
| Other staff notice | 24 hours |
| Staff referral bonus | 10% of referred booking |

### C. Integration Points

| System | Purpose | Integration Type |
|--------|---------|-----------------|
| Supabase | Backend & Auth | Native SDK |
| Stripe | Payments | SDK + Webhooks |
| Expo Notifications | Push alerts | Expo SDK |
| Shopify | Product shop | External link |
| Google/Apple Calendar | Export | Calendar invite |

### D. Compliance Requirements

| Requirement | Implementation |
|-------------|----------------|
| Privacy Policy | Required for app stores |
| Terms of Service | Required for app stores |
| GDPR | Data export, deletion |
| PCI DSS | Stripe handles (offload) |
| Accessibility | WCAG 2.1 AA target |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | Product Team | Initial release |

---

**Next Steps:**
1. Review with stakeholders
2. Prioritize backlog items
3. Create sprint plans
4. Begin development

---

*This document is the source of truth for the Lash Mama mobile application. All development should reference this PRD for feature specifications and requirements.*
