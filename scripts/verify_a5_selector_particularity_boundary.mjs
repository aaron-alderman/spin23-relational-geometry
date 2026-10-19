#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const argv = new Set(process.argv.slice(2));
const n = 4;
const directions = [...Array(n).keys()];
const rotate = (x, k = 1) => ((x + k) % n + n) % n;

// A selector from one C4-fixed datum into four oriented outputs is just a
// choice of one output. Equivariance requires that output to be C4-fixed.
const invariantDataSelectors = directions.map((output) => ({
  output,
  equivariant: directions.every((k) => rotate(output, k) === output),
}));

// Once one covariant oriented datum is admitted, equivariant maps exist.
// Exhaust all 4^4 maps f:C4->C4 and retain maps satisfying
// f(g.x)=g.f(x). They are exactly the four constant-offset maps.
const covariantMaps = [];
for (let code = 0; code < n ** n; code += 1) {
  let q = code;
  const image = directions.map(() => {
    const value = q % n;
    q = Math.floor(q / n);
    return value;
  });
  const equivariant = directions.every((x) =>
    directions.every((k) => image[rotate(x, k)] === rotate(image[x], k)),
  );
  if (equivariant) covariantMaps.push(image);
}

// A C4-invariant stochastic output exists, but it is the uniform orbit
// average and does not distinguish one actual direction.
const uniformDistribution = directions.map(() => 1 / n);
const rotateDistribution = (p, k) => directions.map((i) => p[rotate(i, -k)]);
const uniformInvariant = directions.every((k) =>
  rotateDistribution(uniformDistribution, k).every(
    (value, i) => Math.abs(value - uniformDistribution[i]) < 1e-15,
  ),
);

// Exhaust all block-sign inner conjugation gradings on five blocks. Reversing
// an arrow swaps source and target, but gamma_a gamma_b is symmetric.
const blockDims = [1, 3, 2, 1, 1];
let mirrorClosedAssignments = 0;
for (let mask = 0; mask < 2 ** blockDims.length; mask += 1) {
  const signs = blockDims.map((_, i) => ((mask >> i) & 1 ? 1 : -1));
  const mirrorClosed = signs.every((sa, a) =>
    signs.every((sb, b) => sa * sb === signs[b] * signs[a]),
  );
  if (mirrorClosed) mirrorClosedAssignments += 1;
}

// Exact Gaussian-integer arithmetic for the CP obstruction.
const Z = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => Z(a.re + b.re, a.im + b.im);
const sub = (a, b) => Z(a.re - b.re, a.im - b.im);
const mul = (a, b) => Z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const matMul = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), Z()),
));
const matSub = (A, B) => A.map((row, i) => row.map((value, j) => sub(value, B[i][j])));
const det3 = (A) => {
  const p1 = mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1])));
  const p2 = mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])));
  const p3 = mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0])));
  return add(sub(p1, p2), p3);
};
const diag = (xs) => xs.map((x, i) => xs.map((_, j) => (i === j ? Z(x) : Z())));
const comm = (A, B) => matSub(matMul(A, B), matMul(B, A));
const Hu = diag([1, 2, 4]);
const HdReal = [
  [Z(10), Z(1), Z(1)],
  [Z(1), Z(11), Z(1)],
  [Z(1), Z(1), Z(12)],
];
const HdComplex = [
  [Z(10), Z(1), Z(0, -1)],
  [Z(1), Z(11), Z(1)],
  [Z(0, 1), Z(1), Z(12)],
];
const realCpOddDeterminant = det3(comm(Hu, HdReal));
const complexCpOddDeterminant = det3(comm(Hu, HdComplex));

const report = {
  protocol: "a5-selector-particularity-boundary/1",
  exactTheorem: {
    statement: "For a G-equivariant selector f:D->X, any G-fixed input d can map only to a G-fixed output f(d). If X^G is empty, no deterministic selector exists.",
    finiteModel: "C4 acts transitively on four compass directions while the input datum is C4-fixed.",
    deterministicSelectorsTested: invariantDataSelectors.length,
    equivariantDeterministicSelectors: invariantDataSelectors.filter((x) => x.equivariant).length,
  },
  minimalEscape: {
    covariantOrientedInputs: n,
    mapsExhaustivelyTested: n ** n,
    equivariantMapsFound: covariantMaps.length,
    equivariantMaps: covariantMaps,
    interpretation: "One transforming orientation datum is sufficient; the law remains equivariant, but the input is no longer symmetry-fixed.",
  },
  stochasticBoundary: {
    invariantDistribution: uniformDistribution,
    invariant: uniformInvariant,
    selectsUniqueOutcome: false,
  },
  innerConjugationBoundary: {
    blockSignAssignmentsTested: 2 ** blockDims.length,
    mirrorClosedAssignments,
    conclusion: "Every inner block-sign grade assigns the same grade to an arrow and its reverse.",
  },
  universalRealityBoundary: {
    simultaneouslyRealCpOddDeterminant: realCpOddDeterminant,
    complexHermitianCpOddDeterminant: complexCpOddDeterminant,
    conclusion: "Extending one ordinary real structure to the full three-family Yukawa sector forces this CP-odd invariant to vanish, while complex Hermitian data need not.",
  },
  scope: {
    proves: [
      "symmetric input cannot canonically select a point in a fixed-point-free orbit",
      "a symmetric stochastic law can return an orbit average but not a unique realized member",
      "inner block-sign conjugation cannot orient endomorphism arrows",
      "a universal ordinary real selector is incompatible with nonzero flavor CP data",
    ],
    doesNotProve: [
      "that no sector-limited, twisted, broken, anisotropic, boundary-supplied, historical, anomaly-induced, or index selector exists",
      "that an observed outcome requires a theological cause",
      "that dagger-reverse blocks are necessarily independent physical mirror fermions",
    ],
  },
};

report.passed =
  report.exactTheorem.equivariantDeterministicSelectors === 0
  && report.minimalEscape.equivariantMapsFound === 4
  && uniformInvariant
  && mirrorClosedAssignments === 32
  && realCpOddDeterminant.re === 0
  && realCpOddDeterminant.im === 0
  && complexCpOddDeterminant.re === 0
  && complexCpOddDeterminant.im === 12;

const json = `${JSON.stringify(report, null, 2)}\n`;
if (argv.has("--write")) {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const destination = path.resolve(here, "../data/a5-selector-particularity-boundary-certificate.json");
  fs.writeFileSync(destination, json, "utf8");
}
process.stdout.write(json);
if (!report.passed) process.exitCode = 1;
