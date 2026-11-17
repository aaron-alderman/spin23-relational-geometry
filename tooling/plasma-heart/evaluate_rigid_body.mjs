#!/usr/bin/env node
/** Typed rigid-body Euler response to non-collinear field torque. */
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..'); const I = [0.4, 0.5, 0.6], p = [0, 1e-8, 0], m = [1e-6, 0, 0], E0 = 100, B0 = 0.01, dt = 62.83185307179586 / 400;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const torque = (t) => { const E = [E0 * Math.cos(0.1 * t), 0, 0], B = [0, 0, B0 * (0.5 + Math.sin(0.1 * t + Math.PI / 2))]; const a = cross(p, E), b = cross(m, B); return a.map((v, i) => v + b[i]); };
const rhs = (t, w) => { const L = w.map((v, i) => I[i] * v); const gy = cross(w, L), q = torque(t); return q.map((v, i) => (v - gy[i]) / I[i]); };
let w = [0, 0, 0], integrated = [0, 0, 0]; for (let n = 0; n < 400; n += 1) { const t = n * dt, a = torque(t), k1 = rhs(t, w), k2 = rhs(t + dt / 2, w.map((v, i) => v + dt * k1[i] / 2)), k3 = rhs(t + dt / 2, w.map((v, i) => v + dt * k2[i] / 2)), k4 = rhs(t + dt, w.map((v, i) => v + dt * k3[i])); w = w.map((v, i) => v + dt * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6); integrated = integrated.map((v, i) => v + dt * (a[i] + torque(t + dt)[i]) / 2); }
const dL = w.map((v, i) => I[i] * v), residual = Math.hypot(...dL.map((v, i) => v - integrated[i])); const result = { protocol: 'plasma-heart-rigidbody/2', inertiaKgM2: I, finalOmegaRadPerS: w, angularMomentumChange: dL, integratedExternalTorque: integrated, balanceResidual: residual, passed: residual < 1e-8, physicalAdmission: false, scope: 'Typed rigid-body Euler screen; structural FSI and full coil/vessel coupling remain unresolved.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/rigid-body-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`); console.log(JSON.stringify(result, null, 2));
