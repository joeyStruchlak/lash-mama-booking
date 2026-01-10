# Lash Mama - React Native Monorepo UI/Styling Migration Guide

This comprehensive documentation provides verbatim styling, layout descriptions, and component structures for migrating the Lash Mama web app to a React Native + Web monorepo structure.

---

## Table of Contents

1. [Design System & Tokens](#design-system--tokens)
2. [Folder Structure](#folder-structure)
3. [Staff Dashboard Views](#staff-dashboard-views)
4. [Manager Dashboard Views](#manager-dashboard-views)
5. [Admin/Lash Mama Dashboard Views](#adminlash-mama-dashboard-views)
6. [Shared Components](#shared-components)
7. [Typography & Font Stack](#typography--font-stack)
8. [Animation Patterns](#animation-patterns)

---

## Design System & Tokens

### Color Palette (CSS Variables → React Native)

```css
/* Root CSS Variables - Convert to React Native StyleSheet constants */

/* Core Colors */
--background: 40 33% 99%;           /* #FFFCF7 - HSL(40, 33%, 99%) */
--foreground: 0 0% 17%;             /* #2C2C2C - HSL(0, 0%, 17%) */

--card: 40 43% 97%;                 /* #FAF7F2 - HSL(40, 43%, 97%) */
--card-foreground: 0 0% 17%;        /* #2C2C2C */

--primary: 37 42% 62%;              /* #C9A871 - Gold accent */
--primary-foreground: 0 0% 100%;    /* #FFFFFF */

--secondary: 40 33% 95%;            /* #F5F1E8 - Primary beige */
--secondary-foreground: 0 0% 17%;   /* #2C2C2C */

--muted: 40 20% 93%;                /* Light muted background */
--muted-foreground: 0 0% 45%;       /* #737373 - Muted text */

--destructive: 0 72% 51%;           /* Red for errors */
--success: 100 20% 73%;             /* #B8C5B0 - Success green */

--border: 40 20% 88%;               /* Subtle border */
--ring: 37 42% 62%;                 /* Focus ring - gold */

/* Brand Colors */
--beige: 38 33% 93%;                /* #F5F1E8 */
--cream: 40 43% 97%;                /* #FAF7F2 */
--gold: 37 42% 62%;                 /* #C9A871 */
--gold-light: 37 42% 72%;           /* Lighter gold */
--gold-dark: 37 42% 52%;            /* Darker gold */
--charcoal: 0 0% 17%;               /* #2C2C2C */
--charcoal-light: 0 0% 35%;         /* Lighter charcoal */
```

### React Native Color Constants

```typescript
// src/constants/colors.ts

export const colors = {
  // Core
  background: '#FFFCF7',
  foreground: '#2C2C2C',
  
  // Card
  card: '#FAF7F2',
  cardForeground: '#2C2C2C',
  
  // Primary (Gold)
  primary: '#C9A871',
  primaryForeground: '#FFFFFF',
  
  // Secondary (Beige)
  secondary: '#F5F1E8',
  secondaryForeground: '#2C2C2C',
  
  // Muted
  muted: '#EDE9E0',
  mutedForeground: '#737373',
  
  // Semantic
  destructive: '#EF4444',
  success: '#B8C5B0',
  
  // Border
  border: '#E5DFD3',
  ring: '#C9A871',
  
  // Brand
  beige: '#F5F1E8',
  cream: '#FAF7F2',
  gold: '#C9A871',
  goldLight: '#D4BC8E',
  goldDark: '#B08D5B',
  charcoal: '#2C2C2C',
  charcoalLight: '#595959',
  
  // Opacity variants
  goldAlpha10: 'rgba(201, 168, 113, 0.1)',
  goldAlpha20: 'rgba(201, 168, 113, 0.2)',
  goldAlpha30: 'rgba(201, 168, 113, 0.3)',
  creamAlpha10: 'rgba(250, 247, 242, 0.1)',
  charcoalAlpha90: 'rgba(44, 44, 44, 0.9)',
  charcoalAlpha95: 'rgba(44, 44, 44, 0.95)',
};
```

### Shadows

```typescript
// src/constants/shadows.ts

export const shadows = {
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },
  gold: {
    shadowColor: '#C9A871',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
};
```

### Spacing Scale

```typescript
// src/constants/spacing.ts

export const spacing = {
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  22: 88,
  24: 96,
};
```

### Border Radius

```typescript
// src/constants/radius.ts

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};
```

---

## Folder Structure

```
src/
├── app/
│   └── web/
│       ├── Admin/
│       │   ├── dashboard/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── calendar/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── recurring/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── staff-management/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── notifications/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── clients/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── vip/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── courses/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── refills/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── analytics/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── messages/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── profile/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   └── settings/
│       │       ├── page.tsx
│       │       └── page.css
│       │
│       ├── Manager/
│       │   ├── dashboard/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── calendar/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── my-hours/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── my-link/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── staff-management/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── notifications/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── clients/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── aftercare/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── allergies/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── vip/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── messages/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   ├── profile/
│       │   │   ├── page.tsx
│       │   │   └── page.css
│       │   └── settings/
│       │       ├── page.tsx
│       │       └── page.css
│       │
│       └── Staff/
│           ├── dashboard/
│           │   ├── page.tsx
│           │   └── page.css
│           ├── calendar/
│           │   ├── page.tsx
│           │   └── page.css
│           ├── my-hours/
│           │   ├── page.tsx
│           │   └── page.css
│           ├── my-link/
│           │   ├── page.tsx
│           │   └── page.css
│           ├── messages/
│           │   ├── page.tsx
│           │   └── page.css
│           └── notes/
│               ├── page.tsx
│               └── page.css
│
├── components/
│   ├── ui/
│   │   ├── Card/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Badge/
│   │   └── ...
│   └── shared/
│       ├── Header/
│       ├── Footer/
│       ├── NavigationSidebar/
│       └── ...
│
└── constants/
    ├── colors.ts
    ├── spacing.ts
    ├── shadows.ts
    ├── radius.ts
    └── typography.ts
```

---

## Staff Dashboard Views

### Navigation Items (Staff)
```typescript
const navigationItems = [
  { id: "overview", label: "Dashboard", icon: Briefcase },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "analytics", label: "My Hours", icon: BarChart3 },
  { id: "referral", label: "My Link", icon: Heart },
  { id: "chat", label: "Messages", icon: MessageCircle, badge: "2" },
  { id: "notes", label: "Notes", icon: StickyNote },
];
```

---

### Staff Dashboard → Overview (dashboard/page.tsx)

**Layout Description:**
- Full-screen background: `background` color (#FFFCF7)
- Container: max-width 1400px, centered, horizontal padding 12px (mobile) / 24px (desktop)
- Vertical padding: 80px top (mobile), 112px top (desktop), 80-96px bottom

**Hero Section:**
```css
/* Hero Container */
.hero {
  position: relative;
  overflow: hidden;
  border-radius: 16px; /* mobile: 16px, desktop: 24px */
  background: linear-gradient(to bottom right, #2C2C2C, rgba(44,44,44,0.95), rgba(44,44,44,0.9));
  padding: 16px; /* mobile: 16px, md: 32px, lg: 48px */
  margin-bottom: 16px; /* mobile: 16px, desktop: 32px */
}

/* Decorative blur circle */
.hero-blur {
  position: absolute;
  top: 0;
  right: 0;
  width: 128px; /* mobile: 128px, desktop: 256px */
  height: 128px;
  background: rgba(201, 168, 113, 0.1);
  border-radius: 9999px;
  filter: blur(48px);
}

/* Hero content */
.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Icon box */
.hero-icon-box {
  width: 48px; /* mobile: 48px, desktop: 64px */
  height: 48px;
  border-radius: 12px; /* mobile: 12px, desktop: 16px */
  background: linear-gradient(to bottom right, rgba(201,168,113,0.3), rgba(201,168,113,0.1));
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hero icon */
.hero-icon {
  width: 24px; /* mobile: 24px, desktop: 32px */
  height: 24px;
  color: #C9A871;
}

/* Hero title */
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; /* mobile: 20px, desktop: 30px */
  font-weight: 600;
  color: #FAF7F2;
}

/* Hero subtitle */
.hero-subtitle {
  font-size: 12px; /* mobile: 12px, desktop: 14px */
  color: rgba(250, 247, 242, 0.7);
}

/* Hero stat boxes */
.hero-stat {
  background: rgba(250, 247, 242, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 8px; /* mobile: 8px, desktop: 12px */
  padding: 8px 12px; /* mobile: 8px 12px, desktop: 16px 24px */
  text-align: center;
  flex: 1;
  min-width: 100px;
}

.hero-stat-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px; /* mobile: 18px, desktop: 30px */
  font-weight: 700;
  color: #FAF7F2;
}

.hero-stat-label {
  font-size: 10px; /* mobile: 10px, desktop: 14px */
  color: rgba(250, 247, 242, 0.6);
}
```

**Stats Cards Grid:**
```css
/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns mobile, 3 on lg */
  gap: 12px; /* mobile: 12px, desktop: 16px */
}

/* Stat Card */
.stat-card {
  padding: 12px; /* mobile: 12px, desktop: 20px */
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
  transition: box-shadow 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 8px 24px -4px rgba(201, 168, 113, 0.25);
}

/* Stat icon container */
.stat-icon-box {
  width: 40px; /* mobile: 40px, desktop: 48px */
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, rgba(201,168,113,0.2), rgba(201,168,113,0.1));
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  width: 20px; /* mobile: 20px, desktop: 24px */
  height: 20px;
  color: #C9A871;
}

/* Stat value */
.stat-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; /* mobile: 20px, desktop: 30px */
  font-weight: 700;
  color: #2C2C2C;
  margin-top: 12px; /* mobile: 12px, desktop: 16px */
}

/* Stat label */
.stat-label {
  font-size: 12px; /* mobile: 12px, desktop: 14px */
  color: #737373;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**Today's Schedule Card:**
```css
/* Schedule Card */
.schedule-card {
  padding: 16px; /* mobile: 16px, desktop: 24px */
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
}

/* Card header */
.card-header {
  display: flex;
  flex-direction: column; /* column on mobile, row on sm+ */
  gap: 12px;
  margin-bottom: 16px; /* mobile: 16px, desktop: 24px */
}

.card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px; /* mobile: 16px, desktop: 18px */
  font-weight: 600;
}

.card-subtitle {
  font-size: 12px; /* mobile: 12px, desktop: 14px */
  color: #737373;
}

/* Appointment item with timeline */
.appointment-item {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 12px; /* mobile: 12px, desktop: 16px */
  padding-left: 24px; /* mobile: 24px, desktop: 32px */
}

/* Timeline dot */
.timeline-dot {
  width: 10px; /* mobile: 10px, desktop: 12px */
  height: 10px;
  border-radius: 9999px;
  background: #C9A871;
  border: 2px solid #FFFCF7;
}

/* Timeline line */
.timeline-line {
  width: 2px;
  flex: 1;
  background: rgba(201, 168, 113, 0.2);
}

/* Appointment card */
.appointment-card {
  flex: 1;
  padding: 12px; /* mobile: 12px, desktop: 20px */
  border-radius: 12px;
  background: rgba(237, 233, 224, 0.5);
  transition: background 0.2s ease;
}

.appointment-card:hover {
  background: #EDE9E0;
}

/* Time badge */
.appointment-time {
  font-size: 16px; /* mobile: 16px, desktop: 18px */
  font-weight: 500;
  color: #C9A871;
}

/* Duration */
.appointment-duration {
  font-size: 12px;
  color: #737373;
}

/* 30 min warning badge */
.urgent-badge {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #C9A871;
  color: #FFFFFF;
  animation: pulse 2s infinite;
}

/* Client name */
.client-name {
  font-weight: 500;
  color: #2C2C2C;
  font-size: 14px; /* mobile: 14px, desktop: 16px */
}

/* Service name */
.service-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px; /* mobile: 12px, desktop: 14px */
  color: #737373;
}

/* Status badge */
.status-badge {
  display: inline-flex;
  padding: 4px 8px; /* mobile: 4px 8px, desktop: 4px 12px */
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(201, 168, 113, 0.1);
  color: #C9A871;
}
```

---

### Staff Dashboard → Calendar (calendar/page.tsx)

**Layout Description:**
- Two-column layout on desktop (1/3 mini calendar + 2/3 day/week view)
- Single column stacked on mobile
- Background: gradient card styling

**Mini Calendar:**
```css
/* Mini Calendar Card */
.mini-calendar {
  padding: 16px; /* mobile: 16px, desktop: 24px */
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
}

/* Month header */
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.calendar-month {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 14px; /* mobile: 14px, desktop: 16px */
}

/* Navigation buttons */
.calendar-nav-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.calendar-nav-btn:hover {
  background: #EDE9E0;
}

/* Week day headers */
.weekday-header {
  text-align: center;
  font-size: 12px;
  color: #737373;
  padding: 8px 0;
}

/* Day cell */
.day-cell {
  aspect-ratio: 1;
  border-radius: 8px;
  font-size: 12px; /* mobile: 12px, desktop: 14px */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

/* Selected day */
.day-cell.selected {
  background: #C9A871;
  color: #FFFFFF;
}

/* Today (not selected) */
.day-cell.today {
  background: rgba(201, 168, 113, 0.2);
  color: #C9A871;
  font-weight: 500;
}

/* Has appointments indicator */
.appointment-dot {
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: #C9A871;
  margin-top: 2px;
}

/* Today's stats */
.calendar-stats {
  margin-top: 16px; /* mobile: 16px, desktop: 24px */
  padding-top: 16px;
  border-top: 1px solid #E5DFD3;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px; /* mobile: 12px, desktop: 16px */
}

.calendar-stat-box {
  text-align: center;
  padding: 8px 12px; /* mobile: 8px 12px, desktop: 12px */
  border-radius: 12px;
  background: rgba(237, 233, 224, 0.5);
}

.calendar-stat-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; /* mobile: 20px, desktop: 24px */
  font-weight: 700;
  color: #C9A871;
}

.calendar-stat-label {
  font-size: 12px;
  color: #737373;
}
```

**Day/Week View:**
```css
/* View toggle */
.view-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #EDE9E0;
  border-radius: 8px;
  padding: 4px;
}

.view-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.view-toggle-btn.active {
  background: #C9A871;
  color: #FFFFFF;
}

.view-toggle-btn:not(.active) {
  background: transparent;
  color: #737373;
}

/* Week view header */
.week-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.week-day-header {
  text-align: center;
  padding: 8px;
  border-radius: 8px;
}

.week-day-header.today {
  background: rgba(201, 168, 113, 0.1);
}

.week-day-name {
  font-size: 12px;
  color: #737373;
}

.week-day-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 4px;
}

.week-day-number.today {
  color: #C9A871;
}

/* Week grid appointments */
.week-appointment {
  padding: 8px;
  border-radius: 8px;
  font-size: 12px;
  border-left: 2px solid;
}

.week-appointment.confirmed {
  background: rgba(201, 168, 113, 0.1);
  border-left-color: #C9A871;
}

.week-appointment.pending {
  background: rgba(201, 168, 113, 0.05);
  border-left-color: #D4BC8E;
}

/* Day view appointment */
.day-appointment {
  padding: 12px 16px; /* mobile: 12px, desktop: 16px */
  border-radius: 12px;
  border-left: 4px solid;
  background: rgba(237, 233, 224, 0.5);
  transition: background 0.2s ease;
}

.day-appointment:hover {
  background: #EDE9E0;
}

.day-appointment.confirmed {
  border-left-color: #C9A871;
}

.day-appointment.pending {
  border-left-color: #D4BC8E;
}

/* Empty state */
.calendar-empty {
  text-align: center;
  padding: 32px 0; /* mobile: 32px, desktop: 48px */
}

.calendar-empty-icon {
  width: 40px; /* mobile: 40px, desktop: 48px */
  height: 40px;
  color: rgba(115, 115, 115, 0.5);
  margin: 0 auto 12px;
}

.calendar-empty-text {
  font-size: 14px;
  color: #737373;
}
```

---

### Staff Dashboard → My Hours (my-hours/page.tsx)

**Layout Description:**
- Header with title and subtitle
- 5-column stats grid (2 on mobile, 5 on lg)
- Bar chart for weekly hours
- Daily breakdown progress bars
- Clients per day grid

**Stats Cards:**
```css
/* Personal analytics stats */
.analytics-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 on mobile, 5 on lg */
  gap: 12px; /* mobile: 12px, desktop: 16px */
}

.analytics-stat-card {
  position: relative;
  padding: 12px; /* mobile: 12px, desktop: 20px */
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
  transition: box-shadow 0.3s ease;
  overflow: hidden;
}

.analytics-stat-card:hover {
  box-shadow: 0 8px 24px -4px rgba(201, 168, 113, 0.25);
}

/* Hover tooltip overlay */
.stat-tooltip {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(44, 44, 44, 0.95);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: 12px;
}

.analytics-stat-card:hover .stat-tooltip {
  opacity: 1;
}

.stat-tooltip-text {
  font-size: 12px;
  color: #FAF7F2;
  text-align: center;
}
```

**Bar Chart:**
```css
/* Hours chart card */
.hours-chart-card {
  padding: 16px; /* mobile: 16px, desktop: 24px */
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
}

/* Chart legend */
.chart-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  font-size: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.legend-dot.available {
  background: rgba(201, 168, 113, 0.3);
}

.legend-dot.scheduled {
  background: #C9A871;
}

.legend-dot.actual {
  background: rgba(201, 168, 113, 0.7);
}

/* Bar chart colors */
.bar-available {
  fill: hsl(37, 50%, 85%); /* Light gold */
}

.bar-scheduled {
  fill: hsl(37, 60%, 55%); /* Medium gold */
}

.bar-actual {
  fill: hsl(37, 70%, 70%); /* Gold */
}
```

**Daily Breakdown:**
```css
/* Daily breakdown */
.daily-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.daily-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.daily-label {
  width: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #737373;
}

.daily-bar-container {
  flex: 1;
  position: relative;
  height: 12px;
  background: #EDE9E0;
  border-radius: 9999px;
  overflow: hidden;
}

/* Available overlay */
.daily-bar-available {
  position: absolute;
  height: 100%;
  background: rgba(201, 168, 113, 0.4);
  border-radius: 9999px;
  transition: width 0.5s ease;
}

/* Actual working overlay */
.daily-bar-actual {
  position: absolute;
  height: 100%;
  background: linear-gradient(to right, #C9A871, rgba(201,168,113,0.8));
  border-radius: 9999px;
  transition: width 0.5s ease;
}

.daily-stats {
  text-align: right;
  min-width: 120px;
}

.daily-stats-avail {
  font-size: 12px;
  color: #737373;
}

.daily-stats-sched {
  font-size: 14px;
  font-weight: 500;
  color: #2C2C2C;
}

.daily-stats-done {
  font-size: 12px;
  color: #C9A871;
  margin-left: 4px;
}
```

**Clients Grid:**
```css
/* Clients this week grid */
.clients-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.client-day {
  text-align: center;
}

.client-day-label {
  font-size: 12px;
  color: #737373;
  margin-bottom: 8px;
}

.client-count-box {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.client-count-box.has-clients {
  background: rgba(201, 168, 113, 0.2);
  color: #C9A871;
}

.client-count-box.no-clients {
  background: #EDE9E0;
  color: #737373;
}

/* Total row */
.clients-total {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E5DFD3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.clients-total-label {
  font-size: 14px;
  color: #737373;
}

.clients-total-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 600;
  color: #C9A871;
}
```

---

### Staff Dashboard → My Link (my-link/page.tsx)

**Layout Description:**
- Referral link card with copy/share buttons
- 4-column stats grid (2 on mobile)
- Recent referrals list

**Referral Link Card:**
```css
/* Referral link section */
.referral-card {
  padding: 16px; /* mobile: 16px, desktop: 24px */
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
}

.referral-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.referral-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, rgba(201,168,113,0.2), rgba(201,168,113,0.1));
  display: flex;
  align-items: center;
  justify-content: center;
}

.referral-icon {
  width: 24px;
  height: 24px;
  color: #C9A871;
}

.referral-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 600;
  color: #2C2C2C;
}

.referral-description {
  font-size: 14px;
  color: #737373;
}

.referral-highlight {
  color: #C9A871;
  font-weight: 600;
}

/* Link input row */
.link-input-row {
  display: flex;
  gap: 8px;
}

.link-input {
  flex: 1;
  background: rgba(237, 233, 224, 0.5);
  border: 1px solid #E5DFD3;
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
}

/* Copy button */
.copy-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #E5DFD3;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.copy-btn.copied {
  background: #C9A871;
  border-color: #C9A871;
  color: #FFFFFF;
}

/* Share button */
.share-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #B08D5B, #C9A871, #D4BC8E);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bonus info box */
.bonus-info {
  margin-top: 16px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(201, 168, 113, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
}

.bonus-icon {
  width: 20px;
  height: 20px;
  color: #C9A871;
}

.bonus-text {
  font-size: 14px;
  color: #2C2C2C;
}
```

**Referral Stats:**
```css
/* Stats grid */
.referral-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 on mobile, 4 on lg */
  gap: 12px; /* mobile: 12px, desktop: 16px */
}

/* Same styling as analytics stats cards */
```

**Recent Referrals List:**
```css
/* Recent referrals */
.referral-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.referral-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 12px;
  background: rgba(237, 233, 224, 0.5);
}

.referral-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.referral-avatar {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: rgba(201, 168, 113, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C9A871;
  font-weight: 500;
}

.referral-name {
  font-size: 14px;
  font-weight: 500;
  color: #2C2C2C;
}

.referral-service {
  font-size: 12px;
  color: #737373;
}

.referral-bonus {
  font-size: 14px;
  font-weight: 600;
}

.referral-bonus.completed {
  color: #C9A871;
}

.referral-bonus.pending {
  color: #737373;
}

.referral-status {
  font-size: 12px;
  color: #737373;
  text-transform: capitalize;
}
```

---

### Staff Dashboard → Messages (messages/page.tsx)

**Layout Description:**
- Split view: conversation list (left) + chat area (right)
- Mobile: shows list by default, chat when selected with back button
- Fixed header and input, scrollable messages area

**Conversation List:**
```css
/* Messages card container */
.messages-container {
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
  overflow: hidden;
}

/* Split layout */
.messages-split {
  display: flex;
  height: 500px; /* mobile: 500px, desktop: 600px */
}

/* Conversation list */
.conversation-list {
  width: 320px;
  border-right: 1px solid #E5DFD3;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

/* On mobile when chat is selected */
.conversation-list.hidden-mobile {
  display: none; /* hidden on mobile when chat selected */
}

/* Search bar */
.conversation-search {
  padding: 12px 16px; /* mobile: 12px, desktop: 16px */
  border-bottom: 1px solid #E5DFD3;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #737373;
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border-radius: 12px;
  border: 1px solid #E5DFD3;
  background: transparent;
}

/* Conversation item */
.conversation-item {
  width: 100%;
  padding: 12px 16px; /* mobile: 12px, desktop: 16px */
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(229, 223, 211, 0.5);
}

.conversation-item.active {
  background: rgba(201, 168, 113, 0.1);
}

.conversation-item:hover:not(.active) {
  background: rgba(237, 233, 224, 0.5);
}

/* Avatar with VIP ring */
.conversation-avatar {
  position: relative;
  width: 40px; /* mobile: 40px, desktop: 48px */
  height: 40px;
  border-radius: 9999px;
  background: linear-gradient(to bottom right, rgba(201,168,113,0.2), rgba(201,168,113,0.1));
  display: flex;
  align-items: center;
  justify-content: center;
}

.conversation-avatar.vip {
  box-shadow: 0 0 0 2px #C9A871;
}

.avatar-initials {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 12px; /* mobile: 12px, desktop: 14px */
  color: #C9A871;
}

/* VIP badge */
.vip-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: linear-gradient(to bottom right, #C9A871, #DAA520);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vip-badge-icon {
  width: 10px;
  height: 10px;
  color: #FFFFFF;
}

/* Conversation info */
.conversation-info {
  flex: 1;
  min-width: 0;
}

.conversation-name {
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-name.unread {
  color: #2C2C2C;
  font-weight: 600;
}

.conversation-time {
  font-size: 10px; /* mobile: 10px, desktop: 12px */
  color: #737373;
}

.conversation-preview {
  font-size: 12px; /* mobile: 12px, desktop: 14px */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-preview.unread {
  color: #2C2C2C;
}

.conversation-preview:not(.unread) {
  color: #737373;
}

/* Unread count badge */
.unread-badge {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: #C9A871;
  color: #FFFFFF;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
```

**Chat Area:**
```css
/* Chat area */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Chat header */
.chat-header {
  padding: 12px 16px; /* mobile: 12px, desktop: 16px */
  border-bottom: 1px solid #E5DFD3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-header-left {
  display: flex;
  align-items: center;
  gap: 8px; /* mobile: 8px, desktop: 12px */
}

/* Back button (mobile only) */
.chat-back-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: transparent;
  display: flex; /* flex on mobile, hidden on desktop */
  align-items: center;
  justify-content: center;
}

.chat-contact-name {
  font-weight: 500;
  font-size: 14px;
  color: #2C2C2C;
}

.chat-vip-tag {
  display: inline-flex;
  padding: 2px 6px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 500;
  background: rgba(201, 168, 113, 0.2);
  color: #C9A871;
}

.chat-status {
  font-size: 10px; /* mobile: 10px, desktop: 12px */
  color: #737373;
}

/* Messages container */
.messages-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px; /* mobile: 12px, desktop: 16px */
  display: flex;
  flex-direction: column;
  gap: 12px; /* mobile: 12px, desktop: 16px */
}

/* Message bubble */
.message-bubble {
  max-width: 85%; /* mobile: 85%, desktop: 70% */
  padding: 8px 12px; /* mobile: 8px 12px, desktop: 10px 16px */
  border-radius: 16px;
}

.message-bubble.outgoing {
  align-self: flex-end;
  background: linear-gradient(to bottom right, #C9A871, rgba(201,168,113,0.9));
  color: #FFFFFF;
  border-bottom-right-radius: 4px;
}

.message-bubble.incoming {
  align-self: flex-start;
  background: #EDE9E0;
  color: #2C2C2C;
  border-bottom-left-radius: 4px;
}

.message-text {
  font-size: 14px;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.message-time {
  font-size: 10px; /* mobile: 10px, desktop: 12px */
}

.message-time.outgoing {
  color: rgba(255, 255, 255, 0.7);
}

.message-time.incoming {
  color: #737373;
}

/* Read indicator (sparkles) */
.read-indicator {
  display: flex;
  align-items: center;
  gap: 2px;
}

.read-indicator.read {
  color: #C9A871;
}

.read-indicator:not(.read) {
  color: rgba(115, 115, 115, 0.5);
}

/* Chat input */
.chat-input-area {
  padding: 12px 16px; /* mobile: 12px, desktop: 16px */
  border-top: 1px solid #E5DFD3;
}

.chat-input-row {
  display: flex;
  align-items: center;
  gap: 8px; /* mobile: 8px, desktop: 12px */
}

.chat-input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #E5DFD3;
  background: transparent;
}

.chat-send-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #B08D5B, #C9A871, #D4BC8E);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-send-btn:disabled {
  opacity: 0.5;
}

/* Empty state */
.chat-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.chat-empty-icon {
  width: 48px; /* mobile: 48px, desktop: 64px */
  height: 48px;
  color: rgba(115, 115, 115, 0.3);
  margin-bottom: 16px;
}

.chat-empty-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 600;
  color: #2C2C2C;
  margin-bottom: 8px;
}

.chat-empty-text {
  font-size: 14px;
  color: #737373;
}
```

---

### Staff Dashboard → Notes (notes/page.tsx)

**Layout Description:**
- Two stacked cards: Notes + Reminders
- Add buttons trigger modals/dialogs

**Notes Card:**
```css
/* Notes card */
.notes-card {
  padding: 16px; /* mobile: 16px, desktop: 24px */
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
}

/* Card header with add button */
.notes-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.notes-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px; /* mobile: 16px, desktop: 18px */
  font-weight: 600;
}

/* Add button */
.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid #E5DFD3;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: rgba(237, 233, 224, 0.5);
}

/* Note item */
.note-item {
  padding: 12px;
  border-radius: 12px;
  background: rgba(237, 233, 224, 0.5);
  margin-bottom: 12px;
}

.note-text {
  font-size: 14px;
  color: #2C2C2C;
}

.note-date {
  font-size: 12px;
  color: #737373;
  margin-top: 8px;
}
```

**Reminders Card:**
```css
/* Reminders card - same structure as notes */

/* Reminder item */
.reminder-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(201, 168, 113, 0.1);
  margin-bottom: 12px;
}

