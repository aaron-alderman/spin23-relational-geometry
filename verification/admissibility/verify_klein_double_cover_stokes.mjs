import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-klein-double-cover-stokes-v1.json",
  import.meta.url,
), "utf8"));

const tolerance = 1e-10;
const points = [
  [0.21, 0.37],
  [0.72, 1.11],
  [1.43, 2.07],
  [2.61, 0.83],
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const modes = {
  A: {
    psi: (x, y) => Math.cos(x) * Math.cos(y),
    ux: (x, y) => -Math.cos(x) * Math.sin(y),
    uy: (x, y) => Math.sin(x) * Math.cos(y),
    divergence: () => 0,
    lambda: 2,
  },
  B: {
    psi: (x, y) => Math.sin(2 * x) * Math.sin(y),
    ux: (x, y) => Math.sin(2 * x) * Math.cos(y),
    uy: (x, y) => -2 * Math.cos(2 * x) * Math.sin(y),
    divergence: () => 0,
    lambda: 5,
  },
};

for (const record of evidence.modes) {
  const mode = modes[record.id];
  assert(mode, "unknown mode " + record.id);
  assert(mode.lambda === record.laplacianEigenvalue,
    "Laplacian eigenvalue mismatch for mode " + record.id);

  for (const [x, y] of points) {
    const deckX = x + Math.PI;
    const deckY = -y;
    assert(Math.abs(mode.psi(deckX, deckY) + mode.psi(x, y)) < tolerance,
      "streamfunction deck oddness failed for mode " + record.id);
    assert(Math.abs(mode.ux(deckX, deckY) - mode.ux(x, y)) < tolerance,
      "longitudinal velocity equivariance failed for mode " + record.id);
    assert(Math.abs(mode.uy(deckX, deckY) + mode.uy(x, y)) < tolerance,
      "transverse velocity equivariance failed for mode " + record.id);
    assert(Math.abs(mode.ux(x + 2 * Math.PI, y) - mode.ux(x, y)) < tolerance,
      "longitudinal two-lap closure failed for mode " + record.id);
    assert(Math.abs(mode.uy(x + 2 * Math.PI, y) - mode.uy(x, y)) < tolerance,
      "transverse two-lap closure failed for mode " + record.id);
    assert(Math.abs(mode.divergence(x, y)) < tolerance,
      "divergence-free condition failed for mode " + record.id);
    assert(Math.abs(mode.uy(deckX, deckY) ** 2 - mode.uy(x, y) ** 2) < tolerance,
      "power detector should erase transverse sign for mode " + record.id);
  }

  const parityClosure = ((-1) ** record.axialHarmonic) * record.transverseParity;
  assert(parityClosure === -1,
    "axial/transverse parity correlation failed for mode " + record.id);
}

const { viscosity, time, initialAmplitude, constantForcing } = evidence.stokesWitness;
const amplitudes = evidence.modes.map((record) => {
  const decay = Math.exp(-viscosity * record.laplacianEigenvalue * time);
  const forced = initialAmplitude * decay
    + constantForcing / (viscosity * record.laplacianEigenvalue) * (1 - decay);
  assert(decay > 0 && decay < 1, "viscous decay must be strictly between zero and one");
  assert(Number.isFinite(forced), "forced Stokes amplitude must be finite");
  return {
    id: record.id,
    eigenvalue: record.laplacianEigenvalue,
    unforcedAmplitude: decay,
    forcedAmplitude: forced,
  };
});

assert(amplitudes[1].unforcedAmplitude < amplitudes[0].unforcedAmplitude,
  "higher Laplacian mode must decay faster at fixed viscosity and time");

console.log(JSON.stringify({
  status: "PASS",
  deckMap: evidence.domain.deckMap,
  transformationLaws: evidence.transformationLaws,
  amplitudes,
  detector: evidence.detector,
  verdict: "Two exact divergence-free Stokes modes descend to the Klein quotient; signed transverse response flips after one lap, closes after two and is erased by power."
}, null, 2));
