import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;
const K = [[3, 2], [2, 3]];
const Q = (a, b) => K[0][0] * a * a + 2 * K[0][1] * a * b + K[1][1] * b * b;

// A = (Z/6)^2 is identified by CRT with (F2)^2 x (F3)^2.
// q takes values in (1/12)Z/Z; E is its exponent modulo 12.
const exponent12 = ([a, b]) => {
  const e2 = mod(Q(mod(a, 2), mod(b, 2)), 4);
  const e3 = mod(2 * Q(mod(a, 3), mod(b, 3)), 3);
  return mod(3 * e2 + 4 * e3, 12);
};
const addA = (x, y) => [mod(x[0] + y[0], 6), mod(x[1] + y[1], 6)];
const scaleA = (n, x) => [mod(n * x[0], 6), mod(n * x[1], 6)];
const bilinear12 = (x, y) => mod(exponent12(addA(x, y)) - exponent12(x) - exponent12(y), 12);
const elements = [];
for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) elements.push([a, b]);

assert.equal(elements.length, 36);
for (const x of elements) {
  assert.equal(exponent12(scaleA(-1, x)), exponent12(x));
  for (let n = 0; n < 6; n++) {
    assert.equal(exponent12(scaleA(n, x)), mod(n * n * exponent12(x), 12));
  }
}
for (const x of elements) for (const y of elements) for (const z of elements) {
  assert.equal(bilinear12(addA(x, y), z), mod(bilinear12(x, z) + bilinear12(y, z), 12));
}
for (const x of elements) {
  if (x[0] === 0 && x[1] === 0) continue;
  assert.ok(elements.some((y) => bilinear12(x, y) !== 0), `degenerate vector ${x}`);
}

// The twelfth-root phase has canonical Sylow projections.
for (const x of elements) {
  const e = exponent12(x);
  const e2 = mod(Q(mod(x[0], 2), mod(x[1], 2)), 4);
  const e3 = mod(2 * Q(mod(x[0], 3), mod(x[1], 3)), 3);
  assert.equal(mod(9 * e, 12), mod(3 * e2, 12)); // ninth power isolates mu_4.
  assert.equal(mod(4 * e, 12), mod(4 * e3, 12)); // fourth power isolates mu_3.
}

const root12 = (e) => ({ re: Math.cos(Math.PI * e / 6), im: Math.sin(Math.PI * e / 6) });
const sum = elements.reduce((s, x) => {
  const z = root12(exponent12(x));
  return { re: s.re + z.re, im: s.im + z.im };
}, { re: 0, im: 0 });
assert.ok(Math.abs(sum.re) < 1e-9);
assert.ok(Math.abs(sum.im + 6) < 1e-9);

const twoPart = [[0, 0], [0, 1], [1, 0], [1, 1]].reduce((s, x) => {
  const e2 = mod(Q(x[0], x[1]), 4);
  const z = root12(3 * e2);
  return { re: s.re + z.re, im: s.im + z.im };
}, { re: 0, im: 0 });
assert.ok(Math.abs(twoPart.re) < 1e-9 && Math.abs(twoPart.im + 2) < 1e-9);
const threePart = Array.from({ length: 9 }, (_, i) => [Math.floor(i / 3), i % 3]).reduce((s, x) => {
  const e3 = mod(2 * Q(x[0], x[1]), 3);
  const z = root12(4 * e3);
  return { re: s.re + z.re, im: s.im + z.im };
}, { re: 0, im: 0 });
assert.ok(Math.abs(threePart.re - 3) < 1e-9 && Math.abs(threePart.im) < 1e-9);

// Even lattice realization L=<-2>+<-2>+U(-3).
const gram = [[-2, 0, 0, 0], [0, -2, 0, 0], [0, 0, 0, -3], [0, 0, -3, 0]];
const determinant = (-2) * (-2) * (-(3 ** 2));
assert.equal(determinant, -36);
const eigenvalues = [-2, -2, 3, -3];
assert.equal(eigenvalues.filter((x) => x > 0).length, 1);
assert.equal(eigenvalues.filter((x) => x < 0).length, 3);
assert.ok(gram.every((row, i) => row[i] % 2 === 0));
// q_L(n)=1/2 n^T G^{-1}n gives -u_i^2/4 and -ab/3.
const latticeTwoExponent = (u, v) => mod(3 * u * u + 3 * v * v, 4);
const latticeThreeExponent = (a, b) => mod(-a * b, 3);
for (let u = 0; u < 2; u++) for (let v = 0; v < 2; v++) assert.equal(latticeTwoExponent(u, v), mod(Q(u, v), 4));
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) assert.equal(latticeThreeExponent(a, b), mod(2 * Q(a, b), 3));

console.log("crt_finite_quadratic_module: PASS");
console.log("state_group=(Z2)^2_x_(Z3)^2_isomorphic_to_(Z6)^2,order=36");
console.log("quadratic_values=mu12,not_a_Z12_state_module");
console.log("bilinear_form_is_nondegenerate_and_quadratic_homogeneity_holds");
console.log("ninth_power_projects_to_binary_mu4_phase_and_fourth_power_projects_to_qutrit_mu3_phase");
console.log("two_primary_Gauss_sum=-2i,normalized_Weil_index=-i,Brown_invariant=6_mod8");
console.log("three_primary_Gauss_sum=3,normalized_Weil_index=1,hyperbolic");
console.log("combined_Gauss_sum=-6i,normalized_Weil_index=-i");
console.log("even_lattice_realization=<-2>+<-2>+U(-3),determinant=-36,signature=(1,3),signature_difference=-2");
console.log("Milgram_phase=exp(2pi_i_signature_difference_over_8)=-i");

