import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ali Asghar — Software Engineer",
  description:
    "Ali Asghar — Software Engineer. .NET / Spring Boot / Node.js / React / Cloud. Karachi, Pakistan.",
  openGraph: {
    title: "Ali Asghar — Software Engineer",
    description:
      ".NET / Spring Boot / Node.js / React / Cloud. Building enterprise backends, microservices, and SaaS products.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#07070E"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#F4F1EA"
          media="(prefers-color-scheme: light)"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
        {/* Apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('asghar-theme');if(t==='light')document.documentElement.classList.add('theme-light')}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
