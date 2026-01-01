import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Users,
  Clock,
  CalendarDays,
  UserCog,
  Bell,
  Gem,
  Settings,
  ChevronRight,
  MessageCircle,
  Shield,
  Crown,
} from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Navigate } from "react-router-dom";
import AdminCalendar from "@/components/admin/AdminCalendar";
import AdminStaffManagement from "@/components/admin/AdminStaffManagement";
import AdminNotifications from "@/components/admin/AdminNotifications";
import AdminClientDatabase from "@/components/admin/AdminClientDatabase";
import AdminVIPManagement from "@/components/admin/AdminVIPManagement";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminChat from "@/components/admin/AdminChat";

// Manager Dashboard - Same as Admin but WITHOUT revenue/analytics
const ManagerDashboard = () => {
  const { currentRole } = useUserRole();
  const [activeSection, setActiveSection] = useState<string>("overview");

  // For demo purposes - in real app would have 'manager' role

  const stats = [
    { label: "Today's Bookings", value: "14", icon: Calendar, color: "gold" },
    { label: "Total Clients", value: "458", icon: Users, color: "violet" },
    { label: "Staff on Duty", value: "4", icon: UserCog, color: "sky" },
    { label: "VIP Members", value: "52", icon: Gem, color: "amber" },
  ];

  const recentBookings = [
    { id: 1, client: "Sarah M.", service: "Mega Volume Full Set", time: "9:00 AM", artist: "Nikki", status: "confirmed" },
    { id: 2, client: "Emma L.", service: "Volume Refill", time: "11:30 AM", artist: "Lash Mama", status: "confirmed" },
    { id: 3, client: "Jessica K.", service: "Bridal Lashes", time: "2:00 PM", artist: "Beau", status: "pending" },
    { id: 4, client: "Olivia R.", service: "Natural Full Set", time: "4:30 PM", artist: "Natali", status: "confirmed" },
  ];

  // Manager navigation - NO Analytics/Revenue options
  const navigationItems = [
    { id: "overview", label: "Dashboard", icon: CalendarDays, color: "gold" },
    { id: "calendar", label: "Calendar", icon: Calendar, color: "sky" },
    { id: "staff", label: "Staff", icon: UserCog, color: "violet" },
    { id: "notifications", label: "Notifications", icon: Bell, badge: "3", color: "rose" },
    { id: "clients", label: "Clients", icon: Users, color: "emerald" },
    { id: "vip", label: "VIP Program", icon: Gem, color: "amber" },
    { id: "chat", label: "Messages", icon: MessageCircle, badge: "2", color: "sky" },
    { id: "settings", label: "Settings", icon: Settings, color: "violet" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "calendar":
        return <AdminCalendar />;
      case "staff":
        return <AdminStaffManagement />;
      case "notifications":
        return <AdminNotifications />;
      case "clients":
        return <AdminClientDatabase />;
      case "vip":
        return <AdminVIPManagement />;
      case "chat":
        return <AdminChat />;
      case "settings":
        return <AdminSettings />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid - NO Revenue */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 hover:shadow-gold transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex items-start">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                stat.color === "gold" && "bg-gradient-to-br from-gold/20 to-gold/10",
                stat.color === "violet" && "bg-gradient-to-br from-violet-100 to-violet-50",
                stat.color === "sky" && "bg-gradient-to-br from-sky-100 to-sky-50",
                stat.color === "amber" && "bg-gradient-to-br from-amber-100 to-amber-50",
              )}>
                <stat.icon className={cn(
                  "h-6 w-6",
                  stat.color === "gold" && "text-gold",
                  stat.color === "violet" && "text-violet-500",
                  stat.color === "sky" && "text-sky-500",
                  stat.color === "amber" && "text-amber-500",
                )} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-serif font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Notice Card - No Revenue Access */}
      <Card className="p-6 border-0 bg-gradient-to-br from-amber-50 to-amber-100/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <Shield className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground">Manager Access</h3>
            <p className="text-sm text-muted-foreground">
              You have full management access. Revenue and analytics are only available to Lash Mama.
            </p>
          </div>
        </div>
      </Card>

      {/* Today's Appointments */}
      <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-lg font-semibold">Today's Appointments</h3>
            <p className="text-sm text-muted-foreground">Manage upcoming bookings</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>

        <div className="space-y-3">
          {recentBookings.map((booking) => (
            <div 
              key={booking.id}
              className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{booking.client}</p>
                  <p className="text-sm text-muted-foreground">{booking.service}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-medium text-foreground">{booking.time}</p>
                  <p className="text-sm text-muted-foreground">with {booking.artist}</p>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  booking.status === "confirmed" 
                    ? "bg-emerald-50 text-emerald-600" 
                    : "bg-amber-50 text-amber-600"
                )}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 p-8 md:p-12 mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <p className="text-cream/70 text-sm">Welcome back</p>
                  <h1 className="font-serif text-3xl font-semibold text-cream">Manager Dashboard</h1>
                </div>
              </div>
              
              <div className="flex gap-4">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                    <p className="text-3xl font-serif font-bold text-cream">{stat.value}</p>
                    <p className="text-cream/60 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block w-64 shrink-0">
              <Card className="p-4 sticky top-28 border-0 bg-gradient-to-br from-card to-card/80">
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        activeSection === item.id
                          ? "bg-gold text-primary-foreground shadow-gold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          activeSection === item.id 
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-gold/20 text-gold"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManagerDashboard;
