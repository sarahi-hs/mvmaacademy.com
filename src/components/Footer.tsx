"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIALS, PERSON, SITE } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();

  // Landing pages de conversión no llevan el footer del sitio.
  if (pathname?.startsWith("/masterclass")) return null;

  return (
    <footer className="mt-32 border-t border-beige bg-ivory-warm/60">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-3xl text-tinto-deep mb-3">
            <span className="italic">S</span>arahi <span className="italic">H</span>aro
          </h3>
          <p className="text-sm text-tinto-deep/70 leading-relaxed">
            Asesora de imagen, coach de marca personal, speaker internacional y autora.
            Creadora del método MVMA — Mi Versión Más Auténtica.
          </p>
        </div>

        <div>
          <h4 className="editorial-eyebrow mb-4">Explora</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/mi-historia" className="hover:text-tinto">Mi Historia</Link></li>
            <li><Link href="/servicios" className="hover:text-tinto">Servicios 1:1</Link></li>
            <li><Link href="/comunidad" className="hover:text-tinto">Mi Comunidad</Link></li>
            <li><Link href="/conferencias" className="hover:text-tinto">Conferencias</Link></li>
            <li><Link href="/libros" className="hover:text-tinto">Libro</Link></li>
            <li><Link href="/blog" className="hover:text-tinto">Blog</Link></li>
            <li><Link href="/contacto" className="hover:text-tinto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="editorial-eyebrow mb-4">Sígueme</h4>
          <ul className="space-y-2 text-sm">
            {Object.values(SOCIALS).map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-tinto">
                  {s.label} <span className="text-tinto-soft text-xs">· {(s.followers / 1000).toFixed(0)}K</span>
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-beige mt-3">
              <a href={`mailto:${PERSON.email}`} className="hover:text-tinto">{PERSON.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-beige">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-tinto-deep/60">
          <p>© {new Date().getFullYear()} Sarahi Haro · MVMA Academy</p>
          <p>{SITE.url.replace("https://", "")}</p>
        </div>
      </div>
    </footer>
  );
}
