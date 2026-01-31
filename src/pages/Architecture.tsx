import { useState } from "react";
import { 
  Database, 
  Users, 
  Calendar, 
  CreditCard, 
  Bell, 
  Shield, 
  Smartphone,
  Server,
  Cloud,
  ArrowRight,
  ArrowDown,
  Layers,
  GitBranch,
  Box,
  Workflow,
  CircleDot,
  CheckCircle2,
  Star,
  FileText,
  BarChart3,
  MessageSquare,
  Clock,
  UserCheck,
  Settings,
  Home,
  Sparkles
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Architecture = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal">
      {/* Header */}
      <header className="border-b border-gold/20 bg-charcoal/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif text-white">Lash Mama</h1>
                <p className="text-xs text-gold">System Architecture v2.0</p>
              </div>
            </div>
            <Badge variant="outline" className="border-gold/50 text-gold">
              Enterprise Documentation
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-charcoal-light/50 border border-gold/20 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-white text-cream/70">
              System Overview
            </TabsTrigger>
            <TabsTrigger value="dataflow" className="data-[state=active]:bg-gold data-[state=active]:text-white text-cream/70">
              Data Flow
            </TabsTrigger>
            <TabsTrigger value="userflows" className="data-[state=active]:bg-gold data-[state=active]:text-white text-cream/70">
              User Journeys
            </TabsTrigger>
            <TabsTrigger value="components" className="data-[state=active]:bg-gold data-[state=active]:text-white text-cream/70">
              Components
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-gold data-[state=active]:text-white text-cream/70">
              Database Schema
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-gold data-[state=active]:text-white text-cream/70">
              API Architecture
            </TabsTrigger>
          </TabsList>

          {/* System Overview */}
          <TabsContent value="overview" className="space-y-8">
            <SystemOverviewDiagram />
          </TabsContent>

          {/* Data Flow */}
          <TabsContent value="dataflow" className="space-y-8">
            <DataFlowDiagram />
          </TabsContent>

          {/* User Journeys */}
          <TabsContent value="userflows" className="space-y-8">
            <UserJourneysDiagram />
          </TabsContent>

          {/* Components */}
          <TabsContent value="components" className="space-y-8">
            <ComponentArchitecture />
          </TabsContent>

          {/* Database */}
          <TabsContent value="database" className="space-y-8">
            <DatabaseSchema />
          </TabsContent>

          {/* API */}
          <TabsContent value="api" className="space-y-8">
            <APIArchitecture />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/20 bg-charcoal/95 py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-cream/50 text-sm">
            Lash Mama Architecture Documentation • Confidential • v2.0
          </p>
        </div>
      </footer>
    </div>
  );
};

