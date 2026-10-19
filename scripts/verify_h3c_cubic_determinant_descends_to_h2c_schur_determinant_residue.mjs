import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (z, w) => C(z.re + w.re, z.im + w.im);
const sub = (z, w) => C(z.re - w.re, z.im - w.im);
const mul = (z, w) => C(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);
const scale = (a, z) => C(a * z.re, a * z.im);
const conj = z => C(z.re, -z.im);
const abs2 = z => z.re ** 2 + z.im ** 2;
const close = (z, w, tolerance = 1e-10) => Math.abs(z.re - w.re) < tolerance && Math.abs(z.im - w.im) < tolerance;

function det2(A) {
  return sub(mul(A[0][0], A[1][1]), mul(A[0][1], A[1][0]));
}

function det3(X) {
  const t1 = mul(X[0][0], sub(mul(X[1][1], X[2][2]), mul(X[1][2], X[2][1])));
  const t2 = mul(X[0][1], sub(mul(X[1][0], X[2][2]), mul(X[1][2], X[2][0])));
  const t3 = mul(X[0][2], sub(mul(X[1][0], X[2][1]), mul(X[1][1], X[2][0])));
  return add(sub(t1, t2), t3);
}

function adjugate2(A) {
  return [[A[1][1], scale(-1, A[0][1])], [scale(-1, A[1][0]), A[0][0]]];
}

function quadratic(w, A, v) {
  const Av = A.map(row => row.reduce((s, x, j) => add(s, mul(x, v[j])), C(0)));
  return w.reduce((s, x, i) => add(s, mul(conj(x), Av[i])), C(0));
}

function schur(A, w, c) {
  return A.map((row, i) => row.map((x, j) => sub(x, scale(1 / c, mul(w[i], conj(w[j]))))));
}

const examples = [
  { a: 2.3, b: 1.8, z: C(0.4, -0.3), w: [C(0.2, 0.1), C(-0.15, 0.25)], c: 3.2 },
  { a: 1.7, b: 2.6, z: C(-0.2, 0.45), w: [C(0.35, -0.05), C(0.1, 0.2)], c: 4.1 },
  { a: 3.1, b: 1.4, z: C(0.55, 0.1), w: [C(-0.1, 0.3), C(0.22, -0.18)], c: 5.0 }
].map(data => {
  const A = [[C(data.a), data.z], [conj(data.z), C(data.b)]];
  const X = [
    [A[0][0], A[0][1], data.w[0]],
    [A[1][0], A[1][1], data.w[1]],
    [conj(data.w[0]), conj(data.w[1]), C(data.c)]
  ];
  const cubic = det3(X);
  const detA = det2(A);
  const couplingCorrection = quadratic(data.w, adjugate2(A), data.w);
  const blockFormula = sub(scale(data.c, detA), couplingCorrection);
  const schurDeterminant = det2(schur(A, data.w, data.c));
  assert.ok(close(cubic, blockFormula));
  assert.ok(close(cubic, scale(data.c, schurDeterminant)));
  assert.ok(Math.abs(cubic.im) < 1e-10);
  return {
    detA: detA.re,
    cubicDeterminant: cubic.re,
    couplingCorrection: couplingCorrection.re,
    schurDeterminant: schurDeterminant.re,
    normalizedCubic: cubic.re / data.c
  };
});

const A0 = [[C(2.2), C(0.35, -0.4)], [C(0.35, 0.4), C(1.9)]];
const detA0 = det2(A0).re;
const epsilon = 1e-7;
const faceMatrix = c => [[A0[0][0], A0[0][1], C(0)], [A0[1][0], A0[1][1], C(0)], [C(0), C(0), C(c)]];
const normalDerivative = (det3(faceMatrix(epsilon)).re - det3(faceMatrix(0)).re) / epsilon;
assert.ok(Math.abs(normalDerivative - detA0) < 1e-8);
assert.ok(Math.abs(det3(faceMatrix(0)).re) < 1e-12);

console.log(JSON.stringify({
  protocol: "h3c-cubic-to-h2c-schur-residue/1",
  exactBlockIdentity: "det([[A,w],[w^dagger,c]]) = c det(A) - w^dagger adj(A) w = c det(A-w w^dagger/c)",
  examples,
  peirceFace: {
    cubicOnRankTwoFace: 0,
    outwardNormalDerivative: normalDerivative,
    h2Determinant: detA0
  },
  heavyFaceLimit: "det(X)/c = det(A-w w^dagger/c) -> det(A) as c grows with bounded w",
  residueInterpretation: "The H2 quadratic norm is the exact normal derivative of the H3 cubic at the rank-two face and the normalized heavy-face Schur residue.",
  caution: "This algebraic residue is not by itself an anomaly phase, logical gate or boundary action; those require an additional oriented or quantized construction.",
  passed: true
}, null, 2));
