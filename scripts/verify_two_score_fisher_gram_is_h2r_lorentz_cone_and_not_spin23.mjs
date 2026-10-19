import assert from "node:assert/strict";

const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const gram = (c, n) => [[dot(c, c), dot(c, n)], [dot(c, n), dot(n, n)]];
const det2 = K => K[0][0] * K[1][1] - K[0][1] ** 2;
const coords = K => ({
  t: (K[0][0] + K[1][1]) / 2,
  x: (K[0][0] - K[1][1]) / 2,
  y: K[0][1]
});
const matmul2 = (A, B) => [
  [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
];
const transpose2 = A => [[A[0][0], A[1][0]], [A[0][1], A[1][1]]];

const c = [1.2, -0.4, 0.7, 1.1];
const nuisance = [0.3, 1.4, -0.2, 0.5];
const K = gram(c, nuisance);
const q = coords(K);
const determinant = det2(K);
const lorentzNorm = q.t ** 2 - q.x ** 2 - q.y ** 2;
const efficientInformation = K[0][0] - K[0][1] ** 2 / K[1][1];
const schurIdentity = K[1][1] * efficientInformation;

const S = [[1.3, 0.4], [0.5, (1 + 0.4 * 0.5) / 1.3]];
const detS = S[0][0] * S[1][1] - S[0][1] * S[1][0];
const transformed = matmul2(matmul2(S, K), transpose2(S));
const transformedDeterminant = det2(transformed);

const degenerate = gram([1, 2, -1], [2, 4, -2]);
const degenerateCoords = coords(degenerate);

assert.ok(Math.abs(determinant - lorentzNorm) < 1e-12);
assert.ok(Math.abs(determinant - schurIdentity) < 1e-12);
assert.ok(Math.abs(detS - 1) < 1e-12);
assert.ok(Math.abs(transformedDeterminant - determinant) < 1e-12);
assert.ok(determinant > 0 && q.t > 0);
assert.ok(Math.abs(det2(degenerate)) < 1e-12);
assert.ok(Math.abs(degenerateCoords.t ** 2 - degenerateCoords.x ** 2 - degenerateCoords.y ** 2) < 1e-12);

console.log(JSON.stringify({
  protocol: "two-score-fisher-gram-h2r/1",
  gramMatrix: K,
  h2rCoordinates: q,
  determinant,
  lorentzNorm,
  efficientInformation,
  nuisanceNormTimesEfficientInformation: schurIdentity,
  sl2Congruence: {
    matrix: S,
    determinant: detS,
    transformedGram: transformed,
    transformedDeterminant
  },
  degenerateBoundary: {
    gramMatrix: degenerate,
    h2rCoordinates: degenerateCoords,
    determinant: det2(degenerate)
  },
  exactGroupBoundary: "The determinant on H_2(R) has signature (1,2); its connected determinant-preserving congruence group is covered by SL(2,R)=Spin_0(2,1), not Spin_0(2,3).",
  extensionRequirement: "A Spin(2,3) claim needs a genuine five-dimensional quadratic module or equivalent Sp(4,R) construction with two additional independent coordinates and a proved intertwiner.",
  passed: true
}, null, 2));
