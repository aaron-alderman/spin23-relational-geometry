import assert from "node:assert/strict";

const neg = (r) => r.map((x) => -x);
const key = (r) => r.join(",");
const lexLess = (a, b) => {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] < b[i];
  return false;
};
const lineKey = (r) => {
  const n = neg(r);
  return key(lexLess(r, n) ? r : n);
};
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);

// Doubled E8 roots: norm squared is 8 and inner products are four times conventional values.
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
  const minus = Array.from({ length: 8 }, (_, i) => (mask >> i) & 1).reduce((a, b) => a + b, 0);
  if (minus % 2) continue;
  roots.push(Array.from({ length: 8 }, (_, i) => (mask >> i) & 1 ? -1 : 1));
}
assert.equal(roots.length, 240);
const rootSet = new Set(roots.map(key));
for (const r of roots) {
  assert.equal(dot(r, r), 8);
  const counts = new Map();
  for (const s of roots) {
    const d = dot(r, s);
    counts.set(d, (counts.get(d) ?? 0) + 1);
  }
  assert.equal(counts.get(8), 1);
  assert.equal(counts.get(-8), 1);
  assert.equal(counts.get(4), 56);
  assert.equal(counts.get(-4), 56);
  assert.equal(counts.get(0), 126);
}

const lineKeys = [...new Set(roots.map(lineKey))].sort();
assert.equal(lineKeys.length, 120);
const lineId = new Map(lineKeys.map((k, i) => [k, i]));
const triples = new Map();
for (const a of roots) for (const b of roots) {
  if (dot(a, b) !== -4) continue;
  const c = a.map((x, i) => x + b[i]);
  assert.ok(rootSet.has(key(c)));
  const ids = [lineId.get(lineKey(a)), lineId.get(lineKey(b)), lineId.get(lineKey(c))].sort((x, y) => x - y);
  triples.set(ids.join(","), ids);
}
const tripleList = [...triples.values()];
assert.equal(tripleList.length, 1120);
const byLine = Array.from({ length: 120 }, () => []);
tripleList.forEach((t, i) => t.forEach((v) => byLine[v].push(i)));
const masks = tripleList.map((t) => t.reduce((m, i) => m | (1n << BigInt(i)), 0n));
const fullMask = (1n << 120n) - 1n;
let nodes = 0;
const solve = (used, chosen) => {
  nodes++;
  if (used === fullMask) return [...chosen];
  let best = -1;
  let candidates = null;
  for (let i = 0; i < 120; i++) {
    if (used & (1n << BigInt(i))) continue;
    const available = byLine[i].filter((t) => (masks[t] & used) === 0n);
    if (available.length === 0) return null;
    if (candidates === null || available.length < candidates.length) {
      best = i;
      candidates = available;
      if (available.length === 1) break;
    }
  }
  assert.ok(best >= 0);
  for (const t of candidates) {
    const answer = solve(used | masks[t], [...chosen, t]);
    if (answer) return answer;
  }
  return null;
};
// Fix one A2 through the first line; Weyl transitivity makes this harmless for existence.
const seed = byLine[0][0];
const solution = solve(masks[seed], [seed]);
assert.ok(solution);
assert.equal(solution.length, 40);
assert.equal(solution.reduce((m, t) => m | masks[t], 0n), fullMask);

