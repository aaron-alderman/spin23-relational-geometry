import assert from 'node:assert/strict';

const fields = [
  { name: 'Q', color: '3', weak: 2, y6: 1, B3: 1, L: 0 },
  { name: 'u^c', color: 'bar3', weak: 1, y6: -4, B3: -1, L: 0 },
  { name: 'd^c', color: 'bar3', weak: 1, y6: 2, B3: -1, L: 0 },
  { name: 'L', color: '1', weak: 2, y6: -3, B3: 0, L: 1 },
  { name: 'e^c', color: '1', weak: 1, y6: 6, B3: 0, L: -1 },
  { name: 'nu^c', color: '1', weak: 1, y6: 0, B3: 0, L: -1 },
];

const colorProducts = (a, b) => {
  const key = [a, b].sort().join('*');
  if (key === '1*1') return ['1'];
  if (key === '1*3') return ['3'];
  if (key === '1*bar3') return ['bar3'];
  if (key === '3*3') return ['bar3', '6'];
  if (key === 'bar3*bar3') return ['3', 'bar6'];
  if (key === '3*bar3') return ['1', '8'];
  throw new Error(`unhandled color product ${key}`);
};
const weakProducts = (a, b) => {
  if (a === 1) return [b];
  if (b === 1) return [a];
  if (a === 2 && b === 2) return [1, 3];
  throw new Error(`unhandled weak product ${a}x${b}`);
};

const bilinears = [];
for (let i = 0; i < fields.length; i++) for (let j = i; j < fields.length; j++) {
  const a = fields[i], b = fields[j];
  for (const color of colorProducts(a.color, b.color)) for (const weak of weakProducts(a.weak, b.weak)) {
    bilinears.push({
      fields: [a.name, b.name], color, weak,
      y6: a.y6 + b.y6,
      B3: a.B3 + b.B3,
      L: a.L + b.L,
    });
  }
}

const doublets = bilinears.filter(x => x.color === '3' && x.weak === 2 && x.y6 === 1);
const singlets = bilinears.filter(x => x.color === '3' && x.weak === 1 && x.y6 === -2);
assert.deepEqual(doublets.map(x => x.fields), [['Q', 'nu^c']]);
assert.deepEqual(singlets.map(x => x.fields), [['Q', 'L'], ['u^c', 'd^c']]);

const qnu = doublets[0];
const ql = singlets.find(x => x.fields.join(',') === 'Q,L');
const ud = singlets.find(x => x.fields.join(',') === 'u^c,d^c');
const determinantLedger = singlet => ({
  y6: 2 * qnu.y6 + singlet.y6,
  B3: 2 * qnu.B3 + singlet.B3,
  L: 2 * qnu.L + singlet.L,
  fermions: 6,
  dimension: 6 * 3 / 2,
});
const routeA = determinantLedger(ql);
const routeB = determinantLedger(ud);
assert.deepEqual(routeA, { y6: 0, B3: 3, L: -1, fermions: 6, dimension: 9 });
assert.deepEqual(routeB, { y6: 0, B3: 0, L: -2, fermions: 6, dimension: 9 });
assert.equal(4 - routeB.dimension, -5);

// Removing nu^c closes the unique doublet route.
const minimalNames = new Set(['Q', 'u^c', 'd^c', 'L', 'e^c']);
assert.equal(doublets.filter(x => x.fields.every(name => minimalNames.has(name))).length, 0);

console.log('Composite exceptional-complement certificate: PASS');
console.log(`doublet=${doublets[0].fields.join('*')}; singlets=${singlets.map(x => x.fields.join('*')).join(',')}; safe=(B,L)=(${routeB.B3 / 3},${routeB.L}); dim=${routeB.dimension}`);
