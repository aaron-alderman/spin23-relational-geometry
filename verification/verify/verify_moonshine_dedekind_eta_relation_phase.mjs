import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const eta = load("../../evidence/data/moonshine-dedekind-eta-relation-phase-v1.json");
const relation = load("../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json");
const seam = load("../../evidence/data/moonshine-relation-defect-seam-permutation-v1.json");

const gcd = (a0, b0) => {
  let a = a0 < 0n ? -a0 : a0;
  let b = b0 < 0n ? -b0 : b0;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
};
const reduceFraction = (numerator, denominator) => {
  const divisor = gcd(numerator, denominator);
  return [numerator / divisor, denominator / divisor];
};
const addFractions = ([a, b], [c, d]) => reduceFraction(a * d + c * b, b * d);
const negateFraction = ([a, b]) => [-a, b];
const parseFraction = (value) => {
  const [numerator, denominator = "1"] = value.split("/");
  return [BigInt(numerator), BigInt(denominator)];
};
const dedekindSum = (d0, c) => {
  const d = ((d0 % c) + c) % c;
  let numerator = 0n;
  const denominator = 4n * c * c;
  for (let k = 1n; k < c; k += 1n) {
    const residue = (d * k) % c;
    numerator += (2n * k - c) * (2n * residue - c);
  }
  return reduceFraction(numerator, denominator);
};

const R = eta.R.matrix;
const [a, , c, d] = [R[0][0], R[0][1], R[1][0], R[1][1]].map(BigInt);
assert.equal(a * d - BigInt(R[0][1]) * c, 1n);
assert.deepEqual(dedekindSum(d, c), parseFraction(eta.R.dedekindSum.value));

const exponent = addFractions(
  addFractions([a + d, 12n * c], negateFraction(parseFraction(eta.R.dedekindSum.value))),
  negateFraction(parseFraction(eta.R.quarterCorrection)),
);
assert.deepEqual(exponent, [0n, 1n]);
assert.equal(eta.R.phaseExponentModulo24, 0);

const addExponent = (...values) => ((values.reduce((sum, value) => sum + value, 0) % 24) + 24) % 24;
const sExponent = eta.S.phaseExponentModulo24;
assert.equal(sExponent, 3);
assert.equal(addExponent(2 * sExponent), eta.centralPhases.liftedBaseMinusI.phaseExponentModulo24);
assert.equal(addExponent(4 * sExponent), eta.centralPhases.metaplecticKernel.phaseExponentModulo24);
assert.equal(addExponent(2 * sExponent, -11 * eta.R.phaseExponentModulo24), eta.relationDefect.phaseExponentModulo24);

assert.equal(eta.classification.finiteC4CharacterGenuine, false);
assert.equal(relation.metaplecticNoGo.proposedC4CharacterGenuine, false);
assert.equal(eta.classification.genuineScalarEtaLineExists, true);
assert.equal(eta.classification.genuineEtaLineMatchesFiniteC4Values, false);
assert.equal(eta.relationDefect.phase, "i");
assert.deepEqual(eta.classification.level2PermutationCycleType, seam.cycleType);
assert.equal(eta.classification.fullOperatorRequired, seam.operatorTarget.form);

console.log(JSON.stringify({
  dedekindSum: eta.R.dedekindSum.value,
  etaPhases: {
    R: eta.R.phase,
    S: eta.S.phase,
    liftedBaseMinusI: eta.centralPhases.liftedBaseMinusI.phase,
    metaplecticKernel: eta.centralPhases.metaplecticKernel.phase,
    relationDefectK: eta.relationDefect.phase,
  },
  finiteC4Promotion: "ruled out",
  genuineScalarEtaLine: "survives",
  next: eta.nextTest,
}, null, 2));
console.log("PASS verify_moonshine_dedekind_eta_relation_phase");
