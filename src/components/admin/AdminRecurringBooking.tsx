import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Repeat,
  Calendar,
  User,
  Sparkles,
  Plus,
  Clock,
  Trash2,
  Edit,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface RecurringBooking {
  id: number;
  client: string;
  service: string;
  day: string;
  time: string;
  startDate: string;
  endDate: string | null;
  artist: string;
  skipDeposit: boolean;
}

const AdminRecurringBooking = () => {
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [newBooking, setNewBooking] = useState({
    client: "",
    service: "",
    day: "Saturday",
    time: "10:00",
    startDate: "",
    endDate: "",
    noEndDate: false,
    artist: "Lash Mama",
    skipDeposit: true,
  });

  const [recurringBookings, setRecurringBookings] = useState<RecurringBooking[]>([
    {
      id: 1,
      client: "Sarah Mitchell",
      service: "Volume Refill",
      day: "Saturday",
      time: "10:00 AM",
      startDate: "Jan 6, 2024",
      endDate: "Jun 6, 2024",
      artist: "Lash Mama",
      skipDeposit: true,
    },
    {
      id: 2,
      client: "Emma Louise",
      service: "Mega Volume Refill",
      day: "Friday",
      time: "2:00 PM",
      startDate: "Jan 12, 2024",
      endDate: null,
      artist: "Nikki",
      skipDeposit: true,
    },
  ]);

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleCreate = () => {
    if (!newBooking.client || !newBooking.service || !newBooking.startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const booking: RecurringBooking = {
      id: recurringBookings.length + 1,
      client: newBooking.client,
      service: newBooking.service,
      day: newBooking.day,
      time: newBooking.time,
      startDate: newBooking.startDate,
      endDate: newBooking.noEndDate ? null : newBooking.endDate || null,
      artist: newBooking.artist,
      skipDeposit: true,
    };

    setRecurringBookings(prev => [...prev, booking]);
    toast.success(`Recurring booking created for ${newBooking.client} every ${newBooking.day}`);
    setShowNewBooking(false);
    setNewBooking({
      client: "",
      service: "",
      day: "Saturday",
      time: "10:00",
      startDate: "",
      endDate: "",
      noEndDate: false,
      artist: "Lash Mama",
      skipDeposit: true,
    });
  };

  const handleDelete = (id: number) => {
    setRecurringBookings(prev => prev.filter(b => b.id !== id));
    toast.success("Recurring booking cancelled");
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Recurring Bookings</h2>
          <p className="text-sm text-muted-foreground">Schedule clients for regular appointments (no deposit required)</p>
        </div>
        <Button variant="luxury" size="sm" className="gap-2" onClick={() => setShowNewBooking(true)}>
          <Plus className="h-4 w-4" />
          New Recurring Booking
        </Button>
      </div>

      {/* Info Card */}
      <Card className="p-4 border-0 bg-gradient-to-br from-gold/10 to-gold/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
            <Repeat className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Lash Mama Exclusive</h3>
            <p className="text-sm text-muted-foreground">
              Only Lash Mama can create recurring bookings without deposits. Perfect for loyal clients who want 
              to book in advance for weeks or months.
            </p>
          </div>
        </div>
      </Card>

      {/* Existing Recurring Bookings */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Active Recurring Bookings</h3>
        
        {recurringBookings.map((booking) => (
          <Card key={booking.id} className="p-4 md:p-5 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Repeat className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{booking.client}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    {booking.service}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Every {booking.day}
                    </span>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {booking.time}
                    </span>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {booking.artist}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="text-xs text-muted-foreground">
                  <span className="block">From: {booking.startDate}</span>
                  <span className="block">To: {booking.endDate || "No end date"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/20 text-gold">
                    No Deposit
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {recurringBookings.length === 0 && (
          <Card className="p-8 md:p-12 text-center border-0 bg-gradient-to-br from-card to-card/80">
            <Repeat className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">No recurring bookings</h3>
            <p className="text-sm text-muted-foreground mb-4">Create recurring appointments for your loyal clients</p>
            <Button variant="luxury" size="sm" className="gap-2" onClick={() => setShowNewBooking(true)}>
              <Plus className="h-4 w-4" />
              Create First Recurring Booking
            </Button>
          </Card>
        )}
      </div>

      {/* New Recurring Booking Dialog */}
      <Dialog open={showNewBooking} onOpenChange={setShowNewBooking}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">New Recurring Booking</DialogTitle>
            <DialogDescription>
              Schedule a client for regular appointments. No deposit required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Client Name</label>
              <Input
                placeholder="Enter client name"
                value={newBooking.client}
                onChange={(e) => setNewBooking(prev => ({ ...prev, client: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">Service</label>
              <Input
                placeholder="e.g., Volume Refill"
                value={newBooking.service}
                onChange={(e) => setNewBooking(prev => ({ ...prev, service: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Lash Artist</label>
              <Input
                placeholder="e.g., Lash Mama"
                value={newBooking.artist}
                onChange={(e) => setNewBooking(prev => ({ ...prev, artist: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Day of Week</label>
                <select
                  value={newBooking.day}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, day: e.target.value }))}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  {weekDays.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Time</label>
                <Input
                  type="time"
                  value={newBooking.time}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Start Date</label>
                <Input
                  type="date"
                  value={newBooking.startDate}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">End Date</label>
                <Input
                  type="date"
                  value={newBooking.endDate}
                  onChange={(e) => setNewBooking(prev => ({ ...prev, endDate: e.target.value }))}
                  disabled={newBooking.noEndDate}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="noEndDate"
                checked={newBooking.noEndDate}
                onCheckedChange={(checked) => setNewBooking(prev => ({ 
                  ...prev, 
                  noEndDate: checked as boolean,
                  endDate: checked ? "" : prev.endDate
                }))}
              />
              <label htmlFor="noEndDate" className="text-sm text-muted-foreground cursor-pointer">
                No end date (ongoing recurring booking)
              </label>
            </div>
            
            <Card className="p-3 bg-gold/10 border-0">
              <p className="text-sm text-gold font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                No deposit required for recurring bookings
              </p>
            </Card>
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowNewBooking(false)}>Cancel</Button>
            <Button variant="luxury" onClick={handleCreate}>Create Recurring Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRecurringBooking;
