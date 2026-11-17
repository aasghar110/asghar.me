const { chromium } = require("@playwright/test");
const { mkdir } = require("node:fs/promises");

(async () => {
  const browser = await chromium.launch();
  try {
    await mkdir("docs/screenshots", { recursive: true });
    for (const width of [1440, 768, 390, 320]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
      const section = page.locator(".selected-work");
      await section.scrollIntoViewIfNeeded();
      await section.screenshot({
        path: `docs/screenshots/selected-work-${width}.png`,
        style: ".site-header, .skip-link { visibility: hidden !important; }",
      });
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