.reminder-icon {
  width: 16px;
  height: 16px;
  color: #C9A871;
  margin-top: 2px;
  flex-shrink: 0;
}

.reminder-text {
  font-size: 14px;
  font-weight: 500;
  color: #2C2C2C;
}

.reminder-time {
  font-size: 12px;
  color: #737373;
  margin-top: 4px;
}
```

---

## Manager Dashboard Views

### Navigation Items (Manager)
```typescript
const navigationItems = [
  { id: "overview", label: "Dashboard", icon: CalendarDays },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "analytics", label: "My Hours", icon: BarChart3 },
  { id: "referral", label: "My Link", icon: Heart },
  { id: "staff", label: "Staff", icon: UserCog },
  { id: "notifications", label: "Alerts", icon: Bell, badge: "3" },
  { id: "clients", label: "Clients", icon: Users },
  { id: "aftercare", label: "Aftercare", icon: FileText },
  { id: "allergies", label: "Allergies", icon: AlertTriangle },
  { id: "vip", label: "VIP", icon: Gem },
  { id: "chat", label: "Messages", icon: MessageCircle, badge: "2" },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];
```

**Additional Tabs (beyond Staff):**

### Manager → Aftercare (aftercare/page.tsx)
- Client list with "Add Aftercare" buttons
- Modal for entering aftercare notes
- Export as PDF / Share as image options

### Manager → Allergies (allergies/page.tsx)
- Important warning card (amber themed)
- Client forms list
- Allergy form modal with checkboxes

```css
/* Warning card */
.warning-card {
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FEF3C7, rgba(254,243,199,0.5));
}

