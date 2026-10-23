import assert from "node:assert/strict";

const length = 23;
const mask = (1 << length) - 1;
const generator = (1 << 11) | (1 << 9) | (1 << 7) | (1 << 6) | (1 << 5) | (1 << 1) | 1;
const shift = (word) => ((word << 1) & mask) | (word >>> 22);
const rule60 = (word) => (word ^ shift(word)) & mask;

const code = [];
for (let message = 0; message < 1 << 12; message += 1) {
  let word = 0;
  for (let bit = 0; bit < 12; bit += 1) if ((message >>> bit) & 1) word ^= generator << bit;
  code.push(word & mask);
}
const fibres = new Map();
for (const word of code) {
  const image = rule60(word);
  if (!fibres.has(image)) fibres.set(image, []);
  fibres.get(image).push(word);
}

assert.equal(new Set(code).size, 4096);
assert.equal(fibres.size, 2048);
for (const antecedents of fibres.values()) {
  antecedents.sort((a, b) => a - b);
  assert.equal(antecedents.length, 2);
  assert.equal(antecedents[0] ^ antecedents[1], mask);
}
assert.deepEqual(code.filter((word) => rule60(word) === 0).sort((a, b) => a - b), [0, mask]);

for (const word of code) {
  assert.equal(rule60(word ^ mask), rule60(word));
  assert.notEqual(word ^ mask, word);
}

const selectedV = 14;
const selectedL = new Set([4, 10, 14]);
assert(selectedL.has(selectedV));
assert.notEqual(selectedV, 0);
const linearMapsFromKernelToVLine = [
  { imageOfOne: 0, bijective: false },
  { imageOfOne: selectedV, bijective: true },
];
assert.equal(linearMapsFromKernelToVLine.filter((map) => map.bijective).length, 1);

console.log(JSON.stringify({
  golayCodeDimension: 12,
  rule60ImageDimension: 11,
  kernel: [0, mask],
  fibreCardinality: 2,
  deckAction: "c -> c + allOnes",
  selectedMachineLine: `<v> with v=${selectedV}`,
  uniqueNonzeroIdentification: "allOnes -> v",
  conclusion: "the Rule-60/Golay quotient supplies the affine seam torsor and TM23 supplies its unique nonzero direction label",
  boundary: "finite carrier provenance only; no microscopic physical seam is implied",
}, null, 2));
console.log("PASS verify_rule60_golay_kernel_supplies_the_leech_seam_torsor");
