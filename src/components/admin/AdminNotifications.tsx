import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

interface Notification {
  id: number;
  type: "booking" | "message" | "vip" | "reminder" | "review";
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionRequired?: boolean;
  data?: any;
}

const AdminNotifications = () => {
  const [filter, setFilter] = useState<"all" | "unread" | "bookings">("all");
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "booking",
      title: "New Booking Request",
      description: "Sarah Mitchell wants to book Mega Volume Full Set on Jan 15 at 2:00 PM",
      time: "5 minutes ago",
      read: false,
      actionRequired: true,
      data: { client: "Sarah Mitchell", service: "Mega Volume Full Set", date: "Jan 15", time: "2:00 PM" }
    },
    {
      id: 2,
      type: "booking",
      title: "Reschedule Request",
      description: "Emma Louise requested to reschedule her appointment from Jan 16 to Jan 18",
      time: "15 minutes ago",
      read: false,
      actionRequired: true,
      data: { client: "Emma Louise", from: "Jan 16", to: "Jan 18" }
    },
    {
      id: 3,
      type: "booking",
      title: "New Booking Request",
      description: "Jessica Kim wants to book Bridal Lashes on Jan 20 at 10:00 AM",
      time: "1 hour ago",
      read: false,
      actionRequired: true,
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
    return true;
  });

  const handleApprove = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true, actionRequired: false } : n
    ));
  };

  const handleReject = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingBookings = notifications.filter(n => n.type === "booking" && n.actionRequired).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Notifications</h2>
          <p className="text-muted-foreground">
            {unreadCount} unread • {pendingBookings} pending booking requests
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={markAllRead}>
          Mark all as read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "bookings", label: `Bookings (${pendingBookings})` },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
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
          
          return (
            <Card 
              key={notification.id}
              className={cn(
                "p-5 border-0 transition-all duration-300",
                !notification.read && "bg-gradient-to-r from-gold/5 to-transparent",
                notification.read && "bg-gradient-to-br from-card to-card/80"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  iconColor
                )}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className={cn(
                      "font-medium text-foreground",
                      !notification.read && "font-semibold"
                    )}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {notification.description}
                  </p>

                  {/* Action buttons for bookings */}
                  {notification.actionRequired && notification.type === "booking" && (
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="luxury"
                        className="gap-2"
                        onClick={() => handleApprove(notification.id)}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        onClick={() => handleReject(notification.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="gap-2 text-muted-foreground"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Message
                      </Button>
                    </div>
                  )}
                </div>

                {/* Unread indicator */}
                {!notification.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-gold shrink-0" />
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="p-12 text-center border-0 bg-gradient-to-br from-card to-card/80">
          <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2">No notifications</h3>
          <p className="text-muted-foreground">You're all caught up!</p>
        </Card>
      )}
    </div>
  );
};

export default AdminNotifications;
