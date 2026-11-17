create extension if not exists pgcrypto;
create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, role text not null default 'member' check (role in ('member','admin')), created_at timestamptz not null default now());
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$ begin insert into public.profiles(id) values (new.id); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
create function public.is_admin() returns boolean language sql security definer stable set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin') $$;
create function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select using (id = auth.uid());

do $$ declare t text; begin
foreach t in array array['activities','projects','gallery','achievements','members'] loop
  execute format('create table public.%I (id uuid primary key default gen_random_uuid(), title text not null check (char_length(title) between 1 and 200), description text, image_url text, category text, event_date date, location text, link_url text, level text, published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now())', t);
  execute format('create index on public.%I (published, event_date desc)', t);
  execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  execute format('alter table public.%I enable row level security', t);
  execute format('create policy "public read published" on public.%I for select using (published = true or public.is_admin())', t);
  execute format('create policy "admin write" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
end loop; end $$;
alter table public.gallery add column media_type text not null default 'image' check (media_type in ('image','video'));

create table public.messages (id uuid primary key default gen_random_uuid(), name text not null check (char_length(name) between 1 and 100), email text not null check (char_length(email) between 5 and 200), message text not null check (char_length(message) between 10 and 2000), is_read boolean not null default false, created_at timestamptz not null default now());
create table public.feedback (id uuid primary key default gen_random_uuid(), name text check (name is null or char_length(name)<=80), category text not null check (category in ('Saran','Kritik','Ide kegiatan','Evaluasi','Lainnya')), message text not null check (char_length(message) between 10 and 2000), created_at timestamptz not null default now(), is_read boolean not null default false);
create index on public.feedback (is_read, created_at desc);
alter table public.messages enable row level security;
alter table public.feedback enable row level security;
create policy "anyone insert" on public.messages for insert with check (is_read = false);
create policy "admin all" on public.messages for all using (public.is_admin()) with check (public.is_admin());
create policy "anyone insert" on public.feedback for insert with check (is_read = false);
create policy "admin all" on public.feedback for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media','media',true,52428800,array['image/jpeg','image/png','image/webp','video/mp4','video/webm'])
on conflict (id) do nothing;
create policy "media public read" on storage.objects for select using (bucket_id='media');
create policy "media admin insert" on storage.objects for insert with check (bucket_id='media' and public.is_admin());
create policy "media admin update" on storage.objects for update using (bucket_id='media' and public.is_admin());
create policy "media admin delete" on storage.objects for delete using (bucket_id='media' and public.is_admin());
