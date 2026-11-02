-- Run this in the SQL Editor of the Supabase project used by this website.
-- This script creates a private-to-read inquiry inbox. Public visitors may
-- INSERT through the publishable key, but cannot SELECT, UPDATE, or DELETE.
-- For stronger abuse protection, enable Upstash on the Next.js API route
-- or switch to a server-only Supabase secret key later.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  business text check (char_length(business) <= 150),
  type text not null check (type in ('landing', 'business', 'app', 'redesign', 'other')),
  budget text check (char_length(budget) <= 150),
  timeline text check (char_length(timeline) <= 150),
  description text not null check (char_length(description) between 20 and 5000),
  language text not null default 'en' check (language in ('en', 'es')),
  consent boolean not null check (consent is true),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;

-- The public API can create leads, but it cannot read or manage them.
revoke all on table public.inquiries from public, anon, authenticated;
grant insert (name, email, business, type, budget, timeline, description, language, consent)
  on table public.inquiries to anon;

drop policy if exists "Allow public inquiry submissions" on public.inquiries;
create policy "Allow public inquiry submissions"
  on public.inquiries
  for insert
  to anon
  with check (consent is true);

-- No SELECT, UPDATE, or DELETE policy is created for anon or authenticated.
-- View and manage inquiries from the Supabase dashboard or trusted admin tools.
