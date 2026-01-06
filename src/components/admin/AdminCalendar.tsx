import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Sparkles,
  Edit,
  X,
  Check,
  Plus,
  Filter,
  CalendarDays,
  LayoutGrid,
} from "lucide-react";

const AdminCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week">("day");

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const fullWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9;
    return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  });

  const appointments = [
    { id: 1, client: "Sarah Mitchell", service: "Mega Volume Full Set", artist: "Nikki", time: "9:00 AM", duration: 2.5, status: "confirmed", dayOffset: 0 },
    { id: 2, client: "Emma Louise", service: "Volume Refill", artist: "Lash Mama", time: "11:30 AM", duration: 1.5, status: "confirmed", dayOffset: 0 },
    { id: 3, client: "Jessica Kim", service: "Bridal Lashes", artist: "Beau", time: "2:00 PM", duration: 2, status: "pending", dayOffset: 1 },
    { id: 4, client: "Olivia Rose", service: "Natural Full Set", artist: "Natali", time: "4:30 PM", duration: 2, status: "confirmed", dayOffset: 0 },
    { id: 5, client: "Mia Chen", service: "Volume Refill", artist: "Nikki", time: "5:00 PM", duration: 1.5, status: "confirmed", dayOffset: 2 },
    { id: 6, client: "Lily Zhang", service: "Classic Full Set", artist: "Beau", time: "10:00 AM", duration: 2, status: "confirmed", dayOffset: 1 },
    { id: 7, client: "Ava Wilson", service: "Natural Refill", artist: "Natali", time: "1:00 PM", duration: 1.5, status: "confirmed", dayOffset: 3 },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const days = getDaysInMonth(selectedDate);
  const weekDates = getWeekDates(selectedDate);

  const todayAppointments = appointments.filter(apt => apt.dayOffset === 0);
  const getAppointmentsForDay = (dayOffset: number) => appointments.filter(apt => apt.dayOffset === dayOffset);

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Calendar</h2>
          <p className="text-sm text-muted-foreground">View and manage all appointments</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="luxury" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Appointment</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Mini Calendar */}
        <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-semibold text-sm md:text-base">
              {selectedDate.toLocaleDateString("en-AU", { month: "long", year: "numeric" })}
            </h3>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              const isToday = day?.toDateString() === new Date().toDateString();
              const isSelected = day?.toDateString() === selectedDate.toDateString();
              const hasAppointments = day && [1, 5, 8, 12, 15, 20, 22, 25, 28].includes(day.getDate());
              
              return (
                <button
                  key={i}
                  onClick={() => day && setSelectedDate(day)}
                  disabled={!day}
                  className={cn(
                    "aspect-square rounded-lg text-xs md:text-sm flex flex-col items-center justify-center transition-all",
                    !day && "invisible",
                    isSelected && "bg-gold text-primary-foreground",
                    isToday && !isSelected && "bg-gold/20 text-gold font-medium",
                    !isSelected && !isToday && day && "hover:bg-muted"
                  )}
                >
                  {day?.getDate()}
                  {hasAppointments && !isSelected && (
                    <span className="w-1 h-1 rounded-full bg-gold mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Today's Stats */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="text-center p-2 md:p-3 rounded-xl bg-muted/50">
                <p className="text-xl md:text-2xl font-serif font-bold text-gold">5</p>
                <p className="text-xs text-muted-foreground">Appointments</p>
              </div>
              <div className="text-center p-2 md:p-3 rounded-xl bg-muted/50">
                <p className="text-xl md:text-2xl font-serif font-bold text-gold">$1,420</p>
                <p className="text-xs text-muted-foreground">Expected</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Day/Week View */}
        <Card className="lg:col-span-2 p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <h3 className="font-serif text-base md:text-lg font-semibold">
              {viewMode === "day" 
                ? selectedDate.toLocaleDateString("en-AU", { weekday: "long", month: "long", day: "numeric" })
                : `Week of ${weekDates[0].toLocaleDateString("en-AU", { month: "short", day: "numeric" })}`
              }
            </h3>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "day" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("day")}
                className="gap-1.5 h-8"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Day</span>
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("week")}
                className="gap-1.5 h-8"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Week</span>
              </Button>
            </div>
          </div>

          {/* Week View */}
          {viewMode === "week" && (
            <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
              <div className="min-w-[600px]">
                {/* Week Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekDates.map((date, i) => {
                    const isToday = date.toDateString() === new Date().toDateString();
                    return (
                      <div 
                        key={i}
                        className={cn(
                          "text-center p-2 rounded-lg",
                          isToday && "bg-gold/10"
                        )}
                      >
                        <p className="text-xs text-muted-foreground">{weekDays[i]}</p>
                        <p className={cn(
                          "text-lg font-serif font-semibold mt-1",
                          isToday && "text-gold"
                        )}>
                          {date.getDate()}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Week Grid */}
                <div className="grid grid-cols-7 gap-2 max-h-[400px] overflow-y-auto">
                  {weekDates.map((_, dayIndex) => {
                    const dayAppointments = getAppointmentsForDay(dayIndex);
                    return (
                      <div key={dayIndex} className="space-y-2 min-h-[100px]">
                        {dayAppointments.map((apt) => (
                          <div
                            key={apt.id}
                            className={cn(
                              "p-2 rounded-lg text-xs border-l-2",
                              apt.status === "confirmed" 
                                ? "bg-gold/10 border-l-gold" 
                                : "bg-gold/5 border-l-gold-light"
                            )}
                          >
                            <p className="font-medium text-gold text-[10px]">{apt.time}</p>
                            <p className="font-medium truncate">{apt.client.split(" ")[0]}</p>
                            <p className="text-muted-foreground truncate text-[10px]">{apt.artist}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Day View - Appointments List */}
          {viewMode === "day" && (
            <div className="space-y-3 max-h-[400px] md:max-h-[500px] overflow-y-auto">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className={cn(
                    "p-3 md:p-4 rounded-xl border-l-4 bg-muted/50 hover:bg-muted transition-colors",
                    apt.status === "confirmed" ? "border-l-gold" : "border-l-gold-light"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-base md:text-lg font-medium text-gold">{apt.time}</span>
                        <span className="text-xs md:text-sm text-muted-foreground">• {apt.duration} hrs</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          apt.status === "confirmed" 
                            ? "bg-gold/20 text-gold-dark" 
                            : "bg-gold/10 text-gold"
                        )}>
                          {apt.status}
                        </span>
                      </div>
                      <h4 className="font-medium text-foreground mb-1 truncate">{apt.client}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground flex flex-wrap items-center gap-1 md:gap-2">
                        <Sparkles className="h-3 w-3 text-gold shrink-0" />
                        <span className="truncate">{apt.service}</span>
                        <span className="text-muted-foreground/60">•</span>
                        <User className="h-3 w-3 shrink-0" />
                        <span>{apt.artist}</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 text-muted-foreground hover:text-foreground">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      {apt.status === "pending" && (
                        <>
                          <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 text-gold hover:text-gold-dark hover:bg-gold/10">
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {todayAppointments.length === 0 && (
                <div className="text-center py-8 md:py-12">
                  <Calendar className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No appointments for this day</p>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminCalendar;