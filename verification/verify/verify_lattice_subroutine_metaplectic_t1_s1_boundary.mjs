import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/lattice-subroutine-metaplectic-t1-s1-boundary-v1.json", import.meta.url),
  "utf8"
));

const mod8 = value => ((value % 8) + 8) % 8;
const key = ({ a, b }) => `${a.join("")};${b.join("")}`;
const even = [];
for (let a1 = 0; a1 < 2; a1 += 1) for (let a2 = 0; a2 < 2; a2 += 1) {
  for (let b1 = 0; b1 < 2; b1 += 1) for (let b2 = 0; b2 < 2; b2 += 1) {
    if ((a1 * b1 + a2 * b2) % 2 === 0) even.push({ a: [a1, a2], b: [b1, b2] });
  }
}
assert.equal(even.length, evidence.expected.evenCharacteristics);
const byKey = new Map(even.map((item, index) => [key(item), index]));

const separatingType = ({ a: [a1, a2], b: [b1, b2] }) =>
  a1 * b1 === 1 && a2 * b2 === 1 ? "odd-odd" : "even-even";

function analyse(name, transform) {
  const image = even.map(item => {
    const { targetCharacteristic, exponent } = transform(item);
    return { target: byKey.get(key(targetCharacteristic)), exponent: mod8(exponent) };
  });
  assert.ok(image.every(item => Number.isInteger(item.target)), `${name} must preserve even characteristics`);

  const visited = new Set();
  const cycles = [];
  for (let start = 0; start < even.length; start += 1) {
    if (visited.has(start)) continue;
    const members = [];
    let current = start;
    let exponent = 0;
    while (!visited.has(current)) {
      visited.add(current);
      members.push(current);
      exponent = mod8(exponent + image[current].exponent);
      current = image[current].target;
    }
    assert.equal(current, start, `${name} image must decompose into cycles`);
    cycles.push({ members, exponent });
  }

  const fixed = cycles.filter(cycle => cycle.members.length === 1);
  const pairs = cycles.filter(cycle => cycle.members.length === 2);
  const permutationExponent = mod8(4 * pairs.length);
  const phaseExponent = mod8(image.reduce((sum, item) => sum + item.exponent, 0));
  return {
    image,
    cycles,
    fixed,
    pairs,
    fixedExponents: fixed.map(cycle => cycle.exponent).sort((a, b) => a - b),
    pairExponents: pairs.map(cycle => cycle.exponent).sort((a, b) => a - b),
    fixedTypes: fixed.map(cycle => separatingType(even[cycle.members[0]])),
    determinantExponent: mod8(permutationExponent + phaseExponent)
  };
}

const T1 = analyse("T1", ({ a: [a1, a2], b: [b1, b2] }) => ({
  targetCharacteristic: { a: [a1, a2], b: [(b1 + a1 + 1) % 2, b2] },
  exponent: a1
}));

const S1 = analyse("S1", ({ a: [a1, a2], b: [b1, b2] }) => ({
  targetCharacteristic: { a: [b1, a2], b: [a1, b2] },
  exponent: 2 * a1 * b1
}));

for (const [name, result] of [["T1", T1], ["S1", S1]]) {
  const expected = evidence.expected[name];
  assert.equal(result.pairs.length, expected.twoCycles);
  assert.equal(result.fixed.length, expected.fixedSectors);
  assert.equal(result.fixedTypes.filter(type => type === "even-even").length, expected.nonvanishingFixedAtSeparation);
  assert.deepEqual(result.pairExponents, expected.twoCycleProducts);
  assert.deepEqual(result.fixedExponents, expected.fixedExponents);
  assert.equal(result.determinantExponent, expected.determinantExponent);
}

const tPair = T1.pairs[0].exponent;
const tInvariants = T1.fixed.map(cycle => mod8(2 * cycle.exponent - tPair)).sort((a, b) => a - b);
assert.deepEqual(tInvariants, evidence.expected.T1.commonPhaseInvariantFixedSquaredOverPair);

const sPair = S1.pairs[0].exponent;
const sEvenFixed = S1.fixed.find(cycle => separatingType(even[cycle.members[0]]) === "even-even");
const sOddFixed = S1.fixed.find(cycle => separatingType(even[cycle.members[0]]) === "odd-odd");
assert.equal(mod8(2 * sEvenFixed.exponent - sPair), evidence.expected.S1.evenFixedSquaredOverPair);
assert.equal(mod8(2 * sOddFixed.exponent - sPair), evidence.expected.S1.oddOddFixedSquaredOverPair);
assert.equal(mod8(sOddFixed.exponent - sEvenFixed.exponent), evidence.expected.S1.oddOddOverEvenFixed);

// A common generator phase lambda=zeta8^k adds k to every edge.  Fixed
// exponents shift by k and two-cycle products by 2k, so these combinations
// must remain unchanged for every possible eighth-root common factor.
for (let k = 0; k < 8; k += 1) {
  for (const fixed of T1.fixed) assert.equal(mod8(2 * (fixed.exponent + k) - (tPair + 2 * k)), 2);
  assert.equal(mod8((sOddFixed.exponent + k) - (sEvenFixed.exponent + k)), 2);
}

console.log(JSON.stringify({
  evenCharacteristics: even.length,
  T1: {
    cycleLengths: T1.cycles.map(cycle => cycle.members.length).sort(),
    fixedExponents: T1.fixedExponents,
    pairExponents: T1.pairExponents,
    determinantExponent: T1.determinantExponent,
    commonPhaseInvariantFixedSquaredOverPair: tInvariants
  },
  S1: {
    cycleLengths: S1.cycles.map(cycle => cycle.members.length).sort(),
    fixedExponents: S1.fixedExponents,
    pairExponents: S1.pairExponents,
    determinantExponent: S1.determinantExponent,
    oddOddOverEvenFixed: mod8(sOddFixed.exponent - sEvenFixed.exponent)
  },
  conclusion: "The free factor has exact relative eighth-root invariants; its absolute generator phase and the complete Monster 2A multiplier remain unfixed."
}, null, 2));
console.log("PASS verify_lattice_subroutine_metaplectic_t1_s1_boundary");
