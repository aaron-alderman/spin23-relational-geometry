import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("evidence/data/admissibility-medium-locomotion-control-gate-v1.json", "utf8"));

assert.equal(data.schema, "admissibility.medium-locomotion-control-gate/1");
assert(data.loopControl.maximumSymmetryResidual < 1e-12);
assert.equal(data.admission.oppositeLoopsHoldPowerFixed, true);
assert.equal(data.admission.bilinearMixingIsOrientationEven, true);
assert.equal(data.admission.geometricAreaIsOrientationOdd, true);
assert.equal(data.admission.equilibriumDetailedBalanceHasNoDirectedCurrent, true);
assert.equal(data.admission.nonequilibriumAffinityProducesCurrentAndEntropy, true);
assert.equal(data.admission.declaredMomentumPortsClose, true);
assert.equal(data.admission.forceWithoutReceivingCarrierFailsClosure, true);
assert.equal(data.admission.tenMilliNewtonPhotonBenchmarkIsApproximatelyThreeMegawatts, true);
assert.equal(data.admission.newSubstrateIdentified, false);
assert.equal(data.admission.exodusForceIndependentlyReplicated, false);

const equilibrium = data.stochasticRing.equilibrium;
const driven = data.stochasticRing.driven;
assert(Math.abs(equilibrium.edgeCurrent) < 1e-12);
assert(driven.edgeCurrent > 0);
assert(driven.entropyProduction > 0);

const untyped = data.momentumLedgers.find((row) => row.id === "untyped-force");
assert.equal(untyped.residual, 1);

console.log("Medium locomotion, control-loop and momentum gate: PASS");

