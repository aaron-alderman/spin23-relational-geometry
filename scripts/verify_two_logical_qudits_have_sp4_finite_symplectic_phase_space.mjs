import assert from "node:assert/strict";

const mod = (x, p) => ((x % p) + p) % p;
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b, p) => a.map((row) => b[0].map((_, j) => mod(row.reduce((s, x, k) => s + x * b[k][j], 0), p)));
const add = (a, b, p) => a.map((row, i) => row.map((x, j) => mod(x + b[i][j], p)));
const outer = (u, v, p) => u.map((x) => v.map((y) => mod(x * y, p)));
const mv = (a, v, p) => a.map((row) => mod(row.reduce((s, x, i) => s + x * v[i], 0), p));
const equal = (a, b) => a.every((row, i) => row.every((x, j) => x === b[i][j]));
const key = (a) => a.flat().join("");

const verifyPrime = (p) => {
  const J = [
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [-1, 0, 0, 0],
    [0, -1, 0, 0],
  ].map((row) => row.map((x) => mod(x, p)));
  const I = eye(4);
  const seeds = [
    [1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1],
    [1,1,0,0], [0,0,1,1], [1,0,0,1], [0,1,1,0],
  ];
  const generators = seeds.map((v) => {
    const Jv = mv(J, v, p);
    const T = add(I, outer(v, Jv, p), p);
    assert(equal(mul(mul(transpose(T), J, p), T, p), J));
    return T;
  });

  const seen = new Map([[key(I), I]]);
  const queue = [I];
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head];
    for (const generator of generators) {
      const next = mul(current, generator, p);
      const nextKey = key(next);
      if (!seen.has(nextKey)) {
        seen.set(nextKey, next);
        queue.push(next);
      }
    }
  }
  const expected = p ** 4 * (p ** 2 - 1) * (p ** 4 - 1);
  assert.equal(seen.size, expected);
  for (const matrix of seen.values()) assert(equal(mul(mul(transpose(matrix), J, p), matrix, p), J));
  return expected;
};

const order2 = verifyPrime(2);
const order3 = verifyPrime(3);

console.log("Two-logical-qudit finite symplectic phase space: PASS");
console.log(`Sp4_F2_order=${order2}`);
console.log(`Sp4_F3_order=${order3}`);
console.log("logical_Pauli_exponents=F_p^4_with_standard_alternating_form");
console.log("finite_type=C2_equals_B2");
console.log("real_positive_cone_and_physical_gate_realization=not_implied");
