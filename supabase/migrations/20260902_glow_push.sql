-- =========================================================
-- Glow Club — Push notifications
-- Fecha: 2026-09-02 (tercera migración del día)
-- =========================================================
--
-- Guarda el "buzón push" de cada chica por device. Una chica puede
-- tener múltiples subscripciones (cel + iPad + navegador, etc.).
-- El endpoint es único a nivel global — si el mismo device se
-- resubscribe, hacemos upsert por endpoint.
-- =========================================================

create table if not exists glow_push_subscriptions (
  id           uuid primary key default gen_random_uuid(),
  member_id    uuid not null references glow_members(id) on delete cascade,
  endpoint     text not null unique,        -- URL del push service (Chrome, Apple, etc.)
  p256dh       text not null,               -- llave pública del navegador (base64)
  auth         text not null,               -- llave de auth del navegador (base64)
  user_agent   text,                        -- para debug: qué browser/OS
  created_at   timestamptz not null default now(),
  last_used_at timestamptz                  -- se actualiza cuando el push funciona ok
);

create index if not exists glow_push_subs_member_idx
  on glow_push_subscriptions (member_id);

alter table glow_push_subscriptions enable row level security;
