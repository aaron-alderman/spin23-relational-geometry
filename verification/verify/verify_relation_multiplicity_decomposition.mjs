import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json",
  "utf8",
));

const expectedCounts = {
  extends_to: 7,
  instantiates: 5,
  requires_enrichment: 5,
  separates_from: 5,
  shares_action_not_carrier: 3,
  rules_out_identification: 2,
};

const counts = Object.fromEntries(Object.keys(expectedCounts).map((key) => [key, 0]));
for (const relation of register.relations) {
  if (!(relation.type in counts)) throw new Error(`unexpected relation type: ${relation.type}`);
  counts[relation.type] += 1;
}

for (const [type, expected] of Object.entries(expectedCounts)) {
  if (counts[type] !== expected) {
    throw new Error(`${type}: expected ${expected}, received ${counts[type]}`);
  }
}

const nodes = register.entries.map((entry) => entry.id);
const constructiveTypes = new Set(["extends_to", "instantiates"]);
const constructive = register.relations.filter((relation) => constructiveTypes.has(relation.type));
const guardrail = register.relations.filter((relation) => !constructiveTypes.has(relation.type));

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

const constructiveMatrix = incidence(constructive);
const guardrailMatrix = incidence(guardrail);
const fullMatrix = incidence(register.relations);
const constructiveRank = rank(constructiveMatrix);
const guardrailRank = rank(guardrailMatrix);
const fullRank = rank(fullMatrix);
const constructiveKernel = constructive.length - constructiveRank;
const guardrailKernel = guardrail.length - guardrailRank;
const fullKernel = register.relations.length - fullRank;
const imageIntersection = constructiveRank + guardrailRank - fullRank;

const required = {
  nodes: 16,
  relations: 27,
  constructiveEdges: 12,
  guardrailEdges: 15,
  constructiveRank: 10,
  guardrailRank: 13,
  fullRank: 15,
  constructiveKernel: 2,
  guardrailKernel: 2,
  fullKernel: 12,
  imageIntersection: 8,
};

const actual = {
  nodes: nodes.length,
  relations: register.relations.length,
  constructiveEdges: constructive.length,
  guardrailEdges: guardrail.length,
  constructiveRank,
  guardrailRank,
  fullRank,
  constructiveKernel,
  guardrailKernel,
  fullKernel,
  imageIntersection,
};

for (const [key, expected] of Object.entries(required)) {
  if (actual[key] !== expected) throw new Error(`${key}: expected ${expected}, received ${actual[key]}`);
}

const fiveTypes = ["instantiates", "requires_enrichment", "separates_from"];
const fiveProfiles = Object.fromEntries(fiveTypes.map((type) => {
  const edges = register.relations.filter((relation) => relation.type === type);
  const activeNodes = new Set(edges.flatMap((edge) => [edge.from, edge.to]));
  const edgeRank = rank(incidence(edges));
  return [type, {
    edges: edges.length,
    activeNodes: activeNodes.size,
    rank: edgeRank,
    cycleRank: edges.length - edgeRank,
  }];
}));

if (new Set(Object.values(fiveProfiles).map((profile) => profile.activeNodes)).size === 1) {
  throw new Error("the current certificate expects the three five-edge classes to have unequal graph profiles");
}

console.log(JSON.stringify({
  result: "pass",
  typeCounts: counts,
  semanticSplit: "12 constructive + 15 guardrail",
  topologicalSplit: "12 cycle + 15 incidence",
  mixedCycleSequence: "12 = 2 constructive + 8 mixed-interface + 2 guardrail",
  fiveTypeProfiles: fiveProfiles,
  verdict: "structured_multiplicity_not_yet_exceptional_representation",
}, null, 2));

