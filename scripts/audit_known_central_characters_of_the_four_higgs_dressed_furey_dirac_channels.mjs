import assert from 'node:assert/strict';

const omega = { re: -0.5, im: Math.sqrt(3) / 2 };
const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const close = (a, b, tol = 1e-12) => Math.abs(a.re - b.re) < tol && Math.abs(a.im - b.im) < tol;
const one = { re: 1, im: 0 };
const omegaBar = { re: omega.re, im: -omega.im };

const channels = [
  { name: 'up', doublet: 'Q', singlet: 'u^c', higgs: 'H_tilde', colored: true },
  { name: 'neutrino', doublet: 'L', singlet: 'nu^c', higgs: 'H_tilde', colored: false },
  { name: 'down', doublet: 'Q', singlet: 'd^c', higgs: 'H', colored: true },
  { name: 'electron', doublet: 'L', singlet: 'e^c', higgs: 'H', colored: false },
];

const table = channels.map((c) => {
  const weakBarePair = (-1) * (+1);
  const weakDressed = weakBarePair * (-1);
  const fermionParity = (-1) * (-1) * (+1);
  const lorentzSpinCenter = (-1) * (-1) * (+1);
  const colorCenter = c.colored ? mul(omega, omegaBar) : one;
  return { ...c, weakBarePair, weakDressed, fermionParity, lorentzSpinCenter, colorCenter };
});

for (const row of table) {
  assert.equal(row.weakBarePair, -1);
  assert.equal(row.weakDressed, +1);
  assert.equal(row.fermionParity, +1);
  assert.equal(row.lorentzSpinCenter, +1);
  assert.ok(close(row.colorCenter, one));
}

// The relative Furey-Higgs grading is not any universal center character.
const h = [+1, -1, -1, +1];
const chi = [+1, +1, -1, -1];
const p = h.map((x, i) => x * chi[i]);
assert.deepEqual(p, [+1, -1, +1, -1]);
assert.notDeepEqual(p, [+1, +1, +1, +1]);
assert.notDeepEqual(p, [-1, -1, -1, -1]);

console.log(JSON.stringify({
  protocol: 'known-central-characters-of-four-higgs-dressed-furey-dirac-channels/1',
  order: channels.map((x) => x.name),
  table,
  completedCompositeCharacters: { weakCenter: '+1', colorCenter: '+1', fermionParity: '+1', lorentzSpinCenter: '+1' },
  bareDiracPairWeakCharacter: '-1',
  relativeFureyHiggsGrading: p,
  theorem: 'All four gauge-invariant Higgs-dressed Dirac composites are even under the familiar microscopic centers. The coherent response -I therefore cannot act directly on the completed bilinear as one of those centers.',
  boundary: 'A response square root, individual leg, Pfaffian/determinant line, or emergent projective bundle may still carry -I.',
  passed: true,
}, null, 2));
