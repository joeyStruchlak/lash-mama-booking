import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Database, Server, Smartphone, Shield, Users, Calendar, 
  CreditCard, Star, MessageSquare, Bell, BarChart3, Lock,
  ArrowDown, Check, AlertTriangle, Workflow,
  Layers, GitBranch, Zap, Eye, FileCode, Box, RefreshCw
} from "lucide-react";

const Architecture = () => {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-charcoal/80 border-b border-gold/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-gold font-semibold">Lash Mama</h1>
              <p className="text-sm text-cream/60">Production-Grade Architecture Documentation v1.0</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-gold/50 text-gold bg-gold/10">
                Staff-Level Engineering Standards
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                Production Ready
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
          <TabsList className="bg-charcoal-light/50 border border-gold/20 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              <Eye className="w-4 h-4 mr-2" />System Overview
            </TabsTrigger>
            <TabsTrigger value="architecture" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              <Layers className="w-4 h-4 mr-2" />Architecture Layers
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              <Database className="w-4 h-4 mr-2" />Database Schema
            </TabsTrigger>
            <TabsTrigger value="auth" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              <Shield className="w-4 h-4 mr-2" />Auth & RLS
            </TabsTrigger>
            <TabsTrigger value="flows" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              <Workflow className="w-4 h-4 mr-2" />User Flows
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              <Server className="w-4 h-4 mr-2" />API & Edge Functions
            </TabsTrigger>
            <TabsTrigger value="screens" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              <Smartphone className="w-4 h-4 mr-2" />Screen Architecture
            </TabsTrigger>
            <TabsTrigger value="components" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              <Box className="w-4 h-4 mr-2" />Components
            </TabsTrigger>
          </TabsList>

          {/* SYSTEM OVERVIEW */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-charcoal-light/50 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Executive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-cream/80">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-cream/50">Product:</span> Lash Mama</div>
                    <div><span className="text-cream/50">Platform:</span> React Native (Expo)</div>
                    <div><span className="text-cream/50">Backend:</span> Supabase</div>
                    <div><span className="text-cream/50">Payments:</span> Stripe + Afterpay</div>
                  </div>
                  <Separator className="bg-gold/20" />
                  <p className="text-sm">
                    Premium luxury mobile experience for booking and managing lash & beauty services 
                    with powerful operational tools and comprehensive business intelligence.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-charcoal-light/50 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Users className="w-5 h-5" /> Target Users
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-cream/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-cream font-medium">Client</div>
                      <div className="text-sm text-cream/60">Booking, VIP access, appointment management</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-cream/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-cream font-medium">Manager</div>
                      <div className="text-sm text-cream/60">Operations, scheduling, client management</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-cream/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                      <Star className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="text-cream font-medium">Admin (Lash Mama)</div>
                      <div className="text-sm text-cream/60">Full control, analytics, god-mode privileges</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Non-Negotiable Requirements */}
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Non-Negotiable Architecture Principles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: Shield, title: "RLS-First Security", desc: "All authorization at database level (zero trust)" },
                    { icon: CreditCard, title: "Payment-Before-Booking", desc: "No appointment confirmed without payment" },
                    { icon: Database, title: "Audit Everything", desc: "Critical actions logged for compliance" },
                    { icon: RefreshCw, title: "Soft Deletes", desc: "Retain data unless GDPR deletion required" },
                    { icon: Check, title: "Idempotency", desc: "All state-changing operations safe to retry" },
                    { icon: GitBranch, title: "Role-Based Routing", desc: "Four distinct navigation trees" },
                    { icon: Star, title: "Luxury UX", desc: "Premium design, gold accents, blur effects" },
                    { icon: Zap, title: "Performance-First", desc: "Pagination, caching, FlatList everywhere" },
                    { icon: FileCode, title: "Separation of Concerns", desc: ".tsx, .styles.ts, .types.ts, .api.ts, .hooks.ts" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-cream/5 rounded-lg border border-gold/10">
                      <item.icon className="w-5 h-5 text-gold mb-2" />
                      <div className="text-cream font-medium text-sm">{item.title}</div>
                      <div className="text-cream/60 text-xs mt-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* High-Level System Diagram */}
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">High-Level System Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              LASH MAMA SYSTEM ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐           │
│  │   CLIENT    │    │   MANAGER   │    │    ADMIN    │    │   GUEST     │           │
│  │    APP      │    │     APP     │    │     APP     │    │   (READ)    │           │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘           │
│         │                  │                  │                  │                   │
│         └──────────────────┼──────────────────┼──────────────────┘                   │
│                            │                  │                                      │
│                            ▼                  ▼                                      │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │                           PRESENTATION LAYER                                   │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │ React Native + Expo Router │ Reanimated │ LinearGradient │ SecureStore │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │  │
│  │  │Booking  │ │Calendar │ │VIP      │ │Messages │ │Analytics│ │Settings │     │  │
│  │  │Engine   │ │System   │ │Program  │ │& Chat   │ │Reports  │ │Admin    │     │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘     │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                         │                                            │
│                                         ▼                                            │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │                              API SERVICE LAYER                                 │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐       │  │
│  │  │auth.api.ts│ │appt.api.ts│ │vip.api.ts │ │pay.api.ts │ │msg.api.ts │       │  │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘       │  │
│  │                                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  TanStack Query (Caching) │ Zustand (State) │ React Hook Form (Forms)  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                         │                                            │
│                                         ▼                                            │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │                            SUPABASE CLOUD                                      │  │
│  │  ┌────────────────────────────┐  ┌────────────────────────────┐              │  │
│  │  │      EDGE FUNCTIONS        │  │       SUPABASE AUTH        │              │  │
│  │  │  ┌──────────────────────┐  │  │  ┌──────────────────────┐  │              │  │
│  │  │  │create-payment-intent │  │  │  │ JWT (1hr) + Refresh  │  │              │  │
│  │  │  │webhook-stripe        │  │  │  │ SecureStore Storage  │  │              │  │
│  │  │  │create-staff-account  │  │  │  │ Auto Token Refresh   │  │              │  │
│  │  │  │send-notification     │  │  │  └──────────────────────┘  │              │  │
│  │  │  │check-vip-status      │  │  └────────────────────────────┘              │  │
│  │  │  └──────────────────────┘  │                                               │  │
│  │  └────────────────────────────┘                                               │  │
│  │                                                                               │  │
│  │  ┌────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │                      POSTGRESQL + ROW LEVEL SECURITY                    │  │  │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │  │  │
│  │  │  │ profiles │ │ staff    │ │ services │ │ appts    │ │ payments │     │  │  │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │  │  │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │  │  │
│  │  │  │ vip_     │ │ client_  │ │ messages │ │ notifi-  │ │ audit_   │     │  │  │
│  │  │  │ members  │ │ notes    │ │          │ │ cations  │ │ logs     │     │  │  │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │  │  │
│  │  └────────────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                               │  │
│  │  ┌──────────────────────┐  ┌──────────────────────┐                          │  │
│  │  │   SUPABASE STORAGE   │  │   SUPABASE REALTIME  │                          │  │
│  │  │  Avatars, Documents  │  │  Live Updates, Chat  │                          │  │
│  │  └──────────────────────┘  └──────────────────────┘                          │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                         │                                            │
│                                         ▼                                            │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │                          EXTERNAL INTEGRATIONS                                 │  │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                     │  │
│  │  │    STRIPE     │  │   AFTERPAY    │  │   SENDGRID    │                     │  │
│  │  │   Payments    │  │ Installments  │  │    Email      │                     │  │
│  │  └───────────────┘  └───────────────┘  └───────────────┘                     │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ARCHITECTURE LAYERS */}
          <TabsContent value="architecture" className="space-y-8">
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">4-Layer Authorization (Defense in Depth)</CardTitle>
                <CardDescription className="text-cream/60">
                  Authorization enforcement from Database → API → Navigation → UI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          AUTHORIZATION ENFORCEMENT LAYERS                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │ LAYER 4: COMPONENT LEVEL (UX Only - Can Be Bypassed)                          │  │
