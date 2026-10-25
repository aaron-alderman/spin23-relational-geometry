import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
const ROOT = process.cwd();
const TARGET = "corpus/programmes/frontier-physics-targets/spectral_width_propagation_audit_v1.json";
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const sha256 = text => crypto.createHash("sha256").update(text.replaceAll("\r\n", "\n")).digest("hex");
const audit = JSON.parse(read(TARGET));
const upstream = JSON.parse(read(audit.upstream.path));
const candidates = upstream.census.filter(record => record.route === audit.upstream.candidateRoute);
const failures = [];
if (audit.schema !== "frontier.spectral-width-propagation-audit/1") failures.push("schema mismatch");
if (!audit.summary?.pass || audit.summary?.unreviewed !== 0) failures.push("audit remains open");
if (sha256(read(audit.reference.path)) !== audit.reference.sha256) failures.push("stale AZ-128 digest");
if (sha256(read(audit.upstream.path)) !== audit.upstream.sha256) failures.push("stale upstream digest");
if (candidates.length !== audit.dispositions.length) failures.push("candidate/disposition count mismatch");
const expected = new Set(candidates.map(record => record.path));
const observed = new Set(audit.dispositions.map(record => record.path));
if (observed.size !== audit.dispositions.length) failures.push("duplicate dispositions");
for (const candidate of candidates) if (!observed.has(candidate.path)) failures.push(`missing disposition ${candidate.path}`);
for (const record of audit.dispositions) {
  if (!expected.has(record.path)) failures.push(`stale disposition ${record.path}`);
  else if (!record.category || !audit.categorySemantics[record.category]) failures.push(`invalid category ${record.path}`);
  else if (sha256(read(record.path)) !== record.digest) failures.push(`stale document digest ${record.path}`);
}
console.log(JSON.stringify({ result: failures.length ? "fail" : "pass", target: TARGET, candidates: candidates.length, categories: audit.summary.byCategory, failures }, null, 2));
if (failures.length) process.exitCode = 1;
