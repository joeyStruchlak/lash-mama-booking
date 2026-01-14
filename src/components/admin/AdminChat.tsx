import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Sparkles,
  Heart,
  Gem,
  Crown,
  ChevronLeft,
  ImageIcon,
  Mic,
  Smile,
  Star,
  Clock,
  Check,
  CheckCheck,
  X,
  Pin,
  Archive,
  Bell,
  BellOff,
  Video,
} from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "admin";
  text: string;
  time: string;
  read: boolean;
  reaction?: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  avatarImage?: string;
  isVIP: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  isOnline?: boolean;
  lastSeen?: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

// Premium animated read indicator with lash sparkle effect
const ReadIndicator = ({ read, sending }: { read: boolean; sending?: boolean }) => {
  if (sending) {
    return (
      <Clock className="h-3 w-3 text-primary-foreground/50 animate-pulse" />
    );
  }
  
  return (
    <div className={cn(
      "flex items-center transition-all duration-500",
      read ? "text-primary-foreground" : "text-primary-foreground/50"
    )}>
      {read ? (
        <div className="relative">
          <CheckCheck className="h-3.5 w-3.5" />
          <Sparkles className="absolute -top-1 -right-1 h-2 w-2 animate-ping opacity-75" />
        </div>
      ) : (
        <Check className="h-3 w-3" />
      )}
    </div>
  );
};

// Typing indicator with beauty-themed animation
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <div className="flex items-center gap-1.5 bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gold/60 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.6s" }}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground ml-2">typing...</span>
    </div>
  </div>
);

// Online status ring with pulse animation
const OnlineStatus = ({ isOnline, size = "md" }: { isOnline?: boolean; size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "w-2.5 h-2.5 border",
    md: "w-3 h-3 border-2",
    lg: "w-4 h-4 border-2",
  };
  
  if (!isOnline) return null;
  
  return (
    <div className="absolute bottom-0 right-0">
      <div className={cn(
        "rounded-full bg-emerald-500 border-card",
        sizes[size]
      )}>
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
      </div>
    </div>
  );
};

// VIP Crown badge
const VIPBadge = ({ className }: { className?: string }) => (
  <div className={cn(
    "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 via-gold to-amber-500 flex items-center justify-center shadow-lg ring-2 ring-card",
    className
  )}>
    <Crown className="h-2.5 w-2.5 text-white" />
  </div>
);

// Message reactions popup
const ReactionPicker = ({ onSelect, onClose }: { onSelect: (emoji: string) => void; onClose: () => void }) => (
  <div className="absolute bottom-full mb-2 left-0 bg-card rounded-2xl shadow-xl border border-border p-2 flex gap-1 animate-scale-in z-50">
    {["❤️", "😍", "💅", "✨", "👏", "🙏"].map((emoji) => (
      <button
        key={emoji}
        onClick={() => onSelect(emoji)}
        className="w-10 h-10 rounded-xl hover:bg-muted transition-colors flex items-center justify-center text-xl hover:scale-125 active:scale-95 transition-transform"
      >
        {emoji}
      </button>
    ))}
    <button
      onClick={onClose}
      className="w-10 h-10 rounded-xl hover:bg-muted transition-colors flex items-center justify-center"
    >
      <X className="h-4 w-4 text-muted-foreground" />
    </button>
  </div>
);

