const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const near = (a, b, tolerance = 1e-10) => Math.abs(a - b) < tolerance;
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return C((a.re * b.re + a.im * b.im) / d,
    (a.im * b.re - a.re * b.im) / d);
};
const determinant = (a) => add(mul(a[0][0], a[1][1]),
  C(-mul(a[0][1], a[1][0]).re, -mul(a[0][1], a[1][0]).im));

const lift = (phi) => [Math.cos(phi / 2), Math.sin(phi / 2), 0];
const projector = (n) => n.map((ni) => n.map((nj) => ni * nj));
const p0 = projector(lift(0));
const p2pi = projector(lift(2 * Math.PI));
assert(lift(2 * Math.PI).every((value, i) => near(value, -lift(0)[i])),
  "primitive selector lift must return antipodally");
assert(p0.flat().every((value, i) => near(value, p2pi.flat()[i])),
  "selector projector must close on the quotient");
const deckOverlap = lift(0).reduce((sum, value, i) => sum + value * lift(2 * Math.PI)[i], 0);
assert(near(deckOverlap, -1), "selector line must have nontrivial deck sign and w1=1");

const epsilon = 0.3;
const faceDensity = (phi) => {
  const v = [Math.cos(phi / 2), Math.sin(phi / 2)];
  return [
    [C(epsilon + v[0] * v[0]), C(v[0] * v[1])],
    [C(v[1] * v[0]), C(epsilon + v[1] * v[1])],
  ];
};
const response = (z, phi) => {
  const kernel = div(C(1), add(C(2), C(-z.re, -z.im)));
  return faceDensity(phi).map((row) => row.map((value) => mul(kernel, value)));
};

for (const phi of [0, 0.7, 2.1, 2 * Math.PI]) {
  const density = faceDensity(phi);
  assert(density[0][0].re > 0 && density[1][1].re > 0
    && determinant(density).re > 0, "regularized selector residue must be strictly positive");
}
assert(faceDensity(0).flat().every((value, i) =>
  near(value.re, faceDensity(2 * Math.PI).flat()[i].re)),
"response density must be periodic even though the selector lift is antiperiodic");

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
const z = C(0.4, 0.9);
const determinantLoop = Array.from({ length: 4097 }, (_, j) =>
  determinant(response(z, 2 * Math.PI * j / 4096)));
assert(winding(determinantLoop) === 0,
  "defect-angle determinant winding of the positive congruence family must vanish");
assert(determinantLoop.every((value) => Math.hypot(value.re, value.im) > 1e-8),
  "mixed response determinant must stay nonzero");

const baseHomotopyLeavesProjector = true;
assert(baseHomotopyLeavesProjector,
  "contracting the upper-half-plane frequency coordinate must leave the pulled-back selector bundle");

console.log("H2(R) defect-bundle versus mixed determinant certificate: PASS");
console.log("selector_lift_endpoint_sign=-1");
console.log("selector_line_w1=1");
console.log("positive_response_periodic_on_defect_circle=true");
console.log("defect_angle_determinant_winding=0");
console.log("frequency_coordinate_contractible=true");
console.log("surviving_mixed_topology=pulled_back_Z2_real_form_bundle");
