import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const spec = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a2-domain-wall-reader-localization.json", import.meta.url), "utf8"));
assert.equal(spec.documentId, 1292);
const p = spec.parameters;
const mu = p.u * Math.sqrt(p.lambdaEta / 2);
const tension = 4 * mu * p.u ** 2 / 3;
const sech = x => 1 / Math.cosh(x);
const kink = y => p.u * Math.tanh(mu * y);
const antikink = y => -kink(y);
const kinkPrime = y => p.u * mu * sech(mu * y) ** 2;
const kinkSecond = y => -2 * p.u * mu ** 2 * sech(mu * y) ** 2 * Math.tanh(mu * y);

// The analytic kink and antikink solve eta''=lambda eta(eta^2-u^2).
let maximumKinkResidual = 0;
for (let j = -100; j <= 100; j += 1) {
  const y = 4 * j / 100;
  const eta = kink(y);
  const residual = kinkSecond(y) - p.lambdaEta * eta * (eta ** 2 - p.u ** 2);
  maximumKinkResidual = Math.max(maximumKinkResidual, Math.abs(residual));
}
assert.ok(maximumKinkResidual < spec.acceptance.maximumKinkEquationResidual);
assert.ok(Math.abs(kink(-p.halfLength) + p.u) < spec.acceptance.maximumBoundaryTail);
assert.ok(Math.abs(kink(p.halfLength) - p.u) < spec.acceptance.maximumBoundaryTail);
const kinkCharge = (p.u - (-p.u)) / (2 * p.u);
const antikinkCharge = (-p.u - p.u) / (2 * p.u);
assert.deepEqual([kinkCharge, antikinkCharge], [1, -1]);
const orientationTensions = [tension, tension];
assert.deepEqual(orientationTensions, [4 / 3, 4 / 3]); // orientation changes no even action term.
assert.ok(tension > 0);

// Odd eta pins the center: its translation mode eta' is even and therefore excluded.
for (const y of [-2, -0.7, 0.3, 1.8]) {
  assert.ok(Math.abs(kink(-y) + kink(y)) < 1e-12);
  assert.ok(Math.abs(kinkPrime(-y) - kinkPrime(y)) < 1e-12);
}

// Exactly solvable l=1 Poschl-Teller reader localization.
assert.ok(Math.abs(p.readerWellCoupling * p.u ** 2 - 2 * mu ** 2) < 1e-12);
const readerBoundMassSquared = p.readerBulkMassSquared - mu ** 2;
const readerBoundMass = Math.sqrt(readerBoundMassSquared);
const readerContinuumMass = Math.sqrt(p.readerBulkMassSquared);
assert.ok(readerBoundMassSquared > spec.acceptance.minimumPositiveGap);
assert.ok(p.readerQuartic > 0);
assert.ok(readerBoundMass < readerContinuumMass);
const psi = y => Math.sqrt(mu / 2) * sech(mu * y);
const psiSecond = y => Math.sqrt(mu / 2) * mu ** 2 * sech(mu * y) * (1 - 2 * sech(mu * y) ** 2);
let maximumReaderResidual = 0;
for (let j = -150; j <= 150; j += 1) {
  const y = 5 * j / 100;
  const potential = p.readerBulkMassSquared - p.readerWellCoupling * p.u ** 2 * sech(mu * y) ** 2;
  const residual = -psiSecond(y) + potential * psi(y) - readerBoundMassSquared * psi(y);
  maximumReaderResidual = Math.max(maximumReaderResidual, Math.abs(residual));
  assert.ok(Math.abs(psi(-y) - psi(y)) < 1e-12);
}
assert.ok(maximumReaderResidual < spec.acceptance.maximumReaderEquationResidual);

// Numerical normalization on a wide range checks the analytic sqrt(mu/2) factor.
const integrationHalfWidth = 15 / mu;
const steps = 200000;
const dy = 2 * integrationHalfWidth / steps;
let integral = 0;
for (let i = 0; i <= steps; i += 1) {
  const y = -integrationHalfWidth + i * dy;
  const weight = i === 0 || i === steps ? 0.5 : 1;
  integral += weight * psi(y) ** 2 * dy;
}
assert.ok(Math.abs(integral - 1) < spec.acceptance.maximumWavefunctionNormalizationError);

// Finite folded slab makes even zero modes normalizable and supplies a KK gap.
const kkGap = Math.PI / (2 * p.halfLength);
assert.ok(kkGap > p.probeEnergy);
assert.ok(readerBoundMass > p.probeEnergy);
assert.equal(spec.fold.parities.Phi_reader, "even");
assert.equal(spec.fold.parities.a_i, "even");
assert.equal(spec.fold.parities.a_y, "odd");
assert.equal(spec.fold.parities.b_ij, "odd");
assert.equal(spec.fold.parities.b_iy, "even");

// One complex bosonic mode includes charge +1 particles and charge -1=2 mod 3 antiparticles.
const residualCharges = new Set([((1 % 3) + 3) % 3, (((-1) % 3) + 3) % 3]);
assert.deepEqual([...residualCharges].sort(), [1, 2]);
assert.equal(spec.reader.doublingVerdict.includes("not a second mirror field"), true);
assert.equal(spec.reader.anomalyVerdict.includes("no bosonic parity anomaly"), true);

// Orientation can be history-selected but is not selected by the CP-even action.
assert.equal(spec.fold.bulkActionExplicitCpBreaking, false);
assert.equal(spec.fold.uniqueOrientationPredicted, false);
assert.equal(kink(1) ** 2, antikink(1) ** 2);

assert.equal(spec.conditionalConstruction.a2OriginalActionPassed, false);
assert.equal(spec.conditionalConstruction.a2ExtendedConditionalConstructionPassed, true);
assert.equal(spec.conditionalConstruction.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: spec.documentId,
  modelId: spec.modelId,
  mu,
  wallThickness: 1 / mu,
  wallTension: tension,
  kinkEquationMaximumResidual: maximumKinkResidual,
  wallCharges: [kinkCharge, antikinkCharge],
  boundaryTail: Math.max(Math.abs(kink(-p.halfLength) + p.u), Math.abs(kink(p.halfLength) - p.u)),
  translationModeProjectedByParity: true,
  readerBoundMass,
  readerContinuumMass,
  readerEquationMaximumResidual: maximumReaderResidual,
  readerWavefunctionNorm: integral,
  localizedReaderCount: 1,
  residualParticleAntiparticleCharges: [...residualCharges].sort(),
  bosonicMirrorDoublingRequired: false,
  kkGap,
  explicitCpBreakingInBulkAction: false,
  uniqueOrientationPredicted: false,
  historySelectedOrientationsAvailable: 2,
  a2OriginalActionPassed: false,
  a2ExtendedConditionalConstructionPassed: true,
  physicalAdmission: false
}, null, 2));
