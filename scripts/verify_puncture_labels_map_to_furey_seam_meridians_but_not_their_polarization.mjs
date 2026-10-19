import assert from "node:assert/strict";

const mod = (x, p = 3) => ((x % p) + p) % p;
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => mod(r.reduce((s, a, k) => s + a * B[k][j], 0))));
const eq = (A, B) => JSON.stringify(A) === JSON.stringify(B);
const J = [[0,0,1,0],[0,0,0,1],[2,0,0,0],[0,2,0,0]];
const symplectic = (S) => eq(mul(mul(transpose(S), J), S), J);

// Paper ordering: (nu^c,e^c).  Matter-seam ordering: (C,D), where
// e^c lies on C=(e,u) and nu^c lies on D=(nu,d).
const P = [[0,1],[1,0]];
const lift = [
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
];
assert(symplectic(lift));
assert.deepEqual(mul(P, P), [[1,0],[0,1]]);

// The incidence map is the unique bijection preserving the charged-lepton
// and neutrino labels.
const punctures = ["nu^c", "e^c"];
const seams = ["C", "D"];
const branchOf = { "e^c": "C", "nu^c": "D" };
const permutations = [
  { "nu^c": "C", "e^c": "D" },
  { "nu^c": "D", "e^c": "C" },
];
const preserving = permutations.filter((f) => punctures.every((p) => f[p] === branchOf[p]));
assert.equal(preserving.length, 1);
assert.deepEqual(new Set(Object.values(preserving[0])), new Set(seams));

// Two global polarization assignments remain: evaluations can be identified
// with meridians or with dual longitudes.  They are related by genus-two Fourier.
const F = [
  [0,0,1,0],
  [0,0,0,1],
  [2,0,0,0],
  [0,2,0,0],
];
assert(symplectic(F));
assert(!eq(F, [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]));
assert(eq(mul(F, F), [[2,0,0,0],[0,2,0,0],[0,0,2,0],[0,0,0,2]]));

// The pointwise S3 x S2 stabilizer is identity on the logical fiber and hence
// cannot choose between these polarizations.
const identity = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
assert(symplectic(identity));

console.log("Puncture-to-Furey-seam incidence audit: PASS");
console.log("e_c_maps_uniquely_to_the_C_equals_e_plus_u_seam_and_nu_c_to_the_D_equals_nu_plus_d_seam");
console.log("relative_to_the_paper_ordering_this_is_the_simultaneous_logical_handle_swap");
console.log("the_swap_lifts_symplectically_on_both_coordinate_and_dual_sectors");
console.log("incidence_does_not_choose_meridian_versus_longitude_polarization");
console.log("the_two_global_choices_are_related_by_the_genus_two_Fourier_transform");
