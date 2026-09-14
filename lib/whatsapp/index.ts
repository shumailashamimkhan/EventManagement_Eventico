/**
 * WhatsApp click-to-chat (wa.me) helper — NOT the WhatsApp Business API.
 * Swapping to the Business API later means adding a server-side sender in
 * this same file (e.g. sendWhatsAppMessage()) and updating callers; the
 * deep-link builder below can stay as a fallback.
 */

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? process.env.WHATSAPP_NUMBER ?? "";

export function buildWhatsAppLink(message: string): string {
  if (!WHATSAPP_NUMBER) {
    // Fails loudly in dev rather than silently linking to a broken number.
    console.warn(
      "NEXT_PUBLIC_WHATSAPP_NUMBER is not set — WhatsApp links will be invalid."
    );
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppLink(message), "_blank");
}

export function inquiryWhatsAppMessage(params: {
  name: string;
  inquiryNumber: string;
  eventType: string;
  eventDate?: string | null;
  email: string;
  phone?: string | null;
}): string {
  const { name, inquiryNumber, eventType, eventDate, email, phone } = params;
  return (
    `Hello Eventico, this is ${name}. My inquiry ID is ${inquiryNumber}. ` +
    `Event type: ${eventType}. Preferred date: ${eventDate || "flexible"}. ` +
    `Email: ${email}.${phone ? ` Phone: ${phone}.` : ""}`
  );
}
