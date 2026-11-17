#!/usr/bin/env node
/** Audit an external solver source for resolved per-face fields; scalar data is never promoted. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const input = process.argv[2] ?? 'output/plasma-heart-cfd/bilobe-re0.5.json';
const sourcePath = path.resolve(root, input);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const required = ['area', 'normal', 'position', 'velocity', 'density', 'pressure', 'emStress', 'heatFlux'];
const available = required.filter((key) => key in data);
const missing = required.filter((key) => !(key in data));
const result = { protocol: 'plasma-heart-solver-source-audit/1', source: input, sourceConverged: data.converged === true, scalarFlux: data.flux ?? null, scalarForce: data.force ?? null, availableSurfaceFields: available, missingSurfaceFields: missing, admittedAsResolvedSurface: missing.length === 0 && Array.isArray(data.faces), physicalAdmission: false, conclusion: 'Scalar solver output may support calibration or mesh checks, but cannot replace per-face momentum-flux integration.' };
console.log(JSON.stringify(result, null, 2));
