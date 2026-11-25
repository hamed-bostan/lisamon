import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("static routes, metadata, and accessibility", async ({ page, request }) => {
  for (const path of ["/", "/artist"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('<link rel="canonical"');
    await page.goto(path);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator(".m-intro-intro")).toHaveCount(0, { timeout: 6000 });
    const scan = await new AxeBuilder({ page }).analyze();
    expect(scan.violations).toEqual([]);
  }
  expect((await request.get("/missing-page")).status()).toBe(404);
  expect((await request.get("/catalogue/unknown-category")).status()).toBe(404);
  const missing = await request.get("/missing-page");
  expect(await missing.text()).toContain('name="robots" content="noindex"');
  expect(missing.headers()["x-content-type-options"]).toBe("nosniff");
  expect(missing.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(missing.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  const home = await request.get("/");
  const imagePath = (await home.text()).match(/\/_next\/image\?[^" ]+/)?.[0].replaceAll("&amp;", "&");
  expect(imagePath).toBeTruthy();
  expect((await request.get(imagePath!)).status()).toBe(200);
  for (const [path, canonical] of [
    ["/", "https://www.lisamon.ae"],
    ["/artist", "https://www.lisamon.ae/artist"],
    ["/catalogue/bas-relief-sculptural-walls", "https://www.lisamon.ae/catalogue/bas-relief-sculptural-walls"],
  ]) {
    const html = await (await request.get(path)).text();
    expect(html).toContain(`rel="canonical" href="${canonical}"`);
    expect(html).toContain(`property="og:url" content="${canonical}"`);
  }
  for (const image of ["/images/home/hero.webp", "/images/artist/portrait.jpg", "/images/catalogue/covers/01-bas-relief.jpg"]) {
    expect((await request.get(image)).status()).toBe(200);
  }
  expect(await (await request.get("/robots.txt")).text()).toContain("https://www.lisamon.ae/sitemap.xml");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect((sitemap.match(/<loc>/g) ?? []).length).toBe(6);
});

test("nested catalogue dialog closes one layer at a time", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  const trigger = page.getByRole("link", { name: /BAS-RELIEF.*open catalogue/i });
  await expect(page.locator(".m-intro-intro")).toHaveCount(0, { timeout: 6000 });
  await trigger.click();
  const gallery = page.getByRole("dialog", { name: /BAS-RELIEF/i });
  await expect(gallery).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await gallery.getByRole("button", { name: /Enlarge BAS-RELIEF.*work 1 \(/i }).click();
  await expect(page.getByRole("dialog", { name: /BAS-RELIEF.*work 1/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(gallery).toBeVisible();
  await expect(gallery.getByRole("button", { name: /work 1 \(/i })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(gallery).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  expect(errors.filter(error => /hydration/i.test(error))).toEqual([]);
});

test("long gallery scrolls at 320px and restores body scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  await expect(page.locator(".m-intro-intro")).toHaveCount(0, { timeout: 6000 });
  await page.getByRole("link", { name: /BAS-RELIEF.*open catalogue/i }).click();
  const gallery = page.getByRole("dialog", { name: /BAS-RELIEF/i });
  expect(await gallery.evaluate(element => element.scrollHeight > element.clientHeight)).toBeTruthy();
  await gallery.evaluate(element => { element.scrollTop = 200; });
  expect(await gallery.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("artist media and biography remain accessible", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/artist");
  await page.getByText("About the Artist", { exact: true }).first().click();
  await expect(page.getByText("Holding a Bachelor of Arts in Painting", { exact: false })).toBeVisible();
  const biography = page.getByRole("dialog", { name: "About the Artist", exact: true });
  await expect(biography).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(biography).not.toBeVisible();
  await expect(page.getByRole("button", { name: "About the Artist — read full biography", exact: true })).toBeFocused();
  await page.getByRole("button", { name: /YELLOW RED FISH.*open gallery/i }).click();
  await expect(page.getByRole("dialog", { name: "YELLOW RED FISH" })).toBeVisible();
});

test("category routes expose existing images and biography without JavaScript", async ({ browser, request }) => {
  const path = "/catalogue/bas-relief-sculptural-walls";
  const response = await request.get(path);
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("BAS-RELIEF &amp; SCULPTURAL WALL");
  expect(html).toContain("BAS-RELIEF &amp; SCULPTURAL WALL — work 1");
  expect(html).toContain("/_next/image?");
  const artist = await (await request.get("/artist")).text();
  expect(artist).toContain("Holding a Bachelor of Arts in Painting");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("link", { name: /BAS-RELIEF.*open catalogue/i }).click();
  await expect(page).toHaveURL(new RegExp(path));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("BAS-RELIEF & SCULPTURAL WALL");
  await context.close();
});

test("category work and image totals retain their order", async ({ page }) => {
  const entries = [
    ["bas-relief-sculptural-walls", 18],
    ["sculptures-installations", 21],
    ["decorative-textured-walls", 2],
    ["murals-wall-paintings", 3],
  ] as const;
  for (const [slug, count] of entries) {
    await page.goto(`/catalogue/${slug}`);
    await expect(page.locator("main img")).toHaveCount(count);
  }
});

test("mobile contact and skip link fit the viewport", async ({ page, browserName }) => {
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 700 });
    await page.goto("/");
    await page.getByRole("button", { name: "Contact", exact: true }).click();
    const pill = page.getByRole("link", { name: /DIRECT WHATSAPP/i });
    await expect(pill).toBeVisible();
    const box = await pill.boundingBox();
    expect(box && box.x >= 0 && box.x + box.width <= width).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    if (width === 320 || width === 1280) await page.screenshot({ path: `docs/dock-${width}.png` });
    await page.keyboard.press("Escape");
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Contact", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.reload();
  if (browserName === "webkit") await page.getByRole("link", { name: "Skip to main content" }).focus();
  else await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("intro plays on load and reduced motion hides it", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const intro = page.locator(".m-intro-intro");
  await expect(intro).toBeVisible();
  expect(await intro.evaluate(el => getComputedStyle(el).animationName)).toBe("slideAway");
  await expect(intro).toHaveCount(0, { timeout: 6000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("main")).toBeVisible();
  await expect(intro).not.toBeVisible();
  expect(await page.locator(".m-home-logoMark").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await page.reload();
  await expect(page.getByRole("main")).toBeVisible();
});

test("601px catalogue tile requests enough image detail", async ({ page }) => {
  await page.setViewportSize({ width: 601, height: 800 });
  await page.goto("/");
  await expect(page.locator(".m-intro-intro")).toHaveCount(0, { timeout: 6000 });
  await page.getByRole("link", { name: /BAS-RELIEF.*open catalogue/i }).click();
  const image = page.getByRole("dialog", { name: /BAS-RELIEF/i }).getByRole("img", { name: /work 1/i }).first();
  await expect(image).toBeVisible();
  await page.screenshot({ path: "docs/tile-601.png" });
  const metrics = await image.evaluate((element: HTMLImageElement) => ({
    box: element.getBoundingClientRect().width,
    natural: element.naturalWidth,
    request: element.currentSrc,
    candidate: Number(new URL(element.currentSrc).searchParams.get("w")),
  }));
  console.log("601px tile", metrics);
  expect(metrics.candidate).toBeGreaterThanOrEqual(Math.floor(metrics.box));
});

test("failed artist media import offers recovery", async ({ page }) => {
  await page.goto("/artist");
  await page.waitForLoadState("networkidle");
  let aborted = false;
  await page.route("**/_next/static/chunks/**", async route => {
    if (route.request().resourceType() !== "script") return route.continue();
    const response = await route.fetch();
    const body = await response.body();
    if (body.toString().includes("SOLO EXHIBITION")) {
      aborted = true;
      return route.abort();
    }
    return route.fulfill({ response, body });
  });
  await page.getByRole("button", { name: /YELLOW RED FISH.*open gallery/i }).click();
  await expect(page.getByText("Artwork could not be loaded.")).toBeVisible();
  expect(aborted).toBeTruthy();
  await expect(page.getByRole("button", { name: "Reload page" })).toBeVisible();
  await page.unrouteAll({ behavior: "wait" });
  await page.getByRole("button", { name: "Reload page" }).click();
  await expect(page.locator("main#main-content")).toBeVisible();
});

test("late artist media response cannot reopen a closed selection", async ({ page }) => {
  await page.goto("/artist");
  await page.waitForLoadState("networkidle");
  let release: (() => void) | undefined;
  await page.route("**/_next/static/chunks/**", async route => {
    if (route.request().resourceType() !== "script") return route.continue();
    const response = await route.fetch();
    const body = await response.body();
    if (body.toString().includes("SOLO EXHIBITION")) {
      await new Promise<void>(resolve => { release = resolve; });
    }
    return route.fulfill({ response, body });
  });
  await page.getByRole("button", { name: /YELLOW RED FISH.*open gallery/i }).click();
  await expect(page.getByRole("status").filter({ hasText: "Loading artwork" })).toBeVisible();
  await page.getByRole("button", { name: /A FOLDED WOMAN.*open gallery/i }).click();
  await page.getByRole("button", { name: "Close" }).click();
  release?.();
  await page.waitForTimeout(300);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("failed category chunk preserves recovery controls", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.route("**/_next/static/chunks/**", async route => {
    if (route.request().resourceType() !== "script") return route.continue();
    const response = await route.fetch();
    const body = await response.body();
    if (body.toString().includes("Gallery coming soon")) return route.abort();
    return route.fulfill({ response, body });
  });
  await page.getByRole("link", { name: /BAS-RELIEF.*open catalogue/i }).click();
  await expect(page.getByText("Catalogue could not be loaded.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Reload page" })).toBeVisible();
  await page.unrouteAll({ behavior: "wait" });
  await page.getByRole("button", { name: "Reload page" }).click();
  await expect(page.locator("main#main-content")).toBeVisible();
});

test("broken enlarged image leaves close and navigation controls", async ({ page }) => {
  await page.route("**/_next/image?**", route => route.abort());
  await page.goto("/");
  await page.getByRole("link", { name: /BAS-RELIEF.*open catalogue/i }).click();
  await page.getByRole("dialog", { name: /BAS-RELIEF/i }).getByRole("button", { name: /work 1 \(/i }).click();
  const viewer = page.getByRole("dialog", { name: /work 1/i });
  await expect(viewer.getByText("Image unavailable.").first()).toBeVisible();
  await expect(viewer.getByRole("button", { name: "Close image" })).toBeVisible();
  await expect(viewer.getByRole("button", { name: "Next image" })).toBeEnabled();
});
