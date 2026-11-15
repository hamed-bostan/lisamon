import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const browser = await chromium.launch();
const measurements = [];
const viewers = [];
for (const dpr of [1, 2]) {
  for (const width of [320, 600, 601, 630, 768, 1024, 1280, 1600]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: dpr });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3210/");
    await page.getByRole("link", { name: /BAS-RELIEF.*open catalogue/i }).click();
    const image = page.getByRole("dialog", { name: /BAS-RELIEF/i }).getByRole("img", { name: /work 1/i }).first();
    await image.waitFor();
    const result = await image.evaluate(async img => {
      await img.decode();
      const selected = new URL(img.currentSrc || img.src, location.href);
      const response = await fetch(selected);
      return {
        tileWidth: Math.round(img.getBoundingClientRect().width),
        candidateWidth: Number(selected.searchParams.get("w")),
        responseBytes: (await response.arrayBuffer()).byteLength,
      };
    });
    measurements.push({ width, dpr, ...result });
    await context.close();
  }
}
for (const width of [320, 768, 1536]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3210/");
  await page.getByRole("link", { name: /BAS-RELIEF.*open catalogue/i }).click();
  await page.getByRole("dialog", { name: /BAS-RELIEF/i }).getByRole("button", { name: /work 1 \(/i }).click();
  const image = page.getByRole("dialog", { name: /work 1/i }).getByRole("img").first();
  const result = await image.evaluate(async img => {
    await img.decode();
    const selected = new URL(img.currentSrc || img.src, location.href);
    const response = await fetch(selected);
    return { imageWidth: Math.round(img.getBoundingClientRect().width), candidateWidth: Number(selected.searchParams.get("w")), responseBytes: (await response.arrayBuffer()).byteLength };
  });
  viewers.push({ width, ...result });
  await context.close();
}
await browser.close();
writeFileSync("docs/perf/image-candidates.json", JSON.stringify({ tiles: measurements, viewers }, null, 2) + "\n");
console.table(measurements);
console.table(viewers);
