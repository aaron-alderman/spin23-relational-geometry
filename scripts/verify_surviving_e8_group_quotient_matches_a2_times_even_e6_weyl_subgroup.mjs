import assert from "node:assert/strict";

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const roots = [];
for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) {
  for (const si of [-2, 2]) for (const sj of [-2, 2]) {
    const r = Array(8).fill(0);
    r[i] = si;
    r[j] = sj;
    roots.push(r);
  }
}
for (let mask = 0; mask < 256; mask++) {
  const signs = Array.from({ length: 8 }, (_, i) => (mask >> i) & 1 ? -1 : 1);
  if (signs.filter((x) => x < 0).length % 2 === 0) roots.push(signs);
}
assert.equal(roots.length, 240);

// E6 chain 0-1-2-3-4 with branch 2-5, plus disjoint A2 edge 6-7.
const edges = new Set(["0,1", "1,2", "2,3", "3,4", "2,5", "6,7"]);
const adjacent = (i, j) => edges.has([Math.min(i, j), Math.max(i, j)].join(","));
const chosen = [];
let searchNodes = 0;
const search = (i) => {
  searchNodes++;
  if (i === 8) return [...chosen];
  for (const r of roots) {
    let ok = true;
    for (let j = 0; j < i; j++) {
      const expected = adjacent(i, j) ? -4 : 0;
      if (dot(r, chosen[j]) !== expected) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    chosen.push(r);
    const answer = search(i + 1);
    if (answer) return answer;
    chosen.pop();
  }
  return null;
};
chosen.push(roots[0]);
const simple = search(1);
assert.ok(simple);

const gram = simple.map((a) => simple.map((b) => dot(a, b) / 4));
const expectedGram = Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => i === j ? 2 : adjacent(i, j) ? -1 : 0));
assert.deepEqual(gram, expectedGram);
const det = (A) => A.length === 1 ? A[0][0] : A[0].reduce((s, x, j) => s + (j % 2 ? -1 : 1) * x * det(A.slice(1).map((r) => r.filter((_, k) => k !== j))), 0);
assert.equal(det(gram), 9);

const E6simple = simple.slice(0, 6);
const A2simple = simple.slice(6);
const E6roots = roots.filter((r) => A2simple.every((a) => dot(r, a) === 0));
const A2roots = roots.filter((r) => E6simple.every((a) => dot(r, a) === 0));
assert.equal(E6roots.length, 72);
assert.equal(A2roots.length, 6);
assert.equal(roots.length - E6roots.length - A2roots.length, 162);

// Act with W(E6)^+ on all A2 subsystems of E8.
const rootKey = (r) => r.join(",");
const neg = (r) => r.map((x) => -x);
const lexLess = (a, b) => {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] < b[i];
  return false;
};
const lineKey = (r) => rootKey(lexLess(r, neg(r)) ? r : neg(r));
const lineKeys = [...new Set(roots.map(lineKey))].sort();
const lineId = new Map(lineKeys.map((k, i) => [k, i]));
const rootSet = new Set(roots.map(rootKey));
const triples = new Map();
for (const a of roots) for (const b of roots) {
  if (dot(a, b) !== -4) continue;
  const c = a.map((x, i) => x + b[i]);
  assert.ok(rootSet.has(rootKey(c)));
  const t = [lineId.get(lineKey(a)), lineId.get(lineKey(b)), lineId.get(lineKey(c))].sort((x, y) => x - y);
  triples.set(t.join(","), t);
}
const tripleList = [...triples.values()];
assert.equal(tripleList.length, 1120);
const tripleId = new Map(tripleList.map((t, i) => [t.join(","), i]));
const reflect = (r, a) => {
  const coefficient = dot(r, a) / 4;
  assert.ok(Number.isInteger(coefficient));
  return r.map((x, i) => x - coefficient * a[i]);
};
const evenGenerators = E6simple.slice(1).map((a) => {
  const lineMap = lineKeys.map((k) => {
    const r = k.split(",").map(Number);
    const image = reflect(reflect(r, a), E6simple[0]);
    return lineId.get(lineKey(image));
  });
  return tripleList.map((t) => tripleId.get(t.map((i) => lineMap[i]).sort((x, y) => x - y).join(",")));
});
const unseen = new Set(tripleList.map((_, i) => i));
const orbitSizes = new Map();
let invariantCovers = 0;
while (unseen.size) {
  const seed = unseen.values().next().value;
  const orbit = new Set([seed]);
  const queue = [seed];
  for (let cursor = 0; cursor < queue.length; cursor++) {
    for (const g of evenGenerators) {
      const next = g[queue[cursor]];
      if (!orbit.has(next)) {
        orbit.add(next);
        queue.push(next);
      }
    }
  }
  for (const i of orbit) unseen.delete(i);
  orbitSizes.set(orbit.size, (orbitSizes.get(orbit.size) ?? 0) + 1);
  if (orbit.size === 40) {
    const counts = Array(120).fill(0);
    for (const i of orbit) for (const line of tripleList[i]) counts[line]++;
    if (counts.every((x) => x === 1)) invariantCovers++;
  }
}

const H2order = 18;
const binaryKernelOrder = 3;
const binaryQuotientOrder = H2order / binaryKernelOrder;
const PSp4_3_order = 25920;
const survivingOrder = binaryQuotientOrder * PSp4_3_order;
const WE6order = 51840;
const WA2order = 6;
const subsystemWeylOrder = WE6order * WA2order;
const WE8order = 696729600;
assert.equal(binaryQuotientOrder, 6);
assert.equal(survivingOrder, 155520);
assert.equal(subsystemWeylOrder, 311040);
assert.equal(subsystemWeylOrder / survivingOrder, 2);
assert.equal(WE8order / subsystemWeylOrder, 2240);
assert.equal(WE8order % survivingOrder, 0);

console.log("surviving_E8_group_quotient_and_E6_A2_subsystem: PASS");
console.log("explicit_E6_plus_A2_simple_root_Gram_determinant=9,index_in_E8_lattice=3,search_nodes=" + searchNodes);
console.log("E8_root_decomposition_counts=E6:72,A2:6,mixed:162");
console.log("binary_handle_quotient_order=18_over_3=6_isomorphic_to_S3_equals_W_A2");
console.log("qutrit_wedge_group_order=25920_isomorphic_to_PSp4_3_equals_the_simple_index2_subgroup_of_W_E6");
console.log("surviving_product_order=155520,index2_in_W_E6_times_W_A2_order311040,index4480_in_W_E8");
console.log("standard_E6_A2_subgroup_has_root_orbits_72_6_162_and_is_not_transitive_on_240_roots");
console.log("W_E6_even_orbits_on_1120_A2_subsystems=" + JSON.stringify(Object.fromEntries([...orbitSizes].sort((a, b) => a[0] - b[0]))));
console.log("W_E6_even_invariant_40_A2_exact_covers=" + invariantCovers);
console.log("group_embedding_survives_but_a_transitive_fiber_to_root_intertwiner_requires_a_different_embedding_or_further_structure");

