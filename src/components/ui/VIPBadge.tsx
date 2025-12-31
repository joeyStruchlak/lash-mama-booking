import { cn } from "@/lib/utils";

interface VIPBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VIPBadge = ({ size = "md", className }: VIPBadgeProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  const containerClasses = {
    sm: "p-0.5 -bottom-1 -right-1",
    md: "p-0.5 -bottom-1 -right-1",
    lg: "p-1 -bottom-1 -right-1",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full bg-gradient-to-br from-cream via-cream to-beige shadow-lg border border-gold/30",
        containerClasses[size],
        className
      )}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gold/50 rounded-full blur-sm animate-pulse" />
        
        {/* Diamond icon */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            sizeClasses[size],
            "relative drop-shadow-md"
          )}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Diamond shape with gradient fill */}
          <defs>
            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(37, 55%, 55%)" />
              <stop offset="30%" stopColor="hsl(37, 60%, 70%)" />
              <stop offset="50%" stopColor="hsl(45, 80%, 75%)" />
              <stop offset="70%" stopColor="hsl(37, 60%, 70%)" />
              <stop offset="100%" stopColor="hsl(37, 55%, 55%)" />
            </linearGradient>
            <linearGradient id="diamondShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(45, 100%, 90%)" />
              <stop offset="50%" stopColor="hsl(45, 100%, 95%)" />
              <stop offset="100%" stopColor="hsl(45, 80%, 85%)" />
            </linearGradient>
            <filter id="diamondGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            </filter>
          </defs>
          
          {/* Outer glow */}
          <path
            d="M12 2L2 9L12 22L22 9L12 2Z"
            fill="hsl(37, 60%, 65%)"
            filter="url(#diamondGlow)"
            opacity="0.5"
          />
          
          {/* Diamond body */}
          <path
            d="M12 3L3 9L12 21L21 9L12 3Z"
            fill="url(#diamondGradient)"
            stroke="hsl(37, 50%, 50%)"
            strokeWidth="0.8"
          />
          
          {/* Diamond top facet */}
          <path
            d="M12 3L7 9H17L12 3Z"
            fill="url(#diamondShine)"
            opacity="0.9"
          />
          
          {/* Left facet highlight */}
          <path
            d="M3 9L7 9L12 21L3 9Z"
            fill="hsl(37, 45%, 60%)"
            opacity="0.7"
          />
          
          {/* Right facet */}
          <path
            d="M21 9L17 9L12 21L21 9Z"
            fill="hsl(37, 55%, 55%)"
            opacity="0.6"
          />
          
          {/* Diamond shine line */}
          <path
            d="M3 9H21"
            stroke="hsl(45, 80%, 85%)"
            strokeWidth="0.6"
            opacity="0.8"
          />
          
          {/* Center sparkle */}
          <circle
            cx="12"
            cy="10"
            r="1.5"
            fill="white"
            opacity="0.9"
          />
          
          {/* Small sparkles */}
          <circle
            cx="8"
            cy="8"
            r="0.5"
            fill="white"
            opacity="0.7"
          />
          <circle
            cx="15"
            cy="9"
            r="0.4"
            fill="white"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
};

export default VIPBadge;
