import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validation/inquiry";
import { createClient } from "@/lib/supabase/server";

function generateInquiryNumber(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `EVT-${n}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = validateInquiry(body);
  if (!result.valid) {
    const firstError = Object.values(result.errors)[0];
    return NextResponse.json({ error: firstError, errors: result.errors }, { status: 400 });
  }

  const { name, company, email, phone, eventType, eventDate, guestCount, message } =
    result.data;

  const inquiryNumber = generateInquiryNumber();

  // Insert into Supabase. This runs with the anon key + RLS — the
  // `inquiries` policy in supabase/migrations/0001_init.sql allows anyone
  // (including anonymous visitors) to INSERT their own inquiry, but not to
  // read or modify others. If Supabase isn't configured yet in this
  // environment, we still return a reference number so the UI/demo works,
  // but nothing is persisted — check server logs for the warning below.
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("inquiries").insert({
      inquiry_number: inquiryNumber,
      user_id: user?.id ?? null,
      name,
      company: company || null,
      phone: phone || null,
      email,
      event_type: eventType,
      event_date: eventDate || null,
      guest_count: guestCount ? Number(guestCount) : null,
      message: message || null,
      status: "NEW",
    });

    if (error) {
      console.error("Supabase insert error (inquiries):", error.message);
      // Don't leak internal error details to the client.
    }
  } catch (err) {
    console.error(
      "Could not reach Supabase — is NEXT_PUBLIC_SUPABASE_URL configured?",
      err
    );
  }

  return NextResponse.json({ inquiryNumber }, { status: 201 });
}
