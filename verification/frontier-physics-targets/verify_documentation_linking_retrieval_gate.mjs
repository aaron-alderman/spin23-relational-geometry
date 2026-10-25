import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET = 'corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.json';
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const sha256 = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const gate = JSON.parse(read(TARGET));
const currentFrontDoor = JSON.parse(read('corpus/registers/corpus_front_door.json'));
const failures = [];

if (gate.schema !== 'frontier.documentation-linking-retrieval-gate/1') failures.push('schema mismatch');
if (gate.summary?.pass !== true || gate.summary?.failures?.length !== 0) failures.push('gate summary is open');
for (const [name, section] of Object.entries(gate.sections ?? {})) if (section.pass !== true) failures.push(`${name}: section does not pass`);
if (gate.sections?.linkAuthority?.roots !== 16 || gate.sections?.linkAuthority?.rootFailures?.length !== 0) failures.push('governed roots are incomplete');
if (gate.sections?.linkAuthority?.brokenClosureLinks !== 0 || gate.sections?.linkAuthority?.missingClaimLinks !== 0) failures.push('link closure has failures');
if (gate.sections?.linkAuthority?.workingCopyDivergences !== 0) failures.push('canonical claims diverge from working copies');
if (currentFrontDoor.passed !== true
  || currentFrontDoor.summary?.inventoryObjects !== gate.sections?.linkAuthority?.inventoryObjects
  || currentFrontDoor.summary?.explicitlyClassifiedObjects !== gate.sections?.linkAuthority?.explicitlyClassifiedObjects
  || currentFrontDoor.summary?.closureBrokenLinks !== gate.sections?.linkAuthority?.brokenClosureLinks) failures.push('front-door structural values are stale');
if (gate.sections?.duplicates?.legacyIdentifierCollisions?.length !== 1 || gate.sections.duplicates.legacyIdentifierCollisions[0]?.id !== 963) failures.push('legacy collision disposition drifted');
if (gate.sections?.duplicates?.exactContentCandidates?.length !== 0 || gate.sections?.duplicates?.normalizedTitleCandidates?.length !== 0) failures.push('duplicate claim candidates remain');
if (gate.sections?.contradictions?.unresolvedCandidates !== 0) failures.push('contradiction candidates remain');
if (gate.sections?.retrieval?.cases !== 30 || gate.sections?.retrieval?.failed !== 0 || gate.sections?.retrieval?.passRate !== 1 || gate.sections?.retrieval?.meanReciprocalRank < 0.8) failures.push('governed retrieval threshold failed');
for (const [name, stratum] of Object.entries(gate.sections?.retrieval?.strata ?? {})) if (!stratum.pass || !stratum.ids?.length) failures.push(`${name}: retrieval stratum failed`);
if (gate.sections?.centrality?.authorityBoundaryPresent !== true || JSON.stringify(gate.sections?.centrality?.graphWeights) !== JSON.stringify([0, 0.3, 0.6])) failures.push('centrality authority boundary or sweep drifted');
for (const test of gate.sections?.centrality?.tests ?? []) {
  if (!test.pass || test.runs?.length !== 3) failures.push(`${test.id}: selector sweep failed`);
  for (const run of test.runs ?? []) if (!run.firstTargetRank || run.firstTargetRank > 10) failures.push(`${test.id}: target buried at graph weight ${run.graphWeight}`);
}
for (const input of gate.sections?.provenance?.inputs ?? []) {
  if (!fs.existsSync(path.join(ROOT, input.source))) failures.push(`missing input ${input.source}`);
  else if (sha256(read(input.source)) !== input.sha256) failures.push(`stale digest ${input.source}`);
}
if (!/not a proof of global logical consistency/i.test(gate.sections?.contradictions?.scope ?? '')) failures.push('contradiction scope overclaims');
if (!/navigation inputs only|navigation aid/i.test(gate.authority ?? '') && !/navigation inputs only|navigation aid/i.test(read('corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.md'))) failures.push('centrality is not explicitly non-authoritative');

console.log(JSON.stringify({ result: failures.length ? 'fail' : 'pass', target: TARGET, summary: gate.summary, failures }, null, 2));
if (failures.length) process.exitCode = 1;
