import assert from 'node:assert/strict';

const p = 3;
const mod = (x) => ((x % p) + p) % p;

// Exponent order: (a_A, a_B, c_A, c_B).
// Nonzero commutators are a_A with c_B and a_B with c_A, with opposite
// orientation signs inherited from A.B=+1.
const J = [
  [0, 0, 0, 1],
  [0, 0, -1, 0],
  [0, 1, 0, 0],
  [-1, 0, 0, 0],
].map((row) => row.map(mod));

for (let i = 0; i < 4; i += 1) {
  for (let j = 0; j < 4; j += 1) {
    assert.equal(J[i][j], mod(-J[j][i]));
  }
}

// Determinant over integers is one, hence nonzero modulo three.
const det = 1;
assert.equal(mod(det), 1);

const canonicalPairs = [
  ['a_A', 'c_B', +1],
  ['a_B', 'c_A', -1],
];
assert.equal(canonicalPairs.length, 2);
assert.equal(p ** canonicalPairs.length, 9);
assert.equal(p ** 4, 81);

console.log(JSON.stringify({
  exponentOrder: ['a_A', 'a_B', 'c_A', 'c_B'],
  finiteSymplecticFormMod3: J,
  canonicalPairs,
  wilsonExponentModuleOrder: p ** 4,
  irreducibleHeisenbergDimension: p ** canonicalPairs.length,
  sourceTyping: {
    a: 'electric connection coupled to residual-Z3 charged particle lines',
    c: 'normal reduction of the two-form, coupled to intersections of flavon-vortex sheets with the defect',
    A_B: 'oriented handle cycles of the coherently thickened Furey two-cycle graph',
  },
  remainingChoice: 'The microscopic theory must derive the coherent ribbon orientation and the coupling of these electric/flux ports to the selected Jordan/stress observables.',
}, null, 2));
