import { spawnSync } from 'node:child_process';
import process from 'node:process';

const pattern = String.raw`[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]`;
const args = [
  '--with-filename',
  '--line-number',
  '--color', 'never',
  '--glob', '*.md',
  '--glob', '*.tex',
  '--glob', '*.txt',
  pattern,
  'corpus',
  'docs',
];
const scan = spawnSync('rg', args, {
  cwd: new URL('../..', import.meta.url),
  encoding: 'utf8',
  maxBuffer: 16 * 1024 * 1024,
});

if (scan.error) {
  console.error(JSON.stringify({ result: 'error', message: scan.error.message }));
  process.exit(2);
}
if (scan.status === 0) {
  console.error(JSON.stringify({
    result: 'fail',
    policy: 'TAB, LF and CR are permitted; all other C0 controls and DEL are forbidden in corpus and documentation prose',
    matches: scan.stdout.split(/\r?\n/).filter(Boolean),
  }, null, 2));
  process.exit(1);
}
if (scan.status !== 1) {
  console.error(JSON.stringify({ result: 'error', status: scan.status, stderr: scan.stderr }));
  process.exit(2);
}

console.log(JSON.stringify({
  result: 'pass',
  forbiddenControlCharacters: 0,
  policy: 'TAB, LF and CR are permitted; all other C0 controls and DEL are forbidden in corpus and documentation prose',
}));
