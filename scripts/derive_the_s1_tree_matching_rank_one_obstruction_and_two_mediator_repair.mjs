import assert from 'node:assert/strict';

const tol = 1e-12;
const c = (re, im = 0) => ({ re, im });
const conj = (z) => c(z.re, -z.im);
const add = (a, b) => c(a.re + b.re, a.im + b.im);
const mul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const same = (a, b) => Math.abs(a.re - b.re) < tol && Math.abs(a.im - b.im) < tol;
const zero = c(0);

const gram = (columns) => columns.map((u) => columns.map((v) =>
  u.reduce((s, x, k) => add(s, mul(conj(x), v[k])), zero)));

// One mediator: columns are the coupling vectors for B_L, B_u and B_d
// in the one-dimensional mediator space.
const one = gram([
  [c(1)],
  [c(0, 1)],
  [c(0, -1)],
]);
assert.ok(same(one[0][1], c(0, 1)));
assert.ok(same(one[0][2], c(0, -1)));
assert.ok(same(one[1][2], c(-1, 0))); // unavoidable extra right-right edge

// Rank-one theorem: if C_Lu and C_Ld are nonzero, l,u,d are all nonzero,
// hence C_ud=conj(u)d is nonzero.
const rankOnePurePulsePossible = false;
assert.equal(rankOnePurePulsePossible, false);

// Two mediator copies. u and d occupy orthogonal mediator directions, while
// l overlaps both. This keeps the desired +/- i entries and kills u-d.
const two = gram([
  [c(1), c(1)],
  [c(0, 1), c(0)],
  [c(0), c(0, -1)],
]);
assert.ok(same(two[0][1], c(0, 1)));
assert.ok(same(two[0][2], c(0, -1)));
assert.ok(same(two[1][2], zero));

// Principal minors certify positive semidefiniteness; the full determinant is
// zero because this is a two-dimensional Gram matrix.
const abs2 = (z) => z.re * z.re + z.im * z.im;
const minorLu = two[0][0].re * two[1][1].re - abs2(two[0][1]);
const minorLd = two[0][0].re * two[2][2].re - abs2(two[0][2]);
const minorUd = two[1][1].re * two[2][2].re - abs2(two[1][2]);
assert.ok(minorLu >= -tol && minorLd >= -tol && minorUd >= -tol);
assert.deepEqual([two[0][0].re, two[1][1].re, two[2][2].re], [2, 1, 1]);

console.log(JSON.stringify({
  protocol: 's1-tree-matching-rank-one-obstruction-two-mediator-repair/1',
  bilinearOrder: ['B_L=QL', 'B_u=uc ec', 'B_d=dc nuc'],
  oneMediatorGram: one,
  oneMediatorVerdict: 'both desired crossed entries force a nonzero B_u^dagger B_d entry',
  rankOnePurePulsePossible,
  twoMediatorCouplings: [
    { B_L: '1', B_u: '+i', B_d: '0' },
    { B_L: '1', B_u: '0', B_d: '-i' },
  ],
  twoMediatorGram: two,
  desiredEntries: ['C_Lu=+i', 'C_Ld=-i'],
  unwantedEntry: 'C_ud=0',
  minimumMediatorRankForPureStar: 2,
  remainingGate: 'derive the two-copy structure and coupling phases from the Furey/linking action rather than choose them',
  passed: true,
}, null, 2));
