import fs from "node:fs";

const spec = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/relation_emulator_spec_v1.json", "utf8",
));
if (spec.schema !== "relation-emulator-spec/1") throw new Error("unexpected schema");
if (spec.network.modes !== 16 || spec.network.directedLinks !== 24) throw new Error("network size mismatch");
if (spec.network.disabledSeams.join(",") !== "QR-002,QR-004,QR-013") throw new Error("seam set mismatch");
if (spec.exactPredictions.idealCompositionRank !== 23 || spec.exactPredictions.directChannelCompletedRank !== 24) {
  throw new Error("detector rank mismatch");
}
if (Math.abs(spec.exactPredictions.idealNextSingularValue - 0.4552467353503346) > 1e-14) {
  throw new Error("spectral gap mismatch");
}
if (spec.exactPredictions.firstOrderSeamContaminant !== "QR-002") throw new Error("seam contaminant mismatch");
if (spec.calibrations.length < 6) throw new Error("insufficient calibration controls");
if (!spec.acceptance.emulatorPass || !spec.acceptance.graphFalsifier || !spec.acceptance.physicsPromotionGate) {
  throw new Error("acceptance boundary incomplete");
}
console.log(JSON.stringify({
  result: "pass",
  modes: spec.network.modes,
  directedLinks: spec.network.directedLinks,
  exactNull: spec.exactPredictions.idealKernel,
  visibleGap: spec.exactPredictions.idealNextSingularValue,
  firstOrderLeakageSlope: 4,
  firstOrderSeamContaminant: spec.exactPredictions.firstOrderSeamContaminant,
  status: "emulator_specified_physics_promotion_gated",
}, null, 2));
