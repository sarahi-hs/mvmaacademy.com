-- =========================================================
-- Glow Club — Portal de membresía v1
-- Fecha: 2026-08-17
-- Autor: Sarahi Haro + Claude
-- =========================================================
--
-- Tablas:
--   glow_members           → una fila por chica del Glow Club
--   glow_challenges        → una fila por reto mensual
--   glow_checkins          → una fila por check diario cumplido
--   glow_monthly_ranking   → vista con el ranking del mes actual
--
-- Reglas del negocio:
--   • Cada check diario suma 10 puntos.
--   • Una chica solo puede hacer 1 check por día (unique constraint).
--   • Solo puede checkear el día actual (validación en app).
--   • Tiene acceso si:
--       - member_type = 'annual'  y  access_expires_at > now()
--       - member_type = 'monthly' y  status = 'active'
--   • Ranking se calcula por mes calendario (challenge_month).
-- =========================================================

-- 1) MIEMBROS DEL GLOW CLUB
-- ---------------------------------------------------------
create table if not exists glow_members (
  id              uuid primary key default gen_random_uuid(),
  email           text unique not null,
  password_hash   text not null,
  full_name       text not null,
  initials        text,                            -- para el avatar (ej. "AR")
  member_type     text not null check (member_type in ('monthly', 'annual')),
  status          text not null default 'active'
                    check (status in ('active', 'paused', 'canceled')),
  access_expires_at timestamptz,                   -- solo para annual; null en monthly
  stripe_customer_id text,                         -- para reconciliar con Stripe
  stripe_subscription_id text,                     -- solo monthly
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists glow_members_email_idx  on glow_members (email);
create index if not exists glow_members_status_idx on glow_members (status);

-- 2) RETOS MENSUALES
-- ---------------------------------------------------------
-- Sarahi crea un reto por mes. Solo puede haber uno activo a la vez.
create table if not exists glow_challenges (
  id              uuid primary key default gen_random_uuid(),
  month           date not null unique,             -- primer día del mes (ej. 2026-08-01)
  title           text not null,                    -- "5 minutos a solas cada día"
  description     text,                             -- texto largo motivacional
  points_per_day  integer not null default 10,      -- puntos que suma cada check
  prize           text,                             -- "Sesión 1:1 con Sarahi"
  created_at      timestamptz not null default now()
);

create index if not exists glow_challenges_month_idx on glow_challenges (month desc);

-- 3) CHECK-INS DIARIOS
-- ---------------------------------------------------------
-- Una fila por cada día que una chica cumple el reto.
-- El unique (member_id, checkin_date) impide check duplicado el mismo día.
create table if not exists glow_checkins (
  id              uuid primary key default gen_random_uuid(),
  member_id       uuid not null references glow_members(id) on delete cascade,
  challenge_id    uuid not null references glow_challenges(id) on delete cascade,
  checkin_date    date not null,                    -- el día que cumplió (ej. 2026-08-17)
  points_earned   integer not null default 10,
  created_at      timestamptz not null default now(),
  unique (member_id, checkin_date)
);

create index if not exists glow_checkins_member_idx     on glow_checkins (member_id, checkin_date desc);
create index if not exists glow_checkins_challenge_idx  on glow_checkins (challenge_id);

-- 4) VISTA: RANKING DEL MES
-- ---------------------------------------------------------
-- Calcula puntos totales y días cumplidos por chica en el reto del mes actual.
-- Ordenada de mayor a menor puntos.
create or replace view glow_monthly_ranking as
select
  m.id            as member_id,
  m.full_name,
  m.initials,
  c.id            as challenge_id,
  c.month         as challenge_month,
  count(ci.id)::int              as days_completed,
  coalesce(sum(ci.points_earned), 0)::int as total_points,
  max(ci.checkin_date)           as last_checkin
from glow_members m
cross join glow_challenges c
left join glow_checkins ci
  on ci.member_id = m.id
 and ci.challenge_id = c.id
where m.status = 'active'
group by m.id, m.full_name, m.initials, c.id, c.month
order by c.month desc, total_points desc, days_completed desc;

-- 5) VISTA: RACHA ACTUAL DE UNA CHICA
-- ---------------------------------------------------------
-- (Se puede consultar como función en el futuro; por ahora lo calculamos en app)

-- =========================================================
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------
-- Activamos RLS en todas las tablas. El acceso a los datos se hace
-- desde el servidor de Next.js con la SECRET KEY, que bypassa RLS.
-- Esto blinda las tablas contra acceso directo desde el navegador.
-- =========================================================

alter table glow_members    enable row level security;
alter table glow_challenges enable row level security;
alter table glow_checkins   enable row level security;

-- No creamos policies públicas — todo va vía el server con service_role.

-- =========================================================
-- SEED: reto de agosto 2026 (para pruebas iniciales)
-- =========================================================
insert into glow_challenges (month, title, description, points_per_day, prize)
values (
  '2026-08-01',
  '5 minutos a solas cada día',
  'Un momento contigo misma, sin celular, sin ruido. Respira, escúchate, vuelve a ti.',
  10,
  'Sesión 1:1 con Sarahi'
)
on conflict (month) do nothing;
