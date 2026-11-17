import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = new URL('../../', import.meta.url);
const read = file => readFileSync(new URL(file, root), 'utf8');
const args = process.argv.slice(2);
const options = {};
for (let i = 0; i < args.length; i += 2) {
  if (!['--inline-output', '--standalone-output'].includes(args[i]) || !args[i + 1]) throw new Error('Usage: build_household_explorer_v2.mjs [--inline-output path] [--standalone-output path]');
  options[args[i].slice(2)] = args[i + 1];
}
const base = read('verification/derive/the_field_household_model_v1.mjs').replace(/^export /gm, '');
const adaptive = read('verification/derive/the_field_household_model_v2.mjs').replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '');
const engine = `${base}\n${adaptive}`;
if (engine.includes('</script>')) throw new Error('Closing script tag in engine');
const json = file => JSON.stringify(JSON.parse(read(file))).replaceAll('<', '\\u003c');
const fragment = read('tooling/the-field/household_explorer_v2.fragment.html')
  .replace('/* HOUSEHOLD_ENGINE */', () => engine)
  .replace('/* HOUSEHOLD_FIXTURE */', () => json('evidence/data/the-field/household-orientations-v1.json'))
  .replace('/* ADAPTIVE_FIXTURE */', () => json('evidence/data/the-field/household-orientations-v2.json'));
// Reuse only the existing standalone fallback style, not its engine or markup.
const builder = read('tooling/the-field/build_household_explorer.mjs');
const styles = builder.match(/const styles = `([\s\S]*?)`;/)?.[1];
if (!styles) throw new Error('Missing baseline fallback styles');
const output = resolve(options['standalone-output'] ?? 'preview/the-field/household-explorer-v2.html');
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Field adaptive household explorer</title><style>${styles}</style></head><body>${fragment}</body></html>\n`);
if (options['inline-output']) {
  const inline = resolve(options['inline-output']); mkdirSync(dirname(inline), { recursive: true }); writeFileSync(inline, fragment);
  console.log(`Inline: ${inline}`);
}
console.log(`Standalone: ${output}`);
