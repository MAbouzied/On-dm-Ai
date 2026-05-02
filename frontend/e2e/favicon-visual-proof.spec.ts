import { test } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Writes PNG screenshots under e2e/.artifacts/ for manual verification.
 * Run: pnpm exec playwright test e2e/favicon-visual-proof.spec.ts
 */
test.describe("Favicon visual proof (artifacts)", () => {
  test("save screenshots proving favicon URL serves app/icon.png", async ({
    page,
    baseURL,
  }) => {
    const outDir = path.join(process.cwd(), "e2e", ".artifacts");
    fs.mkdirSync(outDir, { recursive: true });

    await page.setViewportSize({ width: 1200, height: 800 });

    await page.goto(`${baseURL}/en`, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outDir, "01-home-en.png"),
      fullPage: false,
    });

    const href = await page.locator('link[rel="icon"]').first().getAttribute("href");
    if (!href) throw new Error("No link[rel=icon] on /en");
    const iconUrl = new URL(href, baseURL).href;

    await page.goto(iconUrl, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outDir, "02-favicon-url-direct.png"),
      fullPage: true,
    });
  });
});
