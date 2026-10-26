#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const script=fileURLToPath(new URL("../../scripts/compare-mond-geometry-retardation-variants.mjs",import.meta.url));
const live=JSON.parse(execFileSync(process.execPath,[script],{encoding:"utf8"}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/mond-geometry-retardation-variants-v1.json",import.meta.url),"utf8"));
assert.deepEqual(saved,live,"saved MOND proposal evidence must equal a fresh deterministic run");
assert.equal(saved.variants.length,5);
assert.equal(new Set(saved.variants.map(v=>v.modificationSite)).size,5);
assert.equal(saved.admissibility.commonStaticChecks.deepSlopeOneHalf,true);
assert.equal(saved.admissibility.commonStaticChecks.btfrCoefficientOne,true);
assert.equal(saved.admissibility.commonStaticChecks.newtonianRecovery,true);
assert.equal(saved.admissibility.externalFieldTensor.positiveGains,true);
assert.equal(saved.admissibility.externalFieldTensor.parallelNoLargerThanPerpendicular,true);
assert.equal(saved.admissibility.retardation.zeroFrequencyFieldMatchesStatic,true);
assert.equal(saved.admissibility.retardation.fieldKernelBounded,true);
assert.equal(saved.verdict.winner,null);
assert.match(saved.m44Boundary.reason,/neither a baryonic mass model nor member-level orbit histories/u);
console.log("MOND geometry and retardation variants v1 verification passed");
