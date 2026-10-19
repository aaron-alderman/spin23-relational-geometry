import assert from "node:assert/strict";

const dimensions = [6, 3, 3, 2, 1, 1];
const lambda = [5, 5, 1, 1, 1, 0];
const charge = [1, -1, -1, -3, 3, 3];
const massSquared = [4, 9, 16, 25, 36, 49];
const frequencies = [0, 5, 30];
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const sub = (A, B) => add(A, scale(-1, B));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const comm = (A, B) => sub(mul(A, B), mul(B, A));
const outer = (v) => v.map((x) => v.map((y) => x * y));
const zero2 = () => [[0, 0], [0, 0]];
const response = (t) => dimensions.reduce((G, d, r) => add(G, scale(d / (t + massSquared[r]), outer([lambda[r], charge[r]]))), zero2());
const flatSym = (G) => [G[0][0], G[0][1], G[1][1]];
const flat = (A) => A.flat();
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const rank = (rows, eps = 1e-9) => {
  const A = rows.map((r) => r.map(Number));
  let out = 0;
  for (let c = 0; c < A[0].length && out < A.length; c += 1) {
    let p = out;
    while (p < A.length && Math.abs(A[p][c]) < eps) p += 1;
    if (p === A.length) continue;
    [A[out], A[p]] = [A[p], A[out]];
    const q = A[out][c];
    A[out] = A[out].map((x) => x / q);
    for (let i = 0; i < A.length; i += 1) if (i !== out) {
      const f = A[i][c];
      A[i] = A[i].map((x, j) => x - f * A[out][j]);
    }
    out += 1;
  }
  return out;
};
const inv3 = (M) => {
  const [a, b, c] = M[0], [d, e, f] = M[1], [g, h, i] = M[2];
  const D = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  assert(Math.abs(D) > 1e-12);
  return scale(1 / D, [
    [e * i - f * h, c * h - b * i, b * f - c * e],
    [f * g - d * i, a * i - c * g, c * d - a * f],
    [d * h - e * g, b * g - a * h, a * e - b * d],
  ]);
};

const responses = frequencies.map(response);
const rows = responses.map(flatSym);
assert.equal(rank(rows), 3);
// rows maps response coefficients to symmetric-coordinate rows.  Coefficients
// for target coordinate column e_j are the jth column of rows^{-1}.
const rowsInv = inv3(rows);
const targets = [
  [[1, 0], [0, 0]],
  [[0, 1], [1, 0]],
  [[0, 0], [0, 1]],
];
const coefficients = targets.map((_, j) => rowsInv[j]);
const reconstructed = coefficients.map((cs) => responses.reduce((S, G, k) => add(S, scale(cs[k], G)), zero2()));
for (let j = 0; j < 3; j += 1) assert(maxAbs(sub(reconstructed[j], targets[j])) < 1e-9);

const zero4 = () => Array.from({ length: 4 }, () => [0, 0, 0, 0]);
const E = (B) => {
  const M = zero4();
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) M[i][j + 2] = B[i][j];
  return M;
};
const F = (C) => {
  const M = zero4();
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) M[i + 2][j] = C[i][j];
  return M;
};
const Omega4 = [[0, 0, 1, 0], [0, 0, 0, 1], [-1, 0, 0, 0], [0, -1, 0, 0]];
const symplecticResidual = (M) => add(mul(transpose(M), Omega4), mul(Omega4, M));

const wings = [...targets.map(E), ...targets.map(F)];
const middle = [];
for (const B of targets) for (const C of targets) middle.push(comm(E(B), F(C)));
assert.equal(rank(middle.map(flat)), 4);
const generators = [...wings, ...middle];
assert.equal(rank(generators.map(flat)), 10);
for (const M of generators) assert(maxAbs(symplecticResidual(M)) < 1e-10);

// Triple recovery on one nontrivial sampled combination.
const B = responses[0], C = responses[1], D = responses[2];
const lhs = comm(comm(E(B), F(C)), E(D));
const triple = add(mul(mul(B, C), D), mul(mul(D, C), B));
assert(maxAbs(sub(lhs, E(triple))) < 1e-8);

console.log(JSON.stringify({
  protocol: "reconstruct-sp4-from-threshold-response-family/1",
  frequencies,
  responseCoordinateRows: rows,
  standardJordanBasisReconstructionCoefficients: coefficients,
  reconstructionMaximumErrors: reconstructed.map((R, i) => maxAbs(sub(R, targets[i]))),
  tkk: {
    upperWingRank: 3,
    lowerWingRank: 3,
    middleCommutatorRank: rank(middle.map(flat)),
    totalGeneratorRank: rank(generators.map(flat)),
    allGeneratorsSymplectic: true,
    sampledDoubleCommutatorRecoversJordanTriple: true,
  },
  conclusion: "The three fixed-frame threshold response matrices reconstruct a basis of Sym_2(R); their TKK upper/lower embeddings and commutators span all ten generators of sp(4,R). This proves algebra generation for the declared family, not invariance of the microscopic dynamics.",
  passed: true,
}, null, 2));