.warning-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.warning-icon {
  width: 20px;
  height: 20px;
  color: #D97706;
  flex-shrink: 0;
  margin-top: 2px;
}

.warning-title {
  font-weight: 500;
  color: #2C2C2C;
  margin-bottom: 4px;
}

.warning-text {
  font-size: 14px;
  color: #737373;
}
```

---

## Admin/Lash Mama Dashboard Views

### Navigation Items (Admin)
```typescript
const navigationItems = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "recurring", label: "Recurring", icon: Repeat },
  { id: "staff", label: "Staff", icon: UserCog },
  { id: "notifications", label: "Alerts", icon: Bell, badge: "3" },
  { id: "clients", label: "Clients", icon: Users },
  { id: "vip", label: "VIP", icon: Gem },
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "refills", label: "Refills", icon: Sparkles },
  { id: "analytics", label: "Analytics", icon: LineChart },
  { id: "chat", label: "Messages", icon: MessageCircle, badge: "5" },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];
```

### Admin → Overview (dashboard/page.tsx)

**Unique Features:**
- Quick action buttons (Book Without Deposit, Recurring Bookings)
- Revenue stats with trend arrows
- Weekly revenue bar chart
- Top services progress bars

**Stats with Trends:**
```css
/* Stat card with trend */
.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 9999px;
}

