import { analyse } from "./explore_pin_half_line_quotient.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

for (const parameters of [
  { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0 },
  { L: 3, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0.3 },
  { L: 2, M: 3, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0.3 },
]) for (const sectorSign of [1, -1]) {
  const result = analyse(parameters, { sectorSign });
  assert(result.dimension === 8 * parameters.L * (2 * parameters.M + 1),
    "explicit glide-orbit basis must have the exact sector dimension");
  assert(result.identityError < 1e-12 && result.glideError < 1e-12,
    "explicit orbit basis must be orthonormal and lie in the requested glide sector");
  assert(result.radialDiagonalError < 1e-12,
    "the quotient radius must be exactly diagonal in the orbit basis");
  assert(result.fiberMultiplicities[0].dimension === 8 * parameters.L,
    "radius-zero fiber must have dimension 8L");
  for (const fiber of result.fiberMultiplicities.slice(1)) assert(fiber.dimension === 16 * parameters.L,
    "each positive-radius fiber must have dimension 16L");
  assert(result.referenceLongRangeCoupling === 0 && result.defectLongRangeCoupling === 0,
    "quotient Hamiltonians must be nearest-neighbor block Jacobi operators in radius");
  assert(result.explicitReference.sign === result.numericalReference.sign
    && result.explicitDefect.sign === result.numericalDefect.sign,
  "explicit-orbit and numerical-sector localizer signs must agree");
  assert(Math.abs(result.explicitReference.logAbs - result.numericalReference.logAbs) < 1e-10
    && Math.abs(result.explicitDefect.logAbs - result.numericalDefect.logAbs) < 1e-10,
  "explicit-orbit and numerical-sector determinant magnitudes must agree");
  assert(result.explicitReference.sign === 1 && result.explicitDefect.sign === -1,
    "the exact half-line relative radial marker must be nontrivial in both deck sectors for the tested cases");
}

console.log("Pin glide sector exact radial half-line reduction: PASS");
console.log("radius_zero_fiber_dimension=8L");
console.log("positive_radius_fiber_dimension=16L");
console.log("radial_hamiltonian_range=nearest_neighbor");
console.log("explicit_orbit_basis_matches_numerical_sector_basis=true");
console.log("both_deck_sectors_relative_radial_marker=-1");

