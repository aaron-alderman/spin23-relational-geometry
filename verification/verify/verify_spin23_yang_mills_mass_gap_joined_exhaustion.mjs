import assert from "node:assert/strict";
import fs from "node:fs";

const load = (name) => JSON.parse(fs.readFileSync(new URL(`../../evidence/data/${name}`, import.meta.url), "utf8"));
const joined = load("spin23-yang-mills-mass-gap-joined-exhaustion.json");
const ym = load("spin23-ym-mass-gap-gate.json");
const gravity = load("spin23-sector-selective-mass-gap.json");
const bridge = load("spin23-compact-real-form-internal-unification-bridge.json");
const firewall = load("spin23-mass-gap-type-firewall.json");
const lt = load("spin23-lense-thirring-gravitomagnetic-gate.json");

assert.equal(joined.schema, "spin23.yang-mills-mass-gap-joined-exhaustion/1");
assert.equal(joined.inputs.length, 4);
assert.equal(joined.shortcutAudit.length, joined.finiteClosure.numberOfRejectedShortcuts);
assert.ok(joined.shortcutAudit.every((entry) => entry.admitted === false));
assert.equal(joined.survivingArms.length, joined.finiteClosure.numberOfSurvivingIrreducibleArms);

assert.ok(ym.status.includes("not a proof"));
assert.equal(bridge.realForms.compact.algebraDimension, joined.finiteClosure.compactAndSplitAlgebraDimension);
assert.equal(bridge.realForms.split.algebraDimension, joined.finiteClosure.compactAndSplitAlgebraDimension);
assert.deepEqual(bridge.realForms.compact.killingSignaturePositiveNegative, joined.finiteClosure.compactKillingSignature);
assert.deepEqual(bridge.realForms.split.killingSignaturePositiveNegative, joined.finiteClosure.splitKillingSignature);
assert.equal(bridge.decision.analyticContinuationProvesGap, false);
assert.equal(bridge.decision.branchingProvesConfinement, false);

assert.equal(gravity.infraredRequirement.masslessSpin2Helicities, joined.finiteClosure.masslessGravitonHelicities);
assert.equal(gravity.reducedProjectorWitness.expectedAtZeroMomentum.auxiliaryGapSquaredInEllUnits, joined.finiteClosure.minimumAuxiliaryMassSquaredInEllUnits);
assert.equal(lt.lageosWitness.lenseThirringMasPerYear, joined.finiteClosure.lageosLenseThirringMasPerYear);
assert.equal(firewall.gapTypes.filter((entry) => entry.notEnoughForClay).length, 5);

console.log("Spin(2,3) / Yang-Mills joined exhaustion: PASS");
console.log(`  rejected shortcuts: ${joined.shortcutAudit.length}`);
console.log(`  irreducible surviving arms: ${joined.survivingArms.length}`);
console.log(`  real-form signatures: compact (${joined.finiteClosure.compactKillingSignature}), split (${joined.finiteClosure.splitKillingSignature})`);
console.log(`  gravity target: ${joined.finiteClosure.masslessGravitonHelicities} massless helicities + auxiliary m^2 ell^2 >= ${joined.finiteClosure.minimumAuxiliaryMassSquaredInEllUnits}`);
console.log("  no finite or group-theoretic shortcut to the continuum Yang-Mills theorem remains admitted");
