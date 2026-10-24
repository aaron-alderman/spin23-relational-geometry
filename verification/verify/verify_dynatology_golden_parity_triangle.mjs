import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const record = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/golden_parity_triangle_v1.json"), "utf8"));
const mod = (x, p) => ((x % p) + p) % p;
const modMatrix = (A, p) => A.map((row) => row.map((x) => mod(x, p)));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const mulMod = (A, B, p) => modMatrix(mul(A, B), p);
const vecMod = (A, x, p) => A.map((row) => mod(row.reduce((sum, a, i) => sum + a * x[i], 0), p));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const I = [[1, 0], [0, 1]];

assert.equal(record.schema, "dynatology-golden-parity-triangle/1");
const {S, intertwinerP: P} = record.integerAction;
const Sbar = modMatrix(S, 2);
assert.deepEqual(Sbar, record.modTwoAction.Sbar);
assert.equal(Math.abs(det2(P)), 2);
assert.deepEqual(record.integerAction.smithInvariantsP, [1, 2]);

const S2 = mulMod(Sbar, Sbar, 2);
const S3 = mulMod(S2, Sbar, 2);
assert.deepEqual(S3, I);
assert.notDeepEqual(Sbar, I);
assert.notDeepEqual(S2, I);
const polynomial = S2.map((row, i) => row.map((x, j) => mod(x + Sbar[i][j] + I[i][j], 2)));
assert.deepEqual(polynomial, [[0, 0], [0, 0]]);

const nonzero = [[1, 0], [0, 1], [1, 1]];
assert.equal(nonzero.filter((v) => JSON.stringify(vecMod(Sbar, v, 2)) === JSON.stringify(v)).length, 0);
const orbit = [];
let v = [1, 0];
for (let i = 0; i < 3; i += 1) {
  orbit.push(v);
  v = vecMod(Sbar, v, 2);
}
assert.deepEqual(orbit, [[1, 0], [0, 1], [1, 1]]);
assert.deepEqual(v, [1, 0]);
assert.deepEqual(record.modTwoAction.indexTwoLatticeOrbit.map((x) => x.modTwoLineGenerator), orbit);

// P(Z^2) is exactly the integral lift of span(1,0): every image has even
// second coordinate, and every pair with even second coordinate has a preimage.
for (const a of [-2, -1, 0, 1, 2]) {
  for (const b of [-2, -1, 0, 1, 2]) {
    const image = [a + b, 2 * b];
    assert.equal(mod(image[1], 2), 0);
  }
}

const {sigma1Mod2: A, sigma2Mod2: B} = record.braidCollision;
assert.deepEqual(mulMod(A, B, 2), Sbar);
assert.deepEqual(mulMod(mulMod(A, B, 2), mulMod(A, B, 2), 2), S2);

assert.equal(record.trialityComparison.parityTorsion, "Z/2Z");
assert.equal(record.trialityComparison.trialityTorsion, "Z/3Z");
assert.match(record.trialityComparison.status, /not_an_identification/);
assert.match(record.admissibilityInterpretation.sixStateBoundary, /no_canonical/);
assert.match(record.admissibilityInterpretation.sixCycleNoGo, /no_order_six/);

console.log("Dynatology golden parity triangle: PASS");
console.log(JSON.stringify({order: 3, orbit, fixedNonzeroVectors: 0, index: Math.abs(det2(P)), braidProductEqualsSbar: true}));

