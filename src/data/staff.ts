import lashMamaImg from "@/assets/staff/lash-mama.jpg";
import nikkiImg from "@/assets/staff/nikki.jpg";
import beauImg from "@/assets/staff/beau.jpg";
import nataliImg from "@/assets/staff/natali.jpg";
import purniImg from "@/assets/staff/purni.jpg";

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  tier: "premium" | "senior" | "junior";
  priceMultiplier: number;
  experience: string;
  bio: string;
  specialties: string[];
  imageUrl: string;
  serviceCategories: string[];
}

export const staffMembers: StaffMember[] = [
  {
    id: "lash-mama",
    name: "Lash Mama",
    title: "Founder & Master Lash Artist",
    tier: "premium",
    priceMultiplier: 1.25,
    experience: "10+ Years Industry Experience • Award Winner",
    bio: "Award-winning lash artist and founder. Internationally certified with expertise in all lash techniques.",
    specialties: ["Award Winner", "Master Certified", "Signature Techniques"],
    imageUrl: lashMamaImg,
    serviceCategories: ["mega-volume", "volume", "natural-hybrid", "bridal"],
  },
  {
    id: "nikki",
    name: "Nikki",
    title: "Senior Lash Artist",
    tier: "senior",
    priceMultiplier: 1.0,
    experience: "5+ Years Experience",
    bio: "Skilled senior artist specializing in volume and mega volume techniques with stunning results.",
    specialties: ["Volume Specialist", "Detail-Oriented", "Client Favorite"],
    imageUrl: nikkiImg,
    serviceCategories: ["mega-volume", "volume", "natural-hybrid", "makeup", "hair-styling"],
  },
  {
    id: "beau",
    name: "Beau",
    title: "Senior Lash & Beauty Artist",
    tier: "senior",
    priceMultiplier: 1.0,
    experience: "6+ Years Experience",
    bio: "Versatile beauty artist with expertise in lashes, makeup, and hair styling for special occasions.",
    specialties: ["Bridal Expert", "Multi-Talented", "Creative Stylist"],
    imageUrl: beauImg,
    serviceCategories: ["volume", "natural-hybrid", "makeup", "hair-styling", "bridal", "packages"],
  },
  {
    id: "natali",
    name: "Natali",
    title: "Junior Lash Artist",
    tier: "junior",
    priceMultiplier: 0.85,
    experience: "1+ Year Experience • Trained by Lash Mama",
    bio: "Talented junior artist trained by Lash Mama. All services supervised to ensure quality.",
    specialties: ["Lash Mama Trained", "Supervised Sessions", "Fresh Talent"],
    imageUrl: nataliImg,
    serviceCategories: ["natural-hybrid", "makeup", "hair-styling"],
  },
];

export const ceoProfile = {
  id: "purni",
  name: "Purni",
  title: "CEO & Founder",
  bio: "Visionary entrepreneur behind Lash Mama.",
  imageUrl: purniImg
};

export const staffNotes: Record<StaffMember["tier"], string> = {
  premium: "Premium rate for exclusive experience with our founder",
  senior: "Standard rate for experienced professionals",
  junior: "Discounted rate • All sessions supervised by Lash Mama • Your support is appreciated! ✨",
};

export const getStaffForService = (serviceCategoryId: string): StaffMember[] => {
  return staffMembers.filter(staff => 
    staff.serviceCategories.includes(serviceCategoryId)
  );
};