.stat-trend.up {
  background: rgba(201, 168, 113, 0.2);
  color: #B08D5B;
}

.stat-trend.down {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.trend-icon {
  width: 12px;
  height: 12px;
}
```

**Revenue Chart:**
```css
/* Revenue bar chart */
.revenue-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4px; /* mobile: 4px, desktop: 8px */
  height: 128px; /* mobile: 128px, desktop: 192px */
}

.revenue-bar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px; /* mobile: 4px, desktop: 8px */
}

.revenue-bar-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 96px; /* mobile: 96px, desktop: 160px */
}

.revenue-bar {
  width: 100%;
  max-width: 32px; /* mobile: 32px, desktop: 48px */
  border-radius: 6px 6px 0 0; /* mobile: 6px, desktop: 8px */
  transition: height 0.5s ease;
}

.revenue-bar.highlight {
  background: linear-gradient(to top, #C9A871, rgba(201,168,113,0.6));
}

.revenue-bar:not(.highlight) {
  background: linear-gradient(to top, rgba(201,168,113,0.3), rgba(201,168,113,0.1));
}

.revenue-day-label {
  font-size: 10px; /* mobile: 10px, desktop: 12px */
  color: #737373;
}
```

**Service Distribution:**
```css
/* Top services */
.service-item {
  margin-bottom: 12px;
}

.service-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px; /* mobile: 12px, desktop: 14px */
  margin-bottom: 4px;
}

