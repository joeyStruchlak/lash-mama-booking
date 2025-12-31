import { Gem, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface VIPProgressBannerProps {
  currentBookings?: number;
  requiredBookings?: number;
}

const VIPProgressBanner = ({ 
  currentBookings = 7, 
  requiredBookings = 10 
}: VIPProgressBannerProps) => {
  const remaining = requiredBookings - currentBookings;
  const progress = (currentBookings / requiredBookings) * 100;
  const isVIP = currentBookings >= requiredBookings;

  if (isVIP) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/90 p-4 sm:p-5">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
            <Gem className="h-5 w-5 text-gold" />
          </div>
          <div className="min-w-0">
            <p className="text-cream font-medium text-sm sm:text-base">
              <span className="text-gold font-serif font-semibold">{remaining}</span> more booking{remaining !== 1 ? 's' : ''} to become VIP
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-24 sm:w-32 bg-cream/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold to-gold/80 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-cream/60">{currentBookings}/{requiredBookings}</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="luxury" 
          size="sm" 
          asChild
          className="flex-shrink-0"
        >
          <Link to="/vip" className="flex items-center gap-1">
            Learn More
            <ChevronRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default VIPProgressBanner;
