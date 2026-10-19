import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");
const ledger = JSON.parse(readFileSync(join(root, "evidence", "data", "spin23-a7-classical-stress-ledger.json"), "utf8"));

assert.equal(ledger.schema, "spin23.a7-classical-stress-ledger/1");
assert.equal(ledger.gate, "A7");
assert.equal(ledger.terms.length, 10);

const byId = new Map(ledger.terms.map((term) => [term.id, term]));
for (const id of ["u1x-maxwell", "abelian-kinetic-mixing", "charge-three-flavon", "projector-sigma-model", "fermion"]) {
  assert.equal(byId.get(id).metricDependent, true);
  assert.equal(byId.get(id).classicalStressDefined, true);
}
for (const id of ["four-dimensional-bf", "three-dimensional-mutual-bf"]) {
  assert.equal(byId.get(id).metricDependent, false);
  assert.equal(byId.get(id).classicalHilbertStressZero, true);
}
assert.equal(byId.get("u1x-maxwell").holonomySensitiveOnFlatConnection, false);
assert.equal(byId.get("charge-three-flavon").improvementAmbiguity, true);
assert(ledger.unresolvedQuantumData.includes("two normalized physical probes"));
assert.equal(ledger.verdict.classicalTensorForm, "conditional-construction");
assert.equal(ledger.verdict.renormalizedPhysicalOperator, "missing");
assert.equal(ledger.verdict.a7Passed, false);
assert.equal(ledger.verdict.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  schema: ledger.schema,
  termCount: ledger.terms.length,
  metricDependentTerms: ledger.terms.filter((term) => term.metricDependent).length,
  pureTopologicalStresslessTerms: ledger.terms.filter((term) => term.classicalHilbertStressZero).length,
  unresolvedQuantumDatumCount: ledger.unresolvedQuantumData.length,
  a7Passed: ledger.verdict.a7Passed,
  physicalAdmission: ledger.verdict.physicalAdmission
}, null, 2));
