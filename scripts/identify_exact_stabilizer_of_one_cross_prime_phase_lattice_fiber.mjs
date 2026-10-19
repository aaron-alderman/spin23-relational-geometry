import assert from "node:assert/strict";

const mod = (x, q) => ((x % q) + q) % q;
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const mul = (A, B, q) => A.map((row) => B[0].map((_, j) => mod(row.reduce((s, x, k) => s + x * B[k][j], 0), q)));
const key = (A) => A.flat().join("");
const closure = (generators, q) => {
  const I = identity(generators[0].length);
  const seen = new Map([[key(I), I]]);
  const queue = [I];
  for (let cursor = 0; cursor < queue.length; cursor++) {
    for (const g of generators) {
      const next = mul(g, queue[cursor], q);
      const k = key(next);
      if (!seen.has(k)) {
        seen.set(k, next);
        queue.push(next);
      }
    }
  }
  return queue;
};
const rowAct = (v, A, q) => A[0].map((_, j) => mod(v.reduce((s, x, i) => s + x * A[i][j], 0), q));
const eqv = (a, b) => a.every((x, i) => x === b[i]);

const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const pairIndex = new Map(pairs.map((p, i) => [p.join(","), i]));
const columns = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const add = (a, b, q) => a.map((x, i) => mod(x + b[i], q));
const scale = (n, a, q) => a.map((x) => mod(n * x, q));
const basis2 = (i, j, q) => {
  const out = Array(6).fill(0);
  out[pairIndex.get([Math.min(i, j), Math.max(i, j)].join(","))] = mod(i < j ? 1 : -1, q);
  return out;
};
const primitiveBasis = (q) => [
  basis2(0, 1, q),
  scale(-1, basis2(2, 3, q), q),
  basis2(0, 3, q),
  scale(-1, basis2(1, 2, q), q),
  add(basis2(0, 2, q), scale(-1, basis2(1, 3, q), q), q),
];
const wedgeVectors = (u, v, q) => {
  const out = Array(6).fill(0);
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) out[pairIndex.get(i + "," + j)] = mod(u[i] * v[j] - u[j] * v[i], q);
  return out;
};
const act2 = (g, x, q) => {
  const cols = columns(g);
  let out = Array(6).fill(0);
  for (let k = 0; k < pairs.length; k++) {
    if (!x[k]) continue;
    const [i, j] = pairs[k];
    out = add(out, scale(x[k], wedgeVectors(cols[i], cols[j], q), q), q);
  }
  return out;
};
const wedgeMatrix = (g, q) => {
  const pb = primitiveBasis(q);
  const express = (x) => [x[0], -x[5], x[2], -x[3], x[1]].map((a) => mod(a, q));
  const cols = pb.map((x) => express(act2(g, x, q)));
  return cols[0].map((_, i) => cols.map((c) => c[i]));
};
const orderOf = (A, q, limit = 100) => {
  const I = identity(A.length);
  let x = I;
  for (let n = 1; n <= limit; n++) {
    x = mul(A, x, q);
    if (key(x) === key(I)) return n;
  }
  return null;
};

const C3h1 = [[0, 0, -1, 0], [0, 1, 0, 0], [1, 0, 3, 0], [0, 0, 0, 1]];
const C3h2 = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 3]];
const KplusLower = [[1, 0, 0, 0], [0, 1, 0, 0], [3, 2, 1, 0], [2, 3, 0, 1]];
const generators = [C3h1, C3h2, KplusLower];

const group2 = closure(generators, 2);
const group3 = closure(generators, 3);
assert.equal(group2.length, 18);
assert.equal(group3.length, 51840);

const wedge2Map = new Map();
for (const g of group2) wedge2Map.set(key(wedgeMatrix(g, 2)), wedgeMatrix(g, 2));
const wedge3Map = new Map();
for (const g of group3) wedge3Map.set(key(wedgeMatrix(g, 3)), wedgeMatrix(g, 3));
assert.equal(wedge2Map.size, 18);
assert.equal(wedge3Map.size, 25920);

const lambda2 = [1, 1, 0, 0, 0];
const lambda3 = [0, 0, 0, 1, 0];
const binaryOrbit = [[0, 1, 1, 1, 0], [1, 0, 1, 1, 0], [1, 1, 0, 0, 0]];
const permutationOnBinaryOrbit = (A) => binaryOrbit.map((v) => binaryOrbit.findIndex((w) => eqv(rowAct(v, A, 2), w)));
const binaryActionKernel = [...wedge2Map.values()].filter((A) => permutationOnBinaryOrbit(A).every((x, i) => x === i));
assert.equal(binaryActionKernel.length, 3);
const generatorBinaryPermutations = generators.map((g) => permutationOnBinaryOrbit(wedgeMatrix(g, 2)));
const stab2 = [...wedge2Map.values()].filter((A) => eqv(rowAct(lambda2, A, 2), lambda2));
const stab3 = [...wedge3Map.values()].filter((A) => eqv(rowAct(lambda3, A, 3), lambda3));
assert.equal(stab2.length, 6);
assert.equal(stab3.length, 324);

