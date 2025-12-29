import { StaffMember, staffNotes } from "@/data/staff";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Star, Award, Sparkles } from "lucide-react";

interface StaffSelectionProps {
  staffMembers: StaffMember[];
  selectedStaff: string | null;
  onSelect: (staffId: string) => void;
  basePrice: number;
}

const tierIcons: Record<StaffMember["tier"], React.ReactNode> = {
  premium: <Award className="h-5 w-5 text-gold" />,
  senior: <Star className="h-5 w-5 text-gold" />,
  junior: <Sparkles className="h-5 w-5 text-muted-foreground" />,
};

const tierLabels: Record<StaffMember["tier"], string> = {
  premium: "Premium",
  senior: "Senior",
  junior: "Junior",
};

const StaffSelection = ({ staffMembers, selectedStaff, onSelect, basePrice }: StaffSelectionProps) => {
  const getAdjustedPrice = (staff: StaffMember) => {
    return Math.round(basePrice * staff.priceMultiplier);
  };

  const getPriceDiff = (staff: StaffMember) => {
    const diff = getAdjustedPrice(staff) - basePrice;
    if (diff > 0) return `+$${diff}`;
    if (diff < 0) return `-$${Math.abs(diff)}`;
    return "Standard";
  };

  return (
    <div className="space-y-4">
      {staffMembers.map((staff) => (
        <Card
          key={staff.id}
          variant={selectedStaff === staff.id ? "luxury" : "default"}
          className={cn(
            "p-6 cursor-pointer transition-all duration-200 border-2",
            selectedStaff === staff.id
              ? "border-gold"
              : "border-transparent hover:border-border"
          )}
          onClick={() => onSelect(staff.id)}
        >
          <div className="flex items-start gap-5">
            {/* Profile Picture */}
            <div className="relative shrink-0">
              <img
                src={staff.imageUrl}
                alt={staff.name}
                className={cn(
                  "w-20 h-20 rounded-full object-cover ring-4 transition-all duration-200",
                  staff.tier === "premium" ? "ring-gold/40" :
                  staff.tier === "senior" ? "ring-cream" :
                  "ring-beige"
                )}
              />
              {staff.tier === "premium" && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-lg">
                  <Award className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>

            {/* Staff Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {tierIcons[staff.tier]}
                <span className={cn(
                  "text-xs font-medium uppercase tracking-wider",
                  staff.tier === "premium" ? "text-gold" :
                  staff.tier === "senior" ? "text-charcoal" :
                  "text-muted-foreground"
                )}>
                  {tierLabels[staff.tier]}
                </span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-foreground">
                {staff.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {staff.title}
              </p>

              <p className="text-sm font-medium text-gold mb-2">
                {staff.experience}
              </p>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {staff.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {staff.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="text-xs px-2 py-1 rounded-full bg-beige text-muted-foreground"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Junior Note */}
              {staff.tier === "junior" && (
                <div className="mt-3 p-3 rounded-lg bg-cream/50 border border-gold/20">
                  <p className="text-xs text-muted-foreground italic">
                    {staffNotes.junior}
                  </p>
                </div>
              )}
            </div>

            {/* Price & Selection */}
            <div className="text-right shrink-0">
              <div className={cn(
                "text-sm font-medium mb-1",
                staff.tier === "premium" ? "text-gold" :
                staff.tier === "junior" ? "text-success" :
                "text-muted-foreground"
              )}>
                {getPriceDiff(staff)}
              </div>
              <div className="font-serif text-xl font-semibold text-foreground">
                ${getAdjustedPrice(staff)}
              </div>

              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-4 ml-auto",
                  selectedStaff === staff.id
                    ? "border-gold bg-gold"
                    : "border-border"
                )}
              >
                {selectedStaff === staff.id && (
                  <Check className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StaffSelection;
