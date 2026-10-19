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
const star = (a) => a.map((row) => row.map(conjC));
const equalM = (a, b, tolerance = 1e-10) => a.every((row, i) => row.every((x, j) =>
  Math.abs(x.re - b[i][j].re) < tolerance && Math.abs(x.im - b[i][j].im) < tolerance));
const kron = (a, b) => a.flatMap((rowA) => b.map((rowB) =>
  rowA.flatMap((x) => rowB.map((y) => mulC(x, y)))));

const I2 = [[C(1), C(0)], [C(0), C(1)]];
const sx = [[C(0), C(1)], [C(1), C(0)]];
const sy = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const sz = [[C(1), C(0)], [C(0), C(-1)]];
const I4 = kron(I2, I2);
const I8 = kron(I4, I2);
const ax = kron(sx, I2);
const ay = kron(sy, I2);
const ax8 = kron(ax, I2);
const ay8 = kron(ay, I2);
const MW = kron(kron(sz, I2), sz);
const glide = kron(ax, sx);
const Cunitary = kron(ax, I2);

const H = (kx, ky, r) => addM(addM(scaleM(Math.sin(kx), ax8), scaleM(Math.sin(ky), ay8)),
  scaleM(r * (2 - Math.cos(kx) - Math.cos(ky)), MW));
const energySquared = (kx, ky, r) => Math.sin(kx) ** 2 + Math.sin(ky) ** 2
  + r ** 2 * (2 - Math.cos(kx) - Math.cos(ky)) ** 2;

for (const [kx, ky, r] of [[0.2, 0.4, 0.7], [1.1, -2.2, 1.3], [Math.PI, 0, 0.5]]) {
  assert(equalM(mulM(H(kx, ky, r), H(kx, ky, r)), scaleM(energySquared(kx, ky, r), I8)),
    "bulk Wilson symbol must square to its scalar dispersion");
}

const r = 0.8;
const naivePoints = [
  { kx: 0, ky: 0, expectedGap: 0 },
  { kx: Math.PI, ky: 0, expectedGap: 2 * r },
  { kx: 0, ky: Math.PI, expectedGap: 2 * r },
  { kx: Math.PI, ky: Math.PI, expectedGap: 4 * r },
];
for (const point of naivePoints) {
  const gap = Math.sqrt(energySquared(point.kx, point.ky, r));
  assert(Math.abs(gap - point.expectedGap) < 1e-10, "Wilson gaps at naive Dirac points must match exactly");
}

let traceGlide = 0;
for (let i = 0; i < 8; i += 1) traceGlide += glide[i][i].re;
const plusDimension = (8 + traceGlide) / 2;
const minusDimension = (8 - traceGlide) / 2;
assert(plusDimension === 4 && minusDimension === 4,
  "each glide sector must retain one four-component low-energy cone");

for (const [kx, ky] of [[0.3, 0.7], [1.2, -0.4], [Math.PI, 0]]) {
  const lhsGlide = mulM(mulM(glide, H(kx, -ky, r)), dagger(glide));
  assert(equalM(lhsGlide, H(kx, ky, r)), "glide must sew ky to minus ky");
  const lhsPH = mulM(mulM(Cunitary, star(H(kx, ky, r))), dagger(Cunitary));
  assert(equalM(lhsPH, scaleM(-1, H(-kx, -ky, r))), "class-D particle-hole symmetry must survive Wilson regulation");
}

console.log("Exchanged Wilson-pair bulk spectrum and quotient count: PASS");
console.log("surviving_gapless_points=1_at_k_zero");
console.log(`doubler_gaps=${2 * r},${2 * r},${4 * r}`);
console.log(`deck_sector_low_energy_dimensions=${plusDimension},${minusDimension}`);
console.log("independent_low_energy_cones_per_deck_sector=1_four_component_cone");
console.log("textured_relative_invariant=not_yet_computed");
