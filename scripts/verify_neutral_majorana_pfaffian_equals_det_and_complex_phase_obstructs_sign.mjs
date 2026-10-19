const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const abs = (x) => Math.hypot(x.re, x.im);
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => mul(a, b)))));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const closeMatrix = (A, B, tol = 1e-10) => A.every((row, i) => row.every((x, j) => abs(sub(x, B[i][j])) < tol));
const matScale = (z, A) => A.map((row) => row.map((x) => mul(z, x)));
const pfaffian = (A) => {
  const n = A.length;
  if (n === 0) return C(1);
  let result = C(0);
  for (let j = 1; j < n; j += 1) {
    const minor = A.filter((_, r) => r !== 0 && r !== j).map((row) => row.filter((_, c) => c !== 0 && c !== j));
    result = add(result, scale(j % 2 === 1 ? 1 : -1, mul(A[0][j], pfaffian(minor))));
  }
  return result;
};
const det3 = (A) => add(
  sub(mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))), mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))),
  mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))),
);

const M = [
  [C(5), C(2), C(1)],
  [C(2), C(7), C(0, 1)],
  [C(1), C(0, 1), C(11)],
];
assert(closeMatrix(M, transpose(M)), "Majorana flavor matrix must be symmetric");
const epsilon = [[C(0), C(1)], [C(-1), C(0)]];
const Omega = kron(M, epsilon);
assert(closeMatrix(transpose(Omega), matScale(C(-1), Omega)), "Lorentz-contracted Majorana form must be antisymmetric");
const pfOmega = pfaffian(Omega);
const detM = det3(M);
assert(abs(sub(pfOmega, detM)) < 1e-9, "Pf(M tensor epsilon) must equal det(M)");
assert(Math.abs(detM.re - 339) < 1e-10 && Math.abs(detM.im - 4) < 1e-10, "exceptional determinant checkpoint mismatch");

const pfMinus = pfaffian(matScale(C(-1), Omega));
assert(abs(add(pfMinus, pfOmega)) < 1e-9, "odd-flavor mass reversal must reverse complex Pfaffian");

// Complex phase rotation connects Omega to -Omega without singularity.
for (let step = 0; step <= 20; step += 1) {
  const theta = Math.PI * step / 20;
  const pfRotated = pfaffian(matScale(phase(theta), Omega));
  assert(abs(pfRotated) > 1e-6, "complex phase path must remain nonsingular");
}

// Underlying-real alternating form Re(z^T Omega w).
// The ordinary complex-linear representation [[A,-B],[B,A]] is not
// antisymmetric when B != 0; the bilinear-form version is [[A,-B],[-B,-A]].
const n = Omega.length;
const realified = Array.from({ length: 2 * n }, (_, i) => Array.from({ length: 2 * n }, (_, j) => {
  const blockRow = i < n ? 0 : 1;
  const blockCol = j < n ? 0 : 1;
  const x = Omega[i % n][j % n];
  if (blockRow === 0 && blockCol === 0) return C(x.re);
  if (blockRow === 0 && blockCol === 1) return C(-x.im);
  if (blockRow === 1 && blockCol === 0) return C(-x.im);
  return C(-x.re);
}));
assert(closeMatrix(transpose(realified), matScale(C(-1), realified)), "realified complex antisymmetric form must remain real antisymmetric");
const pfRealified = pfaffian(realified);
assert(Math.abs(Math.abs(pfRealified.re) - (detM.re * detM.re + detM.im * detM.im)) < 1e-5, "realified Pfaffian magnitude must square the complex Pfaffian magnitude");
const pfRealifiedMinus = pfaffian(matScale(C(-1), realified));
assert(abs(sub(pfRealifiedMinus, pfRealified)) < 1e-5, "twelve-dimensional realification must erase the odd complex-Pfaffian sign flip");

console.log("Neutral Majorana complex-Pfaffian reality-gate certificate: PASS");
console.log("Pf(M_tensor_epsilon)=det(M)=339+4i");
console.log("complex_mass_sign_reversal_is_connected_without_gap_closure=true");
console.log("underlying_real_alternating_Pfaffian=plus_or_minus_|detM|^2_and_does_not_flip=true");
