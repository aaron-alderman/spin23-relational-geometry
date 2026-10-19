import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const protocol = JSON.parse(readFileSync(new URL("../../evidence/data/graph-two-mode-spin23-exhaustion.json", import.meta.url), "utf8"));
const zeros = (rows, columns = rows) => Array.from({ length: rows }, () => Array(columns).fill(0));
const transpose = matrix => matrix[0].map((_, column) => matrix.map(row => row[column]));
const multiply = (left, right) => left.map(row => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const add = (left, right) => left.map((row, i) => row.map((value, j) => value + right[i][j]));
const subtract = (left, right) => left.map((row, i) => row.map((value, j) => value - right[i][j]));
const scale = (factor, matrix) => matrix.map(row => row.map(value => factor * value));
const maxAbs = matrix => Math.max(...matrix.flat().map(Math.abs));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const blocks = (a, b, c, d) => [[...a[0], ...b[0]], [...a[1], ...b[1]], [...c[0], ...d[0]], [...c[1], ...d[1]]];
const rank = (rows, tolerance = 1e-10) => {
  if (rows.length === 0) return 0;
  const matrix = rows.map(row => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < matrix[0].length && pivotRow < matrix.length; column += 1) {
    const pivot = matrix.findIndex((row, index) => index >= pivotRow && Math.abs(row[column]) > tolerance);
    if (pivot < 0) continue;
    [matrix[pivotRow], matrix[pivot]] = [matrix[pivot], matrix[pivotRow]];
    const value = matrix[pivotRow][column];
    matrix[pivotRow] = matrix[pivotRow].map(entry => entry / value);
    for (let row = 0; row < matrix.length; row += 1) if (row !== pivotRow) {
      const factor = matrix[row][column];
      matrix[row] = matrix[row].map((entry, index) => entry - factor * matrix[pivotRow][index]);
    }
    pivotRow += 1;
  }
  return pivotRow;
};
const commutator = (left, right) => subtract(multiply(left, right), multiply(right, left));
const lieClosure = seeds => {
  const basis = [];
  const addIndependent = candidate => {
    if (maxAbs(candidate) < 1e-10) return false;
    const oldRank = rank(basis.map(matrix => matrix.flat()));
    const nextRank = rank([...basis.map(matrix => matrix.flat()), candidate.flat()]);
    if (nextRank === oldRank) return false;
    basis.push(candidate);
    return true;
  };
  seeds.forEach(addIndependent);
  let changed = true;
  while (changed && basis.length <= 10) {
    changed = false;
    const snapshot = [...basis];
    for (let i = 0; i < snapshot.length; i += 1) for (let j = i + 1; j < snapshot.length; j += 1) {
      if (addIndependent(commutator(snapshot[i], snapshot[j]))) changed = true;
    }
  }
  return basis;
};

const I2 = identity(2);
const O2 = zeros(2);
const J = blocks(O2, I2, scale(-1, I2), O2);
const kinetic = blocks(O2, I2, O2, O2);
const potentialGenerator = potential => blocks(O2, O2, scale(-1, potential), O2);
const symplecticResidual = generator => maxAbs(add(multiply(transpose(generator), J), multiply(J, generator)));

const basePotential = I2;
const symmetricClosure = lieClosure([kinetic, potentialGenerator(basePotential)]);
assert.equal(symmetricClosure.length, protocol.closure.symmetryPreservingDimension);

const nControl = 12;
const harmonic = vertex => {
  const angle = 2 * Math.PI * vertex / nControl;
  return [Math.sqrt(2 / nControl) * Math.cos(angle), Math.sqrt(2 / nControl) * Math.sin(angle)];
};
const projectedEdge = edge => {
  const left = harmonic(edge);
  const right = harmonic((edge + 1) % nControl);
  const difference = left.map((value, index) => value - right[index]);
  return difference.map(a => difference.map(b => a * b));
};
const edgeControls = [0, 4, 8].map(projectedEdge);
const controlSpanRank = rank(edgeControls.map(matrix => [matrix[0][0], matrix[0][1], matrix[1][1]]));
assert.equal(controlSpanRank, 3);
const fullClosure = lieClosure([kinetic, ...edgeControls.map(potentialGenerator)]);
assert.equal(fullClosure.length, protocol.closure.targetDimension);
assert.ok(Math.max(...fullClosure.map(symplecticResidual)) < 1e-9);

const refinement = protocol.selector.refinementFamily.map(n => {
  const h = 2 * Math.PI / n;
  const eigenvalue = k => 4 * Math.sin(Math.PI * k / n) ** 2 / h ** 2;
  return { n, first: eigenvalue(1), gap: eigenvalue(2) - eigenvalue(1) };
});
assert.equal(refinement.every(row => row.gap > 0), true);
assert.ok(Math.abs(refinement.at(-1).first - 1) < 0.001);
assert.ok(Math.abs(refinement.at(-1).gap - 3) < 0.01);

const massSquared = 0.5;
const selectedResponse = scale(massSquared + refinement.at(-1).first, I2);
const responseDeterminant = selectedResponse[0][0] * selectedResponse[1][1] - selectedResponse[0][1] ** 2;
assert.ok(responseDeterminant > 0);

const damping = 0.1;
const frequency = 0.7;
const finiteFrequencyImaginaryNorm = frequency * damping;
assert.ok(finiteFrequencyImaginaryNorm > 0);

// Series refinement preserves the two-terminal response but never escapes its rank-one ray.
const seriesResponses = [1, 2, 4, 8, 16].map(edgeCount => {
  const edgeConductance = edgeCount;
  const effectiveConductance = 1 / (edgeCount * (1 / edgeConductance));
  const response = [[effectiveConductance, -effectiveConductance], [-effectiveConductance, effectiveConductance]];
  return { edgeCount, effectiveConductance, determinant: response[0][0] * response[1][1] - response[0][1] ** 2 };
});
assert.equal(seriesResponses.every(row => Math.abs(row.effectiveConductance - 1) < 1e-12), true);
assert.equal(seriesResponses.every(row => Math.abs(row.determinant) < 1e-12), true);

console.log(JSON.stringify({
  protocol: protocol.protocol,
  passed: true,
  intrinsicSelector: "two-dimensional first-harmonic eigenspace",
  refinement,
  symmetricClosureDimension: symmetricClosure.length,
  projectedEdgeControlSpanRank: controlSpanRank,
  addressedClosureDimension: fullClosure.length,
  maximumSymplecticResidual: Math.max(...fullClosure.map(symplecticResidual)),
  selectedResponseDeterminant: responseDeterminant,
  finiteFrequencyImaginaryNorm,
  seriesRefinementControl: seriesResponses,
  responseSpin23Conditional: true,
  spacetimeSpin23Established: false,
}, null, 2));
