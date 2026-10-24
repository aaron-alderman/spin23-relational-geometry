import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/hydrodynamic-pole-residue-response-ledger-v1.json"), "utf8"));

assert.equal(data.protocol, "hydrodynamic-pole-residue-response-ledger/1");
assert.equal(data.target, "OT-016");
assert.equal(data.responseAtPoint.positiveDefinite, true);
assert.equal(data.responseAtPoint.rank, 2);
assert.ok(data.responseAtPoint.determinant > 0);
assert.equal(data.poleLedger.allPolesRetarded, true);
assert.equal(data.poleLedger.underdampedSound, true);
assert.ok(data.poleLedger.shear.residue.im > 0);
assert.ok(data.poleLedger.sound.every(entry => entry.pole.im < 0 && Math.hypot(entry.residue.re, entry.residue.im) > 0));
assert.equal(data.kms.rankPreserved, true);
assert.equal(data.kms.determinantScaleCheck, true);
assert.equal(data.invariance.portBasis.rankPreserved, true);
assert.equal(data.invariance.portBasis.determinantCongruenceCheck, true);
assert.equal(data.invariance.realContact.unchanged, true);
assert.equal(data.invariance.hydrodynamicFrame.certified, false);
assert.equal(data.decision.frequencyWavevectorResponseConstructed, true);
assert.equal(data.decision.poleAndResidueLedgerConstructed, true);
assert.equal(data.decision.kmsNoiseConstructed, true);
assert.equal(data.decision.fullOt016Closure, false);
assert.equal(data.decision.generatedSpin23DynamicsEstablished, false);
assert.equal(data.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  determinant: data.responseAtPoint.determinant,
  shearPole: data.poleLedger.shear.pole,
  soundPoles: data.poleLedger.sound.map(entry => entry.pole),
  kmsRankPreserved: true,
  nuisanceInvariants: ["invertible port congruence", "real analytic contact"],
  boundary: "effective ledger closed; hydrodynamic-frame and microscopic matching open"
}, null, 2));
