import { test, expect } from "@playwright/test";

test("scroll reveals complete, keyboard focus stays visible, and routes reset cleanly", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("main")).toHaveAttribute(
    "data-scroll-motion",
    "gsap",
    { timeout: 15000 },
  );
  const card = page.locator(".featured-grid > .project-card").first();
  await expect(card).toHaveAttribute("data-scroll-reveal", "armed");
  await expect(card).toHaveCSS("opacity", "0");
  await expect(card).toHaveCSS("visibility", "visible");
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-scroll-reveal", "complete");
  await expect(card).toHaveCSS("opacity", "1");
  const contact = page.locator(".contact-cta");
  await contact.locator("a").first().focus();
  await expect(contact).toHaveCSS("opacity", "1");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("main")).toHaveAttribute(
    "data-scroll-motion",
    "gsap",
    { timeout: 15000 },
  );
  await expect(page.locator("h1")).toBeVisible();
  const strength = page.locator(".strength-card").first();
  await strength.scrollIntoViewIfNeeded();
  await expect(strength).toHaveCSS("opacity", "1");
  await page.goBack();
  await expect(page.locator("h1")).toBeVisible();
  expect(errors).toEqual([]);
});

test("reduced motion skips GSAP and changing preference restores every reveal", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://localhost:3100/");
  await expect(page.locator("main")).toHaveAttribute(
    "data-scroll-motion",
    "reduced",
  );
  await expect(page.locator("[data-scroll-reveal]")).toHaveCount(0);
  await expect(
    page.locator(".featured-grid > .project-card").first(),
  ).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("main")).toHaveAttribute(
    "data-scroll-motion",
    "gsap",
    { timeout: 15000 },
  );
  await expect(page.locator("[data-scroll-reveal='armed']").first()).toHaveCSS(
    "opacity",
    "0",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("main")).toHaveAttribute(
    "data-scroll-motion",
    "reduced",
  );
  await expect(page.locator("[data-scroll-reveal]")).toHaveCount(0);
  await expect(
    page.locator(".featured-grid > .project-card").first(),
  ).toHaveCSS("opacity", "1");
  await context.close();
});
