export type GalleryCategory =
  | "Community Events"
  | "Cultural Celebrations"
  | "Family Activities"
  | "Entertainment"
  | "Behind the Scenes";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Community Events",
  "Cultural Celebrations",
  "Family Activities",
  "Entertainment",
  "Behind the Scenes",
];

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  location: string;
  date: string;
  image: string;
};

// Placeholder photography — see README. Swap for real event photos once
// available, ideally sourced from Supabase Storage (`gallery-images` bucket)
// via lib/data/index.ts once that table has rows.
export const GALLERY: GalleryItem[] = [
  { id: "g1", title: "Live Conference Production", category: "Behind the Scenes", location: "Doha Exhibition Center", date: "Mar 2026", image: "/images/conference1.jpg" },
  { id: "g2", title: "Wedding Stage Design", category: "Community Events", location: "The Pearl", date: "Feb 2026", image: "/images/wedding1.jpg" },
  { id: "g3", title: "Evening Gala", category: "Entertainment", location: "Sheraton Doha", date: "Jan 2026", image: "/images/gala1.jpg" },
  { id: "g4", title: "Rose Gold Birthday Celebration", category: "Family Activities", location: "Al Waab", date: "Dec 2025", image: "/images/birthday1.jpg" },
  { id: "g5", title: "Fairy-Light Wedding Mandap", category: "Cultural Celebrations", location: "Lusail", date: "Nov 2025", image: "/images/backdrop1.jpg" },
  { id: "g6", title: "Auditorium Keynote Session", category: "Behind the Scenes", location: "Qatar National Convention Centre", date: "Oct 2025", image: "/images/auditorium.jpg" },
  { id: "g7", title: "Crystal Canopy Reception", category: "Cultural Celebrations", location: "Katara", date: "Sep 2025", image: "/images/backdrop2.jpg" },
  { id: "g8", title: "Guest Registration & Gifting", category: "Behind the Scenes", location: "West Bay", date: "Aug 2025", image: "/images/giftsuite.jpg" },
  { id: "g9", title: "Candlelit Reception Design", category: "Cultural Celebrations", location: "Lusail", date: "Jul 2025", image: "/images/wedding2.jpg" },
  { id: "g10", title: "Ballroom Evening", category: "Entertainment", location: "Ritz-Carlton Doha", date: "Jun 2025", image: "/images/jewelleryeditor.jpg" },
  { id: "g11", title: "Grand Ballroom Reception", category: "Cultural Celebrations", location: "Four Seasons Doha", date: "May 2025", image: "/images/grandballroom.jpg" },
  { id: "g12", title: "Ethereal Greenhouse Reception", category: "Cultural Celebrations", location: "Msheireb", date: "Apr 2025", image: "/images/greenhouse.jpg" },
  { id: "g13", title: "Crystal Arch Ceremony", category: "Cultural Celebrations", location: "West Bay", date: "Mar 2025", image: "/images/modernwedding.jpg" },
  { id: "g14", title: "Floral Arch Aisle", category: "Cultural Celebrations", location: "The Pearl", date: "Feb 2025", image: "/images/floralarch.jpg" },
  { id: "g15", title: "Suspended Floral Canopy", category: "Cultural Celebrations", location: "Lusail", date: "Jan 2025", image: "/images/floralcanopy.jpg" },
  { id: "g16", title: "Coordination & Planning Session", category: "Behind the Scenes", location: "Office", date: "Dec 2024", image: "/images/ceoenergy.jpg" },
  { id: "g17", title: "Black & Gold Tablescape", category: "Entertainment", location: "St. Regis Doha", date: "Nov 2024", image: "/images/blackstone.jpg" },
];
