#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectionRoot = process.argv[2];
if (!projectionRoot) throw new Error("usage: node run_worldwright_identity_retention_response_surface.mjs <exact-sourcery-projection-root> [--single]");
const sourcePaths = {
  engine: "layers/capabilities/plugins/sourcery-agent-simulation/engine.mjs",
  owner: "layers/applications/products/worldwright-laboratory/worldwright-execution-owner-v5-1.mjs",
  surface: "layers/applications/products/worldwright-laboratory/worldwright-urgency-delay-response-surface-diagnostic-v1.mjs",
};
const sourceHashes = {
  engine: "e6b586c55b01f44be2d16de0a8ebf4454d78a6bfb211a2f9a931d0f1ef8b3d01",
  owner: "f905ad723c3dafe31a5eafaf73a4219eec39e3e132ccb926d8b728c36e8e022b",
  surface: "bb05139e77668136b1bf31c3f35f9238013cd9f9d195c6afc4d5ab7cd5860d49",
};
for (const [key, relative] of Object.entries(sourcePaths)) {
  const hash = createHash("sha256").update(await readFile(resolve(projectionRoot, relative))).digest("hex");
  if (hash !== sourceHashes[key]) throw new Error(`${key} source hash mismatch: ${hash}`);
}

const engine = await import(pathToFileURL(resolve(projectionRoot, sourcePaths.engine)));
const owner = await import(pathToFileURL(resolve(projectionRoot, sourcePaths.owner)));
const surface = await import(pathToFileURL(resolve(projectionRoot, sourcePaths.surface)));
const { contentHash, runAgentSimulation } = engine;
const { WORLDWRIGHT_DEFINITION, WORLDWRIGHT_GENERATOR, deriveWorldwrightOutcome } = owner;
const { WORLDWRIGHT_RESPONSE_AXES, buildWorldwrightResponseScenario } = surface;

const LEVELS = [0, 0.25, 0.5, 0.75, 1];
const SEEDS = Array.from({ length: 10 }, (_, index) => 98311 + index);
const EPSILON = 1e-9;
const round = (value, places = 12) => Number(value.toFixed(places));
const key = (material, delay, urgency, seed) => `${material}:${delay}:${urgency}:${seed}`;
const invariant = (condition, message) => { if (!condition) throw new Error(message); };

function withIdentity(base, kind, salience) {
  const scenario = structuredClone(base);
  const profile = WORLDWRIGHT_GENERATOR.profiles[kind];
  const identity = 0.22 * salience * (profile.participation - profile.bypass);
  const values = {
    autonomy: 0.35 * profile.participation - 0.55 * profile.bypass + identity,
    legitimacy: 0.45 * profile.participation - 0.5 * profile.bypass + 0.2 * profile.disclosure + identity,
    learning: 0.25 * profile.participation - 0.1 * profile.bypass - 0.1 * profile.coordinationBurden + 0.5 * identity,
    resilience: 0.2 * profile.participation - 0.05 * profile.bypass - 0.1 * profile.coordinationBurden,
  };
  const shock = scenario.shocks.find(item => item.kind === "relational-mechanism-window");
  invariant(shock, "relational mechanism shock missing");
  shock.effects = ["a", "b"].flatMap(region => Object.entries(values).map(([coordinate, delta]) => ({ resource: `${region}.${coordinate}`, delta })));
  scenario.metadata.identitySalience = salience;
  delete scenario.contentHash;
  scenario.contentHash = contentHash(scenario);
  return scenario;
}

