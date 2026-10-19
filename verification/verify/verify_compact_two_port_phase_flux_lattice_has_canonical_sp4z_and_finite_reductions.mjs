import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => s + x * b[k][j], 0)));
const equal = (a, b) => a.every((row, i) => row.every((x, j) => x === b[i][j]));
const reduce = (a, n) => a.map((row) => row.map((x) => mod(x, n)));
const I2 = [[1, 0], [0, 1]];
const Z2 = [[0, 0], [0, 0]];
const block = (a, b, c, d) => [
  [...a[0], ...b[0]], [...a[1], ...b[1]],
  [...c[0], ...d[0]], [...c[1], ...d[1]],
];
const J = block(Z2, I2, [[-1, 0], [0, -1]], Z2);
const X = [[2, -1], [-1, 2]];
const SX = block(I2, Z2, X, I2);
const F = block(Z2, [[-1, 0], [0, -1]], I2, Z2);

// Integral symmetric shears and Fourier/Legendre exchange are lattice automorphisms.
assert(equal(mul(mul(transpose(SX), J), SX), J));
assert(equal(mul(mul(transpose(F), J), F), J));
assert(SX.flat().every(Number.isInteger));
assert(F.flat().every(Number.isInteger));

// Hence they descend compatibly to every finite phase-space module tested.
for (const n of [2, 3, 4, 5, 7, 8, 11]) {
  const jn = reduce(J, n);
  const sxn = reduce(SX, n);
  const fn = reduce(F, n);
  assert(equal(reduce(mul(mul(transpose(sxn), jn), sxn), n), jn));
  assert(equal(reduce(mul(mul(transpose(fn), jn), fn), n), jn));
}

// A nonintegral response does not define a map on R^4/Z^4: changing q by
// the same lattice vector changes p by a non-lattice vector.
const halfX = X.map((row) => row.map((x) => x / 2));
const latticeShift = [1, 0];
const momentumAmbiguity = halfX.map((row) => row[0] * latticeShift[0] + row[1] * latticeShift[1]);
assert(momentumAmbiguity.some((x) => !Number.isInteger(x)));

// At odd level N, Q(q)=1/2 q^T K q is a well-defined quadratic refinement
// and polarizes to the bilinear form q^T K a.
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const mv = (a, v, n) => a.map((row) => mod(dot(row, v), n));
const inv2 = (n) => {
  for (let x = 0; x < n; x++) if (mod(2 * x, n) === 1) return x;
  return null;
};
for (const n of [3, 5, 7, 11]) {
  const h = inv2(n);
  assert.notEqual(h, null);
  const Q = (q) => mod(h * dot(q, mv(X, q, n)), n);
  for (let q0 = 0; q0 < n; q0++) for (let q1 = 0; q1 < n; q1++) {
    for (let a0 = 0; a0 < n; a0++) for (let a1 = 0; a1 < n; a1++) {
      const q = [q0, q1], a = [a0, a1];
      const qa = q.map((x, i) => mod(x + a[i], n));
      const polarization = mod(Q(qa) - Q(q) - Q(a), n);
      assert.equal(polarization, mod(dot(q, mv(X, a, n)), n));
    }
  }
}

// The naive half-form has no modular inverse of two at even level; an
// additional quadratic refinement / doubled phase convention is required.
for (const n of [2, 4, 6, 8]) assert.equal(inv2(n), null);

console.log("Compact two-port phase/flux lattice audit: PASS");
console.log("integral_symmetric_response_defines_an_sp4z_torus_automorphism");
console.log("fourier_legendre_exchange_is_an_integral_symplectic_lattice_automorphism");
console.log("both_descend_compatibly_to_finite_phase_space_modules_modulo_N");
console.log("nonintegral_response_fails_the_torus_representative_independence_test");
console.log("odd_levels_have_the_canonical_half_quadratic_metaplectic_phase");
console.log("even_levels_require_extra_quadratic_refinement_data");
