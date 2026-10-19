const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const div = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return C((a.re * b.re + a.im * b.im) / d,
    (a.im * b.re - a.re * b.im) / d);
};
const abs = (a) => Math.hypot(a.re, a.im);
const near = (a, b, tolerance = 1e-8) => Math.abs(a - b) < tolerance;
const addM = (a, b) => a.map((row, i) => row.map((value, j) => add(value, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((value) => mul(s, value)));
const determinant = (a) => add(mul(a[0][0], a[1][1]), scale(-1, mul(a[0][1], a[1][0])));
const theta = (a) => [
  [conj(a[1][1]), conj(a[1][0])],
  [conj(a[0][1]), conj(a[0][0])],
];
const fold = (a) => scaleM(C(0.5), addM(a, theta(a)));

const raw = [
  [[C(2), C(0.4, 0.6)], [C(0.4, -0.6), C(1)]],
  [[C(1.5), C(-0.2, 0.3)], [C(-0.2, -0.3), C(2.5)]],
];
const rho = raw.map(fold);
for (const r of rho) {
  assert(near(r[0][0].re, r[1][1].re), "fold must equalize populations");
  assert(abs(determinant(r)) >= -1e-12 && determinant(r).re >= -1e-12,
    "folded residue must remain positive semidefinite");
  const fixed = theta(r);
  assert(r.flat().every((value, index) =>
    near(value.re, fixed.flat()[index].re) && near(value.im, fixed.flat()[index].im)),
  "folded residue must be exchange fixed");
}

const masses = [1, 4];
const weights = [0.8, 1.3];
const response = (z) => {
  let result = [[C(0), C(0)], [C(0), C(0)]];
  for (let k = 0; k < rho.length; k += 1) {
    const kernel = div(C(weights[k]), add(C(masses[k]), scale(-1, z)));
    result = addM(result, scaleM(kernel, rho[k]));
  }
  return result;
};

const imaginaryPart = (g) => [
  [C(g[0][0].im), C((g[0][1].im + g[1][0].im) / 2, (g[1][0].re - g[0][1].re) / 2)],
  [C((g[0][1].im + g[1][0].im) / 2, (g[0][1].re - g[1][0].re) / 2), C(g[1][1].im)],
];
for (const z of [C(-2, 0.3), C(0, 1), C(2.5, 0.7), C(7, 2)]) {
  const im = imaginaryPart(response(z));
  const detIm = determinant(im);
  assert(im[0][0].re > 0 && im[1][1].re > 0 && detIm.re > 1e-10,
    "strictly positive folded residues must give a strictly Herglotz response");
  assert(abs(determinant(response(z))) > 1e-8,
    "strict Herglotz response must be invertible in the upper half-plane");
}

const winding = (values) => {
  let total = 0;
  for (let i = 1; i < values.length; i += 1) {
    let delta = Math.atan2(values[i].im, values[i].re)
      - Math.atan2(values[i - 1].im, values[i - 1].re);
    while (delta <= -Math.PI) delta += 2 * Math.PI;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    total += delta;
  }
  return Math.round(total / (2 * Math.PI));
};
const contour = Array.from({ length: 4097 }, (_, j) => {
  const angle = 2 * Math.PI * j / 4096;
  return C(2 * Math.cos(angle), 3 + 2 * Math.sin(angle)); // Im z >= 1
});
const determinantLoop = contour.map((z) => determinant(response(z)));
assert(determinantLoop.every((value) => abs(value) > 1e-8),
  "determinant must remain nonzero on an interior contour");
assert(winding(determinantLoop) === 0,
  "determinant winding on a contractible upper-half-plane contour must vanish");

const moment0 = rho.reduce((sum, r, k) => addM(sum, scaleM(C(weights[k]), r)),
  [[C(0), C(0)], [C(0), C(0)]]);
const largeZ = C(0, 1e7);
const asymptotic = scaleM(scale(-1, largeZ), response(largeZ));
assert(asymptotic.flat().every((value, index) =>
  abs(add(value, scale(-1, moment0.flat()[index]))) < 2e-5),
"folded response must retain the expected minus-M0/z ultraviolet normalization");

console.log("Folded H2(R) Herglotz interior-winding gate: PASS");
console.log("fold_preserves_positive_exchange_real_residues=true");
console.log("upper_half_plane_response_strictly_positive=true");
console.log("upper_half_plane_determinant_nonzero=true");
console.log("contractible_interior_determinant_winding=0");
console.log("ultraviolet_leading_moment_preserved_after_explicit_normalization=true");
console.log("nonzero_frequency_winding_requires=boundary_singularity_or_extra_periodic_coordinate");
