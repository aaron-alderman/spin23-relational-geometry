#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const snapshotPath = path.join(
  root,
  "corpus/programmes/frontier/wave-7/exceptional_27_relation_snapshot_v1.json",
);
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const register = JSON.parse(fs.readFileSync(path.join(root, snapshot.sourceRegister), "utf8"));

assert.equal(snapshot.schema, "exceptional-27-relation-audit/1");
assert.equal(register.entries.length, snapshot.nodeCount);
assert.equal(register.relations.length, snapshot.relationCount);
assert.deepEqual(register.relations.map((relation) => relation.id), snapshot.relationIds);

const actualTypeCounts = {};
for (const relation of register.relations) {
  actualTypeCounts[relation.type] = (actualTypeCounts[relation.type] ?? 0) + 1;
}
assert.deepEqual(actualTypeCounts, snapshot.typeCounts);
assert.equal(actualTypeCounts.shares_action_not_carrier, 3);
assert.equal(register.relations.length - actualTypeCounts.shares_action_not_carrier, 24);

const nodeIds = register.entries.map((entry) => entry.id);
const nodeIndex = new Map(nodeIds.map((id, index) => [id, index]));
const adjacency = Array.from({ length: nodeIds.length }, () => new Set());
for (const relation of register.relations) {
  const from = nodeIndex.get(relation.from);
  const to = nodeIndex.get(relation.to);
  assert.notEqual(from, undefined);
  assert.notEqual(to, undefined);
  adjacency[from].add(to);
  adjacency[to].add(from);
}

let components = 0;
const visited = new Set();
for (let start = 0; start < nodeIds.length; start += 1) {
  if (visited.has(start)) continue;
  components += 1;
  const queue = [start];
  visited.add(start);
  while (queue.length) {
    const current = queue.shift();
    for (const next of adjacency[current]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
}

function matrixRank(input, tolerance = 1e-10) {
  const matrix = input.map((row) => [...row]);
  const rows = matrix.length;
  const columns = matrix[0]?.length ?? 0;
  let rank = 0;
  for (let column = 0; column < columns && rank < rows; column += 1) {
    let pivot = rank;
    for (let row = rank + 1; row < rows; row += 1) {
      if (Math.abs(matrix[row][column]) > Math.abs(matrix[pivot][column])) pivot = row;
    }
    if (Math.abs(matrix[pivot][column]) <= tolerance) continue;
    [matrix[rank], matrix[pivot]] = [matrix[pivot], matrix[rank]];
    const scale = matrix[rank][column];
    for (let j = column; j < columns; j += 1) matrix[rank][j] /= scale;
    for (let row = 0; row < rows; row += 1) {
      if (row === rank) continue;
      const factor = matrix[row][column];
      for (let j = column; j < columns; j += 1) matrix[row][j] -= factor * matrix[rank][j];
    }
    rank += 1;
  }
  return rank;
}

const incidence = Array.from(
  { length: nodeIds.length },
  () => Array(register.relations.length).fill(0),
);
register.relations.forEach((relation, edge) => {
  incidence[nodeIndex.get(relation.from)][edge] = -1;
  incidence[nodeIndex.get(relation.to)][edge] = 1;
});

const incidenceRank = matrixRank(incidence);
const cycleRank = register.relations.length - nodeIds.length + components;
assert.equal(components, snapshot.graphInvariants.weakComponents);
assert.equal(incidenceRank, snapshot.graphInvariants.incidenceRank);
assert.equal(cycleRank, snapshot.graphInvariants.cycleRank);
assert.equal(incidenceRank + cycleRank, 27);

assert.ok(Object.values(snapshot.suppliedStructures).every((value) => value === false));
assert.equal(snapshot.exceptionalComparison.j3oDimension, 27);
assert.equal(snapshot.exceptionalComparison.e6FundamentalDimension, 27);
assert.equal(snapshot.exceptionalComparison.freudenthalDimension, 56);

console.log(JSON.stringify({
  result: "pass",
  graph: {
    nodes: nodeIds.length,
    relations: register.relations.length,
    weakComponents: components,
    incidenceRank,
    cycleRank,
    taxonomySplit: "3+24",
  },
  exceptionalAudit: {
    numericalCoincidence: true,
    e6ActionSupplied: false,
    invariantCubicSupplied: false,
    e8CompletionSupplied: false,
    verdict: snapshot.verdict,
  },
}, null, 2));

