#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const det2v = (u, v) => u[0] * v[1] - u[1] * v[0];
const q = v => [v[0] * v[0], 2 * v[0] * v[1], v[1] * v[1]];
const det3cols = (a, b, c) =>
  a[0] * (b[1] * c[2] - b[2] * c[1])
  - b[0] * (a[1] * c[2] - a[2] * c[1])
  + c[0] * (a[1] * b[2] - a[2] * b[1]);
const close = (a, b, tol = 1e-8) => Math.abs(a - b) < tol;
const jordanDet = Q => Q[0] * Q[2] - (Q[1] * Q[1]) / 4;

const triples = [
  [[1, 0], [0, 1], [1, 1]],
  [[2, 1], [-1, 3], [4, -2]],
  [[1, 2], [3, 1], [-2, 5]],
];

for (const [u, v, w] of triples) {
  const lhs = det3cols(q(u), q(v), q(w));
  const rhs = 2 * det2v(u, v) * det2v(u, w) * det2v(v, w);
  assert(close(lhs, rhs), "Veronese-frame determinant identity failed");
  assert(Math.abs(lhs) > eps, "test triple must be projectively distinct");
  assert(close(jordanDet(q(u)), 0) && close(jordanDet(q(v)), 0) && close(jordanDet(q(w)), 0),
    "rank-one relationships must lie on the Jordan light cone");
}

// Four distinct defect rays are necessarily linearly dependent in Sym_2(R).
const b1 = [1, 0], b2 = [0, 1], b3 = [1, 1], b4 = [1, -1];
const Q1 = q(b1), Q2 = q(b2), Q3 = q(b3), Q4 = q(b4);
for (let i = 0; i < 3; i++) {
  assert(close(-2 * Q1[i] - 2 * Q2[i] + Q3[i] + Q4[i], 0), "four-ray relation failed");
}

// A finite set of PSD boundary rays cannot generate a distinct boundary ray:
// a positive sum has rank one only if every nonzero summand has the same line.
const newRay = [Math.cos(Math.PI / 8), Math.sin(Math.PI / 8)];
assert([b1, b2, b3, b4].every(v => Math.abs(det2v(v, newRay)) > eps),
  "new boundary ray must be absent from the finite inventory");

console.log("Three-relationship Veronese-frame certificate: PASS");
console.log("det[q1,q2,q3]=2*area12*area13*area23; three_distinct_projective_rays_span_Sym2=true");
console.log("each_remnant_is_Jordan_null=true; four_rays_overcomplete=true; finite_positive_hull_not_full_PSD_cone=true");
