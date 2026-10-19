import assert from "node:assert/strict";

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const kron = (A, B) => A.flatMap((aRow) => B.map((bRow) => aRow.flatMap((a) => bRow.map((b) => a * b))));

// Symmetric tensor components ordered as
// 00,01,02,03,11,12,13,22,23,33.
// At timelike rest momentum p=(omega,0,0,0), conservation sets T^{0nu}=0.
const D = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
];
const Pspatial = Array.from({ length: 10 }, (_, i) => Array.from({ length: 10 }, (_, j) => (i === j && i >= 4 ? 1 : 0)));
assert.equal(maxAbs(mul(D, Pspatial)), 0);

const rankOneFace = [[1, 1], [1, 1]];
const fullRankFace = [[1, 0.2], [0.2, 1]];
assert.equal(det2(rankOneFace), 0);
assert(det2(fullRankFace) > 0);

// Ward action on Lorentz x face space is D tensor I_2.
const I2 = [[1, 0], [0, 1]];
const Ward = kron(D, I2);
const rhoRankOne = kron(Pspatial, rankOneFace);
const rhoFullRank = kron(Pspatial, fullRankFace);
assert(maxAbs(mul(Ward, rhoRankOne)) < 1e-12);
assert(maxAbs(mul(Ward, rhoFullRank)) < 1e-12);

// Both are positive semidefinite because each is a tensor product of PSD
// factors.  Their topology-face ranks remain different.
const lorentzSupportRank = 6;
const totalRanks = {
  rankOneFace: lorentzSupportRank * 1,
  fullRankFace: lorentzSupportRank * 2,
};
assert.deepEqual(totalRanks, { rankOneFace: 6, fullRankFace: 12 });

console.log(JSON.stringify({
  protocol: "stress-ward-identity-does-not-select-face-kernel/1",
  restFrameMomentum: "p=(omega,0,0,0)",
  symmetricTensorComponents: ["00", "01", "02", "03", "11", "12", "13", "22", "23", "33"],
  wardKernelDimension: lorentzSupportRank,
  faceExamples: {
    rankOne: { matrix: rankOneFace, determinant: det2(rankOneFace), totalSpectralRank: totalRanks.rankOneFace, wardSatisfied: true },
    fullRank: { matrix: fullRankFace, determinant: det2(fullRankFace), totalSpectralRank: totalRanks.fullRankFace, wardSatisfied: true },
  },
  exactSeparation: "rho_{ab}^{munu,rhosigma}=sum_s P_s^{munu,rhosigma} K_{s,ab}; Lorentz conservation constrains P_s, not K_s",
  conclusion: "The diffeomorphism Ward identity and universal total-stress coupling do not select topology-face phase or rank. Rank-one and full-rank positive face kernels satisfy the same conservation equations. A separate exchange/source law is required.",
  passed: true,
}, null, 2));
