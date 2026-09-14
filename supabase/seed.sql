-- Seed data matching lib/data/*.ts, so the live Supabase-backed site shows
-- the same content as the static demo. Run after 0001_init.sql.
-- Image URLs point at /images/*.jpg (public folder) for now — replace with
-- Supabase Storage URLs once real photos are uploaded to the buckets.

insert into public.services (title, slug, description, image_url, is_active) values
  ('Event Planning & Management', 'event-planning-management', 'Complete planning and coordination from concept to execution.', '/images/teamwork1.jpg', true),
  ('Cultural & Community Events', 'cultural-community-events', 'Events that celebrate traditions, culture and community connections.', '/images/wedding1.jpg', true),
  ('Family Events', 'family-events', 'Family-friendly celebrations with activities and entertainment.', '/images/birthday1.jpg', true),
  ('Corporate Events', 'corporate-events', 'Professional gatherings, celebrations and corporate experiences.', '/images/auditorium.jpg', true),
  ('Entertainment & Activities', 'entertainment-activities', 'Games, performances, children''s activities and entertainment programmes.', '/images/gala1.jpg', true),
  ('Event Coordination', 'event-coordination', 'Coordination of volunteers, vendors, sponsors, performers and event logistics.', '/images/ceoenergy.jpg', true);

insert into public.gallery (title, category, location, event_date, image_url) values
  ('Live Conference Production', 'Behind the Scenes', 'Doha Exhibition Center', '2026-03-01', '/images/conference1.jpg'),
  ('Wedding Stage Design', 'Cultural Celebrations', 'The Pearl', '2026-02-01', '/images/wedding1.jpg'),
  ('Evening Gala', 'Entertainment', 'Sheraton Doha', '2026-01-01', '/images/gala1.jpg'),
  ('Rose Gold Birthday Celebration', 'Family Activities', 'Al Waab', '2025-12-01', '/images/birthday1.jpg'),
  ('Fairy-Light Wedding Mandap', 'Cultural Celebrations', 'Lusail', '2025-11-01', '/images/backdrop1.jpg'),
  ('Auditorium Keynote Session', 'Behind the Scenes', 'Qatar National Convention Centre', '2025-10-01', '/images/auditorium.jpg');

-- No rows inserted into testimonials — replace the placeholders in
-- lib/data/testimonials.ts with genuine quotes, then insert them here with
-- is_active = true.
