#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(.:)/, "$1")), "..");

const carriers = [
  {
    cutoff: 1,
    evenUpper: 7.360877693852631,
    oddUpper: 8.041801073281459,
    source: "leech-z2-matrix-free-carrier-v1"
  },
  {
    cutoff: 2,
    evenUpper: 3.8731239099585157,
    oddUpper: 4.205473825505905,
    source: "leech-z2-matrix-free-bond56-v1"
  },
  {
    cutoff: 3,
    evenUpper: 2.7707832342081073,
    oddUpper: 2.9572641520462053,
    source: "leech-z2-cutoff-three-bond32-v1"
  }
];

const sites = 24;
const results = carriers.map(({cutoff, evenUpper, oddUpper, source}) => {
  // On charges -N,...,N, V_N = I-(S+S^T)/2 is a path-graph
  // Jacobi matrix. Its first eigenvector is inversion even and its second is
  // inversion odd. Since the charging form is positive, H_N >= sum_i V_N,i.
  const localEvenLower = 1 - Math.cos(Math.PI / (2 * cutoff + 2));
  const localOddLower = 1 - Math.cos(Math.PI / (cutoff + 1));
  const evenLower = sites * localEvenLower;
  const oddLower = (sites - 1) * localEvenLower + localOddLower;
  const gapInterval = {
    lower: oddLower - evenUpper,
    upper: oddUpper - evenLower
  };
  return {
    cutoff,
    source,
    localPotentialEigenvalues: {
      lowestEven: localEvenLower,
      lowestOdd: localOddLower
    },
    sectorIntervals: {
      even: {lower: evenLower, upper: evenUpper},
      odd: {lower: oddLower, upper: oddUpper}
    },
    gapInterval,
    positiveGapCertifiedByThisBound: gapInterval.lower > 0,
    missingOddLowerMargin: Math.max(0, evenUpper - oddLower)
  };
});

const output = {
  schemaVersion: "leech-positive-charging-enclosure-v1",
  date: "2026-10-25",
  Hamiltonian: "H_N=(U/2) q^T K q + sum_i [1-(S_i+S_i^T)/2]",
  exactPremise: "K is the inverse of the positive-definite Leech Gram matrix, hence the charging term is positive semidefinite and may be discarded for a lower bound",
  analyticSpectrum: "the path potential has eigenvalues 1-cos(k*pi/(2N+2)); k=1 is inversion even and k=2 is inversion odd",
  globalParityRule: "the lowest product state of odd global inversion has one local odd factor and 23 local even factors",
  sites,
  results,
  established: "At cutoff one the full 24-channel joined-cell parity gap has a positive analytic/variational enclosure. At cutoffs two and three the same exact lower operator is insufficient.",
  nextRequirement: "retain a certified positive portion of the coupled charging form, or supply a validated separator/inertia enclosure, until the cutoff-two and cutoff-three odd lower endpoints exceed their even Ritz upper endpoints"
};

const target = path.join(root, "evidence", "data", "leech-positive-charging-enclosure-v1.json");
fs.writeFileSync(target, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output, null, 2));
