import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
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
    { day: "Mon", scheduled: 6.5, completed: 6.5 },
    { day: "Tue", scheduled: 7, completed: 7 },
    { day: "Wed", scheduled: 5.5, completed: 5.5 },
    { day: "Thu", scheduled: 8, completed: 6 },
    { day: "Fri", scheduled: 7.5, completed: 0 },
    { day: "Sat", scheduled: 6, completed: 0 },
    { day: "Sun", scheduled: 0, completed: 0 },
  ];

  const totalScheduled = weeklyData.reduce((acc, day) => acc + day.scheduled, 0);
  const totalCompleted = weeklyData.reduce((acc, day) => acc + day.completed, 0);
  const avgHoursPerDay = (totalScheduled / 6).toFixed(1);
  const completionRate = Math.round((totalCompleted / totalScheduled) * 100);

  const stats = [
    { 
      label: "Scheduled This Week", 
      value: `${totalScheduled}h`, 
      icon: Calendar, 
      color: "gold" 
    },
    { 
      label: "Completed Hours", 
      value: `${totalCompleted}h`, 
      icon: CheckCircle2, 
      color: "gold" 
    },
    { 
      label: "Avg Hours/Day", 
      value: `${avgHoursPerDay}h`, 
      icon: Clock, 
      color: "gold" 
    },
    { 
      label: "Completion Rate", 
      value: `${completionRate}%`, 
      icon: TrendingUp, 
      color: "gold" 
    },
  ];

  const chartConfig = {
    scheduled: {
      label: "Scheduled",
      color: "hsl(37, 60%, 55%)",
    },
    completed: {
      label: "Completed",
      color: "hsl(37, 70%, 75%)",
    },
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
            {isLashMama ? "Your Analytics" : `${staffName}'s Analytics`}
          </h2>
          <p className="text-sm text-muted-foreground">Track your weekly hours and performance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-3 md:p-5 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-gold transition-all duration-300">
            <div className="flex items-start">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/10">
                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-gold" />
              </div>
            </div>
            <div className="mt-3 md:mt-4">
              <p className="text-xl md:text-3xl font-serif font-bold text-foreground">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Hours Chart */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold">Weekly Hours Overview</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Scheduled vs Completed hours</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gold" />
              <span className="text-muted-foreground">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gold/50" />
              <span className="text-muted-foreground">Completed</span>
            </div>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barGap={4}>
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
                dataKey="scheduled" 
                radius={[6, 6, 0, 0]} 
                fill="hsl(37, 60%, 55%)"
                maxBarSize={40}
              />
              <Bar 
                dataKey="completed" 
                radius={[6, 6, 0, 0]} 
                fill="hsl(37, 70%, 75%)"
                maxBarSize={40}
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
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold to-gold/70 rounded-full transition-all duration-500"
                  style={{ width: `${(day.scheduled / 8) * 100}%` }}
                />
              </div>
              <div className="text-right min-w-[80px]">
                <span className="text-sm font-medium text-foreground">{day.scheduled}h</span>
                {day.completed > 0 && day.completed < day.scheduled && (
                  <span className="text-xs text-muted-foreground ml-1">({day.completed}h done)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PersonalAnalytics;
