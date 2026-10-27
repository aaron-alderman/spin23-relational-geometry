import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildObservatoryApplicationCandidate } from "../../tooling/search/generate_observatory_application_candidate.mjs";

const retained = JSON.parse(readFileSync(new URL("../../tooling/search/observatory_application_candidate_v1.json", import.meta.url), "utf8"));

test("Observatory application candidate is exact, separately named and excludes runtime authority material", () => {
  const built = buildObservatoryApplicationCandidate();
  assert.deepEqual(retained, built);
  assert.equal(built.applicationIdentity.id, "context-hub.observatory.local");
  assert.equal(built.applicationIdentity.writePrincipal, "context-hub.operator.local");
  assert.equal(built.authorityBoundary.readOnlyMcpAuthorityInherited, false);
  assert.equal(built.authorityBoundary.protectedApplicationAdmission, false);
  assert.equal(built.qualification.recoveryEvidence.credentialContinuityObserved, true);
  assert.equal(built.qualification.recoveryEvidence.physicalRebootObserved, false);
  assert.equal(built.qualification.protectedWarmupEvidence.passed, true);
  assert.equal(built.qualification.protectedWarmupEvidence.operatorId, "context-hub.operator.local");
  assert.equal(built.qualification.protectedWarmupEvidence.writeProtected, true);
  assert.equal(built.qualification.protectedWarmupEvidence.sameRunEvidenceOnly, true);
  assert.equal(built.members.some(item => item.path.includes(".context-hub") || /token|episodes|contributions/iu.test(item.path)), false);
  assert.match(built.candidateSha256, /^[0-9a-f]{64}$/u);
});
