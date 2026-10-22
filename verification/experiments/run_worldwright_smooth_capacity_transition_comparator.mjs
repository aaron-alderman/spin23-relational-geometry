#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectionRoot = process.argv[2];
if (!projectionRoot) throw new Error("usage: node run_worldwright_smooth_capacity_transition_comparator.mjs <exact-sourcery-projection-root> [--single]");
const sourcePaths = {
  engine: "layers/capabilities/plugins/sourcery-agent-simulation/engine.mjs",
  owner: "layers/applications/products/worldwright-laboratory/worldwright-execution-owner-v5-1.mjs",
  surface: "layers/applications/products/worldwright-laboratory/worldwright-urgency-delay-response-surface-diagnostic-v1.mjs",
};
const sourceHashes = {
  engine: "ae160c2cf07eb2ce2b3c11bbb42828cbc27023e41e5f272f1a6f8243cf55fe17",
  owner: "2026f456a08802de0e272dd443b15f8a873725cbe4079a16e9b9b02fd6581f7f",
  surface: "8704965ded83fd1130d83f2a72625987d691eb97989b6af3ed4614c69b9d690c",
};
for (const [key, relative] of Object.entries(sourcePaths)) {
  const hash = createHash("sha256").update(await readFile(resolve(projectionRoot, relative))).digest("hex");
  if (hash !== sourceHashes[key]) throw new Error(`${key} source hash mismatch: ${hash}`);
}

const engine = await import(pathToFileURL(resolve(projectionRoot, sourcePaths.engine)));
const owner = await import(pathToFileURL(resolve(projectionRoot, sourcePaths.owner)));
const surface = await import(pathToFileURL(resolve(projectionRoot, sourcePaths.surface)));
const { contentHash, runAgentSimulation, validateSimulationDefinition } = engine;
const { WORLDWRIGHT_DEFINITION, deriveWorldwrightOutcome } = owner;
const { WORLDWRIGHT_RESPONSE_AXES, buildWorldwrightResponseScenario } = surface;

const WIDTHS = [0, 1, 2, 4];
const OFFSETS = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];
const WEIGHTS = [0.08, 0.12, 0.3, 0.3, 0.12, 0.08];
const INFLUENCE_IDS = ["influence.a.surplus-learning", "influence.b.surplus-learning"];
const SEEDS = Array.from({ length: 10 }, (_, index) => 98301 + index);
const EPSILON = 1e-9;
const round = (value, places = 12) => Number(value.toFixed(places));
const cellKey = (material, delay, urgency, seed) => `${material}:${delay}:${urgency}:${seed}`;
const contrastKey = (material, from, to, urgency, seed) => `${material}:${from}-${to}:${urgency}:${seed}`;
const invariant = (condition, message) => { if (!condition) throw new Error(message); };

function definitionFor(width) {
  const definition = structuredClone(WORLDWRIGHT_DEFINITION);
  if (width === 0) return definition;
  const influences = [];
  for (const influence of definition.influences) {
    if (!INFLUENCE_IDS.includes(influence.id)) {
      influences.push(influence);
      continue;
    }
    OFFSETS.forEach((offset, index) => influences.push({
      ...structuredClone(influence),
      id: `${influence.id}.smooth-${index}`,
      conditions: [{ ...influence.conditions[0], threshold: 40 + offset * width }],
      effects: influence.effects.map(effect => ({ ...effect, delta: round(effect.delta * WEIGHTS[index]) })),
    }));
  }
  definition.influences = influences;
  validateSimulationDefinition(definition);
  return definition;
}

