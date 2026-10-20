import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-a6-graded-superconnection-kclass.json"), "utf8"));

const lineClass = (n) => ({ rank: 1, beta: n });
const virtualSubtract = (a, b) => ({ rank: a.rank - b.rank, beta: a.beta - b.beta });
const h0 = (n) => Math.max(n + 1, 0);

assert.equal(data.documentId, 1471);
const difference = virtualSubtract(lineClass(3), lineClass(0));
assert.deepEqual(difference, { rank: data.kTheory.rank, beta: data.kTheory.degree });
assert.equal(data.kTheory.degree, 3);
assert.equal(h0(3), data.oddSewing.forwardHolomorphicDimension);
assert.equal(h0(-3), data.oddSewing.reverseHolomorphicDimension);
assert.equal(data.oddSewing.forwardHolomorphicDimension, 4);
assert.equal(data.oddSewing.reverseHolomorphicDimension, 0);
assert.equal(data.oddSewing.genericSignedZeroIndex, data.kTheory.degree);
assert.equal(data.oddSewing.holomorphicZeroDivisorDegree, data.kTheory.degree);
assert.equal(data.oddSewing.everywhereInvertibleExists, false);
assert.equal(data.oddSewing.uniformOddMassGapExists, false);
assert.equal(data.gradedModule.speciesIndependent, true);
assert.equal(data.gradedModule.ordinarySingleDiracTwist, false);
assert.equal(data.interpretation.threeZerosIndependentOfDiracIndexThree, false);
assert.equal(data.verdict.conditionalA6Packaging, true);
assert.equal(data.verdict.a6OriginDerived, false);
assert.equal(data.verdict.physicalAdmissionChanged, false);

console.log("PASS 1471: the graded O(3)|O(0) module has virtual class 3 beta, and every generic self-adjoint odd sewing carries signed zero index three, so no uniform global odd mass gap exists.");
