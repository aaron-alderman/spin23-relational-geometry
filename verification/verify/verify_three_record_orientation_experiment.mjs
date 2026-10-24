#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const tol = 1e-12;
const m2 = 1.8;
const g = 0.7;
const beta = 1.4;
const h = 0.9;

const preregistrationPath = path.join(
  process.cwd(),
  "corpus/programmes/frontier/wave-7/three_record_experiment_preregistration_v1.json",
);
const preregistration = JSON.parse(fs.readFileSync(preregistrationPath, "utf8"));
assert.equal(preregistration.schema, "three-record-orientation-experiment/1");
assert.equal(preregistration.records.length, 3);
assert.ok(preregistration.requiredInterventions.includes("branch_label_randomization_scan"));
assert.ok(preregistration.forbiddenResiduals.includes("odd_signal_at_complete_label_randomization"));
assert.ok(preregistration.decisionRules.length >= 6);

const t = (theta) => Math.cos(theta) ** 2;
const chi = (theta, orientation = 1) => orientation * Math.sin(2 * theta);
const evenRecord = (theta) => Math.log(m2 + g * (1 - t(theta)));
const latentOddRecord = (theta, orientation = 1) => Math.tanh(beta * h * chi(theta, orientation) / 2);
const observedOddRecord = (theta, orientation = 1, labelError = 0) =>
  (1 - 2 * labelError) * latentOddRecord(theta, orientation);

for (const theta of [0.17, 0.41, 0.73, 1.11]) {
  assert.ok(Math.abs(t(theta) - t(-theta)) < tol);
  assert.ok(Math.abs(chi(theta) + chi(-theta)) < tol);
  assert.ok(Math.abs(evenRecord(theta) - evenRecord(-theta)) < tol);
  assert.ok(Math.abs(latentOddRecord(theta) + latentOddRecord(-theta)) < tol);
  assert.ok(Math.abs(latentOddRecord(theta, 1) + latentOddRecord(theta, -1)) < tol);

  assert.ok(Math.abs(observedOddRecord(theta, 1, 0.5)) < tol);

  const epsilon = 0.18;
  const contracted = observedOddRecord(theta, 1, epsilon);
  assert.ok(Math.abs(contracted - (1 - 2 * epsilon) * latentOddRecord(theta)) < tol);

  const recoveredEven = (evenRecord(theta) + evenRecord(-theta)) / 2;
  const forbiddenEvenOddPart = (evenRecord(theta) - evenRecord(-theta)) / 2;
  const recoveredOdd = (observedOddRecord(theta) - observedOddRecord(-theta)) / 2;
  const forbiddenOddEvenPart = (observedOddRecord(theta) + observedOddRecord(-theta)) / 2;
  assert.ok(Math.abs(recoveredEven - evenRecord(theta)) < tol);
  assert.ok(Math.abs(forbiddenEvenOddPart) < tol);
  assert.ok(Math.abs(recoveredOdd - latentOddRecord(theta)) < tol);
  assert.ok(Math.abs(forbiddenOddEvenPart) < tol);
}

const sampleTheta = 0.41;
const scan = [0, 0.1, 0.2, 0.3, 0.4, 0.5].map((epsilon) => ({
  epsilon,
  observed: observedOddRecord(sampleTheta, 1, epsilon),
}));
for (let i = 1; i < scan.length; i += 1) {
  assert.ok(Math.abs(scan[i].observed) < Math.abs(scan[i - 1].observed));
}

console.log(JSON.stringify({
  result: "pass",
  parity: { evenRecord: "reflection even", oddRecord: "reflection and wall-orientation odd" },
  detectorFolding: { law: "O_obs=(1-2 epsilon) O", scan },
  decisionBoundary: "epsilon=1/2 erases orientation while preserving the even selector channel",
  preregistration: preregistrationPath,
}, null, 2));

