import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/spin23-holographic-hard-wall-gap.json", import.meta.url),
  "utf8"
));

assert.equal(evidence.schema, "spin23.holographic-hard-wall-gap/1");

const factorial = (n) => {
  let result = 1;
  for (let k = 2; k <= n; k += 1) result *= k;
  return result;
};
const besselJ2 = (x) => {
  let sum = 0;
  for (let k = 0; k < 80; k += 1) {
    sum += (-1) ** k * (x / 2) ** (2 * k + 2) / (factorial(k) * factorial(k + 2));
  }
  return sum;
};

for (const zero of evidence.hardWall.besselJ2Zeros) {
  assert.ok(Math.abs(besselJ2(zero)) < 1e-9);
}
const masses = evidence.hardWall.besselJ2Zeros.map((zero) => zero * evidence.hardWall.z0InverseGeV);
for (let i = 0; i < masses.length; i += 1) {
  assert.ok(Math.abs(masses[i] - evidence.hardWall.massesGeV[i]) < 1e-12);
}
assert.ok(Math.abs(masses[1] / masses[0] - evidence.hardWall.massRatioSecondToFirst) < 1e-12);

const sensitivity = evidence.sensitivity.z0InverseGeVValues.map((inverseWall) => evidence.hardWall.besselJ2Zeros[0] * inverseWall);
for (let i = 0; i < sensitivity.length; i += 1) {
  assert.ok(Math.abs(sensitivity[i] - evidence.sensitivity.lightestMassGeV[i]) < 1e-12);
}
assert.equal(evidence.sensitivity.logDerivative, 1);
assert.equal(evidence.transportAudit.missing.length, 5);
assert.ok(evidence.spin23Boundary.bulkGroupMismatch.includes("SO(2,4)"));

console.log("Spin(2,3) holographic hard-wall gap: PASS");
console.log(`  J2 zeros: ${evidence.hardWall.besselJ2Zeros.map((x) => x.toFixed(6)).join(", ")}`);
console.log(`  z0^-1=${evidence.hardWall.z0InverseGeV} GeV masses: ${masses.map((x) => x.toFixed(6)).join(", ")} GeV`);
console.log(`  m2/m1=${(masses[1] / masses[0]).toFixed(6)}`);
console.log("  gap tracks the imposed wall exactly; boundary Yang-Mills construction remains unproved");