function executeCondition(salience) {
  const cells = [];
  for (const material of WORLDWRIGHT_RESPONSE_AXES.initialMaterial)
    for (const delay of WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick)
      for (const urgency of WORLDWRIGHT_RESPONSE_AXES.urgencyMultiplier)
        for (const seed of SEEDS) {
          const visible = withIdentity(buildWorldwrightResponseScenario({ initialMaterial: material, mediatedDeliveryTick: delay, urgencyMultiplier: urgency, seed, kind: "visible" }), "visible", salience);
          const mediated = withIdentity(buildWorldwrightResponseScenario({ initialMaterial: material, mediatedDeliveryTick: delay, urgencyMultiplier: urgency, seed, kind: "mediated" }), "mediated", salience);
          invariant(visible.metadata.initialStateHash === mediated.metadata.initialStateHash, "paired initial-state mismatch");
          const visibleOutcome = deriveWorldwrightOutcome(runAgentSimulation(WORLDWRIGHT_DEFINITION, visible));
          const mediatedOutcome = deriveWorldwrightOutcome(runAgentSimulation(WORLDWRIGHT_DEFINITION, mediated));
          const relational = round(mediatedOutcome.relational - visibleOutcome.relational);
          const overall = round(mediatedOutcome.overall - visibleOutcome.overall);
          const winner = Math.abs(overall) <= EPSILON ? "tie" : overall > 0 ? "mediated" : "visible";
          cells.push({ material, delay, urgency, seed, relational, overall, winner });
        }
  const winnerCounts = { visible: 0, mediated: 0, tie: 0 };
  cells.forEach(cell => winnerCounts[cell.winner]++);
  return {
    salience, pairedCells: cells.length, modelRuns: cells.length * 2, winnerCounts,
    meanRelationalDelta: round(cells.reduce((sum, cell) => sum + cell.relational, 0) / cells.length),
    meanOverallDelta: round(cells.reduce((sum, cell) => sum + cell.overall, 0) / cells.length),
    minOverallDelta: Math.min(...cells.map(cell => cell.overall)),
    maxOverallDelta: Math.max(...cells.map(cell => cell.overall)), cells,
  };
}

function execute() {
  const raw = LEVELS.map(executeCondition);
  const zero = new Map(raw[0].cells.map(cell => [key(cell.material, cell.delay, cell.urgency, cell.seed), cell]));
  const conditions = [], winnerChangesFromZero = {};
  for (const result of raw) {
    winnerChangesFromZero[String(result.salience)] = result.cells.filter(cell => cell.winner !== zero.get(key(cell.material, cell.delay, cell.urgency, cell.seed)).winner).length;
    const { cells, ...condition } = result;
    conditions.push(condition);
  }
  let relationalMonotonicViolations = 0, overallMonotonicViolations = 0;
  for (const base of raw[0].cells) {
    const cellKey = key(base.material, base.delay, base.urgency, base.seed);
    const series = raw.map(result => result.cells.find(cell => key(cell.material, cell.delay, cell.urgency, cell.seed) === cellKey));
    for (let index = 1; index < series.length; index++) {
      if (series[index].relational + EPSILON < series[index - 1].relational) relationalMonotonicViolations++;
      if (series[index].overall + EPSILON < series[index - 1].overall) overallMonotonicViolations++;
    }
  }
  const gatePassed = winnerChangesFromZero["1"] > 0;
  const basis = {
    protocol: "worldwright/identity-held-out-retention-gate.local-v1",
    sourceSnapshotId: "bff142b8-1ae9-4f7b-ba2e-9631d2ccfdaf",
    axes: { identitySalience: LEVELS, initialMaterial: WORLDWRIGHT_RESPONSE_AXES.initialMaterial, mediatedDeliveryTick: WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick, urgencyMultiplier: WORLDWRIGHT_RESPONSE_AXES.urgencyMultiplier, seeds: SEEDS },
    conditionCount: conditions.length,
    totalPairedCells: conditions.reduce((sum, condition) => sum + condition.pairedCells, 0),
    modelRunsPerExecution: conditions.reduce((sum, condition) => sum + condition.modelRuns, 0),
    conditions, winnerChangesFromZero, relationalMonotonicViolations, overallMonotonicViolations,
    retentionGate: { criterion: "at least one held-out winner changes between identity salience 0 and 1", passed: gatePassed, disposition: gatePassed ? "retain-as-decision-coordinate" : "remove-from-decision-coordinate" },
    authority: "synthetic-model-retention-only", empiricalValidation: "blocked", policyAuthority: "none", physicsAuthority: "none",
  };
  return { ...basis, gateHash: contentHash(basis) };
}

const first = execute();
if (!process.argv.includes("--single")) {
  const second = execute();
  invariant(first.gateHash === second.gateHash && JSON.stringify(first) === JSON.stringify(second), "exact repeat failed");
}
console.log(JSON.stringify({ ...first, exactRepeat: !process.argv.includes("--single") }, null, 2));
