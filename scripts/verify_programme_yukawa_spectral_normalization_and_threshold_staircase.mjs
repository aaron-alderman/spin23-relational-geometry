import assert from "node:assert/strict";

// Wightman convention: rho(q) is the sum over Lorentz-invariant final-state
// phase space.  For a massless Yukawa monomial, the spin sum is s12.
const phaseSpaceMoment = (s) => s ** 2 / (768 * Math.PI ** 3);
function midpointIntegral(s, bins = 200000) {
  const du = s / bins;
  let z = 0;
  for (let i = 0; i < bins; i++) {
    const u = (i + 0.5) * du;
    z += u * (s - u) / (128 * Math.PI ** 3 * s) * du;
  }
  return z;
}
const testS = 37;
assert(Math.abs(midpointIntegral(testS) / phaseSpaceMoment(testS) - 1) < 1e-10);

// Two weak contractions and two charge-conjugate final-state sectors give
// C(s)=4 times the single-component moment. Color remains channel dependent.
const commonC = (s) => s ** 2 / (192 * Math.PI ** 3);
assert(Math.abs(commonC(testS) - 4 * phaseSpaceMoment(testS)) < 1e-15);

// Illustrative broken-phase two-body pseudoscalar weights. Rounded masses are
// declared inputs, not a precision Standard-Model prediction.
const channels = [
  { name: "top", mass: 172.5, multiplicity: 3 },
  { name: "bottom", mass: 4.18, multiplicity: 3 },
  { name: "tau", mass: 1.77686, multiplicity: 1 },
  { name: "Dirac-neutrino", mass: 5e-11, multiplicity: 1 },
];
const weight = ({ mass, multiplicity }, rootS) => {
  if (rootS <= 2 * mass) return 0;
  return multiplicity * mass ** 2 * Math.sqrt(1 - 4 * mass ** 2 / rootS ** 2);
};
const leader = (rootS) => channels
  .map((c) => ({ name: c.name, weight: weight(c, rootS) }))
  .sort((a, b) => b.weight - a.weight)[0];

assert.equal(leader(4).name, "tau");
assert.equal(leader(10).name, "bottom");
assert.equal(leader(100).name, "bottom");
assert.equal(leader(400).name, "top");
assert(weight(channels[0], 300) === 0);
assert(weight(channels[0], 400) / weight(channels[1], 400) > 500);

console.log("PASS Yukawa spectral normalization and threshold staircase");
console.log("massless_single_component_phase_space_moment=s^2/(768*pi^3)");
console.log("massless_common_divergence_factor_with_weak_and_conjugate_multiplicity=s^2/(192*pi^3)");
for (const energy of [4, 10, 100, 400]) {
  const x = leader(energy);
  console.log(`illustrative_leader_at_${energy}GeV=${x.name}; weight=${x.weight}`);
}
console.log("perturbative_staircase=tau -> bottom -> top; low-energy_quark_region_requires_hadronic_spectral_data");
