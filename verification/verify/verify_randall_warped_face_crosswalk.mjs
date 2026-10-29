import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ledgerPath = path.join(root, "evidence", "data", "randall-warped-face-crosswalk-v1.json");
const claimPath = path.join(root, "corpus", "claims", "1700-1799", "1795_karch_randall_realizes_a_spin23_face_inside_spin24_but_not_the_jordan_carrier_map.md");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
const claim = fs.readFileSync(claimPath, "utf8");

assert.equal(ledger.schema, "randall-warped-face-crosswalk/v1");
assert.equal(ledger.promptCorrection.distinctions.length, 3);
assert.equal(ledger.researchGates.length, 5);
assert(ledger.primarySources.length >= 8);
assert.equal(ledger.exactPlacement.face, "AdS4");
assert.equal(ledger.exactPlacement.ambient, "AdS5");

const expectedKL = 16 * Math.log(10);
assert(Math.abs(ledger.hierarchyWitness.kL - expectedKL) < 1e-12);
assert(Math.abs(Math.exp(-expectedKL) - ledger.hierarchyWitness.targetWarp) < 1e-28);
assert(Math.abs(Math.exp(-2 * expectedKL) - ledger.hierarchyWitness.squaredWarp) < 1e-44);

assert(claim.includes("Spin_0(2,3)\\subset Spin_0(2,4)"));
assert(/does \*\*not\*\* identify/i.test(claim));
assert(/carrier gate/i.test(claim));
assert(/detector gate/i.test(claim));

console.log("PASS Randall warped-face crosswalk");
console.log("kL=" + expectedKL.toFixed(6) + " sources=" + ledger.primarySources.length + " gates=" + ledger.researchGates.length);
