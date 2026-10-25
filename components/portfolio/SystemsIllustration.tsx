import { SymbolIcon } from "./Icons";

export default function SystemsIllustration({
  large = false,
}: {
  large?: boolean;
}) {
  return (
    <div
      className={`project-visual systems-illustration ${large ? "visual-large" : ""}`}
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="systems-heading">
        <span className="visual-caption">SOFTWARE, CONNECTED.</span>
        <span className="systems-heading-note">A SYSTEMS PERSPECTIVE</span>
      </div>
      <div
        className="systems-diagram"
        role="img"
        aria-label="Conceptual software layers: interfaces connect to application services, data, integrations, and cloud delivery."
      >
        <svg
          className="systems-wiring"
          viewBox="0 0 600 180"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M140 70h112m96 0h112M140 70v88h320V70M300 115v43"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="195" cy="70" r="3" fill="currentColor" />
          <circle cx="405" cy="70" r="3" fill="currentColor" />
          <circle cx="300" cy="158" r="3" fill="currentColor" />
        </svg>
        <div className="systems-column">
          <span className="systems-layer">01 / EXPERIENCE</span>
          <div className="systems-interface">
            <SymbolIcon kind="globe" />
            <strong>Interfaces</strong>
            <div className="systems-channels">
              <span>Web</span>
              <span>Mobile</span>
            </div>
          </div>
        </div>
        <div className="systems-column">
          <span className="systems-layer">02 / APPLICATION</span>
          <div className="systems-core">
            <div className="systems-core-title">
              <SymbolIcon kind="layers" />
              <strong>Services</strong>
            </div>
            <span>API layer</span>
            <span>Business logic</span>
            <span>Workflows</span>
          </div>
        </div>
        <div className="systems-column">
          <span className="systems-layer">03 / CONNECTIONS</span>
          <div className="systems-endpoints">
            <div>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <ellipse cx="12" cy="5" rx="8" ry="3" />
                <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
              </svg>
              <span>Data</span>
            </div>
            <div>
              <SymbolIcon kind="code" />
              <span>Integrations</span>
            </div>
          </div>
        </div>
        <div className="systems-cloud">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <path d="M7 18a5 5 0 1 1 .3-10A6 6 0 0 1 19 9a4.5 4.5 0 0 1-1 9H7Z" />
          </svg>
          <span>Cloud & delivery</span>
          <i aria-hidden="true" />
        </div>
      </div>
      <div className="systems-footer">
        <span>Thoughtfully connected. Clearly structured.</span>
        <span>Concept illustration</span>
      </div>
    </div>
  );
}
