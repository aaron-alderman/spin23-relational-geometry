import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fixture = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/frontier/wave-7/g2_response_folding_no_go_v1.json"), "utf8"));
const failures = [];
const eps = 1e-10;

const add = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const sub = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const div = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d };
};
const scale = (a, s) => ({ re: a.re * s, im: a.im * s });
const norm = a => Math.hypot(a.re, a.im);
const z = (re, im = 0) => ({ re, im });

function inverse2(A) {
  const determinant = sub(mul(A[0][0], A[1][1]), mul(A[0][1], A[1][0]));
  return [
    [div(A[1][1], determinant), div(scale(A[0][1], -1), determinant)],
    [div(scale(A[1][0], -1), determinant), div(A[0][0], determinant)]
  ];
}

function matVec(A, x) {
  return A.map(row => row.reduce((sum, value, index) => add(sum, mul(value, x[index])), z(0)));
}

function response(M, K, omega, gamma, drive) {
  const spectral = z(omega * omega, gamma * omega);
  const A = K.map((row, i) => row.map((value, j) => sub(z(value), scale(spectral, M[i][j]))));
  return matVec(inverse2(A), drive);
}

function matrixRank(input, tolerance = 1e-9) {
  const A = input.map(row => [...row]);
  let rank = 0;
  for (let column = 0; column < A[0].length && rank < A.length; column += 1) {
    let pivot = rank;
    for (let row = rank + 1; row < A.length; row += 1) if (Math.abs(A[row][column]) > Math.abs(A[pivot][column])) pivot = row;
    if (Math.abs(A[pivot][column]) <= tolerance) continue;
    [A[rank], A[pivot]] = [A[pivot], A[rank]];
    const value = A[rank][column];
    for (let j = column; j < A[0].length; j += 1) A[rank][j] /= value;
    for (let row = 0; row < A.length; row += 1) {
      if (row === rank) continue;
      const factor = A[row][column];
      for (let j = column; j < A[0].length; j += 1) A[row][j] -= factor * A[rank][j];
    }
    rank += 1;
  }
  return rank;
}

function realMatVec(A, x) {
  return A.map(row => row.reduce((sum, value, index) => sum + value * x[index], 0));
}

function krylovRank(K, b) {
  const columns = [b];
  for (let i = 1; i < K.length; i += 1) columns.push(realMatVec(K, columns[i - 1]));
  const matrix = Array.from({ length: K.length }, (_, row) => columns.map(column => column[row]));
  return matrixRank(matrix);
}

const M = fixture.integralFold.mass;
const K = fixture.integralFold.stiffness;
const invSqrtM = [1, 1 / Math.sqrt(3)];
const Kcanonical = K.map((row, i) => row.map((value, j) => value * invSqrtM[i] * invSqrtM[j]));
const expectedK = fixture.canonicalFold.stiffness;
for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) if (Math.abs(Kcanonical[i][j] - expectedK[i][j]) > eps) failures.push(`canonical stiffness mismatch ${i},${j}`);

let maxResponseError = 0;
let cases = 0;
for (let step = 0; step <= 400; step += 1) {
  const omega = 0.05 + step * 0.0125;
  for (const phase of [0, Math.PI / 5, Math.PI / 2, 4 * Math.PI / 5]) {
    const drive = [z(1), z(0.7 * Math.cos(phase), 0.7 * Math.sin(phase))];
    const q = response(M, K, omega, 0.08, drive);
    const canonicalDrive = drive.map((value, index) => scale(value, invSqrtM[index]));
    const x = response([[1, 0], [0, 1]], Kcanonical, omega, 0.08, canonicalDrive);
    const recoveredQ = x.map((value, index) => scale(value, invSqrtM[index]));
    maxResponseError = Math.max(maxResponseError, ...q.map((value, index) => norm(sub(value, recoveredQ[index]))));
    cases += 1;
  }
}

const d4 = [
  [2, -1, -1, -1],
  [-1, 2, 0, 0],
  [-1, 0, 2, 0],
  [-1, 0, 0, 2]
];
const symmetricPort = [1, 0, 0, 0];
const unperturbedRank = krylovRank(d4, symmetricPort);
const perturbations = [0, 0.11, -0.07, 0.03];
const perturbed = d4.map((row, i) => row.map((value, j) => value + (i === j ? perturbations[i] : 0)));
const perturbedRank = krylovRank(perturbed, symmetricPort);

if (maxResponseError > fixture.expected.canonicalResponseMaxError) failures.push(`canonical response error ${maxResponseError}`);
if (unperturbedRank !== fixture.expected.unperturbedSymmetricPortKrylovRank) failures.push(`unperturbed rank ${unperturbedRank}`);
if (perturbedRank !== fixture.expected.unequallyPerturbedOuterPortKrylovRank) failures.push(`perturbed rank ${perturbedRank}`);

const trace = Kcanonical[0][0] + Kcanonical[1][1];
const determinant = Kcanonical[0][0] * Kcanonical[1][1] - Kcanonical[0][1] * Kcanonical[1][0];
const discriminant = Math.sqrt(trace * trace - 4 * determinant);
const eigenvalues = [(trace - discriminant) / 2, (trace + discriminant) / 2];
for (let i = 0; i < 2; i += 1) if (Math.abs(eigenvalues[i] - fixture.canonicalFold.eigenvalues[i]) > eps) failures.push(`eigenvalue mismatch ${i}`);

if (failures.length) {
  console.error(JSON.stringify({ status: "FAIL", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: "PASS",
  responseCases: cases,
  canonicalResponseMaxError: maxResponseError,
  canonicalEigenvalues: eigenvalues,
  twoChannelGenericFitError: maxResponseError,
  unperturbedSymmetricPortKrylovRank: unperturbedRank,
  unequallyPerturbedOuterPortKrylovRank: perturbedRank,
  decision: "two-channel G2 origin not identifiable; reopen with pre-fold resolved perturbations"
}));
