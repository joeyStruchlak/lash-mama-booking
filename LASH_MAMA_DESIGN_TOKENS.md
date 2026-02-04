# Lash Mama Design System - Complete Token Reference

> Enterprise-grade design tokens for luxury beauty application  
> Last Updated: February 2025

---

## 📋 Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Sizing](#spacing--sizing)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Gradients](#gradients)
7. [Animations](#animations)
8. [Component Tokens](#component-tokens)
9. [React Native Export](#react-native-export)

---

## 🎨 Color Palette

### Primary Brand Colors (Gold)

| Token | HSL | HEX | RGB | Usage |
|-------|-----|-----|-----|-------|
| `--gold` | `37 42% 62%` | `#C9A871` | `201, 168, 113` | Primary actions, CTAs |
| `--gold-light` | `37 42% 72%` | `#D4B88A` | `212, 184, 138` | Hover states, highlights |
| `--gold-dark` | `37 42% 52%` | `#B8975F` | `184, 151, 95` | Pressed states, borders |

### Background Colors

| Token | HSL | HEX | RGB | Usage |
|-------|-----|-----|-----|-------|
| `--background` | `40 33% 99%` | `#FDFCFA` | `253, 252, 250` | Main page background |
| `--cream` | `40 43% 97%` | `#FAF7F2` | `250, 247, 242` | Card backgrounds |
| `--beige` | `38 33% 93%` | `#F5F1E8` | `245, 241, 232` | Section backgrounds |
| `--card` | `40 43% 97%` | `#FAF7F2` | `250, 247, 242` | Card surfaces |
| `--popover` | `40 43% 97%` | `#FAF7F2` | `250, 247, 242` | Dropdown/modal backgrounds |
| `--secondary` | `40 33% 95%` | `#F8F5EE` | `248, 245, 238` | Secondary surfaces |
| `--muted` | `40 20% 93%` | `#F0EDE6` | `240, 237, 230` | Disabled backgrounds |

### Text Colors

| Token | HSL | HEX | RGB | Usage |
|-------|-----|-----|-----|-------|
| `--foreground` | `0 0% 17%` | `#2C2C2C` | `44, 44, 44` | Primary text |
| `--charcoal` | `0 0% 17%` | `#2C2C2C` | `44, 44, 44` | Headings |
| `--charcoal-light` | `0 0% 35%` | `#595959` | `89, 89, 89` | Secondary text |
| `--muted-foreground` | `0 0% 45%` | `#737373` | `115, 115, 115` | Placeholder/helper text |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | `255, 255, 255` | Text on gold buttons |

### Border Colors

| Token | HSL | HEX | RGB | Usage |
|-------|-----|-----|-----|-------|
| `--border` | `40 20% 88%` | `#E6E0D4` | `230, 224, 212` | Default borders |
| `--input` | `40 20% 88%` | `#E6E0D4` | `230, 224, 212` | Input borders |
| `--ring` | `37 42% 62%` | `#C9A871` | `201, 168, 113` | Focus ring color |

### Status Colors

| Token | HSL | HEX | RGB | Usage |
|-------|-----|-----|-----|-------|
| `--success` | `100 20% 73%` | `#B8D4A3` | `184, 212, 163` | Success states |
| `--destructive` | `0 72% 51%` | `#E53E3E` | `229, 62, 62` | Error/delete actions |
| `--warning` | (implied) | `#F59E0B` | `245, 158, 11` | Warning states |
| `--info` | (implied) | `#3B82F6` | `59, 130, 246` | Info states |

### Dark Mode Colors

| Token | HSL (Dark) | HEX | Usage |
|-------|------------|-----|-------|
| `--background` | `0 0% 12%` | `#1F1F1F` | Dark background |
| `--card` | `0 0% 15%` | `#262626` | Dark card |
| `--border` | `0 0% 22%` | `#383838` | Dark borders |
| `--muted-foreground` | `40 20% 65%` | `#B8A894` | Dark muted text |

---

## ✍️ Typography

### Font Families

```css
--font-serif: 'Cormorant Garamond', Georgia, serif;
--font-sans: 'Inter', system-ui, sans-serif;
```

| Token | Value | Usage |
|-------|-------|-------|
| `font-serif` | Cormorant Garamond | Headings, display text, luxury feel |
| `font-sans` | Inter | Body text, UI elements, labels |

### Font Sizes

| Class | Size (px) | Size (rem) | Line Height | Usage |
|-------|-----------|------------|-------------|-------|
| `text-xs` | 12px | 0.75rem | 1rem (16px) | Labels, captions |
| `text-sm` | 14px | 0.875rem | 1.25rem (20px) | Small body text |
| `text-base` | 16px | 1rem | 1.5rem (24px) | Default body text |
| `text-lg` | 18px | 1.125rem | 1.75rem (28px) | Large body |
| `text-xl` | 20px | 1.25rem | 1.75rem (28px) | Subheadings |
| `text-2xl` | 24px | 1.5rem | 2rem (32px) | Section headings |
| `text-3xl` | 30px | 1.875rem | 2.25rem (36px) | Page headings |
| `text-4xl` | 36px | 2.25rem | 2.5rem (40px) | Hero headings |
| `text-5xl` | 48px | 3rem | 1 | Display |
| `text-6xl` | 60px | 3.75rem | 1 | Large display |

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-light` | 300 | Subtle text |
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Emphasized text |
| `font-semibold` | 600 | Headings, labels |
| `font-bold` | 700 | Strong emphasis |

### Letter Spacing

| Class | Value | Usage |
|-------|-------|-------|
| `tracking-tighter` | -0.05em | Display headings |
| `tracking-tight` | -0.025em | Headings |
| `tracking-normal` | 0em | Body text |
| `tracking-wide` | 0.025em | Buttons, labels |
| `tracking-wider` | 0.05em | Caps, badges |
| `tracking-widest` | 0.1em | Uppercase labels |

### Line Heights

| Class | Value | Usage |
|-------|-------|-------|
| `leading-none` | 1 | Display text |
| `leading-tight` | 1.25 | Headings |
| `leading-snug` | 1.375 | Subheadings |
| `leading-normal` | 1.5 | Body text |
| `leading-relaxed` | 1.625 | Large body text |
| `leading-loose` | 2 | Spacious text |

---

## 📐 Spacing & Sizing

### Base Spacing Scale (4px base unit)

| Token | Value (px) | Value (rem) | Class |
|-------|------------|-------------|-------|
| 0 | 0px | 0rem | `p-0`, `m-0` |
| 0.5 | 2px | 0.125rem | `p-0.5`, `m-0.5` |
| 1 | 4px | 0.25rem | `p-1`, `m-1` |
| 1.5 | 6px | 0.375rem | `p-1.5`, `m-1.5` |
| 2 | 8px | 0.5rem | `p-2`, `m-2` |
| 2.5 | 10px | 0.625rem | `p-2.5`, `m-2.5` |
| 3 | 12px | 0.75rem | `p-3`, `m-3` |
| 3.5 | 14px | 0.875rem | `p-3.5`, `m-3.5` |
| 4 | 16px | 1rem | `p-4`, `m-4` |
| 5 | 20px | 1.25rem | `p-5`, `m-5` |
| 6 | 24px | 1.5rem | `p-6`, `m-6` |
| 7 | 28px | 1.75rem | `p-7`, `m-7` |
| 8 | 32px | 2rem | `p-8`, `m-8` |
| 9 | 36px | 2.25rem | `p-9`, `m-9` |
| 10 | 40px | 2.5rem | `p-10`, `m-10` |
| 11 | 44px | 2.75rem | `p-11`, `m-11` |
| 12 | 48px | 3rem | `p-12`, `m-12` |
| 14 | 56px | 3.5rem | `p-14`, `m-14` |
| 16 | 64px | 4rem | `p-16`, `m-16` |
| 18 | 72px | 4.5rem | `p-18`, `m-18` |
| 20 | 80px | 5rem | `p-20`, `m-20` |
| 22 | 88px | 5.5rem | `p-22`, `m-22` |
| 24 | 96px | 6rem | `p-24`, `m-24` |

### Component-Specific Spacing

| Component | Property | Value |
|-----------|----------|-------|
| Container | Max Width | 1400px |
| Container | Padding | 24px (1.5rem) |
| Card | Padding | 24px (1.5rem) |
| Button (default) | Height | 44px (2.75rem) |
| Button (default) | Padding X | 24px (1.5rem) |
| Button (sm) | Height | 36px (2.25rem) |
| Button (sm) | Padding X | 16px (1rem) |
| Button (lg) | Height | 56px (3.5rem) |
| Button (lg) | Padding X | 32px (2rem) |
| Button (xl) | Height | 64px (4rem) |
| Button (xl) | Padding X | 40px (2.5rem) |
| Input | Height | 44px (2.75rem) |
| Input | Padding X | 12px (0.75rem) |

---

## 🔘 Border Radius

### Base Radius

```css
--radius: 1rem; /* 16px */
```

### Radius Scale

| Token | Value (px) | Value (rem) | Class | Usage |
|-------|------------|-------------|-------|-------|
| sm | 12px | 0.75rem | `rounded-sm` | Small buttons, chips |
| md | 14px | 0.875rem | `rounded-md` | Inputs |
| lg | 16px | 1rem | `rounded-lg` | Default radius |
| xl | 20px | 1.25rem | `rounded-xl` | Buttons |
| 2xl | 24px | 1.5rem | `rounded-2xl` | Cards |
| 3xl | 32px | 2rem | `rounded-3xl` | Large cards, modals |
| full | 9999px | 9999px | `rounded-full` | Pills, avatars |

### Component Radius Mapping

| Component | Radius Value | Class |
|-----------|--------------|-------|
| Button (default) | 20px | `rounded-xl` |
| Button (sm) | 8px | `rounded-lg` |
| Button (lg/xl) | 20px | `rounded-xl` |
| Button (icon) | 20px | `rounded-xl` |
| Card | 24px | `rounded-2xl` |
| Input | 16px | `rounded-lg` |
| Badge | 9999px | `rounded-full` |
| Avatar | 9999px | `rounded-full` |
| Modal | 24px | `rounded-2xl` |
| Dropdown | 16px | `rounded-lg` |
| Tooltip | 8px | `rounded-lg` |

---

## 🌑 Shadows

### Shadow Definitions

| Token | CSS Value | Usage |
|-------|-----------|-------|
| `shadow-soft` | `0 4px 24px -4px hsl(0 0% 0% / 0.08)` | Subtle elevation |
| `shadow-medium` | `0 8px 32px -8px hsl(0 0% 0% / 0.12)` | Cards, dropdowns |
| `shadow-gold` | `0 8px 24px -4px hsl(37 42% 62% / 0.25)` | Gold glow, luxury buttons |
| `shadow-inner-soft` | `inset 0 2px 4px 0 hsl(0 0% 0% / 0.05)` | Pressed inputs |

### Shadow Breakdown

```
shadow-soft:
├── Offset X: 0
├── Offset Y: 4px
├── Blur: 24px
├── Spread: -4px
└── Color: rgba(0, 0, 0, 0.08)

shadow-medium:
├── Offset X: 0
├── Offset Y: 8px
├── Blur: 32px
├── Spread: -8px
└── Color: rgba(0, 0, 0, 0.12)

shadow-gold:
├── Offset X: 0
├── Offset Y: 8px
├── Blur: 24px
├── Spread: -4px
└── Color: rgba(201, 168, 113, 0.25)
```

---

## 🌈 Gradients

### Gradient Definitions

| Token | CSS Value | Usage |
|-------|-----------|-------|
| `--gradient-hero` | `linear-gradient(180deg, #FAF7F2 0%, #F5F1E8 100%)` | Hero sections |
| `--gradient-gold` | `linear-gradient(135deg, #B8975F 0%, #C9A871 50%, #D4B88A 100%)` | Primary buttons |
| `--gradient-gold-radial` | `radial-gradient(ellipse at center, #D4B88A 0%, #C9A871 50%, #B8975F 100%)` | Circular elements |
| `--gradient-gold-shimmer` | `linear-gradient(110deg, #B8975F 0%, #D4B88A 25%, #B8975F 50%, #D4B88A 75%, #B8975F 100%)` | Animated shimmer |
| `--gradient-gold-soft` | `linear-gradient(180deg, rgba(201,168,113,0.1) 0%, rgba(212,184,138,0.05) 100%)` | Subtle backgrounds |
| `--gradient-overlay` | `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)` | Image overlays |
| `--gradient-luxury` | `linear-gradient(135deg, #FAF7F2 0%, rgba(201,168,113,0.1) 50%, #FAF7F2 100%)` | Luxury cards |
| `--gradient-feminine` | `linear-gradient(135deg, #FCF5F5 0%, rgba(201,168,113,0.08) 50%, #FAF7F2 100%)` | Soft feminine accent |

### Gradient CSS Classes

```css
.bg-gradient-hero    /* Hero background gradient */
.bg-gradient-gold    /* Gold button gradient */
.bg-gradient-luxury  /* Luxury card background */
.bg-gradient-feminine /* Soft pink-gold */
.text-gradient-gold  /* Text with gold gradient fill */
.border-gradient-gold /* Border with gold gradient */
```

---

## ✨ Animations

### Timing Functions

```css
--ease-luxury: cubic-bezier(0.4, 0, 0.2, 1);  /* Smooth, elegant */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Playful bounce */
```

### Animation Presets

| Class | Keyframes | Duration | Easing | Usage |
|-------|-----------|----------|--------|-------|
| `animate-fade-up` | 0→24px Y, 0→1 opacity | 0.6s | ease-luxury | Page entry |
| `animate-fade-in` | 0→1 opacity | 0.5s | ease-luxury | Subtle entry |
| `animate-scale-in` | 0.9→1 scale, 0→1 opacity | 0.4s | ease-bounce | Modal entry |
| `animate-slide-up` | 100%→0 Y, 0→1 opacity | 0.5s | ease-luxury | Bottom sheet |
| `animate-shimmer` | background-position cycle | 2s | linear, infinite | Loading state |
| `animate-float` | 0→-8px→0 Y | 3s | ease-in-out, infinite | Floating elements |
| `animate-spin-slow` | 0→360deg rotation | 4s | linear, infinite | Slow spinner |

### Stagger Delays

```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
```

### Utility Classes

```css
.hover-lift    /* translateY(-4px) + shadow-medium on hover */
.press-scale   /* scale(0.97) on active */
```

---

## 🧩 Component Tokens

### Button Variants

| Variant | Background | Text | Border | Shadow |
|---------|------------|------|--------|--------|
| `default` | `bg-primary` (#C9A871) | `text-primary-foreground` (#FFF) | none | `shadow-soft` → `shadow-gold` on hover |
| `luxury` | `gradient-gold` | `text-primary-foreground` (#FFF) | none | `shadow-gold` |
| `outline` | transparent | `text-foreground` (#2C2C2C) | `border-2 border-primary` | none |
| `secondary` | `bg-secondary` (#F8F5EE) | `text-secondary-foreground` (#2C2C2C) | none | none |
| `ghost` | transparent | inherits | none | none |
| `elegant` | `bg-charcoal` (#2C2C2C) | `text-cream` (#FAF7F2) | none | `shadow-soft` |
| `soft` | `bg-beige` (#F5F1E8) | `text-charcoal` (#2C2C2C) | `border border-border` | none |
| `destructive` | `bg-destructive` (#E53E3E) | `text-destructive-foreground` (#FFF) | none | none |

### Card Variants

| Variant | Background | Border | Shadow |
|---------|------------|--------|--------|
| `default` | `bg-card` (#FAF7F2) | none | `shadow-soft` |
| `luxury` | `bg-cream` (#FAF7F2) | `border border-border/50` | `shadow-medium` |
| `elevated` | `bg-card` (#FAF7F2) | none | `shadow-medium` → `shadow-gold` on hover |

### Input Styling

| Property | Value |
|----------|-------|
| Height | 44px (h-11) |
| Border | `border border-input` (#E6E0D4) |
| Border Radius | 16px (rounded-lg) |
| Background | `bg-background` (#FDFCFA) |
| Focus Ring | `ring-2 ring-ring` (#C9A871) |
| Placeholder | `text-muted-foreground` (#737373) |

---

## 📱 React Native Export

### TypeScript Theme Object

```typescript
// react-native-export/src/theme/tokens.ts

export const tokens = {
  colors: {
    // Primary
    gold: {
      DEFAULT: '#C9A871',
      light: '#D4B88A',
      dark: '#B8975F',
      muted: 'rgba(201, 168, 113, 0.6)',
      subtle: 'rgba(201, 168, 113, 0.15)',
    },
    
    // Backgrounds
    background: '#FDFCFA',
    cream: {
      DEFAULT: '#FAF7F2',
      light: '#FDFCFA',
      dark: '#F5F1E8',
    },
    beige: {
      DEFAULT: '#F5F1E8',
      light: '#F8F5EE',
      dark: '#EDE7DB',
    },
    
    // Text
    charcoal: {
      DEFAULT: '#2C2C2C',
      light: '#595959',
      dark: '#1A1A1A',
    },
    
    // Semantic
    foreground: '#2C2C2C',
    muted: {
      DEFAULT: '#F0EDE6',
      foreground: '#737373',
    },
    border: '#E6E0D4',
    
    // Status
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  fonts: {
    serif: Platform.select({
      ios: 'Georgia',
      android: 'serif',
    }),
    sans: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
  },

  fontSizes: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  spacing: {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
  },

  borderRadius: {
    sm: 4,
    DEFAULT: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  shadows: {
    // iOS
    ios: {
      soft: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      gold: {
        shadowColor: '#C9A871',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
    },
    // Android
    android: {
      soft: { elevation: 2 },
      medium: { elevation: 4 },
      gold: { elevation: 6 },
    },
  },

  gradients: {
    gold: ['#B8975F', '#C9A871', '#D4B88A'],
    hero: ['#FAF7F2', '#F5F1E8'],
    cream: ['#FDFCFA', '#F5F1E8'],
    vip: ['#D4B88A', '#C9A871', '#B8975F'],
  },

  animation: {
    easeLuxury: [0.4, 0, 0.2, 1],
    easeBounce: [0.34, 1.56, 0.64, 1],
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
      luxury: 600,
    },
  },
} as const;

export type Tokens = typeof tokens;
```

---

## 📋 Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│                 LASH MAMA DESIGN TOKENS                 │
├─────────────────────────────────────────────────────────┤
│  COLORS                                                 │
│  ├─ Gold:     #C9A871 (primary)                        │
│  ├─ Cream:    #FAF7F2 (background)                     │
│  ├─ Beige:    #F5F1E8 (surface)                        │
│  ├─ Charcoal: #2C2C2C (text)                           │
│  └─ Border:   #E6E0D4                                  │
├─────────────────────────────────────────────────────────┤
│  TYPOGRAPHY                                             │
│  ├─ Heading: Cormorant Garamond (serif)                │
│  ├─ Body:    Inter (sans-serif)                        │
│  └─ Base:    16px / 4px unit                           │
├─────────────────────────────────────────────────────────┤
│  SPACING (4px base)                                     │
│  1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px │
├─────────────────────────────────────────────────────────┤
│  RADIUS                                                 │
│  ├─ Button:  20px (rounded-xl)                         │
│  ├─ Card:    24px (rounded-2xl)                        │
│  ├─ Input:   16px (rounded-lg)                         │
│  └─ Pill:    9999px (rounded-full)                     │
├─────────────────────────────────────────────────────────┤
│  SHADOWS                                                │
│  ├─ Soft:    0 4px 24px -4px rgba(0,0,0,0.08)         │
│  ├─ Medium:  0 8px 32px -8px rgba(0,0,0,0.12)         │
│  └─ Gold:    0 8px 24px -4px rgba(201,168,113,0.25)   │
├─────────────────────────────────────────────────────────┤
│  BUTTON HEIGHTS                                         │
│  sm: 36px │ default: 44px │ lg: 56px │ xl: 64px       │
└─────────────────────────────────────────────────────────┘
```

---

*Document generated from src/index.css and tailwind.config.ts*
