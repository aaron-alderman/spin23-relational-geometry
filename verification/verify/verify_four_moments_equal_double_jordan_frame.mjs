#!/usr/bin/env node

function pmnsProbabilities(t12, t23, t13, delta) {
  const c12 = Math.cos(t12), s12 = Math.sin(t12);
  const c23 = Math.cos(t23), s23 = Math.sin(t23);
  const c13 = Math.cos(t13), s13 = Math.sin(t13);
  const cd = Math.cos(delta);
  return [
    [c12 ** 2 * c13 ** 2, s12 ** 2 * c13 ** 2, s13 ** 2],
    [s12 ** 2 * c23 ** 2 + c12 ** 2 * s23 ** 2 * s13 ** 2 + 2 * s12 * c12 * c23 * s23 * s13 * cd,
      c12 ** 2 * c23 ** 2 + s12 ** 2 * s23 ** 2 * s13 ** 2 - 2 * s12 * c12 * c23 * s23 * s13 * cd,
      s23 ** 2 * c13 ** 2],
    [s12 ** 2 * s23 ** 2 + c12 ** 2 * c23 ** 2 * s13 ** 2 - 2 * s12 * c12 * s23 * c23 * s13 * cd,
      c12 ** 2 * s23 ** 2 + s12 ** 2 * c23 ** 2 * s13 ** 2 + 2 * s12 * c12 * s23 * c23 * s13 * cd,
      c23 ** 2 * c13 ** 2],
  ];
}

function solve(A, b) {
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < A.length; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < A.length; row += 1) {
      if (Math.abs(M[row][col]) > Math.abs(M[pivot][col])) pivot = row;
    }
    [M[col], M[pivot]] = [M[pivot], M[col]];
    const scale = M[col][col];
    for (let j = col; j <= A.length; j += 1) M[col][j] /= scale;
    for (let row = 0; row < A.length; row += 1) {
      if (row === col) continue;
      const factor = M[row][col];
      for (let j = col; j <= A.length; j += 1) M[row][j] -= factor * M[col][j];
    }
  }
  return M.map((row) => row[A.length]);
}

const a = [1, 4, 9];
const b = [2, 7, 11];
const P = pmnsProbabilities(0.59, 0.84, 0.15, 1.20);
const moments = [];
for (const p of [1, 2]) {
  for (const q of [1, 2]) {
    let value = 0;
    for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) value += a[i] ** p * b[j] ** q * P[i][j];
    moments.push({ p, q, value });
  }
}

const equations = [];
const rhs = [];
for (let i = 0; i < 3; i += 1) {
  equations.push(Array.from({ length: 9 }, (_, k) => Math.floor(k / 3) === i ? 1 : 0));
  rhs.push(1);
}
for (let j = 0; j < 2; j += 1) {
  equations.push(Array.from({ length: 9 }, (_, k) => k % 3 === j ? 1 : 0));
  rhs.push(1);
}
for (const { p, q, value } of moments) {
  equations.push(Array.from({ length: 9 }, (_, k) => a[Math.floor(k / 3)] ** p * b[k % 3] ** q));
  rhs.push(value);
}

const reconstructed = solve(equations, rhs);
const original = P.flat();
const maximumError = Math.max(...original.map((x, i) => Math.abs(x - reconstructed[i])));
const rowErrors = P.map((row) => Math.abs(row.reduce((s, x) => s + x, 0) - 1));
const columnErrors = [0, 1, 2].map((j) => Math.abs(P.reduce((s, row) => s + row[j], 0) - 1));
const passed = maximumError < 1e-10 && Math.max(...rowErrors, ...columnErrors) < 1e-12;

console.log(JSON.stringify({
  protocol: "four-moments-double-jordan-frame-certificate/1",
  spectra: { a, b },
  fourMoments: moments,
  overlapMatrix: P,
  reconstructedOverlapMatrix: [reconstructed.slice(0, 3), reconstructed.slice(3, 6), reconstructed.slice(6, 9)],
  maximumReconstructionError: maximumError,
  firstProjectorPhysicalCoordinates: 2,
  completionFiber: "CP1",
  completionFiberRealDimension: 2,
  fullOverlapCoordinates: 4,
  residualDiscreteAmbiguity: "U versus conjugate(U)",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
