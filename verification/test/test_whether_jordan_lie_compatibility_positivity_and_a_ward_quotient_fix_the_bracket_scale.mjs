import assert from "node:assert/strict";

const add = (x, y) => x.map((v, i) => v + y[i]);
const sub = (x, y) => x.map((v, i) => v - y[i]);
const scale = (s, x) => x.map((v) => s * v);
const dot3 = (x, y) => x[1] * y[1] + x[2] * y[2] + x[3] * y[3];
const cross3 = (x, y) => [0,
  x[2] * y[3] - x[3] * y[2],
  x[3] * y[1] - x[1] * y[3],
  x[1] * y[2] - x[2] * y[1]
];
const near = (x, y, eps = 1e-11) => x.every((v, i) => Math.abs(v - y[i]) < eps);

// Hermitian 2x2 matrices in Pauli coordinates A=a0 I+a.sigma.
const jordan = (a, b) => [
  a[0] * b[0] + dot3(a, b),
  a[0] * b[1] + b[0] * a[1],
  a[0] * b[2] + b[0] * a[2],
  a[0] * b[3] + b[0] * a[3]
];
const bracket = (lambda, a, b) => scale(lambda, cross3(a, b));
const jordanAssociator = (a, b, c) => sub(jordan(jordan(a, b), c), jordan(a, jordan(b, c)));
const nestedBracket = (lambda, a, b, c) => bracket(lambda, b, bracket(lambda, a, c));
const det = (a) => a[0] ** 2 - dot3(a, a);
const positive = (a) => a[0] >= 0 && det(a) >= -1e-12;

const samples = [
  [[2, 1, 0, 0], [3, 0, 1, 0], [4, 0, 0, 1]],
  [[1.2, .2, -.3, .4], [.8, -.1, .2, .05], [2.1, .5, .4, -.2]],
  [[3, 1, 1, 0], [2, -1, 0, 1], [5, .2, -.7, .9]]
];
const lambdas = [.25, .5, 1, 2, 7];
const compatibility = [];
for (const lambda of lambdas) {
  for (const [a, b, c] of samples) {
    const lhs = jordanAssociator(a, b, c);
    const rhs = scale(-1 / (lambda * lambda), nestedBracket(lambda, a, b, c));
    assert(near(lhs, rhs));
  }
  compatibility.push({ lambda, requiredCompatibilityCoefficient: -1 / (lambda * lambda) });
}

// Jordan cone positivity knows only the symmetrized product.  It is literally
// unchanged throughout the bracket-scale family.
const coneSamples = [
  [2, .5, .25, -.1], [1, 1, 0, 0], [4, -1, 2, .5]
];
assert(coneSamples.every(positive));
const coneData = coneSamples.map((x) => ({ x, determinant: det(x), positive: positive(x) }));

// A finite Ward quotient model: q is a longitudinal null vector, P projects to
// q-perp, and the physical kernel K=P R P is transverse. Scaling the derivation
// or generator does not change q.K=0, so the homogeneous Ward condition cannot
// normalize lambda.
const q = [1, 2, -1];
const q2 = q.reduce((s, v) => s + v * v, 0);
const P = Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => (i === j ? 1 : 0) - q[i] * q[j] / q2));
const R = [[3, .2, -.1], [.2, 2, .4], [-.1, .4, 1.5]];
const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const mv = (A, x) => A.map((row) => row.reduce((s, v, i) => s + v * x[i], 0));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const K = mm(mm(P, R), P);
const wardResiduals = lambdas.map((lambda) => {
  const scaledQ = scale(lambda, q);
  const left = mv(transpose(K), scaledQ);
  const right = mv(K, scaledQ);
  assert(near(left, [0, 0, 0]));
  assert(near(right, [0, 0, 0]));
  return { lambda, residualNormSquared: dot3([0, ...right], [0, ...right]) };
});

console.log(JSON.stringify({
  protocol: "jordan-lie-scale-versus-positivity-and-ward-quotient/1",
  carrier: "H2(C) in Pauli coordinates",
  jordanProduct: "A o B=(AB+BA)/2",
  lieFamily: "[A,B]_lambda=lambda (a cross b).sigma for A=a0 I+a.sigma",
  compatibilityIdentity: "Assoc_o(a,b,c)=-(1/lambda^2)[b,[a,c]_lambda]_lambda",
  compatibility,
  positiveConeIndependentOfLambda: coneData,
  wardQuotient: { longitudinalVector: q, projector: P, residuals: wardResiduals },
  conclusion: "Jordan-Lie compatibility fixes only the product of the squared bracket scale and the compatibility coefficient. Cone positivity and a homogeneous Ward quotient do not fix the remaining normalization.",
  missingDatum: "A canonical symplectic/commutator normalization (physically an action, Planck scale, charge normalization, or calibrated response residue).",
  passed: true
}, null, 2));
