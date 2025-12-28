import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/services";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

const ServiceCard = ({ service, index = 0 }: ServiceCardProps) => {
  return (
    <Card
      variant="elevated"
      className={cn(
        "group overflow-hidden animate-fade-up opacity-0",
        `stagger-${Math.min(index + 1, 5)}`
      )}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-cream/95 backdrop-blur-sm shadow-soft">
          <span className="font-serif text-lg font-semibold text-charcoal">${service.price}</span>
        </div>

        {/* Category */}
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-medium uppercase tracking-wider text-cream/80">
            {service.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-200">
          {service.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-gold" />
            <span>{service.duration} min</span>
          </div>

          <Button variant="ghost" size="sm" asChild className="group/btn">
            <Link to={`/services/${service.id}`} className="flex items-center gap-1">
              Book
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
