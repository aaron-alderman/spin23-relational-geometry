const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const mmul = (A, B) => A.map(row => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C())
));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const dagger = A => transpose(A).map(row => row.map(conj));
const mconj = A => A.map(row => row.map(conj));
const trace = A => A.reduce((sum, row, i) => add(sum, row[i]), C());
const maxDiff = (a, b) => Math.hypot(a.re - b.re, a.im - b.im);

const projector = i => Array.from({ length: 3 }, (_, r) =>
  Array.from({ length: 3 }, (_, c) => C(r === i && c === i ? 1 : 0))
);

const Ms = 5;
const Mt = 7;
const Mo = 11;
const r = 2;
const alpha = 1;
const beta = 1;
const M = [
  [C(Ms), C(r), C(alpha)],
  [C(r), C(Mt), C(0, beta)],
  [C(alpha), C(0, beta), C(Mo)]
];
const P = [projector(0), projector(1), projector(2)];

function Qtriangle(Mass, projectors) {
  const X = projectors.map(Pi => mmul(mmul(mmul(mconj(Pi), Mass), Pi), dagger(Mass)));
  return trace(mmul(mmul(X[0], X[1]), X[2]));
}

const Q = Qtriangle(M, P);
const expected = C(0, -r * alpha * beta * Ms * Mt * Mo);
assert(maxDiff(Q, expected) < 1e-12, "charged-frame triangle reduction failed");
assert(Math.abs(-Q.im - 770) < 1e-12, "Majorana triangle orientation failed");

// Nontrivial unitary weak-basis transformation: normalized Fourier matrix.
const omega = C(-0.5, Math.sqrt(3) / 2);
const omega2 = mul(omega, omega);
const s = 1 / Math.sqrt(3);
const W = [
  [C(s), C(s), C(s)],
  [C(s), scale(s, omega), scale(s, omega2)],
  [C(s), scale(s, omega2), scale(s, omega)]
];
const unitaryCheck = mmul(dagger(W), W);
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
  assert(Math.hypot(unitaryCheck[i][j].re - (i === j ? 1 : 0), unitaryCheck[i][j].im) < 1e-12, "test basis change must be unitary");
}

// Convention: fields = W fields', hence M'=W^T M W and P'=W^dag P W.
const Mp = mmul(mmul(transpose(W), M), W);
const Pp = P.map(Pi => mmul(mmul(dagger(W), Pi), W));
const Qp = Qtriangle(Mp, Pp);
assert(maxDiff(Qp, Q) < 1e-9, "triangle trace must be weak-basis invariant");

// Pairwise projector traces remain real in this checkpoint.
function Qpair(Mass, projectors, i, j) {
  const Xi = mmul(mmul(mmul(mconj(projectors[i]), Mass), projectors[i]), dagger(Mass));
  const Xj = mmul(mmul(mmul(mconj(projectors[j]), Mass), projectors[j]), dagger(Mass));
  return trace(mmul(Xi, Xj));
}
for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) {
  assert(Math.abs(Qpair(M, P, i, j).im) < 1e-12, "pairwise invariant must remain blind in checkpoint");
}

console.log("Weak-basis Majorana-triangle certificate: PASS");
console.log("I_triangle=-Im_Tr_Xe_Xmu_Xtau=770; charged_frame_reduction=true");
console.log("nontrivial_Fourier_weak_basis_invariance=true");
console.log("all_pairwise_projector_invariants_zero_while_triangle_nonzero=true");
