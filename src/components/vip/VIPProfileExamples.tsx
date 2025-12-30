import { cn } from "@/lib/utils";
import VIPBadge from "@/components/ui/VIPBadge";

const vipMembers = [
  {
    id: 1,
    name: "Sarah M.",
    tier: "diamond",
    visits: 52,
    initials: "SM",
    color: "from-pink-200 to-rose-300",
  },
  {
    id: 2,
    name: "Jessica L.",
    tier: "gold",
    visits: 34,
    initials: "JL",
    color: "from-amber-200 to-orange-300",
  },
  {
    id: 3,
    name: "Emma K.",
    tier: "diamond",
    visits: 67,
    initials: "EK",
    color: "from-violet-200 to-purple-300",
  },
  {
    id: 4,
    name: "Olivia R.",
    tier: "gold",
    visits: 28,
    initials: "OR",
    color: "from-teal-200 to-cyan-300",
  },
  {
    id: 5,
    name: "Ava T.",
    tier: "diamond",
    visits: 45,
    initials: "AT",
    color: "from-rose-200 to-pink-300",
  },
];

const VIPProfileExamples = () => {
  return (
    <div className="py-8">
      <h3 className="font-serif text-xl font-semibold text-center mb-6 text-foreground">
        Our VIP Inner Circle
      </h3>
      
      <div className="flex justify-center items-end gap-3 sm:gap-6">
        {vipMembers.map((member, index) => {
          const isCenter = index === 2;
          const size = isCenter ? "lg" : index === 1 || index === 3 ? "md" : "sm";
          
          const sizeClasses = {
            sm: "w-14 h-14 sm:w-16 sm:h-16",
            md: "w-16 h-16 sm:w-20 sm:h-20",
            lg: "w-20 h-20 sm:w-24 sm:h-24",
          };
          
          const textSizes = {
            sm: "text-sm sm:text-base",
            md: "text-base sm:text-lg",
            lg: "text-lg sm:text-xl",
          };
          
          return (
            <div 
              key={member.id} 
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105",
                isCenter && "z-10"
              )}
            >
              <div className="relative">
                {/* Glow effect for diamond tier */}
                {member.tier === "diamond" && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/40 via-gold/60 to-gold/40 rounded-full blur-md animate-pulse" />
                )}
                
                {/* Profile picture container */}
                <div
                  className={cn(
                    "relative rounded-full bg-gradient-to-br flex items-center justify-center font-serif font-semibold text-charcoal shadow-lg",
                    "ring-2 ring-gold/40",
                    member.tier === "diamond" && "ring-4 ring-gold",
                    sizeClasses[size],
                    member.color
                  )}
                >
                  <span className={textSizes[size]}>{member.initials}</span>
                  
                  {/* VIP Diamond Badge */}
                  <VIPBadge size={size} />
                </div>
              </div>
              
              <div className="text-center">
                <p className={cn(
                  "font-medium text-foreground",
                  isCenter ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                )}>
                  {member.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gold capitalize">
                  {member.tier} Member
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-6">
        Join our exclusive VIP program and earn your diamond status
      </p>
    </div>
  );
};

export default VIPProfileExamples;
