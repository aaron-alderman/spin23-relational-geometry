import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = new URL('../../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const template = read('tooling/the-field/household_explorer.fragment.html');
const engine = read('verification/derive/the_field_household_model_v1.mjs').replace(/^export /gm, '');
const fixture = JSON.stringify(JSON.parse(read('evidence/data/the-field/household-orientations-v1.json'))).replaceAll('<', '\\u003c');
if (engine.includes('</script>')) throw new Error('Engine contains a closing script tag');
const fragment = template.replace('/* HOUSEHOLD_ENGINE */', () => engine).replace('/* HOUSEHOLD_FIXTURE */', () => fixture);
const output = resolve('preview/the-field/household-explorer.html');
mkdirSync(dirname(output), { recursive: true });
// Standalone fallback styles apply only outside the conversation. The fragment
// uses the host's native theme and controls; both views execute the same engine.
const styles = `
:root { color-scheme: light dark; --font-size-base: 15px; --background: light-dark(#fff,#171717); --foreground: light-dark(#202020,#eee); --muted-foreground: light-dark(#555,#bbb); --border: light-dark(#ddd,#444); }
body { margin: 0 auto; max-width: 1024px; padding: 24px; font: 400 var(--font-size-base)/1.5 system-ui,sans-serif; background: var(--background); color: var(--foreground); }
h2 { font-size: 1.3em; font-weight: 500; margin: 0; } .text-small { font-size: .85em; } .text-muted { color: var(--muted-foreground); }
.viz-controls { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 16px; }
.form-label { display: grid; gap: 4px; min-width: 0; } .form-select { font: inherit; padding: 8px; width: 100%; box-sizing: border-box; }
.form-range { width: 100%; margin: 4px 0; } .tabular-nums { font-variant-numeric: tabular-nums; } .table-responsive { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; } th,td { padding: 8px 10px; border-bottom: 1px solid var(--border); text-align: left; }
th { font-weight: 500; } .text-end { text-align: right; } .text-nowrap { white-space: nowrap; } .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
summary { padding: 8px 0; } .text-destructive { color: light-dark(#a32626,#ff9c9c); } [hidden] { display: none !important; }
@media(max-width:600px) { body { padding: 16px; } .viz-controls { grid-template-columns: 1fr; } }
`;
writeFileSync(output, `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Field household explorer</title><style>${styles}</style></head><body>${fragment}</body></html>\n`);
const args = process.argv.slice(2);
if (args.length) {
  if (args.length !== 2 || args[0] !== '--inline-output') throw new Error('Usage: node tooling/the-field/build_household_explorer.mjs [--inline-output path]');
  const inline = resolve(args[1]);
  mkdirSync(dirname(inline), { recursive: true });
  writeFileSync(inline, fragment);
  console.log(`Inline: ${inline}`);
}
console.log(`Standalone: ${output}`);
