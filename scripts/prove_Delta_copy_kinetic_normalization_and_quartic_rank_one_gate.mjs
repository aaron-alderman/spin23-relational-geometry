import assert from "node:assert/strict";

const mm = (A, B) =>
  A.map((row) =>
    B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)),
  );
const tr = (A) => A.reduce((sum, row, i) => sum + row[i], 0);
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const hs = (A, B) => tr(mm(transpose(A), B));
const block = (L, K, R) => mm(mm(L, K), R);

const P = [
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const Q = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const K = [
  [1, 2, 3],
  [2, 4, 5],
  [3, 5, 6],
];

const CP = block(P, K, P);
const CQ = block(Q, K, Q);

const Z = (C) => hs(C, C);
const W = (C) => {
  const CtC = mm(transpose(C), C);
  return tr(mm(CtC, CtC));
};
const rho = (C) => W(C) / Z(C) ** 2;

const ZP = Z(CP);
const ZQ = Z(CQ);
const crossKinetic = hs(CP, CQ);
const rhoP = rho(CP);
const rhoQ = rho(CQ);

assert.equal(crossKinetic, 0);
assert(ZP > 0);
assert(ZQ > 0);
assert.equal(rhoP, 1);
assert(rhoQ >= 0.5 && rhoQ < 1);

// For a 2x2 real block [[a,b],[b,d]], rank one iff ad-b^2=0.
const B = [
  [K[1][1], K[1][2]],
  [K[2][1], K[2][2]],
];
const detB = B[0][0] * B[1][1] - B[0][1] * B[1][0];
assert.notEqual(detB, 0);

const rankOneQ = [
  [0, 0, 0],
  [0, 1, 2],
  [0, 2, 4],
];
assert.equal(rho(rankOneQ), 1);

const defectFromRatio = (r) => 2 * r / (1 + r) ** 2;
assert.equal(defectFromRatio(0), 0);
assert.equal(defectFromRatio(1), 0.5);

console.log(
  JSON.stringify(
    {
      protocol:
        "Delta-copy-kinetic-normalization-quartic-rank-one-gate/1",
      coefficientBlocks: { CP, CQ },
      kineticGram: [
        [ZP, crossKinetic],
        [crossKinetic, ZQ],
      ],
      canonicalNormalizationExists: ZP > 0 && ZQ > 0,
      normalizedQuarticShape: {
        rhoP,
        rhoQ,
        formula:
          "rho(C)=Tr[(C^* C)^2]/Tr(C^* C)^2=sum s_i^4/(sum s_i^2)^2",
      },
      genericQBlock: {
        B,
        determinant: detB,
        rank: 2,
        exactExchangeWithRankOneP: false,
      },
      rankOneWitness: {
        QBlockEmbedded: rankOneQ,
        rho: rho(rankOneQ),
        exactExchangeShapeWithP: true,
      },
      approximateExchange: {
        squaredSingularValueRatio: "r=s_2^2/s_1^2",
        defect: "1-rho_Q=2r/(1+r)^2",
        atRankOne: defectFromRatio(0),
        atEqualSingularValues: defectFromRatio(1),
      },
      boundary:
        "The theorem covers the minimal block-factorized single-trace potential; additional scalar paths or trace terms can modify quartic matching.",
      passed: true,
    },
    null,
    2,
  ),
);
