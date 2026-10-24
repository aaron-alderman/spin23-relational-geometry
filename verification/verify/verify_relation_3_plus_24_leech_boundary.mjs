import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json",
  "utf8",
));

const nodes = register.entries.map((entry) => entry.id);
const special = register.relations.filter((relation) => relation.type === "shares_action_not_carrier");
const backbone = register.relations.filter((relation) => relation.type !== "shares_action_not_carrier");

function incidence(edges) {
  return nodes.map((node) => edges.map((edge) =>
    (edge.to === node ? 1 : 0) - (edge.from === node ? 1 : 0)));
}

function rank(matrix, tolerance = 1e-9) {
  const work = matrix.map((row) => row.slice());
  const rowCount = work.length;
  const columnCount = work[0]?.length ?? 0;
  let pivotRow = 0;
  for (let column = 0; column < columnCount && pivotRow < rowCount; column += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < rowCount; row += 1) {
      if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    }
    if (Math.abs(work[pivot][column]) < tolerance) continue;
    [work[pivotRow], work[pivot]] = [work[pivot], work[pivotRow]];
    const scale = work[pivotRow][column];
    for (let j = column; j < columnCount; j += 1) work[pivotRow][j] /= scale;
    for (let row = 0; row < rowCount; row += 1) {
      if (row === pivotRow) continue;
      const factor = work[row][column];
      for (let j = column; j < columnCount; j += 1) {
        work[row][j] -= factor * work[pivotRow][j];
      }
    }
    pivotRow += 1;
  }
  return pivotRow;
}

function components(edges) {
  const adjacency = new Map(nodes.map((node) => [node, []]));
  for (const edge of edges) {
    adjacency.get(edge.from).push(edge.to);
    adjacency.get(edge.to).push(edge.from);
  }
  const seen = new Set();
  const result = [];
  for (const node of nodes) {
    if (seen.has(node)) continue;
    const queue = [node];
    const component = [];
    seen.add(node);
    while (queue.length > 0) {
      const current = queue.pop();
      component.push(current);
      for (const next of adjacency.get(current)) {
        if (!seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
    result.push(component.sort());
  }
  return result;
}

const specialRank = rank(incidence(special));
const backboneRank = rank(incidence(backbone));
const fullRank = rank(incidence(register.relations));
const backboneComponents = components(backbone);

const actual = {
  specialEdges: special.length,
  backboneEdges: backbone.length,
  specialRank,
  specialCycleRank: special.length - specialRank,
  backboneRank,
  backboneCycleRank: backbone.length - backboneRank,
  backboneComponents: backboneComponents.length,
  fullRank,
  fullCycleRank: register.relations.length - fullRank,
  newCycleClosures: (register.relations.length - fullRank) - (backbone.length - backboneRank),
};

const expected = {
  specialEdges: 3,
  backboneEdges: 24,
  specialRank: 3,
  specialCycleRank: 0,
  backboneRank: 14,
  backboneCycleRank: 10,
  backboneComponents: 2,
  fullRank: 15,
  fullCycleRank: 12,
  newCycleClosures: 2,
};

for (const [key, value] of Object.entries(expected)) {
  if (actual[key] !== value) throw new Error(`${key}: expected ${value}, received ${actual[key]}`);
}

const specialNodes = [...new Set(special.flatMap((edge) => [edge.from, edge.to]))].sort();
if (specialNodes.join(",") !== ["QS-001", "QS-002", "QS-005", "QS-011"].join(",")) {
  throw new Error(`unexpected special star nodes: ${specialNodes.join(",")}`);
}

if (!backboneComponents.some((component) => component.join(",") === "QS-001,QS-004")) {
  throw new Error("expected the backbone to isolate the QS-001/QS-004 triality-no-go component");
}

console.log(JSON.stringify({
  result: "pass",
  graphSplit: "27 = 3 shares-action edges + 24-edge backbone",
  specialStructure: "3 = 1 component bridge + 2 independent cycle closures",
  cycleStructure: "12 = 10 backbone cycles + 2 new mixed cycles",
  leechBoundary: "dimension_match_only_until_an_even_rootless_unimodular_gram_and_gluing_are_supplied",
  actual,
}, null, 2));

