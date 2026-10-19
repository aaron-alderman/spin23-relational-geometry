import assert from "node:assert/strict";

const c = (re, im = 0) => ({ re, im });
const addc = (a, b) => c(a.re + b.re, a.im + b.im);
const mulc = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => c(a.re, -a.im);
const scalec = (x, a) => c(x * a.re, x * a.im);
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => addc(s, mulc(x, B[k][j])), c(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const madd = (A, B) => A.map((row, i) => row.map((z, j) => addc(z, B[i][j])));
const mscale = (x, A) => A.map((row) => row.map((z) => scalec(x, z)));
const msub = (A, B) => madd(A, mscale(-1, B));
const diagonal = (xs) => xs.map((x, i) => xs.map((_, j) => c(i === j ? x : 0)));
const diagonalComplex = (xs) => xs.map((x, i) => xs.map((_, j) => i === j ? x : c(0)));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const frobenius = (A) => Math.sqrt(A.flat().reduce((s, z) => s + z.re * z.re + z.im * z.im, 0));
const conjugateMatrix = (A) => A.map((row) => row.map(conj));

const diracMixing = (delta) => {
  const s12 = 0.55, c12 = Math.sqrt(1 - s12 * s12);
  const s23 = 0.66, c23 = Math.sqrt(1 - s23 * s23);
  const s13 = 0.15, c13 = Math.sqrt(1 - s13 * s13);
  const em = c(Math.cos(delta), -Math.sin(delta)), ep = conj(em);
  return [
    [c(c12 * c13), c(s12 * c13), scalec(s13, em)],
    [addc(c(-s12 * c23), scalec(-c12 * s23 * s13, ep)), addc(c(c12 * c23), scalec(-s12 * s23 * s13, ep)), c(s23 * c13)],
    [addc(c(s12 * s23), scalec(-c12 * c23 * s13, ep)), addc(c(-c12 * s23), scalec(-s12 * c23 * s13, ep)), c(c23 * c13)],
  ];
};
const phase = (x) => c(Math.cos(x), Math.sin(x));
const V = diracMixing(1.1);
const U = mmul(V, diagonalComplex([c(1), phase(0.7 / 2), phase(1.3 / 2)]));
const masses = [0.01, 0.02, 0.05];
const D = diagonal(masses);
const sqrtD = diagonal(masses.map(Math.sqrt));
const Ustar = conjugateMatrix(U);
const M = mmul(Ustar, mmul(D, dagger(U))); // complex symmetric Takagi spurion
assert(maxAbs(msub(M, transpose(M))) < 1e-12);

const P = mmul(U, mmul(D, dagger(U))); // |M|=(M^dagger M)^(1/2)
const Q = mmul(Ustar, mmul(D, transpose(U))); // (M M^dagger)^(1/2)
const Upolar = mmul(Ustar, dagger(U));
assert(maxAbs(msub(mmul(Upolar, P), M)) < 1e-12);
assert(maxAbs(msub(mmul(dagger(Upolar), Upolar), diagonal([1, 1, 1]))) < 1e-12);

const R = [
  [...Q[0], ...M[0]], [...Q[1], ...M[1]], [...Q[2], ...M[2]],
  [...dagger(M)[0], ...P[0]], [...dagger(M)[1], ...P[1]], [...dagger(M)[2], ...P[2]],
];
assert(maxAbs(msub(R, dagger(R))) < 1e-12);

const sqrtP = mmul(U, mmul(sqrtD, dagger(U)));
const topFactor = mmul(Upolar, sqrtP);
const factor = [...topFactor, ...sqrtP]; // 6x3 vertical stack
const reconstructed = mmul(factor, dagger(factor));
assert(maxAbs(msub(R, reconstructed)) < 1e-12);

const support = [
  ...[
    [...diagonal([1, 1, 1])[0], ...Upolar[0]],
    [...diagonal([1, 1, 1])[1], ...Upolar[1]],
    [...diagonal([1, 1, 1])[2], ...Upolar[2]],
    [...dagger(Upolar)[0], ...diagonal([1, 1, 1])[0]],
    [...dagger(Upolar)[1], ...diagonal([1, 1, 1])[1]],
    [...dagger(Upolar)[2], ...diagonal([1, 1, 1])[2]],
  ],
].map((row) => row.map((z) => scalec(0.5, z)));
assert(maxAbs(msub(mmul(support, support), support)) < 1e-12);
assert(maxAbs(msub(mmul(support, R), R)) < 1e-12);

// Removing Majorana phases changes the anomalous block and support.
const U0 = V;
const M0 = mmul(conjugateMatrix(U0), mmul(D, dagger(U0)));
assert(frobenius(msub(M, M0)) > 1e-3);

console.log(JSON.stringify({
  protocol: "minimal-positive-takagi-nambu-residue/1",
  takagiMass: "M=U^* D U^dagger, M^T=M",
  positiveNambuResidue: "R_M=[[(M M^dagger)^(1/2),M],[M^dagger,(M^dagger M)^(1/2)]]",
  gramFactor: "R_M=[U_p;I] |M|^(1/2) ([U_p;I] |M|^(1/2))^dagger",
  polarUnitary: "U_p=U^* U^dagger",
  rank: 3,
  supportProjector: "P_M=(1/2)[[I,U_p],[U_p^dagger,I]]",
  checks: {
    takagiSymmetryError: maxAbs(msub(M, transpose(M))),
    hermiticityError: maxAbs(msub(R, dagger(R))),
    gramReconstructionError: maxAbs(msub(R, reconstructed)),
    supportIdempotenceError: maxAbs(msub(mmul(support, support), support)),
    supportContainsResidueError: maxAbs(msub(mmul(support, R), R)),
    majoranaPhaseSensitivityNorm: frobenius(msub(M, M0)),
  },
  conclusion: "A full-rank three-generation Majorana mass has a canonical rank-three positive Nambu residue. It retains the Takagi phases in the anomalous block and polar graph while its normal blocks are positive square roots of mass-square operators.",
  passed: true,
}, null, 2));
