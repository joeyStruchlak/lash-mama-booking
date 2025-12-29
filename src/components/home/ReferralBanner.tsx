import { Users, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ReferralBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [friendEmail, setFriendEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Referral sent! Your friend will receive an email with your exclusive offer.");
    setIsOpen(false);
    setEmail("");
    setFriendEmail("");
  };

  return (
    <>
      <section className="py-12 bg-gradient-to-r from-gold/10 via-cream to-gold/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center shrink-0">
                <Users className="h-7 w-7 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Share the Beauty, Earn Rewards
                </h3>
                <p className="text-muted-foreground">
                  Give $25 off, get $25 credit when your friend books their first appointment
                </p>
              </div>
            </div>
            
            <Button 
              variant="luxury" 
              size="lg"
              onClick={() => setIsOpen(true)}
              className="shrink-0"
            >
              <Gift className="h-4 w-4 mr-2" />
              Refer a Friend
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Refer a Friend</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gold/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-serif font-semibold text-gold mb-1">$25 OFF</p>
              <p className="text-sm text-muted-foreground">for both you and your friend</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-border focus:border-gold"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="friendEmail">Friend's Email</Label>
                <Input
                  id="friendEmail"
                  type="email"
                  placeholder="friend@email.com"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  required
                  className="border-border focus:border-gold"
                />
              </div>
            </div>

            <Button type="submit" variant="luxury" className="w-full">
              Send Invitation
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Your friend will receive an email with a special booking link. 
              You'll earn your credit after their first appointment.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReferralBanner;
