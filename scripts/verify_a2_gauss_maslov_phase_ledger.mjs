import assert from "node:assert/strict";

const eps = 1e-12;
const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const close = (a, b) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const one = { re: 1, im: 0 };
const i = { re: 0, im: 1 };
const minusI = { re: 0, im: -1 };
const minusOne = { re: -1, im: 0 };

const residues = [0, 1, 2];
const gaussRaw = residues.reduce((sum, a) => {
  const angle = 2 * Math.PI * ((a * a) % 3) / 3;
  return { re: sum.re + Math.cos(angle), im: sum.im + Math.sin(angle) };
}, { re: 0, im: 0 });
const gammaFinite = { re: gaussRaw.re / Math.sqrt(3), im: gaussRaw.im / Math.sqrt(3) };
assert.ok(close(gammaFinite, i));

const gammaInfinity = minusI;
assert.ok(close(mul(gammaFinite, gammaInfinity), one));

const genusTwoFinite = mul(gammaFinite, gammaFinite);
const genusTwoInfinity = mul(gammaInfinity, gammaInfinity);
assert.ok(close(genusTwoFinite, minusOne));
assert.ok(close(genusTwoInfinity, minusOne));
assert.ok(close(mul(genusTwoFinite, genusTwoInfinity), one));

const physicalTwoModeFourierLiftPhases = [i, minusI];
assert.ok(physicalTwoModeFourierLiftPhases.every((phase) => !close(phase, genusTwoFinite)));

const a2Rank = 2;
const genus = 2;
const thetaRealCoordinates = a2Rank * genus;
const physicalConfigurationCoordinates = 2;
assert.equal(thetaRealCoordinates, 4);
assert.equal(physicalConfigurationCoordinates, 2);
assert.notEqual(thetaRealCoordinates, physicalConfigurationCoordinates);

console.log(JSON.stringify({
  protocol: "a2-gauss-maslov-phase-ledger/1",
  genusOne: {
    finiteP3GaussPhase: "i",
    archimedeanWeilPhase: "-i",
    product: "1"
  },
  genusTwo: {
    finiteDiscriminantPhase: "-1",
    archimedeanThetaPhase: "-1",
    product: "1"
  },
  physicalTwoModeMetaplecticLiftPhase: "plus or minus i",
  literalPhaseEquality: false,
  representationDimensions: {
    a2Rank,
    genus,
    thetaRealCoordinates,
    physicalConfigurationCoordinates
  },
  conclusion: "The finite and archimedean theta phases are reciprocal local factors. The physical two-channel oscillator is a different realization, so equality of raw phases is not invariant; an explicit theta/reduction intertwiner is required."
}, null, 2));
