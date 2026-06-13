-- Single-row totals for the dashboard summary / donut (read via service role).
create or replace view public.usage_totals as
select
  count(*) filter (where event_type = 'page_view') as page_views,
  count(*) filter (where event_type = 'sign_in')   as sign_ins,
  count(distinct visitor_id) as unique_visitors,
  count(distinct user_id)    as unique_users,
  count(distinct visitor_id) filter (where user_id is not null) as logged_in_visitors,
  count(distinct visitor_id) filter (where user_id is null)     as anonymous_visitors
from public.usage_events;

revoke all on public.usage_totals from anon, authenticated;
