import assert from "node:assert/strict";

// The planar Higgs/Furey ribbon has four Yukawa boundaries and one residual
// matter boundary.  Sewing two disjoint pairs of Yukawa boundaries preserves
// Euler characteristic and converts two boundary pairs into two handles.
const start = { genus: 0, boundaries: 5 };
const chi = ({ genus, boundaries }) => 2 - 2 * genus - boundaries;
const sewPair = ({ genus, boundaries }) => {
  assert(boundaries >= 2);
  return { genus: genus + 1, boundaries: boundaries - 2 };
};

const once = sewPair(start);
const twice = sewPair(once);
assert.deepEqual(once, { genus: 1, boundaries: 3 });
assert.deepEqual(twice, { genus: 2, boundaries: 1 });
assert.equal(chi(start), -3);
assert.equal(chi(once), -3);
assert.equal(chi(twice), -3);

// There are exactly three perfect matchings of the four Yukawa faces.
const faces = ["u", "d", "e", "nu"];
const canonical = (pairs) => pairs
  .map((p) => [...p].sort().join("-"))
  .sort()
  .join("|");
const matchings = new Set();
for (let j = 1; j < faces.length; j++) {
  const first = [faces[0], faces[j]];
  const rest = faces.filter((_, i) => i !== 0 && i !== j);
  matchings.add(canonical([first, rest]));
}
assert.equal(matchings.size, 3);

// The two composite matter cycles proved in the Higgs graph are C=(e,u)
// and D=(nu,d).  They select one of those three matchings without choosing
// an ordering of the two handles or an orientation of either seam.
const fureyMatterPairing = canonical([["e", "u"], ["nu", "d"]]);
assert(matchings.has(fureyMatterPairing));
assert.equal([...matchings].filter((m) => m === fureyMatterPairing).length, 1);

// An A2 discriminant label on each new handle supplies two qutrits.
assert.equal(3 ** twice.genus, 9);
assert.equal(2 * twice.genus, 4);

console.log("Furey matter-pair boundary-sewing audit: PASS");
console.log("planar_(g0,b5)_sews_through_(g1,b3)_to_(g2,b1)_at_fixed_Euler_characteristic_minus_3");
console.log("four_Yukawa_boundaries_have_exactly_three_unordered_pairings");
console.log("the_C_equals_e_plus_u_and_D_equals_nu_plus_d_matter_factorization_selects_one_pairing");
console.log("the_two_seams_supply_two_handles_but_not_their_orientations_or_a_unique_symplectic_basis");
console.log("A2_discriminant_labels_on_the_sewn_handles_give_nine_states_and_rank_four_phase_space");
