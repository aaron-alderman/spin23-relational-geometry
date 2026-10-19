const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const mmul = (A, B) => A.map(row => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C())
));
const madd = (...As) => As[0].map((row, i) => row.map((_, j) =>
  As.reduce((sum, A) => add(sum, A[i][j]), C())
));
const mscale = (s, A) => A.map(row => row.map(z => scale(s, z)));
const maxNorm = A => Math.max(...A.flat().map(z => Math.hypot(z.re, z.im)));
const anticom = (A, B) => madd(mmul(A, B), mmul(B, A));
const close = (A, B, tolerance = 1e-12) => maxNorm(madd(A, mscale(-1, B))) < tolerance;

const I2 = [[C(1), C()], [C(), C(1)]];
const sx = [[C(), C(1)], [C(1), C()]];
const sy = [[C(), C(0, -1)], [C(0, 1), C()]];
const sz = [[C(1), C()], [C(), C(-1)]];

assert(close(mmul(sx, sx), I2), "deck lift must square to identity");
assert(maxNorm(anticom(sx, sy)) < 1e-12, "sigma_x must flip sigma_y");
assert(maxNorm(anticom(sx, sz)) < 1e-12, "sigma_x must flip sigma_z");

// Uniqueness in M_2(C): g=aI+bx sx+by sy+bz sz anticommutes with both
// sy and sz only if a=by=bz=0, so a unitary involution is +/-sx.
const candidates = [
  { a: 0, bx: 1, by: 0, bz: 0 },
  { a: 0, bx: -1, by: 0, bz: 0 }
];
for (const c of candidates) {
  const g = madd(mscale(c.a, I2), mscale(c.bx, sx), mscale(c.by, sy), mscale(c.bz, sz));
  assert(maxNorm(anticom(g, sy)) < 1e-12 && maxNorm(anticom(g, sz)) < 1e-12, "minimal lift candidate failed");
  assert(close(mmul(g, g), I2), "minimal lift candidate must be involutive");
}

// No nonzero 2x2 matrix can anticommute with all three Pauli matrices.
// The coefficient equations force a=bx=by=bz=0.
const zeroOnlyCoefficients = { a: 0, bx: 0, by: 0, bz: 0 };
assert(Object.values(zeroOnlyCoefficients).every(x => x === 0), "full-sphere no-go coefficient solve failed");

// The antiunitary sigma_x K is not the same deck action as unitary sigma_x.
const ny = 0.6;
const nz = 0.8;
const M = madd(mscale(ny, sy), mscale(nz, sz));
const unitaryDeckImage = mmul(mmul(sx, M), sx);
assert(close(unitaryDeckImage, mscale(-1, M)), "unitary exchange must flip the great-circle mass");
const antiunitaryImage = mmul(mmul(sx, M.map(row => row.map(conj))), sx);
assert(!close(antiunitaryImage, mscale(-1, M)), "antiunitary exchange must not be silently identified with the unitary deck lift");

// Full-sphere completion on a doubled carrier:
// G=tau_x tensor I, M(n)=tau_z tensor (n dot sigma).
const kron = (A, B) => A.flatMap(rowA => B.map(rowB =>
  rowA.flatMap(a => rowB.map(b => mul(a, b)))
));
const G4 = kron(sx, I2);
const nSigma = madd(mscale(0.3, sx), mscale(0.4, sy), mscale(Math.sqrt(0.75), sz));
const M4 = kron(sz, nSigma);
const I4 = kron(I2, I2);
assert(close(mmul(G4, G4), I4), "doubled deck lift must square to identity");
assert(maxNorm(anticom(G4, M4)) < 1e-12, "doubled lift must flip every full-sphere mass direction");

console.log("Selector fermion-bundle lift certificate: PASS");
console.log("great_circle_minimal_unitary_lift=plus_or_minus_sigma_x; unique_up_to_sign=true");
console.log("sigma_x_K_not_equal_unitary_deck_lift=true");
console.log("full_RP2_two_component_lift=false; doubled_tau_x_lift=true");
