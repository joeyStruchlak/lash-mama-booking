import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Send,
  Sparkles,
  Heart,
  Crown,
} from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "lashmama";
  text: string;
  time: string;
  read: boolean;
}

// Beauty-themed read indicator
const ReadIndicator = ({ read }: { read: boolean }) => (
  <div className={cn(
    "flex items-center gap-0.5 transition-all duration-300",
    read ? "text-gold" : "text-muted-foreground/50"
  )}>
    <Sparkles className={cn(
      "h-3 w-3 transition-all duration-300",
      read && "animate-pulse"
    )} />
    <Sparkles className={cn(
      "h-3 w-3 transition-all duration-300",
      read && "animate-pulse"
    )} style={{ animationDelay: "0.1s" }} />
  </div>
);

const StaffChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "lashmama", text: "Good morning! How's your schedule looking today? 💕", time: "9:00 AM", read: true },
    { id: 2, sender: "user", text: "Hi! I have 4 appointments today, all confirmed", time: "9:05 AM", read: true },
    { id: 3, sender: "lashmama", text: "Perfect! Let me know if you need anything ✨", time: "9:06 AM", read: true },
    { id: 4, sender: "user", text: "Actually, I wanted to ask about next Saturday. I can cover the morning shifts if needed", time: "9:30 AM", read: true },
    { id: 5, sender: "lashmama", text: "That would be amazing! I'll update the schedule. Thank you so much 🙏", time: "9:35 AM", read: true },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: newMessage,
        time: new Date().toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" }),
        read: false
      }
    ]);
    setNewMessage("");
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-card to-card/80 overflow-hidden">
      <div className="flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center ring-2 ring-gold">
              <Crown className="h-6 w-6 text-gold" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
              Lash Mama
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/20 text-gold">Admin</span>
            </h3>
            <p className="text-xs text-emerald-600">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "lashmama" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center mr-2 ring-1 ring-gold/50">
                  <Crown className="h-4 w-4 text-gold" />
                </div>
              )}
              <div className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2.5",
                message.sender === "user"
                  ? "bg-gradient-to-br from-gold to-gold/90 text-primary-foreground rounded-br-sm"
                  : "bg-muted rounded-bl-sm"
              )}>
                <p className="text-sm">{message.text}</p>
                <div className={cn(
                  "flex items-center gap-2 mt-1",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}>
                  <span className={cn(
                    "text-xs",
                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {message.time}
                  </span>
                  {message.sender === "user" && (
                    <ReadIndicator read={message.read} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Message Lash Mama..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button 
              variant="luxury" 
              size="icon"
              onClick={handleSend}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Heart className="h-3 w-3 text-rose-400" />
            Messages go directly to Lash Mama
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StaffChat;
