import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("@playwright/test");
await mkdir("docs/reports", { recursive: true });
const measurements = [];
for (const profile of ["mobile", "desktop"]) {
  const args = [
    "node_modules/lighthouse/cli/index.js",
    "http://localhost:3100/",
    "--quiet",
    "--chrome-flags=--headless --no-sandbox",
    "--output=json",
    "--output=html",
    `--output-path=docs/reports/lighthouse-${profile}`,
  ];
  if (profile === "desktop") args.push("--preset=desktop");
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      env: {
        ...process.env,
        CHROME_PATH: process.env.CHROME_PATH || chromium.executablePath(),
      },
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`Lighthouse ${profile} failed: ${code}`)),
    );
  });
  const report = JSON.parse(
    await readFile(`docs/reports/lighthouse-${profile}.report.json`, "utf8"),
  );
  if (report.runtimeError) throw new Error(report.runtimeError.message);
  const result = {
    profile,
    version: report.lighthouseVersion,
    time: report.fetchTime,
    scores: Object.fromEntries(
      Object.entries(report.categories).map(([key, category]) => [
        key,
        Math.round(category.score * 100),
      ]),
    ),
    metrics: Object.fromEntries(
      [
        "first-contentful-paint",
        "largest-contentful-paint",
        "total-blocking-time",
        "cumulative-layout-shift",
        "speed-index",
      ].map((key) => [
        key,
        {
          value: report.audits[key].numericValue,
          display: report.audits[key].displayValue,
        },
      ]),
    ),
    environment: report.environment,
    settings: report.configSettings,
  };
  measurements.push(result);
  console.log(JSON.stringify(result));
}
await writeFile(
  "docs/reports/metrics.json",
  JSON.stringify(measurements, null, 2) + "\n",
);
