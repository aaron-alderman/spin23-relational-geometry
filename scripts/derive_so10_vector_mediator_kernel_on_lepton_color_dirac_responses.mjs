import assert from 'node:assert/strict';

const range = n => Array.from({ length: n }, (_, i) => i);
const key = v => v.join(',');
const add = (a, b) => a.map((x, i) => x + b[i]);
const approx = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

const labelOccupation = occupied => {
  if (occupied.length === 0) return 'nu^c';
  if (occupied.length === 2 && occupied[0] <= 3 && occupied[1] >= 4)
    return `${occupied[1] === 5 ? 'u' : 'd'}_${occupied[0]}`;
  if (occupied.length === 2 && occupied.every(i => i <= 3))
    return `u^c_${[1, 2, 3].find(i => !occupied.includes(i))}`;
  if (occupied.join('') === '45') return 'e^c';
  if (occupied.length === 4) {
    const missing = [1, 2, 3, 4, 5].find(i => !occupied.includes(i));
    if (missing <= 3) return `d^c_${missing}`;
    return missing === 4 ? 'nu' : 'e';
  }
  throw new Error(`unlabelled occupation ${occupied}`);
};

const states = [];
for (let mask = 0; mask < 32; mask++) {
  const occupied = range(5).filter(i => (mask >> i) & 1).map(i => i + 1);
  if (occupied.length % 2 === 0) states.push({
    field: labelOccupation(occupied),
    q: range(5).map(i => occupied.includes(i + 1) ? -1 : 1),
  });
}

const isVectorWeight = v => v.filter(x => Math.abs(x) === 2).length === 1
  && v.filter(x => x === 0).length === 4;
const vectorLabel = v => {
  const i = v.findIndex(x => x !== 0);
  return `${v[i] > 0 ? '+' : '-'}2e${i + 1}`;
};

const channels = new Map();
for (let i = 0; i < states.length; i++) for (let j = i + 1; j < states.length; j++) {
  const weight = add(states[i].q, states[j].q);
  if (!isVectorWeight(weight)) continue;
  const label = vectorLabel(weight);
  if (!channels.has(label)) channels.set(label, []);
  channels.get(label).push([states[i].field, states[j].field]);
}

assert.equal([...channels.values()].reduce((n, pairs) => n + pairs.length, 0), 40);
for (const pairs of channels.values()) assert.equal(pairs.length, 4);

const canonicalPair = pair => pair.slice().sort().join('|');
const pairSet = label => new Set(channels.get(label).map(canonicalPair));
assert.deepEqual(pairSet('+2e4'), new Set([
  canonicalPair(['nu^c', 'nu']),
  ...range(3).map(i => canonicalPair([`u^c_${i + 1}`, `u_${i + 1}`])),
]));
assert.deepEqual(pairSet('-2e4'), new Set([
  canonicalPair(['e^c', 'e']),
  ...range(3).map(i => canonicalPair([`d^c_${i + 1}`, `d_${i + 1}`])),
]));

// A single neutral vector-10 component therefore couples to one lepton
// bilinear and three color components.  On the raw color sum Q=sum_i Q_i,
// its two-channel coupling vector is (1,1).  On the unit Hilbert vector
// q=Q/sqrt(3), it becomes (1,sqrt(3)).
const outer = g => g.map(x => g.map(y => x * y));
const normalize = g => {
  const n = Math.hypot(...g);
  return g.map(x => x / n);
};
const householder = g => {
  const u = normalize(g);
  return range(2).map(i => range(2).map(j => (i === j ? 1 : 0) - 2 * u[i] * u[j]));
};
const X = [[0, 1], [1, 0]];
const minusX = X.map(row => row.map(x => -x));
const rawG = [1, 1];
const canonicalG = [1, Math.sqrt(3)];
const rawReflection = householder(rawG);
const canonicalReflection = householder(canonicalG);

for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++)
  assert.ok(approx(rawReflection[i][j], minusX[i][j]));
assert.ok(approx(canonicalReflection[0][0], 1 / 2));
assert.ok(approx(canonicalReflection[0][1], -Math.sqrt(3) / 2));
assert.ok(approx(canonicalReflection[1][0], -Math.sqrt(3) / 2));
assert.ok(approx(canonicalReflection[1][1], -1 / 2));

// The Schur/Feshbach correction is rank one and necessarily has a nonzero
// off-diagonal entry whenever both SO(10)-related couplings are nonzero.
const rawKernel = outer(rawG);
const canonicalKernel = outer(canonicalG);
assert.equal(rawKernel[0][1], 1);
assert.ok(approx(canonicalKernel[0][1], Math.sqrt(3)));

// More generally I-2P_g has zero diagonal, and hence is +/- the exchange,
// exactly when the two canonically normalized coupling magnitudes agree.
for (const r of [0.25, 0.5, 1, 2, 4]) {
  const H = householder([1, r]);
  const isExchange = approx(H[0][0], 0) && approx(H[1][1], 0);
  assert.equal(isExchange, r === 1);
}

console.log(JSON.stringify({
  protocol: 'so10-vector-mediator-lepton-color-response-kernel/1',
  totalSpinorPairsLandingInVector10: 40,
  pairsPerSignedVectorWeight: 4,
  neutralUpChannel: channels.get('+2e4'),
  neutralDownChannel: channels.get('-2e4'),
  rawIntegralCoordinates: {
    coupling: rawG,
    schurKernel: rawKernel,
    piPulse: rawReflection,
    relationToHandle: '-H; a common phase pulse converts it to H',
  },
  orthonormalLeptonColorCoordinates: {
    coupling: canonicalG,
    schurKernel: canonicalKernel,
    piPulse: canonicalReflection,
    relationToHandle: 'nontrivial Householder mixing, but not the exchange H',
  },
  exactHandleCriterion: '|g_lepton|=|g_color| in the physical canonical response metric, plus a protected pi relative phase',
  conclusion: 'The vector 10 forces an allowed nonzero cross kernel, but weight data alone do not fix the physical normalization or pulse area needed for H.',
  passed: true,
}, null, 2));
