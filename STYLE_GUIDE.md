# Lash Mama — Luxury Beauty Booking App Style Guide

## Brand Identity

**App Name:** Lash Mama  
**Tagline:** "Where Beauty Meets Elegance"  
**Industry:** Luxury Beauty / Lash Extensions / Bridal Services  
**Aesthetic:** Ultra-feminine, sophisticated, boutique luxury experience

---

## Design Philosophy

This app embodies **quiet luxury** — refined, intentional, and unmistakably premium without being ostentatious. Every design decision prioritizes elegance over flashiness, creating an experience that feels like stepping into a high-end beauty boutique.

### Core Principles
1. **Generous White Space** — Let elements breathe; avoid visual clutter
2. **Golden Accents** — Use gold as the signature accent, never overwhelming
3. **Soft Transitions** — All interactions feel smooth and luxurious
4. **Typography Hierarchy** — Elegant serifs for headings, clean sans-serifs for body
5. **Subtle Depth** — Soft shadows and gradients create dimension without harshness

---

## Color Palette

### Primary Colors
```css
--background: hsl(40, 33%, 99%)           /* #FFFCF7 - Warm off-white */
--foreground: hsl(0, 0%, 17%)             /* #2C2C2C - Deep charcoal */
```

### Brand Colors
```css
--beige: hsl(38, 33%, 93%)                /* #F5F1E8 - Soft beige */
--cream: hsl(40, 43%, 97%)                /* #FAF7F2 - Warm cream */
--gold: hsl(37, 42%, 62%)                 /* #C9A871 - Signature gold */
--gold-light: hsl(37, 42%, 72%)           /* #D4BC94 - Light gold */
--gold-dark: hsl(37, 42%, 52%)            /* #A88B54 - Deep gold */
--charcoal: hsl(0, 0%, 17%)               /* #2C2C2C - Rich charcoal */
--charcoal-light: hsl(0, 0%, 35%)         /* #595959 - Soft charcoal */
```

### Semantic Colors
```css
--success: hsl(100, 20%, 73%)             /* #B8C5B0 - Soft sage green */
--destructive: hsl(0, 72%, 51%)           /* #E53935 - Muted red */
--muted: hsl(40, 20%, 93%)                /* #F0EDE6 - Neutral muted */
--muted-foreground: hsl(0, 0%, 45%)       /* #737373 - Subtle text */
```

### Gradient Library
```css
/* Signature Gold Gradient - For CTAs and highlights */
--gradient-gold: linear-gradient(135deg, hsl(37 42% 52%) 0%, hsl(37 42% 62%) 50%, hsl(37 42% 72%) 100%);

/* Radial Gold Glow - For decorative elements */
--gradient-gold-radial: radial-gradient(ellipse at center, hsl(37 42% 72%) 0%, hsl(37 42% 62%) 50%, hsl(37 42% 52%) 100%);

/* Shimmer Effect - For premium text */
--gradient-gold-shimmer: linear-gradient(110deg, hsl(37 42% 52%) 0%, hsl(37 42% 72%) 25%, hsl(37 42% 52%) 50%, hsl(37 42% 72%) 75%, hsl(37 42% 52%) 100%);

/* Soft Overlay - For sections */
--gradient-luxury: linear-gradient(135deg, hsl(40 43% 97%) 0%, hsl(37 42% 62% / 0.1) 50%, hsl(40 43% 97%) 100%);

/* Feminine Touch - For special sections */
--gradient-feminine: linear-gradient(135deg, hsl(350 30% 95%) 0%, hsl(37 42% 62% / 0.08) 50%, hsl(40 43% 97%) 100%);
```

---

## Typography

### Font Families
```css
--font-serif: 'Cormorant Garamond', Georgia, serif;
--font-sans: 'Inter', system-ui, sans-serif;
```

### Usage Guidelines
- **Headings (H1-H4):** Cormorant Garamond — Elegant, editorial feel
- **Body Text:** Inter — Clean, highly readable
- **Buttons/CTAs:** Inter Semibold with letter-spacing: 0.05em
- **Labels/Badges:** Inter Medium, uppercase, tracking-widest

### Type Scale
```
Hero Heading:     5rem - 7rem (80px - 112px) — Cormorant Garamond
Section Heading:  2.5rem - 3rem (40px - 48px) — Cormorant Garamond  
Card Title:       1.25rem - 1.5rem (20px - 24px) — Cormorant Garamond Semibold
Body Large:       1.125rem (18px) — Inter Regular
Body:             1rem (16px) — Inter Regular
Small/Caption:    0.875rem (14px) — Inter Regular
Micro:            0.75rem (12px) — Inter Medium
```

