#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const live=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL("../../scripts/invert-m44-response-jets.mjs",import.meta.url))],{encoding:"utf8"}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/m44-inverse-response-jets-v1.json",import.meta.url),"utf8"));
assert.deepEqual(saved,live,"saved inverse response jets must equal a fresh deterministic run");
assert.deepEqual(saved.minimalInverseAlgebra.presentAfterCurrentQuotient,["J1"]);
assert.equal(saved.contractConsistency.admittedAnchorCount,0);
assert.equal(saved.contractConsistency.forwardLawAvailable,false);
assert.equal(saved.decision.promotedPhysicalCause,null);
console.log("M44 inverse response jets v1 verification passed");