│  │ ────────────────────────────────────────────────────────────────────────────  │  │
│  │  {user.role === 'admin' && <Button>Delete Client</Button>}                   │  │
│  │  Purpose: Hide/show buttons based on role                                    │  │
│  │  Security: ❌ None (can be modified by user)                                 │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                         ▲                                            │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │ LAYER 3: NAVIGATION GUARDS (UX Only - Can Be Bypassed)                        │  │
│  │ ────────────────────────────────────────────────────────────────────────────  │  │
│  │  if (user?.role !== 'admin') { return <Redirect href="/client/home" />; }    │  │
│  │  Purpose: Prevent unauthorized screen access                                 │  │
│  │  Security: ❌ None (URL can be manually entered)                             │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                         ▲                                            │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │ LAYER 2: API SERVICE LAYER (Validation + Better Errors)                       │  │
│  │ ────────────────────────────────────────────────────────────────────────────  │  │
│  │  if (!user) throw new UnauthorizedError();                                    │  │
│  │  if (user.role === 'client') query = query.eq('client_id', user.id);         │  │
│  │  Purpose: Role-specific queries, better error messages                       │  │
│  │  Security: ⚠️  Secondary (can be bypassed by direct API calls)               │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                         ▲                                            │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │ LAYER 1: DATABASE RLS (PRIMARY ENFORCEMENT - CANNOT BE BYPASSED)              │  │
│  │ ════════════════════════════════════════════════════════════════════════════  │  │
│  │  CREATE POLICY "Clients can read own appointments"                           │  │
│  │  ON appointments FOR SELECT                                                  │  │
│  │  USING (auth.uid() = client_id);                                             │  │
│  │                                                                               │  │
│  │  Purpose: ONLY source of truth for authorization                             │  │
│  │  Security: ✅ ABSOLUTE (enforced at database level)                          │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                      │
│  ═══════════════════════════════════════════════════════════════════════════════    │
│  GOLDEN RULE: Even if hacker modifies app to show admin buttons, RLS rejects call  │
│  ═══════════════════════════════════════════════════════════════════════════════    │
└─────────────────────────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Project Structure */}
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Project Directory Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
lash-mama/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Auth flow (unauthenticated)
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (client)/                 # Client app - 5 Tab Navigator
│   │   ├── _layout.tsx           
│   │   ├── home.tsx              
│   │   ├── appointments.tsx      
│   │   ├── book/                 # Multi-step booking wizard
│   │   │   ├── select-service.tsx
│   │   │   ├── select-artist.tsx 
│   │   │   ├── select-time.tsx   
│   │   │   ├── allergy-form.tsx  # First-time only
│   │   │   └── payment.tsx       
│   │   ├── vip.tsx               
│   │   └── more.tsx              
│   ├── (manager)/                # Manager app - 4 Tab Navigator
│   │   ├── _layout.tsx           
│   │   ├── home.tsx              
│   │   ├── calendar.tsx          
│   │   ├── clients.tsx           # No revenue access
│   │   └── more.tsx              
│   ├── (admin)/                  # Admin app - 5 Tab Navigator
│   │   ├── _layout.tsx           
│   │   ├── home.tsx              # Revenue dashboard
│   │   ├── calendar.tsx          
│   │   ├── clients.tsx           
│   │   ├── analytics.tsx         
│   │   └── more.tsx              # Staff, VIP, Settings
│   └── _layout.tsx               # Root layout (auth check + role routing)
├── src/
│   ├── lib/                      # Core utilities
│   │   └── supabase.ts           # Supabase client with SecureStore
│   ├── services/                 # API layer (role-agnostic)
│   │   ├── auth.api.ts           
│   │   ├── appointments.api.ts   
│   │   ├── services.api.ts       
│   │   ├── staff.api.ts          
│   │   ├── vip.api.ts            
│   │   └── payments.api.ts       
│   ├── types/                    # TypeScript definitions
│   │   ├── database.types.ts     # Generated from Supabase
│   │   └── models.ts             
│   ├── components/
│   │   ├── shared/               # Reusable UI components
│   │   └── layout/               
│   ├── features/                 # Feature-specific code (by role)
│   │   ├── client/
│   │   ├── manager/
│   │   └── admin/
│   ├── theme/                    # Design tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts              
│   └── hooks/                    # Global hooks
├── supabase/
│   ├── functions/                # Edge functions
│   │   ├── create-payment-intent/
│   │   ├── webhook-stripe/
│   │   ├── create-staff-account/
│   │   └── send-notification/
│   └── migrations/               
└── assets/                       
                  `}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DATABASE SCHEMA */}
          <TabsContent value="database" className="space-y-8">
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Entity Relationship Diagram (ERD)</CardTitle>
                <CardDescription className="text-cream/60">
                  Complete database schema with relationships and RLS indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                   DATABASE SCHEMA                                    │
│                              PostgreSQL + Row Level Security                         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌──────────────────────┐         ┌──────────────────────┐                         │
│  │     auth.users       │         │      profiles        │  RLS: ✓                 │
│  │   (Supabase Auth)    │────1:1──│                      │                         │
│  ├──────────────────────┤         ├──────────────────────┤                         │
│  │ id         UUID PK   │         │ id         UUID PK   │──FK→ auth.users         │
│  │ email      TEXT      │         │ role       ENUM      │  client|manager|admin   │
│  │ password   (hashed)  │         │ full_name  TEXT      │                         │
│  │ created_at TIMESTAMP │         │ phone      TEXT UQ   │                         │
│  └──────────────────────┘         │ birthday   DATE      │                         │
│                                   │ blocked    BOOL      │                         │
│                                   │ deleted_at TIMESTAMP │  Soft delete            │
│                                   └──────────┬───────────┘                         │
│                                              │                                      │
│                     ┌────────────────────────┼────────────────────────┐             │
│                     │                        │                        │             │
│                     ▼                        ▼                        ▼             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐      │
│  │       staff          │  │  client_preferences  │  │   client_notes       │      │
│  ├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤      │
│  │ id         UUID PK   │  │ id         UUID PK   │  │ id         UUID PK   │      │
│  │ title      TEXT      │  │ client_id  UUID FK   │  │ client_id  UUID FK   │      │
│  │ bio        TEXT      │  │ preferred_staff UUID │  │ staff_id   UUID FK   │      │
│  │ specialties TEXT[]   │  │ internal_notes TEXT  │  │ note       TEXT      │      │
│  │ level      ENUM      │  └──────────────────────┘  │ is_private BOOL      │      │
│  │ is_bookable BOOL     │                            └──────────────────────┘      │
│  │ commission  DECIMAL  │                                                          │
│  └──────────┬───────────┘                                                          │
│             │ 1:many                                                                │
│             ▼                                                                       │
│  ┌──────────────────────┐  ┌──────────────────────┐                                │
│  │   staff_schedules    │  │   staff_time_off     │                                │
│  ├──────────────────────┤  ├──────────────────────┤                                │
│  │ staff_id   UUID FK   │  │ staff_id   UUID FK   │                                │
│  │ day_of_week INT 0-6  │  │ start_date DATE      │                                │
│  │ start_time TIME      │  │ end_date   DATE      │                                │
│  │ end_time   TIME      │  │ status     ENUM      │  pending|approved|denied       │
│  │ is_working BOOL      │  │ reviewed_by UUID FK  │                                │
│  └──────────────────────┘  └──────────────────────┘                                │
│                                                                                     │
│  ┌──────────────────────┐                                                          │
│  │      services        │                                                          │
│  ├──────────────────────┤                                                          │
│  │ id         UUID PK   │                                                          │
│  │ name       TEXT      │                                                          │
│  │ description TEXT     │                                                          │
│  │ base_price DECIMAL   │                                                          │
│  │ duration   INT mins  │                                                          │
│  │ category   TEXT      │                                                          │
│  │ first_time_only BOOL │  For Full Sets only                                     │
│  │ active     BOOL      │                                                          │
│  └──────────┬───────────┘                                                          │
│             ▼                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐  │
│  │                            appointments (CORE TABLE)                          │  │
│  ├──────────────────────────────────────────────────────────────────────────────┤  │
│  │ id                UUID PK                                                    │  │
│  │ client_id         UUID FK ─────────────────────────────────► profiles        │  │
│  │ staff_id          UUID FK ─────────────────────────────────► staff           │  │
│  │ service_id        UUID FK ─────────────────────────────────► services        │  │
│  │ appointment_date  DATE                                                       │  │
│  │ appointment_time  TIME                                                       │  │
│  │ status            ENUM ──── pending | confirmed | completed | cancelled      │  │
│  │ deposit_status    ENUM ──── unpaid | paid | waived | refunded | forfeited    │  │
│  │ total_amount      DECIMAL                                                    │  │
│  │ recurring_id      UUID FK (optional)                                         │  │
│  │                                                                              │  │
│  │ UNIQUE INDEX: (staff_id, appointment_date, appointment_time)                 │  │
│  │ WHERE status IN ('confirmed', 'pending') AND deleted_at IS NULL              │  │
│  └──────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐      │
│  │    transactions      │  │    vip_members       │  │     audit_logs       │      │
│  ├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤      │
│  │ appointment UUID FK  │  │ client_id  UUID FK   │  │ user_id    UUID FK   │      │
│  │ client_id  UUID FK   │  │ status     ENUM      │  │ action     TEXT      │      │
│  │ amount     DECIMAL   │  │ current_streak INT   │  │ entity_type TEXT     │      │
│  │ type       ENUM      │  │ achieved_at TIMESTAMP│  │ old_values JSONB     │      │
│  │ status     ENUM      │  │ manually_granted BOOL│  │ new_values JSONB     │      │
│  │ stripe_id  TEXT      │  │ granted_by UUID FK   │  │ created_at TIMESTAMP │      │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────────┘      │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Enum Types */}
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Database Enums</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "user_role", values: ["client", "manager", "admin"] },
                    { name: "appointment_status", values: ["pending", "confirmed", "completed", "cancelled", "no_show"] },
                    { name: "deposit_status", values: ["unpaid", "paid", "waived", "refunded", "forfeited"] },
                    { name: "payment_method", values: ["card", "afterpay", "cash"] },
                    { name: "transaction_status", values: ["pending", "succeeded", "failed", "refunded"] },
                    { name: "booking_frequency", values: ["weekly", "biweekly", "monthly"] },
                    { name: "time_off_status", values: ["pending", "approved", "denied"] },
                    { name: "vip_status", values: ["active", "inactive", "manually_granted", "revoked"] },
                    { name: "staff_level", values: ["junior", "senior", "master"] },
                  ].map((e, i) => (
                    <div key={i} className="p-4 bg-cream/5 rounded-lg border border-gold/10">
                      <div className="text-gold font-mono text-sm mb-2">{e.name}</div>
                      <div className="flex flex-wrap gap-1">
                        {e.values.map((v, j) => (
                          <Badge key={j} variant="outline" className="text-xs border-cream/30 text-cream/70">
                            {v}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AUTH & RLS */}
          <TabsContent value="auth" className="space-y-8">
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Authentication Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              AUTHENTICATION LIFECYCLE                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌──────────────┐                                                                   │
│  │  APP LAUNCH  │                                                                   │
│  └──────┬───────┘                                                                   │
│         ▼                                                                            │
│  ┌──────────────────────────────────┐                                               │
│  │  supabase.auth.getSession()     │                                               │
│  │  Check SecureStore for tokens   │                                               │
│  └──────────────┬───────────────────┘                                               │
│        ┌────────┴────────┐                                                          │
│        ▼                 ▼                                                          │
│  ┌───────────┐    ┌─────────────────┐                                              │
│  │ No Token  │    │ Token Exists    │                                              │
│  └─────┬─────┘    └────────┬────────┘                                              │
│        │                   ▼                                                        │
│        ▼           ┌─────────────────┐                                              │
│  ┌───────────┐     │ Validate Token  │                                              │
│  │ Auth Flow │     │ (auto-refresh)  │                                              │
│  │ (Login)   │     └────────┬────────┘                                              │
│  └─────┬─────┘              │                                                        │
│        │            ┌───────┴───────┐                                                │
│        │            ▼               ▼                                                │
│        │     ┌───────────┐   ┌───────────┐                                          │
│        │     │  Valid    │   │  Invalid  │                                          │
│        │     │  Session  │   │ (Expired) │                                          │
│        │     └─────┬─────┘   └─────┬─────┘                                          │
│        │           │               │                                                 │
│        │           ▼               ▼                                                 │
│        │    ┌──────────────┐ ┌───────────┐                                          │
│        │    │Fetch Profile │ │Show Login │                                          │
│        │    │with Role     │ └───────────┘                                          │
│        │    └──────┬───────┘                                                        │
│        ▼           ▼                                                                │
│  ┌───────────────────────────────────────────────────────────────────┐             │
│  │                     ROLE-BASED ROUTING                            │             │
│  │  switch (profile.role) {                                         │             │
│  │    case 'client':  router.replace('/client/home');   break;     │             │
│  │    case 'manager': router.replace('/manager/home');  break;     │             │
│  │    case 'admin':   router.replace('/admin/home');    break;     │             │
│  │  }                                                               │             │
│  └───────────────────────────────────────────────────────────────────┘             │
│                                                                                      │
│  ════════════════════════════════════════════════════════════════════════════════   │
│  TOKEN MANAGEMENT                                                                   │
│  ────────────────                                                                   │
│  Access Token:   1 hour expiry                                                      │
│  Refresh Token:  30 days expiry                                                     │
│  Storage:        SecureStore (iOS Keychain / Android Keystore)                     │
│  ⚠️  NEVER use AsyncStorage for tokens (security violation)                        │
│  ════════════════════════════════════════════════════════════════════════════════   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">RLS Policy Matrix</CardTitle>
                <CardDescription className="text-cream/60">
                  Role-based access control enforced at database level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gold/20">
                        <th className="text-left py-3 px-4 text-gold">Table</th>
                        <th className="text-center py-3 px-4 text-cream/50">Guest</th>
                        <th className="text-center py-3 px-4 text-blue-400">Client</th>
                        <th className="text-center py-3 px-4 text-purple-400">Manager</th>
                        <th className="text-center py-3 px-4 text-gold">Admin</th>
                      </tr>
                    </thead>
                    <tbody className="text-cream/80">
                      {[
                        { table: "profiles", guest: "—", client: "Own (R/U)", manager: "All (R)", admin: "All (CRUD)" },
                        { table: "staff", guest: "R", client: "R", manager: "Own (R/U)", admin: "All (CRUD)" },
                        { table: "services", guest: "Active (R)", client: "Active (R)", manager: "All (R)", admin: "All (CRUD)" },
                        { table: "appointments", guest: "—", client: "Own (R/C/U)", manager: "Most* (R/C/U)", admin: "All (CRUD)" },
                        { table: "transactions", guest: "—", client: "Own (R)", manager: "All (R)", admin: "All (CRUD)" },
                        { table: "vip_members", guest: "—", client: "Own (R)", manager: "All (R)", admin: "All (CRUD)" },
                        { table: "messages", guest: "—", client: "Own convos", manager: "Own convos", admin: "All (R)" },
                        { table: "audit_logs", guest: "—", client: "—", manager: "—", admin: "All (R)" },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gold/10 hover:bg-cream/5">
                          <td className="py-3 px-4 font-mono text-gold/80">{row.table}</td>
                          <td className="py-3 px-4 text-center">{row.guest}</td>
                          <td className="py-3 px-4 text-center">{row.client}</td>
                          <td className="py-3 px-4 text-center">{row.manager}</td>
                          <td className="py-3 px-4 text-center">{row.admin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-cream/50 mt-4">
                  *Manager cannot see Admin's personal appointments. R=Read, C=Create, U=Update, D=Delete
                </p>
              </CardContent>
            </Card>

            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">RLS Helper Functions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
-- Check if current user has specific role
CREATE OR REPLACE FUNCTION auth.has_role(required_role text)
RETURNS boolean AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid()) = required_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN auth.has_role('admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current user is manager or admin (staff)
CREATE OR REPLACE FUNCTION auth.is_staff()
RETURNS boolean AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid()) IN ('manager', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get admin user ID (for manager restrictions)
CREATE OR REPLACE FUNCTION auth.get_admin_id()
RETURNS uuid AS $$
BEGIN
  RETURN (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
                  `}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* USER FLOWS */}
          <TabsContent value="flows" className="space-y-8">
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <Users className="w-5 h-5" /> Client: Payment-Before-Booking Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          CLIENT: BOOKING FLOW (Payment-First)                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐      │
│  │  GUEST   │    │  SELECT  │    │  SELECT  │    │  SELECT  │    │ ALLERGY  │      │
│  │ BROWSING │───▶│ SERVICE  │───▶│  ARTIST  │───▶│DATE/TIME │───▶│  FORM*   │      │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘    └────┬─────┘      │
│       │                                                               │             │
│       │  * Can browse without login                                  ▼             │
│       │                                              ┌────────────────────────┐     │
│       │                                              │   LOGIN/SIGNUP GATE    │     │
│       │                                              │  (Required at payment) │     │
│       │                                              └───────────┬────────────┘     │
│                                                                  ▼                  │
│  ┌────────────────────────────────────────────────────────────────────────────┐    │
│  │                           PAYMENT STEP                                      │    │
│  │  1. Edge Function: create-payment-intent                                   │    │
│  │  2. Verify user authenticated                                              │    │
│  │  3. Validate slot still available (race condition check)                   │    │
│  │  4. Calculate deposit ($50 fixed)                                          │    │
│  │  5. Create Stripe PaymentIntent with metadata                              │    │
│  │  6. Return client_secret to app                                            │    │
│  └──────────────────────────────────────────────────┬─────────────────────────┘    │
│                                                      │                              │
│                          ┌───────────────────────────┴─────────────────┐            │
│                          ▼                                             ▼            │
│                ┌─────────────────┐                      ┌─────────────────┐         │
│                │ PAYMENT SUCCESS │                      │ PAYMENT FAILED  │         │
│                └────────┬────────┘                      └────────┬────────┘         │
│                         │                                        │                  │
│                         ▼                                        ▼                  │
│  ┌──────────────────────────────────────┐    ┌───────────────────────────────────┐ │
│  │  Stripe Webhook: succeeded           │    │   Show Error + Retry Option       │ │
│  │  1. Verify webhook signature         │    └───────────────────────────────────┘ │
│  │  2. Check idempotency                │                                          │
│  │  3. Validate slot STILL available    │                                          │
│  │  4a. Slot OK → Create appointment    │                                          │
│  │  4b. Slot taken → Auto-refund + email│                                          │
│  │  5. Send confirmation email/SMS      │                                          │
│  └──────────────────────────────────────┘                                          │
│                                                                                      │
│  * ALLERGY FORM: First-time clients only, required for lash services               │
│  * FIRST-TIME: Can only book "Full Sets" and "Removals" (no refills)              │
└─────────────────────────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <Star className="w-5 h-5" /> VIP Streak Calculation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            VIP STREAK CALCULATION                                    │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  TRIGGER: Appointment marked as 'completed'                                         │
│                                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │  1. Check last completed appointment for this client                         │   │
│  │     SELECT MAX(appointment_date) AS last_visit FROM appointments             │   │
│  │     WHERE client_id = NEW.client_id AND status = 'completed'                 │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                         │                                            │
│                    ┌────────────────────┴────────────────────┐                      │
│                    ▼                                         ▼                      │
│  ┌─────────────────────────────────┐      ┌─────────────────────────────────┐      │
│  │  Gap <= 21 days (3 weeks)       │      │  Gap > 21 days OR first visit   │      │
│  │  ─────────────────────────────  │      │  ─────────────────────────────  │      │
│  │  STREAK CONTINUES               │      │  STREAK RESETS                  │      │
│  │  current_streak++               │      │  current_streak = 1             │      │
│  └─────────────────┬───────────────┘      └─────────────────┬───────────────┘      │
│                    └────────────────┬────────────────────────┘                      │
│                                     ▼                                               │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │  2. Check if streak >= 10                                                    │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                    ┌────────────────────┴────────────────────┐                      │
│                    ▼                                         ▼                      │
│  ┌─────────────────────────────────┐      ┌─────────────────────────────────┐      │
│  │  current_streak >= 10           │      │  current_streak < 10            │      │
│  │  ─────────────────────────────  │      │  ─────────────────────────────  │      │
│  │  GRANT VIP STATUS               │      │  Continue building streak       │      │
│  │  • status = 'active'            │      │  • Show "X more to VIP"        │      │
│  │  • 10% discount on services     │      │                                 │      │
│  │  • Priority booking             │      │                                 │      │
│  │  • Birthday 20% discount        │      │                                 │      │
│  └─────────────────────────────────┘      └─────────────────────────────────┘      │
│                                                                                      │
│  STREAK BREAK: Cancellation or No-Show → current_streak = 0, status = 'inactive'   │
└─────────────────────────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Race Condition: Double Booking Prevention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs text-cream/80 bg-charcoal p-6 rounded-lg overflow-x-auto">
                  <pre className="whitespace-pre">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                      RACE CONDITION PREVENTION                                       │
