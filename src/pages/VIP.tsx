import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Crown, Star, Trophy, Gift, Heart, Sparkles, Calendar, 
  Clock, TrendingUp, Award, Gem, Zap, ChevronRight,
  PartyPopper, Users, Target, PenLine
} from "lucide-react";
import { Link } from "react-router-dom";
import VIPProfileExamples from "@/components/vip/VIPProfileExamples";
import VIPNotes from "@/components/vip/VIPNotes";

// Mock VIP data - would come from database
const mockVIPData = {
  memberSince: "March 2022",
  totalVisits: 47,
  totalSpent: 4850,
  loyaltyPoints: 2420,
  currentTier: "diamond" as const,
  nextTierProgress: 85,
  streak: 12, // months
  referrals: 8,
  upcomingAppointment: {
    date: "January 15, 2024",
    time: "2:00 PM",
    service: "Mega Volume Full Set",
    artist: "Lash Mama"
  }
};

const tiers = [
  { name: "Bronze", icon: Star, threshold: 0, color: "text-amber-600", bgColor: "bg-amber-100", perks: ["5% off all services", "Birthday reward"] },
  { name: "Silver", icon: Sparkles, threshold: 500, color: "text-gray-400", bgColor: "bg-gray-100", perks: ["10% off all services", "Priority booking", "Free lash brush kit"] },
  { name: "Gold", icon: Trophy, threshold: 1500, color: "text-gold", bgColor: "bg-gold/10", perks: ["15% off all services", "Exclusive products", "VIP events access"] },
  { name: "Diamond", icon: Gem, threshold: 3000, color: "text-cyan-400", bgColor: "bg-cyan-50", perks: ["20% off all services", "Personal artist line", "Champagne service", "First access to new treatments"] },
];

const achievements = [
  { id: "first-booking", name: "First Steps", description: "Completed your first booking", icon: Calendar, unlocked: true },
  { id: "loyalty-3", name: "Loyal Beauty", description: "3 consecutive monthly visits", icon: Heart, unlocked: true },
  { id: "referral-1", name: "Beauty Ambassador", description: "Referred your first friend", icon: Users, unlocked: true },
  { id: "loyalty-6", name: "Dedicated Client", description: "6 consecutive monthly visits", icon: TrendingUp, unlocked: true },
  { id: "mega-volume", name: "Volume Queen", description: "5 mega volume appointments", icon: Crown, unlocked: true },
  { id: "loyalty-12", name: "Anniversary Star", description: "12 consecutive monthly visits", icon: Award, unlocked: true },
  { id: "referral-5", name: "Inner Circle", description: "Referred 5 friends", icon: Sparkles, unlocked: true },
  { id: "big-spender", name: "VIP Elite", description: "Spent over $5,000", icon: Gem, unlocked: false },
  { id: "referral-10", name: "Brand Champion", description: "Referred 10 friends", icon: Trophy, unlocked: false },
];

const bookingHistory = [
  { id: 1, date: "Dec 28, 2023", service: "Volume Refills", artist: "Nikki", amount: 95 },
  { id: 2, date: "Nov 30, 2023", service: "Mega Volume Full Set", artist: "Lash Mama", amount: 280 },
  { id: 3, date: "Oct 25, 2023", service: "Volume Refills", artist: "Nikki", amount: 95 },
  { id: 4, date: "Sep 28, 2023", service: "Bridal Makeup Trial", artist: "Beau", amount: 150 },
  { id: 5, date: "Aug 30, 2023", service: "Volume Full Set", artist: "Lash Mama", amount: 220 },
];

