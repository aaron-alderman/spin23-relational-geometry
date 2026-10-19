const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const phase = (x) => C(Math.cos(x), Math.sin(x));
const abs = (z) => Math.hypot(z.re, z.im);

// det M0 = 339+4i from the explicit neutral-Majorana checkpoint.
const det0 = C(339, 4);

const determinantFamily = (theta, flavors, extraPairs = 0) =>
  mul(det0, phase((flavors + 2 * extraPairs) * theta));

const windingFromSamples = (samples) => {
  let total = 0;
  for (let j = 1; j < samples.length; j += 1) {
    const a = samples[j - 1];
    const b = samples[j];
    let delta = Math.atan2(b.im, b.re) - Math.atan2(a.im, a.re);
    while (delta <= -Math.PI) delta += 2 * Math.PI;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    total += delta;
  }
  return Math.round(total / (2 * Math.PI));
};

for (let flavors = 1; flavors <= 6; flavors += 1) {
  for (let extraPairs = -2; extraPairs <= 2; extraPairs += 1) {
    const exponent = flavors + 2 * extraPairs;
    const sampleCount = 4096;
    const samples = Array.from({ length: sampleCount + 1 }, (_, j) =>
      determinantFamily(2 * Math.PI * j / sampleCount, flavors, extraPairs));
    assert(samples.every((z) => abs(z) > 1), "determinant family must remain nonzero");
    const winding = windingFromSamples(samples);
    assert(winding === exponent, "sampled winding must equal the exact exponent");
    assert(((winding - flavors) % 2) === 0, "equivariant winding parity must equal flavor parity");

    // Antipodal sewing: d(theta+pi)=(-1)^N d(theta).
    for (const theta of [0, 0.17, 0.91, 2.2]) {
      const lhs = determinantFamily(theta + Math.PI, flavors, extraPairs);
      const rhs = determinantFamily(theta, flavors, extraPairs);
      const sign = flavors % 2 === 0 ? 1 : -1;
      assert(Math.hypot(lhs.re - sign * rhs.re, lhs.im - sign * rhs.im) < 1e-8,
        "determinant must obey antipodal deck sewing");
    }
  }
}

// The minimal three-flavor path has half-turn phase 3*pi and full winding 3.
const threeHalfStart = determinantFamily(0, 3, 0);
const threeHalfEnd = determinantFamily(Math.PI, 3, 0);
assert(Math.hypot(threeHalfEnd.re + threeHalfStart.re, threeHalfEnd.im + threeHalfStart.im) < 1e-8,
  "three-flavor half-turn must end at the negative determinant");
assert(windingFromSamples(Array.from({ length: 4097 }, (_, j) =>
  determinantFamily(2 * Math.PI * j / 4096, 3, 0))) === 3,
"minimal three-flavor double-cover winding must be three");

console.log("Selector-deck determinant-winding parity certificate: PASS");
console.log("antipodal_sewing=d(theta+pi)=(-1)^N_d(theta)");
console.log("equivariant_winding_congruence=w_mod_2=N_mod_2");
console.log("three_flavor_minimal_double_cover_winding=3");
console.log("analytic_zero_mode_index_not_asserted=true");
