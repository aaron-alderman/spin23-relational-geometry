#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const script=fileURLToPath(new URL("../../scripts/run-wave-geometry-mechanism-workbench.mjs",import.meta.url));
const live=JSON.parse(execFileSync(process.execPath,[script],{encoding:"utf8",maxBuffer:8*1024*1024}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/wave-geometry-mechanism-workbench-v1.json",import.meta.url),"utf8"));
const figure=fs.readFileSync(new URL("../../evidence/figures/wave-geometry-mechanism-workbench-v1.svg",import.meta.url));
assert.deepEqual(saved,live,"saved workbench evidence must equal a fresh deterministic run");
assert.equal(crypto.createHash("sha256").update(figure).digest("hex"),saved.figure.sha256);
assert.equal(saved.cases.length,6);
assert.equal(saved.inverseDecompiler.accuracy,1);
assert.equal(new Set(saved.inverseDecompiler.results.map(x=>x.predicted)).size,6);
assert.ok(saved.calculations.rayFamily.every(x=>x.causticDistance>0));
assert.ok(new Set(saved.calculations.rayFamily.map(x=>x.caustic[0])).size>saved.calculations.rayFamily.length/2,"caustic coordinates must not collapse under serialization");
assert.ok(saved.calculations.resonator.peak.omega>.9&&saved.calculations.resonator.peak.omega<1.1);
assert.ok(saved.calculations.phononFocusing.peakToMean>1.5);
assert.equal(saved.applicationBoundary.neutral,true);
assert.ok(saved.applicationBoundary.notEvidenceFor.includes("MOND"));
console.log("wave geometry mechanism workbench v1 verification passed");
