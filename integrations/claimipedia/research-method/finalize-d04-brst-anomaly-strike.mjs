import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const read = (name) => JSON.parse(readFileSync(resolve(generated, name), "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const receipts = [
  ["d04-brst-one-loop-receipt.json", read("d04-brst-one-loop-receipt.json")],
  ["d04-beta-vector-identity-receipt.json", read("d04-beta-vector-identity-receipt.json")]
];
assert.ok(receipts.every(([, receipt]) => receipt.passed && Object.values(receipt.checks).every(Boolean)));
const oneLoop = read("d04-brst-one-loop-audit.json");
const betaVector = read("d04-beta-vector-identity.json");
const review = read("d04-sourcery-review.json");
assert.equal(review.passed, true);

const docket = {
  protocol: "claimipedia-d04-brst-anomaly-exhaustion-docket/1",
  campaign: "D-04 BRST-complete one-loop metric-Higgs strike",
  requestedQuestion: "Does a BRST-complete one-loop Abelian-Higgs metric-Higgs spectral calculation preserve the D-03 quartic-anomaly orientation Q?",
  answer: "The question is perturbatively ill-graded: a four-particle spectral cut begins at three graph loops and its interference with a one-loop beta insertion begins at uniform order four. One-loop cannot test Q.",
  strongestOneLoopResult: "The BRST-physical one-loop scalar continuum has only hh and massive-vector-pair thresholds and is a positive metric-Higgs ray at strict uniform one-loop order; xi-dependent Goldstone/ghost thresholds are absent from the physical measure.",
  replacementTheorem: "For physical state classes n,m, Delta r_nm=b dot (R_n-R_m), where b is the beta/anomalous coefficient covector and R is the renormalized anomaly-operator form-factor response vector. The pairing is invariant under improvement shear and invertible operator mixing.",
  oldQDisposition: {
    amplitudeLevel: "retained only as a quartic-only special-case conjecture",
    oneLoopSpectralLevel: "rejected",
    brstProtection: "rejected; BRST protects the cohomological beta-vector contraction, not omission of gauge-anomaly form factors",
    genericCompletion: betaVector.oldFormulaDisposition.genericCompletion
  },
  evidenceBoundary: {
    externallyCertified: [
      "arXiv:1912.11390 supplies the explicit xi-independent positive one-loop O_H spectral density and physical hh/vector thresholds",
      "arXiv:2007.01770 supplies the BRST cohomology and algebraic renormalization of O_H"
    ],
    independentlyExecutableHere: [
      "cut topology loop count",
      "physical phase-space positivity fixture",
      "strict one-loop ray determinant",
      "separation of graph-loop and beta-coefficient orders",
      "improvement and operator-mixing covariance of the beta-vector identity"
    ],
    notClaimed: "No unpublished TT or T O_H Feynman-integral evaluation is represented as completed."
  },
  exactNextCalculation: {
    object: "physical form-factor response matrix Delta R",
    operators: ["[F_mu_nu F^mu_nu]", "[partial L/partial lambda]", "mass-anomalous scalar representatives"],
    states: ["hh", "massive-vector pair", "four-body physical states"],
    requiredChecks: ["Slavnov-Taylor identities", "xi cancellation", "operator-mixing covariance", "infrared safety", "complete Cutkosky support", "uniform perturbative grading"],
    decision: "If Delta R has sufficient rank, infer beta-vector combinations; otherwise record the resulting Ward/dynamical null relation."
  },
  dispositions: {
    oneLoopBrstSupport: "closed with external integral evidence and local executable audit",
    oneLoopMetricHiggsInnovation: "zero on the strict continuum rung",
    quarticFourBodyQAtOneLoop: "no-go",
    quarticOnlyQInFullBrstTheory: "not protected",
    betaVectorIdentity: "closed algebraically",
    numericalAnomalyTomography: "blocked on new physical form-factor calculation",
    fullUniformOrderFourSpectrum: "external multi-loop programme"
  },
  sourceryReview: review,
  exhaustion: {
    everyTechnicallyActionableGateInDeclaredOneLoopScopeHasDisposition: true,
    unresolvedOneLoopDiscriminantThatCanRescueQ: false,
    remainingWorkRequiresHigherOrderOrNewTraceInsertionIntegrals: true,
    classification: "one-loop-support-certified; one-loop-Q-no-go; beta-vector-anomaly-tomography-retained"
  },
  receiptHashes: Object.fromEntries(receipts.map(([name, receipt]) => [name, receipt.resultSha256])),
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};
docket.docketSha256 = sha256(JSON.stringify(docket));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d04-brst-anomaly-exhaustion-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
console.log(JSON.stringify({ protocol: docket.protocol, classification: docket.exhaustion.classification, docketSha256: docket.docketSha256, passed: true }, null, 2));
