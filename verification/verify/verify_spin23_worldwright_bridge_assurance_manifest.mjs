#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const manifest = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-worldwright-bridge-assurance-manifest-v1.json",
  import.meta.url,
), "utf8"));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");

assert.equal(manifest.chain.length, 6);
for (const item of manifest.chain) {
  const [evidenceBytes, verifierBytes] = await Promise.all([
    readFile(new URL("../../" + item.evidencePath, import.meta.url)),
    readFile(new URL("../../" + item.verifierPath, import.meta.url)),
  ]);
  assert.equal(sha256(evidenceBytes), item.evidenceSha256, `${item.id} evidence drift`);
  assert.equal(sha256(verifierBytes), item.verifierSha256, `${item.id} verifier drift`);
  const run = spawnSync(process.execPath, [item.verifierPath], {
    cwd: root,
    encoding: "utf8",
    windowsHide: true,
  });
  assert.equal(run.status, 0, `${item.id} failed:\n${run.stdout}\n${run.stderr}`);
  assert.ok(run.stdout.includes(item.expectedMarker), `${item.id} pass marker missing`);
}

assert.equal(manifest.conclusions.physicalObservableExactAtDeclaredEftScope, true);
assert.equal(manifest.conclusions.responseSurfaceReproducible, true);
assert.equal(manifest.conclusions.syntheticInferencePipelineOperational, true);
assert.equal(manifest.conclusions.primaryEmpiricalAnchorIdentified, true);
assert.equal(manifest.conclusions.finiteVolumeIntegrationOperational, true);
assert.equal(manifest.conclusions.independentEmpiricalLikelihoodAvailable, false);
assert.equal(manifest.conclusions.spin23SpecificFingerprintAvailable, false);
assert.ok(Object.values(manifest.authority).every(value => value === false));

console.log("Spin(2,3)/Worldwright bridge assurance manifest: PASS");
console.log(`  hash-pinned executable stages: ${manifest.chain.length}`);
console.log("  exact EFT observable -> response surface -> synthetic likelihood -> empirical audit -> fingerprint closure -> finite geometry");
console.log("  authority remains separated across physics,Worldwright,policy and moral domains");
