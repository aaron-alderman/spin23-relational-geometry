import assert from "node:assert/strict";

const pi = Math.PI;
const s = Math.sqrt(7) / 4;
const c = 3 / 4;
const epsilonAd = 0.02;
const epsilonRel = 0.05;
const tauP = 0.01;
const Delta = 1;
const tolerance = 1e-12;
const close = (x, y, tol = tolerance) => Math.abs(x - y) <= tol;

const maximumRelativeImperfection = epsilonRel * epsilonAd / (2 * pi * s);
const omega = epsilonAd * Delta / s;
const period = 2 * pi / omega;
const maximumImperfection = epsilonRel / period;

assert.ok(close(maximumRelativeImperfection, maximumImperfection / Delta));
assert.ok(close(omega * s / Delta, epsilonAd));
assert.ok(close(maximumImperfection * period, epsilonRel));

const etaMax = Math.acos((Math.sqrt(1 - tauP ** 2) - c ** 2) / s ** 2);
const projectorChord = (eta) => Math.sqrt(1 - (c ** 2 + s ** 2 * Math.cos(eta)) ** 2);
assert.ok(close(projectorChord(etaMax), tauP, 1e-11));
assert.ok(projectorChord(0.5 * etaMax) < tauP);
assert.ok(projectorChord(1.5 * etaMax) > tauP);

const m = 1 / 3;
const K = 9;
const theta0 = 0.03;
const sigma = 0.01;
const z = 5;
const standardError = sigma / (theta0 * Math.sqrt(K));
const upperBound = m + z * standardError;
const idealRejectionZ = (1 - m) / standardError;
const minimumKStrict = (z * sigma / ((1 - m) * theta0)) ** 2;

assert.ok(close(standardError, 1 / 9));
assert.ok(close(upperBound, 8 / 9));
assert.ok(upperBound < 1);
assert.ok(close(idealRejectionZ, 6));
assert.ok(K > minimumKStrict);

const acceptanceChannels = new Set([
  "projective-closure",
  "coherent-holonomy",
  "nonunitarity",
  "selection",
]);
assert.equal(acceptanceChannels.size, 4);

console.log(JSON.stringify({
  status: "PASS",
  adiabaticityDegeneracyWindow: {
    maximumRelativeSplittingOrDifferentialLoss: maximumRelativeImperfection,
    omegaOverDelta: omega / Delta,
    periodTimesDelta: period * Delta,
  },
  timing: {
    projectorTolerance: tauP,
    maximumAzimuthError: etaMax,
  },
  tomography: {
    slope: m,
    observationsPerTangentDirection: K,
    standardError,
    fiveSigmaUpperBound: upperBound,
    idealRejectionZ,
  },
  acceptanceChannels: [...acceptanceChannels],
}));
