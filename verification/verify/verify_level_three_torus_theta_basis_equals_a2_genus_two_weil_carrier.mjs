import assert from "node:assert/strict";

const p = 3;
const omega = { re: -0.5, im: Math.sqrt(3) / 2 };
const zero = () => ({ re: 0, im: 0 });
const one = { re: 1, im: 0 };
const add = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const conj = (a) => ({ re: a.re, im: -a.im });
const scale = (a, s) => ({ re: a.re * s, im: a.im * s });
const pow = (a, n) => {
  let out = one;
  for (let k = 0; k < ((n % p) + p) % p; k += 1) out = mul(out, a);
  return out;
};
const close = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const mod = (x) => ((x % p) + p) % p;
const labels = Array.from({ length: 9 }, (_, n) => [n % 3, Math.floor(n / 3)]);
const index = (q) => mod(q[0]) + 3 * mod(q[1]);

const matrix = () => Array.from({ length: 9 }, () => Array.from({ length: 9 }, zero));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), zero())));
const equalMatrix = (A, B) => A.every((row, i) => row.every((x, j) => close(x, B[i][j])));
const identity = matrix();
for (let i = 0; i < 9; i += 1) identity[i][i] = one;

const X = (a) => {
  const M = matrix();
  for (const q of labels) M[index([q[0] + a[0], q[1] + a[1]])][index(q)] = one;
  return M;
};
const Z = (b) => {
  const M = matrix();
  for (const q of labels) M[index(q)][index(q)] = pow(omega, b[0] * q[0] + b[1] * q[1]);
  return M;
};
const Fhandle = (handle) => {
  const M = matrix();
  for (const x of labels) for (const y of labels) {
    const other = 1 - handle;
    if (x[other] !== y[other]) continue;
    M[index(x)][index(y)] = scale(pow(omega, x[handle] * y[handle]), 1 / Math.sqrt(3));
  }
  return M;
};
const qform = (K, q) => mod(2 * (q[0] * (K[0][0] * q[0] + K[0][1] * q[1]) + q[1] * (K[1][0] * q[0] + K[1][1] * q[1])));
const twist = (K) => {
  const M = matrix();
  for (const q of labels) M[index(q)][index(q)] = pow(omega, qform(K, q));
  return M;
};

const e1 = [1, 0], e2 = [0, 1];
const X1 = X(e1), X2 = X(e2), Z1 = Z(e1), Z2 = Z(e2);
const F1 = Fhandle(0), F2 = Fhandle(1);
for (const U of [X1, X2, Z1, Z2, F1, F2]) assert.ok(equalMatrix(mm(U, dagger(U)), identity));
assert.ok(equalMatrix(mm(mm(F1, X1), dagger(F1)), Z1));
assert.ok(equalMatrix(mm(mm(F2, X2), dagger(F2)), Z2));
assert.ok(equalMatrix(mm(mm(F1, Z1), dagger(F1)), X([-1, 0])));
assert.ok(equalMatrix(mm(mm(F2, Z2), dagger(F2)), X([0, -1])));

const K1 = [[2, 0], [0, 0]];
const K2 = [[0, 0], [0, 2]];
const K12 = [[2, 2], [2, 2]];
const Kcross = [[0, 2], [2, 0]];
const T1 = twist(K1), T2 = twist(K2), T12 = twist(K12), Tcross = twist(Kcross);

for (const q of labels) {
  const [a, b] = q;
  assert.equal(qform(K1, q), mod(a * a));
  assert.equal(qform(K2, q), mod(b * b));
  assert.equal(qform(K12, q), mod((a + b) ** 2));
  assert.equal(qform(Kcross, q), mod(2 * a * b));
}
assert.ok(equalMatrix(mm(mm(T12, dagger(T1)), dagger(T2)), Tcross));

for (const K of [K1, K2, K12, Kcross]) for (const q of labels) for (const a of labels) {
  const qa = [q[0] + a[0], q[1] + a[1]];
  const polarized = mod(qform(K, qa) - qform(K, q) - qform(K, a));
  const expected = mod(q[0] * (K[0][0] * a[0] + K[0][1] * a[1]) + q[1] * (K[1][0] * a[0] + K[1][1] * a[1]));
  assert.equal(polarized, expected);
}

console.log(JSON.stringify({
  protocol: "level-three-torus-theta-equals-a2-genus-two-weil/1",
  level: 3,
  degreesOfFreedom: 2,
  thetaBasisLabels: labels,
  dimension: labels.length,
  finiteHeisenbergExponentModule: "F3^4",
  verified: {
    twoWeylPairsUnitary: true,
    handleFouriersUnitary: true,
    fourierConjugation: ["F_i X_i F_i^-1 = Z_i", "F_i Z_i F_i^-1 = X_i^-1"],
    selfTwistExponents: ["a^2", "b^2"],
    sumCycleTwistExponent: "(a+b)^2",
    mutualTwistExponent: "2ab",
    sumMinusSelfEqualsMutual: true,
    quadraticPolarizationCheckedForAllLabels: true
  },
  conclusion: "After identifying the polarized F3^4 modules, level-three Abelian-surface theta quantization and the genus-two A2 discriminant construction are the same nine-state finite Heisenberg/Weil representation. The physical derivation of compactness and level three remains separate."
}, null, 2));

