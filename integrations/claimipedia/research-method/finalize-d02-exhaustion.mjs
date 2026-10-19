import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const read = (name) => JSON.parse(readFileSync(resolve(generated, name), "utf8"));
const hashFile = (name) => createHash("sha256").update(readFileSync(resolve(generated, name))).digest("hex");
const hashValue = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

const inputs = {
  process: "d02-process-receipt.json",
  local: "d02-execution-receipt.json",
  initialReview: "d02-sourcery-review.json",
  initialDocket: "d02-final-docket.json",
  valuation: "d02-valuation-gluing-receipt.json",
  meromorphic: "d02-meromorphic-filtration-receipt.json",
  exhaustion: "d02-bounded-exhaustion-receipt.json",
  exhaustionAudit: "d02-bounded-exhaustion-audit.json",
  exhaustionReview: "d02-exhaustion-sourcery-review.json"
};
const records = Object.fromEntries(Object.entries(inputs).map(([key, name]) => [key, read(name)]));

assert.equal(records.process.passed, true);
assert.equal(records.local.passed, true);
assert.equal(records.initialReview.passed, true);
assert.equal(records.valuation.passed, true);
assert.equal(records.meromorphic.passed, true);
assert.equal(records.exhaustion.passed, true);
assert.equal(records.exhaustionReview.passed, true);
assert.equal(records.exhaustionAudit.boundedExhaustion.unresolvedBoundedDiscriminantThatCanChangeDisposition, false);
assert.equal(records.exhaustionReview.summary.positiveCandidateCount, 1);
assert.deepEqual(records.exhaustionReview.summary.negativeCandidateCounts, {
  "undecorated-single-value": 0,
  "scheme-free-finite-part": 0,
  "bulk-index-reconstruction": 0
});

const docket = {
  protocol: "claimipedia-d02-exhausted-strike-docket/1",
  strikeId: "d02-support-stratified-schur-exhausted-v1",
  supersedes: { protocol: records.initialDocket.protocol, sha256: records.initialDocket.docketSha256 },
  reviewStage: "Triage",
  disposition: "retain-local-theorem-admit-typed-arc-groupoid-dispatch-reject-universal-single-value",
  terminalResult: "Within finite-dimensional analytic or polynomial block-response germs, rank-changing Schur elimination is completely dispatched at value level by the cluster behavior of the full correction B D^-1 B^T: one finite value glues, multiple finite values remain approach-groupoid-valued, and an unbounded value retains/refuses the interior. No fixed finite jet decoration is uniformly complete, pole finite parts are scheme-relative, and positivity does not force descent.",
  evidenceBasis: Object.fromEntries(Object.entries(inputs).map(([key, name]) => [key, { path: name, sha256: hashFile(name) }])),
  admittedReview: {
    host: records.exhaustionReview.host,
    positiveCandidateSteps: records.exhaustionReview.summary.positiveCandidateSteps,
    invalidRuleIds: records.exhaustionReview.summary.invalidRuleIds
  },
  findings: [
    { id: "D02-X1", status: "exact-bounded-theorem", statement: "Constant-support, range-compatible reciprocal Schur elimination preserves analytic Herglotz passivity and support-frame covariance." },
    { id: "D02-X2", status: "exact-valuation-trichotomy", statement: "For D_s=s^m(D_m+O(s)) and B_s=s^n(B_n+O(s)), the correction is classified by the sign of 2n-m." },
    { id: "D02-X3", status: "coordinate-free-extension", statement: "The full correction is meromorphic for analytic one-parameter matrix germs; boundedness makes the puncture removable, including unequal-order non-diagonal crossings." },
    { id: "D02-X4", status: "descent-criterion", statement: "A singular-point response exists exactly when the approach-arc response functor is finite and constant on every admitted approach object." },
    { id: "D02-X5", status: "exact-counterexample", statement: "For every fixed jet depth N, higher-contact paths with the same N-jet can have different finite Schur limits." },
    { id: "D02-X6", status: "exact-counterexample", statement: "A nonlinear regular reparameterization changes the constant term obtained by subtracting a pole, so finite parts are not canonical without scheme decoration." },
    { id: "D02-X7", status: "category-boundary", statement: "Smooth flat germs can share every Taylor coefficient while producing different finite corrections; the analytic theorem does not silently extend to jet-only smooth calculus." },
    { id: "D02-X8", status: "decoration-split", statement: "Quadratic passive residue descends through sign holonomy; orientation/grading and invisible bulk index do not." },
    { id: "D02-X9", status: "measure-boundary", statement: "Positive operator-valued Herglotz measures represent passive branches but do not identify distinct approach-dependent residues." }
  ],
  finalDispatcher: records.exhaustionAudit.finalDispatcher,
  externalFrontiers: [
    { id: "smooth-full-germ", status: "new-programme", reentryCondition: "Supply a representation of full smooth germs and a computable equivalence stronger than Taylor jets." },
    { id: "operator-essential-spectrum", status: "new-programme", reentryCondition: "Declare a closed-range/Fredholm class, topology of convergence, and treatment of spectral accumulation." },
    { id: "interacting-gauge-wall", status: "application-programme", reentryCondition: "Provide a concrete model, renormalized response construction and gauge/BRST compatibility obligations." },
    { id: "nonequilibrium-fluctuation", status: "application-programme", reentryCondition: "Specify the matrix fluctuation relation, state preparation and admissible nonreciprocal coupling class." }
  ],
  boundedExhaustion: {
    achieved: true,
    scope: records.exhaustionAudit.boundedExhaustion.declaredScope,
    remainingInScopeDiscriminants: [],
    qualification: "Exhaustion is relative to the declared finite-dimensional analytic/polynomial value-level scope; external frontiers are preserved rather than erased."
  },
  authority: {
    proposalOnly: true,
    entailsBeyondDeclaredScope: false,
    empiricalAuthority: false,
    automaticPromotion: false,
    automaticCorpusAdmission: false,
    applicationAdmission: false
  }
};
docket.docketSha256 = hashValue(docket);
writeFileSync(resolve(generated, "d02-exhaustion-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
console.log(JSON.stringify({ protocol: docket.protocol, disposition: docket.disposition, findingCount: docket.findings.length, frontierCount: docket.externalFrontiers.length, docketSha256: docket.docketSha256, passed: true }, null, 2));
