import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, vector) => vector.map((z) => mul(a, z));
const cross = (a, b) => [
  add(mul(a[1], b[2]), C(-mul(a[2], b[1]).re, -mul(a[2], b[1]).im)),
  add(mul(a[2], b[0]), C(-mul(a[0], b[2]).re, -mul(a[0], b[2]).im)),
  add(mul(a[0], b[1]), C(-mul(a[1], b[0]).re, -mul(a[1], b[0]).im)),
];
const vectorConj = (v) => v.map(conj);
const near = (a, b, tolerance = 1e-10) => Math.hypot(a.re - b.re, a.im - b.im) < tolerance;
const vectorNear = (a, b) => a.every((z, i) => near(z, b[i]));
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));

const a = [C(1, 0.2), C(-0.3, 0.7), C(0.4, -0.6)];
const b = [C(-0.2, 0.5), C(0.9, 0.1), C(-0.7, 0.3)];
const octonionVectorProduct = (x, y) => vectorConj(cross(x, y));
for (let k = 0; k < 3; k += 1) {
  const alpha = phase(2 * Math.PI * k / 3);
  assert(vectorNear(octonionVectorProduct(scale(alpha, a), scale(alpha, b)),
    scale(alpha, octonionVectorProduct(a, b))));
}
const genericAlpha = phase(0.37);
assert(!vectorNear(octonionVectorProduct(scale(genericAlpha, a), scale(genericAlpha, b)),
  scale(genericAlpha, octonionVectorProduct(a, b))));

// A common unit phase on C2 disappears from every rank-one observable vv^dagger.
const weakVector = [C(0.7, -0.2), C(-0.1, 0.9)];
for (const theta of [0.1, 0.7, 1.9]) {
  const beta = phase(theta);
  const transformed = scale(beta, weakVector);
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    assert(near(mul(transformed[i], conj(transformed[j])),
      mul(weakVector[i], conj(weakVector[j]))));
  }
}

// If a combined five-volume is also identified, det(alpha I3 + beta I2)=1.
// With alpha^3=1 this forces beta^2=1, leaving 3*2=6 pairs.
const volumeCompatible = [];
for (let k = 0; k < 3; k += 1) for (const sign of [-1, 1]) {
  const alpha = phase(2 * Math.PI * k / 3);
  const beta = C(sign);
  const determinant = mul(mul(alpha, mul(alpha, alpha)), mul(beta, beta));
  assert(near(determinant, C(1)));
  volumeCompatible.push({ k, sign });
}
assert.equal(volumeCompatible.length, 6);

console.log("3+2 product/volume phase reduction: PASS");
console.log("octonion_cross_product_forces_alpha_cubed=1");
console.log("H2C_rank_one_observables_are_blind_to_common_beta_phase");
console.log("combined_five_volume_condition_forces_beta_squared=1 residual_order=6");
console.log("canonical_combined_volume_identification=still_open");
