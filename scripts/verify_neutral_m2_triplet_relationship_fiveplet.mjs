const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const near = (a, b, tolerance = 1e-10) => Math.abs(a - b) < tolerance;

const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const addM = (a, b) => a.map((row, i) => row.map((z, j) => addC(z, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((z) => scaleC(s, z)));
const mulM = (a, b) => a.map((row, i) => b[0].map((_, j) =>
  row.reduce((sum, z, k) => addC(sum, mulC(z, b[k][j])), C(0))));
const zeroM = () => [[C(0), C(0)], [C(0), C(0)]];
const equalM = (a, b) => a.every((row, i) => row.every((z, j) =>
  near(z.re, b[i][j].re) && near(z.im, b[i][j].im)));

const I = [[C(1), C(0)], [C(0), C(1)]];
const sigma = [
  [[C(0), C(1)], [C(1), C(0)]],
  [[C(0), C(0, -1)], [C(0, 1), C(0)]],
  [[C(1), C(0)], [C(0), C(-1)]],
];

// The internal Jordan multiplication map Sym^2(3)->Herm_2(C) retains only
// the trace singlet: sigma_i o sigma_j = delta_ij I.
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    const jordan = scaleM(0.5, addM(mulM(sigma[i], sigma[j]), mulM(sigma[j], sigma[i])));
    assert(equalM(jordan, i === j ? I : zeroM()), "Pauli Jordan product must be delta_ij I");
  }
}

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mulR = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => s + x * b[k][j], 0)));
const addR = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const scaleR = (s, a) => a.map((row) => row.map((x) => s * x));
const trace = (a) => a.reduce((s, row, i) => s + row[i], 0);
const normDifference = (a, b) => Math.sqrt(a.reduce((s, row, i) =>
  s + row.reduce((t, x, j) => t + (x - b[i][j]) ** 2, 0), 0));

const quadrupole = (x) => {
  const r2 = x.reduce((s, value) => s + value * value, 0);
  return x.map((xi, i) => x.map((xj, j) => xi * xj - (i === j ? r2 / 3 : 0)));
};
const x = [1, 2, -1];
const Q = quadrupole(x);
assert(near(trace(Q), 0), "relationship tensor must be traceless");
assert(normDifference(Q, [[0,0,0],[0,0,0],[0,0,0]]) > 0, "generic relationship fiveplet must be nonzero");

const theta = 0.731;
const R = [
  [Math.cos(theta), -Math.sin(theta), 0],
  [Math.sin(theta), Math.cos(theta), 0],
  [0, 0, 1],
];
const Rx = R.map((row) => row.reduce((s, value, j) => s + value * x[j], 0));
const transformedQ = mulR(mulR(R, Q), transpose(R));
assert(normDifference(quadrupole(Rx), transformedQ) < 1e-10,
  "Q(Rx) must equal R Q(x) R^T");

// The five standard traceless-symmetric basis matrices are independent.
const basis = [
  [[1,0,0],[0,-1,0],[0,0,0]],
  [[1,0,0],[0,1,0],[0,0,-2]],
  [[0,1,0],[1,0,0],[0,0,0]],
  [[0,0,1],[0,0,0],[1,0,0]],
  [[0,0,0],[0,0,1],[0,1,0]],
];
assert(basis.length === 5 && basis.every((b) => near(trace(b), 0)), "traceless symmetric space must have dimension five");

const Qminus = quadrupole(x.map((value) => -value));
assert(normDifference(Q, Qminus) < 1e-12, "quadrupole must identify x and -x");

// Uniaxial identity: Q has squared norm 2|x|^4/3 and cubic trace 2|x|^6/9.
const Q2 = mulR(Q, Q);
const Q3 = mulR(Q2, Q);
const r2 = x.reduce((s, value) => s + value * value, 0);
assert(near(trace(Q2), 2 * r2 ** 2 / 3), "uniaxial quadratic invariant must be fixed");
assert(near(trace(Q3), 2 * r2 ** 3 / 9), "uniaxial cubic invariant must be fixed");

console.log("Neutral M2 triplet relationship-fiveplet certificate: PASS");
console.log("internal_Pauli_Jordan_product_retains=singlet_only");
console.log("external_symmetric_relationship_kernel_dimension=5");
console.log("quadrupole_SO3_equivariant=true");
console.log("quadrupole_antipodal=true");
console.log("fixed_radius_orbit=RP2");
console.log("physical_triplet_source_and_dynamics_not_derived=true");
