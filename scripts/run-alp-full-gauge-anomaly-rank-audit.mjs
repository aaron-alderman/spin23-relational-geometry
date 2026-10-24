import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const outputPath = resolve("evidence/data/alp-full-gauge-anomaly-rank-audit-v1.json");

const physicalMap = [
  [1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [1 / 2, 1 / 2, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, -1 / 2, 0, 1, 0],
  [4 / 3, 1 / 3, 1, 0, 1 / 2, 0, 0, 1],
];

const globalNull = [0, 0, 0, 0, 2, 0, 1, -1];
const weakOnly = [[-1 / 2, 1]];
const weakAndHyperchargeWithCbbFixed = [[-1 / 2, 1], [1 / 2, 0]];
const weakAndHyperchargeGeneral = [[-1 / 2, 1, 0], [1 / 2, 0, 1]];

function matVec(matrix, vector) {
  return matrix.map(row => row.reduce((sum, value, index) => sum + value * vector[index], 0));
}

function rank(matrix, tolerance = 1e-12) {
  const a = matrix.map(row => [...row]);
  let pivotRow = 0;
  let result = 0;
  for (let col = 0; col < a[0].length && pivotRow < a.length; col += 1) {
    let best = pivotRow;
    for (let row = pivotRow + 1; row < a.length; row += 1) {
      if (Math.abs(a[row][col]) > Math.abs(a[best][col])) best = row;
    }
    if (Math.abs(a[best][col]) <= tolerance) continue;
    [a[pivotRow], a[best]] = [a[best], a[pivotRow]];
    const pivot = a[pivotRow][col];
    for (let j = col; j < a[0].length; j += 1) a[pivotRow][j] /= pivot;
    for (let row = 0; row < a.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = a[row][col];
      for (let j = col; j < a[0].length; j += 1) a[row][j] -= factor * a[pivotRow][j];
    }
    pivotRow += 1;
    result += 1;
  }
  return result;
}

const evidence = {
  schema: "admissibility.alp-full-gauge-anomaly-rank-audit/1",
  date: "2026-10-25",
  sourceCoordinates: ["c_t", "c_b", "c_e", "c_nu", "A_2", "c_GG", "c_WW", "c_BB"],
  physicalCoordinates: ["c_t", "c_b", "c_e", "c_nu", "ctilde_GG", "ctilde_WW", "ctilde_BB"],
  identities: {
    ctilde_GG: "c_GG + (c_t + c_b)/2",
    ctilde_WW: "c_WW - A_2/2",
    ctilde_BB: "c_BB + A_2/2 + 4*c_t/3 + c_b/3 + c_e",
  },
  physicalMap,
  physicalMapRank: rank(physicalMap),
  globalNull,
  globalNullImage: matVec(physicalMap, globalNull),
  scenarios: {
    weakOnly: { matrix: weakOnly, rank: rank(weakOnly), identifiable: false },
    weakAndHyperchargeWithCbbFixed: {
      matrix: weakAndHyperchargeWithCbbFixed,
      rank: rank(weakAndHyperchargeWithCbbFixed),
      determinant: -1 / 2,
      identifiable: true,
    },
    weakAndHyperchargeGeneral: {
      matrix: weakAndHyperchargeGeneral,
      rank: rank(weakAndHyperchargeGeneral),
      null: [2, 1, -1],
      nullImage: matVec(weakAndHyperchargeGeneral, [2, 1, -1]),
      identifiable: false,
    },
  },
  decisions: {
    fullDimensionFivePhysicalRank: 7,
    naiveCoordinateCount: 8,
    generalDirectBosonicExtensionAddsPhysicalCoordinatesToFiveCurrentQuotient: 2,
    cbbFixedSecondGaugeRecordCanSeparateA2AndCww: true,
    allThreeOfA2CwwCbbSeparatelyObservableAtDimensionFive: false,
    gluonRecordLiftsElectroweakRedistributionNull: false,
    amplitudeComputed: false,
    newPhysicsEvidence: false,
  },
  scope: "One diagonal generation plus a hypercharge-neutral right-handed-neutrino difference. The identities are the one-generation reduction of Bauer et al. Eq. (11). Flavor matrices, running, threshold matching, higher-dimensional operators and new states are outside this algebraic rank audit.",
};

if (process.argv.includes("--write")) writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`);
console.log(JSON.stringify({
  physicalMapRank: evidence.physicalMapRank,
  globalNullImage: evidence.globalNullImage,
  fixedCbbRank: evidence.scenarios.weakAndHyperchargeWithCbbFixed.rank,
  generalElectroweakRank: evidence.scenarios.weakAndHyperchargeGeneral.rank,
  generalElectroweakNullImage: evidence.scenarios.weakAndHyperchargeGeneral.nullImage,
}, null, 2));
