import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Bell,
  Clock,
  Calendar,
  Send,
  CheckCircle2,
  User,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface RefillClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastRefillDate: string;
  serviceType: string;
  daysSinceRefill: number;
  reminderSent: boolean;
}

const RefillReminders = () => {
  const [clients, setClients] = useState<RefillClient[]>([
    { id: "1", name: "Sarah Mitchell", email: "sarah@email.com", phone: "0400111222", lastRefillDate: "2024-01-05", serviceType: "Mega Volume Refills", daysSinceRefill: 11, reminderSent: false },
    { id: "2", name: "Emma Wilson", email: "emma@email.com", phone: "0400222333", lastRefillDate: "2024-01-04", serviceType: "Volume Refills", daysSinceRefill: 12, reminderSent: true },
    { id: "3", name: "Jessica Brown", email: "jessica@email.com", phone: "0400333444", lastRefillDate: "2024-01-06", serviceType: "Natural/Hybrid Refills", daysSinceRefill: 10, reminderSent: false },
    { id: "4", name: "Olivia Davis", email: "olivia@email.com", phone: "0400444555", lastRefillDate: "2024-01-03", serviceType: "Volume Refills", daysSinceRefill: 13, reminderSent: false },
  ]);

  // Filter clients who need reminders (1.5 weeks = 10-11 days)
  const clientsNeedingReminder = clients.filter(c => c.daysSinceRefill >= 10 && !c.reminderSent);
  const clientsReminded = clients.filter(c => c.reminderSent);

  const handleSendReminder = (clientId: string) => {
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, reminderSent: true } : c
    ));
    toast.success("Reminder sent successfully");
  };

  const handleSendAllReminders = () => {
    setClients(prev => prev.map(c => 
      c.daysSinceRefill >= 10 ? { ...c, reminderSent: true } : c
    ));
    toast.success(`Sent ${clientsNeedingReminder.length} reminders`);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Refill Reminders</h2>
          <p className="text-sm text-muted-foreground">Notify refill clients when their lashes are due (1.5 weeks)</p>
        </div>
        {clientsNeedingReminder.length > 0 && (
          <Button variant="luxury" size="sm" className="gap-2" onClick={handleSendAllReminders}>
            <Send className="h-4 w-4" />
            Send All ({clientsNeedingReminder.length})
          </Button>
        )}
      </div>

      {/* Info Card */}
      <Card className="p-4 border-0 bg-gradient-to-br from-gold/10 to-gold/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Automatic Refill Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Clients who receive refill services are automatically tracked. When 1.5 weeks (10-11 days) have passed since their last refill, 
              they'll appear here for a reminder. This does not apply to full sets or mini refills.
            </p>
          </div>
        </div>
      </Card>

      {/* Clients Needing Reminder */}
      {clientsNeedingReminder.length > 0 && (
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-500" />
            Needs Reminder ({clientsNeedingReminder.length})
          </h3>
          <div className="grid gap-3">
            {clientsNeedingReminder.map((client) => (
              <Card key={client.id} className="p-4 border-0 bg-gradient-to-br from-amber-50 to-amber-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm md:text-base">{client.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{client.serviceType}</p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Last: {new Date(client.lastRefillDate).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {client.daysSinceRefill} days ago
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="luxury" size="sm" className="gap-2" onClick={() => handleSendReminder(client.id)}>
                    <Send className="h-4 w-4" />
                    Send Reminder
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Already Reminded */}
      {clientsReminded.length > 0 && (
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Reminded ({clientsReminded.length})
          </h3>
          <div className="grid gap-3">
            {clientsReminded.map((client) => (
              <Card key={client.id} className="p-4 border-0 bg-gradient-to-br from-emerald-50 to-emerald-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm md:text-base">{client.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{client.serviceType}</p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Last: {new Date(client.lastRefillDate).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                          Reminder Sent
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {clientsNeedingReminder.length === 0 && clientsReminded.length === 0 && (
        <Card className="p-8 border-0 bg-gradient-to-br from-card to-card/80 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No refill clients need reminders at this time</p>
        </Card>
      )}
    </div>
  );
};

export default RefillReminders;