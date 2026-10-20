#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-lense-thirring-spin-yukawa.json",
  import.meta.url,
), "utf8"));
const close = (x, y, rel = 1e-10) => {
  const scale = Math.max(1, Math.abs(x), Math.abs(y));
  assert.ok(Math.abs(x-y) <= rel*scale, `${x} != ${y}`);
};

const { constants: k, lageosLike: l, laboratoryRange: lab, naturalCriticalPoint: natural } = evidence.benchmarks;
const omega = 2*k.G_SI*k.earthAngularMomentum_kg_m2_per_s /
  (k.c_m_per_s**2*l.semimajorAxis_m**3*(1-l.eccentricity**2)**1.5);
const rate = omega*k.secondsPerJulianYear*k.masPerRadian;
close(rate, l.grNodalRate_mas_per_year, 1e-11);
close(l.criticalClassRate_mas_per_year/l.grNodalRate_mas_per_year, 1);
close(l.torsionCorrectionForUnpolarizedBodies_mas_per_year, 0);

const satelliteRangeMass = k.hbarc_eV_m/l.semimajorAxis_m;
const labRangeMass = k.hbarc_eV_m/lab.separation_m;
close(satelliteRangeMass, l.mediatorMassForOneERange_eV, 1e-11);
close(labRangeMass, lab.mediatorMassForOneERange_eV, 1e-12);

const planckMassEV = natural.m_phi_GeV*1e9;
const planckExponent = planckMassEV*l.semimajorAxis_m/k.hbarc_eV_m;
close(planckExponent, natural.lageosExponent_mr, 1e-9);
assert.ok(planckExponent > 1e40);

// Exact Hessian of Y=exp(-m r)/(4 pi r), resolved into transverse and radial
// eigenvalues. This reconstructs the two angular structures in the ledger.
const radialEigenvalue = (m, r) => Math.exp(-m*r)/(4*Math.PI)*(m*m/r+2*m/r**2+2/r**3);
const transverseEigenvalue = (m, r) => -Math.exp(-m*r)/(4*Math.PI)*(m/r**2+1/r**3);
for (const [m, r] of [[0, 0.2], [0.5, 2], [3, 0.4]]) {
  const tensorRadial = Math.exp(-m*r)/(4*Math.PI)*(
    -(m/r**2+1/r**3)+(m*m/r+3*m/r**2+3/r**3)
  );
  close(tensorRadial, radialEigenvalue(m, r));
  assert.ok(Number.isFinite(transverseEigenvalue(m, r)));
}

assert.equal(evidence.metricWeakField.criticalClassCoefficient, 1);
assert.equal(evidence.linearSourceSplit.unpolarizedRule.includes("axial current vanishes"), true);
assert.equal(evidence.torsionExchange.selectionRule.includes("averages to zero"), true);

console.log("Spin(2,3) critical PGT Lense-Thirring/spin-Yukawa gate: PASS");
console.log(`  LAGEOS-like GR and critical-class rate: ${rate.toFixed(3)} mas/yr`);
console.log(`  unpolarized torsion correction: ${l.torsionCorrectionForUnpolarizedBodies_mas_per_year} mas/yr`);
console.log(`  one-e-fold range masses: satellite=${satelliteRangeMass.toExponential(3)} eV, 10 cm=${labRangeMass.toExponential(3)} eV`);
console.log(`  natural pole satellite exponent: mr=${planckExponent.toExponential(3)}`);
console.log("  observable deviation: polarized tensor Yukawa torque, not altered orbital frame dragging");
