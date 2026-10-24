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
  "--initial-generation", "split-v9-qualified"
];
const expectedHost = {
  generationId: "host-nonproduction-receiving-r87r5",
  runtimeHash: "f6a578a2280faf014970bc1072c0f17d4477f99d4fcfc6a0bc3a515a92b3818f",
  requiredBasisGenerationId: "host-claim-adapter-v18",
  requiredBasisHash: "28fbfa709c2f8a18716d76450a196abba8074e45b908334316c7e0c147d2b1a3"
};
const fields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
const authority = { proposalOnly: true, entails: false, empiricalAuthority: false };

const objects = [
  { id: "d02.rank-changing-germ", signature: { domain: "block-herglotz-germ", rank: 2, variance: "matrix-family", basis: "external-interior-block", regime: "rank-changing-locus", order: "analytic-finite", scheme: "unclassified", symmetry: "frame-and-parameter-germs", cp: "unrestricted", support: "changing-rank" } },
  { id: "d02.arc-groupoid", signature: { domain: "approach-arc-groupoid", rank: 2, variance: "germ-groupoid", basis: "coordinate-free-arcs", regime: "punctured-neighborhood", order: "analytic-finite", scheme: "ordinary-limit", symmetry: "frame-and-parameter-germs", cp: "unrestricted", support: "stratified" } },
  { id: "d02.correction-functor", signature: { domain: "schur-correction-functor", rank: 2, variance: "groupoid-functor", basis: "external-ports", regime: "cluster-classified", order: "meromorphic-finite", scheme: "removable-multiple-or-pole", symmetry: "full-correction-invariant", cp: "unrestricted", support: "stratified" } },
  { id: "d02.typed-dispatch", signature: { domain: "rank-change-dispatch", rank: 2, variance: "sum-type", basis: "external-ports-plus-arc-label", regime: "bounded-finite", order: "value-level", scheme: "glue-groupoid-or-refuse", symmetry: "quotiented-with-loss-ledger", cp: "unrestricted", support: "stratified" } },
  { id: "d02.exhaustion-triage", signature: { domain: "d02-exhaustion-candidate", rank: 2, variance: "record", basis: "proof-counterexample-frontier", regime: "bounded-finite", order: "review-candidate", scheme: "proposal-only", symmetry: "scoped-audited", cp: "unrestricted", support: "all-declared-strata" } },
  { id: "d02.undecorated-single-value", signature: { domain: "global-effective-response", rank: 2, variance: "matrix", basis: "singular-point-only", regime: "all-rank-changes", order: "universal", scheme: "single-canonical-value", symmetry: "silently-quotiented", cp: "unrestricted", support: "all-strata" } },
  { id: "d02.pole-correction", signature: { domain: "schur-correction-germ", rank: 2, variance: "meromorphic-matrix", basis: "normal-coordinate-unspecified", regime: "pole-at-crossing", order: "negative-laurent", scheme: "none", symmetry: "regular-reparameterizations", cp: "unrestricted", support: "singular" } },
  { id: "d02.scheme-free-finite-part", signature: { domain: "renormalized-effective-response", rank: 2, variance: "matrix", basis: "singular-point-only", regime: "pole-at-crossing", order: "finite-part", scheme: "canonical-unspecified", symmetry: "regular-reparameterizations", cp: "unrestricted", support: "singular" } },
  { id: "d02.projected-response", signature: { domain: "effective-herglotz-response", rank: 2, variance: "matrix", basis: "external-ports", regime: "constant-rank-patch", order: "exact-finite", scheme: "support-schur", symmetry: "support-frame-covariant", cp: "unrestricted", support: "positive-operator-measure" } },
  { id: "d02.bulk-index", signature: { domain: "bulk-topological-index", rank: 1, variance: "integer", basis: "graded-bulk-space", regime: "global-wall", order: "topological", scheme: "index", symmetry: "grading-preserving", cp: "unrestricted", support: "bulk-plus-invisible-sectors" } }
];
const byId = new Map(objects.map((object) => [object.id, object]));

function rule({ id, kind, from, to, assumptions, losses = [], evidenceRefs, analogyOnly = false }) {
  const fromSignature = byId.get(from).signature;
  const toSignature = byId.get(to).signature;
  return {
    id,
    kind,
    from,
    to,
    fromSignature,
    toSignature,
    changes: fields.filter((field) => fromSignature[field] !== toSignature[field]),
    assumptions,
    losses,
    removes: [],
    evidenceRefs,
    analogyOnly,
    authority
  };
}

