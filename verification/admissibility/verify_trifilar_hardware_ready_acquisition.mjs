import fs from "node:fs";
import { runHardwareReadyAcquisition } from "../../scripts/run-trifilar-hardware-ready-acquisition.mjs";

const config = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-hardware-ready-config-v1.json",
  import.meta.url,
), "utf8"));
const source = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-virtual-emulator-result-v1.json",
  import.meta.url,
), "utf8"));
const recorded = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-hardware-ready-result-v1.json",
  import.meta.url,
), "utf8"));
const csv = fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-hardware-ready-synthetic-raw-v1.csv",
  import.meta.url,
), "utf8");
const svg = fs.readFileSync(new URL(
  "../../evidence/figures/admissibility-trifilar-hardware-ready-stress-v1.svg",
  import.meta.url,
), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const replay = runHardwareReadyAcquisition(config, source);
assert(recorded.stressResults.length === config.stressCases.length,
  "recorded stress-case count mismatch");
assert(replay.rawRows.length === config.stressCases.length
  * config.acquisition.rawRowsPerStressCase * 2 * 4,
"synthetic raw-row count mismatch");
for (let index = 0; index < replay.stressResults.length; index += 1) {
  const actual = replay.stressResults[index];
  const expected = recorded.stressResults[index];
  assert(actual.name === expected.name, "stress-case ordering mismatch");
  for (const field of [
    "targetOverlap",
    "relativeMatrixError",
    "relativeErrorToSource",
    "returnedAngleDegrees",
    "angleErrorToSourceDegrees",
    "trialAngleStdDegrees",
  ]) {
    assert(Math.abs(actual[field] - expected[field]) < 1e-12,
      field + " replay mismatch for " + actual.name);
  }
}

const byName = Object.fromEntries(recorded.stressResults.map((value) => [value.name, value]));
assert(byName.baseline.relativeErrorToSource < 2e-5,
  "calibrated baseline must recover the source matrix");
assert(byName.uncalibrated.relativeErrorToSource > 1e-2,
  "uncalibrated channel mismatch must remain visible");
assert(byName.ten_bit.relativeErrorToSource > 1e-3,
  "ten-bit quantization stress must remain visible");
assert(byName.high_noise.trialAngleStdDegrees > 0.03,
  "high-noise stress must broaden the angle distribution");
assert(byName.latency_drift.relativeErrorToSource > 1e-2,
  "post-calibration latency drift must remain visible");
assert(byName.clipping_slew.relativeErrorToSource > 0.5,
  "clipping/slew stress must fail the matrix reconstruction");
assert(Math.abs(byName.baseline.angleErrorToSourceDegrees) < 0.001,
  "baseline angle reconstruction must be sub-millidegree");

const csvLines = csv.trim().split(/\r?\n/);
assert(csvLines.length === replay.rawRows.length + 1, "synthetic CSV line count mismatch");
assert(csvLines[0].startsWith("stress_case,trial,input_basis,channel"),
  "synthetic CSV header mismatch");
assert(svg.startsWith("<svg") && svg.includes("Four-mode acquisition stress audit"),
  "stress-audit SVG missing or malformed");
assert(config.acquisition.sampleRateHertz / config.acquisition.carrierHertz === 48,
  "carrier must have an integer samples-per-cycle ratio");
assert(config.acquisition.blockSizeSamples
  % (config.acquisition.sampleRateHertz / config.acquisition.carrierHertz) === 0,
"block must contain an integer carrier-cycle count");

console.log(JSON.stringify({
  status: "PASS",
  replayedStressCases: replay.stressResults.length,
  syntheticRawRows: replay.rawRows.length,
  baseline: byName.baseline,
  failureSeparators: {
    uncalibratedRelativeError: byName.uncalibrated.relativeErrorToSource,
    tenBitRelativeError: byName.ten_bit.relativeErrorToSource,
    highNoiseAngleStdDegrees: byName.high_noise.trialAngleStdDegrees,
    latencyDriftRelativeError: byName.latency_drift.relativeErrorToSource,
    clippingSlewRelativeError: byName.clipping_slew.relativeErrorToSource,
  },
  interfaceTiming: {
    samplesPerCarrierCycle: config.acquisition.sampleRateHertz / config.acquisition.carrierHertz,
    carrierCyclesPerBlock: config.acquisition.blockSizeSamples
      / (config.acquisition.sampleRateHertz / config.acquisition.carrierHertz),
    blockDurationMilliseconds: 1000 * config.acquisition.blockSizeSamples
      / config.acquisition.sampleRateHertz,
  },
  verdict: "The dependency-free acquisition pipeline reconstructs the frozen return under calibrated baseline conditions and cleanly separates quantization, noise, latency drift and clipping/slew failures.",
}, null, 2));
