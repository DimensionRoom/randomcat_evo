-- WARNING (2026-10-16): this was run in production and replaced a live
-- definition of usage_by_country that had been edited directly in Supabase to
-- include per-country counts carried over from the old tracking system. Those
-- carried-over counts no longer appear in the view (the underlying data was not
-- deleted). Restore them by merging the previous live definition with the
-- first_seen/last_seen columns below; do not re-run this file as it stands.
--
-- Add when each country was first and last seen to the per-country summary, so
-- the admin "By country" table can flag countries that started visiting
-- recently. Computed over all events: deriving it in the page from
-- usage_by_day_and_country would be wrong once that view passes the API's
-- 1,000-row default, because the oldest days are the ones cut off.
-- Appended as the last columns so CREATE OR REPLACE VIEW accepts them.
create or replace view public.usage_by_country as
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
order by views desc;

-- Hardening: keep the view off the public API (admin reads via service role).
revoke all on public.usage_by_country from anon, authenticated;
