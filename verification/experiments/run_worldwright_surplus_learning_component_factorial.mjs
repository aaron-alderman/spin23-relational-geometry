#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectionRoot = process.argv[2];
if (!projectionRoot) {
  throw new Error("usage: node run_worldwright_surplus_learning_component_factorial.mjs <exact-sourcery-projection-root> [--single]");
}

const paths = {
  engine: "layers/capabilities/plugins/sourcery-agent-simulation/engine.mjs",
  owner: "layers/applications/products/worldwright-laboratory/worldwright-execution-owner-v5-1.mjs",
  surface: "layers/applications/products/worldwright-laboratory/worldwright-urgency-delay-response-surface-diagnostic-v1.mjs",
};
const expectedHashes = {
  engine: "ae160c2cf07eb2ce2b3c11bbb42828cbc27023e41e5f272f1a6f8243cf55fe17",
  owner: "2026f456a08802de0e272dd443b15f8a873725cbe4079a16e9b9b02fd6581f7f",
  surface: "8704965ded83fd1130d83f2a72625987d691eb97989b6af3ed4614c69b9d690c",
};
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
for (const [key, relative] of Object.entries(paths)) {
  const actual = sha256(await readFile(resolve(projectionRoot, relative)));
  if (actual !== expectedHashes[key]) throw new Error(`${key} source hash mismatch: ${actual}`);
}

const engine = await import(pathToFileURL(resolve(projectionRoot, paths.engine)));
const owner = await import(pathToFileURL(resolve(projectionRoot, paths.owner)));
const surface = await import(pathToFileURL(resolve(projectionRoot, paths.surface)));
const { contentHash, runAgentSimulation, validateSimulationDefinition } = engine;
const { WORLDWRIGHT_DEFINITION, deriveWorldwrightOutcome } = owner;
const { WORLDWRIGHT_RESPONSE_AXES, buildWorldwrightResponseScenario } = surface;

const INFLUENCE_IDS = ["influence.a.surplus-learning", "influence.b.surplus-learning"];
const OFFSETS = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];
const WEIGHTS = [0.08, 0.12, 0.3, 0.3, 0.12, 0.08];
const SEEDS = Array.from({ length: 10 }, (_, index) => 98301 + index);
const EPSILON = 1e-9;
const round = (value, places = 12) => Number(value.toFixed(places));
const key = (material, delay, urgency, seed) => `${material}:${delay}:${urgency}:${seed}`;
const invariant = (condition, message) => { if (!condition) throw new Error(message); };

function definitionFor(transition, learningScale, healthScale) {
  const definition = structuredClone(WORLDWRIGHT_DEFINITION);
  const influences = [];
  for (const influence of definition.influences) {
    if (!INFLUENCE_IDS.includes(influence.id)) {
      influences.push(influence);
      continue;
    }
    const make = (threshold, weight, index) => ({
      ...structuredClone(influence),
      id: influence.id + (transition === "smooth2" ? `.smooth-${index}` : ""),
      conditions: [{ ...influence.conditions[0], threshold }],
      effects: influence.effects.map(effect => ({
        ...effect,
        delta: round(effect.delta * weight * (
          effect.resource.endsWith(".learning") ? learningScale : healthScale
        )),
      })),
    });
    if (transition === "hard") influences.push(make(40, 1, 0));
    else OFFSETS.forEach((offset, index) => influences.push(make(40 + 2 * offset, WEIGHTS[index], index)));
  }
  definition.influences = influences;
  validateSimulationDefinition(definition);
  return definition;
}

