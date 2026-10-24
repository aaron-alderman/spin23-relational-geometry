import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/lattice-subroutine-metaplectic-phase-candidate-v1.json", import.meta.url),
  "utf8"
));

const key = ({ a, b }) => `${a.join("")};${b.join("")}`;
const even = [];
for (let a1 = 0; a1 < 2; a1 += 1) for (let a2 = 0; a2 < 2; a2 += 1) {
  for (let b1 = 0; b1 < 2; b1 += 1) for (let b2 = 0; b2 < 2; b2 += 1) {
    if ((a1 * b1 + a2 * b2) % 2 === 0) even.push({ a: [a1, a2], b: [b1, b2] });
  }
}
assert.equal(even.length, evidence.expected.evenCharacteristics);
const byKey = new Map(even.map((item, index) => [key(item), index]));
const image = even.map(({ a: [a1, a2], b: [b1, b2] }) => ({
  target: byKey.get(key({ a: [a1, a2], b: [(b1 + a1 + 1) % 2, b2] })),
  phase: a1 === 1 ? Math.PI / 4 : 0
}));
assert.ok(image.every(item => Number.isInteger(item.target)));

const visited = new Set();
const cycles = [];
for (let start = 0; start < even.length; start += 1) {
  if (visited.has(start)) continue;
  const members = [];
  let current = start;
  let phase = 0;
  while (!visited.has(current)) {
    visited.add(current);
    members.push(current);
    phase += image[current].phase;
    current = image[current].target;
  }
  assert.equal(current, start);
  cycles.push({ members, phase });
}

const fixed = cycles.filter(cycle => cycle.members.length === 1);
const pairs = cycles.filter(cycle => cycle.members.length === 2);
assert.equal(fixed.length, evidence.expected.fixedSectors);
assert.equal(pairs.length, evidence.expected.twoCycles);
assert.ok(fixed.every(cycle => Math.abs(cycle.phase - Math.PI / 4) < 1e-14));
assert.ok(pairs.every(cycle => Math.abs(cycle.phase) < 1e-14));

const separatingType = ({ a: [a1, a2], b: [b1, b2] }) => {
  const firstOdd = a1 * b1 === 1;
  const secondOdd = a2 * b2 === 1;
  return firstOdd && secondOdd ? "odd-odd" : "even-even";
};
const fixedTypes = fixed.map(cycle => separatingType(even[cycle.members[0]]));
assert.equal(fixedTypes.filter(type => type === "even-even").length, evidence.expected.nonvanishingFixedAtSeparation);
assert.equal(fixedTypes.filter(type => type === "odd-odd").length, 1);

const permutationDeterminant = (-1) ** pairs.length;
const totalPhase = image.reduce((sum, item) => sum + item.phase, 0);
const phaseProduct = Math.cos(totalPhase);
const monomialDeterminant = permutationDeterminant * phaseProduct;
assert.equal(permutationDeterminant, evidence.expected.permutationDeterminant);
assert.ok(Math.abs(phaseProduct - evidence.expected.phaseProduct) < 1e-14);
assert.ok(Math.abs(monomialDeterminant - evidence.expected.monomialDeterminant) < 1e-14);

console.log(JSON.stringify({
  evenCharacteristics: even.length,
  cycleLengths: cycles.map(cycle => cycle.members.length).sort(),
  fixedSectorTypes: fixedTypes,
  fixedPhase: "pi/4",
  permutationDeterminant,
  phaseProduct,
  monomialDeterminant,
  conclusion: "The vector action retains an eighth-root phase that cancels in its determinant."
}, null, 2));
console.log("PASS verify_lattice_subroutine_metaplectic_phase_candidate");
