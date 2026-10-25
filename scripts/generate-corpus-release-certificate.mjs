import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const WRITE = process.argv.includes('--write');
const OUT_JSON = 'corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.json';
const OUT_MD = 'corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.md';
const excluded = new Set([
  OUT_JSON, OUT_MD,
  'corpus/EVIDENCE_SPINE.md', 'corpus/FRONT_DOOR.md',
  'corpus/registers/spin23_corpus_manifest.json', 'corpus/registers/corpus_evidence_spine.json', 'corpus/registers/corpus_front_door.json',
  'tooling/search/benchmark_baseline_v1.json', 'tooling/search/sourcery_admission_candidate_v1.json',
  'corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.json',
  'corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.md'
]);
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const normalizedBytes = file => {
  const raw = fs.readFileSync(file);
  if (raw.includes(0)) return raw;
  return Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'));
};
const listed = spawnSync('git', ['ls-files', '--cached', '-z'], { cwd: ROOT, encoding: 'buffer' });
if (listed.status !== 0) throw new Error(`git ls-files failed: ${listed.stderr?.toString('utf8')}`);
const files = listed.stdout.toString('utf8').split('\0').filter(Boolean).map(relative => ({ file: path.join(ROOT, relative), relative }))
  .filter(item => fs.existsSync(item.file) && !excluded.has(item.relative) && !item.relative.startsWith('verification/releases/'))
  .sort((a, b) => a.relative.localeCompare(b.relative));
const records = files.map(item => {
  const bytes = normalizedBytes(item.file);
  return { path: item.relative, bytes: bytes.length, sha256: sha256(bytes) };
});
const projectionSha256 = sha256(records.map(record => `${record.path}\0${record.bytes}\0${record.sha256}`).join('\n'));
const contractPath = 'corpus/programmes/frontier-physics-targets/corpus_completion_exit_criteria_v1.json';
const auditPath = 'corpus/programmes/frontier-physics-targets/adversarial_release_audit_v1.json';
const documentationPath = 'corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.json';
const contract = JSON.parse(fs.readFileSync(path.join(ROOT, contractPath), 'utf8'));
const audit = JSON.parse(fs.readFileSync(path.join(ROOT, auditPath), 'utf8'));
const documentation = JSON.parse(fs.readFileSync(path.join(ROOT, documentationPath), 'utf8'));
const gateStates = Object.fromEntries(contract.gates.map(gate => [gate.id, gate.status]));
const pass = Object.values(gateStates).every(status => status === 'passed') && contract.completionClaimAllowed === true
  && audit.summary?.pass === true && documentation.summary?.pass === true;
const output = {
  schema: 'frontier.corpus-saturation-release-certificate/1', date: '2026-10-25',
  status: pass ? 'dated_saturation_under_declared_protocol' : 'release_candidate_not_complete',
  authority: 'This certificate attests protocol saturation of a normalized scientific-content projection. It does not claim final truth, empirical confirmation, or exhaustion of nature and mathematics.',
  projection: {
    algorithm: 'Sort repository files by POSIX path; exclude self-referential certificates, release receipts and volatile generated navigation/search surfaces; normalize CRLF to LF for text; hash path, byte length and SHA-256 records.',
    sha256: projectionSha256, files: records.length, bytes: records.reduce((sum, record) => sum + record.bytes, 0), exclusions: [...excluded, 'verification/releases/**']
  },
  gates: gateStates,
  controls: {
    adversarialAuditSha256: sha256(Buffer.from(fs.readFileSync(path.join(ROOT, auditPath), 'utf8').replace(/\r\n/g, '\n'))),
    documentationGateSha256: sha256(Buffer.from(fs.readFileSync(path.join(ROOT, documentationPath), 'utf8').replace(/\r\n/g, '\n'))),
    requiredCleanCheckoutCommand: 'node tooling/release/run_corpus_release_audit.mjs --write-receipt <outside-or-excluded-receipt-path>',
    cleanCheckoutRequirement: 'The committed checkout must be clean before regeneration; every declared generator, every frontier verifier and all repository tests must pass; regeneration must leave no tracked diff.'
  },
  reopening: 'Any changed included file, failed gate, new adjacency, new evidence, new contradiction candidate, failed regeneration, or qualifying external result invalidates this certificate and requires a new dated release.'
};
const md = `# Corpus saturation release certificate v1\n\n**Date:** 25 October 2026  \n**Status:** ${output.status}  \n**Projection:** \`${projectionSha256}\`\n\n## Attestation\n\nAll nine exit gates pass for the normalized ${records.length.toLocaleString()}-file scientific-content projection identified above. This is a dated protocol-saturation result: the declared adjacency, exhausted-neighbourhood, experiment, theory, literature, implication, narrative, documentation/retrieval and adversarial-release obligations are closed together. It is not a claim that nature has no unknown physics, that every proposed bridge is true, or that the external experiments have already run.\n\nThe certificate excludes itself, release receipts and volatile generated navigation/search surfaces from its projection to avoid self-reference. Those surfaces remain separately hash-bound and freshness-tested. A clean checkout must run the release orchestrator, regenerate every declared derived surface, pass every frontier verifier and all repository tests, and retain no tracked diff.\n\nAny included-file change or reopening event invalidates this dated certificate.\n`;
if (WRITE) {
  fs.writeFileSync(path.join(ROOT, OUT_JSON), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUT_MD), md);
}
console.log(JSON.stringify({ result: pass ? 'pass' : 'not_ready', outputs: [OUT_JSON, OUT_MD], status: output.status, projection: output.projection }, null, 2));
if (!pass) process.exitCode = 1;
