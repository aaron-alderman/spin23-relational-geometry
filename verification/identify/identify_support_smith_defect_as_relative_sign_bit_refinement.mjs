import assert from "node:assert/strict";

const mod2 = (x) => ((x % 2) + 2) % 2;
const add = (a, b) => a.map((x, i) => x ^ b[i]);
const dotRows = (c, M) => M[0].map((_, j) => c.reduce((s, x, i) => s ^ (x & M[i][j]), 0));
const weight = (v) => v.reduce((s, x) => s + x, 0);
const bits = (n, width) => Array.from({length: width}, (_, i) => (n >> i) & 1);
const key = (v) => v.join("");
const rank2 = (rows) => {
  const A = rows.map((r) => r.slice());
  let rank = 0;
  for (let col = 0; col < A[0].length && rank < A.length; col++) {
    let p = rank;
    while (p < A.length && A[p][col] === 0) p++;
    if (p === A.length) continue;
    [A[rank], A[p]] = [A[p], A[rank]];
    for (let i = 0; i < A.length; i++) if (i !== rank && A[i][col]) A[i] = add(A[i], A[rank]);
    rank++;
  }
  return rank;
};

const fields = ["u^c_1", "d_1", "e", "nu", "d^c_1"];
const W = [
  [1, -1, -1, 1, 1],
  [-1, 1, 1, -1, 1],
  [-1, -1, -1, -1, 1],
  [-1, -1, -1, 1, -1],
  [1, -1, -1, -1, -1],
];
const B = W.map((row) => row.map((q) => (1 - q) / 2));
assert.deepEqual(B, [
  [0,1,1,0,0],
  [1,0,0,1,0],
  [1,1,1,1,0],
  [1,1,1,0,1],
  [0,1,1,1,1],
]);
assert.equal(rank2(B), 3);
assert.equal(rank2(W.map((r) => r.map(mod2))), 1);

const relation = [1, 2, -1, 1, 1];
const rbar = relation.map(mod2);
assert.deepEqual(rbar, [1,0,1,1,1]);
assert.equal(weight(rbar) % 2, 0);
assert.deepEqual(dotRows(rbar, B), [0,0,0,0,0]);

// Even field subsets are exactly those whose sum of sign weights is divisible
// by two coordinatewise.  Quotienting by the reduced primitive relation leaves
// 2^(4-1)=8 classes, matching the three Smith factors.
const evenCoefficients = [];
for (let n = 0; n < 32; n++) {
  const c = bits(n, 5);
  if (weight(c) % 2 === 0) evenCoefficients.push(c);
}
assert.equal(evenCoefficients.length, 16);

const canonical = (c) => {
  const partner = add(c, rbar);
  return key(c) < key(partner) ? c : partner;
};
const classes = new Map();
for (const c of evenCoefficients) {
  const rep = canonical(c);
  classes.set(key(rep), rep);
}
assert.equal(classes.size, 8);

// The relative sign-bit map c -> c^T B has kernel exactly <rbar> on the
// even-subset space, so it identifies the Smith defect with a concrete
// three-dimensional binary subspace.
const images = new Map();
for (const rep of classes.values()) images.set(key(dotRows(rep, B)), rep);
assert.equal(images.size, 8);
assert.equal(rank2([...images.keys()].map((s) => [...s].map(Number))), 3);

const zero = [0,0,0,0,0];
const kernel = evenCoefficients.filter((c) => key(dotRows(c, B)) === key(zero));
assert.deepEqual(kernel.map(key).sort(), [key(zero), key(rbar)].sort());

// A convenient basis is supplied by three even field pairs.
const pair = (i, j) => fields.map((_, k) => Number(k === i || k === j));
const coefficientBasis = [pair(0,1), pair(0,2), pair(0,3)];
const imageBasis = coefficientBasis.map((c) => dotRows(c, B));
assert.equal(rank2(imageBasis), 3);

// The space has seven nonzero vectors and no canonical 2+1 split from its
// vector-space structure alone: every nonzero functional has a four-element
// kernel, giving seven possible candidate handle planes.
const defectVectors = [...images.keys()].map((s) => [...s].map(Number));
let functionalKernelCount = 0;
for (let n = 1; n < 32; n++) {
  const f = bits(n, 5);
  const kernelImages = defectVectors.filter((v) => v.reduce((s, x, i) => s ^ (x & f[i]), 0) === 0);
  if (kernelImages.length === 4) functionalKernelCount++;
}
// Several ambient functionals restrict to the same nonzero functional.
// The number of distinct kernels is the intrinsic count, seven.
const distinctKernels = new Set();
for (let n = 1; n < 32; n++) {
  const f = bits(n, 5);
  const kernelKeys = defectVectors
    .filter((v) => v.reduce((s, x, i) => s ^ (x & f[i]), 0) === 0)
    .map(key).sort().join("|");
  if (kernelKeys.split("|").length === 4) distinctKernels.add(kernelKeys);
}
assert.equal(distinctKernels.size, 7);
assert.ok(functionalKernelCount >= 7);

// The Standard-Model 3+2 flag does add structure.  Projection to the two weak
// bit coordinates is onto.  Its kernel is one color-only line, yielding a
// canonical short exact sequence but no canonical section.
const weakProjection = (v) => [v[3], v[4]];
assert.equal(rank2(defectVectors.map(weakProjection)), 2);
const weakKernel = defectVectors.filter((v) => weakProjection(v).every((x) => x === 0));
assert.deepEqual(weakKernel.map(key).sort(), ["00000", "01100"]);
const colorLineGenerator = [0,1,1,0,0];

const complementKeys = new Set();
const nonzeroDefect = defectVectors.filter((v) => key(v) !== "00000");
for (let i = 0; i < nonzeroDefect.length; i++) for (let j = i + 1; j < nonzeroDefect.length; j++) {
  const a = nonzeroDefect[i], b = nonzeroDefect[j], c = add(a, b);
  if (key(c) === "00000") continue;
  const plane = [zero, a, b, c];
  if (plane.some((v) => key(v) === key(colorLineGenerator))) continue;
  if (rank2(plane.map(weakProjection)) !== 2) continue;
  complementKeys.add(plane.map(key).sort().join("|"));
}
assert.equal(complementKeys.size, 4);

console.log("Furey_support_Smith_defect_as_relative_sign_bits: PASS");
console.log("support_bit_matrix_rank_mod2=3_while_sign_charge_matrix_rank_mod2=1");
console.log("even_field_subsets_dimension=4");
console.log("reduced_primitive_relation=" + key(rbar));
console.log("even_subsets_mod_relation_has_8_classes_isomorphic_to_(Z2)^3");
console.log("relative_sign_bit_image_dimension=3_and_kernel_is_exactly_<rbar>");
console.log("one_basis_from_field_pairs=" + coefficientBasis.map(key).join(","));
console.log("corresponding_relative_bit_basis=" + imageBasis.map(key).join(","));
console.log("seven_distinct_candidate_two_planes_exist_so_the_2_plus_1_split_is_not_selected_by_vector_space_data_alone");
console.log("SM_3_plus_2_flag_gives_exact_sequence_0_to_color_line_01100_to_defect_to_weak_F2_squared_to_0");
console.log("the_weak_quotient_has_four_linear_sections_so_the_flag_selects_the_quotient_but_not_a_unique_handle_plane");
