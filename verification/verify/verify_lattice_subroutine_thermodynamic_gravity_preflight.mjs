import assert from "node:assert/strict";

const centralCharge = 24;
const coefficients = [
  { grade: 1, degeneracy: 196884 },
  { grade: 2, degeneracy: 21493760 },
  { grade: 3, degeneracy: 864299970 }
];
const cardyEntropy = (grade) => 2 * Math.PI * Math.sqrt(centralCharge * grade / 6);

const comparison = coefficients.map(({ grade, degeneracy }) => {
  const exactEntropy = Math.log(degeneracy);
  const asymptoticEntropy = cardyEntropy(grade);
  return {
    grade,
    degeneracy,
    logDegeneracy: exactEntropy,
    cardyEntropy: asymptoticEntropy,
    ratio: exactEntropy / asymptoticEntropy
  };
});

assert.equal(2 * Math.PI * Math.sqrt(centralCharge / 6), 4 * Math.PI);
assert.ok(comparison.every((x) => x.logDegeneracy > 0));
assert.ok(comparison.every((x) => x.ratio < 1));

// If one imposes S=A/(4G), the character only defines A/G, not A and G.
const inferredAreaOverG = comparison.map((x) => 4 * x.logDegeneracy);
assert.ok(inferredAreaOverG.every((x) => x > 0));

console.log(JSON.stringify({
  characterData: {
    centralCharge,
    asymptoticLaw: "log d(n) ~ 2 pi sqrt(c n/6) = 4 pi sqrt(n)",
    comparison
  },
  imposedBekensteinMap: {
    equation: "S(n)=A(n)/(4G)",
    inferredOnly: "A(n)/G = 4 log d(n)",
    areaOverGAtDisplayedGrades: inferredAreaOverG,
    doesNotDetermine: ["geometric area", "Newton constant", "subregion", "causal horizon"]
  },
  missingForEinsteinEquation: [
    "local subregion algebra or factorization",
    "vacuum entanglement rather than global level degeneracy",
    "geometric area functional",
    "local causal diamonds or Rindler horizons",
    "first-law or Clausius relation for every local null direction",
    "universal entropy density fixing G"
  ],
  conclusion: "Monster/Cardy counting supplies global microcanonical entropy by conformal grade. It does not supply the local geometric area law required by thermodynamic derivations of Einstein's equation."
}, null, 2));
console.log("PASS verify_lattice_subroutine_thermodynamic_gravity_preflight");

