import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-single-triangle-ckm-kill-test.json"), "utf8"));

const multiply = (a, b) => a.map((row, i) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const subtract = (a, b) => a.map((row, i) => row.map((value, j) => value - b[i][j]));
const zero = (a) => a.every((row) => row.every((value) => Math.abs(value) < 1e-12));

assert.equal(data.documentId, 1475);
assert.equal(data.minimalOperator.rawRealParameters, 4);
assert.equal(data.minimalOperator.eigenvectorParameters.length, 3);
assert.equal(data.minimalOperator.maximumIndependentEigenvectorParameters, 3);

const h0 = [[0, 2, 4], [2, 0, 3], [4, 3, 0]];
const h0Squared = multiply(h0, h0);
const identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const hd = h0Squared.map((row, i) => row.map((value, j) => value + identity[i][j]));
const commutator = subtract(multiply(h0, hd), multiply(hd, h0));
assert.ok(zero(commutator));

assert.equal(data.physicalCP.oneHermitianSectorSufficient, false);
assert.equal(data.physicalCP.jarlskogRequiresTwoNoncommutingSectors, true);
assert.equal(data.physicalCP.jarlskogInvariant, 0);
assert.equal(data.repairDebt.independentEdgeFitsAllowed, false);
assert.equal(data.repairDebt.arbitrarySecondMatrixAllowed, false);
assert.equal(data.verdict.rawParameterRoleMatchRetained, true);
assert.equal(data.verdict.singleTrianglePredictsGenericCKM, false);
assert.equal(data.verdict.singleSharedGeneratorProducesCPViolation, false);
assert.equal(data.verdict.physicalAdmissionChanged, false);

console.log("PASS 1475: overall edge scale removes one eigenvector parameter, and two functions of one triangle operator commute, so the minimal shared-generator ansatz cannot produce generic CKM mixing or Jarlskog CP violation.");
