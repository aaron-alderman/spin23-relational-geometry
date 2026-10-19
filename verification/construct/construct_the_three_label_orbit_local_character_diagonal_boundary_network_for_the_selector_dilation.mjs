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
const zero = (m, n) => Array.from({ length: m }, () => Array.from({ length: n }, () => c(0)));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(Number(i === j))));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const mscale = (r, A) => A.map(row => row.map(x => scale(r, x)));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const blockDiagonal = blocks => {
  const n = blocks.reduce((s, B) => s + B.length, 0), out = zero(n, n);
  let o = 0;
  for (const B of blocks) { for (let i = 0; i < B.length; i++) for (let j = 0; j < B.length; j++) out[o + i][o + j] = B[i][j]; o += B.length; }
  return out;
};
const kron = (A, B) => A.flatMap(row => B.map(brow => row.flatMap(x => brow.map(y => mul(x, y)))));
const frobenius = A => Math.sqrt(A.flat().reduce((s, [x, y]) => s + x * x + y * y, 0));

const zeta = c(-0.5, rt3 / 2), zeta2 = conj(zeta);
const F = [[c(1), c(1), c(1)], [c(1), zeta2, zeta], [c(1), zeta, zeta2]].map(row => row.map(x => scale(1 / rt3, x)));
const Q = blockDiagonal([[[c(1)]], [[zeta]], [[zeta2]]]);
const shift3 = mm(mm(F, Q), dagger(F));
const shift6 = kron(shift3, identity(2));
assert.ok(maxDefect(mm(mm(shift6, shift6), shift6), identity(6)) < 1e-12);
assert.ok(maxDefect(mm(dagger(shift6), shift6), identity(6)) < 1e-12);

const Uface = realM([[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]]), Ufacet = dagger(Uface), D = realM([[1, 0], [0, -1]]);
const factor = (gamma, ell) => { const q = div(c(1, -gamma * Math.exp(-ell)), c(1, gamma * Math.exp(ell))); return mul(q, q); };
const cycle = ell => {
  const S = mm(mm(Uface, [[factor(1 + rt2, ell), c(0)], [c(0), factor(rt2 - 1, ell)]]), Ufacet);
  return mm(mm(mm(D, S.map(row => row.map(conj))), D), S);
};
const povm = C => {
  const Ch = dagger(C), re = mscale(0.5, madd(C, Ch)), diff = msub(C, Ch);
  const im = mscale(0.5, diff.map(row => row.map(([x, y]) => c(y, -x))));
  const P0 = mscale(1 / 3, madd(identity(2), mscale(2, re))), half = mscale(0.5, msub(identity(2), P0));
  return [P0, madd(half, mscale(1 / rt3, im)), msub(half, mscale(1 / rt3, im))];
};
const sqrtPsd2 = P => {
  const tr = P[0][0][0] + P[1][1][0];
  if (Math.abs(tr) < 1e-12 && frobenius(P) < 1e-12) return zero(2, 2);
  const det = Math.max(0, P[0][0][0] * P[1][1][0] - (P[0][1][0] ** 2 + P[0][1][1] ** 2));
  const sd = Math.sqrt(det), denom = Math.sqrt(Math.max(0, tr + 2 * sd));
  if (denom < 1e-12) return zero(2, 2);
  return mscale(1 / denom, madd(P, mscale(sd, identity(2))));
};
const build = ell => {
  const C = cycle(ell), P = povm(C), B = P.map(sqrtPsd2);
  const Vchar = B.flat(); // three 2x2 blocks, hence 6x2
  const Fourier6 = kron(F, identity(2));
  const Vorbit = mm(Fourier6, Vchar);
  const W = [0, 1, 2].map(j => Vorbit.slice(2 * j, 2 * j + 2));
  const common = W.reduce((S, X) => madd(S, X), zero(2, 2));
  const charU6 = blockDiagonal([mscale(1, identity(2)), mscale(1, identity(2)).map(row => row.map(x => mul(zeta, x))), mscale(1, identity(2)).map(row => row.map(x => mul(zeta2, x)))]);
  return {
    ell, C, P, B, Vchar, Vorbit, W, common,
    defects: {
      characterCompression: maxDefect(mm(mm(dagger(Vchar), charU6), Vchar), C),
      orbitCompression: maxDefect(mm(mm(dagger(Vorbit), shift6), Vorbit), C),
      characterIsometry: maxDefect(mm(dagger(Vchar), Vchar), identity(2)),
      orbitIsometry: maxDefect(mm(dagger(Vorbit), Vorbit), identity(2)),
    },
    commonModeCouplingNorm: frobenius(common),
    trivialCharacterFactorNorm: frobenius(B[0]),
  };
};

const lossless = build(0), lossy = build(0.05);
assert.ok(Object.values(lossless.defects).every(x => x < 1e-10));
assert.ok(Object.values(lossy.defects).every(x => x < 1e-10));
assert.ok(lossless.commonModeCouplingNorm < 1e-9 && lossless.trivialCharacterFactorNorm < 1e-9);
assert.ok(lossy.commonModeCouplingNorm > 0.1 && lossy.trivialCharacterFactorNorm > 0.1);
assert.ok(Math.abs(lossy.commonModeCouplingNorm - rt3 * lossy.trivialCharacterFactorNorm) < 1e-10);

console.log(JSON.stringify({
  protocol: 'three-label-boundary-network-orbit-character/1',
  propagation: { orbitBasis: 'nearest-neighbor cyclic shift on three labels tensor I2', characterBasis: 'diag(1,zeta,zeta^2) tensor I2', order: 3 },
  lossless: { defects: lossless.defects, commonModeCouplingNorm: lossless.commonModeCouplingNorm, trivialCharacterFactorNorm: lossless.trivialCharacterFactorNorm },
  equalLoss005: { defects: lossy.defects, commonModeCouplingNorm: lossy.commonModeCouplingNorm, trivialCharacterFactorNorm: lossy.trivialCharacterFactorNorm },
  exactIdentity: 'sum_j W_j = sqrt(3) B_0',
  interpretation: 'The same six-port dilation is orbit-local after inverse DFT and character-diagonal before it. Loss is exactly nonzero coupling to the common/trivial label mode.',
  limitation: 'The coupling factors B_k are reconstructed from the response POVM; they are not yet derived from a Furey or mediator boundary Lagrangian.',
  passed: true,
}, null, 2));
