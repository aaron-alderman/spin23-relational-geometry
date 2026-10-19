import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const graph = JSON.parse(readFileSync(new URL("corpus/concept-map/graph.json", root), "utf8"));

test("concept graph is typed, connected and epistemically explicit", () => {
  assert.equal(graph.schema, "spin23-concept-graph/v1");
  assert.ok(graph.nodes.length >= 25);
  assert.ok(graph.edges.length >= 35);
  const ids = new Set(graph.nodes.map(node => node.id));
  assert.equal(ids.size, graph.nodes.length);
  for (const edge of graph.edges) {
    assert.ok(ids.has(edge.source), edge.source);
    assert.ok(ids.has(edge.target), edge.target);
    assert.ok(edge.type);
    assert.ok(edge.status);
  }
  assert.ok(graph.edges.some(edge => edge.type === "analogous" && edge.status === "analogical"));
  assert.ok(graph.edges.some(edge => edge.type === "obstructs" && edge.status === "obstructed"));
  assert.ok(graph.nodes.some(node => node.id === "spin23" && node.status === "established"));
  assert.ok(graph.nodes.some(node => node.id === "observable" && node.status === "missing"));
});

test("generated Three.js atlas exists and uses pinned official module conventions", () => {
  for (const file of ["index.html", "concept-map.css", "concept-map.js", "concept-map-fallback.js", "graph-data.js"]) {
    assert.equal(existsSync(new URL(`docs/concept-map/${file}`, root)), true, file);
  }
  const html = readFileSync(new URL("docs/concept-map/index.html", root), "utf8");
  const script = readFileSync(new URL("docs/concept-map/concept-map.js", root), "utf8");
  assert.match(html, /three@0\.186\.0/u);
  assert.match(html, /role="img"/u);
  assert.match(script, /OrbitControls/u);
  assert.match(script, /CSS2DRenderer/u);
  assert.match(script, /statusColors/u);
  assert.match(html, /concept-map-fallback\.js/u);
});
