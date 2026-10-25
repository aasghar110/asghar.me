import Image from "next/image";
import { person } from "@/lib/content";
export default function Portrait({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`portrait-composition ${compact ? "portrait-compact" : ""}`}
    >
      <div className="portrait-orbit" aria-hidden="true" />
      <div
        className={`portrait-frame ${person.portrait ? "has-portrait" : ""}`}
      >
        {person.portrait ? (
          <Image
            src={person.portrait}
            alt="Ali Asghar wearing a navy crewneck"
            fill
            sizes={
              compact
                ? "(max-width: 599px) 80vw, (max-width: 1100px) 40vw, 470px"
                : "(max-width: 599px) 80vw, (max-width: 799px) 45vw, (max-width: 1391px) 42vw, 522px"
            }
            preload
            quality={90}
            style={{ objectFit: "cover", objectPosition: "center 25%" }}
          />
        ) : (
          <div className="portrait-placeholder">
            <div className="portrait-grid" aria-hidden="true" />
            <span className="portrait-placeholder-top">
              A LITTLE MORE PERSONAL
            </span>
            <svg
              className="portrait-monogram"
              viewBox="0 0 220 170"
              aria-hidden="true"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="m14 139 49-116h18l49 116h-21l-12-30H45l-12 30H14Zm38-47h38L71 45 52 92Z"
              />
              <path
                fillRule="evenodd"
                d="M157 61c-22 0-36 10-38 29h18c2-9 8-14 20-14 13 0 19 6 19 17v2h-21c-26 0-40 10-40 27 0 18 13 28 32 28 13 0 24-5 30-15v13h18V94c0-21-14-33-38-33Zm-7 73c-11 0-17-5-17-13 0-9 7-13 23-13h20v5c0 12-12 21-26 21Z"
              />
              <circle cx="207" cy="140" r="7" fill="#648473" />
            </svg>
            <span className="portrait-placeholder-bottom">
              A face to the work.
              <br />
              <span>Original portrait coming soon.</span>
            </span>
          </div>
        )}
        <span className="portrait-index" aria-hidden="true">
          01 / ALI ASGHAR
        </span>
      </div>
      <div className="portrait-note">
        <span className="location-pin" aria-hidden="true" />
        <div>
          Based in Karachi<span>Building beyond borders.</span>
        </div>
      </div>
      <span className="portrait-cross cross-one" aria-hidden="true">
        +
      </span>
      <span className="portrait-cross cross-two" aria-hidden="true">
        +
      </span>
    </div>
  );
}
