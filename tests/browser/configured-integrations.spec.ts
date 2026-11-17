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

test("preview responses prevent indexing", async ({ page, request }) => {
  test.skip(
    process.env.QA_INTEGRATIONS !== "1",
    "Run against a preview build.",
  );
  await page.goto("/");
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
