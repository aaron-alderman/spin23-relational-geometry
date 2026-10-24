import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-furey-linear-versus-antiunitary-dynamics-v1.json"), "utf8"));

const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const equal = (A, B) => A.every((row, i) => row.every((x, j) => x === B[i][j]));
const I4 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const Z4 = Array.from({ length: 4 }, () => Array(4).fill(0));
const F = [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]];
const p = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, -1]];
const G = multiply(F, p);
assert.ok(equal(transpose(G), scale(-1, G)));
assert.ok(equal(multiply(G, G), scale(-1, I4)));
assert.ok(equal(multiply(transpose(G), G), I4));

const block = (A, B, C, D) => [
  [...A[0], ...B[0]], [...A[1], ...B[1]], [...A[2], ...B[2]], [...A[3], ...B[3]],
  [...C[0], ...D[0]], [...C[1], ...D[1]], [...C[2], ...D[2]], [...C[3], ...D[3]]
];
const gammaR = block(G, Z4, Z4, scale(-1, G));
const I8 = Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => Number(i === j)));
assert.ok(equal(transpose(gammaR), scale(-1, gammaR)));
assert.ok(equal(multiply(gammaR, gammaR), scale(-1, I8)));
assert.ok(equal(multiply(transpose(gammaR), gammaR), I8));

const originalComplexStructure = block(Z4, scale(-1, I4), I4, Z4);
assert.ok(equal(multiply(gammaR, originalComplexStructure), scale(-1, multiply(originalComplexStructure, gammaR))));

const z = { re: [1, 2, -1, 3], im: [2, -2, 1, 0] };
const applyGamma = ({ re, im }) => ({
  re: G.map((row) => row.reduce((sum, x, i) => sum + x * re[i], 0)),
  im: G.map((row) => row.reduce((sum, x, i) => sum - x * im[i], 0))
});
const iz = { re: z.im.map((x) => -x), im: [...z.re] };
const gammaZ = applyGamma(z);
const gammaIZ = applyGamma(iz);
const minusIGammaZ = { re: [...gammaZ.im], im: gammaZ.re.map((x) => -x) };
assert.deepEqual(gammaIZ, minusIGammaZ);

assert.equal(certificate.protocol, "admissibility-furey-linear-versus-antiunitary-dynamics/1");
assert.equal(certificate.status.sameComplexHamiltonianCanGenerateBoth, false);
assert.equal(certificate.status.realDoubledLiftExists, true);
assert.equal(certificate.status.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  linearGenerator: { skew: true, square: "-I4", complexLinearFlow: true },
  antiunitaryEdge: { conjugateLinear: true, square: "-I4" },
  ordinaryComplexHamiltonianNoGo: true,
  realification: { dimension: 8, skew: true, square: "-I8", orthogonalQuarterTurn: true },
  originalComplexStructure: "ANTICOMMUTES",
  physicalNambuOrBoundaryRealization: "OPEN"
}));
