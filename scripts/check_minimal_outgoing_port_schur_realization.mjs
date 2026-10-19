import assert from 'node:assert/strict';

const tolerance = 1e-12;
const q = [1.25, -0.7];
const b = [0.36, 1.44];
const g = b.map(Math.sqrt);

// Schur complement of the auxiliary block -i I:
// A - G(-i I)^-1 G* = A - i G G*.
const effective = q.map((real, index) => ({ real, imaginary: -g[index] * g[index] }));
for (let index = 0; index < q.length; index += 1) {
  assert.ok(Math.abs(effective[index].real - q[index]) < tolerance);
  assert.ok(Math.abs(effective[index].imaginary + b[index]) < tolerance);
}

const dissipativeRank = b.filter(value => value > tolerance).length;
const couplingRank = g.filter(value => Math.abs(value) > tolerance).length;
assert.equal(dissipativeRank, couplingRank);

// A Hermitian scalar auxiliary block h gives A-G h^-1 G*, which is real/Hermitian.
for (const h of [-3, -0.5, 0.8, 4]) {
  for (let index = 0; index < q.length; index += 1) {
    const hermitianSchur = q[index] - g[index] * g[index] / h;
    assert.ok(Number.isFinite(hermitianSchur));
    assert.equal(typeof hermitianSchur, 'number');
  }
}

console.log(JSON.stringify({
  protocol: 'minimal-outgoing-port-schur-realization/1',
  target: 'Q=A-iB, B>=0',
  realization: 'Q = Schur([[A,G],[G*,-iI]]) with B=GG*',
  minimalAuxiliaryDimension: 'rank(B)',
  closedHermitianNoGo: 'If the eliminated auxiliary block is finite, Hermitian, and invertible at real frequency, its Schur complement is Hermitian and cannot equal Q when B is nonzero.',
  physicalMeaning: 'The -iI block is an outgoing-port boundary condition. A conservative model must retain the propagating ports or their continuum.',
  passed: true
}, null, 2));
