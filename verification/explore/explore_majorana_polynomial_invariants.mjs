const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => z(a.re, -a.im);
const mulM = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const star = A => A.map(row => row.map(conj));
const trace = A => A.reduce((s, row, i) => add(s, row[i]), z(0));
const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => z(i === j ? 1 : 0)));
const diag = xs => xs.map((x, i) => xs.map((_, j) => z(i === j ? x : 0)));
const diagC = xs => xs.map((x, i) => xs.map((_, j) => i === j ? x : z(0)));
const power = (A, n) => {
  let out = I(A.length);
  for (let i = 0; i < n; i++) out = mulM(out, A);
  return out;
};

const H = diag([0.3, 1.7, 4.2]);
const M = [
  [z(0.7, 0.2), z(-0.1, 0.5), z(0.3, -0.4)],
  [z(-0.1, 0.5), z(1.1, -0.6), z(0.2, 0.7)],
  [z(0.3, -0.4), z(0.2, 0.7), z(0.9, 0.1)],
];
const Md = dagger(M);
const invariant = (p, q, r, s) => trace(
  [power(star(H), p), M, power(H, q), Md, power(star(H), r), M, power(H, s), Md]
    .reduce((A, B) => mulM(A, B)),
).im;

const rows = [];
for (let total = 0; total <= 6; total++) {
  for (let p = 0; p <= total; p++) for (let q = 0; q <= total - p; q++) {
    for (let r = 0; r <= total - p - q; r++) {
      const s = total - p - q - r;
      const value = invariant(p, q, r, s);
      if (Math.abs(value) > 1e-9) rows.push({ total, exponents: [p, q, r, s], value });
    }
  }
  if (rows.length) break;
}
console.log(JSON.stringify({ firstNonzeroDegree: rows[0]?.total ?? null, candidates: rows }, null, 2));

// A real mixing matrix with one Majorana phase: M=R diag(m_i e^{-i alpha_i}) R^T.
const theta = 0.63;
const R = [
  [z(Math.cos(theta)), z(Math.sin(theta)), z(0)],
  [z(-Math.sin(theta)), z(Math.cos(theta)), z(0)],
  [z(0), z(0), z(1)],
];
const RT = R[0].map((_, i) => R.map(row => row[i]));
const phaseMass = alpha => diagC([0.4, 1.3, 2.1].map((m, i) => i === 1 ? mul(z(m), z(Math.cos(-alpha), Math.sin(-alpha))) : z(m)));
for (const alpha of [0, 0.4, 1.0]) {
  const Mp = mulM(mulM(R, phaseMass(alpha)), RT);
  const Mpd = dagger(Mp);
  const J = trace([star(H), Mp, H, Mpd, Mp, Mpd].reduce((A, B) => mulM(A, B))).im;
  console.log(`majorana_phase=${alpha}; J=${J}`);
}
