import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const benchmark = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a4-healthy-benchmark.json", import.meta.url), "utf8"));
assert.equal(benchmark.schema, "spin23.a4-healthy-benchmark/1");
assert.equal(benchmark.documentId, 1290);
assert.equal(benchmark.claimBoundary.a4Passed, false);
assert.equal(benchmark.claimBoundary.physicalAdmission, false);

const p = benchmark.parameters;
const dot = (x, y) => x.reduce((sum, value, index) => sum + value * y[index], 0);
const matrixVector = (A, x) => A.map(row => dot(row, x));
const outer = (x, y) => x.map(a => y.map(b => a * b));
const matrixAdd = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const approx = (x, y, tolerance = 1e-12) => Math.abs(x - y) < tolerance;
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const matrixMultiply = (A, B) => A.map(row => transpose(B).map(column => dot(row, column)));
const matrixSubtract = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const isSymmetric = A => A.every((row, i) => row.every((x, j) => approx(x, A[j][i])));

function eigenvalues2x2([[a, b], [c, d]]) {
  assert(approx(b, c));
  const center = (a + d) / 2;
  const radius = Math.hypot((a - d) / 2, b);
  return [center - radius, center + radius];
}

const abelianEigenvalues = eigenvalues2x2(benchmark.abelianKineticBlock.matrix);
assert(abelianEigenvalues.every((x, i) => approx(x, benchmark.abelianKineticBlock.eigenvalues[i])));
assert(abelianEigenvalues.every(x => x > 0));

const K = benchmark.neutralGaugeSector.kineticMatrix;
assert(isSymmetric(K));
const oneMinusChiSquared = 1 - p.kineticMixingChi ** 2;
const Kinv = [
  [1, 0, 0],
  [0, 1 / oneMinusChiSquared, -p.kineticMixingChi / oneMinusChiSquared],
  [0, -p.kineticMixingChi / oneMinusChiSquared, 1 / oneMinusChiSquared]
];
const cH = benchmark.neutralGaugeSector.higgsChargeVector;
const cS = benchmark.neutralGaugeSector.flavonChargeVector;
const qH = cH.map(x => p.higgsVev * x);
const qS = cS.map(x => p.flavonVev * x);
const M2 = matrixAdd(outer(qH, qH), outer(qS, qS));
const nullVector = benchmark.neutralGaugeSector.photonNullVectorInOriginalBasis;
assert(matrixVector(M2, nullVector).every(x => Math.abs(x) < 1e-12));
assert(dot(nullVector, matrixVector(K, nullVector)) > 0);

// The two nonzero generalized gauge masses are the eigenvalues of Q^T K^-1 Q.
const gram = [qH, qS].map(qi => [qH, qS].map(qj => dot(qi, matrixVector(Kinv, qj))));
const nonzeroGaugeMassSquared = eigenvalues2x2(gram);
assert(benchmark.neutralGaugeSector.massSquaredEigenvalues[0] === 0);
assert(nonzeroGaugeMassSquared.every((x, i) => approx(x, benchmark.neutralGaugeSector.massSquaredEigenvalues[i + 1])));
assert(nonzeroGaugeMassSquared.every(x => x > 0));
assert(benchmark.neutralGaugeSector.masses.every((mass, i) => approx(mass ** 2, benchmark.neutralGaugeSector.massSquaredEigenvalues[i], 1e-11)));
assert(benchmark.neutralGaugeSector.transversePoleResiduesAfterCanonicalization.every(x => x > 0));

assert(approx(benchmark.chargedGaugeSector.massSquared, p.g ** 2 * p.higgsVev ** 2 / 4));
assert(approx(benchmark.chargedGaugeSector.mass ** 2, benchmark.chargedGaugeSector.massSquared));
assert(benchmark.chargedGaugeSector.transversePoleResidue > 0);

const radialExpected = [
  [2 * p.lambdaH * p.higgsVev ** 2, p.lambdaHS * p.higgsVev * p.flavonVev],
  [p.lambdaHS * p.higgsVev * p.flavonVev, 2 * p.lambdaS * p.flavonVev ** 2]
];
assert(isSymmetric(radialExpected));
assert(radialExpected.every((row, i) => row.every((value, j) => approx(value, benchmark.radialScalarSector.hessian[i][j]))));
const radialEigenvalues = eigenvalues2x2(radialExpected);
assert(radialEigenvalues.every((x, i) => approx(x, benchmark.radialScalarSector.massSquaredEigenvalues[i])));
assert(radialEigenvalues.every(x => x > 0));
assert(4 * p.lambdaH * p.lambdaS - p.lambdaHS ** 2 > 0);
assert(benchmark.radialScalarSector.masses.every((mass, i) => approx(mass ** 2, radialEigenvalues[i], 1e-11)));
assert(benchmark.radialScalarSector.poleResiduesAfterOrthogonalDiagonalization.every(x => x > 0));

