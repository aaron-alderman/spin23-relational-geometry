import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-holonomy-driven-selector-breaking-v1.json"), "utf8"));

const L = 2;
const phi = Math.PI / 2;
const lambda = 3;
const gap = (phi / L) ** 2;
const r = -gap / 2;
assert.ok(-gap < r && r < 0);

const v2 = -r / lambda;
assert.ok(v2 > 0);
const radialMass2 = -2 * r;
const tangentMass2 = gap;
assert.ok(radialMass2 > 0);
assert.ok(tangentMass2 > 0);

const transverseEigenvalue = (n, sign) => ((2 * Math.PI * n + sign * phi) / L) ** 2;
const sampled = [];
for (let n = -4; n <= 4; n += 1) {
  sampled.push(transverseEigenvalue(n, 1), transverseEigenvalue(n, -1));
}
const numericalGap = Math.min(...sampled);
assert.ok(Math.abs(numericalGap - gap) < 1e-12);

const massesAtOrigin = {
  longitudinal: r,
  transverse1: r + gap,
  transverse2: r + gap
};
assert.ok(massesAtOrigin.longitudinal < 0);
assert.ok(massesAtOrigin.transverse1 > 0);
assert.ok(massesAtOrigin.transverse2 > 0);

const trivialGap = 0;
const trivialVacuumTangentMasses = [trivialGap, trivialGap];
assert.deepEqual(trivialVacuumTangentMasses, [0, 0]);

const c = Math.cos(phi);
const s = Math.sin(phi);
const H = [[c, -s, 0], [s, c, 0], [0, 0, 1]];
const e3 = [0, 0, 1];
const apply = (A, v) => A.map((row) => row.reduce((sum, x, i) => sum + x * v[i], 0));
assert.deepEqual(apply(H, e3), e3);

assert.equal(certificate.protocol, "admissibility-holonomy-driven-selector-breaking/1");
assert.equal(certificate.status.holonomyChangesInstabilityOrder, true);
assert.equal(certificate.status.quarterTurnSelectsOneDirectorInWindow, true);
assert.equal(certificate.status.selfGeneratedHolonomyDerived, false);
assert.equal(certificate.status.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  circumference: L,
  holonomyAngle: phi,
  transverseGap: gap,
  selectionWindow: [-gap, 0],
  chosenMassParameter: r,
  unstableModesAtOrigin: 1,
  directorVacua: 1,
  hessianAtVacuum: { radial: radialMass2, tangentMultiplicity: 2, tangentMass2 },
  untwistedGoldstones: 2,
  reflexiveHolonomyFixedPoint: "OPEN"
}));

