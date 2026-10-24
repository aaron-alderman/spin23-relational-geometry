import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { legacyDimensionAdapter, legacyV1Projection, recordDimension, withRecordDimensions } from "./d02-record-dimension-adapter.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const node = "C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe";
const bridge = "C:/Users/aaron/sourcery/.consolidation/temple-supervisor/host/2026-10-17-executable-succession-root-v7/host-local-bridge.mjs";
const bridgeArgs = [bridge, "--ledger", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\supervisor.sqlite", "--generations", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\generations", "--runtime-root", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-runtime", "--authority-custody", "C:\\Users\\aaron\\sourcery\\.consolidation\\authority\\temple-authority.dpapi", "--initial-generation", "split-v9-qualified"];
const expectedHost = { generationId: "host-nonproduction-receiving-r87r5", runtimeHash: "f6a578a2280faf014970bc1072c0f17d4477f99d4fcfc6a0bc3a515a92b3818f", requiredBasisGenerationId: "host-claim-adapter-v18", requiredBasisHash: "28fbfa709c2f8a18716d76450a196abba8074e45b908334316c7e0c147d2b1a3" };
const fields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
const authority = { proposalOnly: true, entails: false, empiricalAuthority: false };

const objects = [
  { id: "d02.operator-herglotz-family", signature: { domain: "bounded-separable-hilbert-operator-herglotz", rank: 2, variance: "operator-family", basis: "external-interior-hilbert", regime: "upper-half-plane-interior", order: "norm-holomorphic", scheme: "unclassified-range", symmetry: "unitary-frame", cp: "unrestricted", support: "possibly-nonclosed-range" } },
  { id: "d02.harnack-range-class", signature: { domain: "separable-hilbert-dissipative-range-class", rank: 2, variance: "positive-operator-scale", basis: "one-frequency-basepoint", regime: "compact-frequency-patch", order: "two-sided-form-comparable", scheme: "harnack-douglas", symmetry: "unitary-frame", cp: "unrestricted", support: "frequency-invariant-square-root-range" } },
  { id: "d02.operator-eight-stratum", signature: { domain: "separable-hilbert-operator-schur-stratum", rank: 2, variance: "typed-record", basis: "support-gap-coupling-complement-topology-ideal-arc-state", regime: "bounded-interior", order: "decision-ready", scheme: "five-way-dispatch", symmetry: "unitary-and-arc-groupoid", cp: "unrestricted", support: "typed-closed-or-nonclosed" } },
  { id: "d02.operator-typed-response", signature: { domain: "separable-hilbert-operator-effective-response", rank: 2, variance: "topology-labelled-sum-type", basis: "external-ports", regime: "bounded-interior", order: "value-level", scheme: "ordinary-support-form-limit-or-refuse", symmetry: "unitary-and-arc-groupoid", cp: "unrestricted", support: "operator-valued-measure-capable" } },
  { id: "d02.operator-triage", signature: { domain: "d02-separable-hilbert-operator-theorem-candidate", rank: 2, variance: "proof-counterexample-frontier", basis: "receipted-review", regime: "bounded-interior", order: "review-candidate", scheme: "proposal-only", symmetry: "scoped-audited", cp: "unrestricted", support: "all-declared-operator-strata" } },
  { id: "d02.support-only-response", signature: { domain: "separable-hilbert-operator-effective-response", rank: 2, variance: "single-operator", basis: "support-projection-only", regime: "all-bounded-crossings", order: "universal", scheme: "silent-gap-collapse", symmetry: "unitary-frame", cp: "unrestricted", support: "rank-only" } },
  { id: "d02.kernel-compatible-response", signature: { domain: "separable-hilbert-operator-effective-response", rank: 2, variance: "single-operator", basis: "kernel-annihilation-only", regime: "nonclosed-range", order: "universal", scheme: "silent-douglas-promotion", symmetry: "unitary-frame", cp: "unrestricted", support: "full" } },
  { id: "d02.strong-response", signature: { domain: "separable-hilbert-operator-effective-response", rank: 2, variance: "operator-net", basis: "vectorwise", regime: "essential-spectrum", order: "strong-limit", scheme: "declared-strong", symmetry: "unitary-frame", cp: "unrestricted", support: "full" } },
  { id: "d02.norm-response", signature: { domain: "separable-hilbert-operator-effective-response", rank: 2, variance: "operator-net", basis: "uniform", regime: "essential-spectrum", order: "norm-limit", scheme: "silent-topology-promotion", symmetry: "unitary-frame", cp: "unrestricted", support: "full" } },
  { id: "d02.finite-probe-ledger", signature: { domain: "finite-compressed-operator-measure", rank: 2, variance: "scalar-moments", basis: "finite-probes-plus-trace", regime: "kernel-residue", order: "finite", scheme: "lossy-compression", symmetry: "probe-frame", cp: "unrestricted", support: "visible-only" } },
  { id: "d02.full-operator-residue", signature: { domain: "separable-hilbert-positive-operator-measure", rank: 2, variance: "bounded-positive-operator", basis: "full-external-space", regime: "kernel-residue", order: "exact", scheme: "operator-valued", symmetry: "unitary-frame", cp: "unrestricted", support: "visible-and-hidden" } }
];
const byId = new Map(objects.map((object) => [object.id, object]));
function rule({ id, kind, from, to, assumptions, losses = [], evidenceRefs, analogyOnly = false }) {
  const fromSignature = byId.get(from).signature;
  const toSignature = byId.get(to).signature;
  return { id, kind, from, to, fromSignature, toSignature, changes: fields.filter((field) => fromSignature[field] !== toSignature[field]), assumptions, losses, removes: [], evidenceRefs, analogyOnly, authority };
}

const transformations = [
  rule({ id: "extract-harnack-douglas-range-class", kind: "operator-harnack-classification", from: "d02.operator-herglotz-family", to: "d02.harnack-range-class", assumptions: ["bounded operator-valued Herglotz family", "connected upper-half-plane domain", "compact frequency patch"], evidenceRefs: ["D02-OPERATOR-HARNACK.md#result", "generated/d02-operator-harnack-receipt.json"] }),
  rule({ id: "classify-eight-coordinate-operator-stratum", kind: "operator-stratification", from: "d02.harnack-range-class", to: "d02.operator-eight-stratum", assumptions: ["support, gap, Douglas class, complementability, topology, ideal, approach net and scalarization remain separate"], evidenceRefs: ["D02-OPERATOR-EXHAUSTION.md#why-support-is-not-enough", "generated/d02-bounded-operator-exhaustion-audit.json#requiredOperatorStratum"] }),
  rule({ id: "apply-five-way-operator-dispatcher", kind: "typed-operator-schur-dispatch", from: "d02.operator-eight-stratum", to: "d02.operator-typed-response", assumptions: ["ordinary, closed-range, factorized, topology-labelled limit and refusal handlers are ordered", "no topology promotion occurs"], losses: ["a single norm response is unavailable on strong-only or weak-only branches"], evidenceRefs: ["D02-OPERATOR-EXHAUSTION.md#final-dispatcher", "generated/d02-bounded-operator-exhaustion-receipt.json"] }),
  rule({ id: "handoff-bounded-operator-exhaustion", kind: "review-handoff", from: "d02.operator-typed-response", to: "d02.operator-triage", assumptions: ["unbounded domains and real-axis boundary values remain explicit frontiers", "authority stays proposal-only"], losses: ["no application or empirical authority"], evidenceRefs: ["D02-OPERATOR-EXHAUSTION.md", "generated/d02-bounded-operator-exhaustion-audit.json"] }),
  rule({ id: "counterexample-support-alone-classifies", kind: "silent-stratum-collapse", from: "d02.operator-herglotz-family", to: "d02.support-only-response", assumptions: ["deliberate invalid fixture: equal support projections imply equal gap and range behavior"], losses: ["spectral gap", "closed-range class"], evidenceRefs: ["D02-OPERATOR-TOPOLOGY.md#the-missing-operator-strata"], analogyOnly: true }),
  rule({ id: "counterexample-kernel-gate-is-sufficient", kind: "silent-range-promotion", from: "d02.operator-herglotz-family", to: "d02.kernel-compatible-response", assumptions: ["deliberate invalid fixture: kernel annihilation implies bounded square-root factorization"], losses: ["Douglas majorization class"], evidenceRefs: ["D02-OPERATOR-EXTENSION.md#essential-spectrum-witness"], analogyOnly: true }),
  rule({ id: "counterexample-strong-implies-norm", kind: "topology-promotion", from: "d02.strong-response", to: "d02.norm-response", assumptions: ["deliberate invalid fixture: vectorwise convergence is uniform"], losses: ["essential spectral tail"], evidenceRefs: ["D02-OPERATOR-TOPOLOGY.md#essential-spectrum-topology-obstruction"], analogyOnly: true }),
  rule({ id: "counterexample-finite-probes-determine-residue", kind: "lossy-reconstruction", from: "d02.finite-probe-ledger", to: "d02.full-operator-residue", assumptions: ["deliberate invalid fixture: finite compression plus trace is faithful"], losses: ["orthogonal hidden residue directions"], evidenceRefs: ["D02-OPERATOR-MEASURE.md#finite-probes-cannot-reconstruct-the-residue"], analogyOnly: true })
];
const graph = withRecordDimensions({ objects, transformations });
const liveV1Graph = legacyV1Projection(graph);
const queries = [
  { id: "bounded-operator-dispatch", source: "d02.operator-herglotz-family", target: "d02.operator-triage", maxDepth: 5 },
  { id: "support-only", source: "d02.operator-herglotz-family", target: "d02.support-only-response", maxDepth: 2 },
  { id: "kernel-only", source: "d02.operator-herglotz-family", target: "d02.kernel-compatible-response", maxDepth: 2 },
  { id: "strong-to-norm", source: "d02.strong-response", target: "d02.norm-response", maxDepth: 2 },
  { id: "finite-probe-reconstruction", source: "d02.finite-probe-ledger", target: "d02.full-operator-residue", maxDepth: 2 }
];

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-operator-common-algebra2-graph.json"), `${JSON.stringify({ protocol: "claimipedia-d02-common-algebra2-graph/1", family: "operator", dimensionConvention: "dimensionless-proposal-and-review-record", recordDimension, graph, queries }, null, 2)}\n`);
const child = spawn(node, bridgeArgs, { stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
const lines = createInterface({ input: child.stdout, crlfDelay: Infinity });
const pending = new Map();
let nextId = 1;
let stderr = "";
let exited = false;
child.stderr.setEncoding("utf8");
child.stderr.on("data", (chunk) => { stderr += chunk; });
child.once("exit", (code) => { exited = true; for (const request of pending.values()) request.reject(new Error(stderr.trim() || `bridge exited with code ${code}`)); pending.clear(); });
lines.on("line", (line) => { let message; try { message = JSON.parse(line); } catch { return; } const request = pending.get(message.id); if (!request) return; pending.delete(message.id); if (message.error) request.reject(new Error(message.error.message)); else request.resolve(message.result); });
function rpc(method, params = {}) { const id = nextId++; return new Promise((resolvePromise, reject) => { pending.set(id, { resolve: resolvePromise, reject }); child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`); }); }
function payload(result) { if (result?.isError) throw new Error(result.content?.map((part) => part.text ?? "").join("\n") || "tool call failed"); if (result?.structuredContent) return result.structuredContent; const text = result?.content?.find((part) => part.type === "text")?.text; return text ? JSON.parse(text) : result; }
const call = async (name, args) => payload(await rpc("tools/call", { name, arguments: args }));
const report = { protocol: "claimipedia-d02-operator-sourcery-review/1", graphSha256: createHash("sha256").update(JSON.stringify(liveV1Graph)).digest("hex"), sourceGraphSha256: createHash("sha256").update(JSON.stringify(graph)).digest("hex"), protocolAdapter: legacyDimensionAdapter, queries: [], authority };

try {
  await rpc("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "d02-operator-review", version: "1" } });
  const host = await call("temple_host_describe", {});
  report.host = { generationId: host.generationId, runtimeHash: host.runtimeHash, admittedBasisGenerationId: expectedHost.requiredBasisGenerationId, admittedBasisHash: expectedHost.requiredBasisHash };
  if (host.generationId !== expectedHost.generationId || host.runtimeHash !== expectedHost.runtimeHash) throw new Error("unexpected Sourcery host generation");
  const operation = await call("temple_system_describe_operation", { operationId: "scientific_derivation_compose" });
  if (!(operation.inputSchema?.properties?.action?.enum ?? []).includes("compose-derivation")) throw new Error("scientific derivation composer unavailable");
  for (const query of queries) {
    const result = await call("temple_system_execute_operation", { operationId: "scientific_derivation_compose", input: { action: "compose-derivation", request: { graph: liveV1Graph, query: { source: query.source, target: query.target, maxDepth: query.maxDepth } } } });
    report.queries.push({ query, result });
  }
  const positive = report.queries.find(({ query }) => query.id === "bounded-operator-dispatch").result;
  const negatives = report.queries.filter(({ query }) => query.id !== "bounded-operator-dispatch");
  const invalidRuleIds = [...new Set(report.queries.flatMap(({ result }) => result.invalidRules.map(({ rule }) => rule.id)))].sort();
  report.summary = { positiveCandidateCount: positive.candidates.length, positiveCandidateSteps: positive.candidates.map(({ steps }) => steps), negativeCandidateCounts: Object.fromEntries(negatives.map(({ query, result }) => [query.id, result.candidates.length])), invalidRuleIds, disposition: "admit-eight-coordinate-operator-dispatch-reject-silent-promotions" };
  const expectedInvalid = ["counterexample-support-alone-classifies", "counterexample-kernel-gate-is-sufficient", "counterexample-strong-implies-norm", "counterexample-finite-probes-determine-residue"];
  report.passed = positive.candidates.length === 1 && negatives.every(({ result }) => result.candidates.length === 0) && expectedInvalid.every((id) => invalidRuleIds.includes(id)) && report.queries.every(({ result }) => result.receipt.proposalOnly === true && result.receipt.entails === false && result.receipt.empiricalAuthority === false && result.receipt.applicationAdmission === false);
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "d02-operator-sourcery-review.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ protocol: report.protocol, host: report.host, ...report.summary, passed: report.passed }, null, 2));
  if (!report.passed) process.exitCode = 1;
} catch (error) {
  report.error = error.message;
  report.stderr = stderr.trim().slice(-4000);
  report.passed = false;
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "d02-operator-sourcery-review.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
} finally {
  if (!exited) { child.stdin.end(); await new Promise((resolvePromise) => child.once("exit", resolvePromise)); }
}