function executeCondition(width) {
  const definition = definitionFor(width);
  const cells = [];
  for (const material of WORLDWRIGHT_RESPONSE_AXES.initialMaterial)
    for (const delay of WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick)
      for (const urgency of WORLDWRIGHT_RESPONSE_AXES.urgencyMultiplier)
        for (const seed of SEEDS) {
          const visible = buildWorldwrightResponseScenario({ initialMaterial: material, mediatedDeliveryTick: delay, urgencyMultiplier: urgency, seed, kind: "visible" });
          const mediated = buildWorldwrightResponseScenario({ initialMaterial: material, mediatedDeliveryTick: delay, urgencyMultiplier: urgency, seed, kind: "mediated" });
          invariant(visible.metadata.initialStateHash === mediated.metadata.initialStateHash, "paired initial-state mismatch");
          const visibleOutcome = deriveWorldwrightOutcome(runAgentSimulation(definition, visible));
          const mediatedOutcome = deriveWorldwrightOutcome(runAgentSimulation(definition, mediated));
          cells.push({ material, delay, urgency, seed, relationalDelta: round(mediatedOutcome.relational - visibleOutcome.relational) });
        }
  const map = new Map(cells.map(cell => [cellKey(cell.material, cell.delay, cell.urgency, cell.seed), cell]));
  const contrasts = {};
  const byMaterial = {}, byDelayStep = {};
  let activeContrasts = 0, totalAbsoluteChange = 0, positive = 0, negative = 0;
  for (const material of WORLDWRIGHT_RESPONSE_AXES.initialMaterial)
    for (const urgency of WORLDWRIGHT_RESPONSE_AXES.urgencyMultiplier)
      for (const seed of SEEDS)
        for (let index = 1; index < WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick.length; index++) {
          const from = WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick[index - 1];
          const to = WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick[index];
          const change = round(map.get(cellKey(material, to, urgency, seed)).relationalDelta - map.get(cellKey(material, from, urgency, seed)).relationalDelta);
          contrasts[contrastKey(material, from, to, urgency, seed)] = change;
          if (Math.abs(change) > EPSILON) {
            activeContrasts++;
            totalAbsoluteChange = round(totalAbsoluteChange + Math.abs(change));
            if (change > 0) positive++; else negative++;
            byMaterial[String(material)] = (byMaterial[String(material)] ?? 0) + 1;
            byDelayStep[`${from}->${to}`] = (byDelayStep[`${from}->${to}`] ?? 0) + 1;
          }
        }
  return { width, definitionHash: contentHash(definition), pairedCells: cells.length, modelRuns: cells.length * 2, activeContrasts, totalAbsoluteChange, positive, negative, byMaterial, byDelayStep, contrasts };
}

function execute() {
  const raw = WIDTHS.map(executeCondition);
  const hard = raw[0];
  const conditions = [];
  for (const condition of raw) {
    let hardActivePreserved = 0, hardActiveSignPreserved = 0, signReversals = 0, disappeared = 0, emergent = 0, l1FromHard = 0;
    for (const key of Object.keys(hard.contrasts)) {
      const baseline = hard.contrasts[key], candidate = condition.contrasts[key];
      l1FromHard = round(l1FromHard + Math.abs(candidate - baseline));
      if (Math.abs(baseline) > EPSILON) {
        if (Math.abs(candidate) > EPSILON) {
          hardActivePreserved++;
          if (Math.sign(candidate) === Math.sign(baseline)) hardActiveSignPreserved++; else signReversals++;
        } else disappeared++;
      } else if (Math.abs(candidate) > EPSILON) emergent++;
    }
    const { contrasts, ...compact } = condition;
    conditions.push({ ...compact, hardActivePreserved, hardActiveSignPreserved, signReversals, disappeared, emergent, l1FromHard });
  }
  const smooth = conditions.slice(1);
  const basis = {
    protocol: "worldwright/smooth-capacity-transition-comparator.local-v1",
    sourceSnapshotId: "bff142b8-1ae9-4f7b-ba2e-9631d2ccfdaf",
    axes: { widths: WIDTHS, offsets: OFFSETS, weights: WEIGHTS, seeds: SEEDS },
    conditionCount: conditions.length,
    totalPairedCells: conditions.reduce((sum, condition) => sum + condition.pairedCells, 0),
    modelRunsPerExecution: conditions.reduce((sum, condition) => sum + condition.modelRuns, 0),
    conditions,
    hypotheses: {
      allHardEffectsPersist: smooth.every(condition => condition.hardActivePreserved === hard.activeContrasts && condition.disappeared === 0),
      allHardSignsPreserved: smooth.every(condition => condition.hardActiveSignPreserved === hard.activeContrasts && condition.signReversals === 0),
      narrowWidthConvergence: smooth[0].l1FromHard < smooth[1].l1FromHard && smooth[1].l1FromHard < smooth[2].l1FromHard,
    },
    authority: "synthetic-robustness-only", empiricalValidation: "blocked", policyAuthority: "none", physicsAuthority: "none",
  };
  return { ...basis, comparatorHash: contentHash(basis) };
}

const first = execute();
if (!process.argv.includes("--single")) {
  const second = execute();
  invariant(first.comparatorHash === second.comparatorHash && JSON.stringify(first) === JSON.stringify(second), "exact repeat failed");
}
console.log(JSON.stringify({ ...first, exactRepeat: !process.argv.includes("--single") }, null, 2));
