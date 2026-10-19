import assert from "node:assert/strict";

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const phase = (x) => C(Math.cos(x), Math.sin(x));
const close = (a, b, eps = 1e-11) => Math.hypot(a.re - b.re, a.im - b.im) < eps;

const sample = C(0.37, -0.82);
const charges = [1 / 6, 2 / 3, -1 / 3, -1 / 2, -1];
const angles = [0.31, 0.83, 1.47];
let sameChargeFailures = 0;
let nambuPasses = 0;
for (const q of charges) for (const alpha of angles) {
  const rho = phase(q * alpha);
  // Theta=S K with S mapping to another copy carrying the same charge.
  const thetaRho = conj(mul(rho, sample));
  const rhoTheta = mul(rho, conj(sample));
  assert(!close(thetaRho, rhoTheta));
  sameChargeFailures += 1;

  // On V_q direct-sum V_-q, J0=tau_x K is gauge equivariant.
  const v = [sample, C(-0.21, 0.54)];
  const transformed = [mul(rho, v[0]), mul(conj(rho), v[1])];
  const jAfterRho = [conj(transformed[1]), conj(transformed[0])];
  const jBefore = [conj(v[1]), conj(v[0])];
  const rhoAfterJ = [mul(rho, jBefore[0]), mul(conj(rho), jBefore[1])];
  assert(close(jAfterRho[0], rhoAfterJ[0]) && close(jAfterRho[1], rhoAfterJ[1]));
  nambuPasses += 1;
}

const sourceConjugation = (state) => ({
  charge: -state.charge,
  chirality: state.chirality === "L" ? "R" : "L",
  neutral: state.neutral === "D" ? "E" : "D",
});
const neutralExchange = (state) => ({
  ...state, neutral: state.neutral === "D" ? "E" : "D",
});
const state = { charge: 1 / 6, chirality: "L", neutral: "D" };
assert.notDeepEqual(sourceConjugation(state), neutralExchange(state));
assert.deepEqual(sourceConjugation(sourceConjugation(state)), state);

console.log(JSON.stringify({
  protocol: "neutral-exchange-not-car-charge-conjugation/1",
  testedNonzeroCharges: charges,
  testedAngles: angles,
  sameChargeAntiunitaryIntertwinerFailures: sameChargeFailures,
  nambuChargePairIntertwinerPasses: nambuPasses,
  neutralExchange: neutralExchange(state),
  sourceCarLorentzConjugation: sourceConjugation(state),
  conclusion: "The linear neutral exchange S may intertwine equal-charge completed modules, but S K is not a gauge-equivariant antiunitary on an undoubled charged module. Source CAR/Lorentz conjugation requires the conjugate-charge, opposite-chirality Nambu partner.",
  implication: "Derive the Hermitian response from S directly, or from a doubled Nambu construction followed by a justified projection; do not identify the survivor antiunitary with source charge conjugation.",
  passed: true,
}, null, 2));
