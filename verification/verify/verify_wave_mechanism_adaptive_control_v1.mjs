#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const script=fileURLToPath(new URL("../../scripts/run-wave-mechanism-adaptive-control.mjs",import.meta.url));
const live=JSON.parse(execFileSync(process.execPath,[script],{encoding:"utf8",maxBuffer:32*1024*1024}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/wave-mechanism-adaptive-control-v1.json",import.meta.url),"utf8"));
const figure=fs.readFileSync(new URL("../../evidence/figures/wave-mechanism-adaptive-control-v1.svg",import.meta.url));
assert.deepEqual(saved,live,"saved adaptive-control evidence must equal a fresh deterministic run");
assert.equal(crypto.createHash("sha256").update(figure).digest("hex"),saved.figure.sha256);
assert.ok(saved.adaptiveStructuralPolicy.paths.every(x=>x.identified));
assert.ok(saved.adaptiveStructuralPolicy.averageCost<saved.adaptiveStructuralPolicy.fixedCost);
assert.equal(saved.robustnessModel.results.length,5*3*4);
assert.ok(saved.robustnessModel.results.some(x=>x.calibrated.abstainRate>0));
assert.ok(saved.robustnessModel.results.some(x=>x.independentNaive.falseCommitRate>x.calibrated.falseCommitRate));
assert.equal(saved.glassBox.noLlmRequired,true);
assert.equal(saved.applicationBoundary.neutral,true);
console.log("wave mechanism adaptive control v1 verification passed");
