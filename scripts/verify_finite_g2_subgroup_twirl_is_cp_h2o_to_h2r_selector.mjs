import assert from "node:assert/strict";

const triples = [
  [1, 2, 3], [1, 4, 5], [1, 7, 6], [2, 4, 6],
  [2, 5, 7], [3, 4, 7], [3, 6, 5]
];
const basisProduct = (i, j) => {
  if (i === 0) return { sign: 1, k: j };
  if (j === 0) return { sign: 1, k: i };
  if (i === j) return { sign: -1, k: 0 };
  for (const [a, b, c] of triples) {
    const cyc = [[a, b, c], [b, c, a], [c, a, b]];
    const forward = cyc.find(([x, y]) => x === i && y === j);
    if (forward) return { sign: 1, k: forward[2] };
    const reverse = cyc.find(([x, y]) => x === j && y === i);
    if (reverse) return { sign: -1, k: reverse[2] };
  }
  throw new Error("missing product");
};
const oct = (...xs) => Array.from({ length: 8 }, (_, i) => xs[i] ?? 0);
const mul = (x, y) => {
  const out = Array(8).fill(0);
  for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
    const p = basisProduct(i, j);
    out[p.k] += p.sign * x[i] * y[j];
  }
  return out;
};
const norm2 = (x) => x.reduce((s, v) => s + v * v, 0);
const zero = (r, c = r) => Array.from({ length: r }, () => Array(c).fill(0));
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const addM = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scaleM = (A, s) => A.map((row) => row.map((x) => s * x));
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const applyM = (A, x) => A.map((row) => row.reduce((s, v, j) => s + v * x[j], 0));
const leftMatrix = (z) => {
  const L = zero(8);
  for (let j = 0; j < 8; j += 1) {
    const e = oct(); e[j] = 1;
    const col = mul(z, e);
    for (let i = 0; i < 8; i += 1) L[i][j] = col[i];
  }
  return L;
};

// Index i is the nonzero binary vector i in F_2^3.
const parity = (n) => ((n & 1) + ((n >> 1) & 1) + ((n >> 2) & 1)) % 2;
const automorphisms = [];
for (let a = 0; a < 8; a += 1) {
  const signs = [1];
  for (let v = 1; v < 8; v += 1) signs.push(parity(a & v) === 0 ? 1 : -1);
  const R = zero(8);
  for (let i = 0; i < 8; i += 1) R[i][i] = signs[i];
  automorphisms.push({ signs, R });
}

// Verify every character sign map is an octonion automorphism on all basis pairs.
for (const { signs } of automorphisms) {
  for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
    const p = basisProduct(i, j);
    assert.equal(signs[i] * signs[j] * p.sign, p.sign * signs[p.k]);
  }
}

const z = oct(0.7, 0.2, -0.5, 0.1, 0.6, -0.3, 0.4, -0.8);
const averageOct = Array(8).fill(0);
for (const { signs } of automorphisms) for (let i = 0; i < 8; i += 1) averageOct[i] += signs[i] * z[i] / 8;
assert(Math.abs(averageOct[0] - z[0]) < 1e-12);
assert(Math.max(...averageOct.slice(1).map(Math.abs)) < 1e-12);

// Equivariance of the left-regular realization and its CP random-unitary twirl.
const Lz = leftMatrix(z);
let twirledL = zero(8);
for (const { signs, R } of automorphisms) {
  const gz = z.map((x, i) => signs[i] * x);
  const conjugated = mm(mm(R, Lz), transpose(R));
  assert(maxDiff(conjugated, leftMatrix(gz)) < 1e-12);
  twirledL = addM(twirledL, scaleM(conjugated, 1 / 8));
}
assert(maxDiff(twirledL, scaleM(identity(8), z[0])) < 1e-12);

// Kraus completeness for K_a=R_a/sqrt(8).
let completeness = zero(8);
for (const { R } of automorphisms) completeness = addM(completeness, scaleM(mm(transpose(R), R), 1 / 8));
assert(maxDiff(completeness, identity(8)) < 1e-12);

// H_2(O) left-regular block encoding and its H_2(R) image.
const a = 3.2, b = 2.4;
assert(a * b > norm2(z));
const encoded = zero(16);
const Lzb = transpose(Lz); // L_bar(z)=L_z^T
for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
  encoded[i][j] = a * Number(i === j);
  encoded[i][8 + j] = Lz[i][j];
  encoded[8 + i][j] = Lzb[i][j];
  encoded[8 + i][8 + j] = b * Number(i === j);
}
let twirled16 = zero(16);
for (const { R } of automorphisms) {
  const U = zero(16);
  for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
    U[i][j] = R[i][j]; U[8 + i][8 + j] = R[i][j];
  }
  twirled16 = addM(twirled16, scaleM(mm(mm(U, encoded), transpose(U)), 1 / 8));
}
const expected16 = zero(16);
for (let i = 0; i < 8; i += 1) {
  expected16[i][i] = a; expected16[8 + i][8 + i] = b;
  expected16[i][8 + i] = z[0]; expected16[8 + i][i] = z[0];
}
assert(maxDiff(twirled16, expected16) < 1e-12);
assert(a * b >= z[0] * z[0]); // positive Jordan image

console.log(JSON.stringify({
  protocol: "finite-g2-subgroup-twirl-is-cp-h2o-to-h2r-selector/1",
  finiteGroup: "character sign automorphisms (Z_2)^3 of the Fano grading",
  groupOrder: automorphisms.length,
  octonionFixedSpace: "R",
  jordanAction: "[[a,z],[bar z,b]] -> [[a,Re z],[Re z,b]]",
  jordanProperties: ["positive", "unital", "trace preserving", "idempotent"],
  associativeDilation: "left-regular 16x16 real block encoding",
  krausChannel: "Phi(X)=(1/8) sum U_g X U_g^T is CP, TP and unital",
  encodedImage: "H_2(O) encoding maps exactly to eight identical copies of H_2(R)",
  rangeBoundary: "on the full 16x16 matrix algebra the fixed range is larger; exact H_2(R) output uses the left-regular Jordan encoding",
  passed: true
}, null, 2));
