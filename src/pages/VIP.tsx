import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Crown, Star, Trophy, Gift, Heart, Sparkles, Calendar, 
  Clock, ChevronRight, Users, Target, PenLine, Gem,
  Percent, PartyPopper, Settings, LayoutDashboard, UserCog,
  Bell, History, CalendarDays, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import VIPProfileExamples from "@/components/vip/VIPProfileExamples";
import VIPNotes from "@/components/vip/VIPNotes";
import { useUserRole } from "@/contexts/UserRoleContext";

// VIP Discounts - no points/rewards system
const vipDiscounts = [
  { 
    name: "$10 Off Every Refill", 
    description: "Save on all your refill appointments",
    icon: Percent,
    value: "$10"
  },
  { 
    name: "$20 Off Birthday Refills", 
    description: "Extra savings on your special day",
    icon: PartyPopper,
    value: "$20"
  },
  { 
    name: "$30 Off Mega Volume Full Set", 
    description: "Premium lash experience discount",
    icon: Crown,
    value: "$30"
  },
  { 
    name: "$30 Off Volume Full Set", 
    description: "Beautiful volume lash discount",
    icon: Sparkles,
    value: "$30"
  },
  { 
    name: "$20 Off Natural/Hybrid Full Set", 
    description: "Natural beauty enhancement discount",
    icon: Heart,
    value: "$20"
  },
  { 
    name: "$400 Off All Lash Courses", 
    description: "Exclusive VIP discount on training courses",
    icon: Trophy,
    value: "$400"
  },
  { 
    name: "$100 Gift Pack at Year End", 
    description: "Exclusive annual VIP appreciation gift",
    icon: Gift,
    value: "$100"
  },
];

const bookingHistory = [
  { id: 1, date: "Dec 28, 2023", service: "Volume Refills", artist: "Nikki", lastAppointmentDays: 14, canReschedule: true },
  { id: 2, date: "Nov 30, 2023", service: "Mega Volume Full Set", artist: "Lash Mama", lastAppointmentDays: 28, canReschedule: false },
  { id: 3, date: "Oct 25, 2023", service: "Volume Refills", artist: "Nikki", lastAppointmentDays: 21, canReschedule: false },
  { id: 4, date: "Sep 28, 2023", service: "Bridal Makeup Trial", artist: "Beau", lastAppointmentDays: 27, canReschedule: false },
  { id: 5, date: "Aug 30, 2023", service: "Volume Full Set", artist: "Lash Mama", lastAppointmentDays: 30, canReschedule: false },
];

// Admin dashboard data
const adminStats = [
  { label: "Today's Bookings", value: "12", icon: Calendar, color: "text-blue-500" },
  { label: "Total Clients", value: "458", icon: Users, color: "text-green-500" },
  { label: "VIP Members", value: "52", icon: Gem, color: "text-gold" },
  { label: "This Week Revenue", value: "$8,420", icon: Trophy, color: "text-purple-500" },
];

