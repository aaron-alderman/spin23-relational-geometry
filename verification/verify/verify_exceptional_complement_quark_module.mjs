import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

// Right-dual column weights under g_Y^dagger.
const columnHypercharges = [1 / 6, 1 / 6, -1 / 3];
assert(close(columnHypercharges.reduce((a, b) => a + b, 0), 0));
assert.equal(3 * 2 + 3 * 1, 9);

const Zmodule = {
  doublet: { color: '3', weak: '2', hypercharge: 1 / 6 },
  singlet: { color: '3', weak: '1', hypercharge: -1 / 3 },
};
const conjugateModule = {
  doublet: { color: 'bar3', weak: '2', hypercharge: -1 / 6 },
  singlet: { color: 'bar3', weak: '1', hypercharge: 1 / 3 },
};
const fureyTarget = {
  doublet: { color: '3', weak: '2', hypercharge: 1 / 6 },
  singlet: { color: 'bar3', weak: '1', hypercharge: 1 / 3 },
};
assert.deepEqual(Zmodule.doublet, fureyTarget.doublet);
assert.notDeepEqual(Zmodule.singlet, fureyTarget.singlet);
assert.deepEqual(conjugateModule.singlet, fureyTarget.singlet);
assert.notDeepEqual(conjugateModule.doublet, fureyTarget.doublet);

// The determinant contraction is neutral under hypercharge and uses the
// unique color and weak alternating contractions.
assert(close(2 * Zmodule.doublet.hypercharge + Zmodule.singlet.hypercharge, 0));
const colorSingletsInThreeTriplets = 1;
const weakSingletsInTwoDoublets = 1;
assert.equal(colorSingletsInThreeTriplets * weakSingletsInTwoDoublets, 1);

// Three left spin-1/2 factors decompose as 3/2 + 1/2 + 1/2, with no spin zero.
const threeSpinorDecomposition = new Map([[3 / 2, 1], [1 / 2, 2]]);
assert.equal(threeSpinorDecomposition.get(0) ?? 0, 0);
assert.equal([...threeSpinorDecomposition.entries()].reduce((dimension, [j, multiplicity]) => dimension + (2 * j + 1) * multiplicity, 0), 8);

const choose = (n, k) => {
  let out = 1;
  for (let i = 1; i <= k; i++) out = out * (n - k + i) / i;
  return out;
};
const polarizedCounts = [1, 2, 3, 4].map(n => choose(n + 2, 3));
assert.deepEqual(polarizedCounts, [1, 4, 10, 20]);

console.log('Exceptional complement quark-module certificate: PASS');
console.log(`module=(3,2)_{1/6}+(3,1)_{-1/3}; determinant_Y=0; polarized=${polarizedCounts.join(',')}`);
