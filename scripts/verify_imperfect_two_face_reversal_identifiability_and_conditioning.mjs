import assert from "node:assert/strict";

const baseInformation = 0.12982650378676153;

function eigenvalues2x2(a, b, c) {
  const trace = a + c;
  const gap = Math.sqrt((a - c) ** 2 + 4 * b ** 2);
  return [(trace + gap) / 2, (trace - gap) / 2];
}

function analyze(kappa, exposurePlus = 1, exposureMinus = 1) {
  const a = baseInformation * (exposurePlus + exposureMinus);
  const b = baseInformation * (exposurePlus - kappa * exposureMinus);
  const c = baseInformation * (exposurePlus + kappa ** 2 * exposureMinus);
  const determinant = a * c - b ** 2;
  const determinantClosed = baseInformation ** 2 * exposurePlus * exposureMinus * (1 + kappa) ** 2;
  const efficient = a - b ** 2 / c;
  const efficientClosed = baseInformation * exposurePlus * exposureMinus * (1 + kappa) ** 2 /
    (exposurePlus + kappa ** 2 * exposureMinus);
  const [largest, smallest] = eigenvalues2x2(a, b, c);
  return {
    kappa,
    fisherMatrix: [[a, b], [b, c]],
    determinant,
    determinantClosed,
    eigenvalues: [largest, smallest],
    conditionNumber: smallest > 1e-15 ? largest / smallest : null,
    efficientInformation: efficient,
    efficientClosed,
    retainedFractionOfRawCp: efficient / a
  };
}

const sweep = [-1, -0.9, -0.5, 0, 0.5, 1].map(kappa => analyze(kappa));

for (const result of sweep) {
  assert.ok(Math.abs(result.determinant - result.determinantClosed) < 1e-14);
  assert.ok(Math.abs(result.efficientInformation - result.efficientClosed) < 1e-14);
}
assert.ok(Math.abs(sweep[0].determinant) < 1e-14);
assert.equal(sweep[0].conditionNumber, null);
assert.ok(sweep[1].conditionNumber > 1000);
assert.ok(Math.abs(sweep.at(-1).retainedFractionOfRawCp - 1) < 1e-14);

console.log(JSON.stringify({
  protocol: "imperfect-two-face-reversal/1",
  scorePattern: {
    channelPlus: "(s_CP,s_A)=(g,g)",
    channelMinus: "(s_CP,s_A)=(g,-kappa g)"
  },
  sweep,
  determinantTheorem: "det I = I_g^2 L_+ L_- (1+kappa)^2",
  efficientInformationTheorem: "I_eff = I_g L_+ L_- (1+kappa)^2/(L_+ + kappa^2 L_-)",
  singularBoundary: "kappa=-1 makes the two channel score rows identical and restores exact degeneracy.",
  calibrationLesson: "Positive determinant is not enough: near kappa=-1 the condition number diverges and small sign-model errors dominate the weakly identified direction.",
  physicalBoundary: "kappa must come from calibrated observed score transformations, not a nominal hardware reversal label.",
  passed: true
}, null, 2));
