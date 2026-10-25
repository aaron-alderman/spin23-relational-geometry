import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const seam = load("../../evidence/data/moonshine-relation-defect-seam-permutation-v1.json");
const relation = load("../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json");
const eta = load("../../evidence/data/moonshine-dedekind-eta-relation-phase-v1.json");
const freeMajorana = load("../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json");

const multiply2 = (a, b) => a.map((row, i) => row.map((_, j) => (
  a[i][0] * b[0][j] + a[i][1] * b[1][j]
) % 2));
const identity2 = [[1, 0], [0, 1]];
const k2 = seam.relationDefect.modulo2;
assert.notDeepEqual(k2, identity2);
assert.deepEqual(multiply2(multiply2(k2, k2), k2), identity2);
assert.equal(seam.relationDefect.orderModulo2, 3);
assert.deepEqual(seam.relationDefect.modulo23, relation.relationDefect.KModulo23);

const characteristics = [];
for (let a1 = 0; a1 < 2; a1 += 1) {
  for (let a2 = 0; a2 < 2; a2 += 1) {
    for (let b1 = 0; b1 < 2; b1 += 1) {
      for (let b2 = 0; b2 < 2; b2 += 1) {
        if ((a1 * b1 + a2 * b2) % 2 === 0) characteristics.push([a1, a2, b1, b2]);
      }
    }
  }
}
const label = ([a1, a2, b1, b2]) => String(a1) + String(a2) + "|" + String(b1) + String(b2);
assert.deepEqual(characteristics.map(label), seam.evenCharacteristics);

const A = [[1, 0], [0, 1]];
const B = [[1, 0], [0, 0]];
const C = [[1, 0], [0, 0]];
const D = [[0, 0], [0, 1]];
const diagCD = [0, 0];
const diagAB = [1, 0];
const act = ([a1, a2, b1, b2]) => {
  const a = [a1, a2];
  const b = [b1, b2];
  const nextA = [0, 1].map((i) => (
    D[i][0] * a[0] + D[i][1] * a[1] +
    C[i][0] * b[0] + C[i][1] * b[1] + diagCD[i]
  ) % 2);
  const nextB = [0, 1].map((i) => (
    B[i][0] * a[0] + B[i][1] * a[1] +
    A[i][0] * b[0] + A[i][1] * b[1] + diagAB[i]
  ) % 2);
  return [...nextA, ...nextB];
};

const index = new Map(characteristics.map((entry, i) => [label(entry), i]));
const permutation = characteristics.map((entry) => index.get(label(act(entry))));
const seen = new Set();
const cycles = [];
for (let start = 0; start < permutation.length; start += 1) {
  if (seen.has(start)) continue;
  const cycle = [];
  let cursor = start;
  while (!seen.has(cursor)) {
    seen.add(cursor);
    cycle.push(seam.evenCharacteristics[cursor]);
    cursor = permutation[cursor];
  }
  cycles.push(cycle);
}

assert.deepEqual(cycles, seam.cycles);
assert.deepEqual(cycles.map((cycle) => cycle.length), seam.cycleType);
assert.equal(cycles.reduce((sum, cycle) => sum + Math.max(0, cycle.length - 1), 0) % 2, 0);
assert.equal(seam.quotients.permutationSign, 1);
assert.equal(seam.quotients.determinantLineDetectsK, false);
assert.equal(seam.quotients.level2SectorVectorDetectsK, true);
assert.equal(seam.quotients.etaPhase, eta.relationDefect.phase);
assert.equal(seam.operatorTarget.scalarEtaMatchNecessaryButSufficient, false);
assert.equal(seam.operatorTarget.freeMajoranaPhaseMatrixKnown, true);
assert.deepEqual(seam.operatorTarget.freeMajoranaEtaNormalizedCycleProducts, ["1", "1", "1"]);
assert.equal(seam.operatorTarget.freeMajoranaFixedOddOddEigenvalue, "-1");
assert.equal(seam.operatorTarget.freeMajoranaDeterminant, freeMajorana.etaNormalizedCycleData.determinant);
assert.equal(seam.operatorTarget.monsterSewnDefectActionKnown, false);

console.log(JSON.stringify({
  Kmod23: "identity",
  Kmod2: seam.relationDefect.modulo2,
  characteristicCycleType: seam.cycleType,
  fixedCharacteristic: seam.fixedCharacteristic,
  permutationSign: seam.quotients.permutationSign,
  etaPhase: seam.quotients.etaPhase,
  nextOperator: seam.operatorTarget.form,
}, null, 2));
console.log("PASS verify_moonshine_relation_defect_seam_permutation");
