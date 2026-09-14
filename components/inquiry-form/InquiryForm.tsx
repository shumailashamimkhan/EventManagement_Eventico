"use client";

import { useState } from "react";
import { EVENT_TYPES } from "@/lib/data/services";
import { buildWhatsAppLink, inquiryWhatsAppMessage } from "@/lib/whatsapp";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "success"; inquiryNumber: string; whatsappUrl: string };

export function InquiryForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventType) {
      setState({
        status: "error",
        message: "Please fill in Name, Email, and Event Type before submitting.",
      });
      return;
    }

    setState({ status: "submitting" });

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setState({
          status: "error",
          message: data?.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      const whatsappUrl = buildWhatsAppLink(
        inquiryWhatsAppMessage({
          name: form.name,
          inquiryNumber: data.inquiryNumber,
          eventType: form.eventType,
          eventDate: form.eventDate,
          email: form.email,
          phone: form.phone,
        })
      );

      setState({ status: "success", inquiryNumber: data.inquiryNumber, whatsappUrl });
    } catch {
      setState({
        status: "error",
        message: "Could not reach the server. Please try again.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <div className="text-center py-5">
        <div className="arch-mark mb-4.5" />
        <h3 className="text-lg font-medium mb-2">Message Sent</h3>
        <p className="text-sm text-text-soft mb-6">
          Your message has been sent successfully. We will get back to you soon.
        </p>
        <p className="text-sm text-text-soft mb-1.5">Your reference number is</p>
        <p className="font-serif text-2xl text-maroon mb-6">{state.inquiryNumber}</p>
        <a
          href={state.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-whatsapp w-full justify-center"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" required>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
        </Field>
        <Field label="Company / Organisation">
          <input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Optional" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone">
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+974 ..." />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Event Type" required>
          <select value={form.eventType} onChange={(e) => update("eventType", e.target.value)}>
            <option value="">Select event type</option>
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Event Date">
          <input type="date" value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} />
        </Field>
      </div>
      <Field label="Number of Guests">
        <input
          type="number"
          value={form.guestCount}
          onChange={(e) => update("guestCount", e.target.value)}
          placeholder="Estimated guest count"
        />
      </Field>
      <Field label="Message">
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us about your event..."
          rows={4}
        />
      </Field>

      {state.status === "error" && (
        <p className="text-maroon text-sm -mt-2.5 mb-4">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="btn btn-maroon w-full justify-center disabled:opacity-60"
      >
        {state.status === "submitting" ? "Sending..." : "Send Event Inquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 w-full [&_input]:w-full [&_select]:w-full [&_textarea]:w-full [&_input]:px-3.5 [&_input]:py-3 [&_select]:px-3.5 [&_select]:py-3 [&_textarea]:px-3.5 [&_textarea]:py-3 [&_input]:border [&_select]:border [&_textarea]:border [&_input]:border-stone [&_select]:border-stone [&_textarea]:border-stone [&_input]:bg-sand [&_select]:bg-sand [&_textarea]:bg-sand [&_textarea]:resize-y">
      <label className="block text-sm font-semibold mb-1.5">
        {label} {required && <span className="text-maroon">*</span>}
      </label>
      {children}
    </div>
  );
}
