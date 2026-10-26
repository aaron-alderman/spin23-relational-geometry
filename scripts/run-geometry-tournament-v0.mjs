#!/usr/bin/env node
import assert from "node:assert/strict";

const grid = [-1, -0.5, 0, 0.5, 1].flatMap(x => [-1, -0.5, 0, 0.5, 1].map(y => ({ x, y })));
const geometries = {
  flat: p => ({ w: 0, gx: 0, gy: 0, width: 0, holonomy: 0 }),
  displaced: p => ({ w: 0.7, gx: 0, gy: 0, width: 0, holonomy: 0 }),
  tilt: p => ({ w: 0.65 * p.x, gx: 0.65, gy: 0, width: 0, holonomy: 0 }),
  bend: p => ({ w: 0.45 * (p.x ** 2 + p.y ** 2), gx: 0.9 * p.x, gy: 0.9 * p.y, width: 0, holonomy: 0 }),
  saddle: p => ({ w: 0.45 * (p.x ** 2 - p.y ** 2), gx: 0.9 * p.x, gy: -0.9 * p.y, width: 0, holonomy: 0 }),
  crease: p => ({ w: 0.65 * Math.abs(p.x), gx: 0.65 * Math.sign(p.x), gy: 0, width: 0, holonomy: 0 }),
  thickness: p => ({ w: 0, gx: 0, gy: 0, width: 0.35, holonomy: 0 }),
  gradedThickness: p => ({ w: 0, gx: 0, gy: 0, width: 0.15 + 0.2 * (p.x + 1) / 2, holonomy: 0 }),
  defect: p => { const e = Math.exp(-(p.x ** 2 + p.y ** 2) / 0.18); return { w: 0.65 * e, gx: -0.65 * 2 * p.x / 0.18 * e, gy: -0.65 * 2 * p.y / 0.18 * e, width: 0, holonomy: 0 }; },
  twist: p => ({ w: 0, gx: 0.35 * -p.y, gy: 0.35 * p.x, width: 0, holonomy: 0.3 * (p.x ** 2 + p.y ** 2) })
};
const readers = {
  projection: g => [1 / Math.sqrt(1 + g.gx ** 2 + g.gy ** 2)],
  attenuation: g => [Math.exp(-Math.abs(g.w))],
  signed: g => [g.w],
  phase: g => [Math.cos(g.w), Math.sin(g.w)],
  mixing: g => [g.gx / Math.sqrt(1 + g.gx ** 2 + g.gy ** 2), g.gy / Math.sqrt(1 + g.gx ** 2 + g.gy ** 2)],
  decoherence: g => [Math.exp(-(g.width ** 2)), g.width],
  holonomy: g => [g.holonomy]
};
const models = [
  ["flat_projection","flat","projection"], ["displacement_projection","displaced","projection"],
  ["displacement_attenuation","displaced","attenuation"], ["displacement_signed","displaced","signed"],
  ["tilt_projection","tilt","projection"], ["tilt_mixing","tilt","mixing"],
  ["bend_projection","bend","projection"], ["bend_phase","bend","phase"],
  ["saddle_projection","saddle","projection"], ["saddle_signed","saddle","signed"],
  ["crease_projection","crease","projection"], ["crease_phase","crease","phase"],
  ["thickness_decoherence","thickness","decoherence"], ["graded_thickness_decoherence","gradedThickness","decoherence"],
  ["defect_attenuation","defect","attenuation"], ["defect_phase","defect","phase"],
  ["twist_projection","twist","projection"], ["twist_mixing","twist","mixing"], ["twist_holonomy","twist","holonomy"],
  ["flat_holonomy","flat","holonomy"]
].map(([id, geometry, reader]) => ({ id, geometry, reader }));

const signature = (model, bundle = "declared") => {
  const chosen = bundle === "aggregateProjection" ? ["projection"] : bundle === "separating" ? Object.keys(readers) : [model.reader];
  return grid.flatMap(point => chosen.flatMap(reader => readers[reader](geometries[model.geometry](point))));
};
const normalizedAggregate = model => { const s = signature(model, "aggregateProjection"); const mean = s.reduce((a,b)=>a+b,0)/s.length; return s.map(v => v / mean); };
const key = values => values.map(value => value.toFixed(9)).join("|");
const groupBy = fn => Object.values(models.reduce((groups, model) => { const k = key(fn(model)); (groups[k] ??= []).push(model.id); return groups; }, {}));
const aggregateClasses = groupBy(normalizedAggregate);
const separatingClasses = groupBy(model => signature(model, "separating"));
const declaredClasses = groupBy(model => signature(model));

const uniqueModels = models.filter(model => declaredClasses.find(group => group.includes(model.id)).length === 1);
let state = 0x47454f4d;
const random = () => { state = (1664525 * state + 1013904223) >>> 0; return state / 2 ** 32; };
const gaussian = () => Math.sqrt(-2 * Math.log(Math.max(random(), 1e-12))) * Math.cos(2 * Math.PI * random());
const distance = (a,b) => a.reduce((sum,value,index)=>sum+(value-b[index])**2,0);
let correct = 0; let total = 0; const confusions = {};
for (const truth of uniqueModels) for (let trial = 0; trial < 100; trial += 1) {
  const clean = signature(truth); const noisy = clean.map(value => value + 0.01 * gaussian());
  const ranked = uniqueModels.filter(candidate => candidate.reader === truth.reader)
    .map(candidate => ({ id: candidate.id, d: distance(noisy, signature(candidate)) })).sort((a,b)=>a.d-b.d);
  total += 1; if (ranked[0].id === truth.id) correct += 1; else confusions[`${truth.id}->${ranked[0].id}`] = (confusions[`${truth.id}->${ranked[0].id}`] ?? 0) + 1;
}

const result = {
  schemaVersion: "0.1.0", grammar: { geometries: Object.keys(geometries), readers: Object.keys(readers), modelCount: models.length },
  reduction: {
    aggregateUncalibratedProjectionClassCount: aggregateClasses.length,
    declaredReaderClassCount: declaredClasses.length,
    separatingBundleClassCount: separatingClasses.length,
    aggregateAliases: aggregateClasses.filter(group => group.length > 1),
    declaredAliases: declaredClasses.filter(group => group.length > 1),
    separatingAliases: separatingClasses.filter(group => group.length > 1)
  },
  syntheticRecovery: { noiseSigma: 0.01, trialsPerUniqueDeclaredClass: 100, uniqueDeclaredModels: uniqueModels.length, accuracy: correct / total, confusions },
  gates: {
    invisibleWithoutReader: ["displacement_projection"],
    requiresAbsoluteOrDistanceSensitiveReader: ["displacement_attenuation", "displacement_signed"],
    requiresDistributionSensitiveReader: ["thickness_decoherence", "graded_thickness_decoherence"],
    requiresLoopReader: ["twist_holonomy"],
    rule: "retire or merge aliases before real-data fitting; add a reader only when it separates a preregistered equivalence class"
  }
};
assert.ok(result.reduction.aggregateUncalibratedProjectionClassCount < models.length);
assert.ok(result.reduction.separatingBundleClassCount > result.reduction.aggregateUncalibratedProjectionClassCount);
assert.ok(result.syntheticRecovery.accuracy > 0.95);
console.log(JSON.stringify(result, null, 2));
