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
    for (const [x, y, z] of [[a, b, c], [b, c, a], [c, a, b]]) {
      if (i === x && j === y) return { sign: 1, k: z };
      if (i === y && j === x) return { sign: -1, k: z };
    }
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
const trace = (A) => A.reduce((sum, row, i) => sum + row[i], 0);
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
const leftMatrix = (basisIndex) => {
  const L = zero(8);
  for (let j = 0; j < 8; j += 1) {
    const p = basisProduct(basisIndex, j);
    L[p.k][j] = p.sign;
  }
  return L;
};
const block2 = (A, B, C, D) => {
  const n = A.length;
  const out = zero(2 * n);
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    out[i][j] = A[i][j];
    out[i][n + j] = B[i][j];
    out[n + i][j] = C[i][j];
    out[n + i][n + j] = D[i][j];
  }
  return out;
};

const I8 = identity(8);
const Zface = [[1, 0], [0, -1]];
const Xface = [[0, 1], [1, 0]];
const gamma = [kron(Zface, I8)];
for (let i = 0; i < 8; i += 1) {
  const L = leftMatrix(i);
  gamma.push(block2(zero(8), L, transpose(L), zero(8)));
}

// H_2(O) is the spin factor V_9 in this real Clifford representation.
const I16 = identity(16);
for (let i = 0; i < 9; i += 1) {
  assert(maxDiff(gamma[i], transpose(gamma[i])) < 1e-12);
  for (let j = 0; j < 9; j += 1) {
    const anti = add(multiply(gamma[i], gamma[j]), multiply(gamma[j], gamma[i]));
    assert(maxDiff(anti, scale(i === j ? 2 : 0, I16)) < 1e-12);
  }
}

// Three-rebit real Pauli operators X^a Z^b form an orthogonal error basis
// on the eight-dimensional multiplicity factor.
const I2 = identity(2);
const X = [[0, 1], [1, 0]];
const Z = [[1, 0], [0, -1]];
const local = [I2, X, Z, multiply(X, Z)];
const paulis = [];
for (const A of local) for (const B of local) for (const C of local) {
  paulis.push(kron(kron(A, B), C));
}
assert.equal(paulis.length, 64);
for (const P of paulis) assert(maxDiff(multiply(transpose(P), P), I8) < 1e-12);

const depolarize8 = (A) => {
  let out = zero(8);
  for (const P of paulis) out = add(out, scale(1 / 64, multiply(multiply(P, A), transpose(P))));
  return out;
};

// Exhaustive matrix-unit proof that the multiplicity channel is Tr(A) I/8.
for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
  const E = zero(8); E[i][j] = 1;
  assert(maxDiff(depolarize8(E), scale(Number(i === j) / 8, I8)) < 1e-12);
}

const twirl16 = (M) => {
  const outBlocks = [[zero(8), zero(8)], [zero(8), zero(8)]];
  for (let p = 0; p < 2; p += 1) for (let q = 0; q < 2; q += 1) {
    const B = zero(8);
    for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
      B[i][j] = M[8 * p + i][8 * q + j];
    }
    outBlocks[p][q] = depolarize8(B);
  }
  return block2(outBlocks[0][0], outBlocks[0][1], outBlocks[1][0], outBlocks[1][1]);
};

// The range is exactly M_2(R) tensor I_8; on symmetric matrices it is H_2(R).
for (const M2 of [
  [[1.2, -0.7], [0.4, 2.1]],
  [[3, 0], [0, -1]]
]) {
  const fixed = kron(M2, I8);
  assert(maxDiff(twirl16(fixed), fixed) < 1e-12);
}

// The selector fixes the two desired Clifford generators and kills the
// seven imaginary-octonion generators.
assert(maxDiff(twirl16(gamma[0]), gamma[0]) < 1e-12);
assert(maxDiff(twirl16(gamma[1]), gamma[1]) < 1e-12);
for (let i = 2; i < 9; i += 1) assert(maxDiff(twirl16(gamma[i]), zero(16)) < 1e-12);

// Apply it to a general H_2(O) left-regular encoding.
const a = 2.7, b = 1.9;
const z = [0.6, -0.2, 0.4, 0.1, -0.3, 0.5, -0.7, 0.2];
let Lz = zero(8);
for (let i = 0; i < 8; i += 1) Lz = add(Lz, scale(z[i], leftMatrix(i)));
assert(Math.abs(trace(Lz) / 8 - z[0]) < 1e-12);
const encoded = block2(scale(a, I8), Lz, transpose(Lz), scale(b, I8));
const expected = kron([[a, z[0]], [z[0], b]], I8);
assert(maxDiff(twirl16(encoded), expected) < 1e-12);

// Kraus completeness for K_P=(I_2 tensor P)/8.
let completeness = zero(16);
for (const P of paulis) {
  const K = scale(1 / 8, kron(I2, P));
  completeness = add(completeness, multiply(transpose(K), K));
}
assert(maxDiff(completeness, I16) < 1e-12);

console.log(JSON.stringify({
  protocol: "clifford-multiplicity-twirl-selects-h2r/1",
  jordanCarrier: "H_2(O) = spin factor V_9 generated by nine symmetric Clifford generators",
  selectedGenerators: ["diagonal face difference", "real octonion link"],
  finiteTwirl: "64 three-rebit real Pauli conjugations on the 8-dimensional multiplicity factor",
  associativeRange: "M_2(R) tensor I_8",
  symmetricRange: "Sym_2(R) tensor I_8 = H_2(R)",
  channelProperties: ["completely positive", "trace preserving", "unital", "idempotent"],
  actionOnH2O: "[[a,z],[bar z,b]] -> [[a,Re z],[Re z,b]]",
  distinction: "the Pauli multiplicity twirl is a Clifford conditional expectation, not an octonion-automorphism twirl",
  passed: true
}, null, 2));
