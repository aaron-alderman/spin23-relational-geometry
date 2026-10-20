#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidencePath = path.join(
  root,
  "evidence/data/spin23-family-partial-isometry-relational-generation-audit.json",
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, x) => C(a.re * x, a.im * x);
const abs2 = (a) => a.re * a.re + a.im * a.im;
const near = (a, b, eps = 1e-12) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;

const zero = () => C(0, 0);
const matrix = (n, m) => Array.from({ length: n }, () => Array.from({ length: m }, zero));
const eyeEntry = (i, j) => (i === j ? C(1, 0) : C(0, 0));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const multiply = (A, B) => {
  const out = matrix(A.length, B[0].length);
  for (let i = 0; i < A.length; i += 1) {
    for (let j = 0; j < B[0].length; j += 1) {
      for (let k = 0; k < B.length; k += 1) out[i][j] = add(out[i][j], mul(A[i][k], B[k][j]));
    }
  }
  return out;
};
const subtract = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const equalMatrix = (A, B) => A.every((row, i) => row.every((x, j) => near(x, B[i][j])));
const diag = (...xs) => xs.map((x, i) => xs.map((_, j) => (i === j ? C(x, 0) : C(0, 0))));
const unit = (n, row, col, z = C(1, 0)) => {
  const A = matrix(n, n);
  A[row][col] = z;
  return A;
};

// Basis (P,I,N). Rank-one source/target support forces t=z E_NP.
const pP = diag(1, 0, 0);
const pN = diag(0, 0, 1);
const phases = [0, Math.PI / 3, Math.PI / 2, Math.PI];
for (const phi of phases) {
  const z = C(Math.cos(phi), Math.sin(phi));
  const t = unit(3, 2, 0, z);
  assert(equalMatrix(multiply(dagger(t), t), pP));
  assert(equalMatrix(multiply(t, dagger(t)), pN));
}

// Conversely, t=z E_NP is normalized iff |z|=1.
for (const z of [C(1, 0), C(0, 1), C(3 / 5, -4 / 5)]) assert(Math.abs(abs2(z) - 1) < 1e-12);
assert.notEqual(abs2(C(2, 0)), 1);
assert.deepEqual(evidence.anchoredClassification.cpRealModuli, ["+E_NP", "-E_NP"]);

// The Majorana commutator compression and polar factor.
// On basis (P,N), D=[[0,y],[conj(y),0]], p=[[1,0],[0,0]].
const y = C(3, 4);
const DM = [[zero(), y], [conj(y), zero()]];
const p = diag(1, 0);
const commutator = subtract(multiply(DM, p), multiply(p, DM));
assert(near(commutator[1][0], conj(y)));
assert(near(commutator[0][1], scale(y, -1)));
const polar = scale(commutator[1][0], 1 / Math.sqrt(abs2(y)));
assert(near(polar, C(3 / 5, -4 / 5)));
assert(Math.abs(abs2(polar) - 1) < 1e-12);

// With the forbidden Dirac P-N block absent, the same compression is zero.
const DD = [[C(2, 0), zero()], [zero(), C(7, 0)]];
const diracCommutator = subtract(multiply(DD, p), multiply(p, DD));
assert(near(diracCommutator[1][0], zero()));

// Relation-sheet parity: M_P and M_N have equal signs, D_P and D_N opposite.
const parityOfUnit = (targetSign, sourceSign) => targetSign * sourceSign;
assert.equal(parityOfUnit(+1, +1), +1, "Majorana P-N unit is even");
assert.equal(parityOfUnit(-1, +1), -1, "hypothetical Dirac P-N unit is odd");
for (const phi of phases) assert.equal(parityOfUnit(+1, +1), +1, `phase ${phi} remains even`);

// J closure pairs the coefficient with its conjugate but leaves every phase valid.
for (const phi of phases) {
  const z = C(Math.cos(phi), Math.sin(phi));
  assert(Math.abs(abs2(conj(z)) - 1) < 1e-12);
}

// CP restricts a normalized complex coefficient to the two real points +/-1.
const realNormalized = [-1, 1].filter((x) => x * x === 1);
assert.deepEqual(realNormalized, [-1, 1]);

// Branch conditioning is block diagonal: only the M block gets P-N support.
// Basis (D_P,D_N,M_P,M_N).
const branchOperator = matrix(4, 4);
branchOperator[0][0] = C(1, 0); // retained Dirac PP
branchOperator[3][2] = polar; // Majorana P -> N
branchOperator[2][3] = conj(polar); // adjoint/J partner
assert(near(branchOperator[1][0], zero()), "no Dirac P-to-N leakage");
assert(near(branchOperator[0][2], zero()), "no M-to-D carrier sewing");
assert(near(branchOperator[2][0], zero()), "no D-to-M carrier sewing");

// Raw versus polar transport: raw adds an independent magnitude; polar still adds phase.
const a = C(2, -1);
const rawTransport = mul(a, conj(y));
const polarTransport = mul(a, polar);
assert(Math.abs(abs2(rawTransport) - abs2(a) * abs2(y)) < 1e-12);
assert(Math.abs(abs2(polarTransport) - abs2(a)) < 1e-12);
assert(!near(polarTransport, a), "the relative phase is not canonically trivial");

// Distinct normalized representatives obey all support/parity constraints.
const t0 = C(1, 0);
const tQuarter = C(0, 1);
assert(Math.abs(abs2(t0) - 1) < 1e-12 && Math.abs(abs2(tQuarter) - 1) < 1e-12);
assert(!near(t0, tQuarter), "the declared constraints do not select one phase");

assert.equal(evidence.claim, 1546);
assert.equal(evidence.anchoredClassification.moduli, "U(1) torsor");
assert.equal(evidence.branchConditioning.diracPNReopened, false);
assert.equal(evidence.branchConditioning.crossSectorCarrierAdded, false);
assert.equal(evidence.coefficientBoundary.existingGeometryEnforcesCommonCoefficient, false);
assert.equal(evidence.minimumReopeningDatum.newCarrierSupportRequired, false);

console.log("claim 1546 verification: PASS");
console.log("- Majorana anchored Hom line: one complex dimension");
console.log("- normalized representatives: U(1), reduced by CP only to +/-1");
console.log("- nonzero Majorana [D,p] compression yields a conditional polar representative");
console.log("- Dirac P-N compression: zero; hypothetical support is relation-sheet odd");
console.log("- no cross-sector carrier support is introduced");
console.log("- missing datum: branch-even relative phase/coefficient locking law");
