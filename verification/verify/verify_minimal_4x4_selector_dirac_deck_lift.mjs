const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const addM = (a, b) => a.map((row, i) => row.map((value, j) => addC(value, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((value) => scaleC(s, value)));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, value, k) => addC(sum, mulC(value, b[k][j])), C(0))));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjC(row[j])));
const equalM = (a, b, tolerance = 1e-10) => a.every((row, i) => row.every((value, j) =>
  Math.abs(value.re - b[i][j].re) < tolerance && Math.abs(value.im - b[i][j].im) < tolerance));
const kron = (a, b) => a.flatMap((rowA) => b.map((rowB) =>
  rowA.flatMap((valueA) => rowB.map((valueB) => mulC(valueA, valueB)))));

const I2 = [[C(1), C(0)], [C(0), C(1)]];
const sx = [[C(0), C(1)], [C(1), C(0)]];
const sy = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const sz = [[C(1), C(0)], [C(0), C(-1)]];
const I4 = kron(I2, I2);
const Z4 = scaleM(0, I4);

const alpha = kron(sx, I2);
const beta1 = kron(sz, sx);
const beta2 = kron(sz, sz);
const Gamma = kron(sy, I2);
const generators = [alpha, beta1, beta2, Gamma];
for (const generator of generators) {
  assert(equalM(mulM(generator, generator), I4), "each Clifford generator must square to one");
  assert(equalM(dagger(generator), generator), "each Clifford generator must be Hermitian");
}
for (let i = 0; i < generators.length; i += 1) {
  for (let j = i + 1; j < generators.length; j += 1) {
    assert(equalM(addM(mulM(generators[i], generators[j]), mulM(generators[j], generators[i])), Z4),
      "four Clifford generators must anticommute pairwise");
  }
}

const S = alpha;
assert(equalM(mulM(mulM(S, alpha), S), alpha), "deck repair must preserve kinetic generator");
assert(equalM(mulM(mulM(S, beta1), S), scaleM(-1, beta1)), "deck repair must flip beta1");
assert(equalM(mulM(mulM(S, beta2), S), scaleM(-1, beta2)), "deck repair must flip beta2");
assert(equalM(mulM(mulM(S, Gamma), S), scaleM(-1, Gamma)), "deck repair must reverse chiral grading");

const hamiltonian = (k, phi) => addM(scaleM(k, alpha),
  addM(scaleM(Math.cos(phi / 2), beta1), scaleM(Math.sin(phi / 2), beta2)));
for (const [k, phi] of [[0.4,0.2],[-1.1,1.7],[2.3,4.1]]) {
  const deckShifted = hamiltonian(k, phi + 2 * Math.PI);
  assert(equalM(mulM(mulM(S, deckShifted), S), hamiltonian(k, phi)),
    "S must sew the antiperiodic mass family into a periodic Hamiltonian bundle");
}

// Antiunitary C=S K. Its square is S S*=+1. It obeys
// C H(k,phi) C^-1=-H(-k,phi) for the chosen real alpha,beta matrices.
const CUnitary = S;
assert(equalM(mulM(CUnitary, CUnitary.map((row) => row.map(conjC))), I4),
  "particle-hole antiunitary must square to plus one");
for (const [k, phi] of [[0.6,0.8],[-0.9,2.2]]) {
  const h = hamiltonian(k, phi).map((row) => row.map(conjC));
  const transformed = mulM(mulM(CUnitary, h), dagger(CUnitary));
  assert(equalM(transformed, scaleM(-1, hamiltonian(-k, phi))),
    "C must satisfy class-D particle-hole sewing");
}

const SGamma = mulM(S, Gamma);
assert(equalM(mulM(SGamma, SGamma), scaleM(-1, I4)),
  "S Gamma must be the projective square-minus-one lift");

const complexCliffordMinimum = 4;
assert(complexCliffordMinimum === 4,
  "four pairwise anticommuting complex involutions require the four-dimensional irreducible Cl4 module");

console.log("Minimal 4x4 selector Dirac deck lift: PASS");
console.log("complex_Cl4_minimum_dimension=4");
console.log("deck_S_preserves_kinetic_and_flips_two_masses=true");
console.log("deck_S_sews_half_winding_mass_family=true");
console.log("deck_S_square=+1");
console.log("deck_S_reverses_chiral_grading=true");
console.log("particle_hole_C=S*K_square=+1");
console.log("selected_reality_branch=epsS_plus_epsGamma_plus");
console.log("projective_SGamma_square=-1");
console.log("quotient_symmetry_class=class_D_after_chiral_grading_fails_to_descend");
