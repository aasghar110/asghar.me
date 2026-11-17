import { test, expect } from "@playwright/test";

test("profile and project evidence are available to crawlers without JavaScript", async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".hero-description")).toContainText(
    "software engineer in Karachi",
  );
  await expect(page).toHaveTitle(
    "Ali Asghar | Backend & Full-Stack Engineer in Karachi",
  );
  await page.goto("/about");
  const profile = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(profile.map((value) => JSON.parse(value)).flat()).toContainEqual(
    expect.objectContaining({
      "@type": "ProfilePage",
      mainEntity: { "@id": "https://asghar.me/#person" },
    }),
  );
  await page.goto("/work/invo-pk");
  await expect(
    page.getByRole("heading", { name: "What problem does Invo.pk address?" }),
  ).toBeVisible();
  const data = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  )
    .map((value) => JSON.parse(value))
    .flat();
  expect(data).toContainEqual(
    expect.objectContaining({
      "@type": "WebPage",
      author: { "@id": "https://asghar.me/#person" },
      mainEntity: expect.objectContaining({
        "@type": "CreativeWork",
        name: "Invo.pk",
      }),
    }),
  );
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  await context.close();
});

test("Search Console-only pages make no analytics requests", async ({
  page,
}) => {
  const tracking: string[] = [];
  page.on("request", (request) => {
    if (/google-analytics\.com|googletagmanager\.com/.test(request.url()))
      tracking.push(request.url());
  });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  expect(tracking).toEqual([]);
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
  await page.goto("/privacy");
  await expect(page.getByText(/does not load Google Analytics/)).toBeVisible();
});
