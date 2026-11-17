#!/usr/bin/env node
/** Emit an OpenFOAM case skeleton from a validated plasma-heart IR packet. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const inputArg = process.argv.indexOf('--input');
const outArg = process.argv.indexOf('--out');
if (inputArg < 0 || outArg < 0) { console.error('usage: node tooling/plasma-heart/emit_openfoam_case.mjs --input <packet.json> --out <case-dir>'); process.exit(2); }
const input = process.argv[inputArg + 1];
const outDir = path.resolve(root, process.argv[outArg + 1]);
const packet = JSON.parse(fs.readFileSync(path.resolve(root, input), 'utf8'));
const identity = packet.identity ?? {};
const geometry = packet.geometry ?? {};
const fields = packet.fluid ?? {};
const caseMeta = {
  protocol: 'plasma-heart-openfoam-case/1',
  source: input,
  meshIdentity: identity.meshIdentity ?? null,
  solverIdentity: identity.solverIdentity ?? null,
  faceCount: geometry.faceArea?.length ?? 0,
  physicalAdmission: false,
  scope: 'Generated OpenFOAM input skeleton; mesh, discretization, and solver outputs remain external evaluator data.'
};
fs.mkdirSync(path.join(outDir, 'constant'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'system'), { recursive: true });
fs.mkdirSync(path.join(outDir, '0'), { recursive: true });
fs.writeFileSync(path.join(outDir, 'case-meta.json'), `${JSON.stringify(caseMeta, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, 'system', 'controlDict'), `FoamFile\n{ version 2.0; format ascii; class dictionary; object controlDict; }\napplication plasmaHeartEvaluator; startFrom startTime; startTime 0; stopAt endTime; endTime 1; writeControl timeStep; writeInterval 1;\n`);
fs.writeFileSync(path.join(outDir, 'constant', 'README.txt'), `Plasma-heart IR lowering skeleton\nmeshIdentity=${caseMeta.meshIdentity}\nsolverIdentity=${caseMeta.solverIdentity}\nPopulate polyMesh and constitutive dictionaries from the external solver workflow.\n`);
fs.writeFileSync(path.join(outDir, '0', 'face-fields.json'), `${JSON.stringify({ faceArea: geometry.faceArea ?? [], outwardNormal: geometry.outwardNormal ?? [], density: fields.density ?? [], velocity: fields.velocity ?? [], pressure: fields.pressure ?? [], physicalAdmission: false }, null, 2)}\n`);
console.log(JSON.stringify({ ...caseMeta, output: path.relative(root, outDir) }, null, 2));
