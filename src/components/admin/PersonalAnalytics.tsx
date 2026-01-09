import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Calendar, TrendingUp, CheckCircle2, Users, ClockIcon } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

interface PersonalAnalyticsProps {
  staffName: string;
  isLashMama?: boolean;
}

const PersonalAnalytics = ({ staffName, isLashMama = false }: PersonalAnalyticsProps) => {
  // Sample data - would come from backend in production
  const weeklyData = [
    { day: "Mon", available: 8, scheduled: 6.5, actual: 6.5, completed: 4 },
    { day: "Tue", available: 8, scheduled: 7, actual: 7, completed: 5 },
    { day: "Wed", available: 8, scheduled: 5.5, actual: 5.5, completed: 4 },
    { day: "Thu", available: 8, scheduled: 8, actual: 6, completed: 3 },
    { day: "Fri", available: 8, scheduled: 7.5, actual: 0, completed: 0 },
    { day: "Sat", available: 6, scheduled: 6, actual: 0, completed: 0 },
    { day: "Sun", available: 0, scheduled: 0, actual: 0, completed: 0 },
  ];

  const totalAvailable = weeklyData.reduce((acc, day) => acc + day.available, 0);
  const totalScheduled = weeklyData.reduce((acc, day) => acc + day.scheduled, 0);
  const totalActual = weeklyData.reduce((acc, day) => acc + day.actual, 0);
  const totalCompleted = weeklyData.reduce((acc, day) => acc + day.completed, 0);
  const utilizationRate = Math.round((totalScheduled / totalAvailable) * 100);

  const stats = [
    { 
      label: "Available Hours", 
      value: `${totalAvailable}h`, 
      icon: ClockIcon, 
      color: "gold",
      description: "Total hours you're available this week"
    },
    { 
      label: "Scheduled Hours", 
      value: `${totalScheduled}h`, 
      icon: Calendar, 
      color: "gold",
      description: "Hours with booked appointments"
    },
    { 
      label: "Actual Working Hours", 
      value: `${totalActual}h`, 
      icon: Clock, 
      color: "gold",
      description: "Hours with completed appointments"
    },
    { 
      label: "Completed Clients", 
      value: `${totalCompleted}`, 
      icon: Users, 
      color: "gold",
      description: "Clients served this week"
    },
    { 
      label: "Utilization Rate", 
      value: `${utilizationRate}%`, 
      icon: TrendingUp, 
      color: "gold",
      description: "Scheduled vs available hours"
    },
  ];

  const chartConfig = {
    available: {
      label: "Available",
      color: "hsl(37, 50%, 85%)",
    },
    scheduled: {
      label: "Scheduled",
      color: "hsl(37, 60%, 55%)",
    },
    actual: {
      label: "Actual",
      color: "hsl(37, 70%, 70%)",
    },
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
            {isLashMama ? "Your Analytics" : `${staffName}'s Analytics`}
          </h2>
          <p className="text-sm text-muted-foreground">Track your weekly hours, bookings, and performance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-3 md:p-5 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-gold transition-all duration-300 group relative">
            <div className="flex items-start">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/10">
                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-gold" />
              </div>
            </div>
            <div className="mt-3 md:mt-4">
              <p className="text-xl md:text-3xl font-serif font-bold text-foreground">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{stat.label}</p>
            </div>
            {/* Tooltip on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/95 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3">
              <p className="text-xs text-cream text-center">{stat.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Hours Chart */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold">Weekly Hours Overview</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Available, Scheduled, and Actual working hours</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gold/30" />
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gold" />
              <span className="text-muted-foreground">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gold/70" />
              <span className="text-muted-foreground">Actual</span>
            </div>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barGap={2}>
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
                tickFormatter={(value) => `${value}h`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="available" 
                radius={[6, 6, 0, 0]} 
                fill="hsl(37, 50%, 85%)"
                maxBarSize={30}
              />
              <Bar 
                dataKey="scheduled" 
                radius={[6, 6, 0, 0]} 
                fill="hsl(37, 60%, 55%)"
                maxBarSize={30}
              />
              <Bar 
                dataKey="actual" 
                radius={[6, 6, 0, 0]} 
                fill="hsl(37, 70%, 70%)"
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Daily Breakdown */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <h3 className="font-serif text-base md:text-lg font-semibold mb-4">Daily Breakdown</h3>
        <div className="space-y-3">
          {weeklyData.map((day) => (
            <div key={day.day} className="flex items-center gap-4">
              <span className="w-10 text-sm font-medium text-muted-foreground">{day.day}</span>
              <div className="flex-1 space-y-1">
                {/* Available hours bar (background) */}
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  {/* Scheduled overlay */}
                  <div 
                    className="absolute h-full bg-gold/40 rounded-full transition-all duration-500"
                    style={{ width: `${(day.available / 8) * 100}%` }}
                  />
                  {/* Actual working overlay */}
                  <div 
                    className="absolute h-full bg-gradient-to-r from-gold to-gold/80 rounded-full transition-all duration-500"
                    style={{ width: `${(day.actual / 8) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-right min-w-[120px]">
                <span className="text-xs text-muted-foreground">{day.available}h avail</span>
                <span className="text-xs text-muted-foreground mx-1">•</span>
                <span className="text-sm font-medium text-foreground">{day.scheduled}h sched</span>
                {day.actual > 0 && (
                  <span className="text-xs text-gold ml-1">({day.actual}h done)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Clients Breakdown */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <h3 className="font-serif text-base md:text-lg font-semibold mb-4">Clients This Week</h3>
        <div className="grid grid-cols-7 gap-2">
          {weeklyData.map((day) => (
            <div key={day.day} className="text-center">
              <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
              <div className={cn(
                "w-10 h-10 mx-auto rounded-xl flex items-center justify-center font-semibold",
                day.completed > 0 
                  ? "bg-gold/20 text-gold" 
                  : "bg-muted text-muted-foreground"
              )}>
                {day.completed}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Clients</span>
          <span className="text-lg font-serif font-semibold text-gold">{totalCompleted}</span>
        </div>
      </Card>
    </div>
  );
};

export default PersonalAnalytics;
