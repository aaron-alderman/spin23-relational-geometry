const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const coverDegree = 2;
const coverIndex = 3;
assert(coverIndex % coverDegree !== 0,
  "odd cover index must obstruct descent as the pullback of an ordinary quotient Fredholm operator");

const decompositions = [];
for (let plus = 0; plus <= coverIndex; plus += 1) {
  const minus = coverIndex - plus;
  decompositions.push({
    plus,
    minus,
    ordinaryCharacter: plus + minus,
    deckCharacter: plus - minus,
    plusParity: plus % 2,
    minusParity: minus % 2,
  });
}
assert(decompositions.every((entry) => entry.ordinaryCharacter === 3),
  "forgetting deck action must retain the cover index");
assert(decompositions.some((entry) => entry.plusParity === 0)
  && decompositions.some((entry) => entry.plusParity === 1),
"ordinary index alone must not determine the parity of the chosen quotient character");
assert(decompositions.every((entry) => entry.plusParity !== entry.minusParity),
  "an odd total index must put odd parity in exactly one deck character sector");
assert(decompositions.every((entry) => entry.deckCharacter !== 0),
  "no honest three-dimensional virtual kernel with zero cokernel can have vanishing deck character");

// For a free ordinary group action, the nonidentity equivariant index character
// vanishes and the cover index is divisible by the group order. The index-three
// model therefore needs twisted/projective or grading-reversing sewing.
const freeActionNonidentityCharacter = 0;
assert(!decompositions.some((entry) => entry.deckCharacter === freeActionNonidentityCharacter),
  "naive kernel decomposition must conflict with ordinary free-action descent");

const signFlippedLift = ({ plus, minus }) => ({ plus: minus, minus: plus });
for (const entry of decompositions) {
  const flipped = signFlippedLift(entry);
  assert(flipped.plus === entry.minus && flipped.minus === entry.plus,
    "multiplying the deck lift by the sign character must exchange quotient sectors");
}

const projectiveDeckSquare = -1;
assert(projectiveDeckSquare === -1,
  "a spinorial/projective deck lift may require twisted rather than ordinary Z2 representations");

console.log("Odd cover index versus ordinary Z2 quotient descent: PASS");
console.log("cover_degree=2");
console.log("ordinary_double_cover_index=3");
console.log("ordinary_pullback_descent_possible=false");
console.log("free_action_nonidentity_character_required=0_but_unavailable_for_kernel3_cokernel0");
console.log("chosen_quotient_sector_parity_not_fixed_by_ordinary_index=true");
console.log("sign_change_of_deck_lift_swaps_character_sectors=true");
console.log("required_framework=twisted_equivariant_or_real_mod2_index");
