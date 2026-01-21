import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CourseEnrollmentCard from "@/components/courses/CourseEnrollmentCard";
import {
  Crown,
  Award,
  Medal,
  Sparkles,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Star,
  Calendar,
} from "lucide-react";

// Lash courses (one-on-one or small group professional courses)
const lashCourses = [
  {
    id: "vip-vogue",
    tier: "vip",
    title: "VIP Vogue",
    subtitle: "One-on-One Lash Mastery",
    description:
      "Exclusive private training with Lash Mama herself. Master advanced techniques in an intimate, personalized setting designed for serious professionals.",
    duration: "5 Days Intensive",
    students: "1:1 Private",
    price: "$5,500",
    icon: Crown,
    features: [
      "Private training with Lash Mama",
      "Advanced mega volume techniques",
      "Business mentorship included",
      "Lifetime support access",
      "Premium starter kit ($800 value)",
      "Certificate of Excellence",
    ],
    color: "gold",
  },
  {
    id: "platinum",
    tier: "platinum",
    title: "Platinum Lash Course",
    subtitle: "Professional Excellence",
    description:
      "Comprehensive professional training covering all lash techniques. Perfect for aspiring lash artists seeking a complete education.",
    duration: "4 Days",
    students: "Max 4 Students",
    price: "$3,200",
    icon: Award,
    features: [
      "Classic to mega volume techniques",
      "Business & marketing basics",
      "Hands-on practice with models",
      "Professional starter kit",
      "3 months mentorship",
      "Platinum Certificate",
    ],
    color: "platinum",
  },
  {
    id: "silver",
    tier: "silver",
    title: "Silver Lash Course",
    subtitle: "Essential Foundations",
    description:
      "Perfect introduction to the world of lash artistry. Learn foundational techniques and start your journey with confidence.",
    duration: "2 Days",
    students: "Max 6 Students",
    price: "$1,800",
    icon: Medal,
    features: [
      "Classic lash application",
      "Safety & hygiene protocols",
      "Client consultation skills",
      "Basic starter kit",
      "1 month support",
      "Silver Certificate",
    ],
    color: "silver",
  },
];

// Makeup & Hair courses with group enrollment sessions
const makeupHairCourses = [
  {
    id: "diy-makeup",
    tier: "special",
    title: "DIY Makeup Course",
    subtitle: "One Day Transformation",
    description:
      "Learn to do your own flawless makeup in just one day. Perfect for everyday glam or special occasions.",
    icon: Sparkles,
    color: "rose",
    sessions: [
      {
        id: "diy-session-1",
        title: "DIY Makeup - Morning Session",
        date: "2025-02-15",
        time: "10:00 AM - 4:00 PM",
        totalSpots: 7,
        confirmedSpots: 3,
        price: 450,
        depositAmount: 225,
      },
      {
        id: "diy-session-2",
        title: "DIY Makeup - Afternoon Session",
        date: "2025-03-08",
        time: "10:00 AM - 4:00 PM",
        totalSpots: 7,
        confirmedSpots: 1,
        price: 450,
        depositAmount: 225,
      },
    ],
    features: [
      "Personalized color analysis",
      "Foundation & concealer techniques",
      "Eye makeup mastery",
      "Lip & contour basics",
      "Take-home product guide",
      "Completion Certificate",
    ],
  },
  {
    id: "makeup-masterclass",
    tier: "master",
    title: "Makeup Masterclass",
    subtitle: "Bridal & Special Occasion Artistry",
    description:
      "Professional makeup artistry for bridal, editorial, and special occasions. Elevate your skills to artist level.",
    icon: Star,
    color: "rose",
    sessions: [
      {
        id: "master-session-1",
        title: "Makeup Masterclass - February",
        date: "2025-02-22",
        time: "9:00 AM - 5:00 PM",
        totalSpots: 4,
        confirmedSpots: 2,
        price: 2800,
        depositAmount: 1400,
      },
    ],
    features: [
      "Bridal makeup techniques",
      "Special occasion looks",
      "Airbrush application",
      "Photo & video ready makeup",
      "Pro brush kit included",
      "Master Certificate",
    ],
  },
  {
    id: "hairstyling",
    tier: "master",
    title: "Hairstyling Course",
    subtitle: "Bridal Up-dos & Special Occasion",
    description:
      "Master the art of elegant hairstyling for weddings and special events. Create stunning up-dos and glamorous styles.",
    icon: GraduationCap,
    color: "rose",
    sessions: [
      {
        id: "hair-session-1",
        title: "Hairstyling Masterclass",
        date: "2025-03-15",
        time: "10:00 AM - 4:00 PM",
        totalSpots: 4,
        confirmedSpots: 0,
        price: 1600,
        depositAmount: 800,
      },
    ],
    features: [
      "Bridal up-do techniques",
      "Romantic curls & waves",
      "Hair accessory styling",
      "Long-lasting hold secrets",
      "Styling tool basics",
      "Styling Certificate",
    ],
  },
];

