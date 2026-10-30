#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const root = resolve(moduleDirectory, "../..");
const outputPath = resolve(moduleDirectory, "observatory_application_candidate_v1.json");
const sources = [
  "tooling/search/search_corpus.mjs",
  "tooling/search/context_hub.mjs",
  "tooling/search/adaptive_context.mjs",
  "tooling/search/answer_stability.mjs",
  "tooling/search/belief_state.mjs",
  "tooling/search/belief_observations.mjs",
  "tooling/search/contribution_beacon.mjs",
  "tooling/search/contribution_beacon_v1.json",
  "tooling/search/contribution_store.mjs",
  "tooling/search/episode_store.mjs",
  "tooling/search/observatory_runtime.mjs",
  "tooling/search/observatory_server.mjs",
  "tooling/search/observatory/public/index.html",
  "tooling/search/observatory/public/app.js",
  "tooling/search/observatory/public/styles.css",
  "tooling/search/start_observatory.ps1",
  "tooling/search/manage_observatory_startup.ps1",
  "tooling/search/run_corpus_observatory_evaluation.mjs",
  "tooling/search/longitudinal_evaluation.mjs",
  "tooling/search/longitudinal_trial_cli.mjs",
  "tooling/search/longitudinal_evaluation_template_v1.json",
  "tooling/search/LONGITUDINAL_EVALUATION.md",
  "tooling/search/collective_instrument_audit.mjs",
  "tooling/search/collective_instrument_policy_v1.json",
  "tooling/search/collective_instrument_audit_live_v1.json",
  "tooling/search/COLLECTIVE_INSTRUMENT_AUDIT.md",
  "tooling/search/corpus_projection_manifest_v1.json",
  "tooling/search/durable_startup_receipt_v1.json",
  "tooling/search/OBSERVATORY.md",
  "evidence/data/context-hub-observatory-warmup-20261027.json",
  "tests/repository/context_hub_observatory.test.mjs",
  "tests/repository/corpus_projection_manifest.test.mjs",
  "tests/repository/longitudinal_evaluation.test.mjs",
  "tests/repository/longitudinal_trial_cli.test.mjs",
  "tests/repository/collective_instrument_audit.test.mjs",
  "tests/repository/observatory_application_candidate.test.mjs",
];

const sha256 = value => createHash("sha256").update(value).digest("hex");

