import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { staffMembers } from "@/data/staff";

const AdminStaffManagement = () => {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Staff Management</h2>
          <p className="text-muted-foreground">Manage your team and their schedules</p>
        </div>
        <Button variant="luxury" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

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
                "p-6 border-0 bg-gradient-to-br from-card to-card/80 cursor-pointer transition-all duration-300",
                isSelected && "ring-2 ring-gold shadow-gold"
              )}
              onClick={() => setSelectedStaff(isSelected ? null : staff.id)}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl overflow-hidden",
                    staff.tier === "premium" && "ring-2 ring-gold"
                  )}>
                    <img 
                      src={staff.imageUrl} 
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {staff.tier === "premium" && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-gold to-amber-400 flex items-center justify-center">
                      <Award className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{staff.name}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      staff.tier === "premium" && "bg-gold/20 text-gold",
                      staff.tier === "senior" && "bg-violet-100 text-violet-600",
                      staff.tier === "junior" && "bg-sky-100 text-sky-600",
                    )}>
                      {staff.tier}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{staff.title}</p>
                  
                  {/* Stats */}
                  {stats && (
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-gold" />
                        {stats.bookings} bookings
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                        {stats.rating}
                      </span>
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    isSelected && "rotate-90"
                  )} />
                </Button>
              </div>

              {/* Expanded Shifts */}
              {isSelected && shifts && (
                <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold" />
                      Weekly Schedule
                    </h4>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <Edit className="h-3.5 w-3.5" />
                      Edit Shifts
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {shifts.map((shift) => (
                      <div 
                        key={shift.day}
                        className="p-3 rounded-lg bg-muted/50"
                      >
                        <p className="text-sm font-medium text-foreground">{shift.day}</p>
                        <p className="text-xs text-muted-foreground">{shift.hours}</p>
                      </div>
                    ))}
                  </div>

                  {/* Specialties */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-foreground mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {staff.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="px-3 py-1 rounded-full text-xs bg-gold/10 text-gold"
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
    </div>
  );
};

export default AdminStaffManagement;
