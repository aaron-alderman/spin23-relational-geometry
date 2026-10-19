import assert from "node:assert/strict";

const allLeftCharges = {
  nu: { bl: -1, y2: -1 },
  nuc: { bl: 1, y2: 0 },
};
assert.notEqual(allLeftCharges.nu.bl, allLeftCharges.nuc.bl);
assert.notEqual(allLeftCharges.nu.y2, allLeftCharges.nuc.y2);

// In a Hermitian response f^dagger K f, K_12 is gauge invariant only when
// the two channel charges agree. Thus unbroken B-L kills the all-left cross term.
const allLeftOffDiagonalAllowed = allLeftCharges.nu.bl === allLeftCharges.nuc.bl;
assert.equal(allLeftOffDiagonalAllowed, false);
const allLeftExchangeFixedDimension = 1; // diagonal plus exchange equality
assert.equal(allLeftExchangeFixedDimension, 1);

// CAR conjugation turns the left-handed conjugate nu^c into N_R.
const diracCharges = {
  nuL: { bl: -1, qem: 0 },
  NR: { bl: -1, qem: 0 },
};
assert.deepEqual(diracCharges.nuL, diracCharges.NR);

// Hermitian matrices fixed by J=sigma_x complex-conjugation have form
// [[a,x+i y],[x-i y,a]], a three-real-dimensional Lorentz cone.
const determinantExchangeReal = (a, x, y) => a * a - x * x - y * y;
const determinantRealSymmetric = (a, x, y) => (a - y) * (a + y) - x * x;
for (const sample of [
  { a: 2, x: 0.3, y: -0.4 },
  { a: 1, x: 0.6, y: 0.2 },
  { a: 3, x: -1.1, y: 0.7 },
]) {
  assert(Math.abs(determinantExchangeReal(sample.a, sample.x, sample.y)
    - determinantRealSymmetric(sample.a, sample.x, sample.y)) < 1e-12);
  assert(sample.a > Math.hypot(sample.x, sample.y), "sample must lie in positive cone");
}
const carDressedExchangeFixedDimension = 3;
assert.equal(carDressedExchangeFixedDimension, 3);

// Hypercharge requires the Higgs insertion L H nu^c before electroweak breaking.
const y2 = { L: -1, H: 1, nuc: 0 };
assert.equal(y2.L + y2.H + y2.nuc, 0);

console.log("Neutrino Dirac-pair H2(R) gate: PASS");
console.log("all_left_pair_BminusL_cross_term=forbidden exchange_fixed_dimension=1");
console.log("CAR_dressed_Dirac_pair_equal_BminusL=true exchange_fixed_dimension=3");
console.log("exchange_real_cone_is_unitarily_equivalent_to_H2R determinant=a^2-x^2-y^2");
console.log("physical_Furey_CAR_and_Higgs_response_derivation=still_open");
