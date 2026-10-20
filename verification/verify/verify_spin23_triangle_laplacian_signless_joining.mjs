import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-triangle-laplacian-signless-joining.json"), "utf8"));

const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const scale = (x, a) => C(a * x.re, a * x.im);
const conj = x => C(x.re, -x.im);
const abs2 = x => x.re * x.re + x.im * x.im;
const zsum = xs => xs.reduce(add, C(0));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const mmul = (A, B) => A.map(row => B[0].map((_, j) => zsum(row.map((x, k) => mul(x, B[k][j])))));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const mscale = (A, a) => A.map(row => row.map(x => scale(x, a)));
const maxNorm = A => Math.max(...A.flat().map(x => Math.sqrt(abs2(x))));

function determinant3(A) {
  return add(sub(mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))),
    mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))),
    mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))));
}

function hermitianEigenvalues(A) {
  const q = (A[0][0].re + A[1][1].re + A[2][2].re) / 3;
  let p2 = 0;
  for (let i = 0; i < 3; i += 1) p2 += (A[i][i].re - q) ** 2;
  for (let i = 0; i < 3; i += 1) for (let j = i + 1; j < 3; j += 1) p2 += 2 * abs2(A[i][j]);
  const p = Math.sqrt(p2 / 6);
  const B = mscale(msub(A, mscale(eye(3), q)), 1 / p);
  const r = Math.max(-1, Math.min(1, determinant3(B).re / 2));
  const phi = Math.acos(r) / 3;
  const high = q + 2 * p * Math.cos(phi);
  const low = q + 2 * p * Math.cos(phi + 2 * Math.PI / 3);
  return [low, 3 * q - low - high, high].sort((x, y) => x - y);
}

const cross = (x, y) => [
  sub(mul(x[1], y[2]), mul(x[2], y[1])),
  sub(mul(x[2], y[0]), mul(x[0], y[2])),
  sub(mul(x[0], y[1]), mul(x[1], y[0])),
];

function eigenvector(A, lambda) {
  const M = A.map((row, i) => row.map((x, j) => sub(x, C(i === j ? lambda : 0))));
  const candidates = [cross(M[0], M[1]), cross(M[0], M[2]), cross(M[1], M[2])];
  const v = candidates.sort((x, y) => zsum(y.map(C => C && ({ re: abs2(C), im: 0 }))).re - zsum(x.map(C => C && ({ re: abs2(C), im: 0 }))).re)[0];
  const norm = Math.sqrt(v.reduce((s, x) => s + abs2(x), 0));
  return v.map(x => scale(x, 1 / norm));
}

function diagonalize(A) {
  const values = hermitianEigenvalues(A);
  const vectors = values.map(lambda => eigenvector(A, lambda));
  const U = A.map((_, i) => vectors.map(v => v[i]));
  assert.ok(maxNorm(msub(mmul(dagger(U), U), eye(3))) < 1e-9);
  for (let j = 0; j < 3; j += 1) {
    const v = U.map(row => [row[j]]);
    assert.ok(maxNorm(msub(mmul(A, v), mscale(v, values[j]))) < 1e-8);
  }
  return { values, U };
}

function operators(p) {
  const phase = C(Math.cos(p.delta), Math.sin(p.delta));
  const H = [
    [C(0), C(p.a), conj(scale(phase, p.c))],
    [C(p.a), C(0), C(p.b)],
    [scale(phase, p.c), C(p.b), C(0)],
  ];
  const D = [[C(p.a + p.c), C(0), C(0)], [C(0), C(p.a + p.b), C(0)], [C(0), C(0), C(p.b + p.c)]];
  const Hbar = H.map(row => row.map(conj));
  return { Ku: msub(D, H), Kd: D.map((row, i) => row.map((x, j) => add(x, scale(Hbar[i][j], p.eta)))) };
}

const permuteColumns = (U, p) => U.map(row => p.map(j => row[j]));
const magnitude = A => A.map(row => row.map(x => Math.sqrt(abs2(x))));
const increasing = xs => xs.every((x, i) => i === 0 || xs[i - 1] < x);
const decreasing = xs => xs.every((x, i) => i === 0 || xs[i - 1] > x);

assert.equal(data.documentId, 1478);
const w = data.unrestrictedOrderingWitness;
const { Ku, Kd } = operators(w.parameters);
const up = diagonalize(Ku);
const down = diagonalize(Kd);
const Uu = permuteColumns(up.U, w.upPermutationZeroBased);
const Ud = permuteColumns(down.U, w.downPermutationZeroBased);
const V = mmul(dagger(Uu), Ud);
const mags = magnitude(V);
const residual = Math.max(...mags.flatMap((row, i) => row.map((x, j) => Math.abs(x - data.ckmTargetMagnitudes[i][j]))));
assert.ok(Math.abs(residual - w.maximumMagnitudeResidual) < 2e-10);
assert.ok(residual < 4e-6);
const j = Math.abs(mul(mul(V[0][0], V[1][1]), mul(conj(V[0][1]), conj(V[1][0]))).im);
assert.ok(Math.abs(j - w.absoluteJarlskog) < 2e-10);

const upPhysical = w.upPermutationZeroBased.map(i => up.values[i]);
const downPhysical = w.downPermutationZeroBased.map(i => down.values[i]);
assert.ok(Math.max(...upPhysical.map((x, i) => Math.abs(x - w.upEigenvaluesPhysicalOrder[i]))) < 1e-9);
assert.ok(Math.max(...downPhysical.map((x, i) => Math.abs(x - w.downEigenvaluesPhysicalOrder[i]))) < 1e-9);
assert.equal(increasing(downPhysical), false);
assert.equal(decreasing(downPhysical), false);

const m = data.massSource.centralMassesGeV;
const ru = (m.c ** 2 - m.u ** 2) / (m.t ** 2 - m.u ** 2);
const rd = (m.s ** 2 - m.d ** 2) / (m.b ** 2 - m.d ** 2);
assert.ok(Math.abs(ru - data.affineInvariantMassSquaredLocations.up) < 1e-18);
assert.ok(Math.abs(rd - data.affineInvariantMassSquaredLocations.down) < 1e-18);
assert.equal(data.jointSearch.joinedSolutionFound, false);
assert.equal(data.verdict.derivedNoncentralContrastExists, true);
assert.equal(data.verdict.ckmMagnitudeCapacityWitnessExists, true);
assert.equal(data.verdict.thatWitnessRespectsMassOrder, false);
assert.equal(data.verdict.globalNoGoEstablished, false);
assert.equal(data.verdict.physicalAdmissionChanged, false);

console.log(`PASS 1478: the derived Laplacian/signless contrast reaches CKM central magnitudes within ${residual.toExponential(3)}, but its down-family eigenvalues are cyclic rather than monotone; the bounded joined mass-plus-mixing search found no solution.`);
