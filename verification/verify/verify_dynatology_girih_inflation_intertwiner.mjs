import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const record = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/girih_inflation_intertwiner_v1.json"), "utf8"));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const vec = (A, x) => A.map((row) => row.reduce((sum, a, i) => sum + a * x[i], 0));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const pow2 = (A, n) => { let out = [[1, 0], [0, 1]]; for (let i = 0; i < n; i += 1) out = mul(out, A); return out; };

assert.equal(record.schema, "dynatology-girih-inflation-intertwiner/1");
assert.equal(record.status, "exact_external_to_corpus_integral_intertwiner_with_source_and_carrier_boundaries");
const G = record.girihCountMap.matrix;
assert.deepEqual(vec(G, record.girihCountMap.kernelGeneratorInInputBasis), [0, 0, 0]);
assert.deepEqual(G[0], G[1]);
assert.deepEqual(G.map((row) => row[2]), G.map((row) => row[0] + 3 * row[1]));
const Q = record.survivingQuotient.countMatrixQ;
const B = record.survivingQuotient.normalizedMatrixB;
assert.deepEqual(Q, B.map((row) => row.map((x) => 4 * x)));
assert.equal(det2(B), 1);
assert.equal(B[0][0] + B[1][1], 18);
const S = record.penroseCorpusAction.matrixS;
assert.equal(det2(S), 1);
assert.equal(S[0][0] + S[1][1], 3);
const P = record.intertwiner.P;
assert.equal(det2(P), 2);
assert.deepEqual(mul(pow2(S, 3), P), mul(P, B));
// The complete integer solution of S^3 X = X B is
// X(a,c)=[[a,a+2c],[c,2a-c]], with determinant 2(a^2-ac-c^2).
for (const a of [-3, -2, -1, 0, 1, 2, 3]) {
  for (const c of [-3, -2, -1, 0, 1, 2, 3]) {
    const X = [[a, a + 2 * c], [c, 2 * a - c]];
    assert.deepEqual(mul(pow2(S, 3), X), mul(X, B));
    assert.equal(det2(X), 2 * (a ** 2 - a * c - c ** 2));
    assert.equal(Math.abs(det2(X)) % 2, 0);
  }
}
assert.equal(record.intertwiner.minimalNonzeroAbsoluteDeterminant, 2);
assert.match(record.intertwiner.integralScar, /no_unimodular/);
const {block1, J, block2, K} = record.claim772Conjugacy;
assert.equal(det2(J), 1);
assert.equal(det2(K), 1);
assert.deepEqual(mul(S, J), mul(J, block1));
assert.deepEqual(mul(S, K), mul(K, block2));
const phi = (1 + Math.sqrt(5)) / 2;
const lambdaB = 9 + 4 * Math.sqrt(5);
assert.ok(Math.abs(lambdaB - phi ** 6) < 1e-12);
assert.ok(Math.abs((36 + 16 * Math.sqrt(5)) - 4 * phi ** 6) < 1e-12);

console.log("Dynatology girih inflation intertwiner: PASS");
console.log(JSON.stringify({girihRank: record.girihCountMap.rank, erasedDirection: record.girihCountMap.kernelGeneratorInInputBasis, normalizedGirihEigenvalue: lambdaB, penroseThreeStepEigenvalue: phi ** 6, intertwinerIndex: Math.abs(det2(P)), claim772Copies: 2}));