---

## Spacing & Layout

### Spacing Scale (rem)
```
xs:   0.25rem (4px)
sm:   0.5rem (8px)
md:   1rem (16px)
lg:   1.5rem (24px)
xl:   2rem (32px)
2xl:  3rem (48px)
3xl:  4rem (64px)
4xl:  6rem (96px)
```

### Container
- Max width: 1400px
- Horizontal padding: 1.5rem (24px)
- Centered alignment

### Section Padding
- Standard sections: `py-20` to `py-24` (80-96px vertical)
- Compact sections: `py-12` to `py-16` (48-64px vertical)

---

## Border Radius

```css
--radius: 1rem (16px)           /* Default */
--radius-sm: 0.5rem (8px)       /* Small elements */
--radius-md: 0.875rem (14px)    /* Medium elements */
--radius-lg: 1rem (16px)        /* Cards */
--radius-xl: 1.25rem (20px)     /* Large cards */
--radius-2xl: 1.5rem (24px)     /* Hero elements */
--radius-full: 9999px           /* Pills, avatars */
```

---

## Shadows

### Shadow Library
```css
/* Soft — Default for cards */
--shadow-soft: 0 4px 24px -4px hsl(0 0% 0% / 0.08);

/* Medium — Hover states, elevated elements */
--shadow-medium: 0 8px 32px -8px hsl(0 0% 0% / 0.12);

/* Gold Glow — Premium elements, CTAs */
--shadow-gold: 0 8px 24px -4px hsl(37 42% 62% / 0.25);

/* Inner — Pressed states, inputs */
--shadow-inner-soft: inset 0 2px 4px 0 hsl(0 0% 0% / 0.05);
```

---

## Animation & Motion

### Easing Functions
```css
--ease-luxury: cubic-bezier(0.4, 0, 0.2, 1);    /* Smooth, elegant */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful spring */
```

### Duration Guidelines
- Micro-interactions: 150ms
- Button states: 200ms
- Page transitions: 300-400ms
- Fade animations: 500-600ms
- Stagger delays: 100ms increments

### Animation Library
```css
/* Fade Up — Content reveals */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale In — Modals, popovers */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* Float — Decorative elements */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Shimmer — Loading states */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Stagger Classes
```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
```

---

## Components

### Buttons

#### Luxury (Primary CTA)
```css
background: linear-gradient(135deg, gold-dark, gold, gold-light);
color: white;
box-shadow: shadow-gold;
border-radius: 0.75rem - 1rem;
padding: 1rem 2rem;
font-weight: 600;
letter-spacing: 0.05em;
/* Shimmer effect on hover */
```

#### Elegant (Secondary)
```css
background: charcoal;
color: cream;
box-shadow: shadow-soft;
```

#### Soft (Tertiary)
```css
background: beige;
color: charcoal;
border: 1px solid border;
```

### Cards

#### Default
```css
background: card;
border: 1px solid border;
border-radius: 1rem;
box-shadow: shadow-soft;
```

#### Luxury
```css
background: gradient-to-br from-cream to-background;
border: 1px solid gold/20;
box-shadow: shadow-gold (on hover);
```

#### Elevated
```css
background: background;
box-shadow: shadow-medium;
```

### Form Inputs
```css
height: 2.75rem (44px);
padding: 0 1rem;
background: beige;
border: 1px solid border;
border-radius: 0.5rem;
/* Focus: border-gold, ring-2 ring-gold/20 */
```

---

## Iconography

### Icon Style
- **Library:** Lucide React
- **Style:** Outlined, 1.5px stroke
- **Sizes:** 
  - Small: 16px (decorative)
  - Default: 20px (inline)
  - Large: 24px (standalone)
  - XL: 32px (features)

### Key Icons
- Crown — VIP, Premium
- Sparkles — Highlights, Points
- Gift — Rewards, Referrals
- Calendar — Bookings
- Clock — Time, Waiting
- Heart — Favorites
- Star — Ratings
- Trophy — Achievements
- Gem — Diamond tier

---

## Imagery Guidelines

### Photography Style
- Soft, warm lighting (golden hour feel)
- Close-up beauty shots
- Clean, uncluttered backgrounds (cream, white, beige)
- Feminine subjects, diverse representation
- High production value, editorial quality

### Image Treatment
- Rounded corners: 1rem - 1.5rem
- Soft shadow on hover
- Gradient overlays for text readability:
  ```css
  background: linear-gradient(180deg, transparent 0%, hsl(0 0% 0% / 0.4) 100%);
  ```

---

## User Experience Patterns

### Loading States
- Skeleton screens with shimmer effect
- Never show empty space — always placeholder
- Beige/cream shimmer gradient

### Micro-interactions
- Button press: scale(0.97)
- Card hover: translateY(-4px) + shadow increase
- Link hover: gold underline animation
- Toggle: smooth 200ms transition

### Feedback
- Toast notifications (not alerts)
- Success: Soft green with checkmark
- Error: Muted red, non-alarming
- Positioned bottom-right or top-center

### Empty States
- Elegant illustrations (optional)
- Clear headline
- Actionable CTA

---

## Responsive Design

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1400px (container max)
```

