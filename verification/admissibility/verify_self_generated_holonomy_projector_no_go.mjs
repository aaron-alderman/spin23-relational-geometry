import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-self-generated-holonomy-projector-no-go-v1.json"), "utf8"));

const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const equal = (A, B, tolerance = 1e-10) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tolerance));
const outer = (u, v) => u.map((x) => v.map((y) => x * y));
const apply = (A, v) => A.map((row) => row.reduce((sum, x, i) => sum + x * v[i], 0));
const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

const normalize = (v) => {
  const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
  return v.map((x) => x / norm);
};
const crossMatrix = ([x, y, z]) => [[0, -z, y], [z, 0, -x], [-y, x, 0]];
const holonomy = (n, phi) => {
  const P = outer(n, n);
  const Q = add(I3, scale(-1, P));
  return add(add(P, scale(Math.cos(phi), Q)), scale(Math.sin(phi), crossMatrix(n)));
};

for (const raw of [[1, 0, 0], [1, 2, 3], [-2, 1, 4], [0.1, -0.7, 0.2]]) {
  const n = normalize(raw);
  const P = outer(n, n);
  const Hq = holonomy(n, Math.PI / 2);
  const HqReverse = holonomy(n.map((x) => -x), Math.PI / 2);
  assert.ok(equal(apply(Hq, n).map((x) => [x]), n.map((x) => [x])));
  assert.ok(equal(multiply(transpose(Hq), Hq), I3));
  assert.ok(equal(HqReverse, transpose(Hq)));

  const Hhalf = holonomy(n, Math.PI);
  assert.ok(equal(Hhalf, add(scale(2, P), scale(-1, I3))));
  assert.ok(equal(multiply(Hhalf, Hhalf), I3));
  const recoveredP = scale(0.5, add(I3, Hhalf));
  assert.ok(equal(recoveredP, P));
}

// The exact return map is identity, so its finite-difference tangent derivative is one.
const theta = 0.37;
const epsilon = 1e-6;
const projectorPath = (t) => {
  const n = [Math.cos(t), Math.sin(t), 0];
  return outer(n, n);
};
const returnMap = (P) => {
  const H = add(scale(2, P), scale(-1, I3));
  return scale(0.5, add(I3, H));
};
const Pminus = projectorPath(theta - epsilon);
const Pplus = projectorPath(theta + epsilon);
const derivativeInput = scale(1 / (2 * epsilon), add(Pplus, scale(-1, Pminus)));
const derivativeOutput = scale(1 / (2 * epsilon), add(returnMap(Pplus), scale(-1, returnMap(Pminus))));
assert.ok(equal(derivativeInput, derivativeOutput, 1e-8));

assert.equal(certificate.protocol, "admissibility-self-generated-holonomy-projector-no-go/1");
assert.equal(certificate.status.selfConsistentFixedPointsExist, true);
assert.equal(certificate.status.allProjectorsFixed, true);
assert.equal(certificate.status.uniqueAttractiveProjectorDerived, false);
assert.equal(certificate.status.secondRelationalDatumRequired, true);
assert.equal(certificate.status.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  directorDefinedHolonomy: "H_pi(P)=2P-I",
  quarterTurnNeedsOrientationLift: true,
  returnMap: "identity on RP2",
  tangentSpectralRadius: 1,
  topologyRole: "memory/protection, not unique selection",
  nextGate: "second relational datum"
}));

