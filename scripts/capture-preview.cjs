const { chromium } = require("@playwright/test");
const fs = require("node:fs/promises");
const sharp = require("sharp");
async function main() {
  await fs.mkdir("docs/screenshots", { recursive: true });
  const browser = await chromium.launch(
    process.env.AUDIT_CHROMIUM
      ? { executablePath: process.env.AUDIT_CHROMIUM }
      : {},
  );
  const page = await browser.newPage({ reducedMotion: "reduce" });
  for (const width of [320, 360, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
    await sharp(await page.screenshot({ fullPage: true }))
      .webp({ quality: 85 })
      .toFile(`docs/screenshots/home-${width}.webp`);
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `docs/screenshots/home-hero-${width}.png`,
      });
  }
  for (const route of [
    "about",
    "work",
    "experience",
    "contact",
    "work/invo-pk",
    "work/kidzsearch",
    "work/security-operations",
  ]) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
      await page.goto(`http://localhost:3100/${route}`, {
        waitUntil: "networkidle",
      });
      await sharp(await page.screenshot({ fullPage: true }))
        .webp({ quality: 85 })
        .toFile(`docs/screenshots/${route.replaceAll("/", "-")}-${width}.webp`);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.screenshot({ path: "docs/screenshots/mobile-menu.png" });
  await page.keyboard.press("Escape");
  await page
    .locator(".contact-cta")
    .screenshot({ path: "docs/screenshots/mobile-contact-cta.png" });
  await browser.close();
  console.log("Responsive screenshots captured in docs/screenshots/.");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
