export default function MarqueeControls({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="technology-section"
      aria-label="Technologies I work with"
      aria-describedby="technology-motion-help"
      tabIndex={0}
    >
      <p id="technology-motion-help" className="sr-only">
        Scrolling pauses on hover or keyboard focus.
      </p>
      <div className="container technology-heading">
        <p>THE TOOLS BEHIND THE WORK</p>
      </div>
      {children}
    </section>
  );
}
