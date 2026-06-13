-- Add visitor country (ISO-3166 alpha-2) to usage events, sourced from Vercel's
-- x-vercel-ip-country edge header via the tt_country cookie.
alter table public.usage_events add column if not exists country text;

create index if not exists usage_events_country_idx
  on public.usage_events (country);

-- Reporting view: page views grouped by country (read via service role).
create or replace view public.usage_by_country as
select
  coalesce(country, 'unknown') as country,
  count(*) as views,
  count(distinct visitor_id) as unique_visitors,
  count(distinct user_id) as unique_users
from public.usage_events
where event_type = 'page_view'
group by 1
order by views desc;
