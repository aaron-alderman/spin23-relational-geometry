import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const lane = path.join(root, "corpus", "programmes", "common-operator-atlas");
const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const config = readJson(path.join(lane, "lithium_niobate_nonlinear_twin_v1.json"));
const result = readJson(path.join(root, "evidence", "data", "lithium-niobate-nonlinear-control-twin-v1.json"));
const preregistration = readJson(path.join(lane, "lithium_niobate_phase_reversal_preregistration_v1.json"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(config.schemaVersion === "lithium-niobate-nonlinear-control-twin-v1", "twin config schema mismatch");
assert(result.schemaVersion === "lithium-niobate-nonlinear-control-twin-result-v1", "twin result schema mismatch");
assert(preregistration.schemaVersion === "lithium-niobate-phase-reversal-preregistration-v1", "preregistration schema mismatch");
assert(/dimensionless/i.test(config.status), "dimensionless authority boundary missing");
assert(/no fitted device parameters/i.test(config.status), "configuration could be mistaken for a fitted device");

const expectedCases = config.scenarios.length * config.strategies.length;
assert(result.status === "PASS", "digital twin did not pass its software gates");
assert(result.results.length === expectedCases, `expected ${expectedCases} strategy/scenario cases`);
const caseKeys = new Set(result.results.map((row) => `${row.scenario}:${row.strategy}`));
for (const scenario of config.scenarios) for (const strategy of config.strategies) {
  assert(caseKeys.has(`${scenario.id}:${strategy}`), `missing case ${scenario.id}:${strategy}`);
}
assert(result.results.every((row) => row.positive.finite && row.negative.finite), "non-finite result admitted");
assert(result.results.every((row) => Math.abs(row.pair.orientationOdd) >= config.softwareAcceptance.minimumOrientationOddMagnitude), "science record erased in stress grid");

const row = (scenario, strategy) => result.results.find((item) => item.scenario === scenario && item.strategy === strategy);
assert(row("strong_nonlinearity", "extended_kalman_pi").pair.innovationBiasMagnitude < row("strong_nonlinearity", "linear_kalman_pi").pair.innovationBiasMagnitude, "nonlinear EKF bias witness drifted");
assert(result.strategyAdjudication.memoryAugmentationImprovesLag === false, "memory observability negative result was erased");
assert(row("detector_clipping", "linear_kalman_pi").pair.clippingFraction > 0.8, "clipping scenario no longer exercises clipping");
assert(row("long_delay", "extended_kalman_constrained_predictive").pair.lockRms > row("long_delay", "linear_kalman_pi").pair.lockRms, "delay-brittleness witness drifted");
assert(new Set(Object.values(result.byScenario).map((entry) => entry.lowestLockRms)).size > 1, "strategy comparison collapsed to a universal winner");

assert(config.softwareAcceptance.scienceChannelMayEnterController === false, "science channel entered control path");
assert(preregistration.firewalls.some((item) => /not available to either controller/i.test(item)), "preregistration science firewall missing");
assert(preregistration.requiredMeasuredFields.length >= 10, "hardware identification packet is incomplete");
assert(preregistration.design.negativeControls.length >= 5, "negative-control suite is incomplete");
assert(preregistration.abortRules.length >= 5, "abort rules are incomplete");
assert(preregistration.interpretationLadder.length >= 5, "interpretation ladder is incomplete");
assert(/cannot be honestly frozen until pilot measurements/i.test(preregistration.hardwareBoundary), "hardware stopping boundary missing");
assert(preregistration.primaryStatistic.weights === "REQUIRED_MEASURED_BEFORE_UNBLINDING", "statistic weights were invented without hardware data");

for (const relative of [
  "10_nonlinear_digital_twin_and_strategy_adjudication.md",
  "11_phase_reversal_preregistration_and_hardware_handoff.md",
  "lithium_niobate_nonlinear_twin_v1.json",
  "lithium_niobate_phase_reversal_preregistration_v1.json"
]) assert(fs.existsSync(path.join(lane, relative)), `missing twin artifact ${relative}`);

console.log(JSON.stringify({
  status: "PASS",
  scenarios: config.scenarios.length,
  strategies: config.strategies.length,
  pairedCases: result.results.length,
  negativeResultsRetained: [
    "memory state augmentation without another detector did not whiten innovation",
    "one-step predictive control was delay brittle",
    "detector clipping erased amplitude information"
  ],
  stoppingBoundary: "Measured pilot data and physical equipment are required for further authoritative numerical claims."
}, null, 2));
