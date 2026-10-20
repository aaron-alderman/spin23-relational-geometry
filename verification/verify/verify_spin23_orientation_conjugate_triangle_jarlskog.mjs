import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-orientation-conjugate-triangle-jarlskog.json"), "utf8"));

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => z(a.re, -a.im);
const matrixConj = (a) => a.map((row) => row.map(conj));
const matrixMul = (a, b) => a.map((row, i) => b[0].map((_, j) => row.reduce((sum, value, k) => add(sum, mul(value, b[k][j])), z(0))));
const matrixSub = (a, b) => a.map((row, i) => row.map((value, j) => sub(value, b[i][j])));
const det3 = (m) => add(sub(mul(m[0][0], sub(mul(m[1][1], m[2][2]), mul(m[1][2], m[2][1]))), mul(m[0][1], sub(mul(m[1][0], m[2][2]), mul(m[1][2], m[2][0])))), mul(m[0][2], sub(mul(m[1][0], m[2][1]), mul(m[1][1], m[2][0]))));

assert.equal(data.documentId, 1476);
const a = 2;
const b = 3;
const c = 5;
const delta = Math.PI / 4;
const phase = z(Math.cos(delta), Math.sin(delta));
const phaseConj = conj(phase);
const hp = [[z(0), z(a), mul(z(c), phaseConj)], [z(a), z(0), z(b)], [mul(z(c), phase), z(b), z(0)]];
const hm = matrixConj(hp);
const commutator = matrixSub(matrixMul(hp, hm), matrixMul(hm, hp));
const determinant = det3(commutator);
const expectedImaginary = -8 * c ** 4 * (a ** 2 - b ** 2) * Math.sin(delta) ** 2 * Math.sin(2 * delta);
assert.ok(Math.abs(determinant.re) < 1e-8);
assert.ok(Math.abs(determinant.im - expectedImaginary) < 1e-8);
assert.ok(Math.abs(determinant.im - 12500) < 1e-8);

assert.equal(data.commutator.genericNonzero, true);
assert.equal(data.jarlskog.nonzeroWhenSpectraNondegenerate, true);
assert.equal(data.jarlskog.requiresIndependentSecondArbitraryMatrix, false);
assert.equal(data.constraints.HplusAndHminusIsospectral, true);
assert.equal(data.constraints.genericCKMMatrixCovered, false);
assert.equal(data.constraints.massHierarchiesDerived, false);
assert.equal(data.interpretation.physicalSectorAssignmentDerived, false);
assert.equal(data.interpretation.physicalAdmissionChanged, false);

console.log("PASS 1476: orientation-conjugate triangle operators have determinant [H+,H-]=-8 i c^4(a^2-b^2)sin^2(delta)sin(2delta), generically nonzero, while remaining isospectral and non-generic.");
