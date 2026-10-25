#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const analyzer = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "analyze-leech-pareto-transformers.mjs"), "--full"
], {encoding: "utf8"}));
const gram = analyzer.results.find(({id}) => id === "gram-first").gram;
const enclosure = JSON.parse(fs.readFileSync(path.join(
  root, "evidence", "data", "leech-positive-charging-enclosure-v1.json"
)));

const offDiagonal = [];
for (let i = 0; i < gram.length; i += 1) {
  for (let j = i + 1; j < gram.length; j += 1) {
    offDiagonal.push(Math.abs(gram[i][j]));
  }
}
const maximumGramCoupling = Math.max(...offDiagonal);
const minimumPairGramEigenvalue = 4 - maximumGramCoupling;
const maximumPairShortedNorm = 1 / minimumPairGramEigenvalue;
const pairCount = gram.length / 2;
const ratio = 0.01;

const smallestEigenvalue = (input) => {
  const matrix = input.map((row) => [...row]);
  const dimension = matrix.length;
  for (let step = 0; step < 1000; step += 1) {
    let p = 0;
    let q = 1;
    let maximum = 0;
    for (let i = 0; i < dimension; i += 1) {
      for (let j = i + 1; j < dimension; j += 1) {
        if (Math.abs(matrix[i][j]) > maximum) {
          maximum = Math.abs(matrix[i][j]);
          p = i;
          q = j;
        }
      }
    }
    if (maximum < 1e-14) break;
    const angle = 0.5 * Math.atan2(
      2 * matrix[p][q], matrix[q][q] - matrix[p][p]
    );
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const pp = matrix[p][p];
    const qq = matrix[q][q];
    const pq = matrix[p][q];
    for (let k = 0; k < dimension; k += 1) {
      if (k === p || k === q) continue;
      const kp = matrix[k][p];
      const kq = matrix[k][q];
      matrix[k][p] = matrix[p][k] = cosine * kp - sine * kq;
      matrix[k][q] = matrix[q][k] = sine * kp + cosine * kq;
    }
    matrix[p][p] = cosine ** 2 * pp - 2 * sine * cosine * pq + sine ** 2 * qq;
    matrix[q][q] = sine ** 2 * pp + 2 * sine * cosine * pq + cosine ** 2 * qq;
    matrix[p][q] = matrix[q][p] = 0;
  }
  return Math.min(...matrix.map((row, index) => row[index]));
};

let tripleMinimum = {eigenvalue: Infinity, indicesZeroBased: null, gram: null};
for (let i = 0; i < gram.length; i += 1) {
  for (let j = i + 1; j < gram.length; j += 1) {
    for (let k = j + 1; k < gram.length; k += 1) {
      const indices = [i, j, k];
      const block = indices.map((row) => indices.map((column) => gram[row][column]));
      const eigenvalue = smallestEigenvalue(block);
      if (eigenvalue < tripleMinimum.eigenvalue) {
        tripleMinimum = {eigenvalue, indicesZeroBased: indices, gram: block};
      }
    }
  }
}
const maximumTripleShortedNorm = 1 / tripleMinimum.eigenvalue;
const cutoffTwoTripleUniversalGain =
  ratio / 2 * 8 * maximumTripleShortedNorm * 3 * 2 ** 2;
const cutoffTwoTripleGapCeiling = enclosure.results.find(
  (row) => row.cutoff === 2
).gapInterval.lower + cutoffTwoTripleUniversalGain;

const results = enclosure.results.map((row) => {
  const maximumAddedLowerEnergy = ratio / 2
    * pairCount * maximumPairShortedNorm * 2 * row.cutoff ** 2;
  const universalPairOddCeiling =
    row.sectorIntervals.odd.lower + maximumAddedLowerEnergy;
  return {
    cutoff: row.cutoff,
    potentialOnlyOddLower: row.sectorIntervals.odd.lower,
    evenRitzUpper: row.sectorIntervals.even.upper,
    maximumAddedLowerEnergy,
    universalPairOddCeiling,
    bestPossiblePairGapLowerCeiling:
      universalPairOddCeiling - row.sectorIntervals.even.upper,
    pairBlockClosureRuledOut:
      universalPairOddCeiling < row.sectorIntervals.even.upper
  };
});

const output = {
  schemaVersion: "leech-pair-block-enclosure-no-go-v1",
  date: "2026-10-25",
  pairCount,
  gramDiagonal: 4,
  maximumGramCoupling,
  minimumPairGramEigenvalue,
  maximumPairShortedNorm,
  tripleFrontier: {
    principalMinorCount: 2024,
    minimumEigenvalue: tripleMinimum.eigenvalue,
    exactMinimumEigenvalue: "4-2*sqrt(2)",
    maximizingShortedNorm: maximumTripleShortedNorm,
    exactMaximizingShortedNorm: "(2+sqrt(2))/4",
    witness: tripleMinimum,
    cutoffTwoUniversalGainCeiling: cutoffTwoTripleUniversalGain,
    cutoffTwoGapLowerCeiling: cutoffTwoTripleGapCeiling,
    ruledOutByThisCeiling: cutoffTwoTripleGapCeiling < 0
  },
  premise: "For block-diagonal B>=0 with K-B>=0, each embedded pair block B_S obeys B_S<=(G_SS)^-1 by the block rank-update/shorting criterion.",
  energyCeiling: "Every two-charge vector has norm squared at most 2N^2, so one pair can add at most (U/2)||B_S|| 2N^2 to a cluster lower endpoint.",
  ratio,
  results,
  conclusion: "Every disjoint positive one-site or two-site block split is rigorously too weak to close the cutoff-two or cutoff-three full-carrier gap interval.",
  firstNotExcludedDisjointBlockSize: 3,
  nextRequirement: "construct and exactly certify a three-charge block partition, use overlapping sum-of-squares terms, or validate a Lehmann/shifted-inertia enclosure"
};

fs.writeFileSync(
  path.join(root, "evidence", "data", "leech-pair-block-enclosure-no-go-v1.json"),
  JSON.stringify(output, null, 2) + "\n"
);
console.log(JSON.stringify(output, null, 2));
