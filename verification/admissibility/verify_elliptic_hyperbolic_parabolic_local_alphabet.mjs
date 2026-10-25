import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/admissibility-elliptic-hyperbolic-parabolic-number-algebra-v1.json", root), "utf8"));
const document = readFileSync(new URL("corpus/programmes/admissibility/admissibility_129_elliptic_hyperbolic_parabolic_local_alphabet.md", root), "utf8");

const I = [[1, 0], [0, 1]];
const Omega = [[0, 1], [-1, 0]];
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((value, j) => value + B[i][j]));
const scale = (s, A) => A.map(row => row.map(value => s * value));
const determinant = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const maxError = (A, B) => Math.max(...A.flatMap((row, i) => row.map((value, j) => Math.abs(value - B[i][j]))));
const X = kappa => [[0, kappa], [1, 0]];

function exponential(kappa, t) {
  if (kappa === -1) return add(scale(Math.cos(t), I), scale(Math.sin(t), X(kappa)));
  if (kappa === 1) return add(scale(Math.cosh(t), I), scale(Math.sinh(t), X(kappa)));
  return add(I, scale(t, X(kappa)));
}

for (const kappa of [-1, 0, 1]) {
  const generator = X(kappa);
  assert.ok(maxError(multiply(generator, generator), scale(kappa, I)) < 1e-12);
  assert.ok(maxError(add(multiply(transpose(generator), Omega), multiply(Omega, generator)), [[0, 0], [0, 0]]) < 1e-12);
  for (const t of [0.17, 0.71, 1.23]) {
    const flow = exponential(kappa, t);
    assert.ok(maxError(multiply(multiply(transpose(flow), Omega), flow), Omega) < 1e-12);
    assert.ok(Math.abs(determinant(flow) - 1) < 1e-12);
  }

  const t = 1e-3;
  const flow = exponential(kappa, t);
  const traceCurvature = (flow[0][0] + flow[1][1] - 2) / (t * t);
  assert.ok(Math.abs(traceCurvature - kappa) < 1e-6);
}

const mirror = X(1);
assert.equal(determinant(mirror), -1);
assert.ok(maxError(multiply(multiply(transpose(mirror), Omega), mirror), scale(-1, Omega)) < 1e-12);
assert.ok(maxError(multiply(mirror, mirror), I) < 1e-12);

const ePlus = scale(0.5, add(I, mirror));
const eMinus = scale(0.5, add(I, scale(-1, mirror)));
assert.ok(maxError(multiply(ePlus, ePlus), ePlus) < 1e-12);
assert.ok(maxError(multiply(eMinus, eMinus), eMinus) < 1e-12);
assert.ok(maxError(multiply(ePlus, eMinus), [[0, 0], [0, 0]]) < 1e-12);

const nilpotent = X(0);
assert.ok(maxError(multiply(nilpotent, nilpotent), [[0, 0], [0, 0]]) < 1e-12);

assert.equal(evidence.packet, "AZ-129");
assert.equal(evidence.branches.length, 3);
assert.equal(evidence.boundaries.physicalBranchSelected, false);
assert.equal(evidence.boundaries.spacetimeWickRotationDerived, false);
assert.equal(evidence.separatingRecord.shortTimeLimit, "lim_{t->0} D_kappa(t) = kappa");

for (const required of [
  "A_\\kappa=\\mathbb R[u]/(u^2-\\kappa)",
  "the mirror swap is not the boost, but it generates the boost",
  "Split-complex rails",
  "Dual numbers are the infinitesimal seam",
  "The parabolic interface",
  "The smallest separating record",
  "Physical and semantic firewall"
]) assert.ok(document.includes(required), `missing required local-alphabet text: ${required}`);

console.log(JSON.stringify({
  result: "pass",
  packet: evidence.packet,
  branches: evidence.branches.map(branch => `${branch.name}:${branch.orbitType}`),
  mirrorDiscreteDeterminant: determinant(mirror),
  nextGate: evidence.nextGate
}, null, 2));
