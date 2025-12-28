import { Link } from "react-router-dom";
import { Heart, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import lashCloseup from "@/assets/lash-closeup.jpg";

const features = [
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Every set is customized to your eye shape, lifestyle, and preferences.",
  },
  {
    icon: Shield,
    title: "Premium Products",
    description: "We use only the highest quality, cruelty-free lash products.",
  },
  {
    icon: Sparkles,
    title: "Expert Artistry",
    description: "Trained by industry leaders with years of experience.",
  },
];

const AboutPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-medium">
              <img
                src={lashCloseup}
                alt="Beautiful lash extensions"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-cream p-6 rounded-2xl shadow-medium hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-semibold text-charcoal">8+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-gold mb-4 block">
              About Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Where Art Meets
              <br />
              <span className="text-gold">Precision</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              At Lash Mama, we believe every woman deserves to feel confident and 
              beautiful. Our intimate studio offers a sanctuary where you can relax 
              and be pampered while our expert artists work their magic.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-beige flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="luxury" size="lg" asChild>
              <Link to="/about" className="flex items-center gap-2">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
