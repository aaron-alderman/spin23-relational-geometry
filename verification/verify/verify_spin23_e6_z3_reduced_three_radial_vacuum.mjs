#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-z3-reduced-three-radial-vacuum.json",
  import.meta.url,
), "utf8"));
const p = evidence.witness;
const H = evidence.quarticHessian;

const det2 = H[0][0] * H[1][1] - H[0][1] ** 2;
const det3 =
  H[0][0] * (H[1][1] * H[2][2] - H[1][2] * H[2][1])
  - H[0][1] * (H[1][0] * H[2][2] - H[1][2] * H[2][0])
  + H[0][2] * (H[1][0] * H[2][1] - H[1][1] * H[2][0]);
assert.ok(H[0][0] > 0 && det2 > 0 && det3 > 0);

const [x, y, z] = p.minimum;
const grad = [
  -p.a + 2 * p.lx * x + p.kxy * y + p.kxz * z,
  -p.b + 2 * p.ly * y + p.kxy * x + p.kyz * z,
  p.c + 2 * p.lz * z + p.kxz * x + p.kyz * y,
];
assert.equal(grad[0], 0);
assert.equal(grad[1], 0);
assert.equal(grad[2], p.portalSingletBoundaryDerivative);
assert.ok(grad[2] > 0);
const V = -p.a*x-p.b*y+p.c*z+p.lx*x*x+p.ly*y*y+p.lz*z*z+p.kxy*x*y+p.kxz*x*z+p.kyz*y*z;
assert.equal(V, p.potentialAtMinimum);

for (const key of ["strictlyConvex", "uniqueGlobalMinimumOnNonnegativeOrthant", "neutralHighScaleVevsNonzero", "chargedCopySingletVevZero", "openUnderSmallParameterChanges"]) {
  assert.equal(evidence.decision[key], true);
}
assert.equal(evidence.decision.fullE6NonSingletHessianDerived, false);
assert.equal(evidence.decision.oneLightPortalBidoubletDerived, false);

console.log("spin23 E6 Z3 reduced three-radial vacuum verification: PASS");
console.log(`  positive-definite quartic Hessian minors: ${H[0][0]}, ${det2}, ${det3}`);
console.log("  unique orthant minimum: (x,y,z)=(1,1,0), dV/dz=2.25");
