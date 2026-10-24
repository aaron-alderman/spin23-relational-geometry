import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/grassmannian_channel_globalization_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const close = (left, right, tolerance = 1e-12) => Math.abs(left - right) < tolerance;
const zero = (rows, columns) => Array.from({ length: rows }, () => Array(columns).fill(0));
const mul = (left, right) => left.map((row) => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));

const E = [[3 / 5, 5 / 13], [4 / 5, 0], [0, 12 / 13]];
const N = zero(5, 5);
for (let row = 0; row < 3; row += 1) for (let column = 0; column < 2; column += 1) N[row + 2][column] = E[row][column];
insist(mul(N, N).flat().every((value) => close(value, 0)), "opposite-cell generator is not square-zero");

const graph = [[1, 0], [0, 1], ...E];
const plucker = {};
for (let i = 0; i < 5; i += 1) for (let j = i + 1; j < 5; j += 1) {
  plucker[`${i + 1}${j + 1}`] = graph[i][0] * graph[j][1] - graph[i][1] * graph[j][0];
}
insist(close(plucker["12"], 1), "checkpoint is not in the p12 big cell");
for (let i = 1; i <= 2; i += 1) for (let j = i + 1; j <= 3; j += 1) for (let k = j + 1; k <= 4; k += 1) for (let l = k + 1; l <= 5; l += 1) {
  const relation = plucker[`${i}${j}`] * plucker[`${k}${l}`]
    - plucker[`${i}${k}`] * plucker[`${j}${l}`]
    + plucker[`${i}${l}`] * plucker[`${j}${k}`];
  insist(close(relation, 0), `Plucker relation failed for ${i}${j}${k}${l}`);
}

const gram = mul(transpose(graph), graph);
const graphGramDet = gram[0][0] * gram[1][1] - gram[0][1] * gram[1][0];
const pluckerNorm = Object.values(plucker).reduce((sum, value) => sum + value ** 2, 0);
insist(close(graphGramDet, pluckerNorm), "Cauchy-Binet identity failed");
insist(ledger.complexDimension === 2 * 3, "Grassmannian dimension mismatch");

console.log(JSON.stringify({
  status: "PASS",
  homogeneousSpace: "Gr(2,5)=SL5/P_(2,3)",
  chartDimension: 6,
  parabolicNilradical: "Hom(C^3,C^2)",
  oppositeCell: "Hom(C^2,C^3)",
  squareZero: true,
  p12: plucker["12"],
  pluckerRelations: "PASS",
  cauchyBinet: { graphGramDet, pluckerNorm },
}));
