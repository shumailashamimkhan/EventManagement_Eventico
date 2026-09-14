import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Eventico",
  description: "Browse our portfolio of beautifully planned events and celebrations in Qatar.",
  openGraph: {
    title: "Gallery | Eventico",
    description: "Browse our portfolio of beautifully planned events and celebrations in Qatar.",
    images: ["/images/hero.jpg"],
  }
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
