import assert from "node:assert/strict";

const weights = [];
for (let mask = 0; mask < 32; mask += 1) {
  const q = Array.from({ length: 5 }, (_, i) => (mask >> i) & 1 ? -1 : 1);
  if (q.filter((x) => x < 0).length % 2 === 0) weights.push(q);
}
assert.equal(weights.length, 16);
const nuIndex = weights.findIndex((q) => q.every((x) => x === 1));
assert(nuIndex >= 0);

// The complete polarized SO(10) spinor weight set has vanishing cubic form.
let maximumCubicSum = 0;
for (let i = 0; i < 5; i += 1) for (let j = 0; j < 5; j += 1) for (let k = 0; k < 5; k += 1) {
  const sum = weights.reduce((s, q) => s + q[i] * q[j] * q[k], 0);
  maximumCubicSum = Math.max(maximumCubicSum, Math.abs(sum));
}
assert.equal(maximumCubicSum, 0);
for (let i = 0; i < 5; i += 1) for (let j = 0; j < 5; j += 1) {
  const sum = weights.reduce((s, q) => s + q[i] * q[j], 0);
  assert.equal(sum, i === j ? 16 : 0);
}

// Binary sign bits plus the all-one word form a triply-even code.
const binaryGenerators = [Array(16).fill(1), ...Array.from({ length: 5 }, (_, i) =>
  weights.map((q) => (1 - q[i]) / 2))];
const binaryWords = new Set();
for (let mask = 0; mask < 64; mask += 1) {
  const word = Array.from({ length: 16 }, (_, column) => binaryGenerators.reduce((bit, row, i) =>
    bit ^ (((mask >> i) & 1) * row[column]), 0));
  binaryWords.add(word.join(""));
  assert.equal(word.reduce((a, b) => a + b, 0) % 8, 0);
}
assert.equal(binaryWords.size, 32, "the even-parity restriction leaves RM(1,4) dimension five");

const mod = (x, p) => ((x % p) + p) % p;
const rank = (columns, p) => {
  if (!columns.length) return 0;
  const a = Array.from({ length: 5 }, (_, i) => columns.map((q) => mod(q[i], p)));
  let row = 0;
  for (let column = 0; column < a[0].length && row < 5; column += 1) {
    let pivot = row;
    while (pivot < 5 && a[pivot][column] === 0) pivot += 1;
    if (pivot === 5) continue;
    [a[row], a[pivot]] = [a[pivot], a[row]];
    const inverse = Array.from({ length: p }, (_, x) => x).find((x) => mod(x * a[row][column], p) === 1);
    for (let j = column; j < a[0].length; j += 1) a[row][j] = mod(a[row][j] * inverse, p);
    for (let i = 0; i < 5; i += 1) if (i !== row && a[i][column] !== 0) {
      const factor = a[i][column];
      for (let j = column; j < a[0].length; j += 1) a[i][j] = mod(a[i][j] - factor * a[row][j], p);
    }
    row += 1;
  }
  return row;
};

const remaining = weights.filter((_, i) => i !== nuIndex);
const nu = weights[nuIndex];
const distance = (p) => {
  for (let size = 1; size <= 3; size += 1) {
    const search = (start, chosen) => {
      if (chosen.length === size) return rank(chosen, p) < rank([...chosen, nu], p);
      for (let i = start; i < remaining.length; i += 1) if (!search(i + 1, [...chosen, remaining[i]])) return false;
      return true;
    };
    if (!search(0, [])) return size;
  }
  return Infinity;
};
for (const p of [3, 5, 7, 11]) assert.equal(distance(p), 3);

// Removing nu^c leaves precisely the opposite cubic chi anomaly.
const chi = (q) => q.reduce((a, b) => a + b, 0);
const removedChiCube = remaining.reduce((sum, q) => sum + chi(q) ** 3, 0);
assert.equal(chi(nu), 5);
assert.equal(removedChiCube, -125);

console.log("Standard-Model triorthogonal-code audit: PASS");
console.log(`weights=${weights.length} maximum_cubic_sum=${maximumCubicSum} binary_codewords=${binaryWords.size}`);
console.log(`odd_prime_distance_checks=3,5,7,11_all_distance_3 removed_chi_cube=${removedChiCube}`);
console.log("qutrit_minimality_and_uniqueness=paper_result_not_reproduced_here");
