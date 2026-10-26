import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here=path.dirname(fileURLToPath(import.meta.url));
const record=JSON.parse(fs.readFileSync(path.join(here,
  "../../evidence/data/translation-free-e8-cartan-shell10-spectroscopy-v1.json"),"utf8"));
const solver=path.join(here,"../../scripts/solve-translation-free-e8-joined-rotor.mjs");
const small=JSON.parse(execFileSync(process.execPath,[solver,"--cutoffs=2","--branches=cartan-kernel",
  "--method=davidson","--maxSubspace=32","--cycles=120"],{encoding:"utf8",maxBuffer:8*1024*1024})).records[0];

assert.equal(record.schemaVersion,"translation-free-e8-cartan-shell10-spectroscopy-v1");
assert.equal(record.model.basisStates,794161);
assert.ok(record.solver.residuals.slice(0,3).every(value=>value<3e-11));
assert.ok(record.cutoffDiagnostics.boundaryProbabilities.every(value=>value<2e-4));
const drift=Math.abs(record.cutoffDiagnostics.gapAtCutoff10-record.cutoffDiagnostics.gapAtCutoff8)
  /record.cutoffDiagnostics.gapAtCutoff8;
assert.ok(Math.abs(drift-record.cutoffDiagnostics.relativeGapDrift8to10)<2e-15);
assert.ok(drift<record.cutoffDiagnostics.promotionTolerance);
assert.equal(record.cutoffDiagnostics.firstSubPercentIncrement,true);
assert.equal(record.cutoffDiagnostics.twoSuccessiveSubPercentIncrements,false);
assert.equal(record.cutoffDiagnostics.gapPromoted,false);
assert.ok(Math.abs(record.cutoffDiagnostics.parityExpectations[0]-1)<2e-14);
assert.ok(Math.abs(record.cutoffDiagnostics.parityExpectations[1]+1)<2e-14);
assert.ok(Math.max(...record.cosineDriveWeights.firstExcited)<4e-26);
assert.ok(Math.max(...record.cosineDriveWeights.secondExcited)>2e-4);

// Recompute the same parity selection rule on a small complete shell, including
// the newly emitted odd sine-drive channel.
assert.ok(Math.abs(small.diagnostics.levels[0].parityExpectation-1)<1e-9);
assert.ok(Math.abs(small.diagnostics.levels[1].parityExpectation+1)<1e-9);
assert.ok(Math.max(...small.diagnostics.cosineDriveTransitionWeightsFromGround[0])<1e-20);
assert.ok(Math.max(...small.diagnostics.sineDriveTransitionWeightsFromGround[0])>1e-4);

console.log(JSON.stringify({
  status:"PASS",
  basisStates:record.model.basisStates,
  provisionalGap:record.cutoffDiagnostics.gapAtCutoff10,
  relativeGapDrift8to10:drift,
  maximumBoundaryProbability:Math.max(...record.cutoffDiagnostics.boundaryProbabilities),
  firstExcitationParity:"odd",
  cosineSeesFirstGap:false,
  sineSeesFirstGap:true,
  gapPromoted:false,
  nextGate:record.nextGate,
},null,2));
