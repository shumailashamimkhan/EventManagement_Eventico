# Eventico — Next.js + Supabase

Event planning & management website for Eventico, built with Next.js 14
(App Router), TypeScript, Tailwind CSS, and Supabase (Postgres, Auth,
Storage, RLS).

## Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js Route Handlers (`app/api/*`)
- **Database / Auth / Storage:** Supabase, accessed via `@supabase/supabase-js`
  + `@supabase/ssr` — no ORM
- **WhatsApp:** `wa.me` click-to-chat deep links (see `lib/whatsapp`)

## Getting started

```bash
npm install
cp .env.example .env.local
# fill in .env.local with your Supabase project's URL/keys
npm run dev
```

Open http://localhost:3000.

## Setting up Supabase

1. Create a project at https://supabase.com.
2. Copy the Project URL and anon key into `.env.local` as
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Copy the
   service role key into `SUPABASE_SERVICE_ROLE_KEY` (server-only — never
   expose this to the browser or commit it).
3. Run the migration in the Supabase SQL editor, in order:
   - `supabase/migrations/0001_init.sql` — tables, RLS policies, triggers
   - `supabase/storage-policies.sql` — storage buckets + policies
   - `supabase/seed.sql` (optional) — seeds services/gallery with the same
     content currently in `lib/data/*.ts`
4. Create your first admin account:
   - Sign up normally through `/signup` (this always creates a `CUSTOMER`).
   - In the Supabase dashboard, run:
     ```sql
     update public.profiles set role = 'ADMIN' where email = 'you@example.com';
     ```

## Where things stand

- **Public pages** (Home, About, Services, Events, Gallery, Contact) render
  from static content in `lib/data/*.ts` — not yet wired to Supabase. This
  matches the current content exactly; swapping to live data means adding
  a `supabase.from(...).select()` call in each page instead of importing
  from `lib/data`.
- **Auth** (`/login`, `/signup`) and the **inquiry form** (`/contact`) are
  fully wired to Supabase already.
- **Dashboards** (`/dashboard/customer`, `/dashboard/admin`) query
  Supabase live and are protected by both a server-side redirect and RLS.
- **Photos**: real event photography lives in `public/images/`. The
  Events page's "Moments From August Fiesta" gallery is explicitly flagged
  in the UI as placeholder photography (borrowed from other shoots) —
  swap in real August Fiesta 2026 photos when available.
- **Testimonials** are placeholders (see `lib/data/testimonials.ts`) and
  intentionally excluded from the seed data — add real ones before launch.
- **Leadership names/titles** on the About page (Faiza Hashmat — Owner,
  Shumaila Khalid — Managing Partner) are sourced from a news article and
  flagged on-page as needing confirmation from the company.

## Project structure

```
app/
  page.tsx                  Home
  about/ services/ events/ gallery/ contact/ login/ signup/
  dashboard/{customer,admin}/
  api/inquiries/route.ts

components/
  navbar/ footer/ whatsapp-button/ inquiry-form/
  service-card/ gallery-card/ testimonial-card/ ui/

lib/
  supabase/{client.ts,server.ts,middleware.ts}
  whatsapp/ validation/ data/

supabase/
  migrations/0001_init.sql
  storage-policies.sql
  seed.sql
```

## WhatsApp Business API migration path

`lib/whatsapp/index.ts` currently builds `wa.me` links only. To move to the
WhatsApp Business API later, add a server-side sender function in that same
file and swap the call sites in `InquiryForm.tsx` / `WhatsAppButton.tsx` —
the rest of the app doesn't need to change.
