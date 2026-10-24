import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const nodes = register.entries.map((entry) => entry.id);
const edges = register.relations;
const backbone = edges.map((edge, index) =>
  edge.type !== "shares_action_not_carrier" ? index : -1).filter((index) => index >= 0);
const incidence = nodes.map((node) => edges.map((edge) =>
  edge.from === node || edge.to === node ? 1 : 0));

function nullspaceMod2(matrix) {
  const work = matrix.map((row) => row.slice());
  const pivots = [];
  let pivotRow = 0;
  for (let column = 0; column < work[0].length && pivotRow < work.length; column += 1) {
    let row = pivotRow;
    while (row < work.length && work[row][column] === 0) row += 1;
    if (row === work.length) continue;
    [work[pivotRow], work[row]] = [work[row], work[pivotRow]];
    for (let other = 0; other < work.length; other += 1) {
      if (other === pivotRow || work[other][column] === 0) continue;
      for (let j = column; j < work[0].length; j += 1) work[other][j] ^= work[pivotRow][j];
    }
    pivots.push(column);
    pivotRow += 1;
  }
  const pivotSet = new Set(pivots);
  const free = [...Array(work[0].length).keys()].filter((column) => !pivotSet.has(column));
  return free.map((freeColumn) => {
    const vector = Array(work[0].length).fill(0);
    vector[freeColumn] = 1;
    for (let i = pivots.length - 1; i >= 0; i -= 1) {
      const column = pivots[i];
      let value = 0;
      for (let j = column + 1; j < work[0].length; j += 1) value ^= work[i][j] & vector[j];
      vector[column] = value;
    }
    return vector;
  });
}

const basis = nullspaceMod2(incidence);
if (basis.length !== 12 || backbone.length !== 24) throw new Error("expected dimensions 12 and 24");

const histogram = Array(25).fill(0);
const words = new Set();
const weightTwoLifts = [];
for (let mask = 0; mask < 2 ** basis.length; mask += 1) {
  const word = Array(edges.length).fill(0);
  for (let i = 0; i < basis.length; i += 1) if ((mask >> i) & 1) {
    for (let j = 0; j < edges.length; j += 1) word[j] ^= basis[i][j];
  }
  const projected = backbone.map((index) => word[index]);
  words.add(projected.join(""));
  const weight = projected.reduce((sum, bit) => sum + bit, 0);
  histogram[weight] += 1;
  if (weight === 2) weightTwoLifts.push({
    backbone: backbone.filter((index) => word[index]).map((index) => edges[index].id),
    special: edges.filter((edge, index) => word[index] && edge.type === "shares_action_not_carrier").map((edge) => edge.id),
  });
}

const expected = {
  0: 1, 2: 2, 3: 16, 4: 26, 5: 49, 6: 139, 7: 273, 8: 404,
  9: 531, 10: 615, 11: 615, 12: 526, 13: 383, 14: 257, 15: 151,
  16: 67, 17: 29, 18: 11, 19: 1,
};
for (let weight = 0; weight < histogram.length; weight += 1) {
  if (histogram[weight] !== (expected[weight] ?? 0)) {
    throw new Error(`weight ${weight}: expected ${expected[weight] ?? 0}, received ${histogram[weight]}`);
  }
}
if (words.size !== 4096) throw new Error("backbone projection is not injective");

const selfOrthogonal = basis.every((left) => basis.every((right) =>
  backbone.reduce((dot, index) => dot ^ (left[index] & right[index]), 0) === 0));
if (selfOrthogonal || weightTwoLifts.length !== 2) throw new Error("Golay-boundary certificate failed");

console.log(JSON.stringify({
  result: "pass",
  graphCode: {
    parameters: "[24,12,2]", codewords: words.size, selfOrthogonal,
    doublyEven: false,
    weightHistogram: Object.fromEntries(histogram.map((count, weight) => [weight, count]).filter(([, count]) => count)),
    weightTwoLifts,
  },
  golayCode: { parameters: "[24,12,8]", selfDual: true, doublyEven: true },
  verdict: "canonical_graph_cycle_code_is_not_golay",
}, null, 2));

