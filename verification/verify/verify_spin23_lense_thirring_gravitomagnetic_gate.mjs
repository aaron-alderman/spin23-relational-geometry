#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-lense-thirring-gravitomagnetic-gate.json",
  import.meta.url,
), "utf8"));

const x = evidence.lageosWitness;
const yearSeconds = 365.25*86400;
const masPerRad = 206264806.247;
const inclination = x.inclinationDeg*Math.PI/180;
const meanMotion = Math.sqrt(x.earthGmM3PerS2/x.semiMajorAxisM**3);
const lt = 2*x.G*x.earthAngularMomentumKgM2PerS/
  (x.cMPerS**2*x.semiMajorAxisM**3*(1-x.eccentricity**2)**1.5);
const j2 = -1.5*meanMotion*x.J2*(x.earthRadiusM/x.semiMajorAxisM)**2*
  Math.cos(inclination)/(1-x.eccentricity**2)**2;
const ltMasYr = lt*yearSeconds*masPerRad;
const j2MasYr = j2*yearSeconds*masPerRad;
const ratio = Math.abs(j2/lt);

assert.ok(Math.abs(ltMasYr-x.lenseThirringMasPerYear) < 0.01);
assert.ok(Math.abs(j2MasYr-x.j2MasPerYear) < 1);
assert.ok(Math.abs(ratio-x.absoluteClassicalToRelativisticRatio) < 1);
assert.ok(ratio > 1e7);

const gp = evidence.gravityProbeB;
const gpPull = Math.abs(gp.measuredFrameDraggingMasPerYear-gp.grPredictionMasPerYear)/
  gp.measurementSigmaMasPerYear;
assert.ok(gpPull < 1);
assert.ok(Math.abs(gp.measuredGeodeticMasPerYear-gp.grGeodeticPredictionMasPerYear) < 20);
assert.equal(evidence.timeReversal.notMicroscopicTViolation, true);

// The J2 contribution changes sign across a polar orbit, while the leading
// Lense-Thirring nodal magnitude above is inclination independent.
const j2Sign = (degrees) => -Math.sign(Math.cos(degrees*Math.PI/180));
assert.equal(j2Sign(60), -1);
assert.equal(j2Sign(120), 1);
assert.ok(Math.abs(Math.cos(90*Math.PI/180)) < 1e-15);

console.log("Spin(2,3) Lense-Thirring gravitomagnetic gate: PASS");
console.log(`  LAGEOS-like LT node: ${ltMasYr.toFixed(2)} mas/yr`);
console.log(`  J2 node: ${j2MasYr.toFixed(0)} mas/yr; |J2/LT|=${ratio.toFixed(0)}`);
console.log(`  Gravity Probe B frame-dragging agreement: ${gpPull.toFixed(2)} sigma from GR`);
console.log("  rotating-source state selection is not microscopic T violation");
