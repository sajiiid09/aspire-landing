import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const TARGET_URL = process.argv[2] || "http://localhost:3000";
const OUT_DIR = process.argv[3] || ".shots";
const PREFIX = process.argv[4] || "shot";
const VW = 1440;
const VH = 900;

const chrome = spawn(CHROME, [
  "--headless",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`,
  `--window-size=${VW},${VH}`,
  "--no-first-run",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      ready = res.ok;
    } catch {
      await sleep(400);
    }
  }
  if (!ready) throw new Error("Chrome DevTools endpoint never came up");

  const targetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(TARGET_URL)}`, { method: "PUT" });
  const target = await targetRes.json();

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let msgId = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++msgId;
      pending.set(id, (msg) => (msg.error ? reject(new Error(msg.error.message)) : resolve(msg)));
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  await sleep(4500);
  await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => 1)", awaitPromise: true });

  const heightRes = await send("Runtime.evaluate", { expression: "document.body.scrollHeight", returnByValue: true });
  const pageHeight = heightRes.result.result.value;
  console.log(`page height: ${pageHeight}`);

  const stops = [];
  for (let y = 0; y < pageHeight - VH; y += Math.floor(VH * 0.92)) stops.push(y);
  stops.push(pageHeight - VH);

  for (let i = 0; i < stops.length; i++) {
    await send("Runtime.evaluate", { expression: `window.scrollTo({ top: ${stops[i]}, behavior: "instant" })` });
    await sleep(1300);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 78 });
    await writeFile(`${OUT_DIR}/${PREFIX}-${String(i).padStart(2, "0")}.jpg`, Buffer.from(shot.result.data, "base64"));
  }
  console.log(`captured ${stops.length} shots`);

  ws.close();
} finally {
  chrome.kill();
}
