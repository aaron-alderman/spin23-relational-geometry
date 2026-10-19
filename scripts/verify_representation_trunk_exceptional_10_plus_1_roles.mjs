import assert from 'node:assert/strict';

const branch27 = [
  { rep: '16', charge: 1, dimension: 16, role: 'Peirce-1/2 tangent/matter candidate' },
  { rep: '10', charge: -2, dimension: 10, role: 'Peirce-0 vector/Higgs-plus-colored candidate' },
  { rep: '1', charge: 4, dimension: 1, role: 'Peirce-1 selected line/radial-vacuum candidate' },
];
assert.equal(branch27.reduce((n, x) => n + x.dimension, 0), 27);

const triples = [];
for (let i = 0; i < branch27.length; i += 1) for (let j = i; j < branch27.length; j += 1) for (let k = j; k < branch27.length; k += 1) {
  const t = [branch27[i], branch27[j], branch27[k]];
  if (t.reduce((q, x) => q + x.charge, 0) === 0) triples.push(t.map((x) => x.rep).join('-'));
}
assert.deepEqual(triples.sort(), ['10-10-1', '16-16-10'].sort());

// Standard-Model decomposition of the Spin(10) vector 10.
const tenSM = [
  { rep: '(3,1)_{-1/3}', dimension: 3, y: -1 / 3 },
  { rep: '(bar3,1)_{1/3}', dimension: 3, y: 1 / 3 },
  { rep: '(1,2)_{1/2}', dimension: 2, y: 1 / 2 },
  { rep: '(1,2)_{-1/2}', dimension: 2, y: -1 / 2 },
];
assert.equal(tenSM.reduce((n, x) => n + x.dimension, 0), 10);
assert(Math.abs(tenSM.reduce((n, x) => n + x.dimension * x.y, 0)) < 1e-12);
assert.equal(tenSM.filter((x) => x.rep.includes('(1,2)')).reduce((n, x) => n + x.dimension, 0), 4);
assert.equal(tenSM.filter((x) => x.rep.includes('3,1')).reduce((n, x) => n + x.dimension, 0), 6);

// Conjugation maps the charged E6 branching into bar27, not back into 27.
const bar27 = branch27.map((x) => ({
  rep: x.rep === '16' ? 'bar16' : x.rep,
  charge: -x.charge,
  dimension: x.dimension,
}));
assert(bar27.some((x) => x.rep === 'bar16' && x.charge === -1));
assert(!branch27.some((x) => x.rep === 'bar16'));
assert.equal(branch27.reduce((n, x) => n + x.dimension, 0) + bar27.reduce((n, x) => n + x.dimension, 0), 54);

console.log(JSON.stringify({
  protocol: 'representation-trunk/exceptional-10-plus-1-roles/1',
  branching: '27=16_1+10_-2+1_4',
  cubicChannels: triples,
  tenUnderSM: tenSM.map((x) => x.rep),
  tenInterpretation: {
    electroweakDoubletDirections: 4,
    coloredDirections: 6,
    verdict: 'Higgs-compatible but not a Higgs-only multiplet',
  },
  singletInterpretation: 'the selected Peirce-1 line; a vacuum/radial candidate, not automatically a propagating observed scalar',
  conditionalMassLogic: 'a singlet expectation can enter the 1*10*10 cubic; a 16*16 term still requires a 10 direction',
  conjugation: {
    closedInside27: false,
    conjugateBranching: 'bar27=bar16_-1+10_2+1_-4',
    minimalObviousLinearClosure: '27+bar27, complex dimension 54',
  },
  statisticsBoundary: 'one linear E6 27 cannot be an ordinary internal multiplet mixing fermionic 16 fields with bosonic 10+1 fields; the tangent/geometric reading keeps representation geometry distinct from field statistics',
  passed: true,
}, null, 2));
