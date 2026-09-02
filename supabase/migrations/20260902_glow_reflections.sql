-- =========================================================
-- Glow Club — Reflexiones diarias (v1)
-- Fecha: 2026-09-02
-- =========================================================
--
-- Después de que una chica hace check del día, puede compartir
-- opcionalmente cómo se sintió. Esas reflexiones aparecen en el
-- Diario de la Comunidad, visible para todas las miembros del club.
--
-- Reglas:
--   - Una reflexión por día por chica (unique member+date).
--   - Solo se puede escribir el día actual (validación en app).
--   - Texto no vacío, max 2000 caracteres.
-- =========================================================

create table if not exists glow_reflections (
  id                uuid primary key default gen_random_uuid(),
  member_id         uuid not null references glow_members(id) on delete cascade,
  challenge_id      uuid not null references glow_challenges(id) on delete cascade,
  reflection_date   date not null,
  text              text not null
                      check (length(trim(text)) between 1 and 2000),
  created_at        timestamptz not null default now(),
  unique (member_id, reflection_date)
);

create index if not exists glow_reflections_challenge_recent_idx
  on glow_reflections (challenge_id, created_at desc);

alter table glow_reflections enable row level security;
-- Sin policies: solo el servidor con service_role accede a esta tabla.
