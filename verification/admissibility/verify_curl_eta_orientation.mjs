import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-curl-eta-orientation-v1.json",
  import.meta.url,
), "utf8"));
const tolerance = 1e-12;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function eta(spectrum, s) {
  return spectrum.reduce((sum, value) => {
    assert(value !== 0, "eta witness excludes zero modes");
    return sum + Math.sign(value) / Math.abs(value) ** s;
  }, 0);
}

function product(values) {
  return values.reduce((accumulator, value) => accumulator * value, 1);
}

const spectrum = evidence.finiteWitness.spectrum;
const opposite = evidence.finiteWitness.orientationReversedSpectrum;
assert(opposite.every((value, index) => value === -spectrum[index]),
  "orientation-reversed spectrum must equal -B");

for (const s of [0, 0.5, 1, 2]) {
  assert(Math.abs(eta(opposite, s) + eta(spectrum, s)) < tolerance,
    `eta oddness failed at s=${s}`);
}

const squared = spectrum.map((value) => value ** 2);
const oppositeSquared = opposite.map((value) => value ** 2);
assert(squared.every((value, index) => value === oppositeSquared[index]),
  "squared spectrum must be orientation blind");
assert(squared.every((value, index) => value === evidence.finiteWitness.squaredSpectrum[index]),
  "squared-spectrum evidence mismatch");
assert(Math.abs(eta(spectrum, 0) - evidence.finiteWitness.etaAtZero) < tolerance,
  "eta(0) evidence mismatch");
assert(Math.abs(eta(spectrum, 1) - evidence.finiteWitness.etaAtOne) < tolerance,
  "eta(1) evidence mismatch");
assert(Math.abs(product(spectrum)) === evidence.finiteWitness.absoluteDeterminant,
  "absolute determinant evidence mismatch");
assert(Math.abs(product(opposite)) === evidence.finiteWitness.absoluteDeterminant,
  "orientation-reversed absolute determinant mismatch");

// One simple negative-to-positive crossing changes finite eta(0) by +2.
const before = [-1, 2, 3];
const after = [1, 2, 3];
const spectralFlow = 1;
assert(eta(after, 0) - eta(before, 0) === 2 * spectralFlow,
  "finite eta/spectral-flow relation failed");

console.log(JSON.stringify({
  status: "PASS",
  eta0: eta(spectrum, 0),
  eta1: eta(spectrum, 1),
  oppositeEta0: eta(opposite, 0),
  squaredSpectrum: squared,
  absoluteDeterminant: Math.abs(product(spectrum)),
  finiteCrossingCheck: { spectralFlow, etaChange: eta(after, 0) - eta(before, 0) },
  verdict: "Eta retains orientation discarded by the squared spectrum and determinant magnitude; the finite crossing relation is kept separate from the continuum APS formula.",
}, null, 2));
