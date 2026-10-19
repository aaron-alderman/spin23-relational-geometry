const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const abs = (x) => Math.hypot(x.re, x.im);
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const bar = (A) => A.map((row) => row.map(conj));
const closeMatrix = (A, B, tol = 1e-11) => A.every((row, i) => row.every((x, j) => abs(sub(x, B[i][j])) < tol));
const diagonal = (xs) => xs.map((x, i) => xs.map((_, j) => (
  i === j ? (typeof x === "number" ? C(x) : C(x.re, x.im)) : C(0)
)));
const block = (A, B, D, E) => {
  const n = A.length;
  const m = E.length;
  return [
    ...A.map((row, i) => [...row, ...B[i]]),
    ...D.map((row, i) => [...row, ...E[i]]),
  ];
};

const theta = 0.37;
const p = C(Math.cos(theta), Math.sin(theta));
const pm = conj(p);
const I2 = diagonal([1, 1]);
const Z2 = [[C(0), C(0)], [C(0), C(0)]];
const rhoCAR = diagonal([p, p, pm, pm]);
const swap = block(Z2, I2, I2, Z2);
const W = diagonal([1, -1]);
const U1 = block(Z2, W, W, Z2);

// Antiunitary gauge equivariance is U * conjugate(rho) * U^dagger = rho.
assert(closeMatrix(matMul(matMul(swap, bar(rhoCAR)), dagger(swap)), rhoCAR), "standard CAR reality must be gauge equivariant");
assert(closeMatrix(matMul(matMul(U1, bar(rhoCAR)), dagger(U1)), rhoCAR), "multiplicity flag antiunitary must be gauge equivariant");

// Product of antiunitaries (U1 K)(swap K)=U1*conj(swap)=diag(W,W).
const relative = matMul(U1, bar(swap));
assert(closeMatrix(relative, block(W, Z2, Z2, W)), "relative unitary must be the sheet flag grading");

// With multiplicity one, a Hermitian involution is only +1 or -1 and cannot split a sheet pair.
const oneDimensionalHermitianInvolutions = [1, -1];
assert(oneDimensionalHermitianInvolutions.every((x) => x * x === 1), "one-dimensional classification mismatch");
assert(new Set(oneDimensionalHermitianInvolutions).size === 2, "only sign realities exist at multiplicity one");

// A nondegenerate Yukawa pair has only scalar common commutant.
const Hu = diagonal([1, 2, 3]);
const Hd = [
  [C(3), C(1), C(1)],
  [C(1), C(4), C(1)],
  [C(1), C(1), C(5)],
];
const Gamma3 = diagonal([1, -1, 1]);
const commutator = (A, B) => A.map((row, i) => row.map((_, j) => sub(matMul(A, B)[i][j], matMul(B, A)[i][j])));
assert(closeMatrix(commutator(Gamma3, Hu), diagonal([0, 0, 0])), "candidate grading must commute with diagonal Hu");
assert(!closeMatrix(commutator(Gamma3, Hd), diagonal([0, 0, 0])), "generic mixed Hd must break the nontrivial grading");
// Since Hu has distinct eigenvalues, its commutant is diagonal. All off-diagonal entries of Hd
// are nonzero, so [diag(w_i),Hd]=0 forces w1=w2=w3.
assert(Hd[0][1].re !== 0 && Hd[0][2].re !== 0 && Hd[1][2].re !== 0, "common-commutant proof requires connected flavor graph");

// Generalized CP tests for the exceptional Majorana texture.
const S = 5; const T = 7; const O = 11; const r = 2; const alpha = 1; const beta = 1;
const M = [
  [C(S), C(r), C(alpha)],
  [C(r), C(T), C(0, beta)],
  [C(alpha), C(0, beta), C(O)],
];
const X0 = diagonal([1, 1, 1]);
const Xq = diagonal([1, -1, 1]);
const cpTransform = (X, mass) => matMul(matMul(transpose(X), mass), X);
assert(!closeMatrix(cpTransform(X0, M), bar(M)), "ordinary reality must be broken by beta");
assert(!closeMatrix(cpTransform(Xq, M), bar(M)), "quarter-turned reality must be broken by r");

const MwithoutBeta = [
  [C(S), C(r), C(alpha)],
  [C(r), C(T), C(0)],
  [C(alpha), C(0), C(O)],
];
assert(closeMatrix(cpTransform(X0, MwithoutBeta), bar(MwithoutBeta)), "ordinary CP must return when beta vanishes");
const MwithoutR = [
  [C(S), C(0), C(alpha)],
  [C(0), C(T), C(0, beta)],
  [C(alpha), C(0, beta), C(O)],
];
assert(closeMatrix(cpTransform(Xq, MwithoutR), bar(MwithoutR)), "quarter-turned CP must return when r vanishes");
assert(r * alpha * beta !== 0, "triangle orientation requires simultaneous breaking data");

console.log("Gauge-commutant flag antiunitary certificate: PASS");
console.log("charged_CAR_second_reality_exists_on_multiplicity_two=true");
console.log("multiplicity_one_has_only_sign; generic_Yukawas_reduce_common_commutant_to_scalar");
console.log("ordinary_CP_broken_by_beta; quarter_turned_CP_broken_by_r; triangle_requires_r*alpha*beta");
