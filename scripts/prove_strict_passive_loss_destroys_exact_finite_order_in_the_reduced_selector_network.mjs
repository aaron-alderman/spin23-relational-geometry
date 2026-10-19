import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const div = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const realM = A => A.map(row => row.map(x => c(x)));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const daggerEntrywise = A => A.map(row => row.map(conj));
const det2 = A => add(mul(A[0][0], A[1][1]), mul(c(-1), mul(A[0][1], A[1][0])));
const abs2 = ([a, b]) => a * a + b * b;
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const I2 = realM([[1, 0], [0, 1]]), D = realM([[1, 0], [0, -1]]);
const U = realM([[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]]), Ut = realM([[1 / 2, rt3 / 2], [-rt3 / 2, 1 / 2]]);
const lossyFactor = (gamma, ell) => {
  const zeroScale = gamma * Math.exp(-ell), poleScale = gamma * Math.exp(ell);
  const r = div(c(1, -zeroScale), c(1, poleScale));
  return mul(r, r);
};
const response = (gn, gt, elln, ellt) => mm(mm(U, [[lossyFactor(gn, elln), c(0)], [c(0), lossyFactor(gt, ellt)]]), Ut);
const cycle = (gn, gt, elln, ellt) => {
  const Sp = response(gn, gt, elln, ellt);
  const Sm = daggerEntrywise(Sp); // real-time frequency reality: S(-omega)=conj S(+omega)
  return mm(mm(mm(D, Sm), D), Sp);
};
const predictedDeterminant = (gn, gt, elln, ellt) => [
  [gn, elln], [gt, ellt],
].reduce((p, [gamma, ell]) => {
  const a = gamma * Math.exp(-ell), b = gamma * Math.exp(ell);
  return p * ((1 + a * a) / (1 + b * b)) ** 2;
}, 1);

const gn = 1 + rt2, gt = rt2 - 1;
const samples = [[0, 0], [0.001, 0], [0, 0.001], [0.01, 0.02], [0.05, 0.05]].map(([elln, ellt]) => {
  const C = cycle(gn, gt, elln, ellt);
  const determinant = det2(C);
  const C3 = mm(mm(C, C), C);
  return {
    ellNormal: elln,
    ellTangent: ellt,
    determinant,
    predictedDeterminant: predictedDeterminant(gn, gt, elln, ellt),
    determinantOfCube: mul(mul(determinant, determinant), determinant),
    orderThreeDefect: maxDefect(C3, I2),
  };
});

for (const x of samples) {
  assert.ok(Math.abs(x.determinant[1]) < 1e-12);
  assert.ok(Math.abs(x.determinant[0] - x.predictedDeterminant) < 1e-12);
}
assert.ok(samples[0].orderThreeDefect < 1e-12);
assert.ok(samples.slice(1).every(x => x.determinant[0] < 1 && x.orderThreeDefect > 1e-8));
assert.ok(samples.slice(1).every(x => abs2(x.determinantOfCube) < 1));

console.log(JSON.stringify({
  protocol: 'strict-passive-loss-finite-order-no-go/1',
  deformation: 'f_j=((omega-i gamma_j exp(-ell_j))/(omega+i gamma_j exp(+ell_j)))^2 with ell_j >= 0',
  determinantFormula: 'det C = product_j [(omega^2+gamma_j^2 exp(-2 ell_j))/(omega^2+gamma_j^2 exp(+2 ell_j))]^2',
  samples,
  theorem: 'If any ell_j is positive, det C is strictly between zero and one. Therefore det(C^3) is not one and C^3 cannot equal I.',
  escapeHatch: 'Exact finite order may exist in a larger lossless dilation including the environmental ports, but not in the strictly contractive reduced two-channel block.',
  passed: true,
}, null, 2));
