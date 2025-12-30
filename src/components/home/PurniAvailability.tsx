import { useState } from "react";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const availableSlots = [
  { date: "Mon, Jan 6", time: "10:00 AM", available: true },
  { date: "Wed, Jan 8", time: "2:30 PM", available: true },
  { date: "Fri, Jan 10", time: "11:00 AM", available: true },
  { date: "Sat, Jan 11", time: "3:00 PM", available: false },
];

const PurniAvailability = () => {
  const [showSlots, setShowSlots] = useState(false);

  return (
    <div className="mt-6 pt-6 border-t border-gold/20">
      <Button
        variant="ghost"
        onClick={() => setShowSlots(!showSlots)}
        className="w-full justify-between text-foreground hover:text-gold hover:bg-gold/5 transition-all"
      >
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gold" />
          View Next Available Slots with Purni
        </span>
        <ChevronRight
          className={`h-4 w-4 transition-transform duration-300 ${
            showSlots ? "rotate-90" : ""
          }`}
        />
      </Button>

      {showSlots && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
          {availableSlots.map((slot, index) => (
            <Card
              key={index}
              className={`p-4 text-center transition-all duration-300 ${
                slot.available
                  ? "bg-cream hover:bg-gold/10 hover:border-gold/40 cursor-pointer"
                  : "bg-muted/50 opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="text-sm font-medium text-foreground">
                {slot.date}
              </div>
              <div className="flex items-center justify-center gap-1 mt-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{slot.time}</span>
              </div>
              {!slot.available && (
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  Booked
                </span>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurniAvailability;