const VIP = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "history" | "achievements" | "rewards">("overview");
  const currentTierIndex = tiers.findIndex(t => t.name.toLowerCase() === mockVIPData.currentTier);
  const currentTier = tiers[currentTierIndex];
  const nextTier = tiers[currentTierIndex + 1];

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
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", currentTier.bgColor)}>
                    <currentTier.icon className={cn("h-8 w-8", currentTier.color)} />
                  </div>
                  <div>
                    <p className="text-cream/70 text-sm">Your Status</p>
                    <h2 className="font-serif text-3xl font-semibold text-cream">
                      {currentTier.name} Member
                    </h2>
                  </div>
                </div>
                <p className="text-cream/60 mb-2">Member since {mockVIPData.memberSince}</p>
                <div className="flex items-center gap-2 text-gold">
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">{mockVIPData.loyaltyPoints.toLocaleString()} Lash Points</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                  <p className="text-3xl font-serif font-bold text-cream">{mockVIPData.totalVisits}</p>
                  <p className="text-cream/60 text-sm">Total Visits</p>
                </div>
                <div className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                  <p className="text-3xl font-serif font-bold text-gradient-gold">{mockVIPData.streak}</p>
                  <p className="text-cream/60 text-sm">Month Streak</p>
                </div>
                <div className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                  <p className="text-3xl font-serif font-bold text-cream">${mockVIPData.totalSpent.toLocaleString()}</p>
                  <p className="text-cream/60 text-sm">Total Invested</p>
                </div>
              </div>
            </div>

            {/* Progress to next tier */}
            {nextTier && (
              <div className="relative z-10 mt-8 pt-8 border-t border-cream/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cream/70 text-sm">Progress to {nextTier.name}</span>
                  <span className="text-gold text-sm font-medium">{mockVIPData.nextTierProgress}%</span>
                </div>
                <div className="h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-gold to-gold/80 rounded-full transition-all duration-500"
                    style={{ width: `${mockVIPData.nextTierProgress}%` }}
                  />
                </div>
                <p className="text-cream/50 text-xs mt-2">
                  Spend ${nextTier.threshold - mockVIPData.totalSpent} more to unlock {nextTier.name} perks
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
              { id: "achievements", label: "Achievements", icon: Trophy },
              { id: "rewards", label: "Rewards", icon: Gift },
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
                    </div>
                    <div className="flex gap-2">
                      <Button variant="soft" size="sm">Reschedule</Button>
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
                    Redeem Points
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* Tier Benefits */}
              <Card variant="elevated" className="p-6 lg:col-span-3">
                <div className="flex items-center gap-2 mb-6">
                  <Crown className="h-5 w-5 text-gold" />
                  <h3 className="font-serif text-xl font-semibold">Your {currentTier.name} Benefits</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentTier.perks.map((perk, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-beige">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-gold" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{perk}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Referral Stats */}
              <Card className="p-6 lg:col-span-2 bg-gradient-to-br from-gold/10 to-cream/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gold" />
                    <h3 className="font-serif text-xl font-semibold">Your Referrals</h3>
                  </div>
                  <span className="text-3xl font-serif font-bold text-gold">{mockVIPData.referrals}</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  You've earned ${mockVIPData.referrals * 25} in referral rewards! Each friend who books earns you $25.
                </p>
                <Button variant="luxury">
                  <Gift className="h-4 w-4 mr-2" />
                  Share Referral Link
                </Button>
              </Card>

              {/* Birthday Reward */}
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-cream/50">
                <div className="flex items-center gap-2 mb-3">
                  <PartyPopper className="h-5 w-5 text-pink-500" />
                  <h3 className="font-serif text-lg font-semibold">Birthday Reward</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  A special gift awaits you on your birthday month! Make sure your birthday is set in your profile.
                </p>
                <Button variant="soft" size="sm">Update Birthday</Button>
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
                <h3 className="font-serif text-xl font-semibold mb-6">Booking History</h3>
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
                            {booking.date} • With {booking.artist}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-serif font-semibold text-foreground">${booking.amount}</p>
                        <p className="text-xs text-gold">+{booking.amount} pts</p>
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

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={cn(
                      "p-6 transition-all duration-200",
                      achievement.unlocked 
                        ? "bg-gradient-to-br from-gold/10 to-cream/30 border-gold/30" 
                        : "opacity-60 grayscale"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center",
                        achievement.unlocked ? "bg-gold/20" : "bg-muted"
                      )}>
                        <achievement.icon className={cn(
                          "h-7 w-7",
                          achievement.unlocked ? "text-gold" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-foreground">
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <span className="inline-flex items-center gap-1 text-xs text-gold mt-2">
                            <Sparkles className="h-3 w-3" />
                            Unlocked
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === "rewards" && (
            <div className="animate-fade-in">
              <Card variant="luxury" className="p-8 text-center mb-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gold/20 flex items-center justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-gold" />
                </div>
                <h3 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  {mockVIPData.loyaltyPoints.toLocaleString()} Points
                </h3>
                <p className="text-muted-foreground mb-6">Available to redeem</p>
                <Button variant="luxury" size="lg">
                  Browse Rewards
                </Button>
              </Card>

              <h3 className="font-serif text-xl font-semibold mb-4">Available Rewards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Free Lash Lift", points: 500, icon: Heart },
                  { name: "$25 Off Any Service", points: 750, icon: Gem },
                  { name: "Luxury Lash Serum", points: 1000, icon: Sparkles },
                  { name: "Free Classic Set", points: 1500, icon: Crown },
                  { name: "VIP Spa Day", points: 3000, icon: Star },
                  { name: "Exclusive Masterclass", points: 5000, icon: Award },
                ].map((reward) => (
                  <Card key={reward.name} className="p-6 hover:shadow-medium transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-4">
                      <reward.icon className="h-7 w-7 text-gold" />
                    </div>
                    <h4 className="font-serif font-semibold text-foreground mb-2">{reward.name}</h4>
                    <p className="text-gold font-medium">{reward.points.toLocaleString()} points</p>
                    <Button 
                      variant="soft" 
                      size="sm" 
                      className="w-full mt-4"
                      disabled={mockVIPData.loyaltyPoints < reward.points}
                    >
                      {mockVIPData.loyaltyPoints >= reward.points ? "Redeem" : "Need more points"}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VIP;
