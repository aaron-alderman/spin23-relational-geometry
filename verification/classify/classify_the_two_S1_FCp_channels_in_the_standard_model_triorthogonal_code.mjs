import assert from "node:assert/strict";

const weight = ({ minus = [], plusOnly = null }) => plusOnly === null
  ? Array.from({ length: 5 }, (_, i) => minus.includes(i + 1) ? -1 : 1)
  : Array.from({ length: 5 }, (_, i) => plusOnly === i + 1 ? 1 : -1);

const fields = new Map();
for (let i = 1; i <= 3; i += 1) {
  fields.set(`d_${i}`, weight({ minus: [i, 4] }));
  fields.set(`u_${i}`, weight({ minus: [i, 5] }));
  fields.set(`u^c_${i}`, weight({ minus: [1, 2, 3].filter((j) => j !== i) }));
  fields.set(`d^c_${i}`, weight({ plusOnly: i }));
}
fields.set("nu", weight({ plusOnly: 4 }));
fields.set("e", weight({ plusOnly: 5 }));
fields.set("e^c", weight({ minus: [4, 5] }));
fields.set("nu^c", weight({ minus: [] }));

const add = (...vectors) => Array.from(
  { length: 5 },
  (_, i) => vectors.reduce((sum, vector) => sum + vector[i], 0),
);
const zero = [0, 0, 0, 0, 0];
const equal = (a, b) => a.every((entry, i) => entry === b[i]);
const q = (name) => fields.get(name);
const occupation = (vector) => vector.map((entry) => (1 - entry) / 2);

// SU(5) Cartan rows are (q_i-q_{i+1})/2.  The first sign row may be
// used as a logical row because it evaluates to +1 on the puncture nu^c.
const oddPrimeSyndrome = (names) => {
  const sum = add(...names.map(q));
  return {
    cartan: Array.from({ length: 4 }, (_, i) => (sum[i] - sum[i + 1]) / 2),
    logical: sum[0],
  };
};

// In the binary construction the occupation rows are X stabilizers and the
// all-one word is the logical row after puncturing the empty state.
const binarySyndrome = (names) => {
  const occupations = names.map((name) => occupation(q(name)));
  return {
    occupationParity: Array.from(
      { length: 5 },
      (_, i) => occupations.reduce((sum, vector) => sum + vector[i], 0) % 2,
    ),
    logical: names.length % 2,
  };
};

const terms = [];
for (let i = 1; i <= 3; i += 1) {
  terms.push({
    operator: "Q_ue=(QL)(u^c e^c)",
    weakComponent: "u e",
    names: [`u_${i}`, "e", `u^c_${i}`, "e^c"],
    expected: "Z-stabilizer",
  });
  terms.push({
    operator: "Q_ue=(QL)(u^c e^c)",
    weakComponent: "-d nu",
    names: [`d_${i}`, "nu", `u^c_${i}`, "e^c"],
    expected: "Z-stabilizer",
  });
  terms.push({
    operator: "Q_nud=(QL)(d^c nu^c)",
    weakComponent: "u e",
    names: [`u_${i}`, "e", `d^c_${i}`, "nu^c"],
    expected: "logical-Z",
    family: "scalar charged current",
  });
  terms.push({
    operator: "Q_nud=(QL)(d^c nu^c)",
    weakComponent: "-d nu",
    names: [`d_${i}`, "nu", `d^c_${i}`, "nu^c"],
    expected: "logical-Z",
    family: "down-type Dirac",
  });
}

const classified = terms.map((term) => {
  assert(equal(add(...term.names.map(q)), zero));
  const physicalNames = term.names.filter((name) => name !== "nu^c");
  const odd = oddPrimeSyndrome(physicalNames);
  const binary = binarySyndrome(physicalNames);
  assert(odd.cartan.every((entry) => entry === 0));
  assert(binary.occupationParity.every((entry) => entry === 0));

  const classification = odd.logical === 0 && binary.logical === 0
    ? "Z-stabilizer"
    : odd.logical === -1 && binary.logical === 1
      ? "logical-Z"
      : "unclassified";
  assert.equal(classification, term.expected);
  if (classification === "Z-stabilizer") assert.equal(physicalNames.length, 4);
  if (classification === "logical-Z") assert.equal(physicalNames.length, 3);
  return { ...term, physicalNames, oddPrimeSyndrome: odd, binarySyndrome: binary, classification };
});

const summary = classified.reduce((counts, term) => {
  const key = `${term.operator}:${term.classification}`;
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});
assert.deepEqual(summary, {
  "Q_ue=(QL)(u^c e^c):Z-stabilizer": 6,
  "Q_nud=(QL)(d^c nu^c):logical-Z": 6,
});

const familyCounts = classified
  .filter(({ classification }) => classification === "logical-Z")
  .reduce((counts, { family }) => {
    counts[family] = (counts[family] ?? 0) + 1;
    return counts;
  }, {});
assert.deepEqual(familyCounts, {
  "scalar charged current": 3,
  "down-type Dirac": 3,
});

console.log(JSON.stringify({
  protocol: "S1-FCp-channels-in-punctured-standard-model-triorthogonal-code/1",
  convention: {
    puncture: "nu^c=(+,+,+,+,+)",
    weakSinglet: "epsilon QL = u e - d nu",
    oddPrimeLogicalRow: "first Spin(10) sign coordinate",
    binaryLogicalRow: "punctured all-one word",
  },
  summary,
  logicalFamilies: familyCounts,
  theorem: "The two gauge-allowed S1 exchange channels have different punctured-code grades: Q_ue is logical-neutral, whereas every weak component of Q_nud is a minimum weight-three logical-Z relation.",
  consequence: "The punctured anomaly code cannot protect an exchange symmetry or equal coefficient between the two channels without an additional operation that changes logical grade or moves/restores the puncture.",
  passed: true,
}, null, 2));
