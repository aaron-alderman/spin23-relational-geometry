import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/moonshine-frame-order23-permutation-no-go-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "moonshine-frame-order23-permutation-no-go-v1");

const modPow = (base, exponent, modulus) => {
  let result = 1;
  let factor = base % modulus;
  let power = exponent;
  while (power > 0) {
    if (power & 1) result = (result * factor) % modulus;
    factor = (factor * factor) % modulus;
    power >>= 1;
  }
  return result;
};

let order = 1;
while (modPow(2, order, 23) !== 1) order += 1;
assert.equal(order, 11);

// Two block indicators plus a standard RM(1,4) basis repeated on three blocks.
const rows = [];
rows.push(Array.from({ length: 48 }, (_, i) => i < 16 ? 1 : 0));
rows.push(Array.from({ length: 48 }, (_, i) => i >= 32 ? 1 : 0));
for (let basis = 0; basis < 5; basis += 1) {
  rows.push(Array.from({ length: 48 }, (_, i) => {
    const point = i % 16;
    return basis === 0 ? 1 : (point >> (basis - 1)) & 1;
  }));
}

function binaryRank(input) {
  const matrix = input.map((row) => row.slice());
  let rank = 0;
  for (let column = 0; column < matrix[0].length && rank < matrix.length; column += 1) {
    const pivot = matrix.findIndex((row, index) => index >= rank && row[column] === 1);
    if (pivot < 0) continue;
    [matrix[rank], matrix[pivot]] = [matrix[pivot], matrix[rank]];
    for (let index = 0; index < matrix.length; index += 1) {
      if (index !== rank && matrix[index][column]) {
        for (let j = column; j < matrix[index].length; j += 1) matrix[index][j] ^= matrix[rank][j];
      }
    }
    rank += 1;
  }
  return rank;
}

const rank = binaryRank(rows);
assert.equal(rank, 7);
assert.equal(rank, evidence.distinguishedFrameCode.dimension);
assert.ok(rank < order);

const columns = Array.from({ length: 48 }, (_, column) => rows.map((row) => row[column]).join(""));
const multiplicities = new Map();
for (const column of columns) multiplicities.set(column, (multiplicities.get(column) ?? 0) + 1);
assert.equal(multiplicities.size, 48);
assert.equal(Math.max(...multiplicities.values()), 1);
assert.equal(evidence.coordinateConsequence.order23CoordinateAutomorphismExists, false);

const gl4f2Order = (2 ** 4 - 1) * (2 ** 4 - 2) * (2 ** 4 - 2 ** 2) * (2 ** 4 - 2 ** 3);
const publishedGroupOrder = 2 ** 12 * 6 * gl4f2Order;
assert.equal(gl4f2Order, evidence.publishedCrossCheck.GL4F2Order);
assert.equal(publishedGroupOrder, evidence.publishedCrossCheck.groupOrder);
assert.notEqual(publishedGroupOrder % 23, 0);
assert.equal(evidence.publishedCrossCheck.divisibleBy23, false);

console.log(JSON.stringify({
  status: "PASS",
  orderOf2Modulo23: order,
  minimumNontrivialRepresentationDimension: order,
  codeDimension: rank,
  distinctColumns: multiplicities.size,
  largestEqualColumnClass: Math.max(...multiplicities.values()),
  publishedCoordinateAutomorphismGroupOrder: publishedGroupOrder,
  publishedGroupDivisibleBy23: publishedGroupOrder % 23 === 0,
  conclusion: evidence.scope.ruledOut,
  survivingMechanisms: evidence.scope.notRuledOut,
}));
