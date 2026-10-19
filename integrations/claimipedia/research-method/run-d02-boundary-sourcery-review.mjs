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
const bridgeArgs = [bridge, "--ledger", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\supervisor.sqlite", "--generations", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\generations", "--runtime-root", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-runtime", "--authority-custody", "C:\\Users\\aaron\\sourcery\\.consolidation\\authority\\temple-authority.dpapi", "--initial-generation", "split-v9-qualified"];
const expectedHost = { generationId: "host-claimipedia-boundary-capability-r11", runtimeHash: "4c48dcc7423b18612e1b50fda3941bae33e3fa1cf01b64c7b40cd906f6188bb2", requiredBasisGenerationId: "host-claim-adapter-v18", requiredBasisHash: "28fbfa709c2f8a18716d76450a196abba8074e45b908334316c7e0c147d2b1a3" };
const fields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
const authority = { proposalOnly: true, entails: false, empiricalAuthority: false };

const objects = [
  { id: "d02.boundary-herglotz-response", signature: { domain: "bounded-separable-hilbert-herglotz", rank: 2, variance: "operator-family", basis: "external-interior-hilbert", regime: "upper-half-plane-to-real-boundary", order: "holomorphic-family", scheme: "unclassified-boundary", symmetry: "unitary-frame", cp: "unrestricted", support: "full-boundary-measure" } },
  { id: "d02.boundary-povm", signature: { domain: "positive-operator-valued-measure", rank: 2, variance: "measure", basis: "scalar-matrix-elements", regime: "real-axis", order: "countably-additive", scheme: "ac-atomic-singular-continuous", symmetry: "unitary-frame", cp: "unrestricted", support: "full-boundary-measure" } },
  { id: "d02.boundary-ten-decoration-stratum", signature: { domain: "bounded-boundary-schur-stratum", rank: 2, variance: "typed-record", basis: "measure-density-atom-sc-pv-scaling-arc-topology-inverse-scale", regime: "real-axis-nontangential", order: "decision-ready", scheme: "ten-gate-dispatch", symmetry: "unitary-and-arc-groupoid", cp: "unrestricted", support: "full-boundary-measure" } },
  { id: "d02.boundary-typed-response", signature: { domain: "bounded-boundary-effective-response", rank: 2, variance: "topology-labelled-sum-type", basis: "external-ports", regime: "real-axis-declared-approach", order: "measure-form-or-operator", scheme: "measure-density-atom-threshold-schur-or-refuse", symmetry: "unitary-and-arc-groupoid", cp: "unrestricted", support: "lossless-measure-capable" } },
  { id: "d02.boundary-triage", signature: { domain: "d02-bounded-boundary-theorem-candidate", rank: 2, variance: "proof-counterexample-frontier", basis: "receipted-review", regime: "real-axis-boundary", order: "review-candidate", scheme: "proposal-only", symmetry: "scoped-audited", cp: "unrestricted", support: "all-declared-boundary-strata" } },
  { id: "d02.ae-density-only", signature: { domain: "scalarized-ae-density", rank: 2, variance: "measurable-form", basis: "lebesgue-ae", regime: "real-axis", order: "density-only", scheme: "lossy", symmetry: "unitary-frame", cp: "unrestricted", support: "absolutely-continuous-only" } },
  { id: "d02.reconstructed-full-measure", signature: { domain: "positive-operator-valued-measure", rank: 2, variance: "measure", basis: "density-only", regime: "real-axis", order: "claimed-exact", scheme: "silent-singular-reconstruction", symmetry: "unitary-frame", cp: "unrestricted", support: "claimed-full" } },
  { id: "d02.scalar-boundary-form", signature: { domain: "scalarized-boundary-form", rank: 2, variance: "sesquilinear-form", basis: "countable-dense-states", regime: "nontangential-ae", order: "pointwise", scheme: "not-uniformly-bounded", symmetry: "unitary-frame", cp: "unrestricted", support: "form-domain" } },
  { id: "d02.bounded-boundary-operator", signature: { domain: "bounded-boundary-operator", rank: 2, variance: "bounded-operator", basis: "full-hilbert-space", regime: "nontangential-ae", order: "operator-valued", scheme: "silent-uniform-upgrade", symmetry: "unitary-frame", cp: "unrestricted", support: "full" } },
  { id: "d02.strong-atom-limit", signature: { domain: "atomic-residue", rank: 2, variance: "positive-operator-net", basis: "vectorwise", regime: "vertical-boundary", order: "strong-limit", scheme: "declared-strong", symmetry: "unitary-frame", cp: "unrestricted", support: "full" } },
  { id: "d02.norm-atom-limit", signature: { domain: "atomic-residue", rank: 2, variance: "positive-operator-net", basis: "uniform", regime: "vertical-boundary", order: "norm-limit", scheme: "silent-tail-promotion", symmetry: "unitary-frame", cp: "unrestricted", support: "full" } },
  { id: "d02.threshold-divergence", signature: { domain: "singular-boundary-scaling", rank: 2, variance: "scalarized-asymptotic", basis: "zero-atom-indicator", regime: "threshold", order: "fractional-divergence", scheme: "non-atomic", symmetry: "unitary-frame", cp: "unrestricted", support: "continuous-spectrum" } },
  { id: "d02.claimed-atom", signature: { domain: "atomic-residue", rank: 2, variance: "positive-operator", basis: "divergence-only", regime: "real-axis", order: "claimed-pole", scheme: "silent-atom-promotion", symmetry: "unitary-frame", cp: "unrestricted", support: "point-mass" } },
  { id: "d02.weak-schur-factors", signature: { domain: "boundary-schur-factors", rank: 2, variance: "operator-net", basis: "weak-operator", regime: "real-axis", order: "factorwise-limit", scheme: "nonmultiplicative", symmetry: "unitary-frame", cp: "unrestricted", support: "full" } },
  { id: "d02.weak-schur-product", signature: { domain: "boundary-effective-response", rank: 2, variance: "bounded-operator", basis: "weak-factor-limits", regime: "real-axis", order: "claimed-product-limit", scheme: "silent-multiplication", symmetry: "unitary-frame", cp: "unrestricted", support: "full" } },
  { id: "d02.nontangential-limit", signature: { domain: "boundary-approach", rank: 2, variance: "scalarized-limit", basis: "stolz-cone", regime: "nontangential-ae", order: "fatou-limit", scheme: "declared-approach", symmetry: "arc-groupoid", cp: "unrestricted", support: "ae-boundary" } },
  { id: "d02.all-path-limit", signature: { domain: "boundary-approach", rank: 2, variance: "scalarized-limit", basis: "arbitrary-path", regime: "tangential-and-nontangential", order: "claimed-universal", scheme: "silent-arc-collapse", symmetry: "arc-groupoid", cp: "unrestricted", support: "pointwise-boundary" } }
];
const byId = new Map(objects.map((object) => [object.id, object]));
function rule({ id, kind, from, to, assumptions, losses = [], evidenceRefs, analogyOnly = false }) {
  const fromSignature = byId.get(from).signature;
  const toSignature = byId.get(to).signature;
  return { id, kind, from, to, fromSignature, toSignature, changes: fields.filter((field) => fromSignature[field] !== toSignature[field]), assumptions, losses, removes: [], evidenceRefs, analogyOnly, authority };
}

const transformations = [
  rule({ id: "extract-positive-operator-measure", kind: "herglotz-representation", from: "d02.boundary-herglotz-response", to: "d02.boundary-povm", assumptions: ["bounded operator-valued Herglotz response", "separable Hilbert space", "scalar matrix-element representation"], evidenceRefs: ["D02-BOUNDARY-MEASURE.md", "generated/d02-boundary-measure-receipt.json"] }),
  rule({ id: "classify-boundary-decorations", kind: "boundary-stratification", from: "d02.boundary-povm", to: "d02.boundary-ten-decoration-stratum", assumptions: ["measure, density, atom, singular-continuous mass, principal value, scaling, approach, topology, inverse bound and LAP scale stay distinct"], evidenceRefs: ["D02-BOUNDARY-EXHAUSTION.md#lossless-boundary-record", "generated/d02-boundary-exhaustion-audit.json"] }),
  rule({ id: "apply-boundary-dispatcher", kind: "typed-boundary-dispatch", from: "d02.boundary-ten-decoration-stratum", to: "d02.boundary-typed-response", assumptions: ["a.e., topology and approach qualifiers are preserved", "Schur elimination uses norm or strong-* plus uniform inverse control"], losses: ["a single bounded pointwise operator is unavailable on form-only, singular or divergent branches"], evidenceRefs: ["D02-BOUNDARY-EXHAUSTION.md#strongest-reusable-theorem", "generated/d02-boundary-exhaustion-receipt.json"] }),
  rule({ id: "handoff-boundary-exhaustion", kind: "review-handoff", from: "d02.boundary-typed-response", to: "d02.boundary-triage", assumptions: ["unbounded domains and model-specific limiting absorption remain explicit frontiers", "authority stays proposal-only"], losses: ["no application or empirical authority"], evidenceRefs: ["D02-BOUNDARY-EXHAUSTION.md", "generated/d02-boundary-exhaustion-audit.json"] }),
  rule({ id: "counterexample-density-determines-measure", kind: "lossy-measure-reconstruction", from: "d02.ae-density-only", to: "d02.reconstructed-full-measure", assumptions: ["deliberate invalid fixture: zero a.e. density erases singular-continuous and atomic mass"], losses: ["atoms", "singular-continuous measure"], evidenceRefs: ["D02-BOUNDARY-MEASURE.md"], analogyOnly: true }),
  rule({ id: "counterexample-scalar-form-is-bounded-operator", kind: "silent-uniform-boundedness", from: "d02.scalar-boundary-form", to: "d02.bounded-boundary-operator", assumptions: ["deliberate invalid fixture: pointwise scalar limits are uniformly bounded over unit vectors"], losses: ["unbounded diagonal density directions"], evidenceRefs: ["D02-BOUNDARY-MEASURE.md"], analogyOnly: true }),
  rule({ id: "counterexample-strong-atom-implies-norm", kind: "topology-promotion", from: "d02.strong-atom-limit", to: "d02.norm-atom-limit", assumptions: ["deliberate invalid fixture: vectorwise atom recovery controls nonuniform spectral tails"], losses: ["moving narrow continuous mass"], evidenceRefs: ["D02-BOUNDARY-MEASURE.md"], analogyOnly: true }),
  rule({ id: "counterexample-divergence-implies-atom", kind: "silent-singularity-promotion", from: "d02.threshold-divergence", to: "d02.claimed-atom", assumptions: ["deliberate invalid fixture: every boundary divergence is a simple pole"], losses: ["threshold exponent", "zero atom indicator"], evidenceRefs: ["D02-BOUNDARY-MEASURE.md"], analogyOnly: true }),
  rule({ id: "counterexample-weak-factors-compose", kind: "nonmultiplicative-topology-promotion", from: "d02.weak-schur-factors", to: "d02.weak-schur-product", assumptions: ["deliberate invalid fixture: WOT limits commute with products and inverses"], losses: ["shift-product defect"], evidenceRefs: ["D02-BOUNDARY-SCHUR.md"], analogyOnly: true }),
  rule({ id: "counterexample-nontangential-means-all-paths", kind: "silent-approach-promotion", from: "d02.nontangential-limit", to: "d02.all-path-limit", assumptions: ["deliberate invalid fixture: a Fatou limit controls paths leaving every Stolz cone"], losses: ["sparse-spike tangential path"], evidenceRefs: ["D02-BOUNDARY-APPROACH.md"], analogyOnly: true })
];
const graph = { objects, transformations };
const queries = [
  { id: "bounded-boundary-dispatch", source: "d02.boundary-herglotz-response", target: "d02.boundary-triage", maxDepth: 5 },
  { id: "density-to-measure", source: "d02.ae-density-only", target: "d02.reconstructed-full-measure", maxDepth: 2 },
  { id: "form-to-operator", source: "d02.scalar-boundary-form", target: "d02.bounded-boundary-operator", maxDepth: 2 },
  { id: "strong-to-norm-atom", source: "d02.strong-atom-limit", target: "d02.norm-atom-limit", maxDepth: 2 },
  { id: "threshold-to-atom", source: "d02.threshold-divergence", target: "d02.claimed-atom", maxDepth: 2 },
  { id: "weak-schur", source: "d02.weak-schur-factors", target: "d02.weak-schur-product", maxDepth: 2 },
  { id: "all-paths", source: "d02.nontangential-limit", target: "d02.all-path-limit", maxDepth: 2 }
];

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
const report = { protocol: "claimipedia-d02-boundary-sourcery-review/1", graphSha256: createHash("sha256").update(JSON.stringify(graph)).digest("hex"), queries: [], authority };

try {
  await rpc("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "d02-boundary-review", version: "1" } });
  const host = await call("temple_host_describe", {});
  report.host = { generationId: host.generationId, runtimeHash: host.runtimeHash, admittedBasisGenerationId: expectedHost.requiredBasisGenerationId, admittedBasisHash: expectedHost.requiredBasisHash };
  if (host.generationId !== expectedHost.generationId || host.runtimeHash !== expectedHost.runtimeHash) throw new Error("unexpected Sourcery host generation");
  const operation = await call("temple_system_describe_operation", { operationId: "scientific_derivation_compose" });
  if (!(operation.inputSchema?.properties?.action?.enum ?? []).includes("compose-derivation")) throw new Error("scientific derivation composer unavailable");
  for (const query of queries) {
    const result = await call("temple_system_execute_operation", { operationId: "scientific_derivation_compose", input: { action: "compose-derivation", request: { graph, query: { source: query.source, target: query.target, maxDepth: query.maxDepth } } } });
    report.queries.push({ query, result });
  }
  const positive = report.queries.find(({ query }) => query.id === "bounded-boundary-dispatch").result;
  const negatives = report.queries.filter(({ query }) => query.id !== "bounded-boundary-dispatch");
  const invalidRuleIds = [...new Set(report.queries.flatMap(({ result }) => result.invalidRules.map(({ rule }) => rule.id)))].sort();
  report.summary = { positiveCandidateCount: positive.candidates.length, positiveCandidateSteps: positive.candidates.map(({ steps }) => steps), negativeCandidateCounts: Object.fromEntries(negatives.map(({ query, result }) => [query.id, result.candidates.length])), invalidRuleIds, disposition: "admit-measure-first-boundary-dispatch-reject-six-silent-promotions" };
  const expectedInvalid = ["counterexample-density-determines-measure", "counterexample-scalar-form-is-bounded-operator", "counterexample-strong-atom-implies-norm", "counterexample-divergence-implies-atom", "counterexample-weak-factors-compose", "counterexample-nontangential-means-all-paths"];
  report.passed = positive.candidates.length === 1 && negatives.every(({ result }) => result.candidates.length === 0) && expectedInvalid.every((id) => invalidRuleIds.includes(id)) && report.queries.every(({ result }) => result.receipt.proposalOnly === true && result.receipt.entails === false && result.receipt.empiricalAuthority === false && result.receipt.applicationAdmission === false);
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "d02-boundary-sourcery-review.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ protocol: report.protocol, host: report.host, ...report.summary, passed: report.passed }, null, 2));
  if (!report.passed) process.exitCode = 1;
} catch (error) {
  report.error = error.message;
  report.stderr = stderr.trim().slice(-4000);
  report.passed = false;
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "d02-boundary-sourcery-review.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
} finally {
  if (!exited) { child.stdin.end(); await new Promise((resolvePromise) => child.once("exit", resolvePromise)); }
}
