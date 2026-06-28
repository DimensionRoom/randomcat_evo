-- Add the user's most recent known country to the per-user activity summary, so
-- the admin "Per user" table can show where each signed-in user is from.
-- A user may have events from several countries (travel); we surface the latest
-- non-null one. Appended as the last column so CREATE OR REPLACE VIEW accepts it.
create or replace view public.user_activity as
select
  p.id            as user_id,
  p.email,
  p.full_name,
  count(*) filter (where e.event_type = 'sign_in')   as sign_in_count,
  count(*) filter (where e.event_type = 'page_view') as page_views,
  count(distinct date_trunc('day', e.created_at))    as active_days,
  min(e.created_at) as first_seen,
  max(e.created_at) as last_seen,
  (
    select e2.country
    from public.usage_events e2
    where e2.user_id = p.id and e2.country is not null
    order by e2.created_at desc
    limit 1
  ) as country
from public.profiles p
left join public.usage_events e on e.user_id = p.id
group by p.id, p.email, p.full_name
order by last_seen desc nulls last;

-- Hardening: keep the view off the public API (admin reads via service role).
revoke all on public.user_activity from anon, authenticated;
