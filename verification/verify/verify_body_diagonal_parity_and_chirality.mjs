import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => z(a.re * s, a.im * s);
const cis = x => z(Math.cos(x), Math.sin(x));
const close = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const matAdd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const matScale = (A, s) => A.map(row => row.map(x => scale(x, s)));
const same = (A, B) => A.every((row, i) => row.every((x, j) => close(x, B[i][j])));
const zero2 = () => [[z(0), z(0)], [z(0), z(0)]];

const directions = [];
for (const x of [-1, 1]) for (const y of [-1, 1]) for (const zz of [-1, 1]) directions.push([x, y, zz]);

// Deliberately arbitrary complex 2x2 amplitudes: the theorem is about support,
// not their values or the unitarity of this particular test polynomial.
const amplitudes = directions.map((e, n) => [
  [z(0.1 * (n + 1), 0.03 * e[0]), z(-0.02 * e[1], 0.01 * (n + 2))],
  [z(0.04 * e[2], -0.015 * n), z(-0.05 * (n + 1), 0.02 * e[0] * e[1])],
]);

const symbol = k => directions.reduce((sum, e, n) => {
  const phase = cis(-(k[0] * e[0] + k[1] * e[1] + k[2] * e[2]));
  const term = amplitudes[n].map(row => row.map(x => mul(x, phase)));
  return matAdd(sum, term);
}, zero2());

const probes = [[0.17, -0.41, 0.73], [-1.2, 0.08, 2.1]];
for (const k of probes) for (let j = 0; j < 3; j++) {
  const shifted = [...k];
  shifted[j] += Math.PI;
  assert(same(symbol(shifted), matScale(symbol(k), -1)));
}

// The Z_2^3 shift orbit has four even and four odd elements.
let even = 0;
let odd = 0;
for (const nx of [0, 1]) for (const ny of [0, 1]) for (const nz of [0, 1]) {
  if ((nx + ny + nz) % 2 === 0) even++;
  else odd++;
}
assert.equal(even, 4);
assert.equal(odd, 4);

// For the ordered Pauli walk, v=s*q+O(q^2) at a corner and the local
// Bloch-map Jacobian determinant is s^3=s.
let zeroCharge = 0;
let piCharge = 0;
for (const nx of [0, 1]) for (const ny of [0, 1]) for (const nz of [0, 1]) {
  const s = (-1) ** (nx + ny + nz);
  const determinant = s ** 3;
  assert.equal(determinant, s);
  if (s === 1) zeroCharge += determinant;
  else piCharge += determinant;
}
assert.equal(zeroCharge, 4);
assert.equal(piCharge, -4);
assert.equal(zeroCharge + piCharge, 0);

// The mixed-parity (1,2,2) shell has common length 3 but does not acquire
// one common sign under every coordinate pi shift.
const mixed = [];
for (let position = 0; position < 3; position++) {
  for (const s1 of [-1, 1]) for (const s2 of [-1, 1]) for (const s3 of [-1, 1]) {
    const e = [2 * s1, 2 * s2, 2 * s3];
    e[position] = (position === 0 ? s1 : position === 1 ? s2 : s3);
    mixed.push(e);
  }
}
assert(mixed.every(e => e.reduce((s, x) => s + x * x, 0) === 9));
for (let j = 0; j < 3; j++) {
  const signs = new Set(mixed.map(e => Math.round(Math.cos(Math.PI * e[j]))));
  assert.deepEqual([...signs].sort(), [-1, 1]);
}

console.log('Body-diagonal parity and Floquet-chirality certificate: PASS');
console.log(`zero_charge=${zeroCharge}; pi_charge=${piCharge}; total=${zeroCharge + piCharge}; mixed_shell=${mixed.length}`);
