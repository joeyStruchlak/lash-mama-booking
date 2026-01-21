import AppLayout from "@/components/layout/AppLayout";
import { Heart, Shield, Sparkles, Award } from "lucide-react";
import heroImage from "@/assets/hero-salon.jpg";

const values = [
  {
    icon: Heart,
    title: "Client-Centered Care",
    description: "Your comfort and satisfaction are our top priorities. We listen, customize, and exceed expectations.",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Only the finest, ethically-sourced lash products that are gentle on your natural lashes.",
  },
  {
    icon: Sparkles,
    title: "Artistic Excellence",
    description: "Our artists are trained in the latest techniques to deliver flawless, natural-looking results.",
  },
  {
    icon: Award,
    title: "Ongoing Education",
    description: "We continuously update our skills to bring you the most advanced lash artistry.",
  },
];

const About = () => {
  const content = (
    <div className="pt-0 lg:pt-28 pb-8 lg:pb-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] lg:h-[50vh] min-h-[300px] lg:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Our beautiful studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-6xl font-semibold text-cream mb-3 lg:mb-4">
            About Lash Mama
          </h1>
          <p className="text-cream/80 text-base lg:text-lg max-w-2xl mx-auto">
            Where artistry meets elegance
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-5 lg:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs lg:text-sm font-medium uppercase tracking-widest text-gold mb-3 lg:mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-6 lg:mb-8">
              A Passion for Beauty
            </h2>
            <div className="space-y-4 lg:space-y-6 text-sm lg:text-base text-muted-foreground leading-relaxed">
              <p>
                Founded in 2016, Lash Mama began as a dream to create a space where 
                women could feel truly pampered and leave feeling more beautiful than ever. 
                Our founder, a certified master lash artist, envisioned a boutique experience 
                that combined expert technique with a warm, inviting atmosphere.
              </p>
              <p>
                Today, Lash Mama has grown into a beloved destination for lash enthusiasts 
                seeking the perfect blend of artistry and luxury. Every detail of our studio 
                has been thoughtfully designed to provide a serene escape from the everyday, 
                where you can relax and trust that you're in expert hands.
              </p>
              <p>
                We believe that beautiful lashes are about more than just appearance—they're 
                about confidence, self-expression, and the joy of feeling your best. That's 
                why we take the time to understand your unique style and preferences, 
                creating customized looks that enhance your natural beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 lg:py-20 bg-cream">
        <div className="container mx-auto px-5 lg:px-6">
          <div className="text-center mb-10 lg:mb-16">
            <span className="text-xs lg:text-sm font-medium uppercase tracking-widest text-gold mb-3 lg:mb-4 block">
              Our Values
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`text-center animate-fade-up opacity-0 stagger-${index + 1}`}
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto rounded-xl lg:rounded-2xl bg-gold/10 flex items-center justify-center mb-3 lg:mb-6">
                  <value.icon className="h-5 w-5 lg:h-8 lg:w-8 text-gold" />
                </div>
                <h3 className="font-serif text-base lg:text-xl font-semibold text-foreground mb-2 lg:mb-3">
                  {value.title}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-5 lg:px-6">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-xs lg:text-sm font-medium uppercase tracking-widest text-gold mb-3 lg:mb-4 block">
              Visit Us
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-6 lg:mb-8">
              Our Studio
            </h2>
            <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground">
              <p className="text-base lg:text-lg">
                123 Beauty Lane<br />
                Los Angeles, CA 90210
              </p>
              <p>
                <strong className="text-foreground">Phone:</strong> (555) 123-4567<br />
                <strong className="text-foreground">Email:</strong> hello@lashmama.com
              </p>
              <p className="pt-3 lg:pt-4">
                <strong className="text-foreground">Hours:</strong><br />
                Monday - Friday: 9am - 7pm<br />
                Saturday: 9am - 5pm<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return <AppLayout>{content}</AppLayout>;
};

export default About;