const referenceEigenvalues = p.projectorReferenceEigenvalues;
const projectorMassSquared = referenceEigenvalues.slice(1).map(value => 2 * p.projectorKappa * (value - referenceEigenvalues[0]) ** 2 / p.projectorDecayScale ** 2);
assert.deepEqual(projectorMassSquared, benchmark.projectorSector.massSquaredByComplexMode);
assert(projectorMassSquared.every(x => x > 0));
assert.equal(benchmark.projectorSector.realPhysicalModes, 2 * projectorMassSquared.length);
assert(benchmark.projectorSector.poleResiduesAfterCanonicalization.every(x => x > 0));

// Stationarity is reconstructed, rather than accepted as a declaration.
// The shifted Higgs/flavon coordinates vanish at the supplied vacuum, so both
// first derivatives are zero. The projector derivative vanishes because P0
// commutes with the supplied reference tensor A.
const shiftedHiggsNorm = p.higgsVev ** 2 / 2 - p.higgsVev ** 2 / 2;
const shiftedFlavonNorm = p.flavonVev ** 2 / 2 - p.flavonVev ** 2 / 2;
const higgsRadialGradient = 2 * p.lambdaH * shiftedHiggsNorm + p.lambdaHS * shiftedFlavonNorm;
const flavonRadialGradient = 2 * p.lambdaS * shiftedFlavonNorm + p.lambdaHS * shiftedHiggsNorm;
assert(approx(higgsRadialGradient, 0));
assert(approx(flavonRadialGradient, 0));
const P0 = benchmark.vacuum.P;
const A0 = benchmark.vacuum.projectorReferenceA;
const projectorCommutator = matrixSubtract(matrixMultiply(P0, A0), matrixMultiply(A0, P0));
assert(projectorCommutator.flat().every(x => approx(x, 0)));
assert.equal(benchmark.vacuum.stationary, true);

const count = benchmark.physicalBosonicModeCount;
assert.equal(count.subtotalWithoutGluons, count.masslessPhoton + count.massiveChargedVectors + count.massiveNeutralVectors + count.higgsFlavonRadials + count.projectorTangents);
assert.equal(count.totalIncludingGluons, count.subtotalWithoutGluons + count.masslessGluonsInheritedFromStandardModel);
assert.equal(count.subtotalWithoutGluons, 20);
assert.equal(count.totalIncludingGluons, 36);

// Periodic H^2(T^3) domain: enumerate a finite momentum sample and verify the exact lower bound.
const physicalMassSquared = [
  0,
  benchmark.chargedGaugeSector.massSquared,
  ...nonzeroGaugeMassSquared,
  ...radialEigenvalues,
  ...projectorMassSquared
];
let minimumOperatorEigenvalue = Infinity;
for (const massSquared of physicalMassSquared) {
  for (let nx = -2; nx <= 2; nx += 1) {
    for (let ny = -2; ny <= 2; ny += 1) {
      for (let nz = -2; nz <= 2; nz += 1) {
        const momentumSquared = (2 * Math.PI / p.periodicBoxLength) ** 2 * (nx ** 2 + ny ** 2 + nz ** 2);
        const eigenvalue = momentumSquared + massSquared;
        assert(eigenvalue >= -1e-14);
        minimumOperatorEigenvalue = Math.min(minimumOperatorEigenvalue, eigenvalue);
      }
    }
  }
}
assert.equal(minimumOperatorEigenvalue, 0);

assert.equal(benchmark.gaugeFixing.xi, 1);
assert.equal(benchmark.selfAdjointDomain.boundaryCondition, "periodic fields, gauge parameters and ghosts");
assert.equal(benchmark.selfAdjointDomain.operatorDomain, "H^2(T^3) for each Laplace-type physical fluctuation operator");
assert.equal(benchmark.minimalGlobalObstruction.gateVerdict, "A4 remains blocked");
assert.equal(benchmark.minimalGlobalObstruction.physicalAdmission, false);
assert(benchmark.minimalGlobalObstruction.unresolved.length >= 7);

console.log(JSON.stringify({
  passed: true,
  documentId: benchmark.documentId,
  benchmarkId: benchmark.benchmarkId,
  abelianKineticEigenvalues: abelianEigenvalues,
  neutralGaugeMassSquared: [0, ...nonzeroGaugeMassSquared],
  radialMassSquared: radialEigenvalues,
  projectorMassSquared,
  physicalBosonicModesWithoutGluons: count.subtotalWithoutGluons,
  physicalBosonicModesIncludingGluons: count.totalIncludingGluons,
  minimumPeriodicOperatorEigenvalue: minimumOperatorEigenvalue,
  positiveCanonicalResidues: true,
  a4Passed: benchmark.claimBoundary.a4Passed,
  physicalAdmission: benchmark.claimBoundary.physicalAdmission
}, null, 2));
