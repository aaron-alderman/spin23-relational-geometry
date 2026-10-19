import assert from "node:assert/strict";

// Simple real-algebra factors are represented only by the data needed here:
// the number of unital one-dimensional complex *-representations (characters)
// and the rank of the connected central unitary torus.
const factors = {
  C: { characters: 1, centralUnitaryRank: 1 },
  H: { characters: 0, centralUnitaryRank: 0 },
  M3C: { characters: 0, centralUnitaryRank: 1 },
  M2C: { characters: 0, centralUnitaryRank: 1 },
};

const count = (names, key) => names.reduce((sum, name) => sum + factors[name][key], 0);

// A_SM = C + H + M_3(C), and F_C = C^3.
const directSum = ["C", "H", "M3C", "C", "C", "C"];

// Selector replication by R^3 gives three copies of A_SM.
const realSelectorReplication = Array.from({ length: 3 }, () => ["C", "H", "M3C"]).flat();

// For the literal real tensor product with C^3:
// C tensor_R C = C + C;
// H tensor_R C = M_2(C);
// M_3(C) tensor_R C = M_3(C) + M_3(C).
const oneComplexFamilyFactor = ["C", "C", "M2C", "M3C", "M3C"];
const realTensorWithC3 = Array.from({ length: 3 }, () => oneComplexFamilyFactor).flat();

const audit = {
  directSum: {
    algebra: "A_SM direct-sum C^3",
    simpleFactors: directSum,
    complexCharacters: count(directSum, "characters"),
    connectedCentralUnitaryRank: count(directSum, "centralUnitaryRank"),
  },
  realSelectorReplication: {
    algebra: "A_SM tensor_R R^3 = A_SM^3",
    simpleFactors: realSelectorReplication,
    complexCharacters: count(realSelectorReplication, "characters"),
    connectedCentralUnitaryRank: count(realSelectorReplication, "centralUnitaryRank"),
  },
  realTensorWithC3: {
    algebra: "A_SM tensor_R C^3",
    decompositionsUsed: [
      "C tensor_R C = C direct-sum C",
      "H tensor_R C = M_2(C)",
      "M_3(C) tensor_R C = M_3(C) direct-sum M_3(C)",
    ],
    simpleFactors: realTensorWithC3,
    complexCharacters: count(realTensorWithC3, "characters"),
    connectedCentralUnitaryRank: count(realTensorWithC3, "centralUnitaryRank"),
  },
};

assert.equal(audit.directSum.complexCharacters, 4);
assert.equal(audit.realSelectorReplication.complexCharacters, 3);
assert.equal(audit.realTensorWithC3.complexCharacters, 6);
assert.equal(audit.directSum.connectedCentralUnitaryRank, 5);

const result = {
  protocol: "reduced-SM-family-combination-character-trichotomy/1",
  audit,
  exactFourCharacterCarrier: "A_SM direct-sum C^3",
  consequences: {
    directSum: "The internal C can be S and the three added scalar summands can be P,I,N, but this is a genuine algebra enlargement whose crossed bimodules and Dirac connector must be supplied explicitly.",
    replication: "Three selector copies of A_SM provide only three scalar characters, so no independent spectator S exists.",
    realTensor: "A literal real tensor product with C^3 doubles each complex scalar factor and produces six characters, not the four-character toy geometry.",
    abelianBoundary: "The exact-four direct sum has central unitary rank five before representation kernel and unimodularity; one determinant equation alone can remove at most one rank.",
  },
  theorem: "The reduced Standard-Model algebra plus three family selectors realizes the P,I,N,S label set only under the direct-sum construction; neither selector replication nor the literal real tensor product has four characters.",
  boundary: "Character counting does not construct the physical Hilbert bimodules, represented one-forms, junk quotient, gauge-kernel quotient, or anomaly-free spectrum.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
