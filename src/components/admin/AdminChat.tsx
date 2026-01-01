import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Sparkles,
  Heart,
  Gem,
  Crown,
} from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "admin";
  text: string;
  time: string;
  read: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  isVIP: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

// Beauty-themed read indicator - a sparkly lash icon
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

const AdminChat = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar: "SM",
      isVIP: true,
      lastMessage: "Thank you so much! Can't wait for my appointment 💕",
      lastTime: "2 min ago",
      unread: 2,
      messages: [
        { id: 1, sender: "user", text: "Hi! I wanted to ask about the Mega Volume lash set", time: "10:30 AM", read: true },
        { id: 2, sender: "admin", text: "Hi Sarah! Of course, I'd be happy to help. The Mega Volume set is our most dramatic look - it's perfect for a full, glamorous style 💫", time: "10:32 AM", read: true },
        { id: 3, sender: "user", text: "That sounds perfect! How long does the appointment usually take?", time: "10:35 AM", read: true },
        { id: 4, sender: "admin", text: "The full set takes about 2.5-3 hours for the best results. We want to make sure every lash is perfect for you! ✨", time: "10:36 AM", read: true },
        { id: 5, sender: "user", text: "Amazing! I'll book one for next week", time: "10:40 AM", read: true },
        { id: 6, sender: "user", text: "Thank you so much! Can't wait for my appointment 💕", time: "10:41 AM", read: true },
      ]
    },
    {
      id: 2,
      name: "Emma Louise",
      avatar: "EL",
      isVIP: true,
      lastMessage: "Is it possible to reschedule to Thursday?",
      lastTime: "15 min ago",
      unread: 1,
      messages: [
        { id: 1, sender: "user", text: "Hi, I need to change my appointment", time: "11:00 AM", read: true },
        { id: 2, sender: "user", text: "Is it possible to reschedule to Thursday?", time: "11:01 AM", read: false },
      ]
    },
    {
      id: 3,
      name: "Jessica Kim",
      avatar: "JK",
      isVIP: false,
      lastMessage: "What's included in the bridal package?",
      lastTime: "1 hour ago",
      unread: 0,
      messages: [
        { id: 1, sender: "user", text: "Hello! I'm getting married in March", time: "9:00 AM", read: true },
        { id: 2, sender: "admin", text: "Congratulations! 🎊 That's so exciting! How can I help with your bridal beauty look?", time: "9:05 AM", read: true },
        { id: 3, sender: "user", text: "What's included in the bridal package?", time: "9:10 AM", read: true },
      ]
    },
    {
      id: 4,
      name: "Olivia Rose",
      avatar: "OR",
      isVIP: true,
      lastMessage: "See you tomorrow! 💖",
      lastTime: "3 hours ago",
      unread: 0,
      messages: [
        { id: 1, sender: "admin", text: "Hi Olivia! Just a reminder about your appointment tomorrow at 2pm 💕", time: "8:00 AM", read: true },
        { id: 2, sender: "user", text: "See you tomorrow! 💖", time: "8:30 AM", read: true },
      ]
    },
    {
      id: 5,
      name: "Nikki (Staff)",
      avatar: "NK",
      isVIP: false,
      lastMessage: "I can cover Saturday morning shifts",
      lastTime: "Yesterday",
      unread: 0,
      messages: [
        { id: 1, sender: "user", text: "Hey! About the schedule for next week", time: "Yesterday", read: true },
        { id: 2, sender: "user", text: "I can cover Saturday morning shifts", time: "Yesterday", read: true },
      ]
    },
  ]);

  const selectedChat = conversations.find(c => c.id === selectedConversation);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            {
              id: conv.messages.length + 1,
              sender: "admin" as const,
              text: newMessage,
              time: new Date().toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" }),
              read: false
            }
          ],
          lastMessage: newMessage,
          lastTime: "Just now"
        };
      }
      return conv;
    }));
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">Messages</h2>
          <p className="text-muted-foreground">{totalUnread} unread conversations</p>
        </div>
      </div>

      <Card className="border-0 bg-gradient-to-br from-card to-card/80 overflow-hidden">
        <div className="flex h-[600px]">
          {/* Conversations List */}
          <div className="w-80 border-r border-border flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={cn(
                    "w-full p-4 flex items-start gap-3 text-left transition-colors border-b border-border/50",
                    selectedConversation === conv.id
                      ? "bg-gold/10"
                      : "hover:bg-muted/50"
                  )}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className={cn(
                      "w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center",
                      conv.isVIP && "ring-2 ring-gold"
                    )}>
                      <span className="font-serif font-semibold text-gold">{conv.avatar}</span>
                    </div>
                    {conv.isVIP && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-gold to-amber-400 flex items-center justify-center">
                        <Gem className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        "font-medium truncate",
                        conv.unread > 0 && "text-foreground font-semibold"
                      )}>
                        {conv.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{conv.lastTime}</span>
                    </div>
                    <p className={cn(
                      "text-sm truncate",
                      conv.unread > 0 ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {conv.lastMessage}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-gold text-primary-foreground text-xs flex items-center justify-center font-medium">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={cn(
                      "w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center",
                      selectedChat.isVIP && "ring-2 ring-gold"
                    )}>
                      <span className="font-serif font-semibold text-gold text-sm">{selectedChat.avatar}</span>
                    </div>
                    {selectedChat.isVIP && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-gold to-amber-400 flex items-center justify-center">
                        <Gem className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{selectedChat.name}</h3>
                      {selectedChat.isVIP && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gold/20 text-gold">VIP</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "admin" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2.5",
                      message.sender === "admin"
                        ? "bg-gradient-to-br from-gold to-gold/90 text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    )}>
                      <p className="text-sm">{message.text}</p>
                      <div className={cn(
                        "flex items-center gap-2 mt-1",
                        message.sender === "admin" ? "justify-end" : "justify-start"
                      )}>
                        <span className={cn(
                          "text-xs",
                          message.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {message.time}
                        </span>
                        {message.sender === "admin" && (
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
                    placeholder="Type a message..."
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
                  Lash Mama will see all messages
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminChat;
