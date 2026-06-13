-- Usage events: page views and sign-ins, logged-in and anonymous.
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('page_view', 'sign_in')),
  path text,
  locale text,
  user_id uuid references auth.users (id) on delete set null,
  visitor_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists usage_events_created_at_idx
  on public.usage_events (created_at);
create index if not exists usage_events_path_idx
  on public.usage_events (path);
create index if not exists usage_events_user_id_idx
  on public.usage_events (user_id);

alter table public.usage_events enable row level security;

-- Anyone (anon or authenticated) may INSERT, but a row's user_id must either be
-- null (anonymous) or equal the caller's own id (no spoofing).
create policy "Anyone can insert their own usage events"
  on public.usage_events for insert
  to anon, authenticated
  with check (
    (auth.uid() is null and user_id is null)
    or (auth.uid() = user_id)
  );

-- No SELECT policy: only the service role (Supabase dashboard) can read.

-- Reporting views (read via service role in the SQL editor).
create or replace view public.usage_daily as
select
  date_trunc('day', created_at) as day,
  count(*) as views,
  count(distinct visitor_id) as unique_visitors,
  count(distinct user_id) as unique_users
from public.usage_events
where event_type = 'page_view'
group by 1
order by 1 desc;

create or replace view public.usage_by_path as
select
  path,
  count(*) as views,
  count(*) filter (where user_id is not null) as logged_in_views,
  count(*) filter (where user_id is null) as anon_views
from public.usage_events
where event_type = 'page_view'
group by path
order by views desc;
