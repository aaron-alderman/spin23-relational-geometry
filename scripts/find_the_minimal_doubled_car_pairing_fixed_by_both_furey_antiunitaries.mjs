import assert from 'node:assert/strict';

const tol = 1e-9;
const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => z(a.re, -a.im);
const zero = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => z(0)));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => z(i === j ? 1 : 0)));
const tr = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const star = (A) => A.map((row) => row.map(conj));
const mm = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce(
  (sum, _, k) => add(sum, mul(A[i][k], B[k][j])), z(0),
)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap(
  (a) => rowB.map((b) => mul(a, b)),
)));
const scale = (a, A) => A.map((row) => row.map((x) => mul(a, x)));
const same = (A, B) => A.every((row, i) => row.every(
  (a, j) => Math.abs(a.re - B[i][j].re) < tol && Math.abs(a.im - B[i][j].im) < tol,
));
const antiPair = (U, S) => mm(mm(U, star(S)), tr(U));

const I2 = eye(2);
const X = [[z(0), z(1)], [z(1), z(0)]];
const Z = [[z(1), z(0)], [z(0), z(-1)]];
const eps = [[z(0), z(1)], [z(-1), z(0)]];

const antisymmetricRealBasis = (n) => {
  const out = [];
  for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
    for (const coefficient of [z(1), z(0, 1)]) {
      const B = zero(n);
      B[i][j] = coefficient;
      B[j][i] = scale(z(-1), [[coefficient]])[0][0];
      out.push(B);
    }
  }
  return out;
};

const flattenResidual = (Ulist, B) => {
  const values = [];
  for (const U of Ulist) {
    const R = antiPair(U, B).map((row, i) => row.map((x, j) => sub(B[i][j], x)));
    for (const row of R) for (const x of row) values.push(x.re, x.im);
  }
  return values;
};

const rank = (rows, epsRank = 1e-8) => {
  const A = rows.map((row) => [...row]);
  const m = A.length, n = A[0]?.length ?? 0;
  let r = 0;
  for (let col = 0; col < n && r < m; col += 1) {
    let pivot = r;
    for (let i = r + 1; i < m; i += 1) if (Math.abs(A[i][col]) > Math.abs(A[pivot][col])) pivot = i;
    if (Math.abs(A[pivot][col]) < epsRank) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const p = A[r][col];
    for (let j = col; j < n; j += 1) A[r][j] /= p;
    for (let i = 0; i < m; i += 1) if (i !== r) {
      const f = A[i][col];
      for (let j = col; j < n; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
};

const fixedNullity = (Ulist, n) => {
  const basis = antisymmetricRealBasis(n);
  const columns = basis.map((B) => flattenResidual(Ulist, B));
  const rows = columns[0].map((_, i) => columns.map((column) => column[i]));
  return basis.length - rank(rows);
};

// One two-channel CAR copy has no nonzero common anomalous pair.
assert.equal(fixedNullity([X, eps], 2), 0);

// Two copies are the next allowed size.  Both antiunitaries act on the channel
// factor and leave a two-real-dimensional cross-copy pairing plane.
const X4 = kron(I2, X);
const eps4 = kron(I2, eps);
assert.equal(fixedNullity([X4, eps4], 4), 2);

const pairS = kron(eps, I2);
const pairV = kron(eps, scale(z(0, 1), Z));
for (const S of [pairS, pairV]) {
  assert.ok(same(tr(S), scale(z(-1), S)));
  assert.ok(same(antiPair(X4, S), S));
  assert.ok(same(antiPair(eps4, S), S));
}

// Opposite charges on the two copies make the cross-copy pair gauge neutral.
const gauge = (theta) => {
  const ep = z(Math.cos(theta), Math.sin(theta));
  const em = conj(ep);
  const G = zero(4);
  for (let i = 0; i < 2; i += 1) G[i][i] = ep;
  for (let i = 2; i < 4; i += 1) G[i][i] = em;
  return G;
};
for (const theta of [0.2, 0.7, 1.9]) {
  const G = gauge(theta);
  for (const S of [pairS, pairV]) assert.ok(same(mm(mm(G, S), tr(G)), S));
}

// The common pair is eps_copy tensor (s I + i v Z); its singular magnitude
// is sqrt(s^2+v^2), so a half-filled quasifree generalized density is valid
// whenever that magnitude is at most 1/2.
const s = 0.3, v = 0.2;
assert.ok(Math.hypot(s, v) < 0.5);

console.log(JSON.stringify({
  protocol: 'minimal-doubled-car-two-antiunitary-pair/1',
  twoComponentCommonPairDimension: 0,
  fourComponentCommonPairDimension: 2,
  commonPair: 'epsilon_copy tensor (s I + i v sigma_z)',
  oppositeChargeGaugeInvariant: true,
  minimality: 'four complex CAR modes within the repeated fundamental representation',
  fermionicWickSurjectionDerived: false,
  passed: true,
}, null, 2));
