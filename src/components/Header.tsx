"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/servicios", label: "Servicios" },
  { href: "/mi-historia", label: "Mi Historia" },
  { href: "/conferencias", label: "Conferencias" },
  { href: "/comunidad", label: "MVMA Tribe" },
  { href: "/libros", label: "Libro" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-ivory/85 border-b border-beige/60">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl md:text-3xl tracking-tight text-tinto-deep hover:text-tinto transition-colors">
          <span className="italic">S</span>arahi <span className="italic">H</span>aro
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-tinto-deep/80 hover:text-tinto transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/en"
            className="text-xs uppercase tracking-widest text-tinto-soft hover:text-tinto"
          >
            EN
          </Link>
        </nav>

        <button
          className="md:hidden text-tinto-deep"
          aria-label="Menú"
          onClick={() => setOpen(!open)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-rosita/40 bg-hueso">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-tinto-deep hover:text-tinto"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/en" className="py-2 text-xs uppercase tracking-widest text-tinto-soft">
              English version
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
