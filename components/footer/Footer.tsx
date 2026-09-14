import Link from "next/link";
import { WhatsAppLink } from "@/components/whatsapp-button/WhatsAppButton";

export function Footer() {
  return (
    <footer className="bg-[#1B0F0D] text-[#cfc4b6] pt-16 pb-8">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-serif text-xl text-white mb-3.5">Eventico</div>
            <p className="text-sm leading-relaxed max-w-[280px]">
              Eventico Management &amp; Organisation brings people together through
              thoughtfully planned, professionally organised events across Qatar.
            </p>
          </div>
          <div>
            <h5 className="text-white text-sm tracking-wider uppercase mb-4">Quick Links</h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/about" className="hover:text-gold transition-colors duration-300">About Us</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors duration-300">Services</Link></li>
              <li><Link href="/events" className="hover:text-gold transition-colors duration-300">Events</Link></li>
              <li><Link href="/gallery" className="hover:text-gold transition-colors duration-300">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-sm tracking-wider uppercase mb-4">Services</h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/services" className="hover:text-gold transition-colors duration-300">Event Planning &amp; Management</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors duration-300">Cultural &amp; Community Events</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors duration-300">Family Events</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors duration-300">Corporate Events</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-sm tracking-wider uppercase mb-4">Contact</h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>Doha, Qatar</li>
              <li>+974 4444 5566</li>
              <li>hello@eventico.qa</li>
              <li className="mt-1.5 flex gap-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300">Instagram</a>
                <span>·</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300">LinkedIn</a>
                <span>·</span>
                <WhatsAppLink message="Hello Eventico, I would like to know more." className="hover:text-gold transition-colors">
                  WhatsApp
                </WhatsAppLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#3a2a24] pt-6 flex flex-wrap justify-between gap-2.5 text-[13px]">
          <span>© 2026 Eventico Management &amp; Organisation. All rights reserved.</span>
          <span>Doha, Qatar</span>
        </div>
      </div>
    </footer>
  );
}
