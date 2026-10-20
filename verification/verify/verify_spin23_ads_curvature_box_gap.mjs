import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/spin23-ads-curvature-box-gap.json", import.meta.url),
  "utf8"
));

assert.equal(evidence.schema, "spin23.ads-curvature-box-gap/1");
const scalarDelta = 3 / 2 + Math.sqrt(9 / 4 + evidence.finiteWitness.scalarMassSquaredEllSquared);
assert.equal(scalarDelta, evidence.ads4.masslessScalarDelta);
for (const mode of evidence.finiteWitness.modes) {
  const omegaEll = scalarDelta + mode.l + 2 * mode.n;
  assert.equal(omegaEll, mode.omegaEll);
  assert.ok(Math.abs(mode.omega - omegaEll / evidence.finiteWitness.ell) < 1e-12);
}
assert.equal(evidence.finiteWitness.radialSpacing, 2 / evidence.finiteWitness.ell);
assert.equal(evidence.finiteWitness.angularSpacing, 1 / evidence.finiteWitness.ell);

const flatEnergies = evidence.flatLimit.ellValues.map((ell) => evidence.ads4.masslessSpin2LowestEnergyInEllUnits / ell);
assert.deepEqual(flatEnergies, evidence.flatLimit.lowestMasslessEnergy);
assert.ok(flatEnergies.every((energy, index) => index === 0 || energy < flatEnergies[index - 1]));
assert.equal(evidence.flatLimit.limit, 0);
assert.ok(evidence.gapFirewall.notYangMillsGap.includes("R4"));
assert.ok(evidence.gapFirewall.notGravitonMass.includes("two helicities"));

console.log("Spin(2,3) AdS curvature/box gap: PASS");
console.log(`  massless scalar Delta: ${scalarDelta}`);
console.log(`  global lowest scalar and spin-2 energy: 3/ell`);
console.log(`  witness ell=${evidence.finiteWitness.ell}: omega0=${evidence.finiteWitness.modes[0].omega}`);
console.log(`  flat-limit sequence: ${flatEnergies.join(", ")} -> 0`);
console.log("  curvature level spacing is neither the Yang-Mills gap nor a graviton mass");
