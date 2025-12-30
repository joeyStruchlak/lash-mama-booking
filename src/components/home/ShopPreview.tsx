import { ShoppingBag, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Luxury Lash Serum",
    description: "Growth & conditioning formula",
    price: "$45",
    rating: 5,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Silk Sleep Mask",
    description: "Lash-safe, ultra soft",
    price: "$32",
    rating: 5,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Cleansing Foam",
    description: "Gentle lash cleanser",
    price: "$28",
    rating: 5,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Lash Brush Set",
    description: "Professional quality",
    price: "$18",
    rating: 5,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
  },
];

const ShopPreview = () => {
  const handleShopClick = () => {
    window.open("https://shop.lashmama.com", "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-charcoal via-charcoal/98 to-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4">
            <ShoppingBag className="h-4 w-4" />
            Lash Mama Shop
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-cream mb-4">
            Curated Beauty Essentials
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto">
            Premium lash care products handpicked by Lash Mama herself
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-10">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className={`group relative overflow-hidden bg-cream/5 backdrop-blur border-cream/10 hover:border-gold/40 transition-all duration-500 cursor-pointer hover:-translate-y-2 animate-fade-up opacity-0 stagger-${index + 1}`}
              onClick={handleShopClick}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>

                <h3 className="font-serif text-sm md:text-base font-semibold text-cream mb-1">
                  {product.name}
                </h3>
                <p className="text-cream/60 text-xs mb-2 hidden md:block">
                  {product.description}
                </p>
                <p className="text-gradient-gold font-semibold">{product.price}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="luxury"
            size="lg"
            onClick={handleShopClick}
            className="group"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Visit Shop
            <ExternalLink className="h-4 w-4 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Button>

          <div className="flex items-center justify-center gap-3 mt-4 text-cream/50">
            <span className="text-sm">Afterpay available</span>
            <span className="text-cream/30">|</span>
            <span className="text-sm">Free shipping over $75</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPreview;
