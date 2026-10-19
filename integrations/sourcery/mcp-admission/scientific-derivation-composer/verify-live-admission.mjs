import { spawn } from "node:child_process";
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
  "--initial-generation", "split-v9-qualified",
];
const expected = {
  generationId: "host-scientific-derivation-composer-v17",
  runtimeHash: "c221f284423275228f2dedc4b7db93307b6abcc0311b0c77bcc7b157c4e7fbce",
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
  for (const request of pending.values()) {
    request.reject(new Error(stderr.trim() || `bridge exited with code ${code}`));
  }
  pending.clear();
});
lines.on("line", (line) => {
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
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
  });
}

function payload(result) {
  if (result?.isError) throw new Error(result.content?.map((part) => part.text ?? "").join("\n") || "Tool call failed");
  if (result?.structuredContent) return result.structuredContent;
  const body = result?.content?.find((part) => part.type === "text")?.text;
  return body ? JSON.parse(body) : result;
}

async function call(name, args) {
  return payload(await rpc("tools/call", { name, arguments: args }));
}

function receipt(value) {
  return Object.fromEntries([
    "candidateCount", "validTransformationCount", "proposalOnly", "entails",
    "empiricalAuthority", "applicationAdmission",
  ].filter((key) => value?.[key] !== undefined).map((key) => [key, value[key]]));
}

const report = { protocol: "scientific-derivation-live-verification/1" };
try {
  await rpc("initialize", {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "scientific-derivation-live-verifier", version: "1" },
  });
  const host = await call("temple_host_describe", {});
  report.host = { generationId: host.generationId, runtimeHash: host.runtimeHash };
  if (host.generationId !== expected.generationId || host.runtimeHash !== expected.runtimeHash) {
    throw new Error("Fresh connection did not select the admitted v17 generation.");
  }

  const operation = await call("temple_system_describe_operation", {
    operationId: "scientific_derivation_compose",
  });
  report.operation = {
    name: operation.name,
    actions: operation.inputSchema?.properties?.action?.enum ?? [],
  };

  const pilot = await call("temple_system_execute_operation", {
    operationId: "scientific_derivation_compose",
    input: { action: "standard-model-stress-pilot" },
  });
  report.pilot = {
    protocol: pilot.protocol,
    candidateCount: pilot.candidates?.length,
    steps: pilot.candidates?.map((candidate) => candidate.steps),
    invalidRuleIds: pilot.invalidRules?.map((item) => item.rule?.id),
    workbench: {
      protocol: pilot.workbench?.protocol,
      mode: pilot.workbench?.mode,
      panes: Object.keys(pilot.workbench?.panes ?? {}),
      reviewHandoff: pilot.workbench?.reviewHandoff,
      authority: pilot.workbench?.authority,
    },
    receipt: receipt(pilot.receipt),
  };

  const fixture = JSON.parse(readFileSync(
    "integrations/sourcery/mcp-admission/scientific-derivation-composer/standard-model-stress-pilot.json",
    "utf8",
  ));
  const custom = await call("temple_system_execute_operation", {
    operationId: "scientific_derivation_compose",
    input: {
      action: "compose-derivation",
      request: { graph: fixture.graph, query: fixture.query },
    },
  });
  report.genericRequest = {
    protocol: custom.protocol,
    candidateCount: custom.candidates?.length,
    workbenchProtocol: custom.workbench?.protocol,
    receipt: receipt(custom.receipt),
  };

  const handoff = pilot.workbench?.reviewHandoff;
  const authority = pilot.workbench?.authority;
  report.passed =
    pilot.candidates?.length === 2 &&
    custom.candidates?.length === 2 &&
    pilot.workbench?.protocol === "claimipedia-scientific-derivation-workbench/1" &&
    pilot.workbench?.mode === "read-only-proposal-review" &&
    handoff?.automaticPromotion === false &&
    handoff?.automaticCorpusAdmission === false &&
    authority?.entails === false &&
    authority?.empiricalAuthority === false &&
    authority?.applicationAdmission === false &&
    pilot.receipt?.proposalOnly === true &&
    pilot.receipt?.entails === false &&
    pilot.receipt?.empiricalAuthority === false &&
    pilot.receipt?.applicationAdmission === false;
} catch (error) {
  report.passed = false;
  report.error = error.message;
  if (stderr.trim()) report.stderr = stderr.trim().slice(-4000);
  process.exitCode = 1;
} finally {
  if (!exited) {
    child.stdin.end();
    await new Promise((resolve) => child.once("exit", resolve));
  }
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
