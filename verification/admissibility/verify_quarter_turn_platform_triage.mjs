import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidencePath = path.join(
  root,
  "evidence/data/admissibility-quarter-turn-platform-triage-v1.json",
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function near(actual, expected, tolerance, label) {
  assert(
    Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${expected}, received ${actual}`,
  );
}

assert(
  evidence.protocol === "admissibility-quarter-turn-platform-triage/1",
  "unexpected protocol",
);
assert(evidence.platforms.length === 4, "expected four platform records");
assert(
  new Set(evidence.platforms.map(({ id }) => id)).size === evidence.platforms.length,
  "platform identifiers must be unique",
);
assert(
  evidence.admissionVerdict === "NO_PLATFORM_ADMITTED",
  "the published record does not admit a platform",
);
assert(
  evidence.platforms.every(({ selectorContractionMeasured }) => !selectorContractionMeasured),
  "no surveyed platform may be marked as having measured selector contraction",
);

const byId = Object.fromEntries(evidence.platforms.map((entry) => [entry.id, entry]));
for (const id of ["integrated-sin-holonomy", "rb87-yang-monopole"]) {
  assert(byId[id].residualSplittingOverGap === null, `${id} splitting must remain open`);
  assert(byId[id].differentialLossOverGap === null, `${id} loss must remain open`);
}

const rb = byId["rb87-yang-monopole"].reported;
near(2 * Math.PI * rb.gapHz * rb.cycleSeconds, 8 * Math.PI, 1e-12, "Rb gap-cycle product");

const fiber = byId["fiber-synthetic-frequency"].reported;
near(fiber.freeSpectralRangeHz * fiber.roundTripSeconds, 1, 1e-12, "fiber round-trip identity");
near(10 ** (-fiber.simulationRoundTripPowerLossDb / 10), 0.6698846094165264, 1e-12, "fiber power transmission");

const transmon = byId["transmon-qutrit-fast-holonomy"].reported;
near(transmon.gateDurationSeconds / transmon.T1Seconds, 0.06046511627906977, 1e-15, "transmon gate/T1");
near(transmon.gateDurationSeconds / transmon.T2Seconds, 0.104, 1e-15, "transmon gate/T2");

assert(evidence.closestCarrier === "integrated-sin-holonomy", "unexpected closest carrier");
assert(evidence.closestProtocol === "rb87-yang-monopole", "unexpected closest protocol");
assert(
  evidence.requiredRelativeImperfection === 0.00024061965677016708,
  "AZ-027 admission threshold changed",
);

console.log("PASS quarter-turn platform triage");
console.log(`  platforms: ${evidence.platforms.length}`);
console.log(`  verdict: ${evidence.admissionVerdict}`);
console.log(`  required max(delta,gamma)/Delta: ${evidence.requiredRelativeImperfection}`);
console.log(`  closest carrier: ${evidence.closestCarrier}`);
console.log(`  closest protocol: ${evidence.closestProtocol}`);
