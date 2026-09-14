-- Eventico — initial schema, triggers, and Row Level Security policies.
-- Run via `supabase db push` or paste into the Supabase SQL editor.

-- ============================================================
-- 1. PROFILES — one row per auth.users, holds role
-- ============================================================
create type public.user_role as enum ('CUSTOMER', 'ADMIN');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  phone text,
  role public.user_role not null default 'CUSTOMER',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Users can update own profile except role"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

-- Trigger: create a profiles row whenever a new auth user signs up.
-- Public signup ALWAYS results in role = 'CUSTOMER' — there is no client
-- path to request ADMIN. Create admin accounts manually via the Supabase
-- dashboard, then update their role directly:
--   update public.profiles set role = 'ADMIN' where email = '...';
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, phone, role)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    new.raw_user_meta_data->>'phone',
    'CUSTOMER'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 2. SERVICES
-- ============================================================
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  image_url text,
  image_path text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "Public can read active services"
  on public.services for select
  using (is_active = true);

create policy "Admins can manage services"
  on public.services for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- ============================================================
-- 3. GALLERY
-- ============================================================
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  location text,
  image_url text,
  image_path text,
  event_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gallery enable row level security;

create policy "Public can read gallery"
  on public.gallery for select
  using (true);

create policy "Admins can manage gallery"
  on public.gallery for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- ============================================================
-- 4. INQUIRIES
-- ============================================================
create type public.inquiry_status as enum (
  'NEW', 'CONTACTED', 'QUOTATION_SENT', 'CONFIRMED', 'COMPLETED', 'CANCELLED'
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  company text,
  phone text,
  email text not null,
  event_type text not null,
  event_date date,
  guest_count integer,
  message text,
  status public.inquiry_status not null default 'NEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Anyone (including anonymous visitors submitting the public form) can
-- create an inquiry. The API route sets user_id from the session if the
-- visitor happens to be logged in; it's null otherwise.
create policy "Anyone can submit an inquiry"
  on public.inquiries for insert
  with check (true);

create policy "Customers can view own inquiries"
  on public.inquiries for select
  using (auth.uid() = user_id);

create policy "Admins can view all inquiries"
  on public.inquiries for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- Customers cannot change status — only admins can update inquiries at all.
create policy "Admins can update inquiries"
  on public.inquiries for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

create policy "Admins can delete inquiries"
  on public.inquiries for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- ============================================================
-- 5. EVENTS
-- ============================================================
create table public.events (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid references public.inquiries(id) on delete set null,
  customer_id uuid references auth.users(id) on delete set null,
  event_name text not null,
  event_type text,
  event_date date,
  venue text,
  status public.inquiry_status not null default 'NEW',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "Customers can view own events"
  on public.events for select
  using (auth.uid() = customer_id);

create policy "Admins can manage events"
  on public.events for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- ============================================================
-- 6. TESTIMONIALS
-- ============================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  message text not null,
  rating integer check (rating between 1 and 5),
  image_url text,
  image_path text,
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "Public can read active testimonials"
  on public.testimonials for select
  using (is_active = true);

create policy "Admins can manage testimonials"
  on public.testimonials for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- ============================================================
-- 7. ADMIN NOTES — internal notes on inquiries, admin-only
-- ============================================================
create table public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.inquiries(id) on delete cascade,
  admin_id uuid references auth.users(id) on delete set null,
  note text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_notes enable row level security;

create policy "Admins can manage admin notes"
  on public.admin_notes for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- ============================================================
-- 8. updated_at triggers
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.services
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.gallery
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.inquiries
  for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.events
  for each row execute procedure public.set_updated_at();
