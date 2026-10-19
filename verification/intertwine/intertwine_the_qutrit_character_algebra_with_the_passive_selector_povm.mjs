import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const zeta9 = [Math.cos(2 * Math.PI / 9), Math.sin(2 * Math.PI / 9)];
const omega = [-0.5, rt3 / 2], omega2 = [-0.5, -rt3 / 2];
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const sub = ([a, b], [d, e]) => [a - d, b - e];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const div = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const scale = (r, [a, b]) => [r * a, r * b];
const realM = A => A.map(row => row.map(x => c(x)));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const mscale = (r, A) => A.map(row => row.map(x => scale(r, x)));
const smul = (z, A) => A.map(row => row.map(x => mul(z, x)));
const mpow = (A, n) => { let Z = I2; for (let j = 0; j < n; j++) Z = mm(A, Z); return Z; };
const maxNorm = A => Math.max(...A.flat().map(([x, y]) => Math.hypot(x, y)));
const maxDefect = (A, B) => maxNorm(msub(A, B));
const I2 = realM([[1, 0], [0, 1]]), D = realM([[1, 0], [0, -1]]);
const U60 = realM([[0.5, -rt3 / 2], [rt3 / 2, 0.5]]);

const lossyFactor = (gamma, ell) => {
  const ratio = div(c(1, -gamma * Math.exp(-ell)), c(1, gamma * Math.exp(ell)));
  return mul(ratio, ratio);
};
const response = (ellNormal, ellTangent) => {
  const diagonal = [[lossyFactor(1 + rt2, ellNormal), c(0)], [c(0), lossyFactor(rt2 - 1, ellTangent)]];
  return mm(mm(U60, diagonal), dagger(U60));
};
const cycle = (ellNormal, ellTangent) => {
  const S = response(ellNormal, ellTangent);
  return mm(mm(mm(D, S.map(row => row.map(conj))), D), S);
};
const hermitianParts = A => {
  const Ah = dagger(A);
  const re = mscale(0.5, madd(A, Ah));
  const delta = msub(A, Ah);
  const im = delta.map(row => row.map(([x, y]) => c(y / 2, -x / 2)));
  return { re, im };
};
const effects = C => {
  const { re, im } = hermitianParts(C);
  const P0 = mscale(1 / 3, madd(I2, mscale(2, re)));
  const half = mscale(0.5, msub(I2, P0));
  return [P0, madd(half, mscale(1 / rt3, im)), msub(half, mscale(1 / rt3, im))];
};
const phi = (values, P) => values.reduce((A, value, k) => madd(A, smul(value, P[k])), [[c(0), c(0)], [c(0), c(0)]]);
const sourceReflect = ([a0, a1, a2]) => [a0, a2, a1];
const targetReflect = A => mm(mm(D, A), D);
const eigenvaluesHermitian2 = A => {
  const a = A[0][0][0], d = A[1][1][0], z2 = A[0][1][0] ** 2 + A[0][1][1] ** 2;
  const disc = Math.sqrt((a - d) ** 2 + 4 * z2);
  return [(a + d - disc) / 2, (a + d + disc) / 2];
};

const sourceU3 = [c(1), omega, omega2];
const sourceU = [c(1), zeta9, conj(zeta9)];
const sourceProbe = [c(0.2, -0.3), c(-0.4, 0.5), c(0.7, 0.1)];
const cases = [[0, 0], [0.05, 0.05], [0.1, 0.02], [0, 0.2], [0.2, 0]].map(([ellNormal, ellTangent]) => {
  const C = cycle(ellNormal, ellTangent), P = effects(C);
  const imageU3 = phi(sourceU3, P), imageU = phi(sourceU, P);
  const unitalDefect = maxDefect(phi([c(1), c(1), c(1)], P), I2);
  const covarianceDefect = maxDefect(targetReflect(phi(sourceProbe, P)), phi(sourceReflect(sourceProbe), P));
  const reconstructionDefect = maxDefect(imageU3, C);
  const kadisonDefect = msub(I2, mm(dagger(C), C));
  const kadisonEigenvalues = eigenvaluesHermitian2(kadisonDefect);
  const cubeRootDefect = maxDefect(mpow(imageU, 3), C);
  const orderNineDefect = maxDefect(mpow(imageU, 9), I2);
  const effectEigenvalues = P.map(eigenvaluesHermitian2);
  assert.ok(unitalDefect < 1e-10 && covarianceDefect < 1e-10 && reconstructionDefect < 1e-10);
  assert.ok(Math.min(...effectEigenvalues.flat()) > -1e-9);
  if (ellNormal === 0 && ellTangent === 0) {
    assert.ok(maxNorm(kadisonDefect) < 1e-9 && cubeRootDefect < 1e-9 && orderNineDefect < 1e-9);
  } else {
    assert.ok(Math.max(...kadisonEigenvalues) > 1e-8 && cubeRootDefect > 1e-8 && orderNineDefect > 1e-8);
  }
  return { ellNormal, ellTangent, effectEigenvalues, unitalDefect, covarianceDefect, reconstructionDefect, kadisonEigenvalues, cubeRootDefect, orderNineDefect };
});

console.log(JSON.stringify({
  protocol: 'qutrit-character-algebra-to-passive-selector-povm/1',
  source: 'C^3 with primitive idempotents E0,E1,E2 and reflection E1<->E2',
  map: 'Phi(Ek)=Pk, the unique unital completely positive map with Phi(U^3)=C',
  covariance: 'D Phi(a) D = Phi(Xa)',
  multiplicativeDomainCriterion: 'U^3 lies in the multiplicative domain iff I-C^*C=0',
  cases,
  conclusion: 'The character algebra intertwiner exists canonically and is reflection covariant. It transports the exact group law only at the lossless point; strict-loss compression is CP but nonmultiplicative.',
  passed: true,
}, null, 2));
