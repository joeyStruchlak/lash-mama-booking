import { useState } from "react";
import { PenLine, Bell, Plus, Trash2, Check, X, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  text: string;
  reminderDate?: string;
  reminderTime?: string;
  createdAt: string;
  completed: boolean;
}

const reminderOptions = [
  { value: "15", label: "15 mins before" },
  { value: "30", label: "30 mins before" },
  { value: "60", label: "1 hour before" },
  { value: "180", label: "3 hours before" },
  { value: "240", label: "4 hours before" },
  { value: "1440", label: "1 day before" },
];

const mockNotes: Note[] = [
  {
    id: "1",
    text: "Ask about new volume lash styles",
    reminderDate: "2024-01-15",
    reminderTime: "240",
    createdAt: "2024-01-05",
    completed: false,
  },
  {
    id: "2",
    text: "Try the hybrid lash look next time",
    createdAt: "2024-01-02",
    completed: false,
  },
  {
    id: "3",
    text: "Bring photos of wedding lash inspiration",
    reminderDate: "2024-02-10",
    reminderTime: "1440",
    createdAt: "2023-12-28",
    completed: true,
  },
];

const VIPNotes = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteReminderDate, setNewNoteReminderDate] = useState("");
  const [newNoteReminderTime, setNewNoteReminderTime] = useState("");

  const addNote = () => {
    if (!newNoteText.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      text: newNoteText,
      reminderDate: newNoteReminderDate || undefined,
      reminderTime: newNoteReminderTime || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      completed: false,
    };
    
    setNotes([newNote, ...notes]);
    setNewNoteText("");
    setNewNoteReminderDate("");
    setNewNoteReminderTime("");
    setIsAdding(false);
  };

  const toggleComplete = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getReminderLabel = (minutes?: string) => {
    if (!minutes) return "";
    const option = reminderOptions.find(o => o.value === minutes);
    return option ? option.label : "";
  };

  return (
    <Card variant="luxury" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PenLine className="h-5 w-5 text-gold" />
          <h3 className="font-serif text-xl font-semibold">My Beauty Notes</h3>
        </div>
        <Button 
          variant="soft" 
          size="sm"
          onClick={() => setIsAdding(true)}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </div>

      {/* Add New Note Form */}
      {isAdding && (
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-beige to-cream border border-gold/20 animate-fade-in">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Write your beauty note or reminder..."
            className="w-full bg-transparent border-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
            rows={3}
            autoFocus
          />
          
          {/* Reminder Section */}
          <div className="mt-4 pt-4 border-t border-gold/10">
            <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-1">
              <Bell className="h-3 w-3 text-gold" />
              Set Reminder (optional)
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Date Picker */}
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
                  <input
                    type="date"
                    value={newNoteReminderDate}
                    onChange={(e) => setNewNoteReminderDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-cream/80 border border-gold/20 rounded-xl text-sm text-foreground focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
                  />
                </div>
              </div>
              
              {/* Notification Time */}
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Notify me</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
                  <select
                    value={newNoteReminderTime}
                    onChange={(e) => setNewNoteReminderTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-cream/80 border border-gold/20 rounded-xl text-sm text-foreground focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 appearance-none"
                    disabled={!newNoteReminderDate}
                  >
                    <option value="">Select timing</option>
                    {reminderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {newNoteReminderDate && newNoteReminderTime && (
              <p className="text-xs text-gold mt-3 flex items-center gap-1">
                <Bell className="h-3 w-3" />
                You'll be notified {getReminderLabel(newNoteReminderTime)} on {new Date(newNoteReminderDate).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </div>
          
          <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-gold/10">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setIsAdding(false);
                setNewNoteText("");
                setNewNoteReminderDate("");
                setNewNoteReminderTime("");
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="luxury" 
              size="sm"
              onClick={addNote}
              disabled={!newNoteText.trim()}
            >
              Save Note
            </Button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <PenLine className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No notes yet. Add your first beauty note!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={cn(
                "group flex items-start gap-3 p-4 rounded-xl transition-all duration-200",
                note.completed ? "bg-muted/50" : "bg-beige hover:bg-beige/80"
              )}
            >
              <button
                onClick={() => toggleComplete(note.id)}
                className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mt-0.5",
                  note.completed
                    ? "bg-gold border-gold"
                    : "border-gold/40 hover:border-gold"
                )}
              >
                {note.completed && <Check className="h-3 w-3 text-charcoal" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm text-foreground",
                  note.completed && "line-through text-muted-foreground"
                )}>
                  {note.text}
                </p>
                
                {note.reminderDate && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gold/10 border border-gold/20">
                      <CalendarIcon className="h-3 w-3 text-gold" />
                      <span className="text-xs text-gold">
                        {new Date(note.reminderDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    {note.reminderTime && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gold/10 border border-gold/20">
                        <Bell className="h-3 w-3 text-gold" />
                        <span className="text-xs text-gold">
                          {getReminderLabel(note.reminderTime)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => deleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default VIPNotes;
