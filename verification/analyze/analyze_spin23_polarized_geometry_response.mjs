#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const constants = Object.freeze({
  hbarcGeVM: 1.973269804e-16,
  gevJ: 1.602176634e-10,
  electronMassGeV: 0.00051099895,
});

const zeroMatrix = () => Array.from({ length: 3 }, () => [0, 0, 0]);

export function geometryTensor(input) {
  const massGeV = input.mediatorMass_eV*1e-9;
  const tensor = zeroMatrix();
  let pairCount = 0;
  let minimumSeparationM = Infinity;

  for (const a of input.body1.voxels) {
    for (const b of input.body2.voxels) {
      const deltaM = b.position_m.map((value, i) => value-a.position_m[i]);
      const separationM = Math.hypot(...deltaM);
      if (!(separationM > 0)) throw new Error("source and detector voxels must not coincide");
      minimumSeparationM = Math.min(minimumSeparationM, separationM);
      const r = separationM/constants.hbarcGeVM;
      const unit = deltaM.map((value) => value/separationM);
      const x = massGeV*r;
      const common = a.polarizedElectronCount*b.polarizedElectronCount*Math.exp(-x)/(4*Math.PI);
      const transverse = -(massGeV/r**2 + 1/r**3);
      const anisotropic = massGeV**2/r + 3*massGeV/r**2 + 3/r**3;
      for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
          tensor[i][j] += common*((i === j ? transverse : 0) + anisotropic*unit[i]*unit[j]);
        }
      }
      pairCount += 1;
    }
  }
  return { tensorGeV3: tensor, pairCount, minimumSeparationM };
}

export function contract(left, matrix, right) {
  return left.reduce((sum, value, i) => sum + value*matrix[i].reduce(
    (rowSum, entry, j) => rowSum + entry*right[j], 0,
  ), 0);
}

export function responseForOrientations(input, sourceDirection, detectorDirection) {
  const response = geometryTensor(input);
  const kernelGeV3 = contract(sourceDirection, response.tensorGeV3, detectorDirection);
  const energyPerFeSquaredGeV = kernelGeV3;
  const energyPerYeSquaredJ = kernelGeV3/(4*constants.electronMassGeV**2)*constants.gevJ;
  return { ...response, kernelGeV3, energyPerFeSquaredGeV, energyPerYeSquaredJ };
}

async function main() {
  const path = process.argv[2];
  if (!path) throw new Error("usage: node analyze_spin23_polarized_geometry_response.mjs INPUT.json");
  const input = JSON.parse(await readFile(path, "utf8"));
  const response = geometryTensor(input);
  const output = {
    schema: "spin23.polarized-geometry-response/1",
    mediatorMass_eV: input.mediatorMass_eV,
    pairCount: response.pairCount,
    minimumSeparation_m: response.minimumSeparationM,
    tensorGeV3: response.tensorGeV3,
    energyTensorPerYeSquared_J: response.tensorGeV3.map((row) => row.map(
      (entry) => entry/(4*constants.electronMassGeV**2)*constants.gevJ,
    )),
    interpretation: "contract the tensor on the left and right with unit source and detector polarization directions; multiply the resulting energy by y_e^2",
  };
  console.log(JSON.stringify(output, null, 2));
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
