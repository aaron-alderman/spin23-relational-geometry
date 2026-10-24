import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(await readFile(resolve(root, "evidence/data/yukawa-threshold-singular-spectrum-v1.json"), "utf8"));
const at = energy => data.spectra.find(row => row.rootSGeV === energy);

assert.equal(data.protocol, "yukawa-threshold-singular-spectrum/1");
assert.deepEqual(data.coordinateOrder, ["v_u", "v_d", "v_e", "v_nu"]);
assert.match(data.thresholdModel.limitations.join(" "), /weak-anomaly coordinate/);
const high = data.highEnergyFiveCoordinateBenchmark;
assert.equal(high.coordinateMetric.length, 5);
assert.equal(high.coordinateMetric[4].length, 5);
assert(Math.abs(high.anomalyWeightInCommonYukawaUnits - (9 / (64 * Math.PI ** 2)) * 0.65 ** 4) < 1e-15);
assert.equal(high.generalizedEigenvaluesDescending.filter(x => x > 1e-20).length, 4);
assert.equal(high.effectiveRanks["0.01"], 1);
assert.equal(high.effectiveRanks["0.001"], 2);
assert(high.relativeSpectrum[1] > 1e-3 && high.relativeSpectrum[1] < 2e-3);
assert.match(high.primaryReference, /2209\.13804/);

assert.deepEqual(at(4).openChannels, ["tau", "Dirac-neutrino"]);
assert.equal(at(4).exactYukawaRank, 2);
assert.equal(at(4).effectiveRanks["0.01"], 1);
assert.deepEqual(at(10).openChannels, ["bottom", "tau", "Dirac-neutrino"]);
assert.equal(at(10).exactYukawaRank, 3);
assert.equal(at(10).effectiveRanks["0.01"], 2);
assert.equal(at(100).effectiveRanks["0.01"], 2);
assert.equal(at(300).openChannels.includes("top"), false);
assert.deepEqual(at(400).openChannels, ["top", "bottom", "tau", "Dirac-neutrino"]);
assert.equal(at(400).exactYukawaRank, 4);
assert.equal(at(400).effectiveRanks["0.001"], 1);
assert(at(400).relativeSpectrum[1] < 1e-3);
assert(at(400).leadingChannelVector.v_u ** 2 > 0.999);

for (const row of data.spectra) {
  assert(row.generalizedEigenvaluesDescending.every((value, i, a) => i === 0 || a[i - 1] >= value));
  assert(row.generalizedEigenvaluesDescending.every(value => value >= 0));
  assert.equal(row.relativeSpectrum[0], 1);
}

assert.match(data.conclusions.exactRankOneWindow, /absent above the tau threshold/);
assert.match(data.conclusions.anomalyFirewall, /no broken-phase five-coordinate verdict/i);
console.log("PASS Yukawa threshold singular spectrum");
console.log("sampled_exact_ranks=" + data.spectra.map(row => `${row.rootSGeV}:${row.exactYukawaRank}`).join(","));
console.log("sampled_percent_effective_ranks=" + data.spectra.map(row => `${row.rootSGeV}:${row.effectiveRanks["0.01"]}`).join(","));
console.log("high_energy_five_coordinate_per_mille_rank=" + high.effectiveRanks["0.001"]);
console.log("broken_phase_verdict=withheld_pending_electroweak_anomaly_threshold_matching");
