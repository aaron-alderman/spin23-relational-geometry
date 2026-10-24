import assert from "node:assert/strict";

const tolerance = 1e-12;
const qutritSignal = (delta, visibility = 1) => ({
  x: visibility * Math.cos(3 * delta),
  y: visibility * Math.sin(3 * delta),
});
const qubitSignal = (delta, visibility = 1) => ({
  x: -visibility * Math.cos(3 * delta),
  y: -visibility * Math.sin(3 * delta),
});

assert.deepEqual(qutritSignal(0), { x: 1, y: 0 });
assert.deepEqual(qubitSignal(0), { x: -1, y: -0 });

const phaseTolerance = Math.PI / 6;
assert.ok(qutritSignal(phaseTolerance - 1e-9).x > 0);
assert.ok(qutritSignal(phaseTolerance + 1e-9).x < 0);
assert.ok(qubitSignal(phaseTolerance - 1e-9).x < 0);
assert.ok(qubitSignal(phaseTolerance + 1e-9).x > 0);

// Finite differences verify zero first derivative of X and slope magnitude 3
// for Y at the ideal roots.
const step = 1e-6;
const derivative = (function_, coordinate) =>
  (function_(step)[coordinate] - function_(-step)[coordinate]) / (2 * step);
assert.ok(Math.abs(derivative(qutritSignal, "x")) < tolerance);
assert.ok(Math.abs(derivative(qubitSignal, "x")) < tolerance);
assert.ok(Math.abs(derivative(qutritSignal, "y") - 3) < 1e-9);
assert.ok(Math.abs(derivative(qubitSignal, "y") + 3) < 1e-9);

// Independent equal visibility v per loop gives v^3 after three loops.
const perLoopVisibility = 0.97;
const accumulatedVisibility = perLoopVisibility ** 3;
const sampleError = 0.02;
const qutritWithLoss = qutritSignal(sampleError, accumulatedVisibility);
const recoveredVisibility = Math.hypot(qutritWithLoss.x, qutritWithLoss.y);
const recoveredError = Math.atan2(qutritWithLoss.y, qutritWithLoss.x) / 3;
assert.ok(Math.abs(recoveredVisibility - accumulatedVisibility) < tolerance);
assert.ok(Math.abs(recoveredError - sampleError) < tolerance);

// Exact phase tripling and visibility cubing over a representative sweep.
const sweep = [-0.2, -0.1, 0, 0.1, 0.2].map((delta) => {
  const oneLoop = {
    magnitude: perLoopVisibility,
    phase: (2 * Math.PI) / 3 + delta,
  };
  const threeLoop = {
    magnitude: oneLoop.magnitude ** 3,
    phaseModuloTwoPi:
      ((3 * oneLoop.phase) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI),
  };
  const expectedPhase =
    ((3 * delta) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  assert.ok(Math.abs(threeLoop.magnitude - accumulatedVisibility) < tolerance);
  assert.ok(Math.abs(threeLoop.phaseModuloTwoPi - expectedPhase) < tolerance);
  return { delta, oneLoop, threeLoop };
});

console.log(JSON.stringify({
  status: "PASS",
  idealOutputs: {
    qutrit: qutritSignal(0),
    qubit: qubitSignal(0),
  },
  localSensitivity: {
    xFirstDerivative: 0,
    xLeadingError: "(9/2) delta^2",
    ySlopeMagnitude: 3,
  },
  exactPrincipalPhaseTolerance: {
    radians: phaseTolerance,
    degrees: (phaseTolerance * 180) / Math.PI,
  },
  visibility: {
    perLoop: perLoopVisibility,
    afterThreeIndependentLoops: accumulatedVisibility,
    recoveredFromQuadratures: recoveredVisibility,
  },
  representativeSweep: sweep,
  diagnostics: [
    "frequency-dependent phase lag",
    "visibility loss",
    "up/down hysteresis",
    "system-state dependence from noncentral dynamics",
    "order-reversal failure",
  ],
  verdict:
    "the cubed loop is quadratically sign-robust, linearly phase-sensitive in the orthogonal quadrature, and dynamically testable",
}));
