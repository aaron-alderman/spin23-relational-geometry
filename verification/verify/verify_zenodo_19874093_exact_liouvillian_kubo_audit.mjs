import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'zenodo-19874093-exact-liouvillian-kubo-audit.json'), 'utf8'));

function sigmaPhen(mass, gamma, n) {
  const dk = 2 * Math.PI / n;
  let sum = 0;
  for (let ix = 0; ix < n; ix++) {
    const kx = -Math.PI + ix * dk;
    const sx = Math.sin(kx), cx = Math.cos(kx);
    for (let iy = 0; iy < n; iy++) {
      const ky = -Math.PI + iy * dk;
      const sy = Math.sin(ky), cy = Math.cos(ky);
      const dz = mass + cx + cy;
      const d2 = sx * sx + sy * sy + dz * dz;
      const d = Math.sqrt(d2);
      const numerator = sx * sx * cy + sy * cx * sy + dz * cx * cy;
      const omega = 0.5 * numerator / (d * d * d + 1e-12);
      const damping = 4 * d2 / (4 * d2 + gamma * gamma);
      sum += omega * damping;
    }
  }
  return sum * dk * dk / (2 * Math.PI);
}

function determinant3(a) {
  return a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1])
    - a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0])
    + a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
}

function blochGenerator(dx, dy, dz, gamma) {
  return [
    [-2 * gamma, -2 * dz, 2 * dy],
    [2 * dz, -2 * gamma, -2 * dx],
    [-2 * dy, 2 * dx, 0]
  ];
}

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

assert.equal(data.source.doi, '10.5281/zenodo.19874093');
assert.equal(data.programmeMapping.spin23Evidence, false);
assert.equal(data.consistencyDiagnosis.retardedOnlySelfEnergyIsInsufficient, true);

const convergence = [];
for (const target of data.quadratureReproduction.paperConvergenceTarget.values) {
  const computed = sigmaPhen(-1, 1e-4, target.N);
  const difference = Math.abs(computed - target.reported);
  convergence.push({N: target.N, reported: target.reported, computed, difference});
  assert.ok(difference <= data.quadratureReproduction.maximumAllowedAbsoluteDifference,
    `quadrature reproduction failed at N=${target.N}: ${difference}`);
}

// Check the exact Bloch-space Liouvillian determinant identity at generic points.
for (const point of [
  {kx: 0.37, ky: -1.11, mass: -1, gamma: 0.35},
  {kx: 1.7, ky: 2.2, mass: 0.4, gamma: 0.08},
  {kx: -2.4, ky: 0.8, mass: 2.3, gamma: 1.0}
]) {
  const dx = Math.sin(point.kx), dy = Math.sin(point.ky);
  const dz = point.mass + Math.cos(point.kx) + Math.cos(point.ky);
  const detNumeric = determinant3(blochGenerator(dx, dy, dz, point.gamma));
  const detExact = -8 * point.gamma * (dx * dx + dy * dy);
  assert.ok(Math.abs(detNumeric - detExact) < 1e-12);
  assert.ok(Math.abs(detNumeric) > 1e-8, 'generic Liouvillian should have unique traceless steady state');
}

// The exact stationary state is r_ss=0. Any Hamiltonian probe therefore has zero forcing.
const rSteady = [0, 0, 0];
for (const ky of [-2.1, -0.4, 0.6, 2.7]) {
  const dVy = [0, Math.cos(ky), -Math.sin(ky)];
  const forcing = cross(dVy, rSteady).map(x => 2 * x);
  assert.ok(forcing.every(x => Math.abs(x) === 0));
}
const sigmaExactSteadyState = 0;

const kill = data.killTest.decisivePoint;
const sigmaPhenKill = sigmaPhen(kill.mass, kill.gamma, kill.gridN);
const killDifference = Math.abs(sigmaPhenKill - sigmaExactSteadyState);
assert.ok(Math.abs(sigmaPhenKill) > 0.5, 'phenomenological plateau should remain visibly nonzero at kill point');
assert.ok(killDifference > data.killTest.failureThreshold, 'kill test must reject equality');

// Reproduce the source's doubled-cusp diagnostic, while classifying it as phenomenological.
const delta = 0.1, cuspGamma = 0.35, cuspN = 400;
const singleMinus = 1 - Math.abs(sigmaPhen(-2 + delta, cuspGamma, cuspN));
const singlePlus = 1 - Math.abs(sigmaPhen(2 - delta, cuspGamma, cuspN));
const doubled = 0.5 * ((1 - Math.abs(sigmaPhen(-delta, cuspGamma, cuspN))) + (1 - Math.abs(sigmaPhen(delta, cuspGamma, cuspN))));
assert.ok(doubled > singleMinus && doubled > singlePlus, 'phenomenological doubled cusp should reproduce');

console.log(JSON.stringify({
  result: 'PASS',
  documentId: data.documentId,
  quadratureReproduction: convergence,
  phenomenologicalKillPoint: {mass: kill.mass, gamma: kill.gamma, sigmaXY: sigmaPhenKill},
  exactLindbladSteadyState: {rho: 'I/2', sigmaXY: sigmaExactSteadyState},
  killDifference,
  doubledCusp: {gamma: cuspGamma, delta, singleMinus, singlePlus, doubled},
  verdict: data.consistencyDiagnosis.rejectedClaim,
  survivingClaim: data.consistencyDiagnosis.survivingClaim
}, null, 2));
