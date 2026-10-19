import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const generated = resolve(here, "generated");
const node = process.execPath;
const scripts = [
  "verify_conserved_current_ward_h2_response.mjs",
  "verify_conserved_stress_h2_response.mjs",
  "verify_stress_contact_spectral_escape.mjs",
  "verify_thermal_stress_channels_full_h2.mjs",
  "verify_hydrodynamic_stress_rank_three.mjs",
  "verify_kms_herglotz_schur_sewing.mjs",
  "verify_constant_kernel_ward_herglotz_sewing.mjs",
  "verify_domain_wall_chiral_localization.mjs",
  "verify_domain_wall_standard_model_anomalies.mjs",
  "verify_finite_domain_wall_schur_response.mjs"
];

const certificates = scripts.map((script) => {
  const output = execFileSync(node, [resolve(root, "scripts", script)], { encoding: "utf8" }).trim();
  if (!output.includes("PASS")) throw new Error(`certificate did not pass: ${script}`);
  return {
    script: `scripts/${script}`,
    output,
    outputSha256: createHash("sha256").update(output).digest("hex"),
  };
});
const synthesisScript = "verify-stratified-schur-sewing.mjs";
const synthesisOutput = execFileSync(node, [resolve(here, synthesisScript)], { encoding: "utf8" }).trim();
if (!synthesisOutput.includes("PASS")) throw new Error("support-stratified Schur synthesis certificate did not pass");
certificates.push({
  script: `claimipedia-discovery-campaigns/2026-10-17-herglotz-convergence/${synthesisScript}`,
  output: synthesisOutput,
  outputSha256: createHash("sha256").update(synthesisOutput).digest("hex"),
});

const live = JSON.parse(readFileSync(resolve(generated, "live-results.json"), "utf8"));
const docket = JSON.parse(readFileSync(resolve(generated, "discovery-docket.json"), "utf8"));
if (live.passed !== true) throw new Error("live campaign receipt is not passing");
if (docket.summary.convergenceObserved !== true) throw new Error("all three source routes did not reach the bounded target");
if (!docket.summary.invalidRuleIds.includes("counterexample-kms-without-common-temperature")) {
  throw new Error("unequal-temperature negative case was not rejected");
}
if (!docket.candidates.every((candidate) => candidate.losses.length > 0)) {
  throw new Error("a convergence candidate hides its information loss");
}
if (docket.authority.proposalOnly !== true || docket.authority.entails !== false || docket.authority.automaticCorpusAdmission !== false) {
  throw new Error("docket authority boundary is invalid");
}

const receipt = {
  protocol: "claimipedia-scientific-discovery-verification-receipt/1",
  campaignId: docket.campaignId,
  graphSha256: docket.basis.graphSha256,
  docketSha256: docket.docketSha256,
  certificateCount: certificates.length,
  certificates,
  checks: {
    liveCampaignPassed: true,
    allThreeRoutesReachedTarget: true,
    unequalTemperatureShortcutRejected: true,
    everyCandidateDeclaresInformationLoss: true,
    authorityBoundaryPreserved: true,
  },
  frontier: "The certificates establish their bounded models, not physical equivalence among stress, current, and wall systems; the common interface is obtained by lossy projection.",
  passed: true,
};
receipt.receiptSha256 = createHash("sha256").update(JSON.stringify(receipt)).digest("hex");
writeFileSync(resolve(generated, "verification-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  protocol: receipt.protocol,
  campaignId: receipt.campaignId,
  certificateCount: receipt.certificateCount,
  checks: receipt.checks,
  receiptSha256: receipt.receiptSha256,
  passed: receipt.passed,
}, null, 2)}\n`);
