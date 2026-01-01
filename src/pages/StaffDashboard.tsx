import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Bell,
} from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Navigate } from "react-router-dom";
import StaffChat from "@/components/staff/StaffChat";

const StaffDashboard = () => {
  const { currentRole } = useUserRole();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"calendar" | "chat">("calendar");

  // Only staff members can access (for demo, we'll use 'regular' role as staff)
  // In real implementation, you'd have a 'staff' role

  const todaysAppointments = [
    { id: 1, time: "9:00 AM", client: "Sarah Mitchell", service: "Mega Volume Full Set", duration: "2.5 hrs", status: "upcoming" },
    { id: 2, time: "11:30 AM", client: "Emma Louise", service: "Volume Refill", duration: "1.5 hrs", status: "upcoming" },
    { id: 3, time: "2:00 PM", client: "Jessica Kim", service: "Natural Full Set", duration: "2 hrs", status: "upcoming" },
    { id: 4, time: "4:30 PM", client: "Olivia Rose", service: "Volume Refill", duration: "1.5 hrs", status: "upcoming" },
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    const first = date.getDate() - date.getDay() + i + 1;
    return new Date(date.setDate(first));
  });

  const stats = [
    { label: "Today's Appointments", value: "4", icon: Calendar },
    { label: "This Week", value: "18", icon: Clock },
    { label: "Completed Today", value: "0", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 p-8 md:p-10 mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-cream/70 text-sm mb-1">Staff Dashboard</p>
                <h1 className="font-serif text-3xl font-semibold text-cream mb-2">Your Schedule</h1>
                <p className="text-cream/60">Manage your appointments and clients</p>
              </div>
              
              <div className="flex gap-4">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="bg-cream/10 backdrop-blur rounded-xl px-6 py-4 text-center">
                    <p className="text-3xl font-serif font-bold text-cream">{stat.value}</p>
                    <p className="text-cream/60 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("calendar")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all",
                activeTab === "calendar"
                  ? "bg-gold text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <Calendar className="h-4 w-4" />
              My Calendar
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all",
                activeTab === "chat"
                  ? "bg-gold text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              Messages
            </button>
          </div>

          {activeTab === "chat" ? (
            <StaffChat />
          ) : (
            <>
              {/* Week Calendar */}
              <Card className="p-6 mb-6 border-0 bg-gradient-to-br from-card to-card/80">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-semibold">This Week</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium px-3">
                      {currentWeek[0].toLocaleDateString("en-AU", { month: "short", day: "numeric" })} - 
                      {currentWeek[6].toLocaleDateString("en-AU", { month: "short", day: "numeric" })}
                    </span>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {currentWeek.map((date, i) => {
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    const hasAppointments = i < 5; // Demo: Mon-Fri have appointments
                    
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "p-4 rounded-xl text-center transition-all duration-200",
                          isSelected 
                            ? "bg-gold text-primary-foreground shadow-gold"
                            : isToday
                              ? "bg-gold/20 text-gold"
                              : "bg-muted/50 hover:bg-muted"
                        )}
                      >
                        <span className="text-xs uppercase text-current/70">{weekDays[i]}</span>
                        <p className="text-lg font-serif font-semibold mt-1">{date.getDate()}</p>
                        {hasAppointments && (
                          <div className="flex justify-center gap-1 mt-2">
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              isSelected ? "bg-primary-foreground" : "bg-gold"
                            )} />
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              isSelected ? "bg-primary-foreground/60" : "bg-gold/60"
                            )} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Today's Schedule */}
              <Card className="p-6 border-0 bg-gradient-to-br from-card to-card/80">
                <h2 className="font-serif text-xl font-semibold mb-6">
                  {selectedDate.toDateString() === new Date().toDateString() 
                    ? "Today's Schedule" 
                    : selectedDate.toLocaleDateString("en-AU", { weekday: "long", month: "long", day: "numeric" })}
                </h2>

                <div className="space-y-4">
                  {todaysAppointments.map((apt, index) => (
                    <div 
                      key={apt.id}
                      className="relative flex items-stretch gap-4 pl-8"
                    >
                      {/* Timeline */}
                      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-gold border-2 border-background" />
                        {index < todaysAppointments.length - 1 && (
                          <div className="w-0.5 flex-1 bg-gold/20" />
                        )}
                      </div>

                      {/* Appointment Card */}
                      <div className="flex-1 p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-medium text-gold">{apt.time}</span>
                              <span className="text-sm text-muted-foreground">• {apt.duration}</span>
                            </div>
                            <h3 className="font-medium text-foreground mb-1">{apt.client}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Sparkles className="h-3.5 w-3.5 text-gold" />
                              {apt.service}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                              Confirmed
                            </span>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <User className="h-4 w-4 mr-2" />
                              View Client
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StaffDashboard;
