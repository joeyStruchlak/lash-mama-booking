import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from "lucide-react";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
];

// Simple available dates (next 30 days, excluding some days)
const getAvailableDates = () => {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip Sundays
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }
  return dates;
};

const Book = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const availableDates = getAvailableDates();
  const service = services.find(s => s.id === selectedService);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const isDateAvailable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return availableDates.some(d => 
      d.getDate() === day && 
      d.getMonth() === currentMonth.getMonth() && 
      d.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleDateSelect = (day: number) => {
    if (isDateAvailable(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
      setSelectedTime(null);
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedDate && !!selectedTime;
    return false;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Book Your Appointment
            </h1>
            <p className="text-muted-foreground">
              Select your service and choose a convenient time.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300",
                    step >= s
                      ? "bg-gold text-primary-foreground"
                      : "bg-beige text-muted-foreground"
                  )}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      "w-16 h-0.5 transition-all duration-300",
                      step > s ? "bg-gold" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between max-w-md mx-auto mb-12 text-sm">
            <span className={step >= 1 ? "text-gold" : "text-muted-foreground"}>Service</span>
            <span className={step >= 2 ? "text-gold" : "text-muted-foreground"}>Date & Time</span>
            <span className={step >= 3 ? "text-gold" : "text-muted-foreground"}>Confirm</span>
          </div>

          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                Select Your Service
              </h2>
              <div className="grid gap-4">
                {services.map((s) => (
                  <Card
                    key={s.id}
                    variant={selectedService === s.id ? "luxury" : "default"}
                    className={cn(
                      "p-6 cursor-pointer transition-all duration-200 border-2",
                      selectedService === s.id
                        ? "border-gold"
                        : "border-transparent hover:border-border"
                    )}
                    onClick={() => setSelectedService(s.id)}
                  >
                    <div className="flex items-center gap-6">
                      <img
                        src={s.imageUrl}
                        alt={s.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {s.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {s.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {s.duration} min
                          </span>
                          <span className="font-serif text-lg font-semibold text-gold">
                            ${s.price}
                          </span>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                          selectedService === s.id
                            ? "border-gold bg-gold"
                            : "border-border"
                        )}
                      >
                        {selectedService === s.id && (
                          <Check className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                Choose Your Date & Time
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <Card variant="luxury" className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={prevMonth}
                      className="p-2 hover:bg-beige rounded-lg transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h3 className="font-serif text-lg font-semibold">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-beige rounded-lg transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {[...Array(firstDayOfMonth)].map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1;
                      const available = isDateAvailable(day);
                      const selected = isSelectedDate(day);
                      
                      return (
                        <button
                          key={day}
                          onClick={() => handleDateSelect(day)}
                          disabled={!available}
                          className={cn(
                            "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
                            selected
                              ? "bg-gold text-primary-foreground"
                              : available
                              ? "hover:bg-beige text-foreground"
                              : "text-muted-foreground/30 cursor-not-allowed"
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Time Slots */}
                <Card variant="luxury" className="p-6">
                  <h3 className="font-serif text-lg font-semibold mb-4">
                    {selectedDate ? formatDate(selectedDate) : "Select a date first"}
                  </h3>
                  
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                            selectedTime === time
                              ? "bg-gold text-primary-foreground"
                              : "bg-beige hover:bg-muted text-foreground"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 text-muted-foreground">
                      <CalendarIcon className="h-8 w-8 mr-2 opacity-50" />
                      Select a date to see available times
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && service && selectedDate && selectedTime && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                Confirm Your Booking
              </h2>

              <Card variant="luxury" className="p-8 max-w-lg mx-auto">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.duration} min</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Total</span>
                    <span className="font-medium">${service.price}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="text-muted-foreground">Deposit Required</span>
                    <span className="font-serif text-xl font-semibold text-gold">
                      ${Math.round(service.price * (service.depositPercentage / 100))}
                    </span>
                  </div>
                </div>

                <Button variant="luxury" size="lg" className="w-full">
                  Proceed to Payment
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Deposit applied to your service total. 24-hour cancellation policy applies.
                </p>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            {step > 1 ? (
              <Button variant="soft" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            ) : (
              <Button variant="soft" asChild>
                <Link to="/services">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  View Services
                </Link>
              </Button>
            )}

            {step < 3 && (
              <Button
                variant="luxury"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Book;
