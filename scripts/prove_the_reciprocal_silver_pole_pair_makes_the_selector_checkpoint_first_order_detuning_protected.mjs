import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const omega0 = 1, gn = 1 + rt2, gt = rt2 - 1;
const phase = (omega, gamma) => -4 * Math.atan(gamma / omega);
const phaseDerivative = (omega, gamma) => 4 * gamma / (omega * omega + gamma * gamma);
const phaseSecondDerivative = (omega, gamma) => -8 * gamma * omega / ((omega * omega + gamma * gamma) ** 2);
const relativePhase = omega => phase(omega, gn) - phase(omega, gt);
const d1 = phaseDerivative(omega0, gn) - phaseDerivative(omega0, gt);
const d2 = phaseSecondDerivative(omega0, gn) - phaseSecondDerivative(omega0, gt);
assert.ok(Math.abs(gn * gt - omega0 * omega0) < 1e-12);
assert.ok(Math.abs(relativePhase(omega0) + Math.PI) < 1e-12);
assert.ok(Math.abs(d1) < 1e-12);
assert.ok(Math.abs(d2 - 2) < 1e-12);

const c = (re, im = 0) => [re, im];
const addC = ([a, b], [d, e]) => [a + d, b + e];
const mulC = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const divC = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const realM = A => A.map(row => row.map(x => c(x)));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => addC(s, mulC(x, B[k][j])), c(0))));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const I2 = realM([[1, 0], [0, 1]]), D = [[1, 0], [0, -1]];
const U = [[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]], Ut = [[U[0][0], U[1][0]], [U[0][1], U[1][1]]];
const f = (omega, gamma) => { const b = divC(c(omega, -gamma), c(omega, gamma)); return mulC(b, b); };
const response = omega => mm(mm(realM(U), [[f(omega, gn), c(0)], [c(0), f(omega, gt)]]), realM(Ut));
const cycle = omega => mm(mm(mm(realM(D), response(-omega)), realM(D)), response(omega));
const orderDefect = omega => { const C = cycle(omega); return maxDefect(mm(mm(C, C), C), I2); };
const checkpointCycle = cycle(omega0);
const generatorDrift = omega => maxDefect(cycle(omega), checkpointCycle);

const detuningSamples = [0.1, 0.05, 0.02, 0.01, 0.005].map(epsilon => ({
  epsilon,
  plusGeneratorDrift: generatorDrift(omega0 + epsilon),
  minusGeneratorDrift: generatorDrift(omega0 - epsilon),
  plusGeneratorDriftScaledByEpsilonSquared: generatorDrift(omega0 + epsilon) / (epsilon ** 2),
  minusGeneratorDriftScaledByEpsilonSquared: generatorDrift(omega0 - epsilon) / (epsilon ** 2),
  plusDefect: orderDefect(omega0 + epsilon),
  minusDefect: orderDefect(omega0 - epsilon),
  plusScaledByEpsilonFourth: orderDefect(omega0 + epsilon) / (epsilon ** 4),
  minusScaledByEpsilonFourth: orderDefect(omega0 - epsilon) / (epsilon ** 4),
}));
const tail = detuningSamples.at(-1);
assert.ok(tail.plusGeneratorDriftScaledByEpsilonSquared > 0.5 && tail.plusGeneratorDriftScaledByEpsilonSquared < 2);
assert.ok(tail.minusGeneratorDriftScaledByEpsilonSquared > 0.5 && tail.minusGeneratorDriftScaledByEpsilonSquared < 2);
assert.ok(tail.plusScaledByEpsilonFourth > 1 && tail.plusScaledByEpsilonFourth < 2);
assert.ok(tail.minusScaledByEpsilonFourth > 1 && tail.minusScaledByEpsilonFourth < 2);

// Direct phase residual is quadratic with leading coefficient one because
// Delta''/2 = 1 at omega0=1.
const phaseSamples = [0.1, 0.05, 0.02, 0.01].map(epsilon => ({
  epsilon,
  residual: relativePhase(omega0 + epsilon) + Math.PI,
  scaledByEpsilonSquared: (relativePhase(omega0 + epsilon) + Math.PI) / (epsilon * epsilon),
}));
assert.ok(Math.abs(phaseSamples.at(-1).scaledByEpsilonSquared - 1) < 0.03);

console.log(JSON.stringify({
  protocol: 'first-order-detuning-protection-of-selector-checkpoint/1',
  poleData: { omega0, gammaNormal: gn, gammaTangent: gt, reciprocalProduct: gn * gt },
  relativeEigenphase: { valueAtCheckpoint: '-pi', firstDerivative: d1, secondDerivative: d2, localExpansion: 'Delta(omega0+epsilon) = -pi + epsilon^2 + O(epsilon^3)' },
  traceLaw: 'tr C = 1/2 + (3/2) cos Delta, so tr C + 1 = (3/4)(Delta + pi)^2 + higher order',
  phaseSamples,
  matrixSamples: detuningSamples,
  verdict: 'The reciprocal pole relation makes the generator drift quadratic. A second trace stationarity makes the order-three relation fail only at fourth order in frequency detuning.',
  limitation: 'The generator still drifts at second order, exact finite order is still checkpoint-only, and pole-scale perturbations are not canceled. This is stationary-point robustness, not topology or broadband finite order.',
  passed: true,
}, null, 2));
