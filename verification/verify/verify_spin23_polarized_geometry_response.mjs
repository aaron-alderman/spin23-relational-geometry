#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  constants,
  geometryTensor,
  responseForOrientations,
} from "../analyze/analyze_spin23_polarized_geometry_response.mjs";

const input = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-polarized-geometry-point-witness-v1.json",
  import.meta.url,
), "utf8"));

const close = (actual, expected, rel = 1e-10) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= rel*scale, `${actual} != ${expected}`);
};

const result = geometryTensor(input);
assert.equal(result.pairCount, 1);
close(result.minimumSeparationM, 0.1);

const r = 0.1/constants.hbarcGeVM;
const m = input.mediatorMass_eV*1e-9;
const x = m*r;
close(x, 1, 1e-12);
const counts = 1e48;
const common = counts*Math.exp(-x)/(4*Math.PI);
const expectedTransverse = -common*(m/r**2+1/r**3);
const expectedRadial = common*(m*m/r+2*m/r**2+2/r**3);

close(result.tensorGeV3[0][0], expectedTransverse);
close(result.tensorGeV3[1][1], expectedTransverse);
close(result.tensorGeV3[2][2], expectedRadial);
for (const [i,j] of [[0,1],[0,2],[1,0],[1,2],[2,0],[2,1]]) close(result.tensorGeV3[i][j], 0);

const transverse = responseForOrientations(input, [1,0,0], [1,0,0]);
const radial = responseForOrientations(input, [0,0,1], [0,0,1]);
close(-radial.kernelGeV3/transverse.kernelGeV3, 2.5);

// The illustrative y reach must reproduce the claim-1719 torque threshold.
const torqueThresholdJ = 1e-21;
const yReach = Math.sqrt(torqueThresholdJ/Math.abs(transverse.energyPerYeSquaredJ));
close(yReach, 1.20379428301628e-10, 1e-10);

console.log("Spin(2,3) arbitrary-geometry response solver: PASS");
console.log(`  voxel pairs=${result.pairCount}, x=${x.toFixed(6)}`);
console.log(`  signed radial/transverse ratio=${(-radial.kernelGeV3/transverse.kernelGeV3).toFixed(6)}`);
console.log(`  point-witness y_e reach at 1e-21 N m=${yReach.toExponential(4)}`);
