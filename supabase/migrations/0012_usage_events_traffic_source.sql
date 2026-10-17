-- Where visitors come from: the referring site and UTM tags of the first page
-- of each visit, for the admin "Traffic sources" card.
--
-- RUN THIS BEFORE DEPLOYING the code that sends these columns. (The tracker
-- retries without them if an insert fails, so an older database only loses
-- the source, not the page view, but the order still matters.)
--
-- Only additions: new nullable columns and a new view; nothing existing changes.

alter table public.usage_events
  -- true on the first page view of a visit (one per browser tab session);
  -- the source columns are only filled on that row.
  add column if not exists entry boolean not null default false,
  -- Host of the referring page, external sites only (e.g. "www.google.com").
  add column if not exists referrer_host text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text;

-- One row per day and source combination. The dashboard groups these into
-- channels (search, social, ...), so that mapping can change without a migration.
create or replace view public.usage_by_source as
select
  date_trunc('day', created_at) as day,
  referrer_host,
  utm_source,
  utm_medium,
  utm_campaign,
  count(*) as entries,
  count(distinct visitor_id) as visitors
from public.usage_events
where event_type = 'page_view' and entry
group by 1, 2, 3, 4, 5
order by 1 desc;

-- Hardening: keep the view off the public API (admin reads via service role).
revoke all on public.usage_by_source from anon, authenticated;
