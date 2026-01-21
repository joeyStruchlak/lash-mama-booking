import AppLayout from "@/components/layout/AppLayout";
import ServiceCard from "@/components/home/ServiceCard";
import { serviceCategories, categoryNames } from "@/data/services";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = serviceCategories.filter((category) => {
    if (activeCategory !== "All" && category.name !== activeCategory) return false;
    if (!searchTerm) return true;
    return category.services.some(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const content = (
    <div className="pt-6 lg:pt-28 pb-8 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Page Header */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="text-xs lg:text-sm font-medium uppercase tracking-widest text-gold mb-2 lg:mb-4 block">
            Our Menu
          </span>
          <h1 className="font-serif text-2xl lg:text-4xl xl:text-5xl font-semibold text-foreground mb-2 lg:mb-4">
            Services & Pricing
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Explore our full range of beauty services. Each treatment is customized 
            to your unique features and preferences.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6 lg:mb-8 px-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 lg:h-5 w-4 lg:w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 lg:h-12 pl-11 lg:pl-12 pr-4 rounded-xl bg-card border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-200 text-foreground placeholder:text-muted-foreground text-sm lg:text-base"
            />
          </div>
        </div>

        {/* Category Tabs - Horizontal scroll on mobile */}
        <div className="flex gap-2 mb-6 lg:mb-12 overflow-x-auto pb-2 px-2 lg:flex-wrap lg:justify-center scrollbar-hide">
          <button
            onClick={() => setActiveCategory("All")}
            className={cn(
              "px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
              activeCategory === "All"
                ? "bg-gold text-primary-foreground shadow-gold"
                : "bg-beige text-muted-foreground hover:bg-muted"
            )}
          >
            All Services
          </button>
          {categoryNames.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                activeCategory === category
                  ? "bg-gold text-primary-foreground shadow-gold"
                  : "bg-beige text-muted-foreground hover:bg-muted"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Accordion */}
        <div className="space-y-3 lg:space-y-4 max-w-4xl mx-auto">
          {filteredCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            
            return (
              <Card key={category.id} className="overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 lg:p-6 text-left transition-colors",
                    isExpanded ? "bg-cream/50" : "hover:bg-beige/50"
                  )}
                >
                  <div>
                    <h3 className="font-serif text-lg lg:text-xl font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-xs lg:text-sm text-muted-foreground mt-0.5 lg:mt-1">
                      {category.services.length} service{category.services.length > 1 ? 's' : ''} available
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 lg:h-6 w-5 lg:w-6 text-muted-foreground transition-transform duration-300",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>
                
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 lg:p-6 pt-0 grid gap-3 lg:gap-4 md:grid-cols-2">
                      {category.services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 lg:py-16">
            <p className="text-muted-foreground text-base lg:text-lg">No services found matching your search.</p>
          </div>
        )}

        {/* Deposit Notice */}
        <div className="mt-8 lg:mt-16 text-center p-6 lg:p-8 bg-cream rounded-2xl max-w-4xl mx-auto">
          <h3 className="font-serif text-lg lg:text-xl font-semibold text-foreground mb-2">
            Booking Policy
          </h3>
          <p className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
            A deposit of 20-35% is required to secure your appointment. This will be 
            applied to your service total. Cancellations require 24-hour notice.
          </p>
        </div>
      </div>
    </div>
  );

  return <AppLayout>{content}</AppLayout>;
};

export default Services;
