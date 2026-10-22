#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectionRoot = process.argv[2];
if (!projectionRoot) throw new Error("usage: node run_worldwright_identity_functional_form_robustness.mjs <exact-sourcery-projection-root> [--single]");

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
const { contentHash, runAgentSimulation } = engine;
const { WORLDWRIGHT_DEFINITION, WORLDWRIGHT_GENERATOR, deriveWorldwrightOutcome } = owner;
const { WORLDWRIGHT_RESPONSE_AXES, buildWorldwrightResponseScenario } = surface;

const LEVELS = [0, 0.25, 0.5, 0.75, 1];
const SEEDS = Array.from({ length: 10 }, (_, index) => 98311 + index);
const EPSILON = 1e-9;
const round = (value, places = 12) => Number(value.toFixed(places));
const cellKey = (material, delay, urgency, seed) => `${material}:${delay}:${urgency}:${seed}`;
const invariant = (condition, message) => { if (!condition) throw new Error(message); };
const logistic = salience => {
  const sigmoid = value => 1 / (1 + Math.exp(-8 * (value - 0.5)));
  const low = sigmoid(0), high = sigmoid(1);
  return (sigmoid(salience) - low) / (high - low);
};
const FORMS = Object.freeze({
  linear: salience => salience,
  convexQuadratic: salience => salience ** 2,
  concaveSquareRoot: salience => Math.sqrt(salience),
  normalizedLogistic: logistic,
  thresholdHalf: salience => salience >= 0.5 ? 1 : 0,
  nullControl: () => 0,
});

function withIdentity(base, kind, authoredSalience, effectiveSalience) {
  const scenario = structuredClone(base);
  const profile = WORLDWRIGHT_GENERATOR.profiles[kind];
  const identity = 0.22 * effectiveSalience * (profile.participation - profile.bypass);
  const values = {
    autonomy: 0.35 * profile.participation - 0.55 * profile.bypass + identity,
    legitimacy: 0.45 * profile.participation - 0.5 * profile.bypass + 0.2 * profile.disclosure + identity,
    learning: 0.25 * profile.participation - 0.1 * profile.bypass - 0.1 * profile.coordinationBurden + 0.5 * identity,
    resilience: 0.2 * profile.participation - 0.05 * profile.bypass - 0.1 * profile.coordinationBurden,
  };
  const shock = scenario.shocks.find(item => item.kind === "relational-mechanism-window");
  invariant(shock, "relational mechanism shock missing");
  shock.effects = ["a", "b"].flatMap(region => Object.entries(values).map(([coordinate, delta]) => ({ resource: `${region}.${coordinate}`, delta })));
  scenario.metadata.identitySalience = authoredSalience;
  scenario.metadata.identityEffectiveSalience = round(effectiveSalience);
  delete scenario.contentHash;
  scenario.contentHash = contentHash(scenario);
  return scenario;
}

function executeCondition(formId, authoredSalience) {
  const effectiveSalience = FORMS[formId](authoredSalience);
  invariant(Number.isFinite(effectiveSalience) && effectiveSalience >= 0 && effectiveSalience <= 1, "invalid effective salience");
  const cells = [];
  for (const material of WORLDWRIGHT_RESPONSE_AXES.initialMaterial)
    for (const delay of WORLDWRIGHT_RESPONSE_AXES.mediatedDeliveryTick)
      for (const urgency of WORLDWRIGHT_RESPONSE_AXES.urgencyMultiplier)
        for (const seed of SEEDS) {
          const visible = withIdentity(buildWorldwrightResponseScenario({ initialMaterial: material, mediatedDeliveryTick: delay, urgencyMultiplier: urgency, seed, kind: "visible" }), "visible", authoredSalience, effectiveSalience);
          const mediated = withIdentity(buildWorldwrightResponseScenario({ initialMaterial: material, mediatedDeliveryTick: delay, urgencyMultiplier: urgency, seed, kind: "mediated" }), "mediated", authoredSalience, effectiveSalience);
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
    formId, authoredSalience, effectiveSalience: round(effectiveSalience), pairedCells: cells.length,
    modelRuns: cells.length * 2, winnerCounts,
    meanRelationalDelta: round(cells.reduce((sum, cell) => sum + cell.relational, 0) / cells.length),
    meanOverallDelta: round(cells.reduce((sum, cell) => sum + cell.overall, 0) / cells.length), cells,
  };
}

