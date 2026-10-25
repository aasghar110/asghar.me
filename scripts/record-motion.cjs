const { chromium } = require("@playwright/test");
const fs = require("node:fs/promises");

async function main() {
  await fs.mkdir("docs/previews", { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "no-preference",
    recordVideo: { dir: "docs/previews", size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await page.waitForFunction(
    () =>
      document.querySelector("main")?.getAttribute("data-scroll-motion") ===
      "gsap",
  );
  await page.waitForTimeout(800);
  for (let step = 0; step < 7; step++) {
    await page.evaluate(() =>
      window.scrollBy({ top: 470, behavior: "smooth" }),
    );
    await page.waitForTimeout(1200);
  }
  const video = page.video();
  await context.close();
  await video.saveAs("docs/previews/scroll-motion.webm");
  await video.delete();
  await browser.close();
  console.log("Saved docs/previews/scroll-motion.webm");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
