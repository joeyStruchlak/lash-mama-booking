import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream/90 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-semibold text-cream">
                Lash <span className="text-gold">Mama</span>
              </span>
            </Link>
            <p className="text-sm text-cream/60 leading-relaxed">
              Luxury lash extensions and beauty services in a serene, 
              boutique setting. Experience beauty elevated.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4 text-cream">Quick Links</h4>
            <ul className="space-y-3">
              {["Services", "Book Now", "About Us", "Gift Cards"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-cream/60 hover:text-gold transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4 text-cream">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-cream/60">
                <Phone className="h-4 w-4 text-gold" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/60">
                <Mail className="h-4 w-4 text-gold" />
                <span>hello@lashmama.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream/60">
                <MapPin className="h-4 w-4 text-gold mt-0.5" />
                <span>123 Beauty Lane<br />Los Angeles, CA 90210</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4 text-cream">Hours</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>9am - 7pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9am - 5pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} Lash Mama. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-cream/5 hover:bg-gold/20 text-cream/60 hover:text-gold transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
