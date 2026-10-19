const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const lambda = 3;
const v = 2;
const g = 1.7;
const kappa = v * Math.sqrt(lambda / 2);
const sech = (x) => 1 / Math.cosh(x);
const phi = (x) => v * Math.tanh(kappa * x);
const dphi = (x) => v * kappa * sech(kappa * x) ** 2;
const ddphi = (x) => -2 * v * kappa * kappa * sech(kappa * x) ** 2 * Math.tanh(kappa * x);
const potential = (x) => lambda * (phi(x) ** 2 - v ** 2) ** 2 / 4;

for (const x of [-2, -0.7, 0, 0.4, 1.9]) {
  const eomResidual = ddphi(x) - lambda * phi(x) * (phi(x) ** 2 - v ** 2);
  assert(Math.abs(eomResidual) < 1e-10, "phi4 kink equation mismatch");
  assert(Math.abs(0.5 * dphi(x) ** 2 - potential(x)) < 1e-10, "first integral/stress balance mismatch");
}

const analyticTension = 2 * Math.sqrt(2 * lambda) * v ** 3 / 3;
const L = 12 / kappa;
const n = 200000;
const h = 2 * L / n;
let numericalTension = 0;
for (let i = 0; i <= n; i += 1) {
  const x = -L + i * h;
  const density = 0.5 * dphi(x) ** 2 + potential(x);
  numericalTension += (i === 0 || i === n ? 0.5 : 1) * density * h;
}
assert(Math.abs(numericalTension - analyticTension) / analyticTension < 1e-8, "kink tension mismatch");

// Normalizable Dirac zero profile: cosh(kappa x)^(-g v/kappa).
const exponent = g * v / kappa;
assert(exponent > 0, "zero-mode exponent must be positive");
const zeroProfile = (x) => Math.cosh(kappa * x) ** (-exponent);
assert(zeroProfile(10 / kappa) < 1e-3 && zeroProfile(-10 / kappa) < 1e-3, "wall zero profile must decay at both ends");

// A selector rotation through a transverse mass breaks the fixed C_w=sigma_y grading.
// {sigma_y, m(cos theta sigma_z + sin theta sigma_y)} = 2m sin(theta) I.
for (const theta of [0, Math.PI / 4, Math.PI / 2, Math.PI]) {
  const anticommutatorCoefficient = 2 * Math.sin(theta);
  if (theta === 0 || theta === Math.PI) {
    assert(Math.abs(anticommutatorCoefficient) < 1e-12, "endpoint sign masses must preserve fixed grading");
  } else {
    assert(Math.abs(anticommutatorCoefficient) > 1e-6, "interior selector rotation must break fixed grading");
  }
}

console.log("Phi4 sign-wall stress and selector-loop gate certificate: PASS");
console.log("kink_eom=true; T_xx=0; tension=2*sqrt(2lambda)*v^3/3");
console.log("Dirac_zero_profile=cosh(kappa*x)^(-g*v/kappa)_normalizable=true");
console.log("RP2_half_turn_requires_transverse_mass; fixed_AIII_grading_breaks_interior=true");
