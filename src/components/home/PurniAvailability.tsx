import { useState } from "react";
import { Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const availableSlots = [
  { date: "Mon, Jan 6", time: "10:00 AM", available: true },
  { date: "Wed, Jan 8", time: "2:30 PM", available: true },
  { date: "Fri, Jan 10", time: "11:00 AM", available: true },
  { date: "Sat, Jan 11", time: "3:00 PM", available: true },
  { date: "Mon, Jan 13", time: "9:30 AM", available: true },
  { date: "Tue, Jan 14", time: "1:00 PM", available: true },
  { date: "Wed, Jan 15", time: "4:00 PM", available: false },
  { date: "Thu, Jan 16", time: "11:30 AM", available: true },
];

const PurniAvailability = () => {
  const [showSlots, setShowSlots] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedSlots = showAll ? availableSlots : availableSlots.slice(0, 4);

  return (
    <div className="mt-6 pt-6 border-t border-gold/20">
      <Button
        variant="ghost"
        onClick={() => setShowSlots(!showSlots)}
        className="w-full justify-between text-foreground hover:text-gold hover:bg-gold/5 transition-all px-2 sm:px-4"
      >
        <span className="flex items-center gap-2 text-sm sm:text-base min-w-0">
          <Calendar className="h-4 w-4 text-gold flex-shrink-0" />
          <span className="truncate">View Available Slots with Purni</span>
        </span>
        {showSlots ? (
          <ChevronUp className="h-4 w-4 flex-shrink-0 text-gold" />
        ) : (
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-gold" />
        )}
      </Button>

      {showSlots && (
        <div className="mt-4 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {displayedSlots.map((slot, index) => (
              <Card
                key={index}
                className={`p-2.5 sm:p-3 text-center transition-all duration-300 ${
                  slot.available
                    ? "bg-cream hover:bg-gold/10 hover:border-gold/40 cursor-pointer border-gold/10"
                    : "bg-muted/50 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {slot.date}
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 text-muted-foreground">
                  <Clock className="h-3 w-3 flex-shrink-0" />
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
          
          {availableSlots.length > 4 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-3 text-gold hover:text-gold/80 hover:bg-gold/5"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show {availableSlots.length - 4} More Slots
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PurniAvailability;
