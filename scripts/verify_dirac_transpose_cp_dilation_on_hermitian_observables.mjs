import assert from "node:assert/strict";

const n = 8;
const N = 2 * n;
const zero = (r, c = r) => Array.from({ length: r }, () => Array.from({ length: c }, () => ({ re: 0, im: 0 })));
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const conjugate = (A) => A.map((row) => row.map(conj));
const matmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const plus = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const times = (A, s) => A.map((row) => row.map((x) => scale(x, s)));
const near = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const equalM = (A, B) => A.every((row, i) => row.every((x, j) => near(x, B[i][j])));
const identity = (m) => {
  const I = zero(m);
  for (let i = 0; i < m; i += 1) I[i][i] = C(1);
  return I;
};
const unit = (m, i, j) => {
  const E = zero(m);
  E[i][j] = C(1);
  return E;
};
const blockDiag = (A, B) => {
  const O = zero(A.length + B.length);
  for (let i = 0; i < A.length; i += 1) for (let j = 0; j < A.length; j += 1) O[i][j] = A[i][j];
  for (let i = 0; i < B.length; i += 1) for (let j = 0; j < B.length; j += 1) O[A.length + i][A.length + j] = B[i][j];
  return O;
};
const block = (O, bi, bj) => O.slice(bi * n, (bi + 1) * n).map((row) => row.slice(bj * n, (bj + 1) * n));

// Carrier order: O2_1,O2_2,O2_3,H4,H5,C,D,E.
// p fixes the colour carrier and E, and swaps H4<->D and H5<->C.
const p = [0, 1, 2, 6, 5, 4, 3, 7];
const P = zero(n);
for (let i = 0; i < n; i += 1) P[p[i]][i] = C(1);
assert(equalM(matmul(P, P), identity(n)));

const theta = (A) => matmul(matmul(P, transpose(A)), P); // linear Dirac/TRO face exchange
const rho = (A) => matmul(matmul(P, conjugate(A)), P);   // anti-linear real structure

// The maps differ on oriented matrix units.
const E_H4_E = unit(n, 3, 7);
assert(!equalM(theta(E_H4_E), rho(E_H4_E)));
assert(equalM(theta(E_H4_E), unit(n, 7, 6))); // H4->E maps to E->D

// They coincide on Hermitian observables because A^T=bar(A).
let H = zero(n);
for (let i = 0; i < n; i += 1) H[i][i] = C(i + 1);
H[3][7] = C(2, 3); H[7][3] = C(2, -3);
H[4][5] = C(-1, 4); H[5][4] = C(-1, -4);
assert(equalM(H, dagger(H)));
assert(equalM(theta(H), rho(H)));
assert(equalM(theta(theta(H)), H));

// Local transpose-twist is positive but not completely positive.
// Its Choi matrix is (I tensor P) F (I tensor P), so a transported
// antisymmetric vector has expectation -1.
const F = zero(n * n);
for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) F[i * n + j][j * n + i] = C(1);
const IP = zero(n * n);
for (let a = 0; a < n; a += 1) for (let i = 0; i < n; i += 1) IP[a * n + p[i]][a * n + i] = C(1);
const choiTheta = matmul(matmul(IP, F), IP);
const anti = Array.from({ length: n * n }, () => C(0));
anti[0 * n + 1] = C(1 / Math.sqrt(2));
anti[1 * n + 0] = C(-1 / Math.sqrt(2));
const witness = Array.from({ length: n * n }, (_, i) => Array.from({ length: 1 }, () => anti[i]));
const transported = matmul(IP, witness);
const expectation = matmul(matmul(dagger(transported), choiTheta), transported)[0][0];
assert(Math.abs(expectation.re + 1) < 1e-10 && Math.abs(expectation.im) < 1e-10);

// The doubled topology twirl is CP and TP.
const I2n = identity(N);
const S = zero(N);
for (let i = 0; i < n; i += 1) {
  S[i][n + i] = C(1);
  S[n + i][i] = C(1);
}
assert(equalM(matmul(S, S), I2n));
const twirl = (O) => times(plus(O, matmul(matmul(S, O), S)), 0.5);
const encoded = blockDiag(H, theta(H));
const selected = twirl(encoded);
const R = times(plus(H, theta(H)), 0.5);
assert(equalM(selected, blockDiag(R, R)));
assert(equalM(theta(R), R));

// Arbitrary doubled inputs do not land in the theta-fixed carrier.
const arbitraryA = H;
const arbitraryB = plus(H, unit(n, 0, 0));
const arbitrarySelected = twirl(blockDiag(arbitraryA, arbitraryB));
assert(equalM(block(arbitrarySelected, 0, 0), times(plus(arbitraryA, arbitraryB), 0.5)));
assert(!equalM(theta(block(arbitrarySelected, 0, 0)), block(arbitrarySelected, 0, 0)));

console.log(JSON.stringify({
  protocol: "dirac-transpose-cp-dilation-on-hermitian-observables/1",
  supportMap: "theta(X)=P X^T P",
  antiLinearRealStructure: "rho(X)=P conjugate(X) P",
  orientedArrows: "theta and rho differ",
  hermitianObservables: "theta(H)=rho(H)",
  localCompletePositivity: false,
  choiAntisymmetricWitness: expectation.re,
  doubledTwirl: "CP, TP, unital and idempotent",
  encodedAction: "diag(H,theta(H)) -> diag((H+theta(H))/2,(H+theta(H))/2)",
  remainingBoundary: "theta-paired input is structural; arbitrary doubled inputs have a larger exchange-fixed range",
  passed: true
}, null, 2));
