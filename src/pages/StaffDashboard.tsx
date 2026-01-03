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
  Menu,
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"calendar" | "chat" | "notes">("calendar");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newReminder, setNewReminder] = useState({ text: "", time: "" });
  const [selectedClientChat, setSelectedClientChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const [notes, setNotes] = useState([
    { id: 1, text: "Sarah prefers thin classic lashes", date: "Jan 5" },
    { id: 2, text: "Emma allergic to certain adhesives - use sensitive formula", date: "Jan 4" },
  ]);

  const [reminders, setReminders] = useState([
    { id: 1, text: "Order more volume lashes", time: "Today, 5:00 PM", active: true },
    { id: 2, text: "Review new technique video", time: "Tomorrow, 9:00 AM", active: true },
  ]);

  const [clientChats, setClientChats] = useState<ClientChat[]>([
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar: "SM",
      lastMessage: "Thank you! See you tomorrow",
      lastTime: "10 min ago",
      unread: 1,
      messages: [
        { id: 1, sender: "client", text: "Hi! Just confirming my appointment tomorrow", time: "9:30 AM", read: true },
        { id: 2, sender: "staff", text: "Hi Sarah! Yes, you're confirmed for 10:00 AM tomorrow", time: "9:32 AM", read: true },
        { id: 3, sender: "client", text: "Thank you! See you tomorrow", time: "9:35 AM", read: false },
      ]
    },
    {
      id: 2,
      name: "Emma Louise",
      avatar: "EL",
      lastMessage: "Can I bring a friend to my appointment?",
      lastTime: "1 hour ago",
      unread: 1,
      messages: [
        { id: 1, sender: "client", text: "Can I bring a friend to my appointment?", time: "8:00 AM", read: false },
      ]
    },
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

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedClientChat) return;

    setClientChats(prev => prev.map(chat => {
      if (chat.id === selectedClientChat) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              id: chat.messages.length + 1,
              sender: "staff" as const,
              text: newMessage,
              time: new Date().toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" }),
              read: false
            }
          ],
          lastMessage: newMessage,
          lastTime: "Just now"
        };
      }
      return chat;
    }));
    setNewMessage("");
  };

  const selectedChat = clientChats.find(c => c.id === selectedClientChat);

  const handleNavClick = (tab: "calendar" | "chat" | "notes") => {
    setActiveTab(tab);
    setMobileNavOpen(false);
  };

  const renderNotesSection = () => (
    <div className="space-y-4 md:space-y-6">
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

  const renderChatSection = () => (
    <Card className="border-0 bg-gradient-to-br from-card to-card/80 overflow-hidden">
      <div className="flex h-[500px] md:h-[600px]">
        {/* Conversations List */}
        <div className={cn(
          "border-r border-border flex flex-col transition-all duration-300",
          selectedClientChat ? "hidden md:flex w-64" : "w-full md:w-64"
        )}>
          <div className="p-3 border-b border-border">
            <h3 className="font-medium text-sm">Client Messages</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {clientChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedClientChat(chat.id)}
                className={cn(
                  "w-full p-3 flex items-start gap-3 text-left transition-colors border-b border-border/50",
                  selectedClientChat === chat.id ? "bg-gold/10" : "hover:bg-muted/50"
                )}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center shrink-0">
                  <span className="font-serif font-semibold text-gold text-xs">{chat.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium truncate text-sm">{chat.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{chat.lastTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-gold text-primary-foreground text-[10px] flex items-center justify-center font-medium shrink-0">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            <div className="p-3 border-b border-border flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 md:hidden"
                onClick={() => setSelectedClientChat(null)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
                <span className="font-serif font-semibold text-gold text-xs">{selectedChat.avatar}</span>
              </div>
              <div>
                <h3 className="font-medium text-sm">{selectedChat.name}</h3>
                <p className="text-[10px] text-muted-foreground">Client</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === "staff" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-3 py-2",
                    msg.sender === "staff"
                      ? "bg-gradient-to-br from-gold to-gold/90 text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  )}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={cn(
                      "text-[10px] mt-1",
                      msg.sender === "staff" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  variant="luxury" 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Client Messages</h3>
              <p className="text-muted-foreground text-sm">Select a conversation to message your client</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-28 pb-20 md:pb-24">
        <div className="container mx-auto px-3 md:px-6 max-w-5xl">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 p-4 md:p-8 lg:p-10 mb-4 md:mb-8">
            <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gold/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div>
                <p className="text-cream/70 text-xs md:text-sm mb-1">Staff Dashboard</p>
                <h1 className="font-serif text-xl md:text-3xl font-semibold text-cream mb-2">Your Schedule</h1>
                <p className="text-cream/60 text-sm">Manage your appointments and clients</p>
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

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full gap-2 justify-between"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="flex items-center gap-2">
                <Menu className="h-4 w-4" />
                {activeTab === "calendar" && "My Calendar"}
                {activeTab === "chat" && "Client Messages"}
                {activeTab === "notes" && "Notes & Reminders"}
              </span>
            </Button>
            
            {mobileNavOpen && (
              <Card className="mt-2 p-2 border-0 bg-card animate-fade-in">
                <nav className="space-y-1">
                  <button
                    onClick={() => handleNavClick("calendar")}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      activeTab === "calendar" ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    My Calendar
                  </button>
                  <button
                    onClick={() => handleNavClick("chat")}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      activeTab === "chat" ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Client Messages
                    <span className="ml-auto bg-gold/20 text-gold px-1.5 py-0.5 rounded-full text-[10px]">2</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("notes")}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      activeTab === "notes" ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <StickyNote className="h-4 w-4" />
                    Notes & Reminders
                  </button>
                </nav>
              </Card>
            )}
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden md:flex gap-2 mb-6">
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
              Client Messages
              <span className="bg-gold/20 text-gold px-1.5 py-0.5 rounded-full text-xs">2</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all",
                activeTab === "notes"
                  ? "bg-gold text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <StickyNote className="h-4 w-4" />
              Notes & Reminders
            </button>
          </div>

          {activeTab === "chat" && renderChatSection()}
          
          {activeTab === "notes" && renderNotesSection()}
          
          {activeTab === "calendar" && (
            <>
              {/* Week Calendar */}
              <Card className="p-4 md:p-6 mb-4 md:mb-6 border-0 bg-gradient-to-br from-card to-card/80">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="font-serif text-base md:text-xl font-semibold">This Week</h2>
                  <div className="flex items-center gap-1 md:gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs md:text-sm font-medium px-2">
                      {currentWeek[0].toLocaleDateString("en-AU", { month: "short", day: "numeric" })} - 
                      {currentWeek[6].toLocaleDateString("en-AU", { month: "short", day: "numeric" })}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {currentWeek.map((date, i) => {
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    const hasAppointments = i < 5;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "p-2 md:p-4 rounded-lg md:rounded-xl text-center transition-all duration-200",
                          isSelected 
                            ? "bg-gold text-primary-foreground shadow-gold"
                            : isToday
                              ? "bg-gold/20 text-gold"
                              : "bg-muted/50 hover:bg-muted"
                        )}
                      >
                        <span className="text-[10px] md:text-xs uppercase text-current/70">{weekDays[i]}</span>
                        <p className="text-sm md:text-lg font-serif font-semibold mt-1">{date.getDate()}</p>
                        {hasAppointments && (
                          <div className="flex justify-center gap-0.5 mt-1 md:mt-2">
                            <span className={cn(
                              "w-1 h-1 md:w-1.5 md:h-1.5 rounded-full",
                              isSelected ? "bg-primary-foreground" : "bg-gold"
                            )} />
                            <span className={cn(
                              "w-1 h-1 md:w-1.5 md:h-1.5 rounded-full",
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
              <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
                <h2 className="font-serif text-base md:text-xl font-semibold mb-4 md:mb-6">
                  {selectedDate.toDateString() === new Date().toDateString() 
                    ? "Today's Schedule" 
                    : selectedDate.toLocaleDateString("en-AU", { weekday: "long", month: "long", day: "numeric" })}
                </h2>

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
                            <span className="px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
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
            </>
          )}
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
