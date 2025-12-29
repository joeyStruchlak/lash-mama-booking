import { Info } from "lucide-react";

interface AfterpayBadgeProps {
  amount: number;
  variant?: "light" | "dark";
  className?: string;
}

const AfterpayBadge = ({ amount, variant = "light", className = "" }: AfterpayBadgeProps) => {
  const installment = (amount / 4).toFixed(2);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-lg border
        ${variant === "light" 
          ? "bg-beige/50 border-border text-foreground" 
          : "bg-charcoal/10 border-charcoal/20 text-charcoal"
        }
      `}>
        <svg 
          viewBox="0 0 100 24" 
          className="h-4 w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Afterpay Logo - Simplified */}
          <text 
            x="0" 
            y="18" 
            className={`text-xs font-bold ${variant === "light" ? "fill-charcoal" : "fill-charcoal"}`}
            style={{ fontFamily: "system-ui" }}
          >
            afterpay
          </text>
        </svg>
        <span className={`text-xs ${variant === "light" ? "text-muted-foreground" : "text-charcoal/70"}`}>
          available
        </span>
      </div>
      
      <div className="group relative">
        <Info className={`h-4 w-4 cursor-help ${variant === "light" ? "text-muted-foreground" : "text-charcoal/60"}`} />
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-charcoal text-cream text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-50">
          <p className="font-medium mb-1">Pay in 4 interest-free payments</p>
          <p className="text-cream/70">
            4 payments of <span className="text-gold font-medium">${installment}</span> every 2 weeks
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-charcoal rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default AfterpayBadge;
