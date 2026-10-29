import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-passive-loss-holonomy-boundary-v1.json",
  import.meta.url,
), "utf8"));
const tolerance = 1e-12;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function add(a, b) {
  return { re: a.re + b.re, im: a.im + b.im };
}

function multiply(a, b) {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

function conjugate(a) {
  return { re: a.re, im: -a.im };
}

function magnitudeSquared(a) {
  return a.re ** 2 + a.im ** 2;
}

const r = evidence.unitaryDilationWitness.contractionMagnitude;
const theta = evidence.unitaryDilationWitness.phase;
const a = { re: r * Math.cos(theta), im: r * Math.sin(theta) };
const b = Math.sqrt(1 - r * r);
assert(Math.abs(b - evidence.unitaryDilationWitness.bathCoupling) < tolerance,
  "bath coupling mismatch");

const U = [
  [a, { re: b, im: 0 }],
  [{ re: b, im: 0 }, { re: -a.re, im: a.im }],
];
for (let i = 0; i < 2; i += 1) {
  for (let j = 0; j < 2; j += 1) {
    let inner = { re: 0, im: 0 };
    for (let k = 0; k < 2; k += 1) inner = add(inner, multiply(conjugate(U[k][i]), U[k][j]));
    assert(Math.abs(inner.re - (i === j ? 1 : 0)) < tolerance && Math.abs(inner.im) < tolerance,
      "dilation matrix is not unitary");
  }
}
assert(Math.abs(magnitudeSquared(a) + b * b - 1) < tolerance, "one-step norm ledger fails");

const retainedBathTwoStep = add(multiply(a, a), { re: b * b, im: 0 });
const resetBathTwoStep = multiply(a, a);
assert(Math.abs(retainedBathTwoStep.re - resetBathTwoStep.re - b * b) < tolerance,
  "finite-bath return term mismatch");

const g = evidence.passiveExceptionalWitness.coupling;
const [gamma1, gamma2] = evidence.passiveExceptionalWitness.losses;
const discriminant = g * g - (gamma1 - gamma2) ** 2 / 16;
assert(Math.abs(discriminant) < tolerance, "passive witness is not at an exceptional point");
const eigenvalue = { re: 0, im: -(gamma1 + gamma2) / 4 };
assert(Math.abs(eigenvalue.re - evidence.passiveExceptionalWitness.coalescedEigenvalue[0]) < tolerance &&
  Math.abs(eigenvalue.im - evidence.passiveExceptionalWitness.coalescedEigenvalue[1]) < tolerance,
  "coalesced eigenvalue mismatch");

// K-lambda I is nonzero but rank one at the exceptional point.
const defectRows = [
  [{ re: -eigenvalue.re, im: -gamma1 / 2 - eigenvalue.im }, { re: g, im: 0 }],
  [{ re: g, im: 0 }, { re: -eigenvalue.re, im: -gamma2 / 2 - eigenvalue.im }],
];
const rowNorm = defectRows.flat().reduce((sum, value) => sum + magnitudeSquared(value), 0);
const determinant = add(multiply(defectRows[0][0], defectRows[1][1]), multiply({ re: -1, im: 0 }, multiply(defectRows[0][1], defectRows[1][0])));
assert(rowNorm > tolerance, "exceptional matrix cannot be zero");
assert(magnitudeSquared(determinant) < tolerance, "exceptional matrix must be rank deficient");

console.log(JSON.stringify({
  status: "PASS",
  unitaryDilation: true,
  oneStepRetainedNorm: magnitudeSquared(a),
  oneStepBathNorm: b * b,
  finiteBathReturnTerm: b * b,
  passiveExceptionalPoint: { g, gamma1, gamma2, eigenvalue },
  verdict: "A contraction has an exact one-step unitary dilation, a retained finite bath returns amplitude, and purely passive differential loss reaches a defective exceptional point.",
}, null, 2));
