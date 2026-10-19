import assert from "node:assert/strict";

const dimensions = [6, 3, 3, 2, 1, 1];
const lambda = [5, 5, 1, 1, 1, 0];
const charge = [1, -1, -1, -3, 3, 3];
const massSquared = [4, 9, 16, 25, 36, 49];
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => add(A, scale(-1, B));
const outer = (v) => v.map((x) => v.map((y) => x * y));
const zero = () => [[0, 0], [0, 0]];
const response = (t) => dimensions.reduce((G, d, r) => add(G, scale(d / (t + massSquared[r]), outer([lambda[r], charge[r]]))), zero());
const flat = (G) => [G[0][0], G[0][1], G[1][1]];
const det = (G) => G[0][0] * G[1][1] - G[0][1] ** 2;
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const rank = (rows) => {
  const A = rows.map((r) => r.map(Number));
  let out = 0;
  for (let c = 0; c < A[0].length && out < A.length; c += 1) {
    let p = out;
    while (p < A.length && Math.abs(A[p][c]) < 1e-11) p += 1;
    if (p === A.length) continue;
    [A[out], A[p]] = [A[p], A[out]];
    const q = A[out][c];
    A[out] = A[out].map((x) => x / q);
    for (let i = 0; i < A.length; i += 1) if (i !== out) {
      const f = A[i][c];
      A[i] = A[i].map((x, j) => x - f * A[out][j]);
    }
    out += 1;
  }
  return out;
};

const frequencies = [0, 5, 30];
const matrices = frequencies.map(response);
assert(matrices.every((G) => G[0][0] > 0 && det(G) > 0));
const familySpanRank = rank(matrices.map(flat));
assert.equal(familySpanRank, 3);

const commutators = [];
for (let i = 0; i < matrices.length; i += 1) for (let j = i + 1; j < matrices.length; j += 1) {
  const C = sub(mul(matrices[i], matrices[j]), mul(matrices[j], matrices[i]));
  commutators.push({ pair: [frequencies[i], frequencies[j]], normMax: maxAbs(C) });
}
assert(commutators.every(({ normMax }) => normMax > 1e-8));

// Equal thresholds collapse the fixed-frame family to a scalar multiple of
// one Gram matrix and hence back to the two-dimensional generated algebra.
const commonMass = 10;
const equalThresholdResponse = (t) => dimensions.reduce((G, d, r) => add(G, scale(d / (t + commonMass), outer([lambda[r], charge[r]]))), zero());
const equalMatrices = frequencies.map(equalThresholdResponse);
assert.equal(rank(equalMatrices.map(flat)), 1);

console.log(JSON.stringify({
  protocol: "threshold-running-spans-relational-h2/1",
  fixedSourceFrame: ["J_Lambda", "J_B-L"],
  stieltjesModel: "G(t)=sum_r d_r v_r v_r^T/(t+m_r^2), v_r=(lambda_r,q_r)",
  declaredMassSquared: massSquared,
  samples: frequencies.map((t, i) => ({ t, matrix: matrices[i], determinant: det(matrices[i]) })),
  familySpanRank,
  pairwiseNoncommutation: commutators,
  control: {
    equalThresholdFamilySpanRank: rank(equalMatrices.map(flat)),
    interpretation: "with a common threshold every matrix is proportional to one fixed Gram",
  },
  exactConclusion: "Distinct positive sector thresholds in a fixed incidence/B-L source frame can make multi-frequency response matrices span all of Sym_2(R) and generate its full Jordan triple algebra. Degenerate threshold running cannot.",
  limitation: "The declared thresholds are an existence model, not a Standard-Model prediction. Full linear/Jordan accessibility does not prove that Sp(4,R) is a symmetry of the microscopic action.",
  passed: true,
}, null, 2));
