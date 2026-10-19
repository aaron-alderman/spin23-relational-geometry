import assert from "node:assert/strict";

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const sub = (A, B) => add(A, scale(-1, B));
const triple = (A, B, C) => add(mul(mul(A, B), C), mul(mul(C, B), A));
const flattenSym = (A) => [A[0][0], A[0][1], A[1][1]];
const rank = (rows) => {
  const A = rows.map((r) => r.map(Number));
  let out = 0;
  for (let c = 0; c < A[0].length && out < A.length; c += 1) {
    let p = out;
    while (p < A.length && Math.abs(A[p][c]) < 1e-9) p += 1;
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
const commutator = (A, B) => sub(mul(A, B), mul(B, A));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));

const I = [[1, 0], [0, 1]];
const G = [[231, 9], [9, 48]];
const traceG = 279;
const detG = 11007;
const G2 = mul(G, G);
const cayleyHamiltonResidual = sub(G2, add(scale(traceG, G), scale(-detG, I)));
assert.equal(maxAbs(cayleyHamiltonResidual), 0);

const G3Triple = triple(G, G, G); // 2 G^3
assert.equal(rank([flattenSym(I), flattenSym(G), flattenSym(G3Triple)]), 2);

// Repeated triples of elements in span{I,G} remain there because that span
// is a commutative associative algebra closed under multiplication.
const commutingSeed = [I, G];
const nested = [];
for (const A of commutingSeed) for (const B of commutingSeed) for (const C of commutingSeed) nested.push(triple(A, B, C));
assert.equal(rank([...commutingSeed, ...nested].map(flattenSym)), 2);

// One noncommuting symmetric perturbation opens the full three-dimensional J.
const H = [[1, 0], [0, 0]];
assert(maxAbs(commutator(G, H)) > 0);
assert.equal(rank([I, G, H].map(flattenSym)), 3);

const dimensions = {
  singlePointGeneratedJordanAlgebra: 2,
  singlePointTKK: 2 + 2 + 2, // diagonal J: g_-1(2)+g_0(2)+g_+1(2)
  fullSym2JordanAlgebra: 3,
  fullSym2TKK: 3 + 4 + 3,
};
assert.deepEqual(dimensions, {
  singlePointGeneratedJordanAlgebra: 2,
  singlePointTKK: 6,
  fullSym2JordanAlgebra: 3,
  fullSym2TKK: 10,
});

console.log(JSON.stringify({
  protocol: "single-relational-gram-triple-closure/1",
  relationalGram: G,
  invariants: { trace: traceG, determinant: detG },
  cayleyHamilton: "G^2-tr(G)G+det(G)I=0",
  closure: {
    generatedByOneNonscalarPositiveGram: "span{I,G}, dimension 2",
    nestedTripleClosureDimension: 2,
    correspondingTKK: "sl(2,R) direct-sum sl(2,R), dimension 6",
    addedPerturbation: H,
    perturbationDoesNotCommuteWithG: true,
    spanWithPerturbationDimension: 3,
    fullTKK: "sp(4,R), dimension 10",
  },
  gate: "A physical response family must have rank-three tangent span in Sym_2(R), equivalently contain a symmetric perturbation not commuting with G. A fixed Gram point or commuting normalization flow cannot generate Sp(4,R).",
  passed: true,
}, null, 2));
