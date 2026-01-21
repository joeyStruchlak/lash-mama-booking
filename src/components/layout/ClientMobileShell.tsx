import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Sparkles, 
  Calendar, 
  Crown, 
  GraduationCap,
  User,
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Clock,
  Heart
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import UserRoleSwitcher from "./UserRoleSwitcher";
import { useUserRole } from "@/contexts/UserRoleContext";

interface ClientMobileShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Sparkles },
  { href: "/book", label: "Book", icon: Calendar, isMain: true },
  { href: "/vip", label: "VIP", icon: Crown },
  { href: "/", label: "More", icon: Menu, isMore: true },
];

const moreMenuItems = [
  { href: "/courses", label: "Courses", icon: GraduationCap, description: "Learn lash artistry" },
  { href: "/about", label: "About Us", icon: Heart, description: "Our story & team" },
];

const ClientMobileShell = ({ children, hideNav = false }: ClientMobileShellProps) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, setCurrentRole } = useUserRole();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname === path;
  };
  
  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isMore) {
      setIsMoreOpen(true);
    } else {
      navigate(item.href);
    }
  };
  
  const handleMoreItemClick = (href: string) => {
    setIsMoreOpen(false);
    navigate(href);
  };
  
  // Check if we're in any of the more menu items
  const isInMoreMenu = moreMenuItems.some(item => isActive(item.href));
  
  return (
    <div className="lg:hidden flex flex-col min-h-screen bg-background">
      {/* Mobile App Header */}
      <header className="fixed top-0 left-0 right-0 z-50 safe-area-pt">
        <div className="bg-background/80 backdrop-blur-xl border-b border-border/30">
          <div className="flex items-center justify-between px-4 h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                Lash <span className="text-gold">Mama</span>
              </span>
            </Link>
            
            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <UserRoleSwitcher 
                currentRole={currentRole} 
                onRoleChange={setCurrentRole}
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content area - scrollable */}
      <main className="flex-1 pt-14 pb-24">
        {children}
      </main>
      
      {/* Fixed Bottom Navigation Bar - Native app style */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
          {/* Blur background with premium gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/98 to-background/90 backdrop-blur-xl border-t border-gold/10" />
          
          {/* Navigation items container */}
          <div className="relative flex items-stretch justify-around px-1 pt-1 pb-2 safe-area-pb">
            {navItems.map((item) => {
              const active = item.isMore ? isInMoreMenu : isActive(item.href);
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 min-w-[56px] relative transition-all duration-300",
                    "active:scale-90 touch-manipulation",
                    item.isMain && "px-4"
                  )}
                >
                  {/* Main book button special styling */}
                  {item.isMain ? (
                    <div className="relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gold/30 blur-lg scale-110" />
                      
                      {/* Button */}
                      <div className={cn(
                        "relative w-14 h-10 rounded-2xl flex items-center justify-center transition-all duration-300",
                        "bg-gradient-to-br from-gold via-gold to-gold-dark",
                        "shadow-[0_4px_20px_rgba(212,175,55,0.4)]",
                        active && "scale-105"
                      )}>
                        <item.icon className="h-5 w-5 text-charcoal" />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Animated active indicator pill at top */}
                      <div className={cn(
                        "absolute top-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-gold to-gold/80 transition-all duration-300",
                        active ? "w-6 opacity-100" : "w-0 opacity-0"
                      )} />
                      
                      {/* Icon container with glow effect */}
                      <div className={cn(
                        "relative flex items-center justify-center w-8 h-8 rounded-2xl transition-all duration-300",
                        active && "bg-gold/10"
                      )}>
                        {/* Active glow effect */}
                        {active && (
                          <div className="absolute inset-0 rounded-2xl bg-gold/20 blur-md animate-pulse" />
                        )}
                        
                        <item.icon className={cn(
                          "h-5 w-5 relative z-10 transition-all duration-300",
                          active 
                            ? "text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" 
                            : "text-muted-foreground"
                        )} />
                      </div>
                    </>
                  )}
                  
                  {/* Label */}
                  <span className={cn(
                    "text-[10px] font-medium leading-tight transition-all duration-300",
                    item.isMain 
                      ? "text-gold font-semibold"
                      : active 
                        ? "text-gold font-semibold" 
                        : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* iOS Home Indicator */}
          <div className="flex justify-center pb-1 pt-0.5">
            <div className="w-32 h-1 rounded-full bg-foreground/20" />
          </div>
        </nav>
      )}
      
      {/* More Menu Sheet */}
      <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-[28px] px-4 pb-10 pt-6 max-h-[85vh]">
          {/* Handle indicator */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-muted-foreground/30" />
          
          <SheetHeader className="pb-5">
            <SheetTitle className="font-serif text-xl text-center">More</SheetTitle>
          </SheetHeader>
          
          {/* Menu items */}
          <div className="space-y-2 mb-6">
            {moreMenuItems.map((item) => {
              const active = isActive(item.href);
              
              return (
                <button
                  key={item.href}
                  onClick={() => handleMoreItemClick(item.href)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200",
                    "active:scale-[0.98] touch-manipulation",
                    active 
                      ? "bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30" 
                      : "bg-muted/40 hover:bg-muted/60"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200",
                    active 
                      ? "bg-gradient-to-br from-gold via-gold to-gold-dark shadow-gold" 
                      : "bg-background shadow-sm"
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5 transition-all duration-200",
                      active ? "text-charcoal" : "text-foreground"
                    )} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <span className={cn(
                      "font-medium block",
                      active ? "text-gold" : "text-foreground"
                    )}>
                      {item.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                  
                  <ChevronRight className={cn(
                    "h-5 w-5",
                    active ? "text-gold" : "text-muted-foreground"
                  )} />
                </button>
              );
            })}
          </div>
          
          {/* Contact Section */}
          <div className="border-t border-border pt-6">
            <h4 className="font-serif text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Contact Us
            </h4>
            
            <div className="space-y-3">
              <a 
                href="tel:+15551234567" 
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 active:bg-muted/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <span className="text-sm font-medium">(555) 123-4567</span>
              </a>
              
              <a 
                href="mailto:hello@lashmama.com" 
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 active:bg-muted/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-gold" />
                </div>
                <span className="text-sm font-medium">hello@lashmama.com</span>
              </a>
              
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 active:bg-muted/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Instagram className="h-4 w-4 text-gold" />
                </div>
                <span className="text-sm font-medium">@lashmama</span>
              </a>
            </div>
            
            {/* Hours */}
            <div className="mt-6 p-4 rounded-2xl bg-cream/50 border border-gold/20">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gold" />
                <span className="font-serif font-medium">Hours</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span>9am - 7pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9am - 5pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientMobileShell;
