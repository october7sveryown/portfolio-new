import { expect, test } from "./fixtures";

// None of these reach the model: the UI tests mock /api/chat, and the API
// tests send requests that are rejected before the model is called.

test.describe("chat page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/chat");
  });

  test("shows the input and starters", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Ask me anything" })).toBeVisible();
    await expect(page.getByLabel("Ask me anything about my work")).toBeFocused();
    await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Show me your AI projects" })).toBeVisible();
  });

  test("enables send once there is text", async ({ page }) => {
    await page.getByLabel("Ask me anything about my work").fill("   ");
    await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
    await page.getByLabel("Ask me anything about my work").fill("Hi");
    await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
  });
});

test.describe("chat errors", () => {
  test.use({ allowHttpErrors: true });

  test("shows the API error and lets the user clear", async ({ page }) => {
    await page.goto("/chat");
    await page.route("/api/chat", (route) =>
      route.fulfill({ status: 429, json: { error: "Slow down a little." } })
    );

    await page.getByLabel("Ask me anything about my work").fill("What are you building?");
    await page.keyboard.press("Enter");

    await expect(page.getByText("What are you building?")).toBeVisible();
    await expect(page.getByText("Slow down a little.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Retry" })).toBeVisible();

    await page.getByRole("button", { name: "Clear" }).click();
    await expect(page.getByText("What are you building?")).toBeHidden();
    await expect(page.getByRole("button", { name: "Show me your AI projects" })).toBeVisible();
  });
});

test.describe("chat API", () => {
  const userMessage = (text: string) => ({
    id: "m1",
    role: "user",
    parts: [{ type: "text", text }],
  });

  test("rejects a malformed body", async ({ request }) => {
    const res = await request.post("/api/chat", { data: { nope: true } });
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid request." });
  });

  test("rejects invalid messages", async ({ request }) => {
    const res = await request.post("/api/chat", { data: { messages: [{ role: "x" }] } });
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid messages." });
  });

  test("rejects messages over 500 characters", async ({ request }) => {
    const res = await request.post("/api/chat", {
      data: { messages: [userMessage("a".repeat(501))] },
    });
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toMatch(/under 500 characters/);
  });
});
