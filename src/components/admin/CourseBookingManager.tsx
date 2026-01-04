import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Users,
  Clock,
  Sparkles,
  DollarSign,
  CheckCircle2,
  UserPlus,
  Trash2,
  Edit2,
  Save,
} from "lucide-react";
import { toast } from "sonner";

interface CourseStudent {
  id: string;
  name: string;
  email: string;
  phone: string;
  depositPaid: boolean;
  confirmedAt?: string;
}

interface MakeupCourse {
  id: string;
  title: string;
  date: string;
  time: string;
  totalSpots: number;
  students: CourseStudent[];
  price: number;
  depositAmount: number;
}

const CourseBookingManager = () => {
  const [courses, setCourses] = useState<MakeupCourse[]>([
    {
      id: "course-1",
      title: "DIY Makeup Course - 1 Day Group Session",
      date: "2024-02-15",
      time: "10:00 AM - 4:00 PM",
      totalSpots: 7,
      students: [
        { id: "s1", name: "Emma Wilson", email: "emma@email.com", phone: "0400111222", depositPaid: true, confirmedAt: "2024-01-10" },
        { id: "s2", name: "Sarah Chen", email: "sarah@email.com", phone: "0400222333", depositPaid: true, confirmedAt: "2024-01-12" },
        { id: "s3", name: "Olivia Brown", email: "olivia@email.com", phone: "0400333444", depositPaid: true, confirmedAt: "2024-01-15" },
      ],
      price: 350,
      depositAmount: 175,
    },
  ]);

  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showEnrollStudent, setShowEnrollStudent] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<MakeupCourse | null>(null);
  const [newCourse, setNewCourse] = useState({
    title: "DIY Makeup Course - 1 Day Group Session",
    date: "",
    time: "10:00 AM - 4:00 PM",
    totalSpots: 7,
    price: 350,
    depositAmount: 175,
  });
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleCreateCourse = () => {
    if (!newCourse.date) {
      toast.error("Please select a course date");
      return;
    }
    const course: MakeupCourse = {
      id: `course-${Date.now()}`,
      title: newCourse.title,
      date: newCourse.date,
      time: newCourse.time,
      totalSpots: newCourse.totalSpots,
      students: [],
      price: newCourse.price,
      depositAmount: newCourse.depositAmount,
    };
    setCourses([...courses, course]);
    setShowCreateCourse(false);
    setNewCourse({
      title: "DIY Makeup Course - 1 Day Group Session",
      date: "",
      time: "10:00 AM - 4:00 PM",
      totalSpots: 7,
      price: 350,
      depositAmount: 175,
    });
    toast.success("Course created successfully");
  };

  const handleEnrollStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.phone || !selectedCourse) {
      toast.error("Please fill in all fields");
      return;
    }
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          students: [
            ...course.students,
            {
              id: `s${Date.now()}`,
              name: newStudent.name,
              email: newStudent.email,
              phone: newStudent.phone,
              depositPaid: false,
            },
          ],
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    setShowEnrollStudent(false);
    setNewStudent({ name: "", email: "", phone: "" });
    toast.success(`${newStudent.name} enrolled - awaiting deposit payment`);
  };

  const handleConfirmPayment = (courseId: string, studentId: string) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          students: course.students.map(student => {
            if (student.id === studentId) {
              return { ...student, depositPaid: true, confirmedAt: new Date().toISOString().split('T')[0] };
            }
            return student;
          }),
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    toast.success("Payment confirmed - seat secured");
  };

  const handleRemoveStudent = (courseId: string, studentId: string) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          students: course.students.filter(s => s.id !== studentId),
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    toast.success("Student removed from course");
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">Course Management</h2>
          <p className="text-sm text-muted-foreground">Manage makeup courses and student enrollments</p>
        </div>
        <Button variant="luxury" size="sm" className="gap-2" onClick={() => setShowCreateCourse(true)}>
          <Calendar className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {courses.map((course) => {
        const availableSpots = course.totalSpots - course.students.filter(s => s.depositPaid).length;
        const pendingStudents = course.students.filter(s => !s.depositPaid).length;
        
        return (
          <Card key={course.id} className="p-4 md:p-6 border-0 bg-gradient-to-br from-card to-card/80">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center shrink-0">
                  <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-rose-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base md:text-lg font-semibold text-foreground">{course.title}</h3>
                  <div className="flex flex-wrap gap-2 md:gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gold" />
                      {new Date(course.date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-gold" />
                      {course.time}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={cn(
                  "text-sm px-3 py-1",
                  availableSpots === 0 ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                )}>
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  {availableSpots} spots left
                </Badge>
                {pendingStudents > 0 && (
                  <Badge variant="outline" className="text-sm px-3 py-1 bg-amber-50 text-amber-600 border-amber-200">
                    {pendingStudents} pending
                  </Badge>
                )}
                <Badge variant="outline" className="text-sm px-3 py-1 bg-gold/10 text-gold border-gold/30">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  ${course.price}
                </Badge>
              </div>
            </div>

            {/* Spot Visualization */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-foreground">Seats</span>
                <span className="text-xs text-muted-foreground">({course.students.filter(s => s.depositPaid).length}/{course.totalSpots} confirmed)</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: course.totalSpots }).map((_, i) => {
                  const confirmedStudents = course.students.filter(s => s.depositPaid);
                  const isOccupied = i < confirmedStudents.length;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all",
                        isOccupied
                          ? "bg-gradient-to-br from-gold to-gold/80 text-primary-foreground shadow-gold"
                          : "bg-muted/50 text-muted-foreground border border-dashed border-muted-foreground/30"
                      )}
                    >
                      {isOccupied ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Enrolled Students</span>
                {availableSpots > 0 && (
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={() => { setSelectedCourse(course); setShowEnrollStudent(true); }}>
                    <UserPlus className="h-3.5 w-3.5" />
                    Add Student
                  </Button>
                )}
              </div>
              
              {course.students.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No students enrolled yet</p>
              ) : (
                <div className="grid gap-2">
                  {course.students.map((student) => (
                    <div
                      key={student.id}
                      className={cn(
                        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 md:p-4 rounded-xl transition-colors",
                        student.depositPaid ? "bg-emerald-50/50" : "bg-amber-50/50"
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground text-sm truncate">{student.name}</p>
                          {student.depositPaid ? (
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">Confirmed</Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 text-xs">Pending Payment</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-4 text-xs text-muted-foreground mt-1">
                          <span>{student.email}</span>
                          <span>{student.phone}</span>
                          {student.confirmedAt && <span>Confirmed: {student.confirmedAt}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!student.depositPaid && (
                          <Button variant="luxury" size="sm" className="gap-1.5 text-xs" onClick={() => handleConfirmPayment(course.id, student.id)}>
                            <DollarSign className="h-3 w-3" />
                            Confirm ${course.depositAmount}
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => handleRemoveStudent(course.id, student.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        );
      })}

      {/* Create Course Dialog */}
      <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="font-serif">Create New Course</DialogTitle>
            <DialogDescription>Set up a new DIY makeup course session</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Course Title</label>
              <Input
                value={newCourse.title}
                onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Date</label>
                <Input
                  type="date"
                  value={newCourse.date}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Time</label>
                <Input
                  value={newCourse.time}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Total Spots</label>
                <Input
                  type="number"
                  value={newCourse.totalSpots}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, totalSpots: parseInt(e.target.value) || 7 }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Price</label>
                <Input
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, price: parseInt(e.target.value) || 350 }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Deposit</label>
                <Input
                  type="number"
                  value={newCourse.depositAmount}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, depositAmount: parseInt(e.target.value) || 175 }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowCreateCourse(false)}>Cancel</Button>
            <Button variant="luxury" onClick={handleCreateCourse}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enroll Student Dialog */}
      <Dialog open={showEnrollStudent} onOpenChange={setShowEnrollStudent}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="font-serif">Enroll Student</DialogTitle>
            <DialogDescription>Add a new student to the course</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <Input
                placeholder="Enter student name"
                value={newStudent.name}
                onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={newStudent.email}
                onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input
                placeholder="Enter phone number"
                value={newStudent.phone}
                onChange={(e) => setNewStudent(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <Card className="p-3 bg-amber-50 border-0">
              <p className="text-sm text-amber-700">Student will need to pay ${selectedCourse?.depositAmount} deposit to secure their seat.</p>
            </Card>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowEnrollStudent(false)}>Cancel</Button>
            <Button variant="luxury" onClick={handleEnrollStudent}>Enroll Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseBookingManager;