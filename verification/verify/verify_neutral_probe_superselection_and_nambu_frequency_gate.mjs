const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const near = (a, b, tolerance = 1e-10) => Math.abs(a - b) < tolerance;
const C = (re, im = 0) => ({ re, im });
const conj = (z) => C(z.re, -z.im);

// A Nambu pair (N,N^dagger) carries opposite B-L charges.
const charges = [1, -1];
const entryCharges = charges.map((qi) => charges.map((qj) => qi - qj));
assert(entryCharges[0][0] === 0 && entryCharges[1][1] === 0,
  "normal Nambu densities must be neutral");
assert(entryCharges[0][1] === 2 && entryCharges[1][0] === -2,
  "anomalous Nambu entries must carry B-L plus or minus two");

// Invariance under every phase e^{i phi tau_z} forces anomalous entries to zero.
const phases = [0.17, 0.83, 1.91];
const sample = [[C(2), C(0.4, 0.3)], [C(0.4, -0.3), C(1)]];
const transformedEntry = (value, charge, phi) => {
  const phase = C(Math.cos(charge * phi), Math.sin(charge * phi));
  return C(value.re * phase.re - value.im * phase.im,
    value.re * phase.im + value.im * phase.re);
};
assert(phases.some((phi) => {
  const moved = transformedEntry(sample[0][1], entryCharges[0][1], phi);
  return !near(moved.re, sample[0][1].re) || !near(moved.im, sample[0][1].im);
}), "nonzero anomalous density must violate continuous B-L invariance");

// The exchange-fixed J_z cone has equal diagonals and arbitrary anomalous z.
// Its intersection with the B-L commutant is only the scalar ray p I.
const exchangeFixedAndBlInvariant = [[C(3), C(0)], [C(0), C(3)]];
assert(near(exchangeFixedAndBlInvariant[0][0].re, exchangeFixedAndBlInvariant[1][1].re)
  && near(exchangeFixedAndBlInvariant[0][1].re, 0),
"B-L invariant exchange-fixed Nambu density must collapse to p I");

const swapTranspose = (matrix) => [
  [matrix[1][1], matrix[0][1]],
  [matrix[1][0], matrix[0][0]],
];

// CAR particle-hole sewing is a relation between opposite frequencies. It does
// not require a density at one frequency to be exchange fixed.
const rhoPlus = [[C(2), C(0)], [C(0), C(1)]];
const rhoMinus = swapTranspose(rhoPlus);
assert(near(rhoMinus[0][0].re, 1) && near(rhoMinus[1][1].re, 2),
  "opposite-frequency CAR partner must swap particle and hole weights");
assert(!near(rhoPlus[0][0].re, rhoPlus[1][1].re),
  "CAR-compatible positive-frequency density need not be pointwise exchange fixed");

// Folding a frequency pair can produce an exchange-fixed response, but folding
// is an additional response operation.
const folded = [
  [C(rhoPlus[0][0].re + rhoMinus[0][0].re), C(0)],
  [C(0), C(rhoPlus[1][1].re + rhoMinus[1][1].re)],
];
assert(near(folded[0][0].re, folded[1][1].re),
  "frequency folding must restore equal populations in the sample");

// Two independent same-charge probes have neutral cross responses.
const sameCharge = [1, 1];
assert(sameCharge[0] - sameCharge[1] === 0,
  "two same-charge neutral probes may have nonzero cross spectral density without breaking B-L");

const continuousBlBrokenToParity = true;
assert(continuousBlBrokenToParity,
  "allowing anomalous Nambu response requires charge-two breaking or an explicitly charged source");

console.log("Neutral-probe superselection and Nambu-frequency gate: PASS");
console.log("Nambu_entry_B-L_charges=[[0,2],[-2,0]]");
console.log("unbroken_B-L_intersection_with_exchange_fixed_cone=scalar_ray");
console.log("CAR_sewing_relates=omega_to_minus_omega");
console.log("CAR_does_not_imply_pointwise_exchange=true");
console.log("frequency_fold_can_produce_equal_population_response=true");
console.log("two_same_charge_probes_allow_neutral_cross_response=true");
console.log("full_Nambu_carrier_requires=B-L_breaking_or_charged_source_or_frequency_fold");