const distribution = (group, q) => {
  const counts = new Map();
  for (const A of group) {
    const o = orderOf(A, q);
    counts.set(o, (counts.get(o) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => a[0] - b[0]);
};
const dist2 = distribution(stab2, 2);
const dist3 = distribution(stab3, 3);
assert.deepEqual(dist2, [[1, 1], [2, 3], [3, 2]]); // S3.

const commute = (A, B, q) => key(mul(A, B, q)) === key(mul(B, A, q));
assert.ok(stab2.some((A) => stab2.some((B) => !commute(A, B, 2))));

// For lambda3=e_F2, lambda3^perp/lambda3 has basis e_E1,e_F1,e_R.
const quotientAction3 = (A) => {
  const indices = [0, 1, 4];
  return indices.map((i) => {
    const e = [0, 0, 0, 0, 0];
    e[i] = 1;
    const image = rowAct(e, A, 3);
    assert.equal(image[2], 0);
    return indices.map((j) => image[j]);
  });
};
const quotientImage = new Map();
for (const A of stab3) quotientImage.set(key(quotientAction3(A)), quotientAction3(A));
assert.equal(quotientImage.size, 12);
assert.equal(stab3.length / quotientImage.size, 27);
const quotientDist = distribution([...quotientImage.values()], 3);
assert.deepEqual(quotientDist, [[1, 1], [2, 3], [3, 8]]); // A4.
const I3key = key(identity(3));
const unipotentKernel = stab3.filter((A) => key(quotientAction3(A)) === I3key);
assert.equal(unipotentKernel.length, 27);
const unipotentDist = distribution(unipotentKernel, 3);
const unipotentAbelian = unipotentKernel.every((A) => unipotentKernel.every((B) => commute(A, B, 3)));

const symplecticMod6Order = group2.length * group3.length;
const faithfulWedgeMod6Order = wedge2Map.size * wedge3Map.size;
const fiberOrbit = 240;
assert.equal(symplecticMod6Order, 933120);
assert.equal(faithfulWedgeMod6Order, 466560);
assert.equal(faithfulWedgeMod6Order / fiberOrbit, stab2.length * stab3.length);
assert.equal(stab2.length * stab3.length, 1944);
assert.equal((group2.length * group3.length) / fiberOrbit, 3888);
const fiberPermutationKernelOrder = binaryActionKernel.length;
const faithfulFiberPermutationOrder = faithfulWedgeMod6Order / fiberPermutationKernelOrder;
const faithfulFiberPointStabilizerOrder = faithfulFiberPermutationOrder / fiberOrbit;
assert.equal(faithfulFiberPermutationOrder, 155520);
assert.equal(faithfulFiberPointStabilizerOrder, 648);

console.log("exact_cross_prime_fiber_stabilizer: PASS");
console.log("mod2_handle_image_order=18,wedge_kernel_trivial");
console.log("mod3_symplectic_image_order=51840,wedge_image_order=25920,central_kernel_order=2");
console.log("CRT_symplectic_image_order=933120,faithful_ambient_wedge_image_order=466560");
console.log("fiber_orbit_order=240,ambient_wedge_fiber_stabilizer_order=1944,symplectic_preimage_order=3888");
console.log("binary_global_fiber_kernel_order=3,faithful_fiber_permutation_image_order=155520,faithful_point_stabilizer_order=648");
console.log("binary_stabilizer_order=6,isomorphic_to_S3,element_orders=" + JSON.stringify(dist2));
console.log("binary_three_point_action_kernel_order=3,generator_permutations_C3h1_C3h2_Kplus=" + JSON.stringify(generatorBinaryPermutations));
console.log("qutrit_oriented_null_vector_stabilizer_order=324,element_orders=" + JSON.stringify(dist3));
console.log("qutrit_stabilizer_has_normal_unipotent_kernel_order=27_and_quotient_Omega3_3_isomorphic_to_A4_order=12");
console.log("qutrit_quotient_element_orders=" + JSON.stringify(quotientDist));
console.log("qutrit_unipotent_kernel_element_orders=" + JSON.stringify(unipotentDist) + ",abelian=" + unipotentAbelian);
