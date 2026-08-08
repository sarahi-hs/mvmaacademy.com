import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PERSON, SITE } from "@/lib/site";
import { GlowBrunchForm } from "./GlowBrunchForm";
import "./glow-brunch.css";

const DESC =
  "La primera experiencia presencial para mujeres que decidieron dejar de esconderse. Brunch íntimo el domingo 23 de agosto en Guadalajara.";

export const metadata: Metadata = {
  title: "The Glow Brunch — Domingo 23 de agosto · Guadalajara",
  description: DESC,
  alternates: { canonical: "/glow-brunch" },
  openGraph: {
    title: "The Glow Brunch — Guadalajara · 23 de agosto",
    description: DESC,
    url: `${SITE.url}/glow-brunch`,
    type: "website",
    locale: "es_MX",
  },
};

export default function GlowBrunchPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "The Glow Brunch — MVMA · Guadalajara",
    description: DESC,
    startDate: "2026-08-23T10:00:00-06:00",
    endDate: "2026-08-23T13:30:00-06:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Guadalajara (ubicación exclusiva)",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Guadalajara",
        addressRegion: "JAL",
        addressCountry: "MX",
      },
    },
    organizer: {
      "@type": "Person",
      name: PERSON.name,
      url: SITE.url,
    },
    offers: {
      "@type": "Offer",
      price: "399",
      priceCurrency: "MXN",
      availability: "https://schema.org/LimitedAvailability",
      url: `${SITE.url}/glow-brunch`,
    },
  };

  return (
    <>
      <JsonLd data={eventSchema} />
      <div className="gb-root">
        <div className="gb-page">
          <nav className="gb-top">
            <span className="gb-brand">
              MVMA · <em>Sarahi Haro</em>
            </span>
            <span className="gb-meta">Guadalajara · 23 · Agosto</span>
          </nav>

          <header className="gb-hero">
            <div className="gb-hero-bg" aria-hidden="true" />

            <div className="gb-hero-inner">
              <div className="gb-glow-title">
                <span className="gb-the">The</span>
                <span className="gb-glow-txt">Glow</span>
                <span className="gb-brunch-txt">Brunch</span>
                <span className="gb-by">
                  by <span>MVMA</span>
                </span>
              </div>

              <aside className="gb-hero-side" aria-label="Datos del evento">
                <div className="gb-row">
                  <span className="gb-lab">Fecha</span>
                  <span className="gb-val">
                    23 · Agosto<small>Domingo</small>
                  </span>
                </div>
                <div className="gb-row">
                  <span className="gb-lab">Horario</span>
                  <span className="gb-val">10:00 – 13:30</span>
                </div>
                <div className="gb-row">
                  <span className="gb-lab">Lugar</span>
                  <span className="gb-val">
                    Guadalajara<small>Espacio exclusivo</small>
                  </span>
                </div>
                <a href="#reservar" className="gb-hero-cta">
                  Quiero reservar mi lugar
                  <span aria-hidden="true">→</span>
                </a>
              </aside>

              <p className="gb-hero-tag">
                La primera experiencia presencial para mujeres que decidieron{" "}
                <em>dejar de esconderse.</em>
              </p>
            </div>
          </header>

          <section className="gb-para-ti">
            <div className="gb-section-eyebrow">
              <span className="gb-eyebrow">Es para ti si</span>
            </div>
            <h2 className="gb-section-title">
              Este brunch <em>te está</em> buscando.
            </h2>
            <ul>
              <li>
                Tienes <em>mucho por dentro</em> y pocas personas con quienes hablarlo sin filtros.
              </li>
              <li>
                Estás construyendo algo — un negocio, una versión de ti, una vida — y estás lista
                para <em>recibir tanto como das</em>.
              </li>
              <li>
                Buscas <em>conexiones estratégicas</em> con mujeres que impulsen tu crecimiento.
              </li>
            </ul>
          </section>

          <section>
            <div className="gb-section-eyebrow">
              <span className="gb-eyebrow">Lo que vivirás</span>
            </div>
            <h2 className="gb-section-title">
              Un domingo <strong>curado</strong> al detalle.
            </h2>

            <div className="gb-exp-grid">
              <div className="gb-exp-item">
                <span className="gb-glyph">i.</span>
                <h3>Fancy brunch</h3>
              </div>
              <div className="gb-exp-item">
                <span className="gb-glyph">ii.</span>
                <h3>Dinámicas para reconectar contigo</h3>
                <p>
                  Experiencias diseñadas para que te escuches, te reconozcas, y salgas con claridad
                  de algo.
                </p>
              </div>
              <div className="gb-exp-item">
                <span className="gb-glyph">iii.</span>
                <h3>Networking</h3>
                <p>
                  Mujeres curadas, en tu misma frecuencia. Las conversaciones que transforman pasan
                  de una en una.
                </p>
              </div>
            </div>
          </section>

          <section className="gb-note-glow">
            <div className="gb-note-card">
              <span className="gb-eyebrow gb-eyebrow-jade">Una nota antes de reservar</span>
              <p className="gb-note-body">
                Este brunch es <em>parte de</em> <strong>The Glow Club</strong> — mi comunidad para
                mujeres que ya decidieron rodearse de otras que están construyendo. Nace de ahí. El
                domingo te contaré más acerca de nuestro club para que formes parte —{" "}
                <em>sin presión, sin agenda.</em>
              </p>
              <p className="gb-note-sign">— Sarahi</p>
            </div>
          </section>

          <section>
            <div className="gb-section-eyebrow">
              <span className="gb-eyebrow">Reserva tu lugar</span>
            </div>
            <h2 className="gb-section-title">
              Cupo <em>muy limitado.</em> Cuando se cierra, se cierra.
            </h2>

            <div className="gb-reservar-wrap">
              <div className="gb-details-card">
                <h3>
                  <em>Los</em> detalles
                </h3>
                <dl>
                  <dt>Fecha</dt>
                  <dd>Domingo 23 de agosto</dd>

                  <dt>Horario</dt>
                  <dd>10:00 am – 1:30 pm</dd>

                  <dt>Lugar</dt>
                  <dd>
                    Guadalajara<small>Dirección exacta al confirmar</small>
                  </dd>

                  <dt>Incluye</dt>
                  <dd>Brunch · dinámicas · networking · sorpresa</dd>

                  <dt>Pago</dt>
                  <dd>
                    Transferencia<small>Se aparta con el pago completo</small>
                  </dd>

                  <dt>Inversión</dt>
                  <dd className="gb-price-dd">$399 MXN</dd>
                </dl>
              </div>

              <GlowBrunchForm />
            </div>
          </section>

          <section>
            <div className="gb-section-eyebrow">
              <span className="gb-eyebrow">Preguntas frecuentes</span>
            </div>
            <div className="gb-faq-list">
              <div className="gb-faq-item">
                <h4>¿Puedo llegar sola?</h4>
                <p>
                  Sí — la mayoría llega sola. El espacio está diseñado para que en diez minutos ya
                  no lo estés.
                </p>
              </div>
              <div className="gb-faq-item">
                <h4>¿Tengo que ser clienta MVMA?</h4>
                <p>
                  No. Es para cualquier mujer lista para rodearse de otras que también están
                  evolucionando.
                </p>
              </div>
              <div className="gb-faq-item">
                <h4>¿Y si no puedo asistir después de pagar?</h4>
                <p>
                  El cupo es limitado. Si algo se te atraviesa, puedes ceder tu lugar a otra mujer
                  avisándome con tiempo.
                </p>
              </div>
            </div>
          </section>

          <footer className="gb-footer">Sarahi Haro · MVMA Academy · Guadalajara 2026</footer>
        </div>
      </div>
    </>
  );
}
