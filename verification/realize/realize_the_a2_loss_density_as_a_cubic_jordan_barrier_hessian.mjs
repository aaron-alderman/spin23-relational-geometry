import assert from 'node:assert/strict';

const sqrt = Math.sqrt;
const Q = [
  [-2 / sqrt(6), 0],
  [1 / sqrt(6), 1 / sqrt(2)],
  [1 / sqrt(6), -1 / sqrt(2)]
];
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const diagonal = values => values.map((value, i) => values.map((_, j) => i === j ? value : 0));
const close = (A, B, tolerance = 1e-11) => A.every((row, i) => row.every((value, j) => Math.abs(value - B[i][j]) < tolerance));
const restrict = H => multiply(multiply(transpose(Q), H), Q);

assert.ok(close(multiply(transpose(Q), Q), [[1, 0], [0, 1]]));

const betaEven = 1.7;
const betaOdd = 0.8;
assert.ok(3 * betaEven > betaOdd);
const b = betaOdd;
const a = (3 * betaEven - betaOdd) / 2;
const u = 1 / sqrt(a);
const v = 1 / sqrt(b);

// For N=x0*x1*x2, Hess(-log N) at p=(u,v,v) is diag(u^-2,v^-2,v^-2).
const barrierHessian = diagonal([1 / (u * u), 1 / (v * v), 1 / (v * v)]);
const induced = restrict(barrierHessian);
assert.ok(close(induced, [[betaEven, 0], [0, betaOdd]]));

// The cubic norm Hessian itself is indefinite at the symmetric point.
const cubicHessianAtOne = [[0, 1, 1], [1, 0, 1], [1, 1, 0]];
const cubicRestricted = restrict(cubicHessianAtOne);
assert.ok(close(cubicRestricted, [[-1, 0], [0, -1]]));

// Necessity in this reflection chart: a=(3 betaEven-betaOdd)/2 must be positive.
const failingEven = 0.2;
const failingOdd = 1;
assert.ok((3 * failingEven - failingOdd) / 2 < 0);

console.log(JSON.stringify({
  protocol: 'cubic-jordan-barrier-a2-loss/1',
  jordanAlgebra: 'J=R^3 with coordinatewise product',
  cubicNorm: 'N(x)=x0*x1*x2',
  positiveMetric: 'Hess[-log N](u,v,v)=diag(u^-2,v^-2,v^-2)',
  traceZeroRestriction: 'diag((2a+b)/3,b) in the reflection-even/odd A2 basis',
  inverseMap: 'b=beta_odd, a=(3 beta_even-beta_odd)/2',
  existenceCondition: '3 beta_even > beta_odd for this fixed reflection-channel assignment',
  warning: 'The raw Hessian of N is not the positive loss metric; positivity comes from the logarithmic cone barrier.',
  interpretation: 'This is an exact Jordan-cubic realization of any reflection-split density satisfying the inequality, but fitting p(omega) does not derive its dynamics.',
  passed: true
}, null, 2));
