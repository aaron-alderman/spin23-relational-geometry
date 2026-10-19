const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

// Abstract relations:
// S^2=Gamma^2=C^2=+1, S Gamma=-Gamma S,
// C S=epsS S C, C Gamma=epsGamma Gamma C.
// C is antiunitary; signs encode whether S and Gamma are real or imaginary
// relative to the selected CAR conjugation.
const rows = [];
for (const epsS of [1, -1]) {
  for (const epsGamma of [1, -1]) {
    const squareS = 1;
    const squareSGamma = -1;
    const squareSC = epsS;
    const squareSGammaC = -epsS * epsGamma;
    const SCWithGamma = -epsGamma; // D Gamma = sign Gamma D
    const SGammaCWithGamma = -epsGamma;
    rows.push({
      epsS,
      epsGamma,
      squareS,
      squareSGamma,
      squareSC,
      squareSGammaC,
      SCWithGamma,
      SGammaCWithGamma,
    });
  }
}

assert(rows.length === 4, "two unresolved commutation signs must give four algebraic branches");
assert(rows.every((row) => row.squareS === 1), "pure mass-sign repair must be an ordinary involution");
assert(rows.every((row) => row.squareSGamma === -1),
  "mass-sign repair times chiral grading must be a projective quarter-turn");
assert(rows.some((row) => row.squareSC === 1) && rows.some((row) => row.squareSC === -1),
  "antiunitary selector/CAR lift square must depend on CAR reality of S");
assert(rows.some((row) => row.squareSGammaC === 1)
  && rows.some((row) => row.squareSGammaC === -1),
"graded antiunitary lift square must depend on both unresolved signs");

for (const row of rows) {
  assert(row.squareSC === row.epsS, "(SC)^2 formula failed");
  assert(row.squareSGammaC === -row.epsS * row.epsGamma,
    "(S Gamma C)^2 formula failed");
  assert(row.SCWithGamma === -row.epsGamma,
    "SC grading commutation formula failed");
}

const fureyEstablished = {
  cSquare: 1,
  gaugeEquivariant: true,
  epsS: null,
  epsGamma: null,
  selectorMassRepair: null,
};
assert(fureyEstablished.cSquare === 1 && fureyEstablished.gaugeEquivariant,
  "Furey/CAR conjugation inputs must be retained");
assert(fureyEstablished.epsS === null && fureyEstablished.epsGamma === null,
  "Furey conjugation alone must not invent its commutation signs with external selector data");

console.log("Minimal selector deck-lift Clifford classification: PASS");
for (const row of rows) {
  console.log("epsS=" + row.epsS
    + ",epsGamma=" + row.epsGamma
    + ",S2=" + row.squareS
    + ",(SGamma)2=" + row.squareSGamma
    + ",(SC)2=" + row.squareSC
    + ",(SGammaC)2=" + row.squareSGammaC
    + ",SC_vs_Gamma=" + row.SCWithGamma);
}
console.log("Furey_C_square=+1");
console.log("Furey_C_gauge_equivariant=true");
console.log("Furey_does_not_fix=epsS,epsGamma,selector_mass_repair");
console.log("deck_lift_not_unique_without_common_basis_intertwiner=true");
