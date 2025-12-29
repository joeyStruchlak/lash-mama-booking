import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Gift, Trophy, ChevronRight } from "lucide-react";

const VIPPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold/10 to-gold/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-gold/8 to-gold/3 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6">
                <Crown className="h-4 w-4" />
                VIP Membership
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-cream mb-4">
                Join the Inner Circle
              </h2>
              <p className="text-cream/70 text-lg mb-8 max-w-lg">
                Our VIP members enjoy exclusive perks, loyalty rewards, and a premium beauty experience 
                designed for those who appreciate the finer things.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 lg:mb-0">
                <Button variant="luxury" size="lg" asChild>
                  <Link to="/vip">
                    Explore VIP Benefits
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md">
              {[
                { 
                  icon: Sparkles, 
                  title: "Earn Points", 
                  desc: "Every visit earns loyalty points" 
                },
                { 
                  icon: Trophy, 
                  title: "Tier Rewards", 
                  desc: "Unlock exclusive perks" 
                },
                { 
                  icon: Gift, 
                  title: "Birthday Treats", 
                  desc: "Special gifts on your day" 
                },
                { 
                  icon: Crown, 
                  title: "VIP Access", 
                  desc: "Priority booking & events" 
                },
              ].map((feature) => (
                <div 
                  key={feature.title}
                  className="bg-cream/5 backdrop-blur-sm rounded-2xl p-5 border border-cream/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center mb-3">
                    <feature.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-medium text-cream mb-1">{feature.title}</h3>
                  <p className="text-cream/60 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-12 border-t border-gradient-to-r from-transparent via-gold/20 to-transparent grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">500+</p>
              <p className="text-cream/60 text-sm">VIP Members</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">$15K+</p>
              <p className="text-cream/60 text-sm">Rewards Given</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">20%</p>
              <p className="text-cream/60 text-sm">Max Discount</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VIPPreview;
