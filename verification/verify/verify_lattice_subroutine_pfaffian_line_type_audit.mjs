import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/lattice-subroutine-pfaffian-line-type-audit-v1.json",
  import.meta.url
);
const audit = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

assert.equal(audit.lines.length, 5);
assert.equal(new Set(audit.lines.map((line) => line.base)).size, 5);
assert.equal(audit.candidateEdges.length, 4);
assert.ok(audit.candidateEdges.every((edge) => edge.status === "open"));

const adjacency = new Map(audit.lines.map((line) => [line.id, []]));
for (const edge of audit.candidateEdges) {
  if (edge.status === "established") adjacency.get(edge.from).push(edge.to);
}

const reachable = (source, target) => {
  const seen = new Set([source]);
  const queue = [source];
  for (let head = 0; head < queue.length; head += 1) {
    for (const next of adjacency.get(queue[head])) {
      if (next === target) return true;
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return false;
};

assert.equal(reachable("P1", "P4"), false);
assert.equal(reachable("P1", "P5"), false);
assert.equal(audit.terminalStatus, "open_no_complete_intertwiner_path");

console.log(JSON.stringify({
  lineCount: audit.lines.length,
  distinctBaseCount: new Set(audit.lines.map((line) => line.base)).size,
  openIntertwinerGates: audit.candidateEdges.length,
  modularToWeakPathEstablished: reachable("P1", "P4"),
  modularToFlavourPathEstablished: reachable("P1", "P5"),
  conclusion: "The Pfaffian lines are representation-compatible but remain differently typed until explicit pullbacks and fibre intertwiners are constructed."
}, null, 2));
console.log("PASS verify_lattice_subroutine_pfaffian_line_type_audit");
