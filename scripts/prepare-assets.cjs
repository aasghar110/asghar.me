// Refresh only public-site captures. Never sign into an application to make portfolio assets.
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("@playwright/test");
const sharp = require("sharp");
async function main() {
  await fs.mkdir("public/projects", { recursive: true });
  await fs.mkdir("public/icons", { recursive: true });
  const browser = await chromium.launch(
    process.env.AUDIT_CHROMIUM
      ? { executablePath: process.env.AUDIT_CHROMIUM }
      : {},
  );
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1050 },
    deviceScaleFactor: 1,
  });
  await page.goto("https://invo.pk/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const capture = await page.screenshot();
  await sharp(capture)
    .webp({ quality: 85 })
    .toFile("public/projects/invo-public.webp");
  await browser.close();
  const icons = [
    "dotnet",
    "springboot",
    "nodedotjs",
    "react",
    "nextdotjs",
    "angular",
    "supabase",
    "umbraco",
  ];
  for (const icon of icons) {
    const response = await fetch(
      `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${icon}.svg`,
    );
    if (!response.ok) throw new Error(`Icon unavailable: ${icon}`);
    await fs.writeFile(
      path.join("public/icons", `${icon}.svg`),
      await response.text(),
    );
  }
  const license = await fetch(
    "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/LICENSE.md",
  );
  await fs.writeFile("public/icons/LICENSE.md", await license.text());
  console.log("Public screenshot and technology icons prepared.");
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
