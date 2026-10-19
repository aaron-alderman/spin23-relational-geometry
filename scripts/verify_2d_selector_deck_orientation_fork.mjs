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
const comm = (a, b) => addM(mulM(a, b), scaleM(-1, mulM(b, a)));
const anticomm = (a, b) => addM(mulM(a, b), mulM(b, a));

const I2 = [[C(1), C(0)], [C(0), C(1)]];
const sx = [[C(0), C(1)], [C(1), C(0)]];
const sy = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const sz = [[C(1), C(0)], [C(0), C(-1)]];
const I4 = kron(I2, I2);
const Z4 = scaleM(0, I4);

const ax = kron(sx, I2);
const ay = kron(sy, I2);
const b1 = kron(sz, sx);
const b2 = kron(sz, sz);
const Gamma = kron(sz, sy);
const clifford = [ax, ay, b1, b2, Gamma];
for (let i = 0; i < clifford.length; i += 1) {
  assert(equalM(mulM(clifford[i], clifford[i]), I4), "each Cl5 generator must square to one");
  assert(equalM(dagger(clifford[i]), clifford[i]), "each Cl5 generator must be Hermitian");
  for (let j = i + 1; j < clifford.length; j += 1) {
    assert(equalM(anticomm(clifford[i], clifford[j]), Z4), "Cl5 generators must anticommute");
  }
}

const Dor = kron(I2, sy);
assert(equalM(comm(Dor, ax), Z4) && equalM(comm(Dor, ay), Z4),
  "oriented internal repair must preserve both kinetic generators");
assert(equalM(anticomm(Dor, b1), Z4) && equalM(anticomm(Dor, b2), Z4),
  "oriented internal repair must reverse both masses");
assert(equalM(comm(Dor, Gamma), Z4),
  "unique oriented repair must preserve the chiral grading");

// Exhaust the Pauli basis in the kinetic centralizer. Only +/- I tensor sy
// anticommutes with both mass second factors.
const centralizerBasis = [I2, sx, sy, sz].map((d) => kron(I2, d));
const massFlippers = centralizerBasis.filter((d) =>
  equalM(anticomm(d, b1), Z4) && equalM(anticomm(d, b2), Z4));
assert(massFlippers.length === 1 && equalM(massFlippers[0], Dor),
  "I tensor sigma_y must be the unique Pauli-basis oriented mass repair up to scale");

const Dpin = ax;
assert(equalM(comm(Dpin, ax), Z4), "Pin repair must preserve x kinetic generator");
assert(equalM(anticomm(Dpin, ay), Z4), "Pin repair must reverse transverse kinetic generator");
assert(equalM(anticomm(Dpin, b1), Z4) && equalM(anticomm(Dpin, b2), Z4),
  "Pin repair must reverse both masses");
assert(equalM(anticomm(Dpin, Gamma), Z4), "Pin repair must reverse chiral grading");

const H = (kx, ky, phi) => addM(addM(scaleM(kx, ax), scaleM(ky, ay)),
  addM(scaleM(Math.cos(phi / 2), b1), scaleM(Math.sin(phi / 2), b2)));
for (const [kx, ky, phi] of [[0.4, 0.7, 0.2], [-1.1, 0.3, 2.6], [0.8, -0.9, 4.4]]) {
  assert(equalM(mulM(mulM(Dor, H(kx, ky, phi + 2 * Math.PI)), Dor), H(kx, ky, phi)),
    "oriented repair must sew the full fixed-frame symbol");
  assert(equalM(mulM(mulM(Dpin, H(kx, -ky, phi + 2 * Math.PI)), Dpin), H(kx, ky, phi)),
    "grading-reversing repair must be accompanied by transverse reflection");
}

// C=ax K is class-D particle-hole reality in two dimensions.
const Cunitary = ax;
assert(equalM(mulM(Cunitary, star(Cunitary)), I4), "C must square to plus one");
for (const [kx, ky, phi] of [[0.2, 0.5, 0.7], [-0.8, 1.3, 3.1]]) {
  const transformed = mulM(mulM(Cunitary, star(H(kx, ky, phi))), dagger(Cunitary));
  assert(equalM(transformed, scaleM(-1, H(-kx, -ky, phi))),
    "C must obey two-dimensional class-D particle-hole symmetry");
}
const CDorCinv = mulM(mulM(Cunitary, star(Dor)), dagger(Cunitary));
assert(equalM(CDorCinv, scaleM(-1, Dor)),
  "particle-hole reality must reverse the imaginary oriented deck repair");

console.log("Two-dimensional selector deck orientation fork: PASS");
console.log("oriented_internal_repair=I_tensor_sigma_y_unique_up_to_sign");
console.log("oriented_repair_preserves_chiral_grading=true");
console.log("grading_reversing_repair=alpha_x");
console.log("grading_reversing_repair_requires_ky_reflection=true");
console.log("primitive_odd_index_requires=Pin_or_boundary_or_projective_geometry");
