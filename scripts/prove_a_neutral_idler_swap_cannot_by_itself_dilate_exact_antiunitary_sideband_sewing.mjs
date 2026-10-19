import assert from 'node:assert/strict';

const cadd = ([a, b], [c, d]) => [a + c, b + d];
const cscale = ([a, b], [x, y]) => [a * x - b * y, a * y + b * x];
const conj = ([x, y]) => [x, -y];
const equal = ([a, b], [c, d], eps = 1e-12) => Math.abs(a - c) < eps && Math.abs(b - d) < eps;

// Any unitary-plus-fixed-ancilla amplitude map followed by a linear output
// projection is complex-linear. Conjugation is not: K(i z)=-iK(z).
const z = [0.37, -0.22];
const i = [0, 1];
const Kiz = conj(cscale(i, z));
const iKz = cscale(i, conj(z));
assert.ok(!equal(Kiz, iKz));
assert.ok(equal(Kiz, cscale([0, -1], conj(z))));

// The real-linear embedding E(z)=(z,conj(z)) does permit an ordinary swap,
// but E has already supplied the anti-linear datum. The swap only routes it.
const E = w => [w, conj(w)];
const swap = ([a, b]) => [b, a];
const routed = swap(E(z));
assert.ok(equal(routed[0], conj(z)));
assert.ok(equal(routed[1], z));

// Quantum-channel version: the Choi matrix of transposition on a qubit is
// the swap operator, whose antisymmetric vector has eigenvalue -1.
const F = [
  [1, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 1],
];
const antisymmetric = [0, 1 / Math.sqrt(2), -1 / Math.sqrt(2), 0];
const mv = (A, v) => A.map(row => row.reduce((sum, x, j) => sum + x * v[j], 0));
const dot = (u, v) => u.reduce((sum, x, j) => sum + x * v[j], 0);
assert.ok(Math.abs(dot(antisymmetric, mv(F, antisymmetric)) + 1) < 1e-12);

console.log(JSON.stringify({
  protocol: 'antiunitary-sideband-sewing-dilation-no-go/1',
  amplitudeLinearity: {
    identityRequiredByComplexLinearMaps: 'T(i z) = i T(z)',
    conjugationIdentity: 'K(i z) = -i K(z)',
    verdict: 'no complex-linear unitary with a fixed ancilla and linear output projection equals K on all inputs',
  },
  idlerSwap: {
    embedding: 'E(z) = (z, conjugate(z))',
    result: 'swap(E(z)) = (conjugate(z), z)',
    verdict: 'the swap routes conjugate data but the real-linear embedding already supplied it',
  },
  quantumChannel: {
    map: 'matrix transposition/conjugation',
    choiWitness: 'antisymmetric qubit vector',
    choiEigenvalue: -1,
    verdict: 'not completely positive, hence no exact deterministic unitary dilation with fixed environment',
  },
  consequence: 'Exact XK remains boundary real-structure data. A device can route an externally supplied conjugate port, implement a noisy phase conjugator, or use measurement/feed-forward, but a passive neutral idler swap alone is not a dilation of K.',
  passed: true,
}, null, 2));
