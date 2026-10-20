#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-portal-vacuum-energy-escape-audit.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.portal-vacuum-energy-escape-audit/1");
const close = (actual, expected, tolerance = 1e-11) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= tolerance*scale,
    "expected " + expected + ", received " + actual);
};

const observed = evidence.observedBenchmark;
const h0PerSecond = observed.H0KmPerSecPerMpc*1000/observed.metersPerMpc;
close(h0PerSecond, observed.H0PerSecond);
const h0GeV = h0PerSecond*observed.secondsPerGeVInverse;
close(h0GeV, observed.H0GeV);
const rhoObserved = 3*observed.omegaLambda*h0GeV**2*
  observed.reducedPlanckGeV**2;
close(rhoObserved, observed.rhoDarkEnergyGeV4);
close(rhoObserved/observed.reducedPlanckGeV**4,
  observed.rhoDarkEnergyOverMPlanck4);
close(rhoObserved**0.25*1e12, observed.rhoDarkEnergyQuarterPowerMilliEV);

const portal = evidence.claim1612PortalVacuum;
close(-portal.B/2, portal.vacuumEnergyOverV4);
close(portal.vacuumEnergyOverV4/portal.planckOverV**4,
  portal.vacuumEnergyOverMPlanck4);
close(observed.rhoDarkEnergyOverMPlanck4*portal.planckOverV**4,
  portal.rhoObservedOverV4);
close(Math.abs(portal.vacuumEnergyOverV4)/portal.rhoObservedOverV4,
  portal.magnitudeMismatch);
close(Math.log10(portal.magnitudeMismatch), portal.mismatchOrders);
close(portal.rhoObservedOverV4/portal.planckOverV**2,
  portal.lambdaObservedOverV2);
assert.ok(portal.lambdaSpinOverV2 < 0);
assert.ok(portal.lambdaObservedOverV2 > 0);
close(portal.rhoObservedOverV4/Math.abs(portal.vacuumEnergyOverV4),
  portal.residualFractionOfCancellation);

const loops = evidence.radiativeLedger;
const numeratorSum = Object.entries(loops.oneLoopNumeratorContributions)
  .filter(([key]) => key !== "sum").reduce((sum,[,value]) => sum+value,0);
close(numeratorSum, loops.oneLoopNumeratorContributions.sum);
const shareSum = Object.entries(loops.vacuumSharesOverV4)
  .filter(([key]) => key !== "sum").reduce((sum,[,value]) => sum+value,0);
close(shareSum, loops.vacuumSharesOverV4.sum);
close(shareSum, portal.vacuumEnergyOverV4);
for (const [sector,numerator] of Object.entries(loops.oneLoopNumeratorContributions)) {
  if (sector === "sum") continue;
  close(-numerator/(128*Math.PI**2), loops.vacuumSharesOverV4[sector]);
}
close(Math.abs(portal.vacuumEnergyOverV4)/(16*Math.PI**2),
  loops.conservativeTwoLoopEstimateOverV4);
close(loops.conservativeTwoLoopEstimateOverV4/portal.rhoObservedOverV4,
  loops.twoLoopEstimateOverObserved);
close(3.7237539299391864e-7**4,
  loops.claim1612LambdaYMOverVFourthPower);
close(Math.log10(loops.claim1612LambdaYMOverVFourthPower/
  portal.rhoObservedOverV4), loops.claim1612ColorVacuumOrdersOverObserved);
close(loops.claim1616LambdaYMOverV**4,
  loops.claim1616LambdaYMOverVFourthPower);
close(Math.log10(loops.claim1616LambdaYMOverVFourthPower/
  portal.rhoObservedOverV4), loops.claim1616ColorVacuumOrdersOverObserved);

const unimodular = evidence.unimodularTest;
for (let i=0; i<unimodular.constantVacuumSamples.length; i++) {
  const rho = unimodular.constantVacuumSamples[i];
  const tensorCoefficient = -rho;
  const trace = -4*rho;
  close(tensorCoefficient-trace/4,
    unimodular.traceFreeSourceCoefficients[i]);
}

const sequester = evidence.sequesteringTest;
for (let i=0; i<sequester.testedVacuumShiftsOverV4.length; i++) {
  const rho = sequester.testedVacuumShiftsOverV4[i];
  close(-rho-(-4*rho)/4, sequester.sourceAfterSequestering[i]);
}
assert.equal(sequester.radiativelyStableWithinDeclaredFramework, true);

const susy = evidence.supersymmetryTest;
for (const point of susy.points) {
  const supertrace = susy.equalDegrees*(point.bosonMassOverV**4-
    susy.fermionMassOverV**4)/(64*Math.PI**2);
  close(supertrace, point.supertraceVacuumOverV4);
}
close(1000**4/observed.rhoDarkEnergyGeV4,
  susy.oneTeVSUSYBreakingOverObserved);

const adjust = evidence.localAdjustmentTest;
for (const extremum of adjust.stableExtrema) {
  close(adjust.inputs.mSquared*extremum+
    adjust.inputs.lambda*extremum**3,0);
  const potential = adjust.tunedRho0+
    adjust.inputs.mSquared*extremum**2/2+
    adjust.inputs.lambda*extremum**4/4;
  close(potential, adjust.vacuumAtTunedPoint);
  close(potential+adjust.thresholdShift, adjust.vacuumAfterShift);
}
close(observed.H0GeV, adjust.rollingMassRequirementGeV);

assert.equal(evidence.mechanismDecisionTable.length,4);
assert.equal(evidence.mechanismDecisionTable.filter((row) =>
  row.predictsObservedResidual).length,0);
assert.equal(evidence.mechanismDecisionTable.filter((row) =>
  row.preservesAllClaim1612Relations).length,0);
assert.match(evidence.programmeDecision,/large AdS vacuum/);
assert.match(evidence.programmeDecision,/no tested mechanism predicts/);

console.log("Spin(2,3) portal vacuum-energy escape audit: PASS");
console.log("  rho_DE^(1/4)=" + observed.rhoDarkEnergyQuarterPowerMilliEV.toFixed(4) +
  " meV; portal AdS mismatch=" + portal.magnitudeMismatch.toExponential(4));
console.log("  uplift residual requires relative precision " +
  portal.residualFractionOfCancellation.toExponential(4));
console.log("  conservative next loop remains " +
  loops.twoLoopEstimateOverObserved.toExponential(4) + " times observed");
console.log("  unimodular moves the constant; SUSY breaking and local adjustment retune");
console.log("  sequestering cancels all " + sequester.testedVacuumShiftsOverV4.length +
  " constant test shifts but leaves global residual and loses direct B--g_A curvature matching");
