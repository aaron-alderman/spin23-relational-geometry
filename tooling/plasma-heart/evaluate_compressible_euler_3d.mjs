#!/usr/bin/env node
/**
 * Conservative ideal-gas 3-D finite-volume reference.
 * Rusanov fluxes and the same boundary/model limits as the retired Python
 * reference; this is a numerical evaluator, not physical admission.
 */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const GAMMA = 1.4, R = 287.05;
const primitive = (U, off) => {
  const rho = Math.max(U[off], 1e-6), vx = U[off + 1] / rho, vy = U[off + 2] / rho, vz = U[off + 3] / rho;
  const kinetic = 0.5 * rho * (vx * vx + vy * vy + vz * vz);
  const p = Math.max((GAMMA - 1) * (U[off + 4] - kinetic), 1);
  return [rho, vx, vy, vz, p];
};
const flux = (U, off, axis) => {
  const [rho, vx, vy, vz, p] = primitive(U, off), v = [vx, vy, vz], vn = v[axis];
  return [rho * vn, rho * vx * vn + (axis === 0 ? p : 0), rho * vy * vn + (axis === 1 ? p : 0), rho * vz * vn + (axis === 2 ? p : 0), (U[off + 4] + p) * vn];
};
const rusanov = (U, lo, hi, axis) => {
  const fl = flux(U, lo, axis), fr = flux(U, hi, axis), pl = primitive(U, lo), pr = primitive(U, hi);
  const al = Math.sqrt(GAMMA * pl[4] / pl[0]), ar = Math.sqrt(GAMMA * pr[4] / pr[0]);
  const speed = Math.max(Math.abs(pl[1 + axis]) + al, Math.abs(pr[1 + axis]) + ar);
  return fl.map((value, q) => 0.5 * (value + fr[q]) - 0.5 * speed * (U[hi + q] - U[lo + q]));
};
const rusanovStates = (left, right, axis) => {
  const U = new Float64Array(10); U.set(left, 0); U.set(right, 5); return rusanov(U, 0, 5, axis);
};
const solve = (n, steps = 100) => {
  const nx = n, ny = Math.max(5, Math.floor(n / 2)), nz = Math.max(5, Math.floor(n / 2));
  const lx = 1, ly = 0.42, lz = 0.42, dx = lx / nx, dy = ly / ny, dz = lz / nz, cellCount = nx * ny * nz;
  const U = new Float64Array(cellCount * 5), rho0 = 1.15, u0 = 0.22, p0 = 101325, E0 = p0 / (GAMMA - 1) + 0.5 * rho0 * u0 * u0;
  const inlet = [rho0, rho0 * u0, 0, 0, E0], id = (i, j, k) => ((i * ny + j) * nz + k) * 5;
  for (let i = 0; i < nx; i += 1) for (let j = 0; j < ny; j += 1) for (let k = 0; k < nz; k += 1) { const o = id(i, j, k); U.set(inlet, o); }
  const face = (name, velocity, density, pressure, normal, area, position) => ({ name, velocity, density, pressure, normal, area, position, heatFlux: 0, emStress: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] });
  for (let step = 0; step < steps; step += 1) {
    let maxSignal = 1e-9;
    for (let i = 0; i < nx; i += 1) for (let j = 0; j < ny; j += 1) for (let k = 0; k < nz; k += 1) { const o = id(i, j, k), p = primitive(U, o); maxSignal = Math.max(maxSignal, Math.abs(p[1]) + Math.sqrt(GAMMA * p[4] / p[0]), Math.abs(p[2]) + Math.sqrt(GAMMA * p[4] / p[0]), Math.abs(p[3]) + Math.sqrt(GAMMA * p[4] / p[0])); }
    const dt = 0.35 * Math.min(dx, dy, dz) / maxSignal, gx = new Float64Array((nx + 1) * ny * nz * 5), gy = new Float64Array(nx * (ny + 1) * nz * 5), gz = new Float64Array(nx * ny * (nz + 1) * 5);
    const gxid = (i, j, k) => ((i * ny + j) * nz + k) * 5, gyid = (i, j, k) => ((i * (ny + 1) + j) * nz + k) * 5, gzid = (i, j, k) => ((i * ny + j) * (nz + 1) + k) * 5;
    for (let j = 0; j < ny; j += 1) for (let k = 0; k < nz; k += 1) { let f = rusanovStates(inlet, U.slice(id(0, j, k), id(0, j, k) + 5), 0); gx.set(f, gxid(0, j, k)); for (let i = 1; i < nx; i += 1) gx.set(rusanov(U, id(i - 1, j, k), id(i, j, k), 0), gxid(i, j, k)); f = rusanov(U, id(nx - 1, j, k), id(nx - 1, j, k), 0); gx.set(f, gxid(nx, j, k)); }
    for (let i = 0; i < nx; i += 1) for (let k = 0; k < nz; k += 1) { for (let j = 1; j < ny; j += 1) gy.set(rusanov(U, id(i, j - 1, k), id(i, j, k), 1), gyid(i, j, k)); const left = id(i, 0, k), right = id(i, ny - 1, k), yl = new Float64Array(U.slice(left, left + 5)), yr = new Float64Array(U.slice(right, right + 5)); yl[2] *= -1; yr[2] *= -1; gy.set(rusanovStates(yl, U.slice(left, left + 5), 1), gyid(i, 0, k)); gy.set(rusanovStates(U.slice(right, right + 5), yr, 1), gyid(i, ny, k)); }
    for (let i = 0; i < nx; i += 1) for (let j = 0; j < ny; j += 1) { for (let k = 1; k < nz; k += 1) gz.set(rusanov(U, id(i, j, k - 1), id(i, j, k), 2), gzid(i, j, k)); const low = id(i, j, 0), high = id(i, j, nz - 1), zl = new Float64Array(U.slice(low, low + 5)), zh = new Float64Array(U.slice(high, high + 5)); zl[3] *= -1; zh[3] *= -1; gz.set(rusanovStates(zl, U.slice(low, low + 5), 2), gzid(i, j, 0)); gz.set(rusanovStates(U.slice(high, high + 5), zh, 2), gzid(i, j, nz)); }
    const next = new Float64Array(U);
    for (let i = 0; i < nx; i += 1) for (let j = 0; j < ny; j += 1) for (let k = 0; k < nz; k += 1) { const o = id(i, j, k), fx = gxid(i, j, k), fy = gyid(i, j, k), fz = gzid(i, j, k); for (let q = 0; q < 5; q += 1) next[o + q] = U[o + q] - dt * ((gx[fx +  q] - gx[fx + 5 + q]) / dx + (gy[fy + q] - gy[fy + 5 * nz + q]) / dy + (gz[fz + q] - gz[fz + 5 + q]) / dz); next[o] = Math.max(next[o], 1e-6); }
    U.set(next);
  }
  const faces = [], x = (i) => (i + 0.5) * dx, y = (j) => (j + 0.5) * dy - ly / 2, z = (k) => (k + 0.5) * dz - lz / 2;
  for (let j = 0; j < ny; j += 1) for (let k = 0; k < nz; k += 1) { const o = id(nx - 1, j, k), p = primitive(U, o); faces.push(face('inlet', [u0, 0, 0], rho0, p0, [-1, 0, 0], dy * dz, [0, y(j), z(k)])); faces.push(face('outlet', [p[1], p[2], p[3]], p[0], p[4], [1, 0, 0], dy * dz, [lx, y(j), z(k)])); }
  for (let i = 0; i < nx; i += 1) for (let k = 0; k < nz; k += 1) { for (const [j, name, normal, pos] of [[0, 'yminus', [0, -1, 0], [x(i), -ly / 2, z(k)]], [ny - 1, 'yplus', [0, 1, 0], [x(i), ly / 2, z(k)]]]) { const o = id(i, j, k), p = primitive(U, o); faces.push(face(name, [p[1], p[2], p[3]], p[0], p[4], normal, dx * dz, pos)); } }
  for (let i = 0; i < nx; i += 1) for (let j = 0; j < ny; j += 1) for (const [k, name, normal, pos] of [[0, 'zminus', [0, 0, -1], [x(i), y(j), -lz / 2]], [nz - 1, 'zplus', [0, 0, 1], [x(i), y(j), lz / 2]]]) { const o = id(i, j, k), p = primitive(U, o); faces.push(face(name, [p[1], p[2], p[3]], p[0], p[4], normal, dx * dy, pos)); }
  const integrated = { forceN: [0, 0, 0], forceMagnitudeN: 0 };
  for (const f of faces) { const vn = f.velocity[0] * f.normal[0] + f.velocity[1] * f.normal[1] + f.velocity[2] * f.normal[2], fluxMass = f.density * vn; for (let q = 0; q < 3; q += 1) integrated.forceN[q] += f.area * (fluxMass * f.velocity[q] + f.pressure * f.normal[q]); }
  integrated.forceMagnitudeN = Math.hypot(...integrated.forceN);
  return { grid: { nx, ny, nz, dx, dy, dz }, faces, integrated, solver: 'compressible-euler-rusanov-reference/2', physicalAdmission: false };
};
const packets = [8, 12, 16].map((n) => solve(n));
const magnitudes = packets.map((p) => p.integrated.forceMagnitudeN), relativeLastRefinement = Math.abs(magnitudes[2] - magnitudes[1]) / Math.max(magnitudes[2], 1e-30);
const result = { protocol: 'plasma-heart-compressible-euler-3d/2', packets, meshConverged: relativeLastRefinement < 0.1, relativeLastRefinement, explicitFaceFields: true, conservativeUpdate: true, physicalAdmission: false, scope: 'Conservative ideal-gas reference; no turbulence, chemistry, Maxwell, radiation, or hardware validation.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/compressible-euler-3d-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ meshConverged: result.meshConverged, relativeLastRefinement, forceN: magnitudes[2], physicalAdmission: false }, null, 2));
