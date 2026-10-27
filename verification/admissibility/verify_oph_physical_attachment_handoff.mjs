import { readFileSync } from "node:fs";
import { buildReceipt } from "../../scripts/run-oph-physical-attachment-handoff.mjs";

const retained = JSON.parse(readFileSync("evidence/data/oph-physical-attachment-handoff-v1.json", "utf8"));
const replayed = buildReceipt();
if (JSON.stringify(retained) !== JSON.stringify(replayed)) throw new Error("retained physical handoff differs from replay");
if (retained.minimumQualificationShotsExcludingCalibrationAndTomography !== 530000) throw new Error("qualification shot ledger changed");
if (!retained.decision.attachmentEligible) throw new Error("named attachment is not eligible");
if (retained.decision.backendTranspilationComplete || retained.decision.hardwareGate5Pass || retained.decision.empiricalPhysicsClaimEligible) throw new Error("external execution boundary was overclaimed");
if (retained.targetExportRequired.length < 8) throw new Error("backend provenance packet incomplete");

console.log(JSON.stringify({
  result: "pass",
  backend: retained.candidate.backend,
  programmableQubits: retained.candidate.processor.programmableQubits,
  minimumQualificationShots: retained.minimumQualificationShotsExcludingCalibrationAndTomography,
  targetFields: retained.targetExportRequired.length,
  backendTranspilationComplete: retained.decision.backendTranspilationComplete,
  hardwareGate5Pass: retained.decision.hardwareGate5Pass
}, null, 2));
