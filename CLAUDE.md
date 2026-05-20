# CLAUDE.md — mvma-academy

Reglas de trabajo para Claude Code en este repositorio. Basadas en el **Digital Authority Blueprint v2.0** de Spencer Hoffmann.

## Cliente

**Sarahi Haro** — Asesora de imagen, coach de marca personal, speaker, autora.
- Dominio: `mvmaacademy.com`
- Email asistente: `sarahiharoequipo@gmail.com`
- WhatsApp asistente: `+52 33 2495 6118`
- Libro: "Volver a mí y no irme nunca más"
- Programa estrella: **MVMA** (Mi Versión Más Auténtica)
- Comunidad: **MVMA Tribe** (2 clases mensuales)

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion
- Deploy: Vercel + GitHub Actions auto-deploy

## Paleta de colores (CONFIRMADA)

| Token | Hex | Uso |
|-------|-----|-----|
| `tinto` | `#722F37` | Primario, botones, headers |
| `tinto-deep` | `#3D1A1F` | Texto sobre fondos claros |
| `rosita` | `#F4D4D4` | Highlights suaves, hovers |
| `hueso` | `#FAF7F2` | Fondo principal (no blanco puro) |

## Reglas de deploy (NO NEGOCIABLES)

1. **NUNCA** `git push origin main` directo. SIEMPRE branch + PR + merge.
2. **NUNCA** `vercel --prod` ni `vercel deploy --prod` manual.
3. Cada cambio: `git checkout -b feat/X origin/main` → push branch → `gh pr create` → review → merge → GitHub Actions auto-deploya.
4. Si el alias del dominio queda manual-pinned: pre-flight `curl` comparando rutas críticas old vs new, luego `vercel alias set <new-deployment-url> mvmaacademy.com`.
5. Env vars en Vercel: SIEMPRE verificar con `vercel env pull /tmp/v.env` que cada KEY tenga valor real (no vacío).
6. Cambios de env var requieren nuevo deploy (lambdas no hot-reload `process.env`).

## Idioma y SEO

- Idioma principal: **español** (es-MX)
- Versión inglés bajo `/en/` con middleware de auto-detección
- hreflang en todas las páginas
- `robots.txt` permite: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Anthropic-AI, Cohere-AI
- Sitemap dinámico con TODAS las URLs (ES + EN)

## Schema.org obligatorio

- `Person` en layout root (con `sameAs` a todas las redes verificadas)
- `Book` en cada página de libro
- `FAQPage` en /conferencias, /libros, /sobre-mi
- `BreadcrumbList` en subpáginas
- `WebSite` + `WebPage` + `SiteNavigationElement` en layout

## Lecciones técnicas críticas (no olvidar)

1. NUNCA deploy manual desde worktree (production puede mostrar código de otro proyecto)
2. Vercel alias puede quedar manual-pinned tras incidente → siempre re-aliasear con curl pre-flight
3. Env vars pueden quedar vacías si `vercel env add` via stdin se interpreta mal
4. Lambdas warm tienen snapshot de process.env desde su boot — trigger nuevo deploy tras cambios
5. Browser cache puede mostrar 404 fantasma — instruir cliente a hard refresh (Cmd+Shift+R)
