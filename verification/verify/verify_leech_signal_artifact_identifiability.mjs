#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-signal-artifact-identifiability-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-signal-artifact-identifiability-v1', 'wrong schema');
assert(record.theorem.baseDesign.rank === 2, 'wrong base rank');
assert(record.theorem.baseDesign.nullity === 1, 'base confounding not certified');
assert(record.theorem.routeSwappedInjectionDesign.rows === 16, 'factorial cells missing');
assert(record.theorem.routeSwappedInjectionDesign.rank === 8, 'controlled design not full rank');
assert(record.theorem.routeSwappedInjectionDesign.nullity === 0, 'controlled design has unresolved nullity');
assert(record.theorem.adversarialExtension.rank === 8, 'wrong adversarial rank');
assert(record.theorem.adversarialExtension.nullity === 1, 'route-following collision not certified');
assert(record.theorem.adversarialExtension.exactCollision.join('|') === 'physical_routed_signal|route_following_artifact', 'wrong exact collision');
assert(record.factorialCells.length === 16, 'wrong cell count');
assert(record.executionContract.some(step => step.includes('second physical modality')), 'irreducible-boundary control missing');

console.log(JSON.stringify({
  status: 'PASS',
  baseRank: record.theorem.baseDesign.rank,
  baseNullity: record.theorem.baseDesign.nullity,
  controlledRank: record.theorem.routeSwappedInjectionDesign.rank,
  controlledNullity: record.theorem.routeSwappedInjectionDesign.nullity,
  adversarialRank: record.theorem.adversarialExtension.rank,
  adversarialNullity: record.theorem.adversarialExtension.nullity,
  factorialCells: record.factorialCells.length
}));
