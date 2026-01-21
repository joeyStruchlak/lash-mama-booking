import { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { serviceCategories, services } from "@/data/services";
import { staffMembers, getStaffForService } from "@/data/staff";
import ServiceAccordion from "@/components/booking/ServiceAccordion";
import StaffSelection from "@/components/booking/StaffSelection";
import FirstTimeClientNotice from "@/components/booking/FirstTimeClientNotice";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, Repeat } from "lucide-react";
import AfterpayBadge from "@/components/booking/AfterpayBadge";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
];

const recurringOptions = [
  { id: "none", label: "One-time booking", interval: null },
  { id: "weekly", label: "Weekly", interval: 7 },
  { id: "biweekly", label: "Every 2 weeks", interval: 14 },
  { id: "monthly", label: "Monthly", interval: 30 },
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isVIP, setIsVIP] = useState(false);
  const [recurringOption, setRecurringOption] = useState("none");
  const [isFirstTimeClient, setIsFirstTimeClient] = useState(false);

  const availableDates = getAvailableDates();
  const service = services.find(s => s.id === selectedService);
  const staff = staffMembers.find(s => s.id === selectedStaff);
  const availableStaff = selectedCategoryId ? getStaffForService(selectedCategoryId) : [];

  // Filter services for first-time clients - they can only book Full Sets and Removals for lash services
  const getFilteredCategories = () => {
    if (!isFirstTimeClient) return serviceCategories;
    
    return serviceCategories.map(category => {
      // Check if it's a lash category
      const isLashCategory = ["mega-volume", "volume", "natural-hybrid"].includes(category.id);
      
      if (!isLashCategory) return category;
      
      // Filter to only show Full Sets (not refills) for lash categories
      const filteredServices = category.services.filter(service => 
        service.name.toLowerCase().includes("full set") || 
        service.name.toLowerCase().includes("removal")
      );
      
      return {
        ...category,
        services: filteredServices,
      };
    }).filter(category => category.services.length > 0); // Remove empty categories
  };

  const filteredCategories = getFilteredCategories();

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

  const handleServiceSelect = (serviceId: string, categoryId: string) => {
    setSelectedService(serviceId);
    setSelectedCategoryId(categoryId);
    setSelectedStaff(null); // Reset staff when service changes
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedStaff;
    if (step === 3) return !!selectedDate && !!selectedTime;
    return false;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateFinalPrice = () => {
    if (!service || !staff) return 0;
    return Math.round(service.price * staff.priceMultiplier);
  };

  const calculateDeposit = () => {
    if (!service) return 0;
    const finalPrice = calculateFinalPrice();
    return Math.round(finalPrice * (service.depositPercentage / 100));
  };

  const content = (
    <div className="pt-6 lg:pt-28 pb-8 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 lg:mb-4">
            Book Your Appointment
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Select your service, choose your artist, and book your time.
          </p>
        </div>

          {/* First Time Client Notice */}
          <FirstTimeClientNotice 
            isFirstTime={isFirstTimeClient} 
            onToggle={setIsFirstTimeClient} 
          />

          {/* VIP Toggle */}
          <Card className="p-6 mb-8 border-gold/30 bg-gradient-to-r from-gold/5 to-cream/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Repeat className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    VIP Recurring Booking
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Set up automatic recurring appointments for regular clients
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVIP(!isVIP)}
                className={cn(
                  "relative w-14 h-8 rounded-full transition-colors duration-300 shadow-inner",
                  isVIP ? "bg-gold" : "bg-muted border border-border"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out",
                    isVIP && "translate-x-6"
                  )}
                />
              </button>
            </div>

            {isVIP && (
              <div className="mt-6 pt-6 border-t border-gold/20">
                <p className="text-sm font-medium text-foreground mb-3">Select recurring frequency:</p>
                <div className="flex flex-wrap gap-2">
                  {recurringOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setRecurringOption(option.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                        recurringOption === option.id
                          ? "bg-gold text-primary-foreground"
                          : "bg-beige text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3, 4].map((s) => (
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
                {s < 4 && (
                  <div
                    className={cn(
                      "w-12 h-0.5 transition-all duration-300",
                      step > s ? "bg-gold" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between max-w-lg mx-auto mb-12 text-sm">
            <span className={step >= 1 ? "text-gold" : "text-muted-foreground"}>Service</span>
            <span className={step >= 2 ? "text-gold" : "text-muted-foreground"}>Artist</span>
            <span className={step >= 3 ? "text-gold" : "text-muted-foreground"}>Date & Time</span>
            <span className={step >= 4 ? "text-gold" : "text-muted-foreground"}>Confirm</span>
          </div>

          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                Select Your Service
              </h2>
              <ServiceAccordion
                categories={filteredCategories}
                selectedService={selectedService}
                onSelect={handleServiceSelect}
              />
            </div>
          )}

          {/* Step 2: Select Staff */}
          {step === 2 && service && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-center mb-2">
                Choose Your Artist
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                For: {service.name}
              </p>
              
              {availableStaff.length > 0 ? (
                <StaffSelection
                  staffMembers={availableStaff}
                  selectedStaff={selectedStaff}
                  onSelect={setSelectedStaff}
                  basePrice={service.price}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No staff available for this service. Please contact us directly.
                </div>
              )}
            </div>
          )}

          {/* Step 3: Select Date & Time */}
          {step === 3 && (
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

          {/* Step 4: Confirmation */}
          {step === 4 && service && staff && selectedDate && selectedTime && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-center mb-8">
                Confirm Your Booking
              </h2>

              <Card variant="luxury" className="p-8 max-w-lg mx-auto">
                {/* Service Info */}
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

                {/* Staff Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-lg font-serif font-semibold",
                    staff.tier === "premium" ? "bg-gold/20 text-gold" :
                    staff.tier === "senior" ? "bg-cream text-charcoal" :
                    "bg-beige text-muted-foreground"
                  )}>
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{staff.name}</h4>
                    <p className="text-sm text-muted-foreground">{staff.title}</p>
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
                  {isVIP && recurringOption !== "none" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recurring</span>
                      <span className="font-medium text-gold">
                        {recurringOptions.find(r => r.id === recurringOption)?.label}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Total</span>
                    <span className="font-medium">${calculateFinalPrice()}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="text-muted-foreground">Deposit Required</span>
                    <span className="font-serif text-xl font-semibold text-gold">
                      ${calculateDeposit()}
                    </span>
                  </div>
                </div>

                <Button variant="luxury" size="lg" className="w-full">
                  Proceed to Payment
                </Button>

                <div className="flex justify-center mt-4">
                  <AfterpayBadge amount={calculateDeposit()} />
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Deposit applied to your service total. 24-hour cancellation policy applies.
                </p>
              </Card>
            </div>
          )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 lg:mt-12">
          {step > 1 ? (
            <Button variant="soft" size="sm" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          ) : (
            <Button variant="soft" size="sm" asChild>
              <Link to="/services">
                <ChevronLeft className="h-4 w-4 mr-1" />
                View Services
              </Link>
            </Button>
          )}

          {step < 4 && (
            <Button
              variant="luxury"
              size="sm"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return <AppLayout>{content}</AppLayout>;
};

export default Book;
