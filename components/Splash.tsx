"use client";

export default function Splash({ gone }: { gone: boolean }) {
  return (
    <div className={`splash ${gone ? "gone" : ""}`}>
      <div className="mark">
        <span className="blk" />
        ASGHAR.ME
      </div>
    </div>
  );
}
