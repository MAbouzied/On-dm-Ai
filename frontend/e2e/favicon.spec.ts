import { test, expect } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";
import { createHash } from "node:crypto";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function sha256(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

test.describe("Favicon (app/icon.png)", () => {
  test("document exposes a PNG favicon link and served bytes match src/app/icon.png", async ({
    page,
    request,
    baseURL,
  }) => {
    expect(baseURL).toBeTruthy();

    const iconPath = path.join(process.cwd(), "src/app/icon.png");
    expect(fs.existsSync(iconPath), `Missing favicon source at ${iconPath}`).toBe(true);
    const expectedPng = fs.readFileSync(iconPath);
    expect(expectedPng.subarray(0, 8).equals(PNG_MAGIC)).toBe(true);

    await page.goto("/en", { waitUntil: "networkidle" });

    const iconLink = page.locator('link[rel="icon"], link[rel="shortcut icon"]').first();
    await expect(iconLink).toBeAttached();

    const href = await iconLink.getAttribute("href");
    expect(href, "<link rel=\"icon\"> must have href").toBeTruthy();

    const iconUrl = new URL(href!, baseURL).href;
    const res = await request.get(iconUrl);

    expect(res.status(), `GET ${iconUrl}`).toBe(200);

    const ct = res.headers()["content-type"] ?? "";
    expect(ct).toMatch(/image\/png/i);

    const body = Buffer.from(await res.body());
    expect(body.subarray(0, 8).equals(PNG_MAGIC)).toBe(true);

    expect(sha256(body)).toBe(sha256(expectedPng));
  });
});
