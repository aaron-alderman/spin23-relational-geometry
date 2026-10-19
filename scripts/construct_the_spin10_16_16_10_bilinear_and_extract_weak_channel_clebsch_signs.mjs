import assert from 'node:assert/strict';

const range = n => Array.from({ length: n }, (_, i) => i + 1);
const setKey = I => I.join('');
const qOf = I => range(5).map(i => I.includes(i) ? -1 : 1);

const labelOccupation = I => {
  if (I.length === 0) return 'nu^c';
  if (I.length === 2 && I[0] <= 3 && I[1] >= 4) return `${I[1] === 5 ? 'u' : 'd'}_${I[0]}`;
  if (I.length === 2 && I.every(i => i <= 3)) return `u^c_${[1, 2, 3].find(i => !I.includes(i))}`;
  if (setKey(I) === '45') return 'e^c';
  if (I.length === 4) {
    const missing = range(5).find(i => !I.includes(i));
    if (missing <= 3) return `d^c_${missing}`;
    return missing === 4 ? 'nu' : 'e';
  }
  throw new Error(`unlabelled ${I}`);
};

const evenStates = [];
for (let mask = 0; mask < 32; mask++) {
  const I = range(5).filter(i => (mask >> (i - 1)) & 1);
  if (I.length % 2 === 0) evenStates.push({ I, field: labelOccupation(I), q: qOf(I) });
}

// Exterior operations return [coefficient, sorted occupation set].
const wedgeLeft = (i, J) => {
  if (J.includes(i)) return [0, []];
  const sign = (-1) ** J.filter(j => j < i).length;
  return [sign, [...J, i].sort((a, b) => a - b)];
};
const contract = (i, J) => {
  const position = J.indexOf(i);
  if (position < 0) return [0, []];
  return [(-1) ** position, J.filter(j => j !== i)];
};

// Chevalley/Mukai top-form pairing B(e_I,e_K)=[tau(e_I) wedge e_K]_top.
const topPair = (I, K) => {
  if (I.length + K.length !== 5 || I.some(i => K.includes(i))) return 0;
  const reversal = (-1) ** (I.length * (I.length - 1) / 2);
  let inversions = 0;
  for (const i of I) for (const k of K) if (i > k) inversions++;
  return reversal * ((-1) ** inversions);
};

const coefficient = (I, J, signedCoordinate) => {
  const i = Math.abs(signedCoordinate);
  const [cliffordSign, K] = signedCoordinate > 0 ? wedgeLeft(i, J) : contract(i, J);
  return cliffordSign * topPair(I, K);
};

const channels = {};
for (const signedCoordinate of [...range(5), ...range(5).map(i => -i)]) {
  const label = `${signedCoordinate > 0 ? '+' : '-'}2e${Math.abs(signedCoordinate)}`;
  const pairs = [];
  for (let a = 0; a < evenStates.length; a++) for (let b = a + 1; b < evenStates.length; b++) {
    const x = evenStates[a], y = evenStates[b];
    const sum = x.q.map((v, k) => v + y.q[k]);
    const target = range(5).map(k => k === Math.abs(signedCoordinate) ? 2 * Math.sign(signedCoordinate) : 0);
    if (!sum.every((v, k) => v === target[k])) continue;
    const cxy = coefficient(x.I, y.I, signedCoordinate);
    const cyx = coefficient(y.I, x.I, signedCoordinate);
    assert.notEqual(cxy, 0);
    assert.equal(cxy, cyx, `vector bilinear must be symmetric for ${x.field},${y.field}`);
    pairs.push({ fields: [x.field, y.field], coefficient: cxy });
  }
  assert.equal(pairs.length, 4);
  channels[label] = pairs;
}

const byField = label => new Map(channels[label].map(x => [x.fields.slice().sort().join('|'), x.coefficient]));
const plus4 = byField('+2e4');
const minus4 = byField('-2e4');
const pkey = (a, b) => [a, b].sort().join('|');

const plus4Signs = {
  neutrino: plus4.get(pkey('nu^c', 'nu')),
  up: range(3).map(i => plus4.get(pkey(`u^c_${i}`, `u_${i}`))),
};
const minus4Signs = {
  electron: minus4.get(pkey('e^c', 'e')),
  down: range(3).map(i => minus4.get(pkey(`d^c_${i}`, `d_${i}`))),
};

if (plus4Signs.up.some(x => x === undefined) || minus4Signs.down.some(x => x === undefined)) {
  console.error(JSON.stringify({ plus4: channels['+2e4'], minus4: channels['-2e4'], plus4Signs, minus4Signs }, null, 2));
}
assert.ok(plus4Signs.up.every(x => Math.abs(x) === 1));
assert.ok(minus4Signs.down.every(x => Math.abs(x) === 1));

// Under the natural weak-component matching nu<->e and u_i<->d_i, the
// entire -2e4 coefficient vector is the overall negative of +2e4.  Hence
// their projective lepton-versus-color coupling directions are identical.
const weakMatchedRatios = [
  minus4Signs.electron / plus4Signs.neutrino,
  ...minus4Signs.down.map((x, i) => x / plus4Signs.up[i]),
];
assert.deepEqual(weakMatchedRatios, [-1, -1, -1, -1]);

const colorOrientation = plus4Signs.up;
const projectColorCoefficient = coefficients => coefficients.reduce((s, x, i) => s + x * colorOrientation[i], 0) / Math.sqrt(3);
const plusProjective = [plus4Signs.neutrino, projectColorCoefficient(plus4Signs.up)];
const minusProjective = [minus4Signs.electron, projectColorCoefficient(minus4Signs.down)];
assert.ok(plusProjective.every((x, i) => x === -minusProjective[i]));

console.log(JSON.stringify({
  protocol: 'spin10-16x16-to-10-fock-clebsch-signs/1',
  convention: {
    spinor: 'S+ = exterior-even C^5',
    vectorAction: '+e_i is left wedge by e_i; -e_i is contraction by e_i',
    pairing: 'B(alpha,beta) = top-degree part of tau(alpha) wedge beta',
  },
  allChannels: channels,
  neutralWeakChannels: { plus4Signs, minus4Signs },
  weakMatchedRatios,
  commonColorOrientation: colorOrientation,
  canonicallyProjectedDirections: { plusProjective, minusProjective },
  interpretation: 'In one coherent Spin-invariant convention the weak partner channel is an overall negative, so its projective lepton/color direction is unchanged. Individual field rephasings can move entries, but a weak-covariant common rephasing cannot turn this overall sign into the sector-relative sign required for the A2 reflection pair.',
  consequence: 'The minimal 16x16x10 Clebsch map plus ordinary weak orientation gives identical Householder reflections. An additional color-relative local coefficient or nonminimal mediator structure is required for the conditional A2 construction.',
  passed: true,
}, null, 2));
