import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
} from "lucide-react";

const AdminAnalytics = () => {
  const revenueData = [
    { month: "Jul", amount: 12400 },
    { month: "Aug", amount: 14200 },
    { month: "Sep", amount: 13800 },
    { month: "Oct", amount: 16500 },
    { month: "Nov", amount: 15200 },
    { month: "Dec", amount: 18900 },
    { month: "Jan", amount: 17870 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.amount));

  const serviceBreakdown = [
    { name: "Mega Volume Full Set", revenue: 8420, bookings: 28, percent: 35 },
    { name: "Volume Full Set", revenue: 5640, bookings: 22, percent: 24 },
    { name: "Volume Refills", revenue: 4280, bookings: 36, percent: 18 },
    { name: "Natural/Hybrid Full Set", revenue: 3120, bookings: 18, percent: 13 },
    { name: "Other Services", revenue: 2410, bookings: 15, percent: 10 },
  ];

  const staffPerformance = [
    { name: "Lash Mama", revenue: 8560, bookings: 42, rating: 5.0, color: "bg-gold" },
    { name: "Nikki", revenue: 6420, bookings: 38, rating: 4.9, color: "bg-gold/80" },
    { name: "Beau", revenue: 4280, bookings: 28, rating: 4.8, color: "bg-gold/60" },
    { name: "Natali", revenue: 2180, bookings: 18, rating: 4.7, color: "bg-gold/40" },
  ];

  const stats = [
    { 
      label: "Total Revenue (This Month)", 
      value: "$23,870", 
      change: "+18%",
      trend: "up",
      icon: DollarSign, 
      color: "emerald",
      previous: "$20,230 last month"
    },
    { 
      label: "Total Bookings", 
      value: "126", 
      change: "+12%",
      trend: "up",
      icon: Calendar, 
      color: "gold",
      previous: "112 last month"
    },
    { 
      label: "New Clients", 
      value: "24", 
      change: "+8%",
      trend: "up",
      icon: Users, 
      color: "violet",
      previous: "22 last month"
    },
    { 
      label: "Average Rating", 
      value: "4.9", 
      change: "+0.1",
      trend: "up",
      icon: Star, 
      color: "amber",
      previous: "4.8 last month"
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Analytics</h2>
          <p className="text-muted-foreground">Revenue, performance, and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                stat.color === "emerald" && "bg-gold/20",
                stat.color === "gold" && "bg-gold/20",
                stat.color === "violet" && "bg-gold/15",
                stat.color === "amber" && "bg-gold/10",
              )}>
                <stat.icon className={cn(
                  "h-6 w-6",
                  stat.color === "emerald" && "text-gold",
                  stat.color === "gold" && "text-gold",
                  stat.color === "violet" && "text-gold-dark",
                  stat.color === "amber" && "text-gold-light",
                )} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                stat.trend === "up" ? "text-gold-dark bg-gold/20" : "text-destructive bg-destructive/10"
              )}>
                {stat.trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {stat.change}
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.previous}</p>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-lg font-semibold">Revenue Trend</h3>
            <p className="text-sm text-muted-foreground">Last 7 months performance</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-serif font-bold text-gold">$109,070</span>
            <span className="text-emerald-600 text-sm flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" />
              15% YoY
            </span>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-3 h-64">
          {revenueData.map((data, i) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground mb-1">${(data.amount / 1000).toFixed(1)}k</span>
              <div className="w-full relative flex items-end justify-center h-48">
                <div 
                  className={cn(
                    "w-full rounded-t-lg transition-all duration-500",
                    i === revenueData.length - 1 
                      ? "bg-gradient-to-t from-gold to-gold/60" 
                      : "bg-gradient-to-t from-gold/40 to-gold/20"
                  )}
                  style={{ 
                    height: `${(data.amount / maxRevenue) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{data.month}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Breakdown */}
        <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg font-semibold">Service Breakdown</h3>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            {serviceBreakdown.map((service, i) => (
              <div key={service.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{service.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{service.bookings} bookings</span>
                    <span className="text-sm font-medium text-gold">${(service.revenue / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-700",
                      i === 0 && "bg-gold",
                      i === 1 && "bg-gold/80",
                      i === 2 && "bg-gold/60",
                      i === 3 && "bg-gold/40",
                      i === 4 && "bg-gold/20",
                    )}
                    style={{ width: `${service.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Staff Performance */}
        <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg font-semibold">Staff Performance</h3>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            {staffPerformance.map((staff) => (
              <div 
                key={staff.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
              >
                <div className={cn("w-3 h-12 rounded-full", staff.color)} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{staff.name}</span>
                    <span className="text-lg font-serif font-bold text-gold">
                      ${(staff.revenue / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {staff.bookings} bookings
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                      {staff.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
