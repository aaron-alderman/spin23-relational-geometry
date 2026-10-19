import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const audit = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a6-low-energy-matching-audit.json", import.meta.url), "utf8"));
assert.equal(audit.schema, "spin23.a6-low-energy-matching-audit/1");
assert.equal(audit.documentId, 1390);
assert.equal(audit.verdict.a6Passed, false);
assert.equal(audit.verdict.physicalAdmission, false);

const approx = (x, y, tolerance = 1e-9) => Math.abs(x - y) <= tolerance * Math.max(1, Math.abs(x), Math.abs(y));
const dot = (x, y) => x.reduce((sum, value, index) => sum + value * y[index], 0);
const matrixVector = (A, x) => A.map(row => dot(row, x));
const eigenvalues2 = ([[a, b], [c, d]]) => {
  assert(approx(b, c));
  const center = (a + d) / 2;
  const radius = Math.hypot((a - d) / 2, b);
  return [center - radius, center + radius];
};

const spectrum = audit.conditionalSpectrum;
const components = spectrum.oneGenerationLeftHandedFields.reduce(
  (sum, row) => sum + row.colorDimension * row.weakDimension,
  0
);
assert.equal(components, 15);
assert.equal(spectrum.standardModelComplexWeylComponents, spectrum.generations * components);
assert.equal(spectrum.sameChiralityMirrorCountIfSelectorAssumptionHolds, 0);

const rows = audit.u1xLeftHandedRows;
const sum = fn => rows.reduce((total, row) => total + fn(row), 0);
const anomaly = {
  su3Cubed: sum(r => r.colorCubic),
  su3SquaredX: sum(r => r.colorIndexMultiplicity * r.X),
  su2SquaredX: sum(r => r.weakIndexMultiplicity * r.X),
  gravitySquaredX: sum(r => r.multiplicity * r.X),
  xCubed: sum(r => r.multiplicity * r.X ** 3),
  ySquaredX: sum(r => r.multiplicity * r.Y6 ** 2 * r.X),
  yXSquared: sum(r => r.multiplicity * r.Y6 * r.X ** 2)
};
assert.deepEqual(anomaly, {
  su3Cubed: 0,
  su3SquaredX: 0,
  su2SquaredX: 0,
  gravitySquaredX: 0,
  xCubed: 0,
  ySquaredX: 0,
  yXSquared: 0
});

const p = audit.matchingPoint;
assert(Math.abs(p.kineticMixingChi) < 1);
assert(p.lambdaH > 0 && p.lambdaS > 0);
assert(4 * p.lambdaH * p.lambdaS - p.lambdaHS ** 2 > 0);

const Kinv = [
  [1, 0, 0],
  [0, 1 / (1 - p.kineticMixingChi ** 2), -p.kineticMixingChi / (1 - p.kineticMixingChi ** 2)],
  [0, -p.kineticMixingChi / (1 - p.kineticMixingChi ** 2), 1 / (1 - p.kineticMixingChi ** 2)]
];
const qH = [-p.g / 2, p.gY / 2, -p.gX].map(x => p.vH * x);
const qS = [0, 0, 3 * p.gX].map(x => p.vS * x);
const gram = [qH, qS].map(qi => [qH, qS].map(qj => dot(qi, matrixVector(Kinv, qj))));
const neutralMasses = [0, ...eigenvalues2(gram).map(Math.sqrt)];
assert(neutralMasses.every((mass, i) => approx(mass, p.neutralMasses[i])));
assert(approx(p.chargedWMassTree, p.g * p.vH / 2));

const radialHessian = [
  [2 * p.lambdaH * p.vH ** 2, p.lambdaHS * p.vH * p.vS],
  [p.lambdaHS * p.vH * p.vS, 2 * p.lambdaS * p.vS ** 2]
];
const radialMasses = eigenvalues2(radialHessian).map(Math.sqrt);
assert(radialMasses.every((mass, i) => approx(mass, p.radialScalarMasses[i])));
const scalarMixingApproximation = radialHessian[0][1] / (radialHessian[1][1] - radialHessian[0][0]);
assert(approx(scalarMixingApproximation, p.scalarMixingSmallAngleApproximation));
const contactCoefficient = p.gX ** 2 / p.neutralMasses[2] ** 2;
assert(approx(contactCoefficient, p.heavyVectorContactCoefficientGX2OverM2));
assert(approx(1 / Math.sqrt(contactCoefficient), p.correspondingContactScale));

const flavor = audit.flavorFreedom;
assert.equal(Object.values(flavor.diracMatrix.blockDecomposition).reduce((a, b) => a + b, 0), 9);
assert.equal(Object.values(flavor.majoranaMatrix.blockDecomposition).reduce((a, b) => a + b, 0), 6);
assert.equal(flavor.rawRealParametersForYuYdYeYnuAndSymmetricMR, 4 * 9 * 2 + 6 * 2);
assert.equal(audit.normalization.primitiveHyperchargeCoupling, "gY6=gY/6 so gY6*Y6=gY*Y");
assert.equal(audit.firstUnavoidableMissingDatum.name, "fermionic kinetic/Fock realization of the effective selector");

console.log(JSON.stringify({
  passed: true,
  documentId: audit.documentId,
  conditionalWeylComponents: spectrum.standardModelComplexWeylComponents,
  conditionalMirrorCount: spectrum.sameChiralityMirrorCountIfSelectorAssumptionHolds,
  u1xAnomalies: anomaly,
  neutralMassesGeV: neutralMasses,
  radialMassesGeV: radialMasses,
  scalarMixingApproximation,
  contactScaleGeV: 1 / Math.sqrt(contactCoefficient),
  rawFlavorRealParameters: flavor.rawRealParametersForYuYdYeYnuAndSymmetricMR,
  firstMissingDatum: audit.firstUnavoidableMissingDatum.name,
  a6Passed: audit.verdict.a6Passed,
  physicalAdmission: audit.verdict.physicalAdmission
}, null, 2));
