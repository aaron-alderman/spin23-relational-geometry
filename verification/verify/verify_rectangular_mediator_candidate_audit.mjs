import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/rectangular_mediator_candidate_audit_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const close = (left, right, tolerance = 1e-12) => Math.abs(left - right) < tolerance;

// Exact rational checkpoint: columns e_n=(3/5,4/5,0), e_t=(5/13,0,12/13).
const E = [
  [3 / 5, 5 / 13],
  [4 / 5, 0],
  [0, 12 / 13],
];
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
const mul = (left, right) => left.map((row) => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const gram = mul(transpose(E), E);
const gramDeterminant = gram[0][0] * gram[1][1] - gram[0][1] * gram[1][0];

insist(close(gram[0][0], 1) && close(gram[1][1], 1), "partial-sewing columns are not normalized");
insist(close(gram[0][1], 3 / 13) && close(gram[1][0], 3 / 13), "unexpected Gram overlap");
insist(close(gramDeterminant, 160 / 169) && gramDeterminant > 0, "unexpected Gram determinant");

const kernel = [12, -9, -5];
const adjoint = transpose(E);
for (const row of adjoint) insist(close(row.reduce((sum, value, index) => sum + value * kernel[index], 0), 0), "declared adjoint kernel failed");

// Embed E as the lower off-diagonal block on C^2 + C^3.
const N = Array.from({ length: 5 }, () => Array(5).fill(0));
for (let row = 0; row < 3; row += 1) for (let column = 0; column < 2; column += 1) N[row + 2][column] = E[row][column];
const N2 = mul(N, N);
insist(N2.flat().every((value) => close(value, 0)), "one-way block embedding is not square-zero");

const partial = ledger.candidates.find(({ id }) => id === "typed-partial-sewing");
insist(partial.correctRectangularShape && partial.rank === 2 && partial.kernelDimensionOfAdjoint === 1, "partial-sewing candidate classification mismatch");
insist(partial.fullSl2Sl3CovarianceEstablished === false && partial.claimipediaIntertwinerEstablished === false, "candidate was promoted without equivariance");
insist(ledger.conclusion.rectangularCarrierExistsInCorpus && !ledger.conclusion.targetIntertwinerExistsInCorpus, "audit conclusion mismatch");

console.log(JSON.stringify({
  status: "PASS",
  candidate: "typed-partial-sewing",
  map: "E:C^2->C^3",
  shape: [3, 2],
  rank: 2,
  adjointKernelDimension: 1,
  gramOverlap: gram[0][1],
  gramDeterminant,
  squareZeroBlockEmbedding: true,
  fullSl2Sl3CovarianceEstablished: false,
  claimipediaIntertwinerEstablished: false,
  disposition: "NEAR_HIT_PROMOTION_WITHHELD",
}));
