import Link from "next/link";
import { Arrow } from "@/components/portfolio/Icons";
export default function NotFound() {
  return (
    <section className="container not-found">
      <div className="section-label">404 / A SMALL DETOUR</div>
      <h1>
        This page took
        <br />
        <span>a different route.</span>
      </h1>
      <p>The address may have changed, or the page doesn’t exist.</p>
      <Link prefetch={false} href="/" className="button button-primary">
        Back to home <Arrow />
      </Link>
      <Link prefetch={false} href="/work" className="text-link">
        Explore selected work <Arrow diagonal />
      </Link>
    </section>
  );
}
