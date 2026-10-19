import assert from "node:assert/strict";

const Z = (re = 0, im = 0) => ({ re, im });
const eq = (a, b) => a.re === b.re && a.im === b.im;
const conj = (a) => Z(a.re, -a.im);
const zeroMatrix = () => Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => Z()));
const matrixConj = (a) => a.map((row) => row.map(conj));
const dagger = (a) => a[0].map((unused, j) => a.map((row) => conj(row[j])));
const permutation = [7, 1, 2, 3, 4, 5, 6, 0];
const exchange = (a) => permutation.map((i) => permutation.map((j) => a[i][j]));
const theta = (a) => exchange(matrixConj(a));
const J = (a) => dagger(theta(a));
const JHViaRealStructure = (a) => J(matrixConj(a));
const JHViaLinearExchange = (a) => dagger(exchange(a));
const sameMatrix = (a, b) => a.every((row, i) =>
  row.every((entry, j) => eq(entry, b[i][j])));

const x = zeroMatrix();
const entries = [
  [1, 4, Z(1, 2)], [2, 5, Z(-3, 1)], [6, 1, Z(2, -1)],
  [0, 3, Z(4, 3)], [4, 7, Z(-2, 5)], [7, 6, Z(3, -4)],
];
for (const [i, j, value] of entries) x[i][j] = value;

assert(sameMatrix(JHViaRealStructure(x), JHViaLinearExchange(x)));
assert(sameMatrix(J(matrixConj(x)), dagger(exchange(x))));

console.log(JSON.stringify({
  protocol: "furey-hermitian-response-operator-form/1",
  carrierMatrixSize: 8,
  antiunitaryExchange: "Theta=S o K",
  originalMiddleMap: "J=D o Theta=D o S o K (complex-linear)",
  hermitianMiddleMap: "J_H=J o K=D o S=S(.)^dagger (conjugate-linear)",
  exactGaussianIntegerTestEntries: entries.length,
  identityVerified: true,
  implication: "The Hermitianized response is the standard sesquilinear TRO middle adjoint after the linear neutral-block exchange S; it is not merely a coordinate substitution.",
  limitation: "Physical admission still requires S to be an intertwiner for the source Furey and faithful Standard-Model actions.",
  passed: true,
}, null, 2));
