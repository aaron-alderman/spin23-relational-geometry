#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const live=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL("../../scripts/compile-m44-separating-experiment-program.mjs",import.meta.url))],{encoding:"utf8"}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/m44-separating-experiment-program-v1.json",import.meta.url),"utf8"));
assert.deepEqual(saved,live,"saved separating experiment program must equal a fresh deterministic compilation");
assert.equal(saved.ambiguityPairs.length,11);
assert.equal(saved.cover.completeCoverExists,true);
assert.equal(saved.cover.minimumActionCount,5);
assert.equal(saved.prerequisites.find(x=>x.id==="P1-forward-law").status,"missing");
assert.equal(saved.status.includes("no observation authorized"),true);
console.log("M44 separating experiment program v1 verification passed");
