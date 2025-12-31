import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Crown, Star, Trophy, Gift, Heart, Sparkles, Calendar, 
  Clock, ChevronRight, Users, Target, PenLine, Gem,
  Percent, PartyPopper
} from "lucide-react";
import { Link } from "react-router-dom";
import VIPProfileExamples from "@/components/vip/VIPProfileExamples";
import VIPNotes from "@/components/vip/VIPNotes";

// Mock VIP data - would come from database
const mockVIPData = {
  memberSince: "March 2022",
  consecutiveBookings: 12,
  currentTier: "vip" as const,
  streak: 12, // consecutive bookings
  referrals: 8,
  birthday: "February 14",
  upcomingAppointment: {
    date: "January 15, 2024",
    time: "2:00 PM",
    service: "Mega Volume Full Set",
    artist: "Lash Mama",
    lastAppointment: "December 20, 2023"
  }
};

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
    name: "$100 Gift Pack at Year End", 
    description: "Exclusive annual VIP appreciation gift",
    icon: Gift,
    value: "$100"
  },
];

const bookingHistory = [
  { id: 1, date: "Dec 28, 2023", service: "Volume Refills", artist: "Nikki", lastAppointmentDays: 14 },
  { id: 2, date: "Nov 30, 2023", service: "Mega Volume Full Set", artist: "Lash Mama", lastAppointmentDays: 28 },
  { id: 3, date: "Oct 25, 2023", service: "Volume Refills", artist: "Nikki", lastAppointmentDays: 21 },
  { id: 4, date: "Sep 28, 2023", service: "Bridal Makeup Trial", artist: "Beau", lastAppointmentDays: 27 },
  { id: 5, date: "Aug 30, 2023", service: "Volume Full Set", artist: "Lash Mama", lastAppointmentDays: 30 },
];

const VIP = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "history" | "discounts">("overview");
  const bookingsToVIP = 10 - mockVIPData.consecutiveBookings;
  const isVIP = mockVIPData.consecutiveBookings >= 10;

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
                    <Gem className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream/70 text-sm">Your Status</p>
                    <h2 className="font-serif text-3xl font-semibold text-cream flex items-center gap-2">
                      {isVIP ? "VIP Member" : "Valued Client"}
                      {isVIP && <Gem className="h-5 w-5 text-gold" />}
                    </h2>
                  </div>
                </div>
                <p className="text-cream/60 mb-2">Member since {mockVIPData.memberSince}</p>
                {isVIP && (
                  <div className="flex items-center gap-2 text-gold">
                    <Crown className="h-4 w-4" />
                    <span className="font-medium">Exclusive VIP Benefits Active</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
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
              </div>
            </div>

            {/* VIP Progress - only show if not VIP */}
            {!isVIP && (
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
                  {bookingsToVIP} more consecutive bookings to unlock VIP benefits
                  <span className="block text-cream/40 mt-1">(Max 3 month break between appointments to maintain streak)</span>
                </p>
              </div>
            )}
          </div>

          {/* VIP Profile Examples */}
          <VIPProfileExamples />

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Overview", icon: Target },
              { id: "notes", label: "My Notes", icon: PenLine },
              { id: "history", label: "History", icon: Clock },
              { id: "discounts", label: "VIP Discounts", icon: Percent },
            ].map((tab) => (
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
                  <Button variant="soft" className="w-full justify-between">
                    View Discounts
                    <Percent className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* VIP Benefits Preview */}
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

              {/* Birthday Reward */}
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-cream/50 lg:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <PartyPopper className="h-5 w-5 text-pink-500" />
                  <h3 className="font-serif text-lg font-semibold">Birthday Discount</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Get $20 off your refill during your birthday month! Your birthday: <span className="text-gold font-medium">{mockVIPData.birthday}</span>
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
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Days since last visit</p>
                        <p className="font-serif font-semibold text-foreground">{booking.lastAppointmentDays} days</p>
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

          {/* Discounts Tab */}
          {activeTab === "discounts" && (
            <div className="animate-fade-in">
              <Card variant="luxury" className="p-8 text-center mb-8 bg-gradient-to-br from-gold/10 via-cream to-beige">
                <div className="w-20 h-20 mx-auto rounded-full bg-gold/20 flex items-center justify-center mb-4">
                  <Gem className="h-10 w-10 text-gold" />
                </div>
                <h3 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  VIP Exclusive Discounts
                </h3>
                <p className="text-muted-foreground mb-2">Your loyalty is rewarded with these exclusive savings</p>
                {!isVIP && (
                  <p className="text-sm text-gold">Complete {bookingsToVIP} more bookings to unlock all discounts</p>
                )}
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vipDiscounts.map((discount) => (
                  <Card 
                    key={discount.name} 
                    className={cn(
                      "p-6 transition-all duration-300 border-2",
                      isVIP 
                        ? "bg-gradient-to-br from-gold/10 to-cream/50 border-gold/30 hover:shadow-gold" 
                        : "opacity-60 border-transparent"
                    )}
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
                    {isVIP && (
                      <div className="mt-4 flex items-center gap-1 text-xs text-gold">
                        <Sparkles className="h-3 w-3" />
                        <span>Active</span>
                      </div>
                    )}
                    {!isVIP && (
                      <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3" />
                        <span>VIP Only</span>
                      </div>
                    )}
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
