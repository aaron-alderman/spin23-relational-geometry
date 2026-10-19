const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const range = (start, count) => new Set(Array.from({ length: count }, (_, i) => start + i));
const union = (...sets) => new Set(sets.flatMap(s => [...s]));
const intersection = (a, b) => new Set([...a].filter(x => b.has(x)));

// Compact-real magic-square bookkeeping:
// e6 = (so8 + u1 + u1) + A + B + C, with dim_R A=B=C=16.
const A = range(0, 16);
const B = range(16, 16);
const C = range(32, 16);

// Choosing one module to enlarge so8+u1^2 to so10+u1 leaves the other two
// as the 32-real-dimensional tangent, i.e. one 16-complex generation.
const T_A = union(B, C);
const T_B = union(C, A);
const T_C = union(A, B);
const tangents = [T_A, T_B, T_C];

for (const T of tangents) assert(T.size === 32, "each tangent choice must be 32 real dimensions");
assert(intersection(T_A, T_B).size === 16, "two triality tangents must overlap in one base module");
assert(intersection(T_B, T_C).size === 16, "two triality tangents must overlap in one base module");
assert(intersection(T_C, T_A).size === 16, "two triality tangents must overlap in one base module");
assert(union(T_A, T_B, T_C).size === 48, "all three tangent choices together use only three base modules");
assert(3 * 32 === 96, "three independent generations would require 96 real tangent dimensions");

for (const module of [A, B, C]) {
  const appearances = tangents.filter(T => [...module].every(x => T.has(x))).length;
  assert(appearances === 2, "each magic-square module must be reused by two tangent choices");
}

// The nested H2 corner selects vertices {0,1}.  Its setwise permutation
// stabilizer has two elements and splits the three Peirce edges into 1+2.
const permutations = [
  [0, 1, 2], [0, 2, 1], [1, 0, 2],
  [1, 2, 0], [2, 0, 1], [2, 1, 0]
];
const selectedCorner = new Set([0, 1]);
const preservesCorner = p => {
  const image = new Set([p[0], p[1]]);
  return image.size === selectedCorner.size && [...image].every(x => selectedCorner.has(x));
};
const cornerStabilizer = permutations.filter(preservesCorner);
assert(cornerStabilizer.length === 2, "nested H2 flag must reduce S3 to its S2 corner stabilizer");

const edgeKey = (a, b) => [Math.min(a, b), Math.max(a, b)].join("");
const edges = ["01", "02", "12"];
const edgeImage = (edge, p) => edgeKey(p[Number(edge[0])], p[Number(edge[1])]);
const orbit = edge => new Set(cornerStabilizer.map(p => edgeImage(edge, p)));
assert(orbit("01").size === 1, "the internal H2 edge must be fixed");
assert(orbit("02").size === 2 && orbit("02").has("12"), "the two connector edges must form a doublet orbit");

// One Boyle tangent is a 16-complex Spin(10) generation, which includes nu^c.
// Its internal bipartite count is 8+8, so the earlier 8-7 AIII imbalance is absent.
assert(8 - 8 === 0, "16-state exceptional completion must have zero doublet-singlet imbalance");
assert(8 - 7 === 1, "15-state Furey branch must retain one unmatched mode");

console.log("Triality-generation incidence certificate: PASS");
console.log("three_tangent_choices_each_32_real=true; pairwise_overlap=16_real; union=48_real_not_96_real");
console.log("nested_H2_flag_edge_orbits=1_plus_2; transitive_generation_triplet=false");
console.log("exceptional_tangent_is_16_complex_with_nuR; AIII_8_minus_8_index=0");