function execute() {
  const forms = [];
  for (const formId of Object.keys(FORMS)) {
    const raw = LEVELS.map(level => executeCondition(formId, level));
    const zero = new Map(raw[0].cells.map(cell => [cellKey(cell.material, cell.delay, cell.urgency, cell.seed), cell]));
    const winnerChangesFromZero = {};
    let relationalMonotonicViolations = 0, overallMonotonicViolations = 0;
    for (const result of raw) {
      winnerChangesFromZero[String(result.authoredSalience)] = result.cells.filter(cell => cell.winner !== zero.get(cellKey(cell.material, cell.delay, cell.urgency, cell.seed)).winner).length;
    }
    for (const base of raw[0].cells) {
      const key = cellKey(base.material, base.delay, base.urgency, base.seed);
      const series = raw.map(result => result.cells.find(cell => cellKey(cell.material, cell.delay, cell.urgency, cell.seed) === key));
      for (let index = 1; index < series.length; index++) {
        if (series[index].relational + EPSILON < series[index - 1].relational) relationalMonotonicViolations++;
        if (series[index].overall + EPSILON < series[index - 1].overall) overallMonotonicViolations++;
      }
    }
    forms.push({
      formId,
      conditions: raw.map(({ cells, ...condition }) => condition),
      winnerChangesFromZero,
      endpointWinnerChanges: winnerChangesFromZero["1"],
      relationalMonotonicViolations,
      overallMonotonicViolations,
      retentionGatePassed: winnerChangesFromZero["1"] > 0,
    });
  }
  const normalizedForms = forms.filter(form => form.formId !== "nullControl");
  const nullControl = forms.find(form => form.formId === "nullControl");
  const basis = {
    protocol: "worldwright/identity-functional-form-robustness.local-v1",
    sourceSnapshotId: "bff142b8-1ae9-4f7b-ba2e-9631d2ccfdaf",
    levels: LEVELS,
    seeds: SEEDS,
    formCount: forms.length,
    conditionCount: forms.length * LEVELS.length,
    totalPairedCells: forms.reduce((sum, form) => sum + form.conditions.reduce((subtotal, condition) => subtotal + condition.pairedCells, 0), 0),
    modelRunsPerExecution: forms.reduce((sum, form) => sum + form.conditions.reduce((subtotal, condition) => subtotal + condition.modelRuns, 0), 0),
    forms,
    hypotheses: {
      endpointRetentionInvariantAcrossNormalizedForms: normalizedForms.every(form => form.endpointWinnerChanges === 87),
      monotoneDirectionInvariantAcrossNormalizedForms: normalizedForms.every(form => form.relationalMonotonicViolations === 0 && form.overallMonotonicViolations === 0),
      nullControlEliminatesIdentityResponse: nullControl.endpointWinnerChanges === 0 && !nullControl.retentionGatePassed,
      intermediateClassificationPathDependsOnFunctionalForm: new Set(normalizedForms.map(form => JSON.stringify(form.winnerChangesFromZero))).size > 1,
    },
    interpretation: {
      status: "synthetic-functional-form-sensitivity-only",
      endpointClaim: "decision relevance is tested only for normalized zero-to-one endpoint contrast",
      curveClaim: "not identified",
    },
    empiricalValidation: "blocked", policyAuthority: "none", moralAuthority: "none", demographicAuthority: "none", physicsAuthority: "none",
  };
  return { ...basis, robustnessHash: contentHash(basis) };
}

const first = execute();
if (!process.argv.includes("--single")) {
  const second = execute();
  invariant(first.robustnessHash === second.robustnessHash && JSON.stringify(first) === JSON.stringify(second), "exact repeat failed");
}
console.log(JSON.stringify({ ...first, exactRepeat: !process.argv.includes("--single") }, null, 2));
