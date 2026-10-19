import assert from 'node:assert/strict';

const tol = 1e-10;
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((r) => r.map((x) => a * x));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const comm = (A, B) => add(mul(A, B), scale(-1, mul(B, A)));
const kron = (A, B) => A.flatMap((ar) => B.map((br) => ar.flatMap((a) => br.map((b) => a * b))));
const same = (A, B) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const flat = (A) => A.flat();
const Z4 = Array.from({ length: 4 }, () => Array(4).fill(0));

const rank = (vectors) => {
  if (vectors.length === 0) return 0;
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

const lieClosure = (seed) => {
  const basis = [...seed];
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < basis.length; i += 1) {
      for (let j = i + 1; j < basis.length; j += 1) {
        const bracket = comm(basis[i], basis[j]);
        if (rank([...basis.map(flat), flat(bracket)]) > basis.length) {
          basis.push(bracket);
          changed = true;
        }
      }
    }
  }
  return basis;
};

const I = [[1, 0], [0, 1]];
const J = [[0, 1], [-1, 0]];
const X = [[0, 1], [1, 0]];
const K = [[1, 0], [0, -1]];
const D = K;
const em = [[0, 0], [0, 1]];
const Omega = kron(J, I);

const turn = kron(J, em);
const splitDilation = kron(K, D);
const channelRotation = kron(I, J);

const phaseHamiltonian = [J, X, K];
const channelSymmetric = [I, X, D];
const canonicalSp4Basis = [
  channelRotation,
  ...phaseHamiltonian.flatMap((P) => channelSymmetric.map((C) => kron(P, C))),
];

assert.equal(canonicalSp4Basis.length, 10);
assert.equal(rank(canonicalSp4Basis.map(flat)), 10);
for (const A of canonicalSp4Basis) {
  assert.ok(same(add(mul(tr(A), Omega), mul(Omega, A)), Z4));
}

const JX = kron(J, X);
const JD = kron(J, D);
const JI = kron(J, I);
const KX = kron(K, X);
const XD = kron(X, D);
const XX = kron(X, X);
const KI = kron(K, I);
const XI = kron(X, I);

assert.ok(same(comm(channelRotation, turn), JX));
assert.ok(same(comm(channelRotation, JX), scale(2, JD)));
assert.ok(same(JI, add(scale(2, turn), JD)));
assert.ok(same(comm(channelRotation, splitDilation), scale(-2, KX)));
assert.ok(same(comm(JI, splitDilation), scale(-2, XD)));
assert.ok(same(comm(JI, KX), scale(-2, XX)));
assert.ok(same(comm(JD, XD), scale(2, KI)));
assert.ok(same(comm(JD, splitDilation), scale(-2, XI)));

const full = lieClosure([turn, splitDilation, channelRotation]);
assert.equal(full.length, 10);
assert.equal(rank([...full, ...canonicalSp4Basis].map(flat)), 10);

const ablations = {
  withoutTurn: lieClosure([splitDilation, channelRotation]).length,
  withoutSplitDilation: lieClosure([turn, channelRotation]).length,
  withoutChannelRotation: lieClosure([turn, splitDilation]).length,
};
assert.deepEqual(ablations, {
  withoutTurn: 3,
  withoutSplitDilation: 4,
  withoutChannelRotation: 4,
});

console.log(JSON.stringify({
  protocol: 'turn-split-dilation-channel-rotation-full-sp4/1',
  seed: [
    'J_phase tensor e_-',
    'K_phase tensor D_channel',
    'I_phase tensor epsilon_channel',
  ],
  canonicalBasis: [
    'I tensor epsilon',
    '{J,X,K}_phase tensor {I,X,D}_channel',
  ],
  generatedDimension: full.length,
  targetDimension: 10,
  closure: 'sp(4,R) isomorphic to so(2,3)',
  ablations,
  physicalGate: 'epsilon is source-native, but its continuous Hamiltonian flow is not yet derived',
  passed: true,
}, null, 2));
