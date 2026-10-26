#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const live=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL("../../scripts/analyze-focused-geometry-measurement-design.mjs",import.meta.url))],{encoding:"utf8"}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/focused-geometry-measurement-design-v1.json",import.meta.url),"utf8"));
assert.deepEqual(saved,live,"saved measurement-design evidence must equal a fresh deterministic run");
assert.equal(saved.enumeration.subsetsTested,15);
assert.equal(saved.enumeration.minimalSeparatingSets.calibrated.length,2);
assert.equal(saved.enumeration.minimalSeparatingSets.zeroUnknown.length,0);
assert.equal(saved.enumeration.minimalSeparatingSets.affineUnknown.length,0);
assert.ok(saved.sensitivity.oneVersusOrdinary.every(row=>row.falsePositiveRate<=.05));
assert.equal(saved.sensitivity.fiveWayAtAmplitudePointOne.length,5);
console.log("focused geometry measurement design v1 verification passed");
