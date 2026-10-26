#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import fs from "node:fs";

const script=fileURLToPath(new URL("../../scripts/run-wave-mechanism-reader-ablation.mjs",import.meta.url));
const live=JSON.parse(execFileSync(process.execPath,[script],{encoding:"utf8",maxBuffer:32*1024*1024}));
const saved=JSON.parse(fs.readFileSync(new URL("../../evidence/data/wave-mechanism-reader-ablation-v1.json",import.meta.url),"utf8"));
const figure=fs.readFileSync(new URL("../../evidence/figures/wave-mechanism-reader-ablation-v1.svg",import.meta.url));
assert.deepEqual(saved,live,"saved reader-ablation evidence must equal a fresh deterministic run");
assert.equal(crypto.createHash("sha256").update(figure).digest("hex"),saved.figure.sha256);
assert.equal(saved.structuralTournament.subsetCount,256);
assert.ok(saved.structuralTournament.minimumSeparators.length>0);
assert.ok(saved.structuralTournament.nullReaders.includes("R8"));
assert.ok(saved.structuralTournament.leaveOneOut.some(x=>x.equivalenceClasses.length>0));
assert.ok(saved.robustnessTournament.noiseSurface.some(x=>x.abstainRate>0));
assert.ok(saved.robustnessTournament.noiseSurface.some(x=>x.falseCommitRate>0));
assert.ok(saved.robustnessTournament.noiseSurface.find(x=>x.resolution===1&&x.noiseSigma===0).coverage===1);
assert.equal(saved.applicationBoundary.noForcedLabel,true);
console.log("wave mechanism reader-ablation v1 verification passed");
