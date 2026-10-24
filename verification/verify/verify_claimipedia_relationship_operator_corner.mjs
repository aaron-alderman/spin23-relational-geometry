import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const lane = path.join(root, "corpus/programmes/frontier/wave-7");
const source = JSON.parse(
  fs.readFileSync(path.join(lane, "claimipedia_relationship_operator_source_v1.json"), "utf8"),
);
const ledger = JSON.parse(
  fs.readFileSync(path.join(lane, "claimipedia_relationship_operator_algebra_v1.json"), "utf8"),
);
const closedLedger = JSON.parse(
  fs.readFileSync(path.join(lane, "claimipedia_spin_temple_closed_carrier_v1.json"), "utf8"),
);

const edges = source.edges;
const nodes = new Set(edges.flatMap(([from, to]) => [from, to]));
const distinctEdges = new Set(edges.map((edge) => JSON.stringify(edge)));
const counts = Object.fromEntries(["Challenges", "DependsOn", "Qualifies", "Supports"].map((type) => [type, 0]));
for (const [, , type] of edges) counts[type] += 1;

if (edges.length !== 43 || nodes.size !== 38 || distinctEdges.size !== 41) {
  throw new Error("captured graph census mismatch");
}
if (JSON.stringify(counts) !== JSON.stringify(ledger.relationTypeCounts)) {
  throw new Error("relation-type census mismatch");
}

const spin = "claim.grandThesis.spin-2-3";
const temple = "claim.grandThesis.temple-sourcery";
const kenosis = "claim.grandThesis.christianity-kenosis";
const has = (from, to, type) => edges.some((edge) => edge[0] === from && edge[1] === to && edge[2] === type);
if (!has(spin, temple, "Supports") || !has(temple, spin, "Qualifies")) {
  throw new Error("Spin--Temple opposite-arrow corner missing");
}
if (!has(kenosis, temple, "Qualifies")) {
  throw new Error("kenosis descent obstruction missing");
}

// Basis order: Spin, Temple.
const q = [[0, 1], [0, 0]];
const s = [[0, 0], [1, 0]];
const add = (a, b) => a.map((row, i) => row.map((value, j) => value + b[i][j]));
const sub = (a, b) => a.map((row, i) => row.map((value, j) => value - b[i][j]));
const scale = (a, scalar) => a.map((row) => row.map((value) => scalar * value));
const mul = (a, b) => a.map((row, i) => row.map((_, j) => row.reduce((sum, __, k) => sum + a[i][k] * b[k][j], 0)));
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const zero = [[0, 0], [0, 0]];
const identity = [[1, 0], [0, 1]];
const h = sub(mul(q, s), mul(s, q));

if (!equal(mul(q, q), zero) || !equal(mul(s, s), zero)) throw new Error("nilpotent root operators failed");
if (!equal(sub(mul(h, q), mul(q, h)), scale(q, 2))) throw new Error("[h,q]=2q failed");
if (!equal(sub(mul(h, s), mul(s, h)), scale(s, -2))) throw new Error("[h,s]=-2s failed");
if (!equal(add(mul(q, s), mul(s, q)), identity)) throw new Error("matrix-unit closure failed");
if (ledger.spinTempleCorner.fullSp4Established) throw new Error("local sl2 corner was improperly promoted");

const visible = new Set([spin, temple]);
let changed = true;
while (changed) {
  changed = false;
  for (const [from, to] of edges) {
    if (visible.has(to) && !visible.has(from)) {
      visible.add(from);
      changed = true;
    }
  }
}
const hiddenToVisible = edges.filter(([from, to]) => !visible.has(from) && visible.has(to));
if (hiddenToVisible.length !== 0 || visible.size !== 15) {
  throw new Error("predecessor-closed carrier mismatch");
}
const visibleEdges = edges.filter(([from, to]) => visible.has(from) && visible.has(to));
if (visibleEdges.length !== 17) throw new Error("closed-carrier edge census mismatch");
const reverseTypedPairs = [];
for (const [from, to, type] of visibleEdges) {
  for (const [reverseFrom, reverseTo, reverseType] of visibleEdges) {
    if (from === reverseTo && to === reverseFrom && type !== reverseType) {
      const key = JSON.stringify([[from, to, type], [reverseFrom, reverseTo, reverseType]].sort());
      if (!reverseTypedPairs.includes(key)) reverseTypedPairs.push(key);
    }
  }
}
if (reverseTypedPairs.length !== 1 || closedLedger.predecessorClosedCarrier.reverseTypedPairCount !== 1) {
  throw new Error("reverse-typed pair census mismatch");
}
if (closedLedger.interpretation.secondSimpleRootFound || closedLedger.interpretation.spin23Established) {
  throw new Error("closed carrier was improperly promoted to C2/Spin(2,3)");
}

console.log(JSON.stringify({
  status: "PASS",
  nodes: nodes.size,
  relationships: edges.length,
  distinctEdges: distinctEdges.size,
  sl2Corner: true,
  descentObstruction: [kenosis, temple, "Qualifies"],
  predecessorClosedNodes: visible.size,
  predecessorClosedEdges: visibleEdges.length,
  reverseTypedPairs: reverseTypedPairs.length,
  fullSp4Withheld: true,
}));
