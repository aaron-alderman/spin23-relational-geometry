import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const audit = JSON.parse(readFileSync(join(root, "evidence", "data", "spin23-final-wave-red-team-audit.json"), "utf8"));

assert.equal(audit.schema, "spin23.final-wave-red-team-audit/1");
assert.equal(audit.documentId, 1398);
assert.equal(audit.overallVerdict.physicalAdmission, false);
assert.equal(audit.findings.length, 16);
assert.deepEqual(audit.overallVerdict.highestRiskDocuments, [1291, 1394]);

const ids = new Set(audit.findings.map(x => x.id));
assert.equal(ids.size, audit.findings.length);
for (const finding of audit.findings) {
  assert(finding.documents.length > 0);
  assert(finding.currentClaim.length > 20);
  assert(finding.refereeResult.length > 20);
  assert(finding.requiredAction.length > 20);
  assert(finding.verifierAssessment.length > 20);
}

const reviewed = new Set(audit.findings.flatMap(x => x.documents));
for (const id of audit.scope) assert(reviewed.has(id), "document " + id + " is not covered by a finding");

for (const id of audit.scope) {
  const band = id < 1300 ? "1200-1299" : "1300-1399";
  const dir = join(root, "corpus", "claims", band);
  const found = readdirSync(dir).some(name => name.startsWith(id + "_"));
  assert(found, "reviewed document " + id + " is missing");
}

// RT-01: conjugate-linearity changes the pseudoscalar sign twice.
const z = { re: 2.0, im: 3.0 }; // A
const adjoint = q => ({ re: q.re, im: -q.im });
const scalar = q => 2 * q.re;                 // A + A-dagger
const pseudoscalar = q => -2 * q.im;          // i(A - A-dagger)
const thetaA = adjoint(z);                    // Theta A Theta^-1 = A-dagger
const thetaScalar = scalar(thetaA);
// Antiunitarity supplies an additional minus on i.
const thetaPseudoscalar = -pseudoscalar(thetaA);
assert.equal(thetaScalar, scalar(z));
assert.equal(thetaPseudoscalar, pseudoscalar(z));

// RT-02: square finite maps have index zero, but rectangular maps need not.
const rank = matrix => {
  const a = matrix.map(row => row.map(Number));
  let r = 0;
  for (let c = 0; c < (a[0]?.length ?? 0) && r < a.length; c++) {
    const p = a.findIndex((row, i) => i >= r && Math.abs(row[c]) > 1e-12);
    if (p < 0) continue;
    [a[r], a[p]] = [a[p], a[r]];
    const pivot = a[r][c];
    for (let j = c; j < a[r].length; j++) a[r][j] /= pivot;
    for (let i = 0; i < a.length; i++) if (i !== r) {
      const f = a[i][c];
      for (let j = c; j < a[i].length; j++) a[i][j] -= f * a[r][j];
    }
    r++;
  }
  return r;
};
const indexOfFiniteMap = matrix => {
  const codomain = matrix.length;
  const domain = matrix[0].length;
  const r = rank(matrix);
  return (domain - r) - (codomain - r);
};
assert.equal(indexOfFiniteMap([[1, 0], [0, 0]]), 0);
assert.equal(indexOfFiniteMap([[1, 0, 0], [0, 1, 0]]), 1);

// RT-04: a tanh kink is not exactly at its asymptotic vacuum on a finite slab.
const u = 1;
const mu = 1;
const L = 6;
const endpoint = u * Math.tanh(mu * L);
assert(endpoint < u);
assert(u - endpoint > 0);
assert(u - endpoint < 2e-5); // controlled, but not exact

const requiredActions = new Map(audit.findings.map(x => [x.id, x.requiredAction]));
assert(requiredActions.get("RT-01").includes("superseded"));
assert(requiredActions.get("RT-02").includes("finite square"));
assert(requiredActions.get("RT-04").includes("boundary conditions"));

assert.equal(audit.independentStoppingBoundaries.length, 4);
assert.deepEqual(audit.independentStoppingBoundaries.map(x => x.gate), ["A5", "A6", "A7", "A11"]);

console.log(JSON.stringify({
  passed: true,
  reviewedDocuments: audit.scope.length,
  findings: audit.findings.length,
  materialCorrections: audit.overallVerdict.materialCorrections,
  independentStoppingBoundaries: audit.independentStoppingBoundaries.map(x => x.gate)
}, null, 2));
