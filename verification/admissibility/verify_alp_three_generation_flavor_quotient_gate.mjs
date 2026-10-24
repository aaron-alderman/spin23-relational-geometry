import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("evidence/data/alp-three-generation-flavor-quotient-gate-v1.json", "utf8"));
const fail = message => { throw new Error(message); };
if (data.protocol !== "alp-three-generation-flavor-quotient-gate/1") fail("protocol mismatch");
if (data.parent !== "AZ-077") fail("parent mismatch");
if (data.ckmTransportCertificate.unitarityResidual > 1e-12) fail("CKM witness is not unitary");
if (!data.ckmTransportCertificate.invariantsPreserved || !data.ckmTransportCertificate.entriesChanged) fail("CKM transport certificate failed");
if (!data.quotientCertificate.massRecordsInvariant || !data.quotientCertificate.weakAnomalyInvariant) fail("B-L quotient certificate failed");
if (data.quotientCertificate.correctedNullName.includes("not baryon") === false) fail("null-direction correction missing");
if (data.singletFlavorSplit.realDimensionOfFiveHermitianThreeByThreeMatrices !== 45) fail("full flavor dimension mismatch");
if (data.singletFlavorSplit.familySingletDimensions !== 5 || data.singletFlavorSplit.tracelessFlavorDimensions !== 40) fail("singlet/flavor split mismatch");
if (data.singletFlavorSplit.weakAnomalyRankOnCurrentMatrices !== 1 || data.singletFlavorSplit.weakAnomalyKernelDimension !== 44) fail("weak anomaly rank/nullity mismatch");
if (!data.singletFlavorSplit.weakRecordBlind || !data.singletFlavorSplit.fermionRecordsChange) fail("traceless flavor blindness certificate failed");
if (data.normalizationCertificate.multiplicityRatio !== 3) fail("generation normalization factor mismatch");
console.log("ALP three-generation flavor quotient gate verified: CKM transport preserves invariants, B-L is the null direction, and the weak anomaly sees one of 45 current-matrix coordinates.");
