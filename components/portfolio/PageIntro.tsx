export default function PageIntro({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-intro container">
      <div className="section-label">{eyebrow}</div>
      <h1>
        {title}
        <br />
        <span>{accent}</span>
      </h1>
      <div className="page-intro-copy">{children}</div>
    </div>
  );
}
