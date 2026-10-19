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
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(i === j ? 1 : 0)));
const zeros = (m, n) => Array.from({ length: m }, () => Array.from({ length: n }, () => c(0)));
const block2 = (A, B, C, D) => [
  ...A.map((row, i) => [...row, ...B[i]]),
  ...C.map((row, i) => [...row, ...D[i]]),
];
const conjugateMatrix = (A) => A.map((row) => row.map(conj));

const I3 = eye(3), O3 = zeros(3, 3);
const e = [
  [c(1), c(0), c(0)],
  [c(0), c(1), c(0)],
  [c(0), c(0), c(0)],
];
const K = block2(e, O3, O3, e);
const S = block2(O3, I3, I3, O3);
const Z = block2(I3, O3, O3, mscale(-1, I3));
const SZ = mmul(S, Z);
const group = [eye(6), S, Z, SZ];
const kraus = group.map((g) => mscale(0.5, mmul(g, K)));

const channel = (O) => kraus.reduce(
  (sum, L) => madd(sum, mmul(L, mmul(O, dagger(L)))),
  zeros(6, 6),
);
const completeness = kraus.reduce(
  (sum, L) => madd(sum, mmul(dagger(L), L)),
  zeros(6, 6),
);
assert(maxAbs(msub(completeness, K)) < 1e-12);

const A = [
  [c(2), c(0.4, 0.8), c(-0.2, 0.3)],
  [c(0.4, -0.8), c(1), c(0.5, -0.1)],
  [c(-0.2, -0.3), c(0.5, 0.1), c(3)],
];
const encoded = block2(A, O3, O3, conjugateMatrix(A));
const selected = channel(encoded);
const realCorner = [
  [c(A[0][0].re), c(A[0][1].re), c(0)],
  [c(A[1][0].re), c(A[1][1].re), c(0)],
  [c(0), c(0), c(0)],
];
const expected = block2(realCorner, O3, O3, realCorner);
assert(maxAbs(msub(selected, expected)) < 1e-12);
assert(maxAbs(msub(mmul(S, mmul(selected, S)), selected)) < 1e-12);
assert(maxAbs(msub(mmul(Z, mmul(selected, Z)), selected)) < 1e-12);

// An arbitrary topology coherence is killed by the Z twirl.
const Q = [
  [c(0.3), c(0.1, 0.2), c(0)],
  [c(0.1, -0.2), c(-0.4), c(0)],
  [c(0), c(0), c(0.2)],
];
const coherent = block2(O3, Q, dagger(Q), O3);
assert(maxAbs(channel(coherent)) < 1e-12);

// A pure third-face population is removed by K.
const third = [
  [c(0), c(0), c(0)],
  [c(0), c(0), c(0)],
  [c(0), c(0), c(5)],
];
assert(maxAbs(channel(block2(third, O3, O3, third))) < 1e-12);

console.log(JSON.stringify({
  protocol: "combined-cp-peirce-exchange-superselection-selector/1",
  doubledCarrier: "C^2_topology tensor C^3_carrier",
  rankSelector: "K=I_topology tensor diag(1,1,0)",
  exchange: "S=sigma_x tensor I_3",
  topologyParity: "Z=sigma_z tensor I_3",
  channel: "Phi(O)=(1/4) sum_{g in {I,S,Z,SZ}} g K O K g^dagger",
  krausCompleteness: "sum L_g^dagger L_g=K, so Phi is CP and trace-nonincreasing; it is trace preserving on the selected K support",
  encodedAction: "Phi(diag(A,conj(A)))=diag(Re(eAe),Re(eAe))",
  exactEffects: [
    "third-face population removed",
    "Peirce-half links removed",
    "topology coherences removed",
    "imaginary corner direction removed on the conjugate-paired encoding",
  ],
  remainingBoundary: "On arbitrary doubled inputs the range is larger than encoded H_2(R). The conjugate-pair input constraint must come from the Furey correspondence/real structure, and K must arise dynamically from a gap rather than an exact deletion.",
  passed: true,
}, null, 2));
