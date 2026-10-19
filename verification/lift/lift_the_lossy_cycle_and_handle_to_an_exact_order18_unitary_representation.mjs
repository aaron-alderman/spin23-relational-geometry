import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const sub = ([a, b], [d, e]) => [a - d, b - e];
const scale = (r, [a, b]) => [r * a, r * b];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const div = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const realM = A => A.map(row => row.map(x => c(x)));
const zero = (m, n) => Array.from({ length: m }, () => Array.from({ length: n }, () => c(0)));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(Number(i === j))));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const mscale = (r, A) => A.map(row => row.map(x => scale(r, x)));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const blockDiagonal = blocks => {
  const n = blocks.reduce((s, B) => s + B.length, 0), out = zero(n, n);
  let offset = 0;
  for (const B of blocks) { for (let i = 0; i < B.length; i++) for (let j = 0; j < B.length; j++) out[offset + i][offset + j] = B[i][j]; offset += B.length; }
  return out;
};
const lossyFactor = (gamma, ell) => {
  const r = div(c(1, -gamma * Math.exp(-ell)), c(1, gamma * Math.exp(ell)));
  return mul(r, r);
};
const Uface = realM([[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]]), Ufacet = dagger(Uface), D = realM([[1, 0], [0, -1]]);
const response = (en, et) => mm(mm(Uface, [[lossyFactor(1 + rt2, en), c(0)], [c(0), lossyFactor(rt2 - 1, et)]]), Ufacet);
const cycle = (en, et) => { const S = response(en, et); return mm(mm(mm(D, S.map(row => row.map(conj))), D), S); };
const hermitianParts = A => {
  const Ah = dagger(A), diff = msub(A, Ah);
  return { re: mscale(0.5, madd(A, Ah)), im: mscale(0.5, diff.map(row => row.map(([x, y]) => c(y, -x)))) };
};
const povm = C => {
  const { re, im } = hermitianParts(C), P0 = mscale(1 / 3, madd(identity(2), mscale(2, re))), half = mscale(0.5, msub(identity(2), P0));
  return [P0, madd(half, mscale(1 / rt3, im)), msub(half, mscale(1 / rt3, im))];
};
const choleskyB = P => {
  const l00 = Math.sqrt(P[0][0][0]), l10 = scale(1 / l00, P[1][0]);
  const l11 = Math.sqrt(Math.max(0, P[1][1][0] - l10[0] ** 2 - l10[1] ** 2));
  return dagger([[c(l00), c(0)], [l10, c(l11)]]); // B^*B=P
};

const zeta = c(-0.5, rt3 / 2), zeta2 = conj(zeta);
const loss = [0.05, 0.05], C = cycle(...loss), P = povm(C), B = P.map(choleskyB);
// Each character sector is multiplicity C^2 tensor a neutral/active pair.
// r=diag(1,lambda_k), h=swap on the pair.
const lambdas = [c(1), zeta, zeta2];
const rBlocks = lambdas.map(lambda => blockDiagonal([[[c(1), c(0)], [c(0), lambda]], [[c(1), c(0)], [c(0), lambda]]]));
const swap2 = [[c(0), c(1)], [c(1), c(0)]];
const hBlocks = lambdas.map(() => blockDiagonal([swap2, swap2]));
const R12 = blockDiagonal(rBlocks), H12 = blockDiagonal(hBlocks);

// N and A are 12x2 isometries. Within every multiplicity pair, H maps n to a.
const N = zero(12, 2), A = zero(12, 2);
for (let k = 0; k < 3; k++) for (let m = 0; m < 2; m++) for (let j = 0; j < 2; j++) {
  N[4 * k + 2 * m][j] = B[k][m][j];
  A[4 * k + 2 * m + 1][j] = B[k][m][j];
}
const J = N.map((row, i) => [...row, ...A[i]]);
const Hphysical = [[...zero(2, 2)[0], ...identity(2)[0]], [...zero(2, 2)[1], ...identity(2)[1]], [...identity(2)[0], ...zero(2, 2)[0]], [...identity(2)[1], ...zero(2, 2)[1]]];
const Rphysical = blockDiagonal([identity(2), C]);

const defects = {
  embeddingIsometry: maxDefect(mm(dagger(J), J), identity(4)),
  handleIntertwiner: maxDefect(mm(H12, J), mm(J, Hphysical)),
  handleCompression: maxDefect(mm(mm(dagger(J), H12), J), Hphysical),
  cycleCompression: maxDefect(mm(mm(dagger(J), R12), J), Rphysical),
  R3: maxDefect(mm(mm(R12, R12), R12), identity(12)),
  H2: maxDefect(mm(H12, H12), identity(12)),
};
assert.ok(Object.values(defects).every(x => x < 1e-10));

const matrixKey = M => M.flatMap(row => row.flatMap(([x, y]) => [Math.round(x * 1e9), Math.round(y * 1e9)])).join(',');
const group = [identity(12)], seen = new Set([matrixKey(identity(12))]);
for (let cursor = 0; cursor < group.length; cursor++) for (const generator of [R12, H12]) {
  const next = mm(group[cursor], generator), key = matrixKey(next);
  if (!seen.has(key)) { seen.add(key); group.push(next); }
  assert.ok(group.length <= 100);
}
assert.equal(group.length, 18);

console.log(JSON.stringify({
  protocol: 'lossy-full-selector-order18-unitary-dilation/1',
  loss,
  ambientDimension: 12,
  representationSectors: [
    { activeCharacter: '1', realization: 'trivial plus sign pair', multiplicity: 2 },
    { activeCharacter: 'zeta', realization: 'central-character-2 standard sector', multiplicity: 2 },
    { activeCharacter: 'zeta^2', realization: 'central-character-1 standard sector', multiplicity: 2 },
  ],
  defects,
  generatedGroupOrder: group.length,
  compression: 'J^* R12 J = I2 direct-sum C_loss and J^* H12 J = H_swap',
  interpretation: 'The full coherent response environment carries an exact order-18 C3 times S3 representation while the observed active compression is lossy and non-finite-order.',
  limitation: 'This is a finite-dimensional representation/dilation theorem, not yet a local causal state-space or Standard-Model microscopic realization.',
  passed: true,
}, null, 2));
