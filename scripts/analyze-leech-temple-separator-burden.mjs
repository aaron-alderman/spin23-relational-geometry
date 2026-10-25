#!/usr/bin/env node
import fs from "node:fs";

const sites = 24;
const cutoff = 2;
const local = Array.from({length: 2 * cutoff + 1}, (_, index) =>
  1 - Math.cos((index + 1) * Math.PI / (2 * cutoff + 2))
);
const [v1, v2, v3, v4] = local;
const potentialGround = sites * v1;
const evenSecondCandidates = {
  twoLowestOddLocalFactors: (sites - 2) * v1 + 2 * v2,
  oneSecondEvenLocalFactor: (sites - 1) * v1 + v3
};
const evenSeparator = Math.min(...Object.values(evenSecondCandidates));
const oddFirstBand = (sites - 1) * v1 + v2;
const oddTwentyFifthCandidates = {
  threeLowestOddLocalFactors: (sites - 3) * v1 + 3 * v2,
  lowestOddPlusSecondEven: (sites - 2) * v1 + v2 + v3,
  oneSecondOddLocalFactor: (sites - 1) * v1 + v4
};
const oddTwentyFifthSeparator =
  Math.min(...Object.values(oddTwentyFifthCandidates));

const directRun = {
  checkpoint: ".tmp/leech-z2-c2-b56-matrix-free-r2-even.pkl",
  checkpointSha256: "f62f9a90756a5a96a90050335ce499d39560dea7112636abc40b7d1a4e0dee54",
  compressed: false,
  norm: 0.9999999999999997,
  rayleigh: 3.8731239099585166,
  energySquaredExpectation: 15.001163120376463,
  variance: 0.00007429848411533158,
  residualNorm: 0.00861965684440695
};
const compressionRuns = [
  {eps: 1e-8, residualNorm: 0.008619656844613032},
  {eps: 1e-10, residualNorm: 0.008619656842758294},
  {eps: 1e-12, residualNorm: 0.008619656844200867}
];
const reducedControls = {
  sites: 4,
  cutoff: 2,
  evenMaximumDenseContractionError: 3.3306690738754696e-16,
  oddMaximumDenseContractionError: 1.3322676295501878e-15
};

const padded = {
  rayleighLower: 3.8731239,
  rayleighUpper: 3.87312391,
  residualUpper: 0.008619657,
  separatorLower: 3.9474411
};
const templeLower = padded.rayleighLower
  - padded.residualUpper ** 2
    / (padded.separatorLower - padded.rayleighLower);

const output = {
  schemaVersion: "leech-temple-separator-burden-v1",
  date: "2026-10-25",
  cutoff,
  potentialOnlySpectrum: {
    localEigenvalues: local,
    globalGround: potentialGround,
    evenSecondCandidates,
    evenSeparator,
    oddFirstBand: {energy: oddFirstBand, multiplicity: sites},
    oddTwentyFifthCandidates,
    oddTwentyFifthSeparator
  },
  fullCarrierEvenResidual: {
    directUncompressedRun: directRun,
    compressionRuns,
    reducedDenseControls: reducedControls,
    maximumCompressionResidualSpread:
      Math.max(...compressionRuns.map((run) => run.residualNorm))
      - Math.min(...compressionRuns.map((run) => run.residualNorm))
  },
  evenTempleCandidate: {
    paddedInputs: padded,
    lower: templeLower,
    upper: padded.rayleighUpper,
    width: padded.rayleighUpper - templeLower,
    theoremPremisesSatisfiedExceptRigorousFloatingPointEnclosure: true,
    rigorousMachineIntervalCertified: false
  },
  oddSeparatorBurden: {
    oddRitzUpper: 4.205473825505905,
    lowerOperatorStatesBelowRitz: 24,
    nextLowerOperatorEigenvalue: oddTwentyFifthSeparator,
    nextLowerOperatorEigenvalueAboveRitz:
      oddTwentyFifthSeparator > 4.205473825505905,
    requiredRitzSubspaceDimensionForThisRoute: 24
  },
  established: "The potential lower operator supplies a one-vector even-sector separator and a 24-vector odd-sector separator. The stored even checkpoint has a stable directly contracted global residual, yielding a narrow numerical Temple interval.",
  boundary: "The even interval is not promoted to a rigorous machine certificate until floating-point contraction and elementary functions receive outward error bounds. The odd lower interval still requires a 24-vector Ritz/Lehmann block or equivalent inertia count."
};

fs.writeFileSync(
  new URL("../evidence/data/leech-temple-separator-burden-v1.json", import.meta.url),
  JSON.stringify(output, null, 2) + "\n"
);
console.log(JSON.stringify(output, null, 2));
