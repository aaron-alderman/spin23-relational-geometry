import assert from 'node:assert/strict';

const tol = 1e-11;
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((r) => r.map((x) => a * x));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const comm = (A, B) => add(mul(A, B), scale(-1, mul(B, A)));
const kron = (A, B) => A.flatMap((ar) => B.map((br) => ar.flatMap((a) => br.map((b) => a * b))));
const same = (A, B) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const zero = (n) => Array.from({ length: n }, () => Array(n).fill(0));
const I2 = [[1, 0], [0, 1]];
const J = [[0, 1], [-1, 0]];
const X = [[0, 1], [1, 0]];
const Kp = [[1, 0], [0, -1]];
const D = [[1, 0], [0, -1]];
const ep = [[1, 0], [0, 0]];
const em = [[0, 0], [0, 1]];
const Omega = kron(J, I2);

const Kang = kron(J, em);
const Ssq = kron(X, em);
const Hm = kron(Kp, em);
const Hp = kron(Kp, ep);
const Hsplit = kron(Kp, D);

const isSymplecticGenerator = (A) => same(add(mul(tr(A), Omega), mul(Omega, A)), zero(4));
for (const A of [Kang, Ssq, Hm, Hp, Hsplit]) assert.ok(isSymplecticGenerator(A));

assert.ok(same(comm(Hsplit, Kang), scale(-2, Ssq)));
assert.ok(same(comm(Hsplit, Ssq), scale(-2, Kang)));
assert.ok(same(comm(Kang, Ssq), scale(2, Hm)));
assert.ok(same(Hsplit, add(Hp, scale(-1, Hm))));
for (const A of [Kang, Ssq, Hm]) assert.ok(same(comm(Hp, A), zero(4)));

const flatten = (A) => A.flat();
const rank = (vectors) => {
  const M = vectors.map((v) => [...v]);
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c += 1) {
    let pivot = r;
    while (pivot < M.length && Math.abs(M[pivot][c]) < tol) pivot += 1;
    if (pivot === M.length) continue;
    [M[r], M[pivot]] = [M[pivot], M[r]];
    const d = M[r][c];
    M[r] = M[r].map((x) => x / d);
    for (let i = 0; i < M.length; i += 1) {
      if (i === r) continue;
      const f = M[i][c];
      M[i] = M[i].map((x, j) => x - f * M[r][j]);
    }
    r += 1;
  }
  return r;
};
assert.equal(rank([Kang, Ssq, Hm, Hp].map(flatten)), 4);

const s = 0.37;
const expDiagonal = (A, t) => A.map((r, i) => r.map((x, j) => (i === j ? Math.exp(t * x) : 0)));
const G = expDiagonal(Hsplit, s);
const Ginv = expDiagonal(Hsplit, -s);
const conjugated = mul(mul(G, Kang), Ginv);
const expected = add(scale(Math.cosh(2 * s), Kang), scale(-Math.sinh(2 * s), Ssq));
assert.ok(same(conjugated, expected));

const controlledRoot = add(kron(I2, ep), conjugated);
assert.ok(same(mul(controlledRoot, controlledRoot), kron(I2, D)));
assert.ok(same(mul(mul(tr(controlledRoot), Omega), controlledRoot), Omega));
assert.ok(!same(mul(tr(controlledRoot), controlledRoot), kron(I2, I2)));

console.log(JSON.stringify({
  protocol: 'compact-turn-split-dilation-sp4-closure/1',
  generators: {
    compactTurn: 'K=J_phase tensor e_-',
    splitDilation: 'H_D=K_phase tensor D',
    forcedSqueeze: 'S=X_phase tensor e_-',
    negativeFaceCartan: 'H_-=K_phase tensor e_-',
    commutingPositiveFaceDilation: 'H_+=K_phase tensor e_+',
  },
  commutators: ['[H_D,K]=-2S', '[H_D,S]=-2K', '[K,S]=2H_-'],
  closure: 'sl(2,R)_- direct-sum R H_+',
  dimension: 4,
  fullSp4Dimension: 10,
  conjugation: 'exp(s H_D) K exp(-s H_D)=cosh(2s)K-sinh(2s)S',
  squeezedRootStillSquaresToD: true,
  squeezedRootIsPassiveForNonzeroS: false,
  passed: true,
}, null, 2));
