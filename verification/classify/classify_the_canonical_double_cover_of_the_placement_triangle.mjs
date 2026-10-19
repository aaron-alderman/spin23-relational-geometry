import assert from 'node:assert/strict';

const vertices = [];
for (let i = 0; i < 3; i++) for (let s = 0; s < 2; s++) vertices.push([i, s]);
const key = ([i, s]) => `${i},${s}`;
const T = ([i, s]) => [(i + 1) % 3, s ^ 1];
const deck = ([i, s]) => [i, s ^ 1];
const applyN = (f, x, n) => { let y = x; for (let k = 0; k < n; k++) y = f(y); return y; };

for (const v of vertices) {
  assert.deepEqual(applyN(T, v, 3), deck(v));
  assert.deepEqual(applyN(T, v, 6), v);
}
const orbit = [];
let v = [0, 0];
do { orbit.push(v); v = T(v); } while (key(v) !== '0,0');
assert.equal(orbit.length, 6);
assert.equal(new Set(orbit.map(key)).size, 6);

// Voltage classification of all C2 double covers of the triangle.
const voltages = [];
for (let mask = 0; mask < 8; mask++) {
  const a = [0, 1, 2].map((i) => (mask >> i) & 1);
  const flux = a.reduce((x, y) => x ^ y, 0);
  voltages.push({ a, flux, connected: flux === 1 });
}
assert.equal(voltages.filter((x) => x.connected).length, 4);
assert.equal(voltages.filter((x) => !x.connected).length, 4);

// Every odd-flux voltage is gauge equivalent to the all-flip representative.
const canonical = [1, 1, 1];
const gaugeEquivalent = (a, target) => {
  for (let mask = 0; mask < 8; mask++) {
    const b = [0, 1, 2].map((i) => (mask >> i) & 1);
    const transformed = a.map((x, i) => x ^ b[i] ^ b[(i + 1) % 3]);
    if (transformed.every((x, i) => x === target[i])) return b;
  }
  return null;
};
for (const x of voltages.filter((x) => x.connected)) assert.ok(gaugeEquivalent(x.a, canonical));
for (const x of voltages.filter((x) => !x.connected)) assert.equal(gaugeEquivalent(x.a, canonical), null);

// Sheet parity cancels every lifted coherent edge.
for (const [i, s] of vertices) {
  const [, nextS] = T([i, s]);
  assert.equal((1 + s + nextS) % 2, 0);
}

// Permutation spectrum of the six-cycle: sixth roots, with deck=T^3 parity.
const spectrum = Array.from({ length: 6 }, (_, k) => ({
  k,
  eigenphase: `${k}*pi/3`,
  deckEigenvalue: k % 2 === 0 ? 1 : -1,
}));

console.log(JSON.stringify({
  protocol: 'canonical-double-cover-of-placement-triangle/1',
  liftedCycle: '(i,s) -> (i+1,s+1)',
  orbit,
  relations: { T3: 'deck transformation', T6: 'identity', deck2: 'identity' },
  quotient: 'identify (i,0)~(i,1) to recover the three-placement cycle',
  voltageClassification: { total: voltages.length, connectedOddFlux: 4, disconnectedEvenFlux: 4, allOddFluxCoversGaugeEquivalent: true },
  edgeCancellation: 'sheet parity s cancels 1+s+s_next on every lifted edge',
  spectrum,
  theorem: 'The nonzero-flux C2 cover of the placement triangle is unique up to gauge and is the six-cycle. Three placement steps enact the sheet deck transformation; six steps close.',
  typing: 'The sheet is naturally sideband/orientation data. Particle-antiparticle or generation interpretations require additional gauge-equivariance and state-counting evidence.',
  passed: true,
}, null, 2));
