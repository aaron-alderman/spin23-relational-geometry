import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/translation-free-e8-constitutive-metric-gate-v1.json",
  import.meta.url,
), "utf8"));

const K = [
  [2,-1,0,0,0,0,0,0],
  [-1,2,-1,0,0,0,0,0],
  [0,-1,2,-1,0,0,0,-1],
  [0,0,-1,2,-1,0,0,0],
  [0,0,0,-1,2,-1,0,0],
  [0,0,0,0,-1,2,-1,0],
  [0,0,0,0,0,-1,2,0],
  [0,0,-1,0,0,0,0,2],
];
const Kinv = [
  [4,7,10,8,6,4,2,5],
  [7,14,20,16,12,8,4,10],
  [10,20,30,24,18,12,6,15],
  [8,16,24,20,15,10,5,12],
  [6,12,18,15,12,8,4,9],
  [4,8,12,10,8,6,3,6],
  [2,4,6,5,4,3,2,3],
  [5,10,15,12,9,6,3,8],
];
const multiply = (A, B) => A.map(row => B[0].map((_, j) =>
  row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const identity = n => Array.from({length:n}, (_, i) =>
  Array.from({length:n}, (_, j) => Number(i === j)));

const jacobiEigenvalues = (matrix, tolerance = 1e-14, maxRotations = 10000) => {
  const A = matrix.map(row => [...row]);
  for (let rotation = 0; rotation < maxRotations; rotation += 1) {
    let p = 0;
    let q = 1;
    let maximum = 0;
    for (let i = 0; i < A.length; i += 1) for (let j = i + 1; j < A.length; j += 1) {
      if (Math.abs(A[i][j]) > maximum) { maximum = Math.abs(A[i][j]); p = i; q = j; }
    }
    if (maximum < tolerance) return A.map((row, i) => row[i]).sort((a,b) => a-b);
    const angle = 0.5 * Math.atan2(2*A[p][q], A[q][q]-A[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const app = A[p][p];
    const aqq = A[q][q];
    const apq = A[p][q];
    for (let k = 0; k < A.length; k += 1) if (k !== p && k !== q) {
      const akp = A[k][p];
      const akq = A[k][q];
      A[k][p] = A[p][k] = c*akp-s*akq;
      A[k][q] = A[q][k] = s*akp+c*akq;
    }
    A[p][p] = c*c*app-2*s*c*apq+s*s*aqq;
    A[q][q] = s*s*app+2*s*c*apq+c*c*aqq;
    A[p][q] = A[q][p] = 0;
  }
  throw new Error("Jacobi eigensolver did not converge");
};

assert.equal(record.schemaVersion, "translation-free-e8-constitutive-metric-gate-v1");
assert.deepEqual(multiply(K, Kinv), identity(8));
assert.deepEqual(multiply(Kinv, K), identity(8));

const eigenK = jacobiEigenvalues(K);
const eigenKinv = jacobiEigenvalues(Kinv);
const coxeter = record.coxeterCertificate;
const formula = coxeter.exponents.map(m => 2-2*Math.cos(Math.PI*m/coxeter.coxeterNumber));
for (let i = 0; i < 8; i += 1) {
  assert.ok(Math.abs(eigenK[i]-formula[i]) < 2e-14);
  assert.ok(Math.abs(eigenK[i]-coxeter.cartanEigenvaluesAscending[i]) < 2e-14);
  assert.ok(Math.abs(eigenKinv[i]-1/eigenK.at(-(i+1))) < 3e-12);
}

const branches = Object.fromEntries(record.conditionalRotorCell.branches.map(branch => [branch.id, branch]));
const frequenciesFor = matrix => jacobiEigenvalues(matrix).map(Math.sqrt).sort((a,b) => a-b);
const expected = {
  "dual-form-is-charging-kernel": frequenciesFor(Kinv),
  "dual-form-is-capacitance-or-gram": frequenciesFor(K),
  "isotropic-control": Array(8).fill(1),
};
for (const [id, frequencies] of Object.entries(expected)) {
  const branch = branches[id];
  assert.equal(branch.frequenciesAscending.length, 8);
  assert.equal(branch.ratiosToSoftest.length, 8);
  for (let i = 0; i < 8; i += 1) {
    assert.ok(Math.abs(branch.frequenciesAscending[i]-frequencies[i]) < 3e-12);
    assert.ok(Math.abs(branch.ratiosToSoftest[i]-frequencies[i]/frequencies[0]) < 3e-12);
  }
}

const ratioK = expected["dual-form-is-capacitance-or-gram"].at(-1)
  / expected["dual-form-is-capacitance-or-gram"][0];
const ratioKinv = expected["dual-form-is-charging-kernel"].at(-1)
  / expected["dual-form-is-charging-kernel"][0];
// The dense integer inverse loses a few ulps in an independent Jacobi pass;
// equality of the spans follows from reciprocal exact spectra.
assert.ok(Math.abs(ratioK-ratioKinv) < 2e-11);
assert.ok(Math.abs(ratioK-Math.sqrt(eigenK.at(-1)/eigenK[0])) < 1e-13);
assert.ok(Math.abs(coxeter.conditionNumber-eigenK.at(-1)/eigenK[0]) < 2e-10);
assert.ok(record.topologicalInput.notFixedByE8.includes("charging kernel"));
assert.match(record.boundary, /Arbitrary positive V/u);

console.log(JSON.stringify({
  status: "PASS",
  coxeterNumber: coxeter.coxeterNumber,
  exponents: coxeter.exponents,
  cartanEigenvalues: eigenK,
  conditionalFingerprints: Object.fromEntries(Object.entries(expected).map(([id, frequencies]) => [id, {
    softest: frequencies[0],
    hardest: frequencies.at(-1),
    span: frequencies.at(-1)/frequencies[0],
    ratios: branches[id].ratiosToSoftest,
  }])),
  topologicalKDeterminesConstitutiveM: false,
  nextGate: record.nextGate,
}, null, 2));
