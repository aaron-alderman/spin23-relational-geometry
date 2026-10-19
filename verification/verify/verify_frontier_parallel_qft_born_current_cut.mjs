import assert from 'node:assert/strict';

const pi = Math.PI;

// All fields are physical Dirac fields.  The all-left-handed corpus charge x_{f^c}
// becomes the physical right-handed charge -x_{f^c}.
const species = [
  { name: 'up', colour: 3, lambdaD: [5, -5], lambdaM: [5, -5], bl: [1, 1] },
  { name: 'down', colour: 3, lambdaD: [5, -1], lambdaM: [5, -1], bl: [1, 1] },
  { name: 'charged-lepton', colour: 1, lambdaD: [1, -1], lambdaM: [1, -3], bl: [-3, -3] },
  { name: 'neutrino', colour: 1, lambdaD: [1, 0], lambdaM: [1, 0], bl: [-3, -3] },
];

const va = ([left, right]) => ({
  vector: (left + right) / 2,
  axial: (right - left) / 2,
});

const gram = (keyA, keyB) => species.reduce((sum, f) => {
  const a = f[keyA];
  const b = f[keyB];
  return sum + f.colour * (a[0] * b[0] + a[1] * b[1]);
}, 0);

function beta(s, mass) {
  if (s <= 4 * mass * mass) return 0;
  return Math.sqrt(1 - 4 * mass * mass / s);
}

function bornEntry(s, masses, keyA, keyB) {
  let transverse = 0;
  let longitudinal = 0;
  for (const f of species) {
    const r = masses[f.name] ** 2 / s;
    const b = beta(s, masses[f.name]);
    const a = va(f[keyA]);
    const c = va(f[keyB]);
    transverse += f.colour * (
      a.vector * c.vector * b * (1 + 2 * r)
      + a.axial * c.axial * b ** 3
    ) / (12 * pi ** 2);
    longitudinal += f.colour * a.axial * c.axial
      * masses[f.name] ** 2 * b / (2 * pi ** 2 * s);
  }
  return { transverse, longitudinal };
}

const gd = [
  [gram('lambdaD', 'lambdaD'), gram('lambdaD', 'bl')],
  [gram('lambdaD', 'bl'), gram('bl', 'bl')],
];
const gm = [
  [gram('lambdaM', 'lambdaM'), gram('lambdaM', 'bl')],
  [gram('lambdaM', 'bl'), gram('bl', 'bl')],
];

assert.deepEqual(gd, [[231, 9], [9, 48]]);
assert.deepEqual(gm, [[239, 15], [15, 48]]);

// A very high energy checkpoint verifies the exact massless normalization.
const masses = { up: 1.0, down: 0.5, 'charged-lepton': 0.1, neutrino: 0.001 };
const s = 1e18;
for (const [key, g] of [['lambdaD', gd], ['lambdaM', gm]]) {
  const aa = bornEntry(s, masses, key, key).transverse;
  const ab = bornEntry(s, masses, key, 'bl').transverse;
  const bb = bornEntry(s, masses, 'bl', 'bl').transverse;
  assert.ok(Math.abs(aa - g[0][0] / (24 * pi ** 2)) < 1e-13);
  assert.ok(Math.abs(ab - g[0][1] / (24 * pi ** 2)) < 1e-13);
  assert.ok(Math.abs(bb - g[1][1] / (24 * pi ** 2)) < 1e-13);
}

// Exact B-L conservation in the Dirac branch: no longitudinal cut and no
// mixed longitudinal cut at this order.
assert.equal(bornEntry(100, masses, 'bl', 'bl').longitudinal, 0);
assert.equal(bornEntry(100, masses, 'lambdaD', 'bl').longitudinal, 0);

// Positivity is checked at representative threshold-separated points.
for (const key of ['lambdaD', 'lambdaM']) {
  for (const energy of [0.003, 0.25, 1.1, 3, 10, 100]) {
    const point = energy ** 2;
    const aa = bornEntry(point, masses, key, key).transverse;
    const ab = bornEntry(point, masses, key, 'bl').transverse;
    const bb = bornEntry(point, masses, 'bl', 'bl').transverse;
    assert.ok(aa >= 0 && bb >= 0);
    assert.ok(aa * bb - ab * ab >= -1e-14);
  }
}

const coherence = g => g[0][1] / Math.sqrt(g[0][0] * g[1][1]);
const result = {
  convention: 'one generation; rho=(1/pi) Im Pi; massless Weyl unit=1/(24 pi^2)',
  deduplicated_incidence: {
    gram: gd,
    determinant: gd[0][0] * gd[1][1] - gd[0][1] ** 2,
    uv_signed_coherence: coherence(gd),
    uv_squared_coherence: coherence(gd) ** 2,
  },
  multiplicity_incidence: {
    gram: gm,
    determinant: gm[0][0] * gm[1][1] - gm[0][1] ** 2,
    uv_signed_coherence: coherence(gm),
    uv_squared_coherence: coherence(gm) ** 2,
  },
  verified: [
    'both published Gram matrices',
    'massless-cut normalization',
    'Dirac B-L longitudinal Ward identity',
    'representative threshold positivity',
  ],
};

console.log(JSON.stringify(result, null, 2));
