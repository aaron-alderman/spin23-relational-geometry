import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-o3-sewing-length-three-defect-cokernel.json"), "utf8"));

const h0 = (n) => Math.max(n + 1, 0);
const evaluate = ([a, b, c, d], z0, z1) => a * z0 ** 3 + b * z0 ** 2 * z1 + c * z0 * z1 ** 2 + d * z1 ** 3;

assert.equal(data.documentId, 1472);
assert.equal(h0(0), data.section.h0Domain);
assert.equal(h0(3), data.section.h0Codomain);
assert.equal(data.section.nonzeroMultiplicationRank, 1);
assert.equal(data.section.h0Codomain - data.section.nonzeroMultiplicationRank, data.section.globalCokernelDimension);
assert.equal(data.section.globalCokernelDimension, data.section.zeroSchemeLength);
assert.equal(data.section.zeroSchemeLength, data.section.bundleDegree);

const coeffs = data.explicitCubic.coefficients;
assert.equal(evaluate(coeffs, 0, 1), 0);
assert.equal(evaluate(coeffs, 1, 0), 0);
assert.equal(evaluate(coeffs, 1, 1), 0);
assert.equal(data.explicitCubic.localFiberDimensions.reduce((a, b) => a + b, 0), 3);
for (const partition of data.allowedMultiplicityPartitions) assert.equal(partition.reduce((a, b) => a + b, 0), 3);

assert.equal(data.physicalBoundary.exactLocalizedAlgebraicDegrees, 3);
assert.equal(data.physicalBoundary.physicalFermionZeroModesDerived, false);
assert.equal(data.physicalBoundary.diracSuperconnectionKernelRequired, true);
assert.equal(data.physicalAdmissionChanged, false);

console.log("PASS 1472: nonzero O(3) sewing has a length-three cokernel; the explicit cubic has three simple projective zeros and three algebraic defect fibers, without yet implying physical families.");
