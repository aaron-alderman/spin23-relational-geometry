const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const addM = (a, b) => a.map((row, i) => row.map((x, j) => addC(x, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((x) => scaleC(s, x)));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => addC(sum, mulC(x, b[k][j])), C(0))));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjC(row[j])));
const equalM = (a, b, tolerance = 1e-9) => a.every((row, i) => row.every((x, j) =>
  Math.abs(x.re - b[i][j].re) < tolerance && Math.abs(x.im - b[i][j].im) < tolerance));

const inverse = (input) => {
  const n = input.length;
  const a = input.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0))]);
  for (let k = 0; k < n; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < n; i += 1) {
      const ai = a[i][k].re ** 2 + a[i][k].im ** 2;
      const ap = a[pivot][k].re ** 2 + a[pivot][k].im ** 2;
      if (ai > ap) pivot = i;
    }
    [a[k], a[pivot]] = [a[pivot], a[k]];
    const p = a[k][k];
    const pinv = scaleC(1 / (p.re ** 2 + p.im ** 2), conjC(p));
    for (let j = 0; j < 2 * n; j += 1) a[k][j] = mulC(pinv, a[k][j]);
    for (let i = 0; i < n; i += 1) if (i !== k) {
      const factor = a[i][k];
      for (let j = 0; j < 2 * n; j += 1) a[i][j] = addC(a[i][j], scaleC(-1, mulC(factor, a[k][j])));
    }
  }
  return a.map((row) => row.slice(n));
};

const A = [[C(4), C(1, -0.6)], [C(1, 0.6), C(5)]];
const B = [[C(0.8, -0.3)], [C(-0.4, 0.9)]];
const d = 3;
const K = [
  [A[0][0], A[0][1], B[0][0]],
  [A[1][0], A[1][1], B[1][0]],
  [conjC(B[0][0]), conjC(B[1][0]), C(d)],
];
const correction = B.map((rowI) => B.map((rowJ) => scaleC(1 / d, mulC(rowI[0], conjC(rowJ[0])))));
const Keff = addM(A, scaleM(-1, correction));
const expectedOffDiagonal = addC(A[0][1], scaleC(-1 / d, mulC(B[0][0], conjC(B[1][0]))));
assert(Math.abs(Keff[0][1].re - expectedOffDiagonal.re) < 1e-10
  && Math.abs(Keff[0][1].im - expectedOffDiagonal.im) < 1e-10,
"kernel Schur elimination must produce the direct-minus-indirect edge");

const G = inverse(K);
const Gxx = G.slice(0, 2).map((row) => row.slice(0, 2));
assert(equalM(inverse(Gxx), Keff), "upper correlator block inverse must equal the effective kernel");

const Gxy = G.slice(0, 2).map((row) => [row[2]]);
const Gyx = [G[2].slice(0, 2)];
const GyyInv = inverse([[G[2][2]]]);
const covarianceSchur = addM(Gxx, scaleM(-1, mulM(mulM(Gxy, GyyInv), Gyx)));
assert(equalM(covarianceSchur, inverse(A)),
  "Schur complement of the correlator must return the inverse bare retained block, not Keff");

// Verify Im(G^-1)=-G^{-dagger} Im(G) G^-1 for one invertible Herglotz matrix.
const H = [[C(2, 1.2), C(0.3, 0.1)], [C(0.3, 0.1), C(1.7, 0.9)]];
const Hinv = inverse(H);
const imagMatrix = (m) => scaleM(1 / (2), addM(m, scaleM(-1, dagger(m)))).map((row) =>
  row.map((z) => C(z.im, -z.re))); // (M-M^dagger)/(2i)
const imH = imagMatrix(H);
const imHinv = imagMatrix(Hinv);
const rhs = scaleM(-1, mulM(mulM(dagger(Hinv), imH), Hinv));
assert(equalM(imHinv, rhs), "inverse Herglotz imaginary part identity must hold exactly");

console.log("Kernel versus correlator Schur elimination: PASS");
console.log("quadratic_kernel_effective=Schur(K)");
console.log("correlator_retained_block_inverse=K_effective");
console.log("Schur(correlator)=inverse(bare_retained_kernel)");
console.log("inverse_Herglotz_imaginary_part=negative");
console.log("direct_response_to_Pin_delta_requires_object_category_and_normalization");
