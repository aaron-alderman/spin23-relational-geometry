import assert from "node:assert/strict";

const near = (a, b, tolerance = 1e-10) => Math.abs(a - b) < tolerance;
const phase = (theta) => ({ re: Math.cos(theta), im: Math.sin(theta) });
const conj = (z) => ({ re: z.re, im: -z.im });
const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const equal = (a, b) => near(a.re, b.re) && near(a.im, b.im);

// With C_E=C_F=K, beta K=K beta iff beta=conj(beta).
const matched = [];
for (let k = 0; k < 360; k += 1) {
  const beta = phase(2 * Math.PI * k / 360);
  if (equal(beta, conj(beta))) matched.push(k);
}
assert.deepEqual(matched, [0, 180]);

// Every rephased antiunitary C_phi=e^{i phi}K still squares to +1.
for (const phi of [0.17, 0.71, 1.4, 2.9]) {
  const cPhase = phase(phi);
  assert(equal(mul(cPhase, conj(cPhase)), { re: 1, im: 0 }));
}

// Intertwining K with e^{i phi}K gives beta=e^{i phi} conjugate(beta):
// exactly the rotated pair beta=+/- e^{i phi/2}.
for (const phi of [0.2, 0.8, 1.7]) {
  const targetPhase = phase(phi);
  for (const sign of [1, -1]) {
    const beta0 = phase(phi / 2);
    const beta = { re: sign * beta0.re, im: sign * beta0.im };
    assert(equal(beta, mul(targetPhase, conj(beta))));
  }
  const generic = phase(phi / 2 + 0.31);
  assert(!equal(generic, mul(targetPhase, conj(generic))));
}

console.log("CAR real-structure phase reduction: PASS");
console.log("matched_antiunitaries_force_beta=plus_or_minus_1");
console.log("antiunitary_rephasing_preserves_C_squared_and_CAR_adjoint_action");
console.log("rephased_target_allows_beta=plus_or_minus_exp_i_phi_over_2");
console.log("absolute_Z2_selection=requires_phase_matched_real_structures");
