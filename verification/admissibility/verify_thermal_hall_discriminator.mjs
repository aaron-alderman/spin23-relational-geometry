import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const evidence = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-thermal-hall-discriminator-v1.json"), "utf8"));
const fail = message => { throw new Error(message); };
const close = (actual, expected, tolerance, label) => {
  if (Math.abs(actual - expected) > tolerance) fail(`${label}: expected ${expected}, received ${actual}`);
};

if (evidence.protocol !== "admissibility-thermal-hall-discriminator/1") fail("unexpected protocol");
if (evidence.target !== "OT-011") fail("wrong topic owner");
if (evidence.correctedBoundary.disorder.includes("does not separate") === false) fail("disorder non-discriminator boundary missing");
for (const row of evidence.activationAudit.fits) {
  const expected = row.truth === "hybridBand" ? 1 : 2;
  close(row.fitWithSpectroscopicGap.activationOrder, expected, 1e-9, `${row.window}/${row.truth} activation order`);
  if (!(row.fitWithSpectroscopicGap.activationOrderStandardErrorAtTwoPercentLogNoise > 0)) fail("activation uncertainty missing");
}
const deep = evidence.activationAudit.fits.find(row => row.window === "deep" && row.truth === "hybridBand").fitWithSpectroscopicGap.activationOrderStandardErrorAtTwoPercentLogNoise;
const narrow = evidence.activationAudit.fits.find(row => row.window === "narrow" && row.truth === "hybridBand").fitWithSpectroscopicGap.activationOrderStandardErrorAtTwoPercentLogNoise;
if (!(deep < narrow / 10)) fail("temperature-leverage audit did not distinguish deep and narrow windows");
close(evidence.movingCrossingAudit.trackingRatios.hybridBand, 1, 1e-12, "hybrid tracking ratio");
close(evidence.movingCrossingAudit.trackingRatios.manyBodySkew, 0, 1e-12, "skew tracking ratio");
if (evidence.verdict.status !== "protocol_specified_source_native_data_required") fail("verdict overstates closure");

console.log(JSON.stringify({
  result: "pass",
  activationOrders: { hybridBand: 1, manyBodySkew: 2 },
  activationOrderStandardError: { deep, narrow },
  trackingRatios: evidence.movingCrossingAudit.trackingRatios,
  verdict: evidence.verdict,
}, null, 2));
