import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-port-and-bath-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-port-and-bath-v1");
assert.ok(record.dissipativePort.identityResidual<1e-12);
assert.ok(record.dissipativePort.sampleBalanceResidual<1e-12);
assert.ok(record.finiteBathDilation.conservativeResidual<1e-12);
assert.ok(record.finiteBathDilation.recurrenceResidual<1e-12);
assert.ok(record.finiteBathDilation.stateAtPi.slice(0,2).every(value=>Math.abs(value)<1e-12));
assert.ok(Math.abs(record.finiteBathDilation.energyInitial-record.finiteBathDilation.energyAtPi)<1e-12);
assert.ok(Math.abs(record.finiteBathDilation.energyInitial-record.finiteBathDilation.energyAtTwoPi)<1e-12);
assert.match(record.irreversibilityBoundary.exactMarkovianLoss,/infinite\/continuous bath/);
assert.match(record.verdict,/independent admissibility coordinate/);

console.log(JSON.stringify({
  status:"PASS",
  port:"damped energy loss equals declared output power",
  dilation:"finite positive bath conserves total energy",
  recurrence:"complete transfer at pi returns at 2pi",
  boundary:"exact irreversible damping needs a bath limit or coarse graining",
}));

