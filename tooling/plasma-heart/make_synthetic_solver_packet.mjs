#!/usr/bin/env node
/** Create a explicitly synthetic legacy-shaped packet for IR-path testing. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const sourcePath = path.join(root, 'output/plasma-heart-algebra/3d-cycle-packet.json');
const outPath = path.join(root, 'output/plasma-heart-algebra/synthetic-resolved-packet.json');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const packet = JSON.parse(JSON.stringify(source));
packet.synthetic = true;
packet.syntheticWarning = 'Fields added for algebra/IR path testing only; not a physical solver result.';
for (const sample of packet.samples ?? []) {
  sample.metadata = { ...sample.metadata, solver: `${sample.metadata?.solver ?? 'legacy'}+synthetic-fields`, synthetic: true };
  for (const face of sample.faces ?? []) {
    face.electricField ??= [0, 0, 0];
    face.magneticField ??= [0, 0, 1];
    face.currentDensity ??= [0, 0, 0];
    face.conductivitySPerM ??= 1;
    face.electronDensityM3 ??= 1e18;
    face.radiationPowerFluxWPerM2 ??= 0;
    face.radiationDirection ??= [1, 0, 0];
    face.reactionHeat ??= 0;
    face.transportCoefficients ??= [];
    face.emissivity ??= 0;
  }
}
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(packet, null, 2)}\n`);
console.log(JSON.stringify({ protocol: 'plasma-heart-synthetic-packet/1', output: 'output/plasma-heart-algebra/synthetic-resolved-packet.json', samples: packet.samples?.length ?? 0, physicalAdmission: false }, null, 2));
