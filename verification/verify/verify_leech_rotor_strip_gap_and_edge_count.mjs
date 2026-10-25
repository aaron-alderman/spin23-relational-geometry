import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-rotor-strip-gap-and-edge-count-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-rotor-strip-gap-and-edge-count-v1");
const channels = record.idealStrip.channels;
const localGap = record.idealStrip.singlePendulumGap;
assert.equal(channels, 24);
assert.equal(record.idealStrip.modesPerWire, 2 * channels);

const modeKey = (wire, chirality, channel) => wire + ":" + chirality + ":" + channel;
const compilePairing = (wires, periodic) => {
  const used = new Set();
  const pairs = [];
  const bonds = periodic ? wires : wires - 1;
  for (let wire = 0; wire < bonds; wire += 1) {
    const next = (wire + 1) % wires;
    for (let channel = 0; channel < channels; channel += 1) {
      const right = modeKey(wire, "R", channel);
      const left = modeKey(next, "L", channel);
      assert.equal(used.has(right), false, "right endpoint reused");
      assert.equal(used.has(left), false, "left endpoint reused");
      used.add(right);
      used.add(left);
      pairs.push([right, left]);
    }
  }
  const all = [];
  for (let wire = 0; wire < wires; wire += 1) {
    for (const chirality of ["L", "R"]) {
      for (let channel = 0; channel < channels; channel += 1) {
        all.push(modeKey(wire, chirality, channel));
      }
    }
  }
  return {pairs, unused: all.filter((mode) => !used.has(mode)), total: all.length};
};

const pendulumSpectrum = (N) => {
  const diagonal = Array.from({length: 2 * N + 1}, (_, i) => {
    const momentum = i - N;
    return momentum ** 2 / 2 + 1;
  });
  const dimension = diagonal.length;
  const countBelow = (x) => {
    let pivot = diagonal[0] - x;
    let count = pivot < 0 ? 1 : 0;
    for (let i = 1; i < dimension; i += 1) {
      if (Math.abs(pivot) < 1e-14) pivot = pivot < 0 ? -1e-14 : 1e-14;
      pivot = diagonal[i] - x - 0.25 / pivot;
      if (pivot < 0) count += 1;
    }
    return count;
  };
  return Array.from({length: dimension}, (_, k) => {
    let lower = -1;
    let upper = diagonal.at(-1) + 2;
    for (let iteration = 0; iteration < 120; iteration += 1) {
      const midpoint = (lower + upper) / 2;
      if (countBelow(midpoint) <= k) lower = midpoint;
      else upper = midpoint;
    }
    return (lower + upper) / 2;
  });
};
const spectrum = pendulumSpectrum(record.idealStrip.localPendulumCutoff);
const calculatedGap = spectrum[1] - spectrum[0];
assert.ok(Math.abs(calculatedGap - localGap) < 2e-12);

const targetFailure = 0.01;
const failureProbability = (beta, pendula) => {
  const ground = spectrum[0];
  const z = spectrum.reduce((sum, energy) => sum + Math.exp(-beta * (energy - ground)), 0);
  return 1 - (1 / z) ** pendula;
};
const betaThreshold = (pendula) => {
  let lower = 0;
  let upper = 40;
  for (let iteration = 0; iteration < 80; iteration += 1) {
    const midpoint = (lower + upper) / 2;
    if (failureProbability(midpoint, pendula) > targetFailure) lower = midpoint;
    else upper = midpoint;
  }
  return upper;
};
const boltzmann = 1.380649e-23;
const planck = 6.62607015e-34;
const tenMilliKelvinGHz = boltzmann * 0.010 / planck / 1e9;

for (const rung of record.openStripLadder) {
  const pairing = compilePairing(rung.wires, false);
  assert.equal(pairing.total, rung.totalChiralModes);
  assert.equal(pairing.pairs.length, rung.bulkPendula);
  assert.equal(2 * pairing.pairs.length, rung.gappedChiralModes);
  assert.equal(pairing.unused.length, rung.edgeModes);
  assert.equal(rung.edgeModes, 2 * channels);
  const expectedEdges = [
    ...Array.from({length: channels}, (_, i) => modeKey(0, "L", i)),
    ...Array.from({length: channels}, (_, i) => modeKey(rung.wires - 1, "R", i))
  ].sort();
  assert.deepEqual(pairing.unused.sort(), expectedEdges);
  const beta = betaThreshold(rung.bulkPendula);
  assert.ok(Math.abs(beta - rung.betaEnergyUnitForOnePercentAnyBulkExcitation) < 2e-11);
  assert.ok(Math.abs(beta * tenMilliKelvinGHz - rung.minimumEnergyUnitGHzAt10mK) < 2e-12);
}

for (const check of record.periodicChecks) {
  const pairing = compilePairing(check.wires, true);
  assert.equal(pairing.pairs.length, check.bulkPendula);
  assert.equal(2 * pairing.pairs.length, check.gappedChiralModes);
  assert.equal(pairing.unused.length, check.edgeModes);
  assert.equal(check.edgeModes, 0);
}

for (const bound of record.finiteDevicePerturbationBounds) {
  const expected = localGap * (1 - 2 * bound.globalNormOverGap);
  assert.ok(Math.abs(expected - bound.certifiedGapLowerBound) < 2e-12);
  assert.ok(expected > 0);
}

console.log(JSON.stringify({
  status: "PASS",
  channels,
  localGap,
  openStrip: record.openStripLadder.map((rung) => ({
    wires: rung.wires,
    bulkPendula: rung.bulkPendula,
    edgeModes: rung.edgeModes,
    betaEnergyUnit: rung.betaEnergyUnitForOnePercentAnyBulkExcitation
  })),
  periodicEdgeModes: 0,
  boundary: record.boundary
}));
