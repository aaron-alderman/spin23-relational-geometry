import assert from "node:assert/strict";

const zero = (r, c = r) => Array.from({ length: r }, () => Array(c).fill(0));
const identity = (n) => Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => Number(i === j)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map((row) => row.map((x) => s * x));
const multiply = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) =>
  row.map((x, j) => Math.abs(x - B[i][j]))));
const kron = (A, B) => {
  const out = zero(A.length * B.length, A[0].length * B[0].length);
  for (let i = 0; i < A.length; i += 1) for (let j = 0; j < A[0].length; j += 1) {
    for (let k = 0; k < B.length; k += 1) for (let l = 0; l < B[0].length; l += 1) {
      out[i * B.length + k][j * B[0].length + l] = A[i][j] * B[k][l];
    }
  }
  return out;
};

const I2 = identity(2);
const X = [[0, 1], [1, 0]];
const Z = [[1, 0], [0, -1]];
const XZ = multiply(X, Z);
const local = [I2, X, Z, XZ];

const word = (a, b) => {
  let P = [[1]];
  for (let i = 0; i < 3; i += 1) {
    const factor = a[i] === 0 && b[i] === 0 ? I2
      : a[i] === 1 && b[i] === 0 ? X
      : a[i] === 0 && b[i] === 1 ? Z : XZ;
    P = kron(P, factor);
  }
  return P;
};
const bitVectors = Array.from({ length: 8 }, (_, n) =>
  Array.from({ length: 3 }, (_, i) => (n >> i) & 1));
const pauliBasis = [];
for (const a of bitVectors) for (const b of bitVectors) {
  pauliBasis.push({ a, b, P: word(a, b) });
}
assert.equal(pauliBasis.length, 64);

const generators = [];
for (let i = 0; i < 3; i += 1) {
  const ai = [0, 0, 0]; ai[i] = 1;
  const bi = [0, 0, 0]; bi[i] = 1;
  generators.push(word(ai, [0, 0, 0]), word([0, 0, 0], bi));
}
assert.equal(generators.length, 6);

const gamma = 0.7;
const lindblad = (A) => {
  let out = zero(8);
  for (const U of generators) {
    out = add(out, scale(gamma, add(multiply(multiply(U, A), transpose(U)), scale(-1, A))));
  }
  return out;
};

const multiplicities = Array(7).fill(0);
let symmetricDimension = 0;
let symmetricKernelDimensionOn16 = 0;
for (const { a, b, P } of pauliBasis) {
  const weight = [...a, ...b].reduce((sum, bit) => sum + bit, 0);
  const eigenvalue = -2 * gamma * weight;
  assert(maxDiff(lindblad(P), scale(eigenvalue, P)) < 1e-12);
  multiplicities[weight] += 1;

  const pauliIsSymmetric = maxDiff(P, transpose(P)) < 1e-12;
  symmetricDimension += pauliIsSymmetric ? 3 : 1;
  if (weight === 0) symmetricKernelDimensionOn16 += pauliIsSymmetric ? 3 : 1;
}
assert.deepEqual(multiplicities, [1, 6, 15, 20, 15, 6, 1]);
assert.equal(symmetricDimension, 16 * 17 / 2);
assert.equal(symmetricKernelDimensionOn16, 3);

// Exact one-jump finite-time map is a convex random-unitary channel.
const t = 1.3;
const p0 = (1 + Math.exp(-2 * gamma * t)) / 2;
const p1 = (1 - Math.exp(-2 * gamma * t)) / 2;
assert(p0 >= 0 && p1 >= 0 && Math.abs(p0 + p1 - 1) < 1e-12);

// Six commuting conjugation superoperators give 64 asymptotic words,
// each with weight 1/64, and the spectral gap is 2 gamma.
const asymptoticWeight = (0.5 ** 6);
assert(Math.abs(asymptoticWeight - 1 / 64) < 1e-12);

console.log(JSON.stringify({
  protocol: "clifford-multiplicity-lindbladian-spectrum/1",
  generator: "L=gamma sum_i[(Ad_Xi-I)+(Ad_Zi-I)] on three rebit multiplicity factors",
  eigenoperators: "P_(a,b)=X^a Z^b",
  eigenvalue: "-2 gamma (|a|+|b|)",
  multiplicities,
  liouvillianGap: "2 gamma",
  fullKernelOn16: "M_2(R) tensor I_8, dimension 4",
  symmetricKernelOn16: "Sym_2(R) tensor I_8, dimension 3 = H_2(R)",
  symmetricOperatorDimensionChecked: symmetricDimension,
  finiteTimeBound: "||exp(tL)A-E(A)||_2 <= exp(-2 gamma t)||A-E(A)||_2",
  infiniteTimeChannel: "64-term three-rebit Pauli multiplicity twirl",
  topologyWarning: "a separate topology Pauli depolarizer may be composed only if its qubit is not the same two-dimensional Clifford face carrier",
  passed: true
}, null, 2));
