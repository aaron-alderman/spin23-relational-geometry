import assert from "node:assert/strict";

const unbrokenIrreps = [
  { name: "Q_L", dimension: 6, singlets: 0, triplets: 2, antitriplets: 0 },
  { name: "u^c", dimension: 3, singlets: 0, triplets: 0, antitriplets: 1 },
  { name: "d^c", dimension: 3, singlets: 0, triplets: 0, antitriplets: 1 },
  { name: "L_L", dimension: 2, singlets: 2, triplets: 0, antitriplets: 0 },
  { name: "e^c", dimension: 1, singlets: 1, triplets: 0, antitriplets: 0 },
  { name: "nu^c", dimension: 1, singlets: 1, triplets: 0, antitriplets: 0 }
];
const subsets = (xs) => Array.from({ length: 1 << xs.length }, (_, mask) =>
  xs.filter((_, i) => (mask >> i) & 1));
const sum = (xs, key) => xs.reduce((s, x) => s + x[key], 0);
const octonionPattern = (xs) =>
  sum(xs, "dimension") === 8 &&
  sum(xs, "singlets") === 2 &&
  sum(xs, "triplets") === 1 &&
  sum(xs, "antitriplets") === 1;
const unbrokenOctonionSubmodules = subsets(unbrokenIrreps).filter(octonionPattern);
assert.equal(unbrokenOctonionSubmodules.length, 0);

const sectors = [
  { name: "nu", color: "1", q: 0, channel: "up" },
  { name: "nu^c", color: "1", q: 0, channel: "up" },
  { name: "e", color: "1", q: -1, channel: "down" },
  { name: "e^c", color: "1", q: 1, channel: "down" },
  { name: "u", color: "3", q: 2 / 3, channel: "up" },
  { name: "u^c", color: "3bar", q: -2 / 3, channel: "up" },
  { name: "d", color: "3", q: -1 / 3, channel: "down" },
  { name: "d^c", color: "3bar", q: 1 / 3, channel: "down" }
];
const brokenCandidates = subsets(sectors).filter((xs) =>
  xs.length === 4 &&
  xs.filter((x) => x.color === "1").length === 2 &&
  xs.filter((x) => x.color === "3").length === 1 &&
  xs.filter((x) => x.color === "3bar").length === 1);
assert.equal(brokenCandidates.length, 24);

const chargeConjugationClosed = (xs) => {
  const signatures = xs.map((x) => x.color + ":" + x.q).sort();
  const conjugates = xs.map((x) => {
    const color = x.color === "3" ? "3bar" : x.color === "3bar" ? "3" : "1";
    return color + ":" + (-x.q);
  }).sort();
  return JSON.stringify(signatures) === JSON.stringify(conjugates);
};
const ccClosed = brokenCandidates.filter(chargeConjugationClosed);
assert.equal(ccClosed.length, 4);

const channelHomogeneous = (xs) => xs.every((x) => x.channel === xs[0].channel);
const higgsSelected = ccClosed.filter(channelHomogeneous);
assert.equal(higgsSelected.length, 2);
const names = higgsSelected.map((xs) => xs.map((x) => x.name).sort().join(",")).sort();
assert.deepEqual(names, [
  ["d", "d^c", "e", "e^c"].sort().join(","),
  ["nu", "nu^c", "u", "u^c"].sort().join(",")
].sort());

for (const xs of higgsSelected) {
  const dim = xs.reduce((s, x) => s + (x.color === "1" ? 1 : 3), 0);
  assert.equal(dim, 8);
}
const selectedUnion = new Set(higgsSelected.flat().map((x) => x.name));
assert.equal(selectedUnion.size, 8);

console.log(JSON.stringify({
  protocol: "higgs-channels-select-crossed-octonion-shaped-sm-modules/1",
  unbrokenGaugeGroup: "SU(3)_c x SU(2)_L x U(1)_Y",
  unbrokenOctonionShapedEightDimensionalSubmodules: unbrokenOctonionSubmodules.length,
  brokenGaugeGroup: "SU(3)_c x U(1)_em",
  rawOctonionShapedSectorChoices: brokenCandidates.length,
  chargeConjugationClosedChoices: ccClosed.map((xs) => xs.map((x) => x.name)),
  higgsChannelHomogeneousChoices: higgsSelected.map((xs) => ({
    channel: xs[0].channel,
    sectors: xs.map((x) => x.name),
    module: "1 + 1 + 3 + 3bar"
  })),
  uniqueComplementaryPartition: ["{nu,nu^c,u,u^c}", "{e,e^c,d,d^c}"],
  interpretation: "the Higgs frame selects crossed up/neutral and down/charged octonion-shaped modules, not the Prakash-Ramya left/right Dirac faces",
  passed: true
}, null, 2));
