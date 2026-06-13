-- Track coarse device class (mobile / tablet / desktop) per usage event.
alter table public.usage_events add column if not exists device text;

create index if not exists usage_events_device_idx
  on public.usage_events (device);

-- Reporting view: page views grouped by device (read via service role).
create or replace view public.usage_by_device as
select
  coalesce(device, 'unknown') as device,
  count(*) as views,
  count(distinct visitor_id) as unique_visitors,
  count(distinct user_id) as unique_users
from public.usage_events
where event_type = 'page_view'
group by 1
order by views desc;

-- Hardening: keep the view off the public API (admin reads via service role).
revoke all on public.usage_by_device from anon, authenticated;
