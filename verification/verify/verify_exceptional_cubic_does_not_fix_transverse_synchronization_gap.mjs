import assert from "node:assert/strict";

// Symmetric 2x2 matrices are stored as [a,r,b], with Frobenius norm
// a^2+b^2+2r^2 and determinant ab-r^2.
const add = (x, y) => x.map((v, i) => v + y[i]);
const scale = (s, x) => x.map((v) => s * v);
const sub = (x, y) => x.map((v, i) => v - y[i]);
const norm2 = ([a, r, b]) => a * a + 2 * r * r + b * b;
const det = ([a, r, b]) => a * b - r * r;
const near = (x, y, eps = 1e-12) => Math.abs(x - y) < eps;
const nearVector = (x, y) => x.every((v, i) => near(v, y[i]));

// Orthogonal coordinates for the ambient Haar-G2 symmetric commutant:
// A0 is the response on R1 and A7 the response on Im(O), weighted by
// their representation dimensions 1 and 7.
const mean = (A0, A7) => scale(1 / 8, add(A0, scale(7, A7)));
const difference = (A0, A7) => sub(A0, A7);
const reconstruct = (S, D) => [
  add(S, scale(7 / 8, D)),
  sub(S, scale(1 / 8, D))
];

const S = [2.3, -0.4, 1.7];
const D = [0.6, 0.2, -0.5];
const [A0, A7] = reconstruct(S, D);
assert(nearVector(mean(A0, A7), S));
assert(nearVector(difference(A0, A7), D));

// Weighted Frobenius orthogonal decomposition.
const ambientNorm = norm2(A0) + 7 * norm2(A7);
const decomposedNorm = 8 * norm2(S) + (7 / 8) * norm2(D);
assert(near(ambientNorm, decomposedNorm));

// Infinitely many G2-invariant extensions agree with det on the
// synchronized Jordan slice A0=A7=C, yet have arbitrary transverse
// curvature kappa.
const extension = (kappa, X0, X7) =>
  det(mean(X0, X7)) + 0.5 * kappa * norm2(difference(X0, X7));

const C = [1.8, 0.3, 2.1];
for (const kappa of [-3, 0, 0.7, 5]) {
  assert(near(extension(kappa, C, C), det(C)));
}

// In the weighted ambient kinetic metric, V=(kappa/2)||D||_F^2 gives
// three transverse symmetric-matrix modes with m^2=8*kappa/7.
const kappas = [-2, 0, 3.5];
const spectra = kappas.map((kappa) => ({
  kappa,
  transverseMassSquared: Array(3).fill(8 * kappa / 7),
  status: kappa > 0 ? "stable gap" : kappa === 0 ? "flat" : "tachyonic"
}));
assert(spectra[0].transverseMassSquared.every((x) => x < 0));
assert(spectra[1].transverseMassSquared.every((x) => x === 0));
assert(spectra[2].transverseMassSquared.every((x) => x > 0));

console.log(JSON.stringify({
  protocol: "exceptional-cubic-transverse-synchronization-underdetermination/1",
  synchronizedBoundary: "A_scalar=A_imag=C, where every extension equals det(C)",
  weightedMean: "S=(A_scalar+7 A_imag)/8",
  transverseCoordinate: "D=A_scalar-A_imag",
  weightedMetric: "8||S||_F^2+(7/8)||D||_F^2",
  extensionFamily: "F_kappa=det(S)+(kappa/2)||D||_F^2",
  transverseSpectrum: "three degenerate modes with m^2=8 kappa/7",
  consequence: "the Jordan determinant on the synchronized slice does not determine the sign or size of the synchronization gap",
  spectra,
  passed: true
}, null, 2));
