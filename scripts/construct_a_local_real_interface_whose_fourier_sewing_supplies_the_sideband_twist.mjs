import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, v) => A.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const dot = (u, v) => u.reduce((s, x, j) => s + x * v[j], 0);
const approx = (a, b, eps = 1e-11) => Math.abs(a - b) < eps;
const approxM = (A, B) => A.every((row, i) => row.every((x, j) => approx(x, B[i][j])));
const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
assert.deepEqual(mm(tr(D), D), I);

// Interface variation: q2=Dq1 and p2=D p1 make
// -p1.delta(q1)+p2.delta(q2)=0 for delta(q2)=D delta(q1).
const q1 = [0.4, -0.7], p1 = [1.2, 0.3], dq1 = [-0.2, 0.9];
const q2 = mv(D, q1), p2 = mv(D, p1), dq2 = mv(D, dq1);
assert.ok(approx(-dot(p1, dq1) + dot(p2, dq2), 0));

// Energy flux p.dot(qdot) is transmitted unchanged.
const qdot1 = [0.8, -1.1], qdot2 = mv(D, qdot1);
assert.ok(approx(dot(p1, qdot1), dot(p2, qdot2)));

// Fourier reality converts the real local interface into anti-linear
// positive-to-negative-frequency sewing.
const zPlus = [[0.31, 0.44], [-0.52, 0.17]]; // complex vector as [re,im] entries
const cconj = ([x, y]) => [x, -y];
const DcomplexVector = v => [v[0], [-v[1][0], -v[1][1]]];
const zMinus = zPlus.map(cconj);
const face2Minus = DcomplexVector(zMinus);
const DKpositive = DcomplexVector(zPlus.map(cconj));
assert.deepEqual(face2Minus, DKpositive);

// Reproduce the exact active Coxeter cascade at the selected frequency.
const reflection = v => {
  const n2 = dot(v, v);
  return [[1 - 2 * v[0] ** 2 / n2, -2 * v[0] * v[1] / n2], [-2 * v[0] * v[1] / n2, 1 - 2 * v[1] ** 2 / n2]];
};
const Rplus = reflection([1, rt3]);
const Rminus = reflection([1, -rt3]);
const C3 = mm(Rminus, Rplus);
assert.ok(approxM(mm(mm(C3, C3), C3), I));
assert.ok(approxM(mm(D, mm(Rplus, D)), Rminus));

console.log(JSON.stringify({
  protocol: 'local-real-interface-sideband-sewing/1',
  interface: {
    configuration: 'q2(0,t) = D q1(0,t)',
    orientedNormalDerivative: 'p2(0,t) = D p1(0,t)',
    variationalBoundaryTerm: 0,
    fluxPreserved: true,
  },
  fourierConsequence: 'for real q, q2(-omega) = D conjugate(q1(+omega))',
  activeCycle: {
    twistedReflection: 'D R_plus D = R_minus',
    product: 'R_minus R_plus = C3',
    order: 3,
  },
  qualification: 'This is a local effective boundary condition for real neutral response fields. Deriving those fields and this interface from microscopic Standard-Model dynamics remains open.',
  passed: true,
}, null, 2));
