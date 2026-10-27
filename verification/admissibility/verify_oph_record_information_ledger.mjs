import { readFileSync } from "node:fs";
import { buildReceipt } from "../../scripts/run-oph-record-information-ledger.mjs";

const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

const path = "evidence/data/oph-record-information-ledger-v1.json";
const retained = JSON.parse(readFileSync(path, "utf8"));
const replayed = buildReceipt();
requireCondition(JSON.stringify(retained) === JSON.stringify(replayed), "retained information receipt differs from replay");
requireCondition(retained.checks.allConditionalDistributionsNormalized, "instrument record probabilities are not normalized");
requireCondition(JSON.stringify(retained.checks.recordCounts) === JSON.stringify({ C0: 3, C: 6, E: 10, T: 12 }), "record counts changed");
requireCondition(JSON.stringify(retained.checks.recordQubits) === JSON.stringify({ C0: 2, C: 3, E: 4, T: 4 }), "record qubit budgets changed");
requireCondition(retained.checks.refinementRecordEntropyNondecreasing, "record entropy decreased along the named refinement ladder");
requireCondition(retained.decision.globalEntropyMonotonicityDerived === false, "classical record ledger was promoted to a global entropy theorem");
requireCondition(retained.decision.physicalResourceCostMeasured === false, "Landauer lower bound was promoted to measured device cost");

console.log(JSON.stringify({
  result: "pass",
  instruments: retained.instruments.map(({ law, recordEntropyBits, conditionalRecordEntropyBits, inputRecordMutualInformationBits, resetLowerBoundAt300KJoules }) => ({ law, recordEntropyBits, conditionalRecordEntropyBits, inputRecordMutualInformationBits, resetLowerBoundAt300KJoules })),
  refinementRecordEntropyNondecreasing: retained.checks.refinementRecordEntropyNondecreasing,
  globalEntropyMonotonicityDerived: retained.decision.globalEntropyMonotonicityDerived
}, null, 2));
