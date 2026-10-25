import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/rodin-coil-mod9-orbit-audit-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

assert.equal(evidence.schemaVersion, "rodin-coil-mod9-orbit-audit-v1");

function orbit(start, multiplier, modulus) {
  const values = [];
  const seen = new Set();
  let value = start % modulus;
  while (!seen.has(value)) {
    seen.add(value);
    values.push(value);
    value = (multiplier * value) % modulus;
  }
  assert.equal(value, values[0]);
  return values;
}

const mod9Orbits = [orbit(0, 2, 9), orbit(1, 2, 9), orbit(3, 2, 9)];
assert.deepEqual(mod9Orbits, evidence.orbits);
assert.deepEqual(mod9Orbits[1], [1, 2, 4, 8, 7, 5]);
assert.deepEqual(mod9Orbits[2], [3, 6]);
assert.deepEqual(mod9Orbits[0], [0]);

const allResidues = new Set(mod9Orbits.flat());
assert.deepEqual([...allResidues].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8]);

const reverse = (values) => [...values].reverse();
const rotateLeft = (values, places) => [
  ...values.slice(places),
  ...values.slice(0, places),
];
const doubledGridTraversal = [...reverse(evidence.gridWord), ...evidence.gridWord];
assert.deepEqual(rotateLeft(doubledGridTraversal, 1), evidence.postedNexus);
assert.deepEqual(reverse(evidence.postedNexus), evidence.postedNexusReverse);

const counts = new Map();
for (const digit of evidence.postedNexus) {
  counts.set(digit, (counts.get(digit) ?? 0) + 1);
}
assert.deepEqual([...counts.entries()].sort((a, b) => a[0] - b[0]), [
  [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
  [6, 2], [7, 2], [8, 2], [9, 2],
]);

for (const control of evidence.baseChangeControls) {
  assert.equal(control.modulus, control.base - 1);
  assert.deepEqual(orbit(1, 2, control.modulus), control.orbitFromOne);
}
assert.notEqual(
  evidence.baseChangeControls[0].orbitFromOne.length,
  evidence.baseChangeControls[1].orbitFromOne.length,
);
assert.notEqual(
  evidence.baseChangeControls[1].orbitFromOne.length,
  evidence.baseChangeControls[2].orbitFromOne.length,
);

console.log(JSON.stringify({
  status: "PASS",
  mod9Orbits,
  nexus: {
    length: evidence.postedNexus.length,
    eachDisplayedDigitAppearsTwice: true,
    construction: evidence.nexusClassification,
  },
  baseOrbitPeriods: Object.fromEntries(
    evidence.baseChangeControls.map((control) => [control.base, control.orbitFromOne.length]),
  ),
  verdict: evidence.verdict,
}));