### Mobile Considerations
- Touch targets: minimum 44px
- Increased padding on mobile
- Simplified navigation (hamburger menu)
- Bottom sheets instead of modals
- Sticky CTAs at bottom

---

## Accessibility

### Contrast Requirements
- Text on backgrounds: minimum 4.5:1
- Gold on white: ensure sufficient contrast
- Interactive elements clearly distinguishable

### Focus States
- Visible focus rings (gold outline)
- Skip-to-content link
- Proper heading hierarchy
- Alt text on all images

---

## Dark Mode (Future)

### Adjustments
```css
--background: hsl(0, 0%, 12%)
--foreground: hsl(40, 33%, 95%)
--card: hsl(0, 0%, 15%)
--gold: remains same
--beige: hsl(0, 0%, 18%)
```

---

## App Flow Overview

### User Journey
1. **Home** — Hero, Services preview, Waiting List, Shop, VIP teaser, Testimonials
2. **Services** — Searchable, filterable service catalog with expandable categories
3. **Book** — 4-step flow:
   - Select Service (accordion categories)
   - Choose Artist (staff with profiles, pricing tiers)
   - Pick Date & Time (elegant calendar)
   - Confirm & Pay (deposit via Afterpay option)
4. **VIP** — Gamified loyalty dashboard:
   - Tier progress (Bronze → Diamond)
   - Achievements & badges
   - Booking history
   - Points redemption
5. **About** — Brand story, team, values

### Key Features
- Waiting list for CEO appointments
- VIP recurring bookings
- Staff tier pricing (Premium, Senior, Junior)
- Afterpay integration
- Referral program ($25 give/get)
- Shop link to Shopify

---

## Copy Guidelines

### Tone of Voice
- **Warm** yet **professional**
- **Confident** but not arrogant
- **Inviting** without being casual
- Avoid: Slang, emojis, excessive exclamation marks
- Use: Elegant phrasing, beauty industry terminology

### Example Headlines
- "Where Beauty Meets Elegance"
- "Experience Luxury, One Lash at a Time"
- "Your Beauty Journey Begins Here"
- "Join the Inner Circle"

### CTA Examples
- "Book Your Appointment"
- "Explore VIP Benefits"
- "Join Waiting List"
- "View Services"
- "Shop the Collection"

---

## File Structure

```
/src
  /assets         — Images, icons
  /components
    /booking      — ServiceAccordion, StaffSelection, AfterpayBadge
    /home         — Hero, FeaturedServices, Testimonials, VIPPreview, etc.
    /layout       — Header, Footer
    /ui           — Button, Card, Input (design system)
  /data           — services.ts, staff.ts
  /hooks          — Custom React hooks
  /pages          — Index, Services, Book, VIP, About
  /types          — TypeScript interfaces
  /lib            — Utilities
```

---

## Usage with AI Prompts

When prompting another AI to continue building this app, use:

```
Build a [FEATURE] for the Lash Mama luxury beauty booking app.

Design Requirements:
- Ultra-feminine, sophisticated aesthetic
- Color palette: Warm cream (#FFFCF7), Gold accents (#C9A871), Charcoal text (#2C2C2C)
- Typography: Cormorant Garamond for headings, Inter for body
- Generous white space, soft shadows, golden gradients
- Smooth animations (300-500ms, ease-out)
- No emojis — use elegant Lucide icons instead

Technical Stack:
- React + TypeScript + Tailwind CSS
- Semantic color tokens (use --gold, --cream, --beige, not raw colors)
- Component-based architecture
- Mobile-responsive

Reference styling from existing components for consistency.
```

---

*This style guide ensures consistency across all designers and AI tools working on Lash Mama.*
