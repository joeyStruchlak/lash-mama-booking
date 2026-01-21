import { useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Grid3X3 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

interface MobileAppShellProps {
  items: NavItem[];
  activeSection: string;
  onNavClick: (id: string) => void;
  children: React.ReactNode;
}

const MobileAppShell = ({ 
  items, 
  activeSection, 
  onNavClick,
  children 
}: MobileAppShellProps) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  
  // First 4 items go in bottom bar, rest go in "More" menu
  const bottomItems = items.slice(0, 4);
  const moreItems = items.slice(4);
  const hasActiveInMore = moreItems.some(item => item.id === activeSection);
  
  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsMoreOpen(false);
  };
  
  return (
    <div className="lg:hidden flex flex-col min-h-screen">
      {/* Main content area - scrollable */}
      <div className="flex-1 overflow-y-auto pb-24">
        {children}
      </div>
      
      {/* Fixed Bottom Navigation Bar - True native app style */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        {/* Blur background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/98 to-background/90 backdrop-blur-xl border-t border-gold/10" />
        
        {/* Navigation items container */}
        <div className="relative flex items-stretch justify-around px-1 pt-1 pb-2 safe-area-pb">
          {/* Primary nav items */}
          {bottomItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-1.5 px-4 min-w-[60px] relative transition-all duration-300",
                  "active:scale-90 touch-manipulation"
                )}
              >
                {/* Animated active indicator pill at top */}
                <div className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-gold to-gold/80 transition-all duration-300",
                  isActive ? "w-8 opacity-100" : "w-0 opacity-0"
                )} />
                
                {/* Icon container with glow effect */}
                <div className={cn(
                  "relative flex items-center justify-center w-8 h-8 rounded-2xl transition-all duration-300",
                  isActive && "bg-gold/10"
                )}>
                  {/* Active glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gold/20 blur-md animate-pulse" />
                  )}
                  
                  <item.icon className={cn(
                    "h-6 w-6 relative z-10 transition-all duration-300",
                    isActive 
                      ? "text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" 
                      : "text-muted-foreground"
                  )} />
                  
                  {/* Badge */}
                  {item.badge && (
                    <span className={cn(
                      "absolute -top-0.5 -right-1 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-bold flex items-center justify-center",
                      "bg-gradient-to-br from-gold to-gold-dark text-primary-foreground",
                      "shadow-[0_2px_8px_rgba(212,175,55,0.4)]",
                      "animate-scale-in"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {/* Label with active animation */}
                <span className={cn(
                  "text-[10px] font-medium leading-tight transition-all duration-300",
                  isActive 
                    ? "text-gold font-semibold" 
                    : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
          
          {/* More menu button */}
          {moreItems.length > 0 && (
            <button
              onClick={() => setIsMoreOpen(true)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-1.5 px-4 min-w-[60px] relative transition-all duration-300",
                "active:scale-90 touch-manipulation"
              )}
            >
              {/* Active indicator for More */}
              <div className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-gold to-gold/80 transition-all duration-300",
                hasActiveInMore ? "w-8 opacity-100" : "w-0 opacity-0"
              )} />
              
              <div className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-2xl transition-all duration-300",
                hasActiveInMore && "bg-gold/10"
              )}>
                {hasActiveInMore && (
                  <div className="absolute inset-0 rounded-2xl bg-gold/20 blur-md animate-pulse" />
                )}
                
                <Grid3X3 className={cn(
                  "h-6 w-6 relative z-10 transition-all duration-300",
                  hasActiveInMore 
                    ? "text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" 
                    : "text-muted-foreground"
                )} />
              </div>
              
              <span className={cn(
                "text-[10px] font-medium leading-tight transition-all duration-300",
                hasActiveInMore ? "text-gold font-semibold" : "text-muted-foreground"
              )}>
                More
              </span>
            </button>
          )}
        </div>
        
        {/* iOS Home Indicator */}
        <div className="flex justify-center pb-1 pt-0.5">
          <div className="w-32 h-1 rounded-full bg-foreground/20" />
        </div>
      </nav>
      
      {/* More Menu Sheet */}
      <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-[28px] px-4 pb-10 pt-6">
          {/* Handle indicator */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-muted-foreground/30" />
          
          <SheetHeader className="pb-5">
            <SheetTitle className="font-serif text-xl text-center">All Features</SheetTitle>
          </SheetHeader>
          
          {/* Grid of menu items */}
          <div className="grid grid-cols-4 gap-3">
            {moreItems.map((item) => {
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-2.5 p-3 rounded-2xl transition-all duration-200",
                    "active:scale-95 touch-manipulation",
                    isActive 
                      ? "bg-gradient-to-br from-gold/20 to-gold/10" 
                      : "bg-muted/40 hover:bg-muted/60"
                  )}
                >
                  <div className={cn(
                    "relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-br from-gold via-gold to-gold-dark shadow-gold" 
                      : "bg-background shadow-sm"
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5 transition-all duration-200",
                      isActive ? "text-primary-foreground" : "text-foreground"
                    )} />
                    
                    {item.badge && (
                      <span className={cn(
                        "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center",
                        "bg-gradient-to-br from-gold to-gold-dark text-primary-foreground shadow-gold"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <span className={cn(
                    "text-[11px] font-medium text-center leading-tight",
                    isActive ? "text-gold" : "text-foreground"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileAppShell;
