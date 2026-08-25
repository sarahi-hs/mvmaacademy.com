import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { GlowBrunchForm } from "./GlowBrunchForm";
import "./glow-brunch.css";

const DESC =
  "La primera edición del Glow Brunch en Guadalajara fue mágica — y ya viene la próxima. Anótate a la lista de espera para ser la primera en saber la fecha.";

export const metadata: Metadata = {
  title: "The Glow Brunch — Lista de espera · Guadalajara",
  description: DESC,
  alternates: { canonical: "/glow-brunch" },
  openGraph: {
    title: "The Glow Brunch — Lista de espera",
    description: DESC,
    url: `${SITE.url}/glow-brunch`,
    type: "website",
    locale: "es_MX",
  },
};

export default function GlowBrunchPage() {
  return (
    <div className="gb-root">
      <div className="gb-page">
        <nav className="gb-top">
          <span className="gb-brand">
            MVMA · <em>Sarahi Haro</em>
          </span>
          <span className="gb-meta">Guadalajara · Lista de espera</span>
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
                <span className="gb-lab">Sede</span>
                <span className="gb-val">
                  Guadalajara<small>Espacio exclusivo</small>
                </span>
              </div>
              <div className="gb-row">
                <span className="gb-lab">Formato</span>
                <span className="gb-val">
                  Brunch + dinámicas<small>3.5 horas</small>
                </span>
              </div>
              <div className="gb-row">
                <span className="gb-lab">Cupo</span>
                <span className="gb-val">
                  25 mujeres<small>Por edición</small>
                </span>
              </div>
              <a href="#reservar" className="gb-hero-cta">
                Anótame en la lista de espera
                <span aria-hidden="true">→</span>
              </a>
            </aside>

            <p className="gb-hero-tag">
              La primera edición <em>ya pasó — y fue mágica.</em> La próxima está por venir. Sé
              la primera en enterarte.
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
            <span className="gb-eyebrow gb-eyebrow-jade">Una nota antes de anotarte</span>
            <p className="gb-note-body">
              Este brunch es <em>parte de</em> <strong>The Glow Club</strong> — mi comunidad para
              mujeres que ya decidieron rodearse de otras que están construyendo. Nace de ahí. En
              cada edición te contamos más para que, si quieres, formes parte —{" "}
              <em>sin presión, sin agenda.</em>
            </p>
            <p className="gb-note-sign">— Sarahi</p>
          </div>
        </section>

        <section>
          <div className="gb-section-eyebrow">
            <span className="gb-eyebrow">Lista de espera</span>
          </div>
          <h2 className="gb-section-title">
            Sé la <em>primera</em> en saber del próximo Glow Brunch.
          </h2>

          <div className="gb-reservar-wrap">
            <div className="gb-details-card">
              <h3>
                <em>Los</em> detalles
              </h3>
              <dl>
                <dt>Sede</dt>
                <dd>
                  Guadalajara<small>Otras ciudades próximamente</small>
                </dd>

                <dt>Formato</dt>
                <dd>Brunch + dinámicas + networking</dd>

                <dt>Duración</dt>
                <dd>Aprox. 3.5 horas · domingo</dd>

                <dt>Cupo</dt>
                <dd>
                  25 mujeres<small>Por edición · muy limitado</small>
                </dd>

                <dt>Inversión</dt>
                <dd className="gb-price-dd">Desde $599 MXN</dd>

                <dt>Fecha</dt>
                <dd>
                  Por confirmar<small>Te avisamos primero a ti</small>
                </dd>
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
              <h4>¿Cuándo es el próximo Glow Brunch?</h4>
              <p>
                Aún no tiene fecha exacta. Estás anotándote justo para ser de las primeras en
                enterarte apenas la confirmemos.
              </p>
            </div>
            <div className="gb-faq-item">
              <h4>¿Anotarme en la lista tiene costo?</h4>
              <p>
                Cero. Es solo para avisarte primero cuando abramos los lugares — sin compromiso ni
                pago hasta que decidas reservar.
              </p>
            </div>
            <div className="gb-faq-item">
              <h4>¿Cuánto costará el próximo?</h4>
              <p>
                Cada edición mantiene una inversión accesible (desde $599 MXN). Confirmamos el
                precio final cuando anunciemos la fecha.
              </p>
            </div>
            <div className="gb-faq-item">
              <h4>¿Puedo llegar sola?</h4>
              <p>
                Sí — la mayoría llega sola. El espacio está diseñado para que en diez minutos ya
                no lo estés.
              </p>
            </div>
            <div className="gb-faq-item">
              <h4>¿Y si soy de otra ciudad?</h4>
              <p>
                Anótate igual y déjame saberlo en el mensaje — estamos midiendo interés para
                llevar el brunch a más ciudades.
              </p>
            </div>
          </div>
        </section>

        <footer className="gb-footer">Sarahi Haro · MVMA Academy · Guadalajara 2026</footer>
      </div>
    </div>
  );
}
