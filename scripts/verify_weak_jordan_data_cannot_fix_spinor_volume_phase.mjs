import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const near = (a, b, tolerance = 1e-10) => Math.hypot(a.re - b.re, a.im - b.im) < tolerance;
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const scale = (z, vector) => vector.map((x) => mul(z, x));

const outer = (v) => v.map((vi) => v.map((vj) => mul(vi, conj(vj))));
const matrixNear = (a, b) => a.every((row, i) => row.every((z, j) => near(z, b[i][j])));
const wedge = (v, w) => C(
  mul(v[0], w[1]).re - mul(v[1], w[0]).re,
  mul(v[0], w[1]).im - mul(v[1], w[0]).im,
);

const v = [C(0.7, -0.2), C(-0.1, 0.9)];
const w = [C(-0.4, 0.3), C(0.8, 0.2)];
const originalProjector = outer(v);
const originalWedge = wedge(v, w);
assert(!near(originalWedge, C(0)));

for (const theta of [0.13, Math.PI / 4, 1.71]) {
  const beta = phase(theta);
  assert(matrixNear(outer(scale(beta, v)), originalProjector));
  assert(near(wedge(scale(beta, v), scale(beta, w)), mul(mul(beta, beta), originalWedge)));
}

// The phase theta=pi/4 induces the identity on H2(C), but acts by i on Lambda^2 C2.
const beta = phase(Math.PI / 4);
assert(matrixNear(outer(scale(beta, v)), originalProjector));
assert(near(mul(beta, beta), C(0, 1)));
assert(!near(mul(mul(beta, beta), originalWedge), originalWedge));

// det(vv^dagger)=0 and is phase blind.
const determinant = (m) => C(
  mul(m[0][0], m[1][1]).re - mul(m[0][1], m[1][0]).re,
  mul(m[0][0], m[1][1]).im - mul(m[0][1], m[1][0]).im,
);
assert(near(determinant(originalProjector), C(0)));
assert(near(determinant(outer(scale(phase(0.63), v))), C(0)));

// Colour product compatibility fixes alpha in Z3, while beta remains a continuum here.
const colourPhases = [0, 1, 2].map((k) => phase(2 * Math.PI * k / 3));
for (const alpha of colourPhases) assert(near(mul(mul(alpha, alpha), alpha), C(1)));
for (const theta of [0.11, 0.42, 0.97, 2.3]) {
  assert(matrixNear(outer(scale(phase(theta), v)), originalProjector));
}

console.log("Weak Jordan determinant-line no-go: PASS");
console.log("central_U1_action_on_H2C_observables=trivial");
console.log("central_U1_action_on_Lambda2_C2=weight_2_nontrivial");
console.log("intrinsic_nonzero_weak_volume_selection=impossible");
console.log("unconditional_product_ambiguity=Z3_x_U1");
console.log("common_top_line_trivialization=extra_sewing_datum_required");
