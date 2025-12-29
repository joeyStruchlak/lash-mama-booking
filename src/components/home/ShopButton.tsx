import { ShoppingBag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShopButton = () => {
  const handleShopClick = () => {
    // Replace with actual Shopify store URL
    window.open("https://shop.lashmama.com", "_blank");
  };

  return (
    <section className="py-16 bg-gradient-to-br from-charcoal to-charcoal/95">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6">
            <ShoppingBag className="h-4 w-4" />
            Lash Mama Shop
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-cream mb-4">
            Shop Our Curated Collection
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto mb-8">
            Discover premium lash care products, aftercare essentials, and exclusive beauty tools 
            handpicked by Lash Mama herself.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
            
            <div className="flex items-center gap-3 text-cream/60">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Afterpay_logo.svg" 
                alt="Afterpay" 
                className="h-5 brightness-0 invert opacity-70"
                onError={(e) => {
                  // Fallback if image doesn't load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-sm">Pay in 4 interest-free payments</span>
            </div>
          </div>

          {/* Product Preview Cards */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Lash Serum", price: "$45", emoji: "✨" },
              { name: "Silk Sleep Mask", price: "$32", emoji: "😴" },
              { name: "Cleansing Foam", price: "$28", emoji: "🫧" },
              { name: "Lash Brush Set", price: "$18", emoji: "💫" },
            ].map((product) => (
              <div 
                key={product.name}
                className="bg-cream/5 backdrop-blur rounded-xl p-4 hover:bg-cream/10 transition-colors cursor-pointer group"
                onClick={handleShopClick}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {product.emoji}
                </div>
                <p className="text-cream text-sm font-medium">{product.name}</p>
                <p className="text-gold text-sm">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopButton;
