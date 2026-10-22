#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const evidenceUrl = new URL("../../evidence/data/spin23-torsion-published-geometry-approximation-v1.json", import.meta.url);
const sourceUrl = new URL("../../evidence/data/spin23-torsion-empirical-geometry-extraction-v1.json", import.meta.url);
const [evidenceBytes, sourceBytes] = await Promise.all([readFile(evidenceUrl), readFile(sourceUrl)]);
const evidence = JSON.parse(evidenceBytes);
const source = JSON.parse(sourceBytes);
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const close = (actual, expected, tolerance = 5e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(actual), Math.abs(expected)), `${actual} != ${expected}`);
};

assert.equal(sha256(sourceBytes), evidence.sourceEvidence.sha256);
assert.equal(source.extractedGeometry.sensorCell.diameterMillimetres, 12);
assert.equal(source.extractedGeometry.smCo5Core.diameterMillimetres, 2.5);
assert.equal(source.extractedGeometry.smCo5Core.heightMillimetres, 2.5);
assert.equal(source.extractedGeometry.sourceSensorCenterDistance.millimetres, 50);

const gaussLegendre = n => {
  const nodes = [], weights = [];
  for (let i = 0; i < Math.floor((n + 1) / 2); i += 1) {
    let z = Math.cos(Math.PI * (i + 0.75) / (n + 0.5));
    let derivative;
    while (true) {
      let p1 = 1, p2 = 0;
      for (let degree = 1; degree <= n; degree += 1) {
        const p3 = p2;
        p2 = p1;
        p1 = ((2 * degree - 1) * z * p2 - (degree - 1) * p3) / degree;
      }
      derivative = n * (z * p1 - p2) / (z * z - 1);
      const previous = z;
      z = previous - p1 / derivative;
      if (Math.abs(z - previous) <= 1e-15) break;
    }
    const weight = 2 / ((1 - z * z) * derivative * derivative);
    nodes[i] = -z;
    nodes[n - 1 - i] = z;
    weights[i] = weight;
    weights[n - 1 - i] = weight;
  }
  return nodes.map((node, index) => ({ node, weight: weights[index] }));
};

const sourceAverage = (scaledMass, order, angleCount) => {
  const quadrature = gaussLegendre(order);
  let sum = 0;
  for (const axial of quadrature) for (const radial of quadrature) for (let angle = 0; angle < angleCount; angle += 1) {
    const y = 0.025 * axial.node;
    const rho = 0.025 * Math.sqrt((radial.node + 1) / 2);
    const theta = 2 * Math.PI * (angle + 0.5) / angleCount;
    const x = 1 + rho * Math.cos(theta);
    const z = rho * Math.sin(theta);
    const separation = Math.hypot(x, y, z);
    const mr = scaledMass * separation;
    const yHat = y / separation;
    const fieldY = Math.exp(-mr) / separation ** 3 * (
      -(mr + 1) + yHat ** 2 * (mr ** 2 + 3 * mr + 3)
    );
    sum += axial.weight / 2 * radial.weight / 2 / angleCount * fieldY;
  }
  return sum;
};
const pointResponse = scaledMass => -Math.exp(-scaledMass) * (scaledMass + 1);
const uniformBallFactor = z => 3 * (z * Math.cosh(z) - Math.sinh(z)) / z ** 3;

let maximumDifference = 0;
for (const row of evidence.response) {
  const source20 = sourceAverage(row.centerDistanceOverRange, 20, 96);
  const source14 = sourceAverage(row.centerDistanceOverRange, 14, 64);
  const coreRatio = source20 / pointResponse(row.centerDistanceOverRange);
  const cellFactor = uniformBallFactor(6 / row.forceRangeMillimetres);
  maximumDifference = Math.max(maximumDifference, Math.abs(source20 - source14));
  close(coreRatio, row.sourceCoreToPoint);
  close(cellFactor, row.uniformCellMeanFactor);
  close(coreRatio * cellFactor, row.combinedToPoint);
  close(Math.abs(source20 - source14), row.sourceQuadratureDifference, 1e-9);
}
assert.ok(maximumDifference < 2e-14);
const seven = evidence.response.find(row => row.forceRangeMillimetres === 7);
close(seven.combinedToPoint, 1.078926737717868);
close(1 - 1 / seven.combinedToPoint, 0.07315300933667912);
assert.ok(evidence.response.find(row => row.forceRangeMillimetres === 2).combinedToPoint > 2.3);
assert.ok(Object.values(evidence.authority).every(value => value === false));

console.log("Spin(2,3) torsion published-geometry approximation: PASS");
console.log(`  7 mm response / center-point response: ${seven.combinedToPoint.toFixed(6)}`);
console.log(`  maximum source quadrature discrepancy: ${maximumDifference.toExponential(6)}`);
console.log("  status: bounded approximation; combined spin density and empirical likelihood remain unavailable");
