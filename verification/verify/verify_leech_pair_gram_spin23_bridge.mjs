import assert from "node:assert/strict";

const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const det2 = ([[a, b], [c, d]]) => a * d - b * c;
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);

// 1. The standard minimal-shell association counts exhaust all 196560 vectors.
const shellCounts = new Map([[4, 1], [2, 4600], [1, 47104], [0, 93150], [-1, 47104], [-2, 4600], [-4, 1]]);
assert.equal([...shellCounts.values()].reduce((sum, count) => sum + count, 0), 196560);
assert.deepEqual([1, shellCounts.get(2), shellCounts.get(1), shellCounts.get(0) / 2], [1, 4600, 47104, 46575]);

// 2. Pair-Gram determinants give the four projective relation strata.
const gram = k => [[4, k], [k, 4]];
assert.deepEqual([4, 2, 1, 0].map(k => det2(gram(k))), [0, 12, 15, 16]);
for (const k of shellCounts.keys()) assert(det2(gram(k)) >= 0);

// 3. Odd inner products reduce to the symplectic plane over F2; even ones vanish.
const reduceMatrix = (matrix, prime) => matrix.map(row => row.map(value => mod(value, prime)));
assert.deepEqual(reduceMatrix(gram(1), 2), [[0, 1], [1, 0]]);
assert.equal(mod(det2(reduceMatrix(gram(1), 2)), 2), 1);
assert.deepEqual(reduceMatrix(gram(2), 2), [[0, 0], [0, 0]]);

// 4. Modulo three, only k = 0 is full rank among the projective strata.
assert.equal(mod(det2(reduceMatrix(gram(0), 3)), 3), 1);
for (const k of [1, 2, 4]) assert.equal(mod(det2(reduceMatrix(gram(k), 3)), 3), 0);

// 5. The even norm refinement of L15 is q0=ab, not q-=ab+a+b.
const f2Points = [[0, 0], [0, 1], [1, 0], [1, 1]];
const q0 = ([a, b]) => mod(a * b, 2);
const qMinus = ([a, b]) => mod(a * b + a + b, 2);
assert.deepEqual(f2Points.map(q0), [0, 0, 0, 1]);
assert.deepEqual(f2Points.map(qMinus), [0, 1, 1, 1]);
assert.notDeepEqual(f2Points.map(q0), f2Points.map(qMinus));

// 6. L15 has Smith invariants (1,15), with discriminant value 2/15.
const L15 = gram(1);
const d1 = L15.flat().reduce((current, value) => gcd(current, value), 0);
const d2 = Math.abs(det2(L15)) / d1;
assert.deepEqual([d1, d2], [1, 15]);
const inverseNumerator = [[4, -1], [-1, 4]]; // L15^-1 = inverseNumerator / 15
const discriminantNumerator = inverseNumerator[0][0] / 2;
assert.equal(discriminantNumerator, 2); // (1/2)e1^T L15^-1 e1 = 2/15
assert.equal(mod(25 * 2, 15), 5); // order-three generator: 50/15 = 1/3 mod 1
assert.equal(mod(9 * 2, 15), 3);  // order-five generator: 18/15 = 1/5 mod 1

// 7. Two positive ternary factors are anisotropic, while the twisted double splits.
const nonzeroPairs = (prime) => Array.from({ length: prime }, (_, a) => Array.from({ length: prime }, (_, b) => [a, b])).flat().filter(([a, b]) => a || b);
assert.equal(nonzeroPairs(3).some(([a, b]) => mod(a * a + b * b, 3) === 0), false);
assert.equal(nonzeroPairs(3).filter(([a, b]) => mod(a * a - b * b, 3) === 0).length, 4);

// 8. u=a-b, v=a+b turns the twisted form into uv at p=3 and p=5.
for (const prime of [3, 5]) {
  for (let a = 0; a < prime; a += 1) {
    for (let b = 0; b < prime; b += 1) {
      const u = mod(a - b, prime);
      const v = mod(a + b, prime);
      assert.equal(mod(a * a - b * b, prime), mod(u * v, prime));
    }
  }
}

console.log("Leech pair-Gram / Spin(2,3) bridge certificate passed.");

