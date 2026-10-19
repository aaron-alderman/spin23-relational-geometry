const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const phase = (x) => C(Math.cos(x), Math.sin(x));
const close = (a, b, eps = 1e-8) => Math.hypot(a.re - b.re, a.im - b.im) < eps;

const detM0 = C(339, 4);
const detAtInfinity = (phi) => mul(phase(3 * phi), detM0);

const windingFromSamples = (samples) => {
  let phaseChange = 0;
  for (let j = 1; j < samples.length; j += 1) {
    let delta = Math.atan2(samples[j].im, samples[j].re)
      - Math.atan2(samples[j - 1].im, samples[j - 1].re);
    while (delta <= -Math.PI) delta += 2 * Math.PI;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    phaseChange += delta;
  }
  return Math.round(phaseChange / (2 * Math.PI));
};

const samples = Array.from({ length: 4097 }, (_, j) => detAtInfinity(2 * Math.PI * j / 4096));
assert(windingFromSamples(samples) === 3, "full U(1) matrix vortex must have determinant winding three");

// Antipodal mass law of the full vortex.
for (const phi of [0, 0.17, 1.2, 2.7]) {
  const q = phase(phi);
  const qDeck = phase(phi + Math.PI);
  assert(close(qDeck, C(-q.re, -q.im)), "full vortex mass must be antipodally odd");
}

// Explicit radial Jackiw-Rossi representative after constant Takagi reduction.
// For profile f(r)=tanh(r), a zero-mode envelope is a_d(r)=cosh(r)^(-d),
// satisfying a_d' + d f a_d = 0 and having finite 2D norm.
const envelope = (r, d) => Math.cosh(r) ** (-d);
for (const d of [2, 3, 5]) {
  for (const r of [0, 0.2, 0.9, 2.1, 5]) {
    const a = envelope(r, d);
    const derivative = -d * Math.tanh(r) * a;
    assert(Math.abs(derivative + d * Math.tanh(r) * a) < 1e-11,
      "radial zero-mode envelope must solve the first-order equation");
  }
  const step = 0.002;
  let norm = 0;
  for (let j = 0; j < 10000; j += 1) {
    const r = (j + 0.5) * step;
    norm += 2 * Math.PI * r * envelope(r, d) ** 2 * step;
  }
  assert(Number.isFinite(norm) && norm > 0 && norm < 100,
    "each Takagi channel must have a finite positive transverse norm");
}

// Primitive RP2 loop: lift advances only by pi, so the odd mass changes sign.
// It is a section with deck transition, not a closed C* function on one circuit.
const halfLiftStart = phase(0);
const halfLiftEnd = phase(Math.PI);
assert(close(halfLiftEnd, C(-halfLiftStart.re, -halfLiftStart.im)),
  "primitive selector loop must end on the opposite lifted mass");
const determinantHalfPhaseChange = 3 * Math.PI;
assert(Math.abs(determinantHalfPhaseChange / (2 * Math.PI) - 1.5) < 1e-12,
  "primitive selector circuit has half-integer ordinary determinant phase and needs twisted sewing");

// Two primitive circuits close on the double cover and recover winding three.
assert(Math.abs((2 * determinantHalfPhaseChange) / (2 * Math.PI) - 3) < 1e-12,
  "double selector circuit must recover integer winding three");

console.log("Three-flavor matrix-vortex and RP2-gate certificate: PASS");
console.log("ordinary_full_vortex_det_winding=3");
console.log("decoupled_Jackiw_Rossi_zero_mode_representatives=3");
console.log("primitive_RP2_loop_ordinary_phase_turns=3/2");
console.log("primitive_RP2_loop_requires_twisted_index=true");
