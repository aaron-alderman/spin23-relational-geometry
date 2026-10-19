import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3);
const I = [[1, 0], [0, 1]];
const A = [[0, -1], [1, -1]];
const GA2 = [[2, -1], [-1, 2]];
const mm = (X, Y) => X.map(row => Y[0].map((_, j) => row.reduce((s, x, k) => s + x * Y[k][j], 0)));
const tr = X => X[0].map((_, j) => X.map(row => row[j]));
const scale = (a, X) => X.map(row => row.map(x => a * x));
const approxMatrix = (X, Y, eps = 1e-12) => X.every((row, i) => row.every((x, j) => Math.abs(x - Y[i][j]) < eps));
const outer = g => g.map(x => g.map(y => x * y));
const reflectionNormalTo = g => {
  const n2 = g.reduce((s, x) => s + x * x, 0);
  const P = scale(1 / n2, outer(g));
  return I.map((row, i) => row.map((x, j) => x - 2 * P[i][j]));
};

const gPlus = [1, rt3];
const gMinus = [1, -rt3];
const SPlus = reflectionNormalTo(gPlus);
const SMinus = reflectionNormalTo(gMinus);
const C = mm(SMinus, SPlus);
const Cinv = mm(SPlus, SMinus);

assert.ok(approxMatrix(SPlus, [[1 / 2, -rt3 / 2], [-rt3 / 2, -1 / 2]]));
assert.ok(approxMatrix(SMinus, [[1 / 2, rt3 / 2], [rt3 / 2, -1 / 2]]));
assert.ok(approxMatrix(C, [[-1 / 2, -rt3 / 2], [rt3 / 2, -1 / 2]]));
assert.ok(approxMatrix(mm(mm(C, C), C), I));
assert.ok(approxMatrix(mm(C, Cinv), I));
assert.ok(approxMatrix(mm(tr(C), C), I));

// P uses v and Cv as columns.  Therefore C P = P A, so the Euclidean
// 120-degree rotation is conjugate to the integral augmentation-ideal block.
const P = [[1, -1 / 2], [0, rt3 / 2]];
assert.ok(approxMatrix(mm(C, P), mm(P, A)));
assert.ok(approxMatrix(mm(tr(P), P), scale(1 / 2, GA2)));
assert.deepEqual(mm(mm(tr(A), GA2), A), GA2);

// Without the weak/Pfaffian relative sign, the two channel reflections are
// the same and their product is the identity rather than C3.
assert.ok(approxMatrix(mm(SPlus, SPlus), I));

console.log(JSON.stringify({
  protocol: 'paired-so10-mediator-householders-to-a2-coxeter/1',
  canonicallyNormalizedMediatorNormals: { up: gPlus, downAfterWeakOrientation: gMinus },
  piReflections: { up: SPlus, down: SMinus },
  orderedProduct: C,
  inverseProduct: Cinv,
  relations: { C3: true, characteristicPolynomial: 'lambda^2 + lambda + 1', orthogonal: true },
  integralConjugacy: {
    P,
    equation: 'C P = P A',
    A,
    pullbackMetric: 'P^T P = G_A2 / 2',
    GA2,
  },
  missingGate: 'A physical weak/Pfaffian sewing must enforce the opposite relative sign, and both mediator eigenphases must be protected at pi.',
  failureWithoutSign: 'S_plus squared is identity, so equal channel orientations generate no order-three action.',
  conclusion: 'The color-multiplicity square root and an oriented weak sign turn the paired vector-10 mediator pulses into the exact A2 Coxeter generator underlying the selector active block.',
  passed: true,
}, null, 2));
