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
  finiteDocket: "d02-exhaustion-docket.json",
  boundedOperator: "d02-bounded-operator-receipt.json",
  topology: "d02-operator-topology-receipt.json",
  measure: "d02-operator-measure-receipt.json",
  harnack: "d02-operator-harnack-receipt.json",
  operatorAudit: "d02-bounded-operator-exhaustion-audit.json",
  operatorAuditReceipt: "d02-bounded-operator-exhaustion-receipt.json",
  sourceryReview: "d02-operator-sourcery-review.json"
};
const records = Object.fromEntries(Object.entries(inputs).map(([key, name]) => [key, read(name)]));
for (const key of ["boundedOperator", "topology", "measure", "harnack", "operatorAuditReceipt", "sourceryReview"]) assert.equal(records[key].passed, true);
assert.equal(records.operatorAudit.boundedExhaustion.unresolvedInScopeDiscriminantThatCanChangeDisposition, false);
assert.equal(records.sourceryReview.summary.positiveCandidateCount, 1);
assert.deepEqual(records.sourceryReview.summary.negativeCandidateCounts, { "support-only": 0, "kernel-only": 0, "strong-to-norm": 0, "finite-probe-reconstruction": 0 });

const docket = {
  protocol: "claimipedia-d02-bounded-operator-exhausted-docket/1",
  strikeId: "d02-bounded-operator-extension-exhausted-v1",
  extends: { protocol: records.finiteDocket.protocol, sha256: records.finiteDocket.docketSha256 },
  reviewStage: "Triage",
  disposition: "retain-factorized-operator-theorem-admit-eight-coordinate-dispatch-reject-topology-and-range-promotions",
  terminalResult: "For bounded operators on separable Hilbert spaces at interior upper-half-plane frequencies, support must be refined by spectral gap, Douglas coupling class, full complementability, convergence topology, Schatten ideal, approach net and scalarization. Ordinary, closed-range, factorized, topology-labelled-limit and refusal handlers exhaust the declared cases.",
  evidenceBasis: Object.fromEntries(Object.entries(inputs).map(([key, name]) => [key, { path: name, sha256: hashFile(name) }])),
  admittedReview: {
    host: records.sourceryReview.host,
    positiveCandidateSteps: records.sourceryReview.summary.positiveCandidateSteps,
    invalidRuleIds: records.sourceryReview.summary.invalidRuleIds
  },
  findings: [
    { id: "D02-O1", status: "exact-bounded-theorem", statement: "A common-scale factorization D=T^(1/2)Dhat T^(1/2), B=C T^(1/2) gives a bounded norm-holomorphic passive correction C Dhat^-1 C* without requiring closed range." },
    { id: "D02-O2", status: "range-threshold", statement: "The Douglas square-root factorization, not kernel annihilation alone, is the bounded-response gate at non-closed range." },
    { id: "D02-O3", status: "spectral-trichotomy", statement: "For T=diag(1/n), B=T^alpha: alpha<1/2 diverges, alpha=1/2 is bounded strong-only under ambient regularization, and alpha>1/2 is norm stable with compact residue." },
    { id: "D02-O4", status: "topology-hierarchy", statement: "Trace norm, norm, strong and weak operator convergence are strict, separately licensed layers even for positive residues." },
    { id: "D02-O5", status: "support-no-go", statement: "Equal kernel and support projection do not determine closed range or the spectral gap." },
    { id: "D02-O6", status: "path-counterexample", statement: "Norm-convergent block endpoints can yield different strong Schur limits through sqrt(delta)L coupling on an emerging kernel." },
    { id: "D02-O7", status: "residue-cone", statement: "An emerging kernel carries the whole bounded positive-operator residue cone R=LL*, modulo right-unitary coupling gauge." },
    { id: "D02-O8", status: "probe-no-go", statement: "No fixed finite probe compression plus trace reconstructs an unrestricted operator-valued residue." },
    { id: "D02-O9", status: "frequency-invariance", statement: "Operator Harnack inequalities and Douglas factorization make the dissipative square-root range class invariant across compact frequency patches." },
    { id: "D02-O10", status: "measure-boundary", statement: "A bounded positive operator-valued Herglotz atom need not define a finite scalar trace measure or Fredholm determinant." },
    { id: "D02-O11", status: "fredholm-no-go", statement: "Fredholmness is not necessary: a non-Fredholm compact interior scale can still produce a bounded factorized or strong response." },
    { id: "D02-O12", status: "noncommuting-extension", statement: "The factorized theorem is frame covariant and does not require simultaneous diagonalization of T and Dhat." }
  ],
  dispatcher: records.operatorAudit.dispatcher,
  requiredOperatorStratum: records.operatorAudit.requiredOperatorStratum,
  externalFrontiers: records.operatorAudit.frontiers,
  boundedExhaustion: {
    achieved: true,
    scope: records.operatorAudit.scope,
    remainingInScopeDiscriminants: [],
    qualification: "Exhaustion is relative to bounded separable-Hilbert-space operators, interior upper-half-plane frequency and reciprocal frequency-independent coupling."
  },
  independentContext: [
    { title: "Some Applications of Operator-Valued Herglotz Functions", url: "https://arxiv.org/abs/math/9802103", relevance: "operator-valued Herglotz representation and transformations" },
    { title: "A generalized Schur complement for non-negative operators on linear space", url: "https://arxiv.org/abs/1708.01545", relevance: "generalized form Schur complements" },
    { title: "Perturbation of closed range operators and Moore-Penrose inverse", url: "https://arxiv.org/abs/1510.01534", relevance: "closed-range and Moore-Penrose perturbation boundary" },
    { title: "Schur complement dominant operator matrices", url: "https://arxiv.org/abs/2205.11653", relevance: "operator and form-domain frontier" }
  ],
  authority: { proposalOnly: true, entailsBeyondDeclaredScope: false, empiricalAuthority: false, automaticPromotion: false, automaticCorpusAdmission: false, applicationAdmission: false }
};
docket.docketSha256 = hashValue(docket);
writeFileSync(resolve(generated, "d02-bounded-operator-exhaustion-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
console.log(JSON.stringify({ protocol: docket.protocol, disposition: docket.disposition, findingCount: docket.findings.length, frontierCount: docket.externalFrontiers.length, docketSha256: docket.docketSha256, passed: true }, null, 2));
