#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const root=fileURLToPath(new URL("../../",import.meta.url));
const live=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL("../../scripts/run-focused-geometry-tournament-v2.mjs",import.meta.url))],{encoding:"utf8"}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/focused-geometry-tournament-v2.json",import.meta.url),"utf8"));
assert.deepEqual(saved,live,"saved evidence must equal a fresh deterministic run");
assert.deepEqual(saved.regimes.map(x=>x.observableClasses.length),[2,4,5]);
assert.ok(saved.regimes.every(x=>x.tournament.observableClassAccuracy>.95));
assert.equal(saved.decisions.safety.includes("no real-data promotion"),true);
console.log("focused geometry tournament v2 verification passed");
