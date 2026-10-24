import fs from "node:fs";

const path = "evidence/data/admissibility-casimir-spectral-coverage-gate-v1.json";
const record = JSON.parse(fs.readFileSync(path, "utf8"));
const { speedOfLightMPerS: c, planckJouleSecond: h, boltzmannJoulePerKelvin: kB, electronVoltJoule: eV } = record.constants;
const hbar = h / (2 * Math.PI);

function close(actual, expected, rel = 2e-9) {
  const scale = Math.max(1e-30, Math.abs(expected));
  if (Math.abs(actual - expected) > rel * scale) throw new Error(`mismatch: ${actual} != ${expected}`);
}

function expectedAtFrequency(fTHz) {
  const f = fTHz * 1e12;
  const d = c / (4 * Math.PI * f);
  return {
    energyEV: h * f / eV,
    matsubaraTemperatureK: h * f / kB,
    distanceMicrometre: d * 1e6,
    idealMetalPressurePa: Math.PI ** 2 * hbar * c / (240 * d ** 4)
  };
}

for (const row of record.characteristicMap.publishedHallWindow) {
  const expected = expectedAtFrequency(row.frequencyTHz);
  for (const key of Object.keys(expected)) close(row[key], expected[key]);
}

const hallCeiling = record.publishedCoverage.complexHallFrequencyTHz[1];
for (const row of record.characteristicMap.targetDistances) {
  const d = row.distanceMicrometre * 1e-6;
  const fTHz = c / (4 * Math.PI * d) / 1e12;
  close(row.frequencyTHz, fTHz);
  close(row.energyEV, h * fTHz * 1e12 / eV);
  close(row.idealMetalPressurePa, Math.PI ** 2 * hbar * c / (240 * d ** 4));
  close(row.factorAbovePublishedHallCeiling, fTHz / hallCeiling);
}

const room = record.characteristicMap.roomTemperatureFirstMatsubara;
const roomFTHz = kB * room.temperatureK / h / 1e12;
close(room.frequencyTHz, roomFTHz);
close(room.energyEV, kB * room.temperatureK / eV);
close(room.distanceMicrometre, c / (4 * Math.PI * roomFTHz * 1e12) * 1e6);
if (record.publishedCoverage.sameSpecimenBroadbandTensorAvailable !== false) throw new Error("same-specimen tensor gate must remain closed");
if (record.adjudication.noRefitPredictionAvailableNow !== false) throw new Error("no-refit prediction is prematurely admitted");
if (!(record.characteristicMap.targetDistances[0].factorAbovePublishedHallCeiling > 15)) throw new Error("spectral gap not certified");

console.log("Casimir spectral-coverage gate verified: same-film tensor absent; 0.1-1 um target band is 15.9-159 times above the published Hall ceiling.");
