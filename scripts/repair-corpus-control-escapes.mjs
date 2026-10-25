import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const write = process.argv.includes('--write');
const replacements = [
  ['\f' + 'rac', String.raw`\frac`],
  ['\b' + 'egin', String.raw`\begin`],
  ['\b' + 'eta', String.raw`\beta`],
  ['\b' + 'ar', String.raw`\bar`],
  ['\b' + 'ig', String.raw`\big`],
  ['\v' + 'arepsilon', String.raw`\varepsilon`],
  ['\v' + 'arphi', String.raw`\varphi`],
  ['\r' + 'ho', String.raw`\rho`],
  ['\r' + 'm', String.raw`\rm`],
];
const pathSpecificReplacements = new Map([
  [
    'corpus/claims/0700-0799/724_a_minimal_cp_spurion_kernel_generically_removes_the_selector_circle_and_gives_the_response_angle_a_calculable_curvature.md',
    [['\t' + 'heta', String.raw`\theta`]],
  ],
  [
    'corpus/claims/0900-0999/966_two_jordan_cone_charts_cover_every_positive_a2_loss_density_and_their_transition_is_the_hopf_complex_structure.md',
    [['\t' + 'o', String.raw`\to`]],
  ],
]);

function* markdownFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* markdownFiles(absolute);
    else if (entry.isFile() && entry.name.endsWith('.md')) yield absolute;
  }
}

const changes = [];
for (const absolute of markdownFiles(path.join(root, 'corpus'))) {
  const relative = path.relative(root, absolute).replaceAll('\\', '/');
  const before = fs.readFileSync(absolute, 'utf8');
  let after = before;
  const applied = [];
  for (const [bad, good] of [...replacements, ...(pathSpecificReplacements.get(relative) ?? [])]) {
    const count = after.split(bad).length - 1;
    if (count === 0) continue;
    after = after.replaceAll(bad, good);
    applied.push({ replacement: JSON.stringify(bad), count });
  }
  if (after === before) continue;
  changes.push({ path: relative, applied });
  if (write) fs.writeFileSync(absolute, after, 'utf8');
}

console.log(JSON.stringify({ mode: write ? 'write' : 'dry-run', files: changes.length, changes }, null, 2));
if (!write && changes.length > 0) process.exitCode = 1;
