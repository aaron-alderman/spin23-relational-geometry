import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => a * b))));
const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const J = [[0, 1], [-1, 0]];
const P = scale(0.5, add(I, D));
const Q = scale(0.5, add(I, scale(-1, D)));
const I4 = kron(I, I);
const E = kron(I, product(D, X));
const turn = (s) => s === 0 ? I4 : add(kron(I, P), scale(s, kron(J, Q)));
const edge = (s) => product(E, turn(s));
const word = (schedule) => schedule.reduce((W, s) => product(edge(s), W), I4);
const schedules = [];
for (let n = 0; n < 3 ** 6; n += 1) {
  let x = n;
  const s = [];
  for (let k = 0; k < 6; k += 1) {
    s.push([-1, 0, 1][x % 3]);
    x = Math.floor(x / 3);
  }
  if (s.filter(Boolean).length !== 4) continue;
  const W = word(s);
  if (same(W, I4)) schedules.push({ sign: 1, s });
  else if (same(W, scale(-1, I4))) schedules.push({ sign: -1, s });
}
assert.equal(schedules.filter((x) => x.sign === 1).length, 36);
assert.equal(schedules.filter((x) => x.sign === -1).length, 36);

const key = (s) => s.join(',');
const rotate = (s, k) => {
  const out = Array(6);
  for (let n = 0; n < 6; n += 1) out[(n + k) % 6] = s[n];
  return out;
};
const reflect = (s, flip) => {
  const out = Array(6);
  for (let n = 0; n < 6; n += 1) out[(6 - n) % 6] = flip ? -s[n] : s[n];
  return out;
};
const partition = (states, mode) => {
  const remaining = new Map(states.map((x) => [key(x.s), x]));
  const orbits = [];
  while (remaining.size) {
    const seed = remaining.values().next().value;
    const images = [];
    for (let k = 0; k < 6; k += 1) {
      images.push(rotate(seed.s, k));
      if (mode !== 'cyclic') images.push(rotate(reflect(seed.s, mode === 'real'), k));
    }
    const members = [];
    for (const image of images) {
      const k = key(image);
      if (remaining.has(k)) {
        members.push(remaining.get(k));
        remaining.delete(k);
      }
    }
    orbits.push(members);
  }
  return orbits;
};
const summary = (orbits) => orbits.map((o) => ({
  size: o.length,
  holonomySigns: [...new Set(o.map((x) => x.sign))],
  representative: o[0].s,
}));

const cyclic = partition(schedules, 'cyclic');
const bare = partition(schedules, 'bare');
const real = partition(schedules, 'real');
assert.ok(cyclic.every((o) => new Set(o.map((x) => x.sign)).size === 1));
assert.ok(bare.every((o) => new Set(o.map((x) => x.sign)).size === 1));
assert.ok(real.every((o) => new Set(o.map((x) => x.sign)).size === 1));

console.log(JSON.stringify({
  protocol: 'four-seam-central-placement-orbits/1',
  centralSchedules: 72,
  plusIdentitySchedules: 36,
  minusIdentitySchedules: 36,
  cyclicOrbits: summary(cyclic),
  bareDihedralOrbits: summary(bare),
  realDihedralOrbits: summary(real),
  passed: true,
}, null, 2));