.service-name {
  font-weight: 500;
  color: #2C2C2C;
}

.service-percent {
  color: #737373;
}

.service-bar {
  height: 8px;
  background: #EDE9E0;
  border-radius: 9999px;
  overflow: hidden;
}

.service-bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.7s ease;
}

/* Different opacities for bars */
.service-bar-fill.tier-1 { background: #C9A871; }
.service-bar-fill.tier-2 { background: rgba(201, 168, 113, 0.7); }
.service-bar-fill.tier-3 { background: rgba(201, 168, 113, 0.5); }
.service-bar-fill.tier-4 { background: rgba(201, 168, 113, 0.3); }
```

### Admin → Analytics (analytics/page.tsx)

**Comprehensive business analytics:**
- Revenue overview cards
- Staff performance horizontal bar chart
- Service popularity chart

```css
/* Staff performance bars */
.staff-performance {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.staff-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.staff-name {
  width: 80px;
  font-size: 14px;
  font-weight: 500;
  color: #2C2C2C;
}

.staff-bar {
  flex: 1;
  height: 24px;
  background: #EDE9E0;
  border-radius: 8px;
  overflow: hidden;
}

.staff-bar-fill {
  height: 100%;
  background: linear-gradient(to right, #C9A871, rgba(201,168,113,0.7));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
}

.staff-value {
  font-size: 12px;
  font-weight: 600;
  color: #FFFFFF;
}
```

---

## Shared Components

### Mobile Navigation Grid

```css
/* Mobile nav (lg:hidden) */
.mobile-nav {
  margin-bottom: 16px;
}

.mobile-nav-card {
  padding: 12px;
  border: none;
  border-radius: 16px;
  background: #FAF7F2;
}

.mobile-nav-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 on mobile, 4-5 on larger */
  gap: 8px;
}

.mobile-nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 8px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  transition: all 0.2s ease;
}

.mobile-nav-btn.active {
  background: #C9A871;
  color: #FFFFFF;
  box-shadow: 0 8px 24px -4px rgba(201, 168, 113, 0.25);
}

.mobile-nav-btn:not(.active) {
  color: #737373;
}

.mobile-nav-btn:not(.active):hover {
  background: #EDE9E0;
}

.mobile-nav-icon {
  width: 20px;
  height: 20px;
}

/* Badge */
.mobile-nav-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav-badge.active {
  background: rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
}

.mobile-nav-badge:not(.active) {
  background: #C9A871;
  color: #FFFFFF;
}
```

### Desktop Sidebar

```css
/* Desktop sidebar (hidden lg:block) */
.desktop-sidebar {
  width: 256px;
  flex-shrink: 0;
}

.sidebar-card {
  padding: 16px;
  position: sticky;
  top: 112px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.sidebar-nav-btn.active {
  background: #C9A871;
  color: #FFFFFF;
  box-shadow: 0 8px 24px -4px rgba(201, 168, 113, 0.25);
}

.sidebar-nav-btn:not(.active) {
  color: #737373;
}

.sidebar-nav-btn:not(.active):hover {
  background: #EDE9E0;
  color: #2C2C2C;
}

.sidebar-nav-icon {
  width: 20px;
  height: 20px;
}

.sidebar-nav-label {
  flex: 1;
  text-align: left;
}

/* Badge in sidebar */
.sidebar-badge {
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}

.sidebar-badge.active {
  background: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
}

.sidebar-badge:not(.active) {
  background: rgba(201, 168, 113, 0.2);
  color: #C9A871;
}
```

### Button Variants

```css
/* Button base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

/* Sizes */
.btn-sm {
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
}

.btn-default {
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

.btn-lg {
  height: 44px;
  padding: 0 20px;
  font-size: 16px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
}

/* Variants */
.btn-luxury {
  background: linear-gradient(135deg, #B08D5B, #C9A871, #D4BC8E);
  color: #FFFFFF;
  box-shadow: 0 4px 12px -2px rgba(201, 168, 113, 0.3);
}

.btn-luxury:hover {
  box-shadow: 0 8px 16px -2px rgba(201, 168, 113, 0.4);
  transform: translateY(-1px);
}

.btn-default {
  background: #C9A871;
  color: #FFFFFF;
}

.btn-default:hover {
  background: #B08D5B;
}

.btn-outline {
  background: transparent;
  border: 1px solid #E5DFD3;
  color: #2C2C2C;
}

.btn-outline:hover {
  background: rgba(237, 233, 224, 0.5);
}

.btn-ghost {
  background: transparent;
  border: none;
  color: #737373;
}

.btn-ghost:hover {
  background: #EDE9E0;
  color: #2C2C2C;
}

.btn-destructive {
  background: #EF4444;
  color: #FFFFFF;
}

.btn-destructive:hover {
  background: #DC2626;
}
```

### Card Component

```css
/* Card base */
.card {
  border-radius: 16px;
  background: #FAF7F2;
  border: none;
}

/* Variants */
.card-default {
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.8));
}

.card-luxury {
  background: linear-gradient(to bottom right, #FAF7F2, rgba(250,247,242,0.9));
  box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.08);
}

.card-elevated {
  background: #FFFFFF;
  box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.12);
}
```

---

## Typography & Font Stack

```typescript
// src/constants/typography.ts

export const typography = {
  fonts: {
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "'Inter', system-ui, sans-serif",
  },
  
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 30,
    '5xl': 36,
  },
  
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  },
};

