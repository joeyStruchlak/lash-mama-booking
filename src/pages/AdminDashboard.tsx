import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  ChevronRight,
  CalendarDays,
  UserCog,
  Bell,
  Gem,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Download,
  RefreshCw,
  Sparkles,
  Award,
  Crown,
  Palette,
} from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Navigate, Link } from "react-router-dom";
import AdminCalendar from "@/components/admin/AdminCalendar";
import AdminStaffManagement from "@/components/admin/AdminStaffManagement";
import AdminNotifications from "@/components/admin/AdminNotifications";
import AdminClientDatabase from "@/components/admin/AdminClientDatabase";
import AdminVIPManagement from "@/components/admin/AdminVIPManagement";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminChat from "@/components/admin/AdminChat";

// Premium icon component for unified styling
const PremiumIcon = ({ icon: Icon, color = "gold" }: { icon: any; color?: string }) => (
  <div className={cn(
    "w-12 h-12 rounded-xl flex items-center justify-center",
    color === "gold" && "bg-gradient-to-br from-gold/20 to-gold/10",
    color === "rose" && "bg-gradient-to-br from-rose-100 to-rose-50",
    color === "violet" && "bg-gradient-to-br from-violet-100 to-violet-50",
    color === "emerald" && "bg-gradient-to-br from-emerald-100 to-emerald-50",
    color === "sky" && "bg-gradient-to-br from-sky-100 to-sky-50",
    color === "amber" && "bg-gradient-to-br from-amber-100 to-amber-50",
  )}>
    <Icon className={cn(
      "h-6 w-6",
      color === "gold" && "text-gold",
      color === "rose" && "text-rose-500",
      color === "violet" && "text-violet-500",
      color === "emerald" && "text-emerald-500",
      color === "sky" && "text-sky-500",
      color === "amber" && "text-amber-500",
    )} />
  </div>
);

const AdminDashboard = () => {
  const { currentRole } = useUserRole();
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Redirect if not admin
  if (currentRole !== "admin") {
    return <Navigate to="/vip" replace />;
  }

  const stats = [
    { 
      label: "Today's Revenue", 
      value: "$2,840", 
      change: "+18%",
      trend: "up",
      icon: DollarSign, 
      color: "emerald" 
    },
    { 
      label: "Today's Bookings", 
      value: "14", 
      change: "+3",
      trend: "up",
      icon: Calendar, 
      color: "gold" 
    },
    { 
      label: "Total Clients", 
      value: "458", 
      change: "+12",
      trend: "up",
      icon: Users, 
      color: "violet" 
    },
    { 
      label: "VIP Members", 
      value: "52", 
      change: "+4",
      trend: "up",
      icon: Gem, 
      color: "amber" 
    },
  ];

  const weeklyRevenue = [
    { day: "Mon", amount: 2100 },
    { day: "Tue", amount: 2450 },
    { day: "Wed", amount: 1980 },
    { day: "Thu", amount: 2840 },
    { day: "Fri", amount: 3200 },
    { day: "Sat", amount: 4100 },
    { day: "Sun", amount: 1200 },
  ];

  const maxRevenue = Math.max(...weeklyRevenue.map(d => d.amount));

  const recentBookings = [
    { id: 1, client: "Sarah M.", service: "Mega Volume Full Set", time: "9:00 AM", artist: "Nikki", status: "confirmed" },
    { id: 2, client: "Emma L.", service: "Volume Refill", time: "11:30 AM", artist: "Lash Mama", status: "confirmed" },
    { id: 3, client: "Jessica K.", service: "Bridal Lashes", time: "2:00 PM", artist: "Beau", status: "pending" },
    { id: 4, client: "Olivia R.", service: "Natural Full Set", time: "4:30 PM", artist: "Natali", status: "confirmed" },
  ];

  const navigationItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3, color: "gold" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, color: "sky" },
    { id: "staff", label: "Staff", icon: UserCog, color: "violet" },
    { id: "notifications", label: "Notifications", icon: Bell, badge: "3", color: "rose" },
    { id: "clients", label: "Clients", icon: Users, color: "emerald" },
    { id: "vip", label: "VIP Program", icon: Gem, color: "amber" },
    { id: "analytics", label: "Analytics", icon: LineChart, color: "gold" },
    { id: "chat", label: "Messages", icon: MessageCircle, badge: "5", color: "sky" },
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
      case "analytics":
        return <AdminAnalytics />;
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
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 hover:shadow-gold transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex items-start justify-between">
              <PremiumIcon icon={stat.icon} color={stat.color} />
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                stat.trend === "up" ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
              )}>
                {stat.trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-serif font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Chart */}
        <Card className="col-span-2 p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-semibold">Weekly Revenue</h3>
              <p className="text-sm text-muted-foreground">This week's earnings breakdown</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-gold">$17,870</span>
              <span className="text-emerald-600 text-sm flex items-center gap-1">
                <ArrowUpRight className="h-3.5 w-3.5" />
                12%
              </span>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyRevenue.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative flex items-end justify-center h-40">
                  <div 
                    className={cn(
                      "w-full max-w-12 rounded-t-lg transition-all duration-500",
                      i === 3 ? "bg-gradient-to-t from-gold to-gold/60" : "bg-gradient-to-t from-gold/30 to-gold/10"
                    )}
                    style={{ 
                      height: `${(day.amount / maxRevenue) * 100}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Service Distribution */}
        <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <h3 className="font-serif text-lg font-semibold mb-4">Top Services</h3>
          <div className="space-y-4">
            {[
              { name: "Mega Volume", percent: 45, color: "bg-gold" },
              { name: "Volume Full Set", percent: 28, color: "bg-gold/70" },
              { name: "Natural Hybrid", percent: 15, color: "bg-gold/50" },
              { name: "Refills", percent: 12, color: "bg-gold/30" },
            ].map((service) => (
              <div key={service.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{service.name}</span>
                  <span className="text-muted-foreground">{service.percent}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-700", service.color)}
                    style={{ width: `${service.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-lg font-semibold">Today's Appointments</h3>
            <p className="text-sm text-muted-foreground">Upcoming bookings for today</p>
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
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <Crown className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <p className="text-cream/70 text-sm">Welcome back</p>
                  <h1 className="font-serif text-3xl font-semibold text-cream">Lash Mama Dashboard</h1>
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

            {/* Mobile Navigation */}
            <div className="lg:hidden w-full mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                      activeSection === item.id
                        ? "bg-gold text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {item.badge && (
                      <span className="bg-primary-foreground/20 px-1.5 py-0.5 rounded-full text-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
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

export default AdminDashboard;
