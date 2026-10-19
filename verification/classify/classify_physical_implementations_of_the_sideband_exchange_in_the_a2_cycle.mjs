import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const X = [[0, 1], [1, 0]];
const etaB = [[1, 0], [0, -1]];
const etaF = [[1, 0], [0, 1]];
const neg = A => A.map(row => row.map(x => -x));
const sameMatrix = (A, B, tolerance = 1e-12) =>
  A.length === B.length &&
  A.every((row, i) => row.length === B[i].length && row.every((x, j) => Math.abs(x - B[i][j]) <= tolerance));

assert.ok(sameMatrix(mm(mm(tr(X), etaB), X), neg(etaB)));
assert.deepEqual(mm(mm(tr(X), etaF), X), etaF);

// A one-mode bosonic Bogoliubov transform has |u|^2-|v|^2=1.  Pure
// particle-hole/sideband exchange would set u=0,v=1 and fails it.
const bosonicBogoliubovNorm = (u, v) => u * u - v * v;
const fermionicBogoliubovNorm = (u, v) => u * u + v * v;
assert.equal(bosonicBogoliubovNorm(0, 1), -1);
assert.equal(fermionicBogoliubovNorm(0, 1), 1);

// On two independent annihilation modes, by contrast, X is an ordinary
// unitary/orthogonal beam-splitter swap.
assert.deepEqual(mm(tr(X), X), etaF);

// Charged fermionic particle-hole swap still fails continuous charge
// covariance; neutral/Majorana typing is required.
const rotation = phi => [[Math.cos(phi), -Math.sin(phi)], [Math.sin(phi), Math.cos(phi)]];
const R = rotation(0.37);
assert.notDeepEqual(mm(R, X), mm(X, R));

console.log(JSON.stringify({
  protocol: 'physical-sideband-exchange-classification-for-a2-cycle/1',
  singleBosonicNambuPair: {
    metric: etaB,
    exchangePullback: neg(etaB),
    verdict: 'pure exchange is anti-canonical; no finite stable one-mode bosonic Gaussian unitary realizes it',
  },
  singleFermionicNambuPair: {
    metric: etaF,
    exchangePullback: etaF,
    verdict: 'CAR-canonical, but continuous charge covariance requires a neutral/Majorana mode or broken charge symmetry',
  },
  twoIndependentNeutralModes: {
    exchangeUnitary: true,
    verdict: 'ordinary passive swap is possible, but the second mode is an auxiliary/idler and not the constrained negative sideband itself',
  },
  antiunitaryRealitySewing: {
    map: 'Xi = X K',
    verdict: 'valid as a real-time boundary constraint/monodromy; it is not ordinary forward-time unitary evolution',
  },
  consequenceForA2Cycle: 'Document 904 is directly typed as antiunitary boundary sewing. An enlarged neutral idler can route an already supplied conjugate port, but exact conjugation remains boundary/source real-structure data.',
  passed: true,
}, null, 2));
