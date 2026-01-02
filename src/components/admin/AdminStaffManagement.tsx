import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  UserCog,
  Calendar,
  Clock,
  Star,
  Edit,
  Plus,
  Sparkles,
  Award,
  ChevronRight,
  CalendarOff,
  Check,
  X,
  Send,
} from "lucide-react";
import { staffMembers } from "@/data/staff";
import { useUserRole } from "@/contexts/UserRoleContext";
import { toast } from "sonner";

interface TimeOffRequest {
  id: number;
  staffId: string;
  staffName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

const AdminStaffManagement = () => {
  const { currentRole } = useUserRole();
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [showTimeOffModal, setShowTimeOffModal] = useState(false);
  const [timeOffForm, setTimeOffForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([
    { id: 1, staffId: "nikki", staffName: "Nikki", startDate: "Jan 20", endDate: "Jan 22", reason: "Family event", status: "pending" },
    { id: 2, staffId: "beau", staffName: "Beau", startDate: "Feb 5", endDate: "Feb 7", reason: "Personal appointment", status: "pending" },
    { id: 3, staffId: "natali", staffName: "Natali", startDate: "Jan 25", endDate: "Jan 25", reason: "Doctor's appointment", status: "approved" },
  ]);

  const staffShifts = {
    "lash-mama": [
      { day: "Monday", hours: "9:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 4:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
      { day: "Friday", hours: "9:00 AM - 6:00 PM" },
    ],
    "nikki": [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 6:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 3:00 PM" },
    ],
    "beau": [
      { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    ],
    "natali": [
      { day: "Monday", hours: "10:00 AM - 4:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 4:00 PM" },
      { day: "Friday", hours: "10:00 AM - 4:00 PM" },
    ],
  };

  const staffStats = {
    "lash-mama": { bookings: 156, rating: 5.0, revenue: "$24,560" },
    "nikki": { bookings: 142, rating: 4.9, revenue: "$18,340" },
    "beau": { bookings: 98, rating: 4.8, revenue: "$12,250" },
    "natali": { bookings: 62, rating: 4.7, revenue: "$5,280" },
  };

  const handleTimeOffSubmit = () => {
    toast.success("Time off request submitted! Waiting for Lash Mama's approval.");
    setShowTimeOffModal(false);
    setTimeOffForm({ startDate: "", endDate: "", reason: "" });
  };

  const handleApproveTimeOff = (id: number) => {
    if (currentRole !== "admin") {
      toast.error("Only Lash Mama can approve time off requests");
      return;
    }
    setTimeOffRequests(prev => prev.map(r => r.id === id ? { ...r, status: "approved" } : r));
    toast.success("Time off request approved!");
  };

  const handleRejectTimeOff = (id: number) => {
    if (currentRole !== "admin") {
      toast.error("Only Lash Mama can reject time off requests");
      return;
    }
    setTimeOffRequests(prev => prev.map(r => r.id === id ? { ...r, status: "rejected" } : r));
    toast.error("Time off request rejected");
  };

  const pendingRequests = timeOffRequests.filter(r => r.status === "pending");

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Staff Management</h2>
          <p className="text-sm text-muted-foreground">Manage your team and their schedules</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowTimeOffModal(true)}>
            <CalendarOff className="h-4 w-4" />
            <span className="hidden sm:inline">Request Time Off</span>
          </Button>
          <Button variant="luxury" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Staff</span>
          </Button>
        </div>
      </div>

      {/* Time Off Requests Section - Only visible to Admin */}
      {currentRole === "admin" && pendingRequests.length > 0 && (
        <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-amber-50 to-amber-100/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <CalendarOff className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-foreground">Time Off Requests</h3>
              <p className="text-sm text-muted-foreground">{pendingRequests.length} pending approval</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <div 
                key={request.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-background/80"
              >
                <div>
                  <p className="font-medium text-foreground">{request.staffName}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.startDate} - {request.endDate} • {request.reason}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="luxury" 
                    className="gap-1.5"
                    onClick={() => handleApproveTimeOff(request.id)}
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="gap-1.5 text-rose-600 hover:bg-rose-50"
                    onClick={() => handleRejectTimeOff(request.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffMembers.map((staff) => {
          const stats = staffStats[staff.id as keyof typeof staffStats];
          const shifts = staffShifts[staff.id as keyof typeof staffShifts];
          const isSelected = selectedStaff === staff.id;
          
          return (
            <Card 
              key={staff.id}
              className={cn(
                "p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80 cursor-pointer transition-all duration-300",
                isSelected && "ring-2 ring-gold shadow-gold"
              )}
              onClick={() => setSelectedStaff(isSelected ? null : staff.id)}
            >
              <div className="flex items-start gap-3 md:gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className={cn(
                    "w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden",
                    staff.tier === "premium" && "ring-2 ring-gold"
                  )}>
                    <img 
                      src={staff.imageUrl} 
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {staff.tier === "premium" && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-gold to-amber-400 flex items-center justify-center">
                      <Award className="h-3 w-3 md:h-3.5 md:w-3.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <h3 className="font-serif text-base md:text-lg font-semibold text-foreground truncate">{staff.name}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
                      staff.tier === "premium" && "bg-gold/20 text-gold",
                      staff.tier === "senior" && "bg-violet-100 text-violet-600",
                      staff.tier === "junior" && "bg-sky-100 text-sky-600",
                    )}>
                      {staff.tier}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 md:mb-3 truncate">{staff.title}</p>
                  
                  {/* Stats */}
                  {stats && (
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5 text-gold" />
                        {stats.bookings}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-3 w-3 md:h-3.5 md:w-3.5 text-gold fill-gold" />
                        {stats.rating}
                      </span>
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    isSelected && "rotate-90"
                  )} />
                </Button>
              </div>

              {/* Expanded Shifts */}
              {isSelected && shifts && (
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground flex items-center gap-2 text-sm md:text-base">
                      <Clock className="h-4 w-4 text-gold" />
                      Weekly Schedule
                    </h4>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground text-xs md:text-sm">
                      <Edit className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {shifts.map((shift) => (
                      <div 
                        key={shift.day}
                        className="p-2 md:p-3 rounded-lg bg-muted/50"
                      >
                        <p className="text-xs md:text-sm font-medium text-foreground">{shift.day}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">{shift.hours}</p>
                      </div>
                    ))}
                  </div>

                  {/* Specialties */}
                  <div className="mt-4">
                    <p className="text-xs md:text-sm font-medium text-foreground mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {staff.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs bg-gold/10 text-gold"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Time Off Request Modal */}
      <Dialog open={showTimeOffModal} onOpenChange={setShowTimeOffModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Request Time Off</DialogTitle>
            <DialogDescription>
              Submit your time off request. Lash Mama will review and approve.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Start Date</label>
                <Input 
                  type="date" 
                  value={timeOffForm.startDate}
                  onChange={(e) => setTimeOffForm(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">End Date</label>
                <Input 
                  type="date" 
                  value={timeOffForm.endDate}
                  onChange={(e) => setTimeOffForm(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Reason</label>
              <Textarea 
                placeholder="Brief reason for time off..."
                value={timeOffForm.reason}
                onChange={(e) => setTimeOffForm(prev => ({ ...prev, reason: e.target.value }))}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTimeOffModal(false)}>
              Cancel
            </Button>
            <Button variant="luxury" onClick={handleTimeOffSubmit} className="gap-2">
              <Send className="h-4 w-4" />
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStaffManagement;