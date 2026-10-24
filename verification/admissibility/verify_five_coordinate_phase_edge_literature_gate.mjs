import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../../evidence/data/five-coordinate-phase-edge-literature-gate-v1.json", import.meta.url)));
assert.equal(data.protocol, "five-coordinate-phase-edge-literature-gate/1");
assert.deepEqual(data.requiredGraph.nodes, ["v_u", "v_d", "a_2"]);
assert.equal(data.requiredGraph.minimumEdges, 2);
assert.equal(data.candidateEdges.length, 2);
assert.deepEqual(data.candidateEdges.map(row => row.edge), [["v_u", "v_d"], ["v_u", "a_2"]]);
assert.equal(data.candidateEdges.every(row => /^https:\/\/arxiv\.org\/abs\//u.test(row.source)), true);
assert.match(data.candidateEdges[0].sourceNativeFact, /interference coefficient/i);
assert.match(data.candidateEdges[1].sourceNativeFact, /one coefficient nonzero at a time/i);
assert.equal(data.scaleBridge.status, "open");
assert.equal(data.verdict.graphTopology, "candidate spanning tree found");
assert.equal(data.verdict.operationalSignedGraph, "not closed");
console.log("PASS five-coordinate phase-edge literature gate");
console.log("candidate_edges=2 operational_edges=0");
console.log("scale_bridge=open");
