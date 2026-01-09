import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, Sparkles } from "lucide-react";

interface FirstTimeClientNoticeProps {
  isFirstTime: boolean;
  onToggle: (value: boolean) => void;
}

const FirstTimeClientNotice = ({ isFirstTime, onToggle }: FirstTimeClientNoticeProps) => {
  return (
    <Card className="p-6 mb-8 border-gold/30 bg-gradient-to-r from-gold/5 to-cream/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              First Time at Lash Mama?
            </h3>
            <p className="text-sm text-muted-foreground">
              Toggle on if this is your first visit with us
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggle(!isFirstTime)}
          className={cn(
            "relative w-14 h-8 rounded-full transition-colors duration-300 shadow-inner",
            isFirstTime ? "bg-gold" : "bg-muted border border-border"
          )}
        >
          <div
            className={cn(
              "absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out",
              isFirstTime && "translate-x-6"
            )}
          />
        </button>
      </div>

      {isFirstTime && (
        <div className="mt-6 pt-6 border-t border-gold/20">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gold/10">
            <AlertCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Important Notice for First-Time Clients
              </p>
              <p className="text-sm text-muted-foreground">
                We cannot refill foreign lashes applied elsewhere. As a first-time client, 
                you can only book <span className="font-medium text-gold">Full Sets</span> or{" "}
                <span className="font-medium text-gold">Lash Removals</span>. 
                Once you've had your first service with us, refills will become available.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FirstTimeClientNotice;
