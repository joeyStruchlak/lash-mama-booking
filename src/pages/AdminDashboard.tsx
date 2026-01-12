import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  Crown,
  Menu,
  Plus,
  Repeat,
  GraduationCap,
  Sparkles,
  User,
  Heart,
} from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import AdminCalendar from "@/components/admin/AdminCalendar";
import AdminStaffManagement from "@/components/admin/AdminStaffManagement";
import AdminNotifications from "@/components/admin/AdminNotifications";
import AdminClientDatabase from "@/components/admin/AdminClientDatabase";
import AdminVIPManagement from "@/components/admin/AdminVIPManagement";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminChat from "@/components/admin/AdminChat";
import AdminRecurringBooking from "@/components/admin/AdminRecurringBooking";
import CourseBookingManager from "@/components/admin/CourseBookingManager";
import RefillReminders from "@/components/admin/RefillReminders";
import AdminProfile from "@/components/admin/AdminProfile";
import PersonalAnalytics from "@/components/admin/PersonalAnalytics";
import StaffReferralLink from "@/components/admin/StaffReferralLink";
import lashMamaImg from "@/assets/staff/lash-mama-profile.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Premium icon component for unified styling - gold/beige palette only
const PremiumIcon = ({ icon: Icon, color = "gold" }: { icon: any; color?: string }) => (
  <div className={cn(
    "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center",
    color === "gold" && "bg-gradient-to-br from-gold/20 to-gold/10",
    color === "rose" && "bg-gradient-to-br from-gold/15 to-gold/5",
    color === "violet" && "bg-gradient-to-br from-gold/15 to-gold/5",
    color === "emerald" && "bg-gradient-to-br from-gold/20 to-gold/10",
    color === "sky" && "bg-gradient-to-br from-gold/15 to-gold/5",
    color === "amber" && "bg-gradient-to-br from-gold/20 to-gold/10",
  )}>
    <Icon className={cn(
      "h-5 w-5 md:h-6 md:w-6",
      color === "gold" && "text-gold",
      color === "rose" && "text-gold-dark",
      color === "violet" && "text-gold",
      color === "emerald" && "text-gold-dark",
      color === "sky" && "text-gold-light",
      color === "amber" && "text-gold",
    )} />
  </div>
);

