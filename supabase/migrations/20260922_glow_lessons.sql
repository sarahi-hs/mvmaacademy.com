-- Glow Club — Clases grabadas
create table if not exists glow_lessons (
  id           uuid primary key default gen_random_uuid(),
  title        text not null check (length(trim(title)) between 2 and 200),
  description  text,
  topic        text,
  provider     text not null check (provider in ('youtube', 'vimeo')),
  video_id     text not null,
  video_url    text not null,
  published    boolean not null default true,
  created_at   timestamptz not null default now()
);

create index if not exists glow_lessons_created_idx on glow_lessons (created_at desc);

alter table glow_lessons enable row level security;
