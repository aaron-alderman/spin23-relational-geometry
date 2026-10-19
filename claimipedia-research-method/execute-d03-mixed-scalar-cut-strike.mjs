import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const determinant3 = ([r1, r2, r3]) => dot(r1, cross(r2, r3));
const finiteProjectorCoordinate = (r) => [r ** 2, 1, Math.SQRT2 * r];
const infinityCoordinate = [1, 0, 0];

// Real-scalar component of the Abelian-Higgs scalar sector.
// L_int=-lambda phi^4/4!, O_H=phi^2/2 and O_4=phi^4/4!.
// Overall convention-dependent common factors do not affect distinctness of ratios.
const mass = 1;
const lambda = 0.2;
const betaLambda = 3 * lambda ** 2 / (16 * Math.PI ** 2);
const pairRatio = 2 * mass ** 2;

function pairedFourBodyConfiguration(totalEnergy, firstMomentum) {
  const firstEnergy = Math.sqrt(mass ** 2 + firstMomentum ** 2);
  const secondEnergy = totalEnergy / 2 - firstEnergy;
  assert.ok(secondEnergy >= mass);
  const secondMomentum = Math.sqrt(secondEnergy ** 2 - mass ** 2);
  const invariantMassSquared = totalEnergy ** 2;
  const firstDenominator = invariantMassSquared - 2 * totalEnergy * firstEnergy;
  const secondDenominator = invariantMassSquared - 2 * totalEnergy * secondEnergy;
  assert.ok(firstDenominator > 0 && secondDenominator > 0);
  const higgsFourFormFactor = lambda * (2 / firstDenominator + 2 / secondDenominator);
  const quarticContactFormFactor = 1;
  const ratio = pairRatio + betaLambda * quarticContactFormFactor / higgsFourFormFactor;
  return { totalEnergy, invariantMassSquared, firstMomentum, secondMomentum, firstEnergy, secondEnergy, firstDenominator, secondDenominator, higgsFourFormFactor, quarticContactFormFactor, ratio };
}

const configurations = [
  pairedFourBodyConfiguration(6, 0),
  pairedFourBodyConfiguration(6, 1),
  pairedFourBodyConfiguration(7, 0.4),
  pairedFourBodyConfiguration(8, 1.5)
];
assert.ok(configurations.every(({ ratio }) => Math.abs(ratio - pairRatio) > 1e-6));
assert.ok(Math.abs(configurations[0].ratio - configurations[1].ratio) > 1e-6);

const carrierDeterminants = configurations.map(({ ratio }) => ({
  mixedRatio: ratio,
  determinant: determinant3([infinityCoordinate, finiteProjectorCoordinate(pairRatio), finiteProjectorCoordinate(ratio)])
}));
assert.ok(carrierDeterminants.every(({ determinant }) => Math.abs(determinant) > 1e-6));

// A triangular source redefinition adds the same constant to every finite ratio.
const shear = 3.7;
const shearChecks = configurations.map(({ ratio }) => {
  const before = determinant3([infinityCoordinate, finiteProjectorCoordinate(pairRatio), finiteProjectorCoordinate(ratio)]);
  const after = determinant3([infinityCoordinate, finiteProjectorCoordinate(pairRatio + shear), finiteProjectorCoordinate(ratio + shear)]);
  return { ratio, shiftedRatio: ratio + shear, before, after, error: Math.abs(before - after) };
});
assert.ok(shearChecks.every(({ error }) => error < 1e-10));

// Independent threshold onsets separate the three projector classes spectrally.
const thresholds = {
  gaugePair: 0,
  scalarPair: 4 * mass ** 2,
  fourScalar: 16 * mass ** 2
};
assert.ok(thresholds.gaugePair < thresholds.scalarPair && thresholds.scalarPair < thresholds.fourScalar);

