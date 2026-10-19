import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const outer = (v) => v.map((x) => v.map((y) => x * y));
const flat = (A) => [A[0][0], A[0][1], A[1][1]];
const det3 = (M) => {
  const [a, b, c] = M[0], [d, e, f] = M[1], [g, h, i] = M[2];
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
};
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] ** 2;
const rank = (rows) => {
  const A = rows.map((r) => r.map(Number));
  let out = 0;
  for (let c = 0; c < A[0].length && out < A.length; c += 1) {
    let p = out;
    while (p < A.length && Math.abs(A[p][c]) < 1e-11) p += 1;
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

// All-left-handed convention. Each entry is [multiplicity, lambda, 3(B-L)].
const components = {
  u: [[3, 5, 1], [3, 5, -1]],       // u_L in Q and u^c
  d: [[3, 5, 1], [3, 1, -1]],       // d_L in Q and d^c
  e: [[1, 1, -3], [1, 1, 3]],       // e_L in L and e^c
  nu: [[1, 1, -3], [1, 0, 3]],      // nu_L in L and nu^c
};
const coefficient = (entries) => entries.reduce((M, [d, l, q]) => add(M, scale(d, outer([l, q]))), [[0, 0], [0, 0]]);
const coefficients = Object.fromEntries(Object.entries(components).map(([k, v]) => [k, coefficient(v)]));
assert.deepEqual(coefficients, {
  u: [[150, 0], [0, 6]],
  d: [[78, 12], [12, 6]],
  e: [[2, 0], [0, 18]],
  nu: [[1, -3], [-3, 18]],
});

const coefficientBasisDeterminant = det3([flat(coefficients.u), flat(coefficients.d), flat(coefficients.e)]);
assert.equal(coefficientBasisDeterminant, 32256);

// Representative hierarchy-shaped masses in common arbitrary units. The
// theorem only needs distinct u,d,e squared masses; these values are not PDG fits.
const massSquared = { u: 100, d: 25, e: 1, nu: 0.01 };
const response = (t) => Object.entries(coefficients).reduce((G, [k, C]) => add(G, scale(1 / (t + massSquared[k]), C)), [[0, 0], [0, 0]]);
const samples = [0.2, 3, 40].map((t) => ({ t, G: response(t) }));
assert(samples.every(({ G }) => G[0][0] > 0 && det2(G) > 0));
assert.equal(rank(samples.map(({ G }) => flat(G))), 3);

console.log(JSON.stringify({
  protocol: "broken-phase-mass-threshold-relational-span/1",
  convention: "one generation, all left-handed Weyl fields, electroweak-broken mass grouping",
  thresholdCoefficientMatrices: coefficients,
  exactBasisTest: {
    matrices: ["U", "D", "E"],
    flattenedDeterminant: coefficientBasisDeterminant,
    spansSym2: true,
  },
  symbolicTheorem: "If the u,d,e Stieltjes functions are linearly independent (in particular for distinct squared masses), the fixed incidence/B-L response family spans Sym_2(R); the neutrino channel is not required for rank three.",
  representativeHierarchyCheck: {
    massSquared,
    explicitlyNotPhysicalFit: true,
    samples: samples.map(({ t, G }) => ({ t, matrix: G, determinant: det2(G) })),
    sampledSpanRank: rank(samples.map(({ G }) => flat(G))),
  },
  caveats: [
    "free colored quark poles are not infrared observables because of confinement",
    "the incidence current is not conserved and can mix under interactions",
    "continuous B-L is valid only above its Majorana-breaking scale",
    "three generations and CKM/PMNS mixing require a matrix spectral treatment",
  ],
  passed: true,
}, null, 2));
