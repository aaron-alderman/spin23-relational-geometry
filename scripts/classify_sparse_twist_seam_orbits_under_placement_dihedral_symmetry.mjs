import assert from 'node:assert/strict';

const key = (s) => s.join(',');
const rotate = (s, k) => {
  const out = Array(6);
  for (let n = 0; n < 6; n += 1) out[(n + k) % 6] = s[n];
  return out;
};
const reflect = (s, signFlip = false) => {
  const out = Array(6);
  for (let n = 0; n < 6; n += 1) out[(6 - n) % 6] = signFlip ? -s[n] : s[n];
  return out;
};
const orbit = (seed, signedReflection = false, rotationsOnly = false) => {
  const images = [];
  for (let k = 0; k < 6; k += 1) {
    images.push(rotate(seed, k));
    if (!rotationsOnly) images.push(rotate(reflect(seed, signedReflection), k));
  }
  return new Set(images.map(key));
};
const partition = (states, signedReflection = false, rotationsOnly = false) => {
  const remaining = new Map(states.map((s) => [key(s), s]));
  const orbits = [];
  while (remaining.size) {
    const seed = remaining.values().next().value;
    const imageKeys = orbit(seed, signedReflection, rotationsOnly);
    const members = [];
    for (const k of imageKeys) {
      if (remaining.has(k)) {
        members.push(remaining.get(k));
        remaining.delete(k);
      }
    }
    orbits.push(members);
  }
  return orbits;
};

// Exact minimal central schedules from the same-parity/opposite-sign theorem.
const pairs = [];
for (let i = 0; i < 6; i += 1) for (let j = i + 1; j < 6; j += 1) {
  if ((i - j) % 2 !== 0) continue;
  for (const sign of [-1, 1]) {
    const s = Array(6).fill(0);
    s[i] = sign;
    s[j] = -sign;
    pairs.push(s);
  }
}
assert.equal(pairs.length, 12);

const cyclic = partition(pairs, false, true);
const bareDihedral = partition(pairs, false, false);
const realDihedral = partition(pairs, true, false);
assert.deepEqual(cyclic.map((o) => o.length).sort((a, b) => a - b), [6, 6]);
assert.deepEqual(bareDihedral.map((o) => o.length), [12]);
assert.deepEqual(realDihedral.map((o) => o.length).sort((a, b) => a - b), [6, 6]);

const orientedSeparation = (s) => {
  const plus = s.indexOf(1);
  const minus = s.indexOf(-1);
  return (minus - plus + 6) % 6;
};
assert.ok(pairs.every((s) => [2, 4].includes(orientedSeparation(s))));
assert.ok(cyclic.every((o) => new Set(o.map(orientedSeparation)).size === 1));

console.log(JSON.stringify({
  protocol: 'sparse-seam-placement-orbits/1',
  minimalSchedules: 12,
  allowedOrientedSeparations: [2, 4],
  cyclicOrbits: cyclic.map((o) => ({ size: o.length, orientedSeparation: orientedSeparation(o[0]), representative: o[0] })),
  bareDihedralOrbits: bareDihedral.map((o) => ({ size: o.length, representative: o[0] })),
  orientationReversingRealDihedralOrbits: realDihedral.map((o) => ({ size: o.length, orientedSeparation: orientedSeparation(o[0]), representative: o[0] })),
  conclusion: 'bare reflection exchanges chiral cyclic sectors; reflection plus turn-sign reversal preserves them',
  passed: true,
}, null, 2));
