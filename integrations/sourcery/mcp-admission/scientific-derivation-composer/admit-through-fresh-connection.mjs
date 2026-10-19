import { spawn } from "node:child_process";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";

const node = "C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe";
const bridge = "C:/Users/aaron/sourcery/.consolidation/temple-supervisor/host/2026-10-17-executable-succession-root-v7/host-local-bridge.mjs";
const bridgeArgs = [
  bridge,
  "--ledger", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\supervisor.sqlite",
  "--generations", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-supervisor\\generations",
  "--runtime-root", "C:\\Users\\aaron\\sourcery\\.consolidation\\temple-runtime",
  "--authority-custody", "C:\\Users\\aaron\\sourcery\\.consolidation\\authority\\temple-authority.dpapi",
  "--initial-generation", "split-v9-qualified"
];

const predecessor = {
  generationId: "host-scientific-derivation-composer-v16",
  runtimeHash: "6c5bb5a941942bd7155a95c677a285ceb387a703c9d2fc450b0087b96871f493"
};
let packageRef;

const child = spawn(node, bridgeArgs, { stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
const lines = createInterface({ input: child.stdout, crlfDelay: Infinity });
let nextId = 1;
const pending = new Map();
let stderr = "";
let exited = false;
let exitCode = null;
child.stderr.setEncoding("utf8");
child.stderr.on("data", chunk => { stderr += chunk; });
child.once("exit", code => {
  exited = true;
  exitCode = code;
  const detail = stderr.trim() || `bridge exited with code ${code}`;
  for (const request of pending.values()) request.reject(new Error(detail));
  pending.clear();
});
lines.on("line", line => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  if (message.id === undefined || message.id === null) return;
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

function rpc(method, params = {}) {
  if (exited) return Promise.reject(new Error(stderr.trim() || `bridge exited with code ${exitCode}`));
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
  });
}

function payload(result) {
  if (result?.isError) throw new Error(result.content?.map(x => x.text ?? "").join("\n") || "Tool call failed");
  if (result?.structuredContent) return result.structuredContent;
  const text = result?.content?.find(x => x.type === "text")?.text;
  return text ? JSON.parse(text) : result;
}

async function call(name, args) {
  return payload(await rpc("tools/call", { name, arguments: args }));
}

function compact(value) {
  if (!value || typeof value !== "object") return value;
  const allowed = ["protocol", "generationId", "runtimeHash", "state", "eligible", "planHash", "installed", "reconciledExisting", "routeChanged", "grantsAuthority", "nextAction", "admissionId", "checkId", "candidateCount", "validTransformationCount", "proposalOnly", "entails", "empiricalAuthority", "applicationAdmission"];
  return Object.fromEntries(allowed.filter(key => value[key] !== undefined).map(key => [key, value[key]]));
}

const report = { protocol: "scientific-derivation-admission-run/1", steps: [] };
try {
  await rpc("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "scientific-derivation-admission", version: "1" } });
  const hostBefore = await call("temple_host_describe", {});
  report.steps.push({ step: "fresh-host", result: compact(hostBefore) });
  if (hostBefore.generationId !== predecessor.generationId || hostBefore.runtimeHash !== predecessor.runtimeHash) {
    throw new Error("Fresh connection did not select the expected predecessor host.");
  }

  const bundle = JSON.parse(execFileSync(node, ["integrations/sourcery/mcp-admission/scientific-derivation-composer/build-workbench-successor.mjs"], { cwd: process.cwd(), encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }));
  const staged = await call("temple_kernel_maintain", { action: "stage", expectedGenerationId: predecessor.generationId, expectedRuntimeHash: predecessor.runtimeHash, documents: bundle.documents, packagePath: bundle.packagePath, workItem: bundle.workItem });
  packageRef = staged.packageRef;
  report.steps.push({ step: "stage-successor", result: { protocol: staged.protocol, stagingId: staged.stagingId, packageRef, grantsAuthority: staged.grantsAuthority, nextAction: staged.nextAction } });
  const base = { expectedGenerationId: predecessor.generationId, expectedRuntimeHash: predecessor.runtimeHash, packageRef };
  const inspection = await call("temple_kernel_maintain", { action: "inspect", ...base });
  report.steps.push({ step: "inspect", result: compact(inspection) });
  const installation = await call("temple_kernel_maintain", { action: "install", ...base });
  report.steps.push({ step: "install", result: { ...compact(installation), installation: compact(installation.installation), receipt: installation.receipt } });
  const qualified = await call("temple_kernel_maintain", { action: "qualify", ...base });
  report.steps.push({ step: "qualify", result: { ...compact(qualified), check: compact(qualified.check), qualification: qualified.qualification } });

  const admitted = await call("temple_kernel_maintain", {
    action: "admit",
    ...base,
    qualificationRef: qualified.qualification,
    claim: "Admit the exact data-only scientific derivation grammar successor adding a thin read-only Claimipedia review workbench. It exposes query,candidate,assumption/loss,rejection and Triage-handoff panes; it does not establish scientific truth,empirical validity,automatic promotion,corpus admission or application activation.",
    evidence: [
      `staging:${packageRef.stagingId}`,
      `package-sha256:${packageRef.objectHash}`,
      `plan-sha256:${inspection.planHash}`,
      "local-node-tests:3-of-3-pass",
      "self-check:known-chain,information-loss,rank-rejection,contact-rejection,analogy-firewall,context-rejection,basis-invariance,authority-boundary"
    ],
    frontiers: [
      "No proof of semantic completeness, novelty, or physical realizability.",
      "The Standard Model pilot re-expresses retained repository sources and does not validate new physics.",
      "Claimipedia corpus promotion and human review remain separate authority-bearing acts.",
      "Search is bounded to 128 objects, 256 transformations, and depth 6; it is not a theorem prover.",
      "The thin workbench is a read-only result projection; application UI activation remains separate."
    ]
  });
  report.steps.push({ step: "admit", result: { ...compact(admitted), admission: compact(admitted.admission) } });

  const admissionId = admitted.admission?.admissionId;
  if (!admissionId) throw new Error("Admission did not return an admission identity.");
  const lifecycleLane = await call("temple_workspace_status", { laneId: "task/programme-host-lifecycle-20261015" });
  if (lifecycleLane.lease?.heldByThisConnection) {
    const closed = await call("temple_workspace_close", { laneId: lifecycleLane.laneId });
    report.steps.push({ step: "close-installation-lane", result: { laneId: closed.laneId, status: closed.status, headSnapshotId: closed.headSnapshotId } });
  }
  const reloaded = await call("temple_host_reload", { admissionId, expectedRuntimeHash: predecessor.runtimeHash });
  report.steps.push({ step: "reload", result: compact(reloaded) });

  const operation = await call("temple_system_describe_operation", { operationId: "scientific_derivation_compose" });
  report.steps.push({ step: "describe-live-operation", result: { name: operation.name, actions: operation.inputSchema?.properties?.action?.enum ?? [] } });
  const pilot = await call("temple_system_execute_operation", { operationId: "scientific_derivation_compose", input: { action: "standard-model-stress-pilot" } });
  report.steps.push({ step: "execute-live-pilot", result: { protocol: pilot.protocol, candidateCount: pilot.candidates?.length, steps: pilot.candidates?.map(x => x.steps), receipt: compact(pilot.receipt), workbench: { protocol: pilot.workbench?.protocol, mode: pilot.workbench?.mode, panes: Object.keys(pilot.workbench?.panes ?? {}), reviewHandoff: pilot.workbench?.reviewHandoff }, invalidRuleIds: pilot.invalidRules?.map(x => x.rule?.id) } });
  const fixture = JSON.parse(readFileSync("integrations/sourcery/mcp-admission/scientific-derivation-composer/standard-model-stress-pilot.json", "utf8"));
  const custom = await call("temple_system_execute_operation", { operationId: "scientific_derivation_compose", input: { action: "compose-derivation", request: { graph: fixture.graph, query: fixture.query } } });
  report.steps.push({ step: "execute-live-generic-request", result: { protocol: custom.protocol, candidateCount: custom.candidates?.length, workbenchProtocol: custom.workbench?.protocol, receipt: compact(custom.receipt) } });
  report.passed = pilot.candidates?.length === 2 && custom.candidates?.length === 2 && pilot.workbench?.protocol === "claimipedia-scientific-derivation-workbench/1" && pilot.workbench?.reviewHandoff?.automaticCorpusAdmission === false && pilot.receipt?.proposalOnly === true && pilot.receipt?.entails === false && pilot.receipt?.empiricalAuthority === false && pilot.receipt?.applicationAdmission === false;
} catch (error) {
  report.passed = false;
  report.error = error.message;
  if (stderr.trim()) report.stderr = stderr.trim().slice(-4000);
  process.exitCode = 1;
} finally {
  if (!exited) {
    child.stdin.end();
    await new Promise(resolve => child.once("exit", resolve));
  }
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
}
