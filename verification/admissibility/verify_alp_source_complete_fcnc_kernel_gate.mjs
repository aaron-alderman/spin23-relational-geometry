import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("evidence/data/alp-source-complete-fcnc-kernel-gate-v1.json", "utf8"));
const fail = message => { throw new Error(message); };
const near = (a, b, tolerance = 1e-14) => Math.abs(a - b) <= tolerance;

if (data.protocol !== "alp-source-complete-fcnc-kernel-gate/1" || data.parent !== "AZ-080") fail("identity mismatch");
if (data.correctionOf !== "AZ-079") fail("correction target mismatch");
if (!(Math.abs(data.isolatedTermAudit.isolatedDeterminant) > 1e-12)) fail("isolated matching row should be independent");
if (!near(data.sourceCompleteKernel.proportionalityToWeakRow, -0.0001083)) fail("published weak coefficient mismatch");
if (!data.sourceCompleteKernel.proportionalityResidual.every(value => near(value, 0))) fail("source-complete row is not proportional");
if (!near(data.sourceCompleteKernel.determinantOnA2Cww, 0) || data.sourceCompleteKernel.rankOnA2Cww !== 1) fail("source-complete rank no-go failed");
if (!near(data.sourceCompleteKernel.flavorImageOfOldBlindDirection, 0)) fail("old blind direction should survive");
if (!data.sourceCompleteKernel.nuisanceDirections.includes("UV flavor source kD(Lambda)")) fail("UV flavor nuisance missing");

console.log("ALP source-complete FCNC kernel gate verified: the isolated cWW matching term is independent, but the published MFV forward row recombines to ctilde_WW and leaves the sixth-coordinate blind direction intact.");
