import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Gem, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserRoleSwitcher from "./UserRoleSwitcher";
import { useUserRole } from "@/contexts/UserRoleContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentRole, setCurrentRole } = useUserRole();

  // Reordered: Home, Services, VIP (special), Book Now, Courses, About
  const navLinks = [
    { href: "/", label: "Home", isSpecial: false },
    { href: "/services", label: "Services", isSpecial: false },
    { href: "/vip", label: "VIP", isSpecial: true },
    { href: "/book", label: "Book Now", isSpecial: false },
    { href: "/courses", label: "Courses", isSpecial: false },
    { href: "/about", label: "About", isSpecial: false },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Lash <span className="text-gold">Mama</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative",
                  link.isSpecial 
                    ? "px-4 py-2 rounded-full"
                    : "hover:text-gold",
                  link.isSpecial && isActive(link.href)
                    ? "bg-gradient-to-r from-gold to-gold/90 text-charcoal shadow-gold"
                    : link.isSpecial 
                      ? "bg-gradient-to-r from-gold/20 to-gold/10 text-gold border border-gold/40 hover:from-gold hover:to-gold/90 hover:text-charcoal hover:border-gold hover:shadow-gold"
                      : isActive(link.href)
                        ? "text-gold"
                        : "text-muted-foreground"
                )}
              >
                {link.isSpecial && (
                  <span className="absolute inset-0 rounded-full bg-gold/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
                <span className="relative flex items-center gap-1.5">
                  {link.isSpecial && <Gem className="h-3.5 w-3.5" />}
                  {link.label}
                  {link.isSpecial && <Sparkles className="h-3 w-3" />}
                </span>
                {!link.isSpecial && isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <UserRoleSwitcher 
              currentRole={currentRole} 
              onRoleChange={setCurrentRole} 
            />
            <Button variant="luxury" size="default" asChild>
              <Link to="/book">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <UserRoleSwitcher 
              currentRole={currentRole} 
              onRoleChange={setCurrentRole} 
            />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-medium transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-lg font-medium py-2 transition-colors duration-200",
                link.isSpecial
                  ? "flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 text-gold border border-gold/40 justify-center"
                  : isActive(link.href)
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.isSpecial && <Gem className="h-4 w-4" />}
              {link.label}
              {link.isSpecial && <Sparkles className="h-4 w-4" />}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            <Button variant="luxury" size="lg" className="w-full" asChild>
              <Link to="/book">Book Appointment</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
