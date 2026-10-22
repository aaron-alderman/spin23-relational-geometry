#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const landscape = JSON.parse(await readFile(new URL(
  "../../evidence/data/worldwright-programme-current-landscape-v2.json",
  import.meta.url,
), "utf8"));
const physicsManifest = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-worldwright-bridge-assurance-manifest-v1.json",
  import.meta.url,
), "utf8"));

assert.equal(landscape.schema, "worldwright.programme-current-landscape/2");
assert.equal(landscape.capabilities.length, 10);
assert.deepEqual(landscape.capabilities.map(item => item.id), ["L1","L2","L3","L4","L5","L6","L7","L8","L9","L10"]);
assert.equal(landscape.currentScientificFindings.length, 6);
assert.deepEqual(landscape.nextExecutableQueue.map(item => item.rank), [1,2,3,4,5,6,7]);

const capability = id => landscape.capabilities.find(item => item.id === id);
assert.equal(capability("L4").state, "operational-synthetic");
assert.equal(capability("L5").state, "qualified-bounded-service");
assert.equal(capability("L7").state, "protocol-ready-linkage-failed");
assert.equal(capability("L9").state, "open");
assert.equal(physicsManifest.chain.length, 10);
assert.equal(physicsManifest.conclusions.spin23SpecificFingerprintAvailable, false);
assert.ok(capability("L10").evidence.includes("ten-stage"));

const smooth = landscape.currentScientificFindings.find(item => item.id === "smooth-transition-local-result");
assert.equal(smooth.scope, "awaiting-authoritative-Sourcery-publication");
assert.ok(landscape.completionRule.includes("incomplete"));
assert.ok(Object.values(landscape.authority).every(value => value === false));

console.log("Worldwright programme current landscape v2: PASS");
console.log("  10 capability lanes; 6 current findings; 7-item executable queue");
console.log("  authoritative gaps retained: rendered use, continuous assurance, empirical mechanism and Spin(2,3) fingerprint");
