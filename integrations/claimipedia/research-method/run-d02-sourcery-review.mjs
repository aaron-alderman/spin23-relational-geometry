import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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
  generationId: "host-policy-anchor-v19",
  runtimeHash: "42c6e040c0b5422c89e51fb20ed04fefe9289c3b7106b50027cffea9aaf5dd5a",
  requiredBasisGenerationId: "host-claim-adapter-v18",
  requiredBasisHash: "28fbfa709c2f8a18716d76450a196abba8074e45b908334316c7e0c147d2b1a3"
};
const fields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
const authority = { proposalOnly: true, entails: false, empiricalAuthority: false };

const objects = [
  { id: "d02.raw-block-family", signature: { domain: "block-herglotz-family", rank: 2, variance: "matrix", basis: "external-interior-block", regime: "upper-half-plane", order: "exact-finite", scheme: "unclassified-singular", symmetry: "declared-in-scope", cp: "unrestricted", support: "mixed-unknown" } },
  { id: "d02.fixed-support-family", signature: { domain: "block-herglotz-family", rank: 2, variance: "matrix", basis: "support-split", regime: "constant-rank-patch", order: "exact-finite", scheme: "range-compatible", symmetry: "support-frame-covariant", cp: "unrestricted", support: "fixed-rank-plus-null" } },
  { id: "d02.local-effective-response", signature: { domain: "effective-herglotz-response", rank: 2, variance: "matrix", basis: "external-ports", regime: "constant-rank-patch", order: "exact-finite", scheme: "support-schur", symmetry: "support-frame-covariant", cp: "unrestricted", support: "positive-operator-measure" } },
  { id: "d02.decorated-local-response", signature: { domain: "decorated-effective-response", rank: 2, variance: "matrix", basis: "external-ports", regime: "constant-rank-patch", order: "exact-finite", scheme: "typed-decoration-transport", symmetry: "declared-compatible-subset", cp: "unrestricted", support: "positive-operator-measure" } },
  { id: "d02.local-theorem-triage", signature: { domain: "d02-theorem-candidate", rank: 2, variance: "record", basis: "proof-and-receipt", regime: "bounded-finite", order: "review-candidate", scheme: "proposal-only", symmetry: "scoped-audited", cp: "unrestricted", support: "theorem-counterexample-boundary" } },
  { id: "d02.rank-changing-family", signature: { domain: "block-herglotz-family", rank: 2, variance: "matrix", basis: "external-interior-block", regime: "rank-changing-locus", order: "exact-finite", scheme: "two-path-limit", symmetry: "declared-in-scope", cp: "unrestricted", support: "changing-rank" } },
  { id: "d02.global-single-law", signature: { domain: "global-stratified-response", rank: 2, variance: "matrix", basis: "global-support-frame", regime: "across-rank-change", order: "conjectural", scheme: "single-canonical-continuation", symmetry: "globally-preserved", cp: "unrestricted", support: "all-strata" } }
];
const byId = new Map(objects.map((object) => [object.id, object]));

function rule({ id, kind, from, to, assumptions, losses = [], evidenceRefs, analogyOnly = false }) {
  const fromSignature = byId.get(from).signature;
  const toSignature = byId.get(to).signature;
  return {
    id, kind, from, to, fromSignature, toSignature,
    changes: fields.filter((field) => fromSignature[field] !== toSignature[field]),
    assumptions, losses, removes: [], evidenceRefs, analogyOnly, authority
  };
}

const transformations = [
  rule({ id: "classify-fixed-support-stratum", kind: "model-specialization", from: "d02.raw-block-family", to: "d02.fixed-support-family", assumptions: ["constant kernel on the selected patch", "support projector transported with the frame", "coupling annihilates the null bundle"], evidenceRefs: ["215_constant_kernel_ward_herglotz_pseudoinverse_sewing.md#constant-kernel-hypothesis", "generated/d02-execution-receipt.json#wardRegulatorIndependence"], tests: ["support rank is constant", "null regulator independence"] }),
  rule({ id: "apply-local-support-schur-theorem", kind: "schur-elimination", from: "d02.fixed-support-family", to: "d02.local-effective-response", assumptions: ["restricted eliminated block is invertible", "real frequency-independent reciprocal coupling", "upper-half-plane passivity"], evidenceRefs: ["213_fixed_temperature_kms_herglotz_schur_sewing.md#closed-schur-class", "generated/d02-execution-receipt.json#localHerglotzPassivity"], tests: ["imaginary-part identity", "support-frame covariance"] }),
  rule({ id: "transport-compatible-decorations", kind: "decoration-transport", from: "d02.local-effective-response", to: "d02.decorated-local-response", assumptions: ["Ward support is fixed", "thermal channels share one temperature", "wall residue is probe-visible"], losses: ["bulk wall index is not determined by the projected response", "global rank-change continuation"], evidenceRefs: ["D02-RESULT.md#decoration-transport", "generated/d02-execution-receipt.json#projectedResponseDoesNotDetermineBulkIndex"], tests: ["common-temperature KMS multiplier", "invisible-index direct-sum counterexample", "loss receipt present"] }),
  rule({ id: "handoff-bounded-theorem-and-obstruction", kind: "review-handoff", from: "d02.decorated-local-response", to: "d02.local-theorem-triage", assumptions: ["the theorem is restricted to finite constant-support patches", "the rank-change counterexample is retained beside the positive theorem"], losses: ["no operator-theoretic or empirical authority", "no single global law across rank change"], evidenceRefs: ["D02-RESULT.md", "generated/d02-execution-result.json"], tests: ["positive and negative cases reproducible", "authority bits remain false"] }),
  rule({ id: "counterexample-silent-rank-change-continuation", kind: "analytic-continuation", from: "d02.rank-changing-family", to: "d02.global-single-law", assumptions: ["deliberate invalid fixture: limiting block alone selects one continuation"], evidenceRefs: ["D02-RESULT.md#minimal-rank-change-obstruction"], tests: ["must be rejected because two coupling scalings have different eliminated limits"], analogyOnly: true }),
  rule({ id: "counterexample-boundary-response-determines-wall-index", kind: "projection", from: "d02.local-effective-response", to: "d02.global-single-law", assumptions: ["deliberate invalid fixture: projected response determines invisible bulk index"], losses: ["uncoupled graded zero modes"], evidenceRefs: ["D02-RESULT.md#decoration-transport"], tests: ["must be rejected by direct-sum invisible-index example"], analogyOnly: true })
];

const graph = { objects, transformations };
const queries = [
  { id: "bounded-local-theorem", source: "d02.raw-block-family", target: "d02.local-theorem-triage", maxDepth: 5 },
  { id: "global-rank-change-law", source: "d02.rank-changing-family", target: "d02.global-single-law", maxDepth: 2 }
];

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
const report = { protocol: "claimipedia-d02-sourcery-review/1", graphSha256: createHash("sha256").update(JSON.stringify(graph)).digest("hex"), queries: [], authority };

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
    const result = await call("temple_system_execute_operation", { operationId: "scientific_derivation_compose", input: { action: "compose-derivation", request: { graph, query: { source: query.source, target: query.target, maxDepth: query.maxDepth } } } });
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

