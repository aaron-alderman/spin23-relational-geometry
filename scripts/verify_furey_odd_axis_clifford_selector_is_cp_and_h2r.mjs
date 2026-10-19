import assert from "node:assert/strict";

const triples = [
  [1, 2, 3], [1, 4, 5], [1, 7, 6], [2, 4, 6],
  [2, 5, 7], [3, 4, 7], [3, 6, 5]
];
const basisProduct = (i, j) => {
  if (i === 0) return { sign: 1, k: j };
  if (j === 0) return { sign: 1, k: i };
  if (i === j) return { sign: -1, k: 0 };
  for (const [a, b, c] of triples) for (const [x, y, z] of [[a, b, c], [b, c, a], [c, a, b]]) {
    if (i === x && j === y) return { sign: 1, k: z };
    if (i === y && j === x) return { sign: -1, k: z };
  }
  throw new Error("missing product");
};
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
const left = (i) => {
  const L = zero(8);
  for (let j = 0; j < 8; j += 1) {
    const p = basisProduct(i, j); L[p.k][j] = p.sign;
  }
  return L;
};
const block2 = (A, B, C, D) => {
  const n = A.length, out = zero(2 * n);
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    out[i][j] = A[i][j]; out[i][n + j] = B[i][j];
    out[n + i][j] = C[i][j]; out[n + i][n + j] = D[i][j];
  }
  return out;
};

const I2 = identity(2), I8 = identity(8), I16 = identity(16);
const X = [[0, 1], [1, 0]], Z = [[1, 0], [0, -1]];
const gammaD = kron(Z, I8);
const gammaLinks = Array.from({ length: 8 }, (_, i) => {
  const Li = left(i);
  return block2(zero(8), Li, transpose(Li), zero(8));
});
const gammaOne = gammaLinks[0];
const gammaU = gammaLinks[1];

// Spin rotation taking the scalar link to the chosen Furey imaginary axis.
const J = multiply(gammaU, gammaOne);
assert(maxDiff(multiply(J, J), scale(-1, I16)) < 1e-12);
assert(maxDiff(J, scale(-1, transpose(J))) < 1e-12);
const W = scale(1 / Math.sqrt(2), add(I16, J));
assert(maxDiff(multiply(transpose(W), W), I16) < 1e-12);
assert(maxDiff(multiply(multiply(W, gammaOne), transpose(W)), gammaU) < 1e-12);
assert(maxDiff(multiply(multiply(W, gammaD), transpose(W)), gammaD) < 1e-12);

const XZ = multiply(X, Z);
const local = [I2, X, Z, XZ];
const paulis = [];
for (const A of local) for (const B of local) for (const C of local) paulis.push(kron(kron(A, B), C));
assert.equal(paulis.length, 64);

const rotatedKrausUnitaries = paulis.map((P) =>
  multiply(multiply(W, kron(I2, P)), transpose(W)));
const twirlU = (M) => {
  let out = zero(16);
  for (const U of rotatedKrausUnitaries) {
    out = add(out, scale(1 / 64, multiply(multiply(U, M), transpose(U))));
  }
  return out;
};

// Exact range generators.
assert(maxDiff(twirlU(I16), I16) < 1e-12);
assert(maxDiff(twirlU(gammaD), gammaD) < 1e-12);
assert(maxDiff(twirlU(gammaU), gammaU) < 1e-12);
assert(maxDiff(twirlU(multiply(gammaD, gammaU)), multiply(gammaD, gammaU)) < 1e-12);
assert(maxDiff(twirlU(gammaOne), zero(16)) < 1e-12);
for (let i = 2; i < 8; i += 1) assert(maxDiff(twirlU(gammaLinks[i]), zero(16)) < 1e-12);

// General H_2(O) spin-factor element retains only the u coefficient.
const t = 2.4, d = 0.5;
const z = [0.7, -0.3, 0.2, 0.1, -0.4, 0.6, -0.2, 0.3];
let carrier = add(scale(t, I16), scale(d, gammaD));
for (let i = 0; i < 8; i += 1) carrier = add(carrier, scale(z[i], gammaLinks[i]));
const expected = add(add(scale(t, I16), scale(d, gammaD)), scale(z[1], gammaU));
assert(maxDiff(twirlU(carrier), expected) < 1e-12);

// Kraus completeness.
let completeness = zero(16);
for (const U of rotatedKrausUnitaries) {
  const K = scale(1 / 8, U);
  completeness = add(completeness, multiply(transpose(K), K));
}
assert(maxDiff(completeness, I16) < 1e-12);

// Both even and odd axes have the same Lorentz determinant and cone.
const determinant = t * t - d * d - z[1] * z[1];
assert(determinant > 0);

console.log(JSON.stringify({
  protocol: "furey-odd-axis-clifford-selector/1",
  chosenComplexUnit: "u=e1",
  spinRotation: "W=exp((pi/4) Gamma_u Gamma_1)",
  channel: "64 rotated three-rebit Pauli conjugations",
  associativeRange: "Alg{I,Gamma_d,Gamma_u,Gamma_d Gamma_u} = M_2(R)",
  symmetricRange: "span_R{I,Gamma_d,Gamma_u} = H_2(R)",
  inducedJordanAction: "retain the coefficient <u,z> and discard the other seven octonion link coordinates",
  properties: ["completely positive", "trace preserving", "unital", "idempotent"],
  cone: "t^2-d^2-<u,z>^2 >= 0, identical Lorentz cone to the even scalar-axis selector",
  consequence: "positivity does not choose between the Furey-even scalar axis and Furey-odd imaginary axis",
  passed: true
}, null, 2));
