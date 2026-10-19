import assert from 'node:assert/strict';

const abs = x => x < 0n ? -x : x;
const gcd = (a, b) => { a = abs(a); b = abs(b); while (b) [a, b] = [b, a % b]; return a || 1n; };
const rat = (n, d = 1n) => {
  assert.notEqual(d, 0n);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d);
  return [n / g, d / g];
};
const radd = ([a, b], [c, d]) => rat(a * d + c * b, b * d);
const rneg = ([a, b]) => [-a, b];
const rmul = ([a, b], [c, d]) => rat(a * c, b * d);
const rcmp = ([a, b], [c, d]) => Math.sign(Number(a * d - c * b));
const rnum = ([a, b]) => Number(a) / Number(b);

// Exact Q(sqrt(2)) values represented as a+b sqrt(2), with rational a,b.
const q2 = (a, b = 0) => ({ a: rat(BigInt(a)), b: rat(BigInt(b)) });
const qadd = (x, y) => ({ a: radd(x.a, y.a), b: radd(x.b, y.b) });
const qmul = (x, y) => ({
  a: radd(rmul(x.a, y.a), rmul(rat(2n), rmul(x.b, y.b))),
  b: radd(rmul(x.a, y.b), rmul(x.b, y.a)),
});
const qscale = (x, factor) => ({ a: rmul(x.a, factor), b: rmul(x.b, factor) });
const qzero = x => x.a[0] === 0n && x.b[0] === 0n;
const qsign = x => {
  const sa = rcmp(x.a, rat(0n)), sb = rcmp(x.b, rat(0n));
  if (sb === 0) return sa;
  if (sa === 0) return sb;
  if (sa === sb) return sa;
  const a2 = rmul(x.a, x.a), twoB2 = rmul(rat(2n), rmul(x.b, x.b));
  const magnitude = rcmp(a2, twoB2);
  return sa > 0 ? magnitude : -magnitude;
};
const qnum = x => rnum(x.a) + Math.SQRT2 * rnum(x.b);

// Sparse bivariate polynomials, keyed by "i,j" for p^i q^j.
const constant = value => new Map([['0,0', value]]);
const variable = axis => new Map([[axis === 0 ? '1,0' : '0,1', q2(1)]]);
const add = (A, B, multiplier = q2(1)) => {
  const C = new Map(A);
  for (const [key, value] of B) C.set(key, qadd(C.get(key) ?? q2(0), qmul(multiplier, value)));
  return new Map([...C].filter(([, value]) => !qzero(value)));
};
const mul = (A, B) => {
  const C = new Map();
  for (const [ka, a] of A) for (const [kb, b] of B) {
    const [ia, ja] = ka.split(',').map(Number), [ib, jb] = kb.split(',').map(Number);
    const key = `${ia + ib},${ja + jb}`;
    C.set(key, qadd(C.get(key) ?? q2(0), qmul(a, b)));
  }
  return new Map([...C].filter(([, value]) => !qzero(value)));
};
const scale = (value, A) => new Map([...A].map(([key, coefficient]) => [key, qmul(value, coefficient)]));
const pow = (A, n) => { let C = constant(q2(1)); for (let k = 0; k < n; k++) C = mul(C, A); return C; };
const choose = (n, k) => { let x = 1n; for (let j = 1; j <= k; j++) x = x * BigInt(n - j + 1) / BigInt(j); return x; };
const bernstein = (A, m, n) => Array.from({ length: m + 1 }, (_, i) =>
  Array.from({ length: n + 1 }, (_, j) => {
    let value = q2(0);
    for (let k = 0; k <= i; k++) for (let ell = 0; ell <= j; ell++) {
      const ratio = rat(choose(i, k) * choose(j, ell), choose(m, k) * choose(n, ell));
      value = qadd(value, qscale(A.get(`${k},${ell}`) ?? q2(0), ratio));
    }
    return value;
  }));

const one = constant(q2(1)), p = variable(0), q = variable(1);
const p2 = pow(p, 2), qSquared = pow(q, 2);
const r2 = q2(3, 2), h2 = q2(3, -2);
const Da = pow(add(p2, constant(r2)), 2);
const Db = pow(add(qSquared, constant(h2)), 2);
const M = mul(Da, Db);
const X = mul(pow(p, 4), pow(add(one, scale(r2, p2)), 2));
const Y = mul(pow(q, 4), pow(add(one, scale(h2, qSquared)), 2));
const xM = mul(X, Db), yM = mul(Y, Da);
const U = mul(mul(p2, qSquared), add(
  mul(pow(add(one, p2, q2(-1)), 2), pow(add(one, qSquared, q2(-1)), 2)),
  scale(q2(-16), mul(mul(p, q), mul(add(one, p2), add(one, qSquared))))
));
const V = scale(q2(4), mul(mul(p2, qSquared), add(
  mul(q, mul(pow(add(one, p2, q2(-1)), 2), add(one, qSquared))),
  mul(p, mul(add(one, p2), pow(add(one, qSquared, q2(-1)), 2)))
)));

const Np0a = add(add(add(scale(q2(4), M), xM, q2(-1)), scale(q2(3), yM)), scale(q2(6), U));
const Np0d = add(add(add(scale(q2(4), M), scale(q2(3), xM)), yM, q2(-1)), scale(q2(6), U));
const N1a = add(add(add(scale(q2(8), M), xM), scale(q2(-3), yM)), scale(q2(-6), U));
const N1d = add(add(add(scale(q2(8), M), scale(q2(-3), xM)), yM), scale(q2(-6), U));
const off = add(add(scale(q2(-1), xM), scale(q2(-1), yM)), scale(q2(2), U));
const Ndet = add(add(mul(N1a, N1d), scale(q2(-9), pow(off, 2))), scale(q2(-144), pow(V, 2)));

const cases = [
  ['p0a', Np0a, 8, 8, [[8, 7], [8, 8]]],
  ['p0d', Np0d, 8, 8, [[7, 8], [8, 8]]],
  ['1-p0a', N1a, 8, 8, []],
  ['1-p0d', N1d, 8, 8, []],
  ['detP1', Ndet, 16, 16, [[16, 16]]],
].map(([name, polynomial, m, n, expectedZeros]) => {
  const coefficients = bernstein(polynomial, m, n);
  const zeros = [];
  let minimumPositive = Infinity;
  for (let i = 0; i <= m; i++) for (let j = 0; j <= n; j++) {
    const value = coefficients[i][j], sign = qsign(value);
    assert.ok(sign >= 0, `${name} has negative exact Bernstein coefficient (${i},${j})`);
    if (sign === 0) zeros.push([i, j]);
    else minimumPositive = Math.min(minimumPositive, qnum(value));
  }
  assert.deepEqual(zeros, expectedZeros);
  return { name, bidegree: [m, n], count: (m + 1) * (n + 1), exactNonnegative: true, zeroIndices: zeros, minimumPositiveApproximation: minimumPositive };
});

console.log(JSON.stringify({
  protocol: 'global-passive-silver-loss-c3-povm-exact-bernstein-certificate/2',
  coefficientField: 'Q(sqrt(2)), represented by exact BigInt rational pairs',
  domain: 'p=exp(-ell_n), q=exp(-ell_t) in [0,1]',
  cases,
  conclusion: 'All three C3 barycentric effects are positive semidefinite on the full passive loss quadrant and positive definite away from the lossless corner.',
  passed: true,
}, null, 2));
