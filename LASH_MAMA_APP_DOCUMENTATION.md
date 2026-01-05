# Lash Mama - Luxury Beauty Booking Application

## Complete Technical & Design Documentation

**Version:** 1.0  
**Last Updated:** January 2025  
**Platform:** React + Vite + TypeScript + Tailwind CSS

---

## Table of Contents

1. [Executive Overview](#1-executive-overview)
2. [Brand Identity & Design Philosophy](#2-brand-identity--design-philosophy)
3. [Color Palette & Design Tokens](#3-color-palette--design-tokens)
4. [Typography System](#4-typography-system)
5. [Spacing, Layout & Responsive Design](#5-spacing-layout--responsive-design)
6. [User Roles & Permissions](#6-user-roles--permissions)
7. [Application Architecture](#7-application-architecture)
8. [Public Pages & User-Facing Features](#8-public-pages--user-facing-features)
9. [Admin Dashboard (Lash Mama Portal)](#9-admin-dashboard-lash-mama-portal)
10. [Manager Dashboard](#10-manager-dashboard)
11. [Staff Dashboard](#11-staff-dashboard)
12. [VIP Program & Client Features](#12-vip-program--client-features)
13. [Booking System](#13-booking-system)
14. [Services & Pricing](#14-services--pricing)
15. [Staff Management](#15-staff-management)
16. [Course System](#16-course-system)
17. [Notification & Reminder System](#17-notification--reminder-system)
18. [Chat & Messaging System](#18-chat--messaging-system)
19. [Component Library](#19-component-library)
20. [Animations & Micro-interactions](#20-animations--micro-interactions)
21. [Mobile-First Responsive Guidelines](#21-mobile-first-responsive-guidelines)
22. [File Structure](#22-file-structure)
23. [Future Enhancements](#23-future-enhancements)

---

## 1. Executive Overview

### About Lash Mama

Lash Mama is a **premium luxury beauty booking application** designed for a high-end lash and beauty salon. The app provides a seamless booking experience for clients while offering powerful management tools for the business owner (Lash Mama), managers, and staff.

### Core Philosophy

- **"Quiet Luxury"** - Elegant, sophisticated design that feels like a high-end beauty boutique
- **Mobile-First** - Fully responsive across all devices with touch-optimized interfaces
- **Role-Based Access** - Different experiences for guests, clients, VIPs, staff, managers, and admin
- **Seamless UX** - Intuitive booking flow with minimal friction

### Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Role System** | Guest, Regular, VIP, Staff, Manager, Admin (Lash Mama) |
| **Smart Booking** | 4-step booking flow with deposit requirements |
| **VIP Program** | Automatic VIP status after 10 consecutive bookings |
| **Recurring Bookings** | Weekly, bi-weekly, monthly appointment scheduling |
| **Course Management** | Professional lash and makeup courses with group enrollment |
| **Real-time Chat** | In-app messaging between staff and clients |
| **Refill Reminders** | Automated notifications at 1.5 weeks post-appointment |
| **Admin-Only Features** | Deposit-free booking, recurring scheduling, full analytics |

---

## 2. Brand Identity & Design Philosophy

### Design Principles

1. **Generous White Space** - Breathing room creates luxury
2. **Golden Accents** - Signature gold color for premium feel
3. **Soft Transitions** - Smooth, elegant animations
4. **Clear Typography Hierarchy** - Easy scanning and reading
5. **Subtle Depth** - Soft shadows and layered cards

### Visual Language

| Element | Treatment |
|---------|-----------|
| Cards | Soft shadows, 16px border-radius, gradient backgrounds |
| Buttons | 12px border-radius, luxury gold gradients |
| Icons | Lucide React, consistent 24px sizing, gold/muted colors |
| Images | Rounded corners, soft shadows, gradient overlays |
| Backgrounds | Subtle gradients from cream to beige |

### Tone & Voice

- **Warm** - Welcoming and personal
- **Professional** - Confident expertise
- **Luxurious** - Premium without being pretentious
- **Feminine** - Elegant beauty aesthetic

---

## 3. Color Palette & Design Tokens

### Primary Palette (Light Mode)

```css
/* Core Colors */
--background: 45 33% 99%;          /* #FFFCF7 - Off-white background */
--foreground: 0 0% 17%;            /* #2C2C2C - Deep charcoal text */

/* Brand Colors */
--primary: 37 42% 62%;             /* #C9A871 - Signature Gold */
--primary-foreground: 0 0% 100%;   /* White text on gold */

/* Secondary & Accent */
--secondary: 40 20% 96%;           /* Cream */
--accent: 40 25% 94%;              /* Light accent */
--muted: 40 15% 92%;               /* Muted backgrounds */
--muted-foreground: 0 0% 45%;      /* Muted text */
```

### Extended Palette

```css
/* Custom Named Colors */
--beige: 40 25% 94%;               /* #F5F1E8 - Primary beige */
--cream: 45 33% 97%;               /* #FAF7F2 - Secondary cream */
--gold: 37 42% 62%;                /* #C9A871 - Accent gold */
--gold-light: 37 48% 72%;          /* Lighter gold variant */
--gold-dark: 37 45% 52%;           /* Darker gold variant */
--charcoal: 0 0% 17%;              /* #2C2C2C - Deep charcoal */

/* Semantic Colors */
--success: 100 20% 70%;            /* #B8C5B0 - Success green */
--destructive: 0 84% 60%;          /* Error red */
```

### Gradient Library

```css
/* Premium Gradients */
--gradient-hero: linear-gradient(180deg, #FAF7F2 0%, #F5F1E8 100%);
--gradient-gold: linear-gradient(135deg, #C9A871 0%, #D4B896 50%, #C9A871 100%);
--gradient-gold-shimmer: linear-gradient(135deg, #D4B896 0%, #C9A871 50%, #B89860 100%);
--gradient-card: linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%);
--gradient-charcoal: linear-gradient(180deg, #2C2C2C 0%, #3D3D3D 100%);
```

### Shadow System

```css
/* Shadow Library */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.04);
--shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.08);
--shadow-gold: 0 8px 30px rgba(201, 168, 113, 0.15);
--shadow-luxury: 0 20px 40px rgba(0, 0, 0, 0.08);
```

---

## 4. Typography System

### Font Families

| Type | Font | Usage |
|------|------|-------|
| **Headings** | Cormorant Garamond | All h1-h6, display text, prices |
| **Body** | Inter | Paragraphs, UI elements, buttons |

### Type Scale

```css
/* Heading Sizes */
h1: text-4xl (2.25rem) → md:text-5xl (3rem) → lg:text-6xl (3.75rem)
h2: text-2xl (1.5rem) → md:text-3xl (1.875rem) → lg:text-4xl (2.25rem)
h3: text-lg (1.125rem) → md:text-xl (1.25rem)
h4: text-base (1rem) → md:text-lg (1.125rem)

/* Body Sizes */
body-lg: text-lg (1.125rem)
body: text-base (1rem)
body-sm: text-sm (0.875rem)
caption: text-xs (0.75rem)
micro: text-[10px]
```

### Font Weights

| Weight | Usage |
|--------|-------|
| 400 (Regular) | Body text, descriptions |
| 500 (Medium) | Labels, navigation |
| 600 (Semibold) | Headings, emphasis |
| 700 (Bold) | Strong emphasis, buttons |

### Text Styling Classes

```css
.text-gradient-gold {
  background: linear-gradient(135deg, #D4B896 0%, #C9A871 50%, #B89860 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.font-serif { font-family: 'Cormorant Garamond', serif; }
.font-sans { font-family: 'Inter', sans-serif; }
```

---

## 5. Spacing, Layout & Responsive Design

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 0.25rem (4px) | Micro spacing |
| 2 | 0.5rem (8px) | Tight spacing |
| 3 | 0.75rem (12px) | Default gap |
| 4 | 1rem (16px) | Standard spacing |
| 6 | 1.5rem (24px) | Section padding |
| 8 | 2rem (32px) | Card padding |
| 12 | 3rem (48px) | Large sections |
| 16 | 4rem (64px) | Hero sections |
| 24 | 6rem (96px) | Major sections |

### Border Radius

| Element | Radius |
|---------|--------|
| Cards | 16px (rounded-2xl) |
| Buttons | 12px (rounded-xl) |
| Inputs | 8px (rounded-lg) |
| Badges | Full (rounded-full) |
| Avatars | Full (rounded-full) |

### Container Widths

```css
/* Max widths */
.container { max-width: 1400px; }
.max-w-7xl { max-width: 80rem; }   /* Main content */
.max-w-6xl { max-width: 72rem; }   /* Standard pages */
.max-w-5xl { max-width: 64rem; }   /* Staff dashboard */
.max-w-4xl { max-width: 56rem; }   /* Booking flow */
.max-w-lg { max-width: 32rem; }    /* Forms, dialogs */
```

### Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

---

## 6. User Roles & Permissions

### Role Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                        ADMIN (Lash Mama)                    │
│  ★ PREMIUM EXCLUSIVE FEATURES ★                             │
│  • Book clients WITHOUT deposit                             │
│  • Create recurring bookings (6mo, 12mo, indefinite)        │
│  • Full revenue analytics                                   │
│  • Approve/decline reschedule requests (with reason)        │
│  • Approve/decline staff time-off requests                  │
│  • Manage all staff permissions                             │
│  • Access course management                                 │
│  • View all client data                                     │
│  • Profile customization with special features              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         MANAGER                             │
│  • View calendar & bookings                                 │
│  • Manage staff schedules                                   │
│  • Access client database                                   │
│  • Aftercare notes & forms                                  │
│  • Allergy/health form management                           │
│  • VIP member management                                    │
│  • Client messaging                                         │
│  • View amount due (NO revenue analytics)                   │
│  • Export aftercare as PDF/image                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                          STAFF                              │
│  • View own calendar only                                   │
│  • Personal notes & reminders                               │
│  • Client messaging for own clients                         │
│  • 30-minute appointment reminders                          │
│  • Select available times (no confirmation needed)          │
│  • Request time off (requires Lash Mama approval)           │
│  • Cannot see other staff schedules                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       VIP CLIENT                            │
│  • All regular client features                              │
│  • $10 off every refill                                     │
│  • $20 off birthday refills                                 │
│  • $30 off full sets                                        │
│  • $400 off all lash courses                                │
│  • $100 gift pack at year end                               │
│  • Priority booking                                         │
│  • VIP badge display                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     REGULAR CLIENT                          │
│  • Browse services                                          │
│  • Book appointments (deposit required)                     │
│  • View booking history                                     │
│  • Personal notes                                           │
│  • VIP progress tracking                                    │
│  • Course enrollment                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                          GUEST                              │
│  • View services & pricing                                  │
│  • View courses                                             │
│  • Cannot book without registration                         │
│  • VIP program preview                                      │
└─────────────────────────────────────────────────────────────┘
```

### Role Switching

The app includes a **UserRoleSwitcher** component for development/demo purposes:

- Located in the header
- Displays current role with avatar and description
- Dropdown menu to switch between all roles
- Automatically navigates to role-appropriate dashboard

---

## 7. Application Architecture

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18.3 |
| **Build Tool** | Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Routing** | React Router DOM v6 |
| **State** | React Context + useState |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Toasts** | Sonner |
| **Icons** | Lucide React |
| **Date Handling** | date-fns |

### Route Structure

```
/                    → Home page (Index.tsx)
/book                → Booking flow (Book.tsx)
/services            → Service catalog (Services.tsx)
/vip                 → VIP program page (VIP.tsx)
/about               → About page (About.tsx)
/courses             → Course enrollment (Courses.tsx)
/admin               → Lash Mama dashboard (AdminDashboard.tsx)
/manager             → Manager dashboard (ManagerDashboard.tsx)
/staff               → Staff dashboard (StaffDashboard.tsx)
```

### Context Providers

```tsx
// UserRoleContext - Global role management
<UserRoleProvider>
  <App />
</UserRoleProvider>
```

---

## 8. Public Pages & User-Facing Features

### 8.1 Home Page (Index.tsx)

**Route:** `/`

**Components:**
- `Hero` - Full-width hero section with salon imagery
- `NavigationButtons` - Quick access to main sections
- `VIPProgressBanner` - Shows booking progress toward VIP status
- `WaitingList` - Signup for high-demand services
- `ShopPreview` - Product showcase
- `Testimonials` - Client reviews carousel
- `BookingCTA` - Call-to-action to book

**Layout:**
```
┌────────────────────────────────────────────────┐
│  Header (fixed)                                │
├────────────────────────────────────────────────┤
│  Hero Section                                  │
│  [Background image with overlay]               │
│  "Beautiful Lashes, Effortlessly Yours"        │
│  [Book Now CTA]                                │
├────────────────────────────────────────────────┤
│  Navigation Buttons                            │
│  [Services] [Book] [VIP] [About]               │
├────────────────────────────────────────────────┤
│  VIP Progress Banner (if non-VIP)              │
│  "7/10 bookings to VIP status"                 │
├────────────────────────────────────────────────┤
│  Waiting List                                  │
├────────────────────────────────────────────────┤
│  Shop Preview                                  │
├────────────────────────────────────────────────┤
│  Testimonials                                  │
├────────────────────────────────────────────────┤
│  Booking CTA                                   │
├────────────────────────────────────────────────┤
│  Footer                                        │
└────────────────────────────────────────────────┘
```

**Mobile Adaptations:**
- Hero image stacks vertically
- Navigation buttons become 2x2 grid
- VIP progress uses smaller text

---

### 8.2 Booking Page (Book.tsx)

**Route:** `/book`

**4-Step Booking Flow:**

```
Step 1: Select Service    →  Step 2: Choose Artist  →  Step 3: Date & Time  →  Step 4: Confirm
    [●─────────────────────────●─────────────────────────●─────────────────────────●]
```

#### Step 1: Service Selection

- Accordion-based service categories
- Each service shows: name, description, duration, price
- Mini refills available for weekly appointments
- VIP recurring toggle option

**Service Categories:**
- Mega Volume (Full Set, Refills, Mini Refills)
- Volume Lashes (Full Set, Refills, Mini Refills)
- Natural/Hybrid (Full Set, Refills, Mini Refills)
- Makeup (Application)
- Hair Styling (Updo, Curls)
- Bridal (Makeup, Hair, Trials)
- Packages (Combo services)
- Courses

#### Step 2: Artist Selection

- Staff cards with tier badges (Premium, Senior, Junior)
- Price multipliers based on experience:
  - **Lash Mama (Premium):** +25%
  - **Senior Artists:** Standard rate
  - **Junior Artists:** -15%
- Availability indicators
- Staff bios and specialties

#### Step 3: Date & Time Selection

- Calendar grid for date selection
- Sundays excluded
- Time slot grid (9:00 AM - 5:00 PM, 30-min intervals)
- Selected staff availability filtering

#### Step 4: Confirmation

**Deposit Requirement:**
- All clients MUST pay deposit to confirm booking
- Deposit percentage varies by service (20-35%)
- Only Lash Mama can skip deposits

**Cancellation Policy:**
- Cancellations 48+ hours before: Full deposit refund
- Cancellations within 48 hours: Deposit forfeited

**Display:**
- Service summary with image
- Selected artist with tier
- Date and time
- Recurring option (if selected)
- Price breakdown:
  - Service total
  - Deposit amount
  - Amount due at appointment
- Afterpay badge for payment flexibility

---

### 8.3 Services Page (Services.tsx)

**Route:** `/services`

**Layout:**
- Service category tabs
- Service cards in grid (2-3 columns on desktop)
- Each card: image, name, description, duration, price
- "Book Now" CTA on each card

---

### 8.4 VIP Page (VIP.tsx)

**Route:** `/vip`

**Guest View:**
- VIP program explanation
- Benefits preview
- Sign up CTA

**Regular Client View:**
- Current booking count
- Progress bar to VIP (10 consecutive bookings required)
- Streak counter
- Referral count
- Booking history

**VIP Member View:**
- VIP badge and status
- Active discounts list
- Booking history
- Personal notes
- VIP-exclusive features

**VIP Discount Structure:**

| Discount | Value | Description |
|----------|-------|-------------|
| Refill Discount | $10 | Every refill appointment |
| Birthday Discount | $20 | Refills in birthday month |
| Mega Volume Full | $30 | Full set discount |
| Volume Full Set | $30 | Full set discount |
| Natural/Hybrid Full | $20 | Full set discount |
| Course Discount | $400 | All lash courses |
| Year-End Gift | $100 | Annual appreciation gift |

**VIP Eligibility:**
- 10 consecutive bookings
- Maximum 3-month break between appointments
- Streak resets if gap exceeds 3 months

---

### 8.5 Courses Page (Courses.tsx)

**Route:** `/courses`

**Lash Artistry Courses (1-on-1 / Small Group):**

| Course | Duration | Students | Price |
|--------|----------|----------|-------|
| VIP Vogue | 5 Days | 1:1 Private | $5,500 |
| Platinum Lash | 4 Days | Max 4 | $3,200 |
| Silver Lash | 2 Days | Max 6 | $1,800 |

**Makeup & Hair Courses (Group Sessions):**

| Course | Price | Spots | Deposit |
|--------|-------|-------|---------|
| DIY Makeup | $450 | 7 | 50% |
| Makeup Masterclass | $2,800 | 4 | 50% |
| Hairstyling | $1,600 | 4 | 50% |

**Group Course Features:**
- Real-time spot availability
- Deposit secures seat
- Enrollment form with details
- Confirmation emails
- Visual seat indicators

---

## 9. Admin Dashboard (Lash Mama Portal)

**Route:** `/admin`

**★ PREMIUM EXCLUSIVE PORTAL ★**

The Admin Dashboard is Lash Mama's complete business command center with features **exclusive to the business owner**.

### 9.1 Dashboard Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header                                                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Hero Section                                                  │  │
│  │  "Welcome back, Lash Mama"                                     │  │
│  │  [Crown Icon] • Admin Dashboard                                │  │
│  │                                                                │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │  │
│  │  │ Today's Rev │ │ Bookings    │ │ VIP Members │               │  │
│  │  │ $2,840      │ │ 14          │ │ 52          │               │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘               │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Mobile: Always-expanded navigation grid                             │
│  ┌──────┬──────┬──────┬──────┬──────┬──────┐                        │
│  │Dash  │Cal   │Recur │Staff │Alert │Client│                        │
│  ├──────┼──────┼──────┼──────┼──────┼──────┤                        │
│  │VIP   │Course│Refill│Analyt│Chat  │Profil│                        │
│  ├──────┼──────┴──────┴──────┴──────┴──────┤                        │
│  │Setti │                                   │                        │
│  └──────┴───────────────────────────────────┘                        │
│                                                                      │
│  ┌────────────┐ ┌─────────────────────────────────────────────────┐  │
│  │ Desktop    │ │ Content Area                                    │  │
│  │ Sidebar    │ │                                                 │  │
│  │            │ │ [Dynamic content based on active section]       │  │
│  │ Dashboard  │ │                                                 │  │
│  │ Calendar   │ │                                                 │  │
│  │ Recurring  │ │                                                 │  │
│  │ Staff      │ │                                                 │  │
│  │ Alerts (3) │ │                                                 │  │
│  │ Clients    │ │                                                 │  │
│  │ VIP        │ │                                                 │  │
│  │ Courses    │ │                                                 │  │
│  │ Refills    │ │                                                 │  │
│  │ Analytics  │ │                                                 │  │
│  │ Chat (5)   │ │                                                 │  │
│  │ Profile    │ │                                                 │  │
│  │ Settings   │ │                                                 │  │
│  └────────────┘ └─────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 9.2 Navigation Sections

| Section | Icon | Description |
|---------|------|-------------|
| Dashboard | BarChart3 | Overview with stats & quick actions |
| Calendar | CalendarDays | Full appointment calendar with week view |
| Recurring | Repeat | ★ EXCLUSIVE: Recurring booking management |
| Staff | UserCog | Staff management & scheduling |
| Alerts | Bell | Notifications with badge count |
| Clients | Users | Complete client database |
| VIP | Gem | VIP member management |
| Courses | GraduationCap | Course booking manager |
| Refills | Sparkles | Refill reminder management |
| Analytics | LineChart | Full revenue & performance analytics |
| Chat | MessageCircle | Client messaging with badge |
| Profile | User | ★ EXCLUSIVE: Premium profile with owner features |
| Settings | Settings | Business settings |

### 9.3 Dashboard Overview

**Quick Action Buttons:**
- **"Book Without Deposit"** - ★ EXCLUSIVE to Lash Mama
- **"Recurring Bookings"** - Quick access to recurring management

**Statistics Cards:**
- Today's Revenue (+18% trend)
- Today's Bookings (+3)
- Total Clients (+12)
- VIP Members (+4)

**Weekly Revenue Chart:**
- Bar chart showing daily revenue
- Highlighted current day
- Total with trend indicator

**Top Services Breakdown:**
- Progress bars for service popularity
- Mega Volume: 45%
- Volume Full Set: 28%
- Natural Hybrid: 15%
- Refills: 12%

**Today's Appointments:**
- Client name, service, time, artist
- Status badges (confirmed/pending)
- Quick calendar access

### 9.4 ★ Book Without Deposit (Lash Mama Only)

**Dialog Modal:**
```
┌─────────────────────────────────────────┐
│  Book Without Deposit                    │
│  ─────────────────────────────────────  │
│  Only Lash Mama can create bookings     │
│  without requiring a deposit.           │
│                                         │
│  Client Name: [________________]        │
│  Service:     [________________]        │
│                                         │
│  Date: [____]    Time: [____]           │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ No deposit required for this    │    │
│  │ booking                         │    │
│  └─────────────────────────────────┘    │
│                                         │
│       [Cancel]  [Create Booking]        │
└─────────────────────────────────────────┘
```

### 9.5 ★ Recurring Bookings (Lash Mama Only)

**AdminRecurringBooking Component**

Allows Lash Mama to schedule recurring appointments for loyal clients:

**Features:**
- Client selection
- Service selection
- Start date and end date
- Recurring frequency:
  - Weekly
  - Every 2 weeks
  - Monthly
- Duration options:
  - 6 months
  - 12 months
  - Ongoing (no end date)
- All recurring bookings skip deposit requirement

**Preview:**
- Shows all generated appointment dates
- Total appointments count
- Easy modification

### 9.6 Calendar (AdminCalendar)

**Features:**
- Month and week view toggle
- Full appointment visibility
- Click to view details
- Staff color coding
- Status indicators

### 9.7 Notifications (AdminNotifications)

**Reschedule Requests:**
- Only Lash Mama can approve/decline
- Decline requires providing a reason
- Reason sent to client

**Time-Off Requests:**
- Staff request time off through app
- Only Lash Mama approves/declines
- Decline requires reason

### 9.8 Course Booking Manager

**Features:**
- Create new course sessions
- Set available spots
- View enrollments
- Manual student addition (★ EXCLUSIVE: without deposit)
- Waitlist management

### 9.9 Refill Reminders

**Automatic Notifications:**
- Triggers at 1.5 weeks after refill appointment
- Only for refill services (not full sets)
- "Book Now" reminder message
- Client list with last appointment date

### 9.10 Analytics (AdminAnalytics)

**★ EXCLUSIVE to Lash Mama - Managers cannot access revenue data**

**Charts & Data:**
- Revenue trends (daily, weekly, monthly)
- Booking volume
- Service popularity
- Staff performance
- VIP conversion rates
- Client retention

### 9.11 ★ Premium Profile (AdminProfile)

**Lash Mama-Only Features:**
- Special "Owner" badge
- Experience statistics
- Business showcase
- Award highlights
- Certificate display
- Social media links
- Bio editor

### 9.12 Settings (AdminSettings)

**Sections:**
- Business Information
- Operating Hours
- Notification Preferences
- Deposit Settings
- Cancellation Policy
- Staff Permissions

**Mobile Optimization:**
- Horizontally scrollable tabs
- Full-width inputs
- Touch-friendly toggles

---

## 10. Manager Dashboard

**Route:** `/manager`

### 10.1 Layout

Same structure as Admin but with **restricted access**:

```
┌─────────────────────────────────────────────────────────────────┐
│  Hero: "Manager Dashboard" with Shield icon                     │
├─────────────────────────────────────────────────────────────────┤
│  Stats: Today's Bookings | Total Clients | Staff on Duty | VIP  │
│  (NO REVENUE displayed)                                         │
├─────────────────────────────────────────────────────────────────┤
│  Navigation Grid (Mobile: Always expanded)                      │
│  Dashboard | Calendar | Staff | Alerts | Clients | Aftercare    │
│  Allergies | VIP | Chat | Profile | Settings                    │
├─────────────────────────────────────────────────────────────────┤
│  Content Area                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Manager-Specific Features

**Aftercare Notes Section:**
- Create aftercare instructions for clients
- Export as PDF
- Share as image
- Client-specific notes

**Allergy & Health Forms:**
- New client allergy intake
- Health condition documentation
- Latex/adhesive reaction tracking
- Eye condition notes
- Client acknowledgment checkbox
- Export as PDF/image

### 10.3 Restrictions (vs Admin)

| Feature | Manager | Admin (Lash Mama) |
|---------|---------|-------------------|
| Book without deposit | ✗ | ✓ |
| Revenue analytics | ✗ | ✓ |
| Approve reschedules | ✗ | ✓ |
| Approve time-off | ✗ | ✓ |
| Recurring bookings | ✗ | ✓ |
| Course management | Limited | Full |

### 10.4 Appointment Display

- Shows "Amount Due" at time of service
- Does NOT show revenue totals
- Quick access to client details

---

## 11. Staff Dashboard

**Route:** `/staff`

### 11.1 Layout

Simplified interface focused on daily work:

```
┌─────────────────────────────────────────────────────────────────┐
│  Hero: "Your Schedule"                                          │
│  Stats: Today's Appointments | This Week | Completed            │
├─────────────────────────────────────────────────────────────────┤
│  Tab Navigation                                                 │
│  [My Calendar] [Client Messages] [Notes & Reminders]            │
├─────────────────────────────────────────────────────────────────┤
│  Content Area                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 11.2 My Calendar

- Personal schedule only (no other staff)
- Week view with date selection
- Appointment cards with:
  - Time
  - Client name
  - Service
  - Duration
  - Status

**Booking Confirmation:**
- Staff select available times directly
- No confirmation needed for new bookings
- Only reschedules require Lash Mama approval

### 11.3 Client Messages

**Chat Interface:**
- Conversation list (own clients only)
- Unread message badges
- Real-time messaging
- Professional, elegant design
- Audio call only (no video)

**Message Features:**
- Sparkle read indicators
- Timestamp display
- Quick replies

### 11.4 Notes & Reminders

**Personal Notes:**
- Client preferences
- Special requirements
- Private notes for self

**Reminders:**
- Custom reminder creation
- Time-based alerts
- Task tracking

### 11.5 30-Minute Appointment Reminder

**Automatic Notification:**
- Toast notification 30 minutes before appointment
- Shows client name
- Elegant gold-themed alert
- Visible in-app reminder

---

## 12. VIP Program & Client Features

### 12.1 VIP Qualification

**Requirements:**
- 10 consecutive bookings
- Maximum 3-month gap between appointments
- Streak tracking visible in profile

### 12.2 VIP Benefits

| Benefit | Value | When Applied |
|---------|-------|--------------|
| Refill Discount | $10 off | Every refill |
| Birthday Refill | $20 off | Birthday month |
| Mega Volume Full | $30 off | Full set booking |
| Volume Full Set | $30 off | Full set booking |
| Natural/Hybrid Full | $20 off | Full set booking |
| Course Discount | $400 off | Any lash course |
| Year-End Gift | $100 pack | December |

### 12.3 VIP Profile Display

- Gold crown badge
- Member since date
- Consecutive booking count
- Streak counter
- Referral count
- Active discounts
- Booking history

---

## 13. Booking System

### 13.1 Deposit Policy

**Standard Clients:**
- Deposit REQUIRED for all bookings
- Deposit percentage varies by service (20-35%)
- Paid at time of booking

**Lash Mama Only:**
- Can book clients without deposit
- Recurring bookings auto-skip deposit

### 13.2 Cancellation Policy

| Timing | Deposit Status |
|--------|----------------|
| 48+ hours before | Full refund |
| Within 48 hours | Deposit forfeited |

### 13.3 Rescheduling

**Process:**
1. Client requests reschedule
2. Notification sent to Lash Mama
3. Lash Mama reviews request
4. Approve or Decline (with reason)
5. Client notified of decision

### 13.4 Recurring Bookings

**Lash Mama Only:**
- Weekly, bi-weekly, monthly options
- 6 months, 12 months, or ongoing
- Automatic scheduling
- No deposit required

---

## 14. Services & Pricing

### 14.1 Service Categories

#### Mega Volume
| Service | Duration | Price | Deposit |
|---------|----------|-------|---------|
| Full Set | 150 min | $280 | 30% |
| Refills | 75 min | $120 | 25% |
| Mini Refills | 30 min | $55 | 20% |

#### Volume Lashes
| Service | Duration | Price | Deposit |
|---------|----------|-------|---------|
| Full Set | 120 min | $220 | 30% |
| Refills | 60 min | $85 | 25% |
| Mini Refills | 30 min | $45 | 20% |

#### Natural/Hybrid
| Service | Duration | Price | Deposit |
|---------|----------|-------|---------|
| Full Set | 105 min | $185 | 30% |
| Refills | 60 min | $75 | 25% |
| Mini Refills | 30 min | $40 | 20% |

#### Makeup
| Service | Duration | Price | Deposit |
|---------|----------|-------|---------|
| Application | 60 min | $95 | 25% |

#### Hair Styling
| Service | Duration | Price | Deposit |
|---------|----------|-------|---------|
| Updo | 60 min | $85 | 25% |
| Curls | 45 min | $65 | 25% |

#### Bridal
| Service | Duration | Price | Deposit |
|---------|----------|-------|---------|
| Bridal Makeup | 90 min | $250 | 30% |
| Bridal Hair | 90 min | $220 | 30% |
| Makeup Trial | 75 min | $150 | 25% |
| Hair Trial | 75 min | $130 | 25% |

#### Packages
| Service | Duration | Price | Deposit |
|---------|----------|-------|---------|
| Makeup + Hair | 120 min | $150 | 30% |
| Bridal Package | 180 min | $420 | 35% |

### 14.2 Mini Refills

**Purpose:** Weekly touch-up between full refills

**Availability:**
- Mega Volume Mini Refills
- Volume Mini Refills
- Natural/Hybrid Mini Refills

**Reminder System:**
- App notifies refill clients at 1.5 weeks
- "Book Now" CTA
- Not shown to full set clients

---

## 15. Staff Management

### 15.1 Staff Tiers

| Tier | Artist | Multiplier | Description |
|------|--------|------------|-------------|
| **Premium** | Lash Mama | 1.25x | Founder, 10+ years, award winner |
| **Senior** | Nikki, Beau | 1.0x | 5-6+ years experience |
| **Junior** | Natali | 0.85x | 1+ year, supervised sessions |

### 15.2 Staff Profiles

**Lash Mama (Premium)**
- Title: Founder & Master Lash Artist
- Experience: 10+ years, internationally certified
- Specialties: Award Winner, Master Certified, Signature Techniques
- Services: Mega Volume, Volume, Natural/Hybrid, Bridal

**Nikki (Senior)**
- Title: Senior Lash Artist
- Experience: 5+ years
- Specialties: Volume Specialist, Detail-Oriented
- Services: All lash types, Makeup, Hair Styling

**Beau (Senior)**
- Title: Senior Lash & Beauty Artist
- Experience: 6+ years
- Specialties: Bridal Expert, Multi-Talented
- Services: Volume, Natural/Hybrid, Makeup, Hair, Bridal, Packages

**Natali (Junior)**
- Title: Junior Lash Artist
- Experience: 1+ year, trained by Lash Mama
- Specialties: Supervised sessions, Fresh talent
- Services: Natural/Hybrid, Makeup, Hair Styling

### 15.3 CEO Profile

**Purni**
- Title: CEO & Founder
- Role: Business management (not service provider)

---

## 16. Course System

### 16.1 Professional Lash Courses

**VIP Vogue ($5,500)**
- 1:1 private training with Lash Mama
- 5 days intensive
- Advanced mega volume techniques
- Business mentorship
- Lifetime support
- Premium starter kit ($800 value)
- Certificate of Excellence

**Platinum Lash Course ($3,200)**
- Max 4 students
- 4 days training
- Classic to mega volume
- Business & marketing basics
- Hands-on practice
- Professional starter kit
- 3 months mentorship
- Platinum Certificate

**Silver Lash Course ($1,800)**
- Max 6 students
- 2 days training
- Classic lash application
- Safety & hygiene
- Client consultation skills
- Basic starter kit
- 1 month support
- Silver Certificate

### 16.2 Group Courses (Makeup & Hair)

**DIY Makeup Course ($450)**
- 7 spots per session
- One day intensive
- Personal color analysis
- Foundation & concealer
- Eye makeup mastery
- Lip & contour basics
- Take-home product guide

**Makeup Masterclass ($2,800)**
- 4 spots per session
- Professional level
- Bridal & special occasion
- Airbrush application
- Photo/video ready makeup
- Pro brush kit included

**Hairstyling Course ($1,600)**
- 4 spots per session
- Bridal up-dos
- Special occasion styling
- Romantic curls & waves
- Hair accessory styling

### 16.3 Course Enrollment Flow

**Public Courses Page:**
1. View available sessions
2. See available spots (visual indicator)
3. Fill enrollment form (name, email, phone)
4. Pay deposit (50%)
5. Seat confirmed automatically
6. Confirmation notification

**Lash Mama Portal:**
1. Create new sessions
2. Set dates, times, spots
3. Manually add students (★ without deposit)
4. View enrollments
5. Manage waitlist

---

## 17. Notification & Reminder System

### 17.1 In-App Notifications

| Type | Recipient | Trigger |
|------|-----------|---------|
| New Booking | Admin/Manager | Client books appointment |
| Reschedule Request | Admin only | Client requests change |
| Time-Off Request | Admin only | Staff requests leave |
| Refill Due | Client | 1.5 weeks after refill |
| Appointment Reminder | Staff | 30 min before appointment |
| Course Enrollment | Admin | Student enrolls |

### 17.2 Refill Reminder Logic

**Criteria:**
- Only for refill services (not full sets)
- Triggered at 10-11 days (1.5 weeks) post-appointment
- Message: "Your refills are due! Book now before you miss a spot"

**Exclusions:**
- Full set clients
- Mini refill clients (already coming weekly)

---

## 18. Chat & Messaging System

### 18.1 AdminChat Component

**Design:**
- Professional, elegant UX
- Feminine beauty-themed
- Sparkle read indicators
- Audio call only (no video)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Search: [________________________]    [Audio Call] [Settings]  │
├───────────────────────┬─────────────────────────────────────────┤
│  Conversations        │  Chat Area                              │
│  ┌─────────────────┐  │  ┌─────────────────────────────────────┐│
│  │ Sarah M.        │  │  │ Header: Name + Status              ││
│  │ "Thanks! See... │  │  ├─────────────────────────────────────┤│
│  └─────────────────┘  │  │                                     ││
│  ┌─────────────────┐  │  │ Messages                            ││
│  │ Emma L.         │  │  │                                     ││
│  │ "Can I bring... │  │  │ [Client bubble]                     ││
│  └─────────────────┘  │  │            [Your bubble with ✨ ]   ││
│                       │  │                                     ││
│                       │  ├─────────────────────────────────────┤│
│                       │  │ [Type message...     ] [Send]       ││
│                       │  └─────────────────────────────────────┘│
└───────────────────────┴─────────────────────────────────────────┘
```

**Features:**
- Conversation list with unread counts
- Message timestamps
- Read receipts with sparkles
- Mobile-optimized full-screen chat
- Audio call button (no video)

---

## 19. Component Library

### 19.1 shadcn/ui Components Used

| Component | Usage |
|-----------|-------|
| Button | CTAs, actions, navigation |
| Card | Content containers, service cards |
| Dialog | Modals, confirmations |
| Input | Form fields |
| Textarea | Multi-line input |
| Checkbox | Toggles, selections |
| Select | Dropdowns |
| Accordion | Service categories |
| Avatar | User images |
| Badge | Status, tiers |
| Calendar | Date picker |
| Tabs | Navigation tabs |
| Toast | Notifications |
| Dropdown Menu | Role switcher, options |
| Progress | VIP progress, loading |
| Scroll Area | Scrollable containers |
| Separator | Dividers |
| Sheet | Mobile navigation |

### 19.2 Custom Components

| Component | File | Purpose |
|-----------|------|---------|
| Header | layout/Header.tsx | Main navigation |
| Footer | layout/Footer.tsx | Site footer with maps |
| UserRoleSwitcher | layout/UserRoleSwitcher.tsx | Role switching |
| Hero | home/Hero.tsx | Homepage hero |
| ServiceCard | home/ServiceCard.tsx | Service display |
| VIPBadge | ui/VIPBadge.tsx | VIP status badge |
| AfterpayBadge | booking/AfterpayBadge.tsx | Payment option |
| ServiceAccordion | booking/ServiceAccordion.tsx | Service selection |
| StaffSelection | booking/StaffSelection.tsx | Artist picker |
| VIPProgressBanner | home/VIPProgressBanner.tsx | VIP progress |
| CourseEnrollmentCard | courses/CourseEnrollmentCard.tsx | Course booking |
| PremiumIcon | AdminDashboard.tsx | Styled icons |

### 19.3 Button Variants

```tsx
// Luxury - Gold gradient, primary actions
<Button variant="luxury">Book Now</Button>

// Outline - Bordered, secondary actions
<Button variant="outline">View Calendar</Button>

// Ghost - Minimal, subtle actions
<Button variant="ghost">Cancel</Button>
```

### 19.4 Card Variants

```tsx
// Default - Standard card
<Card>Content</Card>

// Luxury - Gradient background, gold shadow
<Card variant="luxury">Premium Content</Card>
```

---

## 20. Animations & Micro-interactions

### 20.1 CSS Animations

```css
/* Fade Up - Content entrance */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fadeUp 0.5s ease-out forwards; }

/* Fade In - Subtle appearance */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }

/* Shimmer - Gold shimmer effect */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-shimmer { animation: shimmer 3s infinite; }

/* Float - Subtle floating */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```

### 20.2 Transition Classes

```css
/* Hover lift effect */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}

/* Press scale effect */
.press-scale:active {
  transform: scale(0.98);
}
```

### 20.3 Stagger Delays

```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
```

---

## 21. Mobile-First Responsive Guidelines

### 21.1 Navigation Behavior

**Admin/Manager Dashboard (Mobile):**
- Navigation always expanded
- Grid layout (3-4 columns)
- Touch-friendly 44px minimum targets
- Badges visible on icons

**Staff Dashboard (Mobile):**
- Collapsible navigation
- Full-screen chat view
- Bottom sheet modals

### 21.2 Grid Adaptations

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Stats Cards | 2 columns | 2 columns | 4 columns |
| Service Grid | 1 column | 2 columns | 3 columns |
| Staff Cards | 1 column | 2 columns | 3 columns |
| Course Cards | 1 column | 2 columns | 3 columns |
| Chat List | Full width | 250px | 320px |

### 21.3 Typography Scaling

| Element | Mobile | Desktop |
|---------|--------|---------|
| H1 | text-xl | text-3xl |
| H2 | text-lg | text-2xl |
| H3 | text-base | text-lg |
| Body | text-sm | text-base |
| Caption | text-xs | text-sm |

### 21.4 Touch Targets

- Minimum button size: 44px × 44px
- Minimum tap target: 48px × 48px
- Adequate spacing between targets
- Swipe gestures for navigation

---

## 22. File Structure

```
src/
├── assets/
│   ├── classic-lash.jpg
│   ├── hero-salon.jpg
│   ├── lash-closeup.jpg
│   ├── volume-lash.jpg
│   ├── staff/
│   │   ├── beau.jpg
│   │   ├── lash-mama.jpg
│   │   ├── lash-mama-profile.png
│   │   ├── natali.jpg
│   │   ├── nikki.jpg
│   │   └── purni.jpg
│   └── vip/
│       ├── emma.jpg
│       ├── jessica.jpg
│       ├── olivia.jpg
│       └── sarah.jpg
├── components/
│   ├── admin/
│   │   ├── AdminAnalytics.tsx
│   │   ├── AdminCalendar.tsx
│   │   ├── AdminChat.tsx
│   │   ├── AdminClientDatabase.tsx
│   │   ├── AdminNotifications.tsx
│   │   ├── AdminProfile.tsx
│   │   ├── AdminRecurringBooking.tsx
│   │   ├── AdminSettings.tsx
│   │   ├── AdminStaffManagement.tsx
│   │   ├── AdminVIPManagement.tsx
│   │   ├── CourseBookingManager.tsx
│   │   └── RefillReminders.tsx
│   ├── booking/
│   │   ├── AfterpayBadge.tsx
│   │   ├── ServiceAccordion.tsx
│   │   └── StaffSelection.tsx
│   ├── courses/
│   │   └── CourseEnrollmentCard.tsx
│   ├── home/
│   │   ├── AboutPreview.tsx
│   │   ├── BookingCTA.tsx
│   │   ├── FeaturedServices.tsx
│   │   ├── Hero.tsx
│   │   ├── NavigationButtons.tsx
│   │   ├── PurniAvailability.tsx
│   │   ├── ReferralBanner.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ShopButton.tsx
│   │   ├── ShopPreview.tsx
│   │   ├── Testimonials.tsx
│   │   ├── VIPPreview.tsx
│   │   ├── VIPProgressBanner.tsx
│   │   └── WaitingList.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── UserRoleSwitcher.tsx
│   ├── staff/
│   │   └── StaffChat.tsx
│   ├── ui/
│   │   ├── [shadcn components]
│   │   └── VIPBadge.tsx
│   └── vip/
│       ├── VIPNotes.tsx
│       └── VIPProfileExamples.tsx
├── contexts/
│   └── UserRoleContext.tsx
├── data/
│   ├── services.ts
│   └── staff.ts
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── About.tsx
│   ├── AdminDashboard.tsx
│   ├── Book.tsx
│   ├── Courses.tsx
│   ├── Index.tsx
│   ├── ManagerDashboard.tsx
│   ├── NotFound.tsx
│   ├── Services.tsx
│   ├── StaffDashboard.tsx
│   └── VIP.tsx
├── types/
│   └── services.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts

Configuration Files:
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.js
├── STYLE_GUIDE.md
└── LASH_MAMA_APP_DOCUMENTATION.md
```

---

## 23. Future Enhancements

### Planned Features

| Feature | Priority | Description |
|---------|----------|-------------|
| **Lovable Cloud Integration** | High | Database, auth, real-time sync |
| **Push Notifications** | High | Browser & mobile notifications |
| **Email Integration** | High | Booking confirmations, reminders |
| **Payment Processing** | High | Stripe integration for deposits |
| **Client Portal** | Medium | Full client login & management |
| **Waitlist System** | Medium | Course & service waitlists |
| **Referral Tracking** | Medium | Automated referral rewards |
| **Multi-Location** | Low | Support for multiple salons |
| **Inventory Management** | Low | Product & supply tracking |

### Technical Improvements

| Improvement | Description |
|-------------|-------------|
| **Backend Integration** | Connect to Supabase via Lovable Cloud |
| **Authentication** | Email/password, Google sign-in |
| **Real-time Updates** | Live booking synchronization |
| **Offline Support** | PWA with offline capabilities |
| **Performance** | Code splitting, lazy loading |
| **Testing** | Unit tests, E2E tests |

---

## Appendix A: Icon Reference

All icons from **Lucide React**:

| Icon | Usage |
|------|-------|
| Crown | Admin/VIP premium |
| Gem | VIP program |
| Shield | Manager access |
| Calendar | Bookings, scheduling |
| Clock | Time, duration |
| Users | Clients, groups |
| UserCog | Staff management |
| Bell | Notifications |
| MessageCircle | Chat, messages |
| Settings | Configuration |
| BarChart3 | Analytics |
| DollarSign | Revenue, pricing |
| Star | Reviews, ratings |
| Heart | Aftercare, favorites |
| Sparkles | Mini refills, premium |
| GraduationCap | Courses |
| Repeat | Recurring bookings |
| Plus | Add actions |
| Check | Confirmations |
| ChevronRight | Navigation |
| ArrowUpRight | Positive trends |
| ArrowDownRight | Negative trends |

---

## Appendix B: Color Usage Quick Reference

| Use Case | Color Token |
|----------|-------------|
| Primary CTA | `bg-gold` |
| Secondary CTA | `bg-beige` |
| Success states | `text-emerald-600` |
| Error states | `text-destructive` |
| Pending states | `text-amber-600` |
| VIP elements | `text-gold`, `bg-gold/20` |
| Staff badges | `bg-violet-100` |
| Card backgrounds | `bg-card`, `from-card to-card/80` |
| Muted text | `text-muted-foreground` |
| Borders | `border-border`, `border-gold/20` |

---

**Document Maintained By:** Lash Mama Development Team  
**Last Review:** January 2025  
**Next Review:** Q2 2025
