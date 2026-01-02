import { cn } from "@/lib/utils";
import { ChevronDown, User, Crown, Gem, Shield, Briefcase } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import lashMamaProfileImg from "@/assets/staff/lash-mama-profile.png";
import sarahImg from "@/assets/vip/sarah.jpg";
import oliviaImg from "@/assets/vip/olivia.jpg";
import { UserRole } from "@/contexts/UserRoleContext";

interface UserRoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const userProfiles = {
  guest: {
    name: "Guest",
    image: null,
    icon: User,
    description: "Browse only",
    color: "text-muted-foreground",
    route: "/",
  },
  regular: {
    name: "Emma",
    image: oliviaImg,
    icon: User,
    description: "Regular User",
    color: "text-foreground",
    route: "/vip",
  },
  vip: {
    name: "Sarah",
    image: sarahImg,
    icon: Gem,
    description: "VIP Member",
    color: "text-gold",
    route: "/vip",
  },
  staff: {
    name: "Nikki",
    image: null,
    icon: Briefcase,
    description: "Staff Member",
    color: "text-violet-500",
    route: "/staff",
  },
  manager: {
    name: "Beau",
    image: null,
    icon: Shield,
    description: "Manager",
    color: "text-sky-500",
    route: "/manager",
  },
  admin: {
    name: "Lash Mama",
    image: lashMamaProfileImg,
    icon: Crown,
    description: "Admin",
    color: "text-gold",
    route: "/admin",
  },
};

const UserRoleSwitcher = ({ currentRole, onRoleChange }: UserRoleSwitcherProps) => {
  const navigate = useNavigate();
  const currentProfile = userProfiles[currentRole];

  const handleRoleChange = (role: UserRole) => {
    onRoleChange(role);
    const targetRoute = userProfiles[role].route;
    navigate(targetRoute);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50">
          <div className="relative">
            {/* Rainbow ring for admin */}
            {currentRole === "admin" && (
              <>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold via-amber-300 via-yellow-400 via-amber-500 to-gold animate-spin-slow" 
                     style={{ animationDuration: '4s' }} />
              </>
            )}
            
            {/* VIP glow */}
            {currentRole === "vip" && (
              <div className="absolute -inset-0.5 bg-gold/40 rounded-full blur-sm animate-pulse" />
            )}
            
            {/* Profile image */}
            <div className={cn(
              "relative w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-muted",
              currentRole === "vip" && "ring-2 ring-gold",
              currentRole === "admin" && "ring-2 ring-gold"
            )}>
              {currentProfile.image ? (
                <img 
                  src={currentProfile.image} 
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-muted-foreground" />
              )}
              
              {/* VIP Diamond Badge */}
              {currentRole === "vip" && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-cream to-beige shadow flex items-center justify-center border border-gold/40">
                  <Gem className="w-2.5 h-2.5 text-gold" />
                </div>
              )}
              
              {/* Admin Crown Badge */}
              {currentRole === "admin" && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-cream to-beige shadow flex items-center justify-center border border-gold">
                  <Crown className="w-2.5 h-2.5 text-gold" />
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden sm:block text-left">
            <p className={cn("text-xs font-medium", currentProfile.color)}>
              {currentProfile.name}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {currentProfile.description}
            </p>
          </div>
          
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-muted-foreground">Switch View Mode</p>
        </div>
        <DropdownMenuSeparator />
        
        {(Object.keys(userProfiles) as UserRole[]).map((role) => {
          const profile = userProfiles[role];
          const Icon = profile.icon;
          const isActive = currentRole === role;
          
          return (
            <DropdownMenuItem
              key={role}
              onClick={() => handleRoleChange(role)}
              className={cn(
                "flex items-center gap-3 py-2.5 cursor-pointer",
                isActive && "bg-gold/10"
              )}
            >
              <div className="relative">
                <div className={cn(
                  "w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-muted",
                  role === "vip" && "ring-2 ring-gold",
                  role === "admin" && "ring-2 ring-gold"
                )}>
                  {profile.image ? (
                    <img 
                      src={profile.image} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                
                {/* Badge indicators */}
                {role === "vip" && (
                  <Gem className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-gold" />
                )}
                {role === "admin" && (
                  <Crown className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-gold" />
                )}
              </div>
              
              <div className="flex-1">
                <p className={cn("text-sm font-medium", profile.color)}>
                  {profile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {profile.description}
                </p>
              </div>
              
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-gold" />
              )}
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1.5">
          <p className="text-[10px] text-muted-foreground text-center">
            Demo mode - switch views to preview
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserRoleSwitcher;
