import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/spin23-mass-gap-type-firewall.json", import.meta.url),
  "utf8"
));

assert.equal(evidence.schema, "spin23.mass-gap-type-firewall/1");
assert.equal(evidence.gapTypes.length, 6);
assert.equal(evidence.gapTypes.filter((entry) => entry.notEnoughForClay).length, 5);
assert.equal(evidence.promotionGate.length, 7);

const [[a, b], [, d]] = evidence.finiteWitness.hessian;
const hessianMin = (a + d - Math.sqrt((a - d) ** 2 + 4 * b ** 2)) / 2;
assert.ok(Math.abs(hessianMin - evidence.finiteWitness.hessianMinimumEigenvalue) < 1e-12);
assert.ok(hessianMin > 0);

const rates = evidence.finiteWitness.liouvillianRates;
const liouvillianGap = Math.min(...rates.filter((rate) => rate < 0).map((rate) => -rate));
assert.ok(Math.abs(liouvillianGap - evidence.finiteWitness.liouvillianGap) < 1e-12);

const [lambda0, lambda1] = evidence.finiteWitness.transferEigenvalues;
const transferGap = -Math.log(lambda1 / lambda0) / evidence.finiteWitness.timeSpacing;
assert.ok(Math.abs(transferGap - evidence.finiteWitness.finiteTransferGap) < 1e-12);

const C = (t) => Math.exp(-0.7 * t) + 0.3 * Math.exp(-1.8 * t);
const effectiveMass = (t) => Math.log(C(t) / C(t + 1));
assert.ok(Math.abs(effectiveMass(20) - evidence.finiteWitness.asymptoticEffectiveMass) < 1e-9);

// QWZ witness: d=(sin kx,sin ky,m+cos kx+cos ky), m=-1.
let minimumEnergy = Infinity;
const m = evidence.finiteWitness.qwzMassParameter;
for (let ix = 0; ix <= 200; ix += 1) {
  const kx = -Math.PI + 2 * Math.PI * ix / 200;
  for (let iy = 0; iy <= 200; iy += 1) {
    const ky = -Math.PI + 2 * Math.PI * iy / 200;
    const energy = Math.hypot(Math.sin(kx), Math.sin(ky), m + Math.cos(kx) + Math.cos(ky));
    minimumEnergy = Math.min(minimumEnergy, energy);
  }
}
assert.ok(Math.abs(minimumEnergy - evidence.finiteWitness.qwzMinimumAbsoluteEnergy) < 1e-12);

assert.ok(evidence.spin23Boundary.statement.includes("noncompact"));
assert.ok(evidence.spin23Boundary.allowedQuestion.includes("spin-2 sector remains massless"));

console.log("Spin(2,3) mass-gap type firewall: PASS");
console.log(`  finite Hessian gap: ${hessianMin.toFixed(6)}`);
console.log(`  topological-band |E| gap: ${minimumEnergy.toFixed(6)}`);
console.log(`  Liouvillian decay gap: ${liouvillianGap.toFixed(6)}`);
console.log(`  finite transfer gap: ${transferGap.toFixed(6)}`);
console.log(`  correlator effective mass at t=20: ${effectiveMass(20).toFixed(9)}`);
console.log("  none of these finite witnesses proves the continuum Yang-Mills mass gap");
