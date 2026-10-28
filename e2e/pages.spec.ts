import { expect, test } from "./fixtures";

const POST_SLUG = "intro-generative-ui";
const POST_TITLE = "What is Generative UI and how to get started?";

test("home page renders", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Yash Thaker");
  await expect(page.getByText("Hi, I'm Yash")).toBeVisible();
});

test("blog lists posts and opens one", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Blog", level: 1 })).toBeVisible();

  await page.getByRole("link", { name: POST_TITLE }).click();
  await expect(page).toHaveURL(`/blog/${POST_SLUG}`);
  await expect(page.getByRole("heading", { name: POST_TITLE, level: 1 })).toBeVisible();
  await expect(page.locator("article")).not.toBeEmpty();
});

// Covers the async params change in generateMetadata.
test("blog post has metadata", async ({ page }) => {
  await page.goto(`/blog/${POST_SLUG}`);
  await expect(page).toHaveTitle(`${POST_TITLE} | Yash Thaker`);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/og\?title=/
  );
});

test.describe(() => {
  test.use({ allowHttpErrors: true });

  test("unknown blog post returns 404", async ({ page }) => {
    const res = await page.goto("/blog/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("This page could not be found.")).toBeVisible();
  });
});

test("dock navigates between pages", async ({ page }) => {
  await page.goto("/");
  // The dock is rendered after the page content, so its links come last.
  const dockLink = (href: string) => page.locator(`a[href="${href}"]`).last();

  await dockLink("/blog").click();
  await expect(page).toHaveURL("/blog");
  await dockLink("/chat").click();
  await expect(page).toHaveURL("/chat");
  await dockLink("/").click();
  await expect(page).toHaveURL("/");
});

test("theme toggle switches to dark and back", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: "Toggle theme" });

  await expect(html).not.toHaveClass(/dark/);
  await toggle.click();
  await expect(html).toHaveClass(/dark/);
  await toggle.click();
  await expect(html).not.toHaveClass(/dark/);
});

test("og image renders", async ({ request }) => {
  const res = await request.get("/og?title=Hello");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");
  expect((await res.body()).length).toBeGreaterThan(1000);
});
