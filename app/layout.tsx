import type { Metadata, Viewport } from "next";
import { Geist, Manrope } from "next/font/google";
import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";
import Analytics from "@/components/portfolio/Analytics";
import ScrollMotion from "@/components/portfolio/ScrollMotion";
import { person } from "@/lib/content";
import { isPreview, siteUrl } from "@/lib/seo";
import "./globals.css";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  colorScheme: "light",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ali Asghar | Software Engineer",
    template: "%s | Ali Asghar",
  },
  description:
    "Ali Asghar is a software engineer building backend systems, full-stack applications, and cloud-based products.",
  applicationName: "Ali Asghar Portfolio",
  authors: [{ name: person.name, url: siteUrl }],
  robots: isPreview
    ? { index: false, follow: false }
    : { index: true, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: person.name,
      jobTitle: person.title,
      url: siteUrl,
      sameAs: [person.github, person.linkedin],
      homeLocation: { "@type": "Place", name: person.location },
      ...(person.portrait
        ? { image: new URL(person.portrait, siteUrl).toString() }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ali Asghar — Software Engineer",
      inLanguage: "en",
      author: { "@id": `${siteUrl}/#person` },
    },
  ];
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ScrollMotion />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <Analytics />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
