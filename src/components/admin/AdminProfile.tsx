import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  User,
  Camera,
  Mail,
  Phone,
  MapPin,
  Save,
  Crown,
  Award,
  Star,
  Calendar,
  Sparkles,
  Instagram,
  Globe,
  Shield,
  Bell,
  Palette,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

interface AdminProfileProps {
  isLashMama?: boolean;
}

const AdminProfile = ({ isLashMama = true }: AdminProfileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    name: isLashMama ? "Lash Mama" : "Staff Member",
    title: isLashMama ? "Owner & Master Lash Artist" : "Lash Artist",
    email: "hello@lashmama.com.au",
    phone: "0400 000 000",
    bio: isLashMama 
      ? "Passionate about lash artistry with over 10 years of experience. I love creating stunning looks that make every client feel beautiful and confident."
      : "Dedicated lash artist committed to creating beautiful, natural-looking lash extensions.",
    instagram: "@lashmama_official",
    website: "www.lashmama.com.au",
    location: "Sydney, NSW",
    avatar: null as string | null,
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    autoConfirmBookings: false,
    showOnTeamPage: true,
  });

  const stats = isLashMama ? [
    { label: "Years Experience", value: "10+", icon: Calendar },
    { label: "Happy Clients", value: "5000+", icon: Heart },
    { label: "VIP Members", value: "52", icon: Crown },
    { label: "Awards Won", value: "12", icon: Award },
  ] : [
    { label: "Appointments", value: "856", icon: Calendar },
    { label: "Clients", value: "234", icon: User },
    { label: "Rating", value: "4.9", icon: Star },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
        toast.success("Profile picture updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast.success("Profile saved successfully");
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Profile Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <div className={cn(
                "w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center overflow-hidden",
                profile.avatar ? "" : "bg-gradient-to-br from-gold/20 to-gold/10"
              )}>
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-10 w-10 md:h-14 md:w-14 text-gold" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-2xl bg-charcoal/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-6 w-6 text-cream" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change Photo
            </Button>
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Display Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title</label>
                <Input
                  value={profile.title}
                  onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone
                </label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Bio</label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  Instagram
                </label>
                <Input
                  value={profile.instagram}
                  onChange={(e) => setProfile(prev => ({ ...prev, instagram: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  Website
                </label>
                <Input
                  value={profile.website}
                  onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Location
                </label>
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats for Lash Mama */}
      {isLashMama && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Years Experience", value: "10+", icon: Calendar, color: "gold" },
            { label: "Happy Clients", value: "5000+", icon: Sparkles, color: "rose" },
            { label: "VIP Members", value: "52", icon: Crown, color: "amber" },
            { label: "Awards Won", value: "12", icon: Award, color: "violet" },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 border-0 bg-gradient-to-br from-card to-card/80 text-center">
              <div className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-2",
                stat.color === "gold" && "bg-gradient-to-br from-gold/20 to-gold/10",
                stat.color === "rose" && "bg-gradient-to-br from-rose-100 to-rose-50",
                stat.color === "amber" && "bg-gradient-to-br from-amber-100 to-amber-50",
                stat.color === "violet" && "bg-gradient-to-br from-violet-100 to-violet-50",
              )}>
                <stat.icon className={cn(
                  "h-5 w-5 md:h-6 md:w-6",
                  stat.color === "gold" && "text-gold",
                  stat.color === "rose" && "text-rose-500",
                  stat.color === "amber" && "text-amber-500",
                  stat.color === "violet" && "text-violet-500",
                )} />
              </div>
              <p className="text-xl md:text-2xl font-serif font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Lash Mama Exclusive Features */}
      {isLashMama && (
        <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-gold/10 to-gold/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
              <Crown className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-foreground">Owner Features</h3>
              <p className="text-sm text-muted-foreground">Exclusive to Lash Mama account</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Business Analytics Access", icon: Star },
              { label: "Revenue Reports", icon: Award },
              { label: "Staff Management", icon: Shield },
              { label: "VIP Program Control", icon: Crown },
            ].map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 text-sm text-foreground">
                <feature.icon className="h-4 w-4 text-gold" />
                {feature.label}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Preferences */}
      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Preferences</h3>
        <div className="space-y-4">
          {[
            { id: "emailNotifications", label: "Email Notifications", description: "Receive email notifications for bookings", icon: Mail },
            { id: "pushNotifications", label: "Push Notifications", description: "Get push notifications in the app", icon: Bell },
            { id: "showOnTeamPage", label: "Show on Team Page", description: "Display your profile on the public team page", icon: User },
            ...(isLashMama ? [{ id: "autoConfirmBookings", label: "Auto-confirm Bookings", description: "Automatically confirm new booking requests", icon: Calendar }] : []),
          ].map((pref) => (
            <div key={pref.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center">
                  <pref.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{pref.label}</p>
                  <p className="text-xs text-muted-foreground">{pref.description}</p>
                </div>
              </div>
              <Switch
                checked={preferences[pref.id as keyof typeof preferences]}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, [pref.id]: checked }))}
              />
            </div>
          ))}
        </div>
      </Card>

      <Button variant="luxury" className="w-full gap-2" onClick={handleSave}>
        <Save className="h-4 w-4" />
        Save Changes
      </Button>
    </div>
  );
};

export default AdminProfile;