const tierColors = {
  gold: {
    bg: "bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal",
    border: "border-gold/50",
    badge: "bg-gradient-to-r from-gold to-gold-light text-charcoal",
    icon: "text-gold",
    glow: "from-gold/30 to-gold/10",
  },
  platinum: {
    bg: "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800",
    border: "border-slate-400/50",
    badge: "bg-gradient-to-r from-slate-300 to-slate-100 text-slate-800",
    icon: "text-slate-300",
    glow: "from-slate-300/20 to-slate-400/10",
  },
  silver: {
    bg: "bg-gradient-to-br from-slate-600 via-slate-500 to-slate-600",
    border: "border-slate-300/50",
    badge: "bg-gradient-to-r from-slate-200 to-white text-slate-700",
    icon: "text-slate-200",
    glow: "from-slate-200/20 to-slate-300/10",
  },
  rose: {
    bg: "bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal",
    border: "border-gold/30",
    badge: "bg-gradient-to-r from-cream to-beige text-charcoal",
    icon: "text-gold-light",
    glow: "from-gold/15 to-gold-light/5",
  },
};

const Courses = () => {
  const content = (
    <div className="pt-0 lg:pt-24">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-2xl" />
        </div>

        <div className="container mx-auto px-5 lg:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-gold/20 text-gold text-xs lg:text-sm font-medium mb-4 lg:mb-6">
            <GraduationCap className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            Beauty Education
          </div>

          <h1 className="font-serif text-2xl md:text-4xl lg:text-6xl font-semibold text-cream mb-4 lg:mb-6">
            Master the Art of
            <br />
            <span className="text-gradient-gold">Beauty Excellence</span>
          </h1>

          <p className="text-cream/70 text-sm lg:text-lg max-w-2xl mx-auto mb-6 lg:mb-8">
            Learn from industry-leading professionals and transform your
            passion into a thriving career.
          </p>

          <div className="flex items-center justify-center gap-6 lg:gap-8 text-cream/60">
            <div className="text-center">
              <div className="font-serif text-xl lg:text-2xl font-semibold text-gradient-gold">
                500+
              </div>
              <div className="text-[10px] lg:text-xs uppercase tracking-wider">
                Graduates
              </div>
            </div>
            <div className="w-px h-8 lg:h-10 bg-gold/20" />
            <div className="text-center">
              <div className="font-serif text-xl lg:text-2xl font-semibold text-gradient-gold">
                15+
              </div>
              <div className="text-[10px] lg:text-xs uppercase tracking-wider">
                Years Teaching
              </div>
            </div>
            <div className="w-px h-8 lg:h-10 bg-gold/20" />
            <div className="text-center">
              <div className="font-serif text-xl lg:text-2xl font-semibold text-gradient-gold">
                98%
              </div>
              <div className="text-[10px] lg:text-xs uppercase tracking-wider">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Lash Courses */}
          <div className="mb-12 lg:mb-16">
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-6 lg:mb-8 text-center">
              Lash Artistry Courses
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {lashCourses.map((course, index) => {
                const colors =
                  tierColors[course.color as keyof typeof tierColors];
                return (
                  <Card
                    key={course.id}
                    className={`relative overflow-hidden ${colors.bg} ${colors.border} border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-up opacity-0 stagger-${index + 1}`}
                  >
                    {/* Glow Effect */}
                    <div
                      className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${colors.glow} rounded-full blur-2xl`}
                    />

                    <div className="relative z-10 p-5 lg:p-8">
                      {/* Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 rounded-full ${colors.badge} text-[10px] lg:text-xs font-semibold uppercase tracking-wider mb-3 lg:mb-4`}
                      >
                        <course.icon className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                        {course.tier === "vip"
                          ? "Exclusive"
                          : course.tier.charAt(0).toUpperCase() +
                            course.tier.slice(1)}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl lg:text-2xl font-semibold text-cream mb-1">
                        {course.title}
                      </h3>
                      <p className={`text-xs lg:text-sm ${colors.icon} mb-3 lg:mb-4`}>
                        {course.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-cream/70 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 line-clamp-3 lg:line-clamp-none">
                        {course.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6 text-cream/60 text-xs lg:text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                          {course.students}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-1.5 lg:space-y-2 mb-4 lg:mb-6">
                        {course.features.slice(0, 4).map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-cream/80 text-xs lg:text-sm"
                          >
                            <CheckCircle2
                              className={`h-3.5 w-3.5 lg:h-4 lg:w-4 ${colors.icon} flex-shrink-0`}
                            />
                            <span className="line-clamp-1">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 lg:pt-6 border-t border-cream/10">
                        <div>
                          <div className="text-cream/60 text-[10px] lg:text-xs uppercase tracking-wider">
                            Investment
                          </div>
                          <div className="font-serif text-xl lg:text-2xl font-semibold text-cream">
                            {course.price}
                          </div>
                        </div>
                        <Button
                          variant={
                            course.tier === "vip" ? "luxury" : "outline"
                          }
                          size="sm"
                          className={
                            course.tier !== "vip"
                              ? "text-cream border-cream/30 hover:bg-cream/10"
                              : ""
                          }
                          asChild
                        >
                          <Link to="/book">
                            Enquire
                            <ArrowRight className="h-3.5 w-3.5 lg:h-4 lg:w-4 ml-1.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Makeup & Hair Courses with Enrollment */}
          <div>
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 lg:mb-4 text-center">
              Makeup & Hair Courses
            </h2>
            <p className="text-center text-sm lg:text-base text-muted-foreground mb-6 lg:mb-8 max-w-2xl mx-auto">
              Group sessions with limited spots. Secure your seat with a deposit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {makeupHairCourses.map((course) => {
                const colors =
                  tierColors[course.color as keyof typeof tierColors];
                return (
                  <CourseEnrollmentCard
                    key={course.id}
                    courseId={course.id}
                    courseTitle={course.title}
                    courseSubtitle={course.subtitle}
                    courseDescription={course.description}
                    icon={course.icon}
                    sessions={course.sessions}
                    colorScheme={colors}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-background to-cream/30">
        <div className="container mx-auto px-5 lg:px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3 lg:mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground max-w-xl mx-auto mb-6 lg:mb-8">
            Contact us to discuss which course is right for you. We offer
            flexible payment plans and group discounts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4">
            <Button variant="luxury" size="default" className="w-full sm:w-auto">
              <Calendar className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
              Book a Consultation
            </Button>
            <Button variant="outline" size="default" className="w-full sm:w-auto" asChild>
              <Link to="/book">View Course Schedule</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  return <AppLayout>{content}</AppLayout>;
};

export default Courses;
