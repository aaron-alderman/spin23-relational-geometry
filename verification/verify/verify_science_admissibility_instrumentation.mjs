import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const path = "corpus/programmes/frontier/wave-7/science_admissibility_instrumentation_v1.json";
const graphPath = "corpus/programmes/quotient-scars/quotient_scar_register_v1.json";
const atlas = read(path);
const graph = read(graphPath);
const edge = new Map(graph.relations.map((item) => [item.id, item]));
assert.equal(atlas.sourceSha256, crypto.createHash("sha256").update(fs.readFileSync(graphPath)).digest("hex"));
assert.deepEqual(atlas.counts, {constructive:12, guardrail:15, return:12, total:39});
assert.equal(atlas.items.length, 39);
assert.equal(new Set(atlas.items.map((item) => item.id)).size, 39);
for (const field of atlas.fieldContract) for (const item of atlas.items) {
  assert(field in item, `${item.id} missing ${field}`);
  assert(item[field] !== "" && item[field] !== null, `${item.id} empty ${field}`);
}
assert.deepEqual(Object.fromEntries(["constructive","guardrail","return"].map((family) =>
  [family, atlas.items.filter((item) => item.family === family).length])), {constructive:12, guardrail:15, return:12});
for (const item of atlas.items) {
  const relation = edge.get(item.relationId);
  assert(relation);
  assert.equal(item.source.id, relation.from);
  assert.equal(item.target.id, relation.to);
  assert(item.observable.length > 0 && item.sourceRefs.length > 0);
  if (item.family === "return") {
    const balance = Object.fromEntries(graph.entries.map((entry) => [entry.id, 0]));
    for (const edgeId of item.cycleEdgeIds) {
      const e = edge.get(edgeId); balance[e.from] -= 1; balance[e.to] += 1;
    }
    // An undirected fundamental cycle needs signs; verify the selected edge set
    // instead by degree parity, which is orientation-independent.
    const degree = Object.fromEntries(graph.entries.map((entry) => [entry.id, 0]));
    for (const edgeId of item.cycleEdgeIds) { const e=edge.get(edgeId); degree[e.from]++; degree[e.to]++; }
    assert(Object.values(degree).every((value) => value === 0 || value === 2), `${item.id} is not a simple fundamental cycle`);
  }
}
assert.deepEqual(atlas.experimentCatalogue, {declaredNodeClasses:16, usedTargetPlatforms:14, sourceOnlyNodes:["QS-004","QS-008"]});
assert.equal(new Set(atlas.items.map((item) => item.platform)).size, 14);
console.log(JSON.stringify({status:"PASS", counts:atlas.counts, experimentCatalogue:atlas.experimentCatalogue, fieldsPerItem:atlas.fieldContract.length}));
