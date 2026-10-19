import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const read = (name) => JSON.parse(readFileSync(resolve(generated, name), "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const receiptNames = ["d05-two-body-form-factor-receipt.json", "d05-inclusive-tomography-receipt.json", "d05-conditioning-receipt.json"];
const receipts = receiptNames.map((name) => [name, read(name)]);
assert.ok(receipts.every(([, receipt]) => receipt.passed && Object.values(receipt.checks).every(Boolean)));
const formFactors = read("d05-two-body-form-factor-result.json");
const inclusive = read("d05-inclusive-tomography-audit.json");
const conditioning = read("d05-conditioning-audit.json");
const review = read("d05-sourcery-review.json");
assert.equal(review.passed, true);

const docket = {
  protocol: "claimipedia-d05-two-body-tomography-exhaustion-docket/1",
  campaign: "D-05 physical two-body anomaly tomography",
  strongestResult: "The hh, transverse-vector-pair and longitudinal-vector-pair physical form factors generically yield a rank-two response matrix for the gauge and quartic anomaly operators above their common continuum threshold.",
  determinant: formFactors.formFactorTheorem.determinant,
  inversionResult: "Two polarization-resolved projective differences recover the two beta coefficients at one energy; alternatively, two inclusive energies with independent weighted-mean responses recover them without event-level polarization tags.",
  inclusiveResult: {
    mean: inclusive.inclusiveTheorem.mixedResponse,
    innovation: inclusive.inclusiveTheorem.innovation,
    scan: inclusive.inclusiveTheorem.scanRecovery
  },
  perturbativeDisposition: {
    formFactors: "tree level and physical on shell",
    mixedProjectiveSignal: "bi-grade (two-particle cut loop 1, beta-coefficient loop 1); uniform order two",
    positiveInnovation: "quadratic in beta differences; first visible at uniform order three",
    fourBodyRequired: false
  },
  covarianceDisposition: {
    rankAndSignal: "invariant under invertible anomaly-operator mixing with dual beta transformation",
    conditionNumber: "not invariant without a declared operator-space metric/normalization",
    brst: "Goldstone and ghost fields remain internal completion variables and are not added to the positive physical spectral sum",
    equivalenceTheorem: "usable for high-energy longitudinal checks only with finite equivalence factors and complete BRST diagrams"
  },
  measurementFrontier: {
    object: "inclusive mixed-correlator mean and Schur innovation over an energy window",
    missing: ["dimensionless renormalized operator normalization", "loop-corrected physical response functions", "Euclidean/lattice or dispersive estimator", "measurement covariance and regularized inverse"],
    decisionRule: "Claim beta tomography only after the measured response design has stable rank under uncertainties and declared scheme transformations."
  },
  noGoResults: [
    "exact vector threshold does not distinguish transverse and longitudinal response",
    "tree form-factor rank does not imply uniform one-loop positive innovation",
    "inclusive summation is not projection onto a single ray",
    "condition number is not basis-free",
    "the equivalence theorem does not add Goldstones as physical positive states",
    "form-factor labels do not by themselves define an experimental observable"
  ],
  sourceryReview: review,
  exhaustion: {
    everyDeclaredFormFactorRankAndConditioningGateHasDisposition: true,
    unresolvedInScopeDiscriminantThatCanChangeRankConclusion: false,
    remainingWorkRequiresLoopIntegralsOrMeasurementDesign: true,
    classification: "two-body-beta-response-full-rank; inclusive-tomography-viable; empirical-estimator-frontier"
  },
  receiptHashes: Object.fromEntries(receipts.map(([name, receipt]) => [name, receipt.resultSha256])),
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};
docket.docketSha256 = sha256(JSON.stringify(docket));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d05-two-body-tomography-exhaustion-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
console.log(JSON.stringify({ protocol: docket.protocol, classification: docket.exhaustion.classification, docketSha256: docket.docketSha256, passed: true }, null, 2));
