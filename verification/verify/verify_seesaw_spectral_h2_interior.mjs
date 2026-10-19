import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-11) => Math.abs(a - b) < eps;
const mul2 = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const add2 = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
const trace2 = A => A[0][0] + A[1][1];

const mD = 3, MR = 40;
const disc = Math.sqrt(MR * MR + 4 * mD * mD);
const ml = (disc - MR) / 2;
const mh = (disc + MR) / 2;
const cos2theta = MR / disc;
const w = (1 + cos2theta) / 2;
assert(w > 0 && w < 1);

const k = 2;
const projector = m => {
  const omega = Math.sqrt(k * k + m * m);
  return {
    omega,
    n: [m / omega, 0, k / omega],
    P: [[(1 + k / omega) / 2, m / (2 * omega)], [m / (2 * omega), (1 - k / omega) / 2]],
  };
};
const L = projector(ml), H = projector(mh);
for (const X of [L, H]) {
  assert(close(trace2(X.P), 1));
  assert(close(det2(X.P), 0));
  const P2 = mul2(X.P, X.P);
  assert(P2.every((row, i) => row.every((x, j) => close(x, X.P[i][j]))));
}

const R = add2(L.P, H.P, w, 1 - w);
const dot = L.n.reduce((s, x, i) => s + x * H.n[i], 0);
const expectedDet = w * (1 - w) * (1 - dot) / 2;
assert(close(det2(R), expectedDet));
assert(det2(R) > 0);
assert(R[0][0] > 0 && trace2(R) > 0);

// Positive Euclidean multi-time Gram kernel: direct quadratic-form sampling.
const times = [0.2, 0.7, 1.3];
const K = Array.from({ length: 6 }, () => Array(6).fill(0));
for (let a = 0; a < times.length; a++) for (let b = 0; b < times.length; b++) {
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    K[2 * a + i][2 * b + j] =
      w * Math.exp(-L.omega * (times[a] + times[b])) * L.P[i][j]
      + (1 - w) * Math.exp(-H.omega * (times[a] + times[b])) * H.P[i][j];
  }
}
for (let sample = 0; sample < 20; sample++) {
  const v = Array.from({ length: 6 }, (_, i) => Math.sin((sample + 1) * (i + 1)));
  const q = v.reduce((s, x, i) => s + x * K[i].reduce((t, y, j) => t + y * v[j], 0), 0);
  assert(q > -1e-10);
}

console.log('Seesaw spectral H2(R)-interior certificate: PASS');
console.log(`weight=${w}, det=${det2(R)}, light=${ml}, heavy=${mh}`);

