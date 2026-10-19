import assert from 'node:assert/strict';

// Root labels use the cyclic order g+ -> g0 -> g- -> g+.
const roots = ['g_plus(up/neutrino)', 'g_zero(pure-lepton coherent sum)', 'g_minus(down/electron)'];
const handles = ['O0(base neutrino/active handle)', 'O1=R O0 R^-1', 'O2=R^2 O0 R^-2'];

// Every abstract frame isometry is one dihedral map p(i)=s*i+k mod 3.
const mod3 = n => ((n % 3) + 3) % 3;
const alignments = [];
for (const orientation of [1, -1]) for (let offset = 0; offset < 3; offset++) {
  const permutation = [0, 1, 2].map(i => mod3(orientation * i + offset));
  alignments.push({ orientation, offset, permutation, map: roots.map((r, i) => `${r} -> ${handles[permutation[i]]}`) });
}
assert.equal(new Set(alignments.map(a => a.permutation.join(','))).size, 6);

// Anchor 1: the pure-lepton coherent root maps to the base handle whose
// neutral leg is the neutrino complement. This leaves two orientations.
const leptonAnchored = alignments.filter(a => a.permutation[1] === 0);
assert.equal(leptonAnchored.length, 2);

// Anchor 2: the weak/Pfaffian orientation chooses the root cycle
// g+ -> g0 -> g-, i.e. orientation-preserving label transport.
const fullyAnchored = leptonAnchored.filter(a => a.orientation === 1);
assert.equal(fullyAnchored.length, 1);
assert.deepEqual(fullyAnchored[0].permutation, [2, 0, 1]);

// Reversing the weak orientation gives the only alternative after the
// lepton anchor and exchanges up/down assignments.
const reversed = leptonAnchored.find(a => a.orientation === -1);
assert.deepEqual(reversed.permutation, [1, 0, 2]);

console.log(JSON.stringify({
  protocol: 'dihedral-three-frame-alignment-classification/1',
  totalAbstractAlignments: alignments.length,
  alignmentGroup: 'D3: three cyclic offsets times two orientations',
  anchor1: {
    statement: 'map the pure-lepton coherent root g0 to the base handle O0 attached to the neutrino complement',
    survivors: leptonAnchored.length,
  },
  anchor2: {
    statement: 'preserve the weak/Pfaffian order g+ -> g0 -> g-',
    survivors: fullyAnchored.length,
  },
  selectedMap: fullyAnchored[0].map,
  orientationReversedAlternative: reversed.map,
  consequence: 'No continuous or Kraus-rotation ambiguity remains. A neutrino/lepton anchor and one weak orientation bit uniquely align the mediator, multiplicity, and handle frames.',
  qualification: 'The theorem classifies the needed data. It remains to derive that the physical base handle is the neutrino-anchored O0 and that the microscopic weak/Pfaffian sewing chooses the stated orientation.',
  passed: true,
}, null, 2));
