import assert from "node:assert/strict";

const near = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const abs2 = (a) => a.re * a.re + a.im * a.im;

const higgs = (chi, xi1, xi2) => [
  C(Math.cos(chi) * Math.cos(xi1), Math.cos(chi) * Math.sin(xi1)),
  C(Math.sin(chi) * Math.cos(xi2), Math.sin(chi) * Math.sin(xi2))
];
const frame = (h) => [
  [conj(h[1]), h[0]],
  [C(-conj(h[0]).re, -conj(h[0]).im), h[1]]
];
const hopf = (h) => {
  const cross = mul(conj(h[0]), h[1]);
  return [2 * cross.re, 2 * cross.im, abs2(h[0]) - abs2(h[1])];
};
const det2 = (A) => add(mul(A[0][0], A[1][1]), C(-mul(A[0][1], A[1][0]).re, -mul(A[0][1], A[1][0]).im));

for (const [chi, xi1, xi2] of [[0.2, 0.3, 1.1], [0.7, 2.2, 4.1], [1.2, 5.4, 0.8]]) {
  const h = higgs(chi, xi1, xi2);
  assert(near(abs2(h[0]) + abs2(h[1]), 1));
  const F = frame(h);
  const d = det2(F);
  assert(near(d.re, 1) && near(d.im, 0));
  const n = hopf(h);
  assert(near(n.reduce((s, x) => s + x * x, 0), 1));

  const alpha = 0.91;
  const phase = C(Math.cos(alpha), Math.sin(alpha));
  const phased = h.map((z) => mul(phase, z));
  const np = hopf(phased);
  assert(np.every((x, i) => near(x, n[i])));
}

// Midpoint quadrature for the normalized S^3 degree-volume integral and
// the Hopf Chern-Simons integral of a=-i h^dagger dh.
const Nchi = 4000;
let chiIntegral = 0;
for (let i = 0; i < Nchi; i += 1) {
  const chi = (i + 0.5) * (Math.PI / 2) / Nchi;
  chiIntegral += Math.sin(chi) * Math.cos(chi) * (Math.PI / 2) / Nchi;
}
const torusArea = (2 * Math.PI) ** 2;
const s3Volume = chiIntegral * torusArea;
const degree = s3Volume / (2 * Math.PI ** 2);
const aWedgeDa = -2 * chiIntegral * torusArea;
const hopfInvariant = -aWedgeDa / (4 * Math.PI ** 2);
assert(Math.abs(degree - 1) < 1e-6);
assert(Math.abs(hopfInvariant - 1) < 1e-6);

console.log(JSON.stringify({
  protocol: "higgs-frame-hopf-map-and-zero-winding/1",
  normalizedHiggs: "h in S^3",
  frame: "F_h=(tilde h,h) in SU(2)",
  projectiveDirection: "n=h^dagger sigma h in S^2",
  fiber: "h -> exp(i alpha) h leaves n fixed",
  s3DegreeIntegral: degree,
  hopfInvariantFromMinusA_dA_over_4pi2: hopfInvariant,
  obstruction: "a degree-one frame on the S^3 link of an isolated four-real-dimensional zero cannot extend through the zero without leaving C^2 minus {0}",
  lowDimensionalBoundary: "pi1(S^3)=pi2(S^3)=0, so the minimal Higgs vacuum alone does not topologically protect strings or monopoles",
  passed: true
}, null, 2));
