import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const packet = JSON.parse(readFileSync(join(root, "evidence", "data", "spin23-a4-maximal-physical-state-packet.json"), "utf8"));
assert.equal(packet.schema, "spin23.a4-maximal-physical-state-packet/1");
assert.equal(packet.documentId, 1451);
assert.equal(packet.verdict.a4Status, "blocked");
assert.equal(packet.verdict.physicalAdmission, false);

const p = packet.parameters;
const approx = (a, b, tol = 1e-11) => Math.abs(a - b) < tol;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const mv = (A, v) => A.map(row => dot(row, v));
const eigen2 = ([[a, b], [, d]]) => {
  const c = (a + d) / 2;
  const r = Math.hypot((a - d) / 2, b);
  return [c - r, c + r];
};

// Recompute the bosonic 1290 point.
const abelianKineticEigenvalues = [1 - p.kineticMixingChi, 1 + p.kineticMixingChi];
assert(abelianKineticEigenvalues.every(x => x > 0));
const denom = 1 - p.kineticMixingChi ** 2;
const Kinv = [
  [1, 0, 0],
  [0, 1 / denom, -p.kineticMixingChi / denom],
  [0, -p.kineticMixingChi / denom, 1 / denom]
];
const qH = [-p.g * p.vH / 2, p.gY * p.vH / 2, -p.gX * p.vH];
const qS = [0, 0, 3 * p.gX * p.vS];
const gram = [qH, qS].map(x => [qH, qS].map(y => dot(x, mv(Kinv, y))));
const neutralMassSquared = [0, ...eigen2(gram)];
assert(neutralMassSquared.every((x, i) => approx(x, packet.computedPoles.neutralGaugeMassSquared[i])));
assert(neutralMassSquared.every(x => x >= 0));
assert(approx((p.g * p.vH / 2) ** 2, packet.computedPoles.chargedGaugeMassSquared));

const radial = [
  [2 * p.lambdaH * p.vH ** 2, p.lambdaHS * p.vH * p.vS],
  [p.lambdaHS * p.vH * p.vS, 2 * p.lambdaS * p.vS ** 2]
];
const radialMassSquared = eigen2(radial);
assert(radialMassSquared.every((x, i) => approx(x, packet.computedPoles.radialScalarMassSquared[i])));
assert(radialMassSquared.every(x => x > 0));
const projectorMassSquared = p.projectorReferenceEigenvalues.slice(1)
  .map(x => 2 * p.projectorKappa * x ** 2 / p.fP ** 2);
assert.deepEqual(projectorMassSquared, packet.computedPoles.projectorComplexModeMassSquared);

// Recompute the exact infinite-cover Pöschl-Teller pole data.
const muSquared = p.wallMu ** 2;
assert(approx(p.wallMu, p.wallU * Math.sqrt(p.wallLambda / 2)));
assert.equal(packet.computedPoles.wallInfiniteCover.translationMassSquared, 0);
assert(approx(packet.computedPoles.wallInfiniteCover.shapeMassSquared, 3 * muSquared));
assert(approx(packet.computedPoles.wallInfiniteCover.continuumThresholdSquared, 4 * muSquared));
assert(approx(p.readerWellCoupling * p.wallU ** 2, 2 * muSquared));
assert(approx(packet.computedPoles.readerInfiniteCover.boundMassSquared, p.readerMInfinitySquared - muSquared));
assert(approx(packet.computedPoles.readerInfiniteCover.continuumThresholdSquared, p.readerMInfinitySquared));
assert(packet.computedPoles.readerInfiniteCover.boundMassSquared > 0);

// Bulk fermion pole witness: charged masses and diagonal seesaw singular masses.
const scale = p.vH / Math.sqrt(2);
const y = packet.fermionFixture.effectivePostFlavonDiagonalYukawas;
const chargedFermionMasses = [...y.up, ...y.down, ...y.chargedLepton].map(x => x * scale);
assert(chargedFermionMasses.every(x => x > 0));
const neutrinoPolePairs = y.neutrinoDirac.map((yn, i) => {
  const md = yn * scale;
  const M = packet.fermionFixture.sterileMajoranaMasses[i];
  const root = Math.sqrt(M ** 2 + 4 * md ** 2);
  return [(root - M) / 2, (root + M) / 2];
});
assert(neutrinoPolePairs.flat().every(x => x > 0));
assert.equal(packet.fermionFixture.canonicalKineticResidue, 1);

// Explicit Pin/chirality algebra behind the fermionic fold obstruction.
const zero4 = () => Array.from({ length: 4 }, () => Array(4).fill(0));
const mm = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const eq = (A, B) => A.every((row, i) => row.every((x, j) => approx(x, B[i][j])));
const gamma5 = [
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];
const gammaY = [
  [0, 0, 1, 0],
  [0, 0, 0, -1],
  [-1, 0, 0, 0],
  [0, 1, 0, 0]
];
const PL = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
const PR = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];
assert(eq(add(mm(gamma5, gammaY), mm(gammaY, gamma5)), zero4()));
assert(eq(mm(PL, gammaY), mm(gammaY, PR)));
assert(eq(mm(mm(PL, gammaY), PL), zero4()));
assert.equal(packet.fermionDomainObstruction.status, "unresolved, not a demonstrated ghost");

// Ensure the report does not turn missing domains into a false positivity claim.
assert.equal(packet.verdict.negativeNormStateFound, false);
assert.equal(packet.verdict.negativeResidueFound, false);
assert.equal(packet.verdict.completePhysicalStateActionFrozen, false);
assert.equal(packet.gaugeFixingAndBrst.globalBoundaryCohomology.startsWith("undefined"), true);
assert(packet.externalDataRemaining.length >= 7);
assert.equal(packet.formulationRule.rule.includes("not summed"), true);

console.log(JSON.stringify({
  passed: true,
  documentId: packet.documentId,
  abelianKineticEigenvalues,
  neutralMassSquared,
  radialMassSquared,
  projectorMassSquared,
  wallShapeMassSquared: packet.computedPoles.wallInfiniteCover.shapeMassSquared,
  readerBoundMassSquared: packet.computedPoles.readerInfiniteCover.boundMassSquared,
  chargedFermionMassRange: [Math.min(...chargedFermionMasses), Math.max(...chargedFermionMasses)],
  neutrinoPolePairs,
  pinReflectionFlipsChirality: true,
  completePhysicalStateActionFrozen: packet.verdict.completePhysicalStateActionFrozen,
  a4Status: packet.verdict.a4Status
}, null, 2));
