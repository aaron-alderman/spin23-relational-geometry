import assert from "node:assert/strict";

const wrap = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle));
const transformEdgePhase = (phase, alphaFrom, alphaTo) =>
  wrap(phase + alphaFrom - alphaTo);
const loopFlux = (phases) => wrap(phases.reduce((sum, phase) => sum + phase, 0));

for (const phase of [-2.3, -0.4, 0, 1.2, Math.PI]) {
  const alpha1 = -phase;
  const alpha2 = 0;
  assert.ok(Math.abs(transformEdgePhase(phase, alpha1, alpha2)) < 1e-12);
}

const edgePhases = [0.31, -1.2, 2.07];
const modePhases = [0.7, -0.2, 1.4];
const transformed = [
  transformEdgePhase(edgePhases[0], modePhases[0], modePhases[1]),
  transformEdgePhase(edgePhases[1], modePhases[1], modePhases[2]),
  transformEdgePhase(edgePhases[2], modePhases[2], modePhases[0])
];
assert.ok(Math.abs(wrap(loopFlux(transformed) - loopFlux(edgePhases))) < 1e-12);

const redistributed = [
  edgePhases[0] + 0.5,
  edgePhases[1] - 0.8,
  edgePhases[2] + 0.3
];
assert.ok(Math.abs(wrap(loopFlux(redistributed) - loopFlux(edgePhases))) < 1e-12);

console.log(JSON.stringify({
  twoMode: {
    singleEdgePhaseGaugeInvariant: false,
    signGaugeInvariant: false
  },
  threeMode: {
    originalLoopFlux: loopFlux(edgePhases),
    rephasedLoopFlux: loopFlux(transformed),
    redistributedLoopFlux: loopFlux(redistributed),
    loopFluxGaugeInvariant: true
  },
  conclusion: "A two-mode seam phase requires an external frame; a three-edge loop is the minimum intrinsic phase carrier."
}, null, 2));
console.log("PASS verify_lattice_subroutine_two_mode_phase_gauge_gate");
