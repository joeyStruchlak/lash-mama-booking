import lashCloseup from "@/assets/lash-closeup.jpg";
import volumeLash from "@/assets/volume-lash.jpg";
import classicLash from "@/assets/classic-lash.jpg";
import { Service } from "@/types/services";

export const services: Service[] = [
  {
    id: "1",
    name: "Classic Lash Extensions",
    description: "Natural-looking lash extensions applied one-to-one on your natural lashes. Perfect for a subtle, everyday enhancement that adds length and definition without looking overdone.",
    duration: 90,
    price: 150,
    depositPercentage: 30,
    imageUrl: classicLash,
    category: "Lash Extensions",
    isActive: true,
  },
  {
    id: "2",
    name: "Volume Lash Extensions",
    description: "Dramatic, full lashes using handcrafted fans of lightweight extensions. Creates a glamorous, fluffy look that's perfect for special occasions or those who love bold lashes.",
    duration: 120,
    price: 220,
    depositPercentage: 30,
    imageUrl: volumeLash,
    category: "Lash Extensions",
    isActive: true,
  },
  {
    id: "3",
    name: "Hybrid Lash Set",
    description: "The best of both worlds - a beautiful blend of classic and volume techniques for a textured, wispy look that adds both length and fullness.",
    duration: 105,
    price: 185,
    depositPercentage: 30,
    imageUrl: lashCloseup,
    category: "Lash Extensions",
    isActive: true,
  },
  {
    id: "4",
    name: "Lash Lift & Tint",
    description: "Enhance your natural lashes with a semi-permanent lift and tint. No extensions needed - just beautifully curled and defined natural lashes that last 6-8 weeks.",
    duration: 60,
    price: 95,
    depositPercentage: 25,
    imageUrl: lashCloseup,
    category: "Natural Lash Services",
    isActive: true,
  },
  {
    id: "5",
    name: "Lash Fill - 2 Week",
    description: "Maintain your beautiful lash extensions with a 2-week infill appointment. Ideal for keeping your lashes looking fresh and full.",
    duration: 60,
    price: 75,
    depositPercentage: 20,
    imageUrl: classicLash,
    category: "Maintenance",
    isActive: true,
  },
  {
    id: "6",
    name: "Mega Volume Set",
    description: "Ultra-dramatic lashes for maximum impact. Using super-fine extensions in fans of 6-16 lashes for an incredibly full, glamorous look.",
    duration: 150,
    price: 280,
    depositPercentage: 30,
    imageUrl: volumeLash,
    category: "Lash Extensions",
    isActive: true,
  },
];

export const serviceCategories = [
  "Lash Extensions",
  "Natural Lash Services",
  "Maintenance",
];
