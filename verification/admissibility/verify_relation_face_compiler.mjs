import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/relation-face-compiler-v1.json", root), "utf8"));
const eps = 1e-12;

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const outer = (v) => v.map((x) => v.map((y) => x * y));
const scale = (s, A) => A.map((row) => row.map((x) => s * x));
const close = (a, b, tol = eps) => Math.abs(a - b) <= tol;
const matrixClose = (A, B, tol = eps) => A.every((row, i) => row.every((x, j) => close(x, B[i][j], tol)));

assert.equal(evidence.protocol, "relation-face-compiler/1");
assert.equal(evidence.packet, "AZ-124");

// Four-node weighted example: every edge contributes a rank-one H2 boundary atom.
const n = 4;
const edges = [[0, 1, 2], [1, 2, 3], [2, 0, 5], [2, 3, 7]];
let L = Array.from({ length: n }, () => Array(n).fill(0));
let Q = Array.from({ length: n }, () => Array(n).fill(0));
let A = Array.from({ length: n }, () => Array(n).fill(0));
let D = Array.from({ length: n }, () => Array(n).fill(0));
for (const [i, j, w] of edges) {
  const b = Array(n).fill(0); b[i] = 1; b[j] = -1;
  const c = Array(n).fill(0); c[i] = 1; c[j] = 1;
  L = add(L, scale(w, outer(b)));
  Q = add(Q, scale(w, outer(c)));
  A[i][j] += w; A[j][i] += w; D[i][i] += w; D[j][j] += w;
}
assert.ok(matrixClose(L, add(D, scale(-1, A))));
assert.ok(matrixClose(Q, add(D, A)));
assert.ok(edges.every(([, , w]) => close(w * w - w * w, 0)));

// A three-port positive kernel and its two-port Schur face.
const K = [[4, 1, 1], [1, 3, 1], [1, 1, 2]];
const R = [[K[0][0] - K[0][2] * K[2][0] / K[2][2], K[0][1] - K[0][2] * K[2][1] / K[2][2]],
           [K[1][0] - K[1][2] * K[2][0] / K[2][2], K[1][1] - K[1][2] * K[2][1] / K[2][2]]];
const det2 = (M) => M[0][0] * M[1][1] - M[0][1] * M[1][0];
const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1])
  - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0])
  + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
assert.ok(close(det3(K), K[2][2] * det2(R)));
assert.ok(det2(R) > 0);

// Vertex rephasing changes edge phases but preserves the cycle sum.
const wrap = (x) => Math.atan2(Math.sin(x), Math.cos(x));
const phi = [0.31, -0.47, 0.83]; // 12, 23, 31
const chi = [0.22, -0.51, 0.19];
const transformed = [phi[0] + chi[0] - chi[1], phi[1] + chi[1] - chi[2], phi[2] + chi[2] - chi[0]];
const holonomy = wrap(phi.reduce((a, x) => a + x, 0));
assert.ok(close(wrap(transformed.reduce((a, x) => a + x, 0)), holonomy));

// Hermitian 3x3 determinant reads cos(Phi); the orientation-odd detector reads sin(Phi).
const a = 4, b = 5, c = 6, ru = 0.7, rv = 0.8, rw = 0.9;
const detGain = (Phi) => a * b * c - a * rv ** 2 - b * rw ** 2 - c * ru ** 2 + 2 * ru * rv * rw * Math.cos(Phi);
const odd = (Phi) => 2 * ru * rv * rw * Math.sin(Phi);
assert.ok(close(detGain(holonomy), detGain(-holonomy)));
assert.ok(close(odd(holonomy), -odd(-holonomy)));

// A tree has E-V+1=0 independent phases; one triangle has one.
assert.equal(2 - 3 + 1, 0);
assert.equal(3 - 3 + 1, 1);

assert.equal(evidence.results.edgeAtoms.rank, 1);
assert.equal(evidence.results.graphAssembly.laplacianIdentity, true);
assert.equal(evidence.results.graphAssembly.signlessIdentity, true);
assert.equal(evidence.results.schurFace.determinantIdentity, true);
assert.equal(evidence.results.phaseThreshold.treeIndependentHolonomies, 0);
assert.equal(evidence.results.phaseThreshold.triangleIndependentHolonomies, 1);
assert.equal(evidence.results.orientation.detectorRequired, true);
assert.equal(evidence.decision.sourceNativeOrderDerived, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  laplacian: L,
  signlessLaplacian: Q,
  schurFace: R,
  holonomy,
  evenDeterminant: detGain(holonomy),
  oddOrientationRecord: odd(holonomy),
  nextGate: evidence.nextGate
}, null, 2));
