import type { Metadata } from "next";
import { PERSON, SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con el equipo de Sarahi Haro para conferencias, mentorías, colaboraciones o medios.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: SITE.url },
          { name: "Contacto", url: `${SITE.url}/contacto` },
        ])}
      />

      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-6">Contacto</p>
          <h1 className="font-display text-4xl md:text-6xl text-tinto-deep mb-8 leading-[1.05]">
            Hablemos.
          </h1>
          <p className="text-tinto-deep/75 leading-relaxed">
            Mi asistente Sarahi Equipo revisa cada mensaje personalmente y te responde en menos de 48 horas hábiles.
          </p>

          <div className="mt-12 space-y-6 text-sm">
            <div>
              <p className="uppercase tracking-widest text-tinto-soft text-xs mb-1">Email</p>
              <a href={`mailto:${PERSON.email}`} className="text-tinto-deep hover:text-tinto">
                {PERSON.email}
              </a>
            </div>
            <div>
              <p className="uppercase tracking-widest text-tinto-soft text-xs mb-1">WhatsApp</p>
              <a
                href={`https://wa.me/${PERSON.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tinto-deep hover:text-tinto"
              >
                {PERSON.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
