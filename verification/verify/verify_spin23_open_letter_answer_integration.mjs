import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const ledgerPath = path.join(root, 'evidence', 'data', 'spin23-open-letter-answer-assessment.json');
const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
const failures = [];

if (ledger.letters.length !== 8) failures.push('expected eight assessed letters');
if (ledger.programmePackets.length !== 4) failures.push('expected four programme packets');

for (let i = 1; i <= 8; i += 1) {
  const suffix = String(i).padStart(3, '0');
  const letter = ledger.letters[i - 1];
  const source = path.join(root, 'evidence', 'sources', 'spin23-open-letter-answers', `ol-${suffix}-standalone-chatgpt-answer.md`);
  if (letter.id !== `OL-${suffix}`) failures.push(`letter order mismatch at ${suffix}`);
  if (letter.claimId !== 1624 + i) failures.push(`claim mapping mismatch for OL-${suffix}`);
  if (!letter.established.length || !letter.conditional.length || !letter.open.length) failures.push(`incomplete adjudication for OL-${suffix}`);
  if (!fs.existsSync(source) || fs.statSync(source).size < 1000) failures.push(`missing or truncated source ${source}`);
}

for (let id = 1625; id <= 1633; id += 1) {
  const dir = path.join(root, 'corpus', 'claims', '1600-1699');
  const hit = fs.readdirSync(dir).filter((name) => name.startsWith(`${id}_`));
  if (hit.length !== 1) failures.push(`expected exactly one claim file for ${id}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS: eight answer sources, eight adjudications, four programme packets and claims 1625-1633 are integrated.');
