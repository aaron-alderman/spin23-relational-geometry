#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const evidenceUrl = new URL("../../evidence/data/spin23-torsion-finite-geometry-response-v1.json", import.meta.url);
const sourceUrl = new URL("../../evidence/data/spin23-worldwright-torsion-response-surface-v1.json", import.meta.url);
const [evidenceBytes, sourceBytes] = await Promise.all([readFile(evidenceUrl), readFile(sourceUrl)]);
const evidence = JSON.parse(evidenceBytes);
const source = JSON.parse(sourceBytes);
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const close = (actual, expected, tolerance = 5e-12) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= tolerance * scale, `${actual} != ${expected}`);
};

assert.equal(sha256(sourceBytes), evidence.sourceEvidence.sha256);
assert.equal(source.physicalModel.scope.includes("r>0"), true);

const gaussLegendre = n => {
  const nodes = [];
  const weights = [];
  const half = Math.floor((n + 1) / 2);
  for (let i = 0; i < half; i += 1) {
    let z = Math.cos(Math.PI * (i + 0.75) / (n + 0.5));
    let previous;
    let derivative;
    do {
      let p1 = 1;
      let p2 = 0;
      for (let degree = 1; degree <= n; degree += 1) {
        const p3 = p2;
        p2 = p1;
        p1 = ((2 * degree - 1) * z * p2 - (degree - 1) * p3) / degree;
      }
      derivative = n * (z * p1 - p2) / (z * z - 1);
      previous = z;
      z = previous - p1 / derivative;
    } while (Math.abs(z - previous) > 1e-15);
    const weight = 2 / ((1 - z * z) * derivative * derivative);
    nodes[i] = -z;
    nodes[n - 1 - i] = z;
    weights[i] = weight;
    weights[n - 1 - i] = weight;
  }
  return nodes.map((node, index) => {
    const u = (node + 1) / 2;
    return { u, weight: weights[index] / 2 * (1 - u) };
  });
};

const pointKernel = (mass, spin) => Math.exp(-mass) * (
  -(spin[0] ** 2 + spin[1] ** 2 + spin[2] ** 2) * (mass + 1)
  + spin[2] ** 2 * (mass ** 2 + 3 * mass + 3)
);

const integrate = (side, mass, spin, order) => {
  if (side === 0) return pointKernel(mass, spin);
  const quadrature = gaussLegendre(order);
  let sum = 0;
  for (const signX of [-1, 1]) for (const signY of [-1, 1]) for (const signZ of [-1, 1]) {
    for (const x of quadrature) for (const y of quadrature) for (const z of quadrature) {
      const rx = side * signX * x.u;
      const ry = side * signY * y.u;
      const rz = 1 + side * signZ * z.u;
      const separation = Math.hypot(rx, ry, rz);
      const scaledMass = mass * separation;
      const spinDot = spin[0] ** 2 + spin[1] ** 2 + spin[2] ** 2;
      const spinDotR = (spin[0] * rx + spin[1] * ry + spin[2] * rz) / separation;
      const kernel = Math.exp(-scaledMass) / separation ** 3 * (
        -spinDot * (scaledMass + 1)
        + spinDotR ** 2 * (scaledMass ** 2 + 3 * scaledMass + 3)
      );
      sum += x.weight * y.weight * z.weight * kernel;
    }
  }
  return sum;
};

assert.equal(evidence.response.length, evidence.execution.cellCount);
let maximumConvergenceDifference = 0;
for (const row of evidence.response) {
  assert.ok(row.sideToCenterSeparation >= 0 && row.sideToCenterSeparation < 1);
  const radialSpin = evidence.geometry.polarizationOrientations.radial;
  const transverseSpin = evidence.geometry.polarizationOrientations.transverse;
  const radial = integrate(row.sideToCenterSeparation, row.massTimesCenterSeparation, radialSpin, 20);
  const transverse = integrate(row.sideToCenterSeparation, row.massTimesCenterSeparation, transverseSpin, 20);
  const radial14 = integrate(row.sideToCenterSeparation, row.massTimesCenterSeparation, radialSpin, 14);
  const transverse14 = integrate(row.sideToCenterSeparation, row.massTimesCenterSeparation, transverseSpin, 14);
  const pointRadial = pointKernel(row.massTimesCenterSeparation, radialSpin);
  const pointTransverse = pointKernel(row.massTimesCenterSeparation, transverseSpin);
  maximumConvergenceDifference = Math.max(
    maximumConvergenceDifference,
    Math.abs(radial - radial14),
    Math.abs(transverse - transverse14),
  );
  close(radial, row.radial);
  close(transverse, row.transverse);
  close(Math.abs(radial / transverse), row.anisotropy);
  close(radial / pointRadial, row.radialToPoint);
  close(transverse / pointTransverse, row.transverseToPoint);
  assert.ok(radial > 0);
  assert.ok(transverse < 0);
}
close(maximumConvergenceDifference, evidence.execution.maximumAbsoluteOrder14To20Difference, 1e-9);
assert.ok(maximumConvergenceDifference < 3e-11);

const get = (side, mass) => evidence.response.find(row =>
  row.sideToCenterSeparation === side && row.massTimesCenterSeparation === mass
);
for (const mass of evidence.execution.massTimesCenterSeparation) {
  close(get(0, mass).radial, source.unitPolarizationResponse.find(row => row.x === mass).radialParallel);
  close(get(0, mass).transverse, source.unitPolarizationResponse.find(row => row.x === mass).transverseParallel);
}
close(get(0.75, 0).anisotropy, 2);
assert.ok(get(0.75, 4).radialToPoint > 1.67);
assert.ok(get(0.75, 4).transverseToPoint > 1.45);
assert.ok(get(0.75, 4).anisotropy > get(0, 4).anisotropy);
assert.ok(Object.values(evidence.authority).every(value => value === false));

console.log("Spin(2,3) torsion finite-geometry response: PASS");
console.log(`  deterministic geometry cells: ${evidence.response.length}`);
console.log(`  maximum |order-20 - order-14|: ${maximumConvergenceDifference.toExponential(6)}`);
console.log(`  mu=4, a/d=0.75 point corrections: radial ${get(0.75, 4).radialToPoint.toFixed(4)}x; transverse ${get(0.75, 4).transverseToPoint.toFixed(4)}x`);
console.log("  status: finite-volume method established; apparatus calibration and detection not established");
