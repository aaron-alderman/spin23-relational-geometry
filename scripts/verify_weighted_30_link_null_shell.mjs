import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

const axis = [
  [3, 0, 0], [-3, 0, 0],
  [0, 3, 0], [0, -3, 0],
  [0, 0, 3], [0, 0, -3],
];

const mixed = [];
for (let onePosition = 0; onePosition < 3; onePosition++) {
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
    const signs = [sx, sy, sz];
    const e = signs.map(s => 2 * s);
    e[onePosition] = signs[onePosition];
    mixed.push(e);
  }
}

assert.equal(axis.length, 6);
assert.equal(mixed.length, 24);
assert.equal(new Set([...axis, ...mixed].map(e => e.join(','))).size, 30);
assert([...axis, ...mixed].every(e => e.reduce((s, x) => s + x * x, 0) === 9));

const average = (shell, f) => shell.reduce((s, e) => s + f(e.map(x => x / 3)), 0) / shell.length;
const second = (shell, i, j) => average(shell, n => n[i] * n[j]);
const fourth = (shell, i, j, k, l) => average(shell, n => n[i] * n[j] * n[k] * n[l]);

for (const shell of [axis, mixed]) {
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    assert(close(second(shell, i, j), i === j ? 1 / 3 : 0));
  }
}

assert(close(fourth(axis, 0, 0, 0, 0), 1 / 3));
assert(close(fourth(axis, 0, 0, 1, 1), 0));
assert(close(fourth(mixed, 0, 0, 0, 0), 11 / 81));
assert(close(fourth(mixed, 0, 0, 1, 1), 8 / 81));

// Solve w_M*(8/81)=1/15, then w_A=1-w_M.
const wM = (1 / 15) / (8 / 81);
const wA = 1 - wM;
assert(close(wA, 13 / 40));
assert(close(wM, 27 / 40));

const weightedSecond = (i, j) => wA * second(axis, i, j) + wM * second(mixed, i, j);
const weightedFourth = (i, j, k, l) => wA * fourth(axis, i, j, k, l) + wM * fourth(mixed, i, j, k, l);
const delta = (i, j) => i === j ? 1 : 0;

for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
  assert(close(weightedSecond(i, j), delta(i, j) / 3));
  for (let k = 0; k < 3; k++) for (let l = 0; l < 3; l++) {
    const isotropic = (delta(i, j) * delta(k, l) + delta(i, k) * delta(j, l) + delta(i, l) * delta(j, k)) / 15;
    assert(close(weightedFourth(i, j, k, l), isotropic));
  }
}

const sixthX = shell => average(shell, n => n[0] ** 6);
const weightedSixthX = wA * sixthX(axis) + wM * sixthX(mixed);
assert(close(weightedSixthX, 4 / 27));
assert(!close(weightedSixthX, 1 / 7));

// No common sign remains under a coordinate pi shift, because each coordinate
// assumes both even and odd integer values on the combined shell.
for (let j = 0; j < 3; j++) {
  const signs = new Set([...axis, ...mixed].map(e => Math.round(Math.cos(Math.PI * e[j]))));
  assert.deepEqual([...signs].sort(), [-1, 1]);
}

// Common null timing and per-direction positive weights.
const a = 0.2;
const c = 1;
const dt = 3 * a / c;
assert(close(-c * c * dt * dt + 9 * a * a, 0));
assert(close(6 * (wA / 6) + 24 * (wM / 24), 1));
assert(close(wA / 6, 13 / 240));
assert(close(wM / 24, 9 / 320));

console.log('Weighted 30-link null-shell certificate: PASS');
console.log(`w_axis=${wA}; w_mixed=${wM}; fourth_isotropic=true; sixth_x=${weightedSixthX}`);
