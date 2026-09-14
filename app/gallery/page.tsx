"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { GALLERY, GALLERY_CATEGORIES, type GalleryItem } from "@/lib/data/gallery";
import { GalleryCard } from "@/components/gallery-card/GalleryCard";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

const FILTERS = ["All", ...GALLERY_CATEGORIES] as const;

export default function GalleryPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <div>
      <FadeIn direction="down" className="py-16 text-center border-b border-stone">
        <div className="wrap">
          <div className="eyebrow">Our work</div>
          <h1 className="font-serif text-4xl font-medium my-3">Moments We&apos;ve Created</h1>
          <p className="text-text-soft max-w-xl mx-auto">
            A look at the events we&apos;ve had the privilege to bring to
            life across Qatar.
          </p>
        </div>
      </FadeIn>

      <section className="py-[88px]">
        <div className="wrap">
          <FadeIn direction="up" className="flex gap-2.5 flex-wrap justify-center mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4.5 py-2.5 border border-stone text-sm font-semibold text-text-soft transition-all hover:scale-105 active:scale-95",
                  filter === f && "bg-maroon text-ivory border-maroon"
                )}
              >
                {f}
              </button>
            ))}
          </FadeIn>

          {items.length === 0 ? (
            <p className="text-center text-text-soft py-10">
              No photos yet in this category — real event photography will
              be added here.
            </p>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4.5">
              <AnimatePresence>
                {items.map((item) => (
                  <GalleryCard key={item.id} item={item} onClick={() => setActive(item)} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-10"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-8 text-white"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X size={30} />
          </button>
          <div
            className="bg-ivory max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3]">
              <Image src={active.image} alt={active.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 600px" />
            </div>
            <div className="p-6">
              <div className="eyebrow">{active.category}</div>
              <h3 className="font-serif text-xl my-1.5">{active.title}</h3>
              <p className="text-sm text-text-soft">
                {active.location} · {active.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
