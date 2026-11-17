// Refresh only public-site captures. Never sign into an application to make portfolio assets.
const fs = require("node:fs/promises");
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
  await require("./refresh-technology-icons.cjs")();
  console.log("Public screenshot and technology icons prepared.");
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
