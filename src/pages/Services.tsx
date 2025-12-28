import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceCard from "@/components/home/ServiceCard";
import { services, serviceCategories } from "@/data/services";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="text-sm font-medium uppercase tracking-widest text-gold mb-4 block">
              Our Menu
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Services & Pricing
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our full range of lash services. Each treatment is customized 
              to your unique features and preferences.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-200 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === "All"
                  ? "bg-gold text-primary-foreground shadow-gold"
                  : "bg-beige text-muted-foreground hover:bg-muted"
              )}
            >
              All Services
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === category
                    ? "bg-gold text-primary-foreground shadow-gold"
                    : "bg-beige text-muted-foreground hover:bg-muted"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No services found matching your search.</p>
            </div>
          )}

          {/* Deposit Notice */}
          <div className="mt-16 text-center p-8 bg-cream rounded-2xl">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              Booking Policy
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A deposit of 20-30% is required to secure your appointment. This will be 
              applied to your service total. Cancellations require 24-hour notice.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
