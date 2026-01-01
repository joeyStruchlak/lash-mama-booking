import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Settings,
  Building,
  Clock,
  Bell,
  Palette,
  Shield,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  RefreshCw,
} from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("business");

  const tabs = [
    { id: "business", label: "Business Info", icon: Building },
    { id: "hours", label: "Working Hours", icon: Clock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  const workingHours = [
    { day: "Monday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Tuesday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Wednesday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Thursday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Friday", open: "9:00 AM", close: "6:00 PM", isOpen: true },
    { day: "Saturday", open: "9:00 AM", close: "4:00 PM", isOpen: true },
    { day: "Sunday", open: "", close: "", isOpen: false },
  ];

  const [hours, setHours] = useState(workingHours);

  const renderTabContent = () => {
    switch (activeTab) {
      case "business":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
              <Input defaultValue="Lash Mama" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email
                </label>
                <Input defaultValue="hello@lashmama.com.au" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Phone
                </label>
                <Input defaultValue="0400 000 000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Address
              </label>
              <Input defaultValue="123 Beauty Lane, Sydney NSW 2000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Globe className="h-4 w-4 inline mr-2" />
                Website
              </label>
              <Input defaultValue="www.lashmama.com.au" />
            </div>
            <Button variant="luxury" className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        );

      case "hours":
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Set your business operating hours for each day of the week.
            </p>
            {hours.map((day, index) => (
              <div 
                key={day.day}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <Switch
                    checked={day.isOpen}
                    onCheckedChange={(checked) => {
                      const newHours = [...hours];
                      newHours[index].isOpen = checked;
                      setHours(newHours);
                    }}
                  />
                  <span className={cn(
                    "font-medium w-24",
                    !day.isOpen && "text-muted-foreground"
                  )}>
                    {day.day}
                  </span>
                </div>
                
                {day.isOpen ? (
                  <div className="flex items-center gap-2">
                    <Input 
                      className="w-28 text-center" 
                      defaultValue={day.open}
                      disabled={!day.isOpen}
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input 
                      className="w-28 text-center" 
                      defaultValue={day.close}
                      disabled={!day.isOpen}
                    />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Closed</span>
                )}
              </div>
            ))}
            <Button variant="luxury" className="gap-2 mt-4">
              <Save className="h-4 w-4" />
              Save Hours
            </Button>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            {[
              { label: "New Booking Notifications", description: "Get notified when someone books an appointment", enabled: true },
              { label: "Reschedule Requests", description: "Get notified when a client requests to reschedule", enabled: true },
              { label: "Cancellation Alerts", description: "Get notified when a booking is cancelled", enabled: true },
              { label: "New VIP Members", description: "Get notified when a client becomes VIP", enabled: true },
              { label: "Daily Summary", description: "Receive a daily summary of bookings and revenue", enabled: false },
              { label: "Weekly Reports", description: "Receive weekly analytics reports", enabled: true },
              { label: "New Messages", description: "Get notified of new chat messages", enabled: true },
            ].map((setting) => (
              <div 
                key={setting.label}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
              >
                <div>
                  <p className="font-medium text-foreground">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">Brand Color</label>
              <div className="flex gap-3">
                {["#C9A55C", "#E8D5B0", "#2B2B2B", "#8B7355", "#D4AF37"].map((color) => (
                  <button
                    key={color}
                    className={cn(
                      "w-12 h-12 rounded-xl border-2 transition-all",
                      color === "#C9A55C" ? "border-foreground scale-110" : "border-transparent"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">Theme Mode</label>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">Light</Button>
                <Button variant="default" className="flex-1">Dark</Button>
                <Button variant="outline" className="flex-1">Auto</Button>
              </div>
            </div>

            <Button variant="luxury" className="gap-2">
              <Save className="h-4 w-4" />
              Save Appearance
            </Button>
          </div>
        );

      case "security":
        return (
          <div className="space-y-4">
            <Card className="p-4 border-0 bg-muted/50">
              <h4 className="font-medium text-foreground mb-2">Change Password</h4>
              <div className="space-y-3">
                <Input type="password" placeholder="Current Password" />
                <Input type="password" placeholder="New Password" />
                <Input type="password" placeholder="Confirm New Password" />
                <Button variant="outline" size="sm">Update Password</Button>
              </div>
            </Card>

            <Card className="p-4 border-0 bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
            </Card>

            <Card className="p-4 border-0 bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Login Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified of new sign-ins</p>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>
          </div>
        );

      case "payments":
        return (
          <div className="space-y-4">
            <Card className="p-4 border-0 bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Stripe Integration</h4>
                    <p className="text-sm text-muted-foreground">Connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </Card>

            <Card className="p-4 border-0 bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <span className="font-bold text-emerald-600">A</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Afterpay</h4>
                    <p className="text-sm text-muted-foreground">Enabled</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </Card>

            <Card className="p-4 border-0 bg-muted/50">
              <h4 className="font-medium text-foreground mb-3">Deposit Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Require deposit for bookings</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Deposit amount:</span>
                  <Input className="w-24" defaultValue="$50" />
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-semibold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your app configuration</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <Card className="hidden md:block w-64 shrink-0 p-4 border-0 bg-gradient-to-br from-card to-card/80 h-fit sticky top-28">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-gold text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Mobile Tabs */}
        <div className="md:hidden w-full mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeTab === tab.id
                    ? "bg-gold text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <Card className="flex-1 p-6 border-0 bg-gradient-to-br from-card to-card/80">
          {renderTabContent()}
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