// Quick reply suggestions
const QuickReplies = ({ onSelect }: { onSelect: (text: string) => void }) => {
  const suggestions = [
    "Thanks, see you soon! 💕",
    "I'll check and get back to you",
    "Absolutely! Let me book that for you",
    "Your appointment is confirmed ✨",
  ];
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
      {suggestions.map((text, i) => (
        <button
          key={i}
          onClick={() => onSelect(text)}
          className="shrink-0 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-medium hover:bg-gold/20 transition-colors whitespace-nowrap border border-gold/20"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

// Avatar component with image support
const Avatar = ({ 
  name, 
  initials, 
  image, 
  isVIP, 
  isOnline, 
  size = "md",
  showVIPBadge = true 
}: { 
  name: string;
  initials: string; 
  image?: string; 
  isVIP: boolean; 
  isOnline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showVIPBadge?: boolean;
}) => {
  const sizes = {
    sm: "w-10 h-10 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };
  
  return (
    <div className="relative">
      <div className={cn(
        "rounded-full flex items-center justify-center overflow-hidden",
        sizes[size],
        isVIP 
          ? "ring-2 ring-gold ring-offset-2 ring-offset-card" 
          : "ring-1 ring-border"
      )}>
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/30 via-gold/20 to-gold/10 flex items-center justify-center">
            <span className="font-serif font-semibold text-gold">{initials}</span>
          </div>
        )}
      </div>
      {showVIPBadge && isVIP && <VIPBadge />}
      <OnlineStatus isOnline={isOnline} size={size === "sm" ? "sm" : "md"} />
    </div>
  );
};

// Conversation list item - premium design
const ConversationItem = ({ 
  conversation, 
  isSelected, 
  onClick 
}: { 
  conversation: Conversation; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full p-4 flex items-center gap-3 text-left transition-all duration-300 relative group",
      isSelected
        ? "bg-gradient-to-r from-gold/15 via-gold/10 to-transparent"
        : "hover:bg-muted/50 active:bg-muted"
    )}
  >
    {/* Selection indicator */}
    <div className={cn(
      "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-gold transition-all duration-300",
      isSelected ? "h-12 opacity-100" : "h-0 opacity-0"
    )} />
    
    {/* Pinned indicator */}
    {conversation.isPinned && (
      <Pin className="absolute top-2 right-2 h-3 w-3 text-gold/60" />
    )}
    
    <Avatar
      name={conversation.name}
      initials={conversation.avatar}
      isVIP={conversation.isVIP}
      isOnline={conversation.isOnline}
      size="md"
    />
    
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-medium truncate text-sm",
            conversation.unread > 0 ? "text-foreground font-semibold" : "text-foreground"
          )}>
            {conversation.name}
          </span>
          {conversation.isVIP && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gradient-to-r from-amber-400 to-gold text-white uppercase tracking-wide">
              VIP
            </span>
          )}
          {conversation.isMuted && (
            <BellOff className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
        <span className={cn(
          "text-[10px] ml-2 shrink-0",
          conversation.unread > 0 ? "text-gold font-medium" : "text-muted-foreground"
        )}>
          {conversation.lastTime}
        </span>
      </div>
      <p className={cn(
        "text-xs truncate",
        conversation.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
      )}>
        {conversation.lastMessage}
      </p>
    </div>
    
    {/* Unread Badge - Premium */}
    {conversation.unread > 0 && (
      <div className="shrink-0">
        <span className="min-w-[22px] h-[22px] rounded-full bg-gradient-to-br from-gold via-amber-500 to-gold text-white text-[11px] font-bold flex items-center justify-center px-1.5 shadow-lg shadow-gold/30">
          {conversation.unread}
        </span>
      </div>
    )}
  </button>
);

// Message bubble - premium design
const MessageBubble = ({ 
  message, 
  isAdmin,
  showAvatar = false,
  onReaction,
}: { 
  message: Message; 
  isAdmin: boolean;
  showAvatar?: boolean;
  onReaction?: (messageId: number, emoji: string) => void;
}) => {
  const [showReactions, setShowReactions] = useState(false);
  
  return (
    <div className={cn(
      "flex gap-2 group relative",
      isAdmin ? "justify-end pl-12" : "justify-start pr-12"
    )}>
      {/* Reaction picker */}
      {showReactions && (
        <ReactionPicker 
          onSelect={(emoji) => {
            onReaction?.(message.id, emoji);
            setShowReactions(false);
          }}
          onClose={() => setShowReactions(false)}
        />
      )}
      
      <div 
        className={cn(
          "relative max-w-[85%] md:max-w-[70%] group cursor-pointer",
        )}
        onDoubleClick={() => setShowReactions(true)}
      >
        {/* Message content */}
        <div className={cn(
          "rounded-2xl px-4 py-3 shadow-sm transition-all duration-200",
          isAdmin
            ? "bg-gradient-to-br from-gold via-gold to-amber-500 text-white rounded-br-md shadow-gold/20"
            : "bg-card border border-border rounded-bl-md shadow-sm"
        )}>
          <p className={cn(
            "text-[15px] leading-relaxed",
            isAdmin ? "text-white" : "text-foreground"
          )}>
            {message.text}
          </p>
          
          <div className={cn(
            "flex items-center gap-2 mt-1.5",
            isAdmin ? "justify-end" : "justify-start"
          )}>
            <span className={cn(
              "text-[10px]",
              isAdmin ? "text-white/70" : "text-muted-foreground"
            )}>
              {message.time}
            </span>
            {isAdmin && <ReadIndicator read={message.read} />}
          </div>
        </div>
        
        {/* Reaction display */}
        {message.reaction && (
          <div className={cn(
            "absolute -bottom-2 bg-card rounded-full px-1.5 py-0.5 shadow-md border border-border text-sm",
            isAdmin ? "right-2" : "left-2"
          )}>
            {message.reaction}
          </div>
        )}
        
        {/* Long press hint (mobile) */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          double-tap to react
        </div>
      </div>
    </div>
  );
};

// Empty state - premium design
const EmptyState = () => (
  <div className="flex-1 flex items-center justify-center p-8">
    <div className="text-center max-w-sm">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 animate-pulse" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold/10 to-transparent flex items-center justify-center">
          <Sparkles className="h-10 w-10 text-gold" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
          <Heart className="h-4 w-4 text-gold" />
        </div>
      </div>
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
        Your Messages
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Select a conversation to start messaging with your beautiful clients ✨
      </p>
    </div>
  </div>
);

// Chat header - premium design
const ChatHeader = ({ 
  conversation, 
  onBack,
  onCall,
  onVideo,
  onMore,
}: { 
  conversation: Conversation;
  onBack: () => void;
  onCall?: () => void;
  onVideo?: () => void;
  onMore?: () => void;
}) => (
  <div className="bg-gradient-to-r from-card via-card to-card/95 border-b border-border px-3 py-3 flex items-center justify-between backdrop-blur-sm sticky top-0 z-10">
    <div className="flex items-center gap-3">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 md:hidden rounded-full hover:bg-muted"
        onClick={onBack}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Avatar
        name={conversation.name}
        initials={conversation.avatar}
        isVIP={conversation.isVIP}
        isOnline={conversation.isOnline}
        size="md"
        showVIPBadge={false}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground text-base truncate">
            {conversation.name}
          </h3>
          {conversation.isVIP && (
            <div className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400/20 to-gold/20 border border-gold/30">
              <Crown className="h-3 w-3 text-gold" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-wide">VIP</span>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          {conversation.isOnline ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-emerald-600">Online now</span>
            </>
          ) : (
            <span>Last seen {conversation.lastSeen || "recently"}</span>
          )}
        </p>
      </div>
    </div>
    
    <div className="flex items-center gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-full hover:bg-gold/10 hover:text-gold transition-colors"
        onClick={onCall}
      >
        <Phone className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-full hover:bg-gold/10 hover:text-gold transition-colors hidden sm:flex"
        onClick={onVideo}
      >
        <Video className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-full hover:bg-muted"
        onClick={onMore}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

// Message input - premium design
const MessageInput = ({ 
  value, 
  onChange, 
  onSend,
  onQuickReply,
  showQuickReplies = true,
}: { 
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onQuickReply: (text: string) => void;
  showQuickReplies?: boolean;
}) => (
  <div className="border-t border-border bg-gradient-to-t from-card via-card to-card/95 backdrop-blur-sm">
    {/* Quick replies */}
    {showQuickReplies && (
      <div className="px-3 pt-3">
        <QuickReplies onSelect={onQuickReply} />
      </div>
    )}
    
    {/* Input area */}
    <div className="p-3 pt-2">
      <div className="flex items-end gap-2">
        {/* Attachment buttons */}
        <div className="flex items-center gap-1 pb-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full hover:bg-gold/10 hover:text-gold shrink-0"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Text input */}
        <div className="flex-1 relative">
          <Input
            placeholder="Type a beautiful message..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
            className="pr-12 py-6 rounded-2xl bg-muted/50 border-0 focus-visible:ring-gold/50 text-[15px] placeholder:text-muted-foreground/60"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-transparent"
          >
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
        
        {/* Send / Voice button */}
        <Button 
          variant="luxury" 
          size="icon"
          onClick={onSend}
          disabled={!value.trim()}
          className={cn(
            "h-11 w-11 rounded-full shrink-0 transition-all duration-300 shadow-lg",
            value.trim() 
              ? "bg-gradient-to-br from-gold via-amber-500 to-gold shadow-gold/30 hover:shadow-gold/50 hover:scale-105" 
              : "bg-muted text-muted-foreground shadow-none hover:bg-muted"
          )}
        >
          {value.trim() ? (
            <Send className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Hint */}
      <p className="text-[10px] text-muted-foreground mt-2 text-center flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3 text-gold" />
        <span>Messages with love from Lash Mama</span>
        <Heart className="h-3 w-3 text-rose-400" />
      </p>
    </div>
  </div>
);

const AdminChat = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar: "SM",
      isVIP: true,
      isPinned: true,
      isOnline: true,
      lastMessage: "Thank you so much! Can't wait for my appointment 💕",
      lastTime: "2 min",
      unread: 2,
      messages: [
        { id: 1, sender: "user", text: "Hi! I wanted to ask about the Mega Volume lash set", time: "10:30 AM", read: true },
        { id: 2, sender: "admin", text: "Hi Sarah! Of course, I'd be happy to help. The Mega Volume set is our most dramatic look - it's perfect for a full, glamorous style ✨", time: "10:32 AM", read: true },
        { id: 3, sender: "user", text: "That sounds perfect! How long does the appointment usually take?", time: "10:35 AM", read: true },
        { id: 4, sender: "admin", text: "The full set takes about 2.5-3 hours for the best results. We want to make sure every lash is perfect for you!", time: "10:36 AM", read: true },
        { id: 5, sender: "user", text: "Amazing! I'll book one for next week", time: "10:40 AM", read: true },
        { id: 6, sender: "user", text: "Thank you so much! Can't wait for my appointment 💕", time: "10:41 AM", read: true },
      ]
    },
    {
      id: 2,
      name: "Emma Louise",
      avatar: "EL",
      isVIP: true,
      isOnline: true,
      lastSeen: "just now",
      lastMessage: "Is it possible to reschedule to Thursday?",
      lastTime: "15 min",
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
      isOnline: false,
      lastSeen: "2h ago",
      lastMessage: "What's included in the bridal package?",
      lastTime: "1 hour",
      unread: 0,
      messages: [
        { id: 1, sender: "user", text: "Hello! I'm getting married in March 💍", time: "9:00 AM", read: true },
        { id: 2, sender: "admin", text: "Congratulations! That's so exciting! How can I help with your bridal beauty look?", time: "9:05 AM", read: true },
        { id: 3, sender: "user", text: "What's included in the bridal package?", time: "9:10 AM", read: true },
      ]
    },
    {
      id: 4,
      name: "Olivia Rose",
      avatar: "OR",
      isVIP: true,
      isOnline: false,
      lastSeen: "3h ago",
      lastMessage: "See you tomorrow! 🌸",
      lastTime: "3 hours",
      unread: 0,
      messages: [
        { id: 1, sender: "admin", text: "Hi Olivia! Just a reminder about your appointment tomorrow at 2pm", time: "8:00 AM", read: true },
        { id: 2, sender: "user", text: "See you tomorrow! 🌸", time: "8:30 AM", read: true },
      ]
    },
    {
      id: 5,
      name: "Nikki (Staff)",
      avatar: "NK",
      isVIP: false,
      isMuted: true,
      isOnline: true,
      lastMessage: "I can cover Saturday morning shifts",
      lastTime: "Yesterday",
      unread: 0,
      messages: [
        { id: 1, sender: "user", text: "Hey! About the schedule for next week", time: "Yesterday", read: true },
        { id: 2, sender: "user", text: "I can cover Saturday morning shifts", time: "Yesterday", read: true },
      ]
    },
    {
      id: 6,
      name: "Mia Chen",
      avatar: "MC",
      isVIP: false,
      isOnline: false,
      lastSeen: "1 day ago",
      lastMessage: "Thank you for the recommendation!",
      lastTime: "2 days",
      unread: 0,
      messages: [
        { id: 1, sender: "user", text: "Hi! What lash style would you recommend for hooded eyes?", time: "Monday", read: true },
        { id: 2, sender: "admin", text: "Great question! For hooded eyes, I'd recommend our Cat Eye or Doll Eye styles - they really help open up the eye area ✨", time: "Monday", read: true },
        { id: 3, sender: "user", text: "Thank you for the recommendation!", time: "Monday", read: true },
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
    setShowQuickReplies(false);
  };

  const handleQuickReply = (text: string) => {
    setNewMessage(text);
  };

  const handleReaction = (messageId: number, emoji: string) => {
    if (!selectedConversation) return;
    
    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: conv.messages.map(msg => 
            msg.id === messageId ? { ...msg, reaction: emoji } : msg
          )
        };
      }
      return conv;
    }));
  };

  // Sort conversations: pinned first, then by unread, then by time
  const sortedConversations = [...conversations]
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (a.unread > 0 && b.unread === 0) return -1;
      if (a.unread === 0 && b.unread > 0) return 1;
      return 0;
    });

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="animate-fade-in h-[calc(100vh-180px)] md:h-[calc(100vh-220px)] flex flex-col">
      {/* Premium Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground flex items-center gap-2">
            Messages
            {totalUnread > 0 && (
              <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-gradient-to-br from-gold to-amber-500 text-white text-xs font-bold shadow-lg shadow-gold/30">
                {totalUnread}
              </span>
            )}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Connect with your beautiful clients ✨
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex rounded-2xl overflow-hidden border border-border bg-card shadow-xl shadow-black/5">
        {/* Conversations List */}
        <div className={cn(
          "border-r border-border flex flex-col bg-gradient-to-b from-card to-muted/20 transition-all duration-300",
          selectedConversation ? "hidden md:flex w-80 lg:w-96" : "w-full md:w-80 lg:w-96"
        )}>
          {/* Search Header */}
          <div className="p-4 border-b border-border bg-card/80 backdrop-blur-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl bg-muted/50 border-0 focus-visible:ring-gold/50"
              />
            </div>
            
            {/* Filter pills */}
            <div className="flex gap-2 mt-3">
              {["All", "Unread", "VIP"].map((filter) => (
                <button
                  key={filter}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    filter === "All" 
                      ? "bg-gold text-white shadow-sm" 
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/50">
            {sortedConversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isSelected={selectedConversation === conv.id}
                onClick={() => {
                  setSelectedConversation(conv.id);
                  setShowQuickReplies(true);
                }}
              />
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col bg-gradient-to-b from-background via-background to-muted/10">
            <ChatHeader
              conversation={selectedChat}
              onBack={() => setSelectedConversation(null)}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Date separator */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[11px] text-muted-foreground font-medium px-3 py-1 bg-muted/50 rounded-full">
                  Today
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              
              {selectedChat.messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isAdmin={message.sender === "admin"}
                  onReaction={handleReaction}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <MessageInput
              value={newMessage}
              onChange={setNewMessage}
              onSend={handleSend}
              onQuickReply={handleQuickReply}
              showQuickReplies={showQuickReplies}
            />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default AdminChat;
