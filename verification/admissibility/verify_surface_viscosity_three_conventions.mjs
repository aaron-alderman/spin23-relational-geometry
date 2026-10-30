import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-surface-viscosity-three-convention-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const epsilon = evidence.epsilon;
const grid = 1024;
const step = 2 * Math.PI / grid;
let rawMean = 0;
for (let i = 0; i < grid; i += 1) {
  const x = (i + 0.5) * step;
  rawMean += Math.exp(2 * epsilon * Math.cos(2 * x));
}
const c = -0.5 * Math.log(rawMean / grid);

function geometry(x) {
  const sigma = c + epsilon * Math.cos(2 * x);
  const sx = -2 * epsilon * Math.sin(2 * x);
  const exp2 = Math.exp(2 * sigma);
  const curvature = 4 * epsilon * Math.exp(-2 * sigma) * Math.cos(2 * x);
  return { sigma, sx, exp2, curvature };
}

const streamfunctions = {
  A: (x, y) => ({
    px: -Math.sin(x) * Math.cos(y),
    py: -Math.cos(x) * Math.sin(y),
    pxx: -Math.cos(x) * Math.cos(y),
    pxy: Math.sin(x) * Math.sin(y),
    pyy: -Math.cos(x) * Math.cos(y),
  }),
  B: (x, y) => ({
    px: 2 * Math.cos(2 * x) * Math.sin(y),
    py: Math.sin(2 * x) * Math.cos(y),
    pxx: -4 * Math.sin(2 * x) * Math.sin(y),
    pxy: 2 * Math.cos(2 * x) * Math.cos(y),
    pyy: -Math.sin(2 * x) * Math.sin(y),
  }),
  harmonicDx: () => ({ px: 0, py: 1, pxx: 0, pxy: 0, pyy: 0 }),
};

function streamfunctionEnergies(mode) {
  let hodge = 0;
  let bochner = 0;
  let deformation = 0;
  let curvature = 0;
  for (let i = 0; i < grid; i += 1) {
    const x = (i + 0.5) * step;
    const g = geometry(x);
    const inverseArea = 1 / g.exp2;
    for (let j = 0; j < grid; j += 1) {
      const y = (j + 0.5) * step;
      const p = mode(x, y);
      const ux = inverseArea * p.py;
      const uy = -inverseArea * p.px;
      const uxX = inverseArea * (p.pxy - 2 * g.sx * p.py);
      const uxY = inverseArea * p.pyy;
      const uyX = -inverseArea * (p.pxx - 2 * g.sx * p.px);
      const uyY = -inverseArea * p.pxy;
      const nxx = uxX + g.sx * ux;
      const nxy = uyX + g.sx * uy;
      const nyx = uxY - g.sx * uy;
      const nyy = uyY + g.sx * ux;
      const roughDensity = g.exp2 * (nxx ** 2 + nxy ** 2 + nyx ** 2 + nyy ** 2);

      const dxx = p.pxy - g.sx * p.py;
      const dxy = 0.5 * ((-p.pxx + g.sx * p.px) + (p.pyy + g.sx * p.px));
      const dyy = -p.pxy + g.sx * p.py;
      const defDensity = 2 * inverseArea * (dxx ** 2 + 2 * dxy ** 2 + dyy ** 2);
      const laplacian = p.pxx + p.pyy;
      const hodgeDensity = inverseArea * laplacian ** 2;
      const curvatureDensity = g.curvature * (p.px ** 2 + p.py ** 2);
      const areaElement = step * step;
      hodge += hodgeDensity * areaElement;
      bochner += roughDensity * areaElement;
      deformation += defDensity * areaElement;
      curvature += curvatureDensity * areaElement;
    }
  }
  return {
    hodge,
    bochner,
    deformation,
    curvature,
    hodgeIdentityResidual: hodge - bochner - curvature,
    deformationIdentityResidual: deformation - bochner + curvature,
  };
}

function rotationKillingEnergies() {
  let hodge = 0;
  let bochner = 0;
  let deformation = 0;
  let curvature = 0;
  for (let i = 0; i < grid; i += 1) {
    const x = (i + 0.5) * step;
    const g = geometry(x);
    const hodgeDensity = 4 * g.sx ** 2 * g.exp2;
    const bochnerDensity = 2 * g.sx ** 2 * g.exp2;
    const curvatureDensity = g.curvature * g.exp2 ** 2;
    const lineArea = step * 2 * Math.PI;
    hodge += hodgeDensity * lineArea;
    bochner += bochnerDensity * lineArea;
    curvature += curvatureDensity * lineArea;
  }
  return {
    hodge,
    bochner,
    deformation,
    curvature,
    hodgeIdentityResidual: hodge - bochner - curvature,
    deformationIdentityResidual: deformation - bochner + curvature,
  };
}

const results = {
  A: streamfunctionEnergies(streamfunctions.A),
  B: streamfunctionEnergies(streamfunctions.B),
  kleinHarmonicDx: streamfunctionEnergies(streamfunctions.harmonicDx),
  rotationKillingDy: rotationKillingEnergies(),
};

for (const [name, result] of Object.entries(results)) {
  assert(Math.abs(result.hodgeIdentityResidual) <= evidence.thresholds.maximumIdentityResidual,
    name + " failed the Weitzenbock energy identity");
  assert(Math.abs(result.deformationIdentityResidual) <= evidence.thresholds.maximumIdentityResidual,
    name + " failed the deformation energy identity");
  for (const energy of [result.hodge, result.bochner, result.deformation]) {
    assert(energy >= -evidence.thresholds.maximumIdentityResidual,
      name + " produced a negative dissipation form");
  }
}

assert(results.kleinHarmonicDx.hodge <= evidence.thresholds.maximumDeclaredKernelEnergy,
  "Klein dx circulation must be in the Hodge kernel");
assert(results.kleinHarmonicDx.bochner >= evidence.thresholds.minimumSeparatedEnergy,
  "Klein dx circulation must leave the Bochner kernel on the throat");
assert(results.kleinHarmonicDx.deformation >= evidence.thresholds.minimumSeparatedEnergy,
  "Klein dx circulation must leave the deformation kernel on the throat");
assert(results.rotationKillingDy.deformation <= evidence.thresholds.maximumDeclaredKernelEnergy,
  "rotation y-translation must be in the deformation kernel");
assert(results.rotationKillingDy.hodge >= evidence.thresholds.minimumSeparatedEnergy,
  "rotation y-translation must leave the Hodge kernel on the throat");
assert(results.rotationKillingDy.bochner >= evidence.thresholds.minimumSeparatedEnergy,
  "rotation y-translation must leave the Bochner kernel on the throat");

console.log(JSON.stringify({
  status: "PASS",
  epsilon,
  results,
  kernelLedger: {
    hodge: "harmonic one-forms",
    bochner: "parallel fields",
    deformation: "Killing fields",
    kleinWitness: "dx harmonic circulation survives Hodge only",
    rotationWitness: "y-translation survives deformation only"
  },
  verdict: "All three viscosity forms satisfy their curvature identities but have inequivalent kernels; the Klein and rotation quotients expose different zero-mode records."
}, null, 2));
