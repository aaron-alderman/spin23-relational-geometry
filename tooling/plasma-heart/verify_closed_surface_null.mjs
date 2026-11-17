#!/usr/bin/env node
/** Verify the algebraic closed-surface null invariant. */
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const faces = [[1, 0, 0, [100, 0, 0]], [-1, 0, 0, [-100, 0, 0]], [0, 1, 0, [0, 100, 0]], [0, -1, 0, [0, -100, 0]]].map(([nx, ny, nz, velocity]) => ({ area: 1, normal: [nx, ny, nz], position: [0, 0, 0], velocity, density: 1, pressure: 10 }));
const force = [0, 0, 0]; const torque = [0, 0, 0];
for (const face of faces) {
  const flux = dot(face.velocity, face.normal);
  const dForce = face.velocity.map((v, i) => face.area * (face.density * flux * v + face.pressure * face.normal[i]));
  dForce.forEach((v, i) => { force[i] += v; });
  const dTorque = cross(face.position, dForce); dTorque.forEach((v, i) => { torque[i] += v; });
}
const magnitude = Math.hypot(...force);
const result = { protocol: 'plasma-heart-closed-surface-null/1', result: { forceN: force, forceMagnitudeN: magnitude, torqueNm: torque }, passed: magnitude < 1e-12 && torque.every((value) => value === 0), physicalAdmission: false, meaning: 'Internal recirculation is not an external momentum port.' };
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
