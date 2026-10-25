import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../../evidence/data/matter-field-energy-continuity-gate-v1.json", import.meta.url)));
assert.equal(data.schema, "admissibility.matter-field-energy-continuity-gate/1");
assert.ok(data.maxwellMatterCertificate.fieldModeCount >= 6);
assert.ok(data.maxwellMatterCertificate.testedTotalWavevectors >= 10);
assert.ok(data.maxwellMatterCertificate.maximumPoyntingResidual < 1e-12);
assert.ok(data.maxwellMatterCertificate.selectedTotalContinuityResidual < 1e-12);
assert.ok(data.electromagneticGaugeCertificate.maximumResidual < 1e-12);
assert.ok(data.energyDensityGaugeCertificate.unshiftedContinuityResidual < 1e-12);
assert.ok(data.energyDensityGaugeCertificate.shiftedContinuityResidual < 1e-12);
for (const row of data.energyDensityGaugeCertificate.omegaScan) assert.ok(Math.abs(row.shiftOverOmega - data.energyDensityGaugeCertificate.omegaScan[0].shiftOverOmega) < 1e-12);
for (const row of data.screenedLongitudinalLedger.screeningRatios) assert.ok(Math.abs(row.gradientFieldFraction + row.screeningSectorFraction - 1) < 1e-12);
assert.ok(data.screenedLongitudinalLedger.screeningRatios[0].screeningSectorFraction > 0.999);
assert.ok(data.screenedLongitudinalLedger.screeningRatios.at(-1).gradientFieldFraction > 0.999);
assert.match(data.verdict.open, /no dynamical photon or explicit screening carrier/);
console.log("PASS matter-plus-field energy-continuity gate");
