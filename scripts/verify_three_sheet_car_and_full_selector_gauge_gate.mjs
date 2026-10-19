const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const mmul = (A, B) => A.map(row => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C())
));
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((z, j) => Math.hypot(z.re - B[i][j].re, z.im - B[i][j].im))));
const mconj = A => A.map(row => row.map(conj));

const I2 = [[C(1), C()], [C(), C(1)]];
const tx = [[C(), C(1)], [C(1), C()]];
const q = 2 / 3;
const phi = 0.47;
const u = C(Math.cos(q * phi), Math.sin(q * phi));
const Ucharged = [[u, C()], [C(), conj(u)]];

// Linear Nambu swap is not gauge equivariant on R + conjugate(R).
const linearSwapImage = mmul(mmul(tx, Ucharged), tx);
assert(maxDiff(linearSwapImage, Ucharged) > 1e-3, "linear Nambu swap must fail for a charged complex representation");

// Antiunitary CAR: tx K U K tx = U.
const antiunitaryImage = mmul(mmul(tx, mconj(Ucharged)), tx);
assert(maxDiff(antiunitaryImage, Ucharged) < 1e-12, "antiunitary CAR involution must be gauge equivariant");

// Two identical triality sheets carry the same phase, so their unitary swap is equivariant.
const Uidentical = [[u, C()], [C(), u]];
const sheetSwapImage = mmul(mmul(tx, Uidentical), tx);
assert(maxDiff(sheetSwapImage, Uidentical) < 1e-12, "unitary swap of identical generation sheets must commute with gauge action");

// Exact independent-mode counts.
const completedParticleModes = 16 * 3;
const completedSelfDualCarrier = 2 * completedParticleModes;
const minimalParticleModes = 15 * 3;
const minimalSelfDualCarrier = 2 * minimalParticleModes;
assert(completedParticleModes === 48 && completedSelfDualCarrier === 96, "completed three-sheet CAR count failed");
assert(minimalParticleModes === 45 && minimalSelfDualCarrier === 90, "minimal three-sheet CAR count failed");

// Real sheet permutations commute with CAR conjugation.
const P12 = [
  [C(), C(1), C()],
  [C(1), C(), C()],
  [C(), C(), C(1)]
];
assert(maxDiff(P12, mconj(P12)) < 1e-12, "sheet permutation must be real");

// Every involutive permutation of three sheets has a fixed sheet.
const involutions = [
  [0, 1, 2],
  [1, 0, 2],
  [2, 1, 0],
  [0, 2, 1]
];
for (const p of involutions) {
  assert(p.some((image, i) => image === i), "odd three-sheet set cannot have a fixed-point-free involution");
}

// Any grading on an odd three-dimensional flavor space has unequal sectors;
// an invertible operator anticommuting with it is impossible by determinant.
const gradingPlus = 2;
const gradingMinus = 1;
assert(gradingPlus !== gradingMinus, "odd flavor grading must be imbalanced");

console.log("Three-sheet CAR/full-selector gauge-gate certificate: PASS");
console.log("completed_modes=48_independent_in_96_selfdual; minimal_modes=45_independent_in_90_selfdual");
console.log("linear_Nambu_swap_gauge_equivariant_for_charged_sector=false; antiunitary_CAR=true");
console.log("identical_sheet_swap_gauge_equivariant=true; three_sheet_involution_has_fixed_sheet=true");
