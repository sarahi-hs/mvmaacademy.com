/**
 * Marquee horizontal infinito — texto gigante estilo editorial.
 * Inspirado en sitios tipo Tiara Coaching / Vogue editorial.
 */
export function Marquee({
  text,
  separator = "·",
  className = "",
}: {
  text: string;
  separator?: string;
  className?: string;
}) {
  // Duplicamos el contenido para loop infinito sin saltos
  const items = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div className="marquee-track">
        {items.map((i) => (
          <span
            key={i}
            className="font-display text-[20vw] md:text-[14vw] leading-[0.85] text-tinto-deep whitespace-nowrap px-8"
          >
            {text} <span className="italic text-tinto/60 mx-4">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
