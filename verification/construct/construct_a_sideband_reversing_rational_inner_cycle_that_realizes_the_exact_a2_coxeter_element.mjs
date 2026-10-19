import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const div = ([a, b], [d, e]) => {
  const n = d * d + e * e;
  return [(a * d + b * e) / n, (b * d - a * e) / n];
};
const conj = ([a, b]) => [a, -b];
const scale = (a, [x, y]) => [a * x, a * y];
const approxC = ([a, b], [d, e], eps = 1e-11) => Math.abs(a - d) < eps && Math.abs(b - e) < eps;
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), c(0))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const approxM = (A, B) => A.every((row, i) => row.every((x, j) => approxC(x, B[i][j])));
const realM = A => A.map(row => row.map(x => c(x)));

const f = (omega, gamma) => {
  const b = div(c(omega, -gamma), c(omega, gamma));
  return mul(b, b);
};

const omega = 1;
const gammaNormal = 1 + rt2;
const gammaTangent = rt2 - 1;
assert.ok(Math.abs(gammaNormal * gammaTangent - omega ** 2) < 1e-12);

// Columns are the normal n=(1,sqrt3)/2 and its oriented orthogonal tangent.
const U = [[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]];
const D = [[1, 0], [0, -1]];
const n = [1, rt3];
const reflection = v => {
  const n2 = v[0] ** 2 + v[1] ** 2;
  return [[1 - 2 * v[0] ** 2 / n2, -2 * v[0] * v[1] / n2], [-2 * v[0] * v[1] / n2, 1 - 2 * v[1] ** 2 / n2]];
};
const Rplus = reflection(n);
const Rminus = reflection([1, -rt3]);
const C3 = mm(realM(Rminus), realM(Rplus));

const response = om => {
  const phases = [[f(om, gammaNormal), c(0)], [c(0), f(om, gammaTangent)]];
  return mm(mm(realM(U), phases), realM(U.map((_, i) => U.map(row => row[i]))));
};

const Spos = response(omega);
const Sneg = response(-omega);
assert.ok(approxM(Sneg, Spos.map(row => row.map(conj))));
assert.ok(approxM(mm(dagger(Spos), Spos), realM([[1, 0], [0, 1]])));

// At the selected ratios the normal eigenphase is +i and the tangent is -i,
// so S(+omega)=-i R_n.  The negative sideband is its conjugate +i R_n.
const minusIRplus = Rplus.map(row => row.map(x => c(0, -x)));
assert.ok(approxM(Spos, minusIRplus));

const Dcomplex = realM(D);
const twistedPositive = mm(mm(Dcomplex, Spos), Dcomplex);
const twistedNegative = mm(mm(Dcomplex, Sneg), Dcomplex);

const sameFrequencyCascade = mm(twistedPositive, Spos);
const sidebandReversingCascade = mm(twistedNegative, Spos);
assert.ok(approxM(sameFrequencyCascade, C3.map(row => row.map(z => scale(-1, z)))));
assert.ok(approxM(sidebandReversingCascade, C3));
assert.ok(approxM(mm(mm(sidebandReversingCascade, sidebandReversingCascade), sidebandReversingCascade), realM([[1, 0], [0, 1]])));

console.log(JSON.stringify({
  protocol: 'sideband-reversing-rational-inner-a2-cycle/1',
  omega,
  poleScales: { normal: gammaNormal, tangent: gammaTangent, product: gammaNormal * gammaTangent },
  positiveFrequencyEigenphases: { normal: f(omega, gammaNormal), tangent: f(omega, gammaTangent) },
  positiveResponse: Spos,
  negativeResponse: Sneg,
  sameFrequencyCascade: '-C3, hence order six rather than three',
  sidebandReversingCascade: 'D S(-omega) D times S(+omega) = C3 exactly',
  C3,
  physicalGate: 'A boundary/Floquet process must coherently convert the first face at +omega into the h*chi-twisted face at -omega. A stationary diagonal-frequency response does not perform this cascade.',
  remainingTuning: 'The reciprocal pole ratios sqrt(2)+/-1 and the operating frequency are exact but not yet protected by topology or a Ward identity.',
  passed: true,
}, null, 2));
