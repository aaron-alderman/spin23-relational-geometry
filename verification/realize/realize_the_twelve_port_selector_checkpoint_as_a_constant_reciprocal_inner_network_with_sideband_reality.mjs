import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const zero = (m, n) => Array.from({ length: m }, () => Array.from({ length: n }, () => c(0)));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(Number(i === j))));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const dagger = A => transpose(A).map(row => row.map(conj));
const entrywiseConjugate = A => A.map(row => row.map(conj));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const blockDiagonal = blocks => {
  const n = blocks.reduce((s, B) => s + B.length, 0), out = zero(n, n);
  let offset = 0;
  for (const B of blocks) { for (let i = 0; i < B.length; i++) for (let j = 0; j < B.length; j++) out[offset + i][offset + j] = B[i][j]; offset += B.length; }
  return out;
};
const sidebandExchange = n => {
  const X = zero(2 * n, 2 * n);
  for (let i = 0; i < n; i++) X[i][n + i] = X[n + i][i] = c(1);
  return X;
};

const zeta = c(-0.5, rt3 / 2), zeta2 = conj(zeta);
const lambdas = [c(1), zeta, zeta2];
const swap2 = [[c(0), c(1)], [c(1), c(0)]];
const R12 = blockDiagonal(lambdas.map(lambda => blockDiagonal([
  [[c(1), c(0)], [c(0), lambda]],
  [[c(1), c(0)], [c(0), lambda]],
])));
const H12 = blockDiagonal(lambdas.map(() => blockDiagonal([swap2, swap2])));
const I12 = identity(12);

const positiveFrequencyDefects = {
  RReciprocity: maxDefect(transpose(R12), R12),
  HReciprocity: maxDefect(transpose(H12), H12),
  RInner: maxDefect(mm(dagger(R12), R12), I12),
  HInner: maxDefect(mm(dagger(H12), H12), I12),
  R3: maxDefect(mm(mm(R12, R12), R12), I12),
  H2: maxDefect(mm(H12, H12), I12),
};
assert.ok(Object.values(positiveFrequencyDefects).every(x => x < 1e-12));

const R24 = blockDiagonal([R12, entrywiseConjugate(R12)]);
const H24 = blockDiagonal([H12, entrywiseConjugate(H12)]);
const Xi = sidebandExchange(12), I24 = identity(24);
const realTimeDefects = {
  RReality: maxDefect(mm(mm(Xi, entrywiseConjugate(R24)), Xi), R24),
  HReality: maxDefect(mm(mm(Xi, entrywiseConjugate(H24)), Xi), H24),
  RReciprocity: maxDefect(transpose(R24), R24),
  HReciprocity: maxDefect(transpose(H24), H24),
  RInner: maxDefect(mm(dagger(R24), R24), I24),
  HInner: maxDefect(mm(dagger(H24), H24), I24),
};
assert.ok(Object.values(realTimeDefects).every(x => x < 1e-12));

const key = M => M.flatMap(row => row.flatMap(([x, y]) => [Math.round(x * 1e9), Math.round(y * 1e9)])).join(',');
const group = [I24], seen = new Set([key(I24)]);
for (let cursor = 0; cursor < group.length; cursor++) for (const g of [R24, H24]) {
  const next = mm(group[cursor], g), k = key(next);
  if (!seen.has(k)) { seen.add(k); group.push(next); }
  assert.ok(group.length <= 100);
}
assert.equal(group.length, 18);

console.log(JSON.stringify({
  protocol: 'constant-twelve-port-selector-checkpoint-transfer/1',
  positiveFrequencyEnvelope: { ports: 12, transferR: 'S_R(z)=R12', transferH: 'S_H(z)=H12', defects: positiveFrequencyDefects },
  realTimeCompletion: { constrainedSidebandCoordinates: 24, realStructure: 'Xi K', defects: realTimeDefects },
  generatedGroupOrder: group.length,
  causalStatement: 'Both transfers are degree-zero entire rational-inner reciprocal feedthroughs; no internal state or pole is needed at the enlarged checkpoint.',
  scopeBoundary: 'This realizes the checkpoint matrices, not one fixed twelve-port transfer whose compression reproduces the full frequency-dependent lossy two-channel law.',
  passed: true,
}, null, 2));
