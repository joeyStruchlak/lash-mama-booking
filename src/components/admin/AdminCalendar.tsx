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
} from "lucide-react";

const AdminCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week">("day");

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9;
    return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  });

  const appointments = [
    { id: 1, client: "Sarah Mitchell", service: "Mega Volume Full Set", artist: "Nikki", time: "9:00 AM", duration: 2.5, status: "confirmed" },
    { id: 2, client: "Emma Louise", service: "Volume Refill", artist: "Lash Mama", time: "11:30 AM", duration: 1.5, status: "confirmed" },
    { id: 3, client: "Jessica Kim", service: "Bridal Lashes", artist: "Beau", time: "2:00 PM", duration: 2, status: "pending" },
    { id: 4, client: "Olivia Rose", service: "Natural Full Set", artist: "Natali", time: "4:30 PM", duration: 2, status: "confirmed" },
    { id: 5, client: "Mia Chen", service: "Volume Refill", artist: "Nikki", time: "5:00 PM", duration: 1.5, status: "confirmed" },
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

  const days = getDaysInMonth(selectedDate);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Calendar</h2>
          <p className="text-muted-foreground">View and manage all appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="luxury" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Calendar */}
        <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-semibold">
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
                    "aspect-square rounded-lg text-sm flex flex-col items-center justify-center transition-all",
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
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-serif font-bold text-gold">5</p>
                <p className="text-xs text-muted-foreground">Appointments</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-serif font-bold text-gold">$1,420</p>
                <p className="text-xs text-muted-foreground">Expected</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Day View */}
        <Card className="col-span-2 p-6 border-0 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg font-semibold">
              {selectedDate.toLocaleDateString("en-AU", { weekday: "long", month: "long", day: "numeric" })}
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "day" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("day")}
              >
                Day
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className={cn(
                  "p-4 rounded-xl border-l-4 bg-muted/50 hover:bg-muted transition-colors",
                  apt.status === "confirmed" ? "border-l-emerald-500" : "border-l-amber-500"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-medium text-gold">{apt.time}</span>
                      <span className="text-sm text-muted-foreground">• {apt.duration} hrs</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        apt.status === "confirmed" 
                          ? "bg-emerald-50 text-emerald-600" 
                          : "bg-amber-50 text-amber-600"
                      )}>
                        {apt.status}
                      </span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">{apt.client}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-gold" />
                      {apt.service}
                      <span className="text-muted-foreground/60">•</span>
                      <User className="h-3.5 w-3.5" />
                      {apt.artist}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {apt.status === "pending" && (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
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

export default AdminCalendar;