// Usage patterns
export const textStyles = {
  // Headings (Cormorant Garamond)
  h1: {
    fontFamily: typography.fonts.serif,
    fontSize: typography.sizes['4xl'], // 30
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.tight,
  },
  h2: {
    fontFamily: typography.fonts.serif,
    fontSize: typography.sizes['2xl'], // 20
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.tight,
  },
  h3: {
    fontFamily: typography.fonts.serif,
    fontSize: typography.sizes.lg, // 16
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.snug,
  },
  
  // Body (Inter)
  body: {
    fontFamily: typography.fonts.sans,
    fontSize: typography.sizes.base, // 14
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.normal,
  },
  bodySmall: {
    fontFamily: typography.fonts.sans,
    fontSize: typography.sizes.sm, // 12
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.normal,
  },
  
  // Labels
  label: {
    fontFamily: typography.fonts.sans,
    fontSize: typography.sizes.sm, // 12
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.normal,
  },
  
  // Caption
  caption: {
    fontFamily: typography.fonts.sans,
    fontSize: typography.sizes.xs, // 10
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.normal,
  },
  
  // Stat values (Cormorant Garamond)
  statValue: {
    fontFamily: typography.fonts.serif,
    fontSize: typography.sizes['3xl'], // 24
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.tight,
  },
  statValueSmall: {
    fontFamily: typography.fonts.serif,
    fontSize: typography.sizes.xl, // 18
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.tight,
  },
};
```

---

## Animation Patterns

```typescript
// src/constants/animations.ts

export const animations = {
  // Timing functions
  easing: {
    luxury: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  
  // Durations (ms)
  duration: {
    fast: 150,
    normal: 200,
    slow: 300,
    verySlow: 500,
  },
  
  // React Native Animated config
  springConfig: {
    gentle: {
      tension: 120,
      friction: 14,
    },
    bouncy: {
      tension: 180,
      friction: 12,
    },
    stiff: {
      tension: 200,
      friction: 20,
    },
  },
};

// Common animation patterns
export const fadeIn = {
  from: { opacity: 0, translateY: 24 },
  to: { opacity: 1, translateY: 0 },
  duration: animations.duration.verySlow,
  easing: animations.easing.luxury,
};

export const scaleIn = {
  from: { opacity: 0, scale: 0.9 },
  to: { opacity: 1, scale: 1 },
  duration: animations.duration.slow,
  easing: animations.easing.bounce,
};

export const slideUp = {
  from: { opacity: 0, translateY: '100%' },
  to: { opacity: 1, translateY: 0 },
  duration: animations.duration.verySlow,
  easing: animations.easing.luxury,
};

// Press/Touch feedback
export const pressScale = {
  pressed: { scale: 0.97 },
  duration: animations.duration.fast,
};

// Hover lift (web only)
export const hoverLift = {
  hovered: { translateY: -4 },
  duration: animations.duration.slow,
};
```

---

## Icon Reference

All icons use **Lucide React** library. Here are the key icons used:

```typescript
// Dashboard icons
Briefcase, BarChart3, Calendar, CalendarDays, Clock, ClockIcon

// Navigation
ChevronLeft, ChevronRight, Menu, Plus, Filter, LayoutGrid

// Actions
Send, Copy, Share2, Edit, Check, X, Download, ExternalLink

// Users & Profiles
User, Users, UserCog, Crown, Gem, Heart

// Content
MessageCircle, Bell, StickyNote, FileText, Settings

// Status & Indicators
Sparkles, Star, TrendingUp, ArrowUpRight, ArrowDownRight, AlertTriangle

// Features
Repeat, GraduationCap, DollarSign, Shield, Link2, Phone, MoreVertical, Search
```

---

## Responsive Breakpoints

```typescript
// src/constants/breakpoints.ts

export const breakpoints = {
  sm: 640,   // Small tablets
  md: 768,   // Tablets
  lg: 1024,  // Small laptops
  xl: 1280,  // Desktops
  '2xl': 1400, // Large desktops
};

// Container max-width
export const containerMaxWidth = 1400;

// Container padding
export const containerPadding = {
  mobile: 12,
  tablet: 16,
  desktop: 24,
};
```

---

## Notes for Implementation

1. **All colors use the gold/beige palette** - No blues, greens, purples, or other off-brand colors
2. **Serif font (Cormorant Garamond)** for headings, stat values, and accent text
3. **Sans font (Inter)** for body text, labels, and UI elements
4. **Generous padding** - Components feel spacious and luxurious
5. **Subtle shadows** - Using the soft, medium, and gold shadow presets
6. **Rounded corners** - 8px for small elements, 12px for buttons, 16px for cards
7. **Animations** - Smooth fade-in on section changes, press feedback on buttons
8. **Mobile-first** - All layouts work on mobile with responsive enhancements for larger screens

---

*This documentation provides a complete reference for recreating the Lash Mama UI in a React Native + Web monorepo. Each section includes verbatim styling from the original implementation.*
