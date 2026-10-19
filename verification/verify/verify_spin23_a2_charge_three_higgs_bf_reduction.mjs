import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const spec = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a2-charge-three-higgs-bf-reduction.json", import.meta.url), "utf8"));
const p = spec.parameters;
const tau = 2 * Math.PI;
const close = (a, b, eps = 1e-11) => Math.abs(a - b) < eps;

// Quadratic spectrum in the canonical normalization A=a/e.
const radialMassSquared = 2 * p.lambda * p.v ** 2;
const vectorMassSquared = 9 * p.e ** 2 * p.v ** 2;
const readerMassSquared = p.readerBareMassSquared + p.readerPortalKappa * p.v ** 2 / 2;
const radialMass = Math.sqrt(radialMassSquared);
const vectorMass = Math.sqrt(vectorMassSquared);
const readerMass = Math.sqrt(readerMassSquared);
const kkGap = 1 / p.intervalRadius;
for (const gap of [radialMass, vectorMass, readerMass, kkGap]) assert.ok(gap > p.probeEnergy);
assert.ok(p.readerQuartic > 0 && readerMassSquared > 0);

// The charge-three condensate is invariant precisely under the three residual phases.
const residualAlphas = [0, tau / 3, 2 * tau / 3];
for (const alpha of residualAlphas) assert.ok(close(Math.cos(3 * alpha), 1) && close(Math.sin(3 * alpha), 0));
const unitChargePhases = residualAlphas.map(alpha => [Math.cos(alpha), Math.sin(alpha)]);
assert.equal(new Set(unitChargePhases.map(([re, im]) => `${re.toFixed(9)},${im.toFixed(9)}`)).size, 3);

// Integer level, vortex flux and line/surface mutual phase.
assert.equal(spec.normalization.bfLevel, 3);
const fluxes = spec.syntheticChecks.vortexWindings.map(n => -tau * n / spec.normalization.bfLevel);
assert.ok(close(fluxes[0], tau / 3) && close(fluxes[1], -tau / 3));
const mutualPhases = spec.syntheticChecks.vortexWindings.map(n => [Math.cos(tau * n / 3), Math.sin(tau * n / 3)]);
assert.ok(close(mutualPhases[0][0], mutualPhases[1][0]));
assert.ok(close(mutualPhases[0][1], -mutualPhases[1][1]));
// CP-even vortex energy/tension depends on |n|, not its orientation.
const orientationEnergies = spec.syntheticChecks.vortexWindings.map(n => n ** 2);
assert.deepEqual(orientationEnergies, [1, 1]);

// Orbifold parities leave only the desired 3d BF pair; odd tangential b kills the boundary variation.
assert.deepEqual(spec.orbifold.survivingZeroModes, ["a_mu", "c_mu=integral_I b_mu_y dy"]);
assert.deepEqual(spec.orbifold.projectedZeroModes, ["a_y", "b_mu_nu"]);
assert.equal(spec.orbifold.parities.b_mu_nu, "odd");
assert.equal(spec.boundaryVariation.orbifoldResolution.includes("vanish on fixed planes"), true);
assert.equal(spec.boundaryVariation.readerBoundaryEquation.includes("j_reader"), true);
assert.equal(spec.boundaryVariation.qualification.includes("does not by itself"), true);

function readerSpectrum({ q, h, sites = p.readerCycleSites, mass = readerMass }) {
  const theta = tau * q * h / 3;
  return Array.from({ length: sites }, (_, n) => Math.sqrt(mass ** 2 + 4 * Math.sin((tau * n + theta) / (2 * sites)) ** 2)).sort((a, b) => a - b);
}
const maxDifference = (a, b) => Math.max(...a.map((x, i) => Math.abs(x - b[i])));
const logZ = spectrum => -2 * spectrum.reduce((sum, E) => sum + Math.log1p(-Math.exp(-p.readerInverseTemperature * E)), 0);

const q1 = [0, 1, 2].map(h => readerSpectrum({ q: 1, h }));
const q3 = [0, 1, 2].map(h => readerSpectrum({ q: 3, h }));
assert.ok(maxDifference(q1[0], q1[1]) > 1e-5);
assert.ok(maxDifference(q1[1], q1[2]) < 1e-12);
assert.ok(maxDifference(q3[0], q3[1]) < 1e-12);
assert.ok(Math.abs(logZ(q1[0]) - logZ(q1[1])) > 1e-7);
const minimumReaderGap = Math.min(...q1.flat());
assert.ok(minimumReaderGap >= readerMass - 1e-12);

// A charge-one condensate has trivial stabilizer inside the residual Z3.
const readerCondensateStabilizer = residualAlphas.filter(alpha => close(Math.cos(alpha), 1) && close(Math.sin(alpha), 0));
assert.equal(readerCondensateStabilizer.length, 1);

// Strict BF torus counting and the declared IR hierarchy.
const K = [[0, 3], [3, 0]];
const detK = K[0][0] * K[1][1] - K[0][1] * K[1][0];
assert.equal(Math.abs(detK), spec.syntheticChecks.expectedTorusGroundStatesInStrictBfLimit);
const irCeiling = Math.min(radialMass, vectorMass, readerMass, kkGap);
assert.ok(p.probeEnergy < irCeiling);

assert.equal(spec.orbifold.originDerived, false);
assert.equal(spec.boundaryVariation.physicalOrientationSelected, false);
assert.equal(spec.reader.localizationDerived, false);
assert.equal(spec.conditionalReductionGate.a2Passed, false);
assert.equal(spec.conditionalReductionGate.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: spec.documentId,
  modelId: spec.modelId,
  masses: { radialMass, vectorMass, readerMass, kkGap, irCeiling },
  bfLevel: spec.normalization.bfLevel,
  vortexFluxes: fluxes,
  mutualPhases,
  vortexOrientationEnergies: orientationEnergies,
  survivingOrbifoldZeroModes: spec.orbifold.survivingZeroModes,
  boundaryVariationKilledByOrbifoldParity: true,
  minimumReaderGap,
  chargeOneSectorSpectrumDifference: maxDifference(q1[0], q1[1]),
  chargeOneCpConjugateDifference: maxDifference(q1[1], q1[2]),
  chargeThreeSectorDifference: maxDifference(q3[0], q3[1]),
  chargeOneLogZDifference: Math.abs(logZ(q1[0]) - logZ(q1[1])),
  readerCondensateResidualStabilizerOrder: readerCondensateStabilizer.length,
  strictBfTorusGroundStates: Math.abs(detK),
  orbifoldOriginDerived: false,
  orientationSelected: false,
  readerLocalizationDerived: false,
  a2Passed: false,
  physicalAdmission: false
}, null, 2));
