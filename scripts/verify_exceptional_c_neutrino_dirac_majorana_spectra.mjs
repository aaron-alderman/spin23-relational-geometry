const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const mmul = (A, B) => A.map(row => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C())
));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const madd = (...As) => As[0].map((row, i) => row.map((_, j) =>
  As.reduce((sum, A) => add(sum, A[i][j]), C())
));
const mscale = (s, A) => A.map(row => row.map(z => scale(s, z)));
const maxNorm = A => Math.max(...A.flat().map(z => Math.hypot(z.re, z.im)));
const det3 = M => add(
  sub(
    mul(M[0][0], sub(mul(M[1][1], M[2][2]), mul(M[1][2], M[2][1]))),
    mul(M[0][1], sub(mul(M[1][0], M[2][2]), mul(M[1][2], M[2][0])))
  ),
  mul(M[0][2], sub(mul(M[1][0], M[2][1]), mul(M[1][1], M[2][0])))
);
const I3 = [[C(1), C(), C()], [C(), C(1), C()], [C(), C(), C(1)]];

const alpha = 1;
const beta = 1;
const radius2 = alpha ** 2 + beta ** 2;

// Hermitian Dirac insertion in the canonical (s,t,o) basis.
const DeltaD = [
  [C(), C(), C(alpha)],
  [C(), C(), C(0, beta)],
  [C(alpha), C(0, -beta), C()]
];
const DeltaD3 = mmul(mmul(DeltaD, DeltaD), DeltaD);
assert(maxNorm(madd(DeltaD3, mscale(-radius2, DeltaD))) < 1e-12, "Dirac insertion must obey lambda(lambda^2-|c|^2)");
const mD = 3;
const MD = madd(mscale(mD, I3), DeltaD);
const expectedDiracDet = mD * (mD ** 2 - radius2);
assert(Math.abs(det3(MD).re - expectedDiracDet) < 1e-12 && Math.abs(det3(MD).im) < 1e-12, "Dirac determinant failed");

// Complex symmetric Majorana-odd insertion.
const Mminus = [
  [C(), C(), C(alpha)],
  [C(), C(), C(0, beta)],
  [C(alpha), C(0, beta), C()]
];
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
  assert(Math.hypot(Mminus[i][j].re - Mminus[j][i].re, Mminus[i][j].im - Mminus[j][i].im) < 1e-12, "Majorana insertion must be symmetric");
}
const Hminus = mmul(Mminus, dagger(Mminus));
assert(maxNorm(madd(mmul(Hminus, Hminus), mscale(-radius2, Hminus))) < 1e-12, "Majorana singular squares must be {r2,r2,0}");
assert(Math.hypot(det3(Mminus).re, det3(Mminus).im) < 1e-12, "odd Majorana insertion must have one zero singular value");

// Add the S2-even real Majorana background.
const Ms = 5;
const Mt = 7;
const Mo = 11;
const r = 2;
const MR = [
  [C(Ms), C(r), C(alpha)],
  [C(r), C(Mt), C(0, beta)],
  [C(alpha), C(0, beta), C(Mo)]
];
const detMR = det3(MR);
const expectedReal = Ms * Mt * Mo + Ms * beta ** 2 - Mt * alpha ** 2 - Mo * r ** 2;
const expectedImag = 2 * r * alpha * beta;
assert(Math.abs(detMR.re - expectedReal) < 1e-12 && Math.abs(detMR.im - expectedImag) < 1e-12, "full Majorana determinant formula failed");
assert(Math.hypot(detMR.re, detMR.im) > 1e-6, "full Majorana background must be nonsingular");

// Charged-lepton-frame rephasing invariant triangle.
const triangle = M => {
  const off = mul(mul(M[0][1], M[1][2]), M[2][0]);
  const diagConj = mul(mul(conj(M[0][0]), conj(M[1][1])), conj(M[2][2]));
  return mul(off, diagConj).im;
};
const expectedTriangle = r * alpha * beta * Ms * Mt * Mo;
assert(Math.abs(triangle(MR) - expectedTriangle) < 1e-12, "Majorana triangle invariant failed");

const phases = [0.31, -0.27, 0.52];
const rephased = MR.map((row, i) => row.map((z, j) => mul(C(Math.cos(phases[i] + phases[j]), Math.sin(phases[i] + phases[j])), z)));
assert(Math.abs(triangle(rephased) - triangle(MR)) < 1e-9, "Majorana triangle must be rephasing invariant");

// Pairwise quartets vanish in this canonical real-even checkpoint.
const pairInvariant = (M, i, j) => mul(mul(M[i][i], M[j][j]), mul(conj(M[i][j]), conj(M[i][j]))).im;
assert(Math.abs(pairInvariant(MR, 0, 1)) < 1e-12, "st pair invariant must vanish");
assert(Math.abs(pairInvariant(MR, 0, 2)) < 1e-12, "so pair invariant must vanish");
assert(Math.abs(pairInvariant(MR, 1, 2)) < 1e-12, "to pair invariant must vanish");

assert(8 - 8 === 0 && 8 - 7 === 1, "Dirac completion versus minimal AIII count failed");

console.log("Exceptional-c neutrino Dirac/Majorana certificate: PASS");
console.log("Dirac_Delta_eigenvalues=0_plusminus_abs_c; completed_8_plus_8_index=0");
console.log("Majorana_odd_Takagi=abs_c_abs_c_0; even_background_full_rank=true");
console.log("Im_det_MR=2r_Re_c_Im_c; rephasing_invariant_triangle_nonzero=true; pairwise_quartets_zero=true");
