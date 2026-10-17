-- Restore the old system's per-country counts to usage_by_country.
--
-- The live view had been edited in Supabase to add public.country_seed (views
-- per country carried over from the old tracking system) to the counts from
-- usage_events. Migration 0010 replaced it with an events-only definition, so
-- the 22 countries known only from the old system dropped out and the others
-- lost their carried-over views (e.g. Thailand 1,965 -> 1,081; the difference
-- is exactly its 884 seed views).
--
-- This keeps 0010's first_seen / last_seen and adds the seed back:
--   views            = event views + seed views
--   unique_visitors,
--   unique_users     = from events only (the seed has views only)
--   first_seen,
--   last_seen        = from events only; null for seed-only countries, which
--                      is right for the dashboard's "new country" flag
-- Same columns, order and types as 0010, so CREATE OR REPLACE VIEW accepts it.
-- Countries are joined on the stored text; the dashboard merges spellings
-- (e.g. "TH" and "Thailand") afterwards.
create or replace view public.usage_by_country as
with events as (
  select
    coalesce(country, 'unknown') as country,
    count(*) as views,
    count(distinct visitor_id) as unique_visitors,
    count(distinct user_id) as unique_users,
    min(created_at) as first_seen,
    max(created_at) as last_seen
  from public.usage_events
  where event_type = 'page_view'
  group by 1
),
seed as (
  select country, sum(views)::bigint as views
  from public.country_seed
  group by country
)
select
  coalesce(e.country, s.country) as country,
  coalesce(e.views, 0) + coalesce(s.views, 0) as views,
  coalesce(e.unique_visitors, 0) as unique_visitors,
  coalesce(e.unique_users, 0) as unique_users,
  e.first_seen,
  e.last_seen
from events e
full outer join seed s on s.country = e.country
order by views desc;

-- Hardening: keep the view off the public API (admin reads via service role).
revoke all on public.usage_by_country from anon, authenticated;
