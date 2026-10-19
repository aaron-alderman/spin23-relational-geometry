import assert from "node:assert/strict";

const eps = 1e-11;
const close = (a, b, tolerance = eps) => assert(Math.abs(a - b) < tolerance, `${a} != ${b}`);
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const trace = (A) => A.reduce((s, row, i) => add(s, row[i]), C(0));
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

const I = [[C(1), C(0)], [C(0), C(1)]];
const sx = [[C(0), C(1)], [C(1), C(0)]];
const sy = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const sz = [[C(1), C(0)], [C(0), C(-1)]];
const rho = (r) => I.map((row, i) => row.map((x, j) => {
  let y = x;
  for (const [coefficient, sigma] of [[r[0], sx], [r[1], sy], [r[2], sz]]) y = add(y, C(coefficient * sigma[i][j].re, coefficient * sigma[i][j].im));
  return C(y.re / 2, y.im / 2);
}));

const r1 = [0.31, -0.22, 0.41];
const r2 = [-0.17, 0.38, 0.29];
const r3 = [0.27, 0.19, -0.33];
const tau = dot(r1, cross(r2, r3));
const bargmann3 = trace(mm(mm(rho(r1), rho(r2)), rho(r3)));
close(4 * bargmann3.im, tau);

// Complex conjugation reflects the Bloch y-coordinate and reverses chirality.
const reflectK = ([x, y, z]) => [x, -y, z];
const reflected = trace(mm(mm(rho(reflectK(r1)), rho(reflectK(r2))), rho(reflectK(r3))));
close(reflected.im, -bargmann3.im);

// Real 2x2 response matrices transform by simultaneous GL2 congruence.  Their
// commutator magnitude is invariant, but the sign of its skew coefficient is
// reversed by an allowed reflection.
const mreal = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const trReal = (A) => A[0][0] + A[1][1];
const subReal = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const inv2 = (A) => {
  const d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const congruence = (M, A) => mreal(mreal(M, A), transpose(M));
const R0 = [[1, 0], [0, 1]];
const R1 = [[3, 0], [0, 1]];
const R2 = [[2, 0.4], [0.4, 1.5]];
const relativeCommutator = (A0, A1, A2) => {
  const X = mreal(inv2(A0), A1), Y = mreal(inv2(A0), A2);
  return subReal(mreal(X, Y), mreal(Y, X));
};
const invariantMagnitude = (K) => -0.5 * trReal(mreal(K, K));
const K = relativeCommutator(R0, R1, R2);
assert(K[0][1] > 0);

const H = [[1, 0], [0, -1]];
const [S0, S1, S2] = [R0, R1, R2].map((A) => congruence(H, A));
const KH = relativeCommutator(S0, S1, S2);
close(KH[0][1], -K[0][1]);
close(invariantMagnitude(KH), invariantMagnitude(K));

const M = [[1.4, 0.3], [-0.2, 0.9]];
const [T0, T1, T2] = [R0, R1, R2].map((A) => congruence(M, A));
const KM = relativeCommutator(T0, T1, T2);
close(invariantMagnitude(KM), invariantMagnitude(K), 1e-9);

console.log("PASS Bargmann-orientation/calibration boundary");
console.log(`tau=${tau}; 4ImTr(rho1rho2rho3)=${4 * bargmann3.im}`);
console.log("qubit_unitary_orientation_invariant=true; antiunitary_reflection_flips=true");
console.log(`response_commutator_magnitude=${invariantMagnitude(K)}; GL2_invariant=true`);
console.log("response_commutator_sign_GL2_invariant=false");
console.log("qubit_Bargmann_orientation_does_not_close_response_calibration_bridge=true");
