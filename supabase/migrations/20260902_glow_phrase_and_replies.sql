-- =========================================================
-- Glow Club — Frase de cierre por reto + respuestas al diario
-- Fecha: 2026-09-02 (segunda migración del día)
-- =========================================================

-- 1) Frase corta que se muestra a la chica al cerrar su check + reflexión.
--    Configurable por Sarahi desde el admin de cada reto.
alter table glow_challenges
  add column if not exists closing_phrase text;

-- 2) Respuestas al diario de la comunidad.
--    Cualquier chica puede responder a la reflexión de otra (o a la propia).
create table if not exists glow_reflection_replies (
  id             uuid primary key default gen_random_uuid(),
  reflection_id  uuid not null references glow_reflections(id) on delete cascade,
  member_id      uuid not null references glow_members(id) on delete cascade,
  text           text not null check (length(trim(text)) between 1 and 1000),
  created_at     timestamptz not null default now()
);

create index if not exists glow_reflection_replies_thread_idx
  on glow_reflection_replies (reflection_id, created_at asc);

alter table glow_reflection_replies enable row level security;
