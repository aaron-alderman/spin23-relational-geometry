#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const script=fileURLToPath(new URL("../../scripts/build-wave-geometry-mode-singularity-bridge.mjs",import.meta.url));
const live=JSON.parse(execFileSync(process.execPath,[script],{encoding:"utf8"}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/wave-geometry-mode-singularity-bridge-v1.json",import.meta.url),"utf8"));
assert.deepEqual(saved,live,"saved wave-geometry bridge must equal a fresh deterministic build");
assert.equal(saved.concepts.length,14);
assert.ok(saved.concepts.some(x=>x.id==="caustic"));
assert.ok(saved.concepts.some(x=>x.id==="phonon"));
assert.ok(saved.concepts.some(x=>x.id==="resonance"));
assert.ok(saved.concepts.some(x=>x.id==="shock"));
assert.ok(saved.prohibitedEquivalences.some(([a,b])=>a==="caustic"&&b==="resonance"));
assert.ok(saved.prohibitedEquivalences.some(([a,b])=>a==="pressure"&&b==="phonon"));
assert.ok(saved.ambientBoundaries.notOrganizedAround.includes("MOND"));
assert.equal(saved.status,"typed vocabulary and bridge; no new physical identification");
for(const join of saved.corpusJoins)assert.ok(fs.existsSync(new URL(`../../${join.path}`,import.meta.url)),`missing corpus join ${join.path}`);
console.log("wave geometry, modes and singularities bridge v1 verification passed");
