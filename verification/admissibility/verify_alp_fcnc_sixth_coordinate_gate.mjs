import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("evidence/data/alp-fcnc-sixth-coordinate-gate-v1.json", "utf8"));
const fail = message => { throw new Error(message); };
if (data.protocol !== "alp-fcnc-sixth-coordinate-gate/1") fail("protocol mismatch");
if (data.parent !== "AZ-078") fail("parent mismatch");
if (!(data.sourceConvention.xTop > 1 && data.sourceConvention.loopFunction > 0)) fail("physical loop function invalid");
if (!(Math.abs(data.sourceConvention.directWeakMatchingCoefficient) > 0 && Math.abs(data.sourceConvention.directWeakMatchingCoefficient) < 1e-3)) fail("direct matching coefficient outside declared loop-suppressed range");
if (!data.rankCertificate.fullRank || Math.abs(data.rankCertificate.determinant) < 1e-12) fail("two-record rank certificate failed");
if (Math.abs(data.rankCertificate.weakImageOfBlindDirection) > 1e-12) fail("old blind direction is not weak-blind");
if (!data.rankCertificate.blindDirectionBroken || Math.abs(data.rankCertificate.fcncImageOfBlindDirection) < 1e-12) fail("FCNC row does not break old blind direction");
if (!(data.rankCertificate.inverseSensitivityAmplification > 1e4)) fail("loop-suppression warning was lost");
if (!data.nuisanceFirewall.otherSourceCoordinates.includes("c_tt") || !data.nuisanceFirewall.detectorAndHadronicCoordinates.includes("B-to-K form factors")) fail("nuisance firewall incomplete");
console.log("ALP FCNC sixth-coordinate gate verified: the finite down-sector matching row breaks the weak-record null direction, with a >10^4 loop-sensitivity penalty before nuisances.");
