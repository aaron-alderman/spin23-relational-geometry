import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const zero = (r, c = r) => Array.from({ length: r }, () => Array.from({ length: c }, () => C(0)));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const matmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const plus = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const times = (A, s) => A.map((row) => row.map((x) => scale(x, s)));
const near = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const equalM = (A, B) => A.every((row, i) => row.every((x, j) => near(x, B[i][j])));
const kron = (A, B) => {
  const O = zero(A.length * B.length, A[0].length * B[0].length);
  for (let i = 0; i < A.length; i += 1) for (let j = 0; j < A[0].length; j += 1)
    for (let k = 0; k < B.length; k += 1) for (let l = 0; l < B[0].length; l += 1)
      O[i * B.length + k][j * B[0].length + l] = mul(A[i][j], B[k][l]);
  return O;
};
const I2 = [[C(1), C(0)], [C(0), C(1)]];
const X = [[C(0), C(1)], [C(1), C(0)]];
const Y = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const Z = [[C(1), C(0)], [C(0), C(-1)]];
const I3 = [[C(1), C(0), C(0)], [C(0), C(1), C(0)], [C(0), C(0), C(1)]];
const S = kron(X, I3);
const Q = kron(Z, I3);
const SQ = matmul(S, Q);
const conjugateBy = (U, O) => matmul(matmul(U, O), dagger(U));
const groupTwirl = (O) => times([S, Q, SQ].reduce((acc, U) => plus(acc, conjugateBy(U, O)), O), 0.25);

const gammaX = 0.7;
const gammaZ = 1.1;
const t = 0.8;
const expX = Math.exp(-2 * gammaX * t);
const expZ = Math.exp(-2 * gammaZ * t);
const px0 = (1 + expX) / 2;
const px1 = (1 - expX) / 2;
const pz0 = (1 + expZ) / 2;
const pz1 = (1 - expZ) / 2;
const weights = [px0 * pz0, px1 * pz0, px0 * pz1, px1 * pz1];
assert(weights.every((w) => w >= 0));
assert(Math.abs(weights.reduce((a, b) => a + b, 0) - 1) < 1e-12);

const finiteChannel = (O) => [null, S, Q, SQ].reduce((acc, U, i) => {
  const term = U === null ? O : conjugateBy(U, O);
  return plus(acc, times(term, weights[i]));
}, zero(6));

// Verify the four topology Pauli sectors and their exact decay multipliers.
const carrierProbe = [
  [C(2), C(1, 1), C(0)],
  [C(1, -1), C(3), C(-2, 0.5)],
  [C(0), C(-2, -0.5), C(4)]
];
const sectors = [
  { name: "I", P: I2, multiplier: 1, rate: 0 },
  { name: "X", P: X, multiplier: expZ, rate: -2 * gammaZ },
  { name: "Z", P: Z, multiplier: expX, rate: -2 * gammaX },
  { name: "Y", P: Y, multiplier: expX * expZ, rate: -2 * (gammaX + gammaZ) }
];
for (const sector of sectors) {
  const O = kron(sector.P, carrierProbe);
  assert(equalM(finiteChannel(O), times(O, sector.multiplier)));
}

// The asymptotic range is exactly I_topology tensor M_3.
for (const sector of sectors) {
  const O = kron(sector.P, carrierProbe);
  const E = groupTwirl(O);
  if (sector.name === "I") assert(equalM(E, O));
  else assert(equalM(E, zero(6)));
}

// Conjugate-paired blocks reduce to two copies of Re(A).
const A = carrierProbe;
const barA = A.map((row) => row.map(conj));
const encoded = zero(6);
for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
  encoded[i][j] = A[i][j];
  encoded[3 + i][3 + j] = barA[i][j];
}
const reA = A.map((row) => row.map((z) => C(z.re)));
const expected = zero(6);
for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
  expected[i][j] = reA[i][j];
  expected[3 + i][3 + j] = reA[i][j];
}
assert(equalM(groupTwirl(encoded), expected));

console.log(JSON.stringify({
  protocol: "topology-pauli-lindbladian-converges-to-selector-twirl/1",
  generator: "L(O)=gammaX(SOS-O)+gammaZ(ZOZ-O)",
  gkslJumps: ["sqrt(gammaX) S", "sqrt(gammaZ) Z"],
  finiteTimeChannel: "random unitary with four nonnegative Pauli weights",
  sectorRates: Object.fromEntries(sectors.map((s) => [s.name, s.rate])),
  asymptoticProjection: "E=(1/4)(id+Ad_S+Ad_Z+Ad_SZ)",
  fixedAlgebra: "I_topology tensor M_3",
  pairedEncoding: "diag(A,conj(A)) -> diag(Re(A),Re(A))",
  physicalMeaning: "topology is depolarized/decohered; this is a dissipative gap, not a Hamiltonian mirror-mass gap",
  passed: true
}, null, 2));
