"use client";

import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export function WhatsAppFloatButton() {
  return (
    <button
      onClick={() => openWhatsApp("Hello Eventico, I would like to know more.")}
      aria-label="WhatsApp Us"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#2f4f3e] text-ivory flex items-center justify-center shadow-lg hover:bg-[#25402f] hover:scale-110 active:scale-95 transition-all duration-300"
    >
      <MessageCircle size={26} />
    </button>
  );
}

export function WhatsAppLink({
  message,
  className,
  children,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button onClick={() => openWhatsApp(message)} className={className}>
      {children}
    </button>
  );
}
