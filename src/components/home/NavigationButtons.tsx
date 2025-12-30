import { Link } from "react-router-dom";
import { Calendar, Sparkles, Crown, ShoppingBag, GraduationCap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "book",
    title: "Book Your Appointment",
    description: "Schedule your luxury lash experience",
    icon: Calendar,
    href: "/book",
    accent: false,
  },
  {
    id: "services",
    title: "Our Services",
    description: "Explore our curated lash & beauty menu",
    icon: Sparkles,
    href: "/services",
    accent: false,
  },
  {
    id: "vip",
    title: "VIP Clients",
    description: "Exclusive rewards for our inner circle",
    icon: Crown,
    href: "/vip",
    accent: true,
  },
  {
    id: "shop",
    title: "Shop",
    description: "Premium beauty products & accessories",
    icon: ShoppingBag,
    href: "https://shop.lashmama.com",
    external: true,
    accent: false,
  },
  {
    id: "courses",
    title: "Courses",
    description: "Learn the art of beauty mastery",
    icon: GraduationCap,
    href: "/courses",
    accent: false,
  },
];

const NavigationButtons = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-cream/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium uppercase tracking-widest text-gold mb-4 block">
              Explore
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Your Beauty Journey Awaits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {navigationItems.map((item, index) => {
              const isVIP = item.id === "vip";
              const ButtonContent = (
                <div
                  className={cn(
                    "group relative p-6 rounded-2xl border transition-all duration-500",
                    "hover:-translate-y-2 hover:shadow-gold",
                    isVIP
                      ? "bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal border-gold/40 col-span-1 sm:col-span-2 lg:col-span-1"
                      : "bg-card/80 backdrop-blur-sm border-border/60 hover:border-gold/40",
                    `animate-fade-up opacity-0 stagger-${index + 1}`
                  )}
                >
                  {/* VIP Special Glow Effect */}
                  {isVIP && (
                    <>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/20 via-transparent to-gold/10 opacity-60" />
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gold/50 via-gold/20 to-gold/50 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                      <div className="absolute top-2 right-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gold/40 rounded-full blur-md animate-pulse" />
                          <div className="relative px-2.5 py-1 bg-gradient-to-r from-gold to-gold-light rounded-full">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal">
                              Exclusive
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="relative z-10">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110",
                        isVIP
                          ? "bg-gradient-to-br from-gold/30 to-gold/10"
                          : "bg-gold/10 group-hover:bg-gold/20"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-6 w-6",
                          isVIP ? "text-gold" : "text-gold"
                        )}
                      />
                    </div>

                    <h3
                      className={cn(
                        "font-serif text-xl font-semibold mb-2 flex items-center gap-2",
                        isVIP ? "text-cream" : "text-foreground"
                      )}
                    >
                      {item.title}
                      {isVIP && (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-gold fill-current"
                        >
                          <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                        </svg>
                      )}
                    </h3>

                    <p
                      className={cn(
                        "text-sm mb-4",
                        isVIP ? "text-cream/70" : "text-muted-foreground"
                      )}
                    >
                      {item.description}
                    </p>

                    <div
                      className={cn(
                        "inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2",
                        isVIP ? "text-gold" : "text-gold"
                      )}
                    >
                      Explore
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );

              if (item.external) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ButtonContent}
                  </a>
                );
              }

              return (
                <Link key={item.id} to={item.href}>
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
