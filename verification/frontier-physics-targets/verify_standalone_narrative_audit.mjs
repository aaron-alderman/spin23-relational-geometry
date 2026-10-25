import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET = 'corpus/programmes/frontier-physics-targets/standalone_narrative_audit_v1.json';
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const sha256 = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const audit = JSON.parse(read(TARGET));
const failures = [];

if (audit.schema !== 'frontier.standalone-narrative-audit/1') failures.push('schema mismatch');
if (audit.summary?.routes !== 3 || audit.summary?.passingRoutes !== 3 || audit.summary?.unresolvedRoutes !== 0) failures.push('route closure summary is incomplete');
if (audit.summary?.forbiddenHistoryMarkers !== 0) failures.push('discovery-history markers remain');
if (audit.summary?.bookOrderPass !== true) failures.push('book order does not preserve science-before-speculation');
if (audit.summary?.theologyAssumptionPass !== true) failures.push('theological analysis lacks explicit God-exists assumption');

const requiredChecks = ['thingsBeforeNames', 'jordanAdmission', 'typedMiddle', 'lieTransport', 'reason', 'alternatives', 'status', 'implication', 'practicalHope', 'optionalBoundary'];
for (const route of audit.audits ?? []) {
  if (!route.pass || !route.orderedEndingPass) failures.push(`${route.id}: route does not pass`);
  for (const key of requiredChecks) if (route.checks?.[key] !== true) failures.push(`${route.id}: missing ${key}`);
  if (route.forbiddenHistoryMarkers?.length) failures.push(`${route.id}: history marker present`);
  for (const component of route.componentDigests ?? []) {
    if (!fs.existsSync(path.join(ROOT, component.source))) failures.push(`${route.id}: missing ${component.source}`);
    else if (sha256(read(component.source)) !== component.sha256) failures.push(`${route.id}: stale digest ${component.source}`);
  }
  for (const [key, value] of Object.entries(route.evidence ?? {})) if (!value || value.length < 30) failures.push(`${route.id}: thin human judgement ${key}`);
}

const generator = read('tooling/publication/generate_edition3_book_preview.mjs');
if (/Hot off the press|Provisional integration note/.test(generator)) failures.push('book generator retains provisional-history labels');
const synthesis = read('corpus/syntheses/the_admissibility_frontier_current_synthesis.md');
if (/the corpus began|new spine of the programme|in the revised story/i.test(synthesis)) failures.push('standalone synthesis retains discovery-history framing');

console.log(JSON.stringify({
  result: failures.length ? 'fail' : 'pass',
  target: TARGET,
  routes: audit.summary?.routes,
  passingRoutes: audit.summary?.passingRoutes,
  forbiddenHistoryMarkers: audit.summary?.forbiddenHistoryMarkers,
  failures
}, null, 2));
if (failures.length) process.exitCode = 1;
