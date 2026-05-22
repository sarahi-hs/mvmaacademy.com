"use client";

/**
 * Reveal — fade-in animation wrapper.
 * Animation is pure CSS (see .reveal in globals.css), so content stays visible
 * even if JavaScript fails to hydrate. `delay` is forwarded as animation-delay.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
