import { Link } from "react-router-dom";
import { Calendar, Sparkles, Crown, ShoppingBag, GraduationCap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "book",
    title: "Book Your Appointment",
    icon: Calendar,
    href: "/book",
    accent: false,
  },
  {
    id: "services",
    title: "Our Services",
    icon: Sparkles,
    href: "/services",
    accent: false,
  },
  {
    id: "vip",
    title: "VIP Clients",
    icon: Crown,
    href: "/vip",
    accent: true,
  },
  {
    id: "shop",
    title: "Shop",
    icon: ShoppingBag,
    href: "https://shop.lashmama.com",
    external: true,
    accent: false,
  },
  {
    id: "courses",
    title: "Courses",
    icon: GraduationCap,
    href: "/courses",
    accent: false,
  },
];

const NavigationButtons = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background via-cream/20 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            {navigationItems.map((item, index) => {
              const isVIP = item.id === "vip";
              
              const ButtonContent = (
                <button
                  className={cn(
                    "group relative w-full max-w-md flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isVIP
                      ? "bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal shadow-gold py-5 text-lg"
                      : "bg-gradient-to-r from-beige to-cream border border-gold/30 text-foreground hover:border-gold/60 hover:shadow-medium",
                    `animate-fade-up opacity-0`
                  )}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  {/* VIP Special Effects */}
                  {isVIP && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/0 via-white/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold/40 via-gold/60 to-gold/40 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                    </>
                  )}
                  
                  <item.icon
                    className={cn(
                      "h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110",
                      isVIP ? "text-charcoal" : "text-gold"
                    )}
                  />
                  
                  <span className="relative z-10 font-serif">
                    {item.title}
                  </span>
                  
                  {isVIP && (
                    <div className="relative z-10 ml-1">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-charcoal">
                        <path d="M12 2L2 9L12 22L22 9L12 2Z" />
                      </svg>
                    </div>
                  )}
                  
                  <ChevronRight className={cn(
                    "h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1",
                    isVIP ? "text-charcoal" : "text-gold"
                  )} />
                </button>
              );

              if (item.external) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center"
                  >
                    {ButtonContent}
                  </a>
                );
              }

              return (
                <Link key={item.id} to={item.href} className="w-full flex justify-center">
                  {ButtonContent}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavigationButtons;