export function buildObservatoryApplicationCandidate() {
  const projection = JSON.parse(readFileSync(resolve(moduleDirectory, "corpus_projection_manifest_v1.json"), "utf8"));
  const startup = JSON.parse(readFileSync(resolve(moduleDirectory, "durable_startup_receipt_v1.json"), "utf8"));
  const warmup = JSON.parse(readFileSync(resolve(root, "evidence/data/context-hub-observatory-warmup-20261027.json"), "utf8"));
  const collectiveAudit = JSON.parse(readFileSync(resolve(moduleDirectory, "collective_instrument_audit_live_v1.json"), "utf8"));
  const members = sources.map(path => {
    const bytes = readFileSync(resolve(root, path));
    return { path, bytes: bytes.length, sha256: sha256(bytes) };
  });
  const payload = {
    protocol: "spin23-context-hub-observatory-application-candidate/1",
    status: "local-candidate-not-protected-application-admitted",
    applicationIdentity: {
      id: "context-hub.observatory.local",
      writePrincipal: "context-hub.operator.local",
      networkBoundary: "127.0.0.1",
      stateProtocol: "append-only-hash-chain",
      recoveryDeploymentSourceCommit: startup.source.commit,
      corpusProjectionManifestSha256: projection.manifestSha256,
      corpusContentSha256: projection.corpusContentSha256,
    },
    authorityBoundary: {
      writesLocalEpisodeAndContributionLedgersOnly: true,
      anonymousIntakeCreatesProposalOnly: true,
      humanApprovalRequiredForAttentionAdmission: true,
      readOnlyMcpAuthorityInherited: false,
      corpusPromotion: false,
      scientificTruthEstablished: false,
      modelWeightTraining: false,
      protectedApplicationAdmission: false,
    },
    excludedRuntimeMaterial: [
      ".context-hub/operator.token",
      ".context-hub/episodes/**",
      ".context-hub/contributions/**",
      ".context-hub/observatory.pid",
      ".context-hub/*.log",
      "installed startup launcher bytes outside the repository",
    ],
    members,
    qualification: {
      commands: [
        "node --test --test-concurrency=1 tests/repository/context_hub_observatory.test.mjs tests/repository/corpus_projection_manifest.test.mjs tests/repository/longitudinal_evaluation.test.mjs tests/repository/longitudinal_trial_cli.test.mjs tests/repository/collective_instrument_audit.test.mjs tests/repository/observatory_application_candidate.test.mjs",
        "node tooling/search/run_corpus_observatory_evaluation.mjs",
        "node tooling/audit/audit_markdown_links.mjs",
        "git diff --check",
      ],
      negativeControls: [
        "missing or invalid operator bearer token rejected for every episode mutation and contribution coordination write",
        "anonymous contribution intake creates a proposal receipt only and cannot admit attention evidence",
        "tampered, truncated or reordered event chains rejected",
        "stale expected revision and concurrent writer lock fail closed",
        "freeze prevents proposals, approvals, rollback and policy changes",
        "rollback appends a restoration event and never deletes intervening history",
        "source-version, corpus-identity and causal-family replay mismatches rejected",
        "credentials, mutable ledgers, PID and logs absent from the admitted package",
        "localhost binding, body-size bound and restrictive browser policy retained",
        "application admission grants neither read-only MCP authority nor corpus-promotion authority",
      ],
      recoveryEvidence: {
        receipt: "tooling/search/durable_startup_receipt_v1.json",
        installedLauncherRehearsed: startup.recoveryRehearsal.launcherInvoked,
        processReplacementObserved: startup.recoveryRehearsal.newProcessObserved,
        credentialContinuityObserved: startup.recoveryRehearsal.credentialSha256Before === startup.recoveryRehearsal.credentialSha256After,
        physicalRebootObserved: false,
      },
      protectedWarmupEvidence: {
        receipt: "evidence/data/context-hub-observatory-warmup-20261027.json",
        passed: warmup.passed,
        operatorId: warmup.operator?.id ?? null,
        credentialSha256: warmup.operator?.credentialSha256 ?? null,
        writeProtected: warmup.operator?.writeProtected ?? false,
        corpusContentSha256: warmup.corpusContentSha256,
        sameRunEvidenceOnly: warmup.authority?.sameRunEvidenceOnly ?? null,
      },
    },
    maturityMonitoring: {
      policy: "tooling/search/collective_instrument_policy_v1.json",
      latestAudit: "tooling/search/collective_instrument_audit_live_v1.json",
      policySha256: collectiveAudit.policySha256,
      populationSha256: collectiveAudit.populationSha256,
      mature: collectiveAudit.mature,
      missingGates: collectiveAudit.missingGates,
      note: "A false maturity result is retained evidence, not a qualification failure or permission to lower the preregistered thresholds."
    },
    admissionSequence: [
      "stage these exact source members without credentials or mutable ledgers",
      "materialize and verify the bound corpus projection separately",
      "run the declared application, tamper, authorization, recovery and authority-boundary tests",
      "inspect an empty-state launch and a copied-state recovery as different cases",
      "bind a protected application identity distinct from the read-only MCP identity",
      "admit and activate only the exact qualified package",
      "verify state continuity, rollback, freeze and rejection controls through a fresh application session",
      "retain physical reboot or logon observation as a separate operational receipt",
    ],
  };
  return { ...payload, candidateSha256: sha256(JSON.stringify(payload)) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const candidate = buildObservatoryApplicationCandidate();
  if (process.argv.includes("--write")) {
    writeFileSync(outputPath, `${JSON.stringify(candidate, null, 2)}\n`);
    console.log(`Wrote ${relative(root, outputPath)} ${candidate.candidateSha256}`);
  } else console.log(JSON.stringify(candidate, null, 2));
}
