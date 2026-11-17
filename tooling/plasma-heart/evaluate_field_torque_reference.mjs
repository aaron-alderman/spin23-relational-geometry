#!/usr/bin/env node
/** Non-collinear dipole force/torque reference for the E/B port. */
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const period = 2 * Math.PI / 0.1, E0 = 100, B0 = 0.01, p = [0, 1e-8, 0], m = [1e-6, 0, 0], q = 1e-6, currentMoment = [0, 1e-2, 0], forceRows = [], torqueRows = [];
for (let k = 0; k <= 8; k += 1) { const time = period * k / 8, phase = 0.1 * time, E = [E0 * Math.cos(phase), 0, 0], B = [0, 0, B0 * (0.5 + Math.sin(phase + Math.PI / 2))], force = E.map((v, i) => q * v + cross(currentMoment, B)[i]), torque = cross(p, E).map((v, i) => v + cross(m, B)[i]); forceRows.push(force); torqueRows.push(torque); }
const integrate = (rows) => rows[0].map((_, i) => rows.slice(0, -1).reduce((sum, row, k) => sum + (row[i] + rows[k + 1][i]) * 0.5 * (period / 8) / period, 0));
const meanForceN = integrate(forceRows), meanTorqueNm = integrate(torqueRows); const result = { protocol: 'plasma-heart-3d-field-torque/1', meanForceN, meanTorqueNm, forceMagnitudeN: Math.hypot(...meanForceN), torqueMagnitudeNm: Math.hypot(...meanTorqueNm), physicalAdmission: false, scope: 'Non-collinear dipole screen; full coil and rigid-body coupling remain unresolved.' };
console.log(JSON.stringify(result, null, 2));
