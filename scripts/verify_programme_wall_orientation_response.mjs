import assert from "node:assert/strict";

const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A[0][0] + A[1][1];
const inv2 = (A) => {
  const d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const close = (a, b, eps = 1e-12) => Math.abs(a - b) <= eps * (1 + Math.abs(a) + Math.abs(b));
const sigmaZ = [[1, 0], [0, -1]];
const I = [[1, 0], [0, 1]];
const scaleAdd = (a, A, b, B) => A.map((r, i) => r.map((x, j) => a * x + b * B[i][j]));

const k = 1.25;
const z = 3.0;
const responses = new Map();
for (const chi of [1, -1]) {
  const HminusZ = scaleAdd(chi * k, sigmaZ, -z, I);
  const G = inv2(HminusZ);
  const unpolarized = 0.5 * tr(G);
  const helicity = 0.5 * tr(mul(sigmaZ, G));
  responses.set(chi, {G, unpolarized, helicity});
  assert(close(unpolarized, z / (k * k - z * z)));
  assert(close(helicity, chi * k / (k * k - z * z)));
}
assert(close(responses.get(1).unpolarized, responses.get(-1).unpolarized));
assert(close(responses.get(1).helicity, -responses.get(-1).helicity));

// A positive rank-one face residue multiplies both spin traces and remains
// unchanged under chirality reversal.
const p = [0.6, 0.8];
const face = [[p[0] ** 2, p[0] * p[1]], [p[0] * p[1], p[1] ** 2]];
const detFace = face[0][0] * face[1][1] - face[0][1] ** 2;
assert(close(detFace, 0));
assert(face[0][0] >= 0 && face[1][1] >= 0);
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
  assert(close(face[i][j] * responses.get(1).unpolarized, face[i][j] * responses.get(-1).unpolarized));
  assert(close(face[i][j] * responses.get(1).helicity, -face[i][j] * responses.get(-1).helicity));
}

console.log("PASS wall orientation response");
console.log(`spin_summed=${responses.get(1).unpolarized.toFixed(12)} chirality_even=true`);
console.log(`helicity=${responses.get(1).helicity.toFixed(12)} chirality_odd=true`);
console.log("face_only_orientation_selected=false");
console.log("required_bridge=spin-face-or-spin-internal coupling");
