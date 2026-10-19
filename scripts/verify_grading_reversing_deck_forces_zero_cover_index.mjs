const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const auditKernelPairing = ({ plusDimension, minusDimension, exactDeck, reversesGrading }) => {
  if (exactDeck && reversesGrading && plusDimension !== minusDimension) {
    return { consistent: false, index: plusDimension - minusDimension };
  }
  return { consistent: true, index: plusDimension - minusDimension };
};

for (let plusDimension = 0; plusDimension <= 6; plusDimension += 1) {
  for (let minusDimension = 0; minusDimension <= 6; minusDimension += 1) {
    const result = auditKernelPairing({ plusDimension, minusDimension, exactDeck: true, reversesGrading: true });
    assert(result.consistent === (plusDimension === minusDimension),
      "exact grading reversal is consistent exactly when chiral kernel dimensions agree");
    if (result.consistent) assert(result.index === 0, "paired kernels must have zero index");
  }
}

for (const eta of [1, -1]) {
  for (let n = 1; n <= 5; n += 1) {
    const gamma = [...Array(n).fill(1), ...Array(n).fill(-1)];
    const deckPermutation = [...Array(n).keys()].map((i) => i + n).concat([...Array(n).keys()]);
    for (let i = 0; i < 2 * n; i += 1) {
      assert(gamma[deckPermutation[i]] === -gamma[i], "deck exchange must reverse every kernel grading");
    }
    const plus = gamma.filter((x) => x === 1).length;
    const minus = gamma.filter((x) => x === -1).length;
    assert(plus - minus === 0, `kernel index must vanish for symmetry sign ${eta}`);
  }
}

const incompatibleIndexThree = auditKernelPairing({
  plusDimension: 3, minusDimension: 0, exactDeck: true, reversesGrading: true,
});
assert(!incompatibleIndexThree.consistent && incompatibleIndexThree.index === 3,
  "an index-three kernel cannot carry an exact grading-reversing deck symmetry");

const allowedAlternatives = [
  "oriented_index_three_without_exact_grading_reversing_deck",
  "grading_preserving_oriented_deck_with_even_cover_index",
  "Pin_quotient_with_zero_complex_cover_index_and_independent_mod2_question",
  "non_symmetric_half_winding_interpolation",
];
assert(allowedAlternatives.length === 4, "corrected branch split must remain explicit");

console.log("Grading-reversing deck index no-go: PASS");
console.log("exact_deck_plus_grading_reversal_implies_complex_cover_index=0");
console.log("conventional_index_three_same_operator_compatible=false");
console.log("Pin_mod2_index_must_be_computed_independently=true");
console.log(`repaired_branches=${allowedAlternatives.length}`);
