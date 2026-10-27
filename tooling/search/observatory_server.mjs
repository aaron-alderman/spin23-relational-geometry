#!/usr/bin/env node

import { createServer } from "node:http";
import { createHash, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createObservatoryRuntime } from "./observatory_runtime.mjs";
import { getContributionBeacon } from "./contribution_beacon.mjs";
import { createContributionStore } from "./contribution_store.mjs";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const publicRoot = join(moduleDirectory, "observatory", "public");
const staticFiles = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/app.js", "app.js"],
  ["/styles.css", "styles.css"],
]);
const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
const contributionTypes = new Set(["verification-receipt", "retrieval-miss", "answer-stability", "missing-source", "counterexample-or-no-go", "human-attention-rating"]);

function validateContribution(input) {
  if (!input || Array.isArray(input) || typeof input !== "object") throw new Error("contribution must be an object");
  const text = (name, maximum, required = true) => {
    const value = typeof input[name] === "string" ? input[name].trim() : "";
    if ((required && !value) || value.length > maximum) throw new Error(`contribution ${name} is invalid`);
    return value || null;
  };
  const type = text("type", 80);
  if (!contributionTypes.has(type)) throw new Error("contribution type is not declared by the beacon");
  const profile = text("profile", 40);
  if (!["all", "interpret", "choose-work", "audit", "experiment"].includes(profile)) throw new Error("contribution profile is invalid");
  const sourcePaths = input.sourcePaths ?? [];
  if (!Array.isArray(sourcePaths) || sourcePaths.length > 20 || sourcePaths.some(path => typeof path !== "string" || path.length > 500 || path.includes("..") || path.includes("\\"))) throw new Error("contribution sourcePaths are invalid");
  const dependsOn = input.dependsOn ?? [];
  if (!Array.isArray(dependsOn) || dependsOn.length > 20 || dependsOn.some(value => typeof value !== "string" || (!/^contrib_[0-9a-f]{16}$/u.test(value) && !/^BEACON-[0-9]{3}$/u.test(value)))) throw new Error("contribution dependsOn references are invalid");
  const hashes = Object.fromEntries(["sourceVersionSha256", "receiptSha256", "evidenceFamilySha256"].map(name => {
    const value = input[name] ?? null;
    if (value !== null && (typeof value !== "string" || !/^[0-9a-f]{64}$/u.test(value))) throw new Error(`contribution ${name} is invalid`);
    return [name, value];
  }));
  return {
    type,
    objective: text("objective", 2000),
    profile,
    contributor: text("contributor", 200),
    expected: text("expected", 4000),
    observed: text("observed", 4000),
    narrowConclusion: text("narrowConclusion", 4000),
    nextTest: text("nextTest", 4000),
    method: text("method", 2000, false),
    sourcePaths,
    dependsOn: [...new Set(dependsOn)],
    ...hashes,
  };
}

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
function tokenIdentity(token) {
  return token ? createHash("sha256").update(token).digest("hex") : null;
}
function authorised(request, token) {
  if (!token) return true;
  const supplied = request.headers.authorization?.replace(/^Bearer\s+/iu, "") ?? "";
  const expectedBytes = Buffer.from(token);
  const suppliedBytes = Buffer.from(supplied);
  return suppliedBytes.length === expectedBytes.length && timingSafeEqual(suppliedBytes, expectedBytes);
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
export function createObservatoryServer({ root = resolve(moduleDirectory, "../.."), stateRoot, operatorToken, operatorId = "context-hub.operator.local" } = {}) {
  const runtime = createObservatoryRuntime({ root, stateRoot });
  const contributionRoot = stateRoot ? resolve(stateRoot, "..", "contributions") : resolve(root, ".context-hub", "contributions");
  const contributions = createContributionStore({ root: contributionRoot });
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://127.0.0.1");
      const protectedContributionWrite = request.method === "POST" && /^\/api\/contributions\/contrib_[0-9a-f]{16}\/(?:claim|release|decision|impact)$/u.test(url.pathname);
      const protectedEpisodeWrite = request.method === "POST" && (url.pathname === "/api/episodes" || /^\/api\/episodes\/ep_[0-9a-f]{16}(?:\/.*)?$/u.test(url.pathname));
      if ((protectedContributionWrite || protectedEpisodeWrite) && !authorised(request, operatorToken)) {
        response.setHeader("www-authenticate", 'Bearer realm="Context Hub Observatory"');
        return send(response, 401, { error: "A valid Observatory operator bearer token is required", operatorId });
      }
      if (request.method === "GET" && staticFiles.has(url.pathname)) {
        const path = join(publicRoot, staticFiles.get(url.pathname));
        if (!existsSync(path)) return send(response, 404, { error: "Observatory asset is missing" });
        return send(response, 200, readFileSync(path), contentTypes[extname(path)] ?? "application/octet-stream");
      }
      if (request.method === "GET" && url.pathname === "/api/health") return send(response, 200, { status: "ok", protocol: "spin23-context-hub-observatory/1", persistence: runtime.store.root, contributionBeacon: "/api/beacon", operator: { id: operatorId, writeProtected: Boolean(operatorToken), credentialSha256: tokenIdentity(operatorToken) } });
      if (request.method === "GET" && url.pathname === "/api/beacon") return send(response, 200, { ...getContributionBeacon(), live: { contributionsEndpoint: "/api/contributions", pendingContributions: contributions.list().filter(item => item.disposition === "pending").length } });
      if (url.pathname === "/api/contributions" && request.method === "GET") return send(response, 200, { contributions: contributions.list() });
      if (url.pathname === "/api/contributions" && request.method === "POST") {
        const contribution = validateContribution(await body(request));
        for (const dependency of contribution.dependsOn.filter(value => value.startsWith("contrib_"))) contributions.get(dependency);
        return send(response, 201, contributions.submit(contribution));
      }
      const contributionMatch = /^\/api\/contributions\/(contrib_[0-9a-f]{16})(?:\/(claim|release|decision|impact))?$/u.exec(url.pathname);
      if (contributionMatch && request.method === "GET" && !contributionMatch[2]) return send(response, 200, contributions.get(contributionMatch[1]));
      if (contributionMatch && request.method === "POST") {
        const input = await body(request);
        if (contributionMatch[2] === "claim") return send(response, 200, contributions.claim(contributionMatch[1], input));
        if (contributionMatch[2] === "release") return send(response, 200, contributions.release(contributionMatch[1], input));
        if (contributionMatch[2] === "decision") return send(response, 200, contributions.decide(contributionMatch[1], input));
        if (contributionMatch[2] === "impact") return send(response, 200, contributions.recordImpact(contributionMatch[1], input));
      }
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
  return { server, runtime, contributions };
}
export async function startObservatoryServer({ root, stateRoot, host = "127.0.0.1", port = 4178, operatorToken, operatorId } = {}) {
  if (host !== "127.0.0.1" && host !== "localhost") throw new Error("Observatory V1 binds to localhost only");
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("port must be an integer from 0 to 65535");
  const observatory = createObservatoryServer({ root, stateRoot, operatorToken, operatorId });
  await new Promise((resolveListen, reject) => {
    observatory.server.once("error", reject);
    observatory.server.listen(port, host, resolveListen);
  });
  return { ...observatory, address: observatory.server.address(), url: `http://${host}:${observatory.server.address().port}` };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const portIndex = process.argv.indexOf("--port");
  const stateIndex = process.argv.indexOf("--state-root");
  const tokenFileIndex = process.argv.indexOf("--operator-token-file");
  const operatorIdIndex = process.argv.indexOf("--operator-id");
  const port = portIndex >= 0 ? Number(process.argv[portIndex + 1]) : 4178;
  const stateRoot = stateIndex >= 0 ? resolve(process.argv[stateIndex + 1]) : undefined;
  const operatorToken = tokenFileIndex >= 0 ? readFileSync(resolve(process.argv[tokenFileIndex + 1]), "utf8").trim() : undefined;
  const operatorId = operatorIdIndex >= 0 ? process.argv[operatorIdIndex + 1] : undefined;
  if (tokenFileIndex >= 0 && !operatorToken) throw new Error("operator token file is empty");
  startObservatoryServer({ port, stateRoot, operatorToken, operatorId }).then(({ url, runtime }) => {
    process.stdout.write(`Context Hub Observatory listening at ${url}\nEpisode store: ${runtime.store.root}\n`);
  }).catch(error => {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
    process.exitCode = 1;
  });
}