/* ========================================
   SYSTEM OVERVIEW DIAGRAM
======================================== */
const SystemOverviewDiagram = () => {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-white">System Architecture Overview</h2>
        <p className="text-cream/60">High-level view of Lash Mama platform components</p>
      </div>

      {/* Architecture Diagram */}
      <Card className="bg-charcoal-light/30 border-gold/20 overflow-hidden">
        <CardContent className="p-8">
          {/* Client Layer */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider text-gold mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Presentation Layer
            </div>
            <div className="grid grid-cols-3 gap-4">
              <ArchBox icon={<Users className="w-5 h-5" />} title="Client App" subtitle="iOS / Android" color="blue" />
              <ArchBox icon={<Calendar className="w-5 h-5" />} title="Manager App" subtitle="iOS / Android" color="purple" />
              <ArchBox icon={<BarChart3 className="w-5 h-5" />} title="Admin App" subtitle="iOS / Android" color="amber" />
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center my-4">
            <div className="flex flex-col items-center text-gold/50">
              <ArrowDown className="w-6 h-6 animate-bounce" />
              <span className="text-xs mt-1">REST API / WebSocket</span>
            </div>
          </div>

          {/* API Gateway */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider text-gold mb-4 flex items-center gap-2">
              <Server className="w-4 h-4" />
              API Gateway Layer
            </div>
            <div className="bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 rounded-2xl p-6 border border-gold/30">
              <div className="grid grid-cols-4 gap-4">
                <MicroBox title="Auth Service" />
                <MicroBox title="Booking Engine" />
                <MicroBox title="Notification Hub" />
                <MicroBox title="Payment Gateway" />
              </div>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center my-4">
            <div className="flex flex-col items-center text-gold/50">
              <ArrowDown className="w-6 h-6 animate-bounce" />
              <span className="text-xs mt-1">Supabase Edge Functions</span>
            </div>
          </div>

          {/* Backend Services */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider text-gold mb-4 flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              Backend Services (Lovable Cloud)
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ServiceBox 
                icon={<Database className="w-6 h-6" />} 
                title="PostgreSQL Database" 
                items={["Appointments", "Users", "Services", "VIP Status"]} 
              />
              <ServiceBox 
                icon={<Shield className="w-6 h-6" />} 
                title="Auth & Security" 
                items={["JWT Tokens", "RLS Policies", "Role-based Access"]} 
              />
            </div>
          </div>

          {/* External Services */}
          <div>
            <div className="text-xs uppercase tracking-wider text-gold mb-4 flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              External Integrations
            </div>
            <div className="grid grid-cols-4 gap-4">
              <IntegrationBox title="Stripe" subtitle="Payments" />
              <IntegrationBox title="Twilio" subtitle="SMS" />
              <IntegrationBox title="SendGrid" subtitle="Email" />
              <IntegrationBox title="Apple/Google" subtitle="Push Notifications" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <div className="grid grid-cols-3 gap-6">
        <TechStackCard 
          title="Frontend" 
          items={["React Native", "Expo Router", "TypeScript", "NativeWind"]} 
        />
        <TechStackCard 
          title="Backend" 
          items={["Supabase", "PostgreSQL", "Edge Functions", "Realtime"]} 
        />
        <TechStackCard 
          title="Infrastructure" 
          items={["Lovable Cloud", "CDN", "Auto-scaling", "SSL/TLS"]} 
        />
      </div>
    </div>
  );
};

/* ========================================
   DATA FLOW DIAGRAM
======================================== */
const DataFlowDiagram = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-white">Data Flow Architecture</h2>
        <p className="text-cream/60">How data moves through the Lash Mama ecosystem</p>
      </div>

      {/* Booking Flow */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold" />
            Booking Data Flow
          </CardTitle>
          <CardDescription className="text-cream/60">
            End-to-end appointment booking process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
            <FlowStep step={1} title="Client" subtitle="Selects Service" icon={<Smartphone />} />
            <FlowArrow />
            <FlowStep step={2} title="API" subtitle="Check Availability" icon={<Server />} />
            <FlowArrow />
            <FlowStep step={3} title="Database" subtitle="Query Slots" icon={<Database />} />
            <FlowArrow />
            <FlowStep step={4} title="Stripe" subtitle="Process Payment" icon={<CreditCard />} />
            <FlowArrow />
            <FlowStep step={5} title="Confirm" subtitle="Create Booking" icon={<CheckCircle2 />} />
            <FlowArrow />
            <FlowStep step={6} title="Notify" subtitle="SMS + Push" icon={<Bell />} />
          </div>
        </CardContent>
      </Card>

      {/* Authentication Flow */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-gold" />
            Authentication Flow
          </CardTitle>
          <CardDescription className="text-cream/60">
            Secure login and session management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
            <FlowStep step={1} title="User" subtitle="Enter Credentials" icon={<Users />} />
            <FlowArrow />
            <FlowStep step={2} title="Auth Service" subtitle="Validate" icon={<Shield />} />
            <FlowArrow />
            <FlowStep step={3} title="JWT" subtitle="Generate Token" icon={<FileText />} />
            <FlowArrow />
            <FlowStep step={4} title="Role Check" subtitle="Determine Access" icon={<UserCheck />} />
            <FlowArrow />
            <FlowStep step={5} title="Navigate" subtitle="Role Dashboard" icon={<Home />} />
          </div>
        </CardContent>
      </Card>

      {/* VIP Status Flow */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-gold" />
            VIP Status Calculation
          </CardTitle>
          <CardDescription className="text-cream/60">
            Streak-based loyalty program logic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
            <FlowStep step={1} title="Appointment" subtitle="Completed" icon={<CheckCircle2 />} />
            <FlowArrow />
            <FlowStep step={2} title="Trigger" subtitle="Edge Function" icon={<Workflow />} />
            <FlowArrow />
            <FlowStep step={3} title="Calculate" subtitle="Streak Count" icon={<BarChart3 />} />
            <FlowArrow />
            <FlowStep step={4} title="Update" subtitle="VIP Tier" icon={<Star />} />
            <FlowArrow />
            <FlowStep step={5} title="Notify" subtitle="Client + Admin" icon={<Bell />} />
          </div>
        </CardContent>
      </Card>

      {/* Real-time Sync */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            Real-time Data Synchronization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <RealtimeChannel 
              title="appointments" 
              events={["INSERT", "UPDATE", "DELETE"]} 
              subscribers={["Manager Calendar", "Admin Dashboard", "Client Bookings"]}
            />
            <RealtimeChannel 
              title="notifications" 
              events={["INSERT"]} 
              subscribers={["All Connected Users"]}
            />
            <RealtimeChannel 
              title="vip_status" 
              events={["UPDATE"]} 
              subscribers={["Client Profile", "Admin VIP Panel"]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* ========================================
   USER JOURNEYS DIAGRAM
======================================== */
const UserJourneysDiagram = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-white">User Journey Maps</h2>
        <p className="text-cream/60">Complete flows for each user role</p>
      </div>

      {/* Client Journey */}
      <Card className="bg-charcoal-light/30 border-blue-500/30">
        <CardHeader className="border-b border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Client Journey
              </CardTitle>
              <CardDescription className="text-cream/60">
                Beauty appointment booking experience
              </CardDescription>
            </div>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">5 Tabs</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="flex gap-2 flex-wrap">
              <NavTab icon={<Home />} label="Home" active />
              <NavTab icon={<Sparkles />} label="Services" />
              <NavTab icon={<Calendar />} label="Book" />
              <NavTab icon={<Star />} label="VIP" />
              <NavTab icon={<Settings />} label="More" />
            </div>

            {/* Journey Flow */}
            <div className="space-y-4">
              <JourneyFlow 
                title="First-Time Booking" 
                steps={[
                  "Open App → Home Screen",
                  "Tap 'Book Now' CTA",
                  "Browse Services → Select Lash Style",
                  "Choose Manager → View Availability",
                  "Select Date & Time Slot",
                  "Review First-Time Client Notice",
                  "Enter Contact Details",
                  "Pay Deposit via Stripe",
                  "Receive Confirmation + SMS"
                ]}
              />
              <JourneyFlow 
                title="VIP Status Check" 
                steps={[
                  "Navigate to VIP Tab",
                  "View Current Streak Counter",
                  "See Next Reward Tier Progress",
                  "Browse VIP-Only Services",
                  "Redeem Available Perks"
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manager Journey */}
      <Card className="bg-charcoal-light/30 border-purple-500/30">
        <CardHeader className="border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                Manager Journey
              </CardTitle>
              <CardDescription className="text-cream/60">
                Daily operations and client management
              </CardDescription>
            </div>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">4 Tabs</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="flex gap-2 flex-wrap">
              <NavTab icon={<Home />} label="Dashboard" active color="purple" />
              <NavTab icon={<Calendar />} label="Calendar" color="purple" />
              <NavTab icon={<Users />} label="Clients" color="purple" />
              <NavTab icon={<FileText />} label="Notes" color="purple" />
            </div>

            {/* Journey Flow */}
            <div className="space-y-4">
              <JourneyFlow 
                title="Morning Routine" 
                steps={[
                  "Open App → View Dashboard",
                  "Check Today's Appointment Count",
                  "Review Time Until First Client",
                  "Tap Calendar → Daily View",
                  "Review Each Client's Notes/Allergies",
                  "Prepare Workstation"
                ]}
                color="purple"
              />
              <JourneyFlow 
                title="Client Reschedule Request" 
                steps={[
                  "Receive Push Notification",
                  "Open Reschedule Request Modal",
                  "View Client History & VIP Status",
                  "Approve/Decline with Reason",
                  "System Sends SMS to Client",
                  "Calendar Auto-Updates"
                ]}
                color="purple"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Journey */}
      <Card className="bg-charcoal-light/30 border-amber-500/30">
        <CardHeader className="border-b border-amber-500/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                Admin Journey
              </CardTitle>
              <CardDescription className="text-cream/60">
                Business oversight and strategic control
              </CardDescription>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">4 Tabs</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="flex gap-2 flex-wrap">
              <NavTab icon={<Home />} label="Dashboard" active color="amber" />
              <NavTab icon={<Users />} label="Staff" color="amber" />
              <NavTab icon={<Database />} label="Clients" color="amber" />
              <NavTab icon={<BarChart3 />} label="Analytics" color="amber" />
            </div>

            {/* Journey Flow */}
            <div className="space-y-4">
              <JourneyFlow 
                title="Weekly Business Review" 
                steps={[
                  "Open App → Admin Dashboard",
                  "Review Weekly Revenue Chart",
                  "Check Booking Completion Rate",
                  "Navigate to Analytics Tab",
                  "Compare Manager Performance",
                  "Identify Top Services by Revenue",
                  "Export Report (Coming Soon)"
                ]}
                color="amber"
              />
              <JourneyFlow 
                title="Staff Schedule Management" 
                steps={[
                  "Navigate to Staff Tab",
                  "Select Manager Profile",
                  "View Current Schedule",
                  "Approve Time-Off Request",
                  "Set Recurring Availability",
                  "System Blocks Calendar Slots"
                ]}
                color="amber"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* ========================================
   COMPONENT ARCHITECTURE
======================================== */
const ComponentArchitecture = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-white">Component Architecture</h2>
        <p className="text-cream/60">Modular design following DRY principles</p>
      </div>

      {/* Shared Components */}
      <Card className="bg-charcoal-light/30 border-gold/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-gold" />
            Shared Components (DRY)
          </CardTitle>
          <CardDescription className="text-cream/60">
            Reusable across all user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ComponentCard name="AppointmentCard" usage="Client, Manager, Admin" />
            <ComponentCard name="CalendarView" usage="Manager, Admin" />
            <ComponentCard name="ClientCard" usage="Manager, Admin" />
            <ComponentCard name="StatsCard" usage="Manager, Admin" />
            <ComponentCard name="ServiceCard" usage="Client, Admin" />
            <ComponentCard name="Badge" usage="All Roles" />
            <ComponentCard name="Button" usage="All Roles" />
            <ComponentCard name="Input" usage="All Roles" />
            <ComponentCard name="Modal" usage="All Roles" />
            <ComponentCard name="BottomSheet" usage="All Roles" />
            <ComponentCard name="Avatar" usage="All Roles" />
            <ComponentCard name="NotificationBanner" usage="All Roles" />
          </div>
        </CardContent>
      </Card>

      {/* Directory Structure */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-gold" />
            Feature-Based Directory Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-sm text-cream/80 bg-charcoal rounded-xl p-6 overflow-x-auto">
            <pre>{`src/
├── components/
│   ├── common/           # Shared UI components
│   │   ├── AppointmentCard.tsx
│   │   ├── CalendarView.tsx
│   │   ├── ClientCard.tsx
│   │   └── StatsCard.tsx
│   └── ui/               # Design system primitives
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       └── Card.tsx
│
├── features/
│   ├── auth/             # Authentication module
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api.ts
│   │
│   ├── client/           # Client-specific features
│   │   ├── booking/
│   │   ├── home/
│   │   ├── services/
│   │   └── vip/
│   │
│   ├── manager/          # Manager-specific features
│   │   ├── dashboard/
│   │   ├── calendar/
│   │   ├── clients/
│   │   └── notes/
│   │
│   └── admin/            # Admin-specific features
│       ├── dashboard/
│       ├── staff/
│       ├── clients/
│       └── analytics/
│
├── theme/                # Design tokens
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
│
├── services/             # API abstraction layer
│   ├── appointments.api.ts
│   ├── auth.api.ts
│   ├── clients.api.ts
│   └── staff.api.ts
│
└── app/                  # Expo Router
    ├── (auth)/
    ├── (client)/
    ├── (manager)/
    └── (admin)/`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Component Matrix */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white">Component Usage Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left py-3 px-4 text-gold">Component</th>
                  <th className="text-center py-3 px-4 text-blue-400">Client</th>
                  <th className="text-center py-3 px-4 text-purple-400">Manager</th>
                  <th className="text-center py-3 px-4 text-amber-400">Admin</th>
                </tr>
              </thead>
              <tbody className="text-cream/80">
                <MatrixRow name="AppointmentCard" client manager admin />
                <MatrixRow name="CalendarView" manager admin />
                <MatrixRow name="ClientCard" manager admin />
                <MatrixRow name="StatsCard" manager admin />
                <MatrixRow name="ServiceCard" client admin />
                <MatrixRow name="VIPBadge" client manager admin />
                <MatrixRow name="BookingFlow" client />
                <MatrixRow name="NotesEditor" manager admin />
                <MatrixRow name="AnalyticsChart" admin />
                <MatrixRow name="StaffScheduler" admin />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* ========================================
   DATABASE SCHEMA
======================================== */
const DatabaseSchema = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-white">Database Schema (ERD)</h2>
        <p className="text-cream/60">PostgreSQL on Lovable Cloud (Supabase)</p>
      </div>

      {/* ERD Diagram */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TableCard 
              name="users" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "email", type: "TEXT" },
                { name: "role", type: "ENUM" },
                { name: "full_name", type: "TEXT" },
                { name: "phone", type: "TEXT" },
                { name: "avatar_url", type: "TEXT" },
                { name: "created_at", type: "TIMESTAMP" },
              ]}
              relations={["→ appointments", "→ vip_status", "→ client_notes"]}
            />
            <TableCard 
              name="appointments" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "client_id", type: "UUID", fk: true },
                { name: "manager_id", type: "UUID", fk: true },
                { name: "service_id", type: "UUID", fk: true },
                { name: "start_time", type: "TIMESTAMP" },
                { name: "end_time", type: "TIMESTAMP" },
                { name: "status", type: "ENUM" },
                { name: "deposit_paid", type: "BOOLEAN" },
              ]}
              relations={["← users", "← services", "→ payments"]}
            />
            <TableCard 
              name="services" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "name", type: "TEXT" },
                { name: "category", type: "TEXT" },
                { name: "duration_min", type: "INT" },
                { name: "price", type: "DECIMAL" },
                { name: "deposit_amount", type: "DECIMAL" },
                { name: "vip_only", type: "BOOLEAN" },
              ]}
              relations={["→ appointments"]}
            />
            <TableCard 
              name="vip_status" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "user_id", type: "UUID", fk: true },
                { name: "current_streak", type: "INT" },
                { name: "highest_streak", type: "INT" },
                { name: "tier", type: "ENUM" },
                { name: "last_visit", type: "DATE" },
              ]}
              relations={["← users"]}
            />
            <TableCard 
              name="client_notes" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "client_id", type: "UUID", fk: true },
                { name: "manager_id", type: "UUID", fk: true },
                { name: "content", type: "TEXT" },
                { name: "has_allergy", type: "BOOLEAN" },
                { name: "photo_urls", type: "TEXT[]" },
              ]}
              relations={["← users (client)", "← users (manager)"]}
            />
            <TableCard 
              name="manager_schedules" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "manager_id", type: "UUID", fk: true },
                { name: "day_of_week", type: "INT" },
                { name: "start_time", type: "TIME" },
                { name: "end_time", type: "TIME" },
                { name: "is_available", type: "BOOLEAN" },
              ]}
              relations={["← users"]}
            />
            <TableCard 
              name="time_off_requests" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "manager_id", type: "UUID", fk: true },
                { name: "start_date", type: "DATE" },
                { name: "end_date", type: "DATE" },
                { name: "status", type: "ENUM" },
                { name: "approved_by", type: "UUID", fk: true },
              ]}
              relations={["← users (manager)", "← users (admin)"]}
            />
            <TableCard 
              name="payments" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "appointment_id", type: "UUID", fk: true },
                { name: "amount", type: "DECIMAL" },
                { name: "type", type: "ENUM" },
                { name: "stripe_id", type: "TEXT" },
                { name: "status", type: "ENUM" },
              ]}
              relations={["← appointments"]}
            />
            <TableCard 
              name="notifications" 
              columns={[
                { name: "id", type: "UUID", pk: true },
                { name: "user_id", type: "UUID", fk: true },
                { name: "title", type: "TEXT" },
                { name: "body", type: "TEXT" },
                { name: "type", type: "ENUM" },
                { name: "read", type: "BOOLEAN" },
              ]}
              relations={["← users"]}
            />
          </div>
        </CardContent>
      </Card>

      {/* RLS Policies */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-gold" />
            Row-Level Security (RLS) Policies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RLSPolicy 
              table="appointments" 
              policy="Clients see only their own bookings" 
              rule="auth.uid() = client_id OR role IN ('manager', 'admin')"
            />
            <RLSPolicy 
              table="client_notes" 
              policy="Managers see notes for their clients" 
              rule="role IN ('manager', 'admin')"
            />
            <RLSPolicy 
              table="vip_status" 
              policy="Clients see own status; Admins see all" 
              rule="auth.uid() = user_id OR role = 'admin'"
            />
            <RLSPolicy 
              table="manager_schedules" 
              policy="Public read; Admin write" 
              rule="SELECT: true | UPDATE: role = 'admin'"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* ========================================
   API ARCHITECTURE
======================================== */
const APIArchitecture = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-white">API Architecture</h2>
        <p className="text-cream/60">RESTful endpoints and Edge Functions</p>
      </div>

      {/* API Endpoints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <APIGroupCard 
          title="Authentication"
          icon={<Shield className="w-5 h-5" />}
          endpoints={[
            { method: "POST", path: "/auth/signup", desc: "Register new user" },
            { method: "POST", path: "/auth/login", desc: "Authenticate user" },
            { method: "POST", path: "/auth/logout", desc: "End session" },
            { method: "GET", path: "/auth/me", desc: "Get current user" },
          ]}
        />
        <APIGroupCard 
          title="Appointments"
          icon={<Calendar className="w-5 h-5" />}
          endpoints={[
            { method: "GET", path: "/appointments", desc: "List appointments" },
            { method: "POST", path: "/appointments", desc: "Create booking" },
            { method: "PATCH", path: "/appointments/:id", desc: "Update status" },
            { method: "GET", path: "/appointments/slots", desc: "Available slots" },
          ]}
        />
        <APIGroupCard 
          title="Services"
          icon={<Sparkles className="w-5 h-5" />}
          endpoints={[
            { method: "GET", path: "/services", desc: "List all services" },
            { method: "GET", path: "/services/:id", desc: "Service details" },
            { method: "GET", path: "/services/categories", desc: "Service categories" },
          ]}
        />
        <APIGroupCard 
          title="Users & Staff"
          icon={<Users className="w-5 h-5" />}
          endpoints={[
            { method: "GET", path: "/users/managers", desc: "List managers" },
            { method: "GET", path: "/users/:id/schedule", desc: "Manager schedule" },
            { method: "PATCH", path: "/users/:id", desc: "Update profile" },
          ]}
        />
        <APIGroupCard 
          title="VIP Program"
          icon={<Star className="w-5 h-5" />}
          endpoints={[
            { method: "GET", path: "/vip/status", desc: "Current VIP status" },
            { method: "GET", path: "/vip/rewards", desc: "Available rewards" },
            { method: "POST", path: "/vip/redeem", desc: "Redeem reward" },
          ]}
        />
        <APIGroupCard 
          title="Payments"
          icon={<CreditCard className="w-5 h-5" />}
          endpoints={[
            { method: "POST", path: "/payments/intent", desc: "Create Stripe intent" },
            { method: "POST", path: "/payments/confirm", desc: "Confirm payment" },
            { method: "GET", path: "/payments/history", desc: "Payment history" },
          ]}
        />
      </div>

      {/* Edge Functions */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-gold" />
            Edge Functions (Serverless)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EdgeFunctionCard 
              name="calculate-vip-streak"
              trigger="After appointment completion"
              action="Update streak counter and VIP tier"
            />
            <EdgeFunctionCard 
              name="send-appointment-reminder"
              trigger="CRON: 24 hours before appointment"
              action="Send SMS via Twilio"
            />
            <EdgeFunctionCard 
              name="process-refill-reminder"
              trigger="CRON: 3 weeks after last appointment"
              action="Send refill notification"
            />
            <EdgeFunctionCard 
              name="handle-stripe-webhook"
              trigger="Stripe payment events"
              action="Update payment status in DB"
            />
          </div>
        </CardContent>
      </Card>

      {/* TypeScript Interfaces */}
      <Card className="bg-charcoal-light/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white">TypeScript Data Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-sm text-cream/80 bg-charcoal rounded-xl p-6 overflow-x-auto">
            <pre>{`// Core Types
interface User {
  id: string;
  email: string;
  role: 'client' | 'manager' | 'admin';
  fullName: string;
  phone: string;
  avatarUrl?: string;
}

interface Appointment {
  id: string;
  clientId: string;
  managerId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  depositPaid: boolean;
}

interface Service {
  id: string;
  name: string;
  category: 'lashes' | 'brows' | 'makeup' | 'courses';
  durationMin: number;
  price: number;
  depositAmount: number;
  vipOnly: boolean;
}

interface VIPStatus {
  userId: string;
  currentStreak: number;
  highestStreak: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  lastVisit: Date;
}

// API Response Types
interface APIResponse<T> {
  data: T;
  error: null;
} | {
  data: null;
  error: { message: string; code: string };
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* ========================================
   HELPER COMPONENTS
======================================== */

const ArchBox = ({ icon, title, subtitle, color = "gold" }: { icon: React.ReactNode; title: string; subtitle: string; color?: string }) => {
  const colorMap: Record<string, string> = {
    gold: "from-gold/20 to-gold/5 border-gold/30",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  };
  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-4 text-center`}>
      <div className="text-gold mb-2 flex justify-center">{icon}</div>
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-cream/50 text-xs">{subtitle}</p>
    </div>
  );
};

