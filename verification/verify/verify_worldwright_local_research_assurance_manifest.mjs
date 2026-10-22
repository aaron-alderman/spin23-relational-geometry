#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const manifest = JSON.parse(await readFile(resolve(root, "evidence/data/worldwright-local-research-assurance-manifest-v1.json"), "utf8"));
const digest = async path => createHash("sha256")
  .update((await readFile(resolve(root, path), "utf8")).replace(/\r\n/g, "\n"))
  .digest("hex");

assert.equal(manifest.schema, "worldwright.local-research-assurance-manifest/1");
assert.equal(manifest.chains.length, 3);
for (const chain of manifest.chains) {
  for (const kind of ["evidence", "harness", "verifier"]) {
    assert.equal(await digest(chain[kind].path), chain[kind].sha256, `${chain.id} ${kind} hash drift`);
  }
  const evidence = JSON.parse(await readFile(resolve(root, chain.evidence.path), "utf8"));
  assert.equal(evidence.exactRepeat, true, `${chain.id} did not repeat exactly`);
  assert.ok(Object.values(evidence.authority).every(value => value === false), `${chain.id} authority promotion`);
  const child = spawnSync(process.execPath, [resolve(root, chain.verifier.path)], { encoding: "utf8" });
  assert.equal(child.status, 0, `${chain.id} verifier failed\n${child.stdout}\n${child.stderr}`);
}

assert.equal(await digest(manifest.programmeLandscape.evidence.path), manifest.programmeLandscape.evidence.sha256, "landscape evidence hash drift");
assert.equal(await digest(manifest.programmeLandscape.verifier.path), manifest.programmeLandscape.verifier.sha256, "landscape verifier hash drift");
assert.equal(await digest(manifest.calibrationAudit.evidence.path), manifest.calibrationAudit.evidence.sha256, "calibration audit evidence hash drift");
assert.equal(await digest(manifest.calibrationAudit.verifier.path), manifest.calibrationAudit.verifier.sha256, "calibration audit verifier hash drift");
const calibration = JSON.parse(await readFile(resolve(root, manifest.calibrationAudit.evidence.path), "utf8"));
assert.equal(calibration.conclusions.causalMechanismsAudited, 6);
assert.equal(calibration.conclusions.causalMechanismsIdentifiableNow, 0);
assert.equal(calibration.conclusions.perfectCrosswalkWouldOpenCausalEstimation, false);
assert.ok(Object.values(calibration.authority).every(value => value === false), "calibration audit authority promotion");
const calibrationChild = spawnSync(process.execPath, [resolve(root, manifest.calibrationAudit.verifier.path)], { encoding: "utf8" });
assert.equal(calibrationChild.status, 0, `calibration audit verifier failed\n${calibrationChild.stdout}\n${calibrationChild.stderr}`);
assert.equal(await digest(manifest.separatePhysicsBridge.path), manifest.separatePhysicsBridge.sha256, "physics bridge hash drift");
const physics = JSON.parse(await readFile(resolve(root, manifest.separatePhysicsBridge.path), "utf8"));
assert.equal(physics.conclusions.spin23SpecificFingerprintAvailable, false);
assert.equal(manifest.separatePhysicsBridge.authorityTransfer, false);
assert.deepEqual(manifest.conclusions, {
  hashPinnedExperimentChains: 3,
  hashPinnedStructuralAudits: 1,
  allExperimentsRepeatExactly: true,
  allEmpiricalValidationBlocked: true,
  continuousCorpusVerificationAvailable: true,
  authoritativeSourceryPublicationComplete: false,
  physicsAuthorityTransferredToWorldwright: false,
});

console.log("Worldwright local research assurance manifest: PASS");
console.log("  3 hash-pinned executable experiment chains, 1 structural audit, plus programme landscape");
console.log("  Spin(2,3) bridge referenced separately with no authority transfer");
