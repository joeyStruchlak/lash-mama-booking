import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Classic Set Client",
    content: "The most beautiful lashes I've ever had! The studio is so relaxing and the attention to detail is incredible. I won't go anywhere else.",
    rating: 5,
    avatar: "S",
  },
  {
    id: 2,
    name: "Jennifer L.",
    role: "Volume Set Client",
    content: "Absolutely stunning work! The hybrid set was exactly what I wanted - natural yet glamorous. The booking process was so easy too.",
    rating: 5,
    avatar: "J",
  },
  {
    id: 3,
    name: "Emma R.",
    role: "Regular Client",
    content: "I've been coming here for over a year now. The consistency and quality is unmatched. My lashes always look perfect for weeks.",
    rating: 5,
    avatar: "E",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-beige">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium uppercase tracking-widest text-gold mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from the women who trust us 
            with their lashes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              variant="luxury"
              className={`p-8 animate-fade-up opacity-0 stagger-${index + 1}`}
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-gold/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="font-serif text-lg font-semibold text-gold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
