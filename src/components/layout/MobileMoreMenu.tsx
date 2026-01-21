import { useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Grid3X3, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

interface MobileMoreMenuProps {
  items: NavItem[];
  activeSection: string;
  onNavClick: (id: string) => void;
  skipFirst?: number;
}

const MobileMoreMenu = ({ 
  items, 
  activeSection, 
  onNavClick,
  skipFirst = 4 
}: MobileMoreMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get items that aren't in bottom bar
  const moreItems = items.slice(skipFirst);
  const hasActiveInMore = moreItems.some(item => item.id === activeSection);
  
  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };
  
  if (moreItems.length === 0) return null;
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[64px] relative transition-all duration-200",
            "active:scale-95 touch-manipulation"
          )}
        >
          {/* Active indicator */}
          {hasActiveInMore && (
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gold animate-scale-in" />
          )}
          
          <div className={cn(
            "relative flex items-center justify-center w-7 h-7 rounded-xl transition-all duration-200",
            hasActiveInMore ? "bg-gold/15" : "bg-transparent"
          )}>
            <Grid3X3 className={cn(
              "h-[22px] w-[22px] transition-all duration-200",
              hasActiveInMore ? "text-gold" : "text-muted-foreground"
            )} />
          </div>
          
          <span className={cn(
            "text-[10px] font-medium transition-all duration-200 leading-tight",
            hasActiveInMore ? "text-gold" : "text-muted-foreground"
          )}>
            More
          </span>
        </button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-8">
        <SheetHeader className="pb-4">
          <SheetTitle className="font-serif text-lg text-center">All Features</SheetTitle>
        </SheetHeader>
        
        {/* Grid of additional items */}
        <div className="grid grid-cols-4 gap-3">
          {moreItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200",
                  "active:scale-95 touch-manipulation",
                  isActive 
                    ? "bg-gold/15" 
                    : "bg-muted/50 hover:bg-muted"
                )}
              >
                <div className={cn(
                  "relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-br from-gold to-gold/80 shadow-gold" 
                    : "bg-background"
                )}>
                  <item.icon className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isActive ? "text-primary-foreground" : "text-foreground"
                  )} />
                  
                  {item.badge && (
                    <span className={cn(
                      "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center",
                      "bg-gold text-primary-foreground shadow-gold"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </div>
                
                <span className={cn(
                  "text-xs font-medium text-center leading-tight",
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
  );
};

export default MobileMoreMenu;
