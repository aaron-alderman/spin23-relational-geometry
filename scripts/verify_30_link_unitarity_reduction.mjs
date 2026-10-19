import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const axis = [
  [3, 0, 0], [-3, 0, 0], [0, 3, 0], [0, -3, 0], [0, 0, 3], [0, 0, -3],
];
const mixed = [];
for (let p = 0; p < 3; p++) for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
  const signs = [sx, sy, sz];
  const e = signs.map(s => 2 * s);
  e[p] = signs[p];
  mixed.push(e);
}
const shell = [...axis, ...mixed];

const differences = new Map();
for (let i = 0; i < shell.length; i++) for (let j = 0; j < shell.length; j++) if (i !== j) {
  const r = shell[j].map((x, k) => x - shell[i][k]).join(',');
  const pairs = differences.get(r) ?? [];
  pairs.push([i, j]);
  differences.set(r, pairs);
}
const histogram = {};
for (const pairs of differences.values()) histogram[pairs.length] = (histogram[pairs.length] ?? 0) + 1;
assert.deepEqual(histogram, { 1: 30, 2: 204, 4: 66, 6: 20, 8: 6 });

const unique = [...differences.values()].filter(pairs => pairs.length === 1);
assert.equal(unique.length, 30);
for (const [[i, j]] of unique) assert(shell[i].every((x, k) => shell[j][k] === -x));

// Minimal complex 2x2 arithmetic for Pauli projectors.
const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => z(a.re * s, a.im * s);
const matAdd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const matScale = (A, s) => A.map(row => row.map(x => scale(x, s)));
const matMul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const zero = () => [[z(0), z(0)], [z(0), z(0)]];
const identity = [[z(1), z(0)], [z(0), z(1)]];
const same = (A, B) => A.every((row, i) => row.every((x, j) => close(x.re, B[i][j].re) && close(x.im, B[i][j].im)));

const projector = e => {
  const r = Math.sqrt(e.reduce((s, x) => s + x * x, 0));
  const [x, y, zz] = e.map(q => q / r);
  return [
    [z((1 + zz) / 2), z(x / 2, -y / 2)],
    [z(x / 2, y / 2), z((1 - zz) / 2)],
  ];
};
for (const e of shell) {
  const minus = e.map(x => -x);
  assert(same(matMul(projector(e), projector(minus)), zero()));
}

const phaseSign = (e, k) => Math.round(Math.cos(e.reduce((s, x, i) => s + x * k[i], 0)));
const orbitSum = (orbit, k) => orbit.reduce((sum, e) => matAdd(sum, matScale(projector(e), phaseSign(e, k))), zero());
const k0 = [0, 0, 0];
const kx = [Math.PI, 0, 0];
assert(same(orbitSum(axis, k0), matScale(identity, 3)));
assert(same(orbitSum(mixed, k0), matScale(identity, 12)));
assert(same(orbitSum(axis, kx), identity));
assert(same(orbitSum(mixed, kx), matScale(identity, 4)));

// Hence U(0)=3 U(pi,0,0) for arbitrary complex orbit coefficients.
for (const [alpha, beta] of [[0.2, -0.1], [0.1, 0.07], [-0.4, 0.09]]) {
  const U0 = matAdd(matScale(orbitSum(axis, k0), alpha), matScale(orbitSum(mixed, k0), beta));
  const Ux = matAdd(matScale(orbitSum(axis, kx), alpha), matScale(orbitSum(mixed, kx), beta));
  assert(same(U0, matScale(Ux, 3)));
}

console.log('Thirty-link unitarity-reduction certificate: PASS');
console.log(`differences=${differences.size}; unique_antipodal=${unique.length}; helicity_ansatz_factor=3`);
