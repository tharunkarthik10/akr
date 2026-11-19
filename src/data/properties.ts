export interface PropertyItem {
  id: string;
  title: string;
  price: string;
  currency: string;
  type: string;
  property_status: string;
  location: string;
  bedrooms: number | string;
  bathrooms: number | string;
  size: string;
  images: string[];
  tag?: string;
  developer?: string;
  description?: string;
  amenities?: string | string[];
  nearby_places?: string;
  property_features?: string;
  floor_plans?: string;
  payment_plan?: string;
  video_url?: string;
  status?: string;
  created_at?: string;
}

export const curatedExclusiveProperties: PropertyItem[] = [
  {
    id: 'exc-1',
    title: "The Royal Penthouse — Palm Jumeirah",
    price: "45000000",
    currency: "AED",
    type: "Penthouse",
    property_status: "Off-Market",
    location: "Palm Jumeirah, Dubai",
    bedrooms: 6,
    bathrooms: 7,
    size: "14,500",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"],
    tag: "TROPHY ASSET",
    developer: "Omniyat",
    description: "An ultra-luxurious penthouse perched above the Palm Jumeirah with 360-degree unobstructed vistas of the Arabian Gulf and Dubai skyline. Designed to international trophy asset standards.",
    amenities: "Private Infinity Pool, Concierge, Valet, Private Elevator, Spa & Wellness, Helipad Access",
    nearby_places: JSON.stringify(["Atlantis The Royal - 3 mins", "Dubai Marina - 10 mins", "Downtown Dubai - 20 mins"]),
    property_features: JSON.stringify(["Double-height ceilings", "Private sky garden", "Designer Italian kitchen", "Smart home automation"]),
    payment_plan: JSON.stringify({ downPayment: "20%", duringConstruction: "40%", onHandover: "40%" })
  },
  {
    id: 'exc-2',
    title: "Emirates Hills Sovereign Villa",
    price: "72000000",
    currency: "AED",
    type: "Villa",
    property_status: "By Invitation",
    location: "Emirates Hills, Dubai",
    bedrooms: 8,
    bathrooms: 10,
    size: "22,000",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80"],
    tag: "INVITATION ONLY",
    developer: "Emaar",
    description: "An architectural masterpiece in Dubai's most prestigious gated enclave. Overlooking Montgomerie Golf Course, this palatial residence boasts sprawling manicured grounds and supreme privacy.",
    amenities: "Championship Golf Views, Private Cinema, 12-Car Basement, Wine Cellar, Staff Quarters",
    nearby_places: JSON.stringify(["Montgomerie Golf Club - 1 min", "Dubai Marina - 8 mins", "Mall of the Emirates - 12 mins"]),
    property_features: JSON.stringify(["Custom marble finishes", "Indoor heated pool", "Security control room", "Lush landscaped gardens"]),
    payment_plan: JSON.stringify({ downPayment: "100%", duringConstruction: "Ready", onHandover: "Immediate" })
  },
  {
    id: 'exc-3',
    title: "Downtown Sky Mansion",
    price: "38000000",
    currency: "AED",
    type: "Penthouse",
    property_status: "Off-Market",
    location: "Downtown Dubai",
    bedrooms: 5,
    bathrooms: 6,
    size: "11,200",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"],
    tag: "OFF-MARKET",
    developer: "Emaar Properties",
    description: "A triplex sky mansion with direct, front-row panoramas of Burj Khalifa and the Dubai Fountains. Crafted for high-net-worth investors seeking unrivaled prestige in the city center.",
    amenities: "Burj Khalifa Views, 24/7 Butler Service, Executive Boardroom, Cigar Lounge, Rooftop Jacuzzi",
    nearby_places: JSON.stringify(["Dubai Mall - Direct Access", "Dubai Opera - 3 mins", "DIFC - 5 mins"]),
    property_features: JSON.stringify(["Private pool terrace", "Floor-to-ceiling soundproof glass", "Sub-Zero appliances"]),
    payment_plan: JSON.stringify({ downPayment: "30%", duringConstruction: "30%", onHandover: "40%" })
  },
  {
    id: 'exc-4',
    title: "Jumeirah Bay Island Waterfront Estate",
    price: "95000000",
    currency: "AED",
    type: "Villa",
    property_status: "Ready to Move",
    location: "Jumeirah Bay Island, Dubai",
    bedrooms: 7,
    bathrooms: 9,
    size: "18,000",
    images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"],
    tag: "PRIVATE ISLAND",
    developer: "Meraas",
    description: "Located on the exclusive seahorse-shaped Jumeirah Bay Island, this beachfront mansion offers a private yacht berth, private white sand beach, and supreme seclusion.",
    amenities: "Private Beach, Private Yacht Berth, Bulgari Resort Access, Infinity Pool, Smart Security",
    nearby_places: JSON.stringify(["Bulgari Resort & Marina - 2 mins", "Downtown Dubai - 10 mins", "DXB Airport - 18 mins"]),
    property_features: JSON.stringify(["Direct sea access", "Zen water courtyards", "Wellness spa suite", "Full yacht mooring"]),
    payment_plan: JSON.stringify({ downPayment: "100%", duringConstruction: "Ready", onHandover: "Immediate" })
  },
  {
    id: 'prop-5',
    title: "Dubai Hills Signature Golf Villa",
    price: "28500000",
    currency: "AED",
    type: "Villa",
    property_status: "Ready to Move",
    location: "Dubai Hills Estate",
    bedrooms: 6,
    bathrooms: 7,
    size: "9,800",
    images: ["https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80"],
    tag: "EXCLUSIVE",
    developer: "Emaar",
    description: "Modern luxury family villa directly overlooking the Dubai Hills 18-hole championship golf course with private pool and rooftop entertaining terrace.",
    amenities: "Golf Course Frontage, Private Pool, Rooftop Terrace, Maid & Driver Quarters",
    nearby_places: JSON.stringify(["Dubai Hills Mall - 5 mins", "King's College Hospital - 4 mins", "Downtown Dubai - 15 mins"]),
    property_features: JSON.stringify(["Contemporary open layout", "Show & grease kitchens", "Smart lighting system"]),
    payment_plan: JSON.stringify({ downPayment: "100%", duringConstruction: "Ready", onHandover: "Immediate" })
  },
  {
    id: 'prop-6',
    title: "One Canal Luxury Waterfront Residence",
    price: "19200000",
    currency: "AED",
    type: "Apartment",
    property_status: "Off-Plan",
    location: "Dubai Water Canal, Al Wasl",
    bedrooms: 4,
    bathrooms: 5,
    size: "5,400",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"],
    tag: "NEW LAUNCH",
    developer: "Farglory / Sankari",
    description: "Ultra-luxury canal-front residences with private sky pools and lush green terraces designed by world-renowned architects.",
    amenities: "Canal Boardwalk, Sky Pool, Private Dining Suite, Luxury Concierge",
    nearby_places: JSON.stringify(["Safa Park - 2 mins", "Jumeirah Beach - 5 mins", "Downtown Dubai - 7 mins"]),
    property_features: JSON.stringify(["Private plunge pool", "Waterfront balconies", "High-ceiling living room"]),
    payment_plan: JSON.stringify({ downPayment: "20%", duringConstruction: "60%", onHandover: "20%" })
  }
];

export const fallbackProperties = curatedExclusiveProperties;
