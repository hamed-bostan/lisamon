import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const browser = await chromium.launch();
const samples = { home: [], artist: [] };
for (let run = 0; run < 3; run++) {
for (const [name, path, trigger, dialog] of [
  ["home", "/", /BAS-RELIEF.*open catalogue/i, /BAS-RELIEF/i],
  ["artist", "/artist", /YELLOW RED FISH.*open gallery/i, /YELLOW RED FISH/i],
]) {
  const page = await browser.newPage();
  const pending = [];
  let phase = "initial";
  const bytes = { initial: 0, open: 0 };
  page.on("response", response => {
    if (response.request().resourceType() !== "script") return;
    const atRequest = phase;
    pending.push(response.body().then(body => { bytes[atRequest] += body.length; }).catch(() => {}));
  });
  await page.goto(`http://127.0.0.1:3210${path}`);
  await page.waitForLoadState("networkidle");
  await Promise.all(pending);
  phase = "open";
  await page.getByRole(name === "home" ? "link" : "button", { name: trigger }).click();
  await page.getByRole("dialog", { name: dialog }).waitFor();
  await page.waitForLoadState("networkidle");
  await Promise.all(pending);
  samples[name].push(bytes);
  await page.close();
}
}
await browser.close();
const median = Object.fromEntries(Object.entries(samples).map(([name, values]) => [name, {
  initial: values.map(value => value.initial).sort((a, b) => a - b)[1],
  open: values.map(value => value.open).sort((a, b) => a - b)[1],
}]));
const results = { median, samples };
writeFileSync("docs/perf/js-transfer.json", JSON.stringify(results, null, 2) + "\n");
console.log(results);
