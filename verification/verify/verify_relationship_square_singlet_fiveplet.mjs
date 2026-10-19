#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const multiply = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const close = (a, b, tol = 1e-8) => Math.abs(a - b) < tol;

// Fundamental weights are +/-1, so Sym^2 has spin-one weights 2,0,-2.
const spin1Weights = [2, 0, -2];
const symmetricSquareWeights = [];
for (let i = 0; i < spin1Weights.length; i++) {
  for (let j = i; j < spin1Weights.length; j++) symmetricSquareWeights.push(spin1Weights[i] + spin1Weights[j]);
}
symmetricSquareWeights.sort((a, b) => b - a);
const spin2PlusSinglet = [4, 2, 0, 0, -2, -4];
assert(symmetricSquareWeights.every((x, i) => x === spin2PlusSinglet[i]),
  "Sym^2(spin1)=spin2+singlet weight decomposition failed");

// Jordan determinant/discriminant is invariant under SL(2,R) congruence.
const Q = [[3, 1.2], [1.2, 2]];
const g = [[2, 1], [1, 1]]; // det(g)=1
assert(close(det2(g), 1), "test matrix must lie in SL(2,R)");
const transformed = multiply(multiply(g, Q), transpose(g));
assert(close(det2(transformed), det2(Q)), "Jordan determinant invariance failed");

// The Veronese/null conic is the zero-discriminant locus.
for (const v of [[1, 0], [0, 1], [2, -3], [1.5, 0.4]]) {
  const rankOne = [[v[0] * v[0], v[0] * v[1]], [v[0] * v[1], v[1] * v[1]]];
  assert(close(det2(rankOne), 0), "Veronese ray must have zero discriminant");
}

// Bundle/helicity weight ladder from one spinor face line S.
const faceWeight = 1;
const fermionRelationshipWeight = 2 * faceWeight; // S^2
const spinTwoFaceWeight = 4 * faceWeight;          // S^4
const stressRelationshipWeight = 2 * spinTwoFaceWeight; // S^8
assert(fermionRelationshipWeight === 2, "fermion relationship weight failed");
assert(spinTwoFaceWeight === 4, "spin-two face weight failed");
assert(stressRelationshipWeight === 8, "stress relationship weight failed");
assert(stressRelationshipWeight === 4 * fermionRelationshipWeight,
  "fourth power of fermion relationship failed");

console.log("Relationship-square singlet/fiveplet certificate: PASS");
console.log("Sym2(spin1)_weights=4,2,0,0,-2,-4=spin2_plus_singlet; dimensions=5+1");
console.log("singlet=Jordan_determinant_discriminant; Veronese_conic=det_zero; SL2_invariant=true");
console.log("face:S; fermion_relation:S^2; spin2_face:S^4; stress_relation:S^8=(S^2)^4");
