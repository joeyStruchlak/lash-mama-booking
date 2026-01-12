import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
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
  StickyNote,
  Plus,
  Send,
  Heart,
  BarChart3,
  Briefcase,
} from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import AdminCalendar from "@/components/admin/AdminCalendar";
import AdminChat from "@/components/admin/AdminChat";
import PersonalAnalytics from "@/components/admin/PersonalAnalytics";
import StaffReferralLink from "@/components/admin/StaffReferralLink";
import nikkiImg from "@/assets/staff/nikki.jpg";

interface Message {
  id: number;
  sender: "staff" | "client";
  text: string;
  time: string;
  read: boolean;
}

interface ClientChat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

const StaffDashboard = () => {
  const { currentRole } = useUserRole();
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newReminder, setNewReminder] = useState({ text: "", time: "" });

  const [notes, setNotes] = useState([
    { id: 1, text: "Sarah prefers thin classic lashes", date: "Jan 5" },
    { id: 2, text: "Emma allergic to certain adhesives - use sensitive formula", date: "Jan 4" },
  ]);

  const [reminders, setReminders] = useState([
    { id: 1, text: "Order more volume lashes", time: "Today, 5:00 PM", active: true },
    { id: 2, text: "Review new technique video", time: "Tomorrow, 9:00 AM", active: true },
  ]);

  const todaysAppointments = [
    { id: 1, time: "9:00 AM", client: "Sarah Mitchell", service: "Mega Volume Full Set", duration: "2.5 hrs", status: "upcoming", minutesUntil: 30 },
    { id: 2, time: "11:30 AM", client: "Emma Louise", service: "Volume Refill", duration: "1.5 hrs", status: "upcoming", minutesUntil: 180 },
    { id: 3, time: "2:00 PM", client: "Jessica Kim", service: "Natural Full Set", duration: "2 hrs", status: "upcoming", minutesUntil: 330 },
    { id: 4, time: "4:30 PM", client: "Olivia Rose", service: "Volume Refill", duration: "1.5 hrs", status: "upcoming", minutesUntil: 480 },
  ];

  // Simulate 30-minute reminder
  useEffect(() => {
    const upcomingAppointment = todaysAppointments.find(apt => apt.minutesUntil === 30);
    if (upcomingAppointment) {
      const timer = setTimeout(() => {
        toast.info(`Reminder: ${upcomingAppointment.client}'s appointment in 30 minutes`, {
          duration: 10000,
          icon: <Bell className="h-5 w-5 text-gold" />,
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const stats = [
    { label: "Today's Appointments", value: "4", icon: Calendar, color: "gold" },
    { label: "This Week", value: "18", icon: Clock, color: "gold" },
    { label: "Completed Today", value: "0", icon: CheckCircle2, color: "gold" },
  ];

  const navigationItems = [
    { id: "overview", label: "Dashboard", icon: Briefcase, color: "gold" },
    { id: "calendar", label: "Calendar", icon: Calendar, color: "gold" },
    { id: "analytics", label: "My Hours", icon: BarChart3, color: "gold" },
    { id: "referral", label: "My Link", icon: Heart, color: "gold" },
    { id: "chat", label: "Messages", icon: MessageCircle, badge: "2", color: "gold" },
    { id: "notes", label: "Notes", icon: StickyNote, color: "gold" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    // Auto-scroll to content section
    setTimeout(() => {
      const contentSection = document.getElementById('dashboard-content');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes(prev => [...prev, { id: prev.length + 1, text: newNote, date: "Today" }]);
    toast.success("Note added");
    setShowNoteModal(false);
    setNewNote("");
  };

  const handleAddReminder = () => {
    if (!newReminder.text.trim()) return;
    setReminders(prev => [...prev, { id: prev.length + 1, text: newReminder.text, time: newReminder.time || "Today", active: true }]);
    toast.success("Reminder set");
    setShowReminderModal(false);
    setNewReminder({ text: "", time: "" });
  };

  const renderNotesSection = () => (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Notes */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-base md:text-lg font-semibold">My Notes</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowNoteModal(true)}>
            <Plus className="h-4 w-4" />
            Add Note
          </Button>
        </div>
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="p-3 rounded-xl bg-muted/50">
              <p className="text-sm text-foreground">{note.text}</p>
              <p className="text-xs text-muted-foreground mt-2">{note.date}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Reminders */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-base md:text-lg font-semibold">Reminders</h3>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowReminderModal(true)}>
            <Plus className="h-4 w-4" />
            Add Reminder
          </Button>
        </div>
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-start gap-3 p-3 rounded-xl bg-gold/10">
              <Bell className="h-4 w-4 text-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-foreground font-medium">{reminder.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{reminder.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-3 md:p-5 hover:shadow-gold transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
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

      {/* Today's Schedule */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold">Today's Schedule</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Your appointments for today</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => handleNavClick("calendar")}>
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {todaysAppointments.map((apt, index) => (
            <div 
              key={apt.id}
              className={cn(
                "relative flex items-stretch gap-3 md:gap-4 pl-6 md:pl-8",
                apt.minutesUntil === 30 && "ring-2 ring-gold ring-offset-2 rounded-xl"
              )}
            >
              {/* Timeline */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gold border-2 border-background" />
                {index < todaysAppointments.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gold/20" />
                )}
              </div>

              {/* Appointment Card */}
              <div className="flex-1 p-3 md:p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-base md:text-lg font-medium text-gold">{apt.time}</span>
                      <span className="text-xs text-muted-foreground">• {apt.duration}</span>
                      {apt.minutesUntil === 30 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold text-primary-foreground animate-pulse">
                          In 30 min
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-foreground mb-1 text-sm md:text-base truncate">{apt.client}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                      <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-gold shrink-0" />
                      <span className="truncate">{apt.service}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold">
                      Confirmed
                    </span>
                    <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "calendar":
        return <AdminCalendar />;
      case "analytics":
        return <PersonalAnalytics staffName="Nikki" staffImage={nikkiImg} staffTitle="Senior Lash Artist" />;
      case "referral":
        return <StaffReferralLink staffName="Nikki" staffId="nikki" />;
      case "chat":
        return <AdminChat />;
      case "notes":
        return renderNotesSection();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-28 pb-20 md:pb-24">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 p-4 md:p-8 lg:p-12 mb-4 md:mb-8">
            <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gold/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-gold" />
                </div>
                <div>
                  <p className="text-cream/70 text-xs md:text-sm">Welcome back</p>
                  <h1 className="font-serif text-xl md:text-3xl font-semibold text-cream">Staff Dashboard</h1>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 md:gap-4">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="bg-cream/10 backdrop-blur rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-4 text-center flex-1 min-w-[100px]">
                    <p className="text-lg md:text-3xl font-serif font-bold text-cream">{stat.value}</p>
                    <p className="text-cream/60 text-[10px] md:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-4">
            <Card className="p-3 border-0 bg-card">
              <nav className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs font-medium transition-all relative",
                      activeSection === item.id
                        ? "bg-gold text-primary-foreground shadow-gold"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="truncate text-center">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center",
                        activeSection === item.id 
                          ? "bg-primary-foreground/30 text-primary-foreground" 
                          : "bg-gold text-primary-foreground"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <Card className="p-4 sticky top-28 border-0 bg-gradient-to-br from-card to-card/80">
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        activeSection === item.id
                          ? "bg-gold text-primary-foreground shadow-gold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          activeSection === item.id 
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-gold/20 text-gold"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div id="dashboard-content" className="flex-1 min-w-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Add Note Modal */}
      <Dialog open={showNoteModal} onOpenChange={setShowNoteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Add Note</DialogTitle>
            <DialogDescription>Add a personal note or client reminder</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter your note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNoteModal(false)}>Cancel</Button>
            <Button variant="luxury" onClick={handleAddNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Reminder Modal */}
      <Dialog open={showReminderModal} onOpenChange={setShowReminderModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Add Reminder</DialogTitle>
            <DialogDescription>Set a reminder for yourself</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Reminder</label>
              <Input
                placeholder="What do you need to remember?"
                value={newReminder.text}
                onChange={(e) => setNewReminder(prev => ({ ...prev, text: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">When</label>
              <Input
                type="datetime-local"
                value={newReminder.time}
                onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReminderModal(false)}>Cancel</Button>
            <Button variant="luxury" onClick={handleAddReminder}>Set Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffDashboard;
