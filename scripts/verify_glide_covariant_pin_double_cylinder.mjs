const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const zeroMatrix = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const addTo = (a, i, j, value) => { a[i][j] = addC(a[i][j], value); };
const addM = (a, b) => a.map((row, i) => row.map((x, j) => addC(x, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((x) => scaleC(s, x)));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => addC(sum, mulC(x, b[k][j])), C(0))));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjC(row[j])));
const star = (a) => a.map((row) => row.map(conjC));
const equalM = (a, b, tolerance = 1e-9) => a.every((row, i) => row.every((x, j) =>
  Math.abs(x.re - b[i][j].re) < tolerance && Math.abs(x.im - b[i][j].im) < tolerance));
const kron = (a, b) => a.flatMap((rowA) => b.map((rowB) =>
  rowA.flatMap((x) => rowB.map((y) => mulC(x, y)))));

const I2 = [[C(1), C(0)], [C(0), C(1)]];
const sx = [[C(0), C(1)], [C(1), C(0)]];
const sy = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const sz = [[C(1), C(0)], [C(0), C(-1)]];
const I4 = kron(I2, I2);
const ax = kron(sx, I2);
const ay = kron(sy, I2);
const b1 = kron(sz, sx);
const b2 = kron(sz, sz);
const Gamma4 = kron(sz, sy);

const L = 2;
const M = 1;
const nx = 2 * L;
const ny = 2 * M + 1;
const sites = nx * ny;
const spin = 4;
const dimension = sites * spin;
const siteIndex = (x, y) => ((y + M) * nx + ((x % nx) + nx) % nx);
const basisIndex = (x, y, a) => spin * siteIndex(x, y) + a;
const glide = (x, y) => [((x + L) % nx), -y];

const H = zeroMatrix(dimension);
const mu = 0.7;
for (let y = -M; y <= M; y += 1) {
  for (let x = 0; x < nx; x += 1) {
    const mass = addM(scaleM(Math.sin(Math.PI * x / L), b1), scaleM(mu * y, b2));
    for (let a = 0; a < spin; a += 1) for (let b = 0; b < spin; b += 1) {
      addTo(H, basisIndex(x, y, a), basisIndex(x, y, b), mass[a][b]);
      // -i alpha_x D_x, with D=(forward-backward)/2.
      addTo(H, basisIndex(x, y, a), basisIndex(x + 1, y, b), mulC(C(0, -0.5), ax[a][b]));
      addTo(H, basisIndex(x, y, a), basisIndex(x - 1, y, b), mulC(C(0, 0.5), ax[a][b]));
      if (y < M) addTo(H, basisIndex(x, y, a), basisIndex(x, y + 1, b), mulC(C(0, -0.5), ay[a][b]));
      if (y > -M) addTo(H, basisIndex(x, y, a), basisIndex(x, y - 1, b), mulC(C(0, 0.5), ay[a][b]));
    }
  }
}
assert(equalM(dagger(H), H), "finite double-cylinder Hamiltonian must be Hermitian");

const U = zeroMatrix(dimension);
for (let y = -M; y <= M; y += 1) for (let x = 0; x < nx; x += 1) {
  const [gx, gy] = glide(x, y);
  for (let a = 0; a < spin; a += 1) for (let b = 0; b < spin; b += 1) {
    addTo(U, basisIndex(gx, gy, a), basisIndex(x, y, b), ax[a][b]);
  }
}
const Id = zeroMatrix(dimension);
for (let i = 0; i < dimension; i += 1) Id[i][i] = C(1);
assert(equalM(mulM(U, U), Id), "glide spin lift must square to plus one");
assert(equalM(mulM(mulM(U, H), dagger(U)), H), "Hamiltonian must be exactly glide covariant");

const Gamma = zeroMatrix(dimension);
const Cunitary = zeroMatrix(dimension);
for (let site = 0; site < sites; site += 1) for (let a = 0; a < spin; a += 1) for (let b = 0; b < spin; b += 1) {
  Gamma[spin * site + a][spin * site + b] = Gamma4[a][b];
  Cunitary[spin * site + a][spin * site + b] = ax[a][b];
}
assert(equalM(addM(mulM(Gamma, H), mulM(H, Gamma)), scaleM(0, Id)),
  "oriented-double Hamiltonian must retain chiral anticommutation");
assert(equalM(mulM(mulM(U, Gamma), dagger(U)), scaleM(-1, Gamma)),
  "glide must exchange the two chiral gradings");

const particleHoleH = mulM(mulM(Cunitary, star(H)), dagger(Cunitary));
assert(equalM(particleHoleH, scaleM(-1, H)), "class-D particle-hole symmetry must be exact");
assert(equalM(mulM(Cunitary, star(Cunitary)), Id), "particle-hole operation must square to plus one");
const particleHoleU = mulM(mulM(Cunitary, star(U)), dagger(Cunitary));
assert(equalM(particleHoleU, U), "particle-hole symmetry must preserve each glide sector");

let traceU = 0;
for (let i = 0; i < dimension; i += 1) traceU += U[i][i].re;
const plusDimension = (dimension + traceU) / 2;
const minusDimension = (dimension - traceU) / 2;
assert(plusDimension === minusDimension && plusDimension % 2 === 0,
  "free glide sectors must have equal even dimensions");

const massAt = (x, y) => [Math.sin(Math.PI * x / L), mu * y];
for (let y = -M; y <= M; y += 1) for (let x = 0; x < nx; x += 1) {
  const [gx, gy] = glide(x, y);
  const m = massAt(x, y);
  const gm = massAt(gx, gy);
  assert(Math.abs(gm[0] + m[0]) < 1e-10 && Math.abs(gm[1] + m[1]) < 1e-10,
    "both mass components must be glide odd");
}

console.log("Glide-covariant Pin double-cylinder architecture: PASS");
console.log(`oriented_double_dimension=${dimension}`);
console.log(`deck_sector_dimensions=${plusDimension},${minusDimension}`);
console.log("deck_square=+1");
console.log("deck_covariance=true");
console.log("deck_reverses_chiral_grading=true");
console.log("particle_hole_preserves_each_deck_sector=true");
console.log("oriented_complex_index=0_by_kernel_pairing");
console.log("relative_Pin_invariant=not_yet_computed");
