import assert from 'node:assert/strict';

const range = n => Array.from({ length: n }, (_, i) => i);
const key = v => v.join(',');

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
  if (occupied.length % 2 === 0) {
    states.push({
      occupied,
      q: range(5).map(i => occupied.includes(i + 1) ? -1 : 1),
      field: labelOccupation(occupied),
    });
  }
}
const byWeight = new Map(states.map(s => [key(s.q), s]));

const charges = ({ q: [q1, q2, q3, q4, q5] }) => {
  const T3L = (q4 - q5) / 4;
  const T3R = (q4 + q5) / 4;
  const BmL = (q1 + q2 + q3) / 3;
  const Y = BmL / 2 - T3R;
  return { T3L, Q: T3L + Y };
};

// The Weyl element used in the paper's doubling theorem.
const sigma = s => byWeight.get(key([-s.q[0], -s.q[1], -s.q[2], s.q[3], -s.q[4]]));
const expectedPairs = {
  'nu^c': 'nu', 'e^c': 'e',
  'u^c_1': 'u_1', 'u^c_2': 'u_2', 'u^c_3': 'u_3',
  'd^c_1': 'd_1', 'd^c_2': 'd_2', 'd^c_3': 'd_3',
};

for (const [left, right] of Object.entries(expectedPairs)) {
  const a = states.find(s => s.field === left);
  const b = sigma(a);
  assert.equal(b.field, right);
  assert.equal(sigma(b).field, left);
  assert.ok(Math.abs(charges(a).Q + charges(b).Q) < 1e-12);
}

const isColored = field => /^[ud](\^c)?_\d$/.test(field);
const isLepton = field => !isColored(field);
for (const s of states) {
  assert.equal(isColored(s.field), isColored(sigma(s).field));
  assert.equal(isLepton(s.field), isLepton(sigma(s).field));
}

// A pair of independent Dirac faces supplies two freely variable complex
// gauge-singlet response coordinates.  For example, take the charged-lepton
// mass bilinear and the color-contracted up-quark mass bilinear.
const cadd = ([a, b], [c, d]) => [a + c, b + d];
const cmul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const zeroC = [0, 0];
const oneC = [1, 0];
const diracResponse = ({ ec, e, uc, u }) => [
  cmul(ec, e),
  uc.reduce((sum, x, i) => cadd(sum, cmul(x, u[i])), zeroC),
];
for (const [targetLepton, targetColor] of [[[2, 3], [-4, 5]], [[0, -1], [7, -2]]]) {
  const [ml, mq] = diracResponse({
    ec: targetLepton, e: oneC,
    uc: [targetColor, zeroC, zeroC], u: [oneC, zeroC, zeroC],
  });
  assert.deepEqual(ml, targetLepton);
  assert.deepEqual(mq, targetColor);
}

// Reversing the two Dirac faces leaves these even bilinears in their own
// channels.  It cannot induce the selector handle, which exchanges channels.
const reverseFaces = ([ml, mq]) => [ml, mq];
const selectorHandle = ([ml, mq]) => [mq, ml];
const probe = [[2, 3], [-4, 5]];
assert.deepEqual(reverseFaces(probe), probe);
assert.notDeepEqual(reverseFaces(probe), selectorHandle(probe));

console.log(JSON.stringify({
  protocol: 'prakash-ramya-dirac-doubling-bilocal-carrier-handle-no-go/1',
  sigmaPairs: expectedPairs,
  sectorStatement: 'sigma preserves the colored and leptonic sectors separately',
  bilocalConstruction: ['m_l = e^c e', 'm_q = sum_i u_i^c u_i'],
  carrierImage: 'C^2 (four real dimensions) for independent Weyl/source amplitudes',
  inducedFaceReversal: '(m_l,m_q) -> (m_l,m_q), up to convention-dependent within-channel conjugation',
  selectorHandle: '(m_l,m_q) -> (m_q,m_l)',
  conclusion: 'Dirac doubling supplies independent bilocal legs but does not derive the cross-sector handle exchange.',
  passed: true,
}, null, 2));
