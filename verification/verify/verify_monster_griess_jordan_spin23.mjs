import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-griess-jordan-spin23-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-griess-jordan-spin23-v1");

const zeros = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const add = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const scale = (s, a) => a.map((row) => row.map((x) => s * x));
const mul = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * b[k][j], 0),
));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const equal = (a, b, tolerance = 1e-10) => a.every((row, i) =>
  row.every((x, j) => Math.abs(x - b[i][j]) < tolerance),
);
const jordan = (a, b) => scale(0.5, add(mul(a, b), mul(b, a)));
const triple = (x, y, z) => add(
  add(jordan(jordan(x, y), z), jordan(jordan(z, y), x)),
  scale(-1, jordan(jordan(x, z), y)),
);

const symmetricBasis = (n) => {
  const basis = [];
  for (let i = 0; i < n; i += 1) for (let j = i; j < n; j += 1) {
    const matrix = zeros(n);
    matrix[i][j] = 1;
    matrix[j][i] = 1;
    basis.push(matrix);
  }
  return basis;
};
assert.equal(symmetricBasis(24).length, 24 * 25 / 2);
assert.equal(evidence.fixedSubalgebraDimension, 300);
assert.equal(evidence.coordinateCornerCount, 24 * 23 / 2);

const cornerBasis = symmetricBasis(2);
const embed24 = (corner) => {
  const output = zeros(24);
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) output[i][j] = corner[i][j];
  return output;
};
for (const x of cornerBasis) for (const y of cornerBasis) {
  assert.ok(equal(jordan(embed24(x), embed24(y)), embed24(jordan(x, y))));
}

const combine = (coefficients) => cornerBasis.reduce(
  (sum, basis, i) => add(sum, scale(coefficients[i], basis)), zeros(2),
);
const coefficientGrid = [-2, -1, 0, 1, 2];
let jordanIdentityCases = 0;
for (const a of coefficientGrid) for (const b of coefficientGrid) for (const c of coefficientGrid) {
  const x = combine([a, b, c]);
  for (const d of [-1, 0, 1]) for (const e of [-1, 0, 1]) for (const f of [-1, 0, 1]) {
    const y = combine([d, e, f]);
    const x2 = jordan(x, x);
    assert.ok(equal(jordan(x2, jordan(x, y)), jordan(x, jordan(x2, y))));
    jordanIdentityCases += 1;
  }
}

let tripleCases = 0;
for (const x of cornerBasis) for (const y of cornerBasis) for (const z of cornerBasis) {
  assert.ok(equal(triple(x, y, z), scale(0.5, add(mul(mul(x, y), z), mul(mul(z, y), x)))));
  tripleCases += 1;
}

// TKK block embedding in sp(4,R).
const block = (a, b, c, d) => [
  [...a[0], ...b[0]], [...a[1], ...b[1]],
  [...c[0], ...d[0]], [...c[1], ...d[1]],
];
const z2 = zeros(2);
const upper = (b) => block(z2, b, z2, z2);
const lower = (c) => block(z2, z2, c, z2);
const commutator = (a, b) => add(mul(a, b), scale(-1, mul(b, a)));
const omega = block(z2, [[1, 0], [0, 1]], [[-1, 0], [0, -1]], z2);
const symplectic = (m) => add(mul(transpose(m), omega), mul(omega, m));

const generators = [
  ...cornerBasis.map(upper),
  ...cornerBasis.map(lower),
  ...cornerBasis.flatMap((b) => cornerBasis.map((c) => commutator(upper(b), lower(c)))),
];
for (const generator of generators) assert.ok(equal(symplectic(generator), zeros(4)));

const rank = (rows, tolerance = 1e-10) => {
  const matrix = rows.map((row) => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < matrix[0].length && pivotRow < matrix.length; column += 1) {
    let pivot = pivotRow;
    while (pivot < matrix.length && Math.abs(matrix[pivot][column]) < tolerance) pivot += 1;
    if (pivot === matrix.length) continue;
    [matrix[pivotRow], matrix[pivot]] = [matrix[pivot], matrix[pivotRow]];
    const value = matrix[pivotRow][column];
    matrix[pivotRow] = matrix[pivotRow].map((x) => x / value);
    for (let row = 0; row < matrix.length; row += 1) if (row !== pivotRow) {
      const factor = matrix[row][column];
      matrix[row] = matrix[row].map((x, j) => x - factor * matrix[pivotRow][j]);
    }
    pivotRow += 1;
  }
  return pivotRow;
};
const tkkRank = rank(generators.map((matrix) => matrix.flat()));
assert.equal(tkkRank, 10);
assert.deepEqual(evidence.tkk.gradingDimensions, [3, 4, 3]);
assert.equal(evidence.typing.sp4IsMonsterSubgroup, false);
assert.ok(evidence.selectionGates.length >= 5);

console.log(JSON.stringify({
  status: "PASS",
  sym24Dimension: symmetricBasis(24).length,
  coordinateH2Corners: evidence.coordinateCornerCount,
  cornerDimension: cornerBasis.length,
  jordanIdentityCases,
  tripleBasisCases: tripleCases,
  tkkCandidateGenerators: generators.length,
  tkkRank,
  symplecticConditionChecked: true,
  verdict: evidence.verdict
}));
