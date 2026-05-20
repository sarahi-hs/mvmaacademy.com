import Link from "next/link";
import { SOCIALS, PERSON, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-rosita/40 bg-hueso-warm">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-2xl text-tinto-deep mb-3">Sarahi Haro</h3>
          <p className="text-sm text-tinto-deep/70 leading-relaxed">
            Asesora de imagen, coach de marca personal y fundadora de MVMA — Mi Versión Más Auténtica.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-tinto-soft mb-4">Explora</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/sobre-mi" className="hover:text-tinto">Sobre mí</Link></li>
            <li><Link href="/conferencias" className="hover:text-tinto">Conferencias</Link></li>
            <li><Link href="/libros" className="hover:text-tinto">Libros</Link></li>
            <li><Link href="/comunidad" className="hover:text-tinto">MVMA Tribe</Link></li>
            <li><Link href="/blog" className="hover:text-tinto">Blog</Link></li>
            <li><Link href="/contacto" className="hover:text-tinto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-tinto-soft mb-4">Sígueme</h4>
          <ul className="space-y-2 text-sm">
            {Object.values(SOCIALS).map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-tinto">
                  {s.label} <span className="text-tinto-soft text-xs">· {(s.followers / 1000).toFixed(0)}K</span>
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-rosita/40 mt-3">
              <a href={`mailto:${PERSON.email}`} className="hover:text-tinto">{PERSON.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-rosita/40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-tinto-deep/60">
          <p>© {new Date().getFullYear()} Sarahi Haro · MVMA Academy</p>
          <p>{SITE.url.replace("https://", "")}</p>
        </div>
      </div>
    </footer>
  );
}
