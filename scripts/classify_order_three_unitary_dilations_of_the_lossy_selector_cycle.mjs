import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const sub = ([a, b], [d, e]) => [a - d, b - e];
const scale = (r, [a, b]) => [r * a, r * b];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const div = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const realM = A => A.map(row => row.map(x => c(x)));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const mscale = (r, A) => A.map(row => row.map(x => scale(r, x)));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const I2 = realM([[1, 0], [0, 1]]), D = realM([[1, 0], [0, -1]]);
const U = realM([[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]]), Ut = dagger(U);
const lossyFactor = (gamma, ell) => {
  const r = div(c(1, -gamma * Math.exp(-ell)), c(1, gamma * Math.exp(ell)));
  return mul(r, r);
};
const response = (gn, gt, en, et) => mm(mm(U, [[lossyFactor(gn, en), c(0)], [c(0), lossyFactor(gt, et)]]), Ut);
const cycle = (en, et) => {
  const Sp = response(1 + rt2, rt2 - 1, en, et);
  return mm(mm(mm(D, Sp.map(row => row.map(conj))), D), Sp);
};
const hermitianParts = A => {
  const Ah = dagger(A);
  return {
    re: mscale(0.5, madd(A, Ah)),
    im: mscale(0.5, mscale(-1, msub(A, Ah)).map(row => row.map(([x, y]) => c(-y, x)))),
  };
};
// im above evaluates (A-A^*)/(2i): multiply by -i/2.
const hermitianEigenvalues2 = A => {
  const a = A[0][0][0], d = A[1][1][0], z2 = A[0][1][0] ** 2 + A[0][1][1] ** 2;
  assert.ok(Math.abs(A[0][0][1]) < 1e-10 && Math.abs(A[1][1][1]) < 1e-10);
  const disc = Math.sqrt((a - d) ** 2 + 4 * z2);
  return [(a + d - disc) / 2, (a + d + disc) / 2];
};
const povm = C => {
  const { re, im } = hermitianParts(C);
  const P0 = mscale(1 / 3, madd(I2, mscale(2, re)));
  const remainder = mscale(0.5, msub(I2, P0));
  const P1 = madd(remainder, mscale(1 / rt3, im));
  const P2 = msub(remainder, mscale(1 / rt3, im));
  return [P0, P1, P2];
};
const omega = c(-0.5, rt3 / 2), omega2 = conj(omega);
const reconstruct = ([P0, P1, P2]) => madd(P0, madd(P1.map(row => row.map(x => mul(omega, x))), P2.map(row => row.map(x => mul(omega2, x)))));
const choleskyFactor = P => {
  const l00 = Math.sqrt(Math.max(0, P[0][0][0]));
  assert.ok(l00 > 1e-12);
  const l10 = scale(1 / l00, P[1][0]);
  const l11Squared = P[1][1][0] - (l10[0] ** 2 + l10[1] ** 2);
  assert.ok(l11Squared > -1e-10);
  return [[c(l00), c(0)], [l10, c(Math.sqrt(Math.max(0, l11Squared)))]];
};
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(Number(i === j))));
const diagonal = xs => xs.map((x, i) => xs.map((_, j) => i === j ? x : c(0)));

const cases = [
  [0, 0], [0.001, 0.001], [0.01, 0.01], [0.05, 0.05],
  [0.001, 0], [0, 0.001], [0.01, 0.02], [0.02, 0.01], [0.05, 0.001], [0.001, 0.05],
].map(([ellNormal, ellTangent]) => {
  const C = cycle(ellNormal, ellTangent), P = povm(C);
  const eigenvalues = P.map(hermitianEigenvalues2);
  const minimumPovmEigenvalue = Math.min(...eigenvalues.flat());
  return {
    ellNormal, ellTangent,
    minimumPovmEigenvalue,
    povmEigenvalues: eigenvalues,
    reconstructionDefect: maxDefect(reconstruct(P), C),
    hasOrderThreeUnitaryDilation: minimumPovmEigenvalue > -1e-10,
  };
});
assert.ok(cases.every(x => x.reconstructionDefect < 1e-10));

const gridValues = [0, 0.001, 0.01, 0.05, 0.1, 0.2, 0.5, 1, 2];
const grid = gridValues.flatMap(ellNormal => gridValues.map(ellTangent => {
  const P = povm(cycle(ellNormal, ellTangent));
  const minimumPovmEigenvalue = Math.min(...P.map(hermitianEigenvalues2).flat());
  return { ellNormal, ellTangent, minimumPovmEigenvalue };
}));
const gridMinimum = grid.reduce((a, b) => a.minimumPovmEigenvalue < b.minimumPovmEigenvalue ? a : b);
const gridMaximumLossMinimum = grid.filter(x => x.ellNormal + x.ellTangent > 0).reduce((a, b) => a.minimumPovmEigenvalue < b.minimumPovmEigenvalue ? a : b);

// Explicit minimal Naimark dilation for one strictly lossy full-rank point.
const witnessCycle = cycle(0.05, 0.05);
const witnessPovm = povm(witnessCycle);
const embeddingBlocks = witnessPovm.map(P => dagger(choleskyFactor(P))); // B_k^* B_k=P_k
const V = embeddingBlocks.flat(); // 6 x 2 isometry
const U6 = diagonal([c(1), c(1), omega, omega, omega2, omega2]);
const dilationCompression = mm(mm(dagger(V), U6), V);
const U6cube = mm(mm(U6, U6), U6);
const dilationWitness = {
  loss: [0.05, 0.05],
  ambientDimension: 6,
  povmRanks: witnessPovm.map(P => hermitianEigenvalues2(P).filter(x => x > 1e-10).length),
  isometryDefect: maxDefect(mm(dagger(V), V), I2),
  compressionDefect: maxDefect(dilationCompression, witnessCycle),
  orderThreeDefect: maxDefect(U6cube, identity(6)),
};
assert.deepEqual(dilationWitness.povmRanks, [2, 2, 2]);
assert.ok(dilationWitness.isometryDefect < 1e-10 && dilationWitness.compressionDefect < 1e-10 && dilationWitness.orderThreeDefect < 1e-10);

console.log(JSON.stringify({
  protocol: 'order-three-unitary-dilation-povm-classifier/1',
  criterion: 'C=P0+omega P1+omega^2 P2 with Pk positive semidefinite and sum Pk=I',
  construction: 'Vx=(sqrt(P0)x,sqrt(P1)x,sqrt(P2)x), U=diag(I,omega I,omega^2 I), C=V^*UV, U^3=I',
  cases,
  passiveQuadrantGrid: { values: gridValues, count: grid.length, globalMinimum: gridMinimum, positiveLossMinimum: gridMaximumLossMinimum, allAdmissible: grid.every(x => x.minimumPovmEigenvalue > -1e-10) },
  explicitDilationWitness: dilationWitness,
  passed: true,
}, null, 2));
