import assert from 'node:assert/strict';

const types = ['C+', 'C-', 'M2C', 'M3C+', 'M3C-'];
const factors = ['P', 'Q'].flatMap((family) =>
  types.map((type) => ({ family, type, key: `${family}:${type}` })));
assert.equal(factors.length, 10);

const quotientCount = 2 ** factors.length;
assert.equal(quotientCount, 1024);

let retainsBothFamilySupports = 0;
let retainsOnePhysicalComplexBranchPerTypeOnBoth = 0;
for (let mask = 0; mask < quotientCount; mask += 1) {
  const kept = factors.filter((_, i) => (mask & (1 << i)) !== 0);
  const families = new Set(kept.map(({ family }) => family));
  if (families.size === 2) retainsBothFamilySupports += 1;
  const ok = ['P', 'Q'].every((family) => {
    const local = kept.filter((x) => x.family === family).map((x) => x.type);
    return (local.includes('C+') || local.includes('C-'))
      && local.includes('M2C')
      && (local.includes('M3C+') || local.includes('M3C-'));
  });
  if (ok) retainsOnePhysicalComplexBranchPerTypeOnBoth += 1;
}
assert.equal(retainsBothFamilySupports, 31 * 31);
assert(retainsOnePhysicalComplexBranchPerTypeOnBoth > 0);

for (const type of types) {
  const p = factors.find((x) => x.key === `P:${type}`);
  const q = factors.find((x) => x.key === `Q:${type}`);
  assert(p && q);
  assert.notEqual(p.key, q.key);
}

console.log(JSON.stringify({
  simpleFactors: factors.map((x) => x.key),
  twoSidedIdealQuotientsEnumerated: quotientCount,
  quotientsWithBothFamilySupports: retainsBothFamilySupports,
  quotientsRetainingMinimalInternalTypesOnBoth: retainsOnePhysicalComplexBranchPerTypeOnBoth,
  theorem: 'Every quotient only deletes simple factors. It cannot identify a P-labelled internal factor with its Q-labelled partner.',
  consequence: 'Keeping gauge action on both family populations leaves independent central supports; diagonal identification requires a subalgebra or extra constraint, not a quotient kernel.',
}, null, 2));
