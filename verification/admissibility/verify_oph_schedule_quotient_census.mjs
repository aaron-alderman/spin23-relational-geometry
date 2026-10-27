import { readFileSync } from "node:fs";
import { buildReceipt } from "../../scripts/run-oph-schedule-quotient-census.mjs";

const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

const path = "evidence/data/oph-schedule-quotient-census-v1.json";
const retained = JSON.parse(readFileSync(path, "utf8"));
const replayed = buildReceipt();
requireCondition(JSON.stringify(retained) === JSON.stringify(replayed), "retained quotient receipt differs from replay");
requireCondition(retained.partitionCount === 5, "three-label Bell partition count changed");
requireCondition(retained.theorem.erasingQuotientCount === 2, "unexpected order-erasing quotient count");
requireCondition(retained.theorem.verifiedAcrossAllPartitions, "endpoint-merger iff theorem failed");
requireCondition(retained.lawDetector.allFourNamedLawsSeparated, "g/k detector no longer separates the named laws");
requireCondition(retained.decision.canEraseOrderWithoutErasingNamedLawDistinction, "product quotient failed to preserve the named-law detector");
requireCondition(retained.decision.doesNotProveChannelConfluence, "detector quotient was confused with channel confluence");

console.log(JSON.stringify({
  result: "pass",
  partitionCount: retained.partitionCount,
  erasingQuotientCount: retained.theorem.erasingQuotientCount,
  initialScheduleInformationBits: retained.witness.scheduleInformationBits,
  minimalQuotient: retained.theorem.minimalNontrivial.blocks,
  lawDistinctionSurvives: retained.lawDetector.allFourNamedLawsSeparated
}, null, 2));
