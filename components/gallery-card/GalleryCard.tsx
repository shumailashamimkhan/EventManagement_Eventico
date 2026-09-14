"use client";

import Image from "next/image";
import type { GalleryItem } from "@/lib/data/gallery";

import { motion } from "framer-motion";

export function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick?: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="relative aspect-square overflow-hidden cursor-pointer group bg-stone"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <div className="text-white">
          <h4 className="font-serif text-base">{item.title}</h4>
          <p className="text-xs opacity-85">
            {item.category} · {item.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
