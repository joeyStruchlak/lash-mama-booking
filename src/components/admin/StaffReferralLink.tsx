import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link2, Copy, Share2, Users, DollarSign, Check, ExternalLink } from "lucide-react";

interface StaffReferralLinkProps {
  staffName: string;
  staffId: string;
}

const StaffReferralLink = ({ staffName, staffId }: StaffReferralLinkProps) => {
  const [copied, setCopied] = useState(false);
  
  // Generate referral link based on staff ID
  const referralLink = `${window.location.origin}/book?ref=${staffId}`;
  
  // Sample referral stats - would come from backend in production
  const referralStats = {
    totalReferrals: 12,
    thisMonth: 3,
    totalEarnings: 180,
    pendingBonus: 30,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Book with ${staffName} at Lash Mama`,
          text: `Book your lash appointment with ${staffName} at Lash Mama Beauty Studio!`,
          url: referralLink,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Referral Link Card */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/10">
            <Link2 className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">Your Referral Link</h3>
            <p className="text-sm text-muted-foreground">
              Share this link with friends & family. Earn <span className="text-gold font-semibold">10% bonus</span> on each booked client!
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            value={referralLink}
            readOnly
            className="flex-1 bg-muted/50 border-border text-sm"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className={cn(
              "shrink-0 transition-all duration-200",
              copied && "bg-gold text-primary-foreground border-gold"
            )}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button
            variant="luxury"
            size="icon"
            onClick={handleShare}
            className="shrink-0"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-gold/10 flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-gold shrink-0" />
          <p className="text-sm text-foreground">
            You earn <span className="font-semibold text-gold">10%</span> of the service price for every new client who books using your link!
          </p>
        </div>
      </Card>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-3 md:p-5 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-gold transition-all duration-300">
          <div className="flex items-start">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/10">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-gold" />
            </div>
          </div>
          <div className="mt-3 md:mt-4">
            <p className="text-xl md:text-3xl font-serif font-bold text-foreground">{referralStats.totalReferrals}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">Total Referrals</p>
          </div>
        </Card>

        <Card className="p-3 md:p-5 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-gold transition-all duration-300">
          <div className="flex items-start">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/10">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-gold" />
            </div>
          </div>
          <div className="mt-3 md:mt-4">
            <p className="text-xl md:text-3xl font-serif font-bold text-foreground">{referralStats.thisMonth}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">This Month</p>
          </div>
        </Card>

        <Card className="p-3 md:p-5 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-gold transition-all duration-300">
          <div className="flex items-start">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/10">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-gold" />
            </div>
          </div>
          <div className="mt-3 md:mt-4">
            <p className="text-xl md:text-3xl font-serif font-bold text-foreground">${referralStats.totalEarnings}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">Total Earnings</p>
          </div>
        </Card>

        <Card className="p-3 md:p-5 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-gold transition-all duration-300">
          <div className="flex items-start">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/10">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-gold" />
            </div>
          </div>
          <div className="mt-3 md:mt-4">
            <p className="text-xl md:text-3xl font-serif font-bold text-gold">${referralStats.pendingBonus}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">Pending Bonus</p>
          </div>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <h3 className="font-serif text-base md:text-lg font-semibold mb-4">Recent Referrals</h3>
        <div className="space-y-3">
          {[
            { name: "Sophie M.", service: "Volume Full Set", date: "Jan 8", bonus: "$22", status: "completed" },
            { name: "Rachel K.", service: "Natural Full Set", date: "Jan 5", bonus: "$18", status: "completed" },
            { name: "Amy T.", service: "Mega Volume Full Set", date: "Jan 2", bonus: "$28", status: "pending" },
          ].map((referral, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-medium">
                  {referral.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{referral.name}</p>
                  <p className="text-xs text-muted-foreground">{referral.service} • {referral.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-sm font-semibold",
                  referral.status === "completed" ? "text-gold" : "text-muted-foreground"
                )}>
                  {referral.bonus}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{referral.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StaffReferralLink;
