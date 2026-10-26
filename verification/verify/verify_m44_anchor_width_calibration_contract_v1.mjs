#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const live=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL("../../scripts/generate-m44-anchor-width-calibration-contract.mjs",import.meta.url))],{encoding:"utf8"}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/m44-anchor-width-calibration-contract-v1.json",import.meta.url),"utf8"));
assert.deepEqual(saved,live,"saved calibration contract must equal a fresh deterministic generation");
assert.equal(saved.verdict.admittedCandidates.length,0);
assert.deepEqual(saved.verdict.retiredDirectMappings,["A4-ordinary-spatial-depth","W3-astrometric-cluster-depth"]);
assert.equal(saved.candidates.find(x=>x.id==="A1-cross-channel-rv-location").gates["forward-map"].state,"fail");
assert.equal(saved.pairs.find(x=>x.id==="P2-line-resolved-location-plus-coherence").decision,"preferred-future-design");
assert.equal(saved.corpusLawAudit.laws.some(x=>x.executableForContract),false);
console.log("M44 anchor-width calibration contract v1 verification passed");
