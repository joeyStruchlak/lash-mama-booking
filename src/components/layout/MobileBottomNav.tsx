import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

interface MobileBottomNavProps {
  items: NavItem[];
  activeSection: string;
  onNavClick: (id: string) => void;
  /** Show first 5 items in bottom bar, rest in "More" menu */
  maxItems?: number;
}

const MobileBottomNav = ({ 
  items, 
  activeSection, 
  onNavClick,
  maxItems = 5 
}: MobileBottomNavProps) => {
  // Show primary items in bottom bar
  const primaryItems = items.slice(0, maxItems);
  
  return (
    <>
      {/* Fixed Bottom Navigation Bar - iOS/Android style */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50 safe-area-pb">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
        
        {/* Navigation items */}
        <div className="relative flex items-stretch justify-around px-2 py-1">
          {primaryItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[64px] relative transition-all duration-200",
                  "active:scale-95 touch-manipulation"
                )}
              >
                {/* Active indicator pill */}
                {isActive && (
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gold animate-scale-in" />
                )}
                
                {/* Icon container */}
                <div className={cn(
                  "relative flex items-center justify-center w-7 h-7 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-gold/15" 
                    : "bg-transparent"
                )}>
                  <item.icon className={cn(
                    "h-[22px] w-[22px] transition-all duration-200",
                    isActive 
                      ? "text-gold" 
                      : "text-muted-foreground"
                  )} />
                  
                  {/* Badge */}
                  {item.badge && (
                    <span className={cn(
                      "absolute -top-1 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center",
                      "bg-gold text-primary-foreground shadow-gold",
                      "animate-scale-in"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {/* Label */}
                <span className={cn(
                  "text-[10px] font-medium transition-all duration-200 leading-tight",
                  isActive 
                    ? "text-gold" 
                    : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Home indicator bar (iOS style) */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 rounded-full bg-muted-foreground/20" />
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind bottom nav */}
      <div className="lg:hidden h-20" />
    </>
  );
};

export default MobileBottomNav;
