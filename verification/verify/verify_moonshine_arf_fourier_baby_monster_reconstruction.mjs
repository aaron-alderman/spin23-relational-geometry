import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const ledger = load("../../evidence/data/moonshine-arf-fourier-baby-monster-reconstruction-v1.json");
const joined = load("../../evidence/data/moonshine-joined-bridge-map-v1.json");
const free = load("../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json");

const bits = Array.from({ length: 16 }, (_, n) => [
  (n >> 3) & 1,
  (n >> 2) & 1,
  (n >> 1) & 1,
  n & 1,
]);
const add = (x, y) => x.map((entry, i) => entry ^ y[i]);
const arf = ([a1, a2, b1, b2]) => (a1 * b1 + a2 * b2) & 1;
const pairing = ([a1, a2, b1, b2], [c1, c2, d1, d2]) => (
  a1 * d1 + a2 * d2 + b1 * c1 + b2 * c2
) & 1;

const rho = [0, 0, 0, 0];
const A = bits.map((S) => bits.map((t) => (
  ((arf(add(t, rho)) + arf(rho) + pairing(t, S)) & 1) === 0 ? 1 : -1
)));
const gram = A.map((row, i) => A.map((_, j) => (
  row.reduce((sum, entry, k) => sum + entry * A[j][k], 0)
)));

for (let i = 0; i < 16; i += 1) {
  for (let j = 0; j < 16; j += 1) {
    assert.equal(gram[i][j], i === j ? 16 : 0);
  }
}

const even = bits.filter((spin) => arf(spin) === 0);
const odd = bits.filter((spin) => arf(spin) === 1);
assert.equal(even.length, ledger.cohomology.evenSpinStructures);
assert.equal(odd.length, ledger.cohomology.oddSpinStructures);
assert.equal(bits.length, ledger.cohomology.size);
assert.equal(ledger.transform.invertible, true);
assert.equal(ledger.reconstruction.bosonicInputs, 16);
assert.equal(ledger.reconstruction.fermionicOutputs, 16);
assert.equal(ledger.reconstruction.oddZeroTests, odd.length);
assert.equal(ledger.reconstruction.evenBabyMonsterOutputs, even.length);

assert.deepEqual(ledger.commutingPair.rootClasses, joined.order46Junction.fermionicRootClasses);
assert.equal(ledger.commutingPair.rootOrder, joined.order46Junction.rootOrder);
assert.equal(ledger.relationDefect.word, `K=${free.generatorConvention.KWord}`);
assert.deepEqual(ledger.relationDefect.freeCycleHolonomies, ["1", "1", "1"]);
assert.equal(ledger.relationDefect.freeFixedOddOddEigenvalue, "-1");
assert.equal(ledger.sourceStatus.finiteTransformComplete, true);
assert.equal(ledger.sourceStatus.sixteenTwinedMonsterBackgroundAmplitudesKnown, false);
assert.equal(ledger.sourceStatus.babyMonsterKOperatorKnown, true);

console.log(JSON.stringify({
  carrierSize: bits.length,
  evenSpinStructures: even.length,
  oddSpinStructures: odd.length,
  integerGramDiagonal: gram.map((row, i) => row[i]),
  offDiagonalMaximum: Math.max(...gram.flatMap((row, i) => row.filter((_, j) => i !== j).map(Math.abs))),
  transformInvertible: ledger.transform.invertible,
  missingInput: ledger.reconstruction.input,
}, null, 2));
console.log("PASS verify_moonshine_arf_fourier_baby_monster_reconstruction");
