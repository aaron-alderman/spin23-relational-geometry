#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd());
const sourceRoot = join(root, "tooling", "publication", "concept-map");
const outputRoot = join(root, "docs", "concept-map");
const graphPath = join(root, "corpus", "concept-map", "graph.json");

if (!existsSync(graphPath)) throw new Error(`Missing concept graph: ${graphPath}`);
const graph = JSON.parse(readFileSync(graphPath, "utf8"));
const nodeIds = new Set(graph.nodes.map(node => node.id));
if (nodeIds.size !== graph.nodes.length) throw new Error("Concept graph contains duplicate node ids.");
for (const node of graph.nodes) {
  if (!["established", "conditional", "underdetermined", "obstructed", "missing", "analogical"].includes(node.status)) throw new Error(`Unknown node status: ${node.id}/${node.status}`);
  if (![node.x, node.y, node.z].every(Number.isFinite)) throw new Error(`Node has invalid coordinates: ${node.id}`);
}
for (const edge of graph.edges) {
  if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) throw new Error(`Edge has missing endpoint: ${edge.source} -> ${edge.target}`);
}

mkdirSync(outputRoot, { recursive: true });
for (const file of ["index.html", "concept-map.css", "concept-map.js", "concept-map-fallback.js"]) cpSync(join(sourceRoot, file), join(outputRoot, file));
writeFileSync(join(outputRoot, "graph-data.js"), `window.SPIN23_CONCEPT_GRAPH = ${JSON.stringify(graph)};\n`);
console.log(JSON.stringify({ nodes: graph.nodes.length, edges: graph.edges.length, output: "docs/concept-map" }, null, 2));
