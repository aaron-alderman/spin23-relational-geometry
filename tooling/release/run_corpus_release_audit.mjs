#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const receiptIndex = process.argv.indexOf('--write-receipt');
const receiptPath = receiptIndex >= 0 ? process.argv[receiptIndex + 1] : null;
const run = (command, args) => {
  const started = Date.now();
  const result = spawnSync(command, args, { cwd: ROOT, encoding: 'utf8', shell: false, maxBuffer: 64 * 1024 * 1024 });
  return { command: [command, ...args].join(' '), status: result.status, durationMs: Date.now() - started, stdoutTail: (result.stdout ?? '').slice(-2000), stderrTail: (result.stderr ?? '').slice(-2000) };
};
const git = args => run('git', args);
const initialStatus = git(['status', '--porcelain']);
if (initialStatus.status !== 0 || initialStatus.stdoutTail.trim()) {
  console.error(JSON.stringify({ result: 'fail', reason: 'checkout is not clean', status: initialStatus }, null, 2));
  process.exit(1);
}
const head = git(['rev-parse', 'HEAD']);
const tree = git(['rev-parse', 'HEAD^{tree}']);
const steps = [];
const generators = [
  // Source-derived identities must be current before any graph records their
  // hashes. This makes a clean release converge even after authorial prose
  // changes, rather than assuming a separately refreshed manifest.
  ['tooling/indexing/refresh_corpus_entry_surfaces.mjs', '--write'],
  ['scripts/generate-frontier-wave-gate-audit.mjs', '--write'],
  ['scripts/generate-physics-math-adjacency-candidates.mjs', '--write'],
  ['scripts/generate-terminal-neighbourhood-candidates.mjs', '--write'],
  ['scripts/generate-frontier-experiment-atlas.mjs', '--write'],
  ['scripts/generate-frontier-experiment-programmes-v2.mjs', '--write'],
  ['scripts/generate-frontier-complexity-cards.mjs', '--write'],
  ['scripts/generate-experiment-exit-audit.mjs', '--write'],
  ['scripts/generate-full-corpus-frontier-gate-census.mjs', '--write'],
  ['scripts/generate-physics-math-object-expansion.mjs', '--write'],
  ['scripts/generate-theory-bridge-audit.mjs', '--write'],
  ['scripts/generate-claim-implication-defeat-graph.mjs', '--write'],
  ['scripts/generate-standalone-narrative-audit.mjs', '--write'],
  ['scripts/generate-adversarial-release-audit.mjs', '--write'],
  ['tooling/indexing/refresh_corpus_entry_surfaces.mjs', '--write'],
  ['tooling/search/run_benchmark.mjs', '--write'],
  ['tooling/search/generate_sourcery_admission_candidate.mjs', '--write'],
  ['scripts/generate-documentation-linking-retrieval-gate.mjs', '--write'],
  ['tooling/indexing/refresh_corpus_entry_surfaces.mjs', '--write'],
  ['tooling/search/run_benchmark.mjs', '--write'],
  ['tooling/search/generate_sourcery_admission_candidate.mjs', '--write'],
  ['scripts/generate-documentation-linking-retrieval-gate.mjs', '--write'],
  ['scripts/generate-corpus-release-certificate.mjs', '--write']
];
for (const args of generators) {
  const result = run(process.execPath, args);
  steps.push({ kind: 'generator', ...result });
  if (result.status !== 0) break;
}
const verifierFiles = fs.readdirSync(path.join(ROOT, 'verification/frontier-physics-targets')).filter(name => /^verify_.*\.mjs$/u.test(name)).sort();
if (steps.every(step => step.status === 0)) for (const name of verifierFiles) {
  const result = run(process.execPath, [`verification/frontier-physics-targets/${name}`]);
  steps.push({ kind: 'verifier', ...result });
  if (result.status !== 0) break;
}
const testFiles = fs.readdirSync(path.join(ROOT, 'tests/repository')).filter(name => name.endsWith('.test.mjs')).sort().map(name => `tests/repository/${name}`);
if (steps.every(step => step.status === 0)) steps.push({ kind: 'test-suite', ...run(process.execPath, ['--test', ...testFiles]) });
if (steps.every(step => step.status === 0)) steps.push({ kind: 'diff-check', ...git(['diff', '--exit-code']) });
const finalStatus = git(['status', '--porcelain']);
const pass = initialStatus.status === 0 && steps.every(step => step.status === 0) && finalStatus.status === 0 && !finalStatus.stdoutTail.trim();
const certificatePath = path.join(ROOT, 'corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.json');
const certificate = fs.existsSync(certificatePath) ? JSON.parse(fs.readFileSync(certificatePath, 'utf8')) : null;
const receipt = {
  schema: 'frontier.clean-checkout-release-receipt/1', date: '2026-10-25', result: pass ? 'pass' : 'fail',
  checkout: { commit: head.stdoutTail.trim(), tree: tree.stdoutTail.trim(), initiallyClean: !initialStatus.stdoutTail.trim(), finallyClean: !finalStatus.stdoutTail.trim() },
  projectionSha256: certificate?.projection?.sha256 ?? null,
  summary: { generators: steps.filter(step => step.kind === 'generator').length, verifiers: steps.filter(step => step.kind === 'verifier').length, repositoryTestFiles: testFiles.length, failedSteps: steps.filter(step => step.status !== 0).length },
  steps,
  receiptSha256: null
};
receipt.receiptSha256 = crypto.createHash('sha256').update(JSON.stringify({ ...receipt, receiptSha256: null })).digest('hex');
if (receiptPath) {
  const target = path.resolve(ROOT, receiptPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(receipt, null, 2)}\n`);
}
console.log(JSON.stringify({ result: receipt.result, checkout: receipt.checkout, projectionSha256: receipt.projectionSha256, summary: receipt.summary, receiptSha256: receipt.receiptSha256, receiptPath }, null, 2));
if (!pass) process.exitCode = 1;
