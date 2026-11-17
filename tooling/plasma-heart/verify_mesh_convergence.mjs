#!/usr/bin/env node
/** Synthetic surface-momentum mesh convergence regression in the solver algebra. */
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const norm = (a) => Math.hypot(...a);
const integrate = (faces) => {
  const force = [0, 0, 0]; const torque = [0, 0, 0];
  for (const face of faces) {
    if (face.area <= 0 || Math.abs(norm(face.normal) - 1) > 1e-12) throw new Error('positive area and unit normal required');
    const em = (face.emStress ?? [[0, 0, 0], [0, 0, 0], [0, 0, 0]]).map((row) => dot(row, face.normal));
    const traction = face.velocity.map((value, i) => face.density * dot(face.velocity, face.normal) * value + face.pressure * face.normal[i] - em[i]);
    const dForce = traction.map((value) => face.area * value);
    dForce.forEach((value, i) => { force[i] += value; });
    const dTorque = cross(face.position, dForce); dTorque.forEach((value, i) => { torque[i] += value; });
  }
  return { forceMagnitudeN: norm(force), forceN: force, torqueNm: torque };
};
const rows = [];
for (const n of [1, 2, 4, 8, 16]) {
  const faces = [];
  for (const base of [{ area: 1e-4, normal: [1, 0, 0], position: [0.05, 0, 0], velocity: [300, 0, 0], density: 1e-6, pressure: 0 }, { area: 1e-4, normal: [-1, 0, 0], position: [-0.05, 0, 0], velocity: [-250, 0, 0], density: 0.8e-6, pressure: 0 }]) for (let i = 0; i < n; i += 1) faces.push({ ...base, area: base.area / n });
  rows.push({ subdivisionsPerFace: n, ...integrate(faces) });
}
const reference = rows.at(-1).forceMagnitudeN;
const relativeChanges = rows.map((row) => Math.abs(row.forceMagnitudeN - reference) / reference);
const result = { protocol: 'plasma-heart-surface-convergence/1', rows, maxRelativeForceChange: Math.max(...relativeChanges), passed: Math.max(...relativeChanges) < 1e-12, physicalAdmission: false, scope: 'Synthetic mesh regression only; real CFD/Maxwell fields require actual mesh refinement.' };
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
