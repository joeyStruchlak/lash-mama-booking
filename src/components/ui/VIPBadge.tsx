import { cn } from "@/lib/utils";

interface VIPBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VIPBadge = ({ size = "md", className }: VIPBadgeProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const containerClasses = {
    sm: "p-0.5",
    md: "p-0.5",
    lg: "p-1",
  };

  return (
    <div
      className={cn(
        "absolute -bottom-0.5 -right-0.5 rounded-full bg-gradient-to-br from-cream via-cream to-beige shadow-md",
        containerClasses[size],
        className
      )}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gold/40 rounded-full blur-sm animate-pulse" />
        
        {/* Diamond icon */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            sizeClasses[size],
            "relative drop-shadow-sm"
          )}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Diamond shape with gradient fill */}
          <defs>
            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(37, 42%, 52%)" />
              <stop offset="50%" stopColor="hsl(37, 42%, 72%)" />
              <stop offset="100%" stopColor="hsl(37, 42%, 62%)" />
            </linearGradient>
            <linearGradient id="diamondShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(37, 42%, 82%)" />
              <stop offset="50%" stopColor="hsl(37, 42%, 92%)" />
              <stop offset="100%" stopColor="hsl(37, 42%, 72%)" />
            </linearGradient>
          </defs>
          
          {/* Diamond body */}
          <path
            d="M12 2L2 9L12 22L22 9L12 2Z"
            fill="url(#diamondGradient)"
            stroke="hsl(37, 42%, 52%)"
            strokeWidth="0.5"
          />
          
          {/* Diamond top facet */}
          <path
            d="M12 2L7 9H17L12 2Z"
            fill="url(#diamondShine)"
            opacity="0.8"
          />
          
          {/* Diamond shine line */}
          <path
            d="M2 9H22"
            stroke="hsl(37, 42%, 82%)"
            strokeWidth="0.5"
            opacity="0.6"
          />
          
          {/* Center sparkle */}
          <circle
            cx="12"
            cy="11"
            r="1"
            fill="white"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  );
};

export default VIPBadge;
