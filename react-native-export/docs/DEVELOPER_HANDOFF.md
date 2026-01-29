# Lash Mama Mobile App — Developer Handoff Document

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Target Platform:** iOS & Android (React Native / Expo)  
**Handoff To:** Senior Developer / Development Team

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [User Roles](#2-user-roles)
3. [User Flows](#3-user-flows)
4. [Screen List](#4-screen-list)
5. [Mobile Screen Mockups](#5-mobile-screen-mockups)
6. [Design System Tokens](#6-design-system-tokens)
7. [Shared vs Role-Specific Components](#7-shared-vs-role-specific-components)
8. [Navigation Architecture](#8-navigation-architecture)
9. [Technical Constraints](#9-technical-constraints)
10. [Component Specifications](#10-component-specifications)
11. [Data Models](#11-data-models)
12. [API Contracts](#12-api-contracts)

---

## 1. EXECUTIVE SUMMARY

### Product Vision
Lash Mama is a premium luxury beauty booking application for a lash extension salon. The app serves three distinct user types with role-specific experiences optimized for mobile.

### Core Problem
Efficiently manage beauty appointments while building client loyalty through a VIP program.

### Success Metrics
- Bookings per day (target: 15+)
- Client retention rate (target: 70%)
- VIP conversion rate (target: 30%)

### Technology Stack
- **Framework:** React Native with Expo
- **Routing:** Expo Router (file-based)
- **Styling:** React Native StyleSheet + Design Tokens
- **State:** React Context + TanStack Query
- **Backend:** Supabase (Auth, Database, Storage)

---

## 2. USER ROLES

### 2.1 Client
**Who:** Customers booking lash services  
**Goal:** Book appointments, track VIP status, manage profile  
**Access Level:** Own data only

### 2.2 Manager  
**Who:** Lash technicians/artists  
**Goal:** Manage daily schedule, client notes, communicate  
**Access Level:** Assigned clients and appointments

### 2.3 Admin (Lash Mama Owner)
**Who:** Business owner  
**Goal:** Oversee all operations, analytics, staff management  
**Access Level:** Full system access

---

## 3. USER FLOWS

### 3.1 CLIENT FLOWS

#### Flow C1: First-Time User Onboarding
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Splash    │ ──▶ │   Login/    │ ──▶ │  Complete   │ ──▶ │    Home     │
│   Screen    │     │   Signup    │     │   Profile   │     │   Screen    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. App launches → Splash screen (2s)
2. User taps "Get Started" → Login/Signup screen
3. User enters email + password → Signup
4. User completes profile (name, phone, allergies) → Profile setup
5. Success → Home screen with booking CTA

#### Flow C2: Returning User Login
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Splash    │ ──▶ │   Login     │ ──▶ │    Home     │
│   Screen    │     │   Screen    │     │   Screen    │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. App launches → Splash screen
2. User enters credentials → Login
3. Auth success → Home screen

#### Flow C3: Book Appointment (Primary Flow)
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Home     │ ──▶ │  Services   │ ──▶ │   Select    │ ──▶ │   Select    │
│   Screen    │     │    List     │     │   Artist    │     │    Time     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Home     │ ◀── │  Confirm    │ ◀── │   Payment   │ ◀── │   Review    │
│  (updated)  │     │   Modal     │     │   Screen    │     │   Booking   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Home → Tap "Book Appointment" button
2. Services List → Browse/filter services by category
3. Tap service → Select Artist screen
4. Tap artist → Calendar with available slots
5. Tap time slot → Review booking summary
6. Tap "Confirm" → Payment screen (Afterpay option)
7. Payment success → Confirmation modal
8. Tap "Done" → Home screen (shows upcoming appointment)

#### Flow C4: View/Manage Booking
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Home     │ ──▶ │ Appointment │ ──▶ │  Reschedule │
│   Screen    │     │   Details   │     │   Request   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Cancel    │
                    │   Confirm   │
                    └─────────────┘
```

**Steps:**
1. Home → Tap upcoming appointment card
2. Appointment Details → View full details
3. Option A: Tap "Reschedule" → Request form (modal)
4. Option B: Tap "Cancel" → Cancellation confirmation (modal)

#### Flow C5: VIP Status Check
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Home     │ ──▶ │     VIP     │ ──▶ │   Benefit   │
│   Screen    │     │  Dashboard  │     │   Details   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Home → Tap "VIP" tab in bottom nav
2. VIP Dashboard → View status, streak, benefits
3. Tap benefit card → Benefit details modal

#### Flow C6: Browse Services
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Home     │ ──▶ │  Services   │ ──▶ │   Service   │
│   Screen    │     │    List     │     │   Details   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Home → Tap "Services" tab
2. Services List → Filter by category (tabs)
3. Tap service → Service details (modal or screen)

#### Flow C7: Profile Management
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Home     │ ──▶ │   Profile   │ ──▶ │    Edit     │
│   Screen    │     │   Screen    │     │   Profile   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ├──▶ Booking History
                           ├──▶ Payment Methods
                           ├──▶ Notifications Settings
                           └──▶ Logout
```

---

### 3.2 MANAGER FLOWS

#### Flow M1: Manager Login
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Splash    │ ──▶ │   Login     │ ──▶ │  Dashboard  │
│   Screen    │     │   Screen    │     │   Screen    │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. App launches → Splash
2. Enter manager credentials → Login
3. Role detected as "manager" → Manager Dashboard

#### Flow M2: Daily Schedule Review
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Dashboard  │ ──▶ │  Calendar   │ ──▶ │ Appointment │
│   Screen    │     │    View     │     │   Details   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Dashboard → View today's appointments list
2. Tap "Calendar" tab → Full calendar view
3. Tap appointment → Appointment details modal

#### Flow M3: Mark Appointment Complete
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Dashboard  │ ──▶ │ Appointment │ ──▶ │  Complete   │ ──▶ │    Add      │
│   Screen    │     │   Details   │     │   Action    │     │   Notes     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Dashboard → Tap appointment card
2. Appointment Details → Review client info
3. Tap "Mark Complete" → Completion confirmation
4. Optional: Add session notes → Save

#### Flow M4: Handle Reschedule Request
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Dashboard  │ ──▶ │  Pending    │ ──▶ │  Approve/   │
│ (badge: 1)  │     │  Requests   │     │   Decline   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Dashboard shows notification badge
2. Tap notification → Pending requests list
3. Tap request → Request details
4. Approve → Select new time slot
5. Decline → Add reason (optional)

#### Flow M5: Client Notes Management
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Calendar   │ ──▶ │ Appointment │ ──▶ │   Client    │
│   Screen    │     │   Details   │     │   Notes     │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Add Note   │
                                        │   (Modal)   │
                                        └─────────────┘
```

**Steps:**
1. Calendar → Tap appointment
2. Appointment Details → Tap "Client Notes"
3. Client Notes → View history
4. Tap "+" → Add note modal
5. Enter note + optional photo → Save

#### Flow M6: Request Time Off
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Dashboard  │ ──▶ │   Profile   │ ──▶ │  Time Off   │
│   Screen    │     │   Screen    │     │   Request   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Dashboard → Tap profile icon
2. Profile → Tap "Request Time Off"
3. Select dates → Add reason → Submit

---

### 3.3 ADMIN FLOWS

#### Flow A1: Admin Login
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Splash    │ ──▶ │   Login     │ ──▶ │    Admin    │
│   Screen    │     │   Screen    │     │  Dashboard  │
└─────────────┘     └─────────────┘     └─────────────┘
```

#### Flow A2: Business Overview
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Admin    │ ──▶ │  Analytics  │ ──▶ │   Report    │
│  Dashboard  │     │   Screen    │     │   Details   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Dashboard → View KPI cards (revenue, bookings, clients)
2. Tap "Analytics" tab → Full analytics
3. Select date range → View detailed reports
4. Tap metric → Drill-down details

#### Flow A3: Manager Management
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Admin    │ ──▶ │   Manager   │ ──▶ │   Manager   │
│  Dashboard  │     │    List     │     │   Details   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Add New    │
                    │   Manager   │
                    └─────────────┘
```

**Steps:**
1. Dashboard → Tap "Managers" tab
2. Manager List → View all managers
3. Tap manager → Manager details + performance
4. Tap "+" → Add new manager form

#### Flow A4: Client Database
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Admin    │ ──▶ │   Client    │ ──▶ │   Client    │
│  Dashboard  │     │    List     │     │   Profile   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Dashboard → Tap "Clients" tab
2. Client List → Search/filter clients
3. Tap client → Full client profile
4. View: booking history, notes, VIP status

#### Flow A5: Recurring Booking Setup
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Admin    │ ──▶ │   Client    │ ──▶ │  Recurring  │ ──▶ │   Confirm   │
│  Dashboard  │     │   Profile   │     │   Setup     │     │   Schedule  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Client Profile → Tap "Setup Recurring"
2. Select: service, manager, frequency
3. Select: preferred day/time
4. Review → Confirm recurring schedule

#### Flow A6: Approve Time Off
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Admin    │ ──▶ │   Pending   │ ──▶ │  Approve/   │
│  Dashboard  │     │  Requests   │     │   Decline   │
└─────────────┘     └─────────────┘     └─────────────┘
```

#### Flow A7: Send Refill Reminders
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Admin    │ ──▶ │   Refill    │ ──▶ │    Send     │
│  Dashboard  │     │    List     │     │   Message   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Steps:**
1. Dashboard → Tap "Refill Due" card
2. View clients due for refill
3. Select clients → Send bulk reminder

---

## 4. SCREEN LIST

### 4.1 CLIENT SCREENS

| # | Screen Name | Entry Point | Purpose | Primary Action |
|---|-------------|-------------|---------|----------------|
| C1 | Splash | App launch | Brand loading | Auto-redirect |
| C2 | Login | Splash / Logout | Authentication | Login/Signup |
| C3 | Signup | Login screen | Create account | Register |
| C4 | Profile Setup | First signup | Complete profile | Save profile |
| C5 | Home | Login success | Dashboard overview | Book appointment |
| C6 | Services List | Bottom tab | Browse services | Select service |
| C7 | Service Details | Tap service | View service info | Book this service |
| C8 | Artist Selection | Service selected | Choose technician | Select artist |
| C9 | Time Selection | Artist selected | Pick time slot | Confirm time |
| C10 | Booking Review | Time selected | Review booking | Proceed to pay |
| C11 | Payment | Booking review | Process payment | Complete payment |
| C12 | Booking Confirmation | Payment success | Show confirmation | Return home |
| C13 | Appointment Details | Tap appointment | View booking | Reschedule/Cancel |
| C14 | VIP Dashboard | Bottom tab | VIP status | View benefits |
| C15 | Profile | Bottom tab | Account settings | Edit profile |
| C16 | Booking History | Profile screen | Past appointments | Rebook |
| C17 | Notifications | Profile screen | Notification prefs | Toggle settings |

### 4.2 MANAGER SCREENS

| # | Screen Name | Entry Point | Purpose | Primary Action |
|---|-------------|-------------|---------|----------------|
| M1 | Login | App launch | Authentication | Login |
| M2 | Dashboard | Login success | Daily overview | View appointments |
| M3 | Calendar | Bottom tab | Schedule view | Navigate dates |
| M4 | Appointment Details | Tap appointment | Client/service info | Mark complete |
| M5 | Client Notes | Appointment details | View/add notes | Add note |
| M6 | Add Note | Client notes | Create note | Save note |
| M7 | Pending Requests | Dashboard badge | Reschedule requests | Approve/Decline |
| M8 | Messages | Bottom tab | Client messaging | Send message |
| M9 | Conversation | Messages list | Chat thread | Reply |
| M10 | Profile | Top right icon | Account settings | Request time off |
| M11 | Time Off Request | Profile screen | Request leave | Submit request |

### 4.3 ADMIN SCREENS

| # | Screen Name | Entry Point | Purpose | Primary Action |
|---|-------------|-------------|---------|----------------|
| A1 | Login | App launch | Authentication | Login |
| A2 | Dashboard | Login success | Business overview | View KPIs |
| A3 | Analytics | Bottom tab | Detailed reports | Filter data |
| A4 | Revenue Report | Analytics screen | Income breakdown | Export report |
| A5 | Manager List | Bottom tab | Team management | View manager |
| A6 | Manager Details | Tap manager | Performance/schedule | Edit manager |
| A7 | Add Manager | Manager list (+) | Onboard manager | Save manager |
| A8 | Client List | Bottom tab | Client database | Search client |
| A9 | Client Profile | Tap client | Full client info | Setup recurring |
| A10 | Recurring Setup | Client profile | Configure recurring | Confirm schedule |
| A11 | Pending Requests | Dashboard badge | Time off requests | Approve/Decline |
| A12 | Refill Reminders | Dashboard card | Due for refill | Send reminder |
| A13 | Settings | Top right icon | App settings | Update settings |
| A14 | VIP Management | Settings | VIP program config | Edit tiers |

---

## 5. MOBILE SCREEN MOCKUPS

### 5.1 CLIENT SCREENS

#### C5: Home Screen
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│                                     │
│        [LASH MAMA LOGO]             │
│         Welcome back,               │
│           Sarah ✨                  │
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │   YOUR NEXT APPOINTMENT         │ │
│ │   ─────────────────────────     │ │
│ │   Classic Full Set              │ │
│ │   with Nikki                    │ │
│ │   Thu, Jan 30 · 2:00 PM         │ │
│ │                                 │ │
│ │   [View Details]                │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│ │        BOOK APPOINTMENT         │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌───────────┐ ┌───────────────────┐ │
│ │  VIP      │ │    Services       │ │
│ │  Status   │ │    Browse All     │ │
│ │  Gold ⭐  │ │    →              │ │
│ └───────────┘ └───────────────────┘ │
│                                     │
│ ── Quick Actions ──────────────     │
│                                     │
│ ┌───────────┐ ┌───────────────────┐ │
│ │ Courses   │ │    Shop           │ │
│ │           │ │    Products →     │ │
│ └───────────┘ └───────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  🏠      📋      📅      ⭐      ≡  │
│  Home  Services  Book    VIP    More│
└─────────────────────────────────────┘
```

#### C6: Services List
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│ ←  Services                         │
├─────────────────────────────────────┤
│                                     │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────────┐ │
│ │ All │ │Lash │ │Brow │ │ Makeup  │ │
│ └─────┘ └─────┘ └─────┘ └─────────┘ │
│   ▔▔▔                               │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐                         │ │
│ │ │     │  Classic Full Set       │ │
│ │ │ IMG │  Natural, elegant look  │ │
│ │ │     │                         │ │
│ │ └─────┘  $150  ·  2 hours       │ │
│ │                          [Book] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐                         │ │
│ │ │     │  Volume Full Set        │ │
│ │ │ IMG │  Dramatic, full look    │ │
│ │ │     │                         │ │
│ │ └─────┘  $200  ·  2.5 hours     │ │
│ │                          [Book] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐                         │ │
│ │ │     │  Hybrid Set             │ │
│ │ │ IMG │  Best of both worlds    │ │
│ │ │     │                         │ │
│ │ └─────┘  $180  ·  2 hours       │ │
│ │                          [Book] │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  🏠      📋      📅      ⭐      ≡  │
│  Home  Services  Book    VIP    More│
└─────────────────────────────────────┘
```

#### C8: Artist Selection
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│ ←  Select Artist                    │
├─────────────────────────────────────┤
│                                     │
│   Classic Full Set                  │
│   2 hours · $150                    │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ┌────────┐                     │ │
│ │  │        │   Nikki             │ │
│ │  │  PHOTO │   Senior Lash Tech  │ │
│ │  │        │   ⭐ 4.9 (124)      │ │
│ │  └────────┘                     │ │
│ │              Next: Tomorrow 2PM │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ┌────────┐                     │ │
│ │  │        │   Beau              │ │
│ │  │  PHOTO │   Lash Artist       │ │
│ │  │        │   ⭐ 4.8 (89)       │ │
│ │  └────────┘                     │ │
│ │              Next: Today 4PM    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ┌────────┐                     │ │
│ │  │        │   Purni (Owner)     │ │
│ │  │  PHOTO │   Master Technician │ │
│ │  │        │   ⭐ 5.0 (312)      │ │
│ │  └────────┘                     │ │
│ │              Waitlist only      │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│              [Any Available]        │
└─────────────────────────────────────┘
```

#### C9: Time Selection
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│ ←  Select Time                      │
├─────────────────────────────────────┤
│                                     │
│   Classic Full Set with Nikki       │
│   2 hours · $150                    │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│       ◀  January 2025  ▶            │
│                                     │
│   M   T   W   T   F   S   S         │
│  27  28  29 [30] 31   1   2         │
│   3   4   5   6   7   8   9         │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│   Thursday, January 30              │
│                                     │
│   ┌───────┐ ┌───────┐ ┌───────┐    │
│   │ 10:00 │ │ 12:00 │ │ 2:00  │    │
│   │  AM   │ │  PM   │ │  PM   │    │
│   └───────┘ └───────┘ └───────┘    │
│                  ▔▔▔▔▔▔▔            │
│   ┌───────┐ ┌───────┐               │
│   │ 4:00  │ │ 6:00  │               │
│   │  PM   │ │  PM   │               │
│   └───────┘ └───────┘               │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│           CONTINUE                  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└─────────────────────────────────────┘
```

#### C14: VIP Dashboard
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│   VIP Status                        │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│ │                                 │ │
│ │          ⭐ GOLD VIP ⭐         │ │
│ │                                 │ │
│ │     12 Appointment Streak       │ │
│ │     ████████████░░░░░░░░        │ │
│ │     3 more for Platinum!        │ │
│ │                                 │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│ └─────────────────────────────────┘ │
│                                     │
│   Your Benefits                     │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ✓  10% Off All Services        │ │
│ │     Applied automatically       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ✓  Priority Booking            │ │
│ │     48hr early access           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ✓  Free Refill (Monthly)       │ │
│ │     1 remaining this month      │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  🏠      📋      📅      ⭐      ≡  │
│  Home  Services  Book    VIP    More│
└─────────────────────────────────────┘
```

---

### 5.2 MANAGER SCREENS

#### M2: Dashboard
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│   Good morning, Nikki         [👤]  │
├─────────────────────────────────────┤
│                                     │
│ ┌───────────────┐ ┌───────────────┐ │
│ │     TODAY     │ │   COMPLETED   │ │
│ │       6       │ │      4        │ │
│ │  appointments │ │   this week   │ │
│ └───────────────┘ └───────────────┘ │
│                                     │
│ ┌───────────────┐ ┌───────────────┐ │
│ │   PENDING     │ │   EARNINGS    │ │
│ │       2       │ │    $1,240     │ │
│ │   requests    │ │   this week   │ │
│ └───────────────┘ └───────────────┘ │
│                                     │
│   Today's Schedule                  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  10:00 AM                       │ │
│ │  ──────────────────────────     │ │
│ │  Sarah M. · Classic Full Set    │ │
│ │  ⭐ VIP Gold                    │ │
│ │  [View] [Complete]              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  1:00 PM                        │ │
│ │  ──────────────────────────     │ │
│ │  Emma T. · Lash Refill          │ │
│ │  First visit                    │ │
│ │  [View] [Complete]              │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  🏠      📅      💬      📝         │
│  Home  Calendar Messages Notes      │
└─────────────────────────────────────┘
```

#### M3: Calendar View
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│   Calendar                    [+]   │
├─────────────────────────────────────┤
│                                     │
│       ◀  January 2025  ▶            │
│                                     │
│   M   T   W   T   F   S   S         │
│  27  28  29 [30] 31   1   2         │
│            ●●       ●               │
│   3   4   5   6   7   8   9         │
│   ●   ●●  ●   ●●                    │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│   Thu 30                            │
│                                     │
│   ┌────┐                            │
│   │10AM│ Sarah M.                   │
│   │    │ Classic Full · 2hr         │
│   └────┘                            │
│   ┌────┐                            │
│   │1PM │ Emma T.                    │
│   │    │ Refill · 1hr               │
│   └────┘                            │
│   ┌────┐                            │
│   │3PM │ Olivia P.                  │
│   │    │ Volume Set · 2.5hr         │
│   └────┘                            │
│   ┌────┐                            │
│   │6PM │ Jessica K.                 │
│   │    │ Classic Refill · 1hr       │
│   └────┘                            │
│                                     │
├─────────────────────────────────────┤
│  🏠      📅      💬      📝         │
│  Home  Calendar Messages Notes      │
└─────────────────────────────────────┘
```

#### M4: Appointment Details (Modal)
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────────┤
│                              [X]    │
│                                     │
│   ┌────────────┐                    │
│   │            │   Sarah Mitchell   │
│   │   PHOTO    │   ⭐ VIP Gold      │
│   │            │   Client since     │
│   └────────────┘   March 2023       │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│   Classic Full Set                  │
│   Thu, Jan 30 · 10:00 AM            │
│   Duration: 2 hours                 │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│   Notes                             │
│   ┌─────────────────────────────┐   │
│   │ Sensitive eyes - use        │   │
│   │ sensitive adhesive          │   │
│   └─────────────────────────────┘   │
│                                     │
│   [View All Notes]                  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │       MARK AS COMPLETE          │ │
│ └─────────────────────────────────┘ │
│                                     │
│   [Message Client]  [Reschedule]    │
│                                     │
└─────────────────────────────────────┘
```

---

### 5.3 ADMIN SCREENS

#### A2: Admin Dashboard
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│   Lash Mama Admin             [⚙]   │
├─────────────────────────────────────┤
│                                     │
│   January 2025                      │
│                                     │
│ ┌───────────────┐ ┌───────────────┐ │
│ │   REVENUE     │ │   BOOKINGS    │ │
│ │   $24,580     │ │     142       │ │
│ │   ↑ 12%       │ │   ↑ 8%        │ │
│ └───────────────┘ └───────────────┘ │
│                                     │
│ ┌───────────────┐ ┌───────────────┐ │
│ │  NEW CLIENTS  │ │   VIP RATE    │ │
│ │      18       │ │     34%       │ │
│ │   this month  │ │   ↑ 5%        │ │
│ └───────────────┘ └───────────────┘ │
│                                     │
│   Action Required                   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  🔔 3 pending time off requests │ │
│ │     [Review]                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ⏰ 12 clients due for refill   │ │
│ │     [Send Reminders]            │ │
│ └─────────────────────────────────┘ │
│                                     │
│   Today's Overview                  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  Nikki   ████████░░  6 appts    │ │
│ │  Beau    ██████░░░░  4 appts    │ │
│ │  Natali  ████████░░  5 appts    │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  🏠      📊      👥      🗂         │
│  Home  Analytics Managers Clients   │
└─────────────────────────────────────┘
```

#### A3: Analytics Screen
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│ ←  Analytics                        │
├─────────────────────────────────────┤
│                                     │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────────┐ │
│ │Week │ │Month│ │ Year│ │ Custom  │ │
│ └─────┘ └─────┘ └─────┘ └─────────┘ │
│          ▔▔▔▔▔                      │
│                                     │
│   Revenue                           │
│   ┌─────────────────────────────┐   │
│   │                         ╭   │   │
│   │                    ╭────╯   │   │
│   │               ╭────╯        │   │
│   │          ╭────╯             │   │
│   │     ╭────╯                  │   │
│   │ ────╯                       │   │
│   │ W1   W2   W3   W4           │   │
│   └─────────────────────────────┘   │
│                                     │
│   Top Services                      │
│   ┌─────────────────────────────┐   │
│   │ Classic Full   ████████ 45% │   │
│   │ Volume Set     █████    28% │   │
│   │ Refill         ████     18% │   │
│   │ Other          ██        9% │   │
│   └─────────────────────────────┘   │
│                                     │
│   Manager Performance               │
│   ┌─────────────────────────────┐   │
│   │ 1. Nikki      $8,420  42 ⭐  │   │
│   │ 2. Beau       $6,280  38 ⭐  │   │
│   │ 3. Natali     $5,100  31 ⭐  │   │
│   └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  🏠      📊      👥      🗂         │
│  Home  Analytics Managers Clients   │
└─────────────────────────────────────┘
```

#### A5: Manager List
```
┌─────────────────────────────────────┐
│ ░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░ │
├─────────────────────────────────────┤
│   Team                        [+]   │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ┌────────┐                     │ │
│ │  │        │   Nikki             │ │
│ │  │  PHOTO │   Senior Lash Tech  │ │
│ │  │        │   ────────────────  │ │
│ │  └────────┘   This week:        │ │
│ │               $2,840 · 18 appts │ │
│ │               ⭐ 4.9 avg rating │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ┌────────┐                     │ │
│ │  │        │   Beau              │ │
│ │  │  PHOTO │   Lash Artist       │ │
│ │  │        │   ────────────────  │ │
│ │  └────────┘   This week:        │ │
│ │               $1,680 · 12 appts │ │
│ │               ⭐ 4.8 avg rating │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ┌────────┐                     │ │
│ │  │        │   Natali            │ │
│ │  │  PHOTO │   Lash Technician   │ │
│ │  │        │   ────────────────  │ │
│ │  └────────┘   This week:        │ │
│ │               $2,100 · 15 appts │ │
│ │               ⭐ 4.7 avg rating │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  🏠      📊      👥      🗂         │
│  Home  Analytics Managers Clients   │
└─────────────────────────────────────┘
```

---

## 6. DESIGN SYSTEM TOKENS

### 6.1 COLOR PALETTE

```typescript
// src/theme/colors.ts

export const colors = {
  // ═══════════════════════════════════════════
  // PRIMARY BRAND COLORS
  // ═══════════════════════════════════════════
  
  primary: {
    DEFAULT: '#C9A871',      // Gold - main brand color
    light: '#D4B88A',        // Lighter gold
    dark: '#B8975F',         // Darker gold
    muted: 'rgba(201, 168, 113, 0.6)',
    subtle: 'rgba(201, 168, 113, 0.15)',
  },
  
  // ═══════════════════════════════════════════
  // BACKGROUND COLORS
  // ═══════════════════════════════════════════
  
  background: {
    DEFAULT: '#FAF7F2',      // Cream - primary background
    secondary: '#F5F1E8',    // Beige - card backgrounds
    tertiary: '#EDE7DB',     // Darker beige
    dark: '#2C2C2C',         // Charcoal - dark mode / hero
  },
  
  // ═══════════════════════════════════════════
  // TEXT COLORS
  // ═══════════════════════════════════════════
  
  text: {
    primary: '#2C2C2C',      // Charcoal - headings, primary text
    secondary: '#5C5C5C',    // Medium gray - body text
    muted: '#737373',        // Light gray - captions, hints
    inverse: '#FFFFFF',      // White - on dark backgrounds
    gold: '#C9A871',         // Gold - accents, links
  },
  
  // ═══════════════════════════════════════════
  // STATUS COLORS
  // ═══════════════════════════════════════════
  
  status: {
    success: '#22C55E',      // Green
    successLight: '#DCFCE7',
    warning: '#F59E0B',      // Amber
    warningLight: '#FEF3C7',
    error: '#EF4444',        // Red
    errorLight: '#FEE2E2',
    info: '#3B82F6',         // Blue
    infoLight: '#DBEAFE',
  },
  
  // ═══════════════════════════════════════════
  // UI COLORS
  // ═══════════════════════════════════════════
  
  border: {
    DEFAULT: 'rgba(201, 168, 113, 0.2)',   // Subtle gold
    strong: 'rgba(201, 168, 113, 0.4)',    // Visible gold
    muted: '#E5E5E5',                      // Neutral gray
  },
  
  overlay: {
    light: 'rgba(250, 247, 242, 0.95)',
    dark: 'rgba(44, 44, 44, 0.8)',
  },
};
```

### 6.2 TYPOGRAPHY

```typescript
// src/theme/typography.ts

export const fontFamily = {
  // Display/Headings - Elegant Serif
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
  }),
  
  // Body/UI - Clean Sans-serif
  sans: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
  
  // Numbers/Codes
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
  }),
};

export const fontSize = {
  // Display (Headings)
  h1: 30,       // Screen titles
  h2: 24,       // Section headers
  h3: 20,       // Card titles
  h4: 18,       // Subsection titles
  
  // Body
  body: 16,     // Default body text
  bodySmall: 14,// Secondary body text
  
  // UI Elements
  button: 16,   // Button labels
  buttonSmall: 14,
  label: 14,    // Form labels
  caption: 12,  // Captions, hints
  micro: 10,    // Tab labels, badges
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const lineHeight = {
  tight: 1.25,    // Headings
  normal: 1.5,    // Body text
  relaxed: 1.75,  // Long-form content
};

export const letterSpacing = {
  tight: -0.4,    // Headings
  normal: 0,      // Body
  wide: 0.4,      // Buttons, labels
  widest: 1.6,    // All caps
};

// Pre-composed text styles
export const textStyles = {
  // Headings (Serif)
  h1: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.h1,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.h1 * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    color: colors.text.primary,
  },
  h2: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.h2,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.h2 * lineHeight.tight,
    color: colors.text.primary,
  },
  h3: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.h3 * lineHeight.tight,
    color: colors.text.primary,
  },
  h4: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.h4,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.h4 * lineHeight.tight,
    color: colors.text.primary,
  },
  
  // Body (Sans-serif)
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.body * lineHeight.normal,
    color: colors.text.secondary,
  },
  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.bodySmall * lineHeight.normal,
    color: colors.text.secondary,
  },
  
  // UI Elements
  button: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.button,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.wide,
  },
  buttonSmall: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.buttonSmall,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.wide,
  },
  label: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.label,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    color: colors.text.muted,
  },
  tabLabel: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.micro,
    fontWeight: fontWeight.medium,
  },
};
```

### 6.3 SPACING SYSTEM

```typescript
// src/theme/spacing.ts

// Base unit: 4px
export const spacing = {
  0: 0,
  0.5: 2,    // 2px
  1: 4,      // 4px
  1.5: 6,    // 6px
  2: 8,      // 8px
  2.5: 10,   // 10px
  3: 12,     // 12px
  3.5: 14,   // 14px
  4: 16,     // 16px - base unit
  5: 20,     // 20px
  6: 24,     // 24px
  7: 28,     // 28px
  8: 32,     // 32px
  9: 36,     // 36px
  10: 40,    // 40px
  11: 44,    // 44px - touch target
  12: 48,    // 48px
  14: 56,    // 56px
  16: 64,    // 64px
  20: 80,    // 80px
  24: 96,    // 96px
};

// Semantic spacing
export const layout = {
  // Screen-level
  screenPaddingX: spacing[4],      // 16px horizontal padding
  screenPaddingY: spacing[6],      // 24px vertical padding
  sectionGap: spacing[8],          // 32px between sections
  
  // Cards
  cardPadding: spacing[5],         // 20px internal padding
  cardGap: spacing[4],             // 16px between cards
  cardRadius: spacing[6],          // 24px border radius
  
  // Components
  inputHeight: spacing[12],        // 48px
  buttonHeight: spacing[11],       // 44px (touch target)
  buttonHeightSmall: spacing[9],   // 36px
  
  // Icons
  iconSmall: spacing[4],           // 16px
  iconMedium: spacing[5],          // 20px
  iconLarge: spacing[6],           // 24px
  
  // Touch targets
  minTouchTarget: spacing[11],     // 44px minimum
  
  // Navigation
  bottomNavHeight: spacing[20],    // 80px
  tabBarHeight: spacing[14],       // 56px
  headerHeight: spacing[14],       // 56px
};
```

### 6.4 BORDER RADIUS

```typescript
// src/theme/borderRadius.ts

export const borderRadius = {
  none: 0,
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Semantic aliases
export const radius = {
  // Buttons
  button: borderRadius.xl,           // 20px
  buttonSmall: borderRadius.lg,      // 16px
  buttonPill: borderRadius.full,     // Fully rounded
  
  // Cards
  card: borderRadius['2xl'],         // 24px
  cardLarge: borderRadius['3xl'],    // 32px
  
  // Inputs
  input: borderRadius.lg,            // 16px
  
  // Badges
  badge: borderRadius.full,          // Pill shape
  
  // Avatars
  avatar: borderRadius.full,         // Circle
  
  // Modals
  modal: borderRadius['3xl'],        // 32px
  bottomSheet: borderRadius['3xl'],  // 32px (top only)
};
```

### 6.5 SHADOWS

```typescript
// src/theme/shadows.ts

// iOS Shadows
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  
  sm: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,  // Android
  },
  
  DEFAULT: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  
  // Brand shadow - gold glow
  gold: {
    shadowColor: '#C9A871',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
};
```

### 6.6 GRADIENTS

```typescript
// src/theme/gradients.ts

export const gradients = {
  // Primary gold gradient (buttons, headers)
  gold: {
    colors: ['#C9A871', '#B8975F'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  // Light gold (subtle backgrounds)
  goldLight: {
    colors: ['#D4B88A', '#C9A871'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  
  // VIP special gradient
  vip: {
    colors: ['#D4B88A', '#C9A871', '#B8975F'],
    locations: [0, 0.5, 1],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  // Hero overlay
  heroOverlay: {
    colors: ['rgba(44, 44, 44, 0.9)', 'rgba(44, 44, 44, 0.6)'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
};
```

---

## 7. SHARED VS ROLE-SPECIFIC COMPONENTS

### 7.1 COMPONENT MATRIX

| Component | Client | Manager | Admin | Notes |
|-----------|:------:|:-------:|:-----:|-------|
| **AppointmentCard** | ✓ | ✓ | ✓ | Same component, different data |
| **AppointmentDetails** | ✓ | ✓ | ✓ | Actions differ by role |
| **StatsCard** | ✗ | ✓ | ✓ | Different metrics |
| **CalendarView** | ✓ | ✓ | ✓ | Same component |
| **ClientCard** | ✗ | ✓ | ✓ | Same component |
| **ServiceCard** | ✓ | ✗ | ✗ | Client booking only |
| **ArtistCard** | ✓ | ✗ | ✓ | Different contexts |
| **VIPStatusCard** | ✓ | ✗ | ✗ | Client dashboard only |
| **NotificationBadge** | ✗ | ✓ | ✓ | Same component |
| **MessageThread** | ✗ | ✓ | ✓ | Same component |

### 7.2 SHARED COMPONENTS DIRECTORY

```
src/components/
├── common/                    # Shared across all roles
│   ├── AppointmentCard.tsx    # Displays appointment info
│   ├── AppointmentDetails.tsx # Full appointment view
│   ├── CalendarView.tsx       # Calendar component
│   ├── ClientCard.tsx         # Client info display
│   ├── StatsCard.tsx          # KPI display card
│   ├── NotificationBadge.tsx  # Badge counter
│   ├── MessageThread.tsx      # Chat thread
│   ├── Avatar.tsx             # User avatar
│   ├── EmptyState.tsx         # No data message
│   └── LoadingState.tsx       # Loading spinner
│
├── ui/                        # Primitive UI components
│   ├── Button.tsx             # All button variants
│   ├── Card.tsx               # Card container
│   ├── Input.tsx              # Text input
│   ├── Badge.tsx              # Status badges
│   ├── Modal.tsx              # Modal wrapper
│   ├── BottomSheet.tsx        # Bottom sheet
│   └── TabBar.tsx             # Tab navigation
│
└── layout/                    # Layout components
    ├── ScreenHeader.tsx       # Screen title + actions
    ├── SafeAreaWrapper.tsx    # Safe area handling
    └── KeyboardAware.tsx      # Keyboard avoidance
```

### 7.3 ROLE-SPECIFIC COMPONENTS

```
src/features/
├── client/
│   ├── home/
│   │   └── components/
│   │       ├── HomeScreen.tsx
│   │       ├── HeroSection.tsx          # Client-only
│   │       ├── QuickActions.tsx         # Client-only
│   │       └── UpcomingAppointment.tsx  # Client-only
│   ├── booking/
│   │   └── components/
│   │       ├── ServiceSelection.tsx     # Client-only
│   │       ├── ArtistSelection.tsx      # Client-only
│   │       ├── TimeSelection.tsx        # Client-only
│   │       └── BookingReview.tsx        # Client-only
│   └── vip/
│       └── components/
│           ├── VIPDashboard.tsx         # Client-only
│           ├── VIPProgressCard.tsx      # Client-only
│           └── BenefitCard.tsx          # Client-only
│
├── manager/
│   ├── dashboard/
│   │   └── components/
│   │       ├── DashboardScreen.tsx
│   │       ├── TodaySchedule.tsx        # Manager-only
│   │       ├── PendingRequests.tsx      # Manager-only
│   │       └── WeeklyStats.tsx          # Shared w/ Admin
│   ├── calendar/
│   │   └── components/
│   │       ├── CalendarScreen.tsx
│   │       ├── DayView.tsx              # Shared w/ Admin
│   │       └── WeekView.tsx             # Shared w/ Admin
│   └── notes/
│       └── components/
│           ├── NotesScreen.tsx
│           ├── NotesList.tsx            # Shared w/ Admin
│           └── AddNoteModal.tsx         # Shared w/ Admin
│
└── admin/
    ├── dashboard/
    │   └── components/
    │       ├── AdminDashboard.tsx
    │       ├── KPIGrid.tsx              # Admin-only
    │       ├── ActionItems.tsx          # Admin-only
    │       └── TeamOverview.tsx         # Admin-only
    ├── analytics/
    │   └── components/
    │       ├── AnalyticsScreen.tsx
    │       ├── RevenueChart.tsx         # Admin-only
    │       ├── ServiceBreakdown.tsx     # Admin-only
    │       └── ManagerPerformance.tsx   # Admin-only
    ├── managers/
    │   └── components/
    │       ├── ManagerList.tsx
    │       ├── ManagerDetails.tsx       # Admin-only
    │       └── AddManagerModal.tsx      # Admin-only
    └── clients/
        └── components/
            ├── ClientList.tsx
            ├── ClientProfile.tsx        # Admin-only
            └── RecurringSetup.tsx       # Admin-only
```

### 7.4 COMPONENT PROPS FOR ROLE VARIATION

```typescript
// AppointmentCard adapts based on role
interface AppointmentCardProps {
  appointment: Appointment;
  role: 'client' | 'manager' | 'admin';
  onPress: () => void;
  // Role-specific actions
  onComplete?: () => void;      // Manager/Admin only
  onReschedule?: () => void;    // Client only
  onCancel?: () => void;        // Client only
  onViewNotes?: () => void;     // Manager/Admin only
}

// Usage
<AppointmentCard
  appointment={apt}
  role="manager"
  onPress={() => openDetails(apt)}
  onComplete={() => markComplete(apt.id)}
  onViewNotes={() => openNotes(apt.clientId)}
/>
```

---

## 8. NAVIGATION ARCHITECTURE

### 8.1 CLIENT NAVIGATION

```
CLIENT APP STRUCTURE
═══════════════════════════════════════════════════

Bottom Tabs (5):
├── 🏠 Home         → Home Stack
├── 📋 Services     → Services Stack  
├── 📅 Book         → Booking Stack (modal flow)
├── ⭐ VIP          → VIP Stack
└── ≡  More         → Profile Stack

Home Stack:
├── HomeScreen
├── AppointmentDetailsModal
└── RescheduleRequestModal

Services Stack:
├── ServicesListScreen
└── ServiceDetailsModal

Booking Stack (Modal):
├── ServiceSelectionScreen
├── ArtistSelectionScreen
├── TimeSelectionScreen
├── BookingReviewScreen
├── PaymentScreen
└── ConfirmationModal

VIP Stack:
├── VIPDashboardScreen
└── BenefitDetailsModal

Profile Stack:
├── ProfileScreen
├── EditProfileScreen
├── BookingHistoryScreen
├── PaymentMethodsScreen
├── NotificationsScreen
└── AboutScreen
```

**Navigation Rules:**
- Bottom tabs always visible on main screens
- Booking flow is a full-screen modal stack
- Modals: AppointmentDetails, ServiceDetails, Confirmation
- Full screen: Booking steps, Payment, Profile edits

### 8.2 MANAGER NAVIGATION

```
MANAGER APP STRUCTURE
═══════════════════════════════════════════════════

Bottom Tabs (4):
├── 🏠 Home         → Dashboard Stack
├── 📅 Calendar     → Calendar Stack
├── 💬 Messages     → Messages Stack
└── 📝 Notes        → Notes Stack

Dashboard Stack:
├── DashboardScreen
├── AppointmentDetailsModal
├── CompleteAppointmentModal
└── PendingRequestsScreen

Calendar Stack:
├── CalendarScreen
├── DayViewScreen
└── AppointmentDetailsModal

Messages Stack:
├── ConversationsListScreen
└── ConversationScreen

Notes Stack:
├── NotesListScreen
├── ClientNotesScreen
└── AddNoteModal

Profile (Top Right Icon):
├── ProfileScreen
├── TimeOffRequestScreen
└── SettingsScreen
```

**Navigation Rules:**
- Bottom tabs: 4 items (no More menu)
- Profile accessed via header icon
- Appointment details always modal
- Add note is a modal sheet

### 8.3 ADMIN NAVIGATION

```
ADMIN APP STRUCTURE
═══════════════════════════════════════════════════

Bottom Tabs (4):
├── 🏠 Home         → Dashboard Stack
├── 📊 Analytics    → Analytics Stack
├── 👥 Managers     → Managers Stack
└── 🗂  Clients     → Clients Stack

Dashboard Stack:
├── AdminDashboardScreen
├── PendingRequestsScreen
├── RefillRemindersScreen
└── AppointmentDetailsModal

Analytics Stack:
├── AnalyticsScreen
├── RevenueDetailScreen
├── ServiceBreakdownScreen
└── ExportReportModal

Managers Stack:
├── ManagerListScreen
├── ManagerDetailsScreen
├── ManagerScheduleScreen
└── AddManagerModal

Clients Stack:
├── ClientListScreen
├── ClientProfileScreen
├── ClientHistoryScreen
├── RecurringSetupModal
└── ClientNotesScreen

Settings (Top Right Icon):
├── SettingsScreen
├── VIPManagementScreen
├── NotificationsScreen
└── BusinessInfoScreen
```

**Navigation Rules:**
- Bottom tabs: 4 items
- Settings via header icon
- All "add" actions are modals
- Client profile is full screen

### 8.4 MODAL VS FULL SCREEN DECISION

| Screen Type | Navigation | Reason |
|-------------|------------|--------|
| Appointment Details | Modal | Quick view, dismiss easily |
| Booking Flow | Full Screen | Multi-step, focused task |
| Add Note | Bottom Sheet | Quick action |
| Client Profile | Full Screen | Rich content, multiple actions |
| Confirmation | Modal | Acknowledgment only |
| Settings | Full Screen | Navigation to sub-screens |
| Time/Date Picker | Bottom Sheet | Quick selection |
| Filter/Sort | Bottom Sheet | Temporary selection |

---

## 9. TECHNICAL CONSTRAINTS

### 9.1 PLATFORM RULES

| Rule | Requirement |
|------|-------------|
| **Target** | iOS 14+ and Android 10+ |
| **Framework** | React Native 0.73+ with Expo SDK 50+ |
| **Layout** | Mobile-first only. No desktop/tablet optimizations |
| **Touch Targets** | Minimum 44x44px for all interactive elements |
| **Safe Areas** | Respect notch, home indicator, and status bar |
| **Orientation** | Portrait only (no landscape) |

### 9.2 FORBIDDEN PATTERNS

| ❌ Do NOT | Why |
|-----------|-----|
| Hover states | Not available on mobile |
| Multi-column layouts | Not mobile-appropriate |
| Tooltips on tap | Confusing UX |
| Small touch targets | Accessibility violation |
| Fixed position elements (except nav) | Keyboard issues |
| Horizontal scrolling lists | Hidden content |
| Custom gestures without fallback | Discoverability |

### 9.3 REQUIRED PATTERNS

| ✓ MUST | Implementation |
|--------|----------------|
| Pull-to-refresh | All list screens |
| Skeleton loading | All data-fetching screens |
| Empty states | All lists |
| Error states | All API calls |
| Offline indication | Network-dependent features |
| Haptic feedback | Destructive actions, success states |
| Keyboard avoidance | All form screens |

### 9.4 PERFORMANCE REQUIREMENTS

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 2s |
| Time to Interactive | < 3s |
| List scroll FPS | 60fps |
| Screen transition | < 300ms |
| Image load | < 1s (with skeleton) |

---

## 10. COMPONENT SPECIFICATIONS

### 10.1 BUTTON COMPONENT

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onPress: () => void;
  children: React.ReactNode;
}

// Dimensions
const buttonSizes = {
  sm: { height: 36, paddingX: 12, fontSize: 14 },
  md: { height: 44, paddingX: 16, fontSize: 16 },
  lg: { height: 52, paddingX: 20, fontSize: 18 },
};

// Visual states
// Primary: Gold gradient background, white text
// Secondary: Beige background, charcoal text
// Outline: Transparent, gold border, gold text
// Ghost: Transparent, no border, gold text
// Destructive: Red background, white text
```

### 10.2 CARD COMPONENT

```typescript
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined' | 'luxury';
  padding?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  children: React.ReactNode;
}

// Variants
// default: background.secondary, no shadow, radius.card
// elevated: background.DEFAULT, shadow.md, radius.card
// outlined: transparent, border, radius.card
// luxury: gradient background (goldSubtle), shadow.gold
```

### 10.3 INPUT COMPONENT

```typescript
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
}

// Dimensions
// Height: 48px (single line), auto (multiline)
// Padding: 16px horizontal
// Border radius: 16px
// Font size: 16px (prevent zoom on iOS)

// States
// Default: border.DEFAULT
// Focused: border.strong, ring (gold subtle)
// Error: status.error border
// Disabled: 50% opacity
```

### 10.4 MODAL COMPONENT

```typescript
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

// Appearance
// Background overlay: overlay.dark
// Modal background: background.DEFAULT
// Border radius: radius.modal (32px) - top corners for bottom sheet
// Max height: 90% of screen
// Animation: slide from bottom (300ms)
```

### 10.5 APPOINTMENT CARD COMPONENT

```typescript
interface AppointmentCardProps {
  appointment: {
    id: string;
    service: { name: string; duration: number };
    client?: { name: string; avatar?: string; isVIP?: boolean };
    manager?: { name: string; avatar?: string };
    datetime: Date;
    status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  };
  role: 'client' | 'manager' | 'admin';
  variant: 'compact' | 'detailed';
  onPress: () => void;
  actions?: Array<{
    label: string;
    onPress: () => void;
    variant: 'primary' | 'secondary' | 'destructive';
  }>;
}

// Layout (compact)
// Height: auto (content-based)
// Padding: layout.cardPadding
// Shows: time, service name, person name (client or manager)

// Layout (detailed)
// Shows: date, time, service, person, status badge, VIP indicator
// Actions: up to 2 action buttons
```

---

## 11. DATA MODELS

### 11.1 USER MODEL

```typescript
interface User {
  id: string;
  email: string;
  phone: string;
  role: 'client' | 'manager' | 'admin';
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface ClientProfile extends User {
  role: 'client';
  vipStatus: {
    tier: 'none' | 'silver' | 'gold' | 'platinum';
    streak: number;
    points: number;
    memberSince?: Date;
  };
  preferences: {
    preferredManager?: string;
    allergies?: string[];
    notes?: string;
  };
  stats: {
    totalAppointments: number;
    totalSpent: number;
    lastVisit?: Date;
  };
}

interface ManagerProfile extends User {
  role: 'manager';
  title: string;
  bio?: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  schedule: {
    workingDays: number[]; // 0-6, Sunday = 0
    workingHours: { start: string; end: string };
  };
}
```

### 11.2 APPOINTMENT MODEL

```typescript
interface Appointment {
  id: string;
  clientId: string;
  managerId: string;
  serviceId: string;
  
  // Denormalized for display
  client: { name: string; avatar?: string; isVIP: boolean };
  manager: { name: string; avatar?: string };
  service: { name: string; duration: number; price: number };
  
  datetime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  
  // Payment
  payment: {
    amount: number;
    depositPaid: number;
    method?: 'card' | 'afterpay' | 'cash';
    status: 'pending' | 'partial' | 'paid' | 'refunded';
  };
  
  // Notes
  notes?: {
    client?: string;  // Client-visible notes
    internal?: string; // Staff-only notes
  };
  
  createdAt: Date;
  updatedAt: Date;
}
```

### 11.3 SERVICE MODEL

```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  category: 'lashes' | 'brows' | 'makeup' | 'courses' | 'packages';
  
  pricing: {
    price: number;
    depositRequired: number;
    afterpayAvailable: boolean;
  };
  
  timing: {
    duration: number; // minutes
    bufferAfter: number; // minutes between appointments
  };
  
  image?: string;
  isActive: boolean;
  displayOrder: number;
}
```

---

## 12. API CONTRACTS

### 12.1 AUTHENTICATION

```typescript
// POST /auth/login
interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// POST /auth/register
interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

// POST /auth/logout
// No body required, uses token

// POST /auth/refresh
interface RefreshRequest {
  refreshToken: string;
}
```

### 12.2 APPOINTMENTS

```typescript
// GET /appointments
interface GetAppointmentsParams {
  startDate?: string; // ISO date
  endDate?: string;
  status?: AppointmentStatus;
  managerId?: string; // For admin filtering
}
interface GetAppointmentsResponse {
  appointments: Appointment[];
  pagination: { page: number; total: number; hasMore: boolean };
}

// POST /appointments
interface CreateAppointmentRequest {
  serviceId: string;
  managerId: string;
  datetime: string; // ISO datetime
  notes?: string;
}

// PATCH /appointments/:id
interface UpdateAppointmentRequest {
  status?: AppointmentStatus;
  notes?: string;
}

// POST /appointments/:id/reschedule
interface RescheduleRequest {
  newDatetime: string;
  reason?: string;
}

// POST /appointments/:id/cancel
interface CancelRequest {
  reason?: string;
}
```

### 12.3 SERVICES

```typescript
// GET /services
interface GetServicesParams {
  category?: ServiceCategory;
  active?: boolean;
}
interface GetServicesResponse {
  services: Service[];
}

// GET /services/:id/availability
interface GetAvailabilityParams {
  managerId?: string;
  date: string; // YYYY-MM-DD
}
interface GetAvailabilityResponse {
  slots: Array<{
    time: string; // HH:mm
    available: boolean;
    managerId: string;
  }>;
}
```

### 12.4 CLIENT NOTES (Manager/Admin)

```typescript
// GET /clients/:id/notes
interface GetNotesResponse {
  notes: Array<{
    id: string;
    content: string;
    type: 'general' | 'allergy' | 'preference' | 'aftercare';
    createdBy: { id: string; name: string };
    createdAt: Date;
    images?: string[];
  }>;
}

// POST /clients/:id/notes
interface CreateNoteRequest {
  content: string;
  type: 'general' | 'allergy' | 'preference' | 'aftercare';
  images?: string[]; // Base64 or URLs
}
```

---

## APPENDIX A: CHECKLIST FOR DEVELOPMENT

### Pre-Development
- [ ] Design tokens imported into project
- [ ] Shared components scaffolded
- [ ] Navigation structure set up
- [ ] API service layer created
- [ ] Authentication flow working

### Per-Screen Checklist
- [ ] Screen renders correctly
- [ ] Loading state implemented
- [ ] Empty state implemented
- [ ] Error state implemented
- [ ] Pull-to-refresh (if list)
- [ ] Safe areas respected
- [ ] Touch targets >= 44px
- [ ] Keyboard avoidance (if form)
- [ ] Accessibility labels added

### Pre-Release
- [ ] All 3 roles can login
- [ ] All flows complete without dead ends
- [ ] No console errors/warnings
- [ ] Performance targets met
- [ ] Tested on iOS and Android
- [ ] Tested on various screen sizes

---

## APPENDIX B: SCREEN REFERENCE QUICK GUIDE

| Role | Tab 1 | Tab 2 | Tab 3 | Tab 4 | Tab 5 |
|------|-------|-------|-------|-------|-------|
| **Client** | Home | Services | Book | VIP | More |
| **Manager** | Dashboard | Calendar | Messages | Notes | — |
| **Admin** | Dashboard | Analytics | Managers | Clients | — |

---

## DOCUMENT END

**Prepared for:** Development Team  
**Prepared by:** Product Design  
**Approval Status:** Ready for Development  
**Next Review:** After MVP Sprint

---

*This document is the source of truth for all UI/UX decisions. Any deviations must be approved by Product Design.*