const transformations = [
  rule({ id: "construct-approach-arc-groupoid", kind: "germ-resolution", from: "d02.rank-changing-germ", to: "d02.arc-groupoid", assumptions: ["finite-dimensional analytic or polynomial germs", "all admitted approach arcs are retained until descent is proved"], evidenceRefs: ["d02-rank-change-gluing-contract.json#semanticObjects", "D02-EXHAUSTION-AUDIT.md#final-semantic-object"] }),
  rule({ id: "evaluate-full-schur-correction", kind: "meromorphic-schur-evaluation", from: "d02.arc-groupoid", to: "d02.correction-functor", assumptions: ["D is invertible on the punctured regular locus", "B D^-1 B^T is evaluated before any basis-dependent modal truncation"], evidenceRefs: ["D02-MEROMORPHIC-FILTRATION.md#result", "generated/d02-meromorphic-filtration-receipt.json"] }),
  rule({ id: "dispatch-by-cluster-class", kind: "typed-descent", from: "d02.correction-functor", to: "d02.typed-dispatch", assumptions: ["one finite cluster value glues", "multiple finite cluster values retain the arc label", "an unbounded arc refuses elimination"], losses: ["a single singular-point value is unavailable in the multiple and pole cases"], evidenceRefs: ["d02-rank-change-gluing-contract.json#dispatcher", "generated/d02-bounded-exhaustion-audit.json#finalDispatcher"] }),
  rule({ id: "handoff-exhausted-bounded-dispatcher", kind: "review-handoff", from: "d02.typed-dispatch", to: "d02.exhaustion-triage", assumptions: ["operator and interacting extensions remain typed external frontiers", "authority remains proposal-only"], losses: ["no automatic corpus admission", "no empirical or application authority"], evidenceRefs: ["D02-EXHAUSTION-AUDIT.md", "generated/d02-bounded-exhaustion-receipt.json"] }),
  rule({ id: "counterexample-collapse-all-arcs", kind: "silent-quotient", from: "d02.rank-changing-germ", to: "d02.undecorated-single-value", assumptions: ["deliberate invalid fixture: tangent direction or any fixed finite jet determines every finite limit"], losses: ["higher-contact arc data"], evidenceRefs: ["D02-EXHAUSTION-AUDIT.md#strongest-bounded-counterexample"], analogyOnly: true }),
  rule({ id: "counterexample-canonical-pole-finite-part", kind: "finite-part-subtraction", from: "d02.pole-correction", to: "d02.scheme-free-finite-part", assumptions: ["deliberate invalid fixture: pole order and leading symbol define a reparameterization-invariant constant term"], losses: ["normal-coordinate jet", "subtraction scheme"], evidenceRefs: ["D02-MEROMORPHIC-FILTRATION.md#strongest-fixed-decoration-counterexample"], analogyOnly: true }),
  rule({ id: "counterexample-response-determines-bulk-index", kind: "topology-reconstruction", from: "d02.projected-response", to: "d02.bulk-index", assumptions: ["deliberate invalid fixture: projected passive response detects invisible graded direct summands"], losses: ["uncoupled graded zero modes"], evidenceRefs: ["D02-RESULT.md#decoration-transport"], analogyOnly: true })
];

const graph = { objects, transformations };
const queries = [
  { id: "bounded-exhaustion-dispatch", source: "d02.rank-changing-germ", target: "d02.exhaustion-triage", maxDepth: 5 },
  { id: "undecorated-single-value", source: "d02.rank-changing-germ", target: "d02.undecorated-single-value", maxDepth: 2 },
  { id: "scheme-free-finite-part", source: "d02.pole-correction", target: "d02.scheme-free-finite-part", maxDepth: 2 },
  { id: "bulk-index-reconstruction", source: "d02.projected-response", target: "d02.bulk-index", maxDepth: 2 }
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
const report = { protocol: "claimipedia-d02-exhaustion-sourcery-review/1", graphSha256: createHash("sha256").update(JSON.stringify(graph)).digest("hex"), queries: [], authority };

try {
  await rpc("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "d02-exhaustion-review", version: "1" } });
  const host = await call("temple_host_describe", {});
  report.host = { generationId: host.generationId, runtimeHash: host.runtimeHash, admittedBasisGenerationId: expectedHost.requiredBasisGenerationId, admittedBasisHash: expectedHost.requiredBasisHash };
  if (host.generationId !== expectedHost.generationId || host.runtimeHash !== expectedHost.runtimeHash) throw new Error("unexpected Sourcery host generation");
  const operation = await call("temple_system_describe_operation", { operationId: "scientific_derivation_compose" });
  const actions = operation.inputSchema?.properties?.action?.enum ?? [];
  if (!actions.includes("compose-derivation")) throw new Error("selected successor does not preserve scientific_derivation_compose");
  for (const query of queries) {
    const result = await call("temple_system_execute_operation", { operationId: "scientific_derivation_compose", input: { action: "compose-derivation", request: { graph, query: { source: query.source, target: query.target, maxDepth: query.maxDepth } } } });
    report.queries.push({ query, result });
  }
  const positive = report.queries.find(({ query }) => query.id === "bounded-exhaustion-dispatch").result;
  const negatives = report.queries.filter(({ query }) => query.id !== "bounded-exhaustion-dispatch");
  const invalidRuleIds = [...new Set(report.queries.flatMap(({ result }) => result.invalidRules.map(({ rule }) => rule.id)))].sort();
  report.summary = {
    positiveCandidateCount: positive.candidates.length,
    positiveCandidateSteps: positive.candidates.map(({ steps }) => steps),
    negativeCandidateCounts: Object.fromEntries(negatives.map(({ query, result }) => [query.id, result.candidates.length])),
    invalidRuleIds,
    disposition: "admit-typed-arc-groupoid-dispatch-reject-silent-descent"
  };
  const expectedInvalid = ["counterexample-collapse-all-arcs", "counterexample-canonical-pole-finite-part", "counterexample-response-determines-bulk-index"];
  report.passed = positive.candidates.length === 1 && negatives.every(({ result }) => result.candidates.length === 0) && expectedInvalid.every((id) => invalidRuleIds.includes(id)) && report.queries.every(({ result }) => result.receipt.proposalOnly === true && result.receipt.entails === false && result.receipt.empiricalAuthority === false && result.receipt.applicationAdmission === false);
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "d02-exhaustion-sourcery-review.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ protocol: report.protocol, host: report.host, ...report.summary, passed: report.passed }, null, 2));
  if (!report.passed) process.exitCode = 1;
} catch (error) {
  report.error = error.message;
  report.stderr = stderr.trim().slice(-4000);
  report.passed = false;
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "d02-exhaustion-sourcery-review.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
} finally {
  if (!exited) {
    child.stdin.end();
    await new Promise((resolvePromise) => child.once("exit", resolvePromise));
  }
}
