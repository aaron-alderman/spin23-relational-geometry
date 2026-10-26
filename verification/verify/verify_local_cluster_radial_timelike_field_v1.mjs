#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const live=JSON.parse(execFileSync(process.execPath,[fileURLToPath(new URL("../../scripts/analyze-local-cluster-radial-timelike-field.mjs",import.meta.url))],{encoding:"utf8"}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/local-cluster-radial-timelike-field-v1.json",import.meta.url),"utf8"));
const snapshot=JSON.parse(fs.readFileSync(new URL("../../evidence/data/local-cluster-director-field-full-snapshot-v1.json",import.meta.url),"utf8"));
assert.deepEqual(saved,live,"saved radial-field evidence must equal a fresh offline deterministic run");
assert.equal(snapshot.clusters.length,8);
assert.ok(snapshot.clusters.every(row=>/^[0-9a-f]{64}$/u.test(row.normalizedRowsSha256)));
assert.equal(saved.leaveOneClusterOut.folds.length,8);
assert.equal(saved.timelikeBoundary.euclideanAngleReuseAllowed,false);
assert.equal(saved.verdict.physicalTimelikeClaim,false);
assert.ok(Number.isFinite(saved.leaveOneClusterOut.summaries.radial.meanProjectorComponentSquaredError));
assert.equal(saved.verdict.finiteRadialOrganizationPreferred,false);
assert.equal(saved.leaveOneClusterOut.radialWinsAgainstMeanProjectorFlat,0);
assert.ok(saved.leaveOneClusterOut.summaries.radial.meanProjectorComponentSquaredError>saved.leaveOneClusterOut.summaries.rankOneFlat.meanProjectorComponentSquaredError);
console.log("local cluster radial timelike field v1 verification passed");
