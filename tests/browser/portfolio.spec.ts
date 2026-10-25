import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about",
  "/work",
  "/experience",
  "/contact",
  "/privacy",
  "/work/invo-pk",
  "/work/security-operations",
  "/work/kidzsearch",
  "/work/education-platform",
  "/work/investment-portal",
];

test("all public routes have meaningful HTML, metadata, and valid JSON-LD", async ({
  page,
  request,
}) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  const titles = new Set();
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    expect(html).toContain("<h1");
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title), route).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S.{30,}/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://asghar.me${route === "/" ? "" : route}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /opengraph-image/,
    );
    for (const schema of await page
      .locator('script[type="application/ld+json"]')
      .allTextContents())
      expect(() => JSON.parse(schema)).not.toThrow();
  }
  expect(runtimeErrors).toEqual([]);
});

test("layouts fit every requested viewport", async ({ page }) => {
  for (const width of [320, 360, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/about",
      "/work",
      "/experience",
      "/contact",
      "/work/invo-pk",
      "/work/security-operations",
    ]) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      expect(overflow, `${route} at ${width}px`).toBe(false);
    }
  }
});

test("mobile navigation manages focus, closes with Escape, and follows links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link")
      .first(),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link")
      .last(),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /About/ })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await page.goBack();
  await expect(page).toHaveURL("http://localhost:3100/");
});

test("marquee pauses and reduced motion gives a static list", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: /Pause motion|Play motion/i }),
  ).toHaveCount(0);
  const technologySection = page.getByRole("region", {
    name: "Technologies I work with",
    exact: true,
  });
  await technologySection.focus();
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.keyboard.press("Tab");
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-play-state",
    "running",
  );
  await page.locator(".marquee").hover();
  await expect(page.locator(".marquee-track")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('.marquee-group[aria-hidden="true"]')).toBeHidden();
  await expect(page.locator(".hero-copy")).toHaveCSS("animation-name", "none");
});

test("contact is honest when unconfigured and validates invalid API input", async ({
  page,
  request,
}) => {
  await page.goto("/contact");
  await expect(
    page.getByText("The form is temporarily unavailable."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send message" }),
  ).toBeDisabled();
  await expect(page.getByLabel("Your name")).toHaveAttribute("name", "name");
  const invalid = await request.post("/api/contact", {
    headers: { Origin: "http://localhost:3100" },
    data: { email: "bad" },
  });
  expect(invalid.status()).toBe(400);
  const valid = await request.post("/api/contact", {
    headers: { Origin: "http://localhost:3100" },
    data: {
      name: "Test",
      email: "test@example.com",
      subject: "A project",
      message: "A valid test message.",
      website: "",
      startedAt: Date.now() - 5000,
    },
  });
  expect(valid.status()).toBe(503);
});

test("all internal links and static assets resolve; missing routes are real 404s", async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")!)))
      links.add(href.split("#")[0]);
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          (images as HTMLImageElement[])
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.src),
        ),
    ).toEqual([]);
  }
  for (const href of links)
    expect((await request.get(href)).status(), href).toBe(200);
  for (const route of [
    "/not-a-page",
    "/work/not-a-project",
    "/ali-portrait.png",
    "/invo-dashboard.png",
    "/invo-mobile-home.jpeg",
    "/invo-mobile-pos.jpeg",
  ])
    expect((await request.get(route)).status()).toBe(404);
  for (const route of ["/og-image.png", "/og-image1.png", "/work/"])
    expect((await request.get(route, { maxRedirects: 0 })).status()).toBe(308);
  const socialImage = await request.get("/opengraph-image");
  expect(socialImage.status()).toBe(200);
  expect(socialImage.headers()["content-type"]).toContain("image/png");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of routes.filter((route) => route !== "/"))
    expect(sitemap).toContain(`https://asghar.me${route}`);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://asghar.me/sitemap.xml",
  );
});

test("content remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`http://localhost:3100${route}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main")).not.toBeEmpty();
  }
  await context.close();
});

test("primary pages pass automated WCAG checks on desktop and mobile", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/about",
      "/work",
      "/experience",
      "/contact",
      "/work/invo-pk",
    ]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        `${route} at ${width}`,
      ).toEqual([]);
    }
  }
});
