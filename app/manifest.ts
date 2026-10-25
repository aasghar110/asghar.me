import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ali Asghar — Software Engineer",
    short_name: "Ali Asghar",
    description:
      "Selected work and experience of Ali Asghar, Software Engineer.",
    start_url: "/",
    display: "browser",
    background_color: "#f8fafc",
    theme_color: "#f8fafc",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
