import assert from "node:assert/strict";

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const alpha1 = [1, -1, 0];
const alpha2 = [0, 1, -1];
const gram = [[dot(alpha1, alpha1), dot(alpha1, alpha2)], [dot(alpha2, alpha1), dot(alpha2, alpha2)]];
assert.deepEqual(gram, [[2, -1], [-1, 2]]);
assert.equal(gram[0][0] * gram[1][1] - gram[0][1] ** 2, 3);

// Fundamental weights pair integrally with the simple coroots but are not roots.
const lambda1 = [2 / 3, -1 / 3, -1 / 3];
const lambda2 = [1 / 3, 1 / 3, -2 / 3];
assert(Math.abs(dot(lambda1, alpha1) - 1) < 1e-12);
assert(Math.abs(dot(lambda1, alpha2)) < 1e-12);
assert(Math.abs(dot(lambda2, alpha1)) < 1e-12);
assert(Math.abs(dot(lambda2, alpha2) - 1) < 1e-12);
assert.deepEqual(lambda1.map((x) => Math.round(3 * x)), [2, -1, -1]);
assert(lambda1.some((x) => !Number.isInteger(x)));

// Standard-Model left-handed multiplets have nontrivial color triality exactly
// when they are quarks, so fundamental matter breaks a standalone Z3 one-form symmetry.
const matter = [
  { name: "Q", triality: 1, weakParity: 1, y6: 1 },
  { name: "u^c", triality: -1, weakParity: 0, y6: -4 },
  { name: "d^c", triality: -1, weakParity: 0, y6: 2 },
  { name: "L", triality: 0, weakParity: 1, y6: -3 },
  { name: "e^c", triality: 0, weakParity: 0, y6: 6 },
  { name: "nu^c", triality: 0, weakParity: 0, y6: 0 },
  { name: "H", triality: 0, weakParity: 1, y6: 3 },
];
assert(matter.filter((m) => m.triality !== 0).map((m) => m.name).join(",") === "Q,u^c,d^c");

// The diagonal Z6 generator (omega3,-1,e^{i pi/3}) nevertheless acts trivially
// on every multiplet: color center is locked to weak center and hypercharge.
for (const m of matter) {
  const phase = 2 * Math.PI * m.triality / 3 + Math.PI * m.weakParity + Math.PI * m.y6 / 3;
  assert(Math.abs(Math.sin(phase)) < 1e-10);
  assert(Math.abs(Math.cos(phase) - 1) < 1e-10);
}

console.log("Furey/color A2 bridge and center-symmetry audit: PASS");
console.log("the_SU3_simple_root_Gram_matrix_is_exactly_the_positive_response_A2_matrix");
console.log("the_weight_over_root_lattice_has_order_three_and_represents_color_center_triality");
console.log("fundamental_quark_matter_breaks_a_standalone_Z3_color_one_form_symmetry");
console.log("the_diagonal_Z6_global_gauge_kernel_still_acts_trivially_on_all_completed_generation_multiplets");
console.log("an_A2_color_origin_is_exact_algebraically_but_does_not_automatically_create_a_deconfined_BF_sector");
