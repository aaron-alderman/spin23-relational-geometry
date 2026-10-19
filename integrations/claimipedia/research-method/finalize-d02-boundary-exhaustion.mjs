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
  operatorDocket: "d02-bounded-operator-exhaustion-docket.json",
  boundaryMeasure: "d02-boundary-measure-receipt.json",
  boundarySchur: "d02-boundary-schur-receipt.json",
  boundaryApproach: "d02-boundary-approach-receipt.json",
  boundaryAudit: "d02-boundary-exhaustion-audit.json",
  boundaryAuditReceipt: "d02-boundary-exhaustion-receipt.json",
  sourceryReview: "d02-boundary-sourcery-review.json"
};
const records = Object.fromEntries(Object.entries(inputs).map(([key, name]) => [key, read(name)]));
for (const key of ["boundaryMeasure", "boundarySchur", "boundaryApproach", "boundaryAuditReceipt", "sourceryReview"]) assert.equal(records[key].passed, true);
assert.equal(records.boundaryAudit.boundedBoundaryExhaustion.unresolvedInScopeDiscriminantThatCanChangeDisposition, false);
assert.equal(records.sourceryReview.summary.positiveCandidateCount, 1);
assert.deepEqual(records.sourceryReview.summary.negativeCandidateCounts, { "density-to-measure": 0, "form-to-operator": 0, "strong-to-norm-atom": 0, "threshold-to-atom": 0, "weak-schur": 0, "all-paths": 0 });

const docket = {
  protocol: "claimipedia-d02-bounded-boundary-exhausted-docket/1",
  strikeId: "d02-bounded-real-axis-boundary-exhausted-v1",
  extends: { protocol: records.operatorDocket.protocol, sha256: records.operatorDocket.docketSha256 },
  reviewStage: "Triage",
  disposition: "retain-povm-as-canonical-admit-ten-decoration-boundary-dispatch-reject-six-silent-promotions",
  terminalResult: "For bounded operator-valued Schur-Herglotz responses on separable Hilbert space, the positive operator-valued measure is the lossless real-axis object. Scalarized nontangential a.e. density, topology-labelled atoms, singular-continuous mass, principal values, threshold scaling, approach geometry and Schur inverse control remain separate decorations. Every technically actionable bounded boundary discriminant has a disposition.",
  evidenceBasis: Object.fromEntries(Object.entries(inputs).map(([key, name]) => [key, { path: name, sha256: hashFile(name) }])),
  admittedReview: {
    host: records.sourceryReview.host,
    positiveCandidateSteps: records.sourceryReview.summary.positiveCandidateSteps,
    invalidRuleIds: records.sourceryReview.summary.invalidRuleIds
  },
  findings: [
    { id: "D02-B1", status: "canonical-object", statement: "The positive operator-valued representing measure is the lossless boundary object; a pointwise boundary operator is a derived, topology-qualified object." },
    { id: "D02-B2", status: "ae-theorem", statement: "Scalar matrix elements have nontangential boundary values almost everywhere, with imaginary part equal to pi times the absolutely continuous density." },
    { id: "D02-B3", status: "operator-density-no-go", statement: "A bounded POVM can have finite scalar densities but no bounded B(H)-valued pointwise density." },
    { id: "D02-B4", status: "atom-theorem", statement: "Sigma({lambda}) is recovered by y Im M(lambda+i y), with WOT/SOT/norm convergence separately licensed." },
    { id: "D02-B5", status: "tail-counterexample", statement: "Strong atom recovery does not imply norm recovery when continuous spectral mass concentrates on nonuniformly narrowing coordinates." },
    { id: "D02-B6", status: "threshold-counterexample", statement: "A y^(-1/2) boundary divergence can have zero atom indicator; divergence is not synonymous with a pole." },
    { id: "D02-B7", status: "singular-continuous-no-go", statement: "Zero absolutely continuous density and zero atoms do not determine zero measure; singular-continuous mass survives." },
    { id: "D02-B8", status: "norm-schur-theorem", statement: "Norm boundary limits commute with Schur elimination under invertibility of the limiting denominator." },
    { id: "D02-B9", status: "strong-schur-theorem", statement: "Strong Schur limits require strong-* factor convergence and a uniform inverse bound." },
    { id: "D02-B10", status: "weak-topology-no-go", statement: "WOT factor limits are not multiplicative; shift powers have weakly zero factors and identity products." },
    { id: "D02-B11", status: "inverse-no-go", statement: "Strong-* convergence without uniform inverse control can produce unbounded moving Schur corrections." },
    { id: "D02-B12", status: "density-transport", statement: "Where the topology permits Schur gluing, W_eff=W_A+B D_0^(-*) W_D D_0^-1 B*." },
    { id: "D02-B13", status: "pole-creation", statement: "An eliminated boundary zero can create a positive atom in the effective response." },
    { id: "D02-B14", status: "approach-counterexample", statement: "A sparse-spike density has its expected vertical limit at a Lebesgue point but a different limit along tangential spike-centre paths." },
    { id: "D02-B15", status: "principal-value-layer", statement: "The real principal value is nonlocal decoration and neither follows from the pointwise density value nor replaces the full measure." },
    { id: "D02-B16", status: "lap-boundary", statement: "A generic a.e. Herglotz boundary theorem is not a uniform limiting-absorption principle; the latter needs a model and weighted/operator scale." }
  ],
  dispatcher: records.boundaryAudit.dispatcher,
  requiredBoundaryDecorations: records.boundaryAudit.requiredBoundaryDecorations,
  externalFrontiers: records.boundaryAudit.frontiers,
  boundedBoundaryExhaustion: {
    achieved: true,
    scope: records.boundaryAudit.scope,
    remainingInScopeDiscriminants: [],
    qualification: "Exhaustion is relative to bounded operator-valued Herglotz responses on separable Hilbert space and topology-labelled real-axis boundary gluing; it does not cover unbounded domains or model-specific uniform LAP estimates."
  },
  independentContext: [
    { title: "Some Applications of Operator-Valued Herglotz Functions", url: "https://arxiv.org/abs/math/9802103", relevance: "operator-valued Herglotz representation and boundary measures" },
    { title: "Cauchy transforms and the existence of principal values", url: "https://arxiv.org/abs/0704.0621", relevance: "principal-value and singular-measure boundary distinctions" },
    { title: "Limiting absorption principle for the Dirac operator", url: "https://arxiv.org/abs/1706.05257", relevance: "example of the additional model-specific estimates required for a LAP" }
  ],
  authority: { proposalOnly: true, entailsBeyondDeclaredScope: false, empiricalAuthority: false, automaticPromotion: false, automaticCorpusAdmission: false, applicationAdmission: false }
};
docket.docketSha256 = hashValue(docket);
writeFileSync(resolve(generated, "d02-bounded-boundary-exhaustion-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
console.log(JSON.stringify({ protocol: docket.protocol, disposition: docket.disposition, findingCount: docket.findings.length, frontierCount: docket.externalFrontiers.length, docketSha256: docket.docketSha256, passed: true }, null, 2));
