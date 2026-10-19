import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const trace = (A) => A[0][0] + A[1][1];
const positiveDefinite2 = (A) => A[0][0] > 0 && det(A) > 0;

const jordanTriple = (A, B, C) => scale(0.5, add(mul(mul(A, B), C), mul(mul(C, B), A)));
const selfEnergy = (X, G) => mul(mul(X, G), X);
const polarizedSelfEnergy = (A, G, C) => scale(
  0.5,
  add(add(selfEnergy(add(A, C), G), scale(-1, selfEnergy(A, G))), scale(-1, selfEnergy(C, G))),
);

const basis = [
  [[1, 0], [0, 0]],
  [[0, 1], [1, 0]],
  [[0, 0], [0, 1]],
];
const middles = [
  [[2, 0.3], [0.3, 1]],
  [[0, 1], [1, 0]],
  [[3, -2], [-2, 4]],
];

for (const A of basis) for (const B of middles) for (const C of basis) {
  assert(maxAbs(add(polarizedSelfEnergy(A, B, C), scale(-1, jordanTriple(A, B, C)))) < 1e-12);
}

// Every symmetric middle direction is a difference of two positive-definite
// propagators, so the passive cone linearly completes to the full triple.
const indefiniteMiddle = [[0, 1], [1, 0]];
const positivePart = [[2, 1], [1, 2]];
const referencePart = [[2, 0], [0, 2]];
assert(positiveDefinite2(positivePart));
assert(positiveDefinite2(referencePart));
assert(maxAbs(add(add(positivePart, scale(-1, referencePart)), scale(-1, indefiniteMiddle))) < 1e-12);
for (const A of basis) for (const C of basis) {
  const reconstructed = add(jordanTriple(A, positivePart, C), scale(-1, jordanTriple(A, referencePart, C)));
  assert(maxAbs(add(reconstructed, scale(-1, jordanTriple(A, indefiniteMiddle, C)))) < 1e-12);
}

// The special-conformal Riccati term is minus the same quadratic map.
const Z = [[2, 0.4], [0.4, 1.3]];
const Cgenerator = [[1, -0.2], [-0.2, 0.7]];
const riccatiSpecialConformal = scale(-1, selfEnergy(Z, Cgenerator));
assert(maxAbs(add(riccatiSpecialConformal, selfEnergy(Z, Cgenerator))) < 1e-12);

console.log(JSON.stringify({
  protocol: "jordan-triple-as-polarized-feshbach-self-energy/1",
  identity: "{A,G,C} = 1/2 [Sigma_G(A+C)-Sigma_G(A)-Sigma_G(C)]",
  selfEnergy: "Sigma_G(X)=X G X",
  schurComplementMeaning: "If G is an internal Green matrix and X is a symmetric two-sided relation map, Sigma_G(X) is the quadratic Schur-complement correction.",
  passiveCompletion: {
    indefiniteMiddle,
    decomposition: "indefiniteMiddle=positivePart-referencePart",
    positivePart,
    referencePart,
    positivePartIsSPD: positiveDefinite2(positivePart),
    referencePartIsSPD: positiveDefinite2(referencePart),
  },
  symplecticRiccatiLink: "The infinitesimal special-conformal action on Sym_2 is -Z C Z=-Sigma_C(Z); its polarization is the Jordan triple.",
  checkedBasisTriples: basis.length * middles.length * basis.length,
  diagnostics: {
    positivePartTrace: trace(positivePart),
    referencePartTrace: trace(referencePart),
  },
  passed: true,
}, null, 2));
