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
const commutator = (A, B) => msub(mmul(A, B), mmul(B, A));
const diagonal = (xs) => xs.map((x, i) => xs.map((_, j) => c(i === j ? x : 0)));
const diagonalComplex = (xs) => xs.map((x, i) => xs.map((_, j) => i === j ? x : c(0)));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const frobenius = (A) => Math.sqrt(A.flat().reduce((s, z) => s + z.re * z.re + z.im * z.im, 0));
const det3 = (A) => {
  const term = (i, j, k) => mulc(A[0][i], mulc(A[1][j], A[2][k]));
  return addc(addc(term(0, 1, 2), term(1, 2, 0)), addc(term(2, 0, 1), scalec(-1, addc(addc(term(2, 1, 0), term(1, 0, 2)), term(0, 2, 1)))));
};

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
const withMajorana = (V, alpha21, alpha31) => mmul(V, diagonalComplex([c(1), phase(alpha21 / 2), phase(alpha31 / 2)]));

const V = diracMixing(1.1);
const U0 = withMajorana(V, 0, 0);
const UMajorana = withMajorana(V, 0.7, 1.3);
const Dnu2 = diagonal([0.01 ** 2, 0.02 ** 2, 0.05 ** 2]);
const He = diagonal([0.5, 3, 20]);
const Hnu0 = mmul(U0, mmul(Dnu2, dagger(U0)));
const HnuMajorana = mmul(UMajorana, mmul(Dnu2, dagger(UMajorana)));
assert(maxAbs(msub(Hnu0, HnuMajorana)) < 1e-14);

const curvature0 = mscale(0.25, commutator(He, Hnu0));
const curvatureMajorana = mscale(0.25, commutator(He, HnuMajorana));
assert(maxAbs(msub(curvature0, curvatureMajorana)) < 1e-14);
assert(Math.abs(det3(curvature0).im) > 1e-14);

const majoranaInvariant = (U) => {
  const product = mulc(U[0][0], conj(U[0][1]));
  return mulc(product, product).im;
};
const invariant0 = majoranaInvariant(U0);
const invariantMajorana = majoranaInvariant(UMajorana);
assert(Math.abs(invariant0) < 1e-14);
assert(Math.abs(invariantMajorana) > 1e-3);

const graphProjector = (U) => {
  const I = diagonal([1, 1, 1]), Ud = dagger(U);
  return [
    [...I[0], ...U[0]], [...I[1], ...U[1]], [...I[2], ...U[2]],
    [...Ud[0], ...I[0]], [...Ud[1], ...I[1]], [...Ud[2], ...I[2]],
  ].map((row) => row.map((z) => scalec(0.5, z)));
};
assert(frobenius(msub(graphProjector(U0), graphProjector(UMajorana))) > 0.1);

// The complex symmetric Takagi mass spurion retains the Majorana phases.
const Dnu = diagonal([0.01, 0.02, 0.05]);
const conjugateMatrix = (A) => A.map((row) => row.map(conj));
const Mnu0 = mmul(conjugateMatrix(U0), mmul(Dnu, dagger(U0)));
const MnuMajorana = mmul(conjugateMatrix(UMajorana), mmul(Dnu, dagger(UMajorana)));
assert(frobenius(msub(Mnu0, MnuMajorana)) > 1e-3);
assert(maxAbs(msub(MnuMajorana, MnuMajorana[0].map((_, j) => MnuMajorana.map((row) => row[j])))) < 1e-12);

console.log(JSON.stringify({
  protocol: "pmns-hermitian-curvature-is-blind-to-majorana-phases/1",
  hermitianNeutrinoOperator: "H_nu=U diag(m_i^2) U^dagger",
  hermitianOperatorMajoranaDifference: maxAbs(msub(Hnu0, HnuMajorana)),
  curvatureMajoranaDifference: maxAbs(msub(curvature0, curvatureMajorana)),
  diracSensitiveCurvatureDeterminant: det3(curvature0),
  majoranaSensitiveRowInvariant: {
    zeroMajoranaPhases: invariant0,
    nonzeroMajoranaPhases: invariantMajorana,
  },
  graphProjectorDifferenceNorm: frobenius(msub(graphProjector(U0), graphProjector(UMajorana))),
  takagiMassSpurionDifferenceNorm: frobenius(msub(Mnu0, MnuMajorana)),
  conclusion: "Curvature built only from H_e and H_nu detects Dirac-type PMNS CP but is exactly blind to Majorana phases. The full charged-current graph and complex symmetric Takagi mass spurion retain them.",
  passed: true,
}, null, 2));
