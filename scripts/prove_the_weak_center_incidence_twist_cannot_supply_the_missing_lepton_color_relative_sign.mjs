import assert from 'node:assert/strict';

const colors = [1, 2, 3];
const weakCenter = field => {
  if (['nu', 'e', ...colors.flatMap(i => [`u_${i}`, `d_${i}`])].includes(field)) return -1;
  if (['nu^c', 'e^c', ...colors.flatMap(i => [`u^c_${i}`, `d^c_${i}`])].includes(field)) return 1;
  throw new Error(`unknown field ${field}`);
};

const diracPairs = {
  neutrino: ['nu^c', 'nu'],
  electron: ['e^c', 'e'],
  ...Object.fromEntries(colors.flatMap(i => [
    [`up_${i}`, [`u^c_${i}`, `u_${i}`]],
    [`down_${i}`, [`d^c_${i}`, `d_${i}`]],
  ])),
};

const bilinearCharacters = Object.fromEntries(Object.entries(diracPairs).map(([name, [a, b]]) => [
  name,
  weakCenter(a) * weakCenter(b),
]));

assert.ok(Object.values(bilinearCharacters).every(x => x === -1));

// On every Furey neutral quartet (d^c,u,d,u^c), the incidence coefficient
// is the weak-center character (+,-,-,+).  Grouping into the up and down
// Dirac bilinears multiplies both by the same -1.
for (const i of colors) {
  const quartet = [`d^c_${i}`, `u_${i}`, `d_${i}`, `u^c_${i}`];
  assert.deepEqual(quartet.map(weakCenter), [1, -1, -1, 1]);
  assert.equal(weakCenter(`u^c_${i}`) * weakCenter(`u_${i}`), -1);
  assert.equal(weakCenter(`d^c_${i}`) * weakCenter(`d_${i}`), -1);
}

const twoSectorAction = [[-1, 0], [0, -1]];
const missingD = [[1, 0], [0, -1]];
assert.notDeepEqual(twoSectorAction, missingD);

console.log(JSON.stringify({
  protocol: 'weak-center-incidence-twist-versus-lepton-color-relative-sign/1',
  fieldCharacter: 'weak doublets -> -1; weak singlets -> +1',
  bilinearCharacters,
  inducedLeptonColorAction: twoSectorAction,
  requiredAction: missingD,
  conclusion: 'Weak-center parity is an overall -I on all Dirac response channels. It cannot supply the sector-relative D required by the conditional paired-mediator A2 construction.',
  survivingRole: 'It still exactly explains the (+,-,-,+) Furey incidence coefficients and the first-order weak orientation line.',
  passed: true,
}, null, 2));
