#!/usr/bin/env node
/** Conductivity/skin-depth constitutive reference; not a coupled plasma solve. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const packet = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-packet.json'), 'utf8'));
const E = 1.602176634e-19, me = 9.1093837e-31, mu0 = 4e-7 * Math.PI;
const period = packet.period, omega = 2 * Math.PI / period, resistance = 4, inductance = 0.2, voltage = 10, impedance = Math.sqrt(resistance ** 2 + (2 * Math.PI / period * inductance) ** 2), currentAmp = voltage / impedance;
const samples = packet.samples.map((sample, index) => { const phase = 2 * Math.PI * index / Math.max(packet.samples.length - 1, 1), current = currentAmp * Math.cos(phase - Math.atan2((2 * Math.PI / period) * inductance, resistance)), species = sample.faces?.[0]?.speciesDensities ?? {}, electronDensity = 1e18 * Math.max(species.A ?? 0.7, 1e-6), collision = 2e9 * (1 + 0.2 * Math.abs(current) / Math.max(Math.abs(currentAmp), 1e-9)), conductivity = electronDensity * E ** 2 / (me * collision), skinDepth = Math.sqrt(2 / (mu0 * conductivity * omega)), attenuation = 1 / (1 + (0.02 / skinDepth) ** 2), joule = conductivity * (0.018 * current / Math.max(Math.abs(currentAmp), 1e-9)) ** 2 * 1e-6; return { time: sample.time, electronDensityM3: electronDensity, collisionFrequencySInv: collision, conductivitySPerM: conductivity, skinDepthM: skinDepth, fieldAttenuation: attenuation, plasmaJouleLossW: joule }; });
const result = { protocol: 'plasma-heart-plasma-conductivity-reference/1', samples, maxConductivitySPerM: Math.max(...samples.map((x) => x.conductivitySPerM)), minSkinDepthM: Math.min(...samples.map((x) => x.skinDepthM)), allFinite: samples.every((x) => Number.isFinite(x.fieldAttenuation)), positiveDissipation: samples.every((x) => x.plasmaJouleLossW >= 0), physicalAdmission: false, scope: 'Conductivity/skin-depth reference; induced-current solve and plasma transport remain unresolved.' };
console.log(JSON.stringify(result, null, 2));
