import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/xxz23-aspect-ratio-tensor-network-protocol-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "xxz23-aspect-ratio-tensor-network-protocol-v1");

const N = 23;
const gamma = Math.PI / N;
const delta = Math.cos(gamma);
const velocityStandard = Math.PI * Math.sin(gamma) / (2 * gamma);
const velocityPaper = 2 * velocityStandard;
const close = (a, b, tolerance = 1e-12) => assert.ok(Math.abs(a - b) < tolerance, `${a} != ${b}`);

close(evidence.normalization.gamma, gamma);
close(evidence.normalization.delta, delta);
close(evidence.normalization.velocity, velocityPaper);
close(velocityPaper, N * Math.sin(Math.PI / N));
assert.equal(evidence.normalization.paperToStandardEnergyFactor, 2);

for (const point of evidence.checkpoints) {
  close(point.beta, point.imTau * point.L / velocityPaper);
  close(point.temperature, 1 / point.beta);
  close(velocityPaper * point.beta / point.L, point.imTau);
}

const matchedIsingCoupling = velocityPaper / 2;
close(evidence.velocityLockControl.matchedJI, matchedIsingCoupling);
close(evidence.velocityLockControl.matchedHI, matchedIsingCoupling);

const plan = evidence.tensorNetworkPlan;
assert.equal(plan.rungPhysicalDimension, 4);
assert.equal(plan.purifiedRungDimension, plan.rungPhysicalDimension ** 2);
assert.equal(plan.bulkHamiltonianMpoBondDimension, 6);
assert.equal(plan.dualityMpoBondDimension, N);
assert.equal(
  plan.convergenceCells,
  plan.finiteSizes.length * plan.imTauValues.length * plan.bondDimensions.length * plan.timeStepLevels,
);

for (const row of plan.memoryAtL46MiB) {
  const bytes = 46 * plan.purifiedRungDimension * row.chi ** 2 * 16;
  close(row.purifiedMps, bytes / 2 ** 20);
}
for (const row of plan.denseContractionUpperProxyAtL46) {
  const proxy = 46 * plan.rungPhysicalDimension ** 2 * row.insertionBondDimension * row.chi ** 3;
  assert.equal(row.proxy, proxy);
}

assert.equal(evidence.scope.centralChargeOfTwoLegLadder, 1.5);
assert.equal(evidence.scope.monsterCentralCharge, 24);
assert.ok(evidence.preregisteredGates.some((gate) => gate.includes("emergent velocity")));
assert.ok(evidence.preregisteredGates.some((gate) => gate.includes("associator")));

console.log(JSON.stringify({
  status: "PASS",
  gamma,
  delta,
  velocityStandard,
  velocityPaper,
  matchedIsingCoupling,
  checkpoints: evidence.checkpoints,
  convergenceCells: plan.convergenceCells,
  centralChargeBoundary: evidence.scope,
}));
