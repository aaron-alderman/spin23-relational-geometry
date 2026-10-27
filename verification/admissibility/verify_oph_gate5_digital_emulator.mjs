import { readFileSync } from "node:fs";
import { buildReceipt } from "../../scripts/run-oph-gate5-digital-emulator.mjs";

const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

const path = "evidence/data/oph-gate5-digital-emulator-v1.json";
const retained = JSON.parse(readFileSync(path, "utf8"));
const replayed = buildReceipt();
requireCondition(JSON.stringify(retained) === JSON.stringify(replayed), "retained Gate-5 receipt differs from replay");
requireCondition(retained.schema === "oph-gate5-digital-emulator-v1", "schema mismatch");
requireCondition(retained.decision.allCircuitsPass, "one or more compiled circuits failed");
requireCondition(retained.decision.phaseTargetsPass, "phase targets failed");
requireCondition(retained.decision.kProbePass, "k probe failed");
requireCondition(retained.decision.pilotEquivalenceCertified === false, "5,000-shot pilot improperly certifies the strict null");
requireCondition(retained.decision.qualificationEquivalenceCertified === true, "qualification run does not certify the strict null");
requireCondition(retained.decision.digitalGate5Pass === true, "digital Gate 5 did not pass");
requireCondition(retained.decision.hardwareGate5Pass === false, "digital replay improperly claims hardware execution");
requireCondition(retained.equivalence.minimumShotsPerOrderIfEmpiricalTvWereZero > 39000, "null power floor unexpectedly low");
requireCondition(Object.values(retained.circuits).every(({ resources }) => /^[0-9a-f]{64}$/u.test(resources.circuitSha256)), "circuit digest missing");

console.log(JSON.stringify({
  result: "pass",
  circuitQubits: Object.fromEntries(Object.entries(retained.circuits).map(([name, row]) => [name, row.qubits])),
  circuitGates: Object.fromEntries(Object.entries(retained.circuits).map(([name, row]) => [name, row.resources.totalGates])),
  maximumColumnError: Math.max(...Object.values(retained.circuits).map(({ verification }) => verification.maximumCompiledColumnError)),
  minimumZeroDistanceShots: retained.equivalence.minimumShotsPerOrderIfEmpiricalTvWereZero,
  pilotUpperBound: retained.equivalence.pilot.confidenceUpperBound,
  qualificationUpperBound: retained.equivalence.qualification.confidenceUpperBound,
  digitalGate5Pass: retained.decision.digitalGate5Pass,
  hardwareGate5Pass: retained.decision.hardwareGate5Pass
}, null, 2));
