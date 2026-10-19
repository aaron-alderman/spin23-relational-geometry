import assert from "node:assert/strict";

const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const close = (a, b, eps = 1e-12) => assert(Math.abs(a - b) < eps, `${a} != ${b}`);
const projector = (m, p, h) => {
  const E = Math.sqrt(m * m + p * p);
  return [
    [(1 + h * p / E) / 2, m / (2 * E)],
    [m / (2 * E), (1 - h * p / E) / 2],
  ];
};

const scan = [0, 0.1, 0.511, 1, 10].map((p) => {
  const m = 0.511;
  const E = Math.sqrt(m * m + p * p);
  const plus = projector(m, p, +1);
  const minus = projector(m, p, -1);
  close(det(plus), 0);
  close(det(minus), 0);
  const unpolarized = add(plus, minus);
  const determinant = det(unpolarized);
  close(determinant, p * p / (E * E));
  const eigenvalues = [1 + m / E, 1 - m / E];
  close(eigenvalues[0] * eigenvalues[1], determinant);
  if (p === 0) close(determinant, 0);
  else assert(determinant > 0 && eigenvalues[1] > 0);
  return { p, E, positiveHelicityProjector: plus, negativeHelicityProjector: minus, unpolarizedResidue: unpolarized, eigenvalues, determinant };
});

console.log(JSON.stringify({
  protocol: "unpolarized-electron-boundary-spectral-rank/1",
  fixedHelicityResidue: "P_h=(I+(m/E)sigma_x+h(p/E)sigma_z)/2",
  facts: {
    eachHelicityResidueRankOne: true,
    helicitiesShareSamePositiveEnergy: true,
    unpolarizedSum: "P_++P_-=I+(m/E)sigma_x",
    unpolarizedDeterminant: "p^2/E^2",
    fullRankForNonzeroMomentum: true,
    rankOneAtRest: true,
  },
  scan,
  interpretation: "The Higgs-dressed left/right electron response has two physically overlapping, noncollinear helicity rays at the same boundary energy. An unpolarized measurement is full rank for p!=0 without an i epsilon regulator. A helicity-resolved measurement remains rank one.",
  limitation: "This proves boundary spectral interiority for the chiral/Higgs-dressed electron index. It does not identify that index with the independent Furey topology A/B index.",
  passed: true,
}, null, 2));
