import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const atlasPath = path.join(root, "corpus", "programmes", "common-operator-atlas", "common_operator_atlas_v1.json");
const atlas = JSON.parse(fs.readFileSync(atlasPath, "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(atlas.schemaVersion === "common-operator-atlas-v1", "schema version mismatch");
assert(atlas.nodes.length === 32, `expected 32 diagram nodes, found ${atlas.nodes.length}`);
assert(atlas.families.length === 5, "expected five diagram families");
assert(atlas.edgeTypes.length === 9, "expected nine edge types");

const ids = new Set(atlas.nodes.map((node) => node.id));
assert(ids.size === atlas.nodes.length, "node ids are not unique");
for (const node of atlas.nodes) {
  assert(atlas.families.includes(node.family), `unknown family for ${node.id}`);
  assert(atlas.coverageLabels.includes(node.coverage), `unknown coverage for ${node.id}`);
  assert(Array.isArray(node.links), `links missing for ${node.id}`);
  for (const link of node.links) {
    const resolved = path.resolve(path.dirname(atlasPath), link);
    assert(fs.existsSync(resolved), `missing corpus link for ${node.id}: ${link}`);
  }
}

for (const edge of atlas.edges) {
  assert(ids.has(edge.from), `unknown edge source ${edge.from}`);
  assert(ids.has(edge.to), `unknown edge target ${edge.to}`);
  assert(atlas.edgeTypes.includes(edge.type), `unknown edge type ${edge.type}`);
  assert(typeof edge.scope === "string" && edge.scope.length > 20, `unscoped edge ${edge.from}->${edge.to}`);
}

const counts = Object.fromEntries(atlas.coverageLabels.map((label) => [label, atlas.nodes.filter((node) => node.coverage === label).length]));
assert(counts.filled > 0 && counts.partial > 0 && counts.unfilled > 0, "coverage atlas must retain filled, partial and unfilled zones");
assert(atlas.nodes.filter((node) => node.family === "sequence_models" && node.coverage === "unfilled").length >= 4, "sequence-model gap is not preserved");
assert(/does not identify carriers/i.test(atlas.authorityBoundary), "authority boundary missing carrier refusal");

const baselineUnfilled = atlas.nodes.filter((node) => node.coverage === "unfilled").map((node) => node.id).sort();
const closed = [...atlas.investigationClosure.closedNodeIds].sort();
assert(JSON.stringify(baselineUnfilled) === JSON.stringify(closed), "follow-on closure does not cover every baseline-unfilled node");
for (const document of atlas.investigationClosure.documents) {
  assert(fs.existsSync(path.join(path.dirname(atlasPath), document)), `missing closure document: ${document}`);
}
assert(atlas.investigationClosure.remainingImplementationFrontier.length === 0, "control implementation queue is not closed");
assert(atlas.investigationClosure.nextResearchFrontier.length >= 4, "hardware and nonlinear frontiers were erased");

const dynatologyKeys = ["X", "A", "T", "J", "rho", "L", "D", "I", "R"];
assert(dynatologyKeys.every((key) => typeof atlas.dynatologyMapping[key] === "string"), "dynatology mapping incomplete");

console.log(JSON.stringify({
  status: "PASS",
  nodes: atlas.nodes.length,
  edges: atlas.edges.length,
  families: atlas.families.length,
  coverage: counts,
  verdict: "The diagram is represented as a typed candidate-translation atlas with explicit corpus coverage and physical authority boundaries."
}, null, 2));
