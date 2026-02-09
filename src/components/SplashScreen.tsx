import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

const SplashScreen = ({ onComplete, duration = 3000 }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'fade'>('logo');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('tagline'), 800);
    const timer2 = setTimeout(() => setPhase('fade'), duration - 500);
    const timer3 = setTimeout(() => onComplete(), duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden",
        "bg-gradient-to-b from-cream via-cream to-beige",
        "transition-opacity duration-500",
        phase === 'fade' && "opacity-0 pointer-events-none"
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft golden orbs */}
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--gold-light)) 0%, transparent 70%)',
            animationDuration: '4s',
          }}
        />
        <div 
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)',
            animationDuration: '5s',
            animationDelay: '1s',
          }}
        />
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-15 animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--gold-dark)) 0%, transparent 70%)',
            animationDuration: '6s',
            animationDelay: '0.5s',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/40"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i % 5) * 15}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Logo mark - elegant lash icon */}
        <div 
          className={cn(
            "mb-6 transition-all duration-1000 ease-out",
            phase === 'logo' ? "opacity-100 scale-100" : "opacity-100 scale-100"
          )}
          style={{
            animation: 'scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, hsl(var(--gold) / 0.3) 0%, transparent 70%)',
                transform: 'scale(2)',
                animationDuration: '2s',
              }}
            />
            
            {/* Icon container with shimmer */}
            <div 
              className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--gold-dark)) 0%, hsl(var(--gold)) 50%, hsl(var(--gold-light)) 100%)',
                boxShadow: '0 8px 32px -4px hsl(var(--gold) / 0.4), 0 4px 16px -2px hsl(var(--gold) / 0.3)',
              }}
            >
              {/* Shimmer overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(110deg, transparent 30%, hsl(var(--cream) / 0.4) 50%, transparent 70%)',
                  animation: 'shimmer 2.5s ease-in-out infinite',
                }}
              />
              
              {/* Lash icon - elegant eye with lashes */}
              <svg 
                viewBox="0 0 64 64" 
                className="w-14 h-14 relative z-10"
                fill="none"
              >
                {/* Upper lashes */}
                <path
                  d="M12 32 C12 32, 20 16, 32 16 C44 16, 52 32, 52 32"
                  stroke="hsl(var(--cream))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-draw"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                    animation: 'draw 1.2s ease-out 0.3s forwards',
                  }}
                />
                {/* Individual lashes */}
                {[
                  { x1: 16, y1: 24, x2: 12, y2: 16, delay: 0.5 },
                  { x1: 22, y1: 19, x2: 18, y2: 10, delay: 0.6 },
                  { x1: 28, y1: 17, x2: 26, y2: 7, delay: 0.7 },
                  { x1: 32, y1: 16, x2: 32, y2: 5, delay: 0.8 },
                  { x1: 36, y1: 17, x2: 38, y2: 7, delay: 0.7 },
                  { x1: 42, y1: 19, x2: 46, y2: 10, delay: 0.6 },
                  { x1: 48, y1: 24, x2: 52, y2: 16, delay: 0.5 },
                ].map((lash, i) => (
                  <line
                    key={i}
                    x1={lash.x1}
                    y1={lash.y1}
                    x2={lash.x2}
                    y2={lash.y2}
                    stroke="hsl(var(--cream))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 20,
                      strokeDashoffset: 20,
                      animation: `draw 0.5s ease-out ${lash.delay}s forwards`,
                    }}
                  />
                ))}
                {/* Lower lid */}
                <path
                  d="M16 34 Q32 42, 48 34"
                  stroke="hsl(var(--cream))"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    strokeDasharray: 50,
                    strokeDashoffset: 50,
                    animation: 'draw 0.8s ease-out 0.8s forwards',
                  }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div 
          className="text-center"
          style={{
            animation: 'fadeSlideUp 0.8s ease-out 0.4s both',
          }}
        >
          <h1 
            className="font-serif text-5xl md:text-6xl tracking-tight text-charcoal mb-2"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--charcoal)) 0%, hsl(var(--gold-dark)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Lash Mama
          </h1>
          
          {/* Decorative line */}
          <div 
            className="mx-auto h-px w-0 bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{
              animation: 'expandWidth 0.8s ease-out 0.8s forwards',
            }}
          />
        </div>

        {/* Tagline */}
        <p 
          className={cn(
            "mt-6 text-sm tracking-[0.3em] uppercase text-charcoal-light font-sans font-light",
            "transition-all duration-700",
            phase !== 'logo' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          Luxury Lash Artistry
        </p>

        {/* Loading indicator */}
        <div 
          className="mt-12"
          style={{
            animation: 'fadeIn 0.5s ease-out 1.2s both',
          }}
        >
          <div className="flex space-x-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gold/60"
                style={{
                  animation: 'bounce 1.4s ease-in-out infinite',
                  animationDelay: `${i * 0.16}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, hsl(var(--gold) / 0.05) 0%, transparent 100%)',
        }}
      />

      {/* Keyframe styles */}
      <style>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 120px; }
        }
        
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
            opacity: 0.8;
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
