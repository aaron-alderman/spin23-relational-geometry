import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();
const TARGET = 'corpus/programmes/frontier-physics-targets/adversarial_release_audit_v1.json';
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const sha256 = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const audit = JSON.parse(read(TARGET));
const failures = [];
if (audit.schema !== 'frontier.adversarial-release-audit/1' || audit.summary?.pass !== true) failures.push('audit is not closed');
if (audit.provenanceSample?.length !== 32 || audit.summary?.provenanceFailures !== 0) failures.push('provenance sample failed');
for (const item of audit.provenanceSample ?? []) {
  if (!fs.existsSync(path.join(ROOT, item.path)) || sha256(read(item.path)) !== item.expectedSha256 || !item.coverageComplete || !item.pass) failures.push(`${item.id}: provenance or coverage mismatch`);
}
if (audit.semanticReviews?.length !== 6 || audit.summary?.unresolvedSemanticConflicts !== 0) failures.push('semantic conflict review incomplete');
for (const item of audit.semanticReviews ?? []) if (!item.pass || !item.disposition || item.reason?.length < 40) failures.push(`${item.leftId}/${item.rightId}: thin semantic disposition`);
if (audit.mutationTests?.length !== 4 || audit.mutationTests.some(test => !test.pass)) failures.push('mutation controls do not fail closed');
if (audit.externalBlockers?.length !== 2) failures.push('external blocker classes missing');
for (const blocker of audit.externalBlockers ?? []) if (Object.values(blocker).some(value => !value)) failures.push(`${blocker.id}: blocker contract incomplete`);
if (!/cannot prove|cannot.*every semantic/i.test(audit.authority ?? '')) failures.push('audit overclaims semantic completeness');
console.log(JSON.stringify({ result: failures.length ? 'fail' : 'pass', target: TARGET, summary: audit.summary, failures }, null, 2));
if (failures.length) process.exitCode = 1;
