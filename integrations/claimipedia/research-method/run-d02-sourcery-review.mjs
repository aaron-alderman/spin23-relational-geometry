import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { authority, graph, queries } from "./d02-scientific-transformation-graph.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const node = "C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe";
const bridge = "C:/Users/aaron/sourcery/.consolidation/temple-supervisor/host/2026-10-17-executable-succession-root-v7/host-local-bridge.mjs";
const bridgeArgs = [
  bridge,
  "--ledger", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\supervisor.sqlite",
  "--generations", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\generations",
  "--runtime-root", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-runtime",
  "--authority-custody", "C:\\Users\\aaron\\sourcery\\.consolidation\\authority\\temple-authority.dpapi",
  "--initial-generation", "split-v9-qualified",
];
const expectedHost = {
  generationId: "host-nonproduction-receiving-r87r5",
  runtimeHash: "f6a578a2280faf014970bc1072c0f17d4477f99d4fcfc6a0bc3a515a92b3818f",
  requiredBasisGenerationId: "host-claim-adapter-v18",
  requiredBasisHash: "28fbfa709c2f8a18716d76450a196abba8074e45b908334316c7e0c147d2b1a3"
};
const liveV1Graph = {
  objects: graph.objects.map(({ dimension: _dimension, ...object }) => object),
  transformations: graph.transformations.map(({ fromDimension: _fromDimension, toDimension: _toDimension, dimensionRule: _dimensionRule, dimensionDelta: _dimensionDelta, ...transformation }) => transformation),
};
const child = spawn(node, bridgeArgs, { stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
const lines = createInterface({ input: child.stdout, crlfDelay: Infinity });
const pending = new Map();
let nextId = 1;
let stderr = "";
let exited = false;
child.stderr.setEncoding("utf8");
child.stderr.on("data", (chunk) => { stderr += chunk; });
child.once("exit", (code) => {
  exited = true;
  for (const pendingRequest of pending.values()) pendingRequest.reject(new Error(stderr.trim() || `bridge exited with code ${code}`));
  pending.clear();
});
lines.on("line", (line) => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  const pendingRequest = pending.get(message.id);
  if (!pendingRequest) return;
  pending.delete(message.id);
  if (message.error) pendingRequest.reject(new Error(message.error.message));
  else pendingRequest.resolve(message.result);
});
function rpc(method, params = {}) {
  const id = nextId++;
  return new Promise((resolvePromise, reject) => {
    pending.set(id, { resolve: resolvePromise, reject });
    child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
  });
}
function payload(result) {
  if (result?.isError) throw new Error(result.content?.map((part) => part.text ?? "").join("\n") || "tool call failed");
  if (result?.structuredContent) return result.structuredContent;
  const text = result?.content?.find((part) => part.type === "text")?.text;
  return text ? JSON.parse(text) : result;
}
const call = async (name, args) => payload(await rpc("tools/call", { name, arguments: args }));
const report = {
  protocol: "claimipedia-d02-sourcery-review/1",
  graphSha256: createHash("sha256").update(JSON.stringify(liveV1Graph)).digest("hex"),
  sourceGraphSha256: createHash("sha256").update(JSON.stringify(graph)).digest("hex"),
  protocolAdapter: {
    from: "scientific-derivation-composition/common-algebra-2",
    to: "scientific-derivation-composition/1",
    operation: "erase-dimension-metadata-for-legacy-host",
    loss: "The live v1 receipt does not certify SI-dimension consistency; common-algebra-2 is checked separately against the unprojected source graph.",
  },
  queries: [],
  authority,
};

try {
  await rpc("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "d02-lightning-strike-review", version: "1" } });
  const host = await call("temple_host_describe", {});
  report.host = {
    generationId: host.generationId,
    runtimeHash: host.runtimeHash,
    admittedBasisGenerationId: expectedHost.requiredBasisGenerationId,
    admittedBasisHash: expectedHost.requiredBasisHash
  };
  if (host.generationId !== expectedHost.generationId || host.runtimeHash !== expectedHost.runtimeHash) throw new Error("unexpected Sourcery host generation");
  const operation = await call("temple_system_describe_operation", { operationId: "scientific_derivation_compose" });
  const actions = operation.inputSchema?.properties?.action?.enum ?? [];
  if (!actions.includes("compose-derivation")) throw new Error("selected successor does not preserve scientific_derivation_compose");
  for (const query of queries) {
    const result = await call("temple_system_execute_operation", { operationId: "scientific_derivation_compose", input: { action: "compose-derivation", request: { graph: liveV1Graph, query: { source: query.source, target: query.target, maxDepth: query.maxDepth } } } });
    report.queries.push({ query, result });
  }
  const local = report.queries.find(({ query }) => query.id === "bounded-local-theorem").result;
  const global = report.queries.find(({ query }) => query.id === "global-rank-change-law").result;
  const invalidRuleIds = [...new Set(report.queries.flatMap(({ result }) => result.invalidRules.map(({ rule: invalidRule }) => invalidRule.id)))].sort();
  report.summary = {
    localCandidateCount: local.candidates.length,
    localCandidateSteps: local.candidates.map(({ steps }) => steps),
    globalCandidateCount: global.candidates.length,
    invalidRuleIds,
    disposition: "retain-local-law-split-global-rank-change-law"
  };
  report.passed = local.candidates.length === 1 && global.candidates.length === 0 && invalidRuleIds.includes("counterexample-silent-rank-change-continuation") && invalidRuleIds.includes("counterexample-boundary-response-determines-wall-index") && report.queries.every(({ result }) => result.receipt.proposalOnly === true && result.receipt.entails === false && result.receipt.empiricalAuthority === false && result.receipt.applicationAdmission === false);
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "d02-sourcery-review.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ protocol: report.protocol, host: report.host, ...report.summary, passed: report.passed }, null, 2));
  if (!report.passed) process.exitCode = 1;
} catch (error) {
  report.error = error.message;
  report.stderr = stderr.trim().slice(-4000);
  report.passed = false;
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "d02-sourcery-review.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
} finally {
  if (!exited) {
    child.stdin.end();
    await new Promise((resolvePromise) => child.once("exit", resolvePromise));
  }
}

