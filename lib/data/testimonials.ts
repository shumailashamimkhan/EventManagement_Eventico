export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  isPlaceholder: boolean;
};

// IMPORTANT: these are placeholders, not real testimonials — replace with
// genuine guest/partner quotes (and set isPlaceholder: false) before launch.
export const TESTIMONIALS: Testimonial[] = [
  { name: "Guest Name", role: "Event Guest", quote: "Placeholder quote — replace with a genuine guest testimonial.", isPlaceholder: true },
  { name: "Partner Name", role: "Sponsor / Vendor", quote: "Placeholder quote — replace with a genuine partner testimonial.", isPlaceholder: true },
  { name: "Guest Name", role: "Community Member", quote: "Placeholder quote — replace with a genuine testimonial.", isPlaceholder: true },
];
