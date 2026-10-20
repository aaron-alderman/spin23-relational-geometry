#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-pseudoscalar-torsion-fermion-portal.json",
  import.meta.url,
), "utf8"));

const close = (actual, expected, relativeTolerance = 1e-12) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= relativeTolerance*scale, `${actual} != ${expected}`);
};

const w = evidence.finiteWitness;
const delta = 1 - 4*w.lambda;
const aS = w.M_Pl_GeV**2*delta/24;
const m = Math.sqrt(aS/w.b_X);
const f = w.c_minimal/Math.sqrt(aS);
const ye = 2*w.electronMass_GeV*f;
const yN = 2*w.nucleonMass_GeV*f;
const contact = w.c_minimal**2/(2*aS);

close(delta, w.delta);
close(aS, w.a_S_GeV2);
close(m, w.m_phi_GeV);
close(f, w.f_GeVminus1);
close(ye, w.y_e);
close(yN, w.y_N_elementaryBenchmark);
close(contact, w.singleCurrentContactCoefficient_GeVminus2);
close(f*m, w.c_minimal/Math.sqrt(w.b_X));
close(contact, 3/(16*w.M_Pl_GeV**2));

// Verify the separated-point tensor potential by differentiating
// Y=exp(-m r)/(4 pi r): +f1 f2 sigma_i sigma_j partial_i partial_j Y,
// using the corrected overall sign of Fadeev et al.
const test = { m: 0.5, r: 2, f1: 0.1, f2: 0.2 };
const exponential = Math.exp(-test.m*test.r)/(4*Math.PI);
const isotropic = exponential*(test.m/test.r**2 + 1/test.r**3);
const radial = exponential*(test.m**2/test.r + 3*test.m/test.r**2 + 3/test.r**3);
assert.ok(radial > isotropic && isotropic > 0);
const transverseAligned = -test.f1*test.f2*isotropic;
const radiallyAligned = test.f1*test.f2*(radial - isotropic);
assert.ok(transverseAligned < 0);
assert.ok(radiallyAligned > 0);

// Representative mass-dependent astrophysical translations. These are
// comparisons, not universal exclusions outside the source assumptions.
const electronBenchmarkBound = 2.5e-13;
const nucleonBenchmarkBound = 1e-9;
const electronDeltaFloor = (ye/electronBenchmarkBound)**2;
const nucleonDeltaFloor = (yN/nucleonBenchmarkBound)**2;
assert.ok(electronDeltaFloor > 1e-19 && electronDeltaFloor < 2e-18);
assert.ok(nucleonDeltaFloor > 1e-20 && nucleonDeltaFloor < 3e-19);

const oneMeVGeV = 1e-3;
const fiveHundredMicroeVGeV = 5e-13;
const bForOneMeV = aS/oneMeVGeV**2;
const bForFiveHundredMicroeV = aS/fiveHundredMicroeVGeV**2;
const deltaForOneMeVAtNaturalB = (oneMeVGeV/w.M_Pl_GeV)**2;
close(bForOneMeV, evidence.rangeNaturalness.b_X_for_1MeV_at_lambda0);
close(bForFiveHundredMicroeV, evidence.rangeNaturalness.b_X_for_500microeV_at_lambda0);
close(deltaForOneMeVAtNaturalB, evidence.rangeNaturalness.delta_for_1MeV_with_bX1over24);
assert.ok(bForFiveHundredMicroeV > 1e59);
assert.match(evidence.fermionLoopClosure.nonzeroSpurion, /nonzero/);

console.log("Spin(2,3) pseudoscalar-torsion fermion portal: PASS");
console.log(`  natural benchmark: m_phi=${m.toExponential(4)} GeV, f=${f.toExponential(4)} GeV^-1`);
console.log(`  Yukawa equivalents: y_e=${ye.toExponential(4)}, y_N=${yN.toExponential(4)}`);
console.log(`  EC contact magnitude: ${contact.toExponential(4)} GeV^-2 = 3/(16 M_Pl^2)`);
console.log(`  exact correlation: f*m_phi=${(f*m).toFixed(6)} = c/sqrt(b_X)`);
console.log(`  near-critical comparison floors: delta_e=${electronDeltaFloor.toExponential(3)}, delta_N=${nucleonDeltaFloor.toExponential(3)}`);
console.log(`  range cost: b_X(1 MeV)=${bForOneMeV.toExponential(3)}, b_X(500 micro-eV)=${bForFiveHundredMicroeV.toExponential(3)}`);
console.log("  fermion loops generate transverse torsion kinetics: isolated one-pole surface not closed");
console.log("  classification: generic torsion/axion-like EFT until the descendant fixes couplings");
