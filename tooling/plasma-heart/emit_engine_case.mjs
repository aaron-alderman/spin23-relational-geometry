#!/usr/bin/env node
/** Emit a solver-specific case plan from the common plasma-heart IR. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const inputArg = process.argv.indexOf('--input');
const engineArg = process.argv.indexOf('--engine');
const outArg = process.argv.indexOf('--out');
if (inputArg < 0 || engineArg < 0 || outArg < 0) { console.error('usage: node tooling/plasma-heart/emit_engine_case.mjs --engine <elmer|su2|precice> --input <packet.json> --out <dir>'); process.exit(2); }
const engine = process.argv[engineArg + 1];
const input = process.argv[inputArg + 1];
const outDir = path.resolve(root, process.argv[outArg + 1]);
const packet = JSON.parse(fs.readFileSync(path.resolve(root, input), 'utf8'));
const lowering = {
  elmer: { file: 'case.sif', text: 'Header\n  CHECK KEYWORDS Warn\nEnd\n! Populate mesh and material equations from plasma-heart IR\n' },
  su2: { file: 'config.cfg', text: 'SOLVER= RANS\nKIND_TURB_MODEL= NONE\n% Plasma-heart IR lowering skeleton; provide mesh and boundary markers\n' },
  precice: { file: 'precice-config.xml', text: '<precice-configuration>\n  <!-- Plasma-heart interface plan; attach exchanged IR fields -->\n</precice-configuration>\n' }
};
if (!lowering[engine]) { console.error(`unsupported engine: ${engine}`); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });
const meta = { protocol: 'plasma-heart-engine-case/1', engine, source: input, meshIdentity: packet.identity?.meshIdentity ?? null, solverIdentity: packet.identity?.solverIdentity ?? null, physicalAdmission: false, evaluatorOnly: true, scope: 'Engine-specific input plan; no solver execution or physical result is inferred.' };
fs.writeFileSync(path.join(outDir, 'case-meta.json'), `${JSON.stringify(meta, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, lowering[engine].file), lowering[engine].text);
fs.writeFileSync(path.join(outDir, 'packet-sections.json'), `${JSON.stringify(Object.keys(packet), null, 2)}\n`);
console.log(JSON.stringify({ ...meta, output: path.relative(root, outDir), emitted: lowering[engine].file }, null, 2));
