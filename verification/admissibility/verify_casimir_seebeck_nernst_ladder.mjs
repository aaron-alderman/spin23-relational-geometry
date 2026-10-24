import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(
    path.join(root, "evidence/data/admissibility-casimir-seebeck-nernst-ladder-v1.json"),
    "utf8",
  ),
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function near(actual, expected, tolerance, label) {
  assert(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
}

assert(
  evidence.status === "TYPED_GUIDEPOST_LADDER_SHARED_DESCENT_OPEN",
  "shared microscopic descent must remain open",
);
assert(evidence.casimirMeanings.length === 3, "the three Casimir meanings must remain typed apart");
assert(
  new Set(evidence.casimirMeanings.map(({ name }) => name)).size === 3,
  "Casimir meanings must be unique",
);
assert(evidence.guidepostRails.length === 3, "expected global, longitudinal and transverse rails");
assert(evidence.sharedCarrierAxes.length === 6, "same-carrier chart must retain six axes");

const calibration = evidence.idealPlateCalibration;
near(2 ** calibration.energyDistanceExponent, calibration.energyRatioAtDoubleDistance, 1e-15, "ideal-plate energy scaling");
near(2 ** calibration.pressureDistanceExponent, calibration.pressureRatioAtDoubleDistance, 1e-15, "ideal-plate pressure scaling");
assert(calibration.scope.includes("ideal"), "ideal-plate scaling must not be promoted to a universal law");

assert(evidence.admissionCriterion.includes("without force-data refitting"), "no-refit cross-channel gate missing");
assert(evidence.selectorCriterion.includes("return-map"), "selection must be tested dynamically");

console.log("PASS Casimir-Seebeck-Nernst spectral ladder");
console.log(`  typed Casimir meanings: ${evidence.casimirMeanings.length}`);
console.log(`  guidepost rails: ${evidence.guidepostRails.length}`);
console.log(`  shared-carrier axes: ${evidence.sharedCarrierAxes.length}`);
console.log(`  status: ${evidence.status}`);

