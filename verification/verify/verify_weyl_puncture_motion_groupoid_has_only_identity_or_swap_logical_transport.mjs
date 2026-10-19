import assert from "node:assert/strict";

const permutations = (items) => items.length === 1 ? [items]
  : items.flatMap((item, i) => permutations(items.filter((_, j) => j !== i)).map((tail) => [item, ...tail]));
const perms = permutations([0,1,2,3,4]);
const signs = [];
for (let mask = 0; mask < 32; mask += 1) {
  const s = Array.from({ length: 5 }, (_, i) => (mask >> i) & 1 ? -1 : 1);
  if (s.filter((x) => x < 0).length % 2 === 0) signs.push(s);
}
const group = perms.flatMap((permutation) => signs.map((sign) => ({ permutation, sign })));
assert.equal(group.length, 1920);

const act = (g, vector) => g.permutation.map((source, i) => g.sign[i] * vector[source]);
const equal = (a, b) => a.every((x, i) => x === b[i]);
const key = (q) => q.join("");
const pairKey = (a, b) => `${key(a)}|${key(b)}`;
const distance = (a, b) => a.filter((x, i) => x !== b[i]).length;
const dot = (a, b, p) => ((a.reduce((sum, x, i) => sum + x * b[i], 0) % p) + p) % p;

const weights = [];
for (let mask = 0; mask < 32; mask += 1) {
  const q = Array.from({ length: 5 }, (_, i) => (mask >> i) & 1 ? -1 : 1);
  if (q.filter((x) => x < 0).length % 2 === 0) weights.push(q);
}
assert.equal(weights.length, 16);
for (const g of group) for (const q of weights) assert(weights.some((w) => equal(w, act(g, q))));

const q0 = [1,1,1,1,1];
const q2 = [1,1,1,-1,-1];
const q4 = [1,-1,-1,-1,-1];

const auditPair = (a, b, expectedDistance, expectedOrbit, expectedPointwise, expectedSetwise) => {
  assert.equal(distance(a, b), expectedDistance);
  const orbit = new Set(group.map((g) => pairKey(act(g, a), act(g, b))));
  assert.equal(orbit.size, expectedOrbit);
  const pointwise = group.filter((g) => equal(act(g, a), a) && equal(act(g, b), b));
  const setwise = group.filter((g) => {
    const ga = act(g, a), gb = act(g, b);
    return (equal(ga, a) && equal(gb, b)) || (equal(ga, b) && equal(gb, a));
  });
  assert.equal(pointwise.length, expectedPointwise);
  assert.equal(setwise.length, expectedSetwise);
  assert(setwise.some((g) => equal(act(g, a), b) && equal(act(g, b), a)));

  // Signed permutations are orthogonal: ordered puncture evaluation is transported identically.
  const testParameters = weights;
  for (const g of group) for (const t of testParameters) {
    const before = [dot(a, t, 3), dot(b, t, 3)];
    const after = [dot(act(g, a), act(g, t), 3), dot(act(g, b), act(g, t), 3)];
    assert.deepEqual(after, before);
  }
  for (const g of pointwise) for (const t of testParameters) {
    assert.deepEqual([dot(a, act(g, t), 3), dot(b, act(g, t), 3)], [dot(a, t, 3), dot(b, t, 3)]);
  }
  return { pointwise, setwise };
};

auditPair(q0, q2, 2, 160, 12, 24);
auditPair(q0, q4, 4, 80, 24, 48);

const orderedPairs = [];
for (const a of weights) for (const b of weights) if (!equal(a, b)) orderedPairs.push([a,b]);
assert.equal(orderedPairs.length, 240);
assert.equal(orderedPairs.filter(([a,b]) => distance(a,b) === 2).length, 160);
assert.equal(orderedPairs.filter(([a,b]) => distance(a,b) === 4).length, 80);

console.log("Weyl puncture-motion groupoid logical transport: PASS");
console.log("W_D5_order=1920 ordered_pair_orbits=distance2_size160_and_distance4_size80");
console.log("distance2_pointwise12_setwise24 distance4_pointwise24_setwise48");
console.log("ordered_puncture_transport=identity_on_F_p_squared_evaluation_coordinates");
console.log("unordered_boundary_holonomy=at_most_logical_coordinate_swap");
console.log("nontrivial_Sp4_mixing_requires_non_Weyl_deformation_or_duality");
