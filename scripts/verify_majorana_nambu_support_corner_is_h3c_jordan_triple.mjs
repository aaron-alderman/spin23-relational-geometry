import assert from "node:assert/strict";

const c = (re, im = 0) => ({ re, im });
const addc = (a, b) => c(a.re + b.re, a.im + b.im);
const mulc = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => c(a.re, -a.im);
const scalec = (x, a) => c(x * a.re, x * a.im);
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => addc(s, mulc(x, B[k][j])), c(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const madd = (A, B) => A.map((row, i) => row.map((z, j) => addc(z, B[i][j])));
const mscale = (x, A) => A.map((row) => row.map((z) => scalec(x, z)));
const msub = (A, B) => madd(A, mscale(-1, B));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(i === j ? 1 : 0)));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const jordan = (A, B) => mscale(0.5, madd(mmul(A, B), mmul(B, A)));
const triple = (A, B, C) => mscale(0.5, madd(mmul(mmul(A, B), C), mmul(mmul(C, B), A)));

const mixing = () => {
  const s12 = 0.55, c12 = Math.sqrt(1 - s12 * s12);
  const s23 = 0.66, c23 = Math.sqrt(1 - s23 * s23);
  const s13 = 0.15, c13 = Math.sqrt(1 - s13 * s13), delta = 1.1;
  const em = c(Math.cos(delta), -Math.sin(delta)), ep = conj(em);
  return [
    [c(c12 * c13), c(s12 * c13), scalec(s13, em)],
    [addc(c(-s12 * c23), scalec(-c12 * s23 * s13, ep)), addc(c(c12 * c23), scalec(-s12 * s23 * s13, ep)), c(s23 * c13)],
    [addc(c(s12 * s23), scalec(-c12 * c23 * s13, ep)), addc(c(-c12 * s23), scalec(-s12 * c23 * s13, ep)), c(c23 * c13)],
  ];
};
const diagonalComplex = (xs) => xs.map((x, i) => xs.map((_, j) => i === j ? x : c(0)));
const phase = (x) => c(Math.cos(x), Math.sin(x));
const V = mixing();
const U = mmul(V, diagonalComplex([c(1), phase(0.35), phase(0.65)]));
const Ustar = U.map((row) => row.map(conj));
const Upolar = mmul(Ustar, dagger(U));
const sqrtHalf = 1 / Math.sqrt(2);
const Q = [...Upolar, ...eye(3)].map((row) => row.map((z) => scalec(sqrtHalf, z))); // 6x3 isometry
assert(maxAbs(msub(mmul(dagger(Q), Q), eye(3))) < 1e-12);
const support = mmul(Q, dagger(Q));
assert(maxAbs(msub(mmul(support, support), support)) < 1e-12);

const embed = (X) => mmul(Q, mmul(X, dagger(Q)));
const X = [
  [c(2), c(0.3, 0.2), c(-0.1, 0.4)],
  [c(0.3, -0.2), c(1), c(0.5, -0.1)],
  [c(-0.1, -0.4), c(0.5, 0.1), c(3)],
];
const Y = [
  [c(1), c(-0.2, 0.1), c(0.4, 0.3)],
  [c(-0.2, -0.1), c(2), c(0.2, 0.5)],
  [c(0.4, -0.3), c(0.2, -0.5), c(1.5)],
];
const Z = [
  [c(0.7), c(0.1, -0.2), c(0.3, 0.1)],
  [c(0.1, 0.2), c(1.1), c(-0.4, 0.2)],
  [c(0.3, -0.1), c(-0.4, -0.2), c(2.2)],
];
for (const H of [X, Y, Z]) assert(maxAbs(msub(H, dagger(H))) < 1e-12);
assert(maxAbs(msub(jordan(embed(X), embed(Y)), embed(jordan(X, Y)))) < 2e-12);
assert(maxAbs(msub(triple(embed(X), embed(Y), embed(Z)), embed(triple(X, Y, Z)))) < 3e-12);
assert(maxAbs(msub(mmul(support, embed(X)), embed(X))) < 1e-12);
assert(maxAbs(msub(mmul(embed(X), support), embed(X))) < 1e-12);

console.log(JSON.stringify({
  protocol: "majorana-nambu-support-corner-is-h3c-jordan-triple/1",
  supportRank: 3,
  isometry: "Q=2^(-1/2)[U_p;I], Q^dagger Q=I_3",
  cornerMap: "Phi(X)=Q X Q^dagger",
  exactIdentities: [
    "Phi(X o Y)=Phi(X) o Phi(Y)",
    "Phi({X,Y,Z})={Phi(X),Phi(Y),Phi(Z)}",
  ],
  supportedCorner: "P H_6(C) P is Jordan-isomorphic to H_3(C)",
  realDimension: 9,
  standardTkkAlgebra: "su(3,3), real dimension 35",
  fork: {
    fixedGraphMultiplicity: "Retaining only A tensor P can preserve the H_2(R) face triple and sp(4,R) completion.",
    dynamicFullNambuCorner: "Allowing all supported Majorana observables promotes the carrier to H_3(C) with su(3,3) completion.",
  },
  passed: true,
}, null, 2));
