-- Per-user activity summary derived from usage_events (read via service role).
-- Answers "how many times has this user used the site": sign_in_count (logins),
-- active_days (distinct days seen), page_views (total pages opened).
create or replace view public.user_activity as
select
  p.id            as user_id,
  p.email,
  p.full_name,
  count(*) filter (where e.event_type = 'sign_in')   as sign_in_count,
  count(*) filter (where e.event_type = 'page_view') as page_views,
  count(distinct date_trunc('day', e.created_at))    as active_days,
  min(e.created_at) as first_seen,
  max(e.created_at) as last_seen
from public.profiles p
left join public.usage_events e on e.user_id = p.id
group by p.id, p.email, p.full_name
order by last_seen desc nulls last;
