import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const div = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const scale = (r, [a, b]) => [r * a, r * b];
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(Number(i === j))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const blockDiagonal = blocks => {
  const sizes = blocks.map(B => B.length), total = sizes.reduce((a, b) => a + b, 0);
  const out = Array.from({ length: total }, () => Array.from({ length: total }, () => c(0)));
  let offset = 0;
  blocks.forEach((B, bi) => { for (let i = 0; i < sizes[bi]; i++) for (let j = 0; j < sizes[bi]; j++) out[offset + i][offset + j] = B[i][j]; offset += sizes[bi]; });
  return out;
};
const permute = (A, order) => order.map(i => order.map(j => A[i][j]));

const baseFactor = (omega, gamma, ell) => div(c(omega, -gamma * Math.exp(-ell)), c(omega, gamma * Math.exp(ell)));
const oneStage = (omega, gamma, ell) => {
  const a = gamma * Math.exp(-ell), b = gamma * Math.exp(ell);
  const coupling = Math.sqrt(Math.max(0, b * b - a * a));
  const denominator = c(omega, b);
  return [
    [div(c(omega, -a), denominator), div(c(0, -coupling), denominator)],
    [div(c(0, -coupling), denominator), div(c(omega, a), denominator)],
  ];
};
const embedStage = (stage, envIndex) => {
  const E = identity(3), indices = [0, envIndex];
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) E[indices[i]][indices[j]] = stage[i][j];
  return E;
};
const squaredScalarDilation = (omega, gamma, ell) => {
  const stage = oneStage(omega, gamma, ell);
  return mm(embedStage(stage, 2), embedStage(stage, 1));
};
const responseDilation = (omega, ellNormal, ellTangent) => {
  const normal = squaredScalarDilation(omega, 1 + rt2, ellNormal);
  const tangent = squaredScalarDilation(omega, rt2 - 1, ellTangent);
  // Initial direct-sum order (n,nE1,nE2,t,tE1,tE2); move observed channels first.
  const direct = permute(blockDiagonal([normal, tangent]), [0, 3, 1, 2, 4, 5]);
  const U = [[c(0.5), c(-rt3 / 2)], [c(rt3 / 2), c(0.5)]];
  const W = blockDiagonal([U, identity(4)]);
  return mm(mm(W, direct), dagger(W));
};
const observed = A => A.slice(0, 2).map(row => row.slice(0, 2));
const expectedResponse = (omega, en, et) => {
  const U = [[c(0.5), c(-rt3 / 2)], [c(rt3 / 2), c(0.5)]];
  const fn = mul(baseFactor(omega, 1 + rt2, en), baseFactor(omega, 1 + rt2, en));
  const ft = mul(baseFactor(omega, rt2 - 1, et), baseFactor(omega, rt2 - 1, et));
  return mm(mm(U, [[fn, c(0)], [c(0), ft]]), dagger(U));
};

const cases = [-3, -1, -0.2, 0, 0.3, 1, 4].flatMap(omega => [[0,0],[0.05,0.05],[0.1,0.02],[0,0.2]].map(([en, et]) => {
  const S6 = responseDilation(omega, en, et);
  const unitarityDefect = maxDefect(mm(dagger(S6), S6), identity(6));
  const compressionDefect = maxDefect(observed(S6), expectedResponse(omega, en, et));
  assert.ok(unitarityDefect < 1e-9 && compressionDefect < 1e-10);
  return { omega, ellNormal: en, ellTangent: et, unitarityDefect, compressionDefect };
}));

const rateExamples = [0, 0.05, 0.2].map(ell => ({
  ell,
  observedRateOverGamma: Math.cosh(ell),
  environmentRateOverGamma: Math.sinh(ell),
  poleRateOverGamma: Math.exp(ell),
  zeroRateOverGamma: Math.exp(-ell),
}));

console.log(JSON.stringify({
  protocol: 'fixed-six-port-rational-inner-lossy-face-dilation/1',
  oneStage: '[[omega-ia,-ic],[-ic,omega+ia]]/(omega+ib), with a=gamma e^-ell, b=gamma e^ell, c=sqrt(b^2-a^2)',
  positiveRates: 'kappa_obs=gamma cosh ell, kappa_env=gamma sinh ell, a=kappa_obs-kappa_env, b=kappa_obs+kappa_env',
  squaredFactor: 'two ordered conservative stages with two independent environment ports',
  fullFace: 'direct sum of normal and tangent three-port cascades, then fixed observed-port 60-degree mixing',
  dimensions: { observed: 2, environmentFaces: 2, multiplicityPerFace: 2, totalPorts: 6 },
  rateExamples,
  cases,
  boundary: 'This is a fixed-port broadband unitary dilation of one lossy response face. The opposite-sideband antiunitary sewing and complete selector-cycle dilation remain separate.',
  passed: true,
}, null, 2));
