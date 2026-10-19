import assert from 'node:assert/strict';

// Hypercharge is stored in units of 1/6.
const fields = [
  { name: 'Q', c: '3', w: 2, y6: 1 },
  { name: 'uc', c: '3bar', w: 1, y6: -4 },
  { name: 'dc', c: '3bar', w: 1, y6: 2 },
  { name: 'L', c: '1', w: 2, y6: -3 },
  { name: 'ec', c: '1', w: 1, y6: 6 },
  { name: 'N', c: '1', w: 1, y6: 0 },
];
const colorHasSinglet = (a, b) => (a === '1' && b === '1') || (a === '3' && b === '3bar') || (a === '3bar' && b === '3');
const weakHasSinglet = (a, b) => (a === 1 && b === 1) || (a === 2 && b === 2);
const pairIsSinglet = (a, b) => colorHasSinglet(a.c, b.c) && weakHasSinglet(a.w, b.w) && a.y6 + b.y6 === 0;

const pairs = [];
for (let i = 0; i < fields.length; i++) for (let j = i; j < fields.length; j++) {
  if (pairIsSinglet(fields[i], fields[j])) pairs.push(`${fields[i].name}*${fields[j].name}`);
}
assert.deepEqual(pairs, ['N*N']);
assert.equal(fields.length * (fields.length + 1) / 2, 21);

const scalars = [
  { name: 'H', c: '1', w: 2, y6: 3 },
  { name: 'Hdag', c: '1', w: 2, y6: -3 },
];
const tripleIsSinglet = (a, b, h) => {
  if (!colorHasSinglet(a.c, b.c)) return false;
  // With exactly one scalar doublet, precisely one fermion must be a doublet.
  if (!((a.w === 2 && b.w === 1) || (a.w === 1 && b.w === 2))) return false;
  return a.y6 + b.y6 + h.y6 === 0;
};
const dressed = [];
for (let i = 0; i < fields.length; i++) for (let j = i; j < fields.length; j++) for (const h of scalars) {
  if (tripleIsSinglet(fields[i], fields[j], h)) dressed.push(`${fields[i].name}*${fields[j].name}*${h.name}`);
}
assert.deepEqual(dressed.sort(), ['L*N*H', 'L*ec*Hdag', 'Q*dc*Hdag', 'Q*uc*H'].sort());

const L = fields.find(f => f.name === 'L');
const H = scalars.find(f => f.name === 'H');
assert.equal(2 * (L.y6 + H.y6), 0); // Weinberg (LH)(LH)

for (const [n, expected] of [[1, 1], [2, 3], [3, 6]]) assert.equal(n * (n + 1) / 2, expected);

console.log('Unique completed-matter pairing certificate: PASS');
console.log(`unordered_pairs=21; bare_singlets=${pairs.join(',')}; higgs_dressed=${dressed.join(',')}; three_family_symmetric_dim=6`);
