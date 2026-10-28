import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const register = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-major-candidates-v0.json"), "utf8"));
const result = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-major-candidates-v0-result.json"), "utf8"));

assert.equal(register.protocol, "prophetic-admissibility/open-major-candidates/0");
assert.equal(result.predictiveRankingAuthorized, false);
assert.ok(register.families.length > 0);
for (const family of register.families) {
  assert.ok(family.candidates.length >= 2);
  assert.ok(family.candidates.every((candidate) => candidate.predictiveWeight === null));
}

const newton = register.families
  .flatMap((family) => family.candidates)
  .find((candidate) => candidate.id === "newton-day-year-2060");
assert.equal(newton.result, "AD 2060");
assert.match(newton.textualAdmissibility, /conditional/);
assert.equal(newton.temporalClaim.kind, "lower-bound");

const compiledNewton = result.compiledFamilies
  .flatMap((family) => family.candidates)
  .find((candidate) => candidate.id === "newton-day-year-2060");
assert.equal(compiledNewton.temporalAudit.status, "not-yet-testable");
assert.equal(compiledNewton.temporalAudit.finiteResolutionYear, null);
assert.match(compiledNewton.temporalAudit.notFalsifiedBy, /non-occurrence in 2060/);

const elapsed = result.compiledFamilies
  .flatMap((family) => family.candidates)
  .filter((candidate) => candidate.temporalClaim.latestYear !== null && candidate.temporalClaim.latestYear < result.asOfYear);
assert.ok(elapsed.length >= 2);
assert.ok(elapsed.every((candidate) => candidate.temporalAudit.status === "window-elapsed-outcome-uncoded"));

console.log(JSON.stringify({
  result: "pass",
  protocol: register.protocol,
  families: register.families.length,
  predictiveRankingAuthorized: result.predictiveRankingAuthorized,
  boundary: result.boundary
}, null, 2));