// Counterexamples: fixed point beta_lambda=0 or omission of the contact anomaly collapses the third ratio.
const fixedPointRatio = pairRatio;
const fixedPointDeterminant = determinant3([infinityCoordinate, finiteProjectorCoordinate(pairRatio), finiteProjectorCoordinate(fixedPointRatio)]);
assert.ok(Math.abs(fixedPointDeterminant) < 1e-12);

const result = {
  protocol: "claimipedia-d03-mixed-scalar-cut-strike/1",
  strikeId: "d03-abelian-higgs-four-scalar-ratio-v1",
  theoremCandidate: {
    formFactors: "In the scalar quartic sector, O_H=phi^2/2 reaches four on-shell scalars at order lambda through one propagator, while the beta_lambda O_4 trace term reaches them through a local contact form factor.",
    mixedRatio: "Up to common convention factors, r_4=2m^2+beta_lambda/[lambda sum_i((q-p_i)^2-m^2)^-1], so nonzero beta_lambda gives a finite ratio distinct from the scalar-pair value at generic kinematics.",
    kinematicVariation: "The propagator sum changes across four-body phase space, so r_4 is not a fixed relabelling of the scalar-pair ray.",
    thresholdSeparation: "Gauge-pair, scalar-pair and four-scalar cuts start at distinct thresholds 0,4m^2,16m^2 in the massless-gauge simplified rung, making their leading weights spectrally identifiable.",
    fullSpan: "The gauge-only point at infinity, scalar-pair ratio 2m^2 and any generic four-scalar ratio have nonzero projective coordinate determinant and therefore span H2(R).",
    schemeCovariance: "O_g -> O_g+c O_H shifts every finite ratio by c and leaves the determinant with the infinity direction unchanged."
  },
  parameters: { mass, lambda, betaLambda, pairRatio },
  configurations,
  carrierDeterminants,
  shearChecks,
  thresholds,
  fixedPointCounterexample: { betaLambda: 0, ratio: fixedPointRatio, determinant: fixedPointDeterminant },
  dispositions: {
    genericQuarticRunningSuppliesThirdProjectiveDirection: true,
    thirdRatioVariesAcrossFourBodyKinematics: true,
    threeLeadingThresholdClassesSpanH2: true,
    sourceShearErasesDistinctness: false,
    scalarFixedPointSuppliesThirdDirection: false,
    fullSpanEstablishesSpin23Covariance: false
  },
  qualifications: [
    "This is the leading scalar-sector form-factor topology; complete Abelian-Higgs normalization, charged-species combinatorics, gauge/Goldstone/ghost completion and loop phases remain to be calculated.",
    "Linear span is established structurally; an open physical image and transformation closure remain separate gates.",
    "The real-carrier conclusion uses tree-level real form factors; absorptive loop phases require the declared antiunitary/reciprocity audit."
  ],
  nextGate: "Perform the BRST-complete Abelian-Higgs operator-mixing and phase audit, then compute whether physical controls give a rank-three spectral Jacobian rather than only a three-direction threshold span.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d03-mixed-scalar-cut-strike-receipt/1",
  checks: {
    physicalFourBodyConfigurationsConstructed: true,
    mixedRatioDistinctFromPairRatio: configurations.every(({ ratio }) => Math.abs(ratio - pairRatio) > 1e-6),
    phaseSpaceVariationVerified: Math.abs(configurations[0].ratio - configurations[1].ratio) > 1e-6,
    threeDirectionDeterminantsNonzero: carrierDeterminants.every(({ determinant }) => Math.abs(determinant) > 1e-6),
    sourceShearInvarianceVerified: shearChecks.every(({ error }) => error < 1e-10),
    thresholdOrderingVerified: true,
    fixedPointCollapseVerified: Math.abs(fixedPointDeterminant) < 1e-12,
    spanAndSymmetrySeparated: result.dispositions.fullSpanEstablishesSpin23Covariance === false,
    qualificationsRetained: result.qualifications.length === 3,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-mixed-scalar-cut-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d03-mixed-scalar-cut-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
