import assert from "node:assert/strict";

const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, v) => A.map((r) => r.reduce((s, x, i) => s + x * v[i], 0));
const det = (A) => A.length === 0 ? 1 : A.length === 1 ? A[0][0] : A[0].reduce((s, x, j) => s + (j % 2 ? -1 : 1) * x * det(A.slice(1).map((r) => r.filter((_, k) => k !== j))), 0);
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const pair = (x, Omega, y) => x.reduce((s, a, i) => s + a * mv(Omega, y)[i], 0);

// Quotient basis (u^c_1,d_1,nu,d^c_1), after eliminating
// e=u^c_1+2d_1+nu+d^c_1.
const zD = [0, -1, -1, -1];
const zC = [-1, -1, -1, 0];
const zSum = [-1, -2, -2, -1];
assert.deepEqual(zD.map((x, i) => x + zC[i]), zSum);

// The gcd of the two-by-two minors is one, so <zD,zC> is primitive.
const minors = [];
for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
  minors.push(zD[i] * zC[j] - zD[j] * zC[i]);
}
assert.equal(minors.reduce(gcd, 0), 1);

// An explicit integral completion.  Columns are (zD,zC,nu,d^c_1).
const P = [
  [0, -1, 0, 0],
  [-1, -1, 0, 0],
  [-1, -1, 1, 0],
  [-1, 0, 0, 1],
];
const Pinv = [
  [1, -1, 0, 0],
  [-1, 0, 0, 0],
  [0, -1, 1, 0],
  [1, -1, 0, 1],
];
const I4 = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
assert.equal(det(P), -1);
assert(eq(mul(Pinv, P), I4));

// Standard symplectic form in the completed basis (zD,zC,xD,xC).
const J = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
];
const Omega = mul(mul(transpose(Pinv), J), Pinv);
assert.deepEqual(Omega, [
  [0, 0, 1, -1],
  [0, 0, -1, 0],
  [-1, 1, 0, 0],
  [1, 0, 0, 0],
]);
assert.equal(det(Omega), 1);
assert.equal(pair(zD, Omega, zD), 0);
assert.equal(pair(zC, Omega, zC), 0);
assert.equal(pair(zD, Omega, zC), 0);

// In a basis beginning with the fixed Lagrangian plane, every alternating
// form has block shape [[0,A],[-A^T,bE]].  Unimodularity forces A in GL(2,Z).
for (const A of [
  [[1,0],[0,1]],
  [[0,1],[-1,0]],
  [[1,2],[0,1]],
]) {
  for (const b of [-3, 0, 4]) {
    const general = [
      [0, 0, A[0][0], A[0][1]],
      [0, 0, A[1][0], A[1][1]],
      [-A[0][0], -A[1][0], 0, b],
      [-A[0][1], -A[1][1], -b, 0],
    ];
    assert.equal(det(general), det(A) ** 2);
  }
}

// For the normalized dual pairing A=I, an integral shear kills any bE.
// Once one symplectic form is fixed, its Lagrangian complements are instead
// x -> x+zS with S symmetric: the expected three-parameter framing freedom.
const symmetricSamples = [
  [[0,0],[0,0]],
  [[1,2],[2,-3]],
  [[4,-1],[-1,5]],
];
for (const S of symmetricSamples) {
  const Q = [
    [1,0,S[0][0],S[0][1]],
    [0,1,S[1][0],S[1][1]],
    [0,0,1,0],
    [0,0,0,1],
  ];
  assert(eq(mul(mul(transpose(Q), J), Q), J));
}

// The paper's physical Dirac pairing closes only one pair inside this support:
// d_1 <-> d^c_1.  The partners u_1,e^c,nu^c of the other three fields lie
// outside the five-field support, so this restricted pairing cannot be rank 4.
const partners = {
  "u^c_1": "u_1",
  "d_1": "d^c_1",
  "e": "e^c",
  "nu": "nu^c",
  "d^c_1": "d_1",
};
const support = new Set(["u^c_1", "d_1", "e", "nu", "d^c_1"]);
const closedPairs = new Set();
for (const f of support) if (support.has(partners[f])) closedPairs.add([f, partners[f]].sort().join("|"));
assert.deepEqual([...closedPairs], ["d^c_1|d_1"]);

console.log("Furey_support_quotient_symplectic_classification: PASS");
console.log("quotient_basis=uc1,d1,nu,dc1");
console.log("zD=(0,-1,-1,-1),zC=(-1,-1,-1,0),zSum=zD+zC");
console.log("gcd_of_2x2_axis_minors=1_so_the_axis_plane_is_primitive");
console.log("explicit_completion=(zD,zC,nu,dc1)_has_determinant_minus_one");
console.log("one_explicit_unimodular_alternating_form_Omega=" + JSON.stringify(Omega));
console.log("all_forms_with_fixed_isotropic_plane_have_blocks_0_A_minusAT_bE_with_A_in_GL2Z");
console.log("after_normalizing_duals_every_form_is_symplectically_standard_but_no_canonical_duals_are_selected");
console.log("for_fixed_Omega_lagrangian_complements_form_an_affine_Sym2Z_family_of_three_framing_parameters");
console.log("restricted_Dirac_doubling_closes_only_d1_dc1_and_is_degenerate_on_this_support");
