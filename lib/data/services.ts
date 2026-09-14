export type Service = {
  slug: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  isActive: boolean;
};

// Seed content — mirrors the `services` table shape. Once Supabase is
// connected, replace getServices() in lib/data/index.ts with a query
// against the `services` table instead of this static array.
export const SERVICES: Service[] = [
  {
    slug: "event-planning-management",
    title: "Event Planning & Management",
    description:
      "Complete planning and coordination from concept to execution.",
    features: ["Concept development", "Vendor coordination", "Full event management"],
    image: "/images/teamwork1.jpg",
    isActive: true,
  },
  {
    slug: "cultural-community-events",
    title: "Cultural & Community Events",
    description:
      "Events that celebrate traditions, culture and community connections.",
    features: ["Cultural programming", "Community outreach", "Traditions celebrated"],
    image: "/images/wedding1.jpg",
    isActive: true,
  },
  {
    slug: "family-events",
    title: "Family Events",
    description: "Family-friendly celebrations with activities and entertainment.",
    features: ["Kids' activities", "Entertainment booking", "Family-first planning"],
    image: "/images/birthday1.jpg",
    isActive: true,
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    description: "Professional gatherings, celebrations and corporate experiences.",
    features: ["Venue sourcing", "AV & production", "Guest management"],
    image: "/images/auditorium.jpg",
    isActive: true,
  },
  {
    slug: "entertainment-activities",
    title: "Entertainment & Activities",
    description:
      "Games, performances, children's activities and entertainment programmes.",
    features: ["Live performances", "Games & activities", "Stage production"],
    image: "/images/gala1.jpg",
    isActive: true,
  },
  {
    slug: "event-coordination",
    title: "Event Coordination",
    description:
      "Coordination of volunteers, vendors, sponsors, performers and event logistics.",
    features: ["Volunteer coordination", "Vendor & sponsor liaison", "On-site logistics"],
    image: "/images/ceoenergy.jpg",
    isActive: true,
  },
];

export const EVENT_TYPES = [
  "Event Planning & Management",
  "Cultural & Community Event",
  "Family Event",
  "Corporate Event",
  "Entertainment & Activities",
  "Event Coordination",
  "Other",
] as const;
