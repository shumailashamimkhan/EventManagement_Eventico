import { EVENT_TYPES } from "@/lib/data/services";

export type InquiryInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  guestCount?: number | string;
  message?: string;
};

export type ValidationResult =
  | { valid: true; data: InquiryInput }
  | { valid: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server-side validation for the event inquiry form. Always call this in
 * the API route, in addition to (not instead of) any client-side checks —
 * client-side validation is only a UX nicety and can be bypassed entirely.
 */
export function validateInquiry(input: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (typeof input !== "object" || input === null) {
    return { valid: false, errors: { _form: "Invalid submission." } };
  }

  const body = input as Record<string, unknown>;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const eventType = typeof body.eventType === "string" ? body.eventType.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : undefined;
  const phone = typeof body.phone === "string" ? body.phone.trim() : undefined;
  const eventDate = typeof body.eventDate === "string" ? body.eventDate.trim() : undefined;
  const message = typeof body.message === "string" ? body.message.trim() : undefined;
  const guestCount =
    typeof body.guestCount === "number" || typeof body.guestCount === "string"
      ? body.guestCount
      : undefined;

  if (!name) errors.name = "Name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!eventType) {
    errors.eventType = "Event type is required.";
  } else if (!EVENT_TYPES.includes(eventType as (typeof EVENT_TYPES)[number])) {
    errors.eventType = "Select a valid event type.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: { name, company, email, phone, eventType, eventDate, guestCount, message },
  };
}
