import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Gem,
  Calendar,
  Clock,
  ChevronRight,
  Star,
  Phone,
  Mail,
  User,
  Edit,
  MessageCircle,
} from "lucide-react";

const AdminClientDatabase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "vip" | "regular">("all");

  const clients = [
    { 
      id: 1, 
      name: "Sarah Mitchell", 
      email: "sarah@email.com", 
      phone: "0412 345 678",
      isVIP: true, 
      totalBookings: 24,
      lastVisit: "Jan 10, 2024",
      totalSpent: "$4,280",
      nextAppointment: "Jan 15, 2024",
      favoriteService: "Mega Volume Full Set",
      notes: "Prefers morning appointments. Allergic to certain adhesives.",
      streak: 12
    },
    { 
      id: 2, 
      name: "Emma Louise", 
      email: "emma@email.com", 
      phone: "0423 456 789",
      isVIP: true, 
      totalBookings: 18,
      lastVisit: "Jan 8, 2024",
      totalSpent: "$3,120",
      nextAppointment: "Jan 18, 2024",
      favoriteService: "Volume Refill",
      notes: "Very punctual. Refers many friends.",
      streak: 10
    },
    { 
      id: 3, 
      name: "Jessica Kim", 
      email: "jessica@email.com", 
      phone: "0434 567 890",
      isVIP: false, 
      totalBookings: 8,
      lastVisit: "Dec 28, 2023",
      totalSpent: "$1,560",
      nextAppointment: "Jan 20, 2024",
      favoriteService: "Natural Full Set",
      notes: "First time bridal client.",
      streak: 8
    },
    { 
      id: 4, 
      name: "Olivia Rose", 
      email: "olivia@email.com", 
      phone: "0445 678 901",
      isVIP: true, 
      totalBookings: 15,
      lastVisit: "Jan 5, 2024",
      totalSpent: "$2,840",
      nextAppointment: null,
      favoriteService: "Volume Full Set",
      notes: "",
      streak: 10
    },
    { 
      id: 5, 
      name: "Mia Chen", 
      email: "mia@email.com", 
      phone: "0456 789 012",
      isVIP: false, 
      totalBookings: 5,
      lastVisit: "Jan 3, 2024",
      totalSpent: "$920",
      nextAppointment: "Jan 22, 2024",
      favoriteService: "Natural Hybrid",
      notes: "Student discount applied.",
      streak: 5
    },
    { 
      id: 6, 
      name: "Sophie Taylor", 
      email: "sophie@email.com", 
      phone: "0467 890 123",
      isVIP: false, 
      totalBookings: 3,
      lastVisit: "Dec 15, 2023",
      totalSpent: "$540",
      nextAppointment: null,
      favoriteService: "Classic Full Set",
      notes: "",
      streak: 3
    },
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "vip" && client.isVIP) ||
                         (filter === "regular" && !client.isVIP);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: clients.length,
    vip: clients.filter(c => c.isVIP).length,
    activeThisMonth: 4,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Client Database</h2>
          <p className="text-muted-foreground">
            {stats.total} total clients • {stats.vip} VIP members
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="luxury" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {[
            { id: "all", label: "All Clients" },
            { id: "vip", label: "VIP Only" },
            { id: "regular", label: "Regular" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                filter === f.id
                  ? "bg-gold text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-3">
        {filteredClients.map((client) => (
          <Card 
            key={client.id}
            className={cn(
              "p-5 border-0 bg-gradient-to-br from-card to-card/80 cursor-pointer transition-all duration-300 hover:shadow-gold",
              selectedClient === client.id && "ring-2 ring-gold shadow-gold"
            )}
            onClick={() => setSelectedClient(selectedClient === client.id ? null : client.id)}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className={cn(
                  "w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center",
                  client.isVIP && "ring-2 ring-gold"
                )}>
                  <span className="font-serif text-xl font-semibold text-gold">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {client.isVIP && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-gold to-amber-400 flex items-center justify-center">
                    <Gem className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{client.name}</h3>
                  {client.isVIP && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/20 text-gold">
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{client.email}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-gold" />
                    {client.totalBookings} bookings
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Last: {client.lastVisit}
                  </span>
                  {client.nextAppointment && (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <Calendar className="h-3.5 w-3.5" />
                      Next: {client.nextAppointment}
                    </span>
                  )}
                </div>
              </div>

              {/* Total Spent */}
              <div className="text-right">
                <p className="text-xl font-serif font-bold text-gold">{client.totalSpent}</p>
                <p className="text-xs text-muted-foreground">Total spent</p>
              </div>

              <ChevronRight className={cn(
                "h-5 w-5 text-muted-foreground transition-transform",
                selectedClient === client.id && "rotate-90"
              )} />
            </div>

            {/* Expanded Details */}
            {selectedClient === client.id && (
              <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <User className="h-4 w-4 text-gold" />
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {client.email}
                      </p>
                      <p className="text-sm flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {client.phone}
                      </p>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-gold" />
                      Preferences
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Favorite Service:</span> {client.favoriteService}
                    </p>
                    {client.isVIP && (
                      <p className="text-sm text-gold">
                        <span className="font-medium">VIP Streak:</span> {client.streak} consecutive bookings
                      </p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {client.notes && (
                  <div className="mt-4 p-4 rounded-xl bg-muted/50">
                    <h4 className="font-medium text-foreground mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{client.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  <Button size="sm" variant="luxury" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminClientDatabase;
