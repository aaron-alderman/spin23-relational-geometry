import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-link-carrier-sp4-transport-v1.json"), "utf8"));

const zero = (r, c = r) => Array.from({ length: r }, () => Array(c).fill(0));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const rank = (rows, eps = 1e-10) => {
  const A = rows.map((row) => [...row]);
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let pivot = r;
    for (let i = r + 1; i < A.length; i += 1) if (Math.abs(A[i][c]) > Math.abs(A[pivot][c])) pivot = i;
    if (Math.abs(A[pivot][c]) < eps) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const d = A[r][c];
    for (let j = c; j < A[0].length; j += 1) A[r][j] /= d;
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const f = A[i][c];
      for (let j = c; j < A[0].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
};
const inverse = (M) => {
  const n = M.length;
  const A = M.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => Number(i === j))]);
  for (let c = 0; c < n; c += 1) {
    let pivot = c;
    for (let i = c + 1; i < n; i += 1) if (Math.abs(A[i][c]) > Math.abs(A[pivot][c])) pivot = i;
    assert.ok(Math.abs(A[pivot][c]) > 1e-12);
    [A[c], A[pivot]] = [A[pivot], A[c]];
    const d = A[c][c];
    A[c] = A[c].map((x) => x / d);
    for (let i = 0; i < n; i += 1) {
      if (i === c) continue;
      const f = A[i][c];
      A[i] = A[i].map((x, j) => x - f * A[c][j]);
    }
  }
  return A.map((row) => row.slice(n));
};

const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const J = [[0, 1, 0, 0], [-1, 0, 0, 0], [0, 0, 0, 1], [0, 0, -1, 0]];
const omega = [1, 0, 0, 0, 0, 1];
const wedgePair = (a, b) => a[0] * b[5] + a[5] * b[0] - a[1] * b[4] - a[4] * b[1] + a[2] * b[3] + a[3] * b[2];
const formMatrix = (v) => {
  const A = zero(4);
  pairs.forEach(([i, j], k) => { A[i][j] = v[k]; A[j][i] = -v[k]; });
  return A;
};
const formVector = (A) => pairs.map(([i, j]) => A[i][j]);
const actOnForm = (X, v) => {
  const A = formMatrix(v);
  return formVector(add(multiply(transpose(X), A), multiply(A, X)));
};
const primitiveBasis = [
  [0, 1, 0, 0, -1, 0],
  [0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, -1],
  [0, 1, 0, 0, 1, 0],
  [0, 0, 1, -1, 0, 0]
];
const primitiveGram = primitiveBasis.map((a) => primitiveBasis.map((b) => wedgePair(a, b)));
assert.deepEqual(primitiveGram, [[2, 0, 0, 0, 0], [0, 2, 0, 0, 0], [0, 0, -2, 0, 0], [0, 0, 0, -2, 0], [0, 0, 0, 0, -2]]);
const primitiveCoordinates = (v) => primitiveBasis.map((p, i) => wedgePair(p, v) / primitiveGram[i][i]);

const symmetric4 = [];
for (let i = 0; i < 4; i += 1) {
  for (let j = i; j < 4; j += 1) {
    const S = zero(4);
    S[i][j] = 1;
    S[j][i] = 1;
    symmetric4.push(S);
  }
}
const sp4 = symmetric4.map((S) => scale(-1, multiply(J, S)));
const primitiveAction = sp4.map((X) => {
  const R = zero(5);
  primitiveBasis.forEach((p, col) => primitiveCoordinates(actOnForm(X, p)).forEach((x, row) => { R[row][col] = x; }));
  assert.ok(maxAbs(add(multiply(transpose(R), primitiveGram), multiply(primitiveGram, R))) < 1e-10);
  return R;
});
assert.equal(rank(primitiveAction.map((R) => R.flat())), 10);

const s2 = Math.sqrt(2);
const T = [
  [0, 1 / (2 * s2), 0, 0, 1 / (2 * s2)],
  [0, 0, 1 / (2 * s2), -1 / (2 * s2), 0],
  [1 / s2, 0, 0, 0, 0],
  [0, 1 / (2 * s2), 0, 0, -1 / (2 * s2)],
  [0, 0, 1 / (2 * s2), 1 / (2 * s2), 0]
];
const eta = [
  [-1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0.5],
  [0, 0, 0, -0.5, 0],
  [0, 0, -0.5, 0, 0],
  [0, 0.5, 0, 0, 0]
];
assert.ok(maxAbs(add(multiply(multiply(transpose(T), primitiveGram), T), scale(-1, eta))) < 1e-10);
const Tinv = inverse(T);
const linkAction = primitiveAction.map((R) => multiply(multiply(Tinv, R), T));
for (const G of linkAction) assert.ok(maxAbs(add(multiply(transpose(G), eta), multiply(eta, G))) < 1e-9);
assert.equal(rank(linkAction.map((G) => G.flat())), 10);

const fixesSinglet = linkAction.filter((G) => {
  const column = G.map((row) => row[0]);
  const row = G[0];
  return column.every((x) => Math.abs(x) < 1e-9) && row.every((x) => Math.abs(x) < 1e-9);
});
const mixingRank = rank(linkAction.filter((G) => !fixesSinglet.includes(G)).map((G) => G.flat()));
assert.equal(fixesSinglet.length, 6);
assert.equal(mixingRank, 4);

assert.equal(certificate.protocol, "admissibility-link-carrier-sp4-transport/1");
assert.equal(certificate.transportedAction.generatorCount, 10);
assert.equal(certificate.transportedAction.subalgebraFixingSingletDimension, fixesSinglet.length);
assert.equal(certificate.transportedAction.singletRelationalMixingDimension, mixingRank);
assert.equal(certificate.status.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  linkCarrierDimension: 5,
  explicitIsometry: true,
  transportedGeneratorRank: 10,
  metricPreservation: "PASS",
  stabilizesSinglet: fixesSinglet.length,
  mixesSingletAndRelationalBlock: mixingRank,
  algebraicClosure: "sp(4,R) ~= so(2,3)",
  microscopicAction: "OPEN"
}));
