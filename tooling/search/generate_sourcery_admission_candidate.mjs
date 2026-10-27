#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { corpusSearchMcpTools } from "./corpus_search_mcp.mjs";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const root = resolve(moduleDirectory, "../..");
const outputPath = resolve(moduleDirectory, "sourcery_admission_candidate_v1.json");
const sources = [
  "tooling/search/search_corpus.mjs",
  "tooling/search/context_hub.mjs",
  "tooling/search/context_sweep.mjs",
  "tooling/search/answer_stability.mjs",
  "tooling/search/belief_state.mjs",
  "tooling/search/belief_observations.mjs",
  "tooling/search/adaptive_context.mjs",
  "tooling/search/contribution_beacon.mjs",
  "tooling/search/contribution_beacon_v1.json",
  "tooling/search/corpus_search_mcp.mjs",
  "tooling/search/benchmark_cases.json",
  "tooling/search/benchmark_baseline_v1.json",
  "tooling/search/run_benchmark.mjs",
  "tooling/search/retrieval_intelligence_benchmark.mjs",
  "tooling/search/run_belief_evaluation.mjs",
  "tooling/search/MCP.md",
  "tooling/search/BELIEF_LOOP.md",
  "tooling/search/CONTRIBUTION_BEACON.md",
  "tests/repository/corpus_search.test.mjs",
  "tests/repository/corpus_search_mcp.test.mjs",
  "tests/repository/corpus_answer_stability.test.mjs",
  "tests/repository/corpus_belief_state.test.mjs",
  "tests/repository/corpus_belief_evaluation.test.mjs",
  "tests/repository/corpus_search_benchmark.test.mjs"
];

const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");

export function buildSourceryAdmissionCandidate() {
  const members = sources.map(path => {
    const bytes = readFileSync(resolve(root, path));
    return { path, bytes: bytes.length, sha256: sha256(bytes) };
  });
  const payload = {
    protocol: "spin23-corpus-search-sourcery-admission-candidate/1",
    status: "local-candidate-not-protected-runtime-admitted",
    purpose: "A sealed-source candidate for read-only corpus retrieval, tailored context, selector sweeps, answer-provenance comparison and caller-owned bounded source-utility learning through the Sourcery MCP lifecycle.",
    authorityBoundary: {
      readOnly: true,
      entails: false,
      empiricalAuthority: false,
      corpusPromotion: false,
      applicationAdmission: false,
      protectedRuntimeSelected: false
    },
    tools: corpusSearchMcpTools,
    members,
    qualification: {
      benchmark: { legacyCases: 30, paraphraseCases: 12, holdoutCases: 6, requiredPassRate: 1, minimumMeanReciprocalRank: 0.8 },
      commands: [
        "node tooling/search/run_benchmark.mjs",
        "node tooling/search/retrieval_intelligence_benchmark.mjs",
        "node --test --test-concurrency=1 tests/repository/corpus_search.test.mjs tests/repository/corpus_search_mcp.test.mjs tests/repository/corpus_answer_stability.test.mjs tests/repository/corpus_belief_state.test.mjs tests/repository/corpus_belief_evaluation.test.mjs tests/repository/corpus_search_benchmark.test.mjs",
        "node tooling/search/run_belief_evaluation.mjs",
        "node tooling/audit/audit_markdown_links.mjs",
        "git diff --check"
      ],
      negativeControls: [
        "path traversal rejected",
        "unknown arguments rejected",
        "graph weight bounded",
        "outside-context citations retained and marked",
        "answer stability withheld when prompt or model settings differ",
        "context stability never reported as scientific truth",
        "belief state tampering and stale corpus identity rejected",
        "empty belief state preserves baseline source selection",
        "adaptive influence capped and never changes epistemic status",
        "MCP server retains no hidden belief state"
      ]
    },
    admissionSequence: [
      "open a fresh Sourcery development lane from the selected protected base",
      "commit these exact members and reflected contracts into the candidate overlay",
      "run the declared tests in an explicit projection",
      "inspect source and authority receipts",
      "bless the tested candidate snapshot",
      "seal and qualify a successor package",
      "admit through the protected lifecycle",
      "verify all ten operations through a fresh MCP connection"
    ]
  };
  return { ...payload, candidateSha256: sha256(JSON.stringify(payload)) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const candidate = buildSourceryAdmissionCandidate();
  if (process.argv.includes("--write")) {
    writeFileSync(outputPath, `${JSON.stringify(candidate, null, 2)}\n`);
    console.log(`Wrote ${relative(root, outputPath)} ${candidate.candidateSha256}`);
  } else console.log(JSON.stringify(candidate, null, 2));
}