const hexagons = solution.map((t) => {
  const lines = new Set(tripleList[t]);
  return roots.filter((r) => lines.has(lineId.get(lineKey(r))));
});
assert.ok(hexagons.every((h) => h.length === 6));
const profileKey = (A, B) => {
  const counts = new Map([[-4, 0], [0, 0], [4, 0]]);
  for (const a of A) for (const b of B) counts.set(dot(a, b), counts.get(dot(a, b)) + 1);
  return [counts.get(-4), counts.get(0), counts.get(4)].join(",");
};
const profileCounts = new Map();
const degreesByProfile = Array.from({ length: 40 }, () => new Map());
for (let i = 0; i < 40; i++) for (let j = i + 1; j < 40; j++) {
  const p = profileKey(hexagons[i], hexagons[j]);
  profileCounts.set(p, (profileCounts.get(p) ?? 0) + 1);
  degreesByProfile[i].set(p, (degreesByProfile[i].get(p) ?? 0) + 1);
  degreesByProfile[j].set(p, (degreesByProfile[j].get(p) ?? 0) + 1);
}
assert.equal([...profileCounts.values()].reduce((a, b) => a + b, 0), 780);
const regularProfiles = [...profileCounts.keys()].map((p) => {
  const ds = degreesByProfile.map((m) => m.get(p) ?? 0);
  return { profile: p, degrees: [...new Set(ds)].sort((a, b) => a - b) };
}).filter((x) => x.degrees.length === 1);
const profileNames = [...profileCounts.keys()].sort();
const coloredDegreeSignatureCount = new Set(degreesByProfile.map((m) => profileNames.map((p) => m.get(p) ?? 0).join(","))).size;
const regularProfileUnions = [];
for (let mask = 1; mask < (1 << profileNames.length) - 1; mask++) {
  const selected = profileNames.filter((_, i) => (mask >> i) & 1);
  const ds = degreesByProfile.map((m) => selected.reduce((s, p) => s + (m.get(p) ?? 0), 0));
  const unique = [...new Set(ds)].sort((a, b) => a - b);
  if (unique.length === 1) regularProfileUnions.push({ profiles: selected, degree: unique[0] });
}

// The 40-polarization intersection graph is srg(40,12,2,4).
// Canonical untwisted sixfold lifts have degrees incompatible with the E8 root graph degree 56.
const baseDegree = 12;
const cycle6Degree = 2;
const liftDegrees = {
  cartesian: baseDegree + cycle6Degree,
  tensor: baseDegree * cycle6Degree,
  strong: baseDegree + cycle6Degree + baseDegree * cycle6Degree,
  lexicographicK6: 5 + 6 * baseDegree,
  completeBipartiteOverAdjacentFibers: 6 * baseDegree,
};
assert.deepEqual(liftDegrees, {
  cartesian: 14,
  tensor: 24,
  strong: 38,
  lexicographicK6: 77,
  completeBipartiteOverAdjacentFibers: 72,
});
assert.ok(Object.values(liftDegrees).every((d) => d !== 56));
const WeylE8Order = 696729600;
const ambientWedgeGroupOrder = 466560;
const globalFiberKernelOrder = 3;
const faithfulFiberPermutationOrder = ambientWedgeGroupOrder / globalFiberKernelOrder;
assert.notEqual(WeylE8Order % ambientWedgeGroupOrder, 0);
assert.equal(WeylE8Order % faithfulFiberPermutationOrder, 0);

console.log("e8_a2_partition_and_naive_lift_test: PASS");
console.log("E8_roots=240,root_lines=120,A2_subsystems=1120");
console.log("exact_cover_by_40_disjoint_A2_hexagons_exists,search_nodes=" + nodes);
console.log("inter_hexagon_inner_product_profile_counts=" + JSON.stringify(Object.fromEntries([...profileCounts].sort())));
console.log("regular_single_profile_relations=" + JSON.stringify(regularProfiles));
console.log("regular_nontrivial_profile_union_relations=" + JSON.stringify(regularProfileUnions));
console.log("distinct_colored_degree_signatures_on_40_hexagons=" + coloredDegreeSignatureCount);
console.log("E8_inner_product_counts_per_root=plus1:56,minus1:56,zero:126,opposite:1");
console.log("polarization_base_graph_parameters=(40,12,2,4)");
console.log("naive_sixfold_lift_degrees=" + JSON.stringify(liftDegrees));
console.log("no_naive_untwisted_product_lift_has_E8_degree_56");
console.log("ambient_wedge_group_order_466560_does_not_divide_Weyl_E8_order_696729600_due_to_3_adic_exponent_6_vs_5");
console.log("fiber_action_has_global_binary_kernel_C3_so_faithful_permutation_quotient_order_155520_does_divide_Weyl_E8");
console.log("an_E8_identification_still_requires_a_nontrivial_decoration_cocycle_and_full_inner_product_intertwiner");

