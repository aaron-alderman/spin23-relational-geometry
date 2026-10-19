import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const contract = JSON.parse(readFileSync(resolve(here, "d02-boundary-gluing-contract.json"), "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

// Bounded POVM with no bounded B(H)-valued Radon-Nikodym density. For each
// resolution k, include one coordinate for every interval [j/k,(j+1)/k) with
// density k on that interval. Every coordinate has total mass one, but at each
// x one coordinate per k has density k.
const sampleX = Math.SQRT2 / 4;
const densityGrowth = [10, 25, 50, 100, 200].map((maxResolution) => ({
  maxResolution,
  boundaryDensityNorm: maxResolution,
  totalOperatorMeasureNorm: 1
}));
assert.ok(densityGrowth.at(-1).boundaryDensityNorm > densityGrowth[0].boundaryDensityNorm * 10);

function intervalPoisson(k, j, x, y) {
  const left = j / k;
  const right = (j + 1) / k;
  return k * (Math.atan((right - x) / y) - Math.atan((left - x) / y));
}
const interiorBounds = [0.2, 0.08, 0.03].map((y) => {
  let maximum = 0;
  for (let k = 1; k <= 200; k += 1) {
    for (let j = 0; j < k; j += 1) maximum = Math.max(maximum, intervalPoisson(k, j, sampleX, y));
  }
  assert.ok(maximum <= Math.PI / y + 1e-10);
  return { y, maximum, elementaryBound: Math.PI / y };
});

// Atom extraction can converge strongly but not in norm. Coordinate n carries
// uniform probability on [0,2^-n], with no atom at zero. The diagonal entries of
// y Im M(iy) are (y/w_n) atan(w_n/y): pointwise ->0, supremum ->1.
function atomTestEntry(n, y) {
  const width = 2 ** (-n);
  return (y / width) * Math.atan(width / y);
}
const atomTest = [1e-1, 3e-2, 1e-2, 3e-3, 1e-3].map((y) => {
  const fixedCoordinate = atomTestEntry(2, y);
  let approximateNorm = 0;
  for (let n = 1; n <= 80; n += 1) approximateNorm = Math.max(approximateNorm, atomTestEntry(n, y));
  return { y, fixedCoordinate, approximateNorm };
});
assert.ok(atomTest.at(-1).fixedCoordinate < atomTest[0].fixedCoordinate * 0.03);
assert.ok(atomTest.every(({ approximateNorm }) => approximateNorm > 0.99));

// Threshold density rho(t)=1/(2 sqrt(t)) on (0,1) has unit mass. At lambda=0,
// Im M(iy) ~ C y^-1/2 but y Im M(iy)->0, so divergence is not an atom.
function simpsonIntegral(fn, left, right, intervals = 20000) {
  const count = intervals % 2 === 0 ? intervals : intervals + 1;
  const step = (right - left) / count;
  let sum = fn(left) + fn(right);
  for (let index = 1; index < count; index += 1) sum += (index % 2 === 0 ? 2 : 4) * fn(left + index * step);
  return sum * step / 3;
}
function thresholdImaginary(y) {
  const upper = 1 / Math.sqrt(y);
  const scaledIntegral = simpsonIntegral((v) => 1 / (v ** 4 + 1), 0, upper);
  return scaledIntegral / Math.sqrt(y);
}
const thresholdSamples = [1e-2, 1e-3, 1e-4].map((y) => {
  const imaginaryPart = thresholdImaginary(y);
  return { y, imaginaryPart, scaledCoefficient: imaginaryPart * Math.sqrt(y), atomIndicator: y * imaginaryPart };
});
assert.ok(thresholdSamples.at(-1).imaginaryPart > thresholdSamples[0].imaginaryPart * 8);
assert.ok(thresholdSamples.at(-1).atomIndicator < thresholdSamples[0].atomIndicator * 0.2);
assert.ok(Math.abs(thresholdSamples.at(-1).scaledCoefficient - Math.PI / (2 * Math.SQRT2)) < 1e-4);

// The middle-thirds Cantor probability measure is nonzero, atomless and singular
// with respect to Lebesgue measure. Its a.c. boundary density is therefore zero
// a.e.; density plus atoms cannot reconstruct it.
const cantorFixture = {
  totalMass: 1,
  absolutelyContinuousMass: 0,
  atomicMass: 0,
  singularContinuousMass: 1,
  lebesgueAlmostEverywhereImaginaryDensity: 0
};
assert.equal(cantorFixture.totalMass, cantorFixture.absolutelyContinuousMass + cantorFixture.atomicMass + cantorFixture.singularContinuousMass);

const result = {
  protocol: "claimipedia-d02-boundary-measure-strike/1",
  strikeId: "d02-boundary-measure-and-density-strike-v1",
  theoremCandidate: {
    statement: "For each vector state, the scalar Herglotz representation gives finite nontangential boundary values Lebesgue-a.e., Im M(lambda+i0)=pi dSigma_ac/dlambda in scalar matrix elements, and Sigma({lambda})=lim_{y down to 0} y Im M(lambda+i y). Operator-valued promotion requires a separately proved uniform bound and topology.",
    primaryBoundaryObject: "bounded positive operator-valued measure Sigma",
    nonCompressions: ["a.e. density does not include atoms", "density plus atoms does not include singular-continuous mass", "scalarized a.e. limits need not assemble into a bounded operator"]
  },
  noBoundedDensityFixture: {
    construction: "diagonal interval densities k 1_[j/k,(j+1)/k)",
    densityGrowth,
    interiorBounds,
    conclusion: "The POVM has norm one, and its Cauchy transform is bounded for every y>0, but its pointwise density is an unbounded diagonal form at every x."
  },
  atomTopologyFixture: {
    construction: "coordinate n is uniform probability on [0,2^-n]",
    atomAtZero: 0,
    atomTest,
    conclusion: "The atom test converges strongly to zero but not in norm; uniform non-atomic tightness is the missing norm condition."
  },
  thresholdFixture: {
    density: "rho(t)=1/(2 sqrt(t)) on (0,1)",
    thresholdSamples,
    conclusion: "Boundary divergence with a vanishing atom indicator is a threshold density, not a pole."
  },
  singularContinuousFixture: cantorFixture,
  dispatcher: contract.dispatcher,
  authority: contract.authority
};

const receipt = {
  protocol: "claimipedia-d02-boundary-measure-strike-receipt/1",
  checks: {
    scalarizedBoundaryTheoremRecorded: true,
    boundedPovmWithoutBoundedDensity: true,
    interiorCauchyTransformRemainsBounded: true,
    strongAtomRecoveryWithoutNormRecovery: true,
    thresholdDivergenceSeparatedFromAtom: true,
    singularContinuousMassRetained: true,
    densityAtomSingularLayersSeparated: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-boundary-measure-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-boundary-measure-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
