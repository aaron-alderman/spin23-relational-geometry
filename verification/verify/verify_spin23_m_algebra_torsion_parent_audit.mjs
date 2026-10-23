#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-m_algebra_torsion_parent_audit-v1.json", root,
), "utf8"));

assert.equal(data.parent.dimension, 11);
assert.equal(data.parent.localSupersymmetry, true);
assert.equal(data.parent.sameAsCremmerJuliaScherkSupergravity, false);
assert.equal(data.connectionContent.independentLorentzConnection, true);
assert.equal(data.vacuumAudit.genericVacuaDegenerate, true);
assert.equal(data.vacuumAudit.genericVacuaHavePropagatingDegreesOfFreedom, false);
assert.equal(data.vacuumAudit.nontrivialGravitonPropagatorOnlyAtD, 4);
assert.equal(data.vacuumAudit.fourDimensionalCosmologicalSign, "positive");
assert.equal(data.targetAudit.backgroundSignMatches, false);
assert.equal(data.targetAudit.propagatingAxialZeroMinusConnectionPoleDerived, false);
assert.equal(data.targetAudit.healthyPoleResidueAndMassDerived, false);
assert.equal(data.targetAudit.observedFermionMatterSectorPresent, false);
assert.equal(data.targetAudit.normalizedAxialCurrentMapPresent, false);
assert.equal(data.targetAudit.oneEighthSelected, false);
assert.deepEqual(Object.values(data.gateVector), [true, true, false, false]);
assert.ok(data.requiredNewInput.length >= 5);

console.log("Spin(2,3) M-algebra torsion-parent audit: PASS");
console.log("  local supersymmetry and independent Lorentz connection: present");
console.log("  generic vacuum propagation: absent");
console.log("  special dynamical reduction: de Sitter GR, not the target axial torsion pole");
