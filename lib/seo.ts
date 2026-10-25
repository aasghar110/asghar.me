import type { Metadata } from "next";
export const siteUrl = "https://asghar.me";
export const isPreview = process.env.VERCEL_ENV === "preview";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Ali Asghar`,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Ali Asghar — Software Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Ali Asghar`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