const VIP = () => {
  const { currentRole } = useUserRole();
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "history" | "discounts" | "admin">("overview");
  
  // Role-based data
  const isVIP = currentRole === "vip";
  const isAdmin = currentRole === "admin";
  const isRegular = currentRole === "regular";
  const isGuest = currentRole === "guest";
  
  const mockVIPData = {
    memberSince: isVIP ? "March 2022" : isRegular ? "January 2024" : "N/A",
    consecutiveBookings: isVIP ? 12 : isRegular ? 7 : 0,
    currentTier: isVIP ? "vip" as const : "regular" as const,
    streak: isVIP ? 12 : 7,
    referrals: isVIP ? 8 : 2,
    birthday: "February 14",
    upcomingAppointment: {
      date: "January 15, 2024",
      time: "2:00 PM",
      service: "Mega Volume Full Set",
      artist: "Lash Mama",
      lastAppointment: "December 20, 2023"
    }
  };

  const bookingsToVIP = 10 - mockVIPData.consecutiveBookings;

  // Get tabs based on role
  const getTabs = () => {
    if (isAdmin) {
      return [
        { id: "admin", label: "Dashboard", icon: LayoutDashboard },
        { id: "overview", label: "Bookings", icon: Calendar },
        { id: "notes", label: "Notes", icon: PenLine },
        { id: "history", label: "All History", icon: History },
      ];
    }
    if (isVIP) {
      return [
        { id: "overview", label: "Overview", icon: Target },
        { id: "notes", label: "My Notes", icon: PenLine },
        { id: "history", label: "History", icon: Clock },
        { id: "discounts", label: "VIP Discounts", icon: Percent },
      ];
    }
    return [
      { id: "overview", label: "Overview", icon: Target },
      { id: "notes", label: "My Notes", icon: PenLine },
      { id: "history", label: "History", icon: Clock },
    ];
  };

  // Guest view - redirect to sign up
  if (isGuest) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto rounded-full bg-gold/20 flex items-center justify-center mb-6">
                <Gem className="h-12 w-12 text-gold" />
              </div>
              <h1 className="font-serif text-4xl font-semibold text-foreground mb-4">
                Join Our VIP Program
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Sign up or log in to track your bookings, earn VIP status, and unlock exclusive discounts.
              </p>
              
              {/* VIP Benefits Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {vipDiscounts.slice(0, 6).map((discount) => (
                  <Card key={discount.name} className="p-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                        <discount.icon className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <span className="text-lg font-serif font-semibold text-gold">{discount.value}</span>
                        <p className="text-xs text-muted-foreground">{discount.name.replace(discount.value + " ", "")}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="luxury" size="lg">
                  Sign Up Now
                </Button>
                <Button variant="outline" size="lg">
                  Log In
                </Button>
              </div>
            </div>
            
            {/* VIP Profile Examples */}
            <VIPProfileExamples />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 p-8 md:p-12 mb-8">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                    {isAdmin ? (
                      <Crown className="h-8 w-8 text-gold" />
                    ) : isVIP ? (
                      <Gem className="h-8 w-8 text-gold" />
                    ) : (
                      <Users className="h-8 w-8 text-gold" />
                    )}
                  </div>
                  <div>
                    <p className="text-cream/70 text-sm">
                      {isAdmin ? "Admin Dashboard" : "Your Status"}
                    </p>
                    <h2 className="font-serif text-3xl font-semibold text-cream flex items-center gap-2">
                      {isAdmin ? "Lash Mama" : isVIP ? "VIP Member" : "Valued Client"}
                      {(isVIP || isAdmin) && <Gem className="h-5 w-5 text-gold" />}
                    </h2>
                  </div>
                </div>
                {!isAdmin && (
                  <p className="text-cream/60 mb-2">Member since {mockVIPData.memberSince}</p>
                )}
                {isAdmin && (
                  <p className="text-cream/60 mb-2">Full system access enabled</p>
                )}
                {isVIP && (
                  <div className="flex items-center gap-2 text-gold">
                    <Crown className="h-4 w-4" />
                    <span className="font-medium">Exclusive VIP Benefits Active</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                {isAdmin ? (
                  <>
                    {adminStats.slice(0, 2).map((stat) => (
                      <div key={stat.label} className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                        <p className={cn("text-3xl font-serif font-bold", stat.color)}>{stat.value}</p>
                        <p className="text-cream/60 text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                      <p className="text-3xl font-serif font-bold text-cream">{mockVIPData.consecutiveBookings}</p>
                      <p className="text-cream/60 text-sm">Consecutive Bookings</p>
                    </div>
                    <div className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                      <p className="text-3xl font-serif font-bold text-gradient-gold">{mockVIPData.streak}</p>
                      <p className="text-cream/60 text-sm">Month Streak</p>
                    </div>
                    <div className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                      <p className="text-3xl font-serif font-bold text-cream">{mockVIPData.referrals}</p>
                      <p className="text-cream/60 text-sm">Referrals</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* VIP Progress - only show if not VIP and not admin */}
            {!isVIP && !isAdmin && (
              <div className="relative z-10 mt-8 pt-8 border-t border-cream/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cream/70 text-sm flex items-center gap-2">
                    <Gem className="h-4 w-4 text-gold" />
                    Progress to VIP Status
                  </span>
                  <span className="text-gold text-sm font-medium">{mockVIPData.consecutiveBookings}/10 bookings</span>
                </div>
                <div className="h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-gold to-gold/80 rounded-full transition-all duration-500"
                    style={{ width: `${(mockVIPData.consecutiveBookings / 10) * 100}%` }}
                  />
                </div>
                <p className="text-cream/50 text-xs mt-2">
                  {bookingsToVIP > 0 ? `${bookingsToVIP} more consecutive bookings to unlock VIP benefits` : "Congratulations! You qualify for VIP!"}
                  <span className="block text-cream/40 mt-1">(Max 3 month break between appointments to maintain streak)</span>
                </p>
              </div>
            )}
          </div>

          {/* VIP Profile Examples - Only show for non-admin */}
          {!isAdmin && <VIPProfileExamples />}

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {getTabs().map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-gold text-primary-foreground"
                    : "bg-beige text-muted-foreground hover:bg-muted"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Admin Dashboard Tab */}
          {activeTab === "admin" && isAdmin && (
            <div className="animate-fade-in space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {adminStats.map((stat) => (
                  <Card key={stat.label} className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-opacity-20", stat.color.replace("text-", "bg-").replace("-500", "-100"))}>
                        <stat.icon className={cn("h-6 w-6", stat.color)} />
                      </div>
                      <div>
                        <p className="text-2xl font-serif font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Admin Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-6 hover:shadow-gold transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                      <CalendarDays className="h-6 w-6 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold">Manage Calendar</h3>
                      <p className="text-sm text-muted-foreground">View & edit all appointments</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-gold transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <UserCog className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold">Staff Management</h3>
                      <p className="text-sm text-muted-foreground">Manage staff & shifts</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-gold transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Bell className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold">Notifications</h3>
                      <p className="text-sm text-muted-foreground">3 new booking requests</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-gold transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold">Client Database</h3>
                      <p className="text-sm text-muted-foreground">View all clients</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-gold transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Gem className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold">VIP Members</h3>
                      <p className="text-sm text-muted-foreground">Manage VIP program</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-gold transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Settings className="h-6 w-6 text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold">Settings</h3>
                      <p className="text-sm text-muted-foreground">App configuration</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              {/* Upcoming Appointment */}
              <Card variant="luxury" className="p-6 lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-gold" />
                  <h3 className="font-serif text-xl font-semibold">Upcoming Appointment</h3>
                </div>
                
                {mockVIPData.upcomingAppointment ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-serif text-2xl font-semibold text-foreground mb-1">
                        {mockVIPData.upcomingAppointment.service}
                      </p>
                      <p className="text-muted-foreground">
                        {mockVIPData.upcomingAppointment.date} at {mockVIPData.upcomingAppointment.time}
                      </p>
                      <p className="text-gold font-medium mt-1">
                        With {mockVIPData.upcomingAppointment.artist}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Last visit: {mockVIPData.upcomingAppointment.lastAppointment}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="soft" size="sm" className="text-xs">
                        Reschedule (48hr+ notice required)
                      </Button>
                      <Button variant="luxury" size="sm">View Details</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                    <Button variant="luxury" asChild>
                      <Link to="/book">Book Now</Link>
                    </Button>
                  </div>
                )}
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="soft" className="w-full justify-between" asChild>
                    <Link to="/book">
                      Book Appointment
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="soft" className="w-full justify-between">
                    Refer a Friend
                    <Gift className="h-4 w-4" />
                  </Button>
                  {isVIP && (
                    <Button variant="soft" className="w-full justify-between" onClick={() => setActiveTab("discounts")}>
                      View Discounts
                      <Percent className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>

              {/* VIP Benefits Preview - only for VIP */}
              {isVIP && (
                <Card variant="elevated" className="p-6 lg:col-span-3 bg-gradient-to-br from-gold/5 via-cream/50 to-beige">
                  <div className="flex items-center gap-2 mb-6">
                    <Crown className="h-5 w-5 text-gold" />
                    <h3 className="font-serif text-xl font-semibold">Your VIP Benefits</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vipDiscounts.slice(0, 3).map((discount, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-cream/80 border border-gold/20">
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                          <discount.icon className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <span className="text-lg font-serif font-semibold text-gold">{discount.value}</span>
                          <p className="text-xs text-muted-foreground">{discount.name.replace(discount.value + " ", "")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-gold"
                    onClick={() => setActiveTab("discounts")}
                  >
                    View All Discounts <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Card>
              )}

              {/* VIP Progress Card - for regular users */}
              {isRegular && (
                <Card variant="elevated" className="p-6 lg:col-span-3 bg-gradient-to-br from-gold/5 via-cream/50 to-beige">
                  <div className="flex items-center gap-2 mb-4">
                    <Gem className="h-5 w-5 text-gold" />
                    <h3 className="font-serif text-xl font-semibold">Become a VIP</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    You're only <span className="text-gold font-semibold">{bookingsToVIP} bookings away</span> from VIP status!
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {vipDiscounts.slice(0, 3).map((discount, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-cream/60 border border-gold/10">
                        <discount.icon className="h-4 w-4 text-gold" />
                        <span className="text-sm font-medium text-foreground">{discount.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Birthday Discount */}
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-cream/50 lg:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <PartyPopper className="h-5 w-5 text-pink-500" />
                  <h3 className="font-serif text-lg font-semibold">Birthday Discount</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {isVIP ? "Get $20 off your refill during your birthday month!" : "VIPs get $20 off during their birthday month!"} Your birthday: <span className="text-gold font-medium">{mockVIPData.birthday}</span>
                </p>
                <Button variant="soft" size="sm">Update Birthday</Button>
              </Card>

              {/* Referral Stats */}
              <Card className="p-6 bg-gradient-to-br from-gold/10 to-cream/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gold" />
                    <h3 className="font-serif text-lg font-semibold">Referrals</h3>
                  </div>
                  <span className="text-3xl font-serif font-bold text-gold">{mockVIPData.referrals}</span>
                </div>
                <Button variant="luxury" size="sm" className="w-full">
                  <Gift className="h-4 w-4 mr-2" />
                  Share Referral Link
                </Button>
              </Card>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <div className="animate-fade-in">
              <VIPNotes />
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="animate-fade-in">
              <Card variant="luxury" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-xl font-semibold">Booking History</h3>
                  <p className="text-sm text-muted-foreground">Last appointment info included</p>
                </div>
                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-xl bg-beige hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.date} with {booking.artist}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Days since last visit</p>
                          <p className="font-serif font-semibold text-foreground">{booking.lastAppointmentDays} days</p>
                        </div>
                        {booking.canReschedule && (
                          <Button variant="soft" size="sm">Reschedule</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="soft">View All History</Button>
                </div>
              </Card>
            </div>
          )}

          {/* Discounts Tab - VIP Only */}
          {activeTab === "discounts" && isVIP && (
            <div className="animate-fade-in">
              <Card variant="luxury" className="p-8 text-center mb-8 bg-gradient-to-br from-gold/10 via-cream to-beige">
                <div className="w-20 h-20 mx-auto rounded-full bg-gold/20 flex items-center justify-center mb-4">
                  <Gem className="h-10 w-10 text-gold" />
                </div>
                <h3 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  VIP Exclusive Discounts
                </h3>
                <p className="text-muted-foreground mb-2">Your loyalty is rewarded with these exclusive savings</p>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vipDiscounts.map((discount) => (
                  <Card 
                    key={discount.name} 
                    className="p-6 transition-all duration-300 border-2 bg-gradient-to-br from-gold/10 to-cream/50 border-gold/30 hover:shadow-gold"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-4">
                      <discount.icon className="h-7 w-7 text-gold" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-serif font-bold text-gold">{discount.value}</span>
                      <span className="text-sm text-muted-foreground">savings</span>
                    </div>
                    <h4 className="font-serif font-semibold text-foreground mb-1">{discount.name}</h4>
                    <p className="text-sm text-muted-foreground">{discount.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-gold">
                      <Sparkles className="h-3 w-3" />
                      <span>Active</span>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Gift Voucher Section */}
              <Card className="mt-8 p-6 bg-gradient-to-r from-charcoal to-charcoal/90 text-cream">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-xl font-semibold mb-2">Lash Extensions Course Gift Voucher</h4>
                    <p className="text-cream/70">Purchase a $500 gift voucher for our lash extensions course</p>
                  </div>
                  <Button variant="luxury" className="flex-shrink-0">
                    <Gift className="h-4 w-4 mr-2" />
                    Purchase Voucher
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VIP;
