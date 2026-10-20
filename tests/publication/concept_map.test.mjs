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
  const stylesheet = readFileSync(new URL("docs/concept-map/concept-map.css", root), "utf8");
  const graphData = readFileSync(new URL("docs/concept-map/graph-data.js", root), "utf8");
  const script = readFileSync(new URL("docs/concept-map/concept-map.js", root), "utf8");
  const fallback = readFileSync(new URL("docs/concept-map/concept-map-fallback.js", root), "utf8");
  assert.match(html, /three@0\.186\.0/u);
  assert.match(html, /role="region"/u);
  assert.match(script, /OrbitControls/u);
  assert.match(script, /CSS2DRenderer/u);
  assert.match(script, /statusColors/u);
  assert.match(script, /color: statusColors\[edge\.status\]/u);
  assert.match(script, /function labelLayout\(\)/u);
  assert.match(script, /intersectionArea/u);
  assert.match(script, /document\.createElement\("button"\)/u);
  assert.match(script, /aria-controls", "detail"/u);
  assert.match(script, /class="connection-button" data-node-id/u);
  assert.match(script, /localEvidenceHref/u);
  assert.match(fallback, /strokeStyle = getColor\(edge\.status\)/u);
  assert.match(fallback, /overlapArea/u);
  assert.match(fallback, /labelHits/u);
  assert.match(fallback, /data-node-id/u);
  assert.match(html, /concept-map-fallback\.js/u);
  assert.match(html, /Edge status colour/u);
  assert.match(html, /solid = derives \/ realizes/u);
  assert.match(html, /class="stage-shell"/u);
  assert.match(stylesheet, /\.stage-shell\s*\{[^}]*grid-template-columns/u);
  assert.match(stylesheet, /\.detail\s*\{[^}]*position:relative/u);
  assert.doesNotMatch(stylesheet, /\.detail\s*\{[^}]*position:absolute/u);
  assert.match(stylesheet, /\.graph-label-anchor/u);
  assert.match(stylesheet, /\.graph-label\s*\{[^}]*max-width/u);
  assert.match(stylesheet, /\.graph-label\s*\{[^}]*pointer-events:auto/u);
  assert.match(stylesheet, /\.connection-button/u);
  assert.match(stylesheet, /\.edge-swatch\.conditional/u);
  assert.match(graphData, /H₂\(ℝ\)/u);
  assert.match(graphData, /J₃\(𝕆\)/u);
  assert.match(graphData, /Sp\(4,ℝ\)/u);
});
