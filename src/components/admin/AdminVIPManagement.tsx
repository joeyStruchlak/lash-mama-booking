import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Gem,
  Crown,
  Gift,
  Calendar,
  TrendingUp,
  Users,
  Star,
  Percent,
  Award,
  ChevronRight,
  Edit,
  MessageCircle,
  PartyPopper,
  Heart,
  Sparkles,
  Trophy,
} from "lucide-react";

const AdminVIPManagement = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const vipMembers = [
    {
      id: 1,
      name: "Sarah Mitchell",
      memberSince: "March 2022",
      streak: 24,
      totalSpent: "$4,280",
      lastVisit: "Jan 10, 2024",
      birthday: "Feb 14",
      discountsUsed: 12,
      referrals: 5,
    },
    {
      id: 2,
      name: "Emma Louise",
      memberSince: "June 2022",
      streak: 18,
      totalSpent: "$3,120",
      lastVisit: "Jan 8, 2024",
      birthday: "May 22",
      discountsUsed: 8,
      referrals: 3,
    },
    {
      id: 3,
      name: "Olivia Rose",
      memberSince: "September 2023",
      streak: 15,
      totalSpent: "$2,840",
      lastVisit: "Jan 5, 2024",
      birthday: "Aug 30",
      discountsUsed: 6,
      referrals: 2,
    },
    {
      id: 4,
      name: "Mia Chen",
      memberSince: "November 2023",
      streak: 10,
      totalSpent: "$1,920",
      lastVisit: "Jan 3, 2024",
      birthday: "Dec 5",
      discountsUsed: 4,
      referrals: 1,
    },
  ];

  const vipBenefits = [
    { name: "$10 Off Every Refill", icon: Percent, usageThisMonth: 18 },
    { name: "$20 Off Birthday Refills", icon: PartyPopper, usageThisMonth: 2 },
    { name: "$30 Off Mega Volume", icon: Crown, usageThisMonth: 5 },
    { name: "$30 Off Volume Set", icon: Sparkles, usageThisMonth: 8 },
    { name: "$20 Off Natural/Hybrid", icon: Heart, usageThisMonth: 4 },
    { name: "$400 Off Lash Courses", icon: Trophy, usageThisMonth: 1 },
    { name: "$100 Year-End Gift", icon: Gift, usageThisMonth: 0 },
  ];

  const stats = {
    totalVIP: vipMembers.length,
    activeThisMonth: 4,
    totalSaved: "$2,840",
    avgStreak: 17,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">VIP Program</h2>
          <p className="text-muted-foreground">Manage your VIP members and benefits</p>
        </div>
        <Button variant="luxury" size="sm" className="gap-2">
          <Gift className="h-4 w-4" />
          Send VIP Gift
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-0 bg-gradient-to-br from-gold/10 to-gold/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
              <Gem className="h-6 w-6 text-gold" />
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-foreground">{stats.totalVIP}</p>
              <p className="text-sm text-muted-foreground">VIP Members</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-5 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-foreground">{stats.activeThisMonth}</p>
              <p className="text-sm text-muted-foreground">Active This Month</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-foreground">{stats.avgStreak}</p>
              <p className="text-sm text-muted-foreground">Avg. Streak</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
              <Percent className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-foreground">{stats.totalSaved}</p>
              <p className="text-sm text-muted-foreground">VIP Savings</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Benefits Usage */}
      <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <h3 className="font-serif text-lg font-semibold mb-4">VIP Benefits Usage This Month</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {vipBenefits.map((benefit) => (
            <div 
              key={benefit.name}
              className="p-4 rounded-xl bg-muted/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <benefit.icon className="h-5 w-5 text-gold" />
                </div>
                <span className="text-2xl font-serif font-bold text-foreground">{benefit.usageThisMonth}</span>
              </div>
              <p className="text-xs text-muted-foreground">{benefit.name}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* VIP Members */}
      <div>
        <h3 className="font-serif text-lg font-semibold mb-4">VIP Members</h3>
        <div className="space-y-3">
          {vipMembers.map((member) => (
            <Card 
              key={member.id}
              className={cn(
                "p-5 border-0 bg-gradient-to-br from-card to-card/80 cursor-pointer transition-all duration-300 hover:shadow-gold",
                selectedMember === member.id && "ring-2 ring-gold shadow-gold"
              )}
              onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
            >
              <div className="flex items-start gap-4">
                {/* Avatar with VIP badge */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center ring-2 ring-gold">
                    <span className="font-serif text-xl font-semibold text-gold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-gold to-amber-400 flex items-center justify-center shadow-lg">
                    <Gem className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{member.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/20 text-gold flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      VIP
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Member since {member.memberSince}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                      {member.streak} streak
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {member.referrals} referrals
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <PartyPopper className="h-3.5 w-3.5" />
                      Birthday: {member.birthday}
                    </span>
                  </div>
                </div>

                {/* Total Spent */}
                <div className="text-right">
                  <p className="text-xl font-serif font-bold text-gold">{member.totalSpent}</p>
                  <p className="text-xs text-muted-foreground">Total spent</p>
                </div>

                <ChevronRight className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  selectedMember === member.id && "rotate-90"
                )} />
              </div>

              {/* Expanded Details */}
              {selectedMember === member.id && (
                <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                      <p className="text-lg font-serif font-bold text-foreground">{member.discountsUsed}</p>
                      <p className="text-xs text-muted-foreground">Discounts Used</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                      <p className="text-lg font-serif font-bold text-foreground">{member.referrals}</p>
                      <p className="text-xs text-muted-foreground">Friends Referred</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                      <p className="text-lg font-serif font-bold text-gold">{member.streak}</p>
                      <p className="text-xs text-muted-foreground">Booking Streak</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50 text-center">
                      <p className="text-lg font-serif font-bold text-foreground">{member.lastVisit}</p>
                      <p className="text-xs text-muted-foreground">Last Visit</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="luxury" className="gap-2">
                      <Gift className="h-4 w-4" />
                      Send Gift
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminVIPManagement;
