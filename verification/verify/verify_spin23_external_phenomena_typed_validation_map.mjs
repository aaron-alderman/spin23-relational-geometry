#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-external-phenomena-typed-validation-map.json",
  import.meta.url,
), "utf8"));

const h = evidence.hubbleTension;
const pull = Math.abs(h.shoesDistanceLadder.H0-h.planckLambdaCdm.H0)/
  Math.hypot(h.shoesDistanceLadder.sigma, h.planckLambdaCdm.sigma);
assert.ok(Math.abs(pull-h.naiveIndependentGaussianPull) < 0.01);
const networkPull = Math.abs(h.h0DistanceNetwork2026.H0-h.planckLambdaCdm.H0)/
  Math.hypot(h.h0DistanceNetwork2026.sigma, h.planckLambdaCdm.sigma);
assert.ok(Math.abs(networkPull-h.h0DistanceNetwork2026.naivePullAgainstPlanck) < 0.01);

// Exact-SUSY cancellation toy; splitting the fermion mass reopens the
// supertrace-like fourth-power vacuum contribution.
const supertrace4 = (bosons, fermions) =>
  bosons.reduce((sum, x) => sum+x.degeneracy*x.mass**4, 0)-
  fermions.reduce((sum, x) => sum+x.degeneracy*x.mass**4, 0);
assert.equal(supertrace4([{mass:2, degeneracy:2}], [{mass:2, degeneracy:2}]), 0);
assert.notEqual(supertrace4([{mass:2, degeneracy:2}], [{mass:3, degeneracy:2}]), 0);

// Flat rotation curve witness in G=v=1 units.
const mass = (r) => r;
const density = (r) => 1/(4*Math.PI*r*r);
assert.equal(mass(8)/mass(2), 4);
assert.ok(Math.abs(density(2)/density(4)-4) < 1e-15);

// Wilson area law produces a linear static potential.
const sigma = 0.7;
const R = 3;
for (const T of [10, 20, 40]) {
  const logW = -sigma*R*T;
  assert.ok(Math.abs(-logW/T-sigma*R) < 1e-14);
}

const ga = evidence.galliumAnomaly.bestRatios;
assert.ok(Math.abs(ga.outer.ratio/ga.inner.ratio-ga.outerToInner) < 0.001);
assert.ok(Math.abs((ga.inner.ratio+ga.outer.ratio)/2-ga.equalWeightMean) < 1e-15);

const dib = evidence.diffuseInterstellarBands;
for (let k = 0; k < dib.laboratoryAirWavelengthsAngstrom.length; k += 1) {
  assert.ok(Math.abs(dib.laboratoryAirWavelengthsAngstrom[k]-dib.nominalAstronomicalBandsAngstrom[k]) < 0.5);
}

const geo = evidence.geopotentialHarmonics;
const totalModes = (geo.maximumReferenceDegree+1)**2;
assert.equal(totalModes, geo.idealRealModeCountThroughDegree);
assert.equal(totalModes-4, geo.idealNonMonopoleDipoleModeCount);
const halfWavelength = Math.PI*geo.earthRadiusKm/geo.maximumReferenceDegree;
assert.ok(Math.abs(halfWavelength-geo.degree2190HalfWavelengthKm) < 0.01);
assert.ok(Math.abs(Math.acos(Math.sqrt(1/5))*180/Math.PI-63.4349) < 0.001);
assert.equal((1/2)**2, 0.25); // degree-two relative attenuation at r=2R

assert.equal(evidence.pentaquarks.observedStructures.length, 3);
assert.equal(evidence.darkMatter.programmeBranches.length, 3);

console.log("Spin(2,3) external-phenomena typed validation map: PASS");
console.log(`  Planck/SH0ES naive independent pull: ${pull.toFixed(2)} sigma`);
console.log(`  Planck/H0 Distance Network 2026 naive pull: ${networkPull.toFixed(2)} sigma`);
console.log("  exact-SUSY cancellation and broken-SUSY residual distinguished");
console.log("  flat-curve density, Wilson area law, BEST ratios and C60+ line matches verified");
console.log(`  degree-2190 half wavelength: ${halfWavelength.toFixed(2)} km; real modes: ${totalModes}`);
