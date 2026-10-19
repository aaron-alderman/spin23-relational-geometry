import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const spec = JSON.parse(readFileSync(resolve(here, "campaign-spec.json"), "utf8"));
const compiled = JSON.parse(readFileSync(resolve(generated, "compiled-graph.json"), "utf8"));
const node = "C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe";
const bridge = "C:/Users/aaron/sourcery/.consolidation/temple-supervisor/host/2026-10-17-executable-succession-root-v7/host-local-bridge.mjs";
const bridgeArgs = [
  bridge,
  "--ledger", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\supervisor.sqlite",
  "--generations", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\generations",
  "--runtime-root", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-runtime",
  "--authority-custody", "C:\\Users\\aaron\\sourcery\\.consolidation\\authority\\temple-authority.dpapi",
  "--initial-generation", "split-v9-qualified",
];
const expectedHost = {
  generationId: "host-claim-adapter-v18",
  runtimeHash: "28fbfa709c2f8a18716d76450a196abba8074e45b908334316c7e0c147d2b1a3",
  requiredBasisGenerationId: "host-scientific-derivation-composer-v17",
  requiredBasisHash: "c221f284423275228f2dedc4b7db93307b6abcc0311b0c77bcc7b157c4e7fbce",
};

const child = spawn(node, bridgeArgs, { stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
const lines = createInterface({ input: child.stdout, crlfDelay: Infinity });
const pending = new Map();
let nextId = 1;
let stderr = "";
let exited = false;
child.stderr.setEncoding("utf8");
child.stderr.on("data", (chunk) => { stderr += chunk; });
child.once("exit", (code) => {
  exited = true;
  for (const request of pending.values()) request.reject(new Error(stderr.trim() || `bridge exited with code ${code}`));
  pending.clear();
});
lines.on("line", (line) => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

function rpc(method, params = {}) {
  const id = nextId++;
  return new Promise((resolvePromise, reject) => {
    pending.set(id, { resolve: resolvePromise, reject });
    child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
  });
}

function payload(result) {
  if (result?.isError) throw new Error(result.content?.map((part) => part.text ?? "").join("\n") || "Tool call failed");
  if (result?.structuredContent) return result.structuredContent;
  const text = result?.content?.find((part) => part.type === "text")?.text;
  return text ? JSON.parse(text) : result;
}

async function call(name, args) {
  return payload(await rpc("tools/call", { name, arguments: args }));
}

const rules = new Map(spec.transformations.map((rule) => [rule.id, rule]));
const sourceTopics = new Map(spec.sources.map((source) => [source.id, source.topics]));

function rankCandidate(queryId, candidate) {
  const candidateRules = candidate.steps.map((step) => rules.get(step));
  const topics = new Set();
  const tests = new Set();
  for (const rule of candidateRules) {
    for (const evidence of rule.evidence) {
      for (const topic of sourceTopics.get(evidence.source) ?? []) topics.add(topic);
    }
    for (const test of rule.tests ?? []) tests.add(test);
  }
  const stepCount = candidate.steps.length;
  const assumptionCount = candidate.assumptions.length;
  const lossCount = candidate.losses.length;
  const attentionScore = 4 * topics.size + 2 * tests.size + Math.max(0, 6 - stepCount) - assumptionCount - lossCount;
  return {
    queryId,
    candidateId: candidate.candidateId,
    source: candidate.source,
    target: candidate.target,
    steps: candidate.steps,
    assumptions: candidate.assumptions,
    losses: candidate.losses,
    evidenceRefs: candidate.evidenceRefs,
    ranking: {
      attentionScore,
      topicBreadth: topics.size,
      topics: [...topics].sort(),
      testCount: tests.size,
      tests: [...tests].sort(),
      stepCount,
      assumptionCount,
      lossCount,
      authority: "attention-ordering-only",
    },
  };
}

const report = {
  protocol: "claimipedia-scientific-discovery-live-run/1",
  campaignId: spec.campaignId,
  graphSha256: compiled.graphSha256,
  results: [],
};

try {
  await rpc("initialize", {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "claimipedia-scientific-discovery-campaign", version: "1" },
  });
  const host = await call("temple_host_describe", {});
  report.host = { generationId: host.generationId, runtimeHash: host.runtimeHash };
  if (host.generationId !== expectedHost.generationId || host.runtimeHash !== expectedHost.runtimeHash) {
    throw new Error("fresh MCP connection is not serving the exact checked v18 successor of the scientific derivation composer");
  }

  const operation = await call("temple_system_describe_operation", { operationId: "scientific_derivation_compose" });
  const actions = operation.inputSchema?.properties?.action?.enum ?? [];
  if (!actions.includes("compose-derivation")) {
    throw new Error("selected successor does not preserve the generic scientific derivation action");
  }
  report.operation = { name: operation.name, actions };

  for (const query of compiled.queries) {
    const requestQuery = { source: query.source, target: query.target, maxDepth: query.maxDepth };
    const result = await call("temple_system_execute_operation", {
      operationId: "scientific_derivation_compose",
      input: { action: "compose-derivation", request: { graph: compiled.graph, query: requestQuery } },
    });
    report.results.push({ query, result });
  }

  const candidates = report.results.flatMap(({ query, result }) => result.candidates.map((candidate) => rankCandidate(query.id, candidate)));
  candidates.sort((left, right) => right.ranking.attentionScore - left.ranking.attentionScore || left.candidateId.localeCompare(right.candidateId));
  const routesWithCandidates = new Set(candidates.map((candidate) => candidate.queryId));
  const invalidRuleIds = [...new Set(report.results.flatMap(({ result }) => result.invalidRules.map((entry) => entry.rule.id)))];
  const authorityReceiptsPass = report.results.every(({ result }) =>
    result.receipt.proposalOnly === true &&
    result.receipt.entails === false &&
    result.receipt.empiricalAuthority === false &&
    result.receipt.applicationAdmission === false &&
    result.workbench.reviewHandoff.automaticPromotion === false &&
    result.workbench.reviewHandoff.automaticCorpusAdmission === false
  );

  const docket = {
    protocol: "claimipedia-scientific-discovery-docket/1",
    campaignId: spec.campaignId,
    title: spec.title,
    basis: {
      graphSha256: compiled.graphSha256,
      sourceLedgerSnapshotDigest: compiled.corpusBasis.ledgerSnapshotDigest,
      sourceCount: compiled.corpusBasis.sourceCount,
      host: report.host,
    },
    reviewStage: "Triage",
    summary: {
      queryCount: compiled.queries.length,
      candidateCount: candidates.length,
      routesWithCandidates: [...routesWithCandidates].sort(),
      invalidRuleIds,
      convergenceObserved: routesWithCandidates.size === compiled.queries.length,
      convergenceTarget: "shared.schur-herglotz-interface",
      interpretation: "Three independently sourced constructions reach a common causal-passive two-face response interface only after their domain-specific meanings are explicitly discarded. This is a reusable composition seam, not evidence of a physical coupling or unification.",
    },
    candidates,
    falsifiers: [
      "The thermal response lacks a passive analytic completion or requires unequal-temperature sewing.",
      "The Ward support changes rank on the claimed current-response patch.",
      "Restoring gauge and spinor structure makes the wall spectral density indefinite or invalidates the Schur partition.",
      "The apparent convergence disappears when domain-specific data are retained rather than projected away."
    ],
    authority: {
      ranking: "attention-ordering-only",
      proposalOnly: true,
      entails: false,
      empiricalAuthority: false,
      automaticPromotion: false,
      automaticCorpusAdmission: false,
      applicationAdmission: false,
    },
  };
  docket.docketSha256 = createHash("sha256").update(JSON.stringify(docket)).digest("hex");
  report.passed =
    routesWithCandidates.size === compiled.queries.length &&
    candidates.length >= 4 &&
    invalidRuleIds.includes("counterexample-kms-without-common-temperature") &&
    authorityReceiptsPass;
  report.docketSha256 = docket.docketSha256;
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "live-results.json"), `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(resolve(generated, "discovery-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({
    protocol: report.protocol,
    campaignId: report.campaignId,
    host: report.host,
    graphSha256: report.graphSha256,
    candidateCount: candidates.length,
    routesWithCandidates: [...routesWithCandidates].sort(),
    invalidRuleIds,
    topCandidates: candidates.slice(0, 5).map((candidate) => ({ queryId: candidate.queryId, steps: candidate.steps, ranking: candidate.ranking })),
    docketSha256: docket.docketSha256,
    passed: report.passed,
  }, null, 2)}\n`);
  if (!report.passed) process.exitCode = 1;
} catch (error) {
  report.passed = false;
  report.error = error.message;
  if (stderr.trim()) report.stderr = stderr.trim().slice(-4000);
  mkdirSync(generated, { recursive: true });
  writeFileSync(resolve(generated, "live-results.json"), `${JSON.stringify(report, null, 2)}\n`);
  process.stderr.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exitCode = 1;
} finally {
  if (!exited) {
    child.stdin.end();
    await new Promise((resolvePromise) => child.once("exit", resolvePromise));
  }
}
