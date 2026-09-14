"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { WhatsAppLink } from "@/components/whatsapp-button/WhatsAppButton";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-sand/95 backdrop-blur-md border-b border-stone shadow-sm py-2"
            : "bg-sand border-b border-transparent py-4"
        )}
      >
        <div className="wrap flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-semibold flex items-center gap-2.5">
            <span className="arch-mark w-4 h-[19px]" />
            Eventico
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex gap-8 text-sm font-medium" onMouseLeave={() => setHoveredLink(null)}>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="relative px-1 py-2">
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      className={cn("relative z-10 transition-colors", isActive ? "text-maroon" : "text-text-soft hover:text-maroon")}
                    >
                      {link.label}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-maroon"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {hoveredLink === link.href && !isActive && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-3.5">
            <WhatsAppLink
              message="Hello Eventico, I would like to know more."
              className="btn btn-whatsapp !py-2.5 !px-4.5"
            >
              WhatsApp Us
            </WhatsAppLink>
            <Link href="/login" className="btn btn-outline !py-2.5 !px-4.5">
              Login
            </Link>
          </div>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 transition-transform hover:scale-110 active:scale-95"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-sand p-7 flex flex-col"
          >
            <div className="flex justify-end">
              <button className="p-2 transition-transform hover:scale-110 active:scale-95" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={28} />
              </button>
            </div>
            <ul className="mt-12 mb-10 flex flex-col gap-6 font-serif text-3xl">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link href={link.href} onClick={() => setOpen(false)} className={pathname === link.href ? "text-maroon" : ""}>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + NAV_LINKS.length * 0.05 }}>
                <Link href="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </motion.li>
            </ul>
            <div className="mt-auto">
              <WhatsAppLink
                message="Hello Eventico, I would like to know more."
                className="btn btn-whatsapp w-full justify-center py-4 text-lg"
              >
                WhatsApp Us
              </WhatsAppLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
