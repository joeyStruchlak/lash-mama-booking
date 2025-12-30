import { useState } from "react";
import { PenLine, Bell, Plus, Trash2, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  text: string;
  reminder?: string;
  createdAt: string;
  completed: boolean;
}

const mockNotes: Note[] = [
  {
    id: "1",
    text: "Ask about new volume lash styles",
    reminder: "2024-01-15",
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
    reminder: "2024-02-10",
    createdAt: "2023-12-28",
    completed: true,
  },
];

const VIPNotes = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteReminder, setNewNoteReminder] = useState("");

  const addNote = () => {
    if (!newNoteText.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      text: newNoteText,
      reminder: newNoteReminder || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      completed: false,
    };
    
    setNotes([newNote, ...notes]);
    setNewNoteText("");
    setNewNoteReminder("");
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
        <div className="mb-6 p-4 rounded-xl bg-beige border border-gold/20 animate-fade-in">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Write your beauty note..."
            className="w-full bg-transparent border-none resize-none text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
            rows={2}
            autoFocus
          />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-gold/10">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Bell className="h-4 w-4 text-gold" />
              <input
                type="date"
                value={newNoteReminder}
                onChange={(e) => setNewNoteReminder(e.target.value)}
                className="bg-cream/50 border border-gold/20 rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-gold/40"
                placeholder="Set reminder"
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setNewNoteText("");
                  setNewNoteReminder("");
                }}
              >
                <X className="h-4 w-4" />
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
                
                {note.reminder && (
                  <div className="flex items-center gap-1 mt-2">
                    <Bell className="h-3 w-3 text-gold" />
                    <span className="text-xs text-gold">
                      Reminder: {new Date(note.reminder).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
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
