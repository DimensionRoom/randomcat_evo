-- Reporting view: page views grouped by day AND country, so the admin
-- "Users per day" chart can break each day's visitors down by country
-- (read via service role).
create or replace view public.usage_by_day_and_country as
select
  date_trunc('day', created_at) as day,
  coalesce(country, 'unknown') as country,
  count(distinct visitor_id) as unique_visitors,
  count(*) as views,
  count(distinct user_id) as unique_users
from public.usage_events
where event_type = 'page_view'
group by 1, 2
order by 1 desc;

-- Hardening: keep the view off the public API (admin reads via service role).
revoke all on public.usage_by_day_and_country from anon, authenticated;
