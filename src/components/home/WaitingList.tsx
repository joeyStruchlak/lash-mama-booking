import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaitingListProps {
  className?: string;
}

const WaitingList = ({ className }: WaitingListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredService: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", preferredService: "", notes: "" });
    }, 2000);
  };

  return (
    <>
      <section className={cn("py-20 bg-gradient-to-b from-cream/50 to-background", className)}>
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-gold/10 via-cream to-background border-gold/20 shadow-luxury">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <Clock className="h-10 w-10 text-gold" />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="text-sm font-medium uppercase tracking-widest text-gold">
                    Exclusive Access
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  Waiting List with Purni
                </h2>
                <p className="text-muted-foreground mb-2">
                  Get on the exclusive waiting list for appointments with <span className="font-semibold text-foreground">Purni</span>, 
                  our CEO and Founder of Lash Mama. Limited availability for our most discerning clients.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  "Where luxury meets artistry" — Purni, Lash Mama CEO
                </p>
              </div>

              {/* CTA */}
              <Button
                variant="luxury"
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="shrink-0"
              >
                Join Waiting List
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <Card className="relative w-full max-w-md p-8 animate-scale-in bg-background shadow-luxury">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-beige transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  You're on the List!
                </h3>
                <p className="text-muted-foreground">
                  We'll contact you when a spot becomes available.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    Join Purni's Waiting List
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Be the first to know when appointments become available
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg bg-beige border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-foreground"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg bg-beige border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-foreground"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg bg-beige border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-foreground"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Preferred Service
                    </label>
                    <select
                      value={formData.preferredService}
                      onChange={(e) => setFormData({ ...formData, preferredService: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg bg-beige border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-foreground"
                    >
                      <option value="">Select a service</option>
                      <option value="mega-volume">Mega Volume Set</option>
                      <option value="volume">Volume Set</option>
                      <option value="bridal">Bridal Package</option>
                      <option value="other">Other / Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-beige border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-foreground resize-none"
                      rows={3}
                      placeholder="Any special requests or notes..."
                    />
                  </div>

                  <Button variant="luxury" size="lg" className="w-full mt-6">
                    Join Waiting List
                  </Button>
                </form>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default WaitingList;
