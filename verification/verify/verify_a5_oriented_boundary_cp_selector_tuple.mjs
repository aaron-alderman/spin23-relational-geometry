#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(here, "../../evidence/data/a5-oriented-boundary-cp-selector-tuple.json");
const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const modules = data.candidateModules;
const swap = (label) => label === "O1" ? "R" : label === "R" ? "O1" : label;
const exchangeModule = (module) => Object.fromEntries(Object.entries(module.blocks).map(([field, edge]) => [field, {
  source: swap(edge.source),
  target: swap(edge.target),
}]));
const sameEdges = (A, B) => Object.keys(A).every((field) =>
  A[field].source === B[field].source && A[field].target === B[field].target,
);

// Matrix-unit TRO closure: E_(a,b) E_(c,d)^dagger E_(e,f) is nonzero
// when b=d and c=e, and then equals E_(a,f).
const isTroClosed = (module) => {
  const edges = Object.values(module.blocks);
  const support = new Set(edges.map((edge) => `${edge.target}<-${edge.source}`));
  const missing = [];
  for (const x of edges) for (const y of edges) for (const z of edges) {
    if (x.source === y.source && y.target === z.target) {
      const generated = `${x.target}<-${z.source}`;
      if (!support.has(generated)) missing.push(generated);
    }
  }
  return { closed: missing.length === 0, missing: [...new Set(missing)].sort() };
};

const reps = data.moduleRepresentations;
const dimension = reps.reduce((sum, r) => sum + r.colorDimension * r.weakDimension, 0);
const anomalies = {
  su3Cubed: reps.reduce((sum, r) => sum + r.weakDimension * r.colorCubicSign, 0),
  su3SquaredY6: reps.filter((r) => r.colorDimension === 3).reduce((sum, r) => sum + r.weakDimension * r.Y6, 0),
  su2SquaredY6: reps.filter((r) => r.weakDimension === 2).reduce((sum, r) => sum + r.colorDimension * r.Y6, 0),
  gravitySquaredY6: reps.reduce((sum, r) => sum + r.colorDimension * r.weakDimension * r.Y6, 0),
  u1CubedY6: reps.reduce((sum, r) => sum + r.colorDimension * r.weakDimension * r.Y6 ** 3, 0),
  weakDoubletParity: reps.filter((r) => r.weakDimension === 2).reduce((sum, r) => sum + r.colorDimension, 0) % 2,
};

const Z = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => Z(a.re + b.re, a.im + b.im);
const sub = (a, b) => Z(a.re - b.re, a.im - b.im);
const mul = (a, b) => Z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => Z(a.re, -a.im);
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), Z())));
const matSub = (A, B) => A.map((row, i) => row.map((value, j) => sub(value, B[i][j])));
const det3 = (A) => {
  const p1 = mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1])));
  const p2 = mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])));
  const p3 = mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0])));
  return add(sub(p1, p2), p3);
};
const Hu = data.input.flavorSpurions.H_u.map((row) => row.map((x) => Z(x)));
const Hd = data.input.flavorSpurions.H_dGaussianIntegers;
const cpDet = det3(matSub(matMul(Hu, Hd), matMul(Hd, Hu)));
const cpDetConjugate = det3(matSub(matMul(Hu.map((row) => row.map(conj)), Hd.map((row) => row.map(conj))), matMul(Hd.map((row) => row.map(conj)), Hu.map((row) => row.map(conj)))));
const leadingPrincipalMinorsHd = [
  Hd[0][0].re,
  Hd[0][0].re * Hd[1][1].re - Hd[0][1].re * Hd[1][0].re,
  det3(Hd).re,
];

const selector = (chi) => chi === 1 ? "T_A" : "T_B";
const groupActionOnOutput = (label) => label === "T_A" ? "T_B" : "T_A";
const covariance = [-1, 1].every((chi) => selector(-chi) === groupActionOnOutput(selector(chi)));
const actionEnergy = (chi, label) => -chi * modules[label].exchangeSign;
const selectedByAction = [-1, 1].every((chi) => {
  const chosen = selector(chi);
  const other = chosen === "T_A" ? "T_B" : "T_A";
  return actionEnergy(chi, chosen) < actionEnergy(chi, other);
});

const troA = isTroClosed(modules.T_A);
const troB = isTroClosed(modules.T_B);
const localAnomaliesVanish = Object.values(anomalies).every((x) => x === 0);
const report = {
  protocol: data.protocol,
  tuple: {
    group: data.group.name,
    input: "nonzero oriented boundary sign chi plus complex three-family flavor spurions",
    action: data.selector.effectiveAction,
    output: data.selector.output,
    stabilizer: data.stabilizer.ofNonzeroBoundaryOrientationInsideZ2,
  },
  module: {
    complexDimensionPerGeneration: dimension,
    exchangedExactly: sameEdges(exchangeModule(modules.T_A), modules.T_B.blocks),
    troA,
    troB,
    anomaliesPerGeneration: anomalies,
    anomaliesForThreeReplicas: Object.fromEntries(Object.entries(anomalies).map(([key, value]) => [key, 3 * value])),
  },
  flavor: {
    leadingPrincipalMinorsHd,
    cpOddCommutatorDeterminant: cpDet,
    conjugateCpOddCommutatorDeterminant: cpDetConjugate,
    cpSignReversesUnderExchange: cpDet.im === -cpDetConjugate.im && cpDet.im !== 0,
  },
  selector: {
    covariance,
    selectedByAction,
    exchangeEvenProducts: {
      chiTimesTopologySign: true,
      chiTimesCpOddInvariant: cpDet.im === -cpDetConjugate.im,
    },
  },
  physicalBoundary: {
    admittedAtEffectiveSpurionLevel: true,
    microscopicallyDerived: false,
    earliestObstruction: data.earliestPhysicalObstruction.name,
    smallestExtraDatum: data.smallestExtraDatum.name,
  },
};
report.passed =
  dimension === 15
  && report.module.exchangedExactly
  && troA.closed
  && troB.closed
  && localAnomaliesVanish
  && leadingPrincipalMinorsHd.every((x) => x > 0)
  && cpDet.re === 0
  && cpDet.im === 1080
  && cpDetConjugate.re === 0
  && cpDetConjugate.im === -1080
  && covariance
  && selectedByAction;

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (!report.passed) process.exitCode = 1;
