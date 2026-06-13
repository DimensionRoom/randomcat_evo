-- Mark which users are admins (back-office access).
alter table public.profiles add column if not exists is_admin boolean not null default false;

-- Hardening: the reporting views run with definer rights and bypass RLS, so make
-- sure the public API roles cannot query them directly. The admin page reads them
-- with the service role, which ignores these grants.
revoke all on public.usage_daily      from anon, authenticated;
revoke all on public.usage_by_path    from anon, authenticated;
revoke all on public.usage_by_country from anon, authenticated;
revoke all on public.user_activity    from anon, authenticated;

-- Grant yourself admin (edit the email):
-- update public.profiles set is_admin = true where email = 'tadasam115599@gmail.com';
