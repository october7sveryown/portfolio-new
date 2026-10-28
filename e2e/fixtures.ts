import { test as base, expect } from "@playwright/test";

// Fails any test whose page throws, logs an error, or gets an error response
// from this app. That is how hydration mismatches and client crashes show up.
// Third-party resources (logos, avatars) are ignored.
export const test = base.extend<{ allowHttpErrors: boolean; pageErrors: string[] }>({
  allowHttpErrors: [false, { option: true }],
  pageErrors: [
    async ({ page, baseURL, allowHttpErrors }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      page.on("console", (msg) => {
        // Failed loads are checked below, where the URL is known.
        if (msg.type() === "error" && !msg.text().startsWith("Failed to load resource")) {
          errors.push(msg.text());
        }
      });
      page.on("response", (res) => {
        if (!allowHttpErrors && res.status() >= 400 && res.url().startsWith(baseURL!)) {
          errors.push(`${res.status()} ${res.url()}`);
        }
      });
      await use(errors);
      expect(errors, "page logged errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
