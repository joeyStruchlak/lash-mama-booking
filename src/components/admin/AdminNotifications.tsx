import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserRole } from "@/contexts/UserRoleContext";
import { toast } from "sonner";
import {
  Bell,
  Calendar,
  User,
  Clock,
  Check,
  X,
  Sparkles,
  AlertCircle,
  MessageCircle,
  Gift,
  Star,
  RefreshCw,
} from "lucide-react";

interface Notification {
  id: number;
  type: "booking" | "message" | "vip" | "reminder" | "review" | "reschedule";
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionRequired?: boolean;
  data?: any;
}

const AdminNotifications = () => {
  const { currentRole } = useUserRole();
  const [filter, setFilter] = useState<"all" | "unread" | "bookings" | "reschedule">("all");
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "reschedule",
      title: "Reschedule Request",
      description: "Sarah Mitchell wants to reschedule Mega Volume Full Set from Jan 15 to Jan 18 at 2:00 PM",
      time: "5 minutes ago",
      read: false,
      actionRequired: true,
      data: { client: "Sarah Mitchell", service: "Mega Volume Full Set", from: "Jan 15", to: "Jan 18", time: "2:00 PM" }
    },
    {
      id: 2,
      type: "reschedule",
      title: "Reschedule Request",
      description: "Emma Louise requested to reschedule her appointment from Jan 16 to Jan 19",
      time: "15 minutes ago",
      read: false,
      actionRequired: true,
      data: { client: "Emma Louise", from: "Jan 16", to: "Jan 19" }
    },
    {
      id: 3,
      type: "booking",
      title: "New Booking Confirmed",
      description: "Jessica Kim booked Bridal Lashes on Jan 20 at 10:00 AM",
      time: "1 hour ago",
      read: false,
      actionRequired: false,
      data: { client: "Jessica Kim", service: "Bridal Lashes", date: "Jan 20", time: "10:00 AM" }
    },
    {
      id: 4,
      type: "vip",
      title: "New VIP Member!",
      description: "Olivia Rose has reached 10 consecutive bookings and is now a VIP member",
      time: "2 hours ago",
      read: true,
      actionRequired: false,
    },
    {
      id: 5,
      type: "review",
      title: "New 5-Star Review",
      description: "Mia Chen left a 5-star review for Nikki's Volume Full Set service",
      time: "3 hours ago",
      read: true,
      actionRequired: false,
    },
    {
      id: 6,
      type: "reminder",
      title: "Tomorrow's Schedule",
      description: "You have 6 appointments scheduled for tomorrow",
      time: "5 hours ago",
      read: true,
      actionRequired: false,
    },
    {
      id: 7,
      type: "message",
      title: "New Message",
      description: "Natali sent you a message about shift availability",
      time: "Yesterday",
      read: true,
      actionRequired: false,
    },
  ]);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking": return Calendar;
      case "reschedule": return RefreshCw;
      case "message": return MessageCircle;
      case "vip": return Gift;
      case "reminder": return Clock;
      case "review": return Star;
      default: return Bell;
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "booking": return "text-sky-500 bg-sky-100";
      case "reschedule": return "text-amber-600 bg-amber-100";
      case "message": return "text-violet-500 bg-violet-100";
      case "vip": return "text-gold bg-gold/20";
      case "reminder": return "text-amber-500 bg-amber-100";
      case "review": return "text-emerald-500 bg-emerald-100";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "bookings") return n.type === "booking";
    if (filter === "reschedule") return n.type === "reschedule";
    return true;
  });

  const handleApprove = (id: number, type: string) => {
    // Only Lash Mama can approve reschedule requests
    if (type === "reschedule" && currentRole !== "admin") {
      toast.error("Only Lash Mama can approve reschedule requests");
      return;
    }
    
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true, actionRequired: false } : n
    ));
    toast.success(type === "reschedule" ? "Reschedule approved!" : "Booking approved!");
  };

  const handleReject = (id: number, type: string) => {
    // Only Lash Mama can reject reschedule requests
    if (type === "reschedule" && currentRole !== "admin") {
      toast.error("Only Lash Mama can reject reschedule requests");
      return;
    }
    
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.error(type === "reschedule" ? "Reschedule request declined" : "Booking declined");
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingReschedules = notifications.filter(n => n.type === "reschedule" && n.actionRequired).length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            {unreadCount} unread • {pendingReschedules} reschedule requests
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={markAllRead}>
          Mark all as read
        </Button>
      </div>

      {/* Admin-only notice for reschedules */}
      {currentRole !== "admin" && pendingReschedules > 0 && (
        <Card className="p-4 border-0 bg-gradient-to-br from-amber-50 to-amber-100/50">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>{pendingReschedules} reschedule requests</strong> require Lash Mama's approval
            </p>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "reschedule", label: `Reschedule (${pendingReschedules})` },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={cn(
              "px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all",
              filter === f.id
                ? "bg-gold text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = getIcon(notification.type);
          const iconColor = getIconColor(notification.type);
          const isReschedule = notification.type === "reschedule";
          const canApprove = !isReschedule || currentRole === "admin";
          
          return (
            <Card 
              key={notification.id}
              className={cn(
                "p-4 md:p-5 border-0 transition-all duration-300",
                !notification.read && "bg-gradient-to-r from-gold/5 to-transparent",
                notification.read && "bg-gradient-to-br from-card to-card/80",
                isReschedule && !notification.read && "ring-1 ring-amber-200"
              )}
            >
              <div className="flex items-start gap-3 md:gap-4">
                {/* Icon */}
                <div className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0",
                  iconColor
                )}>
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 md:gap-4 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={cn(
                        "font-medium text-foreground text-sm md:text-base",
                        !notification.read && "font-semibold"
                      )}>
                        {notification.title}
                      </h3>
                      {isReschedule && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-amber-100 text-amber-700">
                          Admin Only
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">
                    {notification.description}
                  </p>

                  {/* Action buttons for reschedules */}
                  {notification.actionRequired && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button 
                        size="sm" 
                        variant={canApprove ? "luxury" : "outline"}
                        className="gap-1.5 text-xs md:text-sm"
                        onClick={() => handleApprove(notification.id, notification.type)}
                        disabled={!canApprove}
                      >
                        <Check className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="gap-1.5 text-xs md:text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        onClick={() => handleReject(notification.id, notification.type)}
                        disabled={!canApprove}
                      >
                        <X className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="gap-1.5 text-xs md:text-sm text-muted-foreground"
                      >
                        <MessageCircle className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        Message
                      </Button>
                    </div>
                  )}
                </div>

                {/* Unread indicator */}
                {!notification.read && (
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gold shrink-0" />
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="p-8 md:p-12 text-center border-0 bg-gradient-to-br from-card to-card/80">
          <Bell className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-serif text-base md:text-lg font-semibold text-foreground mb-2">No notifications</h3>
          <p className="text-sm text-muted-foreground">You're all caught up!</p>
        </Card>
      )}
    </div>
  );
};

export default AdminNotifications;