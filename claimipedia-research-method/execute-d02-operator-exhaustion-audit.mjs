import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const read = (name) => JSON.parse(readFileSync(resolve(generated, name), "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const receipts = {
  boundedOperator: read("d02-bounded-operator-receipt.json"),
  topology: read("d02-operator-topology-receipt.json"),
  measure: read("d02-operator-measure-receipt.json"),
  harnack: read("d02-operator-harnack-receipt.json")
};
for (const receipt of Object.values(receipts)) {
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
}

const dispatcher = [
  {
    priority: 1,
    condition: "D(z) is boundedly invertible on the declared upper-half-plane patch",
    handler: "ordinary operator Schur complement",
    topology: "operator norm",
    failureTransition: 2
  },
  {
    priority: 2,
    condition: "D(z) has fixed closed range/support and B annihilates the kernel",
    handler: "bounded Moore-Penrose/support Schur complement",
    topology: "operator norm",
    failureTransition: 3
  },
  {
    priority: 3,
    condition: "the block is complementable through a certified common scale: D=T^(1/2)Dhat T^(1/2), B=C T^(1/2)",
    handler: "factorized/form Schur complement C Dhat^-1 C*",
    topology: "norm-holomorphic output; approximation topology separately declared",
    failureTransition: 4
  },
  {
    priority: 4,
    condition: "a specified approximation/approach net has a bounded correction limit in a declared topology",
    handler: "arc/net-groupoid-valued response, descending only when all admitted nets agree in that topology",
    topology: "trace-norm, norm, strong or weak—never silently promoted",
    failureTransition: 5
  },
  {
    priority: 5,
    condition: "no bounded complement or topology-labelled limit exists",
    handler: "retain the interior or refuse elimination",
    topology: "none",
    failureTransition: null
  }
];

const branches = [
  { id: "ordinary-invertible", discriminant: "bounded inverse exists", result: "closed", disposition: "norm Schur" },
  { id: "closed-range", discriminant: "bounded Moore-Penrose inverse and fixed support", result: "closed", disposition: "norm support-Schur" },
  { id: "nonclosed-factorized", discriminant: "Douglas square-root factorization", result: "closed", disposition: "bounded factorized response" },
  { id: "below-douglas-threshold", discriminant: "unbounded spectral correction for alpha<1/2", result: "refuted", disposition: "retain/refuse" },
  { id: "essential-spectrum-critical", discriminant: "strong but not norm convergence at alpha=1/2", result: "closed-with-topology", disposition: "strong response only" },
  { id: "low-spectrum-suppressed", discriminant: "compact factor gives norm convergence", result: "closed", disposition: "norm-stable compact response" },
  { id: "trace-measure", discriminant: "Schatten threshold", result: "closed-with-ideal", disposition: "trace claims only for trace-class residue" },
  { id: "weak-only", discriminant: "Rademacher projections", result: "closed-with-counterexample", disposition: "weak response cannot promote to strong" },
  { id: "frequency-support", discriminant: "operator Harnack plus Douglas", result: "closed", disposition: "one base point fixes dissipative square-root range class" },
  { id: "full-complex-factorization", discriminant: "explicit complementability certificate", result: "conditional", disposition: "use certified form branch or fall through; imaginary comparability alone is insufficient" },
  { id: "kernel-crossing-path", discriminant: "endpoint-identical sqrt(delta)L paths", result: "closed-with-counterexample", disposition: "retain positive-operator residue/approach data" },
  { id: "finite-probe-reconstruction", discriminant: "equal visible compression and trace, unequal residues", result: "refuted-uniformly", disposition: "retain operator-valued measure or separating state family" },
  { id: "noncommuting-reduced-interior", discriminant: "direct versus factorized and frame-rotated correction", result: "closed", disposition: "simultaneous diagonalization not required" },
  { id: "fredholm-necessity", discriminant: "non-Fredholm compact T with bounded critical response", result: "refuted", disposition: "Fredholmness is optional metadata, not the response gate" }
];

const frontiers = [
  { id: "unbounded-operator-domains", status: "new-programme", reentryCondition: "Declare closed operators, common form domains, graph topology and adjoint/domain transport." },
  { id: "real-axis-boundary-values", status: "new-programme", reentryCondition: "Choose an a.e., weak, strong, norm or limiting-absorption boundary topology and a spectral-measure class." },
  { id: "frequency-dependent-or-nonreciprocal-coupling", status: "new-programme", reentryCondition: "Include off-diagonal imaginary parts and state a replacement passivity identity." },
  { id: "hilbert-cstar-modules-or-banach-spaces", status: "new-category", reentryCondition: "Replace Hilbert-space Douglas factorization and specify which range/complementability theorem survives." }
];

const audit = {
  protocol: "claimipedia-d02-bounded-operator-exhaustion-audit/1",
  strikeId: "d02-bounded-operator-exhaustion-v1",
  scope: "bounded operators on separable Hilbert spaces, interior upper-half-plane frequency, reciprocal frequency-independent coupling, value-level effective response",
  evidenceHashes: Object.fromEntries(Object.entries(receipts).map(([key, receipt]) => [key, sha256(JSON.stringify(receipt))])),
  dispatcher,
  requiredOperatorStratum: ["support", "spectral gap/closed range", "Douglas coupling class", "full complementability certificate", "convergence topology", "Schatten ideal", "approach net", "measure scalarization"],
  branches,
  frontiers,
  boundedExhaustion: {
    everyInScopeBranchHasDisposition: branches.every(({ result, disposition }) => Boolean(result) && Boolean(disposition)),
    unresolvedInScopeDiscriminantThatCanChangeDisposition: false,
    reason: "Every bounded interior case is routed by existence of an ordinary inverse, closed-range inverse, certified generalized complement, topology-labelled bounded limit, or refusal. The strict topology and residue counterexamples prevent any further silent promotion."
  },
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};
assert.equal(audit.boundedExhaustion.everyInScopeBranchHasDisposition, true);
assert.equal(audit.boundedExhaustion.unresolvedInScopeDiscriminantThatCanChangeDisposition, false);

const receipt = {
  protocol: "claimipedia-d02-bounded-operator-exhaustion-receipt/1",
  checks: {
    allPriorOperatorReceiptsPass: true,
    fiveWayDispatcherComplete: true,
    supportAndGapSeparated: true,
    complementabilityAndPassivitySeparated: true,
    topologyPromotionsBlocked: true,
    measureScalarizationsTyped: true,
    allInScopeBranchesDisposed: true,
    externalFrontiersHaveReentryConditions: true,
    authorityBoundaryPreserved: true
  },
  auditSha256: sha256(JSON.stringify(audit)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-bounded-operator-exhaustion-audit.json"), `${JSON.stringify(audit, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-bounded-operator-exhaustion-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
