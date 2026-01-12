import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Users,
  Clock,
  CalendarDays,
  UserCog,
  Bell,
  Gem,
  Settings,
  MessageCircle,
  Shield,
  FileText,
  AlertTriangle,
  Heart,
  DollarSign,
  Menu,
  Download,
  Share2,
  User,
  BarChart3,
} from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import AdminCalendar from "@/components/admin/AdminCalendar";
import AdminStaffManagement from "@/components/admin/AdminStaffManagement";
import AdminNotifications from "@/components/admin/AdminNotifications";
import AdminClientDatabase from "@/components/admin/AdminClientDatabase";
import AdminVIPManagement from "@/components/admin/AdminVIPManagement";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminChat from "@/components/admin/AdminChat";
import AdminProfile from "@/components/admin/AdminProfile";
import PersonalAnalytics from "@/components/admin/PersonalAnalytics";
import StaffReferralLink from "@/components/admin/StaffReferralLink";
import beauImg from "@/assets/staff/beau.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const ManagerDashboard = () => {
  const { currentRole } = useUserRole();
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showAftercareModal, setShowAftercareModal] = useState(false);
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const aftercareRef = useRef<HTMLDivElement>(null);
  const allergyRef = useRef<HTMLDivElement>(null);

  const [aftercareNotes, setAftercareNotes] = useState("");
  const [allergyForm, setAllergyForm] = useState({
    hasAllergies: false,
    allergyDetails: "",
    latexAllergy: false,
    adhesiveReaction: false,
    eyeConditions: false,
    eyeConditionDetails: "",
    acknowledge: false,
  });

  const stats = [
    { label: "Today's Bookings", value: "14", icon: Calendar, color: "gold" },
    { label: "Total Clients", value: "458", icon: Users, color: "violet" },
    { label: "Staff on Duty", value: "4", icon: UserCog, color: "sky" },
    { label: "VIP Members", value: "52", icon: Gem, color: "amber" },
  ];

  const recentBookings = [
    { id: 1, client: "Sarah M.", service: "Mega Volume Full Set", time: "9:00 AM", artist: "Nikki", status: "confirmed", amountDue: "$285" },
    { id: 2, client: "Emma L.", service: "Volume Refill", time: "11:30 AM", artist: "Lash Mama", status: "confirmed", amountDue: "$95" },
    { id: 3, client: "Jessica K.", service: "Bridal Lashes", time: "2:00 PM", artist: "Beau", status: "pending", amountDue: "$320" },
    { id: 4, client: "Olivia R.", service: "Natural Full Set", time: "4:30 PM", artist: "Natali", status: "confirmed", amountDue: "$180" },
  ];

  const navigationItems = [
    { id: "overview", label: "Dashboard", icon: CalendarDays, color: "gold" },
    { id: "calendar", label: "Calendar", icon: Calendar, color: "gold" },
    { id: "analytics", label: "My Hours", icon: BarChart3, color: "gold" },
    { id: "referral", label: "My Link", icon: Heart, color: "gold" },
    { id: "staff", label: "Staff", icon: UserCog, color: "gold" },
    { id: "notifications", label: "Alerts", icon: Bell, badge: "3", color: "gold" },
    { id: "clients", label: "Clients", icon: Users, color: "gold" },
    { id: "aftercare", label: "Aftercare", icon: FileText, color: "gold" },
    { id: "allergies", label: "Allergies", icon: AlertTriangle, color: "gold" },
    { id: "vip", label: "VIP", icon: Gem, color: "gold" },
    { id: "chat", label: "Messages", icon: MessageCircle, badge: "2", color: "gold" },
    { id: "profile", label: "Profile", icon: User, color: "gold" },
    { id: "settings", label: "Settings", icon: Settings, color: "gold" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    // Auto-scroll to content section
    setTimeout(() => {
      const contentSection = document.getElementById('dashboard-content');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSaveAftercare = () => {
    toast.success("Aftercare notes saved successfully!");
    setShowAftercareModal(false);
    setAftercareNotes("");
  };

  const handleSaveAllergy = () => {
    if (!allergyForm.acknowledge) {
      toast.error("Client must acknowledge the allergy information");
      return;
    }
    toast.success("Allergy form saved successfully!");
    setShowAllergyModal(false);
    setAllergyForm({
      hasAllergies: false,
      allergyDetails: "",
      latexAllergy: false,
      adhesiveReaction: false,
      eyeConditions: false,
      eyeConditionDetails: "",
      acknowledge: false,
    });
  };

  const handleExportAftercareAsPDF = () => {
    toast.success("Aftercare notes exported as PDF");
    setShowAftercareModal(false);
  };

  const handleShareAftercareAsImage = () => {
    toast.success("Aftercare notes shared as image");
    setShowAftercareModal(false);
  };

  const handleExportAllergyAsPDF = () => {
    toast.success("Allergy form exported as PDF");
    setShowAllergyModal(false);
  };

  const handleShareAllergyAsImage = () => {
    toast.success("Allergy form shared as image");
    setShowAllergyModal(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "calendar":
        return <AdminCalendar />;
      case "analytics":
        return <PersonalAnalytics staffName="Beau" staffImage={beauImg} staffTitle="Senior Lash & Beauty Artist" />;
      case "referral":
        return <StaffReferralLink staffName="Beau" staffId="beau" />;
      case "staff":
        return <AdminStaffManagement />;
      case "notifications":
        return <AdminNotifications />;
      case "clients":
        return <AdminClientDatabase />;
      case "aftercare":
        return renderAftercareSection();
      case "allergies":
        return renderAllergySection();
      case "vip":
        return <AdminVIPManagement />;
      case "chat":
        return <AdminChat />;
      case "profile":
        return <AdminProfile isLashMama={false} />;
      case "settings":
        return <AdminSettings />;
      default:
        return renderOverview();
    }
  };

  const renderAftercareSection = () => (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Aftercare Notes</h2>
          <p className="text-sm text-muted-foreground">Document post-treatment care instructions for clients</p>
        </div>
        <Button variant="luxury" size="sm" className="gap-2" onClick={() => setShowAftercareModal(true)}>
          <FileText className="h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="grid gap-4">
        {recentBookings.map((booking) => (
          <Card key={booking.id} className="p-4 md:p-5 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-medium text-foreground">{booking.client}</h3>
                <p className="text-sm text-muted-foreground">{booking.service} • {booking.time}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => { setSelectedClient(booking.client); setShowAftercareModal(true); }}>
                <Heart className="h-3.5 w-3.5 text-rose-500" />
                Add Aftercare
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAllergySection = () => (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Allergy & Health Forms</h2>
          <p className="text-sm text-muted-foreground">Client allergy and health information</p>
        </div>
        <Button variant="luxury" size="sm" className="gap-2" onClick={() => setShowAllergyModal(true)}>
          <AlertTriangle className="h-4 w-4" />
          New Form
        </Button>
      </div>

      <Card className="p-4 border-0 bg-gradient-to-br from-amber-50 to-amber-100/50">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-1">Important</h3>
            <p className="text-sm text-muted-foreground">All new clients must complete an allergy form before their first appointment.</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {recentBookings.map((booking) => (
          <Card key={booking.id} className="p-4 md:p-5 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-medium text-foreground">{booking.client}</h3>
                <p className="text-sm text-muted-foreground">{booking.service}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => { setSelectedClient(booking.client); setShowAllergyModal(true); }}>
                <FileText className="h-3.5 w-3.5" />
                View/Edit Form
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-3 md:p-5 hover:shadow-gold transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex items-start">
              <div className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center",
                stat.color === "gold" && "bg-gradient-to-br from-gold/20 to-gold/10",
                stat.color === "violet" && "bg-gradient-to-br from-violet-100 to-violet-50",
                stat.color === "sky" && "bg-gradient-to-br from-sky-100 to-sky-50",
                stat.color === "amber" && "bg-gradient-to-br from-amber-100 to-amber-50",
              )}>
                <stat.icon className={cn(
                  "h-5 w-5 md:h-6 md:w-6",
                  stat.color === "gold" && "text-gold",
                  stat.color === "violet" && "text-violet-500",
                  stat.color === "sky" && "text-sky-500",
                  stat.color === "amber" && "text-amber-500",
                )} />
              </div>
            </div>
            <div className="mt-3 md:mt-4">
              <p className="text-xl md:text-3xl font-serif font-bold text-foreground">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 border-0 bg-gradient-to-br from-amber-50 to-amber-100/50">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground text-sm md:text-base">Manager Access</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Full management access. Revenue analytics available to Lash Mama only.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold">Today's Appointments</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Amount due at time of service</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setActiveSection("calendar")}>
            <Calendar className="h-4 w-4" />
            View All
          </Button>
        </div>

        <div className="space-y-2 md:space-y-3">
          {recentBookings.map((booking) => (
            <div 
              key={booking.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 md:p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm md:text-base truncate">{booking.client}</p>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{booking.service}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-6 pl-13 sm:pl-0">
                <div className="text-left sm:text-right">
                  <p className="font-medium text-foreground text-sm md:text-base">{booking.time}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">with {booking.artist}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-gold/20 text-gold flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {booking.amountDue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-28 pb-20 md:pb-24">
        <div className="container mx-auto px-3 md:px-6 max-w-7xl">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90 p-4 md:p-8 lg:p-12 mb-4 md:mb-8">
            <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gold/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-gold" />
                </div>
                <div>
                  <p className="text-cream/70 text-xs md:text-sm">Welcome back</p>
                  <h1 className="font-serif text-xl md:text-3xl font-semibold text-cream">Manager Dashboard</h1>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 md:gap-4">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="bg-cream/10 backdrop-blur rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-4 text-center flex-1 min-w-[100px]">
                    <p className="text-lg md:text-3xl font-serif font-bold text-cream">{stat.value}</p>
                    <p className="text-cream/60 text-[10px] md:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation - Always Expanded */}
          <div className="lg:hidden mb-4">
            <Card className="p-3 border-0 bg-card">
              <nav className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs font-medium transition-all relative",
                      activeSection === item.id
                        ? "bg-gold text-primary-foreground shadow-gold"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="truncate text-center">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center",
                        activeSection === item.id 
                          ? "bg-primary-foreground/30 text-primary-foreground" 
                          : "bg-gold text-primary-foreground"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <Card className="p-4 sticky top-28 border-0 bg-gradient-to-br from-card to-card/80">
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        activeSection === item.id
                          ? "bg-gold text-primary-foreground shadow-gold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          activeSection === item.id 
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-gold/20 text-gold"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div id="dashboard-content" className="flex-1 min-w-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Aftercare Modal - Enhanced with Export Options */}
      <Dialog open={showAftercareModal} onOpenChange={setShowAftercareModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">Aftercare Notes {selectedClient && `- ${selectedClient}`}</DialogTitle>
            <DialogDescription>Document post-treatment care instructions</DialogDescription>
          </DialogHeader>
          
          <div ref={aftercareRef} className="space-y-4 py-4">
            {/* Preview Card */}
            <Card className="p-4 bg-gradient-to-br from-rose-50 to-rose-100/50 border-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-foreground">Lash Mama Beauty</h4>
                  <p className="text-xs text-muted-foreground">Aftercare Instructions</p>
                </div>
              </div>
              
              <Textarea 
                placeholder="Enter aftercare instructions...

Example:
• Avoid water for 24-48 hours
• No oil-based products near eyes
• Brush lashes daily with spoolie
• Sleep on your back
• Avoid rubbing eyes"
                value={aftercareNotes}
                onChange={(e) => setAftercareNotes(e.target.value)}
                rows={6}
                className="resize-none bg-white/50"
              />
            </Card>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="gap-2 flex-1" onClick={handleExportAftercareAsPDF}>
                <Download className="h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm" className="gap-2 flex-1" onClick={handleShareAftercareAsImage}>
                <Share2 className="h-4 w-4" />
                Image
              </Button>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setShowAftercareModal(false)}>Cancel</Button>
              <Button variant="luxury" onClick={handleSaveAftercare}>Save Notes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Allergy Form Modal - Enhanced with Export Options */}
      <Dialog open={showAllergyModal} onOpenChange={setShowAllergyModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">Allergy & Health Form</DialogTitle>
            <DialogDescription>Required before first appointment</DialogDescription>
          </DialogHeader>
          
          <div ref={allergyRef} className="space-y-4 py-4">
            {/* Preview Card */}
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 border-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-foreground">Lash Mama Beauty</h4>
                  <p className="text-xs text-muted-foreground">Client Health Assessment</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id="hasAllergies" 
                    checked={allergyForm.hasAllergies}
                    onCheckedChange={(checked) => setAllergyForm(prev => ({ ...prev, hasAllergies: !!checked }))}
                  />
                  <label htmlFor="hasAllergies" className="text-sm font-medium">I have known allergies</label>
                </div>
                
                {allergyForm.hasAllergies && (
                  <Textarea 
                    placeholder="Please list all known allergies..."
                    value={allergyForm.allergyDetails}
                    onChange={(e) => setAllergyForm(prev => ({ ...prev, allergyDetails: e.target.value }))}
                    rows={2}
                    className="bg-white/50"
                  />
                )}

                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium">Specific Sensitivities:</p>
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id="latex" 
                      checked={allergyForm.latexAllergy}
                      onCheckedChange={(checked) => setAllergyForm(prev => ({ ...prev, latexAllergy: !!checked }))}
                    />
                    <label htmlFor="latex" className="text-sm">Latex allergy</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id="adhesive" 
                      checked={allergyForm.adhesiveReaction}
                      onCheckedChange={(checked) => setAllergyForm(prev => ({ ...prev, adhesiveReaction: !!checked }))}
                    />
                    <label htmlFor="adhesive" className="text-sm">Previous adhesive reactions</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id="eye" 
                      checked={allergyForm.eyeConditions}
                      onCheckedChange={(checked) => setAllergyForm(prev => ({ ...prev, eyeConditions: !!checked }))}
                    />
                    <label htmlFor="eye" className="text-sm">Eye conditions (dry eye, blepharitis)</label>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200/50">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="acknowledge" 
                      checked={allergyForm.acknowledge}
                      onCheckedChange={(checked) => setAllergyForm(prev => ({ ...prev, acknowledge: !!checked }))}
                    />
                    <label htmlFor="acknowledge" className="text-xs text-muted-foreground">
                      I confirm this information is accurate. I understand that withholding allergy information may result in adverse reactions.
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="gap-2 flex-1" onClick={handleExportAllergyAsPDF}>
                <Download className="h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm" className="gap-2 flex-1" onClick={handleShareAllergyAsImage}>
                <Share2 className="h-4 w-4" />
                Image
              </Button>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setShowAllergyModal(false)}>Cancel</Button>
              <Button variant="luxury" onClick={handleSaveAllergy}>Save Form</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerDashboard;
