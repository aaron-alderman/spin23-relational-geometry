import assert from "node:assert/strict";

const dot = (left, matrix, right) => left.reduce(
  (sum, value, i) => sum + value * right.reduce((rowSum, r, j) => rowSum + matrix[i][j] * r, 0),
  0,
);
const gram = (vectors, metric) => vectors.map((left) => vectors.map((right) => dot(left, metric, right)));

// A representative positive metric confirms the general identity
// <u,-u>_K = -<u,u>_K < 0 for nonzero u.
const positiveMetric = [[3, 1], [1, 2]];
const uGeneric = [2, -1];
const dClebsch = uGeneric.map((value) => -value);
assert.equal(dot(uGeneric, positiveMetric, dClebsch), -dot(uGeneric, positiveMetric, uGeneric));
assert(dot(uGeneric, positiveMetric, dClebsch) < 0);

// Minimal whitened two-copy repair.  D is a self-adjoint involution,
// u is balanced between its eigenspaces, L lies in the + eigenspace,
// and d=-D u is orthogonal to u while retaining the opposite L arm.
const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const invSqrt2 = 1 / Math.sqrt(2);
const L = [Math.sqrt(2), 0];
const u = [invSqrt2, invSqrt2];
const d = [-invSqrt2, invSqrt2]; // -D u
const G = gram([L, u, d], I);
const tolerance = 1e-12;
assert(Math.abs(G[0][1] - 1) < tolerance);
assert(Math.abs(G[0][2] + 1) < tolerance);
assert(Math.abs(G[1][2]) < tolerance);
assert(Math.abs(G[1][1] - 1) < tolerance);
assert(Math.abs(G[2][2] - 1) < tolerance);

// One dimension cannot contain two nonzero orthogonal right-arm vectors.
for (const u1 of [-2, -1, 1, 2]) for (const d1 of [-2, -1, 1, 2]) {
  assert.notEqual(u1 * d1, 0);
}

// A shared-L self-energy corrects only the D=+1 eigenspace in this basis.
// It immediately regenerates the forbidden edge.
const alpha = 0.4;
const correctedMetric = [[1 + alpha, 0], [0, 1]];
const correctedG = gram([L, u, d], correctedMetric);
assert(Math.abs(correctedG[1][2] + alpha / 2) < tolerance);
assert(Math.abs(correctedG[0][1] - Math.sqrt(2) * (1 + alpha) * invSqrt2) < tolerance);
assert(Math.abs(correctedG[0][2] + Math.sqrt(2) * (1 + alpha) * invSqrt2) < tolerance);

console.log(JSON.stringify({
  protocol: "positive-Spin10-Clebsch-preserving-versus-twisted-two-copy-S1-matching/1",
  exactNoGo: {
    assumption: "every mediator direction preserves lambda_d=-lambda_u and the inverse-mass metric K is positive definite",
    identity: "C_ud=<lambda_u,lambda_d>_K=-||lambda_u||_K^2",
    consequence: "C_ud cannot vanish unless both desired right-arm couplings vanish",
    copyCount: "the obstruction holds for any number of identical-Clebsch copies",
  },
  minimalTwistedRepair: {
    dimension: 2,
    D,
    lambdaL: L,
    lambdaU: u,
    lambdaD: d,
    relation: "lambda_d=-D lambda_u",
    WilsonGram: G,
    target: "C_Lu=+1, C_Ld=-1, C_ud=0",
  },
  radiativeBoundary: {
    sharedLegCorrection: "K -> I + alpha P_+",
    regeneratedEdge: correctedG[1][2],
    exactFormula: "C_ud=-alpha/2 for the normalized balanced witness",
  },
  interpretation: "a pure F_Cp star requires copy-space Clebsch twisting, not merely more complete Spin(10) vector copies; the common leg then destabilizes the balance unless an additional symmetry equalizes the two eigenspaces",
  passed: true,
}, null, 2));
