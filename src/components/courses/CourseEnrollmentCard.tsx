import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Users,
  Clock,
  DollarSign,
  CheckCircle2,
  UserPlus,
  ArrowRight,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface CourseSession {
  id: string;
  title: string;
  date: string;
  time: string;
  totalSpots: number;
  confirmedSpots: number;
  price: number;
  depositAmount: number;
}

interface CourseEnrollmentCardProps {
  courseId: string;
  courseTitle: string;
  courseSubtitle: string;
  courseDescription: string;
  icon: React.ElementType;
  sessions: CourseSession[];
  colorScheme: {
    bg: string;
    border: string;
    badge: string;
    icon: string;
    glow: string;
  };
}

const CourseEnrollmentCard = ({
  courseId,
  courseTitle,
  courseSubtitle,
  courseDescription,
  icon: Icon,
  sessions,
  colorScheme,
}: CourseEnrollmentCardProps) => {
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CourseSession | null>(null);
  const [enrollmentData, setEnrollmentData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleEnrollClick = (session: CourseSession) => {
    setSelectedSession(session);
    setShowEnrollDialog(true);
  };

  const handleEnrollSubmit = () => {
    if (!enrollmentData.name || !enrollmentData.email || !enrollmentData.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    setShowEnrollDialog(false);
    setShowPaymentDialog(true);
  };

  const handlePayDeposit = () => {
    toast.success("Deposit paid successfully! Your seat is now secured.", {
      description: `Confirmation email sent to ${enrollmentData.email}`,
    });
    setShowPaymentDialog(false);
    setEnrollmentData({ name: "", email: "", phone: "" });
    setSelectedSession(null);
  };

  // Get the most relevant session (next upcoming)
  const upcomingSession = sessions.length > 0 ? sessions[0] : null;

  if (!upcomingSession) return null;

  const availableSpots = upcomingSession.totalSpots - upcomingSession.confirmedSpots;

  return (
    <>
      <Card
        className={cn(
          "relative overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
          colorScheme.bg,
          colorScheme.border
        )}
      >
        <div
          className={cn(
            "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br rounded-full blur-xl",
            colorScheme.glow
          )}
        />

        <div className="relative z-10 p-6">
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3",
              colorScheme.badge
            )}
          >
            <Icon className="h-3 w-3" />
            Group Session
          </div>

          <h3 className="font-serif text-xl font-semibold text-cream mb-1">
            {courseTitle}
          </h3>
          <p className={cn("text-xs mb-3", colorScheme.icon)}>
            {courseSubtitle}
          </p>

          <p className="text-cream/70 text-sm leading-relaxed mb-4">
            {courseDescription}
          </p>

          {/* Next Session Info */}
          <div className="bg-background/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-cream/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className={cn("h-4 w-4", colorScheme.icon)} />
              <span className="text-sm font-medium text-cream">Next Session</span>
            </div>
            
            <div className="flex flex-col gap-2 text-cream/80 text-sm mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cream/60" />
                {new Date(upcomingSession.date).toLocaleDateString('en-AU', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cream/60" />
                {upcomingSession.time}
              </div>
            </div>

            {/* Seat Visualization */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className={cn("h-4 w-4", colorScheme.icon)} />
                <span className="text-xs text-cream/70">
                  {availableSpots} of {upcomingSession.totalSpots} seats available
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: upcomingSession.totalSpots }).map((_, i) => {
                  const isOccupied = i < upcomingSession.confirmedSpots;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                        isOccupied
                          ? "bg-gradient-to-br from-gold to-gold/80 text-charcoal shadow-sm"
                          : "bg-cream/20 text-cream/60 border border-dashed border-cream/30"
                      )}
                    >
                      {isOccupied ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            <Badge
              className={cn(
                "text-xs",
                availableSpots === 0
                  ? "bg-rose-100 text-rose-700"
                  : availableSpots <= 2
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              )}
            >
              {availableSpots === 0
                ? "Fully Booked"
                : availableSpots <= 2
                ? "Almost Full"
                : "Spots Available"}
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-cream/10">
            <div>
              <div className="text-cream/60 text-xs">Course Fee</div>
              <div className="font-serif text-xl font-semibold text-cream">
                ${upcomingSession.price}
              </div>
              <div className="text-xs text-gold">
                ${upcomingSession.depositAmount} deposit to secure
              </div>
            </div>
            <Button
              size="sm"
              variant="luxury"
              className="gap-1.5"
              onClick={() => handleEnrollClick(upcomingSession)}
              disabled={availableSpots === 0}
            >
              {availableSpots === 0 ? (
                "Join Waitlist"
              ) : (
                <>
                  Enroll Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Enrollment Form Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="font-serif">Enroll in Course</DialogTitle>
            <DialogDescription>
              {selectedSession?.title} - {selectedSession && new Date(selectedSession.date).toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <Input
                placeholder="Enter your full name"
                value={enrollmentData.name}
                onChange={(e) => setEnrollmentData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={enrollmentData.email}
                onChange={(e) => setEnrollmentData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input
                placeholder="Enter your phone number"
                value={enrollmentData.phone}
                onChange={(e) => setEnrollmentData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <Card className="p-4 bg-gold/10 border-gold/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Deposit Required</p>
                  <p className="text-xs text-muted-foreground">
                    ${selectedSession?.depositAmount} deposit secures your seat
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowEnrollDialog(false)}>
              Cancel
            </Button>
            <Button variant="luxury" onClick={handleEnrollSubmit}>
              Continue to Payment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="font-serif">Secure Your Seat</DialogTitle>
            <DialogDescription>
              Pay your deposit to confirm your enrollment
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Card className="p-4 bg-muted/50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course</span>
                  <span className="font-medium">{courseTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {selectedSession && new Date(selectedSession.date).toLocaleDateString('en-AU', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{selectedSession?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student</span>
                  <span className="font-medium">{enrollmentData.name}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course Fee</span>
                    <span className="font-medium">${selectedSession?.price}</span>
                  </div>
                  <div className="flex justify-between text-gold">
                    <span className="font-medium">Deposit Due Now</span>
                    <span className="font-semibold">${selectedSession?.depositAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Remaining Balance</span>
                    <span>${(selectedSession?.price || 0) - (selectedSession?.depositAmount || 0)}</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Input placeholder="Card Number" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVC" />
              </div>
              <Input placeholder="Cardholder Name" />
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Back
            </Button>
            <Button variant="luxury" className="gap-2" onClick={handlePayDeposit}>
              <CreditCard className="h-4 w-4" />
              Pay ${selectedSession?.depositAmount} Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseEnrollmentCard;
