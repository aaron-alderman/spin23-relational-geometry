import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;
const omega = (n) => {
  const a = 2 * Math.PI * mod(n) / p;
  return { re: Math.cos(a), im: Math.sin(a) };
};
const cmul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const cconj = (a) => ({ re: a.re, im: -a.im });
const csub = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
const cabs = (a) => Math.hypot(a.re, a.im);

// Every quadratic phase on two qutrit labels has Q=u a^2+v b^2+c ab.
// Quotienting by local self phases removes u,v and leaves c.
const forms = [];
for (let u = 0; u < p; u++) for (let v = 0; v < p; v++) for (let c = 0; c < p; c++) forms.push({ u, v, c });
assert.equal(forms.length, 27);
assert.deepEqual([...new Set(forms.map(({ c }) => c))], [0, 1, 2]);

// Independent nonzero relabellings a->lambda a, b->mu b send c->lambda mu c;
// hence c=1 and c=2 form one orbit, distinct from c=0.
const orbit = (c) => new Set([1, 2].flatMap((lambda) => [1, 2].map((mu) => mod(lambda * mu * c))));
assert.deepEqual([...orbit(0)].sort(), [0]);
assert.deepEqual([...orbit(1)].sort(), [1, 2]);
assert.deepEqual([...orbit(2)].sort(), [1, 2]);

// Controlled phase U_c|a,b>=omega^(c a b)|a,b> conjugates the Weyl shifts
// by the other face's clock operator.
const phase = (c, a, b) => omega(c * a * b);
for (const c of [1, 2]) for (let a = 0; a < p; a++) for (let b = 0; b < p; b++) {
  const ratio1 = cmul(phase(c, mod(a + 1), b), cconj(phase(c, a, b)));
  const ratio2 = cmul(phase(c, a, mod(b + 1)), cconj(phase(c, a, b)));
  assert(cabs(csub(ratio1, omega(c * b))) < 1e-10);
  assert(cabs(csub(ratio2, omega(c * a))) < 1e-10);
}

// The corresponding symplectic matrix is the off-diagonal symmetric shear.
const I2 = [[1, 0], [0, 1]], Z2 = [[0, 0], [0, 0]];
const block = (a, b, c, d) => [[...a[0], ...b[0]], [...a[1], ...b[1]], [...c[0], ...d[0]], [...c[1], ...d[1]]];
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => mod(row.reduce((s, x, k) => s + x * B[k][j], 0))));
const equal = (A, B) => A.every((row, i) => row.every((x, j) => mod(x) === mod(B[i][j])));
const J = block(Z2, I2, [[-1, 0], [0, -1]], Z2);
for (const c of [1, 2]) {
  const K = [[0, c], [c, 0]];
  const S = block(I2, Z2, K, I2);
  assert(equal(mul(mul(transpose(S), J), S), J));
}

// Removing the two local self terms from the A2 response gives c=-1=2 mod 3,
// which lies in the unique nontrivial interface orbit.
const A2mod3 = [[2, 2], [2, 2]];
const mutual = [[mod(A2mod3[0][0] - 2), A2mod3[0][1]], [A2mod3[1][0], mod(A2mod3[1][1] - 2)]];
assert.deepEqual(mutual, [[0, 2], [2, 0]]);
assert(orbit(1).has(mutual[0][1]));

// The diagonal controlled phase is invertible and preserves all nine states;
// unlike isotropic lattice gluing, it does not quotient the discriminant space.
const diagonalEntries = [];
for (let a = 0; a < p; a++) for (let b = 0; b < p; b++) diagonalEntries.push(phase(1, a, b));
assert.equal(diagonalEntries.length, 9);
assert(diagonalEntries.every((z) => Math.abs(cabs(z) - 1) < 1e-12));

console.log("Two-A2 qutrit interface classification: PASS");
console.log("quadratic_interfaces_modulo_local_self_phases_are_classified_by_c_in_F3");
console.log("the_two_nonzero_coefficients_form_one_orbit_under_independent_face_reversal");
console.log("there_is_exactly_one_nontrivial_mutual_quadratic_interface_class");
console.log("it_implements_the_off_diagonal_symplectic_shear_and_preserves_all_nine_states");
console.log("the_A2_response_after_local_self_term_removal_lands_in_that_unique_class");
