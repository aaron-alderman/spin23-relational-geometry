import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const nodes = register.entries.map((entry) => entry.id);
const edges = register.relations.filter((edge) => edge.type !== "shares_action_not_carrier");
const wallIndex = edges.findIndex((edge) => edge.id === "QR-003");
if (wallIndex < 0) throw new Error("QR-003 missing");

function rank(matrix, tolerance = 1e-9) {
  const work = matrix.map((row) => row.map(Number));
  let pivotRow = 0;
  for (let column = 0; column < (work[0]?.length ?? 0) && pivotRow < work.length; column += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < work.length; row += 1) if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    if (Math.abs(work[pivot][column]) < tolerance) continue;
    [work[pivotRow], work[pivot]] = [work[pivot], work[pivotRow]];
    const scale = work[pivotRow][column];
    for (let j = column; j < work[0].length; j += 1) work[pivotRow][j] /= scale;
    for (let row = 0; row < work.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = work[row][column];
      for (let j = column; j < work[0].length; j += 1) work[row][j] -= factor * work[pivotRow][j];
    }
    pivotRow += 1;
  }
  return pivotRow;
}

const directedPath = edges.map((first) => edges.map((second) => first.to === second.from ? 1 : 0));
const pathResponse = edges.map((_, i) => edges.map((__, j) => directedPath[i][j] + directedPath[j][i]));

const pairToEdge = new Map(edges.map((edge, index) => [[edge.from, edge.to].sort().join("|"), index]));
const triangles = [];
for (let a = 0; a < nodes.length; a += 1) for (let b = a + 1; b < nodes.length; b += 1) for (let c = b + 1; c < nodes.length; c += 1) {
  const triangle = [
    pairToEdge.get([nodes[a], nodes[b]].sort().join("|")),
    pairToEdge.get([nodes[a], nodes[c]].sort().join("|")),
    pairToEdge.get([nodes[b], nodes[c]].sort().join("|")),
  ];
  if (triangle.every((index) => index !== undefined)) triangles.push(triangle);
}
const triangleResponse = [];
for (let j = 0; j < edges.length; j += 1) for (let k = j; k < edges.length; k += 1) {
  triangleResponse.push(edges.map((_, i) => triangles.some((triangle) =>
    triangle.includes(i) && triangle.includes(j) && triangle.includes(k) && new Set([i, j, k]).size === 3) ? 1 : 0));
}

const compositionResponse = [...pathResponse, ...triangleResponse];
const directWallRow = edges.map((_, index) => index === wallIndex ? 1 : 0);
const completedResponse = [...compositionResponse, directWallRow];
const compositionRank = rank(compositionResponse);
const completedRank = rank(completedResponse);
if (compositionRank !== 23 || completedRank !== 24) throw new Error("unexpected detector ranks");
if (!compositionResponse.every((row) => row[wallIndex] === 0)) throw new Error("QR-003 should be composition-invisible");

const types = ["extends_to", "instantiates", "requires_enrichment", "separates_from", "rules_out_identification"];
const typeResponse = types.map((left) => types.map((right) => {
  let value = 0;
  for (let i = 0; i < edges.length; i += 1) for (let j = 0; j < edges.length; j += 1) {
    if (edges[i].type === left && edges[j].type === right) value += pathResponse[i][j];
  }
  return value;
}));
if (rank(typeResponse) !== 5) throw new Error("five type amplitudes should be identifiable");

console.log(JSON.stringify({
  result: "pass",
  compositionDetector: {
    channels: compositionResponse.length,
    rank: compositionRank,
    kernel: ["QR-003"],
    fisherRankForIndependentEqualVarianceChannels: compositionRank,
  },
  minimalCompletion: {
    addedChannel: "direct matrix-unit amplitude <QS-001|A|QS-004> = x_QR-003",
    addedChannels: 1,
    completedRank,
    fisherRankForIndependentEqualVarianceChannels: completedRank,
  },
  typeDetector: {
    responseMatrix: typeResponse,
    rank: 5,
    warning: "type aggregation identifies the rules-out modality through QR-026 but does not resolve QR-003 individually",
  },
  frequencyPrediction: {
    drive: "x_QR-003(t)=x0+delta*cos(omega*t)",
    compositionChannels: "zero response at every omega in the static operator assignment",
    directFirstOrderDetector: "amplitude delta/sqrt(1+(omega*tau_w)^2), phase lag -atan(omega*tau_w)",
    falsifier: "a reproducible path or triangle response linear in the isolated QR-003 drive",
  },
}, null, 2));