│                  (Two Users Book Same Slot Simultaneously)                          │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  SCENARIO: User A and User B both try to book Jan 30 at 3:00 PM with Nikki         │
│                                                                                      │
│  ┌───────────────┐                                    ┌───────────────┐             │
│  │    USER A     │                                    │    USER B     │             │
│  └───────┬───────┘                                    └───────┬───────┘             │
│          │  3:00:00.001 PM                                    │  3:00:00.001 PM     │
│          ▼                                                    ▼                      │
│  ┌───────────────────────────────────────────────────────────────────────────┐      │
│  │  BOTH: Check slot availability → BOTH return "Available" (race window)   │      │
│  └───────────────────────────────────────────────────────────────────────────┘      │
│          │                                                    │                      │
│          ▼                                                    ▼                      │
│  ┌─────────────────┐                                ┌─────────────────┐             │
│  │ Payment Success │                                │ Payment Success │             │
│  └────────┬────────┘                                └────────┬────────┘             │
│           │                                                   │                      │
│           ▼                                                   ▼                      │
│  ┌─────────────────────────────┐                ┌─────────────────────────────┐     │
│  │ WEBHOOK A: Insert Appt      │                │ WEBHOOK B: Insert Appt      │     │
│  │ ✅ SUCCESS (First wins)     │                │ ❌ UNIQUE CONSTRAINT FAIL   │     │
│  └─────────────────────────────┘                └──────────────┬──────────────┘     │
│                                                                │                     │
│                                                                ▼                     │
│                                  ┌─────────────────────────────────────────────┐    │
│                                  │  AUTOMATIC RECOVERY FOR USER B              │    │
│                                  │  1. Detect error code 23505 (unique)        │    │
│                                  │  2. Immediately refund via Stripe           │    │
│                                  │  3. Send apology email                      │    │
│                                  │  4. Push notification to select new time    │    │
│                                  └─────────────────────────────────────────────┘    │
│                                                                                      │
│  DATABASE CONSTRAINT (Last Line of Defense):                                        │
│  CREATE UNIQUE INDEX idx_appointments_staff_datetime                                │
│  ON appointments (staff_id, appointment_date, appointment_time)                     │
│  WHERE status IN ('confirmed', 'pending') AND deleted_at IS NULL;                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API & EDGE FUNCTIONS */}
          <TabsContent value="api" className="space-y-8">
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Edge Functions Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "create-payment-intent", trigger: "Client reaches payment step", auth: "Authenticated", desc: "Create Stripe PaymentIntent, validate slot, return client_secret" },
                    { name: "webhook-stripe", trigger: "Stripe POST events", auth: "Webhook signature", desc: "Handle payment success/failure, create appointment, handle race conditions" },
                    { name: "create-staff-account", trigger: "Admin creates staff", auth: "Admin only", desc: "Generate temp password, create auth user, send invitation email" },
                    { name: "send-notification", trigger: "System events", auth: "System", desc: "Push notifications, emails, SMS for booking confirmations, reminders, VIP milestones" },
                  ].map((fn, i) => (
                    <div key={i} className="p-4 bg-cream/5 rounded-lg border border-gold/10">
                      <div className="text-gold font-mono text-sm mb-2">{fn.name}</div>
                      <div className="space-y-1 text-xs">
                        <div><span className="text-cream/50">Trigger:</span> <span className="text-cream/80">{fn.trigger}</span></div>
                        <div><span className="text-cream/50">Auth:</span> <span className="text-cream/80">{fn.auth}</span></div>
                        <div className="text-cream/60 mt-2">{fn.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">API Service Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "auth.api.ts", methods: ["signUp()", "signIn()", "signOut()", "getCurrentUser()", "resetPassword()"] },
                    { name: "appointments.api.ts", methods: ["getAppointments()", "createAppointment()", "updateAppointment()", "cancelAppointment()"] },
                    { name: "services.api.ts", methods: ["getServices()", "getServiceById()", "getServicePricing()"] },
                    { name: "staff.api.ts", methods: ["getStaff()", "getStaffSchedule()", "getStaffAvailability()"] },
                    { name: "vip.api.ts", methods: ["getVIPStatus()", "getVIPBenefits()", "grantVIP()", "revokeVIP()"] },
                    { name: "payments.api.ts", methods: ["createPaymentIntent()", "getTransactions()", "refundPayment()"] },
                  ].map((service, i) => (
                    <div key={i} className="p-4 bg-cream/5 rounded-lg border border-gold/10">
                      <div className="text-gold font-mono text-sm mb-3">{service.name}</div>
                      <div className="space-y-1">
                        {service.methods.map((m, j) => (
                          <div key={j} className="text-cream/70 font-mono text-xs">• {m}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SCREEN ARCHITECTURE */}
          <TabsContent value="screens" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Client Screens */}
              <Card className="bg-charcoal-light/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Users className="w-5 h-5" /> Client App
                  </CardTitle>
                  <CardDescription className="text-cream/60">5 Bottom Tabs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { tab: "Home", screens: ["Hero", "Quick Book CTA", "Next Appointment", "VIP Progress"] },
                    { tab: "Services", screens: ["Service Catalog", "Category Filters", "Service Details"] },
                    { tab: "Book", screens: ["Select Service", "Select Artist", "Select Date/Time", "Allergy Form*", "Payment", "Confirmation"] },
                    { tab: "VIP", screens: ["VIP Status", "Streak Progress", "Benefits List", "Birthday Perks"] },
                    { tab: "More", screens: ["Profile", "My Appointments", "Messages", "Notifications", "Settings"] },
                  ].map((section, i) => (
                    <div key={i} className="p-3 bg-cream/5 rounded-lg">
                      <div className="text-cream font-medium mb-2">{section.tab}</div>
                      <div className="space-y-1">
                        {section.screens.map((s, j) => (
                          <div key={j} className="text-cream/60 text-xs pl-4">• {s}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Manager Screens */}
              <Card className="bg-charcoal-light/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> Manager App
                  </CardTitle>
                  <CardDescription className="text-cream/60">4 Bottom Tabs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { tab: "Home", screens: ["Today's Schedule", "Upcoming (7 days)", "Quick Actions", "Time-Off Status"] },
                    { tab: "Calendar", screens: ["Week View", "Month View", "Day Detail", "Appointment Modal"] },
                    { tab: "Clients", screens: ["Client List", "Client Search", "Client Profile", "Add Note", "View History"] },
                    { tab: "More", screens: ["My Profile", "Messages", "Request Time-Off", "Notifications", "Settings"] },
                  ].map((section, i) => (
                    <div key={i} className="p-3 bg-cream/5 rounded-lg">
                      <div className="text-cream font-medium mb-2">{section.tab}</div>
                      <div className="space-y-1">
                        {section.screens.map((s, j) => (
                          <div key={j} className="text-cream/60 text-xs pl-4">• {s}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="p-2 bg-red-500/10 rounded border border-red-500/30">
                    <div className="text-red-400 text-xs">❌ No access to: Revenue, Analytics, Staff Management, VIP Admin</div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Screens */}
              <Card className="bg-charcoal-light/50 border-gold/30">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Star className="w-5 h-5" /> Admin App
                  </CardTitle>
                  <CardDescription className="text-cream/60">5 Bottom Tabs + Full Access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { tab: "Home", screens: ["Revenue Dashboard", "Today's Appointments", "Alerts", "Quick Actions"] },
                    { tab: "Calendar", screens: ["All Staff View", "My Calendar", "Recurring Setup", "Override Hours"] },
                    { tab: "Clients", screens: ["Full Client DB", "VIP Members", "Block/Unblock", "Manual Booking"] },
                    { tab: "Analytics", screens: ["Revenue Reports", "Booking Stats", "Staff Performance", "Export"] },
                    { tab: "More", screens: ["Staff Management", "Services Config", "VIP Rules", "Time-Off Approvals", "Settings", "Audit Logs"] },
                  ].map((section, i) => (
                    <div key={i} className="p-3 bg-cream/5 rounded-lg">
                      <div className="text-cream font-medium mb-2">{section.tab}</div>
                      <div className="space-y-1">
                        {section.screens.map((s, j) => (
                          <div key={j} className="text-cream/60 text-xs pl-4">• {s}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="p-2 bg-gold/10 rounded border border-gold/30">
                    <div className="text-gold text-xs">✅ God-mode: All client/manager features + exclusive admin controls</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Exclusive Privileges */}
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Admin Exclusive Privileges (God-Mode)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Book Without Deposit", desc: "Create appointments for clients without requiring upfront payment" },
                    { title: "Recurring Bookings", desc: "Set up weekly/biweekly/monthly recurring appointments" },
                    { title: "Grant/Revoke VIP", desc: "Manually grant or revoke VIP status, adjust streak counts" },
                    { title: "Approve Time-Off", desc: "Review and approve/deny manager time-off requests" },
                    { title: "Override Business Rules", desc: "Book outside hours, bypass cancellation rules, adjust pricing" },
                    { title: "Revenue Analytics", desc: "Full access to revenue, staff performance, and business reports" },
                  ].map((priv, i) => (
                    <div key={i} className="p-4 bg-gold/5 rounded-lg border border-gold/20">
                      <div className="text-gold font-medium text-sm mb-1">{priv.title}</div>
                      <div className="text-cream/60 text-xs">{priv.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMPONENTS */}
          <TabsContent value="components" className="space-y-8">
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Shared vs Role-Specific Components (DRY)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-cream font-medium mb-4 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" /> Shared Components
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "AppointmentCard", desc: "Appointment info display", used: ["Client", "Manager", "Admin"] },
                        { name: "CalendarView", desc: "Week/Month calendar", used: ["Client", "Manager", "Admin"] },
                        { name: "ClientCard", desc: "Client name, photo, VIP badge", used: ["Manager", "Admin"] },
                        { name: "StatsCard", desc: "Metric display", used: ["Manager", "Admin"] },
                        { name: "ServiceCard", desc: "Service name, price, duration", used: ["Client", "Admin"] },
                        { name: "VIPBadge", desc: "Gold VIP indicator", used: ["All"] },
                      ].map((comp, i) => (
                        <div key={i} className="p-3 bg-cream/5 rounded-lg border border-green-500/20">
                          <div className="text-green-400 font-mono text-sm">{comp.name}</div>
                          <div className="text-cream/60 text-xs mt-1">{comp.desc}</div>
                          <div className="flex gap-1 mt-2">
                            {comp.used.map((role, j) => (
                              <Badge key={j} variant="outline" className="text-xs border-cream/30 text-cream/70">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-cream font-medium mb-4 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gold" /> Role-Specific Components
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "RevenueChart", desc: "Revenue visualization", role: "Admin Only" },
                        { name: "VIPProgressRing", desc: "Circular progress to VIP", role: "Client Only" },
                        { name: "RecurringBookingForm", desc: "Setup recurring appointments", role: "Admin Only" },
                        { name: "TimeOffRequestForm", desc: "Request time-off", role: "Manager Only" },
                        { name: "TimeOffApprovalCard", desc: "Approve/deny time-off", role: "Admin Only" },
                        { name: "ManualBookingForm", desc: "Admin booking without deposit", role: "Admin Only" },
                      ].map((comp, i) => (
                        <div key={i} className="p-3 bg-cream/5 rounded-lg border border-gold/20">
                          <div className="text-gold font-mono text-sm">{comp.name}</div>
                          <div className="text-cream/60 text-xs mt-1">{comp.desc}</div>
                          <Badge className="mt-2 text-xs bg-gold/20 text-gold border-gold/30">
                            {comp.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Tokens */}
            <Card className="bg-charcoal-light/50 border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">Design System Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-cream font-medium mb-3">Colors</h4>
                    <div className="space-y-2">
                      {[
                        { name: "gold.DEFAULT", value: "#C9A871" },
                        { name: "gold.light", value: "#D4B88A" },
                        { name: "cream.DEFAULT", value: "#FAF7F2" },
                        { name: "beige.DEFAULT", value: "#F5F1E8" },
                        { name: "charcoal.DEFAULT", value: "#2C2C2C" },
                        { name: "success", value: "#22C55E" },
                        { name: "error", value: "#EF4444" },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: c.value }} />
                          <span className="text-cream/60 text-xs font-mono">{c.name}</span>
                          <span className="text-cream/40 text-xs">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-cream font-medium mb-3">Typography</h4>
                    <div className="space-y-2 text-cream/70 text-sm">
                      <div><span className="text-cream/40">Heading:</span> Georgia / System Serif</div>
                      <div><span className="text-cream/40">Body:</span> System / Roboto</div>
                      <div className="pt-2 space-y-1 font-mono text-xs">
                        <div>4xl: 36px | 3xl: 30px | 2xl: 24px</div>
                        <div>xl: 20px | lg: 18px | base: 16px</div>
                        <div>sm: 14px | xs: 12px</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-cream font-medium mb-3">Spacing (4px base)</h4>
                    <div className="space-y-1 text-cream/70 font-mono text-xs">
                      <div>1: 4px | 2: 8px | 3: 12px | 4: 16px</div>
                      <div>5: 20px | 6: 24px | 8: 32px</div>
                    </div>
                    <h4 className="text-cream font-medium mb-3 mt-4">Border Radius</h4>
                    <div className="space-y-1 text-cream/70 font-mono text-xs">
                      <div>button: 20px | card: 24px</div>
                      <div>input: 16px | modal: 32px</div>
                      <div>badge: 9999px (pill)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/20 py-6 mt-12">
        <div className="container mx-auto px-6 text-center text-cream/40 text-sm">
          <p>Lash Mama Architecture Documentation v1.0 • Production-Grade • Staff-Level Engineering Standards</p>
          <p className="mt-1">Document Control: Locked for Implementation • January 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Architecture;
