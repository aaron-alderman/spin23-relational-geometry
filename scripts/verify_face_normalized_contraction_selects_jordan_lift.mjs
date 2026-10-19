#!/usr/bin/env node

// Exact certificate for the missing contraction in the three-corner tensor image.
// The tensor factors are distinct, so multiplication is A *_S B = A S B for a
// chosen nondegenerate contraction S.  Exhaust all S in GL(2,F2), then impose
// the source-motivated two-face Peirce conditions.

import assert from 'node:assert/strict';

const mod2 = x => ((x % 2) + 2) % 2;
const add = (A, B) => A.map((r, i) => r.map((x, j) => mod2(x + B[i][j])));
const mul = (A, B) => A.map(r => B[0].map((_, j) => mod2(r.reduce((s, x, k) => s + x * B[k][j], 0))));
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const equal = (A, B) => JSON.stringify(A) === JSON.stringify(B);
const key = A => A.flat().join('');
const det2 = A => mod2(A[0][0] * A[1][1] - A[0][1] * A[1][0]);
const star = (A, S, B) => mul(mul(A, S), B);

const Z = [[0, 0], [0, 0]];
const p = [[1, 0], [0, 0]];
const a = [[0, 1], [0, 0]];
const q = [[0, 0], [0, 1]];
const ar = [[0, 0], [1, 0]];
const I = add(p, q);

const allMatrices = [];
for (let mask = 0; mask < 16; mask += 1) {
  allMatrices.push([
    [(mask >> 0) & 1, (mask >> 1) & 1],
    [(mask >> 2) & 1, (mask >> 3) & 1],
  ]);
}
const GL2 = allMatrices.filter(A => det2(A) === 1);
assert.equal(GL2.length, 6);

const T = allMatrices.filter(A => A[1][0] === 0);
const Tkeys = new Set(T.map(key));
assert.equal(T.length, 8);

const audits = GL2.map(S => {
  const closed = T.every(A => T.every(B => Tkeys.has(key(star(A, S, B)))));
  // Over F2 every invertible 2x2 matrix has an inverse found by exhaustion.
  const unit = GL2.find(U => equal(mul(S, U), I) && equal(mul(U, S), I));
  const unitalInside = Tkeys.has(key(unit));
  const normalizedFaces =
    equal(star(p, S, p), p) &&
    equal(star(q, S, q), q) &&
    equal(star(p, S, q), Z) &&
    equal(star(q, S, p), Z) &&
    equal(unit, add(p, q));
  return { S: key(S), closed, unit: key(unit), unitalInside, normalizedFaces };
});

const closedUnital = audits.filter(x => x.closed && x.unitalInside);
const faceSelected = audits.filter(x => x.normalizedFaces);
assert.equal(closedUnital.length, 2);
assert.equal(faceSelected.length, 1);
assert.equal(faceSelected[0].S, key(I));

// With the unique face-normalized contraction, the familiar matrix-unit table
// is derived rather than silently assumed.
assert(equal(star(p, I, a), a));
assert(equal(star(a, I, q), a));
assert(equal(star(q, I, a), Z));
assert(equal(star(a, I, p), Z));
assert(equal(star(a, I, a), Z));

// The transpose TRO product forces the reverse arrow.
const tro = (X, Y, W) => mul(mul(X, transpose(Y)), W);
assert(equal(tro(q, a, p), ar));
const fullMatrixUnitKeys = new Set([p, a, ar, q].map(key));
assert.equal(fullMatrixUnitKeys.size, 4);

// The based A2 path algebra has a split integral lift with the same 0/1
// matrix units.  Reduction mod 2 returns the certified binary multiplication.
const mulZ = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const integralUnits = [p, a, ar, q];
for (const X of integralUnits) {
  for (const Y of integralUnits) {
    assert(equal(mulZ(X, Y).map(r => r.map(mod2)), mul(X, Y)));
  }
}

// Transpose-fixed real matrices are exactly Sym_2(R), with basis
// p, q, a+a^T.  Its determinant has signature (1,2) in the standard
// coordinates [[t+x,y],[y,t-x]].
const symmetricBasis = [p, q, [[0, 1], [1, 0]]];
assert(symmetricBasis.every(X => equal(X, transpose(X))));

const report = {
  protocol: 'face-normalized-contraction-selects-jordan-lift/1',
  tensorWarning: 'G_ab^* and o_G are distinct factors; multiplication requires a contraction S.',
  nondegenerateBinaryContractions: GL2.length,
  contractionAudit: audits,
  contractionsGivingAUnitalTriangularAlgebra: closedUnital.map(x => x.S),
  contractionsPreservingBothNamedFacesAsOrthogonalIdempotents: faceSelected.map(x => x.S),
  selectedContraction: faceSelected[0].S,
  selectedUnit: faceSelected[0].unit,
  forcedReverseArrow: key(tro(q, a, p)),
  integralLift: 'T2(Z) -> M2(Z) under transpose-TRO closure',
  realFixedPart: 'M2(R)^{transpose}=Sym2(R)',
  determinantForm: 'det([[t+x,y],[y,t-x]])=t^2-x^2-y^2',
  determinantSignature: [1, 2],
  status: {
    unconditional: 'The raw tensor image alone does not define multiplication or transpose.',
    conditionalTheorem: 'The named orthogonal-idempotent face axioms uniquely select S=I, after which the split integral TRO/Jordan lift is exact.',
    remainingDependency: 'Derive the face axioms and their normalization from source conjugation or physical observables rather than interpretive labels.',
  },
  passed: true,
};

console.log(JSON.stringify(report, null, 2));
