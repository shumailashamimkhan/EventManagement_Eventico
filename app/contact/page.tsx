import Image from "next/image";
import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { InquiryForm } from "@/components/inquiry-form/InquiryForm";
import { WhatsAppLink } from "@/components/whatsapp-button/WhatsAppButton";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Eventico",
  description: "Get in touch with Eventico to plan your next event in Qatar.",
  openGraph: {
    title: "Contact Us | Eventico",
    description: "Get in touch with Eventico to plan your next event in Qatar.",
    images: ["/images/professional.jpg"],
  }
};

const CONTACT_ROWS = [
  { icon: Phone, label: "Phone", value: "+974 4444 5566" },
  { icon: MessageCircle, label: "WhatsApp", value: "+974 5555 6677" },
  { icon: Mail, label: "Email", value: "hello@eventico.qa" },
  { icon: MapPin, label: "Location", value: "Doha, Qatar" },
  { icon: Clock, label: "Business Hours", value: "Sun–Thu, 9:00 AM – 6:00 PM" },
];

export default function ContactPage() {
  return (
    <div>
      <FadeIn direction="down" className="py-16 text-center border-b border-stone">
        <div className="wrap">
          <div className="eyebrow">Get in touch</div>
          <h1 className="font-serif text-4xl font-medium my-3">Let&apos;s Plan Your Next Event</h1>
          <p className="text-text-soft max-w-xl mx-auto">
            Have an event idea? Let&apos;s turn it into an experience — we
            typically respond within one business day.
          </p>
        </div>
      </FadeIn>

      <section className="py-[88px]">
        <FadeIn className="wrap grid lg:grid-cols-[1fr_1.3fr] gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold flex-shrink-0">
                <Image src="/images/professional.jpg" alt="Eventico Contact" fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <strong className="block font-serif text-lg">Faiza Hashmat</strong>
                <span className="text-xs text-text-soft uppercase tracking-wider">Event Director</span>
              </div>
            </div>
            {CONTACT_ROWS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3.5 mb-5.5">
                <div className="w-9 h-9 rounded-full border border-gold text-gold flex items-center justify-center flex-shrink-0">
                  <Icon size={16} />
                </div>
                <div>
                  <strong className="block text-sm">{label}</strong>
                  <span className="text-[13px] text-text-soft">{value}</span>
                </div>
              </div>
            ))}
            <WhatsAppLink
              message="Hello Eventico, I would like to know more."
              className="btn btn-whatsapp w-full justify-center mt-2.5 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Chat on WhatsApp
            </WhatsAppLink>
          </div>

          <div className="bg-ivory border border-stone p-10">
            <h2 className="font-serif text-2xl font-medium mb-1">Send Event Inquiry</h2>
            <p className="text-text-soft text-sm mb-6.5">
              Fields marked <span className="text-maroon">*</span> are required.
            </p>
            <InquiryForm />
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