function runCondition(transition, learningScale, healthScale) {
  const definition = definitionFor(transition, learningScale, healthScale);
  const cells = [];
  for (const material of WORLDWRIGHT_RESPONSE_AXES.initialMaterial)
    for (const delay of WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick)
      for (const urgency of WORLDWRIGHT_RESPONSE_AXES.urgencyMultiplier)
        for (const seed of SEEDS) {
          const visible = buildWorldwrightResponseScenario({ initialMaterial: material, mediatedDeliveryTick: delay, urgencyMultiplier: urgency, seed, kind: "visible" });
          const mediated = buildWorldwrightResponseScenario({ initialMaterial: material, mediatedDeliveryTick: delay, urgencyMultiplier: urgency, seed, kind: "mediated" });
          invariant(visible.metadata.initialStateHash === mediated.metadata.initialStateHash, "paired initial state mismatch");
          const visibleOutcome = deriveWorldwrightOutcome(runAgentSimulation(definition, visible));
          const mediatedOutcome = deriveWorldwrightOutcome(runAgentSimulation(definition, mediated));
          cells.push({ material, delay, urgency, seed, delta: round(mediatedOutcome.relational - visibleOutcome.relational) });
        }
  const cellMap = new Map(cells.map(cell => [key(cell.material, cell.delay, cell.urgency, cell.seed), cell]));
  const contrasts = {};
  let activeContrasts = 0, totalAbsoluteChange = 0, positive = 0, negative = 0;
  for (const material of WORLDWRIGHT_RESPONSE_AXES.initialMaterial)
    for (const urgency of WORLDWRIGHT_RESPONSE_AXES.urgencyMultiplier)
      for (const seed of SEEDS)
        for (let index = 1; index < WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick.length; index++) {
          const from = WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick[index - 1];
          const to = WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick[index];
          const contrastKey = key(material, `${from}-${to}`, urgency, seed);
          const change = round(cellMap.get(key(material, to, urgency, seed)).delta - cellMap.get(key(material, from, urgency, seed)).delta);
          contrasts[contrastKey] = change;
          if (Math.abs(change) > EPSILON) {
            activeContrasts++;
            totalAbsoluteChange = round(totalAbsoluteChange + Math.abs(change));
            if (change > 0) positive++; else negative++;
          }
        }
  return { transition, learningScale, healthScale, definitionHash: contentHash(definition), pairedCells: cells.length, modelRuns: cells.length * 2, active: activeContrasts, totalAbsoluteChange, positive, negative, contrasts };
}

function execute() {
  const raw = [];
  for (const transition of ["hard", "smooth2"])
    for (const learningScale of [0, 1])
      for (const healthScale of [0, 1]) raw.push(runCondition(transition, learningScale, healthScale));
  const select = (transition, learningScale, healthScale) => raw.find(item => item.transition === transition && item.learningScale === learningScale && item.healthScale === healthScale);
  const summaries = {};
  for (const transition of ["hard", "smooth2"]) {
    const neither = select(transition, 0, 0), learning = select(transition, 1, 0), health = select(transition, 0, 1), both = select(transition, 1, 1);
    let learningNecessaryContrasts = 0, healthNecessaryContrasts = 0, interactionActiveContrasts = 0, interactionL1 = 0, additiveReproductionCount = 0;
    for (const contrastKey of Object.keys(both.contrasts)) {
      const learningNecessity = round(both.contrasts[contrastKey] - health.contrasts[contrastKey]);
      const healthNecessity = round(both.contrasts[contrastKey] - learning.contrasts[contrastKey]);
      const interaction = round(both.contrasts[contrastKey] - learning.contrasts[contrastKey] - health.contrasts[contrastKey] + neither.contrasts[contrastKey]);
      if (Math.abs(learningNecessity) > EPSILON) learningNecessaryContrasts++;
      if (Math.abs(healthNecessity) > EPSILON) healthNecessaryContrasts++;
      if (Math.abs(interaction) > EPSILON) { interactionActiveContrasts++; interactionL1 = round(interactionL1 + Math.abs(interaction)); }
      if (Math.abs(interaction) <= EPSILON) additiveReproductionCount++;
    }
    const compact = item => ({ active: item.active, total: item.totalAbsoluteChange });
    summaries[transition] = { conditions: { neither: compact(neither), learningOnly: compact(learning), healthOnly: compact(health), both: compact(both) }, learningNecessaryContrasts, healthNecessaryContrasts, interactionActiveContrasts, interactionL1, additiveReproductionCount, totalContrasts: 480 };
  }
  const conditions = raw.map(({ contrasts, ...condition }) => condition);
  const basis = { protocol: "worldwright/surplus-learning-component-factorial.local-v1", axes: { transitions: ["hard", "smooth2"], learningScale: [0, 1], healthScale: [0, 1], seeds: SEEDS }, conditionCount: 8, totalPairedCells: conditions.reduce((sum, condition) => sum + condition.pairedCells, 0), modelRunsPerExecution: conditions.reduce((sum, condition) => sum + condition.modelRuns, 0), conditions, summary: summaries, authority: "synthetic-mechanism-only", empiricalValidation: "blocked", policyAuthority: "none", physicsAuthority: "none" };
  return { ...basis, factorialHash: contentHash(basis) };
}

const first = execute();
if (!process.argv.includes("--single")) {
  const second = execute();
  invariant(first.factorialHash === second.factorialHash && JSON.stringify(first) === JSON.stringify(second), "exact repeat failed");
}
console.log(JSON.stringify({ ...first, exactRepeat: !process.argv.includes("--single") }, null, 2));
