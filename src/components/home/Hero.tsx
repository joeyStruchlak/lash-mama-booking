import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-salon.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury beauty salon interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="animate-fade-up opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/80 backdrop-blur-sm border border-border mb-8">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-charcoal">Luxury Lash Experience</span>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-up opacity-0 stagger-1 font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 text-charcoal">
            Where Beauty
            <br />
            <span className="text-gradient-gold">Meets Elegance</span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-up opacity-0 stagger-2 text-lg md:text-xl text-charcoal-light max-w-lg mb-10 leading-relaxed">
            Lash extensions, bridal styling, makeup artistry & professional beauty courses. 
            Where luxury meets artistry in every detail.
          </p>

          {/* Trust Indicators */}
          <div className="animate-fade-up opacity-0 stagger-4 mt-16 flex items-center gap-8">
            <div className="text-center">
              <div className="font-serif text-3xl font-semibold text-gradient-gold">500+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            <div className="text-center">
              <div className="font-serif text-3xl font-semibold text-gradient-gold">5.0</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Star Rating</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            <div className="text-center">
              <div className="font-serif text-3xl font-semibold text-gradient-gold">8+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-gold/40 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
