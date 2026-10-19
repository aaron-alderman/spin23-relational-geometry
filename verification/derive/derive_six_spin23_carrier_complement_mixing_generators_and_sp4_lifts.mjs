import assert from "node:assert/strict";

const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const zeroMatrix = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const scale = (a, A) => A.map(row => row.map(v => a * v));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));

const J = [[0, 1, 0, 0], [-1, 0, 0, 0], [0, 0, 0, 1], [0, 0, -1, 0]];
const omega = [1, 0, 0, 0, 0, 1];
const primitiveBasis = [
  [0, 1, 0, 0, -1, 0],
  [0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, -1],
  [0, 1, 0, 0, 1, 0],
  [0, 0, 1, -1, 0, 0]
];
const signs = [1, 1, -1, -1, -1];
const labels = ["T1", "T2", "X1", "X2", "X3"];

function wedgePair(a, b) {
  return a[0] * b[5] + a[5] * b[0] - a[1] * b[4] - a[4] * b[1] + a[2] * b[3] + a[3] * b[2];
}
const gram = primitiveBasis.map(a => primitiveBasis.map(b => wedgePair(a, b)));

function formMatrix(v) {
  const A = zeroMatrix(4, 4);
  pairs.forEach(([i, j], k) => { A[i][j] = v[k]; A[j][i] = -v[k]; });
  return A;
}
const formVector = A => pairs.map(([i, j]) => A[i][j]);
const actOnForm = (X, v) => formVector(add(multiply(transpose(X), formMatrix(v)), multiply(formMatrix(v), X)));
const coordinates = v => primitiveBasis.map((p, i) => wedgePair(p, v) / gram[i][i]);

const symmetricLabels = [];
const sp4Generators = [];
for (let i = 0; i < 4; i += 1) {
  for (let j = i; j < 4; j += 1) {
    const S = zeroMatrix(4, 4);
    S[i][j] = 1; S[j][i] = 1;
    symmetricLabels.push(`S${i + 1}${j + 1}`);
    sp4Generators.push(scale(-1, multiply(J, S)));
  }
}
const representation = sp4Generators.map(X => {
  const R = zeroMatrix(5, 5);
  primitiveBasis.forEach((p, col) => coordinates(actOnForm(X, p)).forEach((v, row) => { R[row][col] = v; }));
  return R;
});

function solveOverdetermined(columns, target, tolerance = 1e-10) {
  const rows = target.map((b, i) => [...columns.map(col => col[i]), b]);
  let pivotRow = 0;
  const pivots = [];
  for (let col = 0; col < columns.length && pivotRow < rows.length; col += 1) {
    let pivot = pivotRow;
    for (let i = pivotRow + 1; i < rows.length; i += 1) if (Math.abs(rows[i][col]) > Math.abs(rows[pivot][col])) pivot = i;
    if (Math.abs(rows[pivot][col]) < tolerance) continue;
    [rows[pivotRow], rows[pivot]] = [rows[pivot], rows[pivotRow]];
    const d = rows[pivotRow][col];
    for (let j = col; j <= columns.length; j += 1) rows[pivotRow][j] /= d;
    for (let i = 0; i < rows.length; i += 1) {
      if (i === pivotRow) continue;
      const f = rows[i][col];
      for (let j = col; j <= columns.length; j += 1) rows[i][j] -= f * rows[pivotRow][j];
    }
    pivots.push(col);
    pivotRow += 1;
  }
  const solution = Array(columns.length).fill(0);
  pivots.forEach((col, r) => { solution[col] = rows[r][columns.length]; });
  const residual = target.map((b, i) => columns.reduce((s, col, j) => s + col[i] * solution[j], 0) - b);
  assert.ok(Math.max(...residual.map(Math.abs)) < tolerance);
  return solution;
}

const repColumns = representation.map(R => R.flat());
const section = [0, 2, 3];
const complement = [1, 4];
const mixing = [];

function soGenerator(i, j) {
  const target = zeroMatrix(5, 5);
  target[i][j] = 1;
  target[j][i] = -signs[i] / signs[j];
  return target;
}

for (const i of section) {
  for (const j of complement) {
    const target = soGenerator(i, j);
    const coefficients = solveOverdetermined(repColumns, target.flat());
    let lift = zeroMatrix(4, 4);
    coefficients.forEach((c, k) => { lift = add(lift, scale(c, sp4Generators[k])); });
    assert.ok(maxAbs(add(multiply(transpose(lift), J), multiply(J, lift))) < 1e-10);
    const induced = zeroMatrix(5, 5);
    primitiveBasis.forEach((p, col) => coordinates(actOnForm(lift, p)).forEach((v, row) => { induced[row][col] = v; }));
    assert.ok(maxAbs(add(induced, scale(-1, target))) < 1e-10);
    mixing.push({
      name: `M_${labels[i]}_${labels[j]}`,
      sectionCoordinate: labels[i],
      complementCoordinate: labels[j],
      type: signs[i] === signs[j] ? "compact rotation" : "noncompact boost",
      fiveDimensionalGenerator: target,
      sp4BasisCoefficients: coefficients.map((c, k) => ({ basis: symmetricLabels[k], coefficient: c })).filter(x => Math.abs(x.coefficient) > 1e-12),
      fourDimensionalSymplecticLift: lift
    });
  }
}

assert.equal(mixing.length, 6);
assert.equal(mixing.filter(x => x.type === "compact rotation").length, 3);
assert.equal(mixing.filter(x => x.type === "noncompact boost").length, 3);

const stabilizerMatrices = [soGenerator(0, 2), soGenerator(0, 3), soGenerator(2, 3), soGenerator(1, 4)];
const mixingMatrices = mixing.map(x => x.fiveDimensionalGenerator);
const commutator = (A, B) => add(multiply(A, B), scale(-1, multiply(B, A)));
const stabilizerColumns = stabilizerMatrices.map(A => A.flat());
const mixingColumns = mixingMatrices.map(A => A.flat());
for (const A of stabilizerMatrices) for (const B of stabilizerMatrices) solveOverdetermined(stabilizerColumns, commutator(A, B).flat());
for (const A of stabilizerMatrices) for (const B of mixingMatrices) solveOverdetermined(mixingColumns, commutator(A, B).flat());
for (const A of mixingMatrices) for (const B of mixingMatrices) solveOverdetermined(stabilizerColumns, commutator(A, B).flat());

console.log(JSON.stringify({
  protocol: "six-carrier-complement-mixing-generators/1",
  primitiveCoordinateOrder: labels,
  carrierSection: ["T1", "X1", "X2"],
  complementPlane: ["T2", "X3"],
  mixing,
  decomposition: "so(2,3) = [so(1,2) + so(1,1)] plus six carrier/complement generators",
  compactNoncompactSplit: { compact: 3, noncompact: 3 },
  symmetricPairChecks: "Verified [h,h] subset h, [h,m] subset m and [m,m] subset h for h=so(1,2)+so(1,1) and the six-dimensional mixing space m.",
  jordanClosureTest: "Map each candidate triple operator to its induced 5x5 action, project onto these six matrices, and require the combined Lie closure with the four stabilizer generators to have dimension ten.",
  passed: true
}, null, 2));
