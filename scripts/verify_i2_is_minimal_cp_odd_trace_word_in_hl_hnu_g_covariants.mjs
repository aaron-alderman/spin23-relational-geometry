const letters = [
  { name: "A=H_l", symbol: "A", dimension: 2 },
  { name: "B=H_nu", symbol: "B", dimension: 2 },
  { name: "G=G_lnu", symbol: "G", dimension: 4 },
];
const rotations = (w) => Array.from({ length: w.length }, (_, i) => w.slice(i) + w.slice(0, i));
const canonical = (w) => rotations(w).sort()[0];
const reverse = (w) => [...w].reverse().join("");
const dim = (w) => [...w].reduce((s, x) => s + letters.find((q) => q.symbol === x).dimension, 0);

const words = new Set();
const grow = (prefix) => {
  if (prefix && dim(prefix) <= 8) words.add(canonical(prefix));
  if (dim(prefix) >= 8) return;
  for (const q of letters) if (dim(prefix) + q.dimension <= 8) grow(prefix + q.symbol);
};
grow("");

const necklaces = [...words].sort((a, b) => dim(a) - dim(b) || a.localeCompare(b)).map((word) => ({
  word,
  dimension: dim(word),
  reverse: reverse(word),
  reverseCyclicallyEquivalent: rotations(word).includes(reverse(word)),
}));
const reversalAsymmetric = necklaces.filter((x) => !x.reverseCyclicallyEquivalent);
const belowEight = reversalAsymmetric.filter((x) => x.dimension < 8);
const atEight = reversalAsymmetric.filter((x) => x.dimension === 8);

const knownDegrees = {
  I1_commutatorCube: 12,
  I2_ImTr_ABG: 8,
  I3_commutator_GA_cube: 18,
  Ihat2_ImTr_A_B2_G: 10,
  Ihat3_ImTr_A_B2_G_B: 12,
  Ihat4_ImDet_G_plus_AB: 12,
};

const result = {
  protocol: "minimal-cp-odd-trace-word-hl-hnu-g/1",
  generators: letters,
  theoremScope: "cyclic single-trace polynomials with real coefficients in Hermitian covariants H_l,H_nu,G_lnu, through weighted mass dimension eight",
  necklaceCount: necklaces.length,
  reversalAsymmetricBelowDimensionEight: belowEight,
  reversalAsymmetricAtDimensionEight: atEight,
  minimalRepresentative: "ABG = H_l H_nu G_lnu",
  reason: "For Hermitian factors, conjugating Tr(word) gives Tr(reverse(word)); cyclic equivalence to the reverse forces a real trace.",
  knownInvariantMassDimensions: knownDegrees,
  boundary: "This does not classify invariants using additional covariants, epsilon tensors, inverse matrices, normalized spectral projectors or nonpolynomial functions.",
};
result.passed =
  belowEight.length === 0 &&
  atEight.some((x) => x.word === canonical("ABG")) &&
  knownDegrees.I2_ImTr_ABG === 8 &&
  Object.entries(knownDegrees).filter(([k]) => k !== "I2_ImTr_ABG").every(([, d]) => d > 8);

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
