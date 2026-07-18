import { spawn } from "node:child_process";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9334;

const chrome = spawn(CHROME, [
  "--headless", "--disable-gpu", `--remote-debugging-port=${PORT}`,
  "--window-size=1440,900", "--no-first-run", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    try { ready = (await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok; } catch { await sleep(400); }
  }
  const targetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent("http://localhost:3000")}`, { method: "PUT" });
  const target = await targetRes.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let msgId = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++msgId;
      pending.set(id, (msg) => (msg.error ? reject(new Error(msg.error.message)) : resolve(msg)));
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Page.enable");
  await sleep(5000);
  const expr = `(() => {
    const h1 = document.querySelector("h1");
    const cs = getComputedStyle(h1);
    return JSON.stringify({
      fontFamily: cs.fontFamily,
      frauncesLoaded: document.fonts.check("72px Fraunces"),
      frauncesItalicLoaded: document.fonts.check("italic 72px Fraunces"),
      loadedFaces: [...document.fonts].filter(f => f.status === "loaded").map(f => f.family + " " + f.weight + " " + f.style).slice(0, 12),
      htmlClass: document.documentElement.className,
      varFraunces: getComputedStyle(document.documentElement).getPropertyValue("--font-fraunces"),
      varDisplay: getComputedStyle(document.documentElement).getPropertyValue("--font-display"),
    });
  })()`;
  const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  console.log(res.result.result.value);
  ws.close();
} finally {
  chrome.kill();
}
