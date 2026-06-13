-- Profiles: one row per auth user, auto-created on signup.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Board projects: per-user saved board work.
create table if not exists public.board_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tool text not null,
  title text not null,
  board_cards jsonb not null default '[]'::jsonb,
  text_annotations jsonb not null default '[]'::jsonb,
  brainstorm_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists board_projects_user_tool_idx
  on public.board_projects (user_id, tool);

alter table public.board_projects enable row level security;

create policy "Board projects are selectable by owner"
  on public.board_projects for select
  using (auth.uid() = user_id);

create policy "Board projects are insertable by owner"
  on public.board_projects for insert
  with check (auth.uid() = user_id);

create policy "Board projects are updatable by owner"
  on public.board_projects for update
  using (auth.uid() = user_id);

create policy "Board projects are deletable by owner"
  on public.board_projects for delete
  using (auth.uid() = user_id);
