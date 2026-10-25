import { test, expect } from "@playwright/test";

test("configured contact form validates, preserves failures, and reports accepted delivery", async ({
  page,
}) => {
  test.skip(
    process.env.QA_INTEGRATIONS !== "1",
    "Requires a local server with dummy contact settings; delivery is mocked.",
  );
  await page.goto("/contact");
  const submit = page.getByRole("button", { name: "Send message" });
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.getByText("Please enter your email.")).toBeVisible();
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("Test project");
  await page
    .getByLabel("Your message")
    .fill("A useful message to exercise form handling.");
  let attempts = 0;
  await page.route("**/api/contact", async (route) => {
    attempts++;
    await route.fulfill({
      status: attempts === 1 ? 503 : 200,
      contentType: "application/json",
      body: JSON.stringify(
        attempts === 1
          ? { error: "Delivery is temporarily unavailable." }
          : {
              ok: true,
              message:
                "Your message has been accepted for delivery. Thank you for getting in touch.",
            },
      ),
    });
  });
  await submit.click();
  await expect(page.getByRole("status")).toContainText(
    "Delivery is temporarily unavailable.",
  );
  await expect(page.getByLabel("Your message")).toHaveValue(
    "A useful message to exercise form handling.",
  );
  await submit.click();
  await expect(page.getByRole("status")).toContainText("accepted for delivery");
  await expect(page.getByLabel("Your name")).toHaveValue("");
  expect(attempts).toBe(2);
});

test("configured analytics respects consent and preview responses prevent indexing", async ({
  page,
  request,
}) => {
  test.skip(
    process.env.QA_INTEGRATIONS !== "1",
    "Run against a preview build with the documented dummy analytics ID.",
  );
  let scripts = 0;
  await page.route(
    "https://www.googletagmanager.com/gtag/js**",
    async (route) => {
      scripts++;
      await route.fulfill({
        contentType: "application/javascript",
        body: "/* Mock analytics transport: never contact Google during tests. */",
      });
    },
  );
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "A small privacy choice." }),
  ).toBeVisible();
  expect(scripts).toBe(0);
  await page.getByRole("button", { name: "Allow analytics" }).click();
  await expect.poll(() => scripts).toBe(1);
  await expect
    .poll(() => page.evaluate(() => window.dataLayer?.length || 0))
    .toBeGreaterThanOrEqual(3);
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window.dataLayer || []).filter(
            (item) => (item as Record<number, unknown>)[1] === "page_view",
          ).length,
      ),
    )
    .toBe(2);
  expect(scripts).toBe(1);
  await page.getByRole("button", { name: "Cookie preferences" }).click();
  await page.getByRole("button", { name: "No thanks" }).click();
  expect(
    await page.evaluate(() => localStorage.getItem("asghar-analytics-consent")),
  ).toBe("denied");
  expect(await page.evaluate(() => window["ga-disable-G-TEST123"])).toBe(true);
  await page.reload();
  expect(scripts).toBe(1);
  const response = await request.get("/");
  expect(response.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
});
