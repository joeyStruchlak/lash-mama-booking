import { cn } from "@/lib/utils";
import VIPBadge from "@/components/ui/VIPBadge";
import lashMamaImg from "@/assets/staff/lash-mama.jpg";

const vipMembers = [
  {
    id: 1,
    name: "Sarah M.",
    isVIP: true,
    visits: 52,
    initials: "SM",
    color: "from-pink-200 to-rose-300",
  },
  {
    id: 2,
    name: "Jessica L.",
    isVIP: true,
    visits: 34,
    initials: "JL",
    color: "from-amber-200 to-orange-300",
  },
  {
    id: "lash-mama",
    name: "Lash Mama",
    isOwner: true,
    isVIP: false,
    visits: 0,
    image: lashMamaImg,
    color: "from-gold to-gold",
  },
  {
    id: 3,
    name: "Emma K.",
    isVIP: true,
    visits: 67,
    initials: "EK",
    color: "from-violet-200 to-purple-300",
  },
  {
    id: 4,
    name: "Olivia R.",
    isVIP: true,
    visits: 28,
    initials: "OR",
    color: "from-teal-200 to-cyan-300",
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
          const isOwner = 'isOwner' in member && member.isOwner;
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
                {/* Rainbow gold gradient ring for Lash Mama */}
                {isOwner && (
                  <>
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-gold via-amber-300 via-yellow-400 via-amber-500 to-gold animate-spin-slow" 
                         style={{ animationDuration: '4s' }} />
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold/60 via-amber-400/60 to-gold/60 rounded-full blur-md animate-pulse" />
                  </>
                )}
                
                {/* Glow effect for VIP members */}
                {member.isVIP && !isOwner && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/40 via-gold/60 to-gold/40 rounded-full blur-md animate-pulse" />
                )}
                
                {/* Profile picture container */}
                <div
                  className={cn(
                    "relative rounded-full flex items-center justify-center font-serif font-semibold text-charcoal shadow-lg overflow-hidden",
                    "ring-2 ring-gold/40",
                    member.isVIP && "ring-4 ring-gold",
                    isOwner && "ring-4 ring-gold",
                    sizeClasses[size],
                    !('image' in member) && `bg-gradient-to-br ${member.color}`
                  )}
                >
                  {'image' in member && member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className={textSizes[size]}>{member.initials}</span>
                  )}
                  
                  {/* VIP Diamond Badge - only for VIP members, not owner */}
                  {member.isVIP && !isOwner && (
                    <VIPBadge size={size} />
                  )}
                  
                  {/* Crown for Lash Mama */}
                  {isOwner && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-cream via-cream to-beige shadow-md flex items-center justify-center">
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-4 h-4 text-gold"
                        fill="currentColor"
                      >
                        <path d="M12 3L4 10L5 19H19L20 10L12 3Z" />
                        <circle cx="12" cy="7" r="1" fill="white" opacity="0.7" />
                      </svg>
                    </div>
                  )}
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
                  {isOwner ? "Founder" : "VIP Member"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-6">
        10 consecutive bookings to join our exclusive VIP inner circle
      </p>
    </div>
  );
};

export default VIPProfileExamples;
