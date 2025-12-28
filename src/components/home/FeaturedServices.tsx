import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";

const FeaturedServices = () => {
  const featuredServices = services.slice(0, 3);

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium uppercase tracking-widest text-gold mb-4 block">
            Our Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Curated Lash Experiences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From subtle enhancements to dramatic transformations, each service is 
            tailored to enhance your natural beauty.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services" className="flex items-center gap-2">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
