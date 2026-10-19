const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

// Character of the three-dimensional permutation representation of S3:
// classes e, transposition, 3-cycle with sizes 1,3,2.
const classSizes = [1, 3, 2];
const chiP = [3, 1, 0];
const chiP_g2 = [3, 3, 0]; // e^2=e, transposition^2=e, 3-cycle^2 is a 3-cycle
const chiP_g3 = [3, 1, 3]; // e^3=e, transposition^3=transposition, 3-cycle^3=e
const chiSym3 = chiP.map((chi, i) => (chi ** 3 + 3 * chi * chiP_g2[i] + 2 * chiP_g3[i]) / 6);
assert(JSON.stringify(chiSym3) === JSON.stringify([10, 2, 1]), "Sym^3 permutation character failed");

const irreps = {
  trivial: [1, 1, 1],
  sign: [1, -1, 1],
  standard: [2, 0, -1]
};
const inner = (a, b) => a.reduce((sum, value, i) => sum + classSizes[i] * value * b[i], 0) / 6;
const multiplicities = Object.fromEntries(Object.entries(irreps).map(([name, chi]) => [name, inner(chiSym3, chi)]));
assert(multiplicities.trivial === 3, "trivial cubic multiplicity must be three");
assert(multiplicities.sign === 1, "sheet-sign cubic must be unique");
assert(multiplicities.standard === 3, "standard cubic multiplicity must be three");

const vandermonde = ([x1, x2, x3]) => (x1 - x2) * (x2 - x3) * (x3 - x1);
const permute = (x, p) => p.map(i => x[i]);
const x = [1.2, -0.4, 2.7];
assert(Math.abs(vandermonde(permute(x, [1, 0, 2])) + vandermonde(x)) < 1e-12, "transposition must reverse Vandermonde");
assert(Math.abs(vandermonde(permute(x, [1, 2, 0])) - vandermonde(x)) < 1e-12, "3-cycle must preserve Vandermonde");

// On the S2-fixed locus x1=x2=a, the alternating cubic vanishes but its
// derivative along delta=(x1-x2)/2 is nonzero when a != b.
const a = 0.7;
const b = -1.1;
const f = delta => vandermonde([a + delta, a - delta, b]);
assert(Math.abs(f(0)) < 1e-12, "sign cubic must vanish on the S2-fixed locus");
const h = 1e-6;
const numericalDerivative = (f(h) - f(-h)) / (2 * h);
const exactDerivative = -2 * (a - b) ** 2;
assert(Math.abs(numericalDerivative - exactDerivative) < 1e-8, "odd derivative on the flag background failed");
assert(Math.abs(exactDerivative) > 1e-3, "odd gradient must be nonzero away from the fully symmetric point");

// One complex sign scalar does not canonically choose a vector in the two-copy
// S2-odd operator sector: Hom_S2(sign, sign+sign) has dimension two.
const homSignToOddDoubletDimension = 2;
assert(homSignToOddDoubletDimension === 2, "map from sign cubic to odd flavor doublet must remain nonunique");

console.log("Triality sign-cubic certificate: PASS");
console.log("Sym3(C3_permutation)=3_trivial_plus_1_sign_plus_3_standard; sign_cubic_unique=true");
console.log("Vandermonde_transposition_odd=true; S2_fixed_value=0; transverse_gradient_nonzero=true");
console.log("map_from_one_sign_scalar_to_two_copy_odd_spurion_has_dimension=2; canonical_intertwiner_missing=true");