const AdminDashboard = () => {
  const { currentRole } = useUserRole();
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showManualBooking, setShowManualBooking] = useState(false);
  const [manualBooking, setManualBooking] = useState({
    client: "",
    service: "",
    date: "",
    time: "",
    skipDeposit: true, // Only Lash Mama can skip deposit
  });

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
    { id: "myhours", label: "My Hours", icon: Clock, color: "gold" },
    { id: "mylink", label: "My Link", icon: Heart, color: "rose" },
    { id: "recurring", label: "Recurring", icon: Repeat, color: "violet" },
    { id: "staff", label: "Staff", icon: UserCog, color: "violet" },
    { id: "notifications", label: "Alerts", icon: Bell, badge: "3", color: "rose" },
    { id: "clients", label: "Clients", icon: Users, color: "emerald" },
    { id: "vip", label: "VIP", icon: Gem, color: "amber" },
    { id: "courses", label: "Courses", icon: GraduationCap, color: "rose" },
    { id: "refills", label: "Refills", icon: Sparkles, color: "sky" },
    { id: "analytics", label: "Analytics", icon: LineChart, color: "gold" },
    { id: "chat", label: "Messages", icon: MessageCircle, badge: "5", color: "sky" },
    { id: "profile", label: "Profile", icon: User, color: "violet" },
    { id: "settings", label: "Settings", icon: Settings, color: "violet" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    // Auto-scroll to content section
    setTimeout(() => {
      const contentSection = document.getElementById('dashboard-content');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleManualBooking = () => {
    if (!manualBooking.client || !manualBooking.service || !manualBooking.date) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success(`Booking created for ${manualBooking.client} without deposit`);
    setShowManualBooking(false);
    setManualBooking({ client: "", service: "", date: "", time: "", skipDeposit: true });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "calendar":
        return <AdminCalendar />;
      case "myhours":
        return <PersonalAnalytics staffName="Lash Mama" staffImage={lashMamaImg} staffTitle="Founder & Master Lash Artist" isLashMama={true} />;
      case "mylink":
        return <StaffReferralLink staffName="Lash Mama" staffId="lash-mama" />;
      case "recurring":
        return <AdminRecurringBooking />;
      case "staff":
        return <AdminStaffManagement />;
      case "notifications":
        return <AdminNotifications />;
      case "clients":
        return <AdminClientDatabase />;
      case "vip":
        return <AdminVIPManagement />;
      case "courses":
        return <CourseBookingManager />;
      case "refills":
        return <RefillReminders />;
      case "analytics":
        return <AdminAnalytics />;
      case "chat":
        return <AdminChat />;
      case "profile":
        return <AdminProfile isLashMama={true} />;
      case "settings":
        return <AdminSettings />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="luxury" size="sm" className="gap-2" onClick={() => setShowManualBooking(true)}>
          <Plus className="h-4 w-4" />
          Book Without Deposit
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setActiveSection("recurring")}>
          <Repeat className="h-4 w-4" />
          Recurring Bookings
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-3 md:p-5 hover:shadow-gold transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex items-start justify-between gap-2">
              <PremiumIcon icon={stat.icon} color={stat.color} />
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full",
                stat.trend === "up" ? "text-gold-dark bg-gold/20" : "text-destructive bg-destructive/10"
              )}>
                {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                <span className="hidden sm:inline">{stat.change}</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xl md:text-3xl font-serif font-bold text-foreground">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {/* Weekly Revenue Chart - Always visible */}
        <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
            <div>
              <h3 className="font-serif text-base md:text-lg font-semibold">Weekly Revenue</h3>
              <p className="text-xs md:text-sm text-muted-foreground">This week's earnings</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-2xl font-serif font-bold text-gold">$17,870</span>
              <span className="text-emerald-600 text-xs flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                12%
              </span>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-1 md:gap-2 h-32 md:h-48">
            {weeklyRevenue.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1 md:gap-2">
                <div className="w-full relative flex items-end justify-center h-24 md:h-40">
                  <div 
                    className={cn(
                      "w-full max-w-8 md:max-w-12 rounded-t-md md:rounded-t-lg transition-all duration-500",
                      i === 3 ? "bg-gradient-to-t from-gold to-gold/60" : "bg-gradient-to-t from-gold/30 to-gold/10"
                    )}
                    style={{ 
                      height: `${(day.amount / maxRevenue) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Service Distribution */}
        <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <h3 className="font-serif text-base md:text-lg font-semibold mb-3 md:mb-4">Top Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { name: "Mega Volume", percent: 45, color: "bg-gold" },
              { name: "Volume Full Set", percent: 28, color: "bg-gold/70" },
              { name: "Natural Hybrid", percent: 15, color: "bg-gold/50" },
              { name: "Refills", percent: 12, color: "bg-gold/30" },
            ].map((service) => (
              <div key={service.name}>
                <div className="flex justify-between text-xs md:text-sm mb-1">
                  <span className="text-foreground font-medium truncate">{service.name}</span>
                  <span className="text-muted-foreground ml-2">{service.percent}%</span>
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
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold">Today's Appointments</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Upcoming bookings</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setActiveSection("calendar")}>
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">View</span> Calendar
          </Button>
        </div>

        <div className="space-y-2 md:space-y-3">
          {recentBookings.map((booking) => (
            <div 
              key={booking.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 md:p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{booking.client}</p>
                  <p className="text-xs text-muted-foreground truncate">{booking.service}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0">
                <div className="text-left sm:text-right">
                  <p className="font-medium text-foreground text-sm">{booking.time}</p>
                  <p className="text-xs text-muted-foreground">with {booking.artist}</p>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
                  booking.status === "confirmed" 
                    ? "bg-gold/20 text-gold-dark" 
                    : "bg-gold/10 text-gold"
                )}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Manual Booking Dialog */}
      <Dialog open={showManualBooking} onOpenChange={setShowManualBooking}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Book Without Deposit</DialogTitle>
            <DialogDescription>Only Lash Mama can create bookings without requiring a deposit.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Client Name</label>
              <Input
                placeholder="Enter client name"
                value={manualBooking.client}
                onChange={(e) => setManualBooking(prev => ({ ...prev, client: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Service</label>
              <Input
                placeholder="Select service"
                value={manualBooking.service}
                onChange={(e) => setManualBooking(prev => ({ ...prev, service: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Date</label>
                <Input
                  type="date"
                  value={manualBooking.date}
                  onChange={(e) => setManualBooking(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Time</label>
                <Input
                  type="time"
                  value={manualBooking.time}
                  onChange={(e) => setManualBooking(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            <Card className="p-3 bg-gold/10 border-0">
              <p className="text-sm text-gold font-medium">No deposit required for this booking</p>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowManualBooking(false)}>Cancel</Button>
            <Button variant="luxury" onClick={handleManualBooking}>Create Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-28 pb-20 md:pb-24">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 p-4 md:p-8 lg:p-12 mb-4 md:mb-8">
            <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 md:w-48 h-24 md:h-48 bg-gold/5 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <Crown className="h-6 w-6 md:h-8 md:w-8 text-gold" />
                </div>
                <div>
                  <p className="text-cream/70 text-xs md:text-sm">Welcome back</p>
                  <h1 className="font-serif text-xl md:text-3xl font-semibold text-cream">Lash Mama Dashboard</h1>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 md:gap-4">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="bg-cream/10 backdrop-blur rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-4 text-center flex-1 min-w-[100px]">
                    <p className="text-lg md:text-3xl font-serif font-bold text-cream">{stat.value}</p>
                    <p className="text-cream/60 text-[10px] md:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation - Always Expanded */}
          <div className="lg:hidden mb-4">
            <Card className="p-3 border-0 bg-card">
              <nav className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs font-medium transition-all relative",
                      activeSection === item.id
                        ? "bg-gold text-primary-foreground shadow-gold"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="truncate text-center">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center",
                        activeSection === item.id 
                          ? "bg-primary-foreground/30 text-primary-foreground" 
                          : "bg-gold text-primary-foreground"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Navigation - Desktop */}
            <div className="hidden lg:block w-64 shrink-0">
              <Card className="p-4 sticky top-28 border-0 bg-gradient-to-br from-card to-card/80">
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
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
            <div id="dashboard-content" className="flex-1 min-w-0">
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
