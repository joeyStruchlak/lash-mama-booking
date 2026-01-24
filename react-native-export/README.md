# Lash Mama Mobile - React Native / Expo Router

Gold-standard React Native application structure with feature-based architecture.

## Directory Structure

```
├── app/                          # Expo Router - routing only
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Entry redirect
│   ├── (auth)/                  # Auth routes group
│   │   ├── _layout.tsx
│   │   └── login.tsx
│   ├── (client)/                # Client routes group
│   │   ├── _layout.tsx
│   │   ├── index.tsx            # Home
│   │   ├── services.tsx
│   │   ├── book.tsx
│   │   ├── vip.tsx
│   │   └── profile.tsx
│   ├── (staff)/                 # Staff routes group
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   ├── messages.tsx
│   │   └── notes.tsx
│   └── (admin)/                 # Admin routes group
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── clients.tsx
│       ├── staff.tsx
│       └── analytics.tsx
│
├── src/
│   ├── features/                # Business logic by feature
│   │   ├── client/
│   │   │   ├── home/
│   │   │   ├── services/
│   │   │   ├── booking/
│   │   │   └── vip/
│   │   ├── staff/
│   │   │   ├── dashboard/
│   │   │   ├── calendar/
│   │   │   └── messages/
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── clients/
│   │       └── analytics/
│   │
│   ├── components/              # Shared UI components
│   │   ├── ui/                  # Base components (Button, Card, etc.)
│   │   ├── layout/              # Layout components
│   │   └── common/              # Common business components
│   │
│   ├── services/                # API layer
│   │   ├── auth.api.ts
│   │   ├── booking.api.ts
│   │   └── client.api.ts
│   │
│   ├── lib/                     # Shared infrastructure
│   │   ├── supabase.ts
│   │   └── auth.ts
│   │
│   └── theme/                   # Design system
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       ├── shadows.ts
│       ├── gradients.ts
│       ├── borderRadius.ts
│       └── index.ts
│
├── app.json
├── package.json
├── tsconfig.json
└── index.ts
```

## Architecture Principles

1. **Separation of Concerns**: Routes in `app/`, logic in `src/features/`
2. **Feature Ownership**: Each feature owns its components, hooks, types, styles
3. **Theme-First Design**: All styling uses design tokens
4. **Type Safety**: Full TypeScript coverage
5. **Performance**: Memoization, lazy loading, optimized renders

## Getting Started

```bash
npm install
npx expo start
```
