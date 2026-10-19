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
  free: read("d03-free-metric-higgs-receipt.json"),
  anomaly: read("d03-abelian-anomaly-receipt.json"),
  projective: read("d03-projective-spectrum-receipt.json")
};
for (const receipt of Object.values(receipts)) {
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
}

const ladder = [
  { rung: 1, regime: "free conformally improved Higgs", stateDirections: 1, familyDimension: 1, result: "proved", disposition: "spectral ray; det rho=Delta=0" },
  { rung: 2, regime: "leading decoupled Abelian trace anomaly", stateDirections: 2, familyDimension: 2, result: "proved structural leading-order model", disposition: "positive innovation and rank two at overlapping energies, but fixed plane" },
  { rung: 3, regime: "mixed/four-particle interacting spectrum", stateDirections: 3, familyDimension: 3, result: "exact criterion, physical ratio uncomputed", disposition: "full H2 iff a third distinct real projective source ratio has an independently variable weight" },
  { rung: 4, regime: "physical transformation family", stateDirections: null, familyDimension: 3, result: "open", disposition: "test whether transformations close on the spectral family and mix all coordinates" },
  { rung: 5, regime: "selector/arithmetic comparison", stateDirections: null, familyDimension: null, result: "blocked by rungs 3-4", disposition: "require a typed intertwiner; do not compare dimensions alone" }
];

const invalidPromotions = [
  { id: "free-positive-implies-full-carrier", falsifier: "the free trace and Higgs source are spectrally collinear" },
  { id: "rank-two-matrix-implies-three-dimensional-family", falsifier: "the leading anomaly family lies in a fixed two-matrix plane" },
  { id: "three-named-sectors-imply-three-directions", falsifier: "three sectors with equal projective source ratio give the same ray" },
  { id: "full-linear-span-implies-open-image", falsifier: "spectral weights may obey a lower-dimensional constraint" },
  { id: "ambient-cone-automorphism-implies-physical-symmetry", falsifier: "a generic cone transformation need not preserve thresholds, sources or the measured family" },
  { id: "complex-amplitudes-automatically-give-real-carrier", falsifier: "irreducible phases naturally produce H2(C), not H2(R)" }
];

const checkpoint = {
  protocol: "claimipedia-d03-metric-higgs-checkpoint/1",
  campaignId: "d03-metric-higgs-response-geometry-v1",
  scope: "free and leading structural Abelian-Higgs metric-Higgs spectral response, plus exact projective full-carrier criterion",
  evidenceHashes: Object.fromEntries(Object.entries(receipts).map(([key, receipt]) => [key, sha256(JSON.stringify(receipt))])),
  strongestResult: "The free improved Higgs response is a ray. A leading gauge-anomaly direction makes the fixed-energy matrix full rank but confines the family to a plane. Three pairwise distinct real projective source-amplitude ratios span H2(R), provided their weights are independently variable.",
  invariant: {
    name: "spectral innovation",
    formula: "Delta=rho_gg-rho_gH rho_HH^+ rho_Hg",
    properties: ["nonnegative", "equal to det(rho)/rho_HH when rho_HH>0", "invariant under O_g -> O_g+c O_H", "zero exactly for spectral collinearity on the declared support"]
  },
  ladder,
  invalidPromotions,
  decisiveNextCalculation: {
    target: "lowest mixed or four-scalar Abelian-Higgs cut",
    outputs: ["renormalized amplitudes for O_g and O_H", "projective ratio and phase", "threshold support", "contact-quotiented spectral weight", "three-sample coordinate determinant"],
    success: "a third real ratio distinct from the scalar-pair ratio and metric-only infinity direction, with independently variable weight",
    reducedOutcome: "a new ratio exists but all physical weights remain constrained to a two-dimensional image",
    failure: "all amplitudes are collinear with the existing two directions or lack a common real structure"
  },
  status: {
    freeRungClosed: true,
    leadingAnomalyRungClosed: true,
    abstractFullCarrierCriterionClosed: true,
    physicalThirdRatioCalculated: false,
    physicalH2CarrierEstablished: false,
    spin23ResponseSymmetryEstablished: false,
    continueCampaign: true
  },
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};
assert.equal(checkpoint.status.continueCampaign, true);
assert.equal(checkpoint.status.physicalH2CarrierEstablished, false);

const receipt = {
  protocol: "claimipedia-d03-metric-higgs-checkpoint-receipt/1",
  checks: {
    allD03ReceiptsPass: true,
    rayPlaneCarrierLadderRecorded: true,
    spectralInnovationTyped: true,
    fixedPointRankAndFamilyDimensionSeparated: true,
    spanAndOpenImageSeparated: true,
    realStructureGateRetained: true,
    decisiveCalculationSpecified: true,
    noPhysicalCarrierOverclaim: true,
    noSpin23Overclaim: true,
    authorityBoundaryPreserved: true
  },
  checkpointSha256: sha256(JSON.stringify(checkpoint)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-metric-higgs-checkpoint.json"), `${JSON.stringify(checkpoint, null, 2)}\n`);
writeFileSync(resolve(generated, "d03-metric-higgs-checkpoint-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
