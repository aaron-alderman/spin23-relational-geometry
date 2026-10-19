import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const eq = (A, B) => A.every((r, i) => r.every((x, j) => x === B[i][j]));
const key = (A) => A.flat().join(',');
const I2 = [[1, 0], [0, 1]], I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const Cpl = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
const Fpl = [[1, 0, 0], [0, 0, 1], [0, 1, 0]];
const B = [[1, 0], [-1, 1], [0, -1]];
const A = [[0, -1], [1, -1]];
const F = [[1, 0], [1, -1]];
const Fminus = F;
const Fplus = mm(F, A);

assert.ok(eq(mm(Cpl, B), mm(B, A)));
assert.ok(eq(mm(Fpl, B), mm(B, F)));
assert.ok(eq(Fplus, [[0, -1], [-1, 0]]));
assert.ok(eq(mm(Fminus, Fplus), A));
assert.ok(eq(mm(F, mm(F, A)), A));

// Closure of the placement arrows is the six-element Weyl subgroup.
const group = new Map([[key(I2), I2]]);
let changed = true;
while (changed) {
  changed = false;
  for (const X of [...group.values()]) for (const Y of [A, F]) {
    for (const Z of [mm(X, Y), mm(Y, X)]) if (!group.has(key(Z))) { group.set(key(Z), Z); changed = true; }
  }
}
assert.equal(group.size, 6);
assert.ok([...group.values()].some((M) => eq(M, Fplus)));
assert.ok([...group.values()].some((M) => eq(M, Fminus)));
assert.ok(!group.has(key([[-1, 0], [0, -1]])));

// The full lattice normalizer is the Weyl subgroup plus its central-minus coset.
const fullNormalizer = new Map();
for (const M of group.values()) {
  fullNormalizer.set(key(M), M);
  const minusM = M.map((r) => r.map((x) => -x));
  fullNormalizer.set(key(minusM), minusM);
}
assert.equal(fullNormalizer.size, 12);

console.log(JSON.stringify({
  protocol: 'placement-groupoid-to-integral-mediator-faces/1',
  placementIntertwining: { cycle: 'C_pl B = B A', handle: 'F_pl B = B F' },
  activeArrows: { cycle: A, handle: F, firstMediatorFace: 'F_-=F', secondMediatorFace: 'F_+=F A', orderedPath: 'F_-(F_+)=F(F A)=A' },
  groups: { placementWeylOrder: group.size, fullA2NormalizerOrder: fullNormalizer.size, relation: 'O(A2,Z)=W(A2) disjoint-union (-I)W(A2)' },
  theorem: 'The two integral mediator reflections are exactly the handle arrow and its adjacent cycle translate in the trace-zero three-placement groupoid; their ordered composition is the placement cycle.',
  boundary: 'The representation-level arrows coincide exactly. A physical functor identifying mediator face traversal with placement-groupoid traversal and assigning amplitudes to placements remains unproved.',
  passed: true,
}, null, 2));
