import { ServiceCategory } from "@/data/services";
import { Service } from "@/types/services";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Clock } from "lucide-react";
import { useState } from "react";

interface ServiceAccordionProps {
  categories: ServiceCategory[];
  selectedService: string | null;
  onSelect: (serviceId: string, categoryId: string) => void;
}

const ServiceAccordion = ({ categories, selectedService, onSelect }: ServiceAccordionProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    categories.find(cat => cat.services.some(s => s.id === selectedService))?.id || null
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-3">
      {categories.map((category) => {
        const isExpanded = expandedCategory === category.id;
        const hasSelectedService = category.services.some(s => s.id === selectedService);

        return (
          <Card
            key={category.id}
            variant={hasSelectedService ? "luxury" : "default"}
            className={cn(
              "overflow-hidden transition-all duration-300",
              hasSelectedService && "border-gold/30"
            )}
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className={cn(
                "w-full flex items-center justify-between p-5 text-left transition-colors",
                isExpanded ? "bg-cream/50" : "hover:bg-beige/50"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg font-semibold text-foreground">
                  {category.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({category.services.length} services)
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {/* Services List */}
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 space-y-2">
                  {category.services.map((service) => (
                    <ServiceItem
                      key={service.id}
                      service={service}
                      isSelected={selectedService === service.id}
                      onSelect={() => onSelect(service.id, category.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

interface ServiceItemProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceItem = ({ service, isSelected, onSelect }: ServiceItemProps) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2",
        isSelected
          ? "bg-gold/10 border-gold"
          : "bg-background border-transparent hover:bg-beige/50 hover:border-border"
      )}
    >
      <img
        src={service.imageUrl}
        alt={service.name}
        className="w-14 h-14 rounded-lg object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground">
          {service.name}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {service.description}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {service.duration} min
          </span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="font-serif text-lg font-semibold text-gold">
          ${service.price}
        </span>
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-2 ml-auto",
            isSelected
              ? "border-gold bg-gold"
              : "border-border"
          )}
        >
          {isSelected && (
            <Check className="h-3 w-3 text-primary-foreground" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceAccordion;
