import assert from "node:assert/strict";

const weight = ({ minus = [], plusOnly = null }) => plusOnly === null
  ? Array.from({ length: 5 }, (_, i) => minus.includes(i + 1) ? -1 : 1)
  : Array.from({ length: 5 }, (_, i) => plusOnly === i + 1 ? 1 : -1);

const states = [];
for (let i = 1; i <= 3; i += 1) {
  states.push({ field: `d_${i}`, q: weight({ minus: [i, 4] }) });
  states.push({ field: `u_${i}`, q: weight({ minus: [i, 5] }) });
  states.push({ field: `u^c_${i}`, q: weight({ minus: [1, 2, 3].filter((j) => j !== i) }) });
  states.push({ field: `d^c_${i}`, q: weight({ plusOnly: i }) });
}
states.push({ field: "nu", q: weight({ plusOnly: 4 }) });
states.push({ field: "e", q: weight({ plusOnly: 5 }) });
states.push({ field: "e^c", q: weight({ minus: [4, 5] }) });
states.push({ field: "nu^c", q: weight({ minus: [] }) });

const byWeight = new Map(states.map(({ field, q }) => [q.join(","), field]));
const q = new Map(states.map(({ field, q: vector }) => [field, vector]));
const canonicalSupport = (names) => [...names].sort().join("|");
const canonicalFamily = (supports) => supports.map(canonicalSupport).sort().join(";");

const neutralFamily = [];
const logicalFamily = [];
for (let i = 1; i <= 3; i += 1) {
  neutralFamily.push([`u_${i}`, "e", `u^c_${i}`, "e^c"]);
  neutralFamily.push([`d_${i}`, "nu", `u^c_${i}`, "e^c"]);
  logicalFamily.push([`u_${i}`, "e", `d^c_${i}`, "nu^c"]);
  logicalFamily.push([`d_${i}`, "nu", `d^c_${i}`, "nu^c"]);
}
const logicalKey = canonicalFamily(logicalFamily);

const permutations = (items) => {
  if (items.length === 0) return [[]];
  return items.flatMap((item, i) => permutations(items.filter((_, j) => i !== j)).map((tail) => [item, ...tail]));
};
const coordinatePermutations = permutations([0, 1, 2, 3, 4]);
const evenSignVectors = [];
for (let mask = 0; mask < 32; mask += 1) {
  const signs = Array.from({ length: 5 }, (_, i) => (mask >> i) & 1 ? -1 : 1);
  if (signs.reduce((product, sign) => product * sign, 1) === 1) evenSignVectors.push(signs);
}
assert.equal(coordinatePermutations.length * evenSignVectors.length, 1920);

const act = (vector, permutation, signs) => signs.map((sign, i) => sign * vector[permutation[i]]);
const imageField = (field, permutation, signs) => {
  const image = byWeight.get(act(q.get(field), permutation, signs).join(","));
  assert(image);
  return image;
};

const exchangers = [];
for (const permutation of coordinatePermutations) {
  for (const signs of evenSignVectors) {
    const imageSupports = neutralFamily.map((support) => support.map((field) => imageField(field, permutation, signs)));
    if (canonicalFamily(imageSupports) !== logicalKey) continue;
    const fieldMap = Object.fromEntries(states.map(({ field }) => [field, imageField(field, permutation, signs)]));
    exchangers.push({ permutation: permutation.map((i) => i + 1), signs, fieldMap });
  }
}

assert(exchangers.length > 0);
assert(exchangers.every(({ fieldMap }) => fieldMap["e^c"] === "nu^c"));
assert(exchangers.every(({ fieldMap }) => fieldMap["nu^c"] === "e^c"));
assert.equal(exchangers.filter(({ fieldMap }) => fieldMap["nu^c"] === "nu^c").length, 0);

const weakDoubleFlip = exchangers.find(({ permutation, signs }) =>
  permutation.every((entry, i) => entry === i + 1)
  && signs.join(",") === "1,1,1,-1,-1");
assert(weakDoubleFlip);
for (let i = 1; i <= 3; i += 1) {
  assert.equal(weakDoubleFlip.fieldMap[`u_${i}`], `d_${i}`);
  assert.equal(weakDoubleFlip.fieldMap[`d_${i}`], `u_${i}`);
  assert.equal(weakDoubleFlip.fieldMap[`u^c_${i}`], `d^c_${i}`);
  assert.equal(weakDoubleFlip.fieldMap[`d^c_${i}`], `u^c_${i}`);
}
assert.equal(weakDoubleFlip.fieldMap.e, "nu");
assert.equal(weakDoubleFlip.fieldMap.nu, "e");

// The cleaner representative is the D5 root reflection r_{e4+e5}:
// (q4,q5) -> (-q5,-q4).  It fixes the left-handed weak doublets and
// exchanges the right-handed-conjugate SU(2)_R partners.
const rightIsospinReflection = exchangers.find(({ permutation, signs }) =>
  permutation.join(",") === "1,2,3,5,4"
  && signs.join(",") === "1,1,1,-1,-1");
assert(rightIsospinReflection);
for (let i = 1; i <= 3; i += 1) {
  assert.equal(rightIsospinReflection.fieldMap[`u_${i}`], `u_${i}`);
  assert.equal(rightIsospinReflection.fieldMap[`d_${i}`], `d_${i}`);
  assert.equal(rightIsospinReflection.fieldMap[`u^c_${i}`], `d^c_${i}`);
  assert.equal(rightIsospinReflection.fieldMap[`d^c_${i}`], `u^c_${i}`);
}
assert.equal(rightIsospinReflection.fieldMap.e, "e");
assert.equal(rightIsospinReflection.fieldMap.nu, "nu");
assert.equal(rightIsospinReflection.fieldMap["e^c"], "nu^c");
assert.equal(rightIsospinReflection.fieldMap["nu^c"], "e^c");

const exchangerTypes = exchangers.map(({ permutation, signs }) => ({ permutation, signs }));
const colorTimesWeakPermutation = exchangers.every(({ permutation, signs }) =>
  new Set(permutation.slice(0, 3)).size === 3
  && permutation.slice(0, 3).every((entry) => entry <= 3)
  && new Set(permutation.slice(3)).size === 2
  && permutation.slice(3).every((entry) => entry >= 4)
  && signs.join(",") === "1,1,1,-1,-1");
assert(colorTimesWeakPermutation);
assert.equal(exchangers.length, 12);

console.log(JSON.stringify({
  protocol: "D5-Weyl-exchange-of-S1-FCp-operator-families/1",
  WeylGroupOrder: coordinatePermutations.length * evenSignVectors.length,
  familyExchangerCount: exchangers.length,
  completeClassification: "S3 color-coordinate permutations times S2 weak-coordinate permutations, followed by the weak-coordinate double sign flip",
  exchangerTypes,
  canonicalExchanger: {
    name: "D5 root reflection r_(e4+e5), the SU(2)_R Weyl reflection",
    ...rightIsospinReflection,
  },
  punctureAction: "every exchanger swaps nu^c with e^c; no puncture-fixing exchanger exists",
  consequence: "the complete Spin(10) Weyl system relates the two S1 operator families, but the physical nu^c puncture breaks every such exchange",
  phaseBoundary: "weight permutations fix support and coefficient magnitude only after a Weyl-invariant action is supplied; spin-lift/Clebsch phases are not determined by this enumeration",
  passed: true,
}, null, 2));
