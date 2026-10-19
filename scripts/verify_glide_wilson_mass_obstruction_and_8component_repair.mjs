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
const paulis = [I2, sx, sy, sz];
const I4 = kron(I2, I2);
const Z4 = scaleM(0, I4);
const ax = kron(sx, I2);
const ay = kron(sy, I2);

const massBasis = [];
for (let a = 0; a < 4; a += 1) for (let b = 0; b < 4; b += 1) {
  const candidate = kron(paulis[a], paulis[b]);
  if (equalM(anticomm(candidate, ax), Z4) && equalM(anticomm(candidate, ay), Z4)) {
    massBasis.push({ a, b, candidate });
  }
}
assert(massBasis.length === 4 && massBasis.every(({ a }) => a === 3),
  "the full two-kinetic mass space must be sigma_z tensor M2");

const glide4 = ax;
for (const { candidate } of massBasis) {
  assert(equalM(mulM(mulM(glide4, candidate), glide4), scaleM(-1, candidate)),
    "every four-component mass must be glide odd");
}
const glideEvenMasses = massBasis.filter(({ candidate }) =>
  equalM(mulM(mulM(glide4, candidate), glide4), candidate));
assert(glideEvenMasses.length === 0, "no constant four-component Wilson mass may be glide even");

const classDMasses = massBasis.filter(({ candidate }) => {
  const transformed = mulM(mulM(ax, star(candidate)), ax);
  return equalM(transformed, scaleM(-1, candidate));
});
assert(classDMasses.length === 3 && classDMasses.every(({ b }) => b !== 2),
  "class-D reality must retain exactly the three real second-factor masses");

const tax = kron(ax, I2);
const tay = kron(ay, I2);
const glide8 = kron(ax, sx);
const MW8 = kron(kron(sz, I2), sz);
const beta1_8 = kron(kron(sz, sx), I2);
const beta2_8 = kron(kron(sz, sz), I2);
const I8 = kron(I4, I2);
const Z8 = scaleM(0, I8);
assert(equalM(anticomm(MW8, tax), Z8) && equalM(anticomm(MW8, tay), Z8),
  "extended Wilson mass must anticommute with both kinetics");
assert(equalM(mulM(mulM(glide8, MW8), dagger(glide8)), MW8),
  "two deck sign reversals must make the extended Wilson mass glide even");
assert(equalM(mulM(mulM(glide8, beta1_8), dagger(glide8)), scaleM(-1, beta1_8)) &&
  equalM(mulM(mulM(glide8, beta2_8), dagger(glide8)), scaleM(-1, beta2_8)),
  "physical mass pair must remain glide odd");
assert(equalM(mulM(glide8, glide8), I8), "extended deck lift must square to plus one");

const C8unitary = kron(ax, I2);
const transformedMW = mulM(mulM(C8unitary, star(MW8)), dagger(C8unitary));
assert(equalM(transformedMW, scaleM(-1, MW8)),
  "extended Wilson mass must satisfy class-D particle-hole oddness");

console.log("Glide Wilson-mass obstruction and 8-component repair: PASS");
console.log("four_component_two_kinetic_mass_dimension=4");
console.log("four_component_constant_glide_even_Wilson_masses=0");
console.log("four_component_class_D_candidate_masses=3_all_glide_odd");
console.log("minimal_exchanged_regulator_pair_dimension=8");
console.log("extended_Wilson_mass_glide_even_and_particle_hole_odd=true");
console.log("physical_quotient_species_count=requires_spectral_check");
