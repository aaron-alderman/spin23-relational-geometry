import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "evidence/data/spin23-a2-a5-wall-peirce-phase-selector-boundary.json"),
    "utf8",
  ),
);

const approx = (a, b, tolerance = 1e-12) => Math.abs(a - b) < tolerance;
const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const identity = [[1, 0], [0, 1]];
const zero = [[0, 0], [0, 0]];
const equal = (A, B) => A.every((row, i) => row.every((x, j) => approx(x, B[i][j])));

assert.equal(data.documentId, 1461);

const J = [[0, -1], [1, 0]];
const K = [[1, 0], [0, -1]];
assert(equal(multiply(J, J), scale(-1, identity)));
assert(equal(multiply(K, K), identity));
assert(equal(add(multiply(K, J), multiply(J, K)), zero));

for (const chi of [-1, 1]) {
  const P = scale(0.5, add(identity, scale(chi, K)));
  assert(equal(multiply(P, P), P));
  const Jinv = scale(-1, J);
  const conjugated = multiply(multiply(J, P), Jinv);
  const opposite = scale(0.5, add(identity, scale(-chi, K)));
  assert(equal(conjugated, opposite));
  const trace = P[0][0] + P[1][1];
  assert.equal(trace, 1);
}

// A charge-minus-two real ray rotates nontrivially under generic U(1).
// Only alpha in pi/2 multiples can preserve a given unoriented ray.
const genericAlpha = 0.37;
const rayAngleShift = -2 * genericAlpha;
assert.equal(approx(Math.sin(rayAngleShift), 0), false);
assert.equal(data.neutralDataNoGo.nonzeroInvariantRayUnderFullU1, false);

// Minimize V=lambda(r^2-v^2)^2-mu*q*r^2*cos(2 phi).
const lambda = 1.7;
const mu = 0.8;
const v = 1.2;
for (const q of [-0.6, 0.6]) {
  const phi = q > 0 ? 0 : Math.PI / 2;
  const r2 = v ** 2 + Math.abs(mu * q) / (2 * lambda);
  const radialDerivative = 2 * lambda * (r2 - v ** 2) - mu * q * Math.cos(2 * phi);
  const angularDerivative = 2 * mu * q * r2 * Math.sin(2 * phi);
  assert.ok(approx(radialDerivative, 0));
  assert.ok(approx(angularDerivative, 0));
}

// Between one-dimensional complex lines, a complex-linear map is a complex
// scalar. Commuting with conjugation makes it real; isometry leaves +/-1,
// which is one projective map.
const compatibleIsometries = [-1, 1];
assert.equal(new Set(compatibleIsometries.map((x) => Math.abs(x))).size, 1);
assert.equal(data.intertwiner.ifItExistsProjectiveMultiplicity, 1);
assert.equal(data.intertwiner.presentlyConstructed, false);

assert.equal(data.verdict.neutralWallAndSpin23ComplexStructureSelectPhase, false);
assert.equal(data.verdict.wallAndNativePeirceRealStructureSelectProjectiveRay, true);
assert.equal(data.verdict.transportToSterilePlaneDerived, false);
assert.equal(data.verdict.currentInputBranchExhaustedAtHomTest, true);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1461: neutral wall data leave U(1); wall sign plus native Peirce K selects two rays, and the remaining terminal datum is the equivariant intertwiner Hom space.",
);
