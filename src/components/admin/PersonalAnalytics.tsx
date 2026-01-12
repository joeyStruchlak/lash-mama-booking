import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  Users, 
  Award,
  Cake,
  CalendarDays,
  Edit2,
  Plus,
  Star,
  Trophy,
  Target,
  Sparkles,
  CalendarOff,
  CheckCircle2,
  XCircle,
  Clock4,
  ChevronRight,
  Heart
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

interface PersonalAnalyticsProps {
  staffName: string;
  isLashMama?: boolean;
  staffImage?: string;
  staffTitle?: string;
}

const PersonalAnalytics = ({ 
  staffName, 
  isLashMama = false,
  staffImage = "/placeholder.svg",
  staffTitle = "Lash Artist"
}: PersonalAnalyticsProps) => {
  const [activeTimeRange, setActiveTimeRange] = useState<'week' | 'month' | 'year'>('week');

  // Staff profile data
  const profileData = {
    name: staffName,
    title: isLashMama ? "Founder & Master Lash Artist" : staffTitle,
    rating: 4.9,
    totalReviews: 156,
    memberSince: new Date("2022-03-15"),
    birthday: new Date("1990-06-21"),
    totalClientsAllTime: 2847,
    specialties: isLashMama 
      ? ["Award Winner", "Master Certified", "Signature Techniques"] 
      : ["Volume Expert", "Natural Looks", "Lash Lifts"],
    tier: isLashMama ? "premium" : "senior"
  };

  // Calculate tenure
  const now = new Date();
  const tenure = {
    years: Math.floor((now.getTime() - profileData.memberSince.getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
    months: Math.floor(((now.getTime() - profileData.memberSince.getTime()) % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000))
  };

  // Weekly schedule
  const weeklySchedule = [
    { day: "Monday", hours: "9:00 AM - 6:00 PM", isWorking: true },
    { day: "Tuesday", hours: "9:00 AM - 6:00 PM", isWorking: true },
    { day: "Wednesday", hours: "10:00 AM - 4:00 PM", isWorking: true },
    { day: "Thursday", hours: "9:00 AM - 6:00 PM", isWorking: true },
    { day: "Friday", hours: "9:00 AM - 6:00 PM", isWorking: true },
    { day: "Saturday", hours: "Off", isWorking: false },
    { day: "Sunday", hours: "Off", isWorking: false },
  ];

  // Time off requests
  const timeOffRequests = [
    { id: 1, startDate: "Jan 20, 2026", endDate: "Jan 22, 2026", reason: "Personal", status: "approved" },
    { id: 2, startDate: "Feb 14, 2026", endDate: "Feb 14, 2026", reason: "Holiday", status: "pending" },
    { id: 3, startDate: "Dec 24, 2025", endDate: "Dec 26, 2025", reason: "Christmas", status: "approved" },
  ];

  // Monthly client data for chart
  const monthlyClientData = [
    { month: "Jul", clients: 89, target: 80 },
    { month: "Aug", clients: 102, target: 90 },
    { month: "Sep", clients: 95, target: 90 },
    { month: "Oct", clients: 118, target: 100 },
    { month: "Nov", clients: 132, target: 110 },
    { month: "Dec", clients: 145, target: 120 },
  ];

  // Weekly performance data
  const weeklyPerformanceData = [
    { day: "Mon", clients: 6, hours: 7.5, revenue: 420 },
    { day: "Tue", clients: 7, hours: 8, revenue: 490 },
    { day: "Wed", clients: 4, hours: 5, revenue: 280 },
    { day: "Thu", clients: 8, hours: 8, revenue: 560 },
    { day: "Fri", clients: 5, hours: 6.5, revenue: 350 },
    { day: "Sat", clients: 0, hours: 0, revenue: 0 },
    { day: "Sun", clients: 0, hours: 0, revenue: 0 },
  ];

  // Stats for this period
  const thisWeekClients = weeklyPerformanceData.reduce((acc, d) => acc + d.clients, 0);
  const thisWeekHours = weeklyPerformanceData.reduce((acc, d) => acc + d.hours, 0);
  const avgClientsPerDay = (thisWeekClients / 5).toFixed(1);

  // Milestones
  const milestones = [
    { icon: Users, label: "First 100 Clients", achieved: true, date: "Apr 2022" },
    { icon: Star, label: "5-Star Rating", achieved: true, date: "Jun 2022" },
    { icon: Trophy, label: "1,000 Clients", achieved: true, date: "Nov 2023" },
    { icon: Award, label: "Top Performer", achieved: true, date: "Mar 2024" },
    { icon: Heart, label: "2,500 Happy Clients", achieved: true, date: "Aug 2025" },
    { icon: Sparkles, label: "3,000 Clients", achieved: false, target: 3000 },
  ];

  const chartConfig = {
    clients: {
      label: "Clients",
      color: "hsl(37, 60%, 55%)",
    },
    target: {
      label: "Target",
      color: "hsl(37, 40%, 75%)",
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'pending': return 'bg-gold/10 text-gold border-gold/20';
      case 'rejected': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle2;
      case 'pending': return Clock4;
      case 'rejected': return XCircle;
      default: return Clock4;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header Card */}
      <Card className="p-6 border-0 bg-gradient-to-br from-card via-card to-gold/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
          {/* Avatar & Basic Info */}
          <div className="flex items-start gap-4 flex-1">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-gold/30 shadow-lg">
                <AvatarImage src={staffImage} alt={staffName} />
                <AvatarFallback className="bg-gold/20 text-gold text-xl font-serif">
                  {staffName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isLashMama && (
                <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-1.5">
                  <Award className="h-3.5 w-3.5 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-serif text-2xl font-semibold text-foreground">{staffName}</h2>
                <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30 font-medium">
                  {profileData.tier}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-0.5">{profileData.title}</p>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span className="text-sm font-medium">{profileData.totalReviews}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span className="text-sm font-medium">{profileData.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <div className="text-center md:text-right">
              <p className="text-2xl md:text-3xl font-serif font-bold text-gold">{tenure.years}y {tenure.months}m</p>
              <p className="text-xs text-muted-foreground mt-1">At Lash Mama</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">{profileData.totalClientsAllTime.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Clients</p>
            </div>
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-1.5">
                <Cake className="h-4 w-4 text-pink-400" />
                <p className="text-lg font-medium text-foreground">
                  {profileData.birthday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Birthday</p>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/50">
          {profileData.specialties.map((specialty) => (
            <Badge key={specialty} variant="outline" className="bg-gold/5 text-gold/80 border-gold/20 font-normal">
              {specialty}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <Card className="p-5 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-lg font-semibold">Weekly Schedule</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-gold hover:text-gold hover:bg-gold/10">
              <Edit2 className="h-4 w-4 mr-1.5" />
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {weeklySchedule.filter(d => d.isWorking).map((day) => (
              <div 
                key={day.day} 
                className="p-3 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50"
              >
                <p className="font-medium text-foreground">{day.day}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{day.hours}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Weekly Hours</span>
              <span className="font-semibold text-foreground">
                {weeklySchedule.filter(d => d.isWorking).length * 8}h scheduled
              </span>
            </div>
          </div>
        </Card>

        {/* Time Off Requests */}
        <Card className="p-5 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <CalendarOff className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-lg font-semibold">Time Off Requests</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-gold hover:text-gold hover:bg-gold/10">
              <Plus className="h-4 w-4 mr-1.5" />
              Request
            </Button>
          </div>

          <div className="space-y-3">
            {timeOffRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status);
              return (
                <div 
                  key={request.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      request.status === 'approved' ? "bg-green-500/10" : "bg-gold/10"
                    )}>
                      <StatusIcon className={cn(
                        "h-4 w-4",
                        request.status === 'approved' ? "text-green-600" : "text-gold"
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {request.startDate === request.endDate 
                          ? request.startDate 
                          : `${request.startDate} - ${request.endDate}`
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">{request.reason}</p>
                    </div>
                  </div>
                  <Badge className={cn("capitalize text-xs", getStatusColor(request.status))}>
                    {request.status}
                  </Badge>
                </div>
              );
            })}
          </div>

          <Button variant="ghost" className="w-full mt-3 text-muted-foreground hover:text-foreground">
            View All Requests
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Card>
      </div>

      {/* Performance Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* This Week Stats */}
        <Card className="p-5 border-0 bg-gradient-to-br from-gold/10 via-card to-card">
          <h3 className="font-serif text-lg font-semibold mb-4">This Week</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-foreground">{thisWeekClients}</p>
                  <p className="text-xs text-muted-foreground">Clients Served</p>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                +12% vs last week
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-foreground">{thisWeekHours}h</p>
                  <p className="text-xs text-muted-foreground">Hours Worked</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Target className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-foreground">{avgClientsPerDay}</p>
                  <p className="text-xs text-muted-foreground">Avg Clients/Day</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Weekly Performance Chart */}
        <Card className="p-5 border-0 bg-gradient-to-br from-card to-card/80 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold">Weekly Performance</h3>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                <span className="text-muted-foreground">Clients</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gold/40" />
                <span className="text-muted-foreground">Hours</span>
              </div>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPerformanceData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="clients" 
                  radius={[8, 8, 0, 0]} 
                  fill="hsl(37, 60%, 55%)"
                  maxBarSize={40}
                />
                <Bar 
                  dataKey="hours" 
                  radius={[8, 8, 0, 0]} 
                  fill="hsl(37, 50%, 75%)"
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </div>

      {/* Monthly Trend & Milestones */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Monthly Client Trend */}
        <Card className="p-5 border-0 bg-gradient-to-br from-card to-card/80 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-lg font-semibold">Client Growth Trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 6 months performance vs target</p>
            </div>
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
              {(['week', 'month', 'year'] as const).map((range) => (
                <Button
                  key={range}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-xs h-7 px-3 capitalize",
                    activeTimeRange === range && "bg-gold text-white hover:bg-gold hover:text-white"
                  )}
                  onClick={() => setActiveTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyClientData}>
                <defs>
                  <linearGradient id="clientGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(37, 60%, 55%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(37, 60%, 55%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone"
                  dataKey="target" 
                  stroke="hsl(37, 40%, 75%)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="clients"
                  stroke="hsl(37, 60%, 55%)"
                  strokeWidth={3}
                  fill="url(#clientGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Milestones */}
        <Card className="p-5 border-0 bg-gradient-to-br from-card to-card/80 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-gold" />
            <h3 className="font-serif text-lg font-semibold">Milestones</h3>
          </div>

          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-xl transition-all",
                  milestone.achieved 
                    ? "bg-gold/10 border border-gold/20" 
                    : "bg-muted/30 border border-dashed border-border"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  milestone.achieved ? "bg-gold/20" : "bg-muted"
                )}>
                  <milestone.icon className={cn(
                    "h-4 w-4",
                    milestone.achieved ? "text-gold" : "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1">
                  <p className={cn(
                    "text-sm font-medium",
                    milestone.achieved ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {milestone.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {milestone.achieved ? milestone.date : `Target: ${milestone.target?.toLocaleString()}`}
                  </p>
                </div>
                {milestone.achieved && (
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Next milestone</span>
              <span className="text-sm font-medium text-gold">
                {(3000 - profileData.totalClientsAllTime).toLocaleString()} clients away
              </span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold to-gold/70 rounded-full transition-all duration-1000"
                style={{ width: `${(profileData.totalClientsAllTime / 3000) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PersonalAnalytics;
