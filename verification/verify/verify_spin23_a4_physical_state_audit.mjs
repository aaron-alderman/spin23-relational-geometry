import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..", "..");
const auditPath = join(repositoryRoot, "evidence", "data", "spin23-a4-physical-state-audit.json");
const audit = JSON.parse(readFileSync(auditPath, "utf8"));

function resolveDeclaredSource(source) {
  if (source.startsWith("spin23-action-pilot/")) {
    return join(repositoryRoot, "corpus", "programmes", "closure", source);
  }
  const match = /^(\d+)_/.exec(source);
  if (match) {
    const lower = Math.floor(Number(match[1]) / 100) * 100;
    const range = `${String(lower).padStart(4, "0")}-${String(lower + 99).padStart(4, "0")}`;
    return join(repositoryRoot, "corpus", "claims", range, source);
  }
  return join(repositoryRoot, source);
}

assert.equal(audit.schema, "spin23.a4-physical-state-audit/1");
assert.equal(audit.candidateId, "spin23-effective-closure-action-v1");
for (const source of audit.sources) {
  assert(existsSync(resolveDeclaredSource(source)), `missing source: ${source}`);
}

assert.equal(audit.claimBoundary.a4Passed, false);
assert.equal(audit.claimBoundary.physicalAdmission, false);
assert.equal(audit.claimBoundary.literalTwoTimeTheoryCertified, false);
assert.equal(audit.claimBoundary.responseGeometryAddsSpacetimeDegreesOfFreedom, false);
assert.equal(audit.informationDeficit.verdict, "exactly-underdetermined");
assert(audit.informationDeficit.missing.length >= 8);

function eigenvalues2x2([[a, b], [c, d]]) {
  assert.equal(b, c, "matrix must be symmetric");
  const center = (a + d) / 2;
  const radius = Math.sqrt(((a - d) / 2) ** 2 + b * b);
  return [center - radius, center + radius];
}

function kineticMatrix({ gY, eX, chi }) {
  return [[1 / gY ** 2, chi], [chi, 1 / eX ** 2]];
}

for (const label of ["healthy", "ghostly"]) {
  const witness = audit.informationDeficit.witnessPair[label];
  const actual = eigenvalues2x2(kineticMatrix(witness));
  assert(actual.every((value, index) => Math.abs(value - witness.eigenvalues[index]) < 1e-12));
}
assert(audit.informationDeficit.witnessPair.healthy.eigenvalues.every((x) => x > 0));
assert(audit.informationDeficit.witnessPair.ghostly.eigenvalues.some((x) => x < 0));

// Exact Sylvester criterion for the declared two-Abelian kinetic block.
function abelianKineticHealthy({ gY, eX, chi }) {
  return gY ** 2 > 0
    && eX ** 2 > 0
    && 1 / (gY ** 2 * eX ** 2) - chi ** 2 > 0;
}
assert.equal(abelianKineticHealthy(audit.informationDeficit.witnessPair.healthy), true);
assert.equal(abelianKineticHealthy(audit.informationDeficit.witnessPair.ghostly), false);

// The simplest literal two-time scalar has a tachyonic 3+1 mode above threshold.
function effectiveMassSquared(mass, secondTimeFrequency) {
  return mass ** 2 - secondTimeFrequency ** 2;
}
assert.equal(effectiveMassSquared(0, 1), -1);
assert(effectiveMassSquared(2, 3) < 0);
assert(effectiveMassSquared(3, 2) > 0);

// The displayed flavon potential has a healthy broken radial mode only in its
// declared positive-coupling region.
function flavonBrokenVacuum(muSquared, lambda) {
  if (!(muSquared > 0 && lambda > 0)) return null;
  return { vSquared: muSquared / lambda, radialMassSquared: 2 * muSquared };
}
assert.deepEqual(flavonBrokenVacuum(2, 0.5), { vSquared: 4, radialMassSquared: 4 });
assert.equal(flavonBrokenVacuum(2, -0.5), null);

const sectorResults = new Map(audit.maximalDeclaredQuadraticSubsector.map((x) => [x.sector, x]));
assert.equal(sectorResults.size, audit.maximalDeclaredQuadraticSubsector.length);
assert.equal(sectorResults.get("U1Y-U1X gauge kinetic block").localResult, "conditional-pass");
assert.match(sectorResults.get("four-dimensional level-three BF limit").localResult, /boundary-blocked/u);
assert.match(sectorResults.get("projector CP2 tangent modes").localResult, /potential-blocked/u);

assert.equal(audit.gateVerdict.gate, "A4");
assert.equal(audit.gateVerdict.status, "blocked");
assert.equal(audit.gateVerdict.literalTwoTimeSubbranch, "fails-naive-realization");
assert.equal(audit.gateVerdict.recommendedOntology, "response-geometry");
assert(audit.gateVerdict.minimumRepair.length >= 7);
assert.match(audit.gateVerdict.minimalStopEverythingFalsifier, /negative residue/u);
assert.match(audit.gateVerdict.minimalStopEverythingFalsifier, /second-time/u);

console.log(JSON.stringify({
  passed: true,
  auditId: audit.auditId,
  gate: audit.gateVerdict.gate,
  status: audit.gateVerdict.status,
  literalTwoTimeSubbranch: audit.gateVerdict.literalTwoTimeSubbranch,
  recommendedOntology: audit.gateVerdict.recommendedOntology,
  auditedSectors: audit.maximalDeclaredQuadraticSubsector.length,
  missingInformationItems: audit.informationDeficit.missing.length,
  physicalAdmission: audit.claimBoundary.physicalAdmission
}, null, 2));
