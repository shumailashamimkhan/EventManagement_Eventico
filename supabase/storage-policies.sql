-- Storage buckets for Eventico. Run after 0001_init.sql.
-- These buckets are PUBLIC for read (so <Image> can load them directly);
-- writes are restricted to admins.

insert into storage.buckets (id, name, public)
values
  ('gallery-images', 'gallery-images', true),
  ('service-images', 'service-images', true),
  ('testimonial-images', 'testimonial-images', true)
on conflict (id) do nothing;

-- Public read on all three buckets
create policy "Public read gallery-images"
  on storage.objects for select
  using (bucket_id = 'gallery-images');

create policy "Public read service-images"
  on storage.objects for select
  using (bucket_id = 'service-images');

create policy "Public read testimonial-images"
  on storage.objects for select
  using (bucket_id = 'testimonial-images');

-- Admin-only write (insert/update/delete) on all three buckets
create policy "Admins write gallery-images"
  on storage.objects for insert
  with check (
    bucket_id = 'gallery-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Admins modify gallery-images"
  on storage.objects for update
  using (
    bucket_id = 'gallery-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Admins delete gallery-images"
  on storage.objects for delete
  using (
    bucket_id = 'gallery-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Admins write service-images"
  on storage.objects for insert
  with check (
    bucket_id = 'service-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Admins modify service-images"
  on storage.objects for update
  using (
    bucket_id = 'service-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Admins delete service-images"
  on storage.objects for delete
  using (
    bucket_id = 'service-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Admins write testimonial-images"
  on storage.objects for insert
  with check (
    bucket_id = 'testimonial-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Admins modify testimonial-images"
  on storage.objects for update
  using (
    bucket_id = 'testimonial-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

create policy "Admins delete testimonial-images"
  on storage.objects for delete
  using (
    bucket_id = 'testimonial-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );
