#!/usr/bin/env node
/** Convert one legacy surface sample into the authored solver IR, or refuse explicitly. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const input = process.argv[2] ?? 'output/plasma-heart-algebra/3d-cycle-packet.json';
const sampleIndex = Number(process.argv[3] ?? 0);
const writeArg = process.argv.indexOf('--write');
const writePath = writeArg >= 0 ? process.argv[writeArg + 1] : null;
const source = JSON.parse(fs.readFileSync(path.resolve(root, input), 'utf8'));
const sample = source.samples?.[sampleIndex];
const meshIdentity = sample?.metadata?.meshHash ?? sample?.metadata?.meshIdentity;
const required = ['electricField', 'magneticField', 'currentDensity', 'conductivitySPerM', 'electronDensityM3', 'radiationPowerFluxWPerM2', 'radiationDirection'];
const missing = [];
if (!sample) missing.push(`sample[${sampleIndex}]`);
else if (typeof meshIdentity !== 'string' || !meshIdentity.trim()) missing.push(`sample[${sampleIndex}].metadata.meshIdentity`);
for (const [i, face] of (sample?.faces ?? []).entries()) for (const key of required) if (!(key in face)) missing.push(`sample[${sampleIndex}].face[${i}].${key}`);
if (missing.length) {
  console.log(JSON.stringify({ protocol: 'plasma-heart-legacy-conversion/1', converted: false, source: input, missing: [...new Set(missing)], physicalAdmission: false, refusal: 'legacy packet lacks fields required by solver IR' }, null, 2));
  process.exitCode = 1;
} else {
  const faces = sample.faces;
  const packet = {
    identity: { cycleId: source.cycleId ?? 'legacy', sampleIndex, time: sample.time, period: source.period ?? null, meshIdentity, solverIdentity: sample.metadata.solver },
    geometry: { faceArea: faces.map((f) => f.area), outwardNormal: faces.map((f) => f.normal), facePosition: faces.map((f) => f.position), forceOrigin: sample.metadata.forceOrigin },
    fluid: { density: faces.map((f) => f.density), velocity: faces.map((f) => f.velocity), pressure: faces.map((f) => f.pressure), temperature: faces.map((f) => f.wallTemperatureK), speciesDensities: faces.map((f) => f.speciesDensities) },
    electromagnetic: { electricField: faces.map((f) => f.electricField), magneticField: faces.map((f) => f.magneticField), maxwellStress: faces.map((f) => f.emStress), conductivity: faces.map((f) => f.conductivitySPerM), currentDensity: faces.map((f) => f.currentDensity) },
    thermal: { heatFlux: faces.map((f) => f.heatFlux), wallTemperature: faces.map((f) => f.wallTemperatureK), quenchRate: faces.map((f) => f.quenchRateSInv) },
    chemistry: { reactionSource: faces.map((f) => f.reactionSourceKgPerM3S), reactionHeat: faces.map((f) => f.reactionHeat ?? 0), transportCoefficients: faces.map((f) => f.transportCoefficients ?? []) },
    radiation: { radiationPowerFlux: faces.map((f) => f.radiationPowerFluxWPerM2), radiationDirection: faces.map((f) => f.radiationDirection), emissivityOrClosure: faces.map((f) => f.emissivity ?? null) },
    ledger: { inputPower: sample.inputPowerW, energyResidual: sample.energyResidualW, entropyProduction: sample.entropyProductionW, force: [0, 0, 0], torque: [0, 0, 0] },
    control: { stateEstimate: [0, 0], stateCovariance: [[1, 0], [0, 1]], controlCandidate: [sample.inputPowerW, 0, 0, 0], uncertaintyPenalty: 0, riskAdjustedScore: 0 }
  };
  const converted = { protocol: 'plasma-heart-legacy-conversion/1', converted: true, packet, physicalAdmission: false, synthetic: Boolean(source.synthetic) };
  if (writePath) { fs.mkdirSync(path.dirname(path.resolve(root, writePath)), { recursive: true }); fs.writeFileSync(path.resolve(root, writePath), `${JSON.stringify(packet, null, 2)}\n`); }
  console.log(JSON.stringify({ ...converted, packet: writePath ? undefined : packet, output: writePath ?? null }, null, 2));
}