const MicroBox = ({ title }: { title: string }) => (
  <div className="bg-charcoal/60 rounded-xl p-3 text-center border border-gold/10">
    <p className="text-cream/80 text-sm">{title}</p>
  </div>
);

const ServiceBox = ({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) => (
  <div className="bg-charcoal/60 rounded-2xl p-5 border border-gold/10">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-gold">{icon}</div>
      <h4 className="text-white font-medium">{title}</h4>
    </div>
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-cream/60 text-sm flex items-center gap-2">
          <CircleDot className="w-2 h-2 text-gold" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const IntegrationBox = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="bg-charcoal/40 rounded-xl p-3 text-center border border-gold/10">
    <p className="text-white font-medium text-sm">{title}</p>
    <p className="text-cream/50 text-xs">{subtitle}</p>
  </div>
);

const TechStackCard = ({ title, items }: { title: string; items: string[] }) => (
  <Card className="bg-charcoal-light/30 border-gold/20">
    <CardHeader className="pb-2">
      <CardTitle className="text-gold text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <Badge key={i} variant="outline" className="border-gold/30 text-cream/70">{item}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const FlowStep = ({ step, title, subtitle, icon }: { step: number; title: string; subtitle: string; icon: React.ReactNode }) => (
  <div className="flex flex-col items-center min-w-[100px]">
    <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold mb-2">
      {icon}
    </div>
    <span className="text-xs text-gold/60">Step {step}</span>
    <span className="text-white text-sm font-medium">{title}</span>
    <span className="text-cream/50 text-xs text-center">{subtitle}</span>
  </div>
);

const FlowArrow = () => (
  <ArrowRight className="w-6 h-6 text-gold/40 flex-shrink-0" />
);

const RealtimeChannel = ({ title, events, subscribers }: { title: string; events: string[]; subscribers: string[] }) => (
  <div className="bg-charcoal/60 rounded-xl p-4 border border-gold/10">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-white font-mono text-sm">{title}</span>
    </div>
    <div className="space-y-2">
      <div>
        <span className="text-xs text-gold/60">Events:</span>
        <div className="flex gap-1 mt-1">
          {events.map((e, i) => (
            <Badge key={i} variant="outline" className="text-xs border-green-500/30 text-green-400">{e}</Badge>
          ))}
        </div>
      </div>
      <div>
        <span className="text-xs text-gold/60">Subscribers:</span>
        <ul className="mt-1">
          {subscribers.map((s, i) => (
            <li key={i} className="text-cream/60 text-xs">• {s}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const NavTab = ({ icon, label, active = false, color = "blue" }: { icon: React.ReactNode; label: string; active?: boolean; color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: active ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "text-cream/50 border-cream/10",
    purple: active ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "text-cream/50 border-cream/10",
    amber: active ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "text-cream/50 border-cream/10",
  };
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm ${colorMap[color]}`}>
      <span className="w-4 h-4">{icon}</span>
      {label}
    </div>
  );
};

const JourneyFlow = ({ title, steps, color = "blue" }: { title: string; steps: string[]; color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: "border-blue-500/20 bg-blue-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
    amber: "border-amber-500/20 bg-amber-500/5",
  };
  const dotColor: Record<string, string> = {
    blue: "bg-blue-400",
    purple: "bg-purple-400",
    amber: "bg-amber-400",
  };
  return (
    <div className={`rounded-xl border p-4 ${colorMap[color]}`}>
      <h4 className="text-white font-medium mb-3">{title}</h4>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-1.5 ${dotColor[color]}`} />
            <span className="text-cream/70 text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComponentCard = ({ name, usage }: { name: string; usage: string }) => (
  <div className="bg-charcoal/60 rounded-xl p-4 border border-gold/10">
    <h4 className="text-white font-mono text-sm mb-1">{name}</h4>
    <p className="text-cream/50 text-xs">{usage}</p>
  </div>
);

const MatrixRow = ({ name, client, manager, admin }: { name: string; client?: boolean; manager?: boolean; admin?: boolean }) => (
  <tr className="border-b border-gold/10">
    <td className="py-3 px-4 font-mono">{name}</td>
    <td className="text-center py-3 px-4">{client && <CheckCircle2 className="w-4 h-4 text-blue-400 mx-auto" />}</td>
    <td className="text-center py-3 px-4">{manager && <CheckCircle2 className="w-4 h-4 text-purple-400 mx-auto" />}</td>
    <td className="text-center py-3 px-4">{admin && <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto" />}</td>
  </tr>
);

const TableCard = ({ name, columns, relations }: { name: string; columns: { name: string; type: string; pk?: boolean; fk?: boolean }[]; relations: string[] }) => (
  <div className="bg-charcoal/60 rounded-2xl border border-gold/20 overflow-hidden">
    <div className="bg-gold/10 px-4 py-3 border-b border-gold/20">
      <h4 className="text-gold font-mono font-medium flex items-center gap-2">
        <Database className="w-4 h-4" />
        {name}
      </h4>
    </div>
    <div className="p-4">
      <table className="w-full text-xs">
        <tbody>
          {columns.map((col, i) => (
            <tr key={i} className="border-b border-gold/5 last:border-0">
              <td className="py-1.5 text-cream/80 font-mono flex items-center gap-1">
                {col.pk && <span className="text-amber-400">🔑</span>}
                {col.fk && <span className="text-blue-400">🔗</span>}
                {col.name}
              </td>
              <td className="py-1.5 text-cream/50 text-right">{col.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 pt-3 border-t border-gold/10">
        <span className="text-xs text-gold/60">Relations:</span>
        <div className="mt-1 space-y-0.5">
          {relations.map((r, i) => (
            <p key={i} className="text-cream/50 text-xs font-mono">{r}</p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const RLSPolicy = ({ table, policy, rule }: { table: string; policy: string; rule: string }) => (
  <div className="bg-charcoal/60 rounded-xl p-4 border border-gold/10">
    <div className="flex items-center gap-2 mb-2">
      <Badge variant="outline" className="border-gold/30 text-gold font-mono">{table}</Badge>
      <span className="text-cream/80 text-sm">{policy}</span>
    </div>
    <code className="text-xs text-green-400 bg-charcoal rounded px-2 py-1 block">{rule}</code>
  </div>
);

const APIGroupCard = ({ title, icon, endpoints }: { title: string; icon: React.ReactNode; endpoints: { method: string; path: string; desc: string }[] }) => {
  const methodColor: Record<string, string> = {
    GET: "text-green-400 bg-green-500/10",
    POST: "text-blue-400 bg-blue-500/10",
    PATCH: "text-amber-400 bg-amber-500/10",
    DELETE: "text-red-400 bg-red-500/10",
  };
  return (
    <Card className="bg-charcoal-light/30 border-gold/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <span className="text-gold">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {endpoints.map((ep, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <Badge className={`${methodColor[ep.method]} font-mono text-xs min-w-[50px] justify-center`}>
                {ep.method}
              </Badge>
              <code className="text-cream/80 font-mono text-xs flex-1">{ep.path}</code>
              <span className="text-cream/50 text-xs hidden md:block">{ep.desc}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const EdgeFunctionCard = ({ name, trigger, action }: { name: string; trigger: string; action: string }) => (
  <div className="bg-charcoal/60 rounded-xl p-4 border border-gold/10">
    <h4 className="text-white font-mono text-sm mb-2 flex items-center gap-2">
      <Workflow className="w-4 h-4 text-gold" />
      {name}
    </h4>
    <div className="space-y-1 text-xs">
      <p className="text-cream/60"><span className="text-gold/70">Trigger:</span> {trigger}</p>
      <p className="text-cream/60"><span className="text-gold/70">Action:</span> {action}</p>
    </div>
  </div>
);

export default Architecture;
