#!/usr/bin/env node

import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createObservatoryRuntime } from "./observatory_runtime.mjs";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const publicRoot = join(moduleDirectory, "observatory", "public");
const staticFiles = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/app.js", "app.js"],
  ["/styles.css", "styles.css"],
]);
const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };

function send(response, status, value, type = "application/json; charset=utf-8") {
  const body = type.startsWith("application/json") ? JSON.stringify(value) : value;
  response.writeHead(status, {
    "content-type": type,
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "content-security-policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  });
  response.end(body);
}
async function body(request) {
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > 2 * 1024 * 1024) throw new Error("request body exceeds 2 MiB");
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  if (!/^application\/json(?:;|$)/iu.test(request.headers["content-type"] ?? "")) throw new Error("request content-type must be application/json");
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new Error("request body is not valid JSON"); }
}
export function createObservatoryServer({ root = resolve(moduleDirectory, "../.."), stateRoot } = {}) {
  const runtime = createObservatoryRuntime({ root, stateRoot });
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://127.0.0.1");
      if (request.method === "GET" && staticFiles.has(url.pathname)) {
        const path = join(publicRoot, staticFiles.get(url.pathname));
        if (!existsSync(path)) return send(response, 404, { error: "Observatory asset is missing" });
        return send(response, 200, readFileSync(path), contentTypes[extname(path)] ?? "application/octet-stream");
      }
      if (request.method === "GET" && url.pathname === "/api/health") return send(response, 200, { status: "ok", protocol: "spin23-context-hub-observatory/1", persistence: runtime.store.root });
      if (url.pathname === "/api/episodes" && request.method === "GET") return send(response, 200, { episodes: runtime.listEpisodes() });
      if (url.pathname === "/api/episodes" && request.method === "POST") return send(response, 201, runtime.createEpisode(await body(request)));
      const match = /^\/api\/episodes\/(ep_[0-9a-f]{16})(?:\/(.*))?$/u.exec(url.pathname);
      if (!match) return send(response, 404, { error: "Route not found" });
      const [, episodeId, action = ""] = match;
      if (request.method === "GET" && !action) return send(response, 200, runtime.getEpisode(episodeId));
      if (request.method !== "POST") return send(response, 405, { error: "Method not allowed" });
      const input = await body(request);
      if (action === "turns") return send(response, 201, runtime.planTurn(episodeId, input));
      if (action === "answers") return send(response, 201, runtime.recordAnswer(episodeId, input));
      if (action === "proposals") return send(response, 201, runtime.proposeUpdate(episodeId, input));
      if (action === "controls") return send(response, 200, runtime.setControls(episodeId, input));
      if (action === "freeze") return send(response, 200, runtime.setFrozen(episodeId, input.frozen));
      if (action === "replay") return send(response, 201, runtime.replay(episodeId, input));
      if (action === "rollback") return send(response, 200, runtime.rollback(episodeId, input));
      const decision = /^proposals\/(proposal_[0-9a-f]{16})\/decision$/u.exec(action);
      if (decision) return send(response, 200, runtime.decideUpdate(episodeId, decision[1], input));
      return send(response, 404, { error: "Episode action not found" });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const status = /does not exist|not found|Route/iu.test(message) ? 404 : /revision conflict|locked|stale|already/iu.test(message) ? 409 : 400;
      return send(response, status, { error: message });
    }
  });
  return { server, runtime };
}
export async function startObservatoryServer({ root, stateRoot, host = "127.0.0.1", port = 4178 } = {}) {
  if (host !== "127.0.0.1" && host !== "localhost") throw new Error("Observatory V1 binds to localhost only");
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("port must be an integer from 0 to 65535");
  const observatory = createObservatoryServer({ root, stateRoot });
  await new Promise((resolveListen, reject) => {
    observatory.server.once("error", reject);
    observatory.server.listen(port, host, resolveListen);
  });
  return { ...observatory, address: observatory.server.address(), url: `http://${host}:${observatory.server.address().port}` };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const portIndex = process.argv.indexOf("--port");
  const stateIndex = process.argv.indexOf("--state-root");
  const port = portIndex >= 0 ? Number(process.argv[portIndex + 1]) : 4178;
  const stateRoot = stateIndex >= 0 ? resolve(process.argv[stateIndex + 1]) : undefined;
  startObservatoryServer({ port, stateRoot }).then(({ url, runtime }) => {
    process.stdout.write(`Context Hub Observatory listening at ${url}\nEpisode store: ${runtime.store.root}\n`);
  }).catch(error => {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
    process.exitCode = 1;
  });
}
