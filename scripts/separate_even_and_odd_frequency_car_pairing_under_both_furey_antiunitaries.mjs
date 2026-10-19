import assert from 'node:assert/strict';

const tol = 1e-9;
const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => z(a.re, -a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => z(0)));
const tr = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const star = (A) => A.map((row) => row.map(conj));
const mm = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce(
  (sum, _, k) => add(sum, mul(A[i][k], B[k][j])), z(0),
)));
const scale = (a, A) => A.map((row) => row.map((x) => mul(a, x)));
const plus = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const same = (A, B) => A.every((row, i) => row.every(
  (a, j) => Math.abs(a.re - B[i][j].re) < tol && Math.abs(a.im - B[i][j].im) < tol,
));
const antiPair = (U, F) => mm(mm(U, star(F)), tr(U));

const I = [[z(1), z(0)], [z(0), z(1)]];
const X = [[z(0), z(1)], [z(1), z(0)]];
const Z = [[z(1), z(0)], [z(0), z(-1)]];
const eps = [[z(0), z(1)], [z(-1), z(0)]];

const basisAll = () => {
  const out = [];
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    for (const coefficient of [z(1), z(0, 1)]) {
      const B = zero(2); B[i][j] = coefficient; out.push(B);
    }
  }
  return out;
};
const basisAntisymmetric = () => [eps, scale(z(0, 1), eps)];

const flattenResidual = (basis, Ulist) => basis.map((B) => {
  const values = [];
  for (const U of Ulist) {
    const T = antiPair(U, B);
    for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
      const d = sub(B[i][j], T[i][j]); values.push(d.re, d.im);
    }
  }
  return values;
});
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
const nullity = (basis) => {
  const columns = flattenResidual(basis, [X, eps]);
  const rows = columns[0].map((_, i) => columns.map((column) => column[i]));
  return basis.length - rank(rows);
};

assert.equal(nullity(basisAntisymmetric()), 0);
assert.equal(nullity(basisAll()), 2);

// The common unrestricted internal plane is symmetric: s I + i v Z.
for (const F of [I, scale(z(0, 1), Z)]) {
  assert.ok(same(tr(F), F));
  assert.ok(same(antiPair(X, F), F));
  assert.ok(same(antiPair(eps, F), F));
}

// Odd frequency times a symmetric internal tensor satisfies the full CAR
// exchange law F(-w)=-F(w)^T.
const Fodd = (w) => {
  const s = w / (1 + w * w);
  const v = 0.3 * w / (1 + 2 * w * w);
  return plus(scale(z(s), I), scale(z(0, v), Z));
};
for (const w of [0.1, 0.7, 2]) {
  assert.ok(same(Fodd(-w), scale(z(-1), tr(Fodd(w)))));
}

// The tuned signed coherence is an explicit odd-frequency scalar candidate.
const q = (1 + Math.SQRT2) ** 4;
const A = (w) => 1 - ((w * w + 1) / (w * w + q)) ** 2;
const B = (w) => 1 - ((w * w + 1 / q) / (w * w + 1)) ** 2;
const signed = (w) => Math.sign(w) * 0.5 * Math.sqrt(Math.max(0, A(w) - B(w)));
for (const w of [0.1, 1, 5]) assert.ok(Math.abs(signed(-w) + signed(w)) < tol);

// Symmetric cutoff sums cancel exactly for an odd kernel, while absolute sums
// remain nonzero; this distinguishes a principal-value cancellation from UV
// regularity.
let signedSum = 0, absoluteSum = 0;
for (let k = -10000; k <= 10000; k += 1) {
  if (k === 0) continue;
  const value = signed(k / 100);
  signedSum += value;
  absoluteSum += Math.abs(value);
}
assert.ok(Math.abs(signedSum) < 1e-9);
assert.ok(absoluteSum > 1);

console.log(JSON.stringify({
  protocol: 'even-odd-frequency-car-two-antiunitary-split/1',
  equalTimeOrEvenFrequencyAntisymmetricCommonDimension: 0,
  oddFrequencySymmetricCommonDimension: 2,
  commonOddInternalPlane: 's I + i v sigma_z',
  carExchange: 'F(-omega)=-F(omega)^T',
  tunedSignedRootParity: 'odd-frequency compatible',
  pointwiseFermionicWickMapDerived: false,
  ultravioletAbsoluteIntegrability: false,
  passed: true,
}, null, 2));
