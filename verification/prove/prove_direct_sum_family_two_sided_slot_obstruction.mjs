import assert from "node:assert/strict";

const internal = ["S", "H", "C3col"];
const family = ["P", "I", "N"];
const factors = [...internal, ...family];

const simpleBimodules = factors.flatMap((left) =>
  factors.map((right) => ({ left, right, supports: new Set([left, right]).size })),
);

assert.equal(simpleBimodules.length, factors.length ** 2);
assert.ok(simpleBimodules.every(({ supports }) => supports <= 2));

// Representative physical support pairs. The precise chirality/multiplicity table
// is not needed for the slot theorem: each is already a pair of internal factors.
const physicalPairs = [
  ["H", "S"],
  ["H", "C3col"],
  ["S", "S"],
  ["S", "C3col"],
];

const decorationAudit = physicalPairs.flatMap(([left, right]) =>
  family.map((f) => {
    const desired = [left, right, f];
    const distinct = new Set(desired).size;
    const availableAsSimpleBimodule = distinct <= 2;
    return { physicalPair: `${left}|${right}`, family: f, distinctSupports: distinct, availableAsSimpleBimodule };
  }),
);

const occupiedTwoSlotFailures = decorationAudit.filter(
  ({ physicalPair, availableAsSimpleBimodule }) => physicalPair.split("|")[0] !== physicalPair.split("|")[1] && !availableAsSimpleBimodule,
);

assert.equal(occupiedTwoSlotFailures.length, 3 * 3);

const result = {
  protocol: "direct-sum-family-two-sided-slot-obstruction/1",
  algebraFactors: factors,
  simpleBimoduleCount: simpleBimodules.length,
  maximumDistinctFactorSupportsPerSimpleBimodule: 2,
  decorationAudit,
  occupiedTwoSlotFailures: occupiedTwoSlotFailures.length,
  consequences: {
    directSum: "A new family summand supplies new rows and columns in the Krajewski diagram, not an independent label on every existing internal bimodule.",
    physicalState: "A state already using two distinct internal simple factors cannot also carry P, I, or N in an ordinary simple A-A bimodule.",
    multiplicity: "Leaving family in a multiplicity space preserves the physical gauge pair but restores generation blindness unless a separate represented algebra acts there.",
    exits: [
      "replace one internal support, changing the gauge representation",
      "introduce new crossed/exotic modules",
      "use a tensor/commuting family action, changing the character geometry",
      "use a normalizer, Jordan, groupoid, or higher-correspondence selector",
    ],
  },
  theorem: "For A_SM direct-sum C^3, every simple bimodule has one left and one right factor support. The direct-sum family characters therefore cannot independently decorate an existing physical bimodule whose two internal supports are already occupied.",
  boundary: "Self-pairs use only one distinct internal support and may be relabelled or crossed, but this does not furnish a universal family action on the weak and colored physical sectors.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
