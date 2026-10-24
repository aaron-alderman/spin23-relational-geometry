import fs from "node:fs";

const path = "evidence/data/admissibility-monster-lean-fold-provenance-gate-v1.json";
const record = JSON.parse(fs.readFileSync(path, "utf8"));

if (record.packetId !== "AZ-060" || record.topicId !== "OT-033") throw new Error("packet/topic mismatch");
if (record.sourcePost.media.length !== 2) throw new Error("expected two source images");
for (const media of record.sourcePost.media) {
  if (!/^[0-9a-f]{64}$/.test(media.sha256)) throw new Error(`invalid media hash: ${media.url}`);
}
const expectedPaths = [
  "RequestProject/Ogg/DeclFold.lean",
  "RequestProject/Ogg/DeclFoldReflect.lean",
  "RequestProject/Ogg/DeclFoldCerts.lean"
];
if (JSON.stringify(record.newlyRecoveredProvenance.leanSourcesNamedByImage) !== JSON.stringify(expectedPaths)) {
  throw new Error("named Lean source paths changed");
}
const counts = record.newlyRecoveredProvenance.reportedCounts;
if (counts.userDeclarations !== 1979 || counts.distinctAddresses !== 908 || counts.exactUnclamped !== 789 || counts.kernelCertifiedFolds !== 13) {
  throw new Error("reported census transcription changed");
}
if (record.publicSourceAudit.exactPathHits !== 0) throw new Error("source located: rerun and supersede this gate");
if (record.reproductionAdmissionContract.requiredArtifacts.length < 7 || record.reproductionAdmissionContract.requiredPolicies.length < 6) {
  throw new Error("reproduction admission contract is incomplete");
}
if (record.status.reportedCensus !== "not independently reproduced") throw new Error("unearned reproduction status");
if (!record.status.promotionRule.includes("Do not cite")) throw new Error("promotion firewall missing");

console.log("Monster-Lean fold provenance gate verified: exact artifact names recovered; reported census remains unreproduced pending the source bundle.");
