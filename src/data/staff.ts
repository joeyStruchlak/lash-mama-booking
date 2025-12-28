export interface StaffMember {
  id: string;
  name: string;
  title: string;
  tier: "premium" | "senior" | "junior";
  priceMultiplier: number;
  experience: string;
  bio: string;
  specialties: string[];
  imageUrl?: string;
  serviceCategories: string[]; // Which service categories this staff member can perform
}

export const staffMembers: StaffMember[] = [
  {
    id: "lash-mama",
    name: "Lash Mama",
    title: "Founder & Master Lash Artist",
    tier: "premium",
    priceMultiplier: 1.25, // 25% premium
    experience: "10+ Years Industry Experience",
    bio: "Award-winning lash artist and founder of Lash Mama Studio. Internationally certified with expertise in all lash techniques. Known for creating signature looks that enhance natural beauty.",
    specialties: ["Award Winner", "Master Certified", "Signature Techniques"],
    serviceCategories: ["mega-volume", "volume", "natural-hybrid", "bridal"],
  },
  {
    id: "nikki",
    name: "Nikki",
    title: "Senior Lash Artist",
    tier: "senior",
    priceMultiplier: 1.0, // Standard rate
    experience: "5+ Years Experience",
    bio: "Skilled senior artist specializing in volume and mega volume techniques. Known for attention to detail and creating stunning, long-lasting sets.",
    specialties: ["Volume Specialist", "Detail-Oriented", "Client Favorite"],
    serviceCategories: ["mega-volume", "volume", "natural-hybrid", "makeup", "hair-styling"],
  },
  {
    id: "beau",
    name: "Beau",
    title: "Senior Lash & Beauty Artist",
    tier: "senior",
    priceMultiplier: 1.0, // Standard rate
    experience: "6+ Years Experience",
    bio: "Versatile beauty artist with expertise in lashes, makeup, and hair styling. Perfect for bridal and special occasion looks.",
    specialties: ["Bridal Expert", "Multi-Talented", "Creative Stylist"],
    serviceCategories: ["volume", "natural-hybrid", "makeup", "hair-styling", "bridal", "packages"],
  },
  {
    id: "natali",
    name: "Natali",
    title: "Junior Lash Artist",
    tier: "junior",
    priceMultiplier: 0.85, // 15% discount
    experience: "1+ Year Experience",
    bio: "Talented junior artist trained by Lash Mama herself. All services performed under supervision to ensure quality. Your support helps nurture new talent in our industry.",
    specialties: ["Lash Mama Trained", "Supervised Sessions", "Fresh Talent"],
    serviceCategories: ["natural-hybrid", "makeup", "hair-styling"],
  },
];

export const staffNotes: Record<StaffMember["tier"], string> = {
  premium: "Premium rate for exclusive experience with our founder",
  senior: "Standard rate for experienced professionals",
  junior: "Discounted rate • All sessions supervised by Lash Mama • Your support is appreciated!",
};

// Get staff members available for a specific service category
export const getStaffForService = (serviceCategoryId: string): StaffMember[] => {
  return staffMembers.filter(staff => 
    staff.serviceCategories.includes(serviceCategoryId)
  );
};
