import { readFileSync } from "node:fs";
import { buildReceipt } from "../../scripts/run-oph-conventional-process-rival.mjs";

const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

const path = "evidence/data/oph-conventional-process-rival-v1.json";
const retained = JSON.parse(readFileSync(path, "utf8"));
const replayed = buildReceipt();
requireCondition(JSON.stringify(retained) === JSON.stringify(replayed), "retained rival receipt differs from replay");
requireCondition(retained.model.noPerSettingRefit, "rival uses per-setting refits");
requireCondition(retained.decision.conventionalModelPredictsHeldOut, "ordinary rival misses held-out qualification records");
requireCondition(retained.heldOut.maximumAbsoluteZ < retained.heldOut.passThreshold, "held-out residual exceeds threshold");
requireCondition(retained.decision.injectedResidualDetected, "injected residual control was not detected");
requireCondition(retained.injectedResidualControl.expandedSettingSpecificOffsetCanAbsorb, "expanded conventional alternative cannot absorb the injected residual");
requireCondition(retained.decision.residualUniquelyIdentifiesNewPhysics === false, "synthetic residual improperly identifies new physics");
requireCondition(Math.abs(retained.finiteMemoryControl.inducedTotalVariation - 0.04) < 1e-15, "finite-memory control changed");

console.log(JSON.stringify({
  result: "pass",
  fittedParameters: retained.fit.parameters,
  fittedScheduleVisibility: retained.fit.scheduleVisibility,
  maximumHeldOutZ: retained.heldOut.maximumAbsoluteZ,
  injectedResidualZ: retained.injectedResidualControl.z,
  conventionalModelPredictsHeldOut: retained.decision.conventionalModelPredictsHeldOut,
  residualUniquelyIdentifiesNewPhysics: retained.decision.residualUniquelyIdentifiesNewPhysics
}, null, 2));
