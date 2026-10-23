#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-n8_omega_deformation_axial_selector_audit-v1.json", root,
), "utf8"));

const m = data.masslessMultiplet;
const bosonic = 2 * m.gravitons + 2 * m.vectors + m.realScalars;
const fermionic = 2 * m.gravitini + 2 * m.spinOneHalfFermions;
assert.equal(bosonic, 128);
assert.equal(fermionic, 128);
assert.equal(bosonic, m.bosonicOnShellDegreesOfFreedom);
assert.equal(fermionic, m.fermionicOnShellDegreesOfFreedom);

const omegas = data.deformationWitnesses.map((witness) => witness.omegaOverPi);
assert.ok(new Set(omegas).size >= 3);
assert.ok(data.deformationWitnesses.every((witness) => witness.sameQuadraticSpectrum));
assert.equal(data.theory.inequivalentFamily, true);
assert.equal(data.maximallySymmetricVacuum.sameQuadraticSpectrumAcrossFamily, true);
assert.ok(data.maximallySymmetricVacuum.omegaDependentBeyondQuadraticOrder.length >= 3);
assert.equal(data.truncationWitness.scalarPotentialCanBeOmegaIndependent, true);
assert.equal(data.truncationWitness.gaugeKineticAndFermionCouplingsRetainOmega, true);
assert.equal(data.targetAudit.maximalSupersymmetrySelectsOmega, false);
assert.equal(data.targetAudit.quadraticSpectrumSelectsInteractions, false);
assert.equal(data.targetAudit.pseudoscalarAutomaticallyIdentifiedWithIndependentPgtTorsion, false);
assert.equal(data.targetAudit.etaMapPresent, false);
assert.equal(data.targetAudit.oneEighthSelected, false);
assert.ok(data.targetAudit.missing.length >= 5);

console.log("Spin(2,3) N=8 omega-deformation axial selector audit: PASS");
console.log("  maximal multiplet: 128 bosonic = 128 fermionic on-shell degrees of freedom");
console.log("  continuous omega witnesses share the maximally symmetric quadratic spectrum");
console.log("  interactions vary while the PGT torsion and eta dictionary remains absent");
