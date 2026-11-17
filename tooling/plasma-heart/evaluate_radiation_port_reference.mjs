#!/usr/bin/env node
/** Directed photon-recoil reference for the authored radiation port. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const packet = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-packet.json'), 'utf8'));
const c = 299792458, thermalDirectivity = 0.35, laserFraction = 0.05, rawDirection = [1, 0.08, 0]; const directionNorm = Math.hypot(...rawDirection); const portDirection = rawDirection.map((x) => x / directionNorm);
const samples = packet.samples.map((sample) => { const outlet = sample.faces.find((face) => face.name === 'outlet'); const thermalPower = Math.max(0, outlet.heatFlux) * outlet.area; const laserPower = Math.max(0, sample.inputPowerW) * laserFraction; const directedThermal = thermalDirectivity * thermalPower; const directedPower = directedThermal + laserPower; const recoil = portDirection.map((x) => -directedPower * x / c); return { time: sample.time, thermalPortPowerW: thermalPower, directedThermalPowerW: directedThermal, laserPortPowerW: laserPower, directedRadiationPowerW: directedPower, photonRecoilN: recoil, photonRecoilMagnitudeN: Math.hypot(...recoil), portDirection }; });
const result = { protocol: 'plasma-heart-radiation-port-reference/1', samples, thermalDirectivity, laserFractionOfDrive: laserFraction, maxPhotonRecoilN: Math.max(...samples.map((x) => x.photonRecoilMagnitudeN)), meanDirectedRadiationPowerW: samples.reduce((s, x) => s + x.directedRadiationPowerW, 0) / samples.length, energyClosureProvided: true, photonMomentumExplicit: true, materialMomentumSeparate: true, physicalAdmission: false, scope: 'Directed photon recoil reference; radiative transfer, emissivity, laser boundary conditions, and optical losses remain unresolved.' };
console.log(JSON.stringify(result, null, 2));
