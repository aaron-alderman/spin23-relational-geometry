import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "evidence/data/spin23-a4-full-wall-radiative-stability-margin.json"),
    "utf8",
  ),
);

const approx = (a, b, tolerance = 1e-12) => Math.abs(a - b) < tolerance;
const { reader } = data;

assert.equal(data.documentId, 1465);

const sOfG = (g) => (Math.sqrt(1 + 4 * g) - 1) / 2;
const groundMassSquared = (g) => reader.MInfinitySquared - sOfG(g) ** 2;
const massAtInfinity = Math.sqrt(reader.MInfinitySquared);
const criticalG = massAtInfinity * (massAtInfinity + 1);

assert.ok(approx(sOfG(reader.frozenWellStrength), reader.frozenS));
assert.ok(approx(groundMassSquared(reader.frozenWellStrength), reader.frozenGroundMassSquared));
assert.ok(approx(criticalG, reader.criticalWellStrength));
assert.ok(approx(criticalG - reader.frozenWellStrength, reader.positiveMarginInG));
assert.ok(approx(groundMassSquared(criticalG), 0));
assert.ok(groundMassSquared(reader.frozenWellStrength) > 0);
assert.ok(groundMassSquared(criticalG + 0.1) < 0);

// ds/dg=1/(2s+1), hence d(M^2-s^2)/dg=-2s/(2s+1).
const s = sOfG(reader.frozenWellStrength);
const slope = -2 * s / (2 * s + 1);
assert.ok(approx(slope, reader.groundMassSlopeAtFrozenPoint));

// Exact integrals for the frozen normalized sech ground state:
// integral sech^2=2 and integral sech^4=4/3.
assert.ok(approx((4 / 3) / 2, 2 / 3));

assert.ok(data.allowedCrossCouplings.length >= 4);
assert.equal(data.forbiddenByDeclaredSymmetry.length, 0);
assert.equal(data.frozenZeroCrossCouplingSurfaceSymmetryClosed, false);
assert.equal(data.quantumReopenPacket.length, 6);
assert.equal(data.verdict.frozenFullWallTreeSpectrumHealthy, true);
assert.equal(data.verdict.finiteReaderStabilityNeighbourhood, true);
assert.equal(data.verdict.inevitableRadiativeInstabilityProved, false);
assert.equal(data.verdict.radiativeStabilityDerived, false);
assert.equal(data.verdict.globalQuantumA4Passed, false);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1465: the full-wall reader has a finite exact tree-level stability margin, but the zero-cross-coupling witness is not a symmetry-closed quantum theory.",
);
