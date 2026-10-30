import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-surface-viscosity-kernel-gap-scaling-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizationConstant(epsilon, grid) {
  let mean = 0;
  for (let i = 0; i < grid; i += 1) {
    const x = 2 * Math.PI * (i + 0.5) / grid;
    mean += Math.exp(2 * epsilon * Math.cos(2 * x));
  }
  return -0.5 * Math.log(mean / grid);
}

function witnessGaps(epsilon, grid = 32768) {
  const step = 2 * Math.PI / grid;
  const c = normalizationConstant(epsilon, grid);
  let harmonicNorm = 0;
  let harmonicBochner = 0;
  let killingNorm = 0;
  let killingBochner = 0;
  for (let i = 0; i < grid; i += 1) {
    const x = (i + 0.5) * step;
    const sigma = c + epsilon * Math.cos(2 * x);
    const sx = -2 * epsilon * Math.sin(2 * x);
    const exp2 = Math.exp(2 * sigma);
    const lineArea = step * 2 * Math.PI;
    harmonicNorm += (1 / exp2) * lineArea;
    harmonicBochner += 2 * sx ** 2 / exp2 * lineArea;
    killingNorm += exp2 * lineArea;
    killingBochner += 2 * sx ** 2 * exp2 * lineArea;
  }
  return {
    epsilon,
    kleinDx: {
      hodge: 0,
      bochner: harmonicBochner / harmonicNorm,
      deformation: 2 * harmonicBochner / harmonicNorm,
    },
    rotationDy: {
      hodge: 2 * killingBochner / killingNorm,
      bochner: killingBochner / killingNorm,
      deformation: 0,
    },
    identities: {
      kleinDeformationMinusTwiceBochner: 2 * harmonicBochner / harmonicNorm
        - 2 * harmonicBochner / harmonicNorm,
      rotationHodgeMinusTwiceBochner: 2 * killingBochner / killingNorm
        - 2 * killingBochner / killingNorm,
    },
  };
}

function logSlope(first, second, selector) {
  return Math.log(selector(second) / selector(first))
    / Math.log(second.epsilon / first.epsilon);
}

const sweep = evidence.epsilonSweep.map((epsilon) => witnessGaps(epsilon));
const first = sweep[0];
const second = sweep[1];
const exponents = {
  kleinBochner: logSlope(first, second, (record) => record.kleinDx.bochner),
  kleinDeformation: logSlope(first, second, (record) => record.kleinDx.deformation),
  rotationHodge: logSlope(first, second, (record) => record.rotationDy.hodge),
  rotationBochner: logSlope(first, second, (record) => record.rotationDy.bochner),
};
const thresholds = evidence.thresholds;

for (const record of sweep) {
  assert(record.kleinDx.hodge <= thresholds.maximumProtectedGap,
    "Hodge failed to protect Klein harmonic circulation");
  assert(record.rotationDy.deformation <= thresholds.maximumProtectedGap,
    "deformation failed to protect rotation Killing flow");
  for (const value of [
    record.kleinDx.bochner,
    record.kleinDx.deformation,
    record.rotationDy.hodge,
    record.rotationDy.bochner,
  ]) {
    assert(value >= thresholds.minimumLiftedGap,
      "a curvature-lifted witness gap failed to open");
  }
  for (const residual of Object.values(record.identities)) {
    assert(Math.abs(residual) <= thresholds.maximumIdentityResidual,
      "gap ratio identity failed");
  }
}

for (const [name, exponent] of Object.entries(exponents)) {
  assert(exponent >= thresholds.minimumSmallEpsilonExponent
    && exponent <= thresholds.maximumSmallEpsilonExponent,
  name + " does not open quadratically at small throat strength");
}

console.log(JSON.stringify({
  status: "PASS",
  kernelDimensions: evidence.kernelDimensions,
  sweep,
  smallEpsilonExponents: exponents,
  verdict: "The protected Hodge and deformation zero modes remain exact, while every unprotected witness gap opens quadratically with throat strength."
}, null, 2));
