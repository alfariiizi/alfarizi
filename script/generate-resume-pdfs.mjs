import fs from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { spawn } from "node:child_process";

import puppeteer from "puppeteer";

import {
  buildResumePdfFilename,
  buildResumePdfRouteSegment,
} from "../src/app/resume/utils.js";

const PORT = await getFreePort();
const BASE_URL = `http://127.0.0.1:${PORT}`;
const resumeFiles = {
  atsFull: path.resolve(
    "public/resume/ats",
    buildResumePdfFilename(),
  ),
  oriFull: path.resolve(
    "public/resume/ori",
    buildResumePdfFilename(),
  ),
  atsCompact: path.resolve(
    "public/resume/ats-1page",
    buildResumePdfFilename(),
  ),
  oriCompact: path.resolve(
    "public/resume/ori-1page",
    buildResumePdfFilename(),
  ),
};

await Promise.all(
  Object.values(resumeFiles).map((file) =>
    fs.mkdir(path.dirname(file), { recursive: true }),
  ),
);

const server = spawn(
  process.platform === "win32" ? "pnpm.cmd" : "pnpm",
  ["exec", "next", "start", "-p", String(PORT)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(PORT),
    },
  },
);

try {
  await waitForServer(`${BASE_URL}/resume`);

  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 2400, deviceScaleFactor: 1 });
    await page.emulateMediaType("screen");

    const variants = [
      { key: "atsFull", style: "ats", length: "full" },
      { key: "oriFull", style: "ori", length: "full" },
      { key: "atsCompact", style: "ats", length: "compact" },
      { key: "oriCompact", style: "ori", length: "compact" },
    ];

    for (const variant of variants) {
      const url = `${BASE_URL}/resume/${buildResumePdfRouteSegment(
        variant.style,
        variant.length,
      )}`;
      const outputFile = resumeFiles[variant.key];

      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await page.waitForSelector("article", { timeout: 30_000 });
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({
        path: outputFile,
        printBackground: true,
        preferCSSPageSize: true,
      });

      console.log(`Generated ${variant.key} PDF at ${outputFile}`);
    }
  } finally {
    await browser.close();
  }
} finally {
  server.kill("SIGTERM");
  await waitForExit(server);
}

async function getFreePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address === "object" && address && "port" in address) {
        const port = address.port;
        server.close(() => resolve(port));
        return;
      }
      reject(new Error("Unable to determine a free port"));
    });
  });
}

async function waitForServer(url) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 60_000) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // retry until the server is ready
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function waitForExit(child) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return;
  }

  await new Promise((resolve) => {
    child.once("exit", resolve);
  });
}
