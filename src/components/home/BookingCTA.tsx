import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import volumeLash from "@/assets/volume-lash.jpg";

const BookingCTA = () => {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gold mb-4">
              <Calendar className="h-4 w-4" />
              Book Your Appointment
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-cream mb-6 leading-tight">
              Ready to Transform
              <br />
              Your Look?
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Book your appointment today and experience the Lash Mama difference. 
              New clients receive a complimentary consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="luxury" 
                size="xl" 
                asChild
                className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold"
              >
                <Link to="/book" className="flex items-center gap-2">
                  Book Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="xl" 
                className="text-cream border-cream/20 border hover:bg-cream/10"
                asChild
              >
                <Link to="/services">
                  View Pricing
                </Link>
              </Button>
            </div>

            {/* Deposit Note */}
            <p className="mt-8 text-sm text-cream/50">
              A small deposit is required to secure your booking. 
              Applied to your service total.
            </p>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-medium">
              <img
                src={volumeLash}
                alt="Beautiful volume lashes"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-charcoal/20" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -left-8 top-1/4 bg-cream p-5 rounded-2xl shadow-medium">
              <div className="text-center">
                <div className="font-serif text-3xl font-semibold text-gold">98%</div>
                <div className="text-xs text-muted-foreground mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
