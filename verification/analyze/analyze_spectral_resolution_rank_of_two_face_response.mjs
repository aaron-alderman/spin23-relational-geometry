import assert from "node:assert/strict";

const weight = (s, x, y) => y / ((s - x) ** 2 + y ** 2);
const eigenvaluesTwoRays = (a, b, delta) => {
  const offMagnitude = Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(delta));
  return [a + b + offMagnitude, a + b - offMagnitude];
};
const determinantTwoRays = (a, b, delta) => 2 * a * b * (1 - Math.cos(delta));
const close = (a, b, eps = 1e-10) => assert(Math.abs(a - b) < eps, `${a} != ${b}`);

const s1 = 0;
const s2 = 3;
const delta = Math.PI / 2;
const x = s1;
const regulators = [1, 0.3, 0.1, 0.03, 0.01, 0.003];
const rows = regulators.map((y) => {
  const a = weight(s1, x, y);
  const b = weight(s2, x, y);
  const eigenvalues = eigenvaluesTwoRays(a, b, delta);
  const determinant = determinantTwoRays(a, b, delta);
  close(eigenvalues[0] * eigenvalues[1], determinant, 1e-8);
  assert(eigenvalues[1] > 0);
  return {
    y,
    weights: [a, b],
    eigenvalues,
    determinant,
    conditionNumber: eigenvalues[0] / eigenvalues[1],
    normalizedDeterminant: determinant / (a + b) ** 2,
  };
});
for (let i = 1; i < rows.length; i += 1) {
  assert(rows[i].conditionNumber > rows[i - 1].conditionNumber);
  assert(rows[i].normalizedDeterminant < rows[i - 1].normalizedDeterminant);
}

// Collinear exchange rays never enter the cone interior, regardless of the
// number or location of spectral atoms.
const collinearA = weight(0, 0.7, 0.4);
const collinearB = weight(3, 0.7, 0.4);
close(determinantTwoRays(collinearA, collinearB, 0), 0);

console.log(JSON.stringify({
  protocol: "spectral-resolution-rank-of-two-face-response/1",
  response: "Y(x+iy)=sum_j y/((s_j-x)^2+y^2) R(theta_j)",
  rankCriterion: "det Y=2 sum_{j<k} a_j a_k[1-cos(theta_j-theta_k)]; full rank iff at least two positive noncollinear exchange rays contribute",
  example: {
    spectralAtoms: [s1, s2],
    relativePhase: delta,
    evaluatedAt: x,
    regulatorScan: rows,
  },
  exactObservations: {
    finiteUpperHalfPlaneYIsFullRank: true,
    approachToFirstRankOneResidueIsIllConditioned: true,
    collinearRaysRemainRankOne: true,
    separatedAtomsDoNotProvePointwiseBoundaryFullRank: true,
  },
  conclusion: "Noncollinear spectral channels guarantee interior matrix-Herglotz response for every y>0, but separated rank-one thresholds can approach a rank-one boundary residue as y->0. A physical absorptive lock must specify real broadening/coarse graining or prove overlapping full-rank boundary spectral density; an arbitrary i epsilon is insufficient.",
  passed: true,
}, null, 2));
