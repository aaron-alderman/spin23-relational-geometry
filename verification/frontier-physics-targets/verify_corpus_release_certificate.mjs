import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();
const TARGET = 'corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.json';
const failures = [];
const certificate = JSON.parse(fs.readFileSync(path.join(ROOT, TARGET), 'utf8'));
if (certificate.schema !== 'frontier.corpus-saturation-release-certificate/1') failures.push('schema mismatch');
if (certificate.status !== 'dated_saturation_under_declared_protocol') failures.push('release is not certified');
if (Object.keys(certificate.gates ?? {}).length !== 9 || Object.values(certificate.gates ?? {}).some(status => status !== 'passed')) failures.push('not all nine gates pass');
if (!/does not claim final truth|not.*final truth/i.test(certificate.authority ?? '')) failures.push('certificate overclaims authority');
if (!/invalidates this certificate/i.test(certificate.reopening ?? '')) failures.push('reopening rule missing');
const result = spawnSync(process.execPath, ['scripts/generate-corpus-release-certificate.mjs'], { cwd: ROOT, encoding: 'utf8' });
if (result.status !== 0) failures.push(`certificate regeneration failed: ${result.stderr || result.stdout}`);
else {
  const generated = JSON.parse(result.stdout);
  if (generated.projection?.sha256 !== certificate.projection?.sha256 || generated.projection?.files !== certificate.projection?.files || generated.projection?.bytes !== certificate.projection?.bytes) failures.push('certificate projection is stale');
}
console.log(JSON.stringify({ result: failures.length ? 'fail' : 'pass', target: TARGET, projection: certificate.projection, failures }, null, 2));
if (failures.length) process.exitCode = 1;
