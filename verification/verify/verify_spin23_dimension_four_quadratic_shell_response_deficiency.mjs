#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-dimension-four-quadratic-shell-response-deficiency-v1.json",
  import.meta.url,
),"utf8"));

const E=evidence.einsteinForm;
const C=evidence.cartanForm;
assert.equal(E.RR+E.nablaT_nablaT+E.R_nablaT,E.total);
assert.equal(E.total,14);
assert.equal(5-3,E.R_nablaT);
assert.equal(C.FF+C.DTDT+C.FDT,C.total);
assert.equal(C.total,14);
assert.equal(C.DTDT+C.FDT,C.outsideOrdinaryPgtCurvatureSquares);
assert.equal(E.total-evidence.topologicalQuotient.eulerDirections,evidence.topologicalQuotient.dimension);
assert.equal(evidence.knownQuadraticResponses.length,evidence.knownResponseRank);
assert.equal(evidence.topologicalQuotient.dimension-evidence.knownResponseRank,evidence.unresolvedQuadraticDimension);
assert.equal(
  evidence.minimalNewResponses.remainingDerivativeTorsion+evidence.minimalNewResponses.curvatureSingleTorsion,
  evidence.minimalNewResponses.total,
);
assert.equal(evidence.minimalNewResponses.total,9);
assert.equal(evidence.requiredBackgrounds.length,4);
assert.match(evidence.excludedFromQuadraticRank.xiR_xiRic,/cubic/);
assert.match(evidence.decision,/nine additional/);

console.log("Spin(2,3) dimension-four quadratic-shell deficiency: PASS");
console.log("  Einstein form: 3 RR + 9 DTDT + 2 RDT = 14");
console.log("  Cartan form: 6 FF + 4 DTDT + 4 FDT = 14");
console.log("  modulo Euler: dimension 13");
console.log("  known quadratic response rank: 4");
console.log("  minimum unresolved response directions: 9");
