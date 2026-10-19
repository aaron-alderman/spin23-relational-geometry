import assert from "node:assert/strict";

const rank = (rows) => {
  const A = rows.map((r) => r.map(Number));
  let out = 0;
  for (let c = 0; c < A[0].length && out < A.length; c += 1) {
    let p = out;
    while (p < A.length && Math.abs(A[p][c]) < 1e-10) p += 1;
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
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const inv = (A) => {
  const d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};

const G = [[231, 9], [9, 48]];
// For X=[[a,b],[c,d]], flatten_sym(XG+GX^T) has this 3x4 coefficient map.
const tangentMap = [
  [462, 18, 0, 0],
  [9, 48, 231, 9],
  [0, 0, 18, 96],
];
const tangentRank = rank(tangentMap);
assert.equal(tangentRank, 3);

// The one-dimensional kernel is the G-orthogonal Lie algebra.  X=Omega G^-1.
const Omega = [[0, 1], [-1, 0]];
const Xkernel = mul(Omega, inv(G));
const kernelResidual = add(mul(Xkernel, G), mul(G, transpose(Xkernel)));
assert(maxAbs(kernelResidual) < 1e-12);

// A shear changes all three displayed components, despite being only a
// redefinition of the source basis when no physical source frame is fixed.
const A = [[1, 0.4], [0, 1]];
const transformed = mul(mul(A, G), transpose(A));
assert(maxAbs(transformed.map((row, i) => row.map((x, j) => x - G[i][j]))) > 0);

const det = (M) => M[0][0] * M[1][1] - M[0][1] * M[1][0];
const detA = det(A);
assert(Math.abs(det(transformed) - detA ** 2 * det(G)) < 1e-9);

console.log(JSON.stringify({
  protocol: "source-mixing-tangent-as-coordinate-orbit/1",
  gram: G,
  infinitesimalAction: "delta G=XG+GX^T",
  tangentCoefficientMap: tangentMap,
  tangentRank,
  stabilizer: {
    dimension: 1,
    generatorRepresentative: Xkernel,
    residual: maxAbs(kernelResidual),
    interpretation: "o(G), the infinitesimal source-basis rotations preserving G",
  },
  finiteShear: { A, transformedGram: transformed, determinantLawVerified: true },
  classification: {
    algebraicOrbit: "GL(2,R)/O(G), dimension 3, equal to the full SPD cone",
    ifSourceMixingIsBasisRedundancy: "rank-three accessibility is coordinate, not dynamical",
    ifSourceFrameIsOperationallyFixed: "frequency/coupling dependence of G in that fixed frame is physical",
  },
  strengthenedGate: "Fix the normalization and identity of J_Lambda and J_BL across the control parameter, then test the response family without allowing parameter-dependent GL(2) redefinitions.",
  passed: true,
}, null, 2));